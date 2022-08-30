import logo from './logo.svg';
import './App.css';
import Game from './Game.js';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import * as React from 'react';


function App() {
  const [game, setGame] = React.useState(new Game());
  const [selectedMarble, setSelectedMarble] = React.useState([]);

  function isSelected(position){
    if(selectedMarble !== []){
      if(position[0] === selectedMarble[0]){
    
        if(position[1] === selectedMarble[1]){
          return true;
        }
      }
    }
    return false
  }

  function buildCell(val, row, col){
    if(val == 2){
      return (<div key={col} 
                   className='cell cell-ob'
                   > </div>)
    }
    if (val == 1){
      return (<div key={col} 
                   className={'cell cell-marble' + (isSelected([row,col]) ? ' cell-selected' : '')} 
                   onClick={e => clickMarble(row, col)}
                   isdisabled={game.getMovesForPosition([row, col]) == [] ? "true" : "false"}> </div>)
    }
    if(val == 0){
      return (<div key={col} 
                   className='cell cell-empty' 
                   onClick={e => moveMarbleTo(row, col)}>  </div>)
    }
  }

  function clickMarble(row, col){
    console.log("selected " + row + "," + col)
    if(game.getMovesForPosition([row,col]) != []){
      setSelectedMarble([row,col])
    }
  }

  function moveMarbleTo(row, col){
    console.log("move to " + row + "," + col)
    game.moveMarble(selectedMarble, [row, col])
    setSelectedMarble([])
    setGame(game)
  }

  let rows = [0, 1, 2, 3, 4, 5, 6]
  let board = rows.map((row) => {
    return (
      <div key={row} className="board-row">
        {
          rows.map( (col) => {
            return buildCell(game.board[row][col], row, col)
          })
        }
      </div>)
  })

  const reset = () => {
    setGame(new Game())
    setSelectedMarble([])
  }
  return (
    <div className="App">
      <div key="top" className="GameHeader">
        <div className="MarblesRemaining">
          <p>{game.remainingMarbles} Marbles Left</p>
        </div>
        <div className="reset" onClick={reset}>
          <button className="btn btn-info">Reset</button>
        </div>
      </div>
      <div className="board">
      <div>{board}</div>
      </div>
    </div>
  );
}

export default App;
