import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Auth } from 'aws-amplify';
import { HumanErrorRate, Simulator } from '../../components/ContentElements/RadioButtonGroup/type';
import { Fulfillment } from '../../stores/event/type';
import RadioButtonGroup from '../../components/ContentElements/RadioButtonGroup';
import Button from '../../components/ReusableElements/Button';
import useStores from '../../hooks/useStores';
import styles from './index.module.scss';

const Landing: React.FunctionComponent = (): JSX.Element => {
  const { authStore, eventStore } = useStores();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      const idToken = user.signInUserSession.idToken.jwtToken;
      const accessToken = user.signInUserSession.accessToken.jwtToken;
      const name = user.attributes.nickname;
      authStore.updateToken(idToken, accessToken, name);
    });
  }, []);

  const [value, setValue] = useState<Simulator>({
    simulation: Fulfillment.picking,
    errorRate: HumanErrorRate.Primary,
  });

  const radioButtonClickHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let target = event.target as HTMLInputElement;

    setValue({ ...value, [target.id]: target.value });
  };

  const startGravimetricHandler = (): void => {
    eventStore.startSimulator(value);
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Simulation Manipulation</h2>
        <div className={styles.simulationManipulationWrapper}>
          <div className={styles.radioButtonGroupWrapper}>
            <RadioButtonGroup
              id={'simulation'}
              value={value.simulation}
              text={'시작할 시뮬레이션을 선택해주세요.'}
              radioObject={{ buttons: Object.values(Fulfillment) }}
              onChangeHandler={radioButtonClickHandler}
            />
            <RadioButtonGroup
              id={'errorRate'}
              value={value.errorRate}
              text={'휴먼 에러율을 설정하여 시작해보세요.'}
              radioObject={{ buttons: Object.values(HumanErrorRate) }}
              onChangeHandler={radioButtonClickHandler}
            />
          </div>
          <Button className={styles.simulationBtn} type={'submit'} clickHandler={startGravimetricHandler}>
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default observer(Landing);
