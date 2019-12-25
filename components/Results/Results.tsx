import css from './Results.css';

type Props = {
  results: SearchResults;
}

const Result = ({ pob }: { pob: Build}) => (
  <div className={css.build}>
    {pob.PathOfBuilding.Skills.Skill.map(({ Gem }) => (
      <div>
        {Array.isArray(Gem)
          ? Gem.map(({ nameSpec, enabled }) => <SkillGem name={nameSpec} enabled={!!enabled} />)
          : <SkillGem name={Gem.nameSpec} enabled={!!Gem.enabled} />}
      </div>
    ))}
  </div>
);

type SkillGemProps = {name: string, enabled: boolean};
const SkillGem = ({ name, enabled }: SkillGemProps) => {
  if (!enabled) return null;
  return <span className={css.gem}>{name}</span>;
};

export default ({ results }: Props) => {
  if (!results) return null;

  return (
    <div>
      <div className={css.total}>
      Builds found:
        {results.numberOfBuilds}
      </div>

      {results.builds.map(({ pob }) => <Result pob={pob} />)}
    </div>
  );
};
