from django.db import models
from django.utils import timezone
import uuid


class PickingDetectionEvent(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    worker_id = models.IntegerField(null=False)
    busket_id = models.IntegerField(null=False)
    product_id = models.IntegerField(null=False)
    weight = models.FloatField(null=False)
    operation = models.CharField(null=False, max_length=40)
    pred = models.BooleanField(null=True)
    label = models.BooleanField(null=False)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)

    def update_date(self):
        self.updated_at = timezone.now()
        self.save()

    def __str__(self):
        return '[{}] {}'.format(self.id, self.operation)


class PackingDetectionEvent(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    worker_id = models.IntegerField(null=False)
    package_id = models.IntegerField(null=False)
    filling_id = models.IntegerField(null=False)
    weight = models.FloatField(null=False)
    operation = models.CharField(null=False, max_length=40)
    pred = models.BooleanField(null=True)
    label = models.BooleanField(null=False)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)

    def update_date(self):
        self.updated_at = timezone.now()
        self.save()

    def __str__(self):
        return '[{}] {}'.format(self.id, self.operation)


class DeliveryDetectionEvent(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    worker_id = models.IntegerField(null=False)
    package_id = models.IntegerField(null=False)
    region_id = models.IntegerField(null=False)
    weight = models.FloatField(null=False)
    operation = models.CharField(null=False, max_length=40)
    pred = models.BooleanField(null=True)
    label = models.BooleanField(null=False)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)

    def update_date(self):
        self.updated_at = timezone.now()
        self.save()

    def __str__(self):
        return '[{}] {}'.format(self.id, self.operation)
