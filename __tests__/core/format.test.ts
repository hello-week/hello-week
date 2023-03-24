import {
    setTimeZone,
    formatDate,
    timestampToHuman,
    setToTimestamp,
} from '../../src/utils/format';

import langs from '../../src/langs/en';

describe('Utilities - Format', () => {
    describe('setTimeZone', () => {
        it('should return the date with the given timezone offset added', () => {
            const inputDate = new Date('2022-01-01T00:00:00Z');
            const timezoneOffset = -120;
            const expectedDate = new Date('2021-12-31T22:00:00.000Z');

            expect(setTimeZone({ date: inputDate, timezoneOffset })).toEqual(
                expectedDate
            );
        });

        it('should return the current date with the default timezone offset added', () => {
            const now = new Date();
            const expectedDate = new Date(
                now.getTime() - now.getTimezoneOffset() * 60 * 1000
            );

            expect(setTimeZone({})).toEqual(expectedDate);
        });
    });

    describe('timestampToHuman', () => {
        it('should format timestamp with default format and given language', () => {
            const timestamp = 1640995200000;
            const expectedFormattedDate = '01-01-2022';

            expect(
                timestampToHuman({ timestamp, format: 'DD-MM-YYYY', langs })
            ).toEqual(expectedFormattedDate);
        });

        it('should format timestamp with custom format and given language', () => {
            const timestamp = 1640995200000;
            const expectedFormattedDate = '01-Jan-2022';
            expect(
                timestampToHuman({ timestamp, format: 'DD-mmm-YYYY', langs })
            ).toEqual(expectedFormattedDate);
        });
    });

    describe('formatDate', () => {
        it('should format date as YYYY-MM-DD', () => {
            expect(formatDate(1, 0, 2022)).toEqual('2022-01-01');
        });
    });

    describe('setToTimestamp', () => {
        it('should return timestamp for a given date string', () => {
            const dateString = '2022-01-01';
            const expectedTimestamp = new Date(
                '2022-01-01T00:00:00Z'
            ).getTime();

            expect(setToTimestamp(dateString)).toEqual(expectedTimestamp);
        });

        it('should return timestamp for a given date object', () => {
            const dateObject = new Date('2022-01-01T00:00:00Z');
            const expectedTimestamp = dateObject.getTime();

            expect(setToTimestamp(dateObject)).toEqual(expectedTimestamp);
        });

        it('should return current date with time set to 00:00:00:000 when no argument is provided', () => {
            const now = new Date();
            const expectedTimestamp = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
            ).getTime();

            expect(setToTimestamp()).toEqual(expectedTimestamp);
        });

        it('should throw an error for an invalid date string', () => {
            const invalidDateString = '2-011';

            const error = () => setToTimestamp(invalidDateString);
            expect(error).toThrowError(
                `The date ${invalidDateString} is not valid!`
            );
        });
    });
});
