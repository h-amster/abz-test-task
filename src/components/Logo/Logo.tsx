import './Logo.scss';
import logo from '../../assets/images/Logo.svg';

export const Logo: React.FC = () => {
  return (
    <a href="#" className="logo">
      <img
        src={logo}
        alt="Logo"
        className="logo__img"
        width="104"
        height="26"
      />
    </a>
  );
};
