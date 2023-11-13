from colorthief import ColorThief
import colorsys
import matplotlib.pyplot as plt
from PIL import Image, ImageDraw, ImageFont, ImageStat
from scipy.spatial.distance import cdist
from scipy.spatial.distance import euclidean
import numpy as np
from io import BytesIO

def get_common_dominant_colors(image1=None, image2=None, n_colors=3):
    if image2 != None:
        dominant_colors1 = get_dominant_colors(image1, n_colors=200) # Find 6 dominant colors
        dominant_colors2 = get_dominant_colors(image2, n_colors=200)
        uncommon_dominant_colors = dominant_colors1 + dominant_colors2
    else:
        dominant_colors1 = get_dominant_colors(image1, n_colors=200) # Find 6 dominant colors
        uncommon_dominant_colors = dominant_colors1
    # Retrieve the farthest dominant colors from the second image
    uncommon_dominant_colors = remove_similar_colors(uncommon_dominant_colors, 120)

    # Select the top 3 uncommon dominant colors
    selected_uncommon_colors = uncommon_dominant_colors[:6] # Example: selecting the first 3

    return selected_uncommon_colors

def get_dominant_colors(image_path, n_colors=6): # Limit to 6 colors
    color_thief = ColorThief(image_path)
    dominant_colors = color_thief.get_palette(color_count=n_colors, quality=1)
    return dominant_colors

def get_split_complementary_colors(color):
    # Same as before, but with adjusted angles
    r, g, b = color
    # r, g, b = adjust_lightness_and_saturation((r, g, b), 0.1, 0.1)  # Adjusting lightness and saturation
    r /= 255
    g /= 255
    b /= 255
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    colors = []
    for i in [0]:   # Slightly adjusted angles
        h_i = (h + i) % 1
        r, g, b = colorsys.hls_to_rgb(h_i, l, s)
        colors.append((int(r * 255), int(g * 255), int(b * 255)))
    return colors

def recommend_text_color_complementary(background_color):
    R, G, B = background_color[:3]
    r, g, b = R/255.0, G/255.0, B/255.0

    # Convert RGB to HSV
    h, s, v = colorsys.rgb_to_hsv(r, g, b)

    # Compute complementary color by adding 0.5 (180 degrees in a color wheel)
    h_complementary = (h + 0.05) % 1.0
    if v < 0.5:
        v_complementary = v + 0.8
    
    else:
        v_complementary = v - 0.8

    r, g, b = colorsys.hsv_to_rgb(h_complementary, s, v_complementary)
    R, G, B = int(r * 255), int(g * 255), int(b * 255)
    return (R, G, B)

def remove_similar_colors(colors, threshold=1):
    unique_colors = []
    for color in colors:
        if all(not is_similar(color, unique_color, threshold) for unique_color in unique_colors):
            unique_colors.append(color)
    return unique_colors


def is_similar(color1, color2, threshold=1):
    return euclidean(color1, color2) < threshold


def find_color(image1_file=None, image2_file=None):
    if image1_file is not None:
        image1 = Image.open(image1_file)
    if image2_file is not None:
        image2 = Image.open(image2_file)

    with BytesIO() as temp_io1, BytesIO() as temp_io2:
        image1.save(temp_io1, format='PNG')
        temp_io1.seek(0)
        if image2 == None : 
            image2.save(temp_io2, format='PNG')
            temp_io2.seek(0)
            dominant_colors = get_common_dominant_colors(temp_io1, temp_io2, n_colors=3)  
        else:
            dominant_colors = get_common_dominant_colors(temp_io1, n_colors=3)  

        background_color_arr = []
        text_color_arr = [] 
        for color in dominant_colors:
            colors = get_split_complementary_colors(color)    
            text_color = recommend_text_color_complementary(colors[0])
            background_color_arr.append(colors[0])
            text_color_arr.append(text_color)

    return background_color_arr, text_color_arr

def find_text_color(background_images):
    text_colors_for_all_images = []

    for bg_image in background_images:
        with BytesIO() as temp_io:
            bg_image.save(temp_io, format='PNG')
            temp_io.seek(0)
            dominant_colors = get_common_dominant_colors(temp_io, n_colors=3)     
            text_color_arr = []    
            for color in dominant_colors:   
                text_color = recommend_text_color_complementary(color)
                text_color_arr.append(text_color)

            text_colors_for_all_images.append(text_color_arr)

    return text_colors_for_all_images