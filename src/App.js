import logo from './logo.svg';
import './App.css';
import Game from './Game.js';

function Board(props) {
  function buildCell(val, row, col){
    if(val == 2){
      return (<div key={col} className='cell' style={{ width: 20, height: 20, display: 'inline-block', backgroundColor: 'grey' }}> </div>)
    }
    if (val == 1){
      return (<div key={col} className='cell' style={{ width: 20, height: 20, display: 'inline-block', backgroundColor: 'black' }}> </div>)
    }
    if(val == 0){
      return (<div key={col} className='cell' style={{ width: 20, height: 20, display: 'inline-block', backgroundColor: 'white' }}> </div>)
    }
  }
  let rows = [0, 1, 2, 3, 4, 5, 6]
  let board = rows.map((row) => {
    return (
      <div key={row} className="row">
        {
          rows.map( (col) => {
            return buildCell(props.game.board[row][col])
          })
        }
      </div>)
  })

  return (<div>{board}</div>)
}


function App() {
  var game = new Game();
  const reset = () => {
    game = new Game();
  }
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div key="top" className="GameHeader">
        <div className="MarblesRemaining">
          <p>{game.remainingMarbles} Marbles Left</p>
        </div>
        <div className="reset" onClick={reset}>
          <button className="btn btn-info">Reset</button>
        </div>
      </div>
      <div className="board">
        <Board game={game}></Board>
      </div>
    </div>
  );
}

export default App;
