import classNames from 'classnames';
import './Container.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Container: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <div
      className={classNames('container', {
        [className]: className,
      })}
    >
      {children}
    </div>
  );
};
