import { Card } from '../Card/Card';
import { Container } from '../Container/Container';
import './Get.scss';
import { User } from '../../types/User';
import classNames from 'classnames';
import { Loader } from '../Loader/Loader';

type Props = {
  currentPage: number;
  setCurrentPage: (val: number) => void;
  users: User[];
  isLastPage: boolean;
  areUsersLoaded: boolean;
};

export const Get: React.FC<Props> = ({
  currentPage,
  setCurrentPage,
  users,
  isLastPage,
  areUsersLoaded,
}) => {
  const handleBtnClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <section className="get" id="get">
      <Container className="get__container">
        <h2 className="get__title">Working with GET request</h2>

        <div className="get__cards">
          {users.map(user => (
            <Card key={user.id} user={user} className="get__card" />
          ))}
        </div>

        {!areUsersLoaded ? (
          <Loader />
        ) : (
          <button
            className={classNames('get__btn', {
              'get__btn--hidden': isLastPage,
            })}
            onClick={handleBtnClick}
          >
            Show more
          </button>
        )}
      </Container>
    </section>
  );
};
