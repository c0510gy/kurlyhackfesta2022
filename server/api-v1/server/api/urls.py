from django.urls import path
from .views import TestTableViewAPI


urlpatterns = [
    path('test/', TestTableViewAPI.as_view())
]
