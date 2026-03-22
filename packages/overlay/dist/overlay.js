"use strict";var SketchUI=(()=>{var Ms=Object.defineProperty;var Rt=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ns=(e,t)=>{for(var o in t)Ms(e,o,{get:t[o],enumerable:!0})};function Xr(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='5 9 2 12 5 15'/><polyline points='9 5 12 2 15 5'/><polyline points='15 19 12 22 9 19'/><polyline points='19 9 22 12 19 15'/><line x1='2' y1='12' x2='22' y2='12'/><line x1='12' y1='2' x2='12' y2='22'/></svg>`)}") 12 12, move`}function xo(e){if(yn&&yn.size===e)return yn.uri;let t=Math.max(e,2),o=t*2+4,n=o/2,r=`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${o}' height='${o}'><circle cx='${n}' cy='${n}' r='${t}' fill='none' stroke='${l.accent}' stroke-width='1.5'/></svg>`)}") ${n} ${n}, crosshair`;return yn={size:e,uri:r},r}var l,R,N,k,T,Ur,yn,U=Rt(()=>{"use strict";l={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},R={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},N={xs:"4px",sm:"6px",md:"10px",lg:"14px"},k={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},T="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",Ur=`
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
`;yn=null});function ta(e){return $n.push(e),()=>{$n=$n.filter(t=>t!==e)}}function na(e){return An.push(e),()=>{An=An.filter(t=>t!==e)}}function Ge(){An.forEach(e=>e())}function oa(){return ar}function lr(e){let t=ar;t!==e&&(ar=e,$n.forEach(o=>o(e,t)))}function ge(){return{...ea}}function Zt(e,t){ea[e]=t}function We(){return fe}function ra(e){fe.set(e.id,e),He.push({type:"ghostCreate",ghostId:e.id}),Ge()}function ia(e,t){let o=fe.get(e);if(!o)return;let n={...o.currentPos};o.currentPos=t,He.push({type:"ghostMove",ghostId:e,previousPos:n}),Ge()}function oc(e){let t=fe.get(e);t&&(t.cloneEl.remove(),t.originalEl.style.opacity=t.originalOpacity,t.originalEl.style.visibility=t.originalVisibility,fe.delete(e),Ge())}function In(e){if(Be.push(e),e.type==="colorChange"){let t=e;He.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else He.push({type:"annotationAdd",annotationId:e.id});Ge()}function sa(e){aa=e}function ca(e){la=e}function Qi(e){Be=Be.filter(t=>t.id!==e),aa?.(e),Ge()}function Dn(){return sr}function da(e){sr=e;for(let t of fe.values())e?(t.originalEl.style.opacity="0",t.originalEl.style.visibility="hidden"):(t.originalEl.style.opacity="0.3",t.originalEl.style.visibility="visible");Ge()}function ua(e){for(let t of fe.values())if(t.originalEl===e||t.originalEl.contains(e)||e.contains(t.originalEl))return!0;return!1}function cr(){let e=He.pop();if(!e)return null;switch(e.type){case"ghostCreate":return oc(e.ghostId),"ghost removed";case"ghostMove":{let t=fe.get(e.ghostId);return t&&(t.currentPos=e.previousPos,la?.(e.ghostId,e.previousPos.x,e.previousPos.y)),"move reverted"}case"annotationAdd":return Qi(e.annotationId),"annotation removed";case"colorChange":{let t=Be.find(o=>o.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),Qi(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let o of t.overrides)t.element.style[o.cssProperty]=o.previousValue;return"property reverted"}}return null}function pa(e){He.push(e),Ge()}function Te(){return{scale:qt,offsetX:Hn,offsetY:_n}}function Fn(e,t,o){qt=e,Hn=t,_n=o,Kt.forEach(n=>n())}function zn(e){return Kt.push(e),()=>{Kt=Kt.filter(t=>t!==e)}}function Se(e,t){return{x:(e-Hn)/qt,y:(t-_n)/qt}}function Vn(){for(let e of fe.values())e.cloneEl.remove(),e.originalEl.style.opacity=e.originalOpacity,e.originalEl.style.visibility=e.originalVisibility;for(let e of Be)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of He)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let o of t.overrides)t.element.style[o.cssProperty]=o.previousValue}fe=new Map,Be=[],He=[],sr=!0,qt=1,Hn=0,_n=0,Kt.forEach(e=>e()),Ge()}function dr(){return fe.size>0||Be.length>0}function ma(){return He.length>0}function fa(){let e=[];for(let n of fe.values())e.push({component:n.componentRef.componentName,file:n.componentRef.filePath,line:n.componentRef.lineNumber,from:n.originalRect,to:n.currentPos});let t=[],o=[];for(let n of Be)n.type==="draw"?t.push({type:"draw",startComponent:n.targetComponent?.componentName,startFile:n.targetComponent?.filePath,startLine:n.targetComponent?.lineNumber,points:n.points,color:n.color,strokeWidth:n.strokeWidth}):n.type==="text"?t.push({type:"text",content:n.content,position:n.position,targetComponent:n.targetComponent?.componentName,targetFile:n.targetComponent?.filePath,targetLine:n.targetComponent?.lineNumber}):n.type==="colorChange"&&o.push({component:n.component.componentName,file:n.component.filePath,line:n.component.lineNumber,property:n.property,from:n.fromColor,to:n.toColor});return{moves:e,annotations:t,colorChanges:o}}var fe,Be,He,ar,sr,ea,qt,Hn,_n,Kt,$n,An,aa,la,he=Rt(()=>{"use strict";fe=new Map,Be=[],He=[],ar="pointer",sr=!0,ea={brushSize:4,brushColor:"#ef4444",fontSize:16,textColor:"#ffffff"},qt=1,Hn=0,_n=0,Kt=[],$n=[],An=[];aa=null;la=null});function yr(){return j}function Ta(e){return en.push(e),()=>{en=en.filter(t=>t!==e)}}function yc(){gr=document.body.style.background||document.body.style.backgroundColor||"",hr=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,o=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",j=document.createElement("div"),j.setAttribute("data-sketch-ui-canvas-wrapper","true"),j.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${o};
  `.trim().replace(/\n\s*/g," "),Ce=document.createElement("div"),Ce.setAttribute("data-sketch-ui-dot-bg","true"),Ce.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${l.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let n=Array.from(document.body.childNodes);for(let r of n)r instanceof HTMLElement&&(r.id==="sketch-ui-root"||r.hasAttribute("data-sketch-ui-interaction")||r.hasAttribute("data-sketch-ui-ghost")||r.hasAttribute("data-sketch-ui-annotation")||r.hasAttribute("data-sketch-ui-dot-bg")||r.hasAttribute("data-sketch-ui-canvas-wrapper"))||(Ea.push(r),j.appendChild(r));j.style.position="relative",j.style.zIndex="1",document.body.insertBefore(Ce,document.body.firstChild),document.body.insertBefore(j,Ce.nextSibling),fr=zn(wa),wa(),en.forEach(r=>r(j))}function wa(){if(!j||!Ce)return;let{scale:e,offsetX:t,offsetY:o}=Te();j.style.transform=`translate(${t}px, ${o}px) scale(${e})`;let n=gc*e,r=t%n,i=o%n;Ce.style.backgroundImage=`radial-gradient(circle, ${hc} ${Ca}px, transparent ${Ca}px)`,Ce.style.backgroundSize=`${n}px ${n}px`,Ce.style.backgroundPosition=`${r}px ${i}px`}function bc(e,t,o){let{scale:n,offsetX:r,offsetY:i}=Te(),a=Math.min(mc,Math.max(pc,n+o));if(a===n)return;let s=(e-r)/n,c=(t-i)/n,u=e-s*a,d=t-c*a;Fn(a,u,d)}function Sa(e){e.preventDefault();let t=-e.deltaY*fc,{scale:o}=Te(),n=t*o;bc(e.clientX,e.clientY,n)}function ka(e,t){let{scale:o,offsetX:n,offsetY:r}=Te();Fn(o,n+e,r+t)}function Ma(){Fn(1,0,0)}function Na(){return j!==null}function La(){j?br():yc()}function br(){if(en.forEach(e=>e(null)),fr?.(),fr=null,j){for(;j.firstChild;)document.body.insertBefore(j.firstChild,j);j.remove(),j=null}Ce?.remove(),Ce=null,Ea=[],document.body.style.background=gr,document.documentElement.style.background=hr,gr="",hr=""}var pc,mc,fc,gc,Ca,hc,j,Ce,fr,Ea,en,gr,hr,Ct=Rt(()=>{"use strict";he();U();pc=.1,mc=5,fc=.002,gc=24,Ca=1,hc="rgba(0,0,0,0.15)",j=null,Ce=null,fr=null,Ea=[],en=[];gr="",hr=""});function es(e,t){if(!rt)return;let o=performance.now(),n=Math.abs(e-rt.clientX),r=Math.abs(t-rt.clientY),i=n<=2&&r<=2,a=o-rt.timestamp<16;if(i||a)return rt.element}function ts(e,t,o){rt={clientX:e,clientY:t,element:o,timestamp:performance.now()}}function kt(){rt=null}var rt,Sr=Rt(()=>{"use strict";rt=null});var os={};Ns(os,{activateInteraction:()=>Nr,destroyInteraction:()=>Lr,getPageElementAtPoint:()=>cn,initInteraction:()=>Mr,refreshDrawCursor:()=>Ac,registerToolHandler:()=>Mt,setInteractionCursor:()=>ro,setInteractionPointerEvents:()=>Hc});function Mt(e,t){kr.set(e,t)}function Mr(){H=document.createElement("div"),H.setAttribute("data-sketch-ui-interaction","true"),H.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(H),document.addEventListener("scroll",kt,!0),H.addEventListener("mousedown",e=>{ln?.onMouseDown?.(e)}),H.addEventListener("mousemove",e=>{ln?.onMouseMove?.(e)}),H.addEventListener("mouseup",e=>{ln?.onMouseUp?.(e)}),document.addEventListener("wheel",ns,{passive:!1})}function ns(e){!H||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#sketch-ui-root")||Sa(e)}function Nr(e){ln=kr.get(e)||null,H&&(H.style.pointerEvents=e==="pointer"?"none":"auto"),$c(e)}function $c(e){if(H)switch(e){case"pointer":H.style.cursor="default";break;case"grab":H.style.cursor="grab";break;case"move":H.style.cursor=Xr();break;case"draw":H.style.cursor=xo(ge().brushSize);break;case"text":H.style.cursor="text";break;default:H.style.cursor="default"}}function Ac(){oa()==="draw"&&H&&(H.style.cursor=xo(ge().brushSize))}function ro(e){H&&(H.style.cursor=e)}function Hc(e){H&&(H.style.pointerEvents=e?"auto":"none")}function cn(e,t){let o=es(e,t);if(o!==void 0)return o;let n=document.elementsFromPoint(e,t),r=null;for(let i of n)if(i instanceof HTMLElement&&!i.closest("#sketch-ui-root")&&!i.hasAttribute("data-sketch-ui-interaction")&&!i.hasAttribute("data-sketch-ui-ghost")&&!(i===document.body||i===document.documentElement)){r=i;break}return ts(e,t,r),r}function Lr(){document.removeEventListener("scroll",kt,!0),document.removeEventListener("wheel",ns),H?.remove(),H=null,ln=null,kr.clear()}var H,ln,kr,Nt=Rt(()=>{"use strict";he();U();Sr();Ct();H=null,ln=null,kr=new Map});function Ls(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let o=document.createElement("canvas").getContext("2d");o.fillStyle="#000000",o.fillStyle=t;let n=o.fillStyle;if(n.startsWith("#"))return n;let r=n.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),s=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+s).toString(16).slice(1)}`}return e}function Rs(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(C=>{try{return Array.from(C.cssRules)}catch{return[]}}).filter(C=>C instanceof CSSStyleRule&&C.selectorText===":root").flatMap(C=>Array.from(C.style)).filter(C=>C.startsWith("--")),o={},n={},r={},i={},a={},s={},c={},u={},d={},p={},m={},f={},g={},b={},x={},L={},$={},O={},z=(C,A,oe,re)=>{C[oe]=re,A[re]=oe};for(let C of t){let A=e.getPropertyValue(C).trim();if(!A)continue;let oe=C.match(/^--spacing-(.+)$/);if(oe){z(o,p,oe[1],A);continue}let re=C.match(/^--color-(.+)$/);if(re){let mn=re[1];n[mn]=A,m[Ls(A)]=mn;continue}let M=C.match(/^--font-size-(.+)$/);if(M){z(r,f,M[1],A);continue}let B=C.match(/^--font-weight-(.+)$/);if(B){z(i,g,B[1],A);continue}let y=C.match(/^--radius-(.+)$/);if(y){z(a,b,y[1],A);continue}let S=C.match(/^--border-(.+)$/);if(S){z(s,x,S[1],A);continue}let Y=C.match(/^--opacity-(.+)$/);if(Y){z(c,L,Y[1],A);continue}let ce=C.match(/^--tracking-(.+)$/);if(ce){z(u,$,ce[1],A);continue}let De=C.match(/^--leading-(.+)$/);if(De){z(d,O,De[1],A);continue}}return{spacing:o,colors:n,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:s,opacity:c,letterSpacing:u,lineHeight:d,spacingReverse:p,colorsReverse:m,fontSizeReverse:f,fontWeightReverse:g,borderRadiusReverse:b,borderWidthReverse:x,opacityReverse:L,letterSpacingReverse:$,lineHeightReverse:O}}var Ps=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function Os(e,t){let o={};for(let n of Ps){let r=e[n]??{},i=t[n]??{};o[n]=new Map([...Object.entries(r),...Object.entries(i)])}return o}function gn(e,t){return t.get(e)??null}function Dr(e,t,o){let r=(o??Ot())[e],i=[];for(let[s,c]of r.entries()){let u=parseFloat(c);isNaN(u)||i.push({numericValue:u,token:s,cssValue:c})}let a=parseFloat(t);return isNaN(a)||i.some(c=>c.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((s,c)=>s.numericValue-c.numericValue),i}var Fr=null,Pt=null;function zr(e){Fr=e,Pt=null}function Ot(){if(Pt!==null)return Pt;let e=Rs();return Pt=Os(e,Fr??{}),Pt}var ie=null,$t=[],at=0,$s=5,fo=null,go=null,ho=null,yo=null,bo=null,vo=null;function Vr(e){vo=e}function hn(e){ie&&ie.readyState===WebSocket.OPEN||(bo=e,ie=new WebSocket(`ws://localhost:${e}`),ie.onopen=()=>{let t=at>0;at=0,t&&yo&&yo()},ie.onmessage=t=>{try{let o=JSON.parse(t.data);o.type==="tailwindTokens"&&zr(o.tokens),o.type==="updatePropertyComplete"&&vo&&vo(o.success,o.errorCode,o.error),$t.forEach(n=>n(o))}catch{}},ie.onclose=t=>{if(ie=null,t.code===4001){ho&&ho();return}if(at<$s){let o=500*Math.pow(2,at);at++,fo=setTimeout(()=>hn(e),o)}else go&&go()},ie.onerror=()=>{})}function Ee(e){ie&&ie.readyState===WebSocket.OPEN&&ie.send(JSON.stringify(e))}function Ke(e){return $t.push(e),()=>{$t=$t.filter(t=>t!==e)}}function Br(){fo&&clearTimeout(fo),ie&&(ie.close(),ie=null),$t=[]}function Gr(e){go=e}function Wr(e){ho=e}function Yr(e){yo=e}function jr(){bo&&(at=0,hn(bo))}U();var lt=null,X=null,At=0,bn=null,vn=null,qe=null,Co=null,st=null,Ht=null,Eo=null,Zr=null,As='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',Jr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',wo='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',Hs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',Kr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',_s=`
  :host {
    all: initial;
  }
  ${Ur}
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
    box-shadow: ${R.md};
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
    box-shadow: ${R.md};
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
`;function Qr(e){let t=document.createElement("div");t.id="sketch-ui-root",document.body.appendChild(t),lt=t.attachShadow({mode:"open"});let o=document.createElement("style");o.textContent=_s;let n=document.createElement("div");n.className="toolbar",n.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn eye-btn" title="Toggle originals (.)">
      ${Jr}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${wo}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Generate</button>
    <button class="icon-btn close-btn" title="Close SketchUI">
      ${Hs}
    </button>
  `,lt.appendChild(o),lt.appendChild(n),X=n.querySelector(".undo-btn");let r=n.querySelector(".close-btn");bn=n.querySelector(".generate-btn"),vn=n.querySelector(".eye-btn"),st=n.querySelector(".component-detail"),qe=document.createElement("div"),qe.className="toast",lt.appendChild(qe),X.addEventListener("click",()=>{Ee({type:"undo"}),X&&(X.innerHTML='<div class="spinner"></div>',X.disabled=!0)}),r.addEventListener("click",e),vn.addEventListener("click",()=>{Ht&&Ht()}),bn.addEventListener("click",()=>{Eo&&Eo()}),document.addEventListener("keydown",i=>{i.key==="."&&(i.ctrlKey||i.metaKey)&&!qr()&&(Ht&&Ht(),i.preventDefault()),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!qr()&&Zr?.()&&i.preventDefault()}),Gr(()=>{q("Disconnected. Click to reconnect."),jr()}),Wr(()=>{q("Disconnected: another tab took over")}),Yr(()=>{At=0,X&&(X.disabled=!0)}),Ke(i=>{switch(i.type){case"reorderComplete":i.success?(At++,X&&(X.innerHTML=Kr,setTimeout(()=>{X&&(X.innerHTML=wo,X.disabled=!1)},200))):i.error&&q(i.error);break;case"undoComplete":i.success?(At=Math.max(0,At-1),X&&(X.innerHTML=Kr,setTimeout(()=>{X&&(X.innerHTML=wo,X.disabled=At===0)},200))):i.error&&q(i.error);break;case"devServerDisconnected":q("Dev server disconnected");break;case"devServerReconnected":q("Dev server reconnected");break}})}function ei(){let e=document.getElementById("sketch-ui-root");e&&e.remove(),lt=null,X=null}function K(){return lt}function ti(e){Ht=e}function ni(e){Eo=e}function oi(e){Zr=e}function xn(e){vn&&(vn.innerHTML=e?Jr:As)}function ri(e){bn&&(bn.disabled=!e)}function Oe(e){if(!st)return;if(!e){st.className="component-detail empty",st.textContent="No selection";return}st.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";st.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function q(e){qe&&(qe.textContent=e,qe.classList.add("visible"),Co&&clearTimeout(Co),Co=setTimeout(()=>{qe?.classList.remove("visible")},2e3))}function qr(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var To="0.5.32",Ft=`bippy-${To}`,ii=Object.defineProperty,Is=Object.prototype.hasOwnProperty,_t=()=>{},si=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},wn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),li=!1,ai,It=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>li?!0:(e&&typeof e.inject=="function"&&(ai=e.inject.toString()),!!ai?.includes("(injected)")),Cn=new Set,ze=new Set,So=e=>{let t=new Map,o=0,n={_instrumentationIsActive:!1,_instrumentationSource:Ft,checkDCE:si,hasUnsupportedRendererAttached:!1,inject(r){let i=++o;return t.set(i,r),ze.add(r),n._instrumentationIsActive||(n._instrumentationIsActive=!0,Cn.forEach(a=>a())),i},on:_t,onCommitFiberRoot:_t,onCommitFiberUnmount:_t,onPostCommitFiberRoot:_t,renderers:t,supportsFiber:!0,supportsFlight:!0};try{ii(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return n},set(a){if(a&&typeof a=="object"){let s=n.renderers;n=a,s.size>0&&(s.forEach((c,u)=>{ze.add(c),a.renderers.set(u,c)}),Dt(e))}}});let r=window.hasOwnProperty,i=!1;ii(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{Dt(e)}return n},Dt=e=>{e&&Cn.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=si,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=Ft,t._instrumentationIsActive=!1;let o=wn(t);if(o||(t.on=_t),t.renderers.size){t._instrumentationIsActive=!0,Cn.forEach(i=>i());return}let n=t.inject,r=It(t);r&&!o&&(li=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=n(i);return ze.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,Cn.forEach(s=>s()),a}}(t.renderers.size||t._instrumentationIsActive||It())&&e?.()}catch{}},ko=()=>Is.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),ct=e=>ko()?(Dt(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):So(e),Mo=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),En=()=>{try{Mo()&&ct()}catch{}};En();var No=0,Lo=1;var Ro=5;var Po=11,Oo=13;var $o=15,Ao=16;var Ho=19;var _o=26,Io=27,Do=28,Fo=30;var $e=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};function zo(e,t,o=!1){if(!e)return null;let n=t(e);if(n instanceof Promise)return(async()=>{if(await n===!0)return e;let i=o?e.return:e.child;for(;i;){let a=await Bo(i,t,o);if(a)return a;i=o?null:i.sibling}return null})();if(n===!0)return e;let r=o?e.return:e.child;for(;r;){let i=Vo(r,t,o);if(i)return i;r=o?null:r.sibling}return null}var Vo=(e,t,o=!1)=>{if(!e)return null;if(t(e)===!0)return e;let n=o?e.return:e.child;for(;n;){let r=Vo(n,t,o);if(r)return r;n=o?null:n.sibling}return null},Bo=async(e,t,o=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let n=o?e.return:e.child;for(;n;){let r=await Bo(n,t,o);if(r)return r;n=o?null:n.sibling}return null};var Go=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?Go(t.type||t.render):null},ve=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let o=t.displayName||t.name||null;if(o)return o;let n=Go(t);return n&&(n.displayName||n.name)||null};var Wo=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||wn(e)||It(e)};var Yo=e=>{let t=ct(e.onActive);t._instrumentationSource=e.name??Ft;let o=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,s,c)=>{o!==i&&(o?.(a,s,c),e.onCommitFiberRoot?.(a,s,c))};t.onCommitFiberRoot=i}let n=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,s)=>{t.onCommitFiberUnmount===i&&(n?.(a,s),e.onCommitFiberUnmount?.(a,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,s)=>{t.onPostCommitFiberRoot===i&&(r?.(a,s),e.onPostCommitFiberRoot?.(a,s))};t.onPostCommitFiberRoot=i}return t},xe=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let o of t.renderers.values())try{let n=o.findFiberByHostInstance?.(e);if(n)return n}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let o in e)if(o.startsWith("__reactContainer$")||o.startsWith("__reactInternalInstance$")||o.startsWith("__reactFiber"))return e[o]||null}return null},Ds=Error();var ci=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Fs=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],zs=["<anonymous>","eval",""],bi=/\.(jsx|tsx|ts|js)$/,Vs=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Bs=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,vi="(at Server)",Gs=/(^|@)\S+:\d+/,xi=/^\s*at .*(\S+:\d+|\(native\))/m,Ws=/^(eval@)?(\[native code\])?$/;var Ci=(e,t)=>{if(t?.includeInElement!==!1){let o=e.split(`
`),n=[];for(let r of o)if(/^\s*at\s+/.test(r)){let i=di(r,void 0)[0];i&&n.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");n.push({functionName:i,source:r})}else if(r.match(Gs)){let i=ui(r,void 0)[0];i&&n.push(i)}return Xo(n,t)}return e.match(xi)?di(e,t):ui(e,t)},wi=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,o=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return o?[o[1],o[2]||void 0,o[3]||void 0]:[t,void 0,void 0]},Xo=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e;var di=(e,t)=>Xo(e.split(`
`).filter(o=>!!o.match(xi)),t).map(o=>{let n=o;n.includes("(eval ")&&(n=n.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=n.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=wi(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:n}});var ui=(e,t)=>Xo(e.split(`
`).filter(o=>!o.match(Ws)),t).map(o=>{let n=o;if(n.includes(" > eval")&&(n=n.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!n.includes("@")&&!n.includes(":"))return{functionName:n};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=n.match(r),a=i&&i[1]?i[1]:void 0,s=wi(n.replace(r,""));return{functionName:a,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:n}}});var Ys=44,pi="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",js=new Uint8Array(64),Ei=new Uint8Array(128);for(let e=0;e<pi.length;e++){let t=pi.charCodeAt(e);js[e]=t,Ei[t]=e}function zt(e,t){let o=0,n=0,r=0;do r=Ei[e.next()],o|=(r&31)<<n,n+=5;while(r&32);let i=o&1;return o>>>=1,i&&(o=-2147483648|-o),t+o}function mi(e,t){return e.pos>=t?!1:e.peek()!==Ys}var Us=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:o}=this,n=t.indexOf(e,o);return n===-1?t.length:n}};function Ti(e){let{length:t}=e,o=new Us(e),n=[],r=0,i=0,a=0,s=0,c=0;do{let u=o.indexOf(";"),d=[],p=!0,m=0;for(r=0;o.pos<u;){let f;r=zt(o,r),r<m&&(p=!1),m=r,mi(o,u)?(i=zt(o,i),a=zt(o,a),s=zt(o,s),mi(o,u)?(c=zt(o,c),f=[r,i,a,s,c]):f=[r,i,a,s]):f=[r],d.push(f),o.pos++}p||Xs(d),n.push(d),o.pos=u+1}while(o.pos<=t);return n}function Xs(e){e.sort(Ks)}function Ks(e,t){return e[0]-t[0]}var Si=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,qs=/^data:application\/json[^,]+base64,/,Zs=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,ki=typeof WeakRef<"u",Vt=new Map,Tn=new Map,Js=e=>ki&&e instanceof WeakRef,fi=(e,t,o,n)=>{if(o<0||o>=e.length)return null;let r=e[o];if(!r||r.length===0)return null;let i=null;for(let d of r)if(d[0]<=n)i=d;else break;if(!i||i.length<4)return null;let[,a,s,c]=i;if(a===void 0||s===void 0||c===void 0)return null;let u=t[a];return u?{columnNumber:c,fileName:u,lineNumber:s+1}:null},Qs=(e,t,o)=>{if(e.sections){let n=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&o>=a.offset.column)n=a;else break;if(!n)return null;let r=t-n.offset.line,i=t===n.offset.line?o-n.offset.column:o;return fi(n.map.mappings,n.map.sources,r,i)}return fi(e.mappings,e.sources,t-1,o)},el=(e,t)=>{let o=t.split(`
`),n;for(let i=o.length-1;i>=0&&!n;i--){let a=o[i].match(Zs);a&&(n=a[1]||a[2])}if(!n)return null;let r=Si.test(n);if(!(qs.test(n)||r||n.startsWith("/"))){let i=e.split("/");i[i.length-1]=n,n=i.join("/")}return n},tl=e=>({file:e.file,mappings:Ti(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),nl=e=>{let t=e.sections.map(({map:n,offset:r})=>({map:{...n,mappings:Ti(n.mappings)},offset:r})),o=new Set;for(let n of t)for(let r of n.map.sources)o.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(o),sourcesContent:void 0,version:3}},gi=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let o=t.match(Si);if(!o)return!0;let n=o[0].toLowerCase();return n==="http:"||n==="https:"},ol=async(e,t=fetch)=>{if(!gi(e))return null;let o;try{let r=await t(e);if(!r.ok)return null;o=await r.text()}catch{return null}if(!o)return null;let n=el(e,o);if(!n||!gi(n))return null;try{let r=await t(n);if(!r.ok)return null;let i=await r.json();return"sections"in i?nl(i):tl(i)}catch{return null}},rl=async(e,t=!0,o)=>{if(t&&Vt.has(e)){let i=Vt.get(e);if(i==null)return null;if(Js(i)){let a=i.deref();if(a)return a;Vt.delete(e)}else return i}if(t&&Tn.has(e))return Tn.get(e);let n=ol(e,o);t&&Tn.set(e,n);let r=await n;return t&&Tn.delete(e),t&&(r===null?Vt.set(e,null):Vt.set(e,ki?new WeakRef(r):r)),r},il=async(e,t=!0,o)=>await Promise.all(e.map(async n=>{if(!n.fileName)return n;let r=await rl(n.fileName,t,o);if(!r||typeof n.lineNumber!="number"||typeof n.columnNumber!="number")return n;let i=Qs(r,n.lineNumber,n.columnNumber);return i?{...n,source:i.fileName&&n.source?n.source.replace(n.fileName,i.fileName):n.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:n})),al=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",sl=()=>{let e=ct();for(let t of[...Array.from(ze),...Array.from(e.renderers.values())]){let o=t.currentDispatcherRef;if(o&&typeof o=="object")return"H"in o?o.H:o.current}return null},hi=e=>{for(let t of ze){let o=t.currentDispatcherRef;o&&typeof o=="object"&&("H"in o?o.H=e:o.current=e)}},Ae=e=>`
    in ${e}`,ll=(e,t)=>{let o=Ae(e);return t&&(o+=` (at ${t})`),o},jo=!1,Uo=(e,t)=>{if(!e||jo)return"";let o=Error.prepareStackTrace;Error.prepareStackTrace=void 0,jo=!0;let n=sl();hi(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let d;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(m){d=m}Reflect.construct(e,[],p)}else{try{p.call()}catch(m){d=m}e.call(p.prototype)}}else{try{throw Error()}catch(m){d=m}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&d instanceof Error&&typeof p.stack=="string")return[p.stack,d.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,u]=s.DetermineComponentFrameRoot();if(c&&u){let d=c.split(`
`),p=u.split(`
`),m=0,f=0;for(;m<d.length&&!d[m].includes("DetermineComponentFrameRoot");)m++;for(;f<p.length&&!p[f].includes("DetermineComponentFrameRoot");)f++;if(m===d.length||f===p.length)for(m=d.length-1,f=p.length-1;m>=1&&f>=0&&d[m]!==p[f];)f--;for(;m>=1&&f>=0;m--,f--)if(d[m]!==p[f]){if(m!==1||f!==1)do if(m--,f--,f<0||d[m]!==p[f]){let g=`
${d[m].replace(" at new "," at ")}`,b=ve(e);return b&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",b)),g}while(m>=1&&f>=0);break}}}finally{jo=!1,Error.prepareStackTrace=o,hi(n),console.error=r,console.warn=i}let a=e?ve(e):"";return a?Ae(a):""},cl=(e,t)=>{let o=e.tag,n="";switch(o){case Do:n=Ae("Activity");break;case Lo:n=Uo(e.type,!0);break;case Po:n=Uo(e.type.render,!1);break;case No:case $o:n=Uo(e.type,!1);break;case Ro:case _o:case Io:n=Ae(e.type);break;case Ao:n=Ae("Lazy");break;case Oo:n=e.child!==t&&t!==null?Ae("Suspense Fallback"):Ae("Suspense");break;case Ho:n=Ae("SuspenseList");break;case Fo:n=Ae("ViewTransition");break;default:return""}return n},dl=e=>{try{let t="",o=e,n=null;do{t+=cl(o,n);let r=o._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=ll(a.name,a.env))}n=o,o=o.return}while(o);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},ul=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let o=e;if(!o)return"";Error.prepareStackTrace=t,o.startsWith(`Error: react-stack-top-frame
`)&&(o=o.slice(29));let n=o.indexOf(`
`);if(n!==-1&&(o=o.slice(n+1)),n=Math.max(o.indexOf("react_stack_bottom_frame"),o.indexOf("react-stack-bottom-frame")),n!==-1&&(n=o.lastIndexOf(`
`,n)),n!==-1)o=o.slice(0,n);else return"";return o},pl=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),ml=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,fl=e=>{let t=new Map;for(let o of e)for(let n of o.stackFrames){if(!pl(n))continue;let r=n.functionName,i=t.get(r)??[];i.some(a=>ml(a,n))||(i.push(n),t.set(r,i))}return t},gl=(e,t,o)=>{if(!e.functionName)return{...e,isServer:!0};let n=t.get(e.functionName);if(!n||n.length===0)return{...e,isServer:!0};let r=o.get(e.functionName)??0,i=n[r%n.length];return o.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(vi,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},hl=e=>{let t=[];return zo(e,o=>{if(!al(o))return;let n=typeof o.type=="string"?o.type:ve(o.type)||"<anonymous>";t.push({componentName:n,stackFrames:Ci(ul(o._debugStack?.stack))})},!0),t},dt=async(e,t=!0,o)=>{let n=hl(e),r=Ci(dl(e)),i=fl(n),a=new Map;return il(r.map(s=>s.source?.includes(vi)??!1?gl(s,i,a):s).filter((s,c,u)=>{if(c===0)return!0;let d=u[c-1];return s.functionName!==d.functionName}),t,o)};var yi=e=>e.split("/").filter(Boolean).length,yl=e=>e.split("/").filter(Boolean)[0]??null,bl=e=>{let t=e.indexOf("/",1);if(t===-1||yi(e.slice(0,t))!==1)return e;let o=e.slice(t);if(!bi.test(o)||yi(o)<2)return e;let n=yl(o);return!n||n.startsWith("@")||n.length>4?e:o},Ze=e=>{if(!e||zs.some(i=>i===e))return"";let t=e,o=t.startsWith("http://")||t.startsWith("https://");if(o)try{t=new URL(t).pathname}catch{}if(o&&(t=bl(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),s=i.indexOf(":");t=a!==-1&&(s===-1||a<s)?i.slice(a+1):i}let n=!0;for(;n;){n=!1;for(let i of Fs)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),n=!0;break}}if(ci.test(t)){let i=t.match(ci);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Bs.test(i)&&(t=t.slice(0,r))}return t},ut=e=>{let t=Ze(e);return!(!t||!bi.test(t)||Vs.test(t))};var vl=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);function pt(e){return!!(vl.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function xl(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let o=e.getBoundingClientRect(),n=window.innerWidth,r=window.innerHeight;return o.width>=n*.9&&o.height>=r*.9}var Cl=50,Sn=.9,wl=2147483600,El=1e3,Bt=new WeakMap;function Ko(){Bt=new WeakMap}function Tl(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function Sl(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=wl}function kl(e,t){let o=t.position;if(o!=="fixed"&&o!=="absolute")return!1;let n=e.getBoundingClientRect();if(n.width/window.innerWidth<Sn||n.height/window.innerHeight<Sn)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>El}function Gt(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&xl(e)||e.closest("#sketch-ui-root")||e instanceof HTMLElement&&e.hasAttribute("data-sketch-ui-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-sketch-ui-ghost"))return!1;let o=performance.now(),n=Bt.get(e);if(n&&o-n.timestamp<Cl)return n.isValid;let r=window.getComputedStyle(e);return Tl(e,r)?e.clientWidth/window.innerWidth>=Sn&&e.clientHeight/window.innerHeight>=Sn&&(Sl(r)||kl(e,r))?(Bt.set(e,{isValid:!1,timestamp:o}),!1):(Bt.set(e,{isValid:!0,timestamp:o}),!0):(Bt.set(e,{isValid:!1,timestamp:o}),!1)}var Ml=.75,Mi=32,kn=3,Mn=20,Ni=100,me=1;function mt(e,t,o){return Math.min(o,Math.max(t,e))}function Nl(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,o=window.innerHeight,{x:n,y:r}=e,i=n+e.width,a=r+e.height,s=n+e.width/2,c=r+e.height/2,u=mt(Math.ceil(e.width/Mi),kn,Mn),d=mt(Math.ceil(e.height/Mi),kn,Mn);if(u*d>Ni){let g=Math.sqrt(Ni/(u*d));u=mt(Math.floor(u*g),kn,Mn),d=mt(Math.floor(d*g),kn,Mn)}let p=new Set,m=[],f=(g,b)=>{let x=mt(Math.round(g),0,t-1),L=mt(Math.round(b),0,o-1),$=`${x}:${L}`;p.has($)||(p.add($),m.push({x,y:L}))};f(n+me,r+me),f(i-me,r+me),f(n+me,a-me),f(i-me,a-me),f(s,r+me),f(s,a-me),f(n+me,c),f(i-me,c),f(s,c);for(let g=0;g<u;g++){let b=n+(g+.5)/u*e.width;for(let x=0;x<d;x++)f(b,r+(x+.5)/d*e.height)}return m}function Li(e,t=Gt,o=!0){let n={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=Nl(e);for(let c of i)for(let u of document.elementsFromPoint(c.x,c.y))r.add(u);let a=[];for(let c of r){if(!t(c))continue;let u=c.getBoundingClientRect();if(u.width<=0||u.height<=0)continue;let d={left:u.left,top:u.top,right:u.left+u.width,bottom:u.top+u.height};if(o){let p=Math.max(n.left,d.left),m=Math.max(n.top,d.top),f=Math.min(n.right,d.right),g=Math.min(n.bottom,d.bottom),b=Math.max(0,f-p)*Math.max(0,g-m),x=u.width*u.height;x>0&&b/x>=Ml&&a.push(c)}else n.left<d.right&&n.right>d.left&&n.top<d.bottom&&n.bottom>d.top&&a.push(c)}let s=a.filter(c=>!a.some(u=>u!==c&&u.contains(c)));return s.sort((c,u)=>{let d=c.compareDocumentPosition(u);return d&Node.DOCUMENT_POSITION_FOLLOWING?-1:d&Node.DOCUMENT_POSITION_PRECEDING?1:0}),s}U();function ft(e,t,o){return e+(t-e)*o}U();var Ll=.35,Ri=.3,Nn=.5,Rl=2,ne=null,G=null,qo=0,Zo=0,Yt=1,gt=null,J=null,_=null,V=[],Wt=l.accent,Pl="rgba(162,89,255,0.08)",Pi="rgba(162,89,255,0.15)",Ol=4,Oi=10,$l="#ffffff",Al=Wt,Hl=1.5,er=!0;function Ai(){let e=K();e&&(ne=document.createElement("canvas"),ne.setAttribute("data-sketch-ui-ghost","true"),ne.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(ne),tr(),window.addEventListener("resize",tr))}function jt(e,t=4){if(!e){J&&(J.targetOpacity=0,Je());return}let o={x:e.left,y:e.top,w:e.width,h:e.height};!J||!J.initialized?J=or(o,t):(J.target=o,J.borderRadius=t,J.targetOpacity=1),Je()}function Qe(e,t=4){if(!e){_&&(_.targetOpacity=0,Je());return}let o={x:e.left,y:e.top,w:e.width,h:e.height};!_||!_.initialized?_=or(o,t):(_.target=o,_.borderRadius=t,_.targetOpacity=1),Je()}function Hi(e){for(_=null;V.length>e.length;)V.pop();for(let t=0;t<e.length;t++){let o=e[t],n={x:o.rect.left,y:o.rect.top,w:o.rect.width,h:o.rect.height};t<V.length?(V[t].target=n,V[t].borderRadius=o.borderRadius,V[t].targetOpacity=1):V.push(or(n,o.borderRadius))}Je()}function Ut(){V=[],Je()}function nr(e,t){if(!er)return null;let o=Di();if(!o)return null;let n=Vi(o.x,o.y,o.w,o.h);for(let r of n){let i=e-r.x,a=t-r.y;if(i*i+a*a<=Oi*Oi)return r.corner}return null}function _i(){return Di()}function Ii(){gt!==null&&cancelAnimationFrame(gt),window.removeEventListener("resize",tr),ne?.remove(),ne=null,G=null,J=null,_=null,V=[]}function Di(){if(V.length>1)return Fi(V);if(_&&_.opacity>=.5){let{x:e,y:t,w:o,h:n}=_.current;return{x:e,y:t,w:o,h:n}}if(V.length===1){let{x:e,y:t,w:o,h:n}=V[0].current;return{x:e,y:t,w:o,h:n}}return null}function Fi(e){if(e.length===0)return null;let t=1/0,o=1/0,n=-1/0,r=-1/0;for(let i of e){let{x:a,y:s,w:c,h:u}=i.current;a<t&&(t=a),s<o&&(o=s),a+c>n&&(n=a+c),s+u>r&&(r=s+u)}return{x:t,y:o,w:n-t,h:r-o}}function or(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function tr(){ne&&(Yt=Math.max(window.devicePixelRatio||1,Rl),qo=window.innerWidth,Zo=window.innerHeight,ne.width=qo*Yt,ne.height=Zo*Yt,ne.style.width=`${qo}px`,ne.style.height=`${Zo}px`,G=ne.getContext("2d"),Je())}function Je(){gt===null&&(gt=requestAnimationFrame(zi))}function zi(){if(gt=null,!G||!ne)return;let e=!1;J?.initialized&&(Jo(J,Ll)&&(e=!0),J.opacity<.01&&J.targetOpacity===0&&(J=null)),_?.initialized&&(Jo(_,Ri)&&(e=!0),_.opacity<.01&&_.targetOpacity===0&&(_=null));for(let t=V.length-1;t>=0;t--){let o=V[t];o.initialized&&Jo(o,Ri)&&(e=!0),o.opacity<.01&&o.targetOpacity===0&&V.splice(t,1)}if(G.setTransform(1,0,0,1,0,0),G.clearRect(0,0,ne.width,ne.height),G.setTransform(Yt,0,0,Yt,0,0),J&&Qo(G,J,Wt,Pl),_&&(Qo(G,_,Wt,Pi),er&&$i(G,_.current,_.opacity)),V.length>0){for(let t of V)Qo(G,t,Wt,Pi);if(er&&V.length>0){let t=Fi(V);t&&t.w>=24&&t.h>=24&&(V.length>1&&(G.globalAlpha=.6,G.beginPath(),G.rect(t.x,t.y,t.w,t.h),G.strokeStyle=Wt,G.lineWidth=1,G.setLineDash([4,4]),G.stroke(),G.setLineDash([]),G.globalAlpha=1),$i(G,t,1))}}e&&(gt=requestAnimationFrame(zi))}function Jo(e,t){let o=e.current,n=e.target,r=ft(o.x,n.x,t),i=ft(o.y,n.y,t),a=ft(o.w,n.w,t),s=ft(o.h,n.h,t),c=ft(e.opacity,e.targetOpacity,t);return Math.abs(r-n.x)<Nn&&Math.abs(i-n.y)<Nn&&Math.abs(a-n.w)<Nn&&Math.abs(s-n.h)<Nn&&Math.abs(c-e.targetOpacity)<.01?(o.x=n.x,o.y=n.y,o.w=n.w,o.h=n.h,e.opacity=e.targetOpacity,!1):(o.x=r,o.y=i,o.w=a,o.h=s,e.opacity=c,!0)}function Qo(e,t,o,n){let{x:r,y:i,w:a,h:s}=t.current;if(a<=0||s<=0)return;let c=Math.min(t.borderRadius,a/2,s/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,a,s,c):e.rect(r,i,a,s),e.fillStyle=n,e.fill(),e.strokeStyle=o,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function Vi(e,t,o,n){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+o,y:t},{corner:"br",x:e+o,y:t+n},{corner:"bl",x:e,y:t+n}]}function $i(e,t,o){if(t.w<24||t.h<24)return;e.globalAlpha=o;let n=Vi(t.x,t.y,t.w,t.h);for(let r of n)e.beginPath(),e.arc(r.x,r.y,Ol,0,Math.PI*2),e.fillStyle=$l,e.fill(),e.strokeStyle=Al,e.lineWidth=Hl,e.stroke();e.globalAlpha=1}var _l=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],Il=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],Dl=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],Fl=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],zl=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],ht=[..._l,...Il,...Dl,...Fl,...zl];U();var Vl=new Set(["auto","none","normal","inherit","initial"]);function Bi(e,t,o,n){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let s=document.createElement("input");s.type="text",s.className="prop-input",s.style.cssText="width:60px; cursor:text;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${T};`,a.appendChild(s),a.appendChild(c);let u=new Map(t);function d(){return u.get(r.key)??r.defaultValue}function p(m){let f=parseFloat(m);s.value=isNaN(f)?m:String(f);try{let b=Dr(i,m).find(x=>x.cssValue===m);b?.token?c.textContent=`${r.tailwindPrefix}-${b.token}`:c.textContent=""}catch{c.textContent=""}}return s.addEventListener("blur",()=>{let m=s.value.trim(),f=parseFloat(m);if(isNaN(f))Vl.has(m)?(u.set(r.key,m),p(m),o(r.key,m),n()):p(d());else{let b=m.match(/(px|rem|em|%|vw|vh|ch)$/)?m:`${f}px`;u.set(r.key,b),p(b),o(r.key,b),n()}}),s.addEventListener("keydown",m=>{m.key==="Enter"?s.blur():m.key==="Escape"&&(p(d()),s.blur())}),p(d()),{element:a,setValue(m,f){m===r.key&&(u.set(m,f),p(f))},destroy(){}}}U();function Gi(e,t,o,n){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${l.bgTertiary};
    border-radius:${N.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let s=t.get(r.key)??r.defaultValue,c=[];function u(d){s=d;for(let{btn:p,value:m,opt:f}of c){let g=m===d;p.style.background=g?l.accent:"transparent",p.style.color=g?l.textOnAccent:l.textSecondary,p.title=g&&f.tailwindValue?`${f.label} (${f.tailwindValue})`:f.label}}for(let d of i){let p=document.createElement("button");p.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),p.textContent=d.icon??d.label,p.title=d.label,p.addEventListener("click",()=>{u(d.value),o(r.key,d.value),n()}),c.push({btn:p,value:d.value,opt:d}),a.appendChild(p)}return u(s),{element:a,setValue(d,p){d===r.key&&u(p)},destroy(){}}}U();U();function Ln(e){let t=parseInt(e.slice(1,3),16)/255,o=parseInt(e.slice(3,5),16)/255,n=parseInt(e.slice(5,7),16)/255,r=Math.max(t,o,n),i=Math.min(t,o,n),a=r-i,s=0;a!==0&&(r===t?s=((o-n)/a+(o<n?6:0))*60:r===o?s=((n-t)/a+2)*60:s=((t-o)/a+4)*60);let c=r===0?0:a/r*100,u=r*100;return{h:s,s:c,v:u}}function Rn(e){let t=e.h/360,o=e.s/100,n=e.v/100,r=Math.floor(t*6),i=t*6-r,a=n*(1-o),s=n*(1-i*o),c=n*(1-(1-i)*o),u,d,p;switch(r%6){case 0:u=n,d=c,p=a;break;case 1:u=s,d=n,p=a;break;case 2:u=a,d=n,p=c;break;case 3:u=a,d=s,p=n;break;case 4:u=c,d=a,p=n;break;case 5:u=n,d=a,p=s;break;default:u=0,d=0,p=0}let m=f=>Math.round(f*255).toString(16).padStart(2,"0");return`#${m(u)}${m(d)}${m(p)}`}var Ve=null;function Xt(e){yt();let t=K();if(!t)return;let o=document.createElement("div");o.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${R.lg};
    border-radius: ${N.md};
    font-family: ${T};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${k.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let y=o.getBoundingClientRect();y.right>window.innerWidth-8&&(o.style.left=`${window.innerWidth-y.width-8}px`),y.bottom>window.innerHeight-8&&(o.style.top=`${window.innerHeight-y.height-8}px`),o.style.opacity="1"});let n=Ln(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let y=Bl(["Fill","Text"],0,S=>{r=S===0?"backgroundColor":"color",e.onPropertyChange?.(r)});o.appendChild(y)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),s=document.createElement("div");s.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${R.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(s),o.appendChild(c);function u(){let y=n.h,S=a.createLinearGradient(0,0,176,0);S.addColorStop(0,`hsl(${y}, 0%, 100%)`),S.addColorStop(1,`hsl(${y}, 100%, 50%)`),a.fillStyle=S,a.fillRect(0,0,176,120);let Y=a.createLinearGradient(0,0,0,120);Y.addColorStop(0,"rgba(0,0,0,0)"),Y.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=Y,a.fillRect(0,0,176,120);let ce=n.s/100*176,De=(1-n.v/100)*120;s.style.left=`${ce}px`,s.style.top=`${De}px`}let d=!1;i.addEventListener("mousedown",y=>{d=!0,p(y)});function p(y){let S=i.getBoundingClientRect(),Y=Math.max(0,Math.min(176,y.clientX-S.left)),ce=Math.max(0,Math.min(120,y.clientY-S.top));n.s=Y/176*100,n.v=(1-ce/120)*100,u(),A()}let m=document.createElement("canvas");m.width=176,m.height=14,m.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let f=m.getContext("2d"),g=document.createElement("div");g.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${R.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let b=document.createElement("div");b.style.cssText="position:relative;width:176px;height:14px;",b.appendChild(m),b.appendChild(g),o.appendChild(b);function x(){let y=f.createLinearGradient(0,0,176,0);for(let S=0;S<=6;S++)y.addColorStop(S/6,`hsl(${S*60}, 100%, 50%)`);f.fillStyle=y,f.fillRect(0,0,176,14),g.style.left=`${n.h/360*176}px`}let L=!1;m.addEventListener("mousedown",y=>{L=!0,$(y)});function $(y){let S=m.getBoundingClientRect(),Y=Math.max(0,Math.min(176,y.clientX-S.left));n.h=Y/176*360,x(),u(),A()}let O=document.createElement("input");O.type="text",O.value=Rn(n),O.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: ${N.sm};
    color: ${l.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,O.addEventListener("keydown",y=>{y.key==="Enter"&&O.blur(),y.stopPropagation()}),O.addEventListener("blur",()=>{let y=O.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(y)){let S=y.startsWith("#")?y:`#${y}`;n=Ln(S),u(),x(),A()}else O.value=Rn(n)}),o.appendChild(O);let z=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],C=document.createElement("div");C.style.cssText="display:flex;gap:4px;justify-content:center;";for(let y of z){let S=document.createElement("button");S.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${y};
      border: 1px solid ${l.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${k.fast};
    `,S.addEventListener("mouseenter",()=>{S.style.boxShadow=R.sm}),S.addEventListener("mouseleave",()=>{S.style.boxShadow="none"}),S.addEventListener("click",()=>{n=Ln(y),u(),x(),O.value=y,A()}),C.appendChild(S)}o.appendChild(C);function A(){let y=Rn(n);O.value=y,e.onColorChange(y)}t.appendChild(o),Ve=o,u(),x();let oe=y=>{d&&p(y),L&&$(y)},re=()=>{d=!1,L=!1};document.addEventListener("mousemove",oe),document.addEventListener("mouseup",re);let M=y=>{y.key==="Escape"&&yt()};document.addEventListener("keydown",M,!0);let B=y=>{Ve&&!y.composedPath().includes(Ve)&&yt()};setTimeout(()=>document.addEventListener("mousedown",B,!0),0),o._cleanup=()=>{document.removeEventListener("mousemove",oe),document.removeEventListener("mouseup",re),document.removeEventListener("keydown",M,!0),document.removeEventListener("mousedown",B,!0)},o._onClose=e.onClose}function yt(){Ve&&(Ve._cleanup?.(),Ve._onClose?.(),Ve.remove(),Ve=null)}function Bl(e,t,o){let n=document.createElement("div");n.style.cssText=`
    display: flex;
    background: ${l.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;let r=[];for(let i=0;i<e.length;i++){let a=document.createElement("button");a.textContent=e[i],a.style.cssText=`
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i===t?l.bgPrimary:"transparent"};
      box-shadow: ${i===t?R.sm:"none"};
      color: ${i===t?l.textPrimary:l.textSecondary};
      font-family: ${T}; font-size: 12px; cursor: pointer;
      transition: background ${k.fast}, color ${k.fast};
    `,a.addEventListener("click",()=>{r.forEach((s,c)=>{s.style.background=c===i?l.bgPrimary:"transparent",s.style.boxShadow=c===i?R.sm:"none",s.style.color=c===i?l.textPrimary:l.textSecondary}),o(i)}),r.push(a),n.appendChild(a)}return n}var rr=null;function Gl(){return rr||(rr=document.createElement("canvas").getContext("2d")),rr}function Wi(e,t,o,n){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${N.sm};
    border:1px solid ${l.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("input");s.type="text",s.placeholder="#rrggbb",s.className="prop-input",s.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${T};`,i.appendChild(a),i.appendChild(s),i.appendChild(c);let u=t.get(r.key)??r.defaultValue,d=!1;function p(g){let b=g.trim().toLowerCase();if(b==="transparent")return"transparent";if(b==="inherit"||b==="currentcolor"||b==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(b))return b;let x=Gl();x.fillStyle="#000000",x.fillStyle=b;let L=x.fillStyle;if(L.startsWith("#"))return L;let $=L.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if($){let O=parseInt($[1],10),z=parseInt($[2],10),C=parseInt($[3],10);return`#${((1<<24)+(O<<16)+(z<<8)+C).toString(16).slice(1)}`}return"#000000"}function m(g){u=g,s.value=g,g==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=g;try{let b=Ot(),x=gn(g,b.colorsReverse);x?c.textContent=`${r.tailwindPrefix??"bg"}-${x}`:c.textContent=""}catch{c.textContent=""}}function f(){if(d)return;let g=s.value.trim();if(!g){m(u);return}let b=p(g);m(b),o(r.key,b),n()}return a.addEventListener("click",()=>{if(d){yt(),d=!1;return}let g=a.getBoundingClientRect();d=!0,Xt({initialColor:p(u),position:{x:g.left-210,y:g.top},showPropertyToggle:!1,onColorChange:b=>{m(b),o(r.key,b)},onClose:()=>{d=!1,n()}})}),s.addEventListener("keydown",g=>{g.key==="Enter"?(f(),s.blur()):g.key==="Escape"&&(m(u),s.blur())}),s.addEventListener("blur",()=>{f()}),s.addEventListener("input",()=>{let g=s.value.trim(),b=p(g);a.style.background=b}),m(u),{element:i,setValue(g,b){g===r.key&&m(b)},destroy(){d&&(yt(),d=!1)}}}U();function Yi(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function ji(e,t,o,n){let r=new Map(t),i=[];for(let E of e){let w=Yi(E.key);w&&i.push({descriptor:E,...w})}let a=document.createElement("div");a.style.cssText=`
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
  `.trim().replace(/\n\s*/g," ");let u=document.createElement("div");u.style.cssText=`
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
  `.trim().replace(/\n\s*/g," ");let d=document.createElement("div");d.style.cssText=`
    grid-row:2;
    grid-column:2;
    text-align:center;
    color:${l.textTertiary};
    font-size:9px;
    padding:4px 6px;
    background:${l.bgSecondary};
    border-radius:3px;
    user-select:none;
  `.trim().replace(/\n\s*/g," "),d.textContent="content";let p=[];function m(E){let w=document.createElement("span"),de=r.get(E.key)??E.defaultValue;return w.textContent=$(de),w.title=E.label,w.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),w.addEventListener("mouseenter",()=>{w.style.background=l.bgTertiary}),w.addEventListener("mouseleave",()=>{(document.activeElement!==f||f.dataset.key!==E.key)&&(w.style.background="transparent")}),w.addEventListener("click",()=>{x(E,w)}),p.push({key:E.key,span:w,descriptor:E}),w}let f=document.createElement("input");f.type="text",f.className="prop-input",f.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(f);let g=null,b=null;function x(E,w){g&&g!==E&&L(),g=E,b=w,f.dataset.key=E.key;let de=r.get(E.key)??E.defaultValue;f.value=$(de);let Z=0,Xe=0,Fe=w;for(;Fe&&Fe!==a;)Z+=Fe.offsetLeft,Xe+=Fe.offsetTop,Fe=Fe.offsetParent;f.style.display="block",f.style.left=`${Z}px`,f.style.top=`${Xe}px`;let Ir=w.getBoundingClientRect();f.style.width=`${Math.max(40,Ir.width+10)}px`,f.focus(),f.select()}function L(){if(!g||!b)return;let E=f.value.trim(),w=g,de=b,Z,Xe=parseFloat(E),Fe=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(Xe)?Fe.has(E)?Z=E:Z=r.get(w.key)??w.defaultValue:Z=E.match(/(px|rem|em|%|vw|vh|ch)$/)?E:`${Xe}px`,r.set(w.key,Z),de.textContent=$(Z),de.style.background="transparent",f.style.display="none",f.dataset.key="",g=null,b=null,o(w.key,Z),n()}f.addEventListener("keydown",E=>{if(E.key==="Enter")L();else if(E.key==="Escape"){if(g&&b){let w=r.get(g.key)??g.defaultValue;b.textContent=$(w)}f.style.display="none",f.dataset.key="",g=null,b=null}}),f.addEventListener("blur",()=>{L()});function $(E){let w=parseFloat(E);return isNaN(w)?E:w===Math.round(w)?String(Math.round(w)):E}function O(E){let w=document.createElement("span");return w.textContent=E,w.style.cssText=`
      font-size:9px;
      color:${l.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),w}function z(E,w){return i.find(de=>de.layer===E&&de.side===w)}function C(E,w){let de=z(E,w);if(!de){let Z=document.createElement("span");return Z.textContent="-",Z.style.cssText=`text-align:center; color:${l.textTertiary};`,Z}return m(de.descriptor)}let A=C("padding","top");A.style.gridRow="1",A.style.gridColumn="2",A.style.textAlign="center";let oe=C("padding","left");oe.style.gridRow="2",oe.style.gridColumn="1";let re=C("padding","right");re.style.gridRow="2",re.style.gridColumn="3";let M=C("padding","bottom");M.style.gridRow="3",M.style.gridColumn="2",M.style.textAlign="center",d.style.gridRow="2",d.style.gridColumn="2",u.appendChild(A),u.appendChild(oe),u.appendChild(d),u.appendChild(re),u.appendChild(M);let B=document.createElement("div");B.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let y=C("margin","top");y.style.gridRow="1",y.style.gridColumn="2",y.style.textAlign="center";let S=C("margin","left");S.style.gridRow="2",S.style.gridColumn="1";let Y=C("margin","right");Y.style.gridRow="2",Y.style.gridColumn="3";let ce=C("margin","bottom");ce.style.gridRow="3",ce.style.gridColumn="2",ce.style.textAlign="center";let De=document.createElement("div");De.style.cssText="grid-row:2; grid-column:2;",De.appendChild(u),B.appendChild(y),B.appendChild(S),B.appendChild(De),B.appendChild(Y),B.appendChild(ce);let mn=O("margin"),ks=O("padding"),fn=document.createElement("div");return fn.style.cssText="display:flex; gap:8px; padding:0 4px;",fn.appendChild(mn),fn.appendChild(ks),c.appendChild(B),s.appendChild(c),a.appendChild(fn),a.appendChild(s),{element:a,setValue(E,w){if(!Yi(E))return;r.set(E,w);let Z=p.find(Xe=>Xe.key===E);Z&&(Z.span.textContent=$(w))},destroy(){}}}U();var Pn=new Set;function Ui(e){return Pn.has(e)}var On=[];function Xi(e){return On.push(e),()=>{let t=On.indexOf(e);t>=0&&On.splice(t,1)}}var Wl={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},Yl={"number-scrub":Bi,segmented:Gi,"color-swatch":Wi,"box-model":ji},jl=`
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
`;function Ul(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function Xl(e){let t=new Map;for(let o of e){let n=t.get(o.group);n||(n=[],t.set(o.group,n)),n.push(o)}return t}function Kl(e){let t=[],o=new Map;for(let n of e)if(n.compound&&n.compoundGroup){let r=o.get(n.compoundGroup);r||(r=[],o.set(n.compoundGroup,r)),r.push(n)}else t.push({controlType:n.controlType,descriptors:[n]});for(let[,n]of o)t.push({controlType:n[0].controlType,descriptors:n});return t}var ql=new Set(["flexDirection","justifyContent","alignItems","gap"]);function Zl(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function ir(e,t,o,n){let r=document.createElement("div");r.className="prop-sections";let i=document.createElement("style");i.textContent=jl,r.appendChild(i);let a=[],s=Xl(e);for(let[c,u]of s){let d=c==="layout"&&!Zl(t)?u.filter(x=>!ql.has(x.key)):u;if(d.length===0)continue;let p=document.createElement("div");p.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${Wl[c]}</span>${Ul()}`;let f=document.createElement("div");f.className="prop-section-body";let g=Pn.has(c);if(g){let x=m.querySelector(".prop-section-chevron");x&&x.classList.add("collapsed"),f.classList.add("collapsed")}m.addEventListener("click",()=>{if(g=!g,g)Pn.add(c);else{Pn.delete(c);for(let L of On)L(c)}let x=m.querySelector(".prop-section-chevron");x&&x.classList.toggle("collapsed",g),f.classList.toggle("collapsed",g)}),p.appendChild(m);let b=Kl(d);for(let x of b){let L=Yl[x.controlType];if(!L)continue;let $=L(x.descriptors,t,o,n);if(x.descriptors.length>1||x.controlType==="box-model")f.appendChild($.element);else{let O=document.createElement("div");O.className="prop-control-row";let z=document.createElement("span");z.className="prop-control-label",z.textContent=x.descriptors[0].label,z.title=x.descriptors[0].label;let C=document.createElement("div");C.className="prop-control-value",C.appendChild($.element),O.appendChild(z),O.appendChild(C),f.appendChild(O)}a.push($)}p.appendChild(f),r.appendChild(p)}return{container:r,controls:a}}U();var Jl=300,Ki=260,qi=380,Zi="sketch-ui-sidebar-width",Ql=4,ec=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${l.bgPrimary};
    border-left: 1px solid ${l.border};
    box-shadow: ${R.lg};
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
    width: ${Ql}px;
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
`;function tc(){try{let e=localStorage.getItem(Zi);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=Ki&&t<=qi)return t}}catch{}return Math.min(Jl,Math.floor(window.innerWidth*.22))}function nc(e){try{localStorage.setItem(Zi,String(e))}catch{}}function Ji(e,t){let o=document.createElement("style");o.textContent=ec,e.appendChild(o);let n=document.createElement("div");n.className="prop-sidebar",n.style.width=`${tc()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",n.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let s=document.createElement("div");s.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let u=document.createElement("div");u.className="prop-sidebar-file-path",a.appendChild(s),a.appendChild(u);let d=document.createElement("button");d.className="prop-sidebar-close",d.title="Close panel",d.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>',i.appendChild(a),i.appendChild(d),n.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",n.appendChild(p);let m=document.createElement("div");m.className="prop-sidebar-content",n.appendChild(m),e.appendChild(n);let f=!1,g=0,b=0;r.addEventListener("pointerdown",M=>{M.preventDefault(),M.stopPropagation(),f=!0,g=M.clientX,b=n.offsetWidth,r.classList.add("active"),r.setPointerCapture(M.pointerId)}),r.addEventListener("pointermove",M=>{if(!f)return;let B=g-M.clientX,y=Math.max(Ki,Math.min(qi,b+B));n.style.width=`${y}px`});let x=()=>{f&&(f=!1,r.classList.remove("active"),nc(n.offsetWidth))};r.addEventListener("pointerup",x),r.addEventListener("pointercancel",x),n.addEventListener("pointerdown",M=>M.stopPropagation()),n.addEventListener("mousedown",M=>M.stopPropagation()),n.addEventListener("click",M=>M.stopPropagation()),n.addEventListener("mouseup",M=>M.stopPropagation()),d.addEventListener("click",()=>{O(),t&&t()});let L=!1;function $(M,B,y,S){s.textContent=`<${M}>`,s.appendChild(c),u.textContent=`${B}:${y}`,u.title=`${B}:${y}`,m.innerHTML="",m.appendChild(S),L||(L=!0,n.offsetHeight,n.classList.add("visible"))}function O(){L&&(L=!1,n.classList.remove("visible"))}function z(M){m.innerHTML="",m.appendChild(M)}function C(M,B,y){p.innerHTML="";let S=document.createElement("span");S.className="prop-sidebar-warning-text",S.textContent=M;let Y=document.createElement("button");Y.className="prop-sidebar-warning-btn",Y.textContent=B,Y.addEventListener("click",ce=>{ce.stopPropagation(),y()}),p.appendChild(S),p.appendChild(Y),p.style.display="flex"}function A(){p.style.display="none",p.innerHTML=""}function oe(){c.classList.add("active")}function re(){c.classList.remove("active")}return{show:$,hide:O,isVisible:()=>L,getElement:()=>n,replaceContent:z,showWarning:C,clearWarning:A,showSaving:oe,hideSaving:re}}he();var ur=new Map(ht.map(e=>[e.key,e]));var rc=new Set(["layout","spacing","size"]),ga=new Set(["typography","background"]),ic=5e3,h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map},et=[],I,ha,ue=null,ac=300,ye=null,bt=null,Bn=new MutationObserver(()=>{h.selectedElement&&!document.contains(h.selectedElement)&&(clearTimeout(ha),ha=setTimeout(()=>{sc()},80))});function sc(){let e=h.elementIdentity,t=h.componentInfo;if(!e||!t){xt();return}let o=lc(e);if(o){vt(o,t);return}cc(e).then(n=>{n?vt(n,t):xt()})}function lc(e){let t=document.querySelectorAll(e.tagName);for(let o of t)if(o instanceof HTMLElement)try{let n=xe(o);for(;n;){if($e(n)){let r=n._debugSource,i=ve(n);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return o}n=n.return}}catch{}return null}async function cc(e){let t=document.querySelectorAll(e.tagName);for(let o of t)if(o instanceof HTMLElement)try{let n=xe(o);if(!n)continue;let r=await dt(n);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let s="";if(i.fileName){let c=Ze(i.fileName);ut(c)&&(s=c)}if(s&&e.filePath.endsWith(s)&&(i.lineNumber??0)===e.lineNumber)return o}}catch{}return null}function dc(e,t){let o=getComputedStyle(e),n=new Map;for(let r of ht){if(t&&!t.has(r.group)){n.set(r.key,r.defaultValue);continue}let i=o.getPropertyValue(r.cssProperty).trim();n.set(r.key,i||r.defaultValue)}return n}function uc(e){if(!h.selectedElement)return;let t=getComputedStyle(h.selectedElement);for(let o of ht){if(o.group!==e||h.activeOverrides.has(o.key))continue;let r=t.getPropertyValue(o.cssProperty).trim()||o.defaultValue;h.currentValues.set(o.key,r),h.originalValues.get(o.key)===o.defaultValue&&h.originalValues.set(o.key,r);for(let i of et)i.setValue(o.key,r)}}function Jt(){for(let e of et)e.destroy();et=[]}function ya(){if(!h.selectedElement||!h.componentInfo)return;Jt();let{container:e,controls:t}=ir(ht,h.currentValues,Qt,Gn);et=t,I.replaceContent(e)}function Gn(){ue&&clearTimeout(ue),ue=setTimeout(()=>{ue=null,mr()},ac)}function pr(){ue&&(clearTimeout(ue),ue=null),bt&&(bt(),bt=null),ye&&(clearTimeout(ye.timeoutId),ye=null),h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map}}function ba(e){I=Ji(e,()=>{Wn(),Jt(),pr()}),Vr((t,o,n)=>{if(I&&I.hideSaving(),ye)if(clearTimeout(ye.timeoutId),t)ye=null;else{let{batch:r,previousOriginals:i}=ye;ye=null;for(let[a]of r){let s=i.get(a);s!==void 0&&h.originalValues.set(a,s)}if(h.selectedElement){for(let[a]of r){h.selectedElement.style[a]="",h.activeOverrides.delete(a);let s=h.originalValues.get(a);s!==void 0&&h.currentValues.set(a,s)}for(let a of et)for(let[s]of r){let c=h.originalValues.get(s);c!==void 0&&a.setValue(s,c)}}if(I){let s={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[o||""]||n||"Failed to write changes";I.showWarning(s,"Dismiss",()=>I.clearWarning())}}else if(!t&&I){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[o||""]||n||"Failed to write changes";I.showWarning(i,"Dismiss",()=>I.clearWarning())}})}function vt(e,t){h.pendingBatch.size>0&&mr(),Jt(),h.selectedElement=e,h.componentInfo=t,h.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let o=new Set(rc);for(let a of ga)Ui(a)||o.add(a);let n=dc(e,o);h.currentValues=n,h.originalValues=new Map(n),h.activeOverrides=new Map,h.pendingBatch=new Map,bt&&bt(),bt=Xi(a=>{ga.has(a)&&uc(a)});let{container:r,controls:i}=ir(ht,h.currentValues,Qt,Gn);et=i,Bn.disconnect(),Bn.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),I.show(t.componentName,t.filePath,t.lineNumber,r)}function Qt(e,t){let o=ur.get(e);if(!o||!h.selectedElement)return;h.selectedElement.style[o.key]=t,h.activeOverrides.set(e,t),h.currentValues.set(e,t);let n=Ot(),r=o.tailwindScale+"Reverse",i=n[r],a=i?gn(t,i):null;if(!a&&o.enumValues){let s=o.enumValues.find(c=>c.value===t);s&&(a=s.tailwindValue)}if(h.pendingBatch.set(e,{property:e,cssProperty:o.cssProperty,value:t,tailwindPrefix:o.tailwindPrefix,tailwindToken:a,relatedPrefixes:o.relatedPrefixes,originalValue:h.originalValues.get(e)||o.defaultValue}),e==="display")if(ya(),t==="none"){let s=h.originalValues.get("display")||"block";I.showWarning("Element hidden","Restore",()=>{h.selectedElement&&(h.selectedElement.style.display=s),h.activeOverrides.delete("display"),h.currentValues.set("display",s),h.pendingBatch.delete("display"),ya(),I.clearWarning()})}else I.clearWarning()}function mr(){if(h.pendingBatch.size===0||!h.componentInfo)return;let e=h.componentInfo.filePath,t=h.componentInfo.lineNumber,o=h.componentInfo.columnNumber-1;if(h.pendingBatch.size===1){let a=[...h.pendingBatch.values()][0],s=ur.get(a.property);Ee({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:o,...a,framework:"tailwind",classPattern:s?.classPattern,standalone:s?.standalone})}else Ee({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:o,updates:[...h.pendingBatch.values()].map(a=>{let s=ur.get(a.property);return{...a,classPattern:s?.classPattern,standalone:s?.standalone}}),framework:"tailwind"});h.selectedElement&&h.elementIdentity&&pa({type:"propertyChange",elementIdentity:h.elementIdentity,element:h.selectedElement,overrides:[...h.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),I&&I.showSaving();let n=new Map;for(let[a]of h.pendingBatch)n.set(a,h.originalValues.get(a)||"");for(let[a,s]of h.pendingBatch)h.originalValues.set(a,s.value);let r=new Map(h.pendingBatch),i=setTimeout(()=>{ye&&ye.batch===r&&(ye=null,I&&I.hideSaving())},ic);ye={batch:r,previousOriginals:n,timeoutId:i},h.pendingBatch.clear()}function Wn(){if(h.selectedElement){for(let[e]of h.activeOverrides)h.selectedElement.style[e]="";for(let[e,t]of h.originalValues)h.currentValues.set(e,t);for(let e of et)for(let[t,o]of h.originalValues)e.setValue(t,o);h.activeOverrides.clear(),h.pendingBatch.clear()}}function xt(){ue&&(clearTimeout(ue),ue=null),Bn.disconnect(),Wn(),Jt(),I&&I.hide(),pr()}function va(){ue&&(clearTimeout(ue),ue=null),Bn.disconnect(),mr(),Jt(),I&&I.hide(),pr()}function xa(){return h.activeOverrides.size>0}he();he();Ct();U();var vc="2147483644",vr=null;function Ra(){vr=Ta(xc)}function xc(e){for(let t of We().values())e?(e.appendChild(t.cloneEl),t.cloneEl.style.position="absolute",t.cloneEl.style.left=`${t.currentPos.x}px`,t.cloneEl.style.top=`${t.currentPos.y}px`,t.cloneEl.style.transform="",t.cloneEl.style.transformOrigin=""):(document.body.appendChild(t.cloneEl),t.cloneEl.style.position="fixed",t.cloneEl.style.left=`${t.currentPos.x}px`,t.cloneEl.style.top=`${t.currentPos.y}px`,t.cloneEl.style.transform="",t.cloneEl.style.transformOrigin="")}function Pa(e,t){let o=e.getBoundingClientRect(),{scale:n,offsetX:r,offsetY:i}=Te(),a=e.cloneNode(!0);a.setAttribute("data-sketch-ui-ghost","true"),a.style.width=`${o.width/n}px`,a.style.height=`${o.height/n}px`,a.style.zIndex=vc,a.style.pointerEvents="none",a.style.margin="0",a.style.boxSizing="border-box",a.style.boxShadow=R.sm;let s=(o.left-r)/n,c=(o.top-i)/n,u=yr();u?(a.style.position="absolute",a.style.left=`${s}px`,a.style.top=`${c}px`,u.appendChild(a)):(a.style.position="fixed",a.style.left=`${o.left}px`,a.style.top=`${o.top}px`,a.style.transform=`scale(${n})`,a.style.transformOrigin="0 0",document.body.appendChild(a));let d=e.style.opacity||"",p=e.style.visibility||"",m=Dn();e.style.opacity=m?"0":"0.3",m&&(e.style.visibility="hidden");let f={id:crypto.randomUUID(),componentRef:t,originalRect:{top:c,left:s,width:o.width/n,height:o.height/n},currentPos:{x:s,y:c},cloneEl:a,originalEl:e,originalOpacity:d,originalVisibility:p};return ra(f),f}function Yn(e,t,o){let n=We().get(e);if(!n)return;if(n.currentPos={x:t,y:o},yr())n.cloneEl.style.left=`${t}px`,n.cloneEl.style.top=`${o}px`;else{let{scale:i,offsetX:a,offsetY:s}=Te();n.cloneEl.style.left=`${t*i+a}px`,n.cloneEl.style.top=`${o*i+s}px`,n.cloneEl.style.transform=`scale(${i})`,n.cloneEl.style.transformOrigin="0 0"}}function tn(e,t){for(let o of We().values()){let n=o.cloneEl.getBoundingClientRect();if(e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom)return o}return null}function Oa(){vr?.(),vr=null}function jn(e){let t=We().get(e);t&&(t.cloneEl.style.boxShadow=R.lg,t.cloneEl.style.opacity="0.9",t.cloneEl.style.transition=`box-shadow ${k.settle}`)}function $a(e){let t=We().get(e);t&&(t.cloneEl.style.boxShadow=R.sm,t.cloneEl.style.opacity="1")}Wo()||Yo({onCommitFiberRoot(){}});async function Cc(e){let t=xe(e);if(!t)return null;try{let o=await dt(t);if(o&&o.length>0){let n=[];for(let r of o){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||pt(i))continue;let a="";if(r.fileName){let s=Ze(r.fileName);ut(s)&&(a=s)}n.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(n.length>0)return{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}}catch(o){console.warn("[SketchUI] getOwnerStack failed, falling back to fiber walk:",o)}return Aa(e,t)}function Aa(e,t){let o=[],n=t;for(;n;){if($e(n)){let r=ve(n.type),i=n._debugSource||n._debugOwner?._debugSource,a="",s=0,c=0;i&&(a=i.fileName||"",s=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!pt(r)&&o.push({componentName:r,filePath:a,lineNumber:s,columnNumber:c})}n=n.return}return o.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}function Ha(e){let t=xe(e);return t?Aa(e,t):null}var W=null,F=null,Ne=null,_e=!1,wt=!1,P=new Map,v=null,we=null,ke="idle",D=null,tt=null,be=null,Qn=null,nn=0,on=0,Ye=[],Un=!1,wc=null,Ec=null,Tc=null,Sc=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${R.sm};
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
`;function _a(e){wc=e.onStart,Ec=e.onMove,Tc=e.onEnd}function Ia(){let e=K();if(!e)return;let t=document.createElement("style");t.textContent=Sc,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),we=document.createElement("div"),we.className="marquee-box",e.appendChild(we),_e=!0,document.addEventListener("mousedown",Xn,!0),document.addEventListener("mousemove",Kn,!0),document.addEventListener("mouseup",qn,!0),document.addEventListener("keydown",Jn,!0),document.addEventListener("click",Zn,!0),document.addEventListener("scroll",Me,!0),window.addEventListener("resize",Me),wt=!0}function Xn(e){if(!_e||e.metaKey||e.ctrlKey)return;let t=document.elementFromPoint(e.clientX,e.clientY);if(t?.closest("#sketch-ui-root"))return;if(W||P.size>0){let r=nr(e.clientX,e.clientY);if(r){e.preventDefault(),e.stopPropagation();let i=_i();if(be=r,Qn=i?{...i}:null,P.size>0){Ye=[];for(let[a]of P){let s=getComputedStyle(a);Ye.push({element:a,width:parseFloat(s.width)||a.offsetWidth,height:parseFloat(s.height)||a.offsetHeight})}nn=0,on=0}else if(F){let a=getComputedStyle(F);nn=parseFloat(a.width)||F.offsetWidth,on=parseFloat(a.height)||F.offsetHeight,Ye=[]}D={x:e.clientX,y:e.clientY},ke="resize-drag";return}}e.preventDefault(),e.stopPropagation();let n=tn(e.clientX,e.clientY);if(n){e.shiftKey||rn(),D={x:e.clientX,y:e.clientY},tt=n.originalEl,Ne=n,ke="pending";return}if(!t||!Gt(t)){(W||P.size>0)&&(va(),W=null,F=null,Ne=null,rn(),Qe(null),v&&(v.classList.remove("visible"),v.style.display="none"),Oe(null));return}D={x:e.clientX,y:e.clientY},tt=t,Ne=null,Un=e.shiftKey,ke="pending"}function Kn(e){if(_e){if(ke==="resize-drag"&&be&&D&&Qn){e.preventDefault(),e.stopPropagation();let t=e.clientX-D.x,o=e.clientY-D.y;if(Ye.length>0){for(let n of Ye){let r=n.width,i=n.height;be==="tr"||be==="br"?r=Math.max(10,n.width+t):r=Math.max(10,n.width-t),be==="bl"||be==="br"?i=Math.max(10,n.height+o):i=Math.max(10,n.height-o),n.element.style.width=`${Math.round(r)}px`,n.element.style.height=`${Math.round(i)}px`}an()}else{let n=nn,r=on;be==="tr"||be==="br"?n=Math.max(10,nn+t):n=Math.max(10,nn-t),be==="bl"||be==="br"?r=Math.max(10,on+o):r=Math.max(10,on-o),n=Math.round(n),r=Math.round(r),Qt("width",`${n}px`),Qt("height",`${r}px`),Me()}return}if(ke==="pending"&&D){let t=Math.abs(e.clientX-D.x),o=Math.abs(e.clientY-D.y);(t>10||o>10)&&(ke="marquee")}if(ke==="marquee"&&D&&we){let t=Math.min(e.clientX,D.x),o=Math.min(e.clientY,D.y),n=Math.abs(e.clientX-D.x),r=Math.abs(e.clientY-D.y);we.style.display="block",we.style.left=`${t}px`,we.style.top=`${o}px`,we.style.width=`${n}px`,we.style.height=`${r}px`;return}if(ke==="idle"){if(W&&F||P.size>0){let a=nr(e.clientX,e.clientY);if(a){document.body.style.cursor=a==="tl"||a==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let o=tn(e.clientX,e.clientY);if(o){let a=o.cloneEl.getBoundingClientRect(),s=parseFloat(getComputedStyle(o.originalEl).borderRadius)||4;jt(a,s+2);return}let n=document.elementFromPoint(e.clientX,e.clientY);if(!n||!Gt(n)){jt(null);return}let r=n.getBoundingClientRect(),i=parseFloat(getComputedStyle(n).borderRadius)||4;jt(r,i+2)}}}function qn(e){if(!_e)return;let t=ke;if(ke="idle",t==="resize-drag"){document.body.style.cursor="",be=null,Qn=null,D=null,Ye.length>0?Ye=[]:Gn();return}if(t==="marquee"&&D){we&&(we.style.display="none"),kc(Math.min(e.clientX,D.x),Math.min(e.clientY,D.y),Math.max(e.clientX,D.x),Math.max(e.clientY,D.y)),D=null,tt=null,Un=!1;return}tt&&(Un?Mc(tt):(rn(),Da(tt))),D=null,tt=null,Un=!1}async function Da(e,t){try{let o=Ne?Ne.cloneEl.getBoundingClientRect():e.getBoundingClientRect();F=e,xr(o,{}),Nc();let n=await Cc(e);if(console.log("[SketchUI] selectElement:",e.tagName,"\u2192",n?.componentName,n?.filePath,"stack:",n?.stack?.map(r=>r.componentName)),!n)return;if(W={tagName:n.tagName,componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber,columnNumber:n.columnNumber,stack:n.stack,boundingRect:{top:o.top,left:o.left,width:o.width,height:o.height}},v){let r=n.filePath?`${n.filePath}:${n.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${n.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||vt(e,W),Oe({tagName:n.tagName,componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber})}catch(o){console.error("[SketchUI] selectElement error:",o)}}function kc(e,t,o,n){let r=Li({x:e,y:t,width:o-e,height:n-t});if(r.length!==0){xt(),W=null,F=null,Ne=null,Qe(null),v&&(v.classList.remove("visible"),v.style.display="none"),P.clear();for(let i of r.slice(0,50)){let a=Ha(i);if(!a)continue;let s=i.getBoundingClientRect(),c={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:s.top,left:s.left,width:s.width,height:s.height}};P.set(i,{element:i,info:c})}if(P.size!==0){if(P.size===1){let[i,a]=[...P.entries()][0];P.clear(),F=i,W=a.info;let s=i.getBoundingClientRect();if(xr(s,W),v){let c=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${c?`<span class="comp-path">${c}</span>`:""}`}vt(i,W),Oe({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}an(),Oe(null),v&&(v.innerHTML=`<span class="comp-name">${P.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function Mc(e){if(P.has(e)){if(P.delete(e),P.size===1){let[r,i]=[...P.entries()][0];P.clear(),Ut(),F=r,W=i.info;let a=r.getBoundingClientRect();if(xr(a,W),vt(r,W),v){let s=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${s?`<span class="comp-path">${s}</span>`:""}`}Oe({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else P.size===0?(Ut(),nt()):(an(),v&&(v.innerHTML=`<span class="comp-name">${P.size} elements selected</span>`));return}let t=Ha(e);if(!t)return;W&&F&&P.size===0&&(P.set(F,{element:F,info:W}),xt(),W=null,F=null,Qe(null));let o=e.getBoundingClientRect(),n={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:o.top,left:o.left,width:o.width,height:o.height}};P.set(e,{element:e,info:n}),an(),Oe(null),v&&(v.innerHTML=`<span class="comp-name">${P.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function rn(){P.clear(),Ut()}function an(){if(P.size===0){Ut();return}let e=[];for(let[t]of P){let o=t.getBoundingClientRect(),n=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:o,borderRadius:n+2})}Hi(e)}function Zn(e){_e&&(e.metaKey||e.ctrlKey||e.preventDefault())}function Jn(e){if(_e&&e.key==="Escape"){if(P.size>0){rn(),v&&(v.classList.remove("visible"),v.style.display="none"),Oe(null),e.preventDefault();return}if(W){if(xa()){Wn(),e.preventDefault();return}nt(),e.preventDefault()}}}function xr(e,t){if(F){let o=parseFloat(getComputedStyle(F).borderRadius)||4;Qe(e,o+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function Me(){if(P.size>0){an();return}if(!F||!W)return;let e=Ne?Ne.cloneEl.getBoundingClientRect():F.getBoundingClientRect(),t=parseFloat(getComputedStyle(F).borderRadius)||4;if(Qe(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function Nc(){jt(null)}function nt(){xt(),W=null,F=null,Ne=null,be=null,Qn=null,Ye=[],rn(),document.body.style.cursor="",Qe(null),v&&(v.classList.remove("visible"),v.style.display="none"),Oe(null)}function Fa(){return W}function za(){_e=!1,document.removeEventListener("mousedown",Xn,!0),document.removeEventListener("mousemove",Kn,!0),document.removeEventListener("mouseup",qn,!0),document.removeEventListener("keydown",Jn,!0),document.removeEventListener("click",Zn,!0),document.removeEventListener("scroll",Me,!0),window.removeEventListener("resize",Me),wt=!1,v?.remove(),v=null}function Cr(e){e&&!wt?(document.addEventListener("mousedown",Xn,!0),document.addEventListener("mousemove",Kn,!0),document.addEventListener("mouseup",qn,!0),document.addEventListener("keydown",Jn,!0),document.addEventListener("click",Zn,!0),document.addEventListener("scroll",Me,!0),window.addEventListener("resize",Me),wt=!0,_e=!0):!e&&wt&&(document.removeEventListener("mousedown",Xn,!0),document.removeEventListener("mousemove",Kn,!0),document.removeEventListener("mouseup",qn,!0),document.removeEventListener("keydown",Jn,!0),document.removeEventListener("click",Zn,!0),document.removeEventListener("scroll",Me,!0),window.removeEventListener("resize",Me),wt=!1,_e=!1)}function Va(){return F??null}async function Ba(e){await Da(e,{skipSidebar:!0})}function Ga(e){Ne=e,F=e.originalEl,Me()}var se=null,ae=null,je=null,Wa=null,sn=!1,Et=null,eo=[],to=new Map,no=!1,Lc=`
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
`,Tt=null;function Ya(){let e=K();if(!e)return;let t=document.createElement("style");t.textContent=Lc,e.appendChild(t),_a({onStart:Rc,onMove:Pc,onEnd:Oc}),Ke(o=>{o.type==="reorderComplete"&&(wr(),nt())})}function Rc(e,t,o){je=o,Wa=t,Et={x:e.clientX,y:e.clientY},sn=!1,no=!1,eo=[],to=new Map,Tt=null;let n=K();if(!n)return;se=document.createElement("div"),se.className="drag-preview";let r=t.getBoundingClientRect();se.style.width=`${r.width}px`,se.style.height=`${r.height}px`,se.innerHTML=t.outerHTML,n.appendChild(se),ae=document.createElement("div"),ae.className="drop-indicator",n.appendChild(ae);let i=o.stack[1];if(!i)return;Ee({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=Ke(s=>{if(s.type!=="siblingsList")return;a(),eo=s.siblings;let c=document.querySelectorAll("*");for(let u of c){if(u.closest("#sketch-ui-root"))continue;let d=xe(u);if(!d)continue;let p=d;for(;p;){if($e(p)){let m=p._debugSource||p._debugOwner?._debugSource;if(m){for(let f of s.siblings)m.lineNumber===f.lineNumber&&m.fileName===i.filePath&&to.set(f.lineNumber,{el:u,rect:u.getBoundingClientRect()});break}}p=p.return}}no=!0})}function Pc(e){if(!Et)return;let t=Math.abs(e.clientX-Et.x),o=Math.abs(e.clientY-Et.y);if(t<5&&o<5||(sn=!0,se&&(se.style.display="block",se.style.left=`${e.clientX+10}px`,se.style.top=`${e.clientY+10}px`),!no||!je))return;let n=null,r=1/0,i=0,a=0,s=0;for(let c of eo){if(c.lineNumber===je.lineNumber)continue;let u=to.get(c.lineNumber);if(!u)continue;let d=u.rect,p=d.top+d.height/2,m=Math.abs(e.clientY-p);m<r&&(r=m,n=c,e.clientY<p?i=d.top-2:i=d.bottom+2,a=d.left,s=d.width)}Tt=n,n&&ae?(ae.style.display="block",ae.style.top=`${i}px`,ae.style.left=`${a}px`,ae.style.width=`${s}px`):ae&&(ae.style.display="none")}function Oc(e){if(!sn||!Tt||!je){wr();return}Ee({type:"reorder",filePath:je.filePath,fromLine:je.lineNumber,toLine:Tt.lineNumber,fromComponent:je.componentName,toComponent:Tt.componentName}),se&&(se.style.display="none"),ae&&(ae.style.display="none"),sn=!1,Et=null}function wr(){se?.remove(),ae?.remove(),se=null,ae=null,je=null,Wa=null,sn=!1,Et=null,no=!1,eo=[],to=new Map,Tt=null}function ja(){wr()}U();he();var ot="http://www.w3.org/2000/svg",St=null,Q=null,Er=null;function Ua(){let e=K();e&&(St=document.createElementNS(ot,"svg"),St.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),Q=document.createElementNS(ot,"g"),Q.setAttribute("class","annotation-root"),St.appendChild(Q),e.appendChild(St),window.addEventListener("scroll",oo,{passive:!0}),Er=zn(oo),oo())}function oo(){if(!Q)return;let{scale:e,offsetX:t,offsetY:o}=Te();Q.setAttribute("transform",`translate(${t}, ${o}) scale(${e})`)}function Xa(e,t,o,n){if(!Q||t.length<2)return null;let r=document.createElementNS(ot,"g");r.setAttribute("data-annotation-id",e);let i=document.createElementNS(ot,"path");return i.setAttribute("d",Ja(t)),i.setAttribute("stroke",o),i.setAttribute("stroke-width",String(n)),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.setAttribute("fill","none"),r.appendChild(i),Q.appendChild(r),r}function Ka(e,t,o,n,r,i){if(!Q)return null;let a=document.createElementNS(ot,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(o)),a.setAttribute("width","300"),a.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${R.sm};
    padding: 4px 8px;
    border-radius: ${N.sm};
    font-size: ${r}px;
    font-family: ${T};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,s.textContent=n,a.appendChild(s),Q.appendChild(a),a}function qa(e){if(!Q)return;let t=Q.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function Tr(){Q&&(Q.innerHTML="")}function Za(){window.removeEventListener("scroll",oo),Er?.(),Er=null,St?.remove(),St=null,Q=null}function Ja(e){if(e.length===0)return"";let t=`M${e[0].x},${e[0].y}`;for(let o=1;o<e.length;o++)t+=` L${e[o].x},${e[o].y}`;return t}function Qa(e,t){if(!Q)return null;let o=[],n=document.createElementNS(ot,"g"),r=document.createElementNS(ot,"path");return r.setAttribute("stroke",e),r.setAttribute("stroke-width",String(t)),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("fill","none"),n.appendChild(r),Q.appendChild(n),{path:r,group:n,addPoint(i,a){o.push({x:i,y:a}),r.setAttribute("d",Ja(o))},getPoints(){return o}}}he();U();Ct();var Ue={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-7 1-4 7z"/></svg>',grab:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V8a2 2 0 0 0-4 0v3"/><path d="M14 10V6a2 2 0 0 0-4 0v4"/><path d="M10 9.5V5a2 2 0 0 0-4 0v9"/><path d="M6 14c0 3.31 2.69 6 6 6h2a6 6 0 0 0 6-6v-2"/></svg>',move:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',draw:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',color:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22l1-1h3l9-9"/><path d="M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7"/><path d="M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14"/><path d="m9 7 6 6"/><path d="M20 2a2.83 2.83 0 0 1 0 4L16 10"/></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18c3.87 0 7-3.13 7-7s-3.13-7-7-7H4"/><polyline points="8 10 4 6 8 2"/></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>'},rs=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",io=navigator.platform.includes("Mac")?"Cmd":"Ctrl",Or=[{type:"pointer",icon:Ue.pointer,label:"Pointer",shortcut:"V"},{type:"grab",icon:Ue.grab,label:"Grab",shortcut:"H"},{type:"move",icon:Ue.move,label:"Move",shortcut:"M"},{type:"draw",icon:Ue.draw,label:"Draw",shortcut:"D"},{type:"text",icon:Ue.text,label:"Text",shortcut:"T"}],_c=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${N.lg};
    box-shadow: ${R.md};
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
    box-shadow: ${R.sm};
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
    box-shadow: ${R.sm};
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
    box-shadow: ${R.sm};
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
    box-shadow: ${R.lg};
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
`,pe=null,ee=null,so=new Map,Ie=null,Rr=null,Pr=null;function is(e){Rr=e}function as(e){Pr=e}function ss(e){Ie&&(Ie.disabled=!e)}function ls(){let e=K();if(!e)return;let t=document.createElement("style");t.textContent=_c,e.appendChild(t),pe=document.createElement("div"),pe.className="tools-panel";let o=[["pointer","grab"],["move"],["draw","text"]];for(let s=0;s<o.length;s++){if(s>0){let c=document.createElement("div");c.className="tool-divider",pe.appendChild(c)}for(let c of o[s]){let u=Or.find(m=>m.type===c),d=document.createElement("button");d.className=`tool-btn${u.type==="pointer"?" active":""}`,d.innerHTML=`${u.icon}<span class="tooltip">${u.label}<span class="shortcut-badge">${rs}${u.shortcut}</span></span>`,d.addEventListener("click",()=>lr(u.type));let p=null;d.addEventListener("mouseenter",()=>{p=setTimeout(()=>d.classList.add("tooltip-visible"),400)}),d.addEventListener("mouseleave",()=>{p&&clearTimeout(p),d.classList.remove("tooltip-visible")}),pe.appendChild(d),so.set(u.type,d)}}ee=document.createElement("div"),ee.className="sub-options hidden",pe.appendChild(ee);let n=document.createElement("div");n.className="tool-divider",pe.appendChild(n),Ie=document.createElement("button"),Ie.className="action-btn",Ie.innerHTML=Ue.undo,Ie.title="Undo (Ctrl+Z)",Ie.disabled=!0,Ie.addEventListener("click",()=>{Pr&&Pr()}),pe.appendChild(Ie);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=Ue.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{Rr&&Rr()}),pe.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=Ue.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{La(),i.style.color=Na()?l.accent:""}),pe.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.textContent="?",a.title=`Keyboard Shortcuts (${rs}/)`,a.addEventListener("click",()=>ds()),pe.appendChild(a),e.appendChild(pe),document.addEventListener("keydown",cs,!0)}function cs(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||!e.ctrlKey&&!e.metaKey)return;let o=e.key.toUpperCase();if(e.key==="/"||e.key==="?"){ds(),e.preventDefault();return}let n=Or.find(r=>r.shortcut===o);n&&(lr(n.type),e.preventDefault())}var Le=null,dn=null;function ds(){Le?ao():Ic()}function Ic(){let e=K();if(!e||Le)return;Le=document.createElement("div"),Le.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let o=document.createElement("div");o.className="shortcuts-title",o.textContent="Keyboard Shortcuts",t.appendChild(o);let n=[{label:"Tools",items:Or.map(r=>({action:r.label,keys:[io,r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[io,"Z"]},{action:"Toggle Originals",keys:[io,"."]},{action:"Keyboard Shortcuts",keys:[io,"/"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Grab Tool","Drag"]},{action:"Zoom",keys:["Scroll Wheel"]}]}];for(let r of n){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let s of r.items){let c=document.createElement("div");c.className="shortcut-row";let u=document.createElement("span");u.className="shortcut-action",u.textContent=s.action,c.appendChild(u);let d=document.createElement("span");d.className="shortcut-keys";for(let p=0;p<s.keys.length;p++){if(p>0){let f=document.createElement("span");f.className="shortcut-plus",f.textContent="+",d.appendChild(f)}let m=document.createElement("span");m.className="shortcut-key",m.textContent=s.keys[p],d.appendChild(m)}c.appendChild(d),i.appendChild(c)}t.appendChild(i)}Le.appendChild(t),Le.addEventListener("click",r=>{r.target===Le&&ao()}),e.appendChild(Le),dn=r=>{ao()},document.addEventListener("keydown",dn,!0)}function ao(){dn&&(document.removeEventListener("keydown",dn,!0),dn=null),Le?.remove(),Le=null}function us(e){for(let[t,o]of so)o.classList.toggle("active",t===e);Dc(e)}function Dc(e){if(ee){if(ee.innerHTML="",ee.classList.add("hidden"),ee.classList.remove("visible"),e==="draw"){ee.classList.remove("hidden"),requestAnimationFrame(()=>ee?.classList.add("visible"));let t=ge(),o=document.createElement("button");o.className="color-swatch",o.style.background=t.brushColor,o.addEventListener("click",()=>{let r=o.getBoundingClientRect();Xt({initialColor:t.brushColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){Zt("brushColor",i),o.style.background=i},onClose(){}})}),ee.appendChild(o);let n=document.createElement("div");n.className="segmented-control";for(let r of[2,4,8]){let i=document.createElement("button");i.className=`segment${r===t.brushSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{Zt("brushSize",r),n.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active"),Promise.resolve().then(()=>(Nt(),os)).then(a=>a.refreshDrawCursor())}),n.appendChild(i)}ee.appendChild(n)}else if(e==="text"){ee.classList.remove("hidden"),requestAnimationFrame(()=>ee?.classList.add("visible"));let t=ge(),o=document.createElement("button");o.className="color-swatch",o.style.background=t.textColor,o.addEventListener("click",()=>{let r=o.getBoundingClientRect();Xt({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){Zt("textColor",i),o.style.background=i},onClose(){}})}),ee.appendChild(o);let n=document.createElement("div");n.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{Zt("fontSize",r),n.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),n.appendChild(i)}ee.appendChild(n)}}}function ps(e){let t=so.get(e);t&&(t.style.backgroundColor=l.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function ms(){document.removeEventListener("keydown",cs,!0),ao(),pe?.remove(),pe=null,ee=null,so.clear()}Nt();Sr();U();var fs="sketch-ui-onboarding-seen",Re=null,lo=null;function gs(){if(localStorage.getItem(fs))return;let e=K();if(!e)return;Re=document.createElement("div"),Re.style.cssText=`
    position: fixed;
    left: 72px;
    top: 50%;
    transform: translateY(-50%);
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${R.md};
    border-radius: ${N.md};
    padding: 12px 16px;
    font-family: ${T};
    font-size: 12px;
    color: ${l.textPrimary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${k.medium};
    max-width: 260px;
  `;let t=["V","H","M","D","C","T","L"],o=`
    display: inline-block;
    background: ${l.bgSecondary};
    color: ${l.textTertiary};
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 11px;
    font-family: ${T};
    margin: 0 2px;
  `;Re.innerHTML=`Press ${t.map(n=>`<span style="${o}">${n}</span>`).join(" ")} to switch tools`,e.appendChild(Re),requestAnimationFrame(()=>{Re&&(Re.style.opacity="1")}),lo=setTimeout($r,5e3)}function $r(){Re&&(localStorage.setItem(fs,"1"),Re.style.opacity="0",setTimeout(()=>{Re?.remove(),Re=null},150),lo&&(clearTimeout(lo),lo=null))}he();function hs(){Cr(!0)}function ys(){Cr(!1)}Nt();Ct();var Ar=!1,Hr=0,_r=0,bs={onMouseDown(e){Ar=!0,Hr=e.clientX,_r=e.clientY,ro("grabbing")},onMouseMove(e){if(!Ar)return;let t=e.clientX-Hr,o=e.clientY-_r;ka(t,o),Hr=e.clientX,_r=e.clientY},onMouseUp(e){Ar=!1,ro("grab")}};he();Nt();var le=null,un={x:0,y:0},Lt=!1,pn=null,vs={onMouseDown(e){pn=null;let t=tn(e.clientX,e.clientY);if(t){le=t;let a=Se(e.clientX,e.clientY);un={x:a.x-t.currentPos.x,y:a.y-t.currentPos.y},Lt=!0,jn(le.id);return}let o=Fa();if(!o){let a=cn(e.clientX,e.clientY);a&&(pn=a);return}let n=Va();if(!n)return;if(ua(n)){for(let a of We().values())if(a.originalEl===n||a.originalEl.contains(n)||n.contains(a.originalEl)){le=a;let s=Se(e.clientX,e.clientY);un={x:s.x-a.currentPos.x,y:s.y-a.currentPos.y},Lt=!0,jn(le.id);return}}let r=Pa(n,{componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber});le=r;let i=Se(e.clientX,e.clientY);un={x:i.x-r.currentPos.x,y:i.y-r.currentPos.y},Lt=!0,jn(le.id)},onMouseMove(e){if(!Lt||!le)return;let t=Se(e.clientX,e.clientY),o=t.x-un.x,n=t.y-un.y;Yn(le.id,o,n)},onMouseUp(e){Lt&&le&&(ia(le.id,le.currentPos),$a(le.id),Ga(le)),le=null,Lt=!1,pn&&(Ba(pn),pn=null)}};he();function co(e,t=2){if(e.length<=2)return e;let o=0,n=0,r=e[0],i=e[e.length-1];for(let a=1;a<e.length-1;a++){let s=Fc(e[a],r,i);s>o&&(o=s,n=a)}if(o>t){let a=co(e.slice(0,n+1),t),s=co(e.slice(n),t);return[...a.slice(0,-1),...s]}return[r,i]}function Fc(e,t,o){let n=o.x-t.x,r=o.y-t.y,i=n*n+r*r;if(i===0){let s=e.x-t.x,c=e.y-t.y;return Math.sqrt(s*s+c*c)}return Math.abs(r*e.x-n*e.y+o.x*t.y-o.y*t.x)/Math.sqrt(i)}Nt();async function uo(e,t){let o=cn(e,t);if(!o)return null;let n=xe(o);if(!n)return null;try{let i=await dt(n);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let s=a.functionName;if(s[0]!==s[0].toUpperCase()||pt(s))continue;let c="";if(a.fileName){let u=Ze(a.fileName);ut(u)&&(c=u)}return{componentName:s,filePath:c,lineNumber:a.lineNumber??0}}}catch{}let r=n;for(;r;){if($e(r)){let i=ve(r.type);if(i&&i[0]===i[0].toUpperCase()&&!pt(i)){let a=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:a?.fileName||"",lineNumber:a?.lineNumber||0}}}r=r.return}return null}var Pe=null,po=null,xs={onMouseDown(e){let t=ge();if(Pe=Qa(t.brushColor,t.brushSize),Pe){let o=Se(e.clientX,e.clientY);Pe.addPoint(o.x,o.y)}po=uo(e.clientX,e.clientY)},onMouseMove(e){if(!Pe)return;let t=Se(e.clientX,e.clientY);Pe.addPoint(t.x,t.y)},async onMouseUp(e){if(!Pe)return;let t=Pe.getPoints(),o=ge();if(Pe.group.remove(),t.length<2){Pe=null,po=null;return}let n=await po,r=co(t,2),i=crypto.randomUUID();Xa(i,r,o.brushColor,o.brushSize),In({type:"draw",id:i,points:r,color:o.brushColor,strokeWidth:o.brushSize,targetComponent:n}),Pe=null,po=null}};he();U();var te=null,it=null,mo=null,ws={onMouseDown(e){te&&Cs();let t=Se(e.clientX,e.clientY);it={pageX:t.x,pageY:t.y},uo(e.clientX,e.clientY).then(o=>{mo=o}),te=document.createElement("input"),te.type="text",te.placeholder="Type annotation...",te.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${l.bgPrimary};
      color: ${l.textPrimary};
      border: 1.5px solid ${l.accent};
      border-radius: ${N.sm};
      padding: 4px 8px;
      font-size: ${ge().fontSize}px;
      font-family: ${T};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${l.accentSoft};
    `,te.setAttribute("data-sketch-ui-ghost","true"),te.addEventListener("keydown",o=>{o.key==="Enter"&&(Cs(),o.preventDefault()),o.key==="Escape"&&(Es(),o.preventDefault()),o.stopPropagation()}),document.body.appendChild(te),te.focus()},onMouseMove(){},onMouseUp(){}};function Cs(){if(!te||!it)return;let e=te.value.trim();if(te.remove(),te=null,!e)return;let t=ge(),o=crypto.randomUUID();Ka(o,it.pageX,it.pageY,e,t.fontSize,t.textColor),In({type:"text",id:o,position:it,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:mo}),it=null,mo=null}function Es(){te&&(te.remove(),te=null),it=null,mo=null}function Ts(){Es()}Ct();function Ss(){let e=window.__SKETCH_UI_WS_PORT__;if(!e){console.warn("[SketchUI] No WebSocket port found.");return}if(document.getElementById("sketch-ui-root"))return;hn(e),Qr(zc);let t=K();t&&ba(t),Ia(),Ai(),Ya(),Ua(),Ra(),sa(r=>qa(r)),ca((r,i,a)=>Yn(r,i,a)),ls(),Mr(),gs(),Mt("grab",bs),Mt("move",vs),Mt("draw",xs),Mt("text",ws),ta((r,i)=>{$r(),ps(r),i==="pointer"&&ys(),i==="text"&&Ts(),kt(),Ko(),r==="pointer"&&hs(),Nr(r),us(r)}),na(()=>{ri(dr()),ss(ma())}),as(()=>{let r=cr();r&&q(`Undo: ${r}`)}),ti(()=>{if(!dr()){q("No moved components to toggle");return}let r=!Dn();da(r),xn(r)});let o=!1,n=0;ni(()=>{if(o)return;let r=Date.now();if(r<n){let a=Math.ceil((n-r)/1e3);q(`Please wait ${a}s before retrying`);return}let i=fa();if(!i.moves.length&&!i.annotations.length&&!i.colorChanges.length){q("Nothing to generate \u2014 make some visual changes first");return}o=!0,q("Generating..."),Ee({type:"generate",annotations:i})}),Ke(r=>{if(r.type==="generateProgress"&&q(r.message),r.type==="generateComplete")if(o=!1,r.success){let i=r.changes.map(a=>a.description||a.filePath).join(", ");q(`Applied: ${i}`),nt(),Tr(),Vn(),xn(!0)}else q(`Error: ${r.error||"Generation failed"}`),n=Date.now()+5e3}),oi(()=>{let r=cr();return r?(q(`Undo: ${r}`),!0):!1}),is(()=>{nt(),Tr(),Vn(),Ma(),xn(!0),q("Canvas cleared")}),console.log("[SketchUI] Overlay initialized with Phase 2A canvas tools")}function zc(){kt(),Ko(),za(),Ii(),ja(),Za(),Oa(),ms(),Lr(),Vn(),br(),Br(),ei()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ss):Ss();})();
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
