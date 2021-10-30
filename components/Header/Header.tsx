import React from 'react'

import Title from './components/Title'
import Import from './components/Import'

import css from './styles.css'

const Header = () => (
  <div className={css.header}>
    <Title />
    <Import />
  </div>
)

export default Header
