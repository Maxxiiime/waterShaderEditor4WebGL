import './index.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import App from './App'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
        <Canvas
            camera={ {
                fov: 45,
                near: 0.2,
                far: 200,
                position: [2, 1, 2],
            } }
        >
            <App />

        </Canvas>
)