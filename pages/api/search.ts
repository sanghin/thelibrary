import Build from '../../server/database/model/build';
import knexInstance from '../../server/database/connection';

const Search = async (request, response) => {
  const { ascendancy } = request.query;

  knexInstance<Build>('build')
    .modify((queryBuilder) => {
      if (ascendancy) {
        queryBuilder.whereRaw(
          "pob->'PathOfBuilding'->'Build'->>'ascendClassName' = ?",
          ascendancy.charAt(0).toUpperCase() + ascendancy.slice(1),
        );
      }
    })
    .then((results) => {
      const data = results.map((build) => ({
        id: build.id,
        pob_raw: build.pob,
        created_at: build.created_at,
      }));

      response.status(200).json({
        meta: [],
        data,
      });
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);

      return response.status(500).end();
    });
};

export default Search;
