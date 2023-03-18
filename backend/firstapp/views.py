from django.shortcuts import render, HttpResponse

# Create your views here.

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

def create(request): # 경로가 http://127.0.0.1:8000/create/ 인 경우
    return HttpResponse('Create')

def read(request, id):   # 경로가 가변적인 경우 인자 id를 추가
    return HttpResponse('read' + id)