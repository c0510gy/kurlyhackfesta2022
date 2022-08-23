# Generated by Django 3.2.15 on 2022-08-23 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('simulator', '0006_deliverysimulationinfo_packingsimulationinfo_pickingsimulationinfo'),
    ]

    operations = [
        migrations.RenameField(
            model_name='deliverydetectionevent',
            old_name='weight',
            new_name='error_rate',
        ),
        migrations.AddField(
            model_name='deliverysimulationinfo',
            name='pallet_error_margin',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
    ]
