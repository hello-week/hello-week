<template>
    <div class="textfield">
        <label class="textfield__label" :for="id"><slot></slot></label>
        <input :type="type" :id="id" :name="name" class="textfield__input" :value="value" :placeholder="placeholder" />
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                value: 'text'
            },
            value: {
                type: String
            },
            label: {
                type: String
            },
            placeholder: {
                type: String
            }
        }
    }
</script>
