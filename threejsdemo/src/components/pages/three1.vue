<template>
    <div class="three1" ref="three1Ref">

    </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

let scene, camera, renderer, line, animationID
const three1Ref = ref(null)
onMounted(() => {
  init()
})

const init = () => {
  let container = three1Ref.value;
  // 创建场景
  scene = new THREE.Scene();
  // 加背景色
  scene.background = new THREE.Color(0xEEE9E9)
  // 创建相机
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  // 设置照相机的位置
  camera.position.set(0, 0, 50);
  // 相机看向的位置（原点）
  camera.lookAt(0, 0, 0);
  // 创建渲染器，设置尺寸为窗口尺寸，并将渲染后的元素添加到body
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // 创建材质
  // LineBasicMaterial 一种用于绘制线框样式几何体的材质
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
  // 创建带有顶点的几何体
  const points = [];
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(10, 0, 0));
  points.push(new THREE.Vector3(5, 0, 0));
  points.push(new THREE.Vector3(5, -10, 0));
  points.push(new THREE.Vector3(-5, -10, 0));
  points.push(new THREE.Vector3(-5, 0, 0));
  points.push(new THREE.Vector3(-10, 0, 0));
  // 注意，线是画在每一对连续的顶点之间的，而不是在第一个顶点和最后一个顶点之间绘制线条
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  // 形成线条
  line = new THREE.Line(geometry, material);
  scene.add(line);

  animate();
}


// 浏览器每次渲染的时候更新立方体的旋转角度
// 
const animate = () => {
  requestAnimationFrame(animate);
//   line.rotation.y += 0.01;
  line.rotation.z += 0.01;
//   line.rotation.x += 0.01;
  console.log('line')

  renderer.render(scene, camera);
};



onUnmounted(() => {
  console.log('Line组件卸载了')
})
</script>
<style lang="less" scoped>
.three1 {
    width: 500px;
    height: 500px;
    border: 1px solid;
}
</style>