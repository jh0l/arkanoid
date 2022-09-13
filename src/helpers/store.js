import create from 'zustand'
import shallow from 'zustand/shallow'

const useStoreImpl = create((set) => {
  return {
    router: null,
    dom: null,
    score: 0,
    increaseScore: () => set((state) => ({ score: state.score + 1 })),
    resetScore: () => set((z) => ({ score: 0 })),
  }
})

const useStore = (sel) => useStoreImpl(sel, shallow)
Object.assign(useStore, useStoreImpl)

const { getState, setState } = useStoreImpl

export { getState, setState }
export default useStore
