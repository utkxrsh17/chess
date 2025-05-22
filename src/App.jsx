import { useState } from "react";
import Board from "./components/board/Board";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Board className="board" />
    </div>
  );
}

export default App;
