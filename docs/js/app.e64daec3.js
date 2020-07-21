(function(e){function n(n){for(var r,o,i=n[0],l=n[1],c=n[2],s=0,v=[];s<i.length;s++)o=i[s],Object.prototype.hasOwnProperty.call(u,o)&&u[o]&&v.push(u[o][0]),u[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);f&&f(n);while(v.length)v.shift()();return a.push.apply(a,c||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],r=!0,i=1;i<t.length;i++){var l=t[i];0!==u[l]&&(r=!1)}r&&(a.splice(n--,1),e=o(o.s=t[0]))}return e}var r={},u={app:0},a=[];function o(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=e,o.c=r,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)o.d(t,r,function(n){return e[n]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="/vue-othello-ts/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=n,i=i.slice();for(var c=0;c<i.length;c++)n(i[c]);var f=l;a.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("cd49")},"5c0b":function(e,n,t){"use strict";var r=t("e332"),u=t.n(r);u.a},"67e9":function(e,n,t){},b81a:function(e,n,t){},cd49:function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("f751"),t("097d");var r,u=t("2b0e"),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("div",{staticClass:"msg"},[e._v(e._s(e.gameMsg))]),t("game-board",{on:{nextTurn:e.nextTurn,gameEnd:e.gameEnd}})],1)},o=[],i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{ref:"toyotoyo",staticClass:"game-board",style:{width:e.windoWidth}},[e._l(e.cells,(function(n,r){return e._l(n,(function(n,u){return t("game-cell",{key:r+"_"+u,staticClass:"game-cell",style:{width:98/e.BOARD_SIZE+"%"},attrs:{owner:n.owner,put:n.put},on:{click:function(n){return e.placeStone(r,u)}}})}))}))],2)},l=[],c=t("768b"),f=(t("ac4d"),t("8a81"),t("ac6a"),t("6c7b"),t("bd86")),s=t("750b"),v=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"game-cell",style:{backgroundImage:e.owner?"url('imgs/stone_"+e.owner+".svg')":"none",border:e.put?"3px solid khaki":"1px solid gray"},on:{click:function(n){return e.$emit("click")}}})},p=[],d=(t("c5f6"),Object(s["b"])({props:{owner:{type:Number},put:{type:Boolean}}})),b=d,w=(t("fe01"),t("2877")),m=Object(w["a"])(b,v,p,!1,null,"8b73c8f0",null),h=m.exports,y=1,g=-1,O=0,j=(r={},Object(f["a"])(r,y,"黒"),Object(f["a"])(r,g,"白"),r),_=6,x=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],k=Object(s["b"])({components:{GameCell:h},setup:function(e,n){var t=Object(s["e"])(Array(_).fill(0).map((function(e){return Array(_).fill(0).map((function(e){return{owner:O,put:!1}}))}))),r=_/2-1,u=_/2;t.value[r][r].owner=g,t.value[r][u].owner=y,t.value[u][r].owner=y,t.value[u][u].owner=g;var a=Object(s["e"])(y),o=(window.innerWidth<window.innerHeight?window.innerWidth:.95*window.innerHeight)+"px",i=Object(s["a"])((function(){var e,n=t.value.reduce((function(e,n){return e+n.reduce((function(e,n){return e+n.owner}),0)}),0);return n>0?e=y:n<0&&(e=g),e})),l=Object(s["a"])((function(){return 0===t.value.filter((function(e){return e.filter((function(e){return e.owner===O})).length})).length})),f=function(e,r){if(!l.value&&t.value[e][r].owner===O){var u=v(e,r);if(0!=u.length)if(u.map((function(e){var n=!0,r=!1,u=void 0;try{for(var o,i=e[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var l=Object(c["a"])(o.value,2),f=l[0],s=l[1];t.value[f][s].owner=a.value}}catch(v){r=!0,u=v}finally{try{n||null==i.return||i.return()}finally{if(r)throw u}}})),t.value[e][r].owner=a.value,a.value=a.value===y?g:y,l.value)n.emit("gameEnd",i.value?j[i.value]:0);else{if(0==p()&&(a.value=a.value===y?g:y,0==p()))return void n.emit("gameEnd",i.value?j[i.value]:0);n.emit("nextTurn",j[a.value])}}},v=function(e,n){var r=new Array;if(t.value[e][n].owner!==O)return r;var u=!0,o=!1,i=void 0;try{for(var l,f=x[Symbol.iterator]();!(u=(l=f.next()).done);u=!0)for(var s=Object(c["a"])(l.value,2),v=s[0],p=s[1],d=new Array,b=0,w=void 0,m=void 0,h=void 0;;){if(b++,w=e+v*b,m=n+p*b,!(0<=w&&w<_&&0<=m&&m<_))break;if(h=t.value[w][m].owner,h==O)break;if(h==a.value){0!=d.length&&r.push(d);break}d.push([w,m])}}catch(y){o=!0,i=y}finally{try{u||null==f.return||f.return()}finally{if(o)throw i}}return r},p=function(){var e=0;return t.value.map((function(n,t){return n.map((function(n,r){n.put=v(t,r).length>0,n.put&&e++}))})),e};return Object(s["d"])((function(){n.emit("nextTurn",j[a.value]),p()})),{cells:t,turn:a,winner:i,isGameEnded:l,placeStone:f,BOARD_SIZE:_,windoWidth:o}}}),E=k,S=(t("ef85"),Object(w["a"])(E,i,l,!1,null,"14fd272a",null)),T=S.exports,P=Object(s["b"])({name:"app",components:{GameBoard:T},setup:function(){var e=Object(s["e"])(""),n=function(n){e.value="".concat(n,"の番です")},t=function(n){e.value=n?"".concat(n,"の勝ちです"):"引き分けです"};return{gameMsg:e,nextTurn:n,gameEnd:t}}}),A=P,M=(t("5c0b"),Object(w["a"])(A,a,o,!1,null,null,null)),C=M.exports;u["a"].config.productionTip=!1,u["a"].use(s["c"]),new u["a"]({render:function(e){return e(C)}}).$mount("#app")},e332:function(e,n,t){},ef85:function(e,n,t){"use strict";var r=t("67e9"),u=t.n(r);u.a},fe01:function(e,n,t){"use strict";var r=t("b81a"),u=t.n(r);u.a}});
//# sourceMappingURL=app.e64daec3.js.map