import ReactDOM from 'react-dom'
import * as THREE from "three"
import React, { useRef, useState, useEffect } from 'react'
import { OrbitContorls } from "three-orbitcontrols"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber'
import './styles.css'
import { Fog, Camera } from 'three/build/three.module'

extend({ OrbitContorls });

const Controls = () =>{
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  
  useFrame(() => {
    orbitRef.current.update()
  })

return(
  <orbitControls 
  autoRotate
  maxPolarAngle={Math.PI/3}
  minPolarAngle={Math.PI/3}
  args = {[camera, gl.domElement]}
  ref = {orbitRef}
  />
)
}


const Ravine = () => {
  const [model, setModel] = useState()
  useEffect(() => {
      new GLTFLoader().load('1924-lowpoly.gltf', setModel)
  }, [])

  return (
      model ? <primitive
       object={model.scene} 
       
       /> : null
  )
}


function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'grey' : 'orange'} />
    </mesh>
  )
}

ReactDOM.render(
  <Canvas camera = {{position:[7.8,0,70]}}>
    
    <Controls />
    <ambientLight color={'White'} intensity={.8}/>
    <directionalLight position={[0, 0, 60]} penumbra={1} intensity={0.2}/>
    <fog attach="fog" args={['#d1d1d1',50,100]}/>
    <Box position={[7.8, 8, 10.5]} />
    <Box position={[20, 8, -2]} />
    <Ravine />
  </Canvas>,
  document.getElementById('root')
)
