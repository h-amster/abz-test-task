import { Container } from '../Container/Container';
import './Hero.scss';

import desktopBg from '../../assets/images/hero/bg-desktop.webp';
import laptopBg from '../../assets/images/hero/bg-laptop.webp';
import tabletBg from '../../assets/images/hero/bg-laptop.webp';
import mobileBg from '../../assets/images/hero/bg-mobile.avif';

export const Hero: React.FC = () => {
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
        src={mobileBg}
        alt="Hero background"
        width="100%"
        height="500"
        srcSet={`${mobileBg} 360w, ${tabletBg} 768w, ${laptopBg} 1024w, ${desktopBg} 1170w`}
        // eslint-disable-next-line max-len
        sizes="(max-width: 300px) 300px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1170px"
      />
    </section>
  );
};
