from .serializers import UserSerializer
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django_cognito_jwt import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class UserViewAPI(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    response_schema_dict = {
        "200": openapi.Response(
            description='Successfully Retrieved Events',
            examples={
                "application/json": {
                    "username": "admin",
                    "email": "ahffk@tkdrjs.com"
                }
            }
        ),
    }

    @swagger_auto_schema(
        tags=['Request User Info'],
        operation_description='Retrieve current user information',
        manual_parameters=[],
        responses=response_schema_dict,
    )
    def get(self, request):
        queryset = User.objects.get(cognito_id=request.user.cognito_id)
        serializer = UserSerializer(queryset, many=False)
        return Response(serializer.data)
