import { createContext, useContext } from "react"

const context = createContext({
  audioContext: typeof window !== "undefined" ? new window.AudioContext() : {},
})

console.log("Create AudioContext instance")

export default () => useContext(context)
