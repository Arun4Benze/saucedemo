// @ts-check

const USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  glitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
};

const CUSTOMER = {
  firstName: 'Mary',
  lastName: 'Thomas',
  postalCode: '629001',
};

module.exports = { USERS, CUSTOMER };
