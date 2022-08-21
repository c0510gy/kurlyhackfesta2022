from django.contrib import admin
from .models import PickingDetectionEvent, PackingDetectionEvent, DeliveryDetectionEvent


class AdminPickingDetectionEvent(admin.ModelAdmin):
    model = PickingDetectionEvent
    list_display = ('id', 'worker_id', 'busket_id',
                    'product_id', 'weight', 'operation', 'label', 'created_at', 'updated_at')


class AdminPackingDetectionEvent(admin.ModelAdmin):
    model = PackingDetectionEvent
    list_display = ('id', 'worker_id', 'package_id',
                    'filling_id', 'weight', 'operation', 'label', 'created_at', 'updated_at')


class AdminDeliveryDetectionEvent(admin.ModelAdmin):
    model = PackingDetectionEvent
    list_display = ('id', 'worker_id', 'package_id',
                    'region_id', 'weight', 'operation', 'label', 'created_at', 'updated_at')


admin.site.register(PickingDetectionEvent, AdminPickingDetectionEvent)
admin.site.register(PackingDetectionEvent, AdminPackingDetectionEvent)
admin.site.register(DeliveryDetectionEvent, AdminDeliveryDetectionEvent)
