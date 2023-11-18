from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('example/', views.example_view, name='example_view'),
    path('test/', views.test_view, name='test'),
    path('api/request_view/', views.request_view, name='request_view'),  # 일반 요청 처리
    path('api/request_picture_view/', views.request_picture_view, name='request_picture_view'),  # 이미지 포함 요청 처리
    #path('api/', include('api.urls')),

    # 사용자가 아무것도 없는 경로로 들어온 경우
    # firstapp의 views.py의 index가 실행됨
    #path('', views.index),  
    # 사용자가 create 경로로 들어온 경우
    #path('create/', views.create),

    # 가변적으로 경로를 설정하는 경우 <>를 사용
    # 아래의 경우 id의 값에 따라 경로가 변경됨
    #path('read/<id>/', views.read)
]

urlpatterns = format_suffix_patterns(urlpatterns)