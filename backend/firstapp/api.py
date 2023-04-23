import os
import openai
import torch, gc

from .views import *
from .serializers import ReviewSerializer
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler

openai.api_key = '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'
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