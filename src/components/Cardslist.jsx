import React from 'react';
import { useAtom } from 'jotai';
import { todosAtom } from '../store';
import Card from './Card';

export default function Cardslist() {
  const [todos, setTodos] = useAtom(todosAtom);

  return (
    <section className='cards-list'>
      {todos.map((todoCard, i) => (
        <Card key={todoCard.id} cardIndex={i} />
      ))}
    </section>
  );
}
