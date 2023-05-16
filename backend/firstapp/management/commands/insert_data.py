from django.core.management.base import BaseCommand
from firstapp.models import Template, TextBox

class Command(BaseCommand):
    help = 'Add initial data to the database'

    def handle(self, *args, **options):
        # Add a template
        template = Template.objects.create(textbox_number=3, template_size="1000:200")

        # Add textboxes
        TextBox.objects.create(
            template=template, textbox_x=568, textbox_y=41, 
            width_sort="left", height_sort="up", 
            font_size=24, line_break=1, purpose="큰 홍보문구"
        )
        TextBox.objects.create(
            template=template, textbox_x=568, textbox_y=98, 
            width_sort="left", height_sort="up", 
            font_size=12, line_break=0, purpose="작은 홍보문구"
        )
        TextBox.objects.create(
            template=template, textbox_x=568, textbox_y=140, 
            width_sort="left", height_sort="up", 
            font_size=7, line_break=0, purpose="시간&장소"
        )

        self.stdout.write(self.style.SUCCESS('Successfully added initial data'))
