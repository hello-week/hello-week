<template>
    <div class="article">
        <div class="container">
            <div class="content" v-html="markdown"></div>
        </div>
        <foot />
    </div>
</template>

<script>
    import Prism from 'prismjs'
    import Remarkable from 'remarkable'
    import { Utils } from '../helpers/utils.js'
    // Components
    import Foot from '../layout/foot.vue'
    export default {
        components: { Foot },
        data: function () {
            return {
                title: this.$route.name,
                file: undefined,
                markdown: undefined,
                calendar: undefined
          }
        },
        mounted() {
            const fiile = this.$route.path + '.md';
            const md = new Remarkable({
                langPrefix: 'hljs language-'
            });
            Utils.readFile(fiile, (responseText) => {
                this.markdown = md.render(responseText);
                this.$nextTick(function () {
                    Prism.highlightAll();
                    this.createDemo();
                    const f = new Function (this.initHelloWeek());
                    f();
                });
            });
        },
        methods: {
            initHelloWeek() {
                return this.$el.querySelector('.language-js').textContent;
            },
            createDemo() {
                const hedingDemo = this.$el.querySelector('h4');
                const parentDiv = hedingDemo.parentNode;
                const demo = document.createElement('div');
                demo.classList.add('demo');
                demo.classList.add('hello-week');
                parentDiv.insertBefore(demo, hedingDemo);
            },
            updateInfo() {
                const daysSelected = this.calendar.getDays();
                const daysHighlight = this.calendar.getDaysHighlight();
                console.log('daysSelected', daysSelected);
                console.log('daysHighlight', daysHighlight);
            }
        }
    }
</script>
<style lang="css">
    @import "./../../assets/prism/prism.css";
</style>


