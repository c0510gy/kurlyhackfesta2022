"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from .views import IndexViewAPI

urlpatterns = [
    path('/', IndexViewAPI.as_view()),
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('api/', include('api.urls')),
    path('simulator/', include('simulator.urls')),
]

schema_view = get_schema_view(
    openapi.Info(
        title='Gravimetric API Document',
        default_version='1.0',
        description='''
        Gravimetric backend API 명세 문서

        작성자 : Sanggeon Yun
        ''',
        terms_of_service='',
        contact=openapi.Contact(name='Sanggeon Yun',
                                email='ggj06281@kookmin.ac.kr'),
        license=openapi.License(name='Gravimetric API Document')
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
    patterns=urlpatterns,
)

# drf_yasg url
urlpatterns += [
    path('swagger<str:format>', schema_view.without_ui(
        cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc',
         cache_timeout=0), name='schema-redoc'),
]
