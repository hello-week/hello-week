<template>
    <nav class="nav">
        <ul class="menu">
            <li class="menu__item"><router-link to="/" class="menu__link">Home</router-link></li>
            <li class="menu__item"><a href="https://codeload.github.com/maurovieirareis/hello-week/zip/master" class="menu__link" title="Download" download>Download</a></li>
            <li class="menu__item"><a href="https://github.com/maurovieirareis/hello-week" class="menu__link" target="_blank">GitHub</a></li>
        </ul>
        <toggle id="toogle-theme" name="toggle" :checked="darkTheme" @toggleSwith="toggleTheme" />
    </nav>
</template>

<script>
    import toggle from './../components/toggle.vue'
    export default {
        components: { toggle },
        data: function () {
            return {
                file: undefined,
                markdown: undefined,
                darkTheme: localStorage.getItem('dark-mode') === 'true' ? true : false
          }
        },
        mounted() {
            let state = localStorage.getItem('dark-mode');
            this.isChecked = state === 'true' ? true : false;
            this.switchTheme();
        },
        methods: {
            toggleTheme() {
                this.isChecked = !this.isChecked;
                localStorage.setItem('dark-mode', this.isChecked);
                this.switchTheme();
            },
            switchTheme() {
                if (this.isChecked == true) {
                    document.body.classList.remove('theme--light');
                    document.body.classList.add('theme--dark');
                } else {
                    document.body.classList.remove('theme--dark');
                    document.body.classList.add('theme--light');
                }
            }
        },
    }
</script>
