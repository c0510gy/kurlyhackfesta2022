from .serializers import TestTableSerializer
from .models import TestTable
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
