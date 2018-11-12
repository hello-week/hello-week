<template>
    <div class="sidebar">
        <ul class="navigation">
            <li class="navigation__item"  v-for="(menu, index) in this,menus" :key="index" v-if="menu.isActive">
                {{menu.name}}
                <ul class="navigation__submenu">
                    <li class="navigation__item" v-for="(link, index) in menu.data" :key="index">
                        <router-link :to="link.url" :title="link.title" class="navigation__link">{{ link.title }}</router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            menus: {
                type: Array
            }
        },
        data() {
            return {}
        },
        mounted() {
            console.log(this.menus);
        }
    }
</script>
