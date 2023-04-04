import openai

from django.shortcuts import render, HttpResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404, JsonResponse

from django.views.decorators.csrf import csrf_exempt

from .serializers import ReviewSerializer
from .models import Review
# Create your views here.

# chatGPT API 정보
openai.api_key = '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'
model = 'text-davinci-003'

# client로 정보를 전송하는 역할, index는 그냥 이름 바꿔도 상관x
# parameter의 인자로 요청과 관련된 여러 정보를 들어오도록 약속된 객체를 전송
def index(request): # 특정한 경로가 없는 경우 http://127.0.0.1:8000/
    # 처리한 결과를 client로 보내줄 때 return을 사용
    # Http를 이용해서 응답하기 위해 HttpResponse객체를 사용
    return HttpResponse('''
        <html>
            Hello, Django
        </html>
    ''')

class ReviewList(APIView):
    def get(self, request):
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ReviewSerializer(
            data=request.data
        )
        if serializer.is_valid():
            # 데이터 받는 방법
            print(request.data['concept'])
            print(request.data['include'])
            print(request.data['color'])
            '''
            # chatGPT 연결
            response = openai.Completion.create(
                prompt = request.data['concept'],
                model = model,
                max_tokens = 1000,
                temperature = 0.9,
            )
            for result in response.choices:
                print(result.text)
            '''
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReviewDetail(APIView):
    def get_object(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            raise Http404
        
    def get(self, request, pk, format=None):
        review = self.get_object(pk)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)
        
    def put(self, request, pk, format=None):
        review = self.get_object(pk)
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        review = self.get_object(pk)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
