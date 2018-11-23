 <template>
    <div class="article home">
        <div class="container">
            <div class="card">
                <div class="content">
                    <h1>Hello Week <span class="version">v{{ version }}</span></h1>
                    <h3>Lightweight and simple calendar in <strong>Javascript</strong> with no dependencies</h3>
                    <div class="demo">
                        <div class="hello-week"></div>
                    </div>
                    <div class="demo-interactive">
                        <div class="demo-options">
                            <h4>Options</h4>
                            <textfield name="defaultDate" id="defaultDate" value="">Default Date</textfield>
                            <textfield name="format" id="format" value="dd/mm/yyyy" placeholder="dd/mm/yyyy">Format</textfield>
                            <textfield name="minDate" id="minDate" value="">Min Date</textfield>
                            <textfield name="maxDate" id="maxDate" value="">Max Date</textfield>
                            <h4>Methods</h4>
                            TODO
                        </div>
                        <div class="demo-toggle">
                            <h4>Toggles</h4>
                            <p><toggle id="locked" name="locked" label="Locked" :checked="isLocked" @toggleSwith="toggleLocked" /></p>
                            <p><toggle id="range" name="range" label="Range" :checked="isRange" @toggleSwith="toggleRange" /></p>
                            <p><toggle id="multiplePick" name="multiplePick" label="Multiple Pick" :checked="isMultiplePick" @toggleSwith="toggleMultiplePick" /></p>
                        </div>
                    </div>
                    <h4>Installation</h4>
                    <demo-code lang="bash">npm install hello-week --save</demo-code>
                    <demo-code lang="bash">yarn add hello-week</demo-code>
                    <h4>Options</h4>
                    <p>Hello Week comes with a few (optional) settings that you can change by passing an object as an argument. Default values are presented below.</p>
        <demo-code lang="js">
            new HelloWeek({
                selector: '.hello-week',
                lang: 'en',
                langFolder: './dist/langs/',
                format: 'dd/mm/yyyy',
                weekShort: true,
                monthShort: false,
                multiplePick: false,
                defaultDate: null,
                todayHighlight: true,
                disablePastDays: false,
                disabledDaysOfWeek: null,
                disableDates: null,
                weekStart: 0, // week start on Sunday
                daysHighlight: null,
                range: false,
                rtl: false,
                locked: false,
                minDate: null,
                maxDate: null,
                nav: ['◀', '▶'],
                onLoad: () => { /** callback function */ },
                onChange: () => { /** callback function */ },
                onSelect: () => { /** callback function */ },
                onClear: () => { /** callback function */ }
            });
        </demo-code>
                    <h4>Supported Browsers:</h4>
                    <ul class="list list--dot">
                        <li>Edge 17</li>
                        <li>Chrome 49</li>
                        <li>Firefox 31</li>
                        <li>Opera 36</li>
                        <li>Safari 9.3</li>
                    </ul>
                </div>
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
    import demoCode from '../components/code.vue'
    import toggle from '../components/toggle.vue'
    import textfield from '../components/textfield.vue'
    export default {
        components: { demoCode, toggle, textfield },
        data: function () {
            return {
                version: undefined,
                calendar: undefined,
                file: undefined,
                isLocked: false,
                isRange: false,
                isMultiplePick: false
          }
        },
        mounted() {
            this.file = window.location.origin + window.location.pathname + 'package.json';
            const md = new Remarkable({
                langPrefix: 'hljs language-'
            });
            Utils.readFile('package.json', (responseText) => {
                const { version } = JSON.parse(responseText);
                this.version = version;
                this.$nextTick(function () {
                    Prism.highlightAll();
                    this.calendar = new HelloWeek();
                    this.setDaysHighlight();
                });
            });
        },
        methods: {
            setDaysHighlight() {
                const daysHighlight = [
                    {
                        days: ["2019-01-24"],
                        backgroundColor: "#a2a",
                        title: "Baby Birthday!"
                    },
                    {
                        days: ["2018-12-18"],
                        backgroundColor: "#07a",
                        title: "Mom Birthday!"
                    }
                ];
                this.calendar.setDaysHighlight(daysHighlight);
            },
            toggleLocked() {
                this.isLocked = !this.isLocked;
                this.calendar.locked = this.isLocked;
                this.calendar.reload();
            },
            toggleRange() {
                this.isRange = !this.isRange;
                this.calendar.range = this.isRange;
                this.calendar.reload();
            },
            toggleMultiplePick() {
                this.isMultiplePick = !this.isMultiplePick;
                this.calendar.multiplePick = this.isMultiplePick;
                this.calendar.reload();
            }
        }
    }
</script>
<style lang="css">
    @import "./../../assets/prism/prism.css";
</style>
