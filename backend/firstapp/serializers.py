from rest_framework import serializers
from .models import Template, TextBox

class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = 'all'

class TextBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextBox
        fields = 'all'