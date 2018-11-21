<template>
    <pre>
        <code :class="'hljs language-' + lang">
            <slot></slot>
        </code>
    </pre>
</template>

<script>
    export default {
        props: {
            lang: {
                type: String,
                required: true
            }
        }
    }
</script>
