 <template>
    <div class="article home">
        <div class="container">
            <div class="card">
                <div class="content">
                    <h1>Hello Week <span class="version">v{{ version }}</span></h1>
                    <h3>Lightweight and simple datepicker in <strong>Javascript</strong> with no dependencies</h3>
                    <div class="demo">
                        <div class="hello-week"></div>
                    </div>
                    <h4>Installation</h4>
<pre>
    <code class="hljs language-bash">
npm install hello-week --save
    </code>
</pre>
<pre>
    <code class="hljs language-bash">
yarn add hello-week
    </code>
</pre>

                    <h4>Options</h4>
                    <p>Hello Week comes with a few (optional) settings that you can change by passing an object as an argument. Default values are presented below.</p>
<pre>
    <code class="hljs language-js">
new HelloWeek({
    selector: '.hello-week',
    lang: 'en',
    langFolder: './dist/langs/',
    format: false,
    weekShort: true,
    monthShort: false,
    multiplePick: false,
    defaultDate: false,
    todayHighlight: true,
    disablePastDays: false,
    disabledDaysOfWeek: false,
    disableDates: false,
    weekStart: 0,
    daysHighlight: false,
    range: false,
    rtl: false,
    disabled: false,
    minDate: false,
    maxDate: false,
    nav: ['◀', '▶'],
    onLoad: () => { /** callback function */ },
    onNavigation: () => { /** callback function */ },
    onSelect: () => { /** callback function */ },
    onClear: () => { /** callback function */ }
});
    </code>
</pre>

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
            <p>Created with <span>♥</span> by <a href="http://twitter.com/@mauroreisvieira">@mauroreisvieira</a> in Portugal</p>
        </footer>
    </div>
</template>

<script>
    import Prism from 'prismjs'
    import Remarkable from 'remarkable'
    export default {
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
            const rawFile = new XMLHttpRequest();
            rawFile.open("GET", this.file, false);
            rawFile.onreadystatechange = () => {
                const { version } = JSON.parse(rawFile.responseText);
                this.version = version;
                this.$nextTick(function () {
                    Prism.highlightAll();
                    this.calendar = new HelloWeek();
                    this.setDaysHighlight();
                });
            }
            rawFile.send(null);
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
        }
    }
</script>
<style lang="css">
    @import "./../../assets/prism/prism.css";
</style>
