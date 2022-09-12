import dynamic from 'next/dynamic'

const Game = dynamic(() => '@/components/canvas/Game', {
  ssr: false,
})

// dom components goes here
const Page = () => {
  return <></>
}

// canvas components goes here
Page.r3f = () => <Game />

export default Page
