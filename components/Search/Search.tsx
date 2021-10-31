import React, { SyntheticEvent, useState } from 'react'

import Dropdown from '#components/Dropdown/Dropdown'
import ascendancies from '#utils/ascendancies'
import skills from '#utils/skills'

import css from './Search.module.css'

type Props = {
  onSearch: (SearchParams: SearchParams) => void
}

const Search = ({ onSearch }: Props) => {
  const [searchParams, setSearchParams] = useState<SearchParams>([])

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    return false
  }

  function handleAscendanciesChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const updatedSearchParams = {
      ...searchParams,
      ascendancy: event.currentTarget.value,
    }
    setSearchParams(updatedSearchParams)
    onSearch(updatedSearchParams)
  }

  function handleSkillChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onSearch({ key: 'skill', value: event.currentTarget.value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={css.search}>
        <Dropdown onChange={handleAscendanciesChange} options={ascendancies} placeholder="Ascendancy" />
        <Dropdown onChange={handleSkillChange} options={skills} placeholder="Skill gem" />
      </div>
    </form>
  )
}

export default Search
