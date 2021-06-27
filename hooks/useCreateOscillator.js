import { useState, useEffect } from "react"

import useAudioContext from "./useAudioContext"

const useCreateOscillator = ({ frequency = 200, type = "sine" } = {}) => {
  const { audioContext } = useAudioContext()
  const [oscillator, setOscillator] = useState(undefined)

  useEffect(() => {
    const oscillator = audioContext.createOscillator()
    oscillator.frequency.value = frequency
    oscillator.type = type

    // Connect the oscillator to our audio graph
    oscillator.connect(audioContext.destination)
    oscillator.start()

    setOscillator(oscillator)

    // Looking for something similar to componentWillUnmount? This is it. 🤓
    return () => {
      oscillator.stop()
      oscillator.disconnect()
    }
  }, []) // [] is to only trigger on componentDidMount and componentWillUnmount

  return oscillator
}

export default useCreateOscillator
