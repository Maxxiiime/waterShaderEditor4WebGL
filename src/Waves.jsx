import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'

import * as THREE from 'three'

import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'

const debugObject = {}
debugObject.depthColor = '#1772a7'
debugObject.surfaceColor = '#5eb7df'


export default function Waves() {

    const planeRef = useRef();

    /**
     * Leva Editor
     */

    const { bigWavesElevation, bigWavesFrequencyX, bigWavesFrequencyY, bigWavesSpeed } = useControls('Big Waves',{
      bigWavesElevation: {
        value: 0.2,
        min: 0,
        max: 1,
        step: 0.001,
      },
      bigWavesFrequencyX: 
      { 
        value: 4.0,
        min: 0,
        max: 10,
        step: 0.01,
      },
      bigWavesFrequencyY: {
        value: 1.5,
        min: 0,
        max: 10,
        step: 0.01,

      },      
      
      bigWavesSpeed: {
        value: 0.75, 
        min: 0,
        max: 4,
        step: 0.001
      }      
    })

    const { smalWavesElevation, smallWavesFrequency, smallWavesSpeed, smallWavesIterations } = useControls('Small Waves', {
      smalWavesElevation: {
        value: 0.15,
        min: 0,
        max: 1,
        step: 0.001,
      },
      smallWavesFrequency: {
        value: 3,
        min: 0,
        max: 30,
        step: 0.001
      },
      smallWavesSpeed: {
        value: 0.2,
        min: 0,
        max: 4,
        step: 0.001,
      },
      smallWavesIterations: {
        value: 4,
        min: 0,
        max: 5,
        step: 1,
      }
    })

    const { depthColor, surfaceColor, colorOffset, colorMultiplier } = useControls('Water colors', {
      depthColor: {
        r: 23,
        g: 14,
        b: 167
      },
      surfaceColor: {
        r: 94,
        g: 183,
        b: 223,
      },
      colorOffset: {
        value: 0.05,
        min: 0,
        max: 1,
        step: 0.0001
      },
      colorMultiplier: {
        value: 3.9,
        min: 0,
        max: 10,
        step: 0.001,
      }
    })

    const waterShaderMaterial = {
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      uniforms: {
        uTime: { value: 0 },

        uBigWavesElevation: { value: bigWavesElevation },
        uBigWavesFrequency: { value: new THREE.Vector2(bigWavesFrequencyX, bigWavesFrequencyY) },
        uBigWavesSpeed: { value: bigWavesSpeed },

        uSmallWavesElevation: { value: smalWavesElevation },
        uSmallWavesFrequency: { value: smallWavesFrequency },
        uSmallWavesSpeed: { value: smallWavesSpeed },
        uSmallWavesIterations: { value: smallWavesIterations },

        uDepthColor: { value: new THREE.Color(`rgb(${depthColor.r}, ${depthColor.g}, ${depthColor.b})`) },
        uSurfaceColor: { value: new THREE.Color(`rgb(${surfaceColor.r}, ${surfaceColor.g}, ${surfaceColor.b})`) },

        uColorOffset: { value: colorOffset },
        uColorMultiplier: { value: colorMultiplier },
    
      }
    } 
    
    /**
     * Update uTime
     */

    useFrame(({ clock }) => {
        planeRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
      });

    return <>
      <pointLight position={[5, 5, 5]} />
        <mesh rotation-x={ - Math.PI * 0.5 } ref={ planeRef }>
            <planeGeometry args={ [2, 2, 512, 512] } />
            <shaderMaterial 
                attach="material" 
                args={[waterShaderMaterial]}
                
            />
        </mesh>
    </>
}