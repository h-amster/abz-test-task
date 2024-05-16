import './Success.scss';
import success from '../../assets/images/success-image.svg';

export const Success: React.FC = () => {
  return (
    <div className="success">
      <h2 className="success__title">User successfully registered</h2>

      <div className="success__img-wrapper">
        <img
          className="success__img"
          src={success}
          alt="Successfull registation"
        />
      </div>
    </div>
  );
};
