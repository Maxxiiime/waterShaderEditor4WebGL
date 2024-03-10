import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import * as THREE from 'three'

import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'


const debugObject = {}

debugObject.depthColor = '#1772a7'
debugObject.surfaceColor = '#5eb7df'

const wavesShaderMaterial = {
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
        uniforms: 
        {
            uTime: { value: 0 },
    
            uBigWavesElevation: { value: 0.2 },
            uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
            uBigWavesSpeed: { value: 0.75 },
    
            uSmallWavesElevation: { value: 0.15 },
            uSmallWavesFrequency: { value: 3 },
            uSmallWavesSpeed: { value: 0.2 },
            uSmallWavesIterations: { value: 4 },
    
            uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
            uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
    
            uColorOffset: { value: 0.05 },
            uColorMultiplier: { value: 3.9 },
        }   
}



export default function Waves() {

    const planeRef = useRef();
    
    useFrame(({ clock }) => {
        planeRef.current.material.uniforms.uTime.value = clock.oldTime * 0.001;
      });

    return <>
      <pointLight position={[5, 5, 5]} />
        <mesh rotation-x={ - Math.PI * 0.5 } ref={ planeRef }>
            <planeGeometry args={ [2, 2, 512, 512] } />
            <shaderMaterial attach="material" args={[wavesShaderMaterial]} />
        </mesh>
    </>
}