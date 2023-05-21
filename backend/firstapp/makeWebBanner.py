from .makeImage import *
from .makeTemplate import *

def makeWebBanner(product, texts, size, purposes):
    width, height = map(int, size.split(':'))
    webBannerImage = makeStableDiffusion(product, width, height)
    axis = 'x' if width > height else 'y'
    direction = detect(webBannerImage, axis)
    webBannerImage = transparency2(webBannerImage, direction)
    webBannerImage = add_white_background(webBannerImage)
    textOnImage(webBannerImage, texts, size, purposes)