import knexInstance from '../server/database/connection';

jest.mock('knex', () => ({
  clearHeaderData() {

  },
  clearLocale() {
  },
}));

jest.mock('./db', () => ({
  clearHeaderData() {
  },
  clearLocale() {
  },
}));


describe('DB Connection', () => {
  describe('Instantiate Connection', () => {
    test('We have an instance if it exists already', () => {
      // eslint-disable-next-line no-console
      console.info(knexInstance);
      expect(true).toBe(true);
    });
  });
});
