import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

/**
 * 模块内容占位页。
 */
export default defineComponent({
  name: 'ModuleContent',
  setup() {
    const route = useRoute()
    const title = (route.meta.title as string) || '未命名练习'

    return () => (
      <div class="module-placeholder">
        <div class="module-placeholder-title">{title}</div>
        <div class="module-placeholder-text">内容区暂留，后续接入练习内容。</div>
      </div>
    )
  },
})
