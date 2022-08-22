import React from 'react';
import styles from './index.module.scss';

interface RadioObject {
  buttons: Array<string>;
}

interface PropsRadioButtonGroup {
  style?: React.CSSProperties;
  value: string;
  text: string;
  radioObject: RadioObject;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const defaultStyle: React.CSSProperties = {
  appearance: 'auto',
};

const RadioButtonGroup: React.FunctionComponent<PropsRadioButtonGroup> = ({
  style,
  value,
  text,
  radioObject,
  onChangeHandler,
}: PropsRadioButtonGroup) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>

      <form className={styles.radioArea}>
        {radioObject.buttons.map((item, index) => {
          const checked = item === value;

          return (
            <label key={index} className={styles.label}>
              <input
                style={{ ...style, ...defaultStyle }}
                className={styles.input}
                type={'radio'}
                name={value}
                defaultChecked={checked}
                value={item}
                onChange={onChangeHandler}
              />
              <div className={styles.checkmark} />
              {item}%
            </label>
          );
        })}
      </form>
    </div>
  );
};

export default RadioButtonGroup;
