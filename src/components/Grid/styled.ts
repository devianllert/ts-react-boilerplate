/* eslint-disable @typescript-eslint/indent */
/* eslint-disable indent */
/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import {
  GridContentAlignment,
  GridItemsAlignment,
  GridDirection,
  GridJustification,
  GridSpacing,
  GridWrap,
} from './Grid.interface';

import media from '../../design/media';
import { spacings } from '../../design/spacings';

interface Props {
  alignContent?: GridContentAlignment;
  alignItems?: GridItemsAlignment;
  container?: boolean;
  direction?: GridDirection;
  item?: boolean;
  justify?: GridJustification;
  spacing?: GridSpacing;
  wrap?: GridWrap;
  zeroMinWidth?: boolean;
  desktop?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  laptop?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  tablet?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  mobile?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

function getOffset(val: string, div = 1): string {
  const parse = parseFloat(val);

  return `${parse / div}${String(val).replace(String(parse), '') || 'px'}`;
}

export const GridRow = styled.div<Props>`
  ${({ container }): string | undefined | false => container && `
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  `}

  ${({ item }): string | undefined | false => item && `
    box-sizing: border-box;
    margin: 0;
  `}

  ${({ container, spacing }): string | undefined | false | 0 => container && spacing && `
    margin: -${getOffset(spacings[spacing], 2)};
    width: calc(100% + ${getOffset(spacings[spacing])});
    & > * {
      padding: ${getOffset(spacings[spacing], 2)};
    }
  `}

  ${({ desktop }): string => `
    @media ${media.desktop.up} {
      flex-basis: ${(
        (desktop === true && '0')
        || (desktop === 'auto' && 'auto')
        || (typeof desktop === 'number' && `${Math.round((desktop / 12) * 10e7) / 10e5}%`)
        || ''
      )};
      flex-grow: ${(
        (desktop === true && '1')
        || (desktop === 'auto' && '0')
        || (typeof desktop === 'number' && '0')
        || ''
      )};
      max-width: ${(
        (desktop === true && '100%')
        || (desktop === 'auto' && 'none')
        || (typeof desktop === 'number' && `${Math.round((desktop / 12) * 10e7) / 10e5}%`)
        || ''
      )};
    }
  `}

  ${({ laptop }): string => `
    @media ${media.laptop.up} {
      flex-basis: ${(
        (laptop === true && '0')
        || (laptop === 'auto' && 'auto')
        || (typeof laptop === 'number' && `${Math.round((laptop / 12) * 10e7) / 10e5}%`)
        || ''
      )};
      flex-grow: ${(
        (laptop === true && '1')
        || (laptop === 'auto' && '0')
        || (typeof laptop === 'number' && '0')
        || ''
      )};
      max-width: ${(
        (laptop === true && '100%')
        || (laptop === 'auto' && 'none')
        || (typeof laptop === 'number' && `${Math.round((laptop / 12) * 10e7) / 10e5}%`)
        || ''
      )};
    }
  `}

  ${({ tablet }): string => `
    @media ${media.tablet.up} {
      flex-basis: ${(
        (tablet === true && '0')
        || (tablet === 'auto' && 'auto')
        || (typeof tablet === 'number' && `${Math.round((tablet / 12) * 10e7) / 10e5}%`)
        || ''
      )};
      flex-grow: ${(
        (tablet === true && '1')
        || (tablet === 'auto' && '0')
        || (typeof tablet === 'number' && '0')
        || ''
      )};
      max-width: ${(
        (tablet === true && '100%')
        || (tablet === 'auto' && 'none')
        || (typeof tablet === 'number' && `${Math.round((tablet / 12) * 10e7) / 10e5}%`)
        || ''
      )};
    }
  `}

  ${({ mobile }): string => `
    flex-basis: ${(
      (mobile === true && '0')
      || (mobile === 'auto' && 'auto')
      || (typeof mobile === 'number' && `${Math.round((mobile / 12) * 10e7) / 10e5}%`)
      || ''
    )};
    flex-grow: ${(
      (mobile === true && '1')
      || (mobile === 'auto' && '0')
      || (typeof mobile === 'number' && '0')
      || ''
    )};
    max-width: ${(
      (mobile === true && '100%')
      || (mobile === 'auto' && 'none')
      || (typeof mobile === 'number' && `${Math.round((mobile / 12) * 10e7) / 10e5}%`)
      || ''
    )};
  `}

  min-width: ${({ zeroMinWidth }): string => (zeroMinWidth ? '0' : 'unset')};

  flex-direction: ${({ direction }): string => direction ?? 'row'};

  flex-wrap: ${({ wrap }): string => wrap ?? 'nowrap'};

  align-items: ${({ alignItems }): string => alignItems ?? 'flex-start'};

  align-content: ${({ alignContent }): string => alignContent ?? 'unset'};

  justify-content: ${({ justify }): string => justify ?? 'flex-start'};
`;
