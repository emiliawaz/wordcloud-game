import data from '../../data'
import './Game.scss'
import Button from '../Button/Button'
import { useState, useEffect } from 'react'
import ReactWordcloud from "react-wordcloud"

const Game = (props) => {
  const [points, setPoints] = useState(0),
    [words, setWords] = useState([]),
    [goodWords, setGoodWords] = useState([]),
    [question, setQuestion] = useState(""),
    [isGameFinished, setIsGameFinished] = useState(false)

  let selectedWords = []

  useEffect(() => {
    let index = Math.floor(Math.random() * data.length),
      words = data[index].all_words

    let preparedWords = words.map(word => { return { text: word, value: 1 } })

    setWords(preparedWords)
    setQuestion(data[index].question)
    setGoodWords(data[index].good_words)
  }, [])

  const getCallback = () => {
    return function (word, event) {
      const element = event.target,
        isSelected = element.classList.contains('c-game__word--selected')

      if (!isSelected) {
        selectedWords.push({ text: word.text, value: word.value })
      } else {
        let filteredItems = [...selectedWords]

        filteredItems = filteredItems.filter((item) => {
          return item.text !== word.text
        })
        selectedWords = filteredItems
      }

      element.classList.toggle('c-game__word--selected')
    }
  }

  const checkAnswers = () => {
    const correctAnswers = goodWords.length
    let rightSelected = [],
      wrongSelected = [],
      rightUnselected = 0

    selectedWords.forEach(word => {
      goodWords.includes(word.text) ? rightSelected.push(word) : wrongSelected.push(word)
    })
    rightUnselected = correctAnswers - rightSelected.length

    let updatedWords = words.map(word => {
      if (rightSelected?.length && rightSelected.some(w => w.text === word.text)) {
        return { text: word.text, value: 2 }
      } else if (wrongSelected?.length && wrongSelected.some(w => w.text === word.text)) {
        return { text: word.text, value: 0 }
      } else {
        return word
      }
    })

    let selected = document.querySelectorAll('.c-game__word--selected')
    selected.forEach(element => {
      element.classList.remove('c-game__word--selected')
    })

    selectedWords = []
    setWords(updatedWords)
    setPoints((rightSelected.length * 2) - (wrongSelected.length + rightUnselected))
    setIsGameFinished(true)
  }

  const showScore = () => {
    props.onButtonClick({
      points: points,
      step: "score"
    })
  }

  const options = {
    rotations: 1,
    rotationAngles: [0],
    colors: ["#000"],
    deterministic: true,
    enableTooltip: false,
    padding: 15,
    fontWeight: "bold",
    fontFamily: "Heebo",
    fontSizes: [18, 18]
  }

  const callbacks = {
    onWordClick: getCallback()
  }

  const callbacksFinished = {
    getWordColor: (word) => word.value > 1 ? '#8CC14C' : word.value < 1 ? '#F34237' : "#000"
  }

  return (
    <div className="c-game">
      <h1 className="c-game__question">{question}</h1>
      {isGameFinished ?
        <div>
          <ReactWordcloud
            className="c-game__cloud"
            options={options}
            words={words}
            callbacks={callbacksFinished} />
          <Button
            text="finish game"
            onClick={showScore} />
        </div>
        :
        <div>
          <ReactWordcloud
            className="c-game__cloud"
            options={options}
            words={words}
            callbacks={callbacks} />
          <Button
            text="check answers"
            onClick={checkAnswers} />
        </div>
      }
    </div>
  )
}

export default Game
