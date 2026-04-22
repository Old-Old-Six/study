import { defineComponent } from 'vue'

/**
 * 面包屑显示。
 */
export default defineComponent({
  name: 'Breadcrumbs',
  props: {
    items: {
      type: Array as () => string[],
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="breadcrumbs">
        {props.items.map((item, index) => (
          <span class="breadcrumb" key={`${item}-${index}`}>
            <span class="breadcrumb-text">{item}</span>
            {index < props.items.length - 1 && <span class="breadcrumb-split">/</span>}
          </span>
        ))}
      </div>
    )
  },
})
