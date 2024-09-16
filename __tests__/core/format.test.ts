import {
    setTimeZone,
    formatDate,
    timestampToHuman,
    setToTimestamp,
} from '../../src/utils/format';

import langs from '../../src/langs/en';

describe('Utilities - Format', () => {
    describe('setTimeZone', () => {
        it('should return a date with no changes when no timezoneOffset is provided', () => {
            const date = new Date('2024-09-15T00:00:00Z'); // Sample date
            const result = setTimeZone({ date });
            expect(result.toISOString()).toBe(date.toISOString());
        });

        it('should apply the correct timezone offset when provided', () => {
            const date = new Date('2024-09-15T00:00:00Z'); // Sample date
            const timezoneOffset = -60; // 1 hour ahead (UTC+1)
            const result = setTimeZone({ date, timezoneOffset });

            // The result should be 1 hour ahead of the provided date
            const expectedDate = new Date(
                date.getTime() + timezoneOffset * 60 * 1000
            );
            expect(result.toISOString()).toBe(expectedDate.toISOString());
        });

        it('should handle cases where no date is provided and return current date adjusted by timezoneOffset', () => {
            const timezoneOffset = 120; // 2 hours behind UTC
            const currentDate = new Date();
            const result = setTimeZone({ timezoneOffset });

            const expectedDate = new Date(
                currentDate.getTime() + timezoneOffset * 60 * 1000
            );
            expect(result.toISOString()).toBe(expectedDate.toISOString());
        });

        it('should handle a string date input', () => {
            const date = '2024-09-15T12:00:00Z'; // Sample date as string
            const timezoneOffset = 60; // 1 hour behind UTC
            const result = setTimeZone({ date, timezoneOffset });

            const expectedDate = new Date(
                new Date(date).getTime() + timezoneOffset * 60 * 1000
            );
            expect(result.toISOString()).toBe(expectedDate.toISOString());
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
