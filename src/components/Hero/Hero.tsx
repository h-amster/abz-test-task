import { Container } from '../Container/Container';
import './Hero.scss';

import desktopBg from '../../assets/images/hero/bg-desktop.webp';
import laptopBg from '../../assets/images/hero/bg-laptop.webp';
import tabletBg from '../../assets/images/hero/bg-laptop.webp';
import mobileBg from '../../assets/images/hero/bg-mobile.avif';
import { useState, useEffect } from 'react';

export const Hero: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [bgImage, setBgImage] = useState(mobileBg);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 1170) {
      setBgImage(desktopBg);
    } else if (windowWidth >= 1024 && windowWidth < 1170) {
      setBgImage(laptopBg);
    } else if (windowWidth >= 768 && windowWidth < 1024) {
      setBgImage(tabletBg);
    } else {
      setBgImage(mobileBg);
    }
  }, [windowWidth]);

  return (
    <section className="hero">
      <Container className="hero__container">
        <h1 className="hero__title">Test assignment for front-end developer</h1>

        <p className="hero__subtitle">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they&apos;ll be building web interfaces with accessibility
          in mind. They should also be excited to learn, as the world of
          Front-End Development keeps evolving.
        </p>

        <a className="hero__btn" href="#post">
          Sign up
        </a>
      </Container>
      <img
        className="hero__bg"
        src={bgImage}
        alt="Hero background"
        width="100%"
        height="500"
      />
    </section>
  );
};
