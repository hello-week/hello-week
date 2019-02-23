import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        menus: [
            {
                name: 'API',
                isActive: true,
                data: [
                    { url: '/docs/documentation/options', title: 'Options', demo: false },
                    { url: '/docs/documentation/methods', title: 'Methods', demo: false },
                    { url: '/docs/documentation/callbacks', title: 'Callbacks', demo: false },
                    { url: '/docs/documentation/date-format', title: 'Date Format', demo: false },
                    { url: '/docs/documentation/customization', title: 'Customization', demo: false },
                    { url: '/docs/documentation/languages', title: 'Languages', demo: false }
                ]
            },
            {
                name: 'Demos',
                isActive: true,
                data: [
                    { url: '/docs/demos/range', title: 'Range', demo: true },
                    { url: '/docs/demos/highlight-dates', title: 'Highlight Dates', demo: true },
                    { url: '/docs/demos/disabled-days-week', title: 'Disabled Days Week', demo: true },
                    { url: '/docs/demos/min-and-max', title: 'Min & Max', demo: true },
                    { url: '/docs/demos/disabled-dates', title: 'Disabled Dates', demo: true },
                    { url: '/docs/demos/locked', title: 'Locked', demo: true },
                    { url: '/docs/demos/rtl', title: 'RTL', demo: true },
                    { url: '/docs/demos/retrieve-clicked-date', title: 'Retrieve clicked date', demo: true },
                    { url: '/docs/demos/go-to-date', title: 'Go to date', demo: true }
                ]
            },
            {
                name: 'Support',
                isActive: true,
                data: [
                    { url: '/CHANGELOG', title: 'Changelog', demo: false },
                    { url: '/CONTRIBUTING', title: 'Contributing', demo: false }
                ]
            }
        ]
    }
});
