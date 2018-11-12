<template>
    <div class="switch" @click="toggleTheme">
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
        mounted() {
            let state = localStorage.getItem('dark-mode');
            this.isChecked = state == 'true' ? true : false;
            this.switchTheme();
        },
        methods: {
            toggleTheme(evt) {
                evt.preventDefault();
                this.isChecked = !this.isChecked;
                localStorage.setItem('dark-mode', this.isChecked);
                this.switchTheme();
            },
            switchTheme() {
                if (this.isChecked == true) {
                    document.body.classList.remove('theme--light');
                    document.body.classList.add('theme--dark');
                } else {
                    document.body.classList.remove('theme--dark');
                    document.body.classList.add('theme--light');
                }
            }
        },
        watch: {
            checked: function (val) {
                console.log(val);
            },
        }
    }
</script>
