import {
    CSS_CLASSES,
    CSS_STATES,
    DAYS_WEEK,
    FORMAT_DATE,
} from '../../core/constants';

describe('Constants', () => {
    it('CSS_CLASSES should be a object', () => {
        expect(typeof CSS_CLASSES).toBe('object');
    });

    it('CSS_STATES should be a object', () => {
        expect(typeof CSS_STATES).toBe('object');
    });

    it('DAYS_WEEK should be a object', () => {
        expect(typeof DAYS_WEEK).toBe('object');
    });

    it('FORMAT_DATE should be a string', () => {
        expect(typeof FORMAT_DATE).toBe('string');
    });
});
