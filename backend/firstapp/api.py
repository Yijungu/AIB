import os
import openai
import torch, gc
import numpy as np
import cv2
import math

import tensorflow as tf
import tensorflow_hub as hub

from scipy.stats import norm
from PIL import Image, ImageDraw, ImageFont
from .views import *
from .serializers import TemplateSerializer
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler

from django.http import HttpRequest
from collections import Counter
from django.db.models import Prefetch

#openai.api_key = 
gptModel = 'text-davinci-003'
model_id = "runwayml/stable-diffusion-v1-5"

MODEL_URL = "https://tfhub.dev/tensorflow/efficientdet/d2/1"
detectModel = hub.load(MODEL_URL)

def makeWebBanner(product, texts, size, purposes):
    width, height = map(int, size.split(':'))
    webBannerImage = makeStableDiffusion(product, width, height)
    axis = 'x' if width > height else 'y'
    direction = detect(webBannerImage, axis)
    webBannerImage = transparency2(webBannerImage, direction)
    webBannerImage = add_white_background(webBannerImage)
    textOnImage(webBannerImage, texts, size, purposes)


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

    prompt = answer

    image = pipe(prompt, height=height, width=width, 
                negative_prompt="text box, "+"people, "+"person, "+"face", guidance_scale=4).images[0]
    
    return image



def add_white_background(before_img):
    # 이미지 사이즈를 가져옵니다.
    image = before_img

    width, height = image.size

    # 새로운 흰색 배경 이미지 생성
    white_background = Image.new('RGBA', (width, height), (240, 240, 240, 255))

    # 원본 이미지를 흰색 배경 이미지 위에 붙여넣기 (알파 채널 값에 따라 투명도를 적용)
    white_background.alpha_composite(image)

    return white_background

import numpy as np

def textOnImage(before_img, texts, size, required_purposes):
    # Parsing width and height from size
    width, height = map(int, size.split(':'))

    # Calling the function to get templates and textboxes
    textboxes_for_templates, valid_template_ids, closest_size = get_templates_and_textboxes(size, required_purposes)

    # If there are no valid templates, return immediately
    if not valid_template_ids:
        print('No valid templates found.')
        return

    # Create images for each valid template
    for template_id in valid_template_ids:
        # Corresponding textboxes for the current template
        textboxes = textboxes_for_templates[template_id]

        # Get positions and font sizes for each textbox
        positions = []
        font_sizes = []
        alignments = []
        for textbox in textboxes:
            position, font_size = template(width, height, (textbox.textbox_x, textbox.textbox_y), textbox.font_size, closest_size)
            positions.append(position)
            font_sizes.append(font_size)
            alignments.append(textbox.width_sort)

        image = before_img
        draw  = ImageDraw.Draw(image)

        # Font settings
        font_path = 'Hancom_Gothic_Bold.ttf'
        kerning = [2.9696 - 1.5565 *np.log(x) for x in font_sizes]

        # Text drawing
        for i in range(len(texts)):
            font = ImageFont.truetype(font_path, font_sizes[i])
            (x, y) = positions[i]
            alignment = alignments[i]
            lines = texts[i].split('n')
            for line in lines:
                x_start = x
                # Different handling based on the alignment
                if alignment == "left":
                    for char in line:
                        draw.text((x, y), char, font=font, fill=(0, 0, 0))
                        x += font.getsize(char)[0] + kerning[i]
                elif alignment == "right":
                    for char in reversed(line):
                        x -= font.getsize(char)[0] + kerning[i]
                        draw.text((x, y), char, font=font, fill=(0, 0, 0))
                elif alignment == "center":
                    line_width = sum(font.getsize(char)[0] + kerning[i] for char in line)
                    x_start -= line_width / 2
                    for char in line:
                        draw.text((x_start, y), char, font=font, fill=(0, 0, 0))
                        x_start += font.getsize(char)[0] + kerning[i]
                y += font.getsize('가')[1]
                x = x_start

        # Save image with a unique filename
        image.save(f'WebBanner_{template_id}.png')




def detect(image_data, axis):
    image_np = np.fromstring(image_data, np.uint8)
    image = cv2.imdecode(image_np, cv2.IMREAD_COLOR)

    boxes, scores, classes = detect_objects(image)
    weighted_center = weighted_center_of_mass(boxes, scores, image.shape, axis)

    if weighted_center is not None:
        if weighted_center < 0.5:
            return 'left' if axis == 'x' else 'up'
        else:
            return "right" if axis == 'x' else 'down'
    else:
        return "left"


def detect_objects(image):
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image_np = np.expand_dims(image_rgb, axis=0)

    # 객체 감지 모델 로드

    # 객체 감지 실행
    result = detectModel(image_np)

    # 결과를 NumPy 배열로 변환
    boxes = result["detection_boxes"].numpy()
    scores = result["detection_scores"].numpy()
    print(boxes.shape)
    classes = result["detection_classes"].numpy().astype(np.int32)

    return boxes, scores, classes

def weighted_center_of_mass(boxes, scores, image_size, axis='x', min_score_thresh=.1):
    weighted_center = 0
    total_weight = 0

    for i in range(len(boxes[0])):
      print(scores[0][i])
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
            box_area = box_width * box_height * image_size[0] * image_size[1]
            weighted_center += center * box_area
            total_weight += box_area

    if total_weight > 0:
        weighted_center /= total_weight
    else:
        if axis == 'x':
            weighted_center = image_size[1] / 2
        else:
            weighted_center = image_size[0] / 2

    return weighted_center

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
            if direction == "left" :
                alpha = int(255-(255-min_alpha)*gaussian(factor * x+ (1-factor) * middle_w, middle_w, sigma)/gaussian(middle_w, middle_w, sigma))
            elif direction == "right" :
                alpha = int(255-(255-min_alpha)*gaussian(factor * (width-x)+ (1-factor) * middle_w, middle_w, sigma)/gaussian(middle_w, middle_w, sigma))
            elif direction == "down" :
                alpha = int(255-(255-min_alpha)*gaussian(factor * y+ (1-factor) * middle_h, middle_h, sigma)/gaussian(middle_h, middle_h, sigma))
            else : 
                alpha = int(255-(255-min_alpha)*gaussian(factor * (height-y)+ (1-factor) * middle_h, middle_h, sigma)/gaussian(middle_h, middle_h, sigma))

            new_image_data.append((item[0], item[1], item[2], alpha))

    # 새로운 이미지 생성
    new_image = Image.new('RGBA', image.size)
    new_image.putdata(new_image_data)

    # 결과 이미지 저장 및 출력
    return new_image


def gaussian(x, mu, sigma):
    return (1 / (sigma * np.sqrt(2 * np.pi))) * np.exp(-((x - mu) ** 2) / (2 * sigma ** 2))


def template(width, height, position, fontsize, size_ratio):
    if size_ratio == "1000:200":
        ref_width, ref_height = 1000, 200
    elif size_ratio == "600:400":
        ref_width, ref_height = 600, 400
    elif size_ratio == "400:600":
        ref_width, ref_height = 400, 600
    elif size_ratio == "200:1000":
        ref_width, ref_height = 200, 1000
    else:
        raise ValueError(f"Unknown size ratio: {size_ratio}")

    position = (math.ceil(width/ref_width * position[0]), math.ceil(height/ref_height * position[1]))
    fontsize = math.ceil(height/ref_height * fontsize)

    return position, fontsize


def get_templates_and_textboxes(template_size, purpose_list):
    # Get the number of textboxes from the length of the purpose list
    textbox_number = len(purpose_list)

    closest_size = get_nearest_size(template_size)

    # Get all templates that match the condition
    templates = Template.objects.filter(textbox_number=textbox_number, template_size=closest_size)

    # Get the template IDs
    template_ids = templates.values_list('template_id', flat=True)

    # Create a dictionary to store the TextBoxes for each template
    textboxes_for_templates = {}

    # Create a list to store the template IDs that meet the condition
    valid_template_ids = []

    # Get the TextBoxes for each template and check if the purposes match
    for template_id in template_ids:
        textboxes = TextBox.objects.filter(template_id=template_id)
        textboxes_for_templates[template_id] = list(textboxes)
        
        # Get the purposes of the TextBoxes for this template
        purposes = [textbox.purpose for textbox in textboxes]
        
        # Check if the purposes match the required ones
        if Counter(purposes) == Counter(purpose_list):
            valid_template_ids.append(template_id)

    return textboxes_for_templates, valid_template_ids, closest_size

def get_nearest_size(input_size):
    # Split the input size into width and height and calculate the ratio
    width, height = map(int, input_size.split(':'))
    input_ratio = width / height

    # Define the possible sizes and calculate their ratios
    possible_sizes = ["1000:200", "600:400", "400:600", "200:1000"]
    size_ratios = {size: int(size.split(':')[0]) / int(size.split(':')[1]) for size in possible_sizes}

    # Find the size with the closest ratio to the input ratio
    closest_size = min(size_ratios, key=lambda size: abs(size_ratios[size] - input_ratio))

    return closest_size
