import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home'
import pages from '../pages/pages'
import { store } from '../store/store';

Vue.use(Router)

const routes = [];
routes.push({
    path: '/',
    name: 'home',
    component: home
});

store.state.menus.map(menu => {
    menu.data.map(link => {
        routes.push({
            path: link.url,
            name: link.title,
            component: pages
        })
    })
});

export default new Router({
    routes
})

