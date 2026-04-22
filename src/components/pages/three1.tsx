import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

/**
 * 示例 1-1：绘制线条并进行简单旋转动画。
 */
export default defineComponent({
  name: 'Three1',
  setup() {
    const three1Ref = ref<HTMLDivElement | null>(null)

    let scene: THREE.Scene | null = null
    let camera: THREE.PerspectiveCamera | null = null
    let renderer: THREE.WebGLRenderer | null = null
    let line: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial> | null = null
    let rafId: number | null = null

    /**
     * 初始化场景、相机、渲染器以及线条对象。
     */
    const init = () => {
      const container = three1Ref.value
      if (!container) return

      scene = new THREE.Scene()
      scene.background = new THREE.Color(0xeee9e9)

      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        1,
        500,
      )
      camera.position.set(0, 0, 50)
      camera.lookAt(0, 0, 0)

      renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      container.appendChild(renderer.domElement)

      const material = new THREE.LineBasicMaterial({ color: 0x0000ff })
      const points: THREE.Vector3[] = [
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(0, 10, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(5, 0, 0),
        new THREE.Vector3(5, -10, 0),
        new THREE.Vector3(-5, -10, 0),
        new THREE.Vector3(-5, 0, 0),
        new THREE.Vector3(-10, 0, 0),
      ]

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      line = new THREE.Line(geometry, material)
      scene.add(line)

      animate()
    }

    /**
     * 动画循环：每帧更新并渲染。
     */
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      if (!renderer || !scene || !camera || !line) return

      line.rotation.z += 0.01
      renderer.render(scene, camera)
    }

    /**
     * 卸载时释放动画与 WebGL 资源。
     */
    const dispose = () => {
      if (rafId != null) {
        cancelAnimationFrame(rafId)
      }
      rafId = null

      if (renderer) {
        const el = renderer.domElement
        renderer.dispose()
        if (el?.parentNode) {
          el.parentNode.removeChild(el)
        }
      }

      if (line) {
        line.geometry.dispose()
        line.material.dispose()
      }

      scene = null
      camera = null
      renderer = null
      line = null
    }

    onMounted(() => {
      init()
    })

    onUnmounted(() => {
      dispose()
    })

    return () => (
      <div
        class="three1"
        ref={(el) => {
          three1Ref.value = el as HTMLDivElement | null
        }}
      />
    )
  },
})

