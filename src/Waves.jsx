import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'

import * as THREE from 'three'

import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'


const debugObject = {}
debugObject.depthColor = '#64b9e5'
debugObject.surfaceColor = '#cde2e5'


export default function Waves() {


    const scene = useThree((state) => state.scene)
    const planeRef = useRef();

    /**
     * Leva Editor
     */

    const { bigWavesElevation, bigWavesFrequencyX, bigWavesFrequencyY, bigWavesSpeed } = useControls('Big Waves',{
      bigWavesElevation: {
        value: 0.4,
        min: 0,
        max: 1,
        step: 0.001,
      },
      bigWavesFrequencyX: 
      { 
        value: 0.2,
        min: 0,
        max: 2,
        step: 0.01,
      },
      bigWavesFrequencyY: {
        value: 0.4,
        min: 0,
        max: 2,
        step: 0.01,

      },      
      
      bigWavesSpeed: {
        value: 0.5, 
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
        r: 100,
        g: 185,
        b: 229
      },
      surfaceColor: {
        r: 205,
        g: 226,
        b: 229,
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

    const { efogNear, efogFar, efogColor } = useControls('Fog', {
      efogNear: {
        value: 30,
        min: 0,
        max: 50,
        step: 0.1,
      },
      efogFar: {
        value: 65,
        min: 10,
        max: 100,
        step: 0.1,
      },

      efogColor: {
        r: 170,
        g: 174,
        b: 170,
      }
    })

    scene.fog = new THREE.Fog(new THREE.Color(`rgb(${efogColor.r}, ${efogColor.g}, ${efogColor.b})`), efogNear, efogFar)

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

        fogNear: { value: efogNear },
        fogFar: { value: efogFar },
        fogColor: { value: new THREE.Color(`rgb(${efogColor.r}, ${efogColor.g}, ${efogColor.b})`) }

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
        <planeGeometry 
          args={ [100, 100, 512, 512] } 
          position={ [0, 0, 0] }  
        />
        <shaderMaterial 
          attach="material" 
          args={[waterShaderMaterial]}  
          fog={true}   
        />
      </mesh>






        
    </>
}