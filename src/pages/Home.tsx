import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { modules } from '../data/modules'

type BallState = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  targetSize: number
  focused: boolean
  active: boolean
  scale: number
  label: string
  desc: string
  route: string
  firstRoute: string
}

/**
 * 受限随机数，用于避免速度与位置过大。
 */
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

/**
 * 首页：模块球体入口。
 * - 球体不规则运动
 * - hover 停止并聚焦
 * - click 进入居中展示详情
 * - 双击进入模块第一个节点
 */
export default defineComponent({
  name: 'HomePage',
  setup() {
    const router = useRouter()
    const containerRef = ref<HTMLDivElement | null>(null)
    const balls = ref<BallState[]>([])
    const activeIndex = ref<number | null>(null)
    const rafId = ref<number | null>(null)

    const initBalls = () => {
      const width = containerRef.value?.clientWidth ?? 1200
      const height = containerRef.value?.clientHeight ?? 800
      const baseSize = Math.min(width, height) * 0.18

      balls.value = modules.map((item, index) => {
        const size = baseSize + index * 18
        return {
          x: width * (0.3 + 0.4 * Math.random()),
          y: height * (0.3 + 0.4 * Math.random()),
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size,
          targetSize: size,
          focused: false,
          active: false,
          scale: 1,
          label: item.title,
          desc: item.desc,
          route: item.routeBase,
          firstRoute: item.firstRoute,
        }
      })
    }

    const animate = () => {
      const width = containerRef.value?.clientWidth ?? 1200
      const height = containerRef.value?.clientHeight ?? 800

      if (activeIndex.value !== null) {
        rafId.value = requestAnimationFrame(animate)
        return
      }

      balls.value.forEach((ball, index) => {
        if (!ball.focused && activeIndex.value === null) {
          ball.x += ball.vx
          ball.y += ball.vy

          if (ball.x < ball.size * 0.5 || ball.x > width - ball.size * 0.5) {
            ball.vx *= -1
          }
          if (ball.y < ball.size * 0.5 || ball.y > height - ball.size * 0.5) {
            ball.vy *= -1
          }
        }

        const targetScale = ball.active ? 1.9 : ball.focused ? 1.12 : 1
        ball.scale += (targetScale - ball.scale) * 0.08
      })

      rafId.value = requestAnimationFrame(animate)
    }

    const onResize = () => {
      if (!containerRef.value) return
      const width = containerRef.value.clientWidth
      const height = containerRef.value.clientHeight
      balls.value.forEach((ball) => {
        ball.x = clamp(ball.x, ball.size * 0.6, width - ball.size * 0.6)
        ball.y = clamp(ball.y, ball.size * 0.6, height - ball.size * 0.6)
      })
    }

    const onEnter = (index: number) => {
      if (activeIndex.value !== null) return
      balls.value[index].focused = true
      balls.value[index].vx = 0
      balls.value[index].vy = 0
    }

    const onLeave = (index: number) => {
      if (activeIndex.value !== null) return
      const ball = balls.value[index]
      ball.focused = false
      ball.vx = (Math.random() - 0.5) * 0.8
      ball.vy = (Math.random() - 0.5) * 0.8
    }

    const onClick = (index: number) => {
      activeIndex.value = index
      balls.value = balls.value.map((ball, i) => ({
        ...ball,
        active: i === index,
        focused: i === index,
        vx: i === index ? 0 : ball.vx,
        vy: i === index ? 0 : ball.vy,
      }))
    }

    const onClose = () => {
      activeIndex.value = null
      balls.value = balls.value.map((ball) => ({
        ...ball,
        active: false,
        focused: false,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
      }))
    }

    const onDoubleClick = (index: number) => {
      const target = balls.value[index]
      router.push(target.firstRoute)
    }

    onMounted(() => {
      initBalls()
      animate()
      window.addEventListener('resize', onResize)
    })

    onUnmounted(() => {
      if (rafId.value != null) {
        cancelAnimationFrame(rafId.value)
      }
      window.removeEventListener('resize', onResize)
    })

    return () => {
      const activeBall =
        activeIndex.value === null ? null : balls.value[activeIndex.value] ?? null

      return (
        <div class="home" ref={containerRef}>
          <div class="home-bg" />
          <div class="home-hint">双击球体进入模块</div>
          {!activeBall && (
            <div class="home-stage">
              {balls.value.map((ball, index) => (
                <div
                  key={`${ball.label}-${index}`}
                  class={['module-ball', ball.focused && 'is-focused']
                    .filter(Boolean)
                    .join(' ')}
                  style={{
                    transform: `translate(${ball.x}px, ${ball.y}px) scale(${ball.scale})`,
                    width: `${ball.size}px`,
                    height: `${ball.size}px`,
                  }}
                  onMouseenter={() => onEnter(index)}
                  onMouseleave={() => onLeave(index)}
                  onClick={() => onClick(index)}
                  onDblclick={() => onDoubleClick(index)}
                >
                  <div class="ball-glow" />
                  <div class="ball-content">
                    <div class="ball-title">{ball.label}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeBall && (
            <div class="home-mask">
              <div class="home-modal">
                <div
                  class="home-modal-ball"
                  onMouseleave={onClose}
                  onDblclick={() => onDoubleClick(activeIndex.value as number)}
                >
                  <div class="home-modal-title">{activeBall.label}</div>
                  <div class="home-modal-desc">{activeBall.desc}</div>
                  <div class="home-modal-tip">
                    双击进入模块 · 移出球体关闭
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }
  },
})
