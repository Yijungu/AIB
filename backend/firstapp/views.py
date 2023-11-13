from .makeGPT import *
from .backgroundColor import *

from django.shortcuts import render, HttpResponse
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

        # makeWebBannerImage(product, texts, size, purposes)

        # Get the list of generated image files
        image_files = [f for f in os.listdir() if f.startswith('WebBanner_')]

        return render(request, 'result.html', {'image_files': image_files})

    return render(request, 'test.html')

@csrf_exempt
def request_view(request):
     if request.method == 'POST':
        description = request.POST.get('description')
        width = request.POST.get('width')
        height = request.POST.get('height')
        color = request.POST.get('color')
        # 파일은 request.FILES를 통해 접근합니다.
        logo_image_file = request.FILES.get('logoImageFile')
        image_file = request.FILES.get('imageFile')
        dynamic_inputs_str = request.POST.get('dynamicInputs')

        print("Description:", description)
        print("Width:", width)
        print("Height:", height)
        print("Color:", color)

        # 파일 출력
        if logo_image_file:
            print("Logo Image File:", logo_image_file.name)
        if image_file:
            print("Image File:", image_file.name)

        # JSON 문자열 출력
        print("Dynamic Inputs:", dynamic_inputs_str)

        texts = []
        purpose = []
        
        # dynamicInputs가 제공되었는지 확인합니다.
        if dynamic_inputs_str:
            dynamic_inputs = json.loads(dynamic_inputs_str)

            # 각 항목에서 name과 value를 추출하여 배열에 저장합니다.
            for item in dynamic_inputs:
                texts.append(item.get('name'))
                purpose.append(item.get('value'))

        size = width, ":", height
        
        webBannerImages, changed_texts, positions, fontsizes, kernings, alignments, text_colors_for_all_images = makeWebBannerImage(description, texts, size, purpose) #color, picture 추가해야함
        
        base64_images = []
        for img in webBannerImages:
            img_io = io.BytesIO()
            img.save(img_io, format='PNG')
            img_io.seek(0)
            image_base64 = base64.b64encode(img_io.getvalue()).decode('utf-8')
            base64_images.append(image_base64)

        # changed_texts = ["AIB 프로젝트의", "데모버젼 실험 데이터", "성공 기원"]
        # position = [(400,200), (500,250), (800,340)]
        # font_size = [50, 25, 20]
        # kerning = [0.325, 0.793, 0.842]
        # alignments = ["left"]
        # text_color = [(30,43,103), (255,212,0), (191,255,0)]
        response_data = {
            'image': base64_images,
            'changed_texts': changed_texts,
            'position': positions,
            'font_size': fontsizes,
            'kerning': kernings,
            'alignments': alignments,
            'text_color' : text_colors_for_all_images
        }
        return JsonResponse(response_data)
        
@csrf_exempt
def request_picture_view(request):
    if request.method == 'POST':
        description = request.POST.get('description')
        width = request.POST.get('width')
        height = request.POST.get('height')
        color = request.POST.get('color')
        # 파일은 request.FILES를 통해 접근합니다.
        logo_image_file = request.FILES.get('logoImageFile')
        image_file = request.FILES.get('imageFile')
        dynamic_inputs_str = request.POST.get('dynamicInputs')

        print("Description:", description)
        print("Width:", width)
        print("Height:", height)
        print("Color:", color)

        # 파일 출력
        if logo_image_file:
            print("Logo Image File:", logo_image_file.name)
        if image_file:
            print("Image File:", image_file.name)

        # JSON 문자열 출력
        print("Dynamic Inputs:", dynamic_inputs_str)

        texts = []
        purpose = []
        
        # dynamicInputs가 제공되었는지 확인합니다.
        if dynamic_inputs_str:
            dynamic_inputs = json.loads(dynamic_inputs_str)

            # 각 항목에서 name과 value를 추출하여 배열에 저장합니다.
            for item in dynamic_inputs:
                texts.append(item.get('name'))
                purpose.append(item.get('value'))

        size = width, ":", height

        background_color_arr, text_color_arr = find_color(logo_image_file, image_file)
        changed_texts, positions, fontsizes, kernings, alignments= makeWebBannerPicture(description, texts, include, purpose)
        # changed_texts = ["AIB 프로젝트의", "데모버젼 실험 데이터", "성공 기원"]
        # position = [(400,200), (500,250), (800,340)]
        # font_size = [50, 25, 20]
        # kerning = [0.325, 0.793, 0.842]
        # alignments = ["left"]
        response_data = {
            'background_color': background_color_arr,
            'text_color': text_color_arr,
            'changed_texts': changed_texts,
            'position': positions,
            'font_size': fontsizes,
            'kerning': kernings,
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
    



