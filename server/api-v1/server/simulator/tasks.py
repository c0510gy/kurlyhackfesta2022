from background_task import background
import pandas as pd
import os
from .models import PickingDetectionEvent, PackingDetectionEvent, DeliveryDetectionEvent
from .models import PickingSimulationInfo, PackingSimulationInfo, DeliverySimulationInfo
from .detection_module import statistical_detection
import random
import time


@background(schedule=1, queue='picking-queue')
def picking_simulation(her=None, winsize=-1, min_interval=0.1, max_interval=0.2):

    print('picking simulation started')
    print(her, winsize, min_interval, max_interval)

    if her is None:
        her = 1

    hers = '003'
    if her == 1.:
        hers = '010'
    if her == 2.:
        hers = '020'
    if her == 50.:
        hers = '50'

    PickingDetectionEvent.objects.all().delete()
    PickingSimulationInfo.objects.all().delete()

    module_dir = os.path.dirname(__file__)
    log_file_path = os.path.join(
        module_dir, f'simulation_data/dataset_{hers}', 'picking_df.csv')
    info_file_path = os.path.join(
        module_dir, f'simulation_data/dataset_{hers}', 'picking_info_df.csv')

    log_df = pd.read_csv(log_file_path)
    info_df_row = pd.read_csv(info_file_path).iloc[0]

    num_workers = info_df_row['num_workers']
    num_buskets = info_df_row['num_buskets']
    num_products = info_df_row['num_products']
    human_error = info_df_row['human_error']
    window_size = winsize

    PickingSimulationInfo.objects.create(num_workers=num_workers, num_buskets=num_buskets,
                                         num_products=num_products, human_error=human_error, window_size=window_size,)

    weight_collections = dict()
    pred_by_busket = dict()

    for index, row in log_df.iterrows():

        if min_interval is not None and max_interval is not None and min_interval <= max_interval:
            rand_interval = random.random() * (max_interval - min_interval) + min_interval
            time.sleep(rand_interval)

        worker_id = row['worker_id']
        busket_id = row['busket_id']
        product_id = row['product_id']
        weight = row['weight']
        operation = row['operation']
        label = row['label']

        if busket_id not in pred_by_busket:
            pred_by_busket[busket_id] = False
        if product_id not in weight_collections:
            weight_collections[product_id] = []

        if operation == 'END':
            pred = pred_by_busket[busket_id]
        else:
            weight_collections[product_id].append(weight)
            pred = statistical_detection(weight_collections[product_id])
            if pred:
                pred_by_busket[busket_id] = True

        PickingDetectionEvent.objects.create(worker_id=worker_id, busket_id=busket_id,
                                             product_id=product_id, weight=weight, operation=operation, label=label, pred=pred,)


@background(schedule=1, queue='packing-queue')
def packing_simulation(her=None, winsize=-1, min_interval=0.1, max_interval=0.2):

    print('packing simulation started')
    print(her, winsize, min_interval, max_interval)

    if her is None:
        her = 1

    hers = '003'
    if her == 1.:
        hers = '010'
    if her == 2.:
        hers = '020'
    if her == 50.:
        hers = '50'

    PackingDetectionEvent.objects.all().delete()
    PackingSimulationInfo.objects.all().delete()

    module_dir = os.path.dirname(__file__)
    file_path = os.path.join(module_dir, f'simulation_data/dataset_{hers}', 'packing_df.csv')
    info_file_path = os.path.join(
        module_dir, f'simulation_data/dataset_{hers}', 'packing_info_df.csv')

    log_df = pd.read_csv(file_path)
    info_df_row = pd.read_csv(info_file_path).iloc[0]

    num_workers = info_df_row['num_workers']
    num_packages = info_df_row['num_packages']
    num_fillings = info_df_row['num_fillings']
    human_error = info_df_row['human_error']
    window_size = winsize

    PackingSimulationInfo.objects.create(num_workers=num_workers, num_packages=num_packages,
                                         num_fillings=num_fillings, human_error=human_error, window_size=window_size,)

    weight_collections = dict()
    pred_by_busket = dict()

    for index, row in log_df.iterrows():

        if min_interval is not None and max_interval is not None and min_interval <= max_interval:
            rand_interval = random.random() * (max_interval - min_interval) + min_interval
            time.sleep(rand_interval)

        worker_id = row['worker_id']
        package_id = row['package_id']
        filling_id = row['filling_id']
        weight = row['weight']
        operation = row['operation']
        label = row['label']

        if package_id not in pred_by_busket:
            pred_by_busket[package_id] = False
        if filling_id not in weight_collections:
            weight_collections[filling_id] = []

        if operation == 'END':
            pred = pred_by_busket[package_id]
        else:
            weight_collections[filling_id].append(weight)
            pred = statistical_detection(weight_collections[filling_id])
            if pred:
                pred_by_busket[package_id] = True

        PackingDetectionEvent.objects.create(worker_id=worker_id, package_id=package_id,
                                             filling_id=filling_id, weight=weight, operation=operation, label=label, pred=pred,)


@background(schedule=1, queue='delivery-queue')
def delivery_simulation(her=None, winsize=-1, min_interval=0.1, max_interval=0.2):

    print('delivery simulation started')
    print(her, winsize, min_interval, max_interval)

    if her is None:
        her = 1

    hers = '003'
    if her == 1.:
        hers = '010'
    if her == 2.:
        hers = '020'
    if her == 50.:
        hers = '50'

    DeliveryDetectionEvent.objects.all().delete()
    DeliverySimulationInfo.objects.all().delete()

    module_dir = os.path.dirname(__file__)
    file_path = os.path.join(module_dir, f'simulation_data/dataset_{hers}', 'delivery_df.csv')
    info_file_path = os.path.join(
        module_dir, f'simulation_data/dataset_{hers}', 'delivery_info_df.csv')

    log_df = pd.read_csv(file_path)
    info_df_row = pd.read_csv(info_file_path).iloc[0]

    num_workers = info_df_row['num_workers']
    num_packages = info_df_row['num_packages']
    num_regions = info_df_row['num_regions']
    num_products = info_df_row['num_products']
    pallet_error_margin = info_df_row['pallet_error_margin']
    human_error = info_df_row['human_error']
    window_size = winsize

    DeliverySimulationInfo.objects.create(num_workers=num_workers, num_packages=num_packages,
                                          num_regions=num_regions, num_products=num_products, pallet_error_margin=pallet_error_margin, human_error=human_error, window_size=window_size,)

    error_rate_collections = []
    pred_by_region = dict()

    for index, row in log_df.iterrows():

        if min_interval is not None and max_interval is not None and min_interval <= max_interval:
            rand_interval = random.random() * (max_interval - min_interval) + min_interval
            time.sleep(rand_interval)

        worker_id = row['worker_id']
        package_id = row['package_id']
        region_id = row['region_id']
        error_rate = row['error_rate']
        operation = row['operation']
        label = row['label']

        if region_id not in pred_by_region:
            pred_by_region[region_id] = False

        if operation == 'END':
            pred = pred_by_region[region_id]
        else:
            error_rate_collections.append(error_rate)
            pred = statistical_detection(error_rate_collections)
            if pred:
                pred_by_region[region_id] = True

        DeliveryDetectionEvent.objects.create(worker_id=worker_id, package_id=package_id,
                                              region_id=region_id, error_rate=error_rate, operation=operation, label=label, pred=pred, )
