import React, { useEffect, useState } from 'react';
import useStores from '../../../../hooks/useStores';
import ReactTooltip from 'react-tooltip';
import styles from './index.module.scss';

const BasketView = () => {
  const [pickingListErrorSum, setPickingListErrorSum] = useState([]);
  const { eventStore } = useStores();
  eventStore.loadEvents();

  useEffect(() => {
    const tempArr: any[] = [];
    for (let row = 0; row < 10; ++row) {
      tempArr.push(new Array(20).fill(0));
    }
    setPickingListErrorSum(tempArr);
  }, []);

  const changeHandler = (rowIdx: number, colIdx: number, value: number) => {
    const copy = [...pickingListErrorSum];
    copy[rowIdx][colIdx] = value;
    setPickingListErrorSum(copy);
  };

  const tooltipHandler = (rowIdx: number, colIdx: number): number[] => {
    const retArr: number[] = [];
    for (let i = 0; i < 5; ++i) {
      if (!eventStore.events.busket[rowIdx * 100 + colIdx * 5 + i]?.pred) continue;
      retArr.push(rowIdx * 100 + colIdx * 5 + i);
    }
    return retArr;
  };

  const countErrorBaskets = (errorBasketSumOrigin: number, rowIdx: number, colIdx: number): number => {
    const basketIndex = [0, 0, 0, 0, 0];
    for (let i = 0; i < 5; ++i) {
      basketIndex[i] = rowIdx * 100 + colIdx * 5 + i;
    }
    let errorBasketSum = 0;
    for (let i = 0; i < 5; ++i) {
      if (eventStore.events.busket[basketIndex[i]]?.pred) {
        ++errorBasketSum;
      }
    }

    if (errorBasketSum !== errorBasketSumOrigin) {
      changeHandler(rowIdx, colIdx, errorBasketSum);
    }
    return errorBasketSum;
  };

  return (
    <div className={styles.basketView}>
      <table>
        <tbody className={styles.tableBody}>
          {pickingListErrorSum.map((row: any, rowIdx: number) => {
            return (
              <tr key={rowIdx}>
                {row.map((value: number, colIdx: number) => {
                  const errorBasketSum = countErrorBaskets(value, rowIdx, colIdx);
                  console.log('pickingListErrorSum[rowIdx][colIdx]', pickingListErrorSum[rowIdx][colIdx]);
                  return (
                    <td
                      key={colIdx}
                      className={rowIdx % 2 ? styles.tdEnter : styles.tdNoEnter}
                      style={
                        errorBasketSum
                          ? {
                              backgroundColor: '#f45790',
                              fontWeight: 900,
                              color: 'white',
                              cursor: 'pointer',
                            }
                          : { backgroundColor: '#bbdefb', cursor: 'default' }
                      }
                      data-tip={'tooltips'}
                      data-for={rowIdx.toString() + colIdx.toString()}
                    >
                      <span>{pickingListErrorSum[rowIdx][colIdx]}</span>
                      {errorBasketSum ? (
                        <ReactTooltip type="error" effect="solid" id={rowIdx.toString() + colIdx.toString()}>
                          {tooltipHandler(rowIdx, colIdx).map((ret, idx) => {
                            return <div key={idx + 10000}>basket id {ret} has error</div>;
                          })}
                        </ReactTooltip>
                      ) : null}
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
