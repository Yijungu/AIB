import openai

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
        print(concept,include,contents)
        # 이제 concept, include, contents를 사용하여 필요한 작업을 수행할 수 있습니다.

        img = Image.open("makeStableDiffusion.png")
        img_io = io.BytesIO()
        img.save(img_io, 'PNG')
        img_io.seek(0)


        # 작업이 끝나면, JsonResponse를 사용하여 응답을 보냅니다.
        return FileResponse(img_io, content_type='png')

    else:
        # POST 요청이 아닌 경우, 에러 메시지를 보냅니다.
        return JsonResponse({'error': 'Invalid method'}, status=400)



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
    



