import { ACTIONS_TODO } from "./App";

export default function Todo({ todo, dispatch }) {
  return (
    <div>
      <span style={{ color: todo.complete ? "#00FF00" : "#FF0000" }}>
        {todo.name}
      </span>
      <button
        onClick={() =>
          dispatch({ type: ACTIONS_TODO.TOGGLE, payload: { id: todo.id } })
        }
      >
        Toggle
      </button>
      <button
        onClick={() =>
          dispatch({ type: ACTIONS_TODO.DELETE, payload: { id: todo.id } })
        }
      >
        Delete
      </button>
    </div>
  );
}
