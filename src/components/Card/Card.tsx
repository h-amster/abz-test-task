import './Card.scss';
import { User } from '../../types/User';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import defaultImg from '../../assets/images/photo-cover.svg';
import { useState } from 'react';
import classNames from 'classnames';
import { Tooltip } from '../Tooltip/Tooltip';

type Props = {
  user: User;
  className?: string;
};

export const Card: React.FC<Props> = ({ user, className = '' }) => {
  const { name, email, phone, position, photo } = user;
  const [hasImgError, setHasImgError] = useState(false);

  function normalizeCardField(field: string) {
    return field.length > 27 ? field.slice(0, 25) + '…' : field;
  }

  const nomalizedName = normalizeCardField(name);
  const nomalizedPosition = normalizeCardField(position);
  const nomalizedEmail = normalizeCardField(email);
  const formattedPhoneNumber = formatPhoneNumber(phone);
  const preparedImg = hasImgError ? defaultImg : photo;

  const [tooltipText, setTooltipText] = useState<string>('');
  const [pos, setPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  const handleNameHover = () => {
    setTooltipText(name);
  };

  const handlePositionHover = () => {
    setTooltipText(position);
  };

  const handleEmailHover = () => {
    setTooltipText(email);
  };

  const handlePhoneHover = () => {
    setTooltipText(phone);
  };

  const handleMouseLeave = () => {
    setTooltipText('');
  };

  return (
    <article
      className={classNames('card', {
        [className]: className,
      })}
      onMouseMove={handleMouseMove}
    >
      <img
        className="card__img"
        src={preparedImg}
        alt="Card image"
        onError={() => setHasImgError(true)}
        width="70"
        loading="lazy"
      />
      <h2
        className="card__title"
        onMouseEnter={handleNameHover}
        onMouseLeave={handleMouseLeave}
      >
        {nomalizedName}
      </h2>
      <ul className="card__info">
        <li
          onMouseEnter={handlePositionHover}
          onMouseLeave={handleMouseLeave}
          className="card__info-item"
        >
          {nomalizedPosition}
        </li>
        <li
          onMouseEnter={handleEmailHover}
          onMouseLeave={handleMouseLeave}
          className="card__info-item"
        >
          {nomalizedEmail}
        </li>
        <li
          className="card__info-item"
          onMouseEnter={handlePhoneHover}
          onMouseLeave={handleMouseLeave}
        >
          {formattedPhoneNumber}
        </li>
      </ul>

      {tooltipText && (
        <Tooltip
          text={tooltipText}
          style={{ top: pos.y + 26 + 'px', left: pos.x - 20 + 'px' }}
        />
      )}
    </article>
  );
};
