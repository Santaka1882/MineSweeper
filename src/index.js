import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Cell extends React.Component {
  getValue() {
    const {value} = this.props

    if(!value.isRevealed) {
      return this.props.value.isFlagged ? "❗" : null
    }
    if(value.isMine) {
      return "💣"
    }
    if (value.neighbour === 0) {
      return null
    }
    return value.neighbour
  }

  render () {
    const {onClick, cMenu} = this.props
    return (
      <div 
        className='cell'
        onClick = {onClick}
        onContextMenu = {cMenu}
      >
        {this.getValue()}
      </div>
    )
  }
}
//The board component render the entire gameboard

class Board extends React.Component {
  state = {
    boardData: this.initBoardData(this.props.height, this.props.width, this.props.mines),
    gameStatus: false,
    mineCount: this.props.mines,
    gameWon: false
  }

  createEmptyArray(heigth, width) {
    let data = []

    for(let i = 0; i < heigth; i++) {
      data.push([])
      for(let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbour: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false
        }
      }
    }
    return data
  }

  plantMines(data, height, width, mines) {
    let randomX, randomY, minesPlanted = 0

    while(minesPlanted < mines) {
      randomX = this.getRandomNumber(width)
      randomY = this.getRandomNumber(height)

      if(!(data[randomX][randomY].isMine)) {
        data[randomX][randomY].isMine = true
        minesPlanted++
      }
    }
    return data
  }

  getNeighbours(data, height, width) {
    let updatedData = data

    for(let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i][j].isMine === false) {
          let mine = 0
          let area = this.traverseBoard(data[i][j].y, data[i][j].x, data)
          area.forEach(value => {
            if(value.isMine) {
              mine += 1
            }
          })
          if(mine === 0) {
            updatedData[i][j].isEmpty = true
          }
          updatedData[i][j].neighbour = mine
        }
      }
    }
    return updatedData
  }

  traverseBoard(y, x, data) {
    const el = []

    //ux
    if(y > 0) {
      el.push(data[x][y - 1])
    }

    //down
    if(y < this.props.height - 1) {
      el.push(data[x][y + 1])
    }

    //left
    if(x > 0) {
      el.push(data[x - 1][y])
    }

    //rigth
    if(x < this.props.width - 1) {
      el.push(data[x + 1][y])
    }

    //top left
    if(y > 0 && x > 0) {
      el.push(data[x - 1][y - 1])
    }

    //top rigth
    if(y > 0 && x < this.props.width - 1) {
      el.push(data[x + 1][y - 1])
    }

    //botton right
    if(y < this.props.height - 1 && x < this.props.width - 1) {
      el.push(data[x + 1][y + 1])
    }

    //bottom left
    if(y < this.props.height - 1 && x > 0) {
      el.push(data[x - 1][y + 1])
    }

    return el
  }

  initBoardData(height, width, mines) {
    let data = this.createEmptyArray(height, width)
    data = this.plantMines(data, height, width, mines)
    data = this.getNeighbours(data, height, width)

    return data
  }

  renderBoard(data) {
    return data.map((datarow) => {
      return datarow.map((dataitem) => {
        return (
          <div
            key={dataitem.x * datarow.length + dataitem.y}>
            <Cell
              onClick={() => this.handleCellClick(dataitem.x, dataitem.y)}
              cMenu={() => this.handleContextMenu(dataitem.x, dataitem.y)}
              value={dataitem}
            />

            {(datarow[datarow.length - 1] === dataitem ? <div className='clear'></div> : "")}

          </div>
        )
      })
    })
  }

  handleCellClick(x, y) {
    if(this.state.boardData[x][y].isRevealed || this.state.boardData[x][y].isFlagged) return

    if(this.state.boardData[x][y].isMine) {
      this.setState({gameStatus: 'You lost :('})
      this.revealBoard()
    }

    let updatedData = this.state.boardData

    if(updatedData[y][x].isEmpty) {
      updatedData = this.revealEmpty(x, y, updatedData)
    }

    if(updatedData[x][y].isRevealed === false) {
      updatedData[x][y].isRevealed = true
    }

    if(this.getHidden(updatedData).length === this.props.mines) {
      this.setState({gameStatus: 'You Win :D'})
      this.revealBoard()
    }

    this.setState({
      boardData: updatedData,
      mineCount: this.props.mines - this.getFlags(updatedData).length,
    })
  }

  revealEmpty(x, y, data) {
    let area = this.traverseBoard(y, x, data)
    area.forEach(value =>{
      if(value.isFlagged === false && value.isRevealed === false && (value.isEmpty === true || value.isMine === false)) {
        data[value.x][value.y].isRevealed = true
        if(value.isEmpty) {
          this.revealEmpty(value.x, value.y, data)
        }
      }
    })
    return data
  }

  handleContextMenu(x, y) {
    window.oncontextmenu = (e) => {
      e.preventDefault()
    }

    let updatedData = this.state.boardData
    let mines = this.state.mineCount

    if(updatedData[x][y].isRevealed) return

    if(updatedData[x][y].isFlagged) {
      updatedData[x][y].isFlagged = false
      mines++
    } else {
      updatedData[x][y].isFlagged = true
      mines--
    }

    if(mines === 0) {
      const MineArray = this.getMines(updatedData)
      const FlagArray = this.getFlags(updatedData)

      if(JSON.stringify(MineArray) === JSON.stringify(FlagArray)) {
        this.revealBoard()
      }
    }

    this.setState({
      boardData: updatedData,
      mineCount: mines,
      gameStatus: 'You Win :D',
      gameWon: true
    })
  }

  revealBoard() {
    let updatedData = this.state.boardData

    updatedData.forEach(datarow => {
      datarow.forEach(dataitem => {
        dataitem.isRevealed = true
      })
    })
    this.setState({
      boardData: updatedData
    })
  }
  
  getHidden(data) {
    let hiddenArray = []

    data.forEach(datarow => {
      datarow.forEach(dataitem => {
        if(dataitem.isRevealed === true) {
          hiddenArray.push(dataitem)
        }
      })
    })

    return hiddenArray
  }

  getFlags(data) {
    let flagArray = []

    data.forEach(datarow => {
      datarow.forEach(dataitem => {
        if(dataitem.isFlagged === true) {
          flagArray.push(dataitem)
        }
      })
    })

    return flagArray
  }

  getMines(data) {
    let mineArray = []

    data.forEach(datarow => {
      datarow.forEach(dataitem => {
        if(dataitem.isMine === true) {
          mineArray.push(dataitem)
        }
      })
    })

    return mineArray
  }

  getRandomNumber(dimension) {
    return Math.floor((Math.random() * 1000) + 1) % dimension;
  }

  render() {
    return(
      <div className='board'>
        <div className='game-info'>
          <span className='info'>
            mines: {this.state.mineCount}
          </span>
          <br/>
          <span className='info'>
            {this.state.gameStatus}
          </span>
        </div>
        {this.renderBoard(this.state.boardData)}
      </div>
    )
  }
}

class Game extends React.Component {
  state = {
      height: 8,
      width: 8,
      mines: 10
    }

  render() {
    const { height, width, mines } = this.state;
    return(
      <div className="game">
        <Board height={height} width={width} mines={mines} />
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)