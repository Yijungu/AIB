from django.test import TestCase, Client
from .models import TextBox, Template
from .views import example_view

class ExampleViewTest(TestCase):
    def setUp(self):
        self.client = Client()

        # 필요한 경우 테스트용 데이터를 생성합니다.
        # TextBox와 Template 객체를 만들고 데이터베이스에 저장합니다.
        template = Template.objects.create(textbox_number=1, template_size="1000:200")
        template = Template.objects.create(textbox_number=2, template_size="1500:500")
        TextBox.objects.create(template=template, textbox_x=10, textbox_y=20, width_sort="left", height_sort="up", font_size=12, line_break=1, purpose="큰 홍보문구")

    def test_example_view(self):
        # HTTP GET 요청을 시뮬레이션하여 example_view를 실행합니다.
        response = self.client.get('/example/')

        # 응답 상태 코드를 검사하여 요청이 성공적으로 처리되었는지 확인합니다.
        self.assertEqual(response.status_code, 200)

        # 응답 내용을 검사하여 예상한 데이터가 포함되어 있는지 확인합니다.
        self.assertContains(response, "큰 홍보문구")

        with open('response_content.txt', 'w', encoding='utf-8') as file:
            file.write(response.content.decode('utf-8'))
        # 필요한 경우 추가 테스트를 작성합니다.

    