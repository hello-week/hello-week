 <template>
    <div class="article">
        <div class="container">
            <div class="card">
                <div class="hello-week"></div>
            </div>
        </div>
        <footer class="footer">
            <p>Created with <span>♥</span> by <a href="http://twitter.com/@mauroreisvieira">@mauroreisvieira</a> in Portugal</p>
        </footer>
    </div>
</template>

<script>
    import pages from './pages.vue'
    export default {
        components: { pages },
        mounted() {
            let helloWeek = new HelloWeek();
            console.log(helloWeek);
        }
    }
</script>
