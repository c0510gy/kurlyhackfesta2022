from rest_framework import serializers
from .models import TestTable


class TestTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestTable
        fields = ('id', 'user_id', 'test')
        read_only_fields = ('created_at', 'updated_at')
