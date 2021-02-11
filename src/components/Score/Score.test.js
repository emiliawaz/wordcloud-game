import { render, screen } from '@testing-library/react'
import Score from './Score'

test('it shows score', () => {
  const nickText = 'Congratulations, Nick!',
    pointsText = '2 points'

  render(<Score nickname="Nick" points="2"/>)

  expect(screen.getByText(nickText)).toBeInTheDocument()
  expect(screen.getByText(pointsText)).toBeInTheDocument()
})