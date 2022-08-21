import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Auth } from 'aws-amplify';
import RadioButtonGroup from '../../components/ContentElements/RadioButtonGroup';
import Button from '../../components/ReusableElements/Button';
import { SimulationErrorRate } from '../../components/ContentElements/RadioButtonGroup/type';
import useStores from '../../hooks/useStores';

import styles from './index.module.scss';

const Landing: React.FunctionComponent = (): JSX.Element => {
  const { authStore } = useStores();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      const idToken = user.signInUserSession.idToken.jwtToken;
      const accessToken = user.signInUserSession.accessToken.jwtToken;
      const name = user.attributes.nickname;
      authStore.updateToken(idToken, accessToken, name);
    });
  }, []);

  const [value, setValue] = useState<string>(SimulationErrorRate.Primary);

  const radioButtonClickHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let target = event.target as HTMLInputElement;

    setValue(target.value);
  };

  const startGravimetricHandler = (): void => {
    // TODO:  make a request call func from event store
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Simulation Manipulation</h2>
        <div className={styles.simulationManipulationWrapper}>
          <div className={styles.radioButtonGroupWrapper}>
            <RadioButtonGroup
              value={value}
              text={'휴먼 에러율을 설정하여 시작해보세요.'}
              radioObject={{ buttons: Object.values(SimulationErrorRate) }}
              onChangeHandler={radioButtonClickHandler}
            />
          </div>
          <Button className={styles.simulationBtn} type={'submit'} value={value} clickHandler={startGravimetricHandler}>
            시작하기
          </Button>
        </div>
      </div>

      <div>
        <h2>Manual</h2>
      </div>
    </div>
  );
};

export default observer(Landing);
