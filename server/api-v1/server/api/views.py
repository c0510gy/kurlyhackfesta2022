from .serializers import TestTableSerializer, PickingDetectionEventSerializer, PackingDetectionEventSerializer, DeliveryDetectionEventSerializer
from .models import TestTable
from simulator.models import PickingDetectionEvent, PackingDetectionEvent, DeliveryDetectionEvent
from accounts.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django_cognito_jwt import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated


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

    def get(self, request):
        # Event id
        from_ = request.GET.get('from', None)
        # number of events to retrieve
        limits_ = request.GET.get('limits', None)

        if from_ is None:
            queryset = PickingDetectionEvent.objects.all().order_by('created_at')
        else:
            from_event = PickingDetectionEvent.objects.get(id=from_)

            print('from_event.created_at', from_event.created_at)

            queryset = PickingDetectionEvent.objects.filter(
                created_at__gt=from_event.created_at).order_by('created_at')

        if limits_ is not None:
            limits_ = int(limits_)
            queryset = queryset[:limits_]

        serializer = PickingDetectionEventSerializer(queryset, many=True)
        return Response(serializer.data)


class PackingDetectionEventViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        # Event id
        from_ = request.GET.get('from', None)
        # number of events to retrieve
        limits_ = request.GET.get('limits', None)

        if from_ is None:
            queryset = PackingDetectionEvent.objects.all().order_by('created_at')
        else:
            from_event = PackingDetectionEvent.objects.get(id=from_)

            print('from_event.created_at', from_event.created_at)

            queryset = PackingDetectionEvent.objects.filter(
                created_at__gt=from_event.created_at).order_by('created_at')

        if limits_ is not None:
            limits_ = int(limits_)
            queryset = queryset[:limits_]

        serializer = PackingDetectionEventSerializer(queryset, many=True)
        return Response(serializer.data)


class DeliveryDetectionEventViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        # Event id
        from_ = request.GET.get('from', None)
        # number of events to retrieve
        limits_ = request.GET.get('limits', None)

        if from_ is None:
            queryset = DeliveryDetectionEvent.objects.all().order_by('created_at')
        else:
            from_event = DeliveryDetectionEvent.objects.get(id=from_)

            print('from_event.created_at', from_event.created_at)

            queryset = DeliveryDetectionEvent.objects.filter(
                created_at__gt=from_event.created_at).order_by('created_at')

        if limits_ is not None:
            limits_ = int(limits_)
            queryset = queryset[:limits_]

        serializer = DeliveryDetectionEventSerializer(queryset, many=True)
        return Response(serializer.data)
