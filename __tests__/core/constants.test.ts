import {
    CSS_CLASSES,
    DAYS_WEEK,
    FORMAT_DATE,
} from '../../src/core/constants';

describe('Constants', () => {
    it('CSS_CLASSES should be a object', () => {
        expect(typeof CSS_CLASSES).toBe('object');
    });

    it('DAYS_WEEK should be a object', () => {
        expect(typeof DAYS_WEEK).toBe('object');
    });

    it('FORMAT_DATE should be a string', () => {
        expect(typeof FORMAT_DATE).toBe('string');
    });
});
