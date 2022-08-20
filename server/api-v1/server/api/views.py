from .serializers import UserSerializer
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response


class UserViewAPI(APIView):
    def get(self, request):
        queryset = User.objects.all()
        print(queryset)
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)
