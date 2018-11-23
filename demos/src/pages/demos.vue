<template>
    <div class="article">
        <div class="container">
            <div class="card">
                <div class="content" v-html="markdown"></div>
            </div>
        </div>
        <footer class="footer">
            <p>Created with <span class="heart">♥</span> by <a href="http://twitter.com/@mauroreisvieira">@mauroreisvieira</a> in Portugal</p>
        </footer>
    </div>
</template>

<script>
    import Prism from 'prismjs'
    import Remarkable from 'remarkable'
    import { Utils } from '../helpers/utils.js'
    export default {
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
                    const options = Object.assign(this.initHelloWeek(), {
                        onLoad: this.updateInfo,
                        onNavigation: this.updateInfo,
                        onSelect: this.updateInfo
                    })
                    this.calendar = new HelloWeek(options);
                });
            });
        },
        methods: {
            initHelloWeek() {
                const init = this.$el.querySelector('.language-json').textContent;
                this.$el.querySelector('.language-json').remove();
                return JSON.parse(init);
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


