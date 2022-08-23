from .serializers import TestTableSerializer, PickingDetectionEventSerializer, PackingDetectionEventSerializer, DeliveryDetectionEventSerializer
from .models import TestTable
from simulator.models import PickingDetectionEvent, PackingDetectionEvent, DeliveryDetectionEvent
from accounts.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django_cognito_jwt import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class TestTableViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        queryset = TestTable.objects.all()
        serializer = TestTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = User.objects.get(cognito_id=request.user.cognito_id)
        queryset = TestTable.objects.create(user_id=user, test='hello')
        serializer = TestTableSerializer(queryset)
        return Response(serializer.data)


class PickingDetectionEventViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    from_param = openapi.Parameter(
        'from',
        openapi.IN_QUERY,
        description='Last retrieved event id. If not given, it will retrieve from the first event log',
        required=False,
        type=openapi.TYPE_STRING
    )
    limits_param = openapi.Parameter(
        'limits',
        openapi.IN_QUERY,
        description='Number of events to retrieve. If not given, it will retrieve limitlessly',
        required=False,
        type=openapi.TYPE_INTEGER
    )
    order_param = openapi.Parameter(
        'descending_order',
        openapi.IN_QUERY,
        description='If true, it will retrieve data in descending order of timestamp',
        required=False,
        type=openapi.TYPE_INTEGER
    )

    response_schema_dict = {
        "200": openapi.Response(
            description='Successfully Retrieved Events',
            examples={
                "application/json": [{
                    "id": "de7d70f0-7871-40ce-849a-42d35f10a0cb",
                    "worker_id": 1,
                    "busket_id": 3606,
                    "product_id": 9,
                    "weight": 0.417401725386503,
                    "operation": "PUT",
                    "pred": None,
                    "label": False,
                    "created_at": "2022-08-21T02:44:14.930483Z"
                }]
            }
        ),
    }

    @swagger_auto_schema(
        tags=['Retrieve Human-error Detection Events'],
        operation_description='Retrieve Human-error Detection Events in Picking Process',
        manual_parameters=[from_param, limits_param, order_param],
        responses=response_schema_dict,
    )
    def get(self, request):
        # Event id
        from_ = request.GET.get('from', None)
        # number of events to retrieve
        limits_ = request.GET.get('limits', None)
        # descending order
        order_ = request.GET.get('descending_order', False)

        if from_ is None:
            queryset = PickingDetectionEvent.objects.all().order_by(
                '-created_at' if order_ == True else 'created_at')
        else:
            from_event = PickingDetectionEvent.objects.get(id=from_)

            print('from_event.created_at', from_event.created_at)

            queryset = PickingDetectionEvent.objects.filter(
                created_at__gt=from_event.created_at).order_by('-created_at' if order_ == True else 'created_at')

        if limits_ is not None:
            limits_ = int(limits_)
            queryset = queryset[:limits_]

        serializer = PickingDetectionEventSerializer(queryset, many=True)
        return Response(serializer.data)


class PackingDetectionEventViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    from_param = openapi.Parameter(
        'from',
        openapi.IN_QUERY,
        description='Last retrieved event id. If not given, it will retrieve from the first event log',
        required=False,
        type=openapi.TYPE_STRING
    )
    limits_param = openapi.Parameter(
        'limits',
        openapi.IN_QUERY,
        description='Number of events to retrieve. If not given, it will retrieve limitlessly',
        required=False,
        type=openapi.TYPE_INTEGER
    )
    order_param = openapi.Parameter(
        'descending_order',
        openapi.IN_QUERY,
        description='If true, it will retrieve data in descending order of timestamp',
        required=False,
        type=openapi.TYPE_INTEGER
    )

    response_schema_dict = {
        "200": openapi.Response(
            description='Successfully Retrieved Events',
            examples={
                "application/json": [{
                    "id": "c895dc75-ea64-445d-9bdb-a73d77a63cc7",
                    "worker_id": 1,
                    "package_id": 6521,
                    "filling_id": 1,
                    "weight": 0.8091877218276352,
                    "operation": "PUT",
                    "pred": None,
                    "label": False,
                    "created_at": "2022-08-21T03:05:27.346635Z"
                }, ]
            }
        ),
    }

    @swagger_auto_schema(
        tags=['Retrieve Human-error Detection Events'],
        operation_description='Retrieve Human-error Detection Events in Packing Process',
        manual_parameters=[from_param, limits_param, order_param],
        responses=response_schema_dict,
    )
    def get(self, request):
        # Event id
        from_ = request.GET.get('from', None)
        # number of events to retrieve
        limits_ = request.GET.get('limits', None)
        # descending order
        order_ = request.GET.get('descending_order', False)

        if from_ is None:
            queryset = PackingDetectionEvent.objects.all().order_by(
                '-created_at' if order_ == True else 'created_at')
        else:
            from_event = PackingDetectionEvent.objects.get(id=from_)

            print('from_event.created_at', from_event.created_at)

            queryset = PackingDetectionEvent.objects.filter(
                created_at__gt=from_event.created_at).order_by('-created_at' if order_ == True else 'created_at')

        if limits_ is not None:
            limits_ = int(limits_)
            queryset = queryset[:limits_]

        serializer = PackingDetectionEventSerializer(queryset, many=True)
        return Response(serializer.data)


class DeliveryDetectionEventViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    from_param = openapi.Parameter(
        'from',
        openapi.IN_QUERY,
        description='Last retrieved event id. If not given, it will retrieve from the first event log',
        required=False,
        type=openapi.TYPE_STRING
    )
    limits_param = openapi.Parameter(
        'limits',
        openapi.IN_QUERY,
        description='Number of events to retrieve. If not given, it will retrieve limitlessly',
        required=False,
        type=openapi.TYPE_INTEGER
    )
    order_param = openapi.Parameter(
        'descending_order',
        openapi.IN_QUERY,
        description='If true, it will retrieve data in descending order of timestamp',
        required=False,
        type=openapi.TYPE_INTEGER
    )

    response_schema_dict = {
        "200": openapi.Response(
            description='Successfully Retrieved Events',
            examples={
                "application/json": [{
                    "id": "c895dc75-ea64-445d-9bdb-a73d77a63cc7",
                    "worker_id": 1,
                    "package_id": 6521,
                    "region_id": 1,
                    "weight": 0.8091877218276352,
                    "operation": "PUT",
                    "pred": None,
                    "label": False,
                    "created_at": "2022-08-21T03:05:27.346635Z"
                }, ]
            }
        ),
    }

    @swagger_auto_schema(
        tags=['Retrieve Human-error Detection Events'],
        operation_description='Retrieve Human-error Detection Events in Delivery Process',
        manual_parameters=[from_param, limits_param, order_param],
        responses=response_schema_dict,
    )
    def get(self, request):
        # Event id
        from_ = request.GET.get('from', None)
        # number of events to retrieve
        limits_ = request.GET.get('limits', None)
        # descending order
        order_ = request.GET.get('descending_order', False)

        if from_ is None:
            queryset = DeliveryDetectionEvent.objects.all().order_by(
                '-created_at' if order_ == True else 'created_at')
        else:
            from_event = DeliveryDetectionEvent.objects.get(id=from_)

            print('from_event.created_at', from_event.created_at)

            queryset = DeliveryDetectionEvent.objects.filter(
                created_at__gt=from_event.created_at).order_by('-created_at' if order_ == True else 'created_at')

        if limits_ is not None:
            limits_ = int(limits_)
            queryset = queryset[:limits_]

        serializer = DeliveryDetectionEventSerializer(queryset, many=True)
        return Response(serializer.data)
