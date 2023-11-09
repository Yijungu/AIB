import openai
from .makeGPT import *
from .backgroundColor import *

from django.shortcuts import render, HttpResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404, JsonResponse, FileResponse
from django.views.decorators.csrf import csrf_exempt

from .serializers import TextBoxSerializer, TemplateSerializer
from .models import TextBox,Template
from .makeWebBanner import makeWebBannerImage, makeWebBannerPicture
from django.core.files.storage import default_storage
from PIL import Image

import io
import os
import json
import base64
# Create your views here.

def fetch_all_textboxes_and_templates():
    all_textboxes = TextBox.objects.all()
    all_templates = Template.objects.all()

    return all_textboxes, all_templates

def example_view(request):
    all_textboxes, all_templates = fetch_all_textboxes_and_templates()

    context = {
        'all_textboxes': all_textboxes,
        'all_templates': all_templates
    }
    return render(request, 'example_template.html', context)

def test_view(request):
    if request.method == "POST":
        product = request.POST.get('product')
        size = request.POST.get('size')
        purposes = request.POST.get('purposes').split(',')
        texts = request.POST.get('texts').split(',')

        makeWebBannerImage(product, texts, size, purposes)

        # Get the list of generated image files
        image_files = [f for f in os.listdir() if f.startswith('WebBanner_')]

        return render(request, 'result.html', {'image_files': image_files})

    return render(request, 'test.html')

@csrf_exempt
def request_view(request):
     if request.method == 'POST':
        if request.content_type == 'application/json':
            data = json.loads(request.body)
            concept = data.get('concept')
            include = data.get('include')
            contents = data.get('contents', [])
        else:
            concept = request.POST.get('concept')
            include = request.POST.get('include')
            contents = json.loads(request.POST.get('contents', '[]'))
        
        logo_picture = request.FILES.get('logo')
        product_picture = request.FILES.get('product')

        if isinstance(contents, str):
            contents = json.loads(contents)
        texts = []
        purpose = []
        for content in contents:
            texts.append(content['comment'])
            purpose.append(content['select'])
        image, changed_texts, position, font_size, kerning, alignments, text_color = makeWebBannerImage(concept, texts, include, purpose) #color, picture 추가해야함
        img_io = io.BytesIO()
        image.save(img_io, format='PNG')
        image_base64 = base64.b64encode(img_io.getvalue()).decode('utf-8')
        response_data = {
            'image': image_base64,
            'changed_texts': changed_texts,
            'position': position,
            'font_size': font_size,
            'kerning': kerning,
            'alignments': alignments,
            'text_color' : text_color
        }
        return JsonResponse(response_data)
        

def request_picture_view(request):
    if request.method == 'POST':
        if request.content_type == 'application/json':
            data = json.loads(request.body)
            concept = data.get('concept')
            include = data.get('include')
            contents = data.get('contents', [])
        else:
            concept = request.POST.get('concept')
            include = request.POST.get('include')
            contents = json.loads(request.POST.get('contents', '[]'))
        
        logo_picture = request.FILES.get('logo')
        product_picture = request.FILES.get('product')

        

        if isinstance(contents, str):
            contents = json.loads(contents)
        texts = []
        purpose = []
        for content in contents:
            texts.append(content['comment'])
            purpose.append(content['select'])
        background_color_arr, text_color_arr = find_color(logo_picture, product_picture)
        changed_texts, position, font_size, kerning, alignments = makeWebBannerPicture(concept, texts, include, purpose)
        response_data = {
            'background_color': background_color_arr,
            'text_color': text_color_arr,
            'changed_texts': changed_texts,
            'position': position,
            'font_size': font_size,
            'kerning': kerning,
            'alignments': alignments,
        }
        return JsonResponse(response_data)



# class TextboxList(APIView):

#     def post(self, request):
#         serializer = TemplateSerializer(
#             data=request.data
#         )
#         if serializer.is_valid():
#             """answer = makeGPT(request)
#             print("GPT에서 나온 대답은 : " + answer)"""
#             makeStableDiffusion("Shopping discount, painting, advertisement")
 
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



