import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

/* TODO : get events from event store observerble */
const pickingEvents = new Array(1000);

for (let i = 0; i < 1000; ++i) {
  pickingEvents[i] = {};
}

pickingEvents[1] = {
  worker_id: 0,
  basket_id: 1,
  product_id: 9,
  weight: 0.41740172538650305,
  operation: 'PUT',
  label: 'False',
  predict: 'True',
};
pickingEvents[0] = {
  worker_id: 1,
  basket_id: 0,
  product_id: 2,
  weight: 0.4940190375572947,
  operation: 'PUT',
  label: 'False',
  predict: 'True',
};
pickingEvents[1] = {
  worker_id: 2,
  basket_id: 1,
  product_id: 9,
  weight: 0.4969732191272813,
  operation: 'PUT',
  label: 'False',
  predict: 'True',
};
pickingEvents[2] = {
  worker_id: 2,
  basket_id: 1,
  product_id: 9,
  weight: 0.4969732191272813,
  operation: 'PUT',
  label: 'False',
  predict: 'True',
};
pickingEvents[3] = {
  worker_id: 2,
  basket_id: 1,
  product_id: 9,
  weight: 0.4969732191272813,
  operation: 'PUT',
  label: 'False',
  predict: 'True',
};
pickingEvents[4] = {
  worker_id: 2,
  basket_id: 1,
  product_id: 9,
  weight: 0.4969732191272813,
  operation: 'PUT',
  label: 'False',
  predict: 'True',
};
pickingEvents[5] = {
  worker_id: 2,
  basket_id: 1,
  product_id: 9,
  weight: 0.4969732191272813,
  operation: 'PUT',
  label: 'False',
  predict: 'True',
};
pickingEvents[6] = {
  worker_id: 2,
  basket_id: 1,
  product_id: 9,
  weight: 0.4969732191272813,
  operation: 'PUT',
  label: 'False',
  predict: 'True',
};
pickingEvents[102] = {
  worker_id: 2,
  basket_id: 1,
  product_id: 9,
  weight: 0.4969732191272813,
  operation: 'PUT',
  label: 'False',
  predict: 'True',
};

const getRandomInt = (maxNum: number, minNum: number) => {
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
};

const BasketView = () => {
  const [pickingList, setPickingList] = useState([]);
  useEffect(() => {
    const tempArr = [];
    for (let row = 0; row < 10; ++row) {
      tempArr.push(new Array(20).fill(0));
    }
    setPickingList(tempArr);
  }, []);

  const changeHandler = (rowIdx: number, colIdx: number, value: number) => {
    const copy = [...pickingList];
    copy[rowIdx][colIdx] = value;
    setPickingList(copy);
  };

  const clickHander = (rowIdx: number, colIdx: number) => {
    console.log('These baskets are in error');
    for (let i = 0; i < 5; ++i) {
      if (pickingEvents[rowIdx * 100 + colIdx * 5 + i].predict !== 'True') continue;
      console.log('Basket id: ', rowIdx * 100 + colIdx * 5 + i);
    }
  };

  const countErrorBaskets = (errorBasketSumOrigin: number, rowIdx: number, colIdx: number): number => {
    const basketIndex = [0, 0, 0, 0, 0];
    for (let i = 0; i < 5; ++i) {
      basketIndex[i] = rowIdx * 100 + colIdx * 5 + i;
    }
    let errorBasketSum = 0;
    for (let i = 0; i < 5; ++i) {
      if (pickingEvents[basketIndex[i]]?.predict === 'True') {
        ++errorBasketSum;
      }
    }

    if (errorBasketSum !== errorBasketSumOrigin) {
      changeHandler(rowIdx, colIdx, errorBasketSum);
    }

    return errorBasketSum;
  };

  // temp function for test
  const changePickingEventHandler = () => {
    const basketIndex = getRandomInt(1000, 0);
    const workerId = getRandomInt(5, 0);
    const productId = getRandomInt(10, 0);
    const predict = getRandomInt(2, 0) === 1 ? 'True' : 'False';
    if (pickingEvents[basketIndex]?.predict === 'True') return;
    pickingEvents[basketIndex] = {
      worker_id: workerId,
      basket_id: basketIndex,
      product_id: productId,
      predict: predict,
    };
    const [row, col] = [Math.floor(basketIndex / 100), Math.floor(Math.floor(basketIndex % 100) / 5)];
    countErrorBaskets(pickingList[row][col], row, col);
  };

  return (
    <div className={styles.basketView}>
      <button onClick={changePickingEventHandler}>random create</button>
      <table>
        <tbody className={styles.tableBody}>
          {pickingList.map((row: any, rowIdx: number) => {
            return (
              <tr key={rowIdx}>
                {row.map((value: number, colIdx: number) => {
                  const errorBasketSum = countErrorBaskets(value, rowIdx, colIdx);
                  return (
                    <td
                      key={colIdx}
                      className={rowIdx % 2 ? styles.tdEnter : styles.tdNoEnter}
                      onClick={errorBasketSum ? () => clickHander(rowIdx, colIdx) : null}
                      style={
                        errorBasketSum
                          ? { color: 'red', backgroundColor: 'pink', cursor: 'pointer' }
                          : { backgroundColor: 'green', cursor: 'default' }
                      }
                    >
                      {pickingList[rowIdx][colIdx]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BasketView;
