from rest_framework import serializers
from .models import TestTable
from simulator.models import PickingDetectionEvent, PackingDetectionEvent, DeliveryDetectionEvent
from simulator.models import PickingSimulationInfo, PackingSimulationInfo, DeliverySimulationInfo


class TestTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestTable
        fields = ('id', 'user_id', 'test')
        read_only_fields = ('created_at', 'updated_at')


class PickingSimulationInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PickingSimulationInfo
        fields = ('id', 'num_workers', 'num_buskets',
                  'num_products', 'human_error', 'window_size',)
        read_only_fields = ('created_at',)


class PackingSimulationInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackingSimulationInfo
        fields = ('id', 'num_workers', 'num_packages',
                  'num_fillings', 'human_error', 'window_size',)
        read_only_fields = ('created_at',)


class DeliverySimulationInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliverySimulationInfo
        fields = ('id', 'num_workers', 'num_packages',
                  'num_regions', 'num_products', 'pallet_error_margin', 'human_error', 'window_size', )
        read_only_fields = ('created_at',)


class PickingDetectionEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = PickingDetectionEvent
        fields = ('id', 'worker_id', 'busket_id',
                  'product_id', 'weight', 'operation', 'pred', 'label', 'created_at',)
        read_only_fields = ('updated_at',)


class PackingDetectionEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackingDetectionEvent
        fields = ('id', 'worker_id', 'package_id',
                  'filling_id', 'weight', 'operation', 'pred', 'label', 'created_at',)
        read_only_fields = ('updated_at',)


class DeliveryDetectionEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryDetectionEvent
        fields = ('id', 'worker_id', 'package_id',
                  'region_id', 'error_rate', 'operation', 'pred', 'label', 'created_at',)
        read_only_fields = ('updated_at',)
