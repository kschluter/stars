require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({20:[function(require,module,exports) {
"use strict";function canvasArea(t){return t.constructor()}Object.defineProperty(exports,"__esModule",{value:!0}),exports.canvasArea=canvasArea,canvasArea.prototype={constructor:function(){return this._view={x:0,y:0,scl:1},this.registerEvents(),this.handleEventPtr=this.handleEvent.bind(this),this.resize(this),this},get width(){return+this.getAttribute("width")||parseInt(getComputedStyle(this).getPropertyValue("width"))||300},set width(t){this.style.width=(this.setAttribute("width",t),t+"px")},get height(){return+this.getAttribute("height")||parseInt(getComputedStyle(this).getPropertyValue("height"))||150},set height(t){this.style.height=(this.setAttribute("height",t),t+"px")},get resizable(){return void 0!==this._resizable&&this._resizable||(this._resizable=["horizontal","vertical","both"].indexOf(this.getAttribute("resizable"))+1)},set resizable(t){this.resizeMode=["horizontal","vertical","both"].indexOf(t)+1,this.setAttribute("resizable",this.resizeMode?t:"none")},get resizeActive(){return this._resizable&&this.cursor.includes("resize")},get cursor(){return this.style.cursor},set cursor(t){return this.style.cursor=t},get cartesian(){return!!eval(this.getAttribute("cartesian"))},set cartesian(t){this.setAttribute("cartesian",t)},get view(){return this._view},set view(t){this._view.x=t.x||0,this._view.y=t.y||0,this._view.scl=t.scl||1,this.notify("view",this._view)},pan:function({dx:t,dy:e}){this._view.x+=t,this._view.y+=e,this.notify("view",this._view)},zoom:function({x:t,y:e,scl:i}){this._view.x=t+i*(this._view.x-t),this._view.y=e+i*(this._view.y-e),this._view.scl*=i,this.notify("view",this._view)},pntToUsr:function({x:t,y:e}){let i=this._view;return{x:(t-i.x)/i.scl,y:(e-i.y)/i.scl}},resize:function({width:t,height:e}){this.width=t,this.height=e;for(let i=this.getElementsByTagName("canvas"),s=0;s<i.length;s++)i[s].width=t,i[s].height=e;this.notify("resize",({width:t,height:e}=this))},registerEvents:function(){this.addEventListener("mousemove",this,!1),this.addEventListener("mousedown",this,!1),this.addEventListener("mouseup",this,!1),this.addEventListener("mouseenter",this,!1),this.addEventListener("mouseleave",this,!1),this.addEventListener("wheel",this,!1)},handleEventPtr:null,handleEvent:function(t){t.type in this&&this[t.type](this.getEventData(t))},mousemove:function(t){1===t.buttons&&this.notify("drag",t),4===t.buttons?this.pan(t):this.notify("pointer",t)},mousedown:function(t){this.resizeActive?(this.removeEventListener("mousemove",this,!1),window.addEventListener("mousemove",this.handleEventPtr,!1)):this.notify("buttondown",t)},mouseup:function(t){this.resizeActive?(window.removeEventListener("mousemove",this.handleEventPtr,!1),this.addEventListener("mousemove",this,!1)):this.notify("buttonup",t)},mouseenter:function(t){this.notify("pointerenter",t)},mouseleave:function(t){this.notify("pointerleave",t)},wheel:function(t){this.zoom({x:t.x,y:t.y,scl:t.delta>0?.9:10/9})},resizeMode:function({x:t,y:e}){let i=this.resizable,s=i&&this.width,n=i&&this.height,h=this.cartesian;return i&&(i>2&&t>s-3&&(h&&e<3||!h&&e>n-3)?"nwse":i%2&&t>s-3?"ew":!!(i>1&&(h&&e<3||!h&&e>n-3))&&"ns")},getEventData:function(t){let e=t.target.getBoundingClientRect&&t.target.getBoundingClientRect()||{left:0,top:0},i=t.clientX-Math.floor(e.left),s=t.clientY-Math.floor(e.top);return{buttons:void 0!==t.buttons&&"mouseup"!==t.type?t.buttons:t.button||t.which,x:i,y:this.cartesian?this.height-s:s,dx:t.movementX,dy:this.cartesian?-t.movementY:t.movementY,delta:Math.max(-1,Math.min(1,t.deltaY||t.wheelDelta))||0}},signals:{},notify:function(t,e){let i=!1;if(this.signals[t])for(let s of this.signals[t])i=i||s(e);return i},observe:function(t,e){return(this.signals[t]||(this.signals[t]=[])).push(e),e},remove:function(t,e){let i=this.signals[t]?this.signals[t].indexOf(e):-1;i>=0&&this.signals[t].splice(i,1)}},canvasArea.register=function(){const t=()=>{Object.setPrototypeOf(canvasArea.prototype,HTMLElement.prototype);for(let t=document.getElementsByTagName("canvas-area"),e=0;e<t.length;e++)canvasArea(Object.setPrototypeOf(t[e],canvasArea.prototype))};"loading"===document.readyState?document.addEventListener("DOMContentLoaded",t):t()},canvasArea.register();
},{}],30:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class e{constructor(){this.queue=[]}pop(e){return this.queue.pop()}push(e){return this.queue.push(e)}peek(){}}exports.Render=e;
},{}],26:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class e{constructor(){this.queue=[]}pop(e){return this.queue.pop()}push(e){return this.queue.push(e)}peek(){}}exports.Undo=e;
},{}],28:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class t{constructor(){this.confirmClear=!1,this.isPainting=!1,this.isQueuing=!0,this.menuToggle={grid:!1},this.mouse={x:0,y:0},this.notify={help:!1},this.brush={randomCount:10,flow:40,spread:60,selected:[0,1,2,3,4,5,6,7,8,9,10],all:[{c:0,t:0,h:1,w:1,r:255,g:255,b:255,a:1},{c:1,t:0,d:1,r:67,g:120,b:22,a:1},{c:2,t:0,i:3,o:.5,p:7,r:255,g:255,b:255,a:1},{c:0,t:0,h:1,w:1,r:175,g:0,b:130,a:1}]}}}exports.Store=t;
},{}],24:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=exports.$=document.querySelector.bind(document),t=exports.$$=document.querySelectorAll.bind(document);
},{}],22:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.UI=void 0;var e=require("./util");class s{constructor(e){this.space=e,this.menus=[{id:"menuTopLeft",resize:{x:!1,y:!1},visible:!0},{id:"menuTopCenter",resize:{x:!0,y:!1},visible:!0},{id:"menuTopRight",resize:{x:!1,y:!1},visible:!0},{id:"menuCenter",resize:{x:!0,y:!0},visible:!0},{id:"menuBottomLeft",resize:{x:!1,y:!1},visible:!0},{id:"menuBottomCenter",resize:{x:!0,y:!1},visible:!0},{id:"menuBottomRight",resize:{x:!1,y:!1},visible:!0}],this.submenus=document.getElementsByClassName("subMenu"),this.messages=document.getElementsByClassName("message"),this.closeButtons=document.getElementsByClassName("btnMessageAction"),this.resize(),this.observeCanvasEvents(),this.observeWindowEvents(),this.observeClickEvents(),this.observeMouseEvents(),setInterval(this.uiLoop.bind(this),60)}uiLoop(){const s=this.space.state.render.queue,t=this.space.state.undo.queue;s.length>0?((0,e.$)("#clear").removeAttribute("disabled"),(0,e.$)("#clear").classList.remove("disabled")):!t.length>0&&((0,e.$)("#clear").setAttribute("disabled",!0),(0,e.$)("#clear").classList.add("disabled")),s.length>0?((0,e.$)("#undo").removeAttribute("disabled"),(0,e.$)("#undo").classList.remove("disabled")):((0,e.$)("#undo").setAttribute("disabled",!0),(0,e.$)("#undo").classList.add("disabled")),t.length>0?((0,e.$)("#redo").removeAttribute("disabled"),(0,e.$)("#redo").classList.remove("disabled")):((0,e.$)("#redo").setAttribute("disabled",!0),(0,e.$)("#redo").classList.add("disabled")),s.length>0?((0,e.$)("#save").removeAttribute("disabled"),(0,e.$)("#save").classList.remove("disabled")):((0,e.$)("#save").setAttribute("disabled",!0),(0,e.$)("#save").classList.add("disabled"))}observeCanvasEvents(){this.space.ca.observe("pointer",e=>{let{x:s,y:t}=this.space.ca.pntToUsr(e);const i=Math.max(Math.log(this.space.ca.view.scl)/Math.log(2),0);this.space.state.mouse={x:s.toFixed(i),y:t.toFixed(i)}}),this.space.ca.observe("buttondown",e=>{1===e.buttons&&(clearInterval(this.space.paintLoopInterval),this.space.state.isPainting=!0,this.space.paintLoop())}),this.space.ca.observe("buttonup",e=>{1===e.buttons&&(this.space.state.isPainting=!1,this.space.state.isQueuing=!0,clearInterval(this.space.paintLoopInterval))}),this.space.ca.observe("view",s=>{const t=(0,e.$)("#scale"),i=(0,e.$)(".menuBottomCenter");t.innerHTML=this.space.ca.view.scl.toFixed(2),1==this.space.ca.view.scl.toFixed(2)?i.style.color="white":i.style.color="grey"})}observeWindowEvents(){window.addEventListener("resize",this.resize.bind(this))}observeClickEvents(){(0,e.$)("#clear").addEventListener("click",()=>{this.clear(this.space)}),(0,e.$)("#save").addEventListener("click",()=>{this.save(this.space)}),(0,e.$)("#github").addEventListener("click",e=>{e.preventDefault(),window.open("https://github.com/kschluter/stars")}),Array.from(this.submenus).forEach(e=>{e.addEventListener("click",()=>{this.subMenuSelect(e)})}),Array.from(this.closeButtons).forEach(e=>{e.addEventListener("click",()=>{this.subMenuClose()})}),(0,e.$)("#undo").addEventListener("click",()=>{if(null!=this.space.state.render.queue&&this.space.state.render.queue.length>0){var e=this.space.state.render.queue.pop();this.space.state.undo.queue.push(e)}}),(0,e.$)("#redo").addEventListener("click",()=>{if(null!=this.space.state.undo.queue&&this.space.state.undo.queue.length>0){var e=this.space.state.undo.queue.pop();this.space.state.render.queue.push(e)}})}observeMouseEvents(){const e=document.getElementsByClassName("menu");Array.from(e).forEach(e=>{e.addEventListener("mouseenter",()=>{this.hide(e)})})}resize(){const s=window.innerWidth,t=window.innerHeight;this.space.c.width=s,this.space.c.height=t,this.space.ca.width=s,this.space.ca.height=t,this.menus.forEach(i=>{const a=(0,e.$)("#"+i.id);!0===i.resize.x&&(a.style.left=s/2-a.offsetWidth/2+"px"),!0===i.resize.y&&(a.style.top=t/2-a.offsetHeight/2+"px")})}clear(e){e.state.render.queue=[],e.state.undo.queue=[],e.randomizeBrushes(e.state.brush.randomCount)}log(e){let s=0;e.state.render.queue.forEach(e=>{s+=e.items.length});e.state.render.queue.length,e.ca.view.scl.toString().substring(0,4),e.state.mouse.x,e.state.mouse.y,e.ca.view.x.toFixed(2),e.ca.view.y.toFixed(2)}save(){const e=this.space.c.toDataURL("image/png");(new Image).src=e;var s=`<iframe width='100%' height='100%' src='${e}' style='margin:0px; padding:0px; border:0px; overflow:hidden'></iframe>`,t=window.open();t.document.open(),t.document.write(s),t.document.close()}hide(e){if(this.space.state.isPainting){e.style.display="none";setTimeout(()=>{e.style.display="block"},2500)}}subMenuSelect(s){const t=(0,e.$)("#subMenu"+s.id);Array.from(this.submenus).forEach(i=>{i.id==s.id?"block"===t.style.display?t.style.display="none":t.style.display="block":(0,e.$)("#subMenu"+i.id).style.display="none"}),this.resize()}subMenuClose(){const e=document.getElementsByClassName("message");Array.from(e).forEach(e=>{e.style.display="none"})}saveToLocalStorage(){localStorage.setItem("stars",JSON.stringify(this.space.state))}readFromLocalStorage(){const e=JSON.parse(localStorage.getItem("stars"));e&&(this.space.state=e)}}exports.UI=s;
},{"./util":24}],8:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Space=void 0;var t=require("./lib/canvas.js"),e=require("./queue/render"),s=require("./queue/undo"),a=require("../modules/store/store"),r=require("./ui"),i=require("./util");class h{constructor(){this.c=(0,i.$)("#c"),this.ctx=(0,i.$)("#c").getContext("2d"),this.ca=(0,i.$)("#ca"),this.rc=(0,i.$)("#rc"),this.state=new a.Store,this.state.render=new e.Render,this.state.undo=new s.Undo,this.ui=new r.UI(this),this.randomizeBrushes(this.state.brush.randomCount)}paintLoop(){this.paint(),this.paintLoopInterval=setInterval(this.paint.bind(this),1e3/this.state.brush.flow)}paint(){const t=this.state.brush.selected,e=this.state.brush.all;for(const r in t){const i=t[r],h=this.getBrushPoint(e[i].w);switch(e[i].c){case 0:var s={c:e[i].c,t:e[i].t,x:h.x,y:h.y,h:e[i].h,w:e[i].w,r:e[i].r,g:e[i].g,b:e[i].b,a:e[i].a};break;case 1:s={c:e[i].c,t:e[i].t,x:h.x,y:h.y,d:e[i].d,r:e[i].r,g:e[i].g,b:e[i].b,a:e[i].a};break;case 2:s={c:e[i].c,t:e[i].t,x:h.x,y:h.y,p:e[i].p,o:e[i].o,i:e[i].i,r:e[i].r,g:e[i].g,b:e[i].b,a:e[i].a}}if(this.state.isQueuing){var a={visible:!0,items:[s]};this.state.render.queue.push(a),this.state.isQueuing=!1,this.state.undo.queue=[]}else this.state.render.queue[this.state.render.queue.length-1].items.push(s)}}getBrushPoint(t){const e=this.state.mouse;parseInt(e.y),parseInt(e.x);let s=parseInt(e.y),a=parseInt(e.x);if(parseInt(this.state.brush.spread)>0){const t=a-parseInt(this.state.brush.spread),e=a+parseInt(this.state.brush.spread/2),r=s-this.state.brush.spread,i=s+this.state.brush.spread/2;a=Math.floor(Math.random()*(e-t+1)+t),s=Math.floor(Math.random()*(i-r+1)+r);const h=this.getRandomFloat(0,2*Math.PI);return a+=this.state.brush.spread*Math.cos(h),s+=this.state.brush.spread*Math.sin(h),{x:Math.floor(a),y:Math.floor(s)}}return a=Math.floor(a-t/2),s=Math.floor(s-t/2),{x:Math.floor(a),y:Math.floor(s)}}render(){let t=this.ctx.canvas.width,e=this.ctx.canvas.height,s=20*this.ca.view.scl;this.ca.view.x,this.ca.view.y;this.ctx.fillStyle="black",this.ctx.fillRect(0,0,t,e);const a=this.state.render.queue.length;this.ctx.save();for(let t=0;t<a;t++)for(let e of this.state.render.queue[t].items)switch(e.c){case 0:this.drawPixel(e.t,e.x,e.y,e.w,e.h,e.r,e.g,e.b,e.a);break;case 1:this.drawCircle(e.x,e.y,e.d,0,2*Math.PI,!1,e.r,e.g,e.b,e.a);break;case 2:this.drawStar(e.x,e.y,e.p,e.o,e.i,e.r,e.g,e.b,e.a)}this.ctx.restore()}drawStar(t,e,s,a,r,i,h,o,n){var c=Math.PI/2*3,l=t,u=e,d=Math.PI/s;this.ctx.setTransform(this.ca.view.scl,0,0,this.ca.view.scl,this.ca.view.x+.5,this.ca.view.y+.5),this.ctx.beginPath(),this.ctx.moveTo(t,e-a);for(var p=0;p<s;p++)l=t+Math.cos(c)*a,u=e+Math.sin(c)*a,this.ctx.lineTo(l,u),c+=d,l=t+Math.cos(c)*r,u=e+Math.sin(c)*r,this.ctx.lineTo(l,u),c+=d;this.ctx.lineTo(t,e-a),this.ctx.closePath(),this.ctx.fillStyle=`rgba(${i}, ${h}, ${o}, ${n})`,this.ctx.fill()}drawCircle(t,e,s,a,r,i,h,o,n,c){this.ctx.beginPath(),this.ctx.fillStyle=`rgba(${h}, ${o}, ${n}, ${c})`,this.ctx.setTransform(this.ca.view.scl,0,0,this.ca.view.scl,this.ca.view.x+.5,this.ca.view.y+.5),this.ctx.arc(t,e,s,a,r,i),this.ctx.fill()}drawPixel(t,e,s,a,r,i,h,o,n){if(t){const t=a+1,e=1===a?1:a-1,s=r+1,i=1===r?1:r-1;a=Math.random()*(t-t+1)+e,r=Math.random()*(s-s+1)+i}this.ctx.setTransform(this.ca.view.scl,0,0,this.ca.view.scl,this.ca.view.x+.5,this.ca.view.y+.5),this.ctx.fillStyle=`rgba(${i}, ${h}, ${o}, ${n})`,this.ctx.fillRect(e,s,a,r)}generateStars(t,e){const s=-e,a=e,r=-e,i=e;let h={v:!0,items:[]};for(let e=0;e<t;e++){let t=Math.random()*(parseInt(a)-parseInt(a)+1+parseInt(s)),e=Math.random()*(parseInt(i)-parseInt(i)+1+parseInt(r));h.items.push({t:!1,x:t,y:e,w:1,h:1,r:255,g:255,b:255,a:1})}this.state.render.queue.push(h),h={v:!0,items:[]};for(let e=0;e<t;e++){let t=Math.random()*(parseInt(a)-parseInt(a)+1+parseInt(s)),e=Math.random()*(parseInt(i)-parseInt(i)+1+parseInt(r));h.items.push({t:!1,x:t,y:e,w:2,h:2,r:255,g:255,b:255,a:1})}this.state.render.queue.push(h)}getRandomFloat(t,e){return Math.random()*(e-t)+t}randomizeBrushes(t){t=t||2;const e=[];let s=[];const a=[{name:"red",r:255,g:0,b:0},{name:"orange",r:255,g:165,b:0},{name:"yellow",r:255,g:255,b:0},{name:"blue",r:0,g:0,b:255},{name:"purple",r:128,g:0,b:128},{name:"pink",r:255,g:0,b:255},{name:"green",r:0,g:255,b:0}];let r=0;for(r=0;r<t;r++){let t=Math.floor(this.getRandomFloat(0,a.length)),i=Object.assign({},a[t]);switch(i.c=Math.floor(this.getRandomFloat(0,3)),i.c){case 0:let t=Math.floor(this.getRandomFloat(1,3));i.h=t,i.w=t;break;case 1:i.d=this.getRandomFloat(.3,2);break;case 2:let e=Math.floor(this.getRandomFloat(1,2)),s=Math.floor(this.getRandomFloat(2,3)),a=Math.floor(this.getRandomFloat(4,8));i.p=a,i.o=s,i.i=e}r>=0&&(i.r=255,i.g=255,i.b=255),i.a=1,i.t=0,s.push(r),e.push(i)}this.state.brush.selected=s,this.state.brush.all=e}}exports.Space=h;
},{"./lib/canvas.js":20,"./queue/render":30,"./queue/undo":26,"../modules/store/store":28,"./ui":22,"./util":24}],6:[function(require,module,exports) {

},{"./assets\\images\\174-bin2.svg":[["22608d047fa6de630c61c50363a691b7.svg",33],33],"./assets\\images\\102-undo.svg":[["d2f52fdc33a7d0e2961feac01d80c8d7.svg",35],35],"./assets\\images\\103-redo.svg":[["ee24a99bd53685191044bb557fbb4010.svg",37],37],"./assets\\images\\218-star-full.svg":[["e69ad760bafee9615ef9a0d15687bf5e.svg",39],39],"./assets\\images\\207-eye.svg":[["a6f40a5ee6d91c874c34862f552a74bd.svg",43],43],"./assets\\images\\099-floppy-disk.svg":[["786655edb1924d93f9f365fa2a973f90.svg",41],41],"./assets\\images\\433-github.svg":[["b5418bf215cadf586c7994433218f506.svg",45],45],"./assets\\images\\266-question.svg":[["cec17349d6d356fb3c8166f95af01792.svg",47],47],"./assets\\images\\272-cross.svg":[["13b96572b281e115a1934f05297b4eb0.svg",49],49]}],4:[function(require,module,exports) {
"use strict";var e=require("./modules/space.js");require("./index.scss"),window.onload=(()=>{const n=new e.Space;!function e(){n.render(),requestAnimationFrame(e)}()});
},{"./modules/space.js":8,"./index.scss":6}]},{},[4])