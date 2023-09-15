from django.db import models

class Template(models.Model):
    TEMPLATE_SIZE_CHOICES = (
        ("1200:360", "1200:360"),
        ("500:500-X", "500:500-X"),
        ("500:500-Y", "500:500-Y"),
        ("360:1200", "360:1200"),
    )

    template_id = models.AutoField(primary_key=True)
    textbox_number = models.IntegerField()
    template_size = models.CharField(max_length=10, choices=TEMPLATE_SIZE_CHOICES)

    class Meta:
        db_table = 'Template'


class TextBox(models.Model):
    WIDTH_SORT_CHOICES = (
        ("left", "left"),
        ("right", "right"),
    )

    HEIGHT_SORT_CHOICES = (
        ("up", "up"),
        ("down", "down"),
    )

    PURPOSE_CHOICES = (
        ("큰 홍보문구", "큰 홍보문구"),
        ("작은 홍보문구", "작은 홍보문구"),
        ("상세 설명", "상세 설명"),
        ("시간&장소", "시간&장소"),
    )

    template = models.ForeignKey(Template, on_delete=models.CASCADE, db_column="template_id")
    position = models.FloatField()
    width_sort = models.CharField(max_length=5, choices=WIDTH_SORT_CHOICES)
    height_sort = models.CharField(max_length=4, choices=HEIGHT_SORT_CHOICES)
    font_size = models.FloatField()
    line_break = models.IntegerField()
    purpose = models.CharField(max_length=10, choices=PURPOSE_CHOICES)

    class Meta:
        db_table = 'TextBox'
# Create your models here.

def image_upload_path(instance, filename):
    return f'{instance.post.id}/{filename}'

class PostImage(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to=image_upload_path)

    def __int__(self):
        return self.id

    class Meta:
        db_table = 'post_image'