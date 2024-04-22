import { useState, useEffect, useRef } from 'react';
import { useControls } from 'leva';

import { Object3D } from 'three';
import { Canvas } from '@react-three/fiber';
import { CameraControls,PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

import { BakeryHouse } from './components/BakeryHouse.jsx';
import { Floor } from './components/floor.jsx';

/** @type { {current: Object3D} } */

export function App() {
  const controlsRef = useRef();
  const cameraRef = useRef();

  const {
    fov, lightX, lightY, lightZ, lightIntensity, luminanceThreshold, luminanceSmoothing, height, lightX2, lightY2, lightZ2
  } = useControls({
    background: { label: 'Background', options: { city: 'city', forest: 'forest', studio: 'studio', dawn: 'dawn', night: 'night' }, value: 'city' },
    fov: { label: 'Field of View', value: 30, min: 10, max: 90, step: 1 },
    lightX: { label: 'Light X Position', value: -2, min: -10, max: 10, step: 0.1 },
    lightY: { label: 'Light Y Position', value: 0, min: -10, max: 10, step: 1 },
    lightZ: { label: 'Light Z Position', value: 3, min: -10, max: 20, step: 1 },
    lightX2: { label: 'Light2 X Position', value: 4, min: -10, max: 10, step: 0.1 },
    lightY2: { label: 'Light2 Y Position', value: 6, min: -10, max: 10, step: 1 },
    lightZ2: { label: 'Light2 Z Position', value: 1, min: -10, max: 20, step: 1 },
    lightIntensity: { label: 'Light Intensity', value: 1.3, min: 0, max: 10, step: 0.5 },
    luminanceThreshold: { label: 'luminanceThreshold', value: -0.8, min: -10, max: 10, step: 0.1 },
    luminanceSmoothing: { label: 'luminanceSmoothing', value: 4, min: -10, max: 10, step: 1 },
    height: { label: 'height', value: 400, min: -1000, max: 1000, step: 1 },
  });

  useEffect(() => {
    globalThis.cameraRef = cameraRef.current;
    globalThis.cameraControlsRef = controlsRef.current;
  }, [controlsRef])

  sessionStorage.clear();

  return (
    <div className='responsive'>
    <Canvas shadows>
      {/* <Environment background files="./hdri/Football-Field-Imotski-4K.hdr" /> */}
      {/* <Environment background files="./hdri/metro_noord_4k.exr" /> */}
      <ambientLight intensity={1} color="#fff"/>
      <directionalLight position={[lightX2, lightY2, lightZ2]} intensity={lightIntensity} color="#bbb8b4"/>
      <directionalLight position={[lightX, lightY, lightZ]} intensity={lightIntensity} color="#fff"/>
      <CameraControls makeDefault enableZoom={true}/>
      <PerspectiveCamera
        ref={cameraRef} makeDefault={true}
        far={10000} near={0.2} fov={fov}
        position={[-6, 0.6, 3]}
        rotation={[-0.2, -1, -0.1]}
      />
      <BakeryHouse />
      <Floor />
      <EffectComposer>
        <Bloom luminanceThreshold={luminanceThreshold} luminanceSmoothing={luminanceSmoothing} height={height} />
      </EffectComposer>
    </Canvas>
    </div>
  );
}
