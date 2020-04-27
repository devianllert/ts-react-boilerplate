import React, { ReactElement } from 'react';
import { MdArchive, MdBrokenImage } from 'react-icons/md';

import Avatar from '../Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
};

export const Basic = (): ReactElement => (
  <Avatar src="https://gravatar.com/avatar/boilerplate?s=60&d=retro" alt="avatar" />
);

export const Fallback = (): ReactElement => (
  <Avatar src="/broken.jpg" alt="fallback" />
);

export const WithLetter = (): ReactElement => (
  <>
    <Avatar>R</Avatar>
    <Avatar style={{ backgroundColor: '#bb98ff' }}>V</Avatar>
    <Avatar style={{ backgroundColor: '#8a2be2' }}>AN</Avatar>
  </>
);

export const WithIcons = (): ReactElement => (
  <>
    <Avatar style={{ backgroundColor: '#bb98ff' }}><MdArchive /></Avatar>
    <Avatar style={{ backgroundColor: '#8a2be2' }}><MdBrokenImage /></Avatar>
  </>
);

export const Rounded = (): ReactElement => (
  <Avatar variant="rounded" style={{ backgroundColor: '#8a2be2' }}>R</Avatar>
);

export const Square = (): ReactElement => (
  <Avatar variant="square" style={{ backgroundColor: '#8a2be2' }}>R</Avatar>
);
