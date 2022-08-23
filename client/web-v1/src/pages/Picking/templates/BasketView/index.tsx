import React, { useEffect, useState } from 'react';
import useStores from '../../../../hooks/useStores';
import styles from './index.module.scss';

const getRandomInt = (maxNum: number, minNum: number) => {
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
};

const BasketView = () => {
  const [pickingListErrorSum, setPickingListErrorSum] = useState([]);
  const { eventStore } = useStores();
  useEffect(() => {
    const tempArr:any[] = [];
    for (let row = 0; row < 10; ++row) {
      tempArr.push(new Array(20).fill(0));
    }

    // eventStore.pickingEvents.map((pe) => {
    //   console.log('pe', pe)
      // const basketId = pe.busket_id % 1000;
      // const [row, col] = [Math.floor(basketId / 100), Math.floor(basketId % 100 / 5)];
      // tempArr[row][col] += 1;
      // if (pe.operation === 'END'){
      //   console.log('end', pe)
      // }
    // });
    setPickingListErrorSum(tempArr);
    // console.log('eventStore', eventStore.pickingEvents)
  }, []);

  const changeHandler = (rowIdx: number, colIdx: number, value: number) => {
    const copy = [...pickingListErrorSum];
    copy[rowIdx][colIdx] = value;
    setPickingListErrorSum(copy);
  };

  const clickHander = (rowIdx: number, colIdx: number) => {
    console.log('These baskets are in error');
    for (let i = 0; i < 5; ++i) {
      if (!eventStore.pickingEvents[rowIdx * 100 + colIdx * 5 + i]?.pred) continue;
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
      if (eventStore.pickingEvents[basketIndex[i]]?.pred) {
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
    const pred = getRandomInt(2, 0) === 1;
    if (eventStore.pickingEvents[basketIndex]?.pred) return;
    pickingListErrorSum[basketIndex] = {
      worker_id: workerId,
      busket_id: basketIndex,
      product_id: productId,
      pred: pred,
    };
    const [row, col] = [Math.floor(basketIndex / 100), Math.floor(Math.floor(basketIndex % 100) / 5)];
    countErrorBaskets(pickingListErrorSum[row][col], row, col);
  };

  return (
    <div className={styles.basketView}>
      <button onClick={changePickingEventHandler}>random create</button>
      <table>
        <tbody className={styles.tableBody}>
          {pickingListErrorSum.map((row: any, rowIdx: number) => {
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
                      {pickingListErrorSum[rowIdx][colIdx]}
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
