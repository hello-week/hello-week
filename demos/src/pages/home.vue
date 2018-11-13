 <template>
    <div class="article home">
        <div class="container">
            <div class="card">
                <div class="content">
                    <h1>Hello Week <span class="version">v{{ version }}</span></h1>
                    <h3>Lightweight and simple datepicker in <strong>Javascript</strong> with no dependencies</h3><br><br><br>
                    <div class="demo">
                        <div class="hello-week"></div>
                    </div>

                    <h4>Installation</h4>
                    <pre class="language-bash">
            npm install hello-week --save
                    </pre>
                    <pre class="language-bash">
            yarn add hello-week
                    </pre>
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
                    new HelloWeek();
                });
            }
            rawFile.send(null);
        }
    }
</script>
