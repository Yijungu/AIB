import os
import openai

from .views import *
from .serializers import ReviewSerializer

openai.api_key = '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'
model = 'text-davinci-003'

def makeGPT(request) :

    # chatGPT 연결
    response = openai.Completion.create(
        prompt = request.data['concept'],
        model = model
    )
    for result in response.choices:
        return(result.text)


def makeStableDiffusion(request) :
    print(request.data['concept'])
    print(request.data['include'])
    print(request.data['color'])

    # chatGPT 연결
    response = openai.Completion.create(
        prompt = request.data['concept'],
        model = model
    )
    for result in response.choices:
        print(result.text)