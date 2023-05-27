FROM python:3.10.6

# 이미지 내에서 명령어를 실행할(현 위치로 잡을) 디렉토리 설정
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN pip install --upgrade pip
RUN pip install Django
RUN django-admin startproject trydjango
RUN pip install django-cors-headers
RUN pip install djangorestframework
RUN pip install openai
RUN pip install diffusers transformers accelerate scipy safetensors
RUN pip install opencv-python
RUN pip install torchvision
RUN pip install pillow
RUN pip install tensorflow
RUN pip install tensorflow-hub
RUN pip install scipy
RUN pip install mysqlclient
RUN pip install "accelerate>=0.16.0,<1" "transformers[torch]>=4.28.1,<5" "torch>=1.13.1,<2"
RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx

ENV NVIDIA_DRIVER_CAPABILITIES=compute,utility
ENV NVIDIA_VISIBLE_DEVICES=all
LABEL com.nvidia.volumes.needed="nvidia_driver"

# 컨테이너 실행시 실행할 명령어

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]


# 이미지 생성 명령어 (현 파일과 같은 디렉토리에서) gg
# docker build -t {이미지명} .

# 컨테이너 생성 & 실행 명령어
# docker run --name {컨테이너명} -v $(pwd):/usr/src/app -p 5000:5000 {이미지명}