import torch

from transformers import pipeline
from .makeGPT import *
from .makeImage import *
from .makeTemplate import *
from .backgroundColor import *

def makeWebBannerImage(product, texts, size, purposes): #color, picture 인자 추가해야함
    texts, purposes = ordered(texts, purposes)
    width, height = map(int, size.split(':'))
    webBannerImage = makeStableDiffusion(product, width, height)

    text_color = find_text_color(webBannerImage)

    #webBannerImage = Image.open("makeStableDiffusion.png")
    axis = calculate_axis(width, height)
    direction = detect(webBannerImage, axis) if axis != 'square' else detect_square(webBannerImage)
    # direction의 값은 left(up) center right(down) 중 하나
    webBannerImage = transparency2(webBannerImage, direction, axis)
    webBannerImage = add_white_background(webBannerImage)
    
    # direction = 'right'
    image, changed_texts, position, fontsize, kerning, alignments = textOnImage(webBannerImage, texts, size, purposes, direction)
    image.save("webBannerImage최종.png")
    # direction = 'right'
    return image, changed_texts, position, fontsize, kerning, alignments, text_color

def makeWebBannerPicture(product, texts, size, purposes): #color, picture 인자 추가해야함
    texts, purposes = ordered(texts, purposes)
    width, height = map(int, size.split(':'))

    #webBannerImage = Image.open("makeStableDiffusion.png")
    axis = calculate_axis(width, height)
    # direction의 값은 left(up) center right(down) 중 하나
    
    # direction = 'right'
    image, changed_texts, position, fontsize, kerning, alignments = textOnImage(np.zeros((width, height)), texts, size, purposes, 'right')
    
    # direction = 'right'
    return changed_texts, position, fontsize, kerning, alignments

def calculate_axis(width, height):
    # Split the input size into width and height and calculate the ratio
    input_ratio = width / height

    if input_ratio > 1.857:
        return 'x'
    elif input_ratio < 0.538:
        return 'y'
    else :
        return 'square'

def ordered(texts, purposes):
    order = ["큰 홍보문구", "작은 홍보문구", "상세 설명", "시간&장소"]

    # 주어진 순서에 따라 purposes와 texts를 함께 정렬
    sorted_pairs = sorted(zip(purposes, texts), key=lambda x: order.index(x[0]))

    # 정렬된 쌍들로부터 다시 purposes와 texts를 분리
    sorted_purposes, sorted_texts = zip(*sorted_pairs)

    return list(sorted_texts), list(sorted_purposes)

def replace_elements(input_list):
    mapping_dict = {
        'big_comment': "큰 홍보문구",
        'small_comment': "작은 홍보문구",
        'description': "상세 설명",
        'time_space': "시간&장소",
    }

    return [mapping_dict[element] for element in input_list]