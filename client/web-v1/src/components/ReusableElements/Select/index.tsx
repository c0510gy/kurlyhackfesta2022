import React from 'react';
import Select from 'react-select';
import { EventColumn } from '../../../pages/Picking/type';

export interface SelectOptionProps {
  col: EventColumn;
  options: Array<{
    label: string;
    value: string;
  }>;
}

const SelectOption: React.FunctionComponent<SelectOptionProps> = ({ col, options }: SelectOptionProps) => {
  return <Select placeholder={col} options={options} />;
};

export default SelectOption;
