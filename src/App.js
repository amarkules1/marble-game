import logo from './logo.svg';
import './App.css';
import Game from './Game.js';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const UNDO_ENABLED = false;


function App() {
  const [game, setGame] = React.useState(new Game());
  const [selectedMarble, setSelectedMarble] = React.useState([]);
  const [displayHowTo, setDisplayHowTo] = React.useState(false);
  const [isGameOver, setIsGameOver] = React.useState(false);

  function isSelected(position) {
    if (selectedMarble !== []) {
      if (position[0] === selectedMarble[0]) {

        if (position[1] === selectedMarble[1]) {
          return true;
        }
      }
    }
    return false
  }

  function buildCell(val, row, col) {
    if (val === -1) {
      return (<div key={col}
        className='cell cell-ob'
      > </div>)
    }
    if (val > 0) {
      return (<div key={col}
        className={'cell cell-marble-' + (game.board[row][col] % 9 + 1) + (isSelected([row, col]) ? ' cell-selected' : '')}
        onClick={e => clickMarble(row, col)}
        isdisabled={game.getMovesForPosition([row, col]) == [] ? "true" : "false"}> </div>)
    }
    if (val === 0) {
      return (<div key={col}
        className='cell cell-empty'
        onClick={e => moveMarbleTo(row, col)}>  </div>)
    }
  }

  function clickMarble(row, col) {
    if (game.remainingMarbles === 37) {
      game.removeMarble(row, col)
      setSelectedMarble([])
    }
    else if (game.getMovesForPosition([row, col]) !== []) {
      setSelectedMarble([row, col])
    }
  }

  function moveMarbleTo(row, col) {
    console.log("move to " + row + "," + col)
    game.moveMarble(selectedMarble, [row, col])
    setSelectedMarble([])
    setGame(game)
  }

  function getInstructionMessage() {
    if (game.remainingMarbles == 37) {
      return "Select the first marble to remove."
    } else if (selectedMarble.length == 0) {
      if (game.isAnyPossibleMoves()) {
        return "Select a marble to move."
      }
      return "Game over with " + game.remainingMarbles + " marbles left."
    } else {
      if (game.getMovesForPosition(selectedMarble).length > 0)
        return "Select a position to move the marble to."
      else {
        return "No possible moves for the selected marble."
      }
    }
  }

  let rows = [0, 1, 2, 3, 4, 5, 6]
  let board = rows.map((row) => {
    return (
      <div key={row} className="board-row">
        {
          rows.map((col) => {
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
    if (game.moves.length > 0) {
      game.undoLastMove()
    } else {
      setGame(new Game())
    }
    setSelectedMarble([])
  }

  const toggleHowTo = () => {
    setDisplayHowTo(!displayHowTo);
  }

  return (
    <div className="App">
      <div key="top" className="GameHeader">
        <div className="topRow">
          {UNDO_ENABLED ? <div className="undo" onClick={undo}>
            <button className="btn btn-info">Undo</button>
          </div> : null}
          <div className="help" onClick={toggleHowTo}>
            <FontAwesomeIcon icon={solid('question')} size="xl" />
          </div>
          <div className="reset" onClick={reset}>
            <FontAwesomeIcon icon={solid('arrow-rotate-left')} size="xl" />
          </div>
        </div>
        <br />
        <div className="MarblesRemaining">
          <p>{game.remainingMarbles} Marbles Left</p>
        </div>

      </div>
      <br />
      <div className="board-container">
        <div className="board">{board}</div>
      </div>
      <div className='instruction-box'>
        <h5>{getInstructionMessage()}</h5>
      </div>
      {displayHowTo ? <div className='popup'>
        <div className='popup-header'>
        <div className="popup-close" onClick={toggleHowTo}>
        <FontAwesomeIcon icon={regular('circle-xmark')} size="xl" />
        </div>
        <br/>
        <h4>How to play</h4>

        
        </div>
        <div className='instructions'>
          <ol>
            <li>The goal of the game is to remove all but the last marble from the board.</li>
            <li>To start, select a marble to remove. You can pick any marble on the board, but some choices are better than others.</li>
            <li>Remove a marble by jumping over it with the marble next to it. The jumper must have an open space to jump to.</li>
            <li>The game ends when there are no more possible moves. Remove as many marbles as you can without running out of moves.</li>
          </ol>
        </div>

      </div> : null}
      
    </div>
  );
}

export default App;
