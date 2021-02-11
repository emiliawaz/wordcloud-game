import { render, screen } from '@testing-library/react'
import App from './App'

test('it renders Welcome component', () => {
  render(<App />)

  expect(screen.getByText('Wordcloud game')).toBeInTheDocument();
})