import './App.scss'
import { useState } from 'react'
import Welcome from './components/Welcome/Welcome'
import Game from './components/Game/Game'
import Score from './components/Score/Score'

const App = () => {
  const [step, setStep] = useState(""),
    [nickname, setNickname] = useState(""),
    [points, setPoints] = useState(0)

  const getDataFromChild = (data) => {
    setStep(data.step ? data.step : step)
    setNickname(data.nickname ? data.nickname : nickname)
    setPoints(data.points ? data.points : points)
  }

  return (
    <div className="app">
      {step.length ?
        step === 'game' ?
          <Game onButtonClick={(data) => { getDataFromChild(data) }}/>
          :
          <Score nickname={nickname} points={points}/>
      :
        <Welcome onButtonClick={(data) => { getDataFromChild(data) }}/>
      }
    </div>
  )
}

export default App
