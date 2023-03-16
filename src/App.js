import { useReducer, useState } from "react";
import Todo from "./Todo";

// global const to avoid hard coded values
const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
};

export const ACTIONS_TODO = {
  ADD: "add-todo",
  TOGGLE: "toggle-todo",
  DELETE: "delete-todo",
};

function reducerState(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function reducerTodos(todos, action) {
  switch (action.type) {
    case ACTIONS_TODO.ADD:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS_TODO.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS_TODO.DELETE:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
}

function newTodo(name) {
  return { id: Date.now(), name, complete: false };
}

function App() {
  const [state, dispatchState] = useReducer(reducerState, { count: 0 });

  const [todos, dispatchTodos] = useReducer(reducerTodos, []);
  const [name, setName] = useState("");

  function increment() {
    dispatchState({ type: ACTIONS.INCREMENT });
  }

  function decrement() {
    dispatchState({ type: ACTIONS.DECREMENT });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatchTodos({ type: ACTIONS_TODO.ADD, payload: { name } });
    setName("");
  }

  console.log(todos);

  return (
    <>
      <button onClick={decrement}>-</button>
      <span>{state.count}</span>
      <button onClick={increment}>+</button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatchTodos} />;
      })}
    </>
  );
}

export default App;
