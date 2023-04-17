import React from 'react';
import { IconContext } from 'react-icons';
import { ButtonWrapper } from './ButtonDelete.styled';

interface ButtonDeleteProps {
onClick: () => void;
}

export const ButtonDelete: React.FC<ButtonDeleteProps> = ({ onClick }) => {
return (
<IconContext.Provider
value={{
color: 'red',
size: '2em',
className: 'global-class-name',
}}
>
<div>
<ButtonWrapper onClick={onClick} />
</div>
</IconContext.Provider>
);
};





