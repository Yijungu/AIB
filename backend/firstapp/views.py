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
from .makeWebBanner import makeWebBanner

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

        makeWebBanner(product, texts, size, purposes)

        # Get the list of generated image files
        image_files = [f for f in os.listdir() if f.startswith('WebBanner_')]

        return render(request, 'result.html', {'image_files': image_files})

    return render(request, 'test.html')

@csrf_exempt
def request_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        concept = data['concept']
        include = data['include']
        contents = data['contents']
    
        logo_picture = data['logo'] #사진은 어떤 타입으로 전송받아야되는지 모름
        product_picture = data['product'] #사진은 어떤 타입으로 전송받아야되는지 모름

        #logo_picture 와 product_picture이 하나라도 있는 경우
        if logo_picture != None or product_picture != None :

            background_color_arr, text_color_arr = find_color(logo_picture, product_picture)
            response_data = {
                'background_color': background_color_arr,
                'text_color': text_color_arr
            }
            return JsonResponse(response_data)
            #전달

        else :
            # stable diffusion에서 만든 원본 사진 + 텍스트 색깔 => 배열로
            texts = []
            purpose = []

            for i in range(len(contents)):
                texts.append(contents[i]['comment'])    
                purpose.append(contents[i]['select'])

            image, changed_texts, position, font_size, kerning, alignments = makeWebBanner(concept, texts, include, purpose) #color, picture 추가해야함

            img_io = io.BytesIO()
            image.save(img_io, format='PNG')
            image_base64 = base64.b64encode(img_io.getvalue()).decode('utf-8')

            response_data = {
                'image': image_base64,
                'changed_texts': changed_texts,
                'position': position,
                'font_size': font_size,
                'kerning': kerning,
                'alignments': alignments
            }

            return JsonResponse(response_data)
        

        """
        image_files = ['test1.png', 'test2.png', 'best.png']  # 이미지 파일들의 경로 리스트
    
        encoded_images = []
        for file_path in image_files:
            with open(file_path, 'rb') as image_file:
                encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
                mime_type = 'png'  # 이미지 타입에 맞게 설정
                data_uri = f'data:{mime_type};base64,{encoded_image}'
                encoded_images.append(data_uri)
        return JsonResponse({'images': encoded_images})
        """
    else:
        print("bad")
        # POST 요청이 아닌 경우, 에러 메시지를 보냅니다.
        return JsonResponse({'error': 'Invalid method'}, status=    400)



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
    



