import { cssClasses, cssStates, daysWeek, margins } from '../../src/shared/constants';

it('cssClasses should be a object', () => {
  expect(typeof cssClasses).toBe('object');
});

it('cssStates should be a object', () => {
  expect(typeof cssStates).toBe('object');
});

it('daysWeek should be a object', () => {
  expect(typeof daysWeek).toBe('object');
});

it('margins should be a object', () => {
  expect(typeof margins).toBe('object');
});
