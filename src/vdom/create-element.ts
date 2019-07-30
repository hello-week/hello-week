import {
    extend,
    getIndexForEventTarget,
    error,
    isString,
    isDef,
} from "./../util/index";
import { cssClasses, cssStates, daysWeek } from "../shared/constants";
import { render, h } from "./render";

export function template(selector: HTMLElement, options: any) {
    const calendar: any = {};

    calendar.navigation = render(
        h("div", { class: cssClasses.NAVIGATION }),
        selector
    );

    if (isDef(options.prev)) {
        calendar.prevMonth = render(
            h("div", { class: cssClasses.PREV }, options.prev),
            calendar.navigation
        );
    }

    calendar.period = render(
        h("div", { class: cssClasses.PERIOD }),
        calendar.navigation
    );

    if (isDef(options.next)) {
        calendar.nextMonth = render(
            h("div", { class: cssClasses.NEXT }, options.next),
            calendar.navigation
        );
    }

    calendar.week = render(h("div", { class: cssClasses.WEEK }), selector);

    calendar.month = render(h("div", { class: cssClasses.MONTH }), selector);

    return calendar;
}

export function createElement(
    nodeName: string,
    attributes: any,
    children?: any,
    parentDom?: HTMLElement
) {
    return render(h(nodeName, attributes, children), parentDom);
}
