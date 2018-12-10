<template>
    <div class="switch" @click="toggleSwith">
        <input type="checkbox" :id="id" :name="name" class="switch__input" :checked="isChecked">
        <label :for="id" class="switch__label">
            <span class="switch__text">{{ label }}</span>
        </label>
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
            label: {
                type: String
            },
            checked: {
                type: Boolean,
                default: true
            }
        },
        data: function () {
            return {
                isChecked: this.checked,
          }
        },
        methods: {
            toggleSwith(evt) {
                evt.preventDefault();
                this.isChecked = !this.isChecked;
                this.$emit('toggleSwith', this.isChecked);
            }
        }
    }
</script>
