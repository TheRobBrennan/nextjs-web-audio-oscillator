import React, { useState, useRef } from "react"

import Oscillator from "../components/Oscillator"
import useAudioContext from "../hooks/useAudioContext"

import Slider from "rc-slider"
import "rc-slider/assets/index.css"

const App = () => {
  if (typeof window === "undefined") return null

  const { audioContext } = useAudioContext()
  const [frequency, setFrequency] = useState(200)

  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(false)
  const [isPauseButtonDisabled, setIsPauseButtonDisabled] = useState(true)

  function startWebAudio() {
    console.log(`User has pressed the start web audio button`)
    // IMPORTANT! Here is the cross-browser fix that resolves issues with Safari on iPadOS and iOS.
    // Safari on iPadOS or iOS needs to have a user-initiated event before the audio context will be running and available for Web Audio API usage.
    // Safari on macOS is not affected by this restriction.
    //
    // There are plenty of solutions that advise warming up the audio context by creating and playing an empty audio buffer. That is unnecessary if you use my approach.
    if (audioContext.state === "suspended") {
      console.log(`\tAttempting to resume a suspended web audio context...`)

      audioContext.resume().then(() => {
        console.log("\t\tWeb Audio is now", audioContext.state)

        setIsStartButtonDisabled(true)
        setIsPauseButtonDisabled(false)
      })
    }
  }

  function pauseWebAudio() {
    console.log(`User has pressed the pause web audio button`)
    audioContext.suspend().then(() => {
      console.log("\tWeb Audio is now", audioContext.state)

      setIsStartButtonDisabled(false)
      setIsPauseButtonDisabled(true)
    })
  }

  return (
    <>
      <Slider
        min={200}
        max={400}
        value={frequency}
        style={{ width: 200, margin: 10 }}
        onChange={setFrequency}
      />
      <Oscillator frequency={frequency} />
      <button
        onClick={startWebAudio}
        onTouchStart={startWebAudio}
        disabled={isStartButtonDisabled}
      >
        Start Web Audio
      </button>
      <button
        onClick={pauseWebAudio}
        onTouchStart={pauseWebAudio}
        disabled={isPauseButtonDisabled}
      >
        Pause Web Audio
      </button>
    </>
  )
}

export default App
