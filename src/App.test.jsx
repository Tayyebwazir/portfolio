import { render, screen } from '@testing-library/react';
import App from './App';
import { experience } from './data/portfolio';

test('renders Tayyeb Ullah portfolio heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Tayyeb Ullah/i })).toBeInTheDocument();
});

test('keeps each experience entry in date, role, company, description order', () => {
  expect(experience[1]).toEqual([
    'Professional experience',
    'AI & NLP Engineer',
    'ITSOLERA Pvt. Ltd. · Pakistan',
    'Built conversational AI chatbots, RAG pipelines, and multi-tool agent systems.'
  ]);
});
