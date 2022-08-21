from background_task import background
import pandas as pd
import os
from .models import PickingDetectionEvent, PackingDetectionEvent, DeliveryDetectionEvent
import time


@background(schedule=1, queue='picking-queue')
def picking_simulation():

    print('picking simulation started')

    PickingDetectionEvent.objects.all().delete()

    module_dir = os.path.dirname(__file__)
    file_path = os.path.join(module_dir, 'simulation_data', 'picking_df.csv')

    log_df = pd.read_csv(file_path)

    for index, row in log_df.iterrows():

        # time.sleep(0.01)

        PickingDetectionEvent.objects.create(worker_id=row['worker_id'], busket_id=row['busket_id'],
                                             product_id=row['product_id'], weight=row['weight'], operation=row['operation'], label=row['label'], )


@background(schedule=1, queue='packing-queue')
def packing_simulation():

    print('packing simulation started')

    PackingDetectionEvent.objects.all().delete()

    module_dir = os.path.dirname(__file__)
    file_path = os.path.join(module_dir, 'simulation_data', 'packing_df.csv')

    log_df = pd.read_csv(file_path)

    for index, row in log_df.iterrows():

        # time.sleep(0.01)

        PackingDetectionEvent.objects.create(worker_id=row['worker_id'], package_id=row['package_id'],
                                             filling_id=row['filling_id'], weight=row['weight'], operation=row['operation'], label=row['label'], )


@background(schedule=1, queue='delivery-queue')
def delivery_simulation():

    print('delivery simulation started')

    DeliveryDetectionEvent.objects.all().delete()

    module_dir = os.path.dirname(__file__)
    file_path = os.path.join(module_dir, 'simulation_data', 'delivery_df.csv')

    log_df = pd.read_csv(file_path)

    for index, row in log_df.iterrows():

        # time.sleep(0.01)

        DeliveryDetectionEvent.objects.create(worker_id=row['worker_id'], package_id=row['package_id'],
                                              region_id=row['region_id'], weight=row['weight'], operation=row['operation'], label=row['label'], )
