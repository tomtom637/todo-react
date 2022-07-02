import { useState } from 'react';
import useLocalStorage from './custom-hooks/useLocalStorage';
import { v4 as uuid } from 'uuid';
import Button from './components/Button';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  return (
    <div className='wrapper'>
      <div className="page-content">
        <header className='main-header'>
          <div className="container main-header__content">
            <h1 className='main-header__title'>Your todo lists</h1>
            <Button
              buttonColor='primary'
              onClick={() => alert('You clicked me!')}
            >
              <i className="fa fa-solid fa-circle-plus"></i> New List
            </Button>
          </div>
        </header>
        <main className='main-content'>
          <div className="container">
            <p>Here is a unique ID:<br/><br/> {uuid()}</p>
          </div>
        </main>
      </div>
      {/* end page content, used to ensure the footer is stuck a the bottom of the page */}
      <footer className="main-footer">
        <div className="container main-footer__content">
          <p className='main-footer__text'>Made with love in 2022</p>
        </div>
      </footer>
    </div >
  );

}

export default App;
