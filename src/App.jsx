import { OrbitControls } from '@react-three/drei'

import Waves from './Waves'

export default function App() {

  return (
    <>
      <OrbitControls makeDefault/>

      <Waves/>      
    </>
  )
}