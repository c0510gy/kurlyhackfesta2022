# Generated by Django 3.2.15 on 2022-08-21 05:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('simulator', '0004_auto_20220821_0314'),
    ]

    operations = [
        migrations.AddField(
            model_name='deliverydetectionevent',
            name='pred',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='packingdetectionevent',
            name='pred',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='pickingdetectionevent',
            name='pred',
            field=models.BooleanField(null=True),
        ),
    ]
