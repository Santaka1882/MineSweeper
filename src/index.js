import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

// This cell component returns a button that represents
// one cell in the game

function HiddenCell(props) {
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

function BombCell(props) {
  return(
    <button 
      className='square'
      onClick={props.onClick}
    >
      {props.col}
      {props.row}
    </button>
  )
}

function FlagCell(props) {
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

function NumberCell(props) {
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

function EmptyCell(props) {
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

class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHidden: true,
      isBomb: false,
      isFlag: false,
      isNumber: false,
      isEmpty: false
    }
  }
  render () {
    let cell;
    if(this.state.isHidden) {
      cell = <HiddenCell/>
    } 

    if(this.state.isBomb) {
      cell = <BombCell/>
    }
    
    if(this.state.isFlag) {
      cell = <FlagCell/>
    }

    if(this.state.isNumber) {
      cell = <NumberCell/>
    }

    if(this.state.isEmpty) {
      cell = <EmptyCell/>
    }

    return (
      cell
    )
  }
}

//The board component render the entire gameboard

class Board extends React.Component {
  render() {
    return(
      <div className='game-board'>
        {this.props.gameBoard}
      </div>
    )
  }
}

function Button(props) {
  return(
    <button onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.renderBoard = this.renderBoard.bind(this)
    this.state = {
      gameBoard: [],
      showButton: true,
      height: 8,
      width: 8
    }
  }

  renderCells(key) {
    return (
      <Cell 
        key={key}
      />
    )
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

  renderBoard() {
    let gameBoardData = []
    for (let i  = 0; i < this.state.height; i++) {
      gameBoardData.push(this.renderRow(this.state.width, i.toString()))
    }
    
    this.setState({
      gameBoard: gameBoardData,
      showButton: false
    })

    return gameBoardData
  }

  render() {
    return(
      <div className='game'>
        <Board 
          gameBoard = {this.state.gameBoard}
          width={this.state.width}
          height={this.state.height}
        />
        {this.state.showButton ?
          <Button 
            show={this.state.showButton}
            value='Iniciar juego' 
            onClick={this.renderBoard}
          /> 
          : null}
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)

// function randomNumber(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }