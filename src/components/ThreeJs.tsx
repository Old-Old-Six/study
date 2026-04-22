import { defineComponent, ref } from 'vue'
import type { Component } from 'vue'
import Three1 from './pages/three1.tsx'

/**
 * 组件菜单项。
 */
type ComponentItem = {
  name: string
  component: Component
}

/**
 * Three.js 示例入口：通过点击切换示例组件。
 */
export default defineComponent({
  name: 'ThreeJs',
  setup() {
    const componentList = ref<ComponentItem[]>([
      {
        name: '示例1-1',
        component: Three1,
      },
    ])

    const componentNow = ref<Component>(Three1)

    /**
     * 切换当前展示的组件。
     */
    const change = (item: ComponentItem) => {
      componentNow.value = item.component
    }

    return () => {
      const Current = componentNow.value as any

      return (
        <div class="main">
          <div>
            {componentList.value.map((item, index) => (
              <span key={index} onClick={() => change(item)}>
                {item.name}
              </span>
            ))}
          </div>
          <div>{Current ? <Current /> : null}</div>
        </div>
      )
    }
  },
})
