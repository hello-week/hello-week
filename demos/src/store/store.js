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
                    { url: '/options', title: 'Options' },
                    { url: '/methods', title: 'Methods' },
                    { url: '/callbacks', title: 'Callbacks' }
                ]
            },
            {
                name: 'Demos',
                isActive: true,
                data: [
                    { url: '/range-dates', title: 'Range Dates'},
                    { url: '/highlight-dates', title: 'Highlight Dates'},
                    { url: '/disabled-days-week', title: 'Disabled Days Week'},
                    { url: '/min-and-max-dates', title: 'Min & Max Dates'}
                ]
            }
        ]
    }
});
