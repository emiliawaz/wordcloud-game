import './Welcome.scss'
import Button from '../Button/Button'
import { useState } from 'react'

const Welcome = (props) => {
  const [nickname, setNickname] = useState("")
  const [isValid, setIsValid] = useState(true)

  const validateNickname = (event) => {
    let pattern = /^[a-zA-Z0-9]{1,20}$/

    event.preventDefault()

    if (nickname?.match(pattern)) {
      setIsValid(true)
      showGame()
    } else {
      setIsValid(false)
    }
  }

  const showGame = () => {
    props.onButtonClick({
      nickname: nickname,
      step: "game"
    })
  }

  return (
    <div className="c-welcome">
      <h1>Wordcloud game</h1>
      <form className="c-welcome__form">
        {!isValid ?
          <span 
            id="error" 
            className="c-welcome__error">
            Nickname is required, it can contain letters and numbers only. Minimum length is 1 and maximum length is 20 characters.
          </span>
        :
          ''
        }
        <input
          className="c-welcome__input"
          type="text"
          placeholder="Enter your nickname here..."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          {...(!isValid ? { "aria-describedby": "error" } : {})}
          aria-label="nickname"
          aria-required="true"
          required />
        <Button
          text="play"
          onClick={validateNickname} />
      </form>
    </div>
  )
}

export default Welcome