from scipy.stats import norm
import pandas as pd
import numpy as np
import random


def get_std(mean, error_margin, step=0.0001):
    ret = 0.
    l, r = step, 100.
    while abs(l - r) > step:
        std = (l + r) / 2
        x = norm.ppf(0.975, loc=mean, scale=std)  # 95%
        p = (x - mean) / mean
        #print(x, p)
        if p <= error_margin:
            ret = max(ret, std)
            l = std + step
        else:
            r = std - step
    '''
    std = step
    while True:
        x = norm.ppf(0.975, loc=mean, scale=std)  # 95%
        p = (x - mean) / mean
        print(x, p)
        if p <= error_margin:
            ret = std
        else:
            break
        std += step
    '''
    return ret


def create_products(num_products):
    products = []
    for _ in range(num_products):
        m = random.random()
        p = random.random() * 0.1  # ~ 3% error margin
        std = get_std(m, p)
        #std = 0.05
        products.append((m, std, p))
    return products


def create_orders(num_orders, num_products, min_items=10, max_items=20):
    orders = []
    for _ in range(num_orders):
        order = sorted([random.randint(0, num_products - 1)
                        for _ in range(random.randint(min_items, max_items))])
        orders.append(order)
    return orders


def create_picking(num_orders, num_products, num_workers, human_error_prob=0.02):
    '''
    0. 상품 랜덤 생성
    1. 랜덤 주문 생성 => DAS존 빈 바구니에 할당
    2. 작업자 랜덤 배정
    3. 작업자가 상품 바구니에 집어넣는 로그 생성
    4. 바구니가 다 채워졌음을 나타내는 END 로그 생성
    '''
    logs = []

    products = create_products(num_products)

    orders = create_orders(num_orders, num_products)
    rem_orders = [len(order) for order in orders]
    human_errors = [False for _ in range(len(orders))]

    works = []
    for busket_id, order in enumerate(orders):
        # (worker id, DAS zone busket id, product id)
        works.extend([(random.randint(0, num_workers - 1), busket_id, pid)
                      for pid in order])
    random.shuffle(works)

    for worker_id, busket_id, product_id in works:
        error = False
        weight = np.random.normal(*products[product_id][:2])
        if random.random() <= human_error_prob:
            error = True
            rpid = random.randint(0, num_products - 1)
            while rpid == product_id:
                rpid = random.randint(0, num_products - 1)
            error_weight = np.random.normal(*products[rpid][:2])
            weight = error_weight
        if error:
            human_errors[busket_id] = True
        logs.append([worker_id, busket_id, product_id, weight, 'PUT', error])
        rem_orders[busket_id] -= 1
        if rem_orders[busket_id] == 0:
            logs.append([worker_id, busket_id, -1,
                         0, 'END', human_errors[busket_id]])

    df = pd.DataFrame(data=logs, columns=[
                      'worker_id', 'busket_id', 'product_id', 'weight', 'operation', 'label'])
    product_df = pd.DataFrame(data=products, columns=[
                              'mean', 'std', 'error_margin'])
    product_df.index.name = 'product_id'

    return df, product_df


def create_packing(num_orders, num_fillings, num_workers, human_error_prob=0.02):
    '''
    0. 포장제 랜덤 생성
    1. 주문에 대한 포장 생성
    2. 작업자 랜덤 배정
    3. 작업자 상품 포장제 집어넣는 로그 생성 (with 포장제 id)
    3. 작업자 상품 포장 완료 로그 생성
    '''
    logs = []

    fillings = create_products(num_fillings)

    packagings = create_orders(
        num_orders, num_fillings, min_items=0, max_items=5)
    rem_fillings = [len(order) for order in packagings]
    human_errors = [False for _ in range(len(packagings))]

    works = []
    for busket_id, packagig in enumerate(packagings):
        # (worker id, package id, filling id)
        works.extend([(random.randint(0, num_workers - 1), busket_id, fid)
                      for fid in packagig])
    random.shuffle(works)

    for worker_id, package_id, filling_id in works:
        error = False
        weight = np.random.normal(*fillings[filling_id][:2])
        if random.random() <= human_error_prob:
            error = True
            rfid = random.randint(0, num_fillings - 1)
            while rfid == filling_id:
                rfid = random.randint(0, num_fillings - 1)
            error_weight = np.random.normal(*fillings[rfid][:2])
            weight = error_weight
        if error:
            human_errors[package_id] = True
        logs.append([worker_id, package_id, -1, weight, 'PUT', error])
        rem_fillings[package_id] -= 1
        if rem_fillings[package_id] == 0:
            logs.append([worker_id, package_id, filling_id,
                         0, 'END', human_errors[package_id]])

    df = pd.DataFrame(data=logs, columns=[
                      'worker_id', 'package_id', 'filling_id', 'weight', 'operation', 'label'])
    product_df = pd.DataFrame(data=fillings, columns=[
                              'mean', 'std', 'error_margin'])
    product_df.index.name = 'product_id'

    return df, product_df


def create_delivery(num_orders, num_products, num_regions, num_workers, human_error_prob=0.02):
    '''
    0. 상품 및 주문 랜덤 생성
    1. 각 지역에 대한 포장 상자 랜덤 생성
    2. 작업자 랜덤 배정
    3. 작업자 포장 상자 지역별 분류 로그 생성
    4. 지역 분류 완료 로그 생성
    '''
    logs = []

    products = create_products(num_products)
    orders = create_orders(num_orders, num_products)

    # (region id, weight)
    packages = [[random.randint(0, num_regions - 1), sum(
        map(lambda x: np.random.normal(*products[x][:2]), order))] for order in orders]
    rem_packages = [0 for _ in range(len(packages))]
    for region_id, _ in packages:
        rem_packages[region_id] += 1
    human_errors = [False for _ in range(len(packages))]

    works = []
    for package_id, (region_id, weight) in enumerate(packages):
        # (worker id, package id, region id, weight)
        works.append([random.randint(0, num_workers - 1),
                      package_id, region_id, weight])
    random.shuffle(works)

    for worker_id, package_id, region_id, weight in works:
        error = False
        if random.random() <= human_error_prob:
            error = True
            rpid = random.randint(0, num_orders - 1)
            while rpid == package_id:
                rpid = random.randint(0, num_orders - 1)
            error_weight = packages[rpid][1]
            weight = error_weight
        if error:
            human_errors[region_id] = True
        logs.append([worker_id, package_id, region_id, weight, 'PUT', error])
        rem_packages[region_id] -= 1
        if rem_packages[region_id] == 0:
            logs.append([worker_id, package_id, region_id,
                         0, 'END', human_errors[region_id]])

    df = pd.DataFrame(data=logs, columns=[
                      'worker_id', 'package_id', 'region_id', 'weight', 'operation', 'label'])
    packages_df = pd.DataFrame(data=packages, columns=[
        'region_id', 'weight'])
    packages_df.index.name = 'package_id'

    return df, packages_df


if __name__ == '__main__':

    num_orders = 1000
    num_products = 10
    num_workers = 2
    num_fillings = 2
    num_regions = 50

    human_error_rate = 0.02

    picking_df, product_df = create_picking(
        num_orders, num_products, num_workers)
    picking_df.to_csv('./picking_df.csv')
    product_df.to_csv('./picking_product_df.csv')
    info_df = pd.DataFrame(data=[[num_workers, num_orders, num_products, human_error_rate]], columns=[
                           'num_workers', 'num_buskets', 'num_products', 'human_error'])
    info_df.to_csv('./picking_info_df.csv')
    print(picking_df.head(50))
    print(picking_df[picking_df['operation'] == 'END'].head(50))
    print(product_df.head(10))

    packing_df, filling_df = create_packing(
        num_orders, num_fillings, num_workers)
    packing_df.to_csv('./packing_df.csv')
    filling_df.to_csv('./packing_filling_df.csv')
    info_df = pd.DataFrame(data=[[num_workers, num_orders, num_fillings, human_error_rate]], columns=[
                           'num_workers', 'num_packages', 'num_fillings', 'human_error'])
    info_df.to_csv('./packing_info_df.csv')
    print(packing_df.head(50))
    print(packing_df[packing_df['operation'] == 'END'].head(50))
    print(filling_df.head(10))

    deliver_df, packages_df = create_delivery(
        num_orders, num_products, num_regions, num_workers)
    deliver_df.to_csv('./delivery_df.csv')
    packages_df.to_csv('./delivery_packages_df.csv')
    info_df = pd.DataFrame(data=[[num_workers, num_orders, num_regions, num_products, human_error_rate]], columns=[
                           'num_workers', 'num_packages', 'num_regions', 'num_products', 'human_error'])
    info_df.to_csv('./delivery_info_df.csv')
    print(deliver_df.head(50))
    print(deliver_df[deliver_df['operation'] == 'END'].head(50))
    print(packages_df.head(10))
