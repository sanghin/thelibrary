import Header from './components/Header/Header';

import Search from './components/Search/Search';

export default () => {
  return (
    <>
      <Header />
      <Search />
      <div className='results' />
    </>
  );
};
