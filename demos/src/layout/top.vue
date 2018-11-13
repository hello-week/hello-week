<template>
    <header class="header">
        <div class="toggle-sidebar" @click="toggleMenu">
          <div class="line-menu"></div>
          <div class="line-menu"></div>
          <div class="line-menu"></div>
      </div>
      <div class="logo">Hello Week</div>
    <navigation />
</header>
</template>

<script>
    import navigation from './navigation.vue'
    export default {
        components: { navigation },
        props: {
            logo: {
                type: String
            }
        },
        data() {
            return {}
        },
        methods: {
            toggleMenu(evt) {
                document.querySelector('.toggle-sidebar').classList.toggle('open');
                document.querySelector('.article').classList.toggle('is-open');
            }
        },
        mounted() {

        }
    }
</script>
