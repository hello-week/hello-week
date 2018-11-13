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
                    { url: '/documentation/options', title: 'Options', demo: false },
                    { url: '/documentation/methods', title: 'Methods', demo: false },
                    { url: '/documentation/callbacks', title: 'Callbacks', demo: false }
                ]
            },
            {
                name: 'Demos',
                isActive: true,
                data: [
                    { url: '/demos/range-dates', title: 'Range Dates', demo: true },
                    { url: '/demos/highlight-dates', title: 'Highlight Dates', demo: true },
                    { url: '/demos/disabled-days-week', title: 'Disabled Days Week', demo: true },
                    { url: '/demos/min-and-max-dates', title: 'Min & Max Dates', demo: true }
                ]
            }
        ]
    }
});
