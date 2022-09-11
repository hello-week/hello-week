# Vue Hello Week

## Installation

Install Hello Week and Vue in your project:

```bash
# Using npm
npm install vue vue-hello-week --D

# Using Yarn
yarn add vue vue-hello-week --D
```

## Include Hello Week in your project

```js
import Vue from 'vue';
import HelloWeek from 'vue-hello-week';

Vue.use(HelloWeek);
```

## Use

```js
<template>
  <v-hello-week
    @load="onLoad"
    @select="onSelect"
  >
  </v-hello-week>
</template>

<script>
export default {
  methods: {
    onLoad () {},
    onSelect () {},
  }
}
</script>
```
