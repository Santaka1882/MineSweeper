(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(2),i=a(3),s=a(5),r=a(4),u=a(1),o=a.n(u),h=a(7),l=a.n(h),c=a(0),d=function(e){Object(s.a)(a,e);var t=Object(r.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"getValue",value:function(){var e=this.props.value;return e.isRevealed?e.isMine?"\ud83d\udca3":0===e.neighbour?null:e.neighbour:this.props.value.isFlagged?"\u2757":null}},{key:"render",value:function(){var e=this.props,t=e.value,a=e.onClick,n=e.cMenu,i="cell"+(t.isRevealed?"":" hidden")+(t.isMine?" isMine":"")+(t.isFlagged?" isFlag":"");return Object(c.jsx)("div",{className:i,onClick:a,onContextMenu:n,children:this.getValue()})}}]),a}(o.a.Component),p=function(e){Object(s.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(n.a)(this,a);for(var i=arguments.length,s=new Array(i),r=0;r<i;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={boardData:e.initBoardData(e.props.height,e.props.width,e.props.mines),gameStatus:"Game in progress",mineCount:e.props.mines},e}return Object(i.a)(a,[{key:"getMines",value:function(e){var t=[];return e.map((function(e){e.map((function(e){e.isMine&&t.push(e)}))})),t}},{key:"getFlags",value:function(e){var t=[];return e.map((function(e){e.map((function(e){e.isFlagged&&t.push(e)}))})),t}},{key:"getHidden",value:function(e){var t=[];return e.map((function(e){e.map((function(e){e.isRevealed||t.push(e)}))})),t}},{key:"getRandomNumber",value:function(e){return Math.floor(1e3*Math.random()+1)%e}},{key:"initBoardData",value:function(e,t,a){var n=this.createEmptyArray(e,t);return n=this.plantMines(n,e,t,a),n=this.getNeighbours(n,e,t)}},{key:"createEmptyArray",value:function(e,t){for(var a=[],n=0;n<e;n++){a.push([]);for(var i=0;i<t;i++)a[n][i]={x:n,y:i,isMine:!1,neighbour:0,isRevealed:!1,isEmpty:!1,isFlagged:!1}}return a}},{key:"plantMines",value:function(e,t,a,n){for(var i,s,r=0;r<n;)i=this.getRandomNumber(a),s=this.getRandomNumber(t),e[i][s].isMine||(e[i][s].isMine=!0,r++);return e}},{key:"getNeighbours",value:function(e,t,a){for(var n=this,i=e,s=0;s<t;s++)for(var r=0;r<a;r++)!0!==e[s][r].isMine&&function(){var t=0;n.traverseBoard(e[s][r].x,e[s][r].y,e).map((function(e){e.isMine&&t++})),0===t&&(i[s][r].isEmpty=!0),i[s][r].neighbour=t}();return i}},{key:"traverseBoard",value:function(e,t,a){var n=[];return e>0&&n.push(a[e-1][t]),e<this.props.height-1&&n.push(a[e+1][t]),t>0&&n.push(a[e][t-1]),t<this.props.width-1&&n.push(a[e][t+1]),e>0&&t>0&&n.push(a[e-1][t-1]),e>0&&t<this.props.width-1&&n.push(a[e-1][t+1]),e<this.props.height-1&&t<this.props.width-1&&n.push(a[e+1][t+1]),e<this.props.height-1&&t>0&&n.push(a[e+1][t-1]),n}},{key:"revealBoard",value:function(){var e=this.state.boardData;e.map((function(e){e.map((function(e){e.isRevealed=!0}))})),this.setState({boardData:e})}},{key:"revealEmpty",value:function(e,t,a){var n=this;return this.traverseBoard(e,t,a).map((function(e){e.isFlagged||e.isRevealed||!e.isEmpty&&e.isMine||(a[e.x][e.y].isRevealed=!0,e.isEmpty&&n.revealEmpty(e.x,e.y,a))})),a}},{key:"handleCellClick",value:function(e,t){if(this.state.boardData[e][t].isRevealed||this.state.boardData[e][t].isFlagged)return null;this.state.boardData[e][t].isMine&&(this.setState({gameStatus:"You Lost."}),this.revealBoard());var a=this.state.boardData;a[e][t].isFlagged=!1,a[e][t].isRevealed=!0,a[e][t].isEmpty&&(a=this.revealEmpty(e,t,a)),this.getHidden(a).length===this.props.mines&&(this.setState({mineCount:0,gameStatus:"You Win."}),this.revealBoard()),this.setState({boardData:a,mineCount:this.props.mines-this.getFlags(a).length})}},{key:"handleContextMenu",value:function(e,t,a){e.preventDefault();var n=this.state.boardData,i=this.state.mineCount;if(!n[t][a].isRevealed){if(n[t][a].isFlagged?(n[t][a].isFlagged=!1,i++):(n[t][a].isFlagged=!0,i--),0===i){var s=this.getMines(n),r=this.getFlags(n);JSON.stringify(s)===JSON.stringify(r)&&(this.setState({mineCount:0,gameStatus:"You Win."}),this.revealBoard())}this.setState({boardData:n,mineCount:i})}}},{key:"renderBoard",value:function(e){var t=this;return e.map((function(e){return e.map((function(a){return Object(c.jsxs)("div",{children:[Object(c.jsx)(d,{onClick:function(){return t.handleCellClick(a.x,a.y)},cMenu:function(e){return t.handleContextMenu(e,a.x,a.y)},value:a}),e[e.length-1]===a?Object(c.jsx)("div",{className:"clear"}):""]},a.x*e.length+a.y)}))}))}},{key:"render",value:function(){return Object(c.jsxs)("div",{className:"board",children:[Object(c.jsxs)("div",{className:"game-info",children:[Object(c.jsxs)("span",{className:"info",children:["Mines remaining: ",this.state.mineCount]}),Object(c.jsx)("h1",{className:"info",children:this.state.gameStatus})]}),this.renderBoard(this.state.boardData)]})}}]),a}(o.a.Component),v=(a(13),function(e){Object(s.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(n.a)(this,a);for(var i=arguments.length,s=new Array(i),r=0;r<i;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={height:8,width:8,mines:10},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this.state,t=e.height,a=e.width,n=e.mines;return Object(c.jsx)("div",{className:"game",children:Object(c.jsx)(p,{height:t,width:a,mines:n})})}}]),a}(o.a.Component));l.a.render(Object(c.jsx)(v,{}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.5e0bd14a.chunk.js.map