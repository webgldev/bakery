import { useState, useEffect, useRef, useMemo } from 'react'
import { useThree } from '@react-three/fiber';
import { useGLTF, useHelper } from '@react-three/drei'
import { Color, SpotLightHelper, Vector3, MeshStandardMaterial } from 'three';
import { useControls } from 'leva';

export function BakeryHouse(props) {
  const { nodes, materials } = useGLTF('./models/05.glb');
  
  const spotLightRef1 = useRef();
  const spotLightRef2 = useRef();
  const treeMeshRef1 = useRef();
  const treeMeshRef2 = useRef();

  const controls = useThree((state) => state.controls)  
  const stainColor = '#e3ded7'
  const wallColor = '#f8ede1'

  // 발광
  const emissiveLight = useMemo(() => {
    const mat = new MeshStandardMaterial({
      ...materials['매테리얼.002'],
      emissive: new Color(0xffffff),
      emissiveIntensity: 0.5,
    });
    return mat;
  }, []);

  // 스폿라잍
  const intensitySpotLight = 0.3
  const spotLight1 = useControls('Light Controls 1', {
    y: { value: 1.58, min: 1.2, max: 1.8, label: 'Position Y' },
    angle: { value: Math.PI / 8, min: 0, max: Math.PI / 2, label: 'Angle' }
  });
  const spotLight2 = useControls('Light Controls 2', {
    y: { value: 1.58, min: 1.2, max: 1.8, label: 'Position Y' },
    angle: { value: Math.PI / 8, min: 0, max: Math.PI / 2, label: 'Angle' }
  });

  // 스폿라잍 타겟
  useEffect(() => {
    if (spotLightRef1.current && spotLightRef2.current && treeMeshRef1.current && treeMeshRef2.current) {
      spotLightRef1.current.target = treeMeshRef1.current;
      spotLightRef2.current.target = treeMeshRef2.current;
      spotLightRef1.current.target.updateMatrixWorld();
    }
  }, []);

  // 초기 로드 시 카메라 뷰 위치 조절
  // 브라우저 새로고침 시 & 로컬 개발모드 저장 시
  useEffect(() => {
    const cameraInitView = sessionStorage.getItem("cameraInitView");

    if (!cameraInitView && controls) {
      controls.truck(0, -0.8, false);
      sessionStorage.setItem("cameraInitView", "true");
    }
  }, [controls]);

  useHelper(spotLightRef1, SpotLightHelper, 'teal');
  useHelper(spotLightRef2, SpotLightHelper, 'teal');

  return (
    <>
      <group>
        <pointLight
          intensity={30}
          decay={1.8}
          color="#ffeea0"
          position={[-3, 8, -0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <spotLight
          castShadow
          ref={spotLightRef1}
          intensity={intensitySpotLight}
          angle={spotLight1.angle}
          penumbra={0.2}
          decay={2}
          color="#fffefd"
          position={new Vector3(-1.042, spotLight1.y, 0.885)}
          scale={0}
        />
        <spotLight
          castShadow
          ref={spotLightRef2}
          intensity={intensitySpotLight}
          angle={spotLight2.angle}
          penumbra={0.5}
          decay={2}
          color="#fffefd"
          position={new Vector3(-1.042, spotLight2.y, -0.898)}
          scale={0}
        />
      </group>
      <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.원형.geometry}
        material={materials.wood2}
        position={[-0.851, 0.482, -0.073]}
        scale={0.105}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.원형001.geometry}
        material={materials.wood2}
        position={[-0.931, 0.193, -0.067]}
        rotation={[0, 0.039, 0]}
        scale={[0.013, 0.021, 0.012]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.원형005.geometry}
        material={materials.wood2}
        position={[-0.809, 0.192, 0.002]}
        rotation={[0, 0.039, 0]}
        scale={[0.012, 0.02, 0.011]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.원형006.geometry}
        material={materials.wood2}
        position={[-0.812, 0.192, -0.148]}
        rotation={[0, 0.039, 0]}
        scale={[0.012, 0.02, 0.011]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.원형004.geometry}
        material={materials.wood2}
        position={[-0.818, 0.206, -0.098]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.011, 0.02, 0.011]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.원형007.geometry}
        material={materials.wood2}
        position={[-0.845, 0.206, -0.108]}
        rotation={[Math.PI / 2, 0, 1.038]}
        scale={[0.011, 0.02, 0.011]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.원형008.geometry}
        material={materials.wood2}
        position={[-0.885, 0.206, -0.056]}
        rotation={[Math.PI / 2, 0, -1.022]}
        scale={[0.011, 0.02, 0.011]}
      />
      <mesh
        ref={treeMeshRef1}
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0.geometry}
        material={materials.Material_0}
        position={[-1.248, 0.116, 0.917]}
        rotation={[0, -0.624, 0]}
        scale={0.66}
      />
      <mesh
        ref={treeMeshRef2}
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0001.geometry}
        material={materials['Material_0.001']}
        position={[-1.165, 0.257, -0.928]}
        rotation={[0, -0.902, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0002.geometry}
        material={materials['Material_0.002']}
        position={[-0.542, 0.646, -0.595]}
        rotation={[-0.085, 0, 1.274]}
        scale={0.508}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0003.geometry}
        material={materials['Material_0.002']}
        position={[-0.542, 0.642, -0.489]}
        rotation={[-0.423, 0, 1.274]}
        scale={0.508}
      />
      <group position={[0, 1, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.큐브.geometry} material={materials.wall}
        material-color={wallColor} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.큐브_1.geometry}
          material={materials.wood2}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bakery.geometry}
        material={emissiveLight}
        position={[-1.003, 1.685, -0.068]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.293}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.sign001.geometry}
        material={materials.wood2}
        position={[-1.01, 1.506, -0.131]}
        scale={[0.664, 1, 0.493]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall006.geometry}
        material={nodes.wall006.material}
        position={[-1.037, 1.565, 0.886]}
        scale={[0.05, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall007.geometry}
        material={materials.title}
        position={[-1.352, 0.047, 0]}
        scale={[1, 0.225, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.sign002.geometry}
        material={emissiveLight}
        position={[-0.85, 1.208, -0.119]}
        scale={[1, 1, 0.743]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.sign004.geometry}
        // material={materials.stainless}
        material-color={stainColor}
        position={[-0.858, 1.268, -0.555]}
        scale={[1, 1, 0.743]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall023.geometry}
        material={materials.wall}
        material-color={wallColor}
        position={[-1.044, 0.656, 0]}
        scale={[1, 0.225, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.sign003.geometry}
        // material={materials.stainless}
        material-color={stainColor}
        position={[-0.858, 1.268, 0.478]}
        scale={[1, 1, 0.743]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall026.geometry}
        material={materials.wall}
        material-color={wallColor}
        position={[-1.044, 0.676, 0]}
        scale={[1, 0.225, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall028.geometry}
        material={emissiveLight}
        position={[-0.896, 1.671, 1.125]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.05, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bakery001.geometry}
        material={materials.title}
        position={[-0.92, 1.667, 1.11]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.072}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall030.geometry}
        material={nodes.wall030.material}
        position={[-1.037, 1.565, -0.897]}
        scale={[0.05, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall032.geometry}
        material={materials.glass}
        position={[-1.044, 0.679, 0]}
        scale={[1, 0.225, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall025.geometry}
        material={nodes.wall025.material}
        position={[-1.356, 0.174, -0.963]}
        scale={[0.05, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall035.geometry}
        material={materials.wood}
        position={[0.187, 1.729, -0.604]}
        scale={[0.234, 4.678, 4.678]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall034.geometry}
        material={materials.wood}
        position={[0.187, 1.729, 0.715]}
        scale={[0.234, 4.678, 4.678]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall036.geometry}
        material={materials.wood}
        position={[-0.594, 1.729, -0.003]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.234, 4.678, 4.678]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall037.geometry}
        material={materials.wood}
        position={[0.869, 1.729, -0.003]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.234, 4.678, 4.678]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall001.geometry}
        material={materials.wall}
        material-color={wallColor}
        position={[0, 1, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall024.geometry}
        // material={materials.stainless}
        material-color={stainColor}
        position={[-1.063, 1.636, 0.863]}
        scale={[0.05, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall027.geometry}
        // material={materials.stainless}
        material-color={stainColor}
        position={[-1.063, 1.636, -0.919]}
        scale={[0.05, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall008.geometry}
        material={materials.wood2}
        position={[-1.35, 0.099, -0.936]}
        scale={[0.05, 1, 1.273]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall009.geometry}
        material={materials.wood2}
        position={[-1.35, 0.099, -0.803]}
        scale={[0.05, 1, 1.273]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall010.geometry}
        material={materials.wood2}
        position={[-1.35, 0.099, -0.67]}
        scale={[0.05, 1, 1.273]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall011.geometry}
        material={materials.wood2}
        position={[-1.35, 0.099, -0.537]}
        scale={[0.05, 1, 1.273]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall012.geometry}
        material={materials.wood2}
        position={[-1.35, 0.099, -0.404]}
        scale={[0.05, 1, 1.273]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall013.geometry}
        material={materials.wood2}
        position={[-1.35, 0.099, -0.271]}
        scale={[0.05, 1, 1.273]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall014.geometry}
        material={materials.wood2}
        position={[-1.35, 0.099, -0.139]}
        scale={[0.05, 1, 1.273]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall015.geometry}
        material={materials.wood2}
        position={[-1.35, 0.099, -0.006]}
        scale={[0.05, 1, 1.273]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall016.geometry}
        material={materials.wood2}
        position={[-1.35, 0.099, 0.127]}
        scale={[0.05, 1, 1.273]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall017.geometry}
        material={materials.wood2}
        position={[-1.35, 0.099, 0.26]}
        scale={[0.05, 1, 1.273]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall018.geometry}
        material={materials.wood2}
        position={[-1.35, 0.099, 0.393]}
        scale={[0.05, 1, 1.273]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall019.geometry}
        material={materials.wood2}
        position={[-1.35, 0.099, 0.526]}
        scale={[0.05, 1, 1.273]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall020.geometry}
        material={materials.wood2}
        position={[-1.35, 0.099, 0.659]}
        scale={[0.05, 1, 1.273]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall021.geometry}
        material={materials.wood2}
        position={[-1.35, 0.099, 0.792]}
        scale={[0.05, 1, 1.273]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall022.geometry}
        material={materials.wood2}
        position={[-1.35, 0.099, 0.924]}
        scale={[0.05, 1, 1.273]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.원형002.geometry}
        material={materials.wood2}
        position={[-0.851, 0.476, -0.418]}
        rotation={[0, 1.432, 0]}
        scale={0.105}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.원형010.geometry}
        material={materials.wood2}
        position={[-0.887, 0.23, -0.431]}
        rotation={[0, 1.471, 0]}
        scale={[0.012, 0.02, 0.011]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.원형011.geometry}
        material={materials.wood2}
        position={[-1.034, 0.206, -0.466]}
        rotation={[Math.PI / 2, 0, -1.432]}
        scale={[0.011, 0.02, 0.011]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.원형012.geometry}
        material={materials.wood2}
        position={[-0.885, 0.206, -0.428]}
        rotation={[Math.PI / 2, 0, -0.394]}
        scale={[0.011, 0.02, 0.011]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.원형003.geometry}
        material={materials.wood2}
        position={[-0.851, 0.21, -0.406]}
        rotation={[0, 1.471, 0]}
        scale={[0.013, 0.021, 0.012]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.원형009.geometry}
        material={materials.wood2}
        position={[-0.839, 0.206, -0.381]}
        rotation={[Math.PI / 2, 0, -2.454]}
        scale={[0.011, 0.02, 0.011]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.원형013.geometry}
        material={materials.wood2}
        position={[-0.839, 0.206, -0.381]}
        rotation={[Math.PI / 2, 0, -2.454]}
        scale={[0.011, 0.02, 0.011]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.glass.geometry}
        material={materials.glass}
        position={[-1.002, 0.656, 0.559]}
        scale={[1, 0.225, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall033.geometry}
        material={materials.wood}
        position={[-0.708, 0.617, 0.263]}
        scale={[1, 0.225, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall038.geometry}
        material={materials.wood2}
        position={[-0.695, 0.583, 0.266]}
        scale={[0.566, 0.225, 0.566]}
      />
    </group>
    </>
  )
}

useGLTF.preload('./models/05.glb')
