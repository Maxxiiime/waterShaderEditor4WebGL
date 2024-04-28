import { OrbitControls, Environment } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

import Waves from './Waves'

export default function App() {

  useThree(({ camera }) => {
    camera.rotation.set(THREE.MathUtils.degToRad(30), 0, 0);
  });



  return (
    <>
      <Perf position="top-left" />
      <OrbitControls 
        makeDefault
        enableDamping 
        enableZoom={false}  
      />
      <ambientLight intensity={Math.PI / 2} />  

       
      <Environment
        background
        files='./img/syferfontein_6d_clear_puresky_2k.hdr'
      />  

      <Waves />


      
    </>
  )
}