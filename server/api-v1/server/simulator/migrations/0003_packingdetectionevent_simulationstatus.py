# Generated by Django 3.2.15 on 2022-08-21 02:32

from django.db import migrations, models
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('simulator', '0002_auto_20220821_0158'),
    ]

    operations = [
        migrations.CreateModel(
            name='PackingDetectionEvent',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('worker_id', models.IntegerField()),
                ('package_id', models.IntegerField()),
                ('filling_id', models.IntegerField()),
                ('weight', models.FloatField()),
                ('operation', models.CharField(max_length=40)),
                ('label', models.BooleanField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='SimulationStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
    ]