import { observer } from 'mobx-react-lite';
import React from 'react';
import Select from 'react-select';
import { EventColumn } from '../../../pages/Picking/type';
import useStores from '../../../hooks/useStores';

export interface Option {
  label: string;
  value: string | number;
}

export interface SelectOptionProps {
  placeholder?: string;
  col: EventColumn;
  options: readonly Option[];
}

const SelectOption: React.FunctionComponent<SelectOptionProps> = ({ placeholder, col, options }: SelectOptionProps) => {
  const { eventStore } = useStores();

  const filterChangeHandler = (col: EventColumn, option: Option): void => {
    eventStore.updateFilterValueByKey({ [col]: option } as any);
  };

  return (
    <Select
      placeholder={placeholder}
      options={options}
      onChange={(newValue: Option) => filterChangeHandler(col, newValue)}
      isClearable
    />
  );
};

export default observer(SelectOption);
