import React, { ReactElement } from 'react';

import Typography from '../Typography';

export default {
  title: 'Components/Typography',
  component: Typography,
};

export const Heading = (): ReactElement => (
  <>
    <Typography variant="h1" gutterBottom>h1. Heading 1</Typography>
    <Typography variant="h2" gutterBottom>h2. Heading 2</Typography>
    <Typography variant="h3" gutterBottom>h3. Heading 3</Typography>
    <Typography variant="h4" gutterBottom>h4. Heading 4</Typography>
    <Typography variant="h5" gutterBottom>h5. Heading 5</Typography>
    <Typography variant="h6" gutterBottom>h6. Heading 6</Typography>
  </>
);

export const Subtitle = (): ReactElement => (
  <>
    <Typography variant="subtitle1" gutterBottom>subtitle1. Subtitle 1</Typography>
    <Typography variant="subtitle2" gutterBottom>subtitle2. Subtitle 2</Typography>
  </>
);

export const Body = (): ReactElement => (
  <>
    <Typography variant="body1" gutterBottom>
      body1.
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Quam, nihil! Necessitatibus ab reiciendis laboriosam quod officia officiis assumenda libero maxime odit.
      Ducimus earum iure aut voluptas quam voluptatum in quis.
    </Typography>
    <Typography variant="body2" gutterBottom>
      body2.
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Quam, nihil! Necessitatibus ab reiciendis laboriosam quod officia officiis assumenda libero maxime odit.
      Ducimus earum iure aut voluptas quam voluptatum in quis.
    </Typography>
  </>
);

export const Button = (): ReactElement => <Typography variant="button">button. Button</Typography>;

export const Overline = (): ReactElement => <Typography variant="overline">overline. Overline</Typography>;

export const WithColor = (): ReactElement => (
  <div>
    <Typography variant="subtitle1" display="block" color="primary">primary</Typography>
    <Typography variant="subtitle1" display="block" color="error">error</Typography>
    <Typography variant="subtitle1" display="block" color="textPrimary">text.primary</Typography>
    <Typography variant="subtitle1" display="block" color="textSecondary">text.secondary</Typography>
  </div>
);
