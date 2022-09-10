/**
 * @jest-environment jsdom
 */

import { HelloWeek } from '../src/core/hello-week';

jest.mock('../src/core/hello-week');

let fixture: HTMLElement;
let element: HTMLElement;

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