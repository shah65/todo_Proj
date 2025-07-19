import { useCallback, useState } from 'react';
import styled from 'styled-components';
import './App.css';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleTodo =  useCallback(() =>{
    if (todo.trim()) {
      setTodos([...todos, { id: Date.now(), text: todo }]);
      setTodo(''); // Clear input after adding
    }
  },[ todo])

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && todo.trim()) {
      handleTodo();
    }
  };

  return (
    <Main>
      <h1>Todos</h1>
      <InputContainer>
        <Input
          type="text"
          placeholder="Enter Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <AddButton onClick={handleTodo}>Add Todo</AddButton>
      </InputContainer>
      <TodoList>
        {todos.map((item) => (
          <TodoItem key={item.id}>
            <TodoText>{item.text}</TodoText>
            <DeleteButton onClick={() => handleDelete(item.id)}>Delete</DeleteButton>
          </TodoItem>
        ))}
      </TodoList>
    </Main>
  );
}

export default App;
 
const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  background-color: gray;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  padding: 20px;
`;
const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Input = styled.input`
  width: 60vh;
  height: 30px;
  border-radius: 5px;
  border: none;
  padding: 0 10px;
`;
const AddButton = styled.button`
  height: 50px;
  width: 20vh;
  border-radius: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`
const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  width: 60vh;
  background-color:red
`
const TodoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  color: black;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

// Styled component for todo text
const TodoText = styled.span`
  flex-grow: 1;
`;

// Styled component for the delete button
const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;