/**
 * From
 * https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Avatar/Avatar.js
 */

import React, {
  ReactElement,
  ElementType,
  ReactNode,
  ImgHTMLAttributes,
  HTMLAttributes,
  useState,
  useEffect,
} from 'react';
import { MdPerson } from 'react-icons/md';

import * as S from './styled';

interface Props extends HTMLAttributes<ElementType> {
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt?: string;
  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
   */
  children?: ReactNode;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: ElementType;
  /**
   * Attributes applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
   */
  imgProps?: ImgHTMLAttributes<HTMLImageElement>;
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes?: string;
  /**
   * The `src` attribute for the `img` element.
   */
  src?: string;
  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet?: string;
  /**
   * The shape of the avatar.
   */
  variant?: 'circle' | 'rounded' | 'square';
}

// TODO: rewrite hook
const useLoaded = (src?: string, srcSet?: string): boolean | string => {
  const [loaded, setLoaded] = useState<false | 'loaded' | 'error'>(false);

  useEffect(() => {
    if (!src) {
      return undefined;
    }

    setLoaded(false);

    let active = true;
    const image = new Image();

    image.src = src;

    if (srcSet) {
      image.srcset = srcSet;
    }

    image.onload = (): void => {
      image.onload = null;
      image.onerror = null;

      if (active) setLoaded('loaded');
    };

    image.onerror = (): void => {
      image.onload = null;
      image.onerror = null;

      if (active) setLoaded('error');
    };

    return (): void => {
      active = false;
    };
  }, [src, srcSet]);

  return loaded;
};

const Avatar = (props: Props): ReactElement => {
  const {
    alt,
    children,
    className,
    component = 'div',
    imgProps,
    sizes,
    src,
    srcSet,
    variant = 'circle',
    ...other
  } = props;

  let content = null;

  // Use a hook instead of onError on the img element to support server-side rendering.
  const loaded = useLoaded(src, srcSet);
  const hasImg = src || srcSet;
  const hasImgNotFailing = hasImg && loaded !== 'error';

  if (hasImgNotFailing) {
    content = (
      <S.AvatarImage
        alt={alt}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...imgProps}
      />
    );
  } else if (children) {
    content = children;
  } else {
    content = <S.AvatarFallback as={MdPerson} />;
  }

  return (
    <S.AvatarWrapper
      as={component}
      variant={variant}
      className={className}
      loaded={!!hasImgNotFailing}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {content}
    </S.AvatarWrapper>
  );
};

export default Avatar;
