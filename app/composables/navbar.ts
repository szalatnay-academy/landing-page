export const useNavbar = () => {
  const inline = useState('navbar-inline', () => false);

  return {
    inline,
  };
};
