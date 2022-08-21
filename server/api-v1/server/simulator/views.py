from .tasks import picking_simulation, packing_simulation, delivery_simulation
from background_task.models import Task, CompletedTask
from .serializers import SimulationTaskSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django_cognito_jwt import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class PickingSimulationViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    response_schema_dict = {
        '200': 'Success'
    }

    @swagger_auto_schema(
        tags=['Control Simulation'],
        operation_description='Start Picking Simulation',
        manual_parameters=[],
        responses=response_schema_dict,
    )
    def post(self, request):
        picking_simulation(verbose_name="picking_simulation")
        return Response(status=status.HTTP_200_OK)


class PackingSimulationViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    response_schema_dict = {
        '200': 'Success'
    }

    @swagger_auto_schema(
        tags=['Control Simulation'],
        operation_description='Start Packing Simulation',
        manual_parameters=[],
        responses=response_schema_dict,
    )
    def post(self, request):
        packing_simulation(verbose_name="packing_simulation")
        return Response(status=status.HTTP_200_OK)


class DeliverySimulationViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    response_schema_dict = {
        '200': 'Success'
    }

    @swagger_auto_schema(
        tags=['Control Simulation'],
        operation_description='Start Delivery Simulation',
        manual_parameters=[],
        responses=response_schema_dict,
    )
    def post(self, request):
        delivery_simulation(verbose_name="delivery_simulation")
        return Response(status=status.HTTP_200_OK)


class SimulationStatusViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    response_schema_dict = {
        "200": openapi.Response(
            description='Successfully Retrieved Events',
            examples={
                "application/json": {
                    "tasks": [
                        {
                            "task_hash": "070995a0b826bd377ac40389588c2f839b8aec66",
                            "task_name": "simulator.tasks.picking_simulation",
                            "attempts": 0,
                            "has_error": False,
                            "locked_by_pid_running": None,
                            "task_params": "[[], {}]",
                            "verbose_name": "picking_simulation"
                        },
                        {
                            "task_hash": "070995a0b826bd377ac40389588c2f839b8aec66",
                            "task_name": "simulator.tasks.picking_simulation",
                            "attempts": 1,
                            "has_error": False,
                            "locked_by_pid_running": True,
                            "task_params": "[[], {}]",
                            "verbose_name": "picking_simulation"
                        },
                    ],
                    "completed_tasks": [
                        {
                            "task_hash": "070995a0b826bd377ac40389588c2f839b8aec66",
                            "task_name": "simulator.tasks.picking_simulation",
                            "attempts": 1,
                            "has_error": False,
                            "locked_by_pid_running": True,
                            "task_params": "[[], {}]",
                            "verbose_name": "picking_simulation"
                        },
                        {
                            "task_hash": "18fbd64ff8959a983da5a8e47732c9d8b1cdd9b2",
                            "task_name": "simulator.tasks.packing_simulation",
                            "attempts": 1,
                            "has_error": False,
                            "locked_by_pid_running": True,
                            "task_params": "[[], {}]",
                            "verbose_name": "packing_simulation"
                        },
                        {
                            "task_hash": "18fbd64ff8959a983da5a8e47732c9d8b1cdd9b2",
                            "task_name": "simulator.tasks.packing_simulation",
                            "attempts": 1,
                            "has_error": False,
                            "locked_by_pid_running": True,
                            "task_params": "[[], {}]",
                            "verbose_name": "packing_simulation"
                        }
                    ]
                }
            }
        ),
    }

    @swagger_auto_schema(
        tags=['Control Simulation'],
        operation_description='Retrieve Simulation Tasks',
        manual_parameters=[],
        responses=response_schema_dict,
    )
    def get(self, request):
        task_queryset = Task.objects.all()
        completed_task_queryset = CompletedTask.objects.all()
        task_serializer = SimulationTaskSerializer(task_queryset, many=True)
        completed_task_serializer = SimulationTaskSerializer(
            completed_task_queryset, many=True)
        return Response({'tasks': task_serializer.data, 'completed_tasks': completed_task_serializer.data})
