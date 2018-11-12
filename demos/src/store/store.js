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
                    { url: '/documentation/options', title: 'Options' },
                    { url: '/documentation/methods', title: 'Methods' },
                    { url: '/documentation/callbacks', title: 'Callbacks' }
                ]
            },
            {
                name: 'Demos',
                isActive: true,
                data: [
                    { url: '/demos/range-dates', title: 'Range Dates'},
                    { url: '/demos/highlight-dates', title: 'Highlight Dates'},
                    { url: '/demos/disabled-days-week', title: 'Disabled Days Week'},
                    { url: '/demos/min-and-max-dates', title: 'Min & Max Dates'}
                ]
            }
        ]
    }
});
