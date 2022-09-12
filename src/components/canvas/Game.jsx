import { Physics, useBox } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'

function Game() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 5]} />
      <pointLight position={[-10, -10, -5]} />
      <Physics>
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
