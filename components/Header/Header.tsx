import { memo } from 'react';

import Title from './components/Title';
import Import from './components/Import';

import css from './styles.css';

export default memo(() => (
  <div className={css.header}>
    <Title />
    <Import />
  </div>
));
