import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'

const Game = dynamic(() => import('@/components/canvas/Game'), {
  ssr: false,
})

// dom components goes here
const Page = () => {
  const score = useStore((state) => state.score)
  return <h1 className='text-center font-bold text-xl'>{score}</h1>
}

// canvas components goes here
Page.r3f = () => <Game />

export default Page
