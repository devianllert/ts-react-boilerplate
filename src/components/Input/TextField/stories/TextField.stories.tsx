import React, {
  useState,
  useRef,
  ReactElement,
  ChangeEvent,
} from 'react';
import { MdPerson, MdLock, MdLockOpen } from 'react-icons/md';
import styled from 'styled-components';
import { withKnobs, text } from '@storybook/addon-knobs';

import TextField from '../TextField';
import InputAdornment from '../../InputAdornment';
import Button from '../../../Button';

export default {
  title: 'Components/TextField',
  component: TextField,
  decorators: [withKnobs],
};

const StyledAdornment = styled.div`
  cursor: pointer;
  user-select: none;
`;

export const Basic = (): ReactElement => (
  <TextField
    startAdornment={(
      <InputAdornment position="start">
        <MdPerson size={24} />
      </InputAdornment>
    )}
    placeholder="Input"
  />
);

export const WithLabel = (): ReactElement => (
  <TextField
    label={text('label', 'Email')}
    id="labeled"
    startAdornment={(
      <InputAdornment position="start">
        <MdPerson size={24} />
      </InputAdornment>
    )}
    placeholder="Input"
  />
);

export const WithHelperText = (): ReactElement => (
  <TextField
    label={text('label', 'Email')}
    helperText={text('helperText', 'This is a helper text')}
    id="labeled"
    startAdornment={(
      <InputAdornment position="start">
        <MdPerson size={24} />
      </InputAdornment>
    )}
    placeholder="Input"
  />
);

export const Error = (): ReactElement => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setError('');
    setValue(evt.target.value);

    if (evt.target.value === '') setError('This is required field');
  };

  return (
    <TextField
      label="Email"
      helperText={error || ' '}
      error={!!error}
      value={value}
      onChange={handleChange}
      startAdornment={(
        <InputAdornment position="start">
          <MdPerson size={24} />
        </InputAdornment>
      )}
      placeholder="Input"
    />
  );
};

export const Disabled = (): ReactElement => (
  <TextField
    label="Email"
    helperText="This is a helper text"
    disabled
    startAdornment={(
      <InputAdornment position="start">
        <MdPerson size={24} />
      </InputAdornment>
    )}
    placeholder="Input"
  />
);

export const AutoFocus = (): ReactElement => (
  <TextField
    label="Email"
    helperText="This is a helper text"
    required
    autoFocus
    startAdornment={(
      <InputAdornment position="start">
        <MdPerson size={24} />
      </InputAdornment>
    )}
    placeholder="Input"
  />
);

export const WithPasswordAdornment = (): ReactElement => {
  const [type, setType] = useState('password');

  const IconComponent = type === 'password' ? MdLock : MdLockOpen;

  // don't lose focus on input
  const handleMouseDownPassword = (event: React.MouseEvent<SVGElement>): void => {
    event.preventDefault();
  };

  const togglePassword = (): void => setType(type === 'password' ? 'text' : 'password');

  return (
    <>
      <TextField
        label="Email"
        required
        type={type}
        endAdornment={(
          <InputAdornment position="end">
            <StyledAdornment>
              <IconComponent
                size={24}
                onClick={togglePassword}
                onMouseDown={handleMouseDownPassword}
              />
            </StyledAdornment>
          </InputAdornment>
        )}
        placeholder="Input"
      />
    </>
  );
};

export const InputRef = (): ReactElement => {
  const inputRef = useRef<HTMLInputElement>();

  const focusInput = (): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <TextField
        label="Email"
        required
        inputRef={inputRef}
        startAdornment={(
          <InputAdornment position="start">
            <MdPerson size={24} />
          </InputAdornment>
        )}
        placeholder="Input"
      />
      <Button onClick={focusInput}>Focus</Button>
    </>
  );
};
