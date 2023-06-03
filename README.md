# AIB

![AIB 로고](/path/to/logo.png)

AIB는 졸업 프로젝트입니다.
이 프로젝트는 생성 AI를 이용한 웹 배너 자동 생성 서비스입니다.

## 기능

### 완료된 기능

- Prompt 생성: 질문에 맞는 요구사항을 작성하면 서버에서 ChatGPT를 이용해 Stable Diffusion에 작성할 Prompt를 생성한다.
- 이미지 생성: 생성된 Prompt를 이용하여 배너 배경 이미지 생성
- 투명화: 생성된 이미지를 디텍팅을 하여 개체의 개수를 세고 가우시안 함수를 이용하여 투명화를 적용
- 글자 배치: 투명화가 적용된 곳에 문구 요소에 알맞은 크기로 문구 배치
- 다운로드: 배치까지 완료된 이미지를 .jpeg로 다운로드

### 추후 개발 예정 기능

- 로딩창: 요구사항 페이지에서 Submit 클릭 시 이미지가 생성되는 시간 표기
- 문구 수정: 문구의 크기, 글꼴, 위치를 수정하는 기능
- ...

## 설치

1. 저장소를 복제합니다:

   ```shell
   git clone https://github.com/Yijungu/AIB.git
   ```

2. npm 설치

   ```shell
   npm install
   ```
3. docker 설치

## 사용법

1. 웹 실행

   ```shell
   docker compose -up

 - 데이터베이스 관리
   ```shell
   docker-compose exec backend python manage.py makemigrations firstapp
   
   docker-compose exec backend python manage.py migrate firstapp
   
   docker-compose exec backend python manage.py insert_data

2. 웹 브라우저에서 애플리케이션을 엽니다.
   `http://localhost:3000/`을 방문하여 애플리케이션에 접속합니다.

## 개발자

- PM: `https://github.com/Yijungu`
- FE: `https://github.com/PoeySK`
- BE: `https://github.com/KwonJunYeop`
