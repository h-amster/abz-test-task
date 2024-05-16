import { useEffect, useState } from 'react';
import './App.scss';
import { Get } from './components/Get/Get';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Post } from './components/Post/Post';
import { User } from './types/User';
import { httpClient } from './utils/httpClient';

export const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [areUsersLoaded, setAreUsersLoaded] = useState(false);
  const usersPerRequest = 6;
  const [usersFromServer, setUsersFromServer] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const isLastPage = currentPage === totalPages;

  const resetUsers = () => {
    httpClient
      .getUsers(1, usersPerRequest)
      .then(res => {
        setTotalPages(res.total_pages);

        return res.users;
      })
      .then(users => setUsersFromServer(users))
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
      .finally(() => setAreUsersLoaded(true));
  };

  useEffect(() => {
    httpClient
      .getUsers(currentPage, usersPerRequest)
      .then(res => {
        setTotalPages(res.total_pages);

        return res.users;
      })
      .then(users => setUsersFromServer(prev => [...prev, ...users]))
      .finally(() => setAreUsersLoaded(true));
  }, [currentPage]);

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Hero />

        <Get
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isLastPage={isLastPage}
          users={usersFromServer}
          areUsersLoaded={areUsersLoaded}
        />

        <Post resetUsers={resetUsers} />
      </main>
    </div>
  );
};
