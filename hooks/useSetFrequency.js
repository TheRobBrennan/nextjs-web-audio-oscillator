import { useEffect } from "react"

const useSetFrequency = ({ oscillator, frequency = 200 } = {}) =>
  useEffect(
    () => {
      if (oscillator) {
        console.log(`Change frequency to: ${frequency} Hz`)

        oscillator.frequency.value = frequency // frequency is an AudioParam so we need .value
      }
    },
    [frequency] // only trigger this effect on frequency change
  )

export default useSetFrequency
