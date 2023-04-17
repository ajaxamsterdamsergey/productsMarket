import styled from 'styled-components';
import {
  shadow,
  textAlign,
  color,
  space,
  layout,
  flexbox,
  grid,
  background,
  border,
  position,
} from 'styled-system';

export interface BoxProps {
  shadow?: string;
  textAlign?: string;
  color?: string;
  space?: string;
  layout?: string;
  flexbox?: string;
  grid?: string;
  background?: string;
  border?: string;
  position?: string;
}

export const Box = styled.div<BoxProps>`
  ${shadow};
  ${textAlign};
  ${color};
  ${space};
  ${layout};
  ${flexbox};
  ${grid};
  ${background};
  ${border};
  ${position};
`;