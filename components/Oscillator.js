import useCreateOscillator from "../hooks/useCreateOscillator"
import useSetFrequency from "../hooks/useSetFrequency"

const Oscillator = ({ frequency = 200, type = "sine" } = {}) => {
  const oscillator = useCreateOscillator({ frequency, type })
  useSetFrequency({ oscillator, frequency })

  return null
}

export default Oscillator
