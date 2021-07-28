import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Cell(props) {
  return (
    <button 
      className='square'
      onClick={props.onClick}
    >
      {props.col}
      {props.row}
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [],
    } 
  }

  renderCells(key) {
    return <Cell key={key}/>
  }

  renderRow(length, key) {
    let newRow = []
    for (let i  = 0; i < length; i++) {
      newRow.push(this.renderCells(i.toString()))
    }

    return (
      <div className='board-row' key={key}>
        {newRow}
      </div>
    )
  }

  renderBoard(width, height) {
    let gameBoard = []
    for (let i  = 0; i < height; i++) {
      gameBoard.push(this.renderRow(width, i.toString()))
    }

    return gameBoard
  }

  render() {
    let gameBoard = this.renderBoard(8,8)
    console.log(gameBoard)
    return(
      <div className='game-board'>
        {gameBoard}
      </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return(
      <div className='game'>
        <Board />
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)