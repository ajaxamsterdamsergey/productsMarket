import { ButtonLoad } from './Button.styled';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  const ImagesItem = <ButtonLoad onClick={onClick}>{children}</ButtonLoad>;
  return ImagesItem;
};
