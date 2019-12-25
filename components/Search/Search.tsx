import { SyntheticEvent, useState } from 'react';

import Dropdown from '../Dropdown/Dropdown';
import ascendancies from '../../utils/ascendancies';
import skills from '../../utils/skills';

import css from './styles.css';

type SelectChangeEvent = SyntheticEvent<HTMLSelectElement>;
type Props = {
  onSearch: (SearchParams: SearchParams) => void,
}

export default ({ onSearch }: Props) => {
  const [searchParams, setSearchParams] = useState<SearchParams>([]);

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    return false;
  }

  function handleAscendanciesChange(event: SelectChangeEvent) {
    const updatedSearchParams = { ...searchParams, ascendancy: event.currentTarget.value };
    setSearchParams(updatedSearchParams);
    onSearch(updatedSearchParams);
  }

  function handleSkillChange(event: SelectChangeEvent) { onSearch({ key: 'skill', value: event.currentTarget.value }); }

  return (
    <form onSubmit={handleSubmit}>
      <div className={css.search}>
        <Dropdown onChange={handleAscendanciesChange} options={ascendancies} placeholder="Ascendancy" />
        <Dropdown onChange={handleSkillChange} options={skills} placeholder="Skill gem" />
      </div>
    </form>
  );
};
