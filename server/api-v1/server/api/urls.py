from django.urls import path, include
from .views import UserViewAPI


urlpatterns = [
    path('users/', UserViewAPI.as_view())
]
