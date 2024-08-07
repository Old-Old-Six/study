<template>
    <div class="main">
        <div>
          <span v-for="(item, index) in componentList" :key="index" @click="changes(item)">
              {{item.name}}
          </span>
        </div>
        <div>
          <component :is="componentNow"></component>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import Three1 from './pages/three1.vue'
const componentList = ref([
  {
    name: '示例1-1',
    component: Three1,
  }
])
const componentNow = ref(Three1)

function changes(data) {
  componentNow.value = data.component
}
</script>
<style lang="less">
.main {
    height: 100%;
    width: 100%;
    border: 1px solid pink;
}
</style>