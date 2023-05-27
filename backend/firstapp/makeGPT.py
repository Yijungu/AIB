import openai

openai.api_key = "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"
gptModel = 'text-davinci-003'


def translation(product) :
    # chatGPT 연결
    response = openai.Completion.create(
        prompt = (product + "를 영어 단어 하나로 해석해줘"),
        model = gptModel
    )
    for result in response.choices:
        return(result.text)

def line_breaker(text, line_break) :
    # chatGPT 연결
    response = openai.Completion.create(
        prompt = (text + "문장을 가장 자연스러운" + line_break + "줄로 바꾸고 싶어 줄바꿈이 일어날 때 마다 \n을 추가해줘"),
        model = gptModel
    )
    for result in response.choices:
        return(result.text)