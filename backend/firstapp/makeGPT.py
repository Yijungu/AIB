import openai

openai.api_key = "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"
gptModel = "gpt-3.5-turbo"


def translation(product) :
    # chatGPT 연결
    response = openai.Completion.create(
        prompt = (product + "를 영어 단어 하나로 해석해줘"),
        model = gptModel
    )
    for result in response.choices:
        print(result.text)

def line_breaker(text, line_break) :
    # chatGPT 연결
    line_break = 2
    messages = []
    answer = text + "문장을" + str(line_break) + "줄로 줄바꿈 해줘"
    messages.append({"role" : "user", "content": answer})
    completion = openai.ChatCompletion.create(
      model = "gpt-3.5-turbo",
      messages = messages
    )

    chat_response = completion.choices[0].message.content
    print(chat_response)
    return chat_response