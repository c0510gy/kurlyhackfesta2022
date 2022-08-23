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
  col: EventColumn;
  options: readonly Option[];
}

const SelectOption: React.FunctionComponent<SelectOptionProps> = ({ col, options }: SelectOptionProps) => {
  const { eventStore } = useStores();

  const filterChangeHandler = (col: EventColumn, option: Option): void => {
    eventStore.updateFilterValueByKey({ [col]: option } as any);
  };

  return (
    <Select
      placeholder={col}
      options={options}
      onChange={(newValue: Option) => filterChangeHandler(col, newValue)}
      isClearable
    />
  );
};

export default observer(SelectOption);
