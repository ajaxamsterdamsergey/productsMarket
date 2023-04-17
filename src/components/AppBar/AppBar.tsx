import { RiProductHuntLine } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { NavItem ,Header,Nav} from './AppBar.styled';

interface NavItemProps {
  href: string;
  text: string;
  icon: React.ElementType<{ size: string }>;
}

const navItems: NavItemProps[] = [
  { href: '', text: 'Home', icon: AiOutlineHome },
  { href: 'ProductForm', text: 'add Product', icon: RiProductHuntLine },
];

export const AppBar = (): JSX.Element => {
  return (
    <Header>
      <Nav>
        {navItems.map(({ href, text, icon: Icon }) => (
          <NavItem to={href} key={href}>
            <Icon size="24" />
            {text}
          </NavItem>
        ))}
      </Nav>
    </Header>
  );
};
