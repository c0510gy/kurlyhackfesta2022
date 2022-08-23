from django.contrib import admin
from .models import PickingDetectionEvent, PackingDetectionEvent, DeliveryDetectionEvent
from .models import PickingSimulationInfo, PackingSimulationInfo, DeliverySimulationInfo


class AdminPickingSimulationInfo(admin.ModelAdmin):
    model = PickingSimulationInfo
    list_display = ('id', 'num_workers', 'num_buskets',
                    'num_products', 'human_error', 'window_size', 'created_at')


class AdminPackingSimulationInfo(admin.ModelAdmin):
    model = PackingSimulationInfo
    list_display = ('id', 'num_workers', 'num_packages',
                    'num_fillings', 'human_error', 'window_size', 'created_at')


class AdminDeliverySimulationInfo(admin.ModelAdmin):
    model = DeliverySimulationInfo
    list_display = ('id', 'num_workers', 'num_packages',
                    'num_regions', 'num_products', 'human_error', 'window_size', 'created_at')


class AdminPickingDetectionEvent(admin.ModelAdmin):
    model = PickingDetectionEvent
    list_display = ('id', 'worker_id', 'busket_id',
                    'product_id', 'weight', 'operation', 'pred', 'label', 'created_at', 'updated_at')


class AdminPackingDetectionEvent(admin.ModelAdmin):
    model = PackingDetectionEvent
    list_display = ('id', 'worker_id', 'package_id',
                    'filling_id', 'weight', 'operation', 'pred', 'label', 'created_at', 'updated_at')


class AdminDeliveryDetectionEvent(admin.ModelAdmin):
    model = PackingDetectionEvent
    list_display = ('id', 'worker_id', 'package_id',
                    'region_id', 'weight', 'operation', 'pred', 'label', 'created_at', 'updated_at')


admin.site.register(PickingSimulationInfo, AdminPickingSimulationInfo)
admin.site.register(PackingSimulationInfo, AdminPackingSimulationInfo)
admin.site.register(DeliverySimulationInfo, AdminDeliverySimulationInfo)
admin.site.register(PickingDetectionEvent, AdminPickingDetectionEvent)
admin.site.register(PackingDetectionEvent, AdminPackingDetectionEvent)
admin.site.register(DeliveryDetectionEvent, AdminDeliveryDetectionEvent)
