import { render, fireEvent, screen } from '@testing-library/react'
import Welcome from './Welcome'

const setup = () => {
  const utils = render(<Welcome />)
  const input = utils.getByLabelText('nickname')
  const button = utils.getByText('play')

  return {
    input,
    button,
    ...utils
  }
}

test('it validates input', () => {
  const { input, button } = setup(),
    text = 'Nickname is required, it can contain letters and numbers only. Minimum length is 1 and maximum length is 20 characters.'

  fireEvent.change(input, { target: { value: '*' } })
  fireEvent.click(button)

  expect(screen.getByText(text)).toBeInTheDocument()
})