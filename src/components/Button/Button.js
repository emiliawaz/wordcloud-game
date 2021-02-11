import './Button.scss'

const Button = (props) => {
  return (
    <button
      className="c-button"
      type="submit"
      onClick={props.onClick}>
      {props.text}
    </button>
  )
}

export default Button