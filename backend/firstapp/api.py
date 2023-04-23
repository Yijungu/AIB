import os
import openai
import torch, gc

import copy
import numpy as np
import matplotlib.pyplot as plt
import cv2

from segment_anything import sam_model_registry, SamAutomaticMaskGenerator, SamPredictor
from .views import *
from .serializers import ReviewSerializer
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler

openai.api_key = None
model = 'text-davinci-003'
model_id = "stabilityai/stable-diffusion-2-1"

def makeGPT(request) :
    print(request.data['concept'])
    # chatGPT 연결
    response = openai.Completion.create(
        prompt = request.data['concept'],
        model = model
    )
    for result in response.choices:
        return(result.text)


def makeStableDiffusion(answer) :
    print("쿠다 가능 :{}".format(torch.cuda.is_available()))
    
    # Use the DPMSolverMultistepScheduler (DPM-Solver++) scheduler here instead
    pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
    pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
    pipe = pipe.to("cuda")

    pipe.enable_attention_slicing()

    gc.collect()
    torch.cuda.empty_cache()

    prompt = answer

    image = pipe(prompt, height=512, width=1024, 
                negative_prompt="text box, "+"people, "+"person, "+"face", guidance_scale=4).images[0]

    image.save("astronaut_rides_horse.png")
    
    plt.imsave('test.png', segmentation(image))

def border_ditector(list):
  for i in range(len(list)):
    if list[i][10] == 1:
      return True
    if list[i][len(list[0])-10] == 1:
      return True
  for i in range(len(list[0])):
    if list[10][i] == 1:
      return True
    if list[len(list)-10][i] == 1:
      return True
  return False


def segmentation(image) :
    sam_checkpoint = "sam_vit_h_4b8939.pth"
    model_type = "vit_h"

    device = "cuda"

    sam = sam_model_registry[model_type](checkpoint=sam_checkpoint)
    sam.to(device=device)

    mask_generator = SamAutomaticMaskGenerator(sam) 
    image = cv2.imread("astronaut_rides_horse.png")
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    masks = mask_generator.generate(image)
    matrix = copy.deepcopy(masks)

    unused_matrix = np.zeros(matrix[0]["segmentation"].shape)
    used_matrix = np.ones(matrix[0]["segmentation"].shape)

    for i in range(len(matrix)):
        if border_ditector(matrix[i]["segmentation"]):
            unused_matrix = np.logical_or(unused_matrix, matrix[i]["segmentation"])

    used_matrix = np.logical_xor(used_matrix, unused_matrix)

    used_png = []
    used_png.append(used_matrix)
    used_png.append(used_matrix)
    used_png.append(used_matrix)
    used_png = np.array(used_png)
    used_png = np.transpose(used_png, (1, 2, 0))

    return used_png * image