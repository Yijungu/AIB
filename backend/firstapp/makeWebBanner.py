from .makeImage import *
from .makeTemplate import *

def makeWebBanner(product, texts, size, purposes):
    width, height = map(int, size.split(':'))
    webBannerImage = makeStableDiffusion(product, width, height)
    axis = calculate_axis(width, height)
    direction = detect(webBannerImage, axis) if axis != 'square' else detect_square(webBannerImage)
    # direction의 값은 left(up) center right(down) 중 하나
    webBannerImage = transparency2(webBannerImage, direction)
    webBannerImage = add_white_background(webBannerImage)
    textOnImage(webBannerImage, texts, size, purposes)

def calculate_axis(width, height):
    # Split the input size into width and height and calculate the ratio
    input_ratio = width / height

    if input_ratio > 1.857:
        return 'x'
    elif input_ratio < 0.538:
        return 'y'
    else :
        return 'square'
   