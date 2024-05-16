import './Nav.scss';

export const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <a className="nav__link" href="#get">
            Users
          </a>
        </li>
        <li className="nav__item">
          <a className="nav__link" href="#post">
            Sign up
          </a>
        </li>
      </ul>
    </nav>
  );
};
