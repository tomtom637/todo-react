import React, { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { todosAtom, focusedTaskAtom } from '../store';
import useResizeTextArea from "../custom-hooks/useResizeTextArea";

import Button from './Button';

export default function TodoItem({ cardIndex, todoIndex }) {
  const [todos, setTodos] = useAtom(todosAtom);
  const [focusedTask, setFocusedTask] = useAtom(focusedTaskAtom);
  const textArea = useRef(null);
  const handleTextAreaSize = useResizeTextArea(textArea);
  const currentTodo = todos[cardIndex].todos[todoIndex];

  const setTask = (e) => {
    const newTodos = [...todos];
    newTodos[cardIndex].todos[todoIndex].task = e.target.value;
    setTodos(newTodos);
  };

  const toggleCompleted = (e) => {
    const newTodos = [...todos];
    newTodos[cardIndex].todos[todoIndex].completed = !newTodos[cardIndex].todos[todoIndex].completed;
    setTodos(newTodos);
  };

  const setUrgency = (e) => {
    const newTodos = [...todos];
    newTodos[cardIndex].todos[todoIndex].urgency = e.target.value;
    setTodos(newTodos);
  };

  const deleteTodo = () => {
    const newTodos = [...todos];
    newTodos[cardIndex].todos.splice(todoIndex, 1);
    setTodos(newTodos);
  };

  // Focus on the task of a newly created todo
  useEffect(() => {
    if (focusedTask === todoIndex) {
      textArea.current.focus();
      setFocusedTask(null);
    }
  }, [focusedTask]);

  return (
    <li className="todo">
      <input
        type="checkbox"
        checked={currentTodo.completed}
        onChange={e => toggleCompleted(e)}
      />
      <textarea
        className="todo__task"
        ref={textArea}
        autoFocus
        onFocus={e => handleTextAreaSize(e)}
        onKeyDown={e => handleTextAreaSize(e)}
        onBlur={e => handleTextAreaSize(e)}
        placeholder='Add a task name'
        value={currentTodo.task}
        onChange={e => setTask(e)}
        rows={1}
      />
      <Button
          buttonColor='danger'
          onClick={() => deleteTodo()}
        >&#215;</Button>
    </li>
  );
}
