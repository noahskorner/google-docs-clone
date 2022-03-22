import InputProps from '../../../types/interfaces/input';
import {
  SelectorIcon,
  ExclamationCircleIcon,
  XIcon,
} from '@heroicons/react/solid';
import { useState, MouseEvent, FocusEvent, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { isStringArray, isNumArray } from '../../../utils/functions';
import Errors from '../errors';

export interface SelectOption {
  text: string;
  value: string | number;
}

interface SelectProps extends InputProps {
  value?: string | number | Array<string> | Array<number> | null;
  setValue?: Function;
  options: Array<SelectOption>;
  type?: 'single' | 'multi';
}

const Select = ({
  value,
  label,
  placeholder,
  errors = [],
  options,
  type = 'single',
  setValue = (value: string | number) =>
    console.warn(`onSelect not registered, ${value} selected.`),
}: SelectProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  const optionIsSelected = (option: string | number) => {
    if (type === 'single' && value === option) return true;
    if (type === 'multi') {
      if (isStringArray(value)) {
        return (value as Array<string>).includes(option as string);
      }
      if (isNumArray(value)) {
        return (value as Array<number>).includes(option as number);
      }
    }
    return false;
  };

  const selectOption = (option: string | number) => {
    if (type === 'single') {
      setValue(option);
      setShowOptions(false);
    } else {
      if (!value) {
        setValue([option]);
      } else if (isStringArray(value)) {
        if ((value as Array<string>).includes(option as string)) {
          setValue([
            ...(value as Array<string>).filter((item) => item !== option),
          ]);
        } else setValue([...(value as Array<string>), option]);
      } else if (isNumArray(value)) {
        if ((value as Array<number>).includes(option as number)) {
          setValue([
            ...(value as Array<number>).filter((item) => item !== option),
          ]);
        } else setValue([...(value as Array<number>), option]);
      }
    }
  };

  const handleSelectClick = (e: MouseEvent<HTMLButtonElement>) => {
    setShowOptions(!showOptions);
  };

  const handleSelectBlur = (e: FocusEvent<HTMLDivElement>) => {
    setShowOptions(false);
  };

  return (
    <div
      tabIndex={0}
      className="relative w-full max-w-full text-sm space-y-1"
      onBlur={handleSelectBlur}
    >
      {label && <label>{label}</label>}
      {/* Select */}
      <button
        onMouseDown={handleSelectClick}
        className={`${
          errors.length
            ? 'ring-1 ring-red-500 focus:ring-1 focus:ring-red-500'
            : 'focus:ring-1 focus:ring-blue-600'
        } w-full max-w-full border shadow-sm bg-white dark:bg-slate-800 rounded-md flex justify-between items-center border-primary text-left`}
      >
        <div
          className="w-full bg-white dark:bg-slate-800 p-2 rounded-md flex"
          style={{ maxWidth: 'calc(100% - 2rem)' }}
        >
          {!value ? (
            placeholder ? (
              <span className="text-slate-400">{placeholder}</span>
            ) : (
              <span>&nbsp;</span>
            )
          ) : type === 'single' ? (
            <span>{value}</span>
          ) : type === 'multi' && (value as Array<string | number>).length ? (
            <div className="space-x-1 overflow-scroll scrollbar-hidden flex multi-select-options max-w-fit">
              {(value as Array<string | number>).map((item, index) => (
                <span
                  onClick={() => selectOption(item)}
                  key={item}
                  className="px-1 space-x-3 bg-blue-600 text-white rounded multi-select-option flex justify-between items-center"
                >
                  <span className="pl-1 multi-select-option">{item}</span>
                  <XIcon className="w-3 multi-select-option" />
                </span>
              ))}
            </div>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
        <div className="h-full flex shrink-0 justify-center items-center text-slate-400">
          <div className="flex flex-col justify-center items-center px-2">
            <SelectorIcon className="w-5" />
          </div>
        </div>
        {/* Trailing Icon */}
        {errors.length ? (
          <div className="text-red-500 relative pr-2">
            <ExclamationCircleIcon className="w-4 h-4" />
          </div>
        ) : null}
      </button>
      {/* Options */}
      <CSSTransition
        nodeRef={optionsRef}
        in={showOptions}
        timeout={200}
        classNames="fade-in"
        unmountOnExit
        children={
          <div
            ref={optionsRef}
            className="absolute z-10 w-full max-h-52 overflow-y-auto bg-white dark:bg-slate-800 py-2 rounded-md shadow-lg border border-primary"
          >
            {options.map((option) => {
              return (
                <option
                  onClick={() => selectOption(option.value)}
                  key={option.value}
                  value={option.value}
                  className={`${
                    optionIsSelected(option.value)
                      ? `${
                          type === 'multi' && 'cursor-pointer'
                        } bg-blue-600 text-white`
                      : ' cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700'
                  } p-2`}
                >
                  {option.text}
                </option>
              );
            })}
          </div>
        }
      />
      <Errors errors={errors} />
    </div>
  );
};

export default Select;
