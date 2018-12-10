<template>
    <div class="app">
        <top logo="./assets/images/logo.png" />
        <main class="main">
            <sidebar :menus="menus" />
            <router-view :key="$route.fullPath"/>
        </main>
    </div>
</template>

<script>
import top from './layout/top.vue'
import sidebar from './layout/sidebar.vue'
/** Pages Module */
import pages from './pages/pages.vue'

export default {
    name: 'app',
    components: { top, sidebar },
    data() {
        return {
            menus: this.$store.state.menus
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss">
    @import "./styles/app.scss";
</style>
