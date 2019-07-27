<template>
  <div class="home">

    <MyComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import VueKonva from 'vue-konva'
Vue.use(VueKonva)
import HelloWorld from '@/components/HelloWorld.vue'
import MyComponent from '@/components/Mycom.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    MyComponent
  }
}
</script>
