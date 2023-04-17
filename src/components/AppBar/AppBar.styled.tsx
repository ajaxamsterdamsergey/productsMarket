import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
export const NavItem = styled(NavLink)`
  margin-left: 10px;
  display: flex;
  align-items: center;
  gap: ${p => p.theme.space[3]}px;
  padding: ${p => p.theme.space[3]}px;
  border-radius: 4px;
  text-decoration: none;
  color: ${p => p.theme.colors.text};
  font-family: ${p => p.theme.fonts.body};
  font-weight: ${p => p.theme.fontWeights.normal};
  font-size: ${p => p.theme.fontSizes.ml};
  color: ${p => p.theme.colors.tomato};
  border: 3px solid ${p => p.theme.colors.tomato};
  &.active {
    border: 3px solid ${p => p.theme.colors.primary};
    background-color: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.white};
  }
  :hover:not(.active),
  :focus-visible:not(.active) {
    color: ${p => p.theme.colors.primary};
  }
`;
export const Nav = styled.nav`
  display: flex;
`;
export const Header = styled.header`
  height: 100vh;
  padding: ${p => p.theme.space[2]}px;
  border-right: 1px solid black;
`;
