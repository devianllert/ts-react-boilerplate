import React, { ReactElement, useState, ComponentProps } from 'react';
import styled from 'styled-components';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import TextField from '../TextField';
import InputAdornment from '../InputAdornment';

const StyledAdornment = styled.div`
  cursor: pointer;
  user-select: none;
`;

const TextFieldPassword = (props: ComponentProps<typeof TextField>): ReactElement => {
  const [type, setType] = useState('password');

  const IconComponent = type === 'password' ? MdVisibilityOff : MdVisibility;

  // don't lose focus on input
  const handleMouseDownPassword = (event: React.MouseEvent<SVGElement>): void => {
    event.preventDefault();
  };

  const togglePassword = (): void => setType(type === 'password' ? 'text' : 'password');

  return (
    <TextField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      type={type}
      endAdornment={(
        <InputAdornment position="end">
          <StyledAdornment>
            <IconComponent size={24} onClick={togglePassword} onMouseDown={handleMouseDownPassword} />
          </StyledAdornment>
        </InputAdornment>
      )}
    />
  );
};

export default TextFieldPassword;
