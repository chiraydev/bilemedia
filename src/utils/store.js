import create from 'zustand'
import { persist } from 'zustand/middleware'


export const useGlobalStore = create(
  persist(
  (set) => ({
 
    userDetails:{},
   


    setUserDetails: async (value) => {
        set((state) => ({userDetails:value}))
      },

    

}),
{
  name: 'storage',
  getStorage: () => localStorage,
}
)
)


