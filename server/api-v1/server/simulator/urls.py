from django.urls import path
from .views import PickingSimulationViewAPI, PackingSimulationViewAPI, DeliverySimulationViewAPI, SimulationStatusViewAPI


urlpatterns = [
    path('start/picking/', PickingSimulationViewAPI.as_view()),
    path('start/packing/', PackingSimulationViewAPI.as_view()),
    path('start/delivery/', DeliverySimulationViewAPI.as_view()),
    path('status/', SimulationStatusViewAPI.as_view()),
]
