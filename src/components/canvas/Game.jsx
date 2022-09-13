import { Physics, useBox, usePlane, useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'

function Game() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 5]} />
      <pointLight position={[-10, -10, -5]} />
      <Physics defaultContactMaterial={{ restitution: 1.1 }}>
        <Enemy color='orange' position={[2, 1, 0]} />
        <Enemy color='hotpink' position={[-2, 3, 0]} />
        <Ball args={[0.5, 32, 32]} />
        <Paddle args={[2, 0.5, 1]} />
      </Physics>
    </>
  )
}

export default Game

function Paddle({ args }) {
  const [ref, api] = useBox(() => ({ args }))
  useFrame((state) => {
    api.position.set(
      (state.mouse.x * state.viewport.width) / 2,
      -state.viewport.height / 2,
      0
    )
    api.rotation.set(0, 0, (state.mouse.x * Math.PI) / 5)
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshStandardMaterial color='lightblue' />
    </mesh>
  )
}

function Ball({ args }) {
  const [ref, api] = useSphere(() => ({ args: [0.5], mass: 1 }))
  const { viewport } = useThree()
  usePlane(() => ({
    position: [0, -viewport.height, 0],
    rotation: [-Math.PI / 2, 0, 0],
    onCollide: () => {
      api.position.set(0, 0, 0)
      api.velocity.set(0, 10, 0)
    },
  }))
  return (
    <mesh ref={ref}>
      <sphereGeometry args={args} />
      <meshStandardMaterial />
    </mesh>
  )
}

function Enemy({ args = [2, 0.5, 1], color, ...props }) {
  const [ref] = useBox(() => ({ args, ...props }))
  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
