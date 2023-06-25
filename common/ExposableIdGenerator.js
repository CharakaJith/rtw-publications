var { nanoid } = require('nanoid');
const SEPARATOR_HYPHEN = '-';

const ExposableIdGenerator = {
  EXPOSABLE_ID_AUTHOR: () => {
    return 'ATHR' + SEPARATOR_HYPHEN + nanoid(10);
  },

  EXPOSABLE_ID_BOOK: () => {
    return 'BOOK' + SEPARATOR_HYPHEN + nanoid(10);
  },
};

module.exports = ExposableIdGenerator;
