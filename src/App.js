import React from 'react';
import './App.css'
import Board from "./components/Board";
import TaskDetailsView from "./components/TaskDetailsView";

function App() {
  return (
    <div >
        <Board/>
        <TaskDetailsView/>
    </div>
  );
}

export default App;
