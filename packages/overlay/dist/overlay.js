"use strict";var SketchUI=(()=>{var Ds=Object.defineProperty;var Dt=(e,t)=>()=>(e&&(t=e(e=0)),t);var Fs=(e,t)=>{for(var n in t)Ds(e,n,{get:t[n],enumerable:!0})};function si(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='5 9 2 12 5 15'/><polyline points='9 5 12 2 15 5'/><polyline points='15 19 12 22 9 19'/><polyline points='19 9 22 12 19 15'/><line x1='2' y1='12' x2='22' y2='12'/><line x1='12' y1='2' x2='12' y2='22'/></svg>`)}") 12 12, move`}function $o(e){if(Nn&&Nn.size===e)return Nn.uri;let t=Math.max(e,2),n=t*2+4,o=n/2,r=`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${n}' height='${n}'><circle cx='${o}' cy='${o}' r='${t}' fill='none' stroke='${l.accent}' stroke-width='1.5'/></svg>`)}") ${o} ${o}, crosshair`;return Nn={size:e,uri:r},r}function li(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M2 22l1-1h3l9-9'/><path d='M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7'/><path d='M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14'/><path d='m9 7 6 6'/><path d='M20 2a2.83 2.83 0 0 1 0 4L16 10'/></svg>`)}") 2 22, pointer`}var l,L,N,k,T,ai,Nn,U=Dt(()=>{"use strict";l={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},L={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},N={xs:"4px",sm:"6px",md:"10px",lg:"14px"},k={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},T="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",ai=`
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/__sketch-ui/inter-regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/__sketch-ui/inter-semibold.woff2') format('woff2');
  }
`;Nn=null});function ga(e){return Yn.push(e),()=>{Yn=Yn.filter(t=>t!==e)}}function ha(e){return jn.push(e),()=>{jn=jn.filter(t=>t!==e)}}function Ke(){jn.forEach(e=>e())}function Kn(){return xr}function rn(e){let t=xr;t!==e&&(xr=e,Yn.forEach(n=>n(e,t)))}function be(){return{...fa}}function an(e,t){fa[e]=t}function Ne(){return ye}function ya(e){ye.set(e.id,e),De.push({type:"ghostCreate",ghostId:e.id}),Ke()}function qn(e,t){let n=ye.get(e);if(!n)return;let o={...n.currentPos};n.currentPos=t,De.push({type:"ghostMove",ghostId:e,previousPos:o}),Ke()}function fc(e){let t=ye.get(e);t&&(t.cloneEl.remove(),t.originalEl.style.opacity=t.originalOpacity,t.originalEl.style.visibility=t.originalVisibility,ye.delete(e),Ke())}function Tt(e){if(Xe.push(e),e.type==="colorChange"){let t=e;De.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else De.push({type:"annotationAdd",annotationId:e.id});Ke()}function va(e){ba=e}function Ca(e){xa=e}function ma(e){Xe=Xe.filter(t=>t.id!==e),ba?.(e),Ke()}function Zn(){return Cr}function wa(e){Cr=e;for(let t of ye.values())e?(t.originalEl.style.opacity="0",t.originalEl.style.visibility="hidden"):(t.originalEl.style.opacity="0.3",t.originalEl.style.visibility="visible");Ke()}function Jn(e){for(let t of ye.values())if(t.originalEl===e||t.originalEl.contains(e)||e.contains(t.originalEl))return!0;return!1}function wr(){let e=De.pop();if(!e)return null;switch(e.type){case"ghostCreate":return fc(e.ghostId),"ghost removed";case"ghostMove":{let t=ye.get(e.ghostId);return t&&(t.currentPos=e.previousPos,xa?.(e.ghostId,e.previousPos.x,e.previousPos.y)),"move reverted"}case"annotationAdd":return ma(e.annotationId),"annotation removed";case"colorChange":{let t=Xe.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),ma(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}}return null}function Ea(e){De.push(e),Ke()}function Re(){return{scale:on,offsetX:Un,offsetY:Xn}}function Qn(e,t,n){on=e,Un=t,Xn=n,nn.forEach(o=>o())}function eo(e){return nn.push(e),()=>{nn=nn.filter(t=>t!==e)}}function J(e,t){return{x:(e-Un)/on,y:(t-Xn)/on}}function to(){for(let e of ye.values())e.cloneEl.remove(),e.originalEl.style.opacity=e.originalOpacity,e.originalEl.style.visibility=e.originalVisibility;for(let e of Xe)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of De)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}ye=new Map,Xe=[],De=[],Cr=!1,on=1,Un=0,Xn=0,nn.forEach(e=>e()),Ke()}function Er(){return ye.size>0||Xe.length>0}function Ta(){return De.length>0}function Sa(){let e=[];for(let o of ye.values())e.push({component:o.componentRef.componentName,file:o.componentRef.filePath,line:o.componentRef.lineNumber,from:o.originalRect,to:o.currentPos});let t=[],n=[];for(let o of Xe)o.type==="draw"?t.push({type:"draw",startComponent:o.targetComponent?.componentName,startFile:o.targetComponent?.filePath,startLine:o.targetComponent?.lineNumber,points:o.points,color:o.color,strokeWidth:o.strokeWidth}):o.type==="text"?t.push({type:"text",content:o.content,position:o.position,targetComponent:o.targetComponent?.componentName,targetFile:o.targetComponent?.filePath,targetLine:o.targetComponent?.lineNumber}):o.type==="colorChange"&&n.push({component:o.component.componentName,file:o.component.filePath,line:o.component.lineNumber,property:o.property,from:o.fromColor,to:o.toColor});return{moves:e,annotations:t,colorChanges:n}}var ye,Xe,De,xr,Cr,fa,on,Un,Xn,nn,Yn,jn,ba,xa,se=Dt(()=>{"use strict";ye=new Map,Xe=[],De=[],xr="pointer",Cr=!0,fa={brushSize:4,brushColor:"#ef4444",fontSize:16,textColor:"#ffffff"},on=1,Un=0,Xn=0,nn=[],Yn=[],jn=[];ba=null;xa=null});function Rr(){return j}function Ha(e){return cn.push(e),()=>{cn=cn.filter(t=>t!==e)}}function Pc(){Pr=document.body.style.background||document.body.style.backgroundColor||"",Nr=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",j=document.createElement("div"),j.setAttribute("data-sketch-ui-canvas-wrapper","true"),j.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${n};
  `.trim().replace(/\n\s*/g," "),Te=document.createElement("div"),Te.setAttribute("data-sketch-ui-dot-bg","true"),Te.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${l.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="sketch-ui-root"||r.hasAttribute("data-sketch-ui-interaction")||r.hasAttribute("data-sketch-ui-ghost")||r.hasAttribute("data-sketch-ui-annotation")||r.hasAttribute("data-sketch-ui-dot-bg")||r.hasAttribute("data-sketch-ui-canvas-wrapper"))||($a.push(r),j.appendChild(r));j.style.position="relative",j.style.zIndex="1",document.body.insertBefore(Te,document.body.firstChild),document.body.insertBefore(j,Te.nextSibling),Mr=eo(Aa),Aa(),cn.forEach(r=>r(j))}function Aa(){if(!j||!Te)return;let{scale:e,offsetX:t,offsetY:n}=Re();j.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=kc*e,r=t%o,i=n%o;Te.style.backgroundImage=`radial-gradient(circle, ${Mc} ${Oa}px, transparent ${Oa}px)`,Te.style.backgroundSize=`${o}px ${o}px`,Te.style.backgroundPosition=`${r}px ${i}px`}function Nc(e,t,n){let{scale:o,offsetX:r,offsetY:i}=Re(),a=Math.min(Tc,Math.max(Ec,o+n));if(a===o)return;let s=(e-r)/o,c=(t-i)/o,d=e-s*a,u=t-c*a;Qn(a,d,u)}function _a(e){e.preventDefault();let t=-e.deltaY*Sc,{scale:n}=Re(),o=t*n;Nc(e.clientX,e.clientY,o)}function Ia(e,t){let{scale:n,offsetX:o,offsetY:r}=Re();Qn(n,o+e,r+t)}function Da(){Qn(1,0,0)}function Fa(){return j!==null}function za(){j?Lr():Pc()}function Lr(){if(cn.forEach(e=>e(null)),Mr?.(),Mr=null,j){for(;j.firstChild;)document.body.insertBefore(j.firstChild,j);j.remove(),j=null}Te?.remove(),Te=null,$a=[],document.body.style.background=Pr,document.documentElement.style.background=Nr,Pr="",Nr=""}var Ec,Tc,Sc,kc,Oa,Mc,j,Te,Mr,$a,cn,Pr,Nr,Pt=Dt(()=>{"use strict";se();U();Ec=.1,Tc=5,Sc=.002,kc=24,Oa=1,Mc="rgba(0,0,0,0.15)",j=null,Te=null,Mr=null,$a=[],cn=[];Pr="",Nr=""});function cs(e,t){if(!ut)return;let n=performance.now(),o=Math.abs(e-ut.clientX),r=Math.abs(t-ut.clientY),i=o<=2&&r<=2,a=n-ut.timestamp<16;if(i||a)return ut.element}function us(e,t,n){ut={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function $t(){ut=null}var ut,Dr=Dt(()=>{"use strict";ut=null});var ps={};Fs(ps,{activateInteraction:()=>Vr,destroyInteraction:()=>Br,getPageElementAtPoint:()=>xn,initInteraction:()=>zr,refreshDrawCursor:()=>jc,registerToolHandler:()=>dt,setInteractionCursor:()=>vo,setInteractionPointerEvents:()=>vn});function dt(e,t){Fr.set(e,t)}function zr(){H=document.createElement("div"),H.setAttribute("data-sketch-ui-interaction","true"),H.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(H),document.addEventListener("scroll",$t,!0),H.addEventListener("mousedown",e=>{bn?.onMouseDown?.(e)}),H.addEventListener("mousemove",e=>{bn?.onMouseMove?.(e)}),H.addEventListener("mouseup",e=>{bn?.onMouseUp?.(e)}),document.addEventListener("wheel",ds,{passive:!1})}function ds(e){!H||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#sketch-ui-root")||_a(e)}function Vr(e){bn=Fr.get(e)||null,H&&(H.style.pointerEvents=e==="pointer"?"none":"auto"),Yc(e)}function Yc(e){if(H)switch(e){case"pointer":H.style.cursor="default";break;case"grab":H.style.cursor="grab";break;case"move":H.style.cursor=si();break;case"draw":H.style.cursor=$o(be().brushSize);break;case"color":H.style.cursor=li();break;case"text":H.style.cursor="text";break;default:H.style.cursor="default"}}function jc(){Kn()==="draw"&&H&&(H.style.cursor=$o(be().brushSize))}function vo(e){H&&(H.style.cursor=e)}function vn(e){H&&(H.style.pointerEvents=e?"auto":"none")}function xn(e,t){let n=cs(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#sketch-ui-root")&&!i.hasAttribute("data-sketch-ui-interaction")&&!i.hasAttribute("data-sketch-ui-ghost")&&!(i===document.body||i===document.documentElement)){r=i;break}return us(e,t,r),r}function Br(){document.removeEventListener("scroll",$t,!0),document.removeEventListener("wheel",ds),H?.remove(),H=null,bn=null,Fr.clear()}var H,bn,Fr,Ht=Dt(()=>{"use strict";se();U();Dr();Pt();H=null,bn=null,Fr=new Map});function zs(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),s=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+s).toString(16).slice(1)}`}return e}function Vs(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(C=>{try{return Array.from(C.cssRules)}catch{return[]}}).filter(C=>C instanceof CSSStyleRule&&C.selectorText===":root").flatMap(C=>Array.from(C.style)).filter(C=>C.startsWith("--")),n={},o={},r={},i={},a={},s={},c={},d={},u={},p={},m={},f={},g={},b={},x={},R={},_={},A={},V=(C,I,re,ie)=>{C[re]=ie,I[ie]=re};for(let C of t){let I=e.getPropertyValue(C).trim();if(!I)continue;let re=C.match(/^--spacing-(.+)$/);if(re){V(n,p,re[1],I);continue}let ie=C.match(/^--color-(.+)$/);if(ie){let Sn=ie[1];o[Sn]=I,m[zs(I)]=Sn;continue}let P=C.match(/^--font-size-(.+)$/);if(P){V(r,f,P[1],I);continue}let G=C.match(/^--font-weight-(.+)$/);if(G){V(i,g,G[1],I);continue}let y=C.match(/^--radius-(.+)$/);if(y){V(a,b,y[1],I);continue}let S=C.match(/^--border-(.+)$/);if(S){V(s,x,S[1],I);continue}let Y=C.match(/^--opacity-(.+)$/);if(Y){V(c,R,Y[1],I);continue}let de=C.match(/^--tracking-(.+)$/);if(de){V(d,_,de[1],I);continue}let We=C.match(/^--leading-(.+)$/);if(We){V(u,A,We[1],I);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:s,opacity:c,letterSpacing:d,lineHeight:u,spacingReverse:p,colorsReverse:m,fontSizeReverse:f,fontWeightReverse:g,borderRadiusReverse:b,borderWidthReverse:x,opacityReverse:R,letterSpacingReverse:_,lineHeightReverse:A}}var Bs=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function Gs(e,t){let n={};for(let o of Bs){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function Mn(e,t){return t.get(e)??null}function Zr(e,t,n){let r=(n??zt())[e],i=[];for(let[s,c]of r.entries()){let d=parseFloat(c);isNaN(d)||i.push({numericValue:d,token:s,cssValue:c})}let a=parseFloat(t);return isNaN(a)||i.some(c=>c.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((s,c)=>s.numericValue-c.numericValue),i}var Jr=null,Ft=null;function Qr(e){Jr=e,Ft=null}function zt(){if(Ft!==null)return Ft;let e=Vs();return Ft=Gs(e,Jr??{}),Ft}var ae=null,Vt=[],mt=0,Ws=5,Po=null,No=null,Ro=null,Lo=null,Oo=null,Ao=null;function ei(e){Ao=e}function Pn(e){ae&&ae.readyState===WebSocket.OPEN||(Oo=e,ae=new WebSocket(`ws://localhost:${e}`),ae.onopen=()=>{let t=mt>0;mt=0,t&&Lo&&Lo()},ae.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&Qr(n.tokens),n.type==="updatePropertyComplete"&&Ao&&Ao(n.success,n.errorCode,n.error),Vt.forEach(o=>o(n))}catch{}},ae.onclose=t=>{if(ae=null,t.code===4001){Ro&&Ro();return}if(mt<Ws){let n=500*Math.pow(2,mt);mt++,Po=setTimeout(()=>Pn(e),n)}else No&&No()},ae.onerror=()=>{})}function Pe(e){ae&&ae.readyState===WebSocket.OPEN&&ae.send(JSON.stringify(e))}function nt(e){return Vt.push(e),()=>{Vt=Vt.filter(t=>t!==e)}}function ti(){Po&&clearTimeout(Po),ae&&(ae.close(),ae=null),Vt=[]}function ni(e){No=e}function oi(e){Ro=e}function ri(e){Lo=e}function ii(){Oo&&(mt=0,Pn(Oo))}U();var gt=null,X=null,Bt=0,Rn=null,Ln=null,ot=null,Ho=null,ft=null,Gt=null,Io=null,di=null,Ys='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',pi='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',_o='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',js='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',ci='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',Us=`
  :host {
    all: initial;
  }
  ${ai}
  .toolbar {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${N.md};
    font-family: ${T};
    font-size: 12px;
    color: ${l.textPrimary};
    box-shadow: ${L.md};
    user-select: none;
    opacity: 0;
    animation: fadeIn ${k.settle} forwards;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  .divider {
    width: 1px;
    height: 16px;
    background: ${l.border};
    flex-shrink: 0;
  }
  .icon-btn {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 50%;
    color: ${l.textSecondary};
    cursor: pointer;
    padding: 0;
    transition: background ${k.fast}, color ${k.fast};
  }
  .icon-btn svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  .icon-btn:hover:not(:disabled) {
    background: ${l.bgSecondary};
    color: ${l.textPrimary};
  }
  .icon-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }
  .icon-btn.active {
    color: ${l.accent};
  }
  .close-btn {
    color: ${l.textTertiary};
  }
  .close-btn:hover {
    background: ${l.dangerSoft};
    color: ${l.danger};
  }
  .generate-btn {
    background: ${l.accent};
    border: none;
    border-radius: ${N.sm};
    color: white;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    font-family: ${T};
    cursor: pointer;
    transition: background ${k.fast};
  }
  .generate-btn:hover:not(:disabled) {
    background: ${l.accentHover};
  }
  .generate-btn:disabled {
    background: ${l.bgTertiary};
    color: ${l.textTertiary};
    cursor: default;
  }
  .component-detail {
    display: flex;
    align-items: center;
    gap: 6px;
    max-width: 280px;
    overflow: hidden;
  }
  .component-detail .tag {
    color: ${l.accent};
    font-size: 11px;
    font-weight: 600;
    font-family: monospace;
    flex-shrink: 0;
  }
  .component-detail .name {
    color: ${l.textPrimary};
    font-size: 12px;
    font-weight: 600;
    flex-shrink: 0;
  }
  .component-detail .path {
    color: ${l.textTertiary};
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .component-detail.empty {
    color: ${l.textTertiary};
    font-size: 12px;
  }
  .toast {
    position: fixed;
    bottom: 68px;
    right: 16px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    color: ${l.textPrimary};
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-family: ${T};
    box-shadow: ${L.md};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${k.medium};
  }
  .toast.visible {
    opacity: 1;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .spinner {
    width: 12px;
    height: 12px;
    border: 2px solid ${l.border};
    border-top-color: ${l.textSecondary};
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
`;function mi(e){let t=document.createElement("div");t.id="sketch-ui-root",document.body.appendChild(t),gt=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=Us;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn eye-btn" title="Toggle originals (.)">
      ${pi}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${_o}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Generate</button>
    <button class="icon-btn close-btn" title="Close SketchUI">
      ${js}
    </button>
  `,gt.appendChild(n),gt.appendChild(o),X=o.querySelector(".undo-btn");let r=o.querySelector(".close-btn");Rn=o.querySelector(".generate-btn"),Ln=o.querySelector(".eye-btn"),ft=o.querySelector(".component-detail"),ot=document.createElement("div"),ot.className="toast",gt.appendChild(ot),X.addEventListener("click",()=>{Pe({type:"undo"}),X&&(X.innerHTML='<div class="spinner"></div>',X.disabled=!0)}),r.addEventListener("click",e),Ln.addEventListener("click",()=>{Gt&&Gt()}),Rn.addEventListener("click",()=>{Io&&Io()}),document.addEventListener("keydown",i=>{i.key==="."&&(i.ctrlKey||i.metaKey)&&!ui()&&(Gt&&Gt(),i.preventDefault()),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!ui()&&di?.()&&i.preventDefault()}),ni(()=>{Z("Disconnected. Click to reconnect."),ii()}),oi(()=>{Z("Disconnected: another tab took over")}),ri(()=>{Bt=0,X&&(X.disabled=!0)}),nt(i=>{switch(i.type){case"reorderComplete":i.success?(Bt++,X&&(X.innerHTML=ci,setTimeout(()=>{X&&(X.innerHTML=_o,X.disabled=!1)},200))):i.error&&Z(i.error);break;case"undoComplete":i.success?(Bt=Math.max(0,Bt-1),X&&(X.innerHTML=ci,setTimeout(()=>{X&&(X.innerHTML=_o,X.disabled=Bt===0)},200))):i.error&&Z(i.error);break;case"devServerDisconnected":Z("Dev server disconnected");break;case"devServerReconnected":Z("Dev server reconnected");break}})}function fi(){let e=document.getElementById("sketch-ui-root");e&&e.remove(),gt=null,X=null}function K(){return gt}function gi(e){Gt=e}function hi(e){Io=e}function yi(e){di=e}function bi(e){Ln&&(Ln.innerHTML=e?pi:Ys)}function vi(e){Rn&&(Rn.disabled=!e)}function $e(e){if(!ft)return;if(!e){ft.className="component-detail empty",ft.textContent="No selection";return}ft.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";ft.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function Z(e){ot&&(ot.textContent=e,ot.classList.add("visible"),Ho&&clearTimeout(Ho),Ho=setTimeout(()=>{ot?.classList.remove("visible")},2e3))}function ui(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var Do="0.5.32",Ut=`bippy-${Do}`,xi=Object.defineProperty,Xs=Object.prototype.hasOwnProperty,Wt=()=>{},wi=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},An=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),Ei=!1,Ci,Yt=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>Ei?!0:(e&&typeof e.inject=="function"&&(Ci=e.inject.toString()),!!Ci?.includes("(injected)")),On=new Set,je=new Set,Fo=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:Ut,checkDCE:wi,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),je.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,On.forEach(a=>a())),i},on:Wt,onCommitFiberRoot:Wt,onCommitFiberUnmount:Wt,onPostCommitFiberRoot:Wt,renderers:t,supportsFiber:!0,supportsFlight:!0};try{xi(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let s=o.renderers;o=a,s.size>0&&(s.forEach((c,d)=>{je.add(c),a.renderers.set(d,c)}),jt(e))}}});let r=window.hasOwnProperty,i=!1;xi(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{jt(e)}return o},jt=e=>{e&&On.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=wi,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=Ut,t._instrumentationIsActive=!1;let n=An(t);if(n||(t.on=Wt),t.renderers.size){t._instrumentationIsActive=!0,On.forEach(i=>i());return}let o=t.inject,r=Yt(t);r&&!n&&(Ei=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return je.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,On.forEach(s=>s()),a}}(t.renderers.size||t._instrumentationIsActive||Yt())&&e?.()}catch{}},zo=()=>Xs.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),ht=e=>zo()?(jt(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Fo(e),Vo=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),$n=()=>{try{Vo()&&ht()}catch{}};$n();var Bo=0,Go=1;var Wo=5;var Yo=11,jo=13;var Uo=15,Xo=16;var Ko=19;var qo=26,Zo=27,Jo=28,Qo=30;var He=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};function er(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await nr(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=tr(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var tr=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=tr(o,t,n);if(r)return r;o=n?null:o.sibling}return null},nr=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await nr(o,t,n);if(r)return r;o=n?null:o.sibling}return null};var or=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?or(t.type||t.render):null},we=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=or(t);return o&&(o.displayName||o.name)||null};var rr=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||An(e)||Yt(e)};var ir=e=>{let t=ht(e.onActive);t._instrumentationSource=e.name??Ut;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,s,c)=>{n!==i&&(n?.(a,s,c),e.onCommitFiberRoot?.(a,s,c))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,s)=>{t.onCommitFiberUnmount===i&&(o?.(a,s),e.onCommitFiberUnmount?.(a,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,s)=>{t.onPostCommitFiberRoot===i&&(r?.(a,s),e.onPostCommitFiberRoot?.(a,s))};t.onPostCommitFiberRoot=i}return t},Ee=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},Ks=Error();var Ti=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,qs=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],Zs=["<anonymous>","eval",""],Ai=/\.(jsx|tsx|ts|js)$/,Js=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Qs=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,$i="(at Server)",el=/(^|@)\S+:\d+/,Hi=/^\s*at .*(\S+:\d+|\(native\))/m,tl=/^(eval@)?(\[native code\])?$/;var _i=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=Si(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(el)){let i=ki(r,void 0)[0];i&&o.push(i)}return lr(o,t)}return e.match(Hi)?Si(e,t):ki(e,t)},Ii=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},lr=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e;var Si=(e,t)=>lr(e.split(`
`).filter(n=>!!n.match(Hi)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=Ii(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}});var ki=(e,t)=>lr(e.split(`
`).filter(n=>!n.match(tl)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,s=Ii(o.replace(r,""));return{functionName:a,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:o}}});var nl=44,Mi="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ol=new Uint8Array(64),Di=new Uint8Array(128);for(let e=0;e<Mi.length;e++){let t=Mi.charCodeAt(e);ol[e]=t,Di[t]=e}function Xt(e,t){let n=0,o=0,r=0;do r=Di[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function Pi(e,t){return e.pos>=t?!1:e.peek()!==nl}var rl=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};function Fi(e){let{length:t}=e,n=new rl(e),o=[],r=0,i=0,a=0,s=0,c=0;do{let d=n.indexOf(";"),u=[],p=!0,m=0;for(r=0;n.pos<d;){let f;r=Xt(n,r),r<m&&(p=!1),m=r,Pi(n,d)?(i=Xt(n,i),a=Xt(n,a),s=Xt(n,s),Pi(n,d)?(c=Xt(n,c),f=[r,i,a,s,c]):f=[r,i,a,s]):f=[r],u.push(f),n.pos++}p||il(u),o.push(u),n.pos=d+1}while(n.pos<=t);return o}function il(e){e.sort(al)}function al(e,t){return e[0]-t[0]}var zi=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,sl=/^data:application\/json[^,]+base64,/,ll=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,Vi=typeof WeakRef<"u",Kt=new Map,Hn=new Map,cl=e=>Vi&&e instanceof WeakRef,Ni=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let u of r)if(u[0]<=o)i=u;else break;if(!i||i.length<4)return null;let[,a,s,c]=i;if(a===void 0||s===void 0||c===void 0)return null;let d=t[a];return d?{columnNumber:c,fileName:d,lineNumber:s+1}:null},ul=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return Ni(o.map.mappings,o.map.sources,r,i)}return Ni(e.mappings,e.sources,t-1,n)},dl=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(ll);a&&(o=a[1]||a[2])}if(!o)return null;let r=zi.test(o);if(!(sl.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},pl=e=>({file:e.file,mappings:Fi(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),ml=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:Fi(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},Ri=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(zi);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},fl=async(e,t=fetch)=>{if(!Ri(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=dl(e,n);if(!o||!Ri(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?ml(i):pl(i)}catch{return null}},gl=async(e,t=!0,n)=>{if(t&&Kt.has(e)){let i=Kt.get(e);if(i==null)return null;if(cl(i)){let a=i.deref();if(a)return a;Kt.delete(e)}else return i}if(t&&Hn.has(e))return Hn.get(e);let o=fl(e,n);t&&Hn.set(e,o);let r=await o;return t&&Hn.delete(e),t&&(r===null?Kt.set(e,null):Kt.set(e,Vi?new WeakRef(r):r)),r},hl=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await gl(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=ul(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),yl=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",bl=()=>{let e=ht();for(let t of[...Array.from(je),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},Li=e=>{for(let t of je){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},_e=e=>`
    in ${e}`,vl=(e,t)=>{let n=_e(e);return t&&(n+=` (at ${t})`),n},ar=!1,sr=(e,t)=>{if(!e||ar)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,ar=!0;let o=bl();Li(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let u;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(m){u=m}Reflect.construct(e,[],p)}else{try{p.call()}catch(m){u=m}e.call(p.prototype)}}else{try{throw Error()}catch(m){u=m}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&u instanceof Error&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,d]=s.DetermineComponentFrameRoot();if(c&&d){let u=c.split(`
`),p=d.split(`
`),m=0,f=0;for(;m<u.length&&!u[m].includes("DetermineComponentFrameRoot");)m++;for(;f<p.length&&!p[f].includes("DetermineComponentFrameRoot");)f++;if(m===u.length||f===p.length)for(m=u.length-1,f=p.length-1;m>=1&&f>=0&&u[m]!==p[f];)f--;for(;m>=1&&f>=0;m--,f--)if(u[m]!==p[f]){if(m!==1||f!==1)do if(m--,f--,f<0||u[m]!==p[f]){let g=`
${u[m].replace(" at new "," at ")}`,b=we(e);return b&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",b)),g}while(m>=1&&f>=0);break}}}finally{ar=!1,Error.prepareStackTrace=n,Li(o),console.error=r,console.warn=i}let a=e?we(e):"";return a?_e(a):""},xl=(e,t)=>{let n=e.tag,o="";switch(n){case Jo:o=_e("Activity");break;case Go:o=sr(e.type,!0);break;case Yo:o=sr(e.type.render,!1);break;case Bo:case Uo:o=sr(e.type,!1);break;case Wo:case qo:case Zo:o=_e(e.type);break;case Xo:o=_e("Lazy");break;case jo:o=e.child!==t&&t!==null?_e("Suspense Fallback"):_e("Suspense");break;case Ko:o=_e("SuspenseList");break;case Qo:o=_e("ViewTransition");break;default:return""}return o},Cl=e=>{try{let t="",n=e,o=null;do{t+=xl(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=vl(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},wl=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},El=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),Tl=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,Sl=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!El(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>Tl(a,o))||(i.push(o),t.set(r,i))}return t},kl=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace($i,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},Ml=e=>{let t=[];return er(e,n=>{if(!yl(n))return;let o=typeof n.type=="string"?n.type:we(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:_i(wl(n._debugStack?.stack))})},!0),t},yt=async(e,t=!0,n)=>{let o=Ml(e),r=_i(Cl(e)),i=Sl(o),a=new Map;return hl(r.map(s=>s.source?.includes($i)??!1?kl(s,i,a):s).filter((s,c,d)=>{if(c===0)return!0;let u=d[c-1];return s.functionName!==u.functionName}),t,n)};var Oi=e=>e.split("/").filter(Boolean).length,Pl=e=>e.split("/").filter(Boolean)[0]??null,Nl=e=>{let t=e.indexOf("/",1);if(t===-1||Oi(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!Ai.test(n)||Oi(n)<2)return e;let o=Pl(n);return!o||o.startsWith("@")||o.length>4?e:n},rt=e=>{if(!e||Zs.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=Nl(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),s=i.indexOf(":");t=a!==-1&&(s===-1||a<s)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of qs)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if(Ti.test(t)){let i=t.match(Ti);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Qs.test(i)&&(t=t.slice(0,r))}return t},bt=e=>{let t=rt(e);return!(!t||!Ai.test(t)||Js.test(t))};var Rl=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);function vt(e){return!!(Rl.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function Ll(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}var Ol=50,_n=.9,Al=2147483600,$l=1e3,qt=new WeakMap;function cr(){qt=new WeakMap}function Hl(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function _l(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=Al}function Il(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<_n||o.height/window.innerHeight<_n)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>$l}function Zt(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&Ll(e)||e.closest("#sketch-ui-root")||e instanceof HTMLElement&&e.hasAttribute("data-sketch-ui-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-sketch-ui-ghost"))return!1;let n=performance.now(),o=qt.get(e);if(o&&n-o.timestamp<Ol)return o.isValid;let r=window.getComputedStyle(e);return Hl(e,r)?e.clientWidth/window.innerWidth>=_n&&e.clientHeight/window.innerHeight>=_n&&(_l(r)||Il(e,r))?(qt.set(e,{isValid:!1,timestamp:n}),!1):(qt.set(e,{isValid:!0,timestamp:n}),!0):(qt.set(e,{isValid:!1,timestamp:n}),!1)}var Dl=.75,Bi=32,In=3,Dn=20,Gi=100,he=1;function xt(e,t,n){return Math.min(n,Math.max(t,e))}function Fl(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,s=o+e.width/2,c=r+e.height/2,d=xt(Math.ceil(e.width/Bi),In,Dn),u=xt(Math.ceil(e.height/Bi),In,Dn);if(d*u>Gi){let g=Math.sqrt(Gi/(d*u));d=xt(Math.floor(d*g),In,Dn),u=xt(Math.floor(u*g),In,Dn)}let p=new Set,m=[],f=(g,b)=>{let x=xt(Math.round(g),0,t-1),R=xt(Math.round(b),0,n-1),_=`${x}:${R}`;p.has(_)||(p.add(_),m.push({x,y:R}))};f(o+he,r+he),f(i-he,r+he),f(o+he,a-he),f(i-he,a-he),f(s,r+he),f(s,a-he),f(o+he,c),f(i-he,c),f(s,c);for(let g=0;g<d;g++){let b=o+(g+.5)/d*e.width;for(let x=0;x<u;x++)f(b,r+(x+.5)/u*e.height)}return m}function Wi(e,t=Zt,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=Fl(e);for(let c of i)for(let d of document.elementsFromPoint(c.x,c.y))r.add(d);let a=[];for(let c of r){if(!t(c))continue;let d=c.getBoundingClientRect();if(d.width<=0||d.height<=0)continue;let u={left:d.left,top:d.top,right:d.left+d.width,bottom:d.top+d.height};if(n){let p=Math.max(o.left,u.left),m=Math.max(o.top,u.top),f=Math.min(o.right,u.right),g=Math.min(o.bottom,u.bottom),b=Math.max(0,f-p)*Math.max(0,g-m),x=d.width*d.height;x>0&&b/x>=Dl&&a.push(c)}else o.left<u.right&&o.right>u.left&&o.top<u.bottom&&o.bottom>u.top&&a.push(c)}let s=a.filter(c=>!a.some(d=>d!==c&&d.contains(c)));return s.sort((c,d)=>{let u=c.compareDocumentPosition(d);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0}),s}U();function Ct(e,t,n){return e+(t-e)*n}U();var zl=.35,Yi=.3,Fn=.5,Vl=2,oe=null,W=null,ur=0,dr=0,Qt=1,wt=null,ee=null,F=null,B=[],Jt=l.accent,Bl="rgba(162,89,255,0.08)",ji="rgba(162,89,255,0.15)",Gl=4,Ui=10,Wl="#ffffff",Yl=Jt,jl=1.5,fr=!0;function Ki(){let e=K();e&&(oe=document.createElement("canvas"),oe.setAttribute("data-sketch-ui-ghost","true"),oe.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(oe),gr(),window.addEventListener("resize",gr))}function en(e,t=4){if(!e){ee&&(ee.targetOpacity=0,it());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!ee||!ee.initialized?ee=yr(n,t):(ee.target=n,ee.borderRadius=t,ee.targetOpacity=1),it()}function at(e,t=4){if(!e){F&&(F.targetOpacity=0,it());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!F||!F.initialized?F=yr(n,t):(F.target=n,F.borderRadius=t,F.targetOpacity=1),it()}function qi(e){for(F=null;B.length>e.length;)B.pop();for(let t=0;t<e.length;t++){let n=e[t],o={x:n.rect.left,y:n.rect.top,w:n.rect.width,h:n.rect.height};t<B.length?(B[t].target=o,B[t].borderRadius=n.borderRadius,B[t].targetOpacity=1):B.push(yr(o,n.borderRadius))}it()}function tn(){B=[],it()}function hr(e,t){if(!fr)return null;let n=Ji();if(!n)return null;let o=ta(n.x,n.y,n.w,n.h);for(let r of o){let i=e-r.x,a=t-r.y;if(i*i+a*a<=Ui*Ui)return r.corner}return null}function zn(){return Ji()}function Zi(){wt!==null&&cancelAnimationFrame(wt),window.removeEventListener("resize",gr),oe?.remove(),oe=null,W=null,ee=null,F=null,B=[]}function Ji(){if(B.length>1)return Qi(B);if(F&&F.opacity>=.5){let{x:e,y:t,w:n,h:o}=F.current;return{x:e,y:t,w:n,h:o}}if(B.length===1){let{x:e,y:t,w:n,h:o}=B[0].current;return{x:e,y:t,w:n,h:o}}return null}function Qi(e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,r=-1/0;for(let i of e){let{x:a,y:s,w:c,h:d}=i.current;a<t&&(t=a),s<n&&(n=s),a+c>o&&(o=a+c),s+d>r&&(r=s+d)}return{x:t,y:n,w:o-t,h:r-n}}function yr(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function gr(){oe&&(Qt=Math.max(window.devicePixelRatio||1,Vl),ur=window.innerWidth,dr=window.innerHeight,oe.width=ur*Qt,oe.height=dr*Qt,oe.style.width=`${ur}px`,oe.style.height=`${dr}px`,W=oe.getContext("2d"),it())}function it(){wt===null&&(wt=requestAnimationFrame(ea))}function ea(){if(wt=null,!W||!oe)return;let e=!1;ee?.initialized&&(pr(ee,zl)&&(e=!0),ee.opacity<.01&&ee.targetOpacity===0&&(ee=null)),F?.initialized&&(pr(F,Yi)&&(e=!0),F.opacity<.01&&F.targetOpacity===0&&(F=null));for(let t=B.length-1;t>=0;t--){let n=B[t];n.initialized&&pr(n,Yi)&&(e=!0),n.opacity<.01&&n.targetOpacity===0&&B.splice(t,1)}if(W.setTransform(1,0,0,1,0,0),W.clearRect(0,0,oe.width,oe.height),W.setTransform(Qt,0,0,Qt,0,0),ee&&mr(W,ee,Jt,Bl),F&&(mr(W,F,Jt,ji),fr&&Xi(W,F.current,F.opacity)),B.length>0){for(let t of B)mr(W,t,Jt,ji);if(fr&&B.length>0){let t=Qi(B);t&&t.w>=24&&t.h>=24&&(B.length>1&&(W.globalAlpha=.6,W.beginPath(),W.rect(t.x,t.y,t.w,t.h),W.strokeStyle=Jt,W.lineWidth=1,W.setLineDash([4,4]),W.stroke(),W.setLineDash([]),W.globalAlpha=1),Xi(W,t,1))}}e&&(wt=requestAnimationFrame(ea))}function pr(e,t){let n=e.current,o=e.target,r=Ct(n.x,o.x,t),i=Ct(n.y,o.y,t),a=Ct(n.w,o.w,t),s=Ct(n.h,o.h,t),c=Ct(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<Fn&&Math.abs(i-o.y)<Fn&&Math.abs(a-o.w)<Fn&&Math.abs(s-o.h)<Fn&&Math.abs(c-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=s,e.opacity=c,!0)}function mr(e,t,n,o){let{x:r,y:i,w:a,h:s}=t.current;if(a<=0||s<=0)return;let c=Math.min(t.borderRadius,a/2,s/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,a,s,c):e.rect(r,i,a,s),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function ta(e,t,n,o){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+n,y:t},{corner:"br",x:e+n,y:t+o},{corner:"bl",x:e,y:t+o}]}function Xi(e,t,n){if(t.w<24||t.h<24)return;e.globalAlpha=n;let o=ta(t.x,t.y,t.w,t.h);for(let r of o)e.beginPath(),e.arc(r.x,r.y,Gl,0,Math.PI*2),e.fillStyle=Wl,e.fill(),e.strokeStyle=Yl,e.lineWidth=jl,e.stroke();e.globalAlpha=1}var Ul=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],Xl=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],Kl=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],ql=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],Zl=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],Et=[...Ul,...Xl,...Kl,...ql,...Zl];U();var Jl=new Set(["auto","none","normal","inherit","initial"]);function na(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let s=document.createElement("input");s.type="text",s.className="prop-input",s.style.cssText="width:60px; cursor:text;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${T};`,a.appendChild(s),a.appendChild(c);let d=new Map(t);function u(){return d.get(r.key)??r.defaultValue}function p(m){let f=parseFloat(m);s.value=isNaN(f)?m:String(f);try{let b=Zr(i,m).find(x=>x.cssValue===m);b?.token?c.textContent=`${r.tailwindPrefix}-${b.token}`:c.textContent=""}catch{c.textContent=""}}return s.addEventListener("blur",()=>{let m=s.value.trim(),f=parseFloat(m);if(isNaN(f))Jl.has(m)?(d.set(r.key,m),p(m),n(r.key,m),o()):p(u());else{let b=m.match(/(px|rem|em|%|vw|vh|ch)$/)?m:`${f}px`;d.set(r.key,b),p(b),n(r.key,b),o()}}),s.addEventListener("keydown",m=>{m.key==="Enter"?s.blur():m.key==="Escape"&&(p(u()),s.blur())}),p(u()),{element:a,setValue(m,f){m===r.key&&(d.set(m,f),p(f))},destroy(){}}}U();function oa(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${l.bgTertiary};
    border-radius:${N.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let s=t.get(r.key)??r.defaultValue,c=[];function d(u){s=u;for(let{btn:p,value:m,opt:f}of c){let g=m===u;p.style.background=g?l.accent:"transparent",p.style.color=g?l.textOnAccent:l.textSecondary,p.title=g&&f.tailwindValue?`${f.label} (${f.tailwindValue})`:f.label}}for(let u of i){let p=document.createElement("button");p.style.cssText=`
      display:flex;
      align-items:center;
      justify-content:center;
      padding:2px 6px;
      border:none;
      border-radius:${N.xs};
      font-family:${T};
      font-size:10px;
      cursor:pointer;
      background:transparent;
      color:${l.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g," "),p.textContent=u.icon??u.label,p.title=u.label,p.addEventListener("click",()=>{d(u.value),n(r.key,u.value),o()}),c.push({btn:p,value:u.value,opt:u}),a.appendChild(p)}return d(s),{element:a,setValue(u,p){u===r.key&&d(p)},destroy(){}}}U();U();function Vn(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,s=0;a!==0&&(r===t?s=((n-o)/a+(n<o?6:0))*60:r===n?s=((o-t)/a+2)*60:s=((t-n)/a+4)*60);let c=r===0?0:a/r*100,d=r*100;return{h:s,s:c,v:d}}function Bn(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),s=o*(1-i*n),c=o*(1-(1-i)*n),d,u,p;switch(r%6){case 0:d=o,u=c,p=a;break;case 1:d=s,u=o,p=a;break;case 2:d=a,u=o,p=c;break;case 3:d=a,u=s,p=o;break;case 4:d=c,u=a,p=o;break;case 5:d=o,u=a,p=s;break;default:d=0,u=0,p=0}let m=f=>Math.round(f*255).toString(16).padStart(2,"0");return`#${m(d)}${m(u)}${m(p)}`}var Ue=null;function st(e){Ie();let t=K();if(!t)return;let n=document.createElement("div");n.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${L.lg};
    border-radius: ${N.md};
    font-family: ${T};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${k.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let y=n.getBoundingClientRect();y.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-y.width-8}px`),y.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-y.height-8}px`),n.style.opacity="1"});let o=Vn(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let y=Ql(["Fill","Text"],0,S=>{r=S===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(y)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),s=document.createElement("div");s.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${L.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(s),n.appendChild(c);function d(){let y=o.h,S=a.createLinearGradient(0,0,176,0);S.addColorStop(0,`hsl(${y}, 0%, 100%)`),S.addColorStop(1,`hsl(${y}, 100%, 50%)`),a.fillStyle=S,a.fillRect(0,0,176,120);let Y=a.createLinearGradient(0,0,0,120);Y.addColorStop(0,"rgba(0,0,0,0)"),Y.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=Y,a.fillRect(0,0,176,120);let de=o.s/100*176,We=(1-o.v/100)*120;s.style.left=`${de}px`,s.style.top=`${We}px`}let u=!1;i.addEventListener("mousedown",y=>{u=!0,p(y)});function p(y){let S=i.getBoundingClientRect(),Y=Math.max(0,Math.min(176,y.clientX-S.left)),de=Math.max(0,Math.min(120,y.clientY-S.top));o.s=Y/176*100,o.v=(1-de/120)*100,d(),I()}let m=document.createElement("canvas");m.width=176,m.height=14,m.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let f=m.getContext("2d"),g=document.createElement("div");g.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${L.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let b=document.createElement("div");b.style.cssText="position:relative;width:176px;height:14px;",b.appendChild(m),b.appendChild(g),n.appendChild(b);function x(){let y=f.createLinearGradient(0,0,176,0);for(let S=0;S<=6;S++)y.addColorStop(S/6,`hsl(${S*60}, 100%, 50%)`);f.fillStyle=y,f.fillRect(0,0,176,14),g.style.left=`${o.h/360*176}px`}let R=!1;m.addEventListener("mousedown",y=>{R=!0,_(y)});function _(y){let S=m.getBoundingClientRect(),Y=Math.max(0,Math.min(176,y.clientX-S.left));o.h=Y/176*360,x(),d(),I()}let A=document.createElement("input");A.type="text",A.value=Bn(o),A.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: ${N.sm};
    color: ${l.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,A.addEventListener("keydown",y=>{y.key==="Enter"&&A.blur(),y.stopPropagation()}),A.addEventListener("blur",()=>{let y=A.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(y)){let S=y.startsWith("#")?y:`#${y}`;o=Vn(S),d(),x(),I()}else A.value=Bn(o)}),n.appendChild(A);let V=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],C=document.createElement("div");C.style.cssText="display:flex;gap:4px;justify-content:center;";for(let y of V){let S=document.createElement("button");S.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${y};
      border: 1px solid ${l.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${k.fast};
    `,S.addEventListener("mouseenter",()=>{S.style.boxShadow=L.sm}),S.addEventListener("mouseleave",()=>{S.style.boxShadow="none"}),S.addEventListener("click",()=>{o=Vn(y),d(),x(),A.value=y,I()}),C.appendChild(S)}n.appendChild(C);function I(){let y=Bn(o);A.value=y,e.onColorChange(y)}t.appendChild(n),Ue=n,d(),x();let re=y=>{u&&p(y),R&&_(y)},ie=()=>{u=!1,R=!1};document.addEventListener("mousemove",re),document.addEventListener("mouseup",ie);let P=y=>{y.key==="Escape"&&Ie()};document.addEventListener("keydown",P,!0);let G=y=>{Ue&&!y.composedPath().includes(Ue)&&Ie()};setTimeout(()=>document.addEventListener("mousedown",G,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",re),document.removeEventListener("mouseup",ie),document.removeEventListener("keydown",P,!0),document.removeEventListener("mousedown",G,!0)},n._onClose=e.onClose}function Ie(){Ue&&(Ue._cleanup?.(),Ue._onClose?.(),Ue.remove(),Ue=null)}function Ql(e,t,n){let o=document.createElement("div");o.style.cssText=`
    display: flex;
    background: ${l.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;let r=[];for(let i=0;i<e.length;i++){let a=document.createElement("button");a.textContent=e[i],a.style.cssText=`
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i===t?l.bgPrimary:"transparent"};
      box-shadow: ${i===t?L.sm:"none"};
      color: ${i===t?l.textPrimary:l.textSecondary};
      font-family: ${T}; font-size: 12px; cursor: pointer;
      transition: background ${k.fast}, color ${k.fast};
    `,a.addEventListener("click",()=>{r.forEach((s,c)=>{s.style.background=c===i?l.bgPrimary:"transparent",s.style.boxShadow=c===i?L.sm:"none",s.style.color=c===i?l.textPrimary:l.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var br=null;function ec(){return br||(br=document.createElement("canvas").getContext("2d")),br}function ra(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${N.sm};
    border:1px solid ${l.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("input");s.type="text",s.placeholder="#rrggbb",s.className="prop-input",s.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${T};`,i.appendChild(a),i.appendChild(s),i.appendChild(c);let d=t.get(r.key)??r.defaultValue,u=!1;function p(g){let b=g.trim().toLowerCase();if(b==="transparent")return"transparent";if(b==="inherit"||b==="currentcolor"||b==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(b))return b;let x=ec();x.fillStyle="#000000",x.fillStyle=b;let R=x.fillStyle;if(R.startsWith("#"))return R;let _=R.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(_){let A=parseInt(_[1],10),V=parseInt(_[2],10),C=parseInt(_[3],10);return`#${((1<<24)+(A<<16)+(V<<8)+C).toString(16).slice(1)}`}return"#000000"}function m(g){d=g,s.value=g,g==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=g;try{let b=zt(),x=Mn(g,b.colorsReverse);x?c.textContent=`${r.tailwindPrefix??"bg"}-${x}`:c.textContent=""}catch{c.textContent=""}}function f(){if(u)return;let g=s.value.trim();if(!g){m(d);return}let b=p(g);m(b),n(r.key,b),o()}return a.addEventListener("click",()=>{if(u){Ie(),u=!1;return}let g=a.getBoundingClientRect();u=!0,st({initialColor:p(d),position:{x:g.left-210,y:g.top},showPropertyToggle:!1,onColorChange:b=>{m(b),n(r.key,b)},onClose:()=>{u=!1,o()}})}),s.addEventListener("keydown",g=>{g.key==="Enter"?(f(),s.blur()):g.key==="Escape"&&(m(d),s.blur())}),s.addEventListener("blur",()=>{f()}),s.addEventListener("input",()=>{let g=s.value.trim(),b=p(g);a.style.background=b}),m(d),{element:i,setValue(g,b){g===r.key&&m(b)},destroy(){u&&(Ie(),u=!1)}}}U();function ia(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function aa(e,t,n,o){let r=new Map(t),i=[];for(let E of e){let w=ia(E.key);w&&i.push({descriptor:E,...w})}let a=document.createElement("div");a.style.cssText=`
    display:flex;
    flex-direction:column;
    gap:4px;
    font-family:${T};
    font-size:10px;
    color:${l.textSecondary};
    position:relative;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("div");s.style.cssText="position:relative; padding:4px;";let c=document.createElement("div");c.style.cssText=`
    background:${l.marginBoxBg};
    border:1px dashed ${l.marginBoxBorder};
    border-radius:${N.sm};
    padding:10px;
    position:relative;
  `.trim().replace(/\n\s*/g," ");let d=document.createElement("div");d.style.cssText=`
    background:${l.paddingBoxBg};
    border:1px dashed ${l.paddingBoxBorder};
    border-radius:${N.sm};
    padding:8px;
    position:relative;
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let u=document.createElement("div");u.style.cssText=`
    grid-row:2;
    grid-column:2;
    text-align:center;
    color:${l.textTertiary};
    font-size:9px;
    padding:4px 6px;
    background:${l.bgSecondary};
    border-radius:3px;
    user-select:none;
  `.trim().replace(/\n\s*/g," "),u.textContent="content";let p=[];function m(E){let w=document.createElement("span"),pe=r.get(E.key)??E.defaultValue;return w.textContent=_(pe),w.title=E.label,w.style.cssText=`
      cursor:pointer;
      color:${l.textPrimary};
      font-size:10px;
      font-family:${T};
      padding:1px 4px;
      border-radius:3px;
      text-align:center;
      transition:background 100ms ease;
      display:inline-block;
      min-width:18px;
    `.trim().replace(/\n\s*/g," "),w.addEventListener("mouseenter",()=>{w.style.background=l.bgTertiary}),w.addEventListener("mouseleave",()=>{(document.activeElement!==f||f.dataset.key!==E.key)&&(w.style.background="transparent")}),w.addEventListener("click",()=>{x(E,w)}),p.push({key:E.key,span:w,descriptor:E}),w}let f=document.createElement("input");f.type="text",f.className="prop-input",f.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(f);let g=null,b=null;function x(E,w){g&&g!==E&&R(),g=E,b=w,f.dataset.key=E.key;let pe=r.get(E.key)??E.defaultValue;f.value=_(pe);let Q=0,tt=0,Ye=w;for(;Ye&&Ye!==a;)Q+=Ye.offsetLeft,tt+=Ye.offsetTop,Ye=Ye.offsetParent;f.style.display="block",f.style.left=`${Q}px`,f.style.top=`${tt}px`;let qr=w.getBoundingClientRect();f.style.width=`${Math.max(40,qr.width+10)}px`,f.focus(),f.select()}function R(){if(!g||!b)return;let E=f.value.trim(),w=g,pe=b,Q,tt=parseFloat(E),Ye=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(tt)?Ye.has(E)?Q=E:Q=r.get(w.key)??w.defaultValue:Q=E.match(/(px|rem|em|%|vw|vh|ch)$/)?E:`${tt}px`,r.set(w.key,Q),pe.textContent=_(Q),pe.style.background="transparent",f.style.display="none",f.dataset.key="",g=null,b=null,n(w.key,Q),o()}f.addEventListener("keydown",E=>{if(E.key==="Enter")R();else if(E.key==="Escape"){if(g&&b){let w=r.get(g.key)??g.defaultValue;b.textContent=_(w)}f.style.display="none",f.dataset.key="",g=null,b=null}}),f.addEventListener("blur",()=>{R()});function _(E){let w=parseFloat(E);return isNaN(w)?E:w===Math.round(w)?String(Math.round(w)):E}function A(E){let w=document.createElement("span");return w.textContent=E,w.style.cssText=`
      font-size:9px;
      color:${l.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),w}function V(E,w){return i.find(pe=>pe.layer===E&&pe.side===w)}function C(E,w){let pe=V(E,w);if(!pe){let Q=document.createElement("span");return Q.textContent="-",Q.style.cssText=`text-align:center; color:${l.textTertiary};`,Q}return m(pe.descriptor)}let I=C("padding","top");I.style.gridRow="1",I.style.gridColumn="2",I.style.textAlign="center";let re=C("padding","left");re.style.gridRow="2",re.style.gridColumn="1";let ie=C("padding","right");ie.style.gridRow="2",ie.style.gridColumn="3";let P=C("padding","bottom");P.style.gridRow="3",P.style.gridColumn="2",P.style.textAlign="center",u.style.gridRow="2",u.style.gridColumn="2",d.appendChild(I),d.appendChild(re),d.appendChild(u),d.appendChild(ie),d.appendChild(P);let G=document.createElement("div");G.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let y=C("margin","top");y.style.gridRow="1",y.style.gridColumn="2",y.style.textAlign="center";let S=C("margin","left");S.style.gridRow="2",S.style.gridColumn="1";let Y=C("margin","right");Y.style.gridRow="2",Y.style.gridColumn="3";let de=C("margin","bottom");de.style.gridRow="3",de.style.gridColumn="2",de.style.textAlign="center";let We=document.createElement("div");We.style.cssText="grid-row:2; grid-column:2;",We.appendChild(d),G.appendChild(y),G.appendChild(S),G.appendChild(We),G.appendChild(Y),G.appendChild(de);let Sn=A("margin"),Is=A("padding"),kn=document.createElement("div");return kn.style.cssText="display:flex; gap:8px; padding:0 4px;",kn.appendChild(Sn),kn.appendChild(Is),c.appendChild(G),s.appendChild(c),a.appendChild(kn),a.appendChild(s),{element:a,setValue(E,w){if(!ia(E))return;r.set(E,w);let Q=p.find(tt=>tt.key===E);Q&&(Q.span.textContent=_(w))},destroy(){}}}U();var Gn=new Set;function sa(e){return Gn.has(e)}var Wn=[];function la(e){return Wn.push(e),()=>{let t=Wn.indexOf(e);t>=0&&Wn.splice(t,1)}}var tc={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},nc={"number-scrub":na,segmented:oa,"color-swatch":ra,"box-model":aa},oc=`
  .prop-section {
    border-bottom: 1px solid ${l.border};
  }
  .prop-section:last-child {
    border-bottom: none;
  }
  .prop-section-header {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: ${l.bgSecondary};
    cursor: pointer;
    user-select: none;
    font-family: ${T};
    font-size: 11px;
    font-weight: 600;
    color: ${l.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .prop-section-header:hover {
    background: ${l.bgTertiary};
  }
  .prop-section-chevron {
    width: 12px;
    height: 12px;
    transition: transform 150ms ease;
    color: ${l.textTertiary};
  }
  .prop-section-chevron.collapsed {
    transform: rotate(-90deg);
  }
  .prop-section-body {
    padding: 10px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .prop-section-body.collapsed {
    display: none;
  }
  .prop-input {
    background: ${l.bgTertiary};
    border: 1px solid ${l.border};
    border-radius: ${N.xs};
    padding: 4px 6px;
    font-family: ${T};
    font-size: 11px;
    color: ${l.textPrimary};
    outline: none;
    box-sizing: border-box;
    transition: border-color ${k.fast}, box-shadow ${k.fast};
  }
  .prop-input:hover {
    border-color: ${l.borderStrong};
  }
  .prop-input:focus {
    border-color: ${l.accent};
    box-shadow: 0 0 0 2px ${l.focusRing};
  }
  .prop-control-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .prop-control-label {
    width: 48px;
    flex-shrink: 0;
    font-size: 10px;
    font-family: ${T};
    color: ${l.textTertiary};
    text-transform: capitalize;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .prop-control-value {
    flex: 1;
    min-width: 0;
  }
`;function rc(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function ic(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function ac(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}var sc=new Set(["flexDirection","justifyContent","alignItems","gap"]);function lc(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function vr(e,t,n,o){let r=document.createElement("div");r.className="prop-sections";let i=document.createElement("style");i.textContent=oc,r.appendChild(i);let a=[],s=ic(e);for(let[c,d]of s){let u=c==="layout"&&!lc(t)?d.filter(x=>!sc.has(x.key)):d;if(u.length===0)continue;let p=document.createElement("div");p.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${tc[c]}</span>${rc()}`;let f=document.createElement("div");f.className="prop-section-body";let g=Gn.has(c);if(g){let x=m.querySelector(".prop-section-chevron");x&&x.classList.add("collapsed"),f.classList.add("collapsed")}m.addEventListener("click",()=>{if(g=!g,g)Gn.add(c);else{Gn.delete(c);for(let R of Wn)R(c)}let x=m.querySelector(".prop-section-chevron");x&&x.classList.toggle("collapsed",g),f.classList.toggle("collapsed",g)}),p.appendChild(m);let b=ac(u);for(let x of b){let R=nc[x.controlType];if(!R)continue;let _=R(x.descriptors,t,n,o);if(x.descriptors.length>1||x.controlType==="box-model")f.appendChild(_.element);else{let A=document.createElement("div");A.className="prop-control-row";let V=document.createElement("span");V.className="prop-control-label",V.textContent=x.descriptors[0].label,V.title=x.descriptors[0].label;let C=document.createElement("div");C.className="prop-control-value",C.appendChild(_.element),A.appendChild(V),A.appendChild(C),f.appendChild(A)}a.push(_)}p.appendChild(f),r.appendChild(p)}return{container:r,controls:a}}U();var cc=300,ca=260,ua=380,da="sketch-ui-sidebar-width",uc=4,dc=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${l.bgPrimary};
    border-left: 1px solid ${l.border};
    box-shadow: ${L.lg};
    z-index: 2147483645;
    font-family: ${T};
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform ${k.settle};
    overflow: hidden;
  }
  .prop-sidebar.visible {
    transform: translateX(0);
  }
  .prop-sidebar-resize {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${uc}px;
    cursor: col-resize;
    z-index: 1;
  }
  .prop-sidebar-resize:hover,
  .prop-sidebar-resize.active {
    background: ${l.accent};
    opacity: 0.3;
  }
  .prop-sidebar-header {
    padding: 12px 16px;
    border-bottom: 1px solid ${l.border};
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }
  .prop-sidebar-header-info {
    flex: 1;
    min-width: 0;
  }
  .prop-sidebar-close {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    cursor: pointer;
    color: ${l.textTertiary};
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${N.sm};
  }
  .prop-sidebar-close:hover {
    background: ${l.bgTertiary};
    color: ${l.textPrimary};
  }
  .prop-sidebar-component-name {
    font-size: 13px;
    font-weight: 600;
    color: ${l.textPrimary};
    margin: 0 0 4px;
    line-height: 1.3;
  }
  .prop-sidebar-file-path {
    font-size: 11px;
    color: ${l.textTertiary};
    margin: 0;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: rtl;
    text-align: left;
  }
  .prop-sidebar-saving-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${l.accent};
    margin-left: 6px;
    vertical-align: middle;
    opacity: 0;
    transition: opacity 150ms ease;
  }
  .prop-sidebar-saving-dot.active {
    opacity: 1;
    animation: prop-saving-pulse 0.8s ease-in-out infinite;
  }
  @keyframes prop-saving-pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  .prop-sidebar-warning {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: ${l.dangerSoft};
    border-bottom: 1px solid ${l.danger};
    font-family: ${T};
    font-size: 11px;
    color: ${l.danger};
    flex-shrink: 0;
  }
  .prop-sidebar-warning-text {
    flex: 1;
    font-weight: 500;
  }
  .prop-sidebar-warning-btn {
    border: 1px solid ${l.danger};
    background: none;
    color: ${l.danger};
    font-family: ${T};
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: ${N.xs};
    cursor: pointer;
    white-space: nowrap;
  }
  .prop-sidebar-warning-btn:hover {
    background: ${l.danger};
    color: #ffffff;
  }
  .prop-sidebar-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .prop-sidebar-content::-webkit-scrollbar {
    width: 6px;
  }
  .prop-sidebar-content::-webkit-scrollbar-track {
    background: transparent;
  }
  .prop-sidebar-content::-webkit-scrollbar-thumb {
    background: ${l.borderStrong};
    border-radius: 3px;
  }
`;function pc(){try{let e=localStorage.getItem(da);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=ca&&t<=ua)return t}}catch{}return Math.min(cc,Math.floor(window.innerWidth*.22))}function mc(e){try{localStorage.setItem(da,String(e))}catch{}}function pa(e,t){let n=document.createElement("style");n.textContent=dc,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${pc()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let s=document.createElement("div");s.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let d=document.createElement("div");d.className="prop-sidebar-file-path",a.appendChild(s),a.appendChild(d);let u=document.createElement("button");u.className="prop-sidebar-close",u.title="Close panel",u.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>',i.appendChild(a),i.appendChild(u),o.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",o.appendChild(p);let m=document.createElement("div");m.className="prop-sidebar-content",o.appendChild(m),e.appendChild(o);let f=!1,g=0,b=0;r.addEventListener("pointerdown",P=>{P.preventDefault(),P.stopPropagation(),f=!0,g=P.clientX,b=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(P.pointerId)}),r.addEventListener("pointermove",P=>{if(!f)return;let G=g-P.clientX,y=Math.max(ca,Math.min(ua,b+G));o.style.width=`${y}px`});let x=()=>{f&&(f=!1,r.classList.remove("active"),mc(o.offsetWidth))};r.addEventListener("pointerup",x),r.addEventListener("pointercancel",x),o.addEventListener("pointerdown",P=>P.stopPropagation()),o.addEventListener("mousedown",P=>P.stopPropagation()),o.addEventListener("click",P=>P.stopPropagation()),o.addEventListener("mouseup",P=>P.stopPropagation()),u.addEventListener("click",()=>{A(),t&&t()});let R=!1;function _(P,G,y,S){s.textContent=`<${P}>`,s.appendChild(c),d.textContent=`${G}:${y}`,d.title=`${G}:${y}`,m.innerHTML="",m.appendChild(S),R||(R=!0,o.offsetHeight,o.classList.add("visible"))}function A(){R&&(R=!1,o.classList.remove("visible"))}function V(P){m.innerHTML="",m.appendChild(P)}function C(P,G,y){p.innerHTML="";let S=document.createElement("span");S.className="prop-sidebar-warning-text",S.textContent=P;let Y=document.createElement("button");Y.className="prop-sidebar-warning-btn",Y.textContent=G,Y.addEventListener("click",de=>{de.stopPropagation(),y()}),p.appendChild(S),p.appendChild(Y),p.style.display="flex"}function I(){p.style.display="none",p.innerHTML=""}function re(){c.classList.add("active")}function ie(){c.classList.remove("active")}return{show:_,hide:A,isVisible:()=>R,getElement:()=>o,replaceContent:V,showWarning:C,clearWarning:I,showSaving:re,hideSaving:ie}}se();var Tr=new Map(Et.map(e=>[e.key,e]));var gc=new Set(["layout","spacing","size"]),ka=new Set(["typography","background"]),hc=5e3,h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map},lt=[],z,Ma,me=null,yc=300,ve=null,St=null,no=new MutationObserver(()=>{h.selectedElement&&!document.contains(h.selectedElement)&&(clearTimeout(Ma),Ma=setTimeout(()=>{bc()},80))});function bc(){let e=h.elementIdentity,t=h.componentInfo;if(!e||!t){Mt();return}let n=vc(e);if(n){kt(n,t);return}xc(e).then(o=>{o?kt(o,t):Mt()})}function vc(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=Ee(n);for(;o;){if(He(o)){let r=o._debugSource,i=we(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function xc(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=Ee(n);if(!o)continue;let r=await yt(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let s="";if(i.fileName){let c=rt(i.fileName);bt(c)&&(s=c)}if(s&&e.filePath.endsWith(s)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}function Cc(e,t){let n=getComputedStyle(e),o=new Map;for(let r of Et){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function wc(e){if(!h.selectedElement)return;let t=getComputedStyle(h.selectedElement);for(let n of Et){if(n.group!==e||h.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;h.currentValues.set(n.key,r),h.originalValues.get(n.key)===n.defaultValue&&h.originalValues.set(n.key,r);for(let i of lt)i.setValue(n.key,r)}}function sn(){for(let e of lt)e.destroy();lt=[]}function Pa(){if(!h.selectedElement||!h.componentInfo)return;sn();let{container:e,controls:t}=vr(Et,h.currentValues,ln,oo);lt=t,z.replaceContent(e)}function oo(){me&&clearTimeout(me),me=setTimeout(()=>{me=null,kr()},yc)}function Sr(){me&&(clearTimeout(me),me=null),St&&(St(),St=null),ve&&(clearTimeout(ve.timeoutId),ve=null),h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map}}function Na(e){z=pa(e,()=>{ro(),sn(),Sr()}),ei((t,n,o)=>{if(z&&z.hideSaving(),ve)if(clearTimeout(ve.timeoutId),t)ve=null;else{let{batch:r,previousOriginals:i}=ve;ve=null;for(let[a]of r){let s=i.get(a);s!==void 0&&h.originalValues.set(a,s)}if(h.selectedElement){for(let[a]of r){h.selectedElement.style[a]="",h.activeOverrides.delete(a);let s=h.originalValues.get(a);s!==void 0&&h.currentValues.set(a,s)}for(let a of lt)for(let[s]of r){let c=h.originalValues.get(s);c!==void 0&&a.setValue(s,c)}}if(z){let s={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";z.showWarning(s,"Dismiss",()=>z.clearWarning())}}else if(!t&&z){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";z.showWarning(i,"Dismiss",()=>z.clearWarning())}})}function kt(e,t){h.pendingBatch.size>0&&kr(),sn(),h.selectedElement=e,h.componentInfo=t,h.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(gc);for(let a of ka)sa(a)||n.add(a);let o=Cc(e,n);h.currentValues=o,h.originalValues=new Map(o),h.activeOverrides=new Map,h.pendingBatch=new Map,St&&St(),St=la(a=>{ka.has(a)&&wc(a)});let{container:r,controls:i}=vr(Et,h.currentValues,ln,oo);lt=i,no.disconnect(),no.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),z.show(t.componentName,t.filePath,t.lineNumber,r)}function ln(e,t){let n=Tr.get(e);if(!n||!h.selectedElement)return;h.selectedElement.style[n.key]=t,h.activeOverrides.set(e,t),h.currentValues.set(e,t);let o=zt(),r=n.tailwindScale+"Reverse",i=o[r],a=i?Mn(t,i):null;if(!a&&n.enumValues){let s=n.enumValues.find(c=>c.value===t);s&&(a=s.tailwindValue)}if(h.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:h.originalValues.get(e)||n.defaultValue}),e==="display")if(Pa(),t==="none"){let s=h.originalValues.get("display")||"block";z.showWarning("Element hidden","Restore",()=>{h.selectedElement&&(h.selectedElement.style.display=s),h.activeOverrides.delete("display"),h.currentValues.set("display",s),h.pendingBatch.delete("display"),Pa(),z.clearWarning()})}else z.clearWarning()}function kr(){if(h.pendingBatch.size===0||!h.componentInfo)return;let e=h.componentInfo.filePath,t=h.componentInfo.lineNumber,n=h.componentInfo.columnNumber-1;if(h.pendingBatch.size===1){let a=[...h.pendingBatch.values()][0],s=Tr.get(a.property);Pe({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:n,...a,framework:"tailwind",classPattern:s?.classPattern,standalone:s?.standalone})}else Pe({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:n,updates:[...h.pendingBatch.values()].map(a=>{let s=Tr.get(a.property);return{...a,classPattern:s?.classPattern,standalone:s?.standalone}}),framework:"tailwind"});h.selectedElement&&h.elementIdentity&&Ea({type:"propertyChange",elementIdentity:h.elementIdentity,element:h.selectedElement,overrides:[...h.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),z&&z.showSaving();let o=new Map;for(let[a]of h.pendingBatch)o.set(a,h.originalValues.get(a)||"");for(let[a,s]of h.pendingBatch)h.originalValues.set(a,s.value);let r=new Map(h.pendingBatch),i=setTimeout(()=>{ve&&ve.batch===r&&(ve=null,z&&z.hideSaving())},hc);ve={batch:r,previousOriginals:o,timeoutId:i},h.pendingBatch.clear()}function ro(){if(h.selectedElement){for(let[e]of h.activeOverrides)h.selectedElement.style[e]="";for(let[e,t]of h.originalValues)h.currentValues.set(e,t);for(let e of lt)for(let[t,n]of h.originalValues)e.setValue(t,n);h.activeOverrides.clear(),h.pendingBatch.clear()}}function Mt(){me&&(clearTimeout(me),me=null),no.disconnect(),ro(),sn(),z&&z.hide(),Sr()}function Ra(){me&&(clearTimeout(me),me=null),no.disconnect(),kr(),sn(),z&&z.hide(),Sr()}function La(){return h.activeOverrides.size>0}se();se();Pt();U();var Rc="2147483644",Or=null;function Va(){Or=Ha(Lc)}function Lc(e){for(let t of Ne().values())e?(e.appendChild(t.cloneEl),t.cloneEl.style.position="absolute",t.cloneEl.style.left=`${t.currentPos.x}px`,t.cloneEl.style.top=`${t.currentPos.y}px`,t.cloneEl.style.transform="",t.cloneEl.style.transformOrigin=""):(document.body.appendChild(t.cloneEl),t.cloneEl.style.position="fixed",t.cloneEl.style.left=`${t.currentPos.x}px`,t.cloneEl.style.top=`${t.currentPos.y}px`,t.cloneEl.style.transform="",t.cloneEl.style.transformOrigin="")}function io(e,t){let n=e.getBoundingClientRect(),{scale:o,offsetX:r,offsetY:i}=Re(),a=e.cloneNode(!0);a.setAttribute("data-sketch-ui-ghost","true"),a.style.width=`${n.width/o}px`,a.style.height=`${n.height/o}px`,a.style.zIndex=Rc,a.style.pointerEvents="none",a.style.margin="0",a.style.boxSizing="border-box",a.style.boxShadow=L.sm;let s=(n.left-r)/o,c=(n.top-i)/o,d=Rr();d?(a.style.position="absolute",a.style.left=`${s}px`,a.style.top=`${c}px`,d.appendChild(a)):(a.style.position="fixed",a.style.left=`${n.left}px`,a.style.top=`${n.top}px`,a.style.transform=`scale(${o})`,a.style.transformOrigin="0 0",document.body.appendChild(a));let u=e.style.opacity||"",p=e.style.visibility||"",m=Zn();e.style.opacity=m?"0":"0.3",m&&(e.style.visibility="hidden");let f={id:crypto.randomUUID(),componentRef:t,originalRect:{top:c,left:s,width:n.width/o,height:n.height/o},currentPos:{x:s,y:c},cloneEl:a,originalEl:e,originalOpacity:u,originalVisibility:p};return ya(f),f}function Nt(e,t,n){let o=Ne().get(e);if(!o)return;if(o.currentPos={x:t,y:n},Rr())o.cloneEl.style.left=`${t}px`,o.cloneEl.style.top=`${n}px`;else{let{scale:i,offsetX:a,offsetY:s}=Re();o.cloneEl.style.left=`${t*i+a}px`,o.cloneEl.style.top=`${n*i+s}px`,o.cloneEl.style.transform=`scale(${i})`,o.cloneEl.style.transformOrigin="0 0"}}function un(e,t){for(let n of Ne().values()){let o=n.cloneEl.getBoundingClientRect();if(e>=o.left&&e<=o.right&&t>=o.top&&t<=o.bottom)return n}return null}function Ba(){Or?.(),Or=null}function qe(e){let t=Ne().get(e);t&&(t.cloneEl.style.boxShadow=L.lg,t.cloneEl.style.opacity="0.9",t.cloneEl.style.transition=`box-shadow ${k.settle}`)}function ao(e){let t=Ne().get(e);t&&(t.cloneEl.style.boxShadow=L.sm,t.cloneEl.style.opacity="1")}se();rr()||ir({onCommitFiberRoot(){}});async function Oc(e){let t=Ee(e);if(!t)return null;try{let n=await yt(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||vt(i))continue;let a="";if(r.fileName){let s=rt(r.fileName);bt(s)&&(a=s)}o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0)return{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}}catch(n){console.warn("[SketchUI] getOwnerStack failed, falling back to fiber walk:",n)}return Ga(e,t)}function Ga(e,t){let n=[],o=t;for(;o;){if(He(o)){let r=we(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",s=0,c=0;i&&(a=i.fileName||"",s=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!vt(r)&&n.push({componentName:r,filePath:a,lineNumber:s,columnNumber:c})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function Wa(e){let t=Ee(e);return t?Ga(e,t):null}var $=null,M=null,Me=null,ze=!1,Rt=!1,O=new Map,v=null,Se=null,fe="idle",D=null,Fe=null,xe=null,fo=null,pn=0,mn=0,Je=[],so=!1,Ze=8,Ce=null,dn={x:0,y:0},fn=!1,Ac=null,$c=null,Hc=null,_c=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${L.sm};
    border-radius: ${N.sm};
    padding: 4px 8px;
    z-index: 2147483646;
    font-family: ${T};
    white-space: nowrap;
    display: none;
    opacity: 0;
    transition: opacity ${k.medium};
  }
  .selection-label.visible {
    opacity: 1;
  }
  .selection-label .comp-name {
    color: ${l.textPrimary};
    font-size: 12px;
    font-weight: 600;
  }
  .selection-label .comp-path {
    color: ${l.textSecondary};
    font-size: 11px;
    margin-left: 8px;
  }
  .selection-label .loading-dots {
    color: ${l.textTertiary};
    font-size: 12px;
  }
  @keyframes dotPulse {
    0%, 80%, 100% { opacity: 0.2; }
    40% { opacity: 1; }
  }
  .selection-label .loading-dots span {
    animation: dotPulse 1.4s infinite;
  }
  .selection-label .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .selection-label .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
  .marquee-box {
    position: fixed;
    border: 1px solid ${l.accent};
    background: ${l.accentSoft};
    border-radius: 2px;
    z-index: 2147483646;
    display: none;
    pointer-events: none;
  }
`;function Ya(e){Ac=e.onStart,$c=e.onMove,Hc=e.onEnd}function ja(){let e=K();if(!e)return;let t=document.createElement("style");t.textContent=_c,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),Se=document.createElement("div"),Se.className="marquee-box",e.appendChild(Se),ze=!0,document.addEventListener("mousedown",lo,!0),document.addEventListener("mousemove",co,!0),document.addEventListener("mouseup",uo,!0),document.addEventListener("keydown",mo,!0),document.addEventListener("click",po,!0),document.addEventListener("scroll",ke,!0),window.addEventListener("resize",ke),Rt=!0}function lo(e){if(!ze||e.metaKey||e.ctrlKey)return;let t=document.elementFromPoint(e.clientX,e.clientY);if(t?.closest("#sketch-ui-root"))return;if($||O.size>0){let r=hr(e.clientX,e.clientY);if(r){e.preventDefault(),e.stopPropagation();let i=zn();if(xe=r,fo=i?{...i}:null,O.size>0){Je=[];for(let[a]of O){let s=getComputedStyle(a);Je.push({element:a,width:parseFloat(s.width)||a.offsetWidth,height:parseFloat(s.height)||a.offsetHeight})}pn=0,mn=0}else if(M){let a=getComputedStyle(M);pn=parseFloat(a.width)||M.offsetWidth,mn=parseFloat(a.height)||M.offsetHeight,Je=[]}D={x:e.clientX,y:e.clientY},fe="resize-drag";return}if($&&M){let i=zn();if(i&&Ua(e.clientX,e.clientY,i)){e.preventDefault(),e.stopPropagation(),D={x:e.clientX,y:e.clientY},fe="pending",Fe=M,fn=!0;return}}}e.preventDefault(),e.stopPropagation();let o=un(e.clientX,e.clientY);if(o){e.shiftKey||gn(),D={x:e.clientX,y:e.clientY},Fe=o.originalEl,Me=o,Ce=o;let r=J(e.clientX,e.clientY);dn={x:r.x-o.currentPos.x,y:r.y-o.currentPos.y},qe(o.id),fe="move-drag";return}if(!t||!Zt(t)){($||O.size>0)&&(Ra(),$=null,M=null,Me=null,gn(),at(null),v&&(v.classList.remove("visible"),v.style.display="none"),$e(null));return}D={x:e.clientX,y:e.clientY},Fe=t,Me=null,so=e.shiftKey,fe="pending"}function co(e){if(ze){if(fe==="resize-drag"&&xe&&D&&fo){e.preventDefault(),e.stopPropagation();let t=e.clientX-D.x,n=e.clientY-D.y;if(Je.length>0){for(let o of Je){let r=o.width,i=o.height;xe==="tr"||xe==="br"?r=Math.max(10,o.width+t):r=Math.max(10,o.width-t),xe==="bl"||xe==="br"?i=Math.max(10,o.height+n):i=Math.max(10,o.height-n),o.element.style.width=`${Math.round(r)}px`,o.element.style.height=`${Math.round(i)}px`}hn()}else{let o=pn,r=mn;xe==="tr"||xe==="br"?o=Math.max(10,pn+t):o=Math.max(10,pn-t),xe==="bl"||xe==="br"?r=Math.max(10,mn+n):r=Math.max(10,mn-n),o=Math.round(o),r=Math.round(r),ln("width",`${o}px`),ln("height",`${r}px`),ke()}return}if(fe==="move-drag"&&Ce){e.preventDefault(),e.stopPropagation();let t=J(e.clientX,e.clientY);Nt(Ce.id,t.x-dn.x,t.y-dn.y);return}if(fe==="pending"&&D){let t=Math.abs(e.clientX-D.x),n=Math.abs(e.clientY-D.y);if(t>5||n>5)if(fn&&M&&$){if(Jn(M)){for(let o of Ne().values())if(o.originalEl===M||o.originalEl.contains(M)||M.contains(o.originalEl)){Ce=o;let r=J(e.clientX,e.clientY);dn={x:r.x-o.currentPos.x,y:r.y-o.currentPos.y},qe(o.id);break}}else{let o=io(M,{componentName:$.componentName,filePath:$.filePath,lineNumber:$.lineNumber});Ce=o;let r=J(e.clientX,e.clientY);dn={x:r.x-o.currentPos.x,y:r.y-o.currentPos.y},qe(o.id)}fe="move-drag",fn=!1}else(t>10||n>10)&&(fe="marquee",fn=!1)}if(fe==="marquee"&&D&&Se){let t=Math.min(e.clientX,D.x),n=Math.min(e.clientY,D.y),o=Math.abs(e.clientX-D.x),r=Math.abs(e.clientY-D.y);Se.style.display="block",Se.style.left=`${t}px`,Se.style.top=`${n}px`,Se.style.width=`${o}px`,Se.style.height=`${r}px`;return}if(fe==="idle"){if($&&M||O.size>0){let a=hr(e.clientX,e.clientY);if(a){document.body.style.cursor=a==="tl"||a==="br"?"nwse-resize":"nesw-resize";return}if($&&M){let s=zn();if(s&&Ua(e.clientX,e.clientY,s)){document.body.style.cursor="move";return}}document.body.style.cursor=""}let n=un(e.clientX,e.clientY);if(n){let a=n.cloneEl.getBoundingClientRect(),s=parseFloat(getComputedStyle(n.originalEl).borderRadius)||4;en(a,s+2),document.body.style.cursor="move";return}else document.body.style.cursor="";let o=document.elementFromPoint(e.clientX,e.clientY);if(!o||!Zt(o)){en(null);return}let r=o.getBoundingClientRect(),i=parseFloat(getComputedStyle(o).borderRadius)||4;en(r,i+2)}}}function uo(e){if(!ze)return;let t=fe;if(fe="idle",fn=!1,t==="move-drag"&&Ce){qn(Ce.id,Ce.currentPos),ao(Ce.id),document.body.style.cursor="",Me=Ce,M=Ce.originalEl,ke(),Ce=null,D=null,Fe=null;return}if(t==="resize-drag"){document.body.style.cursor="",xe=null,fo=null,D=null,Je.length>0?Je=[]:oo();return}if(t==="marquee"&&D){Se&&(Se.style.display="none"),Dc(Math.min(e.clientX,D.x),Math.min(e.clientY,D.y),Math.max(e.clientX,D.x),Math.max(e.clientY,D.y)),D=null,Fe=null,so=!1;return}Fe&&(so?Fc(Fe):(gn(),Ic(Fe))),D=null,Fe=null,so=!1}async function Ic(e){try{let t=Me?Me.cloneEl.getBoundingClientRect():e.getBoundingClientRect();M=e,Ar(t,{}),zc();let n=await Oc(e);if(console.log("[SketchUI] selectElement:",e.tagName,"\u2192",n?.componentName,n?.filePath,"stack:",n?.stack?.map(o=>o.componentName)),!n)return;if($={tagName:n.tagName,componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber,columnNumber:n.columnNumber,stack:n.stack,boundingRect:{top:t.top,left:t.left,width:t.width,height:t.height}},v){let o=n.filePath?`${n.filePath}:${n.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${n.componentName}</span>${o?`<span class="comp-path">${o}</span>`:""}`}kt(e,$),$e({tagName:n.tagName,componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber})}catch(t){console.error("[SketchUI] selectElement error:",t)}}function Dc(e,t,n,o){let r=Wi({x:e,y:t,width:n-e,height:o-t});if(r.length!==0){Mt(),$=null,M=null,Me=null,at(null),v&&(v.classList.remove("visible"),v.style.display="none"),O.clear();for(let i of r.slice(0,50)){let a=Wa(i);if(!a)continue;let s=i.getBoundingClientRect(),c={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:s.top,left:s.left,width:s.width,height:s.height}};O.set(i,{element:i,info:c})}if(O.size!==0){if(O.size===1){let[i,a]=[...O.entries()][0];O.clear(),M=i,$=a.info;let s=i.getBoundingClientRect();if(Ar(s,$),v){let c=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${c?`<span class="comp-path">${c}</span>`:""}`}kt(i,$),$e({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}hn(),$e(null),v&&(v.innerHTML=`<span class="comp-name">${O.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function Fc(e){if(O.has(e)){if(O.delete(e),O.size===1){let[r,i]=[...O.entries()][0];O.clear(),tn(),M=r,$=i.info;let a=r.getBoundingClientRect();if(Ar(a,$),kt(r,$),v){let s=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${s?`<span class="comp-path">${s}</span>`:""}`}$e({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else O.size===0?(tn(),ct()):(hn(),v&&(v.innerHTML=`<span class="comp-name">${O.size} elements selected</span>`));return}let t=Wa(e);if(!t)return;$&&M&&O.size===0&&(O.set(M,{element:M,info:$}),Mt(),$=null,M=null,at(null));let n=e.getBoundingClientRect(),o={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}};O.set(e,{element:e,info:o}),hn(),$e(null),v&&(v.innerHTML=`<span class="comp-name">${O.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function gn(){O.clear(),tn()}function hn(){if(O.size===0){tn();return}let e=[];for(let[t]of O){let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:n,borderRadius:o+2})}qi(e)}function Ua(e,t,n){let{x:o,y:r,w:i,h:a}=n;if(e<o-Ze||e>o+i+Ze||t<r-Ze||t>r+a+Ze)return!1;let s=Math.abs(e-o)<=Ze,c=Math.abs(e-(o+i))<=Ze,d=Math.abs(t-r)<=Ze,u=Math.abs(t-(r+a))<=Ze;return s||c||d||u}function po(e){ze&&(e.metaKey||e.ctrlKey||e.preventDefault())}function mo(e){if(ze&&e.key==="Escape"){if(O.size>0){gn(),v&&(v.classList.remove("visible"),v.style.display="none"),$e(null),e.preventDefault();return}if($){if(La()){ro(),e.preventDefault();return}ct(),e.preventDefault()}}}function Ar(e,t){if(M){let n=parseFloat(getComputedStyle(M).borderRadius)||4;at(e,n+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function ke(){if(O.size>0){hn();return}if(!M||!$)return;let e=Me?Me.cloneEl.getBoundingClientRect():M.getBoundingClientRect(),t=parseFloat(getComputedStyle(M).borderRadius)||4;if(at(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function zc(){en(null)}function ct(){Mt(),$=null,M=null,Me=null,xe=null,fo=null,Je=[],gn(),document.body.style.cursor="",at(null),v&&(v.classList.remove("visible"),v.style.display="none"),$e(null)}function Xa(){return $}function Ka(){ze=!1,document.removeEventListener("mousedown",lo,!0),document.removeEventListener("mousemove",co,!0),document.removeEventListener("mouseup",uo,!0),document.removeEventListener("keydown",mo,!0),document.removeEventListener("click",po,!0),document.removeEventListener("scroll",ke,!0),window.removeEventListener("resize",ke),Rt=!1,v?.remove(),v=null}function $r(e){e&&!Rt?(document.addEventListener("mousedown",lo,!0),document.addEventListener("mousemove",co,!0),document.addEventListener("mouseup",uo,!0),document.addEventListener("keydown",mo,!0),document.addEventListener("click",po,!0),document.addEventListener("scroll",ke,!0),window.addEventListener("resize",ke),Rt=!0,ze=!0):!e&&Rt&&(document.removeEventListener("mousedown",lo,!0),document.removeEventListener("mousemove",co,!0),document.removeEventListener("mouseup",uo,!0),document.removeEventListener("keydown",mo,!0),document.removeEventListener("click",po,!0),document.removeEventListener("scroll",ke,!0),window.removeEventListener("resize",ke),Rt=!1,ze=!1)}function qa(){return M??null}function Za(e){Me=e,M=e.originalEl,ke()}var ce=null,le=null,Qe=null,Ja=null,yn=!1,Lt=null,go=[],ho=new Map,yo=!1,Vc=`
  .drag-preview {
    position: fixed;
    pointer-events: none;
    opacity: 0.6;
    z-index: 2147483647;
    border: 2px solid #1e88e5;
    border-radius: 4px;
    overflow: hidden;
    display: none;
  }
  .drop-indicator {
    position: fixed;
    height: 3px;
    background: #1e88e5;
    z-index: 2147483646;
    display: none;
    pointer-events: none;
    border-radius: 2px;
  }
  .drop-indicator::before,
  .drop-indicator::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #1e88e5;
    border-radius: 50%;
    top: -3px;
  }
  .drop-indicator::before { left: -4px; }
  .drop-indicator::after { right: -4px; }
`,Ot=null;function Qa(){let e=K();if(!e)return;let t=document.createElement("style");t.textContent=Vc,e.appendChild(t),Ya({onStart:Bc,onMove:Gc,onEnd:Wc}),nt(n=>{n.type==="reorderComplete"&&(Hr(),ct())})}function Bc(e,t,n){Qe=n,Ja=t,Lt={x:e.clientX,y:e.clientY},yn=!1,yo=!1,go=[],ho=new Map,Ot=null;let o=K();if(!o)return;ce=document.createElement("div"),ce.className="drag-preview";let r=t.getBoundingClientRect();ce.style.width=`${r.width}px`,ce.style.height=`${r.height}px`,ce.innerHTML=t.outerHTML,o.appendChild(ce),le=document.createElement("div"),le.className="drop-indicator",o.appendChild(le);let i=n.stack[1];if(!i)return;Pe({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=nt(s=>{if(s.type!=="siblingsList")return;a(),go=s.siblings;let c=document.querySelectorAll("*");for(let d of c){if(d.closest("#sketch-ui-root"))continue;let u=Ee(d);if(!u)continue;let p=u;for(;p;){if(He(p)){let m=p._debugSource||p._debugOwner?._debugSource;if(m){for(let f of s.siblings)m.lineNumber===f.lineNumber&&m.fileName===i.filePath&&ho.set(f.lineNumber,{el:d,rect:d.getBoundingClientRect()});break}}p=p.return}}yo=!0})}function Gc(e){if(!Lt)return;let t=Math.abs(e.clientX-Lt.x),n=Math.abs(e.clientY-Lt.y);if(t<5&&n<5||(yn=!0,ce&&(ce.style.display="block",ce.style.left=`${e.clientX+10}px`,ce.style.top=`${e.clientY+10}px`),!yo||!Qe))return;let o=null,r=1/0,i=0,a=0,s=0;for(let c of go){if(c.lineNumber===Qe.lineNumber)continue;let d=ho.get(c.lineNumber);if(!d)continue;let u=d.rect,p=u.top+u.height/2,m=Math.abs(e.clientY-p);m<r&&(r=m,o=c,e.clientY<p?i=u.top-2:i=u.bottom+2,a=u.left,s=u.width)}Ot=o,o&&le?(le.style.display="block",le.style.top=`${i}px`,le.style.left=`${a}px`,le.style.width=`${s}px`):le&&(le.style.display="none")}function Wc(e){if(!yn||!Ot||!Qe){Hr();return}Pe({type:"reorder",filePath:Qe.filePath,fromLine:Qe.lineNumber,toLine:Ot.lineNumber,fromComponent:Qe.componentName,toComponent:Ot.componentName}),ce&&(ce.style.display="none"),le&&(le.style.display="none"),yn=!1,Lt=null}function Hr(){ce?.remove(),le?.remove(),ce=null,le=null,Qe=null,Ja=null,yn=!1,Lt=null,yo=!1,go=[],ho=new Map,Ot=null}function es(){Hr()}U();se();var et="http://www.w3.org/2000/svg",At=null,q=null,_r=null;function ts(){let e=K();e&&(At=document.createElementNS(et,"svg"),At.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),q=document.createElementNS(et,"g"),q.setAttribute("class","annotation-root"),At.appendChild(q),e.appendChild(At),window.addEventListener("scroll",bo,{passive:!0}),_r=eo(bo),bo())}function bo(){if(!q)return;let{scale:e,offsetX:t,offsetY:n}=Re();q.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function ns(e,t,n,o){if(!q||t.length<2)return null;let r=document.createElementNS(et,"g");r.setAttribute("data-annotation-id",e);let i=document.createElementNS(et,"path");return i.setAttribute("d",ss(t)),i.setAttribute("stroke",n),i.setAttribute("stroke-width",String(o)),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.setAttribute("fill","none"),r.appendChild(i),q.appendChild(r),r}function os(e,t,n,o,r,i){if(!q)return null;let a=document.createElementNS(et,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${L.sm};
    padding: 4px 8px;
    border-radius: ${N.sm};
    font-size: ${r}px;
    font-family: ${T};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,s.textContent=o,a.appendChild(s),q.appendChild(a),a}function rs(e,t,n,o){if(!q)return null;let r=document.createElementNS(et,"circle");return r.setAttribute("data-annotation-id",e),r.setAttribute("cx",String(t)),r.setAttribute("cy",String(n)),r.setAttribute("r","6"),r.setAttribute("fill",o),r.setAttribute("stroke","white"),r.setAttribute("stroke-width","1.5"),q.appendChild(r),r}function is(e){if(!q)return;let t=q.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function Ir(){q&&(q.innerHTML="")}function as(){window.removeEventListener("scroll",bo),_r?.(),_r=null,At?.remove(),At=null,q=null}function ss(e){if(e.length===0)return"";let t=`M${e[0].x},${e[0].y}`;for(let n=1;n<e.length;n++)t+=` L${e[n].x},${e[n].y}`;return t}function ls(e,t){if(!q)return null;let n=[],o=document.createElementNS(et,"g"),r=document.createElementNS(et,"path");return r.setAttribute("stroke",e),r.setAttribute("stroke-width",String(t)),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("fill","none"),o.appendChild(r),q.appendChild(o),{path:r,group:o,addPoint(i,a){n.push({x:i,y:a}),r.setAttribute("d",ss(n))},getPoints(){return n}}}se();U();Pt();var Be={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-7 1-4 7z"/></svg>',grab:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V8a2 2 0 0 0-4 0v3"/><path d="M14 10V6a2 2 0 0 0-4 0v4"/><path d="M10 9.5V5a2 2 0 0 0-4 0v9"/><path d="M6 14c0 3.31 2.69 6 6 6h2a6 6 0 0 0 6-6v-2"/></svg>',move:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',draw:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',color:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22l1-1h3l9-9"/><path d="M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7"/><path d="M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14"/><path d="m9 7 6 6"/><path d="M20 2a2.83 2.83 0 0 1 0 4L16 10"/></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18c3.87 0 7-3.13 7-7s-3.13-7-7-7H4"/><polyline points="8 10 4 6 8 2"/></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>'},ms=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",xo=navigator.platform.includes("Mac")?"Cmd":"Ctrl",Yr=[{type:"pointer",icon:Be.pointer,label:"Pointer",shortcut:"V"},{type:"grab",icon:Be.grab,label:"Grab",shortcut:"H"},{type:"move",icon:Be.move,label:"Move",shortcut:"M"},{type:"draw",icon:Be.draw,label:"Draw",shortcut:"D"},{type:"color",icon:Be.color,label:"Color",shortcut:"E"},{type:"text",icon:Be.text,label:"Text",shortcut:"T"}],Uc=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${N.lg};
    box-shadow: ${L.md};
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    gap: 4px;
    font-family: ${T};
    user-select: none;
    opacity: 0;
    animation: panelFadeIn ${k.settle} forwards;
  }
  @keyframes panelFadeIn {
    to { opacity: 1; }
  }
  .tool-divider {
    width: 16px;
    height: 1px;
    background: ${l.border};
    flex-shrink: 0;
  }
  .tool-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-left: 2px solid transparent;
    color: ${l.textSecondary};
    cursor: pointer;
    border-radius: 50%;
    position: relative;
    padding: 0;
    transition: background ${k.fast}, color ${k.fast};
  }
  .tool-btn svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  .tool-btn svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  .tool-btn:hover {
    background: ${l.bgSecondary};
    color: ${l.textPrimary};
  }
  .tool-btn.active {
    background: ${l.accentSoft};
    color: ${l.accent};
    border-left-color: ${l.accent};
    border-radius: 0 50% 50% 0;
  }
  .tool-btn .tooltip {
    display: none;
    position: absolute;
    left: 44px;
    top: 50%;
    transform: translateY(-50%);
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${L.sm};
    color: ${l.textPrimary};
    padding: 4px 8px;
    border-radius: ${N.sm};
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity ${k.medium};
    z-index: 2147483647;
  }
  .tool-btn .tooltip .shortcut-badge {
    display: inline-block;
    background: ${l.bgSecondary};
    color: ${l.textTertiary};
    border-radius: 4px;
    padding: 1px 5px;
    font-size: 11px;
    margin-left: 6px;
  }
  .tool-btn:hover .tooltip {
    display: block;
  }
  .tool-btn.tooltip-visible .tooltip {
    opacity: 1;
  }
  .sub-options {
    width: 100%;
    padding: 4px 0;
    border-top: 1px solid ${l.border};
    border-bottom: 1px solid ${l.border};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    opacity: 0;
    transition: opacity ${k.medium};
  }
  .sub-options.visible {
    opacity: 1;
  }
  .sub-options.hidden {
    display: none;
  }
  .color-swatch {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    padding: 0;
    box-shadow: ${L.sm};
  }
  .segmented-control {
    display: flex;
    background: ${l.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  }
  .segment {
    flex: 1;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: ${l.textSecondary};
    font-size: 10px;
    font-family: ${T};
    cursor: pointer;
    padding: 0;
    transition: background ${k.fast}, color ${k.fast}, box-shadow ${k.fast};
  }
  .segment.active {
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    box-shadow: ${L.sm};
  }
  .action-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: ${l.textSecondary};
    cursor: pointer;
    border-radius: 50%;
    padding: 0;
    transition: background ${k.fast}, color ${k.fast}, opacity ${k.fast};
  }
  .action-btn svg {
    width: 18px;
    height: 18px;
  }
  .action-btn:hover {
    background: ${l.bgSecondary};
    color: ${l.textPrimary};
  }
  .action-btn:disabled {
    opacity: 0.3;
    cursor: default;
    pointer-events: none;
  }
  .action-btn.danger:hover {
    background: ${l.dangerSoft};
    color: ${l.danger};
  }
  .help-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: ${l.textTertiary};
    cursor: pointer;
    border-radius: 50%;
    padding: 0;
    font-size: 14px;
    font-weight: 600;
    font-family: ${T};
    transition: background ${k.fast}, color ${k.fast};
  }
  .help-btn:hover {
    background: ${l.bgSecondary};
    color: ${l.textPrimary};
  }
  .shortcuts-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.4);
    animation: fadeIn 150ms ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .shortcuts-card {
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${N.lg};
    box-shadow: ${L.lg};
    padding: 24px 28px;
    min-width: 320px;
    max-width: 420px;
    font-family: ${T};
    animation: cardSlide 200ms ease;
  }
  @keyframes cardSlide {
    from { opacity: 0; transform: scale(0.96) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  .shortcuts-title {
    font-size: 14px;
    font-weight: 600;
    color: ${l.textPrimary};
    margin: 0 0 16px 0;
  }
  .shortcuts-section {
    margin-bottom: 14px;
  }
  .shortcuts-section-label {
    font-size: 10px;
    font-weight: 600;
    color: ${l.textTertiary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }
  .shortcut-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0;
  }
  .shortcut-action {
    font-size: 12px;
    color: ${l.textPrimary};
  }
  .shortcut-keys {
    display: flex;
    gap: 3px;
    align-items: center;
  }
  .shortcut-key {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: 5px;
    font-size: 11px;
    font-family: ${T};
    color: ${l.textSecondary};
    box-shadow: 0 1px 0 rgba(0,0,0,0.06);
  }
  .shortcut-plus {
    font-size: 10px;
    color: ${l.textTertiary};
  }
`,ge=null,te=null,wo=new Map,Ve=null,Gr=null,Wr=null;function fs(e){Gr=e}function gs(e){Wr=e}function hs(e){Ve&&(Ve.disabled=!e)}function ys(){let e=K();if(!e)return;let t=document.createElement("style");t.textContent=Uc,e.appendChild(t),ge=document.createElement("div"),ge.className="tools-panel";let n=[["pointer","grab"],["move"],["draw","color","text"]];for(let s=0;s<n.length;s++){if(s>0){let c=document.createElement("div");c.className="tool-divider",ge.appendChild(c)}for(let c of n[s]){let d=Yr.find(m=>m.type===c),u=document.createElement("button");u.className=`tool-btn${d.type==="pointer"?" active":""}`,u.innerHTML=`${d.icon}<span class="tooltip">${d.label}<span class="shortcut-badge">${ms}${d.shortcut}</span></span>`,u.addEventListener("click",()=>rn(d.type));let p=null;u.addEventListener("mouseenter",()=>{p=setTimeout(()=>u.classList.add("tooltip-visible"),400)}),u.addEventListener("mouseleave",()=>{p&&clearTimeout(p),u.classList.remove("tooltip-visible")}),ge.appendChild(u),wo.set(d.type,u)}}te=document.createElement("div"),te.className="sub-options hidden",ge.appendChild(te);let o=document.createElement("div");o.className="tool-divider",ge.appendChild(o),Ve=document.createElement("button"),Ve.className="action-btn",Ve.innerHTML=Be.undo,Ve.title="Undo (Ctrl+Z)",Ve.disabled=!0,Ve.addEventListener("click",()=>{Wr&&Wr()}),ge.appendChild(Ve);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=Be.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{Gr&&Gr()}),ge.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=Be.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{za(),i.style.color=Fa()?l.accent:""}),ge.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.textContent="?",a.title=`Keyboard Shortcuts (${ms}/)`,a.addEventListener("click",()=>vs()),ge.appendChild(a),e.appendChild(ge),document.addEventListener("keydown",bs,!0)}function bs(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||!e.ctrlKey&&!e.metaKey)return;let n=e.key.toUpperCase();if(e.key==="/"||e.key==="?"){vs(),e.preventDefault();return}let o=Yr.find(r=>r.shortcut===n);o&&(rn(o.type),e.preventDefault())}var Le=null,Cn=null;function vs(){Le?Co():Xc()}function Xc(){let e=K();if(!e||Le)return;Le=document.createElement("div"),Le.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:Yr.map(r=>({action:r.label,keys:[xo,r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[xo,"Z"]},{action:"Toggle Originals",keys:[xo,"."]},{action:"Keyboard Shortcuts",keys:[xo,"/"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Grab Tool","Drag"]},{action:"Zoom",keys:["Scroll Wheel"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let s of r.items){let c=document.createElement("div");c.className="shortcut-row";let d=document.createElement("span");d.className="shortcut-action",d.textContent=s.action,c.appendChild(d);let u=document.createElement("span");u.className="shortcut-keys";for(let p=0;p<s.keys.length;p++){if(p>0){let f=document.createElement("span");f.className="shortcut-plus",f.textContent="+",u.appendChild(f)}let m=document.createElement("span");m.className="shortcut-key",m.textContent=s.keys[p],u.appendChild(m)}c.appendChild(u),i.appendChild(c)}t.appendChild(i)}Le.appendChild(t),Le.addEventListener("click",r=>{r.target===Le&&Co()}),e.appendChild(Le),Cn=r=>{Co()},document.addEventListener("keydown",Cn,!0)}function Co(){Cn&&(document.removeEventListener("keydown",Cn,!0),Cn=null),Le?.remove(),Le=null}function xs(e){for(let[t,n]of wo)n.classList.toggle("active",t===e);Kc(e)}function Kc(e){if(te){if(te.innerHTML="",te.classList.add("hidden"),te.classList.remove("visible"),e==="draw"){te.classList.remove("hidden"),requestAnimationFrame(()=>te?.classList.add("visible"));let t=be(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.brushColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();st({initialColor:t.brushColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){an("brushColor",i),n.style.background=i},onClose(){}})}),te.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[2,4,8]){let i=document.createElement("button");i.className=`segment${r===t.brushSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{an("brushSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active"),Promise.resolve().then(()=>(Ht(),ps)).then(a=>a.refreshDrawCursor())}),o.appendChild(i)}te.appendChild(o)}else if(e==="text"){te.classList.remove("hidden"),requestAnimationFrame(()=>te?.classList.add("visible"));let t=be(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();st({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){an("textColor",i),n.style.background=i},onClose(){}})}),te.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{an("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}te.appendChild(o)}}}function Cs(e){let t=wo.get(e);t&&(t.style.backgroundColor=l.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function ws(){document.removeEventListener("keydown",bs,!0),Co(),ge?.remove(),ge=null,te=null,wo.clear()}Ht();Dr();U();var Es="sketch-ui-onboarding-seen",Oe=null,Eo=null;function Ts(){if(localStorage.getItem(Es))return;let e=K();if(!e)return;Oe=document.createElement("div"),Oe.style.cssText=`
    position: fixed;
    left: 72px;
    top: 50%;
    transform: translateY(-50%);
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${L.md};
    border-radius: ${N.md};
    padding: 12px 16px;
    font-family: ${T};
    font-size: 12px;
    color: ${l.textPrimary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${k.medium};
    max-width: 260px;
  `;let t=["V","H","M","D","C","T","L"],n=`
    display: inline-block;
    background: ${l.bgSecondary};
    color: ${l.textTertiary};
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 11px;
    font-family: ${T};
    margin: 0 2px;
  `;Oe.innerHTML=`Press ${t.map(o=>`<span style="${n}">${o}</span>`).join(" ")} to switch tools`,e.appendChild(Oe),requestAnimationFrame(()=>{Oe&&(Oe.style.opacity="1")}),Eo=setTimeout(jr,5e3)}function jr(){Oe&&(localStorage.setItem(Es,"1"),Oe.style.opacity="0",setTimeout(()=>{Oe?.remove(),Oe=null},150),Eo&&(clearTimeout(Eo),Eo=null))}se();function Ss(){$r(!0)}function ks(){$r(!1)}Ht();Pt();var Ur=!1,Xr=0,Kr=0,Ms={onMouseDown(e){Ur=!0,Xr=e.clientX,Kr=e.clientY,vo("grabbing")},onMouseMove(e){if(!Ur)return;let t=e.clientX-Xr,n=e.clientY-Kr;Ia(t,n),Xr=e.clientX,Kr=e.clientY},onMouseUp(e){Ur=!1,vo("grab")}};se();var ue=null,wn={x:0,y:0},_t=!1,qc=!1,Ps={onMouseDown(e){let t=un(e.clientX,e.clientY);if(t){ue=t;let a=J(e.clientX,e.clientY);wn={x:a.x-t.currentPos.x,y:a.y-t.currentPos.y},_t=!0,qe(ue.id);return}let n=Xa();if(!n){qc=!0,rn("pointer");return}let o=qa();if(!o)return;if(Jn(o)){for(let a of Ne().values())if(a.originalEl===o||a.originalEl.contains(o)||o.contains(a.originalEl)){ue=a;let s=J(e.clientX,e.clientY);wn={x:s.x-a.currentPos.x,y:s.y-a.currentPos.y},_t=!0,qe(ue.id);return}}let r=io(o,{componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber});ue=r;let i=J(e.clientX,e.clientY);wn={x:i.x-r.currentPos.x,y:i.y-r.currentPos.y},_t=!0,qe(ue.id)},onMouseMove(e){if(!_t||!ue)return;let t=J(e.clientX,e.clientY),n=t.x-wn.x,o=t.y-wn.y;Nt(ue.id,n,o)},onMouseUp(e){_t&&ue&&(qn(ue.id,ue.currentPos),ao(ue.id),Za(ue)),ue=null,_t=!1}};se();function To(e,t=2){if(e.length<=2)return e;let n=0,o=0,r=e[0],i=e[e.length-1];for(let a=1;a<e.length-1;a++){let s=Zc(e[a],r,i);s>n&&(n=s,o=a)}if(n>t){let a=To(e.slice(0,o+1),t),s=To(e.slice(o),t);return[...a.slice(0,-1),...s]}return[r,i]}function Zc(e,t,n){let o=n.x-t.x,r=n.y-t.y,i=o*o+r*r;if(i===0){let s=e.x-t.x,c=e.y-t.y;return Math.sqrt(s*s+c*c)}return Math.abs(r*e.x-o*e.y+n.x*t.y-n.y*t.x)/Math.sqrt(i)}Ht();async function It(e,t){let n=xn(e,t);if(!n)return null;let o=Ee(n);if(!o)return null;try{let i=await yt(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let s=a.functionName;if(s[0]!==s[0].toUpperCase()||vt(s))continue;let c="";if(a.fileName){let d=rt(a.fileName);bt(d)&&(c=d)}return{componentName:s,filePath:c,lineNumber:a.lineNumber??0}}}catch{}let r=o;for(;r;){if(He(r)){let i=we(r.type);if(i&&i[0]===i[0].toUpperCase()&&!vt(i)){let a=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:a?.fileName||"",lineNumber:a?.lineNumber||0}}}r=r.return}return null}var Ae=null,So=null,Ns={onMouseDown(e){let t=be();if(Ae=ls(t.brushColor,t.brushSize),Ae){let n=J(e.clientX,e.clientY);Ae.addPoint(n.x,n.y)}So=It(e.clientX,e.clientY)},onMouseMove(e){if(!Ae)return;let t=J(e.clientX,e.clientY);Ae.addPoint(t.x,t.y)},async onMouseUp(e){if(!Ae)return;let t=Ae.getPoints(),n=be();if(Ae.group.remove(),t.length<2){Ae=null,So=null;return}let o=await So,r=To(t,2),i=crypto.randomUUID();ns(i,r,n.brushColor,n.brushSize),Tt({type:"draw",id:i,points:r,color:n.brushColor,strokeWidth:n.brushSize,targetComponent:o}),Ae=null,So=null}};se();U();var ne=null,pt=null,ko=null,Ls={onMouseDown(e){ne&&Rs();let t=J(e.clientX,e.clientY);pt={pageX:t.x,pageY:t.y},It(e.clientX,e.clientY).then(n=>{ko=n}),ne=document.createElement("input"),ne.type="text",ne.placeholder="Type annotation...",ne.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${l.bgPrimary};
      color: ${l.textPrimary};
      border: 1.5px solid ${l.accent};
      border-radius: ${N.sm};
      padding: 4px 8px;
      font-size: ${be().fontSize}px;
      font-family: ${T};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${l.accentSoft};
    `,ne.setAttribute("data-sketch-ui-ghost","true"),ne.addEventListener("keydown",n=>{n.key==="Enter"&&(Rs(),n.preventDefault()),n.key==="Escape"&&(Os(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(ne),ne.focus()},onMouseMove(){},onMouseUp(){}};function Rs(){if(!ne||!pt)return;let e=ne.value.trim();if(ne.remove(),ne=null,!e)return;let t=be(),n=crypto.randomUUID();os(n,pt.pageX,pt.pageY,e,t.fontSize,t.textColor),Tt({type:"text",id:n,position:pt,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:ko}),pt=null,ko=null}function Os(){ne&&(ne.remove(),ne=null),pt=null,ko=null}function As(){Os()}Ht();se();var Ge=null,Tn=null,En="backgroundColor",Mo={bg:"",color:""},$s={async onMouseDown(e){Ie();let t=xn(e.clientX,e.clientY);if(!t)return;Ge=t,Mo={bg:getComputedStyle(t).backgroundColor,color:getComputedStyle(t).color};let n=await It(e.clientX,e.clientY);if(!n)return;Tn=n;let o=Jc(Mo.bg);vn(!1),st({initialColor:o,position:{x:e.clientX+10,y:e.clientY+10},showPropertyToggle:!0,onColorChange(r){Ge&&(Ge.style[En]=r)},onPropertyChange(r){En=r},onClose(){if(vn(!0),!Ge||!Tn)return;let r=En==="backgroundColor"?Mo.bg:Mo.color,i=Ge.style[En];if(i&&i!==r){let a=crypto.randomUUID(),s=Ge.getBoundingClientRect(),c=J(s.right,s.top);rs(a,c.x,c.y,i),Tt({type:"colorChange",id:a,component:Tn,targetElement:Ge,property:En,fromColor:r,toColor:i})}Ge=null,Tn=null}})},onMouseMove(){},onMouseUp(){}};function Jc(e){let t=e.match(/\d+/g);return!t||t.length<3?"#000000":"#"+t.slice(0,3).map(n=>parseInt(n).toString(16).padStart(2,"0")).join("")}function Hs(){Ie(),vn(!0),Ge=null,Tn=null}Pt();function _s(){let e=window.__SKETCH_UI_WS_PORT__;if(!e){console.warn("[SketchUI] No WebSocket port found.");return}if(document.getElementById("sketch-ui-root"))return;Pn(e),mi(Qc);let t=K();t&&Na(t),ja(),Ki(),Qa(),ts(),Va(),va(r=>is(r)),Ca((r,i,a)=>Nt(r,i,a)),ys(),zr(),Ts(),dt("grab",Ms),dt("move",Ps),dt("draw",Ns),dt("text",Ls),dt("color",$s),ga((r,i)=>{jr(),Cs(r),i==="pointer"&&ks(),i==="text"&&As(),i==="color"&&Hs(),$t(),cr(),r==="pointer"&&Ss(),Vr(r),xs(r)}),ha(()=>{vi(Er()),hs(Ta())}),gs(()=>{let r=wr();r&&Z(`Undo: ${r}`)}),gi(()=>{if(!Er()){Z("No moved components to toggle");return}let r=!Zn();wa(r),bi(r)});let n=!1,o=0;hi(()=>{if(n)return;let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);Z(`Please wait ${a}s before retrying`);return}let i=Sa();if(!i.moves.length&&!i.annotations.length&&!i.colorChanges.length){Z("Nothing to generate \u2014 make some visual changes first");return}n=!0,Z("Generating..."),Pe({type:"generate",annotations:i})}),nt(r=>{if(r.type==="generateProgress"&&Z(r.message),r.type==="generateComplete")if(n=!1,r.success){let i=r.changes.map(a=>a.description||a.filePath).join(", ");Z(`Applied: ${i}`),ct(),Ir(),to()}else Z(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),yi(()=>{if(Kn()==="pointer")return!1;let r=wr();return r?(Z(`Undo: ${r}`),!0):!1}),fs(()=>{ct(),Ir(),to(),Da(),Z("Canvas cleared")}),console.log("[SketchUI] Overlay initialized with Phase 2A canvas tools")}function Qc(){$t(),cr(),Ka(),Zi(),es(),as(),Ba(),ws(),Br(),to(),Lr(),ti(),fi()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",_s):_s();})();
/*! Bundled license information:

bippy/dist/rdt-hook.js:
bippy/dist/install-hook-only.js:
bippy/dist/core.js:
bippy/dist/index.js:
bippy/dist/source.js:
  (**
   * @license bippy
   *
   * Copyright (c) Aiden Bai
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
