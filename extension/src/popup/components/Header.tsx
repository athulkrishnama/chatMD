interface HeaderProps {
  title?: string;
}

export const Header = ({ title = 'Chat Wrapped' }: HeaderProps) => {
  return <h1>{title}</h1>;
};
