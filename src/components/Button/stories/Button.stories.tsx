import React, { ReactElement } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

import Button from '../Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = (): ReactElement => <Button appearence="primary">Primary Button</Button>;

export const Success = (): ReactElement => <Button appearence="success">Success Button</Button>;

export const Warning = (): ReactElement => <Button appearence="warning">Warning Button</Button>;

export const Danger = (): ReactElement => <Button appearence="danger">Danger Button</Button>;

export const Disabled = (): ReactElement => <Button disabled>Disabled Button</Button>;

export const Loading = (): ReactElement => <Button loading>Loading Button</Button>;

export const WithStartIcon = (): ReactElement => <Button startIcon={<MdArrowBack size={16} />}>Back</Button>;

export const WithEndIcon = (): ReactElement => <Button endIcon={<MdArrowForward size={16} />}>Next</Button>;
