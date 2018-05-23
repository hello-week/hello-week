import * as chai from 'chai';
import * as mocha from 'mocha';
import { HelloWeek } from './../src/scripts/hello-week';

const expect = chai.expect;
describe('Hello Week Init', () => {
    it('should be able to get current day' , () => {
        const helloWeek = new HelloWeek();
        expect(helloWeek.getToday()).to.equal(new Date());
    });
});
