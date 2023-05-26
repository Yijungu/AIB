from django.core.management.base import BaseCommand
from firstapp.models import Template, TextBox

class Command(BaseCommand):
    help = 'Add initial data to the database'

    def handle(self, *args, **options):
        # Add a template
        tem_1200_1 = Template.objects.create(textbox_number=3, template_size="1200:360")
        tem_1200_2 = Template.objects.create(textbox_number=2, template_size="1200:360")
        tem_500X_1 = Template.objects.create(textbox_number=3, template_size="500:500-X")
        tem_500X_2 = Template.objects.create(textbox_number=2, template_size="500:500-X")
        
        # Add textboxes
        # 1. 1200 : 360

        # 1-(1) 텍스트박스 3개
        TextBox.objects.create(
            template=tem_1200_1, position=74, 
            width_sort="left", height_sort="up", 
            font_size=44, line_break=1, purpose="큰 홍보문구"
        )
        TextBox.objects.create(
            template=tem_1200_1, position=177, 
            width_sort="left", height_sort="up", 
            font_size=22, line_break=0, purpose="작은 홍보문구"
        )
        TextBox.objects.create(
            template=tem_1200_1, position=252, 
            width_sort="left", height_sort="up", 
            font_size=14, line_break=0, purpose="시간&장소"
        )

        # 1-(2) 텍스트박스 2개
        TextBox.objects.create(
            template=tem_1200_2, position=130, 
            width_sort="left", height_sort="up", 
            font_size=80, line_break=0, purpose="큰 홍보문구"
        )
        TextBox.objects.create(
            template=tem_1200_2, position=110, 
            width_sort="left", height_sort="up", 
            font_size=25, line_break=0, purpose="작은 홍보문구"
        )

        # 2. 500 : 500-X
        # 2-(1) 텍스트박스 3개
        TextBox.objects.create(
            template=tem_500X_1, position=170, 
            width_sort="left", height_sort="up", 
            font_size=50, line_break=1, purpose="큰 홍보문구"
        )
        TextBox.objects.create(
            template=tem_500X_1, position=140, 
            width_sort="left", height_sort="up", 
            font_size=21, line_break=0, purpose="작은 홍보문구"
        )
        TextBox.objects.create(
            template=tem_500X_1, position=320, 
            width_sort="left", height_sort="up", 
            font_size=16, line_break=0, purpose="시간&장소"
        )

        
        # 2-(2) 텍스트박스 2개
        TextBox.objects.create(
            template=tem_500X_2, position=265, 
            width_sort="left", height_sort="up", 
            font_size=40, line_break=2, purpose="큰 홍보문구"
        )
        TextBox.objects.create(
            template=tem_500X_2, position=415, 
            width_sort="left", height_sort="up", 
            font_size=11, line_break=0, purpose="작은 홍보문구"
        )

        self.stdout.write(self.style.SUCCESS('Successfully added initial data'))
