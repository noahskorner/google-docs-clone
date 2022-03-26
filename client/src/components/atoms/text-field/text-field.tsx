import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { useEffect, useRef, useState } from 'react';
import InputMask from 'inputmask';
import InputProps from '../../../types/interfaces/input';
import Errors from '../errors';

interface TextFieldProps extends InputProps {
  value?: string | number;
  onInput?: Function;
  type?: 'text' | 'password' | 'textarea';
  mask?: string;
  icon?: JSX.Element;
  color?: 'primary' | 'secondary';
}

const TEXT_FIELD_CLASSES = {
  primary: 'bg-white dark:bg-slate-800',
  secondary: 'bg-slate-50 dark:bg-slate-700',
};

const TextField = ({
  value,
  onInput = () => alert('onInput not registered.'),
  type = 'text',
  label,
  placeholder,
  errors = [],
  mask,
  icon,
  color = 'primary',
}: TextFieldProps) => {
  const textFieldRef = useRef<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (textFieldRef && textFieldRef.current && mask) {
      const inputMask = new InputMask(mask);
      inputMask.mask(textFieldRef.current);
    }
  }, [mask]);

  return (
    <div className="w-full text-sm relative space-y-1">
      {label && <label htmlFor="">{label}</label>}
      {/* Text Field */}
      <div
        className={`${
          errors.length
            ? 'ring-1 ring-red-500'
            : isFocused
            ? 'ring-1 ring-blue-600'
            : ''
        } ${
          TEXT_FIELD_CLASSES[color]
        } w-full border shadow-sm  rounded flex justify-center items-center border-primary`}
      >
        {/* Leading Icon */}
        <div className="pl-2 text-slate-400">{icon}</div>
        {/* Input */}
        {type !== 'textarea' ? (
          <div className="w-full flex justify-between items-center">
            <input
              ref={textFieldRef}
              type={type !== 'password' ? type : showPassword ? 'text' : type}
              onInput={(e) => onInput((e.target as HTMLTextAreaElement).value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={value}
              className={`${TEXT_FIELD_CLASSES[color]} w-full p-2 rounded`}
              placeholder={placeholder && placeholder}
            />
            {type === 'password' && (
              <button
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                className="h-full flex justify-center item-center p-2 text-slate-400"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-4 h-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        ) : (
          // Text Area
          <textarea
            ref={textFieldRef}
            onInput={(e) => onInput((e.target as HTMLTextAreaElement).value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder && placeholder}
            value={value}
            className="w-full p-2 bg-white dark:bg-slate-800 rounded"
          ></textarea>
        )}
        {/* Trailing Icon */}
        {errors.length ? (
          <div className="pr-2 text-red-500">
            <ExclamationCircleIcon className="w-4 h-4" />
          </div>
        ) : null}
      </div>
      <Errors errors={errors} />
    </div>
  );
};

export default TextField;
