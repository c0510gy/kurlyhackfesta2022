from django.urls import path, include
from .views import UserViewAPI


urlpatterns = [
    path('me/', UserViewAPI.as_view())
]
