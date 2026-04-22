import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { NavNode } from '../data/modules'

/**
 * 模块左侧导航树。
 */
export default defineComponent({
  name: 'NavTree',
  props: {
    nodes: {
      type: Array as PropType<NavNode[]>,
      required: true,
    },
    activeRoute: {
      type: String,
      required: true,
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['select', 'toggle'],
  setup(props, { emit }) {
    const toggle = () => {
      emit('toggle')
    }

    const isActive = (route: string) => {
      return route === props.activeRoute
    }

    const renderNode = (node: NavNode) => {
      const hasChildren = !!node.children?.length
      return (
        <div class={['nav-node', isActive(node.route) && 'is-active'].filter(Boolean)}>
          <div
            class="nav-node-title"
            onClick={() => emit('select', node)}
            title={node.title}
          >
            <span class="nav-dot" />
            {!props.collapsed && <span class="nav-text">{node.title}</span>}
          </div>
          {!props.collapsed && hasChildren && (
            <div class="nav-children">{node.children?.map(renderNode)}</div>
          )}
        </div>
      )
    }

    const rootClass = computed(() =>
      ['nav-tree', props.collapsed && 'is-collapsed'].filter(Boolean),
    )

    return () => (
      <aside class={rootClass.value}>
        <button class="nav-toggle" type="button" onClick={toggle} aria-label="toggle">
          <span class="nav-toggle-icon" />
        </button>
        <div class="nav-list">{props.nodes.map(renderNode)}</div>
      </aside>
    )
  },
})
