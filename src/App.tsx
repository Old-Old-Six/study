import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

/**
 * 应用根组件：负责承载路由视图。
 */
export default defineComponent({
  name: 'App',
  setup() {
    return () => <RouterView />
  },
})
