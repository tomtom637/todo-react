import { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { v4 as uuid } from 'uuid';
import { todosAtom, displayModalAtom, cardIndexAtom, focusedTitleAtom } from './store';
import Button from './components/Button';
import CardsList from './components/CardsList';
import Modal from './components/Modal';

function App() {
  const [todos, setTodos] = useAtom(todosAtom);
  const [displayModal, setDisplayModal] = useAtom(displayModalAtom);
  const [focusedTitle, setFocusedTitle] = useAtom(focusedTitleAtom);
  const [cardIndex, setCardIndex] = useAtom(cardIndexAtom);
  const listLength = useRef(todos.length);

  const addList = () => {
    setTodos([...todos, { id: uuid(), title: '', todos: [] }]);
  }

  const deleteCard = () => {
    const newTodos = [...todos];
    newTodos.splice(cardIndex, 1);
    setTodos(newTodos);
  }

  // Focus on the title of a newly created list
  useEffect(() => {
    if (listLength.current < todos.length) {
      setFocusedTitle(todos.length - 1);
      listLength.current = todos.length;
    }
    if (listLength.current !== todos.length) {
      listLength.current = todos.length;
    }
  }, [todos]);

  return (
    <div className='wrapper'>
      <div className="page-content">
        <header className='main-header'>
          <div className="container main-header__content">
            <h1 className='main-header__title'>to-dooz</h1>
            <Button
              buttonColor='dark'
              onClick={() => addList()}
            >
              <i className="fa fa-solid fa-circle-plus"></i> New List
            </Button>
          </div>
        </header>
        <main className='main-content'>
          <div className="container">
            {todos.length > 0 ? <CardsList /> : <p className='main-content__empty-message'>No lists yet. Create one!</p>}
          </div>
        </main>
      </div>
      {displayModal && <Modal
        heading='Delete this list?'
        content='Your list will be permanently deleted'
        modalAction={() => {
          deleteCard();
        }}
      />}
      {/* page content is used to ensure the footer is stuck at the bottom of the page */}
      <footer className="main-footer">
        <div className="container main-footer__content">
          <p className='main-footer__text'>Made with React, Jotai and Sass 🚀</p>
        </div>
      </footer>
    </div>
  );

}

export default App;
