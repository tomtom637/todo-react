import { useRef, useEffect } from "react";
import { useAtom } from 'jotai';
import { v4 as uuid } from 'uuid';
import {
  todosAtom,
  displayModalAtom,
  cardIndexAtom,
  focusedTitleAtom,
  focusedTaskAtom,
  stopDisplayingModalAtom
} from '../store';
import useResizeTextArea from "../custom-hooks/useResizeTextArea";

import Button from "./Button";
import TodoItem from "./TodoItem";

export default function Card({ cardIndex }) {
  const [todos, setTodos] = useAtom(todosAtom);
  const [displayModal, setDisplayModal] = useAtom(displayModalAtom);
  const [focusedTitle, setFocusedTitle] = useAtom(focusedTitleAtom);
  const [focusedTask, setFocusedTask] = useAtom(focusedTaskAtom);
  const [cardIndexA, setCardIndexA] = useAtom(cardIndexAtom);
  const [stopDisplayingModal, setStopDisplayingModal] = useAtom(stopDisplayingModalAtom);
  const textArea = useRef(null);
  const todosLength = useRef(todos[cardIndex].todos.length);
  const handleTextAreaSize = useResizeTextArea(textArea);

  const setNewTitle = (e) => {
    const newTodos = [...todos];
    newTodos[cardIndex].title = e.target.value;
    setTodos(newTodos);
  };

  const addTodo = () => {
    const newTodos = [...todos];
    newTodos[cardIndex].todos.push({
      id: uuid(),
      task: "",
      completed: false,
      urgency: "low"
    });
    setTodos(newTodos);
  };

  const handleClickDelete = () => {
    if (stopDisplayingModal) {
      const newTodos = [...todos];
      newTodos.splice(cardIndex, 1);
      setTodos(newTodos);
      return;
    }
    setDisplayModal(true);
    setCardIndexA(cardIndex);
  };

  // Focus on the title of a newly created list
  useEffect(() => {
    if (focusedTitle === cardIndex) {
      textArea.current.focus();
      setFocusedTitle(null);
    }
  }, [focusedTitle]);

  // Focus on the task of a newly created todo
  useEffect(() => {
    if (todosLength.current < todos[cardIndex].todos.length) {
      setFocusedTask(todos[cardIndex].todos.length - 1);
      todosLength.current = todos[cardIndex].todos.length;
    }
    if (todosLength.current !== todos[cardIndex].todos.length) {
      todosLength.current = todos[cardIndex].todos.length;
    }
  }, [todos]);

  return (
    <div className='card'>
      <div className='card__header'>
        <Button
          buttonColor='danger'
          onClick={() => handleClickDelete()}
        >&#215;</Button>
        <textarea
          className="card__title"
          ref={textArea}
          autoFocus
          onFocus={e => handleTextAreaSize(e)}
          onKeyDown={e => handleTextAreaSize(e)}
          onBlur={e => handleTextAreaSize(e)}
          placeholder='Add a list name'
          value={todos[cardIndex].title}
          onChange={e => setNewTitle(e)}
          rows={1}
        />
      </div>
      <div className='card__body'>
        <ul className='card__list'>
          {todos[cardIndex].todos.map((todoItem, i) => (
            <TodoItem key={todoItem.id} cardIndex={cardIndex} todoIndex={i} />
          ))}
        </ul>
        <button className="card__add" onClick={() => addTodo()}>
          <i className="fa fa-solid fa-circle-plus"></i>
        </button>
      </div>
    </div>
  );
}
