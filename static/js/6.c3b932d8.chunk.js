(this.webpackJsonpxmeme=this.webpackJsonpxmeme||[]).push([[6],{126:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return m}));var o=n(85),a=n(6),r=n(0),i=n(111),c=n(113),s=n.n(c),d=n(123),h=n(1),l={transition:"transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"},u={transform:"translateZ(0px) scale3d(0.9, 0.9, 1)",transition:"transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",margin:"-30px 0"};function m(e){var t=e.theme,n=e.setMemeData,c=e.memes,m=Object(r.useState)(null),p=Object(a.a)(m,2),b=p[0],j=p[1],f=function(e){j(e)};return Object(h.jsx)(i.a,{photos:c,direction:"column",margin:20,renderImage:function(e){return function(e){var t=e.index,n=e.photo,a=e.theme,r=e.margin,i=e.direction,c=e.top,m=e.left,p=e.hovered,b=e.handleHover,j=e.updateMeme,f={backgroundColor:"light"===a?"#eee":"#111",cursor:"pointer",overflow:"hidden",position:"relative"},O=p===t,x=(100-80/n.width*100)/100,v=(100-80/n.height*100)/100;u.transform="translateZ(0px) scale3d(".concat(x,", ").concat(v,", 1)"),"column"===i&&(f.position="absolute",f.left=m,f.top=c,O&&(f.paddingBottom="6px"));var g=n.id,w=n.src,y=n.date,M=n.height,N=n.width,k=n.author,z=n.caption,C={name:k,url:w,caption:z,id:g,index:t};return Object(h.jsxs)("div",{style:Object(o.a)(Object(o.a)({margin:r,width:N},f),{},{height:O?"":M}),className:O?"photo-parent":"photo-parent not-selected",onClick:function(){return j(C)},onMouseEnter:function(){return b(t)},onMouseLeave:function(){return b(null)},children:[O&&Object(h.jsx)("div",{className:"photo-header",children:Object(h.jsx)("h3",{children:z})}),Object(h.jsx)(s.a,{height:M,width:N,once:!0,offset:350,children:Object(h.jsx)("img",Object(o.a)({alt:z,style:O?Object(o.a)(Object(o.a)({},l),u):Object(o.a)({},l)},n))}),O&&Object(h.jsxs)("div",{className:"photo-footer",children:[Object(h.jsxs)("div",{className:"photo-author",children:["Posted by ",k]}),Object(h.jsxs)("div",{className:"photo-date",children:["Posted ",Object(d.a)(new Date(y))," ago"]})]})]},t)}(Object(o.a)(Object(o.a)({},e),{},{hovered:b,handleHover:f,updateMeme:n,theme:t}))}})}}}]);
//# sourceMappingURL=6.c3b932d8.chunk.js.map