FROM python:3.10.6

# 이미지 내에서 명령어를 실행할(현 위치로 잡을) 디렉토리 설정
WORKDIR /usr/src/app

# 이미지 생성 과정에서 실행할 명령어
RUN pip install Django
RUN django-admin startproject trydjango
RUN pip install django-cors-headers
RUN pip install djangorestframework

# 컨테이너 실행시 실행할 명령어
CMD ["python", "manage.py", "makemigrations"]
CMD ["python", "manage.py", "migrate"]
CMD ["python", "manage.py", "createsuperuser"]
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

# 이미지 생성 명령어 (현 파일과 같은 디렉토리에서) gg
# docker build -t {이미지명} .

# 컨테이너 생성 & 실행 명령어
# docker run --name {컨테이너명} -v $(pwd):/usr/src/app -p 5000:5000 {이미지명}