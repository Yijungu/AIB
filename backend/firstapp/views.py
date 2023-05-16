import openai

from django.shortcuts import render, HttpResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404, JsonResponse

from django.views.decorators.csrf import csrf_exempt

from .serializers import TextBoxSerializer, TemplateSerializer
from .models import TextBox,Template
from .api import makeGPT, makeStableDiffusion
from .api import get_templates_and_textboxes
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
    if request.method == 'POST':
        input_size = request.POST['size']
        purpose_list = request.POST['purposes'].split(',')
        textboxes_for_templates, valid_template_ids, input_size = get_templates_and_textboxes(input_size, purpose_list)
        return render(request, 'result.html', {'textboxes_for_templates': textboxes_for_templates, 'valid_template_ids': valid_template_ids})
    else:
        return render(request, 'test.html')

class TextboxList(APIView):

    def post(self, request):
        serializer = TemplateSerializer(
            data=request.data
        )
        if serializer.is_valid():
            """answer = makeGPT(request)
            print("GPT에서 나온 대답은 : " + answer)"""
            makeStableDiffusion("Shopping discount, painting, advertisement")
 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



