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
    if(val == -1){
      return (<div key={col} 
                   className='cell cell-ob'
                   > </div>)
    }
    if (val > 0){
      return (<div key={col} 
                   className={'cell cell-marble-' + (game.board[row][col] % 9 + 1) + (isSelected([row,col]) ? ' cell-selected' : '')} 
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
    if(game.remainingMarbles == 37){
      game.removeMarble(row,col)
      setSelectedMarble([])
    }
    else if(game.getMovesForPosition([row,col]) != []){
      setSelectedMarble([row,col])
    }
  }

  function moveMarbleTo(row, col){
    console.log("move to " + row + "," + col)
    game.moveMarble(selectedMarble, [row, col])
    setSelectedMarble([])
    setGame(game)
  }

  function getInstructionMessage(){
    if(game.remainingMarbles == 37){
      return "Select the first marble to remove."
    } else if(selectedMarble.length == 0){
      if(game.isAnyPossibleMoves()){
        return "Select a marble to move."
      }
      return "Game over with " + game.remainingMarbles +" marbles left."
    } else {
      if(game.getMovesForPosition(selectedMarble).length > 0)
      return "Select a position to move the marble to."
      else{
        return "No possible moves for the selected marble."
      }
    }
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

  const undo = () => {
    if(game.moves.length > 0){
      game.undoLastMove()
    } else {
      setGame(new Game())
    }
    setSelectedMarble([])
  }

  return (
    <div className="App">
      <div key="top" className="GameHeader">
        <div className="undo" onClick={undo}>
          <button className="btn btn-info">Undo</button>
        </div>
        <div className="MarblesRemaining">
          <p>{game.remainingMarbles} Marbles Left</p>
        </div>
        <div className="reset" onClick={reset}>
          <button className="btn btn-info">Reset</button>
        </div>
      </div>
      <br/>
      <div className="board-container">
      <div className="board">{board}</div>
      </div>
      <div className='instruction-box'>
        <h5>{getInstructionMessage()}</h5>
      </div>
    </div>
  );
}

export default App;
