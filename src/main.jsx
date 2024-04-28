import './index.css'
import ReactDOM from 'react-dom/client'
import { Canvas, useThree } from '@react-three/fiber'
import App from './App'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
        <Canvas

            camera={ {
                fov: 45,
                near: 0.2,
                far: 100,
                position: [0, 13, 0],
            } }
        >
            <App />
        </Canvas>
)