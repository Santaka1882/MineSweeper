import React from 'react';

export default class Cell extends React.Component {
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
    const {value, onClick, cMenu} = this.props
    let className = 
    'cell' + 
    (value.isRevealed ? '' : ' hidden') +
    (value.isMine ? ' isMine' : '') +
    (value.isFlagged ? ' isFlag' : '')

    return (
      <div 
        className = {className}
        onClick = {onClick}
        onContextMenu = {cMenu}
      >
        <span>{this.getValue()}</span>
      </div>
    )
  }
}