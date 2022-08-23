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

    her_param = openapi.Parameter(
        'her',
        openapi.IN_QUERY,
        description='Human-error rate (percent). Allowed values: [0.3, 1, 2, 50]',
        required=False,
        type=openapi.TYPE_NUMBER
    )
    winsize_param = openapi.Parameter(
        'winsize',
        openapi.IN_QUERY,
        description='window size parameter for prediction (default: -1)',
        required=False,
        type=openapi.TYPE_INTEGER
    )
    min_interval_param = openapi.Parameter(
        'min_interval',
        openapi.IN_QUERY,
        description='Minimum interval between event logs (seconds)',
        required=False,
        type=openapi.TYPE_NUMBER
    )
    max_interval_param = openapi.Parameter(
        'max_interval',
        openapi.IN_QUERY,
        description='Maximum interval between event logs (seconds)',
        required=False,
        type=openapi.TYPE_NUMBER
    )

    response_schema_dict = {
        '200': 'Success'
    }

    @swagger_auto_schema(
        tags=['Control Simulation'],
        operation_description='Start Picking Simulation',
        manual_parameters=[her_param, winsize_param,
                           min_interval_param, max_interval_param],
        responses=response_schema_dict,
    )
    def post(self, request):
        # Human-error rate
        her_ = request.GET.get('her', None)
        # window size
        winsize_ = request.GET.get('winsize', -1)
        # min interval
        min_interval_ = request.GET.get('min_interval', None)
        # max interval
        max_interval_ = request.GET.get('max_interval', None)

        if her_ is not None:
            her_ = float(her_)
        if winsize_ is not None:
            winsize_ = int(winsize_)
        if min_interval_ is not None:
            min_interval_ = float(min_interval_)
        if max_interval_ is not None:
            max_interval_ = float(max_interval_)

        picking_simulation(her=her_, winsize=winsize_, min_interval=min_interval_,
                           max_interval=max_interval_, verbose_name="picking_simulation")
        return Response(status=status.HTTP_200_OK)


class PackingSimulationViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    her_param = openapi.Parameter(
        'her',
        openapi.IN_QUERY,
        description='Human-error rate (percent). Allowed values: [0.3, 1, 2, 50]',
        required=False,
        type=openapi.TYPE_NUMBER
    )
    winsize_param = openapi.Parameter(
        'winsize',
        openapi.IN_QUERY,
        description='window size parameter for prediction (default: -1)',
        required=False,
        type=openapi.TYPE_INTEGER
    )
    min_interval_param = openapi.Parameter(
        'min_interval',
        openapi.IN_QUERY,
        description='Minimum interval between event logs (seconds)',
        required=False,
        type=openapi.TYPE_NUMBER
    )
    max_interval_param = openapi.Parameter(
        'max_interval',
        openapi.IN_QUERY,
        description='Maximum interval between event logs (seconds)',
        required=False,
        type=openapi.TYPE_NUMBER
    )

    response_schema_dict = {
        '200': 'Success'
    }

    @swagger_auto_schema(
        tags=['Control Simulation'],
        operation_description='Start Packing Simulation',
        manual_parameters=[her_param, winsize_param,
                           min_interval_param, max_interval_param],
        responses=response_schema_dict,
    )
    def post(self, request):
        # Human-error rate
        her_ = request.GET.get('her', None)
        # window size
        winsize_ = request.GET.get('winsize', -1)
        # min interval
        min_interval_ = request.GET.get('min_interval', None)
        # max interval
        max_interval_ = request.GET.get('max_interval', None)

        if her_ is not None:
            her_ = float(her_)
        if winsize_ is not None:
            winsize_ = int(winsize_)
        if min_interval_ is not None:
            min_interval_ = float(min_interval_)
        if max_interval_ is not None:
            max_interval_ = float(max_interval_)

        packing_simulation(her=her_, winsize=winsize_, min_interval=min_interval_,
                           max_interval=max_interval_, verbose_name="packing_simulation")
        return Response(status=status.HTTP_200_OK)


class DeliverySimulationViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    her_param = openapi.Parameter(
        'her',
        openapi.IN_QUERY,
        description='Human-error rate (percent). Allowed values: [0.3, 1, 2, 50]',
        required=False,
        type=openapi.TYPE_NUMBER
    )
    winsize_param = openapi.Parameter(
        'winsize',
        openapi.IN_QUERY,
        description='window size parameter for prediction (default: -1)',
        required=False,
        type=openapi.TYPE_INTEGER
    )
    min_interval_param = openapi.Parameter(
        'min_interval',
        openapi.IN_QUERY,
        description='Minimum interval between event logs (seconds)',
        required=False,
        type=openapi.TYPE_NUMBER
    )
    max_interval_param = openapi.Parameter(
        'max_interval',
        openapi.IN_QUERY,
        description='Maximum interval between event logs (seconds)',
        required=False,
        type=openapi.TYPE_NUMBER
    )

    response_schema_dict = {
        '200': 'Success'
    }

    @swagger_auto_schema(
        tags=['Control Simulation'],
        operation_description='Start Delivery Simulation',
        manual_parameters=[her_param, winsize_param,
                           min_interval_param, max_interval_param],
        responses=response_schema_dict,
    )
    def post(self, request):
        # Human-error rate
        her_ = request.GET.get('her', None)
        # window size
        winsize_ = request.GET.get('winsize', -1)
        # min interval
        min_interval_ = request.GET.get('min_interval', None)
        # max interval
        max_interval_ = request.GET.get('max_interval', None)

        if her_ is not None:
            her_ = float(her_)
        if winsize_ is not None:
            winsize_ = int(winsize_)
        if min_interval_ is not None:
            min_interval_ = float(min_interval_)
        if max_interval_ is not None:
            max_interval_ = float(max_interval_)

        delivery_simulation(her=her_, winsize=winsize_, min_interval=min_interval_,
                            max_interval=max_interval_, verbose_name="delivery_simulation")
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
