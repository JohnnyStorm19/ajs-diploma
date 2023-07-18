!function(){"use strict";function e(e,t){const a=t**2;if(0===e)return"top-left";if(e===t-1)return"top-right";if(e===a-1)return"bottom-right";if(e===a-t)return"bottom-left";const s=Math.ceil(e/t);return Number.isInteger(e/t)?"left":Number.isInteger((e+1)/t)?"right":1===s?"top":s===t?"bottom":"center"}class t{constructor(){this.boardSize=8,this.container=null,this.boardEl=null,this.cells=[],this.cellClickListeners=[],this.cellEnterListeners=[],this.cellLeaveListeners=[],this.newGameListeners=[],this.saveGameListeners=[],this.loadGameListeners=[]}bindToDOM(e){if(!(e instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=e}drawUi(t){this.checkBinding(),this.container.innerHTML='\n      <div class="controls">\n        <button data-id="action-restart" class="btn">New Game</button>\n        <button data-id="action-save" class="btn">Save Game</button>\n        <button data-id="action-load" class="btn">Load Game</button>\n      </div>\n      <div class="board-container">\n        <div data-id="board" class="board"></div>\n      </div>\n      <div class="console"></div>\n    ',this.newGameEl=this.container.querySelector("[data-id=action-restart]"),this.saveGameEl=this.container.querySelector("[data-id=action-save]"),this.loadGameEl=this.container.querySelector("[data-id=action-load]"),this.newGameEl.addEventListener("click",(e=>this.onNewGameClick(e))),this.saveGameEl.addEventListener("click",(e=>this.onSaveGameClick(e))),this.loadGameEl.addEventListener("click",(e=>this.onLoadGameClick(e))),this.newGameEl.addEventListener("mouseenter",(()=>this.onEnterControllerBtn(this.newGameEl))),this.saveGameEl.addEventListener("mouseenter",(()=>this.onEnterControllerBtn(this.saveGameEl))),this.loadGameEl.addEventListener("mouseenter",(()=>this.onEnterControllerBtn(this.loadGameEl))),this.boardEl=this.container.querySelector("[data-id=board]"),this.boardEl.classList.add(t);for(let t=0;t<this.boardSize**2;t+=1){const a=document.createElement("div");a.classList.add("cell","map-tile",`map-tile-${e(t,this.boardSize)}`),a.addEventListener("mouseenter",(e=>this.onCellEnter(e))),a.addEventListener("mouseleave",(e=>this.onCellLeave(e))),a.addEventListener("click",(e=>this.onCellClick(e))),this.boardEl.appendChild(a)}this.cells=Array.from(this.boardEl.children)}onEnterControllerBtn(e){e.style.cursor="pointer"}redrawPositions(e){for(const e of this.cells)e.innerHTML="";for(const a of e){const e=this.boardEl.children[a.position],s=document.createElement("div");s.classList.add("character",a.character.type);const i=document.createElement("div");i.classList.add("health-level");const r=document.createElement("div");r.classList.add("health-level-indicator","health-level-indicator-"+((t=a.character.health)<15?"critical":t<50?"normal":"high")),r.style.width=`${a.character.health}%`,i.appendChild(r),s.appendChild(i),e.appendChild(s)}var t}addCellEnterListener(e){this.cellEnterListeners.push(e)}addCellLeaveListener(e){this.cellLeaveListeners.push(e)}addCellClickListener(e){this.cellClickListeners.push(e)}addNewGameListener(e){this.newGameListeners.push(e)}addSaveGameListener(e){this.saveGameListeners.push(e)}addLoadGameListener(e){this.loadGameListeners.push(e)}onCellEnter(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellEnterListeners.forEach((e=>e.call(null,t)))}onCellLeave(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellLeaveListeners.forEach((e=>e.call(null,t)))}onCellClick(e){const t=this.cells.indexOf(e.currentTarget);this.cellClickListeners.forEach((e=>e.call(null,t)))}onNewGameClick(e){e.preventDefault(),this.newGameListeners.forEach((e=>e.call(null)))}onSaveGameClick(e){e.preventDefault(),this.saveGameListeners.forEach((e=>e.call(null)))}onLoadGameClick(e){e.preventDefault(),this.loadGameListeners.forEach((e=>e.call(null)))}static showError(e){alert(e)}static showMessage(e){alert(e)}selectCell(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yellow";this.deselectCell(e),this.cells[e].classList.add("selected",`selected-${t}`)}deselectCell(e){const t=this.cells[e];t.classList.remove(...Array.from(t.classList).filter((e=>e.startsWith("selected"))))}showCellTooltip(e,t){this.cells[t].title=e}hideCellTooltip(e){this.cells[e].title=""}showDamage(e,t){return new Promise((a=>{const s=this.cells[e],i=document.createElement("span");i.textContent=t,i.classList.add("damage"),s.appendChild(i),i.addEventListener("animationend",(()=>{s.removeChild(i),a()}))}))}setCursor(e){this.boardEl.style.cursor=e}checkBinding(){if(null===this.container)throw new Error("GamePlay not bind to DOM")}}var a="prairie",s="desert",i="arctic",r="mountain";class o{constructor(){this.selected={isSelected:!1,position:null,charType:null,charTeam:null},this.team={playerTypes:["magician","swordsman","bowman"],botTypes:["undead","vampire","daemon"],playerTeam:null,botTeam:null},this.currentLevel=1,this.currentPlayer="player",this.levels={1:a,2:s,3:i,4:r},this.mouseEnter={attack:null,move:null},this.maxLevelChar=2,this.maxCharsCount=2,this.allowedSteps={swordsman:4,undead:4,bowman:2,vampire:2,magician:1,daemon:1},this.allowedForAttack={swordsman:1,undead:1,bowman:2,vampire:2,magician:4,daemon:4},this.borders={left:[],right:[]}}isUserCharacter(e){return this.team.playerTypes.includes(e.type)}selectChar(e,t,a,s,i){t.selected.isSelected&&e.deselectCell(t.selected.position),e.selectCell(a),t.selected={isSelected:!0,position:a,charType:s,charTeam:i}}}class l{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"generic";if("Character"===new.target.name)throw new Error("Base class cannot be the instance");this.level=e,this.attack=0,this.defence=0,this.health=100,this._type=t}levelUp(){const e=Math.max(this.attack,this.attack*(80+this.health)/100),t=Math.max(this.defence,this.defence*(80+this.health)/100);this.attack=Math.round(e),this.defence=Math.round(t),100!==this.health&&(this.health+=80),this.health>100&&(this.health=100),this.level+=1}}class n{constructor(e,t){if(!(e instanceof l))throw new Error("character must be instance of Character or its children");if("number"!=typeof t)throw new Error("position must be a number");this.character=e,this.position=t}}function*h(e,t){const a=Math.floor(Math.random()*e.length),s=Math.floor(Math.random()*t)+1,i=new e[a](1);let r=s-1;for(;r>0;)i.levelUp(),console.log("level up!"),r-=1;yield i}function c(e){const{boardSize:a}=new t,s=[];for(let t="player"===e?0:a-2;t<a**2;t+=a)s.push(t,t+1);return s[Math.floor(Math.random()*s.length)]}function m(e,t,a,s){const i=function(e,t,a){const s=[];for(let i=0;i<a;i+=1)s.push(h(e,t).next().value);return s}(t,a,s),r=[],o=[];return i.forEach(((t,a)=>{let s=c(e);const i=r.includes(s);for(;i;)s=c(e);r.push(s),o.push(new n(t,r[a]))})),o}var d="auto",u="pointer",p="crosshair",g="not-allowed";function f(e,t,a,s,i,r){const{boardSize:o}=e,l=function(e,t){const a=[],s=[];return e.forEach((e=>a.push(e.position))),t.forEach((e=>s.push(e.position))),[...a,...s]}(t.team.botTeam,t.team.playerTeam),n=[],h=o**2-1;let c=s;const m={up:a,down:a,left:a,right:a,leftUpDiagonal:a,rightUpDiagonal:a,leftDownDiagonal:a,rightDownDiagonal:a};for(;c>0;)m.up-=o,m.up>=0&&!l.includes(m.up)&&n.push(m.up),m.down+=o,m.down<=h&&!l.includes(m.down)&&n.push(m.down),i.includes(m.left)||(m.left-=1,m.left>=0&&!l.includes(m.left)&&n.push(m.left)),r.includes(m.right)||(m.right+=1,m.right<=h&&!l.includes(m.right)&&n.push(m.right)),i.includes(m.leftUpDiagonal)||(m.leftUpDiagonal-=o+1,m.leftUpDiagonal>=0&&!l.includes(m.leftUpDiagonal)&&n.push(m.leftUpDiagonal)),r.includes(m.rightUpDiagonal)||(m.rightUpDiagonal-=o-1,m.rightUpDiagonal>=0&&!l.includes(m.rightUpDiagonal)&&n.push(m.rightUpDiagonal)),i.includes(m.leftDownDiagonal)||(m.leftDownDiagonal+=o-1,m.leftDownDiagonal<=h&&!l.includes(m.leftDownDiagonal)&&n.push(m.leftDownDiagonal)),r.includes(m.rightDownDiagonal)||(m.rightDownDiagonal+=o+1,m.rightDownDiagonal<=h&&!l.includes(m.rightDownDiagonal)&&n.push(m.rightDownDiagonal)),c-=1;return n}function y(e,t,a){const{boardSize:s}=e,i=[],r=s**2-1,o=t%s;let l=o-a,n=o+a;l<0&&(l=0),n>s-1&&(n=s-1);let h=t-a-s*a;h<=0&&(h=0);let c=t+a+s*a;c>=r&&(c=r);for(let e=h;e<=c;e+=1)e%s>=l&&e%s<=n&&e!==t&&i.push(e);return i}function v(e){e.team.botTeam=[],e.team.playerTeam=[],e.selected={isSelected:!1,position:null,charType:null,charTeam:null},e.currentLevel=1,e.mouseEnter={attack:null,move:null},e.maxLevelChar=2,e.borders={left:[],right:[]}}function w(e,a,s){0===e.team.playerTeam.length&&function(e){e.currentPlayer="bot",t.showMessage("Персонажи игрока повержены!"),t.showMessage("Если хотите испытать себя вновь начните новую игру (New Game)")}(e),null!=e.mouseEnter.move&&s.deselectCell(e.mouseEnter.move),e.selected={isSelected:!1,position:null,charType:null,charTeam:null},"bot"===e.currentPlayer&&setTimeout((()=>{a.botAction(e.team.botTeam)}),3e3)}function C(e,a){const{botTeam:s}=e.team,{playerTeam:i}=e.team;i.forEach(((e,t)=>{e.character.health<=0&&i.splice(t,1)})),s.forEach(((e,t)=>{e.character.health<=0&&s.splice(t,1)})),s.length||(4===e.currentLevel&&(t.showMessage("Победа!"),function(e){e.currentPlayer="bot",t.showMessage("Вражеские герои повержены!"),v(e),window.location.reload()}(e)),e.currentLevel+=1,e.maxLevelChar+=1,a.render(e.levels[e.currentLevel],e.maxLevelChar,e.maxCharsCount,a.playerAllowedChars,a.botAllowedChars),e.team.playerTeam.forEach((e=>{e.character.levelUp()})))}function b(e,a,s,i,r,o){const l=Math.floor(Math.random()*o.length),n=o[l].cellForAction,h=i.find((e=>e.position===n)),c=r.find((e=>e.position===o[l].currentCell)),m=Math.max(c.character.attack-h.character.defence,.1*c.character.attack);a.showDamage(h.position,m).then((()=>{e.team.playerTeam.forEach((t=>{t.position===h.position&&(t.character.health-=m,Number(t.character.health.toFixed(1)),C(e,s))})),a.redrawPositions([...e.team.playerTeam,...e.team.botTeam]),e.currentPlayer="player",t.showMessage("Ход игрока"),w(e,s,a)}))}function E(e,t,a,s,i,r){const o=r[0].cellForAction,l=s.find((e=>e.position===o)),n=i.find((e=>e.position===r[0].currentCell)),h=Math.max(n.character.attack-l.character.defence,.1*n.character.attack);t.showDamage(l.position,h).then((()=>{e.team.playerTeam.forEach((t=>{t.position===l.position&&(t.character.health-=h,Number(t.character.health.toFixed(1)),C(e,a))})),t.redrawPositions([...e.team.playerTeam,...e.team.botTeam]),e.currentPlayer="player",w(e,a,t)}))}function T(e,t,a,s){let i,r=1/0,o=1/0;for(let l=0;l<e.moveCells.length;l+=1){const n=e.moveCells[l],h=n%a.boardSize,c=Math.floor(n/a.boardSize);for(let a=0;a<t.length;a+=1){const l=t[a].character.axisHorizontal,m=t[a].character.axisVertical,{type:d}=e,u=s.allowedForAttack[d];let p=Math.abs(h-l)-u;p<0&&(p=0);let g=Math.abs(c-m)-u;g<0&&(g=0),p<=r&&g<=o&&(r=p,o=g,i=n),(p>r||g>o)&&p+g<=r+o&&(r=p,o=g,i=n)}}return i}function P(e,t,a,s,i){const r=Math.floor(Math.random()*i.length),o=i[r].cellForAction,l=s.find((e=>e.position===i[r].currentCell));e.team.botTeam.forEach((e=>{e.position===l.position&&(e.position=o)})),t.redrawPositions([...e.team.playerTeam,...e.team.botTeam]),e.currentPlayer="player",w(e,a,t)}function L(e,t,a,s,i){const r=i[0].cellForAction,o=s.find((e=>e.position===i[0].currentCell));e.team.botTeam.forEach((e=>{e.position===o.position&&(e.position=r)})),t.redrawPositions([...e.team.playerTeam,...e.team.botTeam]),e.currentPlayer="player",w(e,a,t)}class k{constructor(e,t,a,s,i,r,o){this.playerTeam=e,this.playerPositions=[],this.botPositions=[],this.botTeam=t,this.leftBorder=a,this.rightBorder=s,this.state=i,this.gamePlay=r,this.gameController=o,this.arrOfAttackers=[],this.arrOfMovers=[]}calculatePositions(){this.playerTeam.forEach((e=>{this.playerPositions.push(e.position)})),this.botTeam.forEach((e=>{const t=this.state.allowedSteps[e.character.type],a=this.state.allowedForAttack[e.character.type];e.character.moveCells=f(this.gamePlay,this.state,e.position,t,this.leftBorder,this.rightBorder),e.character.attackCells=y(this.gamePlay,e.position,a),e.character.info=[],this.gamePlay.deselectCell(e.position),this.botPositions.push(e.position)}))}addPositionsToProps(){this.playerPositions.forEach((e=>{const t=this.playerTeam.find((t=>t.position===e));t.character.axisHorizontal=e%this.gamePlay.boardSize,t.character.axisVertical=Math.floor(e/this.gamePlay.boardSize);for(let t=0;t<this.botTeam.length;t+=1){const a={action:null,cellForAction:null};this.botTeam[t].character.axisHorizontal=this.botTeam[t].position%this.gamePlay.boardSize,this.botTeam[t].character.axisVertical=Math.floor(this.botTeam[t].position/this.gamePlay.boardSize),this.botTeam[t].character.attackCells.includes(e)&&(a.action="attack",a.cellForAction=e,a.currentCell=this.botTeam[t].position,a.currentType=this.botTeam[t].character.type),this.botTeam[t].character.attackCells.includes(e)||(a.action="move",a.currentCell=this.botTeam[t].position,a.currentType=this.botTeam[t].character.type,a.cellForAction=T(this.botTeam[t].character,this.playerTeam,this.gamePlay,this.state)),this.botTeam[t].character.info.push(a)}}))}checkForAttack(){const e=[];return this.botTeam.forEach((t=>{const a=t.character.info.find((e=>"attack"===e.action));a&&e.push(a)})),e.forEach((e=>this.arrOfAttackers.push(e))),!!this.arrOfAttackers.length}checkForMove(){const e=[];return this.botTeam.forEach((t=>{const a=t.character.info.find((e=>"move"===e.action));a&&e.push(a)})),e.forEach((e=>this.arrOfMovers.push(e))),!!this.arrOfMovers.length}attack(){const e=this.arrOfAttackers.filter((e=>"undead"===e.currentType)),t=this.arrOfAttackers.filter((e=>"vampire"===e.currentType)),a=this.arrOfAttackers.filter((e=>"daemon"===e.currentType));console.log("АТАКА!!!"),console.log("Те, кто атакуют: ",this.arrOfAttackers),console.log(e,t,a),e.length>1&&b(this.state,this.gamePlay,this.gameController,this.playerTeam,this.botTeam,e),1!==e.length?(t.length>1&&b(this.state,this.gamePlay,this.gameController,this.playerTeam,this.botTeam,t),1===t.length&&E(this.state,this.gamePlay,this.gameController,this.playerTeam,this.botTeam,t),a.length>1&&b(this.state,this.gamePlay,this.gameController,this.playerTeam,this.botTeam,a),1===a.length&&E(this.state,this.gamePlay,this.gameController,this.playerTeam,this.botTeam,a)):E(this.state,this.gamePlay,this.gameController,this.playerTeam,this.botTeam,e)}move(){const e=this.arrOfMovers.filter((e=>"undead"===e.currentType)),t=this.arrOfMovers.filter((e=>"vampire"===e.currentType)),a=this.arrOfMovers.filter((e=>"daemon"===e.currentType));console.log("ХОДИМ!!!"),console.log("Те, кто ходят: ",this.arrOfMovers),console.log(e,t,a),1!==e.length?(e.length>1&&P(this.state,this.gamePlay,this.gameController,this.botTeam,e),1!==t.length?(t.length>1&&P(this.state,this.gamePlay,this.gameController,this.botTeam,t),1!==a.length?a.length>1&&P(this.state,this.gamePlay,this.gameController,this.botTeam,a):L(this.state,this.gamePlay,this.gameController,this.botTeam,a)):L(this.state,this.gamePlay,this.gameController,this.botTeam,t)):L(this.state,this.gamePlay,this.gameController,this.botTeam,e)}}class S{constructor(e){this.storage=e}save(e){this.storage.setItem("state",JSON.stringify(e))}load(){try{return JSON.parse(this.storage.getItem("state"))}catch(e){throw new Error("Invalid state")}}}class M extends l{constructor(e,t){super(t),this.level=t,this.type=e.type,this.attack=e.attack,this.defence=e.defence,this.health=e.health,this.axisHorizontal=e.axisHorizontal,this.axisVertical=e.axisVertical}}class D extends l{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"bowman";if("bowman"!==t)throw new Error("Invalid type for bowman");super(e,t),this.attack=25,this.defence=25}get _type(){return this.type}set _type(e){if("bowman"!==e)throw new Error("Invalid type for bowman");this.type=e}}class G extends l{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"magician";if("magician"!==t)throw new Error("Invalid type for magician");super(e,t),this.attack=10,this.defence=40}get _type(){return this.type}set _type(e){if("magician"!==e)throw new Error("Invalid type for magician");this.type=e}}class A extends l{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"swordsman";if("swordsman"!==t)throw new Error("Invalid type for swordsman");super(e,t),this.attack=40,this.defence=10}get _type(){return this.type}set _type(e){if("swordsman"!==e)throw new Error("Invalid type for swordsman");this.type=e}}class x extends l{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"undead";if("undead"!==t)throw new Error("Invalid type for undead");super(e,t),this.attack=40,this.defence=10}get _type(){return this.type}set _type(e){if("undead"!==e)throw new Error("Invalid type for undead");this.type=e}}class F extends l{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"vampire";if("vampire"!==t)throw new Error("Invalid type for vampire");super(e,t),this.attack=25,this.defence=25}get _type(){return this.type}set _type(e){if("vampire"!==e)throw new Error("Invalid type for vampire");this.type=e}}class O extends l{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"daemon";if("daemon"!==t)throw new Error("Invalid type for daemon");super(e,t),this.attack=10,this.defence=10}get _type(){return this.type}set _type(e){if("daemon"!==e)throw new Error("Invalid type for daemon");this.type=e}}const U=new t;U.bindToDOM(document.querySelector("#game-container"));const z=new S(localStorage),I=new class{constructor(e,t){this.gamePlay=e,this.stateService=t,this.state=new o,this.gameStateService=new S(localStorage),this.playerAllowedChars=[D,G,A],this.botAllowedChars=[x,F,O]}init(){this.render(this.state.levels[this.state.currentLevel],this.state.maxLevelChar,this.state.maxCharsCount,this.playerAllowedChars,this.botAllowedChars),this.addListenerFuncs(),console.log(this.state)}render(e,t,a,s,i){let r=null;if(1===this.state.currentLevel)r=m("player",s,t,a);else{const e=[];r=this.state.team.playerTeam,this.state.team.playerTeam.forEach((t=>{const a=c("player");e.includes(a)||(e.push(a),t.position=a)}))}this.gamePlay.drawUi(e);const o=m("bot",i,t,a);this.state.team.playerTeam=[...r],this.state.team.botTeam=[...o],this.gamePlay.redrawPositions([...r,...o]),this.calculateFieldBorders(this.gamePlay.boardSize)}botAction(e){const t=new k(this.state.team.playerTeam,e,this.state.borders.left,this.state.borders.right,this.state,this.gamePlay,this);t.calculatePositions(),t.addPositionsToProps();const a=t.checkForAttack();a&&t.attack(),a||(t.checkForMove(),t.move())}onCellClick(e){if("player"!==this.state.currentPlayer)return;const a=this.findChar(e);if(a){const s=this.state.isUserCharacter(a);return console.log(s),s?void this.state.selectChar(this.gamePlay,this.state,e,a.type,a.team):this.state.selected.isSelected&&!s?void this.playerAttack(e):void t.showMessage("Выбран персонаж противника")}this.state.selected.isSelected?this.playerMove():t.showMessage("Выбрана пустая ячейка")}onCellEnter(e){const t=this.findChar(e);if(t){const{level:a,attack:s,defence:i,health:r}=t,o=`${String.fromCodePoint(127894)}${a} ${String.fromCodePoint(9876)}${s} ${String.fromCodePoint(128737)}${i} ${String.fromCodePoint(10084)}${r}`;this.gamePlay.showCellTooltip(o,e)}"bot"!==this.state.currentPlayer&&this.cellEnterFunc(e)}onCellLeave(e){this.gamePlay.hideCellTooltip(e),this.state.selected.isSelected||this.gamePlay.setCursor(d),null!=this.state.mouseEnter.move&&this.gamePlay.deselectCell(this.state.mouseEnter.move),null!=this.state.mouseEnter.attack&&this.gamePlay.deselectCell(this.state.mouseEnter.attack),this.state.mouseEnter.move=null,this.state.mouseEnter.attack=null}addListenerFuncs(){this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)),this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this)),this.gamePlay.addCellClickListener(this.onCellClick.bind(this)),this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this)),this.gamePlay.addSaveGameListener(this.onSaveGameClick.bind(this)),this.gamePlay.addLoadGameListener(this.onLoadGameClick.bind(this))}onNewGameClick(){localStorage.clear(),v(this.state),this.render(this.state.levels[this.state.currentLevel],this.state.maxLevelChar,this.state.maxCharsCount,this.playerAllowedChars,this.botAllowedChars)}onSaveGameClick(){t.showMessage("Данные успешно сохранены!"),localStorage.clear(),this.gameStateService.save(this.state)}onLoadGameClick(){if(!localStorage.getItem("state"))return void t.showMessage("Сохранения не найдены!");t.showMessage("Игра успешно загружена!");const e=this.gameStateService.load();console.log("before",e,this.state),e.team.playerTeam.map((e=>(e.character=new M(e.character,e.character.level),new n(e.character,e.position)))),e.team.botTeam.map((e=>(e.character=new M(e.character,e.character.level),new n(e.character,e.position)))),this.state.selected=e.selected,this.state.team=e.team,this.state.currentLevel=e.currentLevel,this.gamePlay.drawUi(this.state.levels[this.state.currentLevel]),this.gamePlay.redrawPositions([...this.state.team.playerTeam,...this.state.team.botTeam]),console.log("after",e,this.state)}findChar(e){let t;return[...this.state.team.playerTeam,...this.state.team.botTeam].forEach((a=>{a.position===e&&(this.state.team.playerTypes.includes(a.character.type)&&(a.character.team="player"),t=a.character)})),t}checkAreaForActions(e,t){const a=this.findChar(this.state.selected.position),{position:s}=this.state.selected,{type:i}=a;if("move"===e){const e=this.state.allowedSteps[i];if(f(this.gamePlay,this.state,s,e,this.state.borders.left,this.state.borders.right).includes(t))return!0}if("attack"===e){const e=this.state.allowedForAttack[i],a=y(this.gamePlay,s,e);if(a.includes(t))return!0;console.log("CELLS FOR ATTACK",a)}return!1}calculateFieldBorders(e){for(let t=0;t<e**2;t+=e)this.state.borders.left.push(t),this.state.borders.right.push(t+(e-1))}playerAttack(e){const t=this.state.mouseEnter.attack,a=this.findChar(this.state.selected.position);if(null!=t){const t=this.findChar(e),s=Math.max(a.attack-t.defence,.1*a.attack);this.gamePlay.showDamage(e,s).then((()=>{this.state.team.botTeam.forEach((t=>{t.position===e&&(t.character.health-=s,Number(t.character.health.toFixed(1)),C(this.state,this))})),this.gamePlay.redrawPositions([...this.state.team.playerTeam,...this.state.team.botTeam]),this.gamePlay.deselectCell(this.state.selected.position),console.log(this.state),this.state.currentPlayer="bot",w(this.state,this,this.gamePlay)}))}}playerMove(){null!=this.state.mouseEnter.move&&(this.state.team.playerTeam.forEach((e=>{e.position===this.state.selected.position&&(e.position=this.state.mouseEnter.move,this.gamePlay.deselectCell(this.state.selected.position),this.state.selected.position=this.state.mouseEnter.move)})),this.gamePlay.redrawPositions([...this.state.team.playerTeam,...this.state.team.botTeam]),this.gamePlay.deselectCell(this.state.mouseEnter.move),console.log("Сработало движение!!!"),console.log(this.state.team.playerTeam),console.log(this.state.mouseEnter),this.state.currentPlayer="bot",w(this.state,this,this.gamePlay))}cellEnterFunc(e){const t=this.findChar(e),{isSelected:a}=this.state.selected||null;if(t&&a){const{team:a}=t;if(this.state.selected.charTeam===a)return void this.gamePlay.setCursor(u);if(this.state.selected.charTeam!==a){if(this.checkAreaForActions("attack",e))return null!==this.state.mouseEnter.attack&&this.gamePlay.deselectCell(this.state.mouseEnter.attack),this.gamePlay.selectCell(e,"red"),this.state.mouseEnter.attack=e,void this.gamePlay.setCursor(p);this.gamePlay.setCursor(g)}}if(!t&&a){const t=this.checkAreaForActions("move",e);if(t&&null===this.state.mouseEnter.move)return this.gamePlay.selectCell(e,"green"),this.state.mouseEnter.move=e,void this.gamePlay.setCursor(u);if(t&&null!=this.state.mouseEnter.move)return this.gamePlay.deselectCell(this.state.mouseEnter.move),this.gamePlay.selectCell(e,"green"),this.state.mouseEnter.move=e,void this.gamePlay.setCursor(u);this.gamePlay.setCursor(g)}}}(U,z);I.init()}();
//# sourceMappingURL=main.js.map