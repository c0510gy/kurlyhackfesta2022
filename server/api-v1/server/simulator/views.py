from .tasks import picking_simulation, packing_simulation, delivery_simulation
from background_task.models import Task, CompletedTask
from .serializers import SimulationTaskSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django_cognito_jwt import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated


class PickingSimulationViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        picking_simulation(verbose_name="picking_simulation")
        return Response(status=status.HTTP_302_FOUND)


class PackingSimulationViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        packing_simulation(verbose_name="packing_simulation")
        return Response(status=status.HTTP_302_FOUND)


class DeliverySimulationViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        delivery_simulation(verbose_name="delivery_simulation")
        return Response(status=status.HTTP_302_FOUND)


class SimulationStatusViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        task_queryset = Task.objects.all()
        completed_task_queryset = CompletedTask.objects.all()
        task_serializer = SimulationTaskSerializer(task_queryset, many=True)
        completed_task_serializer = SimulationTaskSerializer(
            completed_task_queryset, many=True)
        return Response({'tasks': task_serializer.data, 'completed_tasks': completed_task_serializer.data})
