<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <font-awesome-icon :icon="['fat', 'headset']" />
  <div>
    <h1>Chat App</h1>
    <ChatBox />
  </div>
</template>

<!-- <template>
  <div>
    <h1>Chat App</h1>
    <ChatBox />
  </div>
</template> -->

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ChatBox from './components/ChatBox.vue';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import Vue from 'vue';
// library.add(faComment);
// Vue.component('font-awesome-icon', FontAwesomeIcon);

export default {
  name: 'App',
  components: {
    // HelloWorld
    ChatBox,
    FontAwesomeIcon
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
