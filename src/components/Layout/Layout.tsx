import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from '../AppBar/AppBar';
import Loader from '../Loader/Loader';
import styled from 'styled-components';

interface LayoutProps {
  gridTemplateRows: string;
  backgroundColor?: string;
  color?: string;
}

interface BoxProps {
  display: string;
  gridTemplateRows: string;
  backgroundColor?: string;
  color?: string;
}

const Box = styled.div<BoxProps>`
  display: ${(props) => props.display};
  grid-template-rows: ${(props) => props.gridTemplateRows};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
`;

export const Layout = ({ gridTemplateRows, backgroundColor, color }: LayoutProps): JSX.Element => {
  return (
    <Box display="grid" gridTemplateRows={gridTemplateRows} backgroundColor={backgroundColor} color={color}>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Box>
  );
};
