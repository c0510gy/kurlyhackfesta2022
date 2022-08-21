import React, { CSSProperties } from 'react';

interface ButtonProps {
  style?: CSSProperties;
  className: string;
  type: 'button' | 'submit' | 'reset';
  value?: string;
  children:
    | string
    | JSX.Element /* <img>, <i>, <b>, <string>, etc. But that is not possible with a button created with the <input> */;
  disabled?: boolean;
  clickHandler: () => void;
}

const defaultStyle: React.CSSProperties = {
  cursor: 'pointer',
};

const Button: React.FunctionComponent<ButtonProps> = ({
  style,
  className,
  type,
  value,
  children,
  clickHandler,
  disabled,
}: ButtonProps): JSX.Element => {
  return (
    <button
      style={{ ...style, ...defaultStyle }}
      className={className}
      type={type}
      value={value}
      onClick={clickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
