import os
import openai
import torch, gc
import numpy as np
import cv2
import io
import tensorflow_hub as hub

from PIL import Image
from .views import *
from .makeTemplate import *
from .serializers import TemplateSerializer
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler

#openai.api_key = 
gptModel = 'text-davinci-003'
model_id = "runwayml/stable-diffusion-v1-5"

MODEL_URL = "https://tfhub.dev/tensorflow/efficientdet/d2/1"
detectModel = hub.load(MODEL_URL)

def makeGPT(request) :
    print(request.data['concept'])
    # chatGPT 연결
    response = openai.Completion.create(
        prompt = request.data['concept'],
        model = gptModel
    )
    for result in response.choices:
        return(result.text)


def makeStableDiffusion(answer, width, height) :
    print("쿠다 가능 :{}".format(torch.cuda.is_available()))
    
    # Use the DPMSolverMultistepScheduler (DPM-Solver++) scheduler here instead
    pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
    pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
    pipe = pipe.to("cuda")

    pipe.enable_attention_slicing()

    gc.collect()
    torch.cuda.empty_cache()

    prompt = answer + ", painting, advertisement"

    image = pipe(prompt, height=height, width=width, 
                negative_prompt="text box, "+"people, "+"person, "+"face", guidance_scale=4).images[0]
    
    image.save("makeStableDiffusion.png")

    return image



def add_white_background(before_img):
    # 이미지 사이즈를 가져옵니다.
    image = before_img

    width, height = image.size

    # 새로운 흰색 배경 이미지 생성
    white_background = Image.new('RGBA', (width, height), (240, 240, 240, 255))

    # 원본 이미지를 흰색 배경 이미지 위에 붙여넣기 (알파 채널 값에 따라 투명도를 적용)
    white_background.alpha_composite(image)

    white_background.save("add_white_background.png")

    return white_background

def detect(image_data, axis):
    image_byte_arr = io.BytesIO()
    image_data.save(image_byte_arr, format='PNG')
    image_byte_arr = image_byte_arr.getvalue()

    image_np = np.fromstring(image_byte_arr, np.uint8)
    # image_np = np.fromstring(image_data, np.uint8)
    image = cv2.imdecode(image_np, cv2.IMREAD_COLOR)

    boxes, scores, classes = detect_objects(image)

    #왼쪽, 가운데, 오른쪽 스코어가 반환되어야함    
    left, center, right = write_position(boxes, scores, image.shape, axis)

    if min(left, center, right) == left :
        return 'left' if axis == 'x' else 'up'
    elif min(left, center, right) == center :
        return 'center'
    else :
        return "right" if axis == 'x' else 'down'
    
def detect_square(image_data):
    image_byte_arr = io.BytesIO()
    image_data.save(image_byte_arr, format='PNG')
    image_byte_arr = image_byte_arr.getvalue()

    image_np = np.fromstring(image_byte_arr, np.uint8)
    # image_np = np.fromstring(image_data, np.uint8)
    image = cv2.imdecode(image_np, cv2.IMREAD_COLOR)

    boxes, scores, classes = detect_objects(image)
   
    left, center, right, up, down = write_position_square(boxes, scores, image.shape)

    if min(left, center, right, up, down) == left :
        return 'left'
    elif min(left, center, right, up, down) == center :
        return 'center'
    elif min(left, center, right, up, down) == right :
        return "right"
    elif min(left, center, right, up, down) == up :
        return "up"
    else :
        return "down"


def detect_objects(image):
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image_np = np.expand_dims(image_rgb, axis=0)

    # 객체 감지 모델 로드

    # 객체 감지 실행
    result = detectModel(image_np)

    # 결과를 NumPy 배열로 변환
    boxes = result["detection_boxes"].numpy()
    scores = result["detection_scores"].numpy()
    classes = result["detection_classes"].numpy().astype(np.int32)

    return boxes, scores, classes

def write_position(boxes, scores, image_size, axis='x', min_score_thresh=.1):

    left_value = 0
    center_value = 0
    right_value = 0

    for i in range(len(boxes[0])):
      if scores[0][i] > min_score_thresh:
            y1, x1, y2, x2 = boxes[0][i]

            if axis == 'x':
                center = (x1 + x2) / 2
            elif axis == 'y':
                center = (y1 + y2) / 2
            else:
                raise ValueError("Invalid axis value. Must be 'x' or 'y'.")

            box_width = x2 - x1
            box_height = y2 - y1

            if center < 0.5 :
                left_value += box_width * box_height * image_size[0] * image_size[1]
            if center > 0.5 :
                right_value += box_width * box_height * image_size[0] * image_size[1]
            if center < 0.66 and center > 0.33:
                center_value += box_width * box_height * image_size[0] * image_size[1]

    return left_value, center_value, right_value

def write_position_square(boxes, scores, image_size, min_score_thresh=.1):
    left_value = 0
    center_value = 0
    right_value = 0
    up_value = 0
    down_value = 0

    for i in range(len(boxes[0])):
      if scores[0][i] > min_score_thresh:
            y1, x1, y2, x2 = boxes[0][i]

            center_x = (x1 + x2) / 2
            center_y = (y1 + y2) / 2
            
            box_width = x2 - x1
            box_height = y2 - y1
            
            score = box_width * box_height * image_size[0] * image_size[1]

            if center_x < 0.5 :
                left_value += score
            if center_x > 0.5 :
                right_value += score
            if center_x < 0.66 and center_x > 0.33 and center_y < 0.66 and center_y > 0.33:
                center_value += score
            if center_y < 0.5 :
                up_value += score
            if center_y > 0.5 :
                down_value += score

    return left_value, center_value, right_value, up_value, down_value

def transparency2(before_image, direction):
    # 이미지 파일 열기
    image = before_image

    # 이미지를 RGBA 모드로 변환 (알파 채널이 없는 경우에도 작동하도록 함)
    image = image.convert('RGBA')

    # 픽셀 단위로 투명도 변경
    width, height = image.size
    new_image_data = []
    factor = 0.0032  # 값이 낮으면 범위가 증가
    min_alpha = 65  # 최소 투명도 (0에서 255 사이의 값으로 설정)
    middle_w = width * 2 // 3
    middle_h = height * 2 // 3

    sigma = 1
    for y in range(height):
        for x in range(width):
            item = image.getpixel((x, y))
            if direction == "right" :
                alpha = int(255-(255-min_alpha)*gaussian(factor * x+ (1-factor) * middle_w, middle_w, sigma)/gaussian(middle_w, middle_w, sigma))
            elif direction == "left" :
                alpha = int(255-(255-min_alpha)*gaussian(factor * (width-x)+ (1-factor) * middle_w, middle_w, sigma)/gaussian(middle_w, middle_w, sigma))
            elif direction == "up" :
                alpha = int(255-(255-min_alpha)*gaussian(factor * y+ (1-factor) * middle_h, middle_h, sigma)/gaussian(middle_h, middle_h, sigma))
            elif direction == "down" :
                alpha = int(255-(255-min_alpha)*gaussian(factor * (height-y)+ (1-factor) * middle_h, middle_h, sigma)/gaussian(middle_h, middle_h, sigma))
            else :
                alpha = int(255 - (255-min_alpha) * gaussian_2d(factor * x+ (1-factor) * (width // 2), factor * y+ (1-factor) * (height // 2), width // 2, height // 2, sigma, sigma) / gaussian_2d(width // 2, height // 2, width // 2, height // 2, sigma, sigma))

            new_image_data.append((item[0], item[1], item[2], alpha))

    # 새로운 이미지 생성
    new_image = Image.new('RGBA', image.size)
    new_image.putdata(new_image_data)

    new_image.save("transparency.png")

    # 결과 이미지 저장 및 출력
    return new_image


def gaussian(x, mu, sigma):
    return (1 / (sigma * np.sqrt(2 * np.pi))) * np.exp(-((x - mu) ** 2) / (2 * sigma ** 2))

def gaussian_2d(x, y, mu_x, mu_y, sigma_x, sigma_y):
    term1 = 1 / (2 * np.pi * sigma_x * sigma_y)
    term2 = np.exp(-((x - mu_x) ** 2) / (2 * sigma_x ** 2))
    term3 = np.exp(-((y - mu_y) ** 2) / (2 * sigma_y ** 2))
    return term1 * term2 * term3
