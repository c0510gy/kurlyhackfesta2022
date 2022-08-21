from django.urls import path
from .views import TestTableViewAPI, PickingDetectionEventViewAPI, PackingDetectionEventViewAPI, DeliveryDetectionEventViewAPI


urlpatterns = [
    path('test/', TestTableViewAPI.as_view()),
    path('events/picking/', PickingDetectionEventViewAPI.as_view()),
    path('events/packing/', PackingDetectionEventViewAPI.as_view()),
    path('events/delivery/', DeliveryDetectionEventViewAPI.as_view()),
]
