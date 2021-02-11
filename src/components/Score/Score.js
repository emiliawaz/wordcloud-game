import './Score.scss'

const Score = (props) => {
  return (
    <div className="c-score">
      <h1 className="c-score__title">Congratulations, {props.nickname}!</h1>
      <h2 className="c-score__result">
        Your score: 
        <span className="c-score__points">{props.points} points</span>
      </h2>
    </div>
  )
}

export default Score
