// 代码生成时间: 2025-10-07 22:27:42
const next = require('next');
const { React, useEffect, useRef } = require('react');
const { Canvas } = require('@react-three/fiber');
const { OrbitControls } = require('@react-three/drei');
const { Box } = require('@react-three/drei');

// 3D渲染组件
const ThreeDRenderer = ({ scene }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const controls = new OrbitControls(canvasRef.current, canvasRef.current.viewport);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;
    controls.addEventListener('change', (event) => {
      console.log('Camera position:', controls.target);
    });
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      camera={{ position: [0, 0, 10] }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.5;
        // 初始化场景
        scene && scene(gl);
      }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <primitive object={scene} />
      <OrbitControls />
      <Box args={[1, 1, 1]} position={[-2, 0, 0]} />
    </Canvas>
  );
};

// 导出3D渲染组件
module.exports = ThreeDRenderer;