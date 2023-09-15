from django.test import TestCase, Client
import json
import base64
from django.core.files.uploadedfile import SimpleUploadedFile

class RequestViewTestCase(TestCase):

    def setUp(self):
        self.client = Client()

    """def test_request_view_with_pictures(self):
        data = {
            'concept': 'some_concept',
            'include': 'some_include',
            'contents': json.dumps([
                {'comment': 'comment1', 'select': 'select1'},
                {'comment': 'comment2', 'select': 'select2'}
            ]),
        }

        data['logo'] = SimpleUploadedFile(name='sam-removebg-preview.png', content=open('sam-removebg-preview.png', 'rb').read())
        data['product'] = SimpleUploadedFile(name='phone-removebg-preview.png', content=open('phone-removebg-preview.png', 'rb').read())

        response = self.client.post('/aib_request/', data, format='multipart')
        self.assertEqual(response.status_code, 200)
        self.assertIn('background_color', response.json())
        self.assertIn('text_color', response.json())"""


    def test_request_view_without_pictures(self):
        data = {
            'concept': 'some_concept',
            'include': '1200:360',
            'contents': json.dumps([
                {'comment': 'comment1', 'select': '큰 홍보문구'},
                {'comment': 'comment2', 'select': '작은 홍보문구'}
            ], ensure_ascii=False),
        }

        response = self.client.post('/aib_request/', data, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertIn('image', response.json())
        self.assertIn('changed_texts', response.json())
        self.assertIn('position', response.json())
        self.assertIn('font_size', response.json())
        self.assertIn('kerning', response.json())
        self.assertIn('alignments', response.json())