import { HelloWeek } from '../src/core/calendar';

jest.mock('../src/core/calendar');

let fixture;
let element;

const getFixture = () => {
    const container = document.createElement('div');
    container.innerHTML = `
    <div>
        <div class="calendar default-theme"></div>
    </div>
    `;
    return container;
};

const setupTest = () => {
    fixture = document.body.appendChild(getFixture());
    element = fixture.querySelector('.calendar');
};

const clearTest = () => {
    document.body.removeChild(fixture);
};

describe('Calendar', () => {
    beforeEach(setupTest);

    afterEach(clearTest);

    it('should be able to call new() on HelloWeek', () => {
        const calendar = new HelloWeek(element);
        expect(calendar).toBeTruthy();
    });
});
