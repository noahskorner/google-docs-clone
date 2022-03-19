import { useState } from 'react';
import Component from '../../molecules/component';
import Variant from '../../molecules/variant';
import Select, { SelectOption } from '../../atoms/select';

const basicSelectOptions: Array<SelectOption> = [
  {
    text: 'Option 1',
    value: 1,
  },
  {
    text: 'Option 2',
    value: 2,
  },
  {
    text: 'Option 3',
    value: 3,
  },
  {
    text: 'Option 4',
    value: 4,
  },
  {
    text: 'Option 5',
    value: 5,
  },
  {
    text: 'Option 6',
    value: 6,
  },
  {
    text: 'Option 7',
    value: 7,
  },
  {
    text: 'Option 8',
    value: 8,
  },
  {
    text: 'Option 9',
    value: 9,
  },
  {
    text: 'Option 10',
    value: 10,
  },
];

const Selects = () => {
  const [basicSelect, setBasicSelect] = useState<number | null>(null);
  const [multiSelect, setMultiSelect] = useState<number | null>(null);
  const [errorSelect, setErrorSelect] = useState<number | null>(null);

  return (
    <Component header="Selects">
      <Variant header="Basic Selects">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Select
            placeholder="Select an option"
            label="Basic Select"
            options={basicSelectOptions}
            value={basicSelect}
            setValue={setBasicSelect}
          />
          <Select
            placeholder="Select an option"
            label="Multi Select"
            type="multi"
            options={basicSelectOptions}
            value={multiSelect}
            setValue={setMultiSelect}
          />
          <Select
            placeholder="Select an option"
            label="Basic Select"
            options={basicSelectOptions}
            value={errorSelect}
            setValue={setErrorSelect}
            errors={['This is an error']}
          />
        </div>
      </Variant>
    </Component>
  );
};

export default Selects;
