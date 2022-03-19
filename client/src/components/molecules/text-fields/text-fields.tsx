import { useState } from 'react';
import Component from '../component';
import Variant from '../variant';
import TextField from '../../atoms/text-field';
import { AtSymbolIcon } from '@heroicons/react/outline';

const TextFields = () => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [textArea, setTextArea] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Component header="Text Fields">
      <Variant header="Basic Text Field">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
          <TextField value={text} onInput={setText} label="Text" />
          <TextField
            value={password}
            onInput={setPassword}
            label="Password"
            type="password"
          />
        </div>
        <div className="w-full grid grid-cols-1 gap-2">
          <TextField
            value={textArea}
            onInput={setTextArea}
            label="Text Area"
            type="textarea"
          />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
          <TextField
            value={text}
            onInput={setText}
            label="Errors"
            errors={['This is the first error', 'Here is the second one']}
          />
          <TextField
            value={phoneNumber}
            onInput={setPhoneNumber}
            label="Phone Number"
            mask="(999) 999-9999"
          />
          <TextField
            value={email}
            onInput={setEmail}
            label="Icons"
            icon={<AtSymbolIcon className="w-4 h-4" />}
          />
        </div>
      </Variant>
    </Component>
  );
};

export default TextFields;
