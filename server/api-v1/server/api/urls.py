from django.urls import path
from .views import TestTableViewAPI, PickingDetectionEventViewAPI, PackingDetectionEventViewAPI, DeliveryDetectionEventViewAPI
from .views import PickingSimulationInfoViewAPI, PackingSimulationInfoViewAPI, DeliverySimulationInfoViewAPI


urlpatterns = [
    path('test/', TestTableViewAPI.as_view()),
    path('events/picking/', PickingDetectionEventViewAPI.as_view()),
    path('events/packing/', PackingDetectionEventViewAPI.as_view()),
    path('events/delivery/', DeliveryDetectionEventViewAPI.as_view()),
    path('info/picking/', PickingSimulationInfoViewAPI.as_view()),
    path('info/packing/', PackingSimulationInfoViewAPI.as_view()),
    path('info/delivery/', DeliverySimulationInfoViewAPI.as_view()),
]
