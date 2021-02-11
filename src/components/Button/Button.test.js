import { render, screen } from '@testing-library/react'
import Button from './Button'

test('it renders with proper text', () => {
  const text = 'check answers'

  render(<Button text={text}/>)

  expect(screen.getByText(text)).toBeInTheDocument()
})