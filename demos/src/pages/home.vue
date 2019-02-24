 <template>
    <div class="article home">
        <div class="container">
            <div class="content">
                <h1>Hello Week <span class="version">v{{ version }}</span></h1>
                <h3>Lightweight and simple calendar in <strong>Javascript</strong> with no dependencies</h3>
                <div class="demo">
                    <div class="hello-week"></div>
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
            daysSelected: null,
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
        <foot />
    </div>
</template>

<script>
    import Prism from 'prismjs'
    import Remarkable from 'remarkable'
    import { Utils } from '../helpers/utils.js'
    // Components
    import Foot from '../layout/foot.vue'
    import DemoCode from '../components/code.vue'
    import Toggle from '../components/toggle.vue'
    import Textfield from '../components/textfield.vue'
    export default {
        components: { Foot, DemoCode, Toggle, Textfield },
        data: function () {
            return {
                version: undefined,
                calendar: undefined,
                file: undefined
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
                });
            });
        },
        methods: {
        }
    }
</script>
<style lang="css">
    @import "./../../assets/prism/prism.css";
</style>
