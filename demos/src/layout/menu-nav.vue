<template>
    <nav class="nav">
        <ul class="menu">
            <li class="menu__item"><router-link to="/" class="menu__link">Home</router-link></li>
            <li class="menu__item"><a href="https://github.com/maurovieirareis/sample-demos" class="menu__link" target="_blank">View in GitHub</a></li>
        </ul>
        <!-- <toggle id="toogle-theme" name="toggle" :checked="false" /> -->
    </nav>
</template>

<script>
    import toggle from './../components/toggle.vue'
    export default {
        components: { toggle },
        data: function () {
            return {
                darkTheme: false,
                file: undefined,
                markdown: undefined
          }
        },
        methods: {}
    }
</script>
