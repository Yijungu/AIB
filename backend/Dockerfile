# 이미지 내에서 명령어를 실행할(현 위치로 잡을) 디렉토리 설정

FROM nvidia/cuda:11.7.1-cudnn8-runtime-ubuntu20.04
LABEL maintainer="Hugging Face"
LABEL repository="diffusers"

WORKDIR /usr/src/app

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && \
    apt install -y bash \
                   build-essential \
                   git \
                   git-lfs \
                   curl \
                   ca-certificates \
                   libsndfile1-dev \
                   python3.10.6 \
                   python3-pip \
                   python3.10.6-venv && \
    rm -rf /var/lib/apt/lists

# pre-install the heavy dependencies (these can later be overridden by the deps from setup.py)
RUN python3 -m pip install --no-cache-dir --upgrade pip && \
    python3 -m pip install --no-cache-dir \
        torch \
        torchvision \
        torchaudio \
        --extra-index-url https://download.pytorch.org/whl/cu117 && \
    python3 -m pip install --no-cache-dir \
        accelerate \
        datasets \
        hf-doc-builder \
        huggingface-hub \
        Jinja2 \
        librosa \
        numpy \
        scipy \
        tensorboard \
        transformers

ENV NVIDIA_DRIVER_CAPABILITIES=compute,utility
ENV NVIDIA_VISIBLE_DEVICES=all
LABEL com.nvidia.volumes.needed="nvidia_driver"

# 이미지 생성 과정에서 실행할 명령어
RUN pip install Django
RUN django-admin startproject trydjango
RUN pip install django-cors-headers
RUN pip install djangorestframework
RUN pip install openai
RUN pip install diffusers transformers accelerate scipy safetensors

# 컨테이너 실행시 실행할 명령어

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]


# 이미지 생성 명령어 (현 파일과 같은 디렉토리에서) gg
# docker build -t {이미지명} .

# 컨테이너 생성 & 실행 명령어
# docker run --name {컨테이너명} -v $(pwd):/usr/src/app -p 5000:5000 {이미지명}