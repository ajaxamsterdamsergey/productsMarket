import { IconContext } from 'react-icons';
import { ButtonWrapper } from './ButtonInfo.styled';
import { Link } from 'react-router-dom';

interface ButtonInfoProps {
  to: string;
  id: number;
}

const ButtonInfo: React.FC<ButtonInfoProps> = ({ to, id}) => {
return (
<IconContext.Provider value={{ size: '1.9em', className: 'global-class-name' }}>
<div>
<Link to={to} style={{ textDecoration: 'none' }}>
<ButtonWrapper />
</Link>
</div>
</IconContext.Provider>
);
};
export default ButtonInfo;