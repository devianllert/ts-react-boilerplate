import React, { ReactElement } from 'react';
import { MdPerson } from 'react-icons/md';
import styled from 'styled-components';

import InputBase from '../InputBase';
import InputAdornment from '../../InputAdornment';

import { PRIMARY } from '../../../../design/colors';

export default {
  title: 'Components/InputBase',
  component: InputBase,
};

const CustomizedInput = styled(InputBase)`
  border: 2px solid ${PRIMARY};
  border-radius: 4px;
  padding: 0 8px;
`;

export const Basic = (): ReactElement => <InputBase placeholder="Input" />;

export const WithStartAdornment = (): ReactElement => (
  <InputBase
    startAdornment={(
      <InputAdornment position="start">
        <MdPerson size={24} />
      </InputAdornment>
    )}
    placeholder="Input"
  />
);

export const WithEndAdornment = (): ReactElement => (
  <InputBase
    endAdornment={(
      <InputAdornment position="end">
        <MdPerson size={24} />
      </InputAdornment>
    )}
    placeholder="Input"
  />
);

export const Customized = (): ReactElement => (
  <CustomizedInput
    startAdornment={(
      <InputAdornment position="start">
        <MdPerson size={24} />
      </InputAdornment>
    )}
    placeholder="Input"
  />
);

export const Disabled = (): ReactElement => (
  <CustomizedInput
    disabled
    startAdornment={(
      <InputAdornment position="start">
        <MdPerson size={24} />
      </InputAdornment>
    )}
    placeholder="Input"
  />
);
