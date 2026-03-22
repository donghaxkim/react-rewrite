"use strict";var SketchUI=(()=>{var ma=Object.defineProperty;var wt=(e,t)=>()=>(e&&(t=e(e=0)),t);var fa=(e,t)=>{for(var o in t)ma(e,o,{get:t[o],enumerable:!0})};function Nr(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='5 9 2 12 5 15'/><polyline points='9 5 12 2 15 5'/><polyline points='15 19 12 22 9 19'/><polyline points='19 9 22 12 19 15'/><line x1='2' y1='12' x2='22' y2='12'/><line x1='12' y1='2' x2='12' y2='22'/></svg>`)}") 12 12, move`}function io(e){if(an&&an.size===e)return an.uri;let t=Math.max(e,2),o=t*2+4,n=o/2,r=`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${o}' height='${o}'><circle cx='${n}' cy='${n}' r='${t}' fill='none' stroke='${l.accent}' stroke-width='1.5'/></svg>`)}") ${n} ${n}, crosshair`;return an={size:e,uri:r},r}function Or(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M2 22l1-1h3l9-9'/><path d='M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7'/><path d='M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14'/><path d='m9 7 6 6'/><path d='M20 2a2.83 2.83 0 0 1 0 4L16 10'/></svg>`)}") 2 22, pointer`}function $r(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><line x1='8' y1='2' x2='8' y2='14' stroke='${l.accent}' stroke-width='1'/><line x1='2' y1='8' x2='14' y2='8' stroke='${l.accent}' stroke-width='1'/></svg>`)}") 8 8, crosshair`}var l,_,O,P,T,Rr,an,V=wt(()=>{"use strict";l={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},_={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},O={xs:"4px",sm:"6px",md:"10px",lg:"14px"},P={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},T="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",Rr=`
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
`;an=null});function Hi(e){return Sn.push(e),()=>{Sn=Sn.filter(t=>t!==e)}}function Ii(e){return kn.push(e),()=>{kn=kn.filter(t=>t!==e)}}function ze(){kn.forEach(e=>e())}function Mn(){return zo}function Vt(e){let t=zo;t!==e&&(zo=e,Sn.forEach(o=>o(e,t)))}function ue(){return{..._i}}function zt(e,t){_i[e]=t}function Be(){return de}function Di(e){de.set(e.id,e),Ve.push({type:"ghostCreate",ghostId:e.id}),ze()}function Fi(e,t){let o=de.get(e);if(!o)return;let n={...o.currentPos};o.currentPos=t,Ve.push({type:"ghostMove",ghostId:e,previousPos:n}),ze()}function Gl(e){let t=de.get(e);t&&(t.cloneEl.remove(),t.originalEl.style.opacity=t.originalOpacity,t.originalEl.style.visibility=t.originalVisibility,de.delete(e),ze())}function dt(e){Fe.push(e),Ve.push({type:"annotationAdd",annotationId:e.id}),ze()}function Ai(e){Fe=Fe.filter(t=>t.id!==e),ze()}function Pn(){return Bo}function Vi(e){Bo=e;for(let t of de.values())e?(t.originalEl.style.opacity="0",t.originalEl.style.visibility="hidden"):(t.originalEl.style.opacity="0.3",t.originalEl.style.visibility="visible");ze()}function zi(e){for(let t of de.values())if(t.originalEl===e||t.originalEl.contains(e)||e.contains(t.originalEl))return!0;return!1}function jo(){let e=Ve.pop();if(!e)return null;switch(e.type){case"ghostCreate":return Gl(e.ghostId),"ghost removed";case"ghostMove":{let t=de.get(e.ghostId);return t&&(t.currentPos=e.previousPos,t.cloneEl.style.left=`${e.previousPos.x}px`,t.cloneEl.style.top=`${e.previousPos.y}px`),"move reverted"}case"annotationAdd":return Ai(e.annotationId),"annotation removed";case"colorChange":{let t=Fe.find(o=>o.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),Ai(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let o of t.overrides)t.element.style[o.cssProperty]=o.previousValue;return"property reverted"}}return null}function Bi(e){Ve.push(e),ze()}function Bt(){return{scale:Go,offsetX:Yo,offsetY:Wo}}function Ln(e,t,o){Go=e,Yo=t,Wo=o,Ft.forEach(n=>n())}function Gi(e){return Ft.push(e),()=>{Ft=Ft.filter(t=>t!==e)}}function Uo(){for(let e of de.values())e.cloneEl.remove(),e.originalEl.style.opacity=e.originalOpacity,e.originalEl.style.visibility=e.originalVisibility;for(let e of Fe)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of Ve)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let o of t.overrides)t.element.style[o.cssProperty]=o.previousValue}de=new Map,Fe=[],Ve=[],Bo=!1,Go=1,Yo=0,Wo=0,Ft.forEach(e=>e()),ze()}function Xo(){return de.size>0||Fe.length>0}function Yi(){return Ve.length>0}function Wi(){let e=[];for(let n of de.values())e.push({component:n.componentRef.componentName,file:n.componentRef.filePath,line:n.componentRef.lineNumber,from:n.originalRect,to:n.currentPos});let t=[],o=[];for(let n of Fe)n.type==="draw"?t.push({type:"draw",startComponent:n.targetComponent?.componentName,startFile:n.targetComponent?.filePath,startLine:n.targetComponent?.lineNumber,points:n.points,color:n.color,strokeWidth:n.strokeWidth}):n.type==="text"?t.push({type:"text",content:n.content,position:n.position,targetComponent:n.targetComponent?.componentName,targetFile:n.targetComponent?.filePath,targetLine:n.targetComponent?.lineNumber}):n.type==="colorChange"&&o.push({component:n.component.componentName,file:n.component.filePath,line:n.component.lineNumber,property:n.property,from:n.fromColor,to:n.toColor});return{moves:e,annotations:t,colorChanges:o}}var de,Fe,Ve,zo,Bo,_i,Go,Yo,Wo,Ft,Sn,kn,ge=wt(()=>{"use strict";de=new Map,Fe=[],Ve=[],zo="pointer",Bo=!1,_i={brushSize:4,brushColor:"#ef4444",fontSize:16,textColor:"#ffffff"},Go=1,Yo=0,Wo=0,Ft=[],Sn=[],kn=[]});function yc(){rr=document.body.style.background||document.body.style.backgroundColor||"",ir=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,o=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",Y=document.createElement("div"),Y.setAttribute("data-sketch-ui-canvas-wrapper","true"),Y.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${o};
  `.trim().replace(/\n\s*/g," "),ye=document.createElement("div"),ye.setAttribute("data-sketch-ui-dot-bg","true"),ye.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${l.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let n=Array.from(document.body.childNodes);for(let r of n)r instanceof HTMLElement&&(r.id==="sketch-ui-root"||r.hasAttribute("data-sketch-ui-interaction")||r.hasAttribute("data-sketch-ui-ghost")||r.hasAttribute("data-sketch-ui-annotation")||r.hasAttribute("data-sketch-ui-dot-bg")||r.hasAttribute("data-sketch-ui-canvas-wrapper"))||(Ps.push(r),Y.appendChild(r));Y.style.position="relative",Y.style.zIndex="1",document.body.insertBefore(ye,document.body.firstChild),document.body.insertBefore(Y,ye.nextSibling),or=Gi(Ms),Ms()}function Ms(){if(!Y||!ye)return;let{scale:e,offsetX:t,offsetY:o}=Bt();Y.style.transform=`translate(${t}px, ${o}px) scale(${e})`;let n=gc*e,r=t%n,i=o%n;ye.style.backgroundImage=`radial-gradient(circle, ${hc} ${ks}px, transparent ${ks}px)`,ye.style.backgroundSize=`${n}px ${n}px`,ye.style.backgroundPosition=`${r}px ${i}px`}function bc(e,t,o){let{scale:n,offsetX:r,offsetY:i}=Bt(),s=Math.min(mc,Math.max(pc,n+o));if(s===n)return;let a=(e-r)/n,c=(t-i)/n,d=e-a*s,u=t-c*s;Ln(s,d,u)}function Ls(e){e.preventDefault();let t=-e.deltaY*fc,{scale:o}=Bt(),n=t*o;bc(e.clientX,e.clientY,n)}function Rs(e,t){let{scale:o,offsetX:n,offsetY:r}=Bt();Ln(o,n+e,r+t)}function Ns(){Ln(1,0,0)}function Os(){return Y!==null}function $s(){Y?sr():yc()}function sr(){if(or?.(),or=null,Y){for(;Y.firstChild;)document.body.insertBefore(Y.firstChild,Y);Y.remove(),Y=null}ye?.remove(),ye=null,Ps=[],document.body.style.background=rr,document.documentElement.style.background=ir,rr="",ir=""}var pc,mc,fc,gc,ks,hc,Y,ye,or,Ps,rr,ir,Ut=wt(()=>{"use strict";ge();V();pc=.1,mc=5,fc=.002,gc=24,ks=1,hc="rgba(0,0,0,0.15)",Y=null,ye=null,or=null,Ps=[],rr="",ir=""});function As(e,t){if(!et)return;let o=performance.now(),n=Math.abs(e-et.clientX),r=Math.abs(t-et.clientY),i=n<=2&&r<=2,s=o-et.timestamp<16;if(i||s)return et.element}function _s(e,t,o){et={clientX:e,clientY:t,element:o,timestamp:performance.now()}}function ht(){et=null}var et,ar=wt(()=>{"use strict";et=null});var Is={};fa(Is,{activateInteraction:()=>dr,destroyInteraction:()=>ur,getPageElementAtPoint:()=>qt,initInteraction:()=>cr,refreshDrawCursor:()=>xc,registerToolHandler:()=>je,setInteractionCursor:()=>Gn,setInteractionPointerEvents:()=>Kt});function je(e,t){lr.set(e,t)}function cr(){I=document.createElement("div"),I.setAttribute("data-sketch-ui-interaction","true"),I.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(I),document.addEventListener("scroll",ht,!0),I.addEventListener("mousedown",e=>{Xt?.onMouseDown?.(e)}),I.addEventListener("mousemove",e=>{Xt?.onMouseMove?.(e)}),I.addEventListener("mouseup",e=>{Xt?.onMouseUp?.(e)}),document.addEventListener("wheel",Hs,{passive:!1})}function Hs(e){!I||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#sketch-ui-root")||Ls(e)}function dr(e){Xt=lr.get(e)||null,I&&(I.style.pointerEvents=e==="pointer"?"none":"auto"),vc(e)}function vc(e){if(I)switch(e){case"pointer":I.style.cursor="default";break;case"grab":I.style.cursor="grab";break;case"move":I.style.cursor=Nr();break;case"draw":I.style.cursor=io(ue().brushSize);break;case"color":I.style.cursor=Or();break;case"text":I.style.cursor="text";break;case"lasso":I.style.cursor=$r();break;default:I.style.cursor="default"}}function xc(){Mn()==="draw"&&I&&(I.style.cursor=io(ue().brushSize))}function Gn(e){I&&(I.style.cursor=e)}function Kt(e){I&&(I.style.pointerEvents=e?"auto":"none")}function qt(e,t){let o=As(e,t);if(o!==void 0)return o;let n=document.elementsFromPoint(e,t),r=null;for(let i of n)if(i instanceof HTMLElement&&!i.closest("#sketch-ui-root")&&!i.hasAttribute("data-sketch-ui-interaction")&&!i.hasAttribute("data-sketch-ui-ghost")&&!(i===document.body||i===document.documentElement)){r=i;break}return _s(e,t,r),r}function ur(){document.removeEventListener("scroll",ht,!0),document.removeEventListener("wheel",Hs),I?.remove(),I=null,Xt=null,lr.clear()}var I,Xt,lr,yt=wt(()=>{"use strict";ge();V();ar();Ut();I=null,Xt=null,lr=new Map});function ga(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let o=document.createElement("canvas").getContext("2d");o.fillStyle="#000000",o.fillStyle=t;let n=o.fillStyle;if(n.startsWith("#"))return n;let r=n.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),s=parseInt(r[2],10),a=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(s<<8)+a).toString(16).slice(1)}`}return e}function ha(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(y=>{try{return Array.from(y.cssRules)}catch{return[]}}).filter(y=>y instanceof CSSStyleRule&&y.selectorText===":root").flatMap(y=>Array.from(y.style)).filter(y=>y.startsWith("--")),o={},n={},r={},i={},s={},a={},c={},d={},u={},p={},f={},m={},g={},b={},x={},$={},A={},N={},v=(y,C,L,H)=>{y[L]=H,C[H]=L};for(let y of t){let C=e.getPropertyValue(y).trim();if(!C)continue;let L=y.match(/^--spacing-(.+)$/);if(L){v(o,p,L[1],C);continue}let H=y.match(/^--color-(.+)$/);if(H){let tn=H[1];n[tn]=C,f[ga(C)]=tn;continue}let k=y.match(/^--font-size-(.+)$/);if(k){v(r,m,k[1],C);continue}let D=y.match(/^--font-weight-(.+)$/);if(D){v(i,g,D[1],C);continue}let w=y.match(/^--radius-(.+)$/);if(w){v(s,b,w[1],C);continue}let M=y.match(/^--border-(.+)$/);if(M){v(a,x,M[1],C);continue}let B=y.match(/^--opacity-(.+)$/);if(B){v(c,$,B[1],C);continue}let ne=y.match(/^--tracking-(.+)$/);if(ne){v(d,A,ne[1],C);continue}let Ne=y.match(/^--leading-(.+)$/);if(Ne){v(u,N,Ne[1],C);continue}}return{spacing:o,colors:n,fontSize:r,fontWeight:i,borderRadius:s,borderWidth:a,opacity:c,letterSpacing:d,lineHeight:u,spacingReverse:p,colorsReverse:f,fontSizeReverse:m,fontWeightReverse:g,borderRadiusReverse:b,borderWidthReverse:x,opacityReverse:$,letterSpacingReverse:A,lineHeightReverse:N}}var ya=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function ba(e,t){let o={};for(let n of ya){let r=e[n]??{},i=t[n]??{};o[n]=new Map([...Object.entries(r),...Object.entries(i)])}return o}function on(e,t){return t.get(e)??null}function rn(e,t,o){let r=(o??Et())[e],i=[];for(let[a,c]of r.entries()){let d=parseFloat(c);isNaN(d)||i.push({numericValue:d,token:a,cssValue:c})}let s=parseFloat(t);return isNaN(s)||i.some(c=>c.cssValue===t)||i.push({numericValue:s,token:null,cssValue:t}),i.sort((a,c)=>a.numericValue-c.numericValue),i}var Cr=null,Ct=null;function Er(e){Cr=e,Ct=null}function Et(){if(Ct!==null)return Ct;let e=ha();return Ct=ba(e,Cr??{}),Ct}var Q=null,Tt=[],nt=0,va=5,Qn=null,eo=null,to=null,no=null,oo=null,ro=null;function Tr(e){ro=e}function sn(e){Q&&Q.readyState===WebSocket.OPEN||(oo=e,Q=new WebSocket(`ws://localhost:${e}`),Q.onopen=()=>{let t=nt>0;nt=0,t&&no&&no()},Q.onmessage=t=>{try{let o=JSON.parse(t.data);o.type==="tailwindTokens"&&Er(o.tokens),o.type==="updatePropertyComplete"&&ro&&ro(o.success,o.errorCode,o.error),Tt.forEach(n=>n(o))}catch{}},Q.onclose=t=>{if(Q=null,t.code===4001){to&&to();return}if(nt<va){let o=500*Math.pow(2,nt);nt++,Qn=setTimeout(()=>sn(e),o)}else eo&&eo()},Q.onerror=()=>{})}function $e(e){Q&&Q.readyState===WebSocket.OPEN&&Q.send(JSON.stringify(e))}function St(e){return Tt.push(e),()=>{Tt=Tt.filter(t=>t!==e)}}function Sr(){Qn&&clearTimeout(Qn),Q&&(Q.close(),Q=null),Tt=[]}function kr(e){eo=e}function Mr(e){to=e}function Pr(e){no=e}function Lr(){oo&&(nt=0,sn(oo))}V();var rt=null,G=null,kt=0,ln=null,cn=null,Xe=null,so=null,ot=null,Mt=null,lo=null,Hr=null,Ir='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',xa='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',ao='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',wa='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',Ar='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',Ca=`
  :host {
    all: initial;
  }
  ${Rr}
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
    border-radius: ${O.md};
    font-family: ${T};
    font-size: 12px;
    color: ${l.textPrimary};
    box-shadow: ${_.md};
    user-select: none;
    opacity: 0;
    animation: fadeIn ${P.settle} forwards;
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
    transition: background ${P.fast}, color ${P.fast};
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
    border-radius: ${O.sm};
    color: white;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    font-family: ${T};
    cursor: pointer;
    transition: background ${P.fast};
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
    box-shadow: ${_.md};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${P.medium};
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
`;function Dr(e){let t=document.createElement("div");t.id="sketch-ui-root",document.body.appendChild(t),rt=t.attachShadow({mode:"open"});let o=document.createElement("style");o.textContent=Ca;let n=document.createElement("div");n.className="toolbar",n.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn eye-btn" title="Toggle originals (.)">
      ${Ir}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${ao}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Generate</button>
    <button class="icon-btn close-btn" title="Close SketchUI">
      ${wa}
    </button>
  `,rt.appendChild(o),rt.appendChild(n),G=n.querySelector(".undo-btn");let r=n.querySelector(".close-btn");ln=n.querySelector(".generate-btn"),cn=n.querySelector(".eye-btn"),ot=n.querySelector(".component-detail"),Xe=document.createElement("div"),Xe.className="toast",rt.appendChild(Xe),G.addEventListener("click",()=>{$e({type:"undo"}),G&&(G.innerHTML='<div class="spinner"></div>',G.disabled=!0)}),r.addEventListener("click",e),cn.addEventListener("click",()=>{Mt&&Mt()}),ln.addEventListener("click",()=>{lo&&lo()}),document.addEventListener("keydown",i=>{i.key==="."&&(i.ctrlKey||i.metaKey)&&!_r()&&(Mt&&Mt(),i.preventDefault()),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!_r()&&Hr?.()&&i.preventDefault()}),kr(()=>{fe("Disconnected. Click to reconnect."),Lr()}),Mr(()=>{fe("Disconnected: another tab took over")}),Pr(()=>{kt=0,G&&(G.disabled=!0)}),St(i=>{switch(i.type){case"reorderComplete":i.success?(kt++,G&&(G.innerHTML=Ar,setTimeout(()=>{G&&(G.innerHTML=ao,G.disabled=!1)},200))):i.error&&fe(i.error);break;case"undoComplete":i.success?(kt=Math.max(0,kt-1),G&&(G.innerHTML=Ar,setTimeout(()=>{G&&(G.innerHTML=ao,G.disabled=kt===0)},200))):i.error&&fe(i.error);break;case"devServerDisconnected":fe("Dev server disconnected");break;case"devServerReconnected":fe("Dev server reconnected");break}})}function Fr(){let e=document.getElementById("sketch-ui-root");e&&e.remove(),rt=null,G=null}function z(){return rt}function Vr(e){Mt=e}function zr(e){lo=e}function Br(e){Hr=e}function Gr(e){cn&&(cn.innerHTML=e?xa:Ir)}function Yr(e){ln&&(ln.disabled=!e)}function dn(e){if(!ot)return;if(!e){ot.className="component-detail empty",ot.textContent="No selection";return}ot.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";ot.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function fe(e){Xe&&(Xe.textContent=e,Xe.classList.add("visible"),so&&clearTimeout(so),so=setTimeout(()=>{Xe?.classList.remove("visible")},2e3))}function _r(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var co="0.5.32",Nt=`bippy-${co}`,Wr=Object.defineProperty,Ea=Object.prototype.hasOwnProperty,Pt=()=>{},Ur=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},pn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),Xr=!1,jr,Lt=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>Xr?!0:(e&&typeof e.inject=="function"&&(jr=e.inject.toString()),!!jr?.includes("(injected)")),un=new Set,Ae=new Set,uo=e=>{let t=new Map,o=0,n={_instrumentationIsActive:!1,_instrumentationSource:Nt,checkDCE:Ur,hasUnsupportedRendererAttached:!1,inject(r){let i=++o;return t.set(i,r),Ae.add(r),n._instrumentationIsActive||(n._instrumentationIsActive=!0,un.forEach(s=>s())),i},on:Pt,onCommitFiberRoot:Pt,onCommitFiberUnmount:Pt,onPostCommitFiberRoot:Pt,renderers:t,supportsFiber:!0,supportsFlight:!0};try{Wr(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return n},set(s){if(s&&typeof s=="object"){let a=n.renderers;n=s,a.size>0&&(a.forEach((c,d)=>{Ae.add(c),s.renderers.set(d,c)}),Rt(e))}}});let r=window.hasOwnProperty,i=!1;Wr(window,"hasOwnProperty",{configurable:!0,value:function(...s){try{if(!i&&s[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,s)},writable:!0})}catch{Rt(e)}return n},Rt=e=>{e&&un.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=Ur,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=Nt,t._instrumentationIsActive=!1;let o=pn(t);if(o||(t.on=Pt),t.renderers.size){t._instrumentationIsActive=!0,un.forEach(i=>i());return}let n=t.inject,r=Lt(t);r&&!o&&(Xr=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let s=n(i);return Ae.add(i),r&&t.renderers.set(s,i),t._instrumentationIsActive=!0,un.forEach(a=>a()),s}}(t.renderers.size||t._instrumentationIsActive||Lt())&&e?.()}catch{}},po=()=>Ea.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),it=e=>po()?(Rt(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):uo(e),mo=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),mn=()=>{try{mo()&&it()}catch{}};mn();var fo=0,go=1;var ho=5;var yo=11,bo=13;var vo=15,xo=16;var wo=19;var Co=26,Eo=27,To=28,So=30;var be=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};function ko(e,t,o=!1){if(!e)return null;let n=t(e);if(n instanceof Promise)return(async()=>{if(await n===!0)return e;let i=o?e.return:e.child;for(;i;){let s=await Po(i,t,o);if(s)return s;i=o?null:i.sibling}return null})();if(n===!0)return e;let r=o?e.return:e.child;for(;r;){let i=Mo(r,t,o);if(i)return i;r=o?null:r.sibling}return null}var Mo=(e,t,o=!1)=>{if(!e)return null;if(t(e)===!0)return e;let n=o?e.return:e.child;for(;n;){let r=Mo(n,t,o);if(r)return r;n=o?null:n.sibling}return null},Po=async(e,t,o=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let n=o?e.return:e.child;for(;n;){let r=await Po(n,t,o);if(r)return r;n=o?null:n.sibling}return null};var Lo=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?Lo(t.type||t.render):null},ae=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let o=t.displayName||t.name||null;if(o)return o;let n=Lo(t);return n&&(n.displayName||n.name)||null};var Ro=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||pn(e)||Lt(e)};var No=e=>{let t=it(e.onActive);t._instrumentationSource=e.name??Nt;let o=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(s,a,c)=>{o!==i&&(o?.(s,a,c),e.onCommitFiberRoot?.(s,a,c))};t.onCommitFiberRoot=i}let n=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(s,a)=>{t.onCommitFiberUnmount===i&&(n?.(s,a),e.onCommitFiberUnmount?.(s,a))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(s,a)=>{t.onPostCommitFiberRoot===i&&(r?.(s,a),e.onPostCommitFiberRoot?.(s,a))};t.onPostCommitFiberRoot=i}return t},le=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let o of t.renderers.values())try{let n=o.findFiberByHostInstance?.(e);if(n)return n}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let o in e)if(o.startsWith("__reactContainer$")||o.startsWith("__reactInternalInstance$")||o.startsWith("__reactFiber"))return e[o]||null}return null},Ta=Error();var Kr=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Sa=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],ka=["<anonymous>","eval",""],ri=/\.(jsx|tsx|ts|js)$/,Ma=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Pa=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,ii="(at Server)",La=/(^|@)\S+:\d+/,si=/^\s*at .*(\S+:\d+|\(native\))/m,Ra=/^(eval@)?(\[native code\])?$/;var ai=(e,t)=>{if(t?.includeInElement!==!1){let o=e.split(`
`),n=[];for(let r of o)if(/^\s*at\s+/.test(r)){let i=qr(r,void 0)[0];i&&n.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");n.push({functionName:i,source:r})}else if(r.match(La)){let i=Zr(r,void 0)[0];i&&n.push(i)}return Ao(n,t)}return e.match(si)?qr(e,t):Zr(e,t)},li=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,o=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return o?[o[1],o[2]||void 0,o[3]||void 0]:[t,void 0,void 0]},Ao=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e;var qr=(e,t)=>Ao(e.split(`
`).filter(o=>!!o.match(si)),t).map(o=>{let n=o;n.includes("(eval ")&&(n=n.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=n.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let s=li(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(s[0])?void 0:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:n}});var Zr=(e,t)=>Ao(e.split(`
`).filter(o=>!o.match(Ra)),t).map(o=>{let n=o;if(n.includes(" > eval")&&(n=n.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!n.includes("@")&&!n.includes(":"))return{functionName:n};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=n.match(r),s=i&&i[1]?i[1]:void 0,a=li(n.replace(r,""));return{functionName:s,fileName:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:n}}});var Na=44,Jr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Oa=new Uint8Array(64),ci=new Uint8Array(128);for(let e=0;e<Jr.length;e++){let t=Jr.charCodeAt(e);Oa[e]=t,ci[t]=e}function Ot(e,t){let o=0,n=0,r=0;do r=ci[e.next()],o|=(r&31)<<n,n+=5;while(r&32);let i=o&1;return o>>>=1,i&&(o=-2147483648|-o),t+o}function Qr(e,t){return e.pos>=t?!1:e.peek()!==Na}var $a=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:o}=this,n=t.indexOf(e,o);return n===-1?t.length:n}};function di(e){let{length:t}=e,o=new $a(e),n=[],r=0,i=0,s=0,a=0,c=0;do{let d=o.indexOf(";"),u=[],p=!0,f=0;for(r=0;o.pos<d;){let m;r=Ot(o,r),r<f&&(p=!1),f=r,Qr(o,d)?(i=Ot(o,i),s=Ot(o,s),a=Ot(o,a),Qr(o,d)?(c=Ot(o,c),m=[r,i,s,a,c]):m=[r,i,s,a]):m=[r],u.push(m),o.pos++}p||Aa(u),n.push(u),o.pos=d+1}while(o.pos<=t);return n}function Aa(e){e.sort(_a)}function _a(e,t){return e[0]-t[0]}var ui=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Ha=/^data:application\/json[^,]+base64,/,Ia=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,pi=typeof WeakRef<"u",$t=new Map,fn=new Map,Da=e=>pi&&e instanceof WeakRef,ei=(e,t,o,n)=>{if(o<0||o>=e.length)return null;let r=e[o];if(!r||r.length===0)return null;let i=null;for(let u of r)if(u[0]<=n)i=u;else break;if(!i||i.length<4)return null;let[,s,a,c]=i;if(s===void 0||a===void 0||c===void 0)return null;let d=t[s];return d?{columnNumber:c,fileName:d,lineNumber:a+1}:null},Fa=(e,t,o)=>{if(e.sections){let n=null;for(let s of e.sections)if(t>s.offset.line||t===s.offset.line&&o>=s.offset.column)n=s;else break;if(!n)return null;let r=t-n.offset.line,i=t===n.offset.line?o-n.offset.column:o;return ei(n.map.mappings,n.map.sources,r,i)}return ei(e.mappings,e.sources,t-1,o)},Va=(e,t)=>{let o=t.split(`
`),n;for(let i=o.length-1;i>=0&&!n;i--){let s=o[i].match(Ia);s&&(n=s[1]||s[2])}if(!n)return null;let r=ui.test(n);if(!(Ha.test(n)||r||n.startsWith("/"))){let i=e.split("/");i[i.length-1]=n,n=i.join("/")}return n},za=e=>({file:e.file,mappings:di(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),Ba=e=>{let t=e.sections.map(({map:n,offset:r})=>({map:{...n,mappings:di(n.mappings)},offset:r})),o=new Set;for(let n of t)for(let r of n.map.sources)o.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(o),sourcesContent:void 0,version:3}},ti=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let o=t.match(ui);if(!o)return!0;let n=o[0].toLowerCase();return n==="http:"||n==="https:"},Ga=async(e,t=fetch)=>{if(!ti(e))return null;let o;try{let r=await t(e);if(!r.ok)return null;o=await r.text()}catch{return null}if(!o)return null;let n=Va(e,o);if(!n||!ti(n))return null;try{let r=await t(n);if(!r.ok)return null;let i=await r.json();return"sections"in i?Ba(i):za(i)}catch{return null}},Ya=async(e,t=!0,o)=>{if(t&&$t.has(e)){let i=$t.get(e);if(i==null)return null;if(Da(i)){let s=i.deref();if(s)return s;$t.delete(e)}else return i}if(t&&fn.has(e))return fn.get(e);let n=Ga(e,o);t&&fn.set(e,n);let r=await n;return t&&fn.delete(e),t&&(r===null?$t.set(e,null):$t.set(e,pi?new WeakRef(r):r)),r},Wa=async(e,t=!0,o)=>await Promise.all(e.map(async n=>{if(!n.fileName)return n;let r=await Ya(n.fileName,t,o);if(!r||typeof n.lineNumber!="number"||typeof n.columnNumber!="number")return n;let i=Fa(r,n.lineNumber,n.columnNumber);return i?{...n,source:i.fileName&&n.source?n.source.replace(n.fileName,i.fileName):n.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:n})),ja=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",Ua=()=>{let e=it();for(let t of[...Array.from(Ae),...Array.from(e.renderers.values())]){let o=t.currentDispatcherRef;if(o&&typeof o=="object")return"H"in o?o.H:o.current}return null},ni=e=>{for(let t of Ae){let o=t.currentDispatcherRef;o&&typeof o=="object"&&("H"in o?o.H=e:o.current=e)}},Se=e=>`
    in ${e}`,Xa=(e,t)=>{let o=Se(e);return t&&(o+=` (at ${t})`),o},Oo=!1,$o=(e,t)=>{if(!e||Oo)return"";let o=Error.prepareStackTrace;Error.prepareStackTrace=void 0,Oo=!0;let n=Ua();ni(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let a={DetermineComponentFrameRoot(){let u;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(f){u=f}Reflect.construct(e,[],p)}else{try{p.call()}catch(f){u=f}e.call(p.prototype)}}else{try{throw Error()}catch(f){u=f}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&u instanceof Error&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,d]=a.DetermineComponentFrameRoot();if(c&&d){let u=c.split(`
`),p=d.split(`
`),f=0,m=0;for(;f<u.length&&!u[f].includes("DetermineComponentFrameRoot");)f++;for(;m<p.length&&!p[m].includes("DetermineComponentFrameRoot");)m++;if(f===u.length||m===p.length)for(f=u.length-1,m=p.length-1;f>=1&&m>=0&&u[f]!==p[m];)m--;for(;f>=1&&m>=0;f--,m--)if(u[f]!==p[m]){if(f!==1||m!==1)do if(f--,m--,m<0||u[f]!==p[m]){let g=`
${u[f].replace(" at new "," at ")}`,b=ae(e);return b&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",b)),g}while(f>=1&&m>=0);break}}}finally{Oo=!1,Error.prepareStackTrace=o,ni(n),console.error=r,console.warn=i}let s=e?ae(e):"";return s?Se(s):""},Ka=(e,t)=>{let o=e.tag,n="";switch(o){case To:n=Se("Activity");break;case go:n=$o(e.type,!0);break;case yo:n=$o(e.type.render,!1);break;case fo:case vo:n=$o(e.type,!1);break;case ho:case Co:case Eo:n=Se(e.type);break;case xo:n=Se("Lazy");break;case bo:n=e.child!==t&&t!==null?Se("Suspense Fallback"):Se("Suspense");break;case wo:n=Se("SuspenseList");break;case So:n=Se("ViewTransition");break;default:return""}return n},qa=e=>{try{let t="",o=e,n=null;do{t+=Ka(o,n);let r=o._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let s=r[i];typeof s.name=="string"&&(t+=Xa(s.name,s.env))}n=o,o=o.return}while(o);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},Za=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let o=e;if(!o)return"";Error.prepareStackTrace=t,o.startsWith(`Error: react-stack-top-frame
`)&&(o=o.slice(29));let n=o.indexOf(`
`);if(n!==-1&&(o=o.slice(n+1)),n=Math.max(o.indexOf("react_stack_bottom_frame"),o.indexOf("react-stack-bottom-frame")),n!==-1&&(n=o.lastIndexOf(`
`,n)),n!==-1)o=o.slice(0,n);else return"";return o},Ja=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),Qa=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,el=e=>{let t=new Map;for(let o of e)for(let n of o.stackFrames){if(!Ja(n))continue;let r=n.functionName,i=t.get(r)??[];i.some(s=>Qa(s,n))||(i.push(n),t.set(r,i))}return t},tl=(e,t,o)=>{if(!e.functionName)return{...e,isServer:!0};let n=t.get(e.functionName);if(!n||n.length===0)return{...e,isServer:!0};let r=o.get(e.functionName)??0,i=n[r%n.length];return o.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(ii,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},nl=e=>{let t=[];return ko(e,o=>{if(!ja(o))return;let n=typeof o.type=="string"?o.type:ae(o.type)||"<anonymous>";t.push({componentName:n,stackFrames:ai(Za(o._debugStack?.stack))})},!0),t},Ke=async(e,t=!0,o)=>{let n=nl(e),r=ai(qa(e)),i=el(n),s=new Map;return Wa(r.map(a=>a.source?.includes(ii)??!1?tl(a,i,s):a).filter((a,c,d)=>{if(c===0)return!0;let u=d[c-1];return a.functionName!==u.functionName}),t,o)};var oi=e=>e.split("/").filter(Boolean).length,ol=e=>e.split("/").filter(Boolean)[0]??null,rl=e=>{let t=e.indexOf("/",1);if(t===-1||oi(e.slice(0,t))!==1)return e;let o=e.slice(t);if(!ri.test(o)||oi(o)<2)return e;let n=ol(o);return!n||n.startsWith("@")||n.length>4?e:o},_e=e=>{if(!e||ka.some(i=>i===e))return"";let t=e,o=t.startsWith("http://")||t.startsWith("https://");if(o)try{t=new URL(t).pathname}catch{}if(o&&(t=rl(t)),t.startsWith("about://React/")){let i=t.slice(14),s=i.indexOf("/"),a=i.indexOf(":");t=s!==-1&&(a===-1||s<a)?i.slice(s+1):i}let n=!0;for(;n;){n=!1;for(let i of Sa)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),n=!0;break}}if(Kr.test(t)){let i=t.match(Kr);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Pa.test(i)&&(t=t.slice(0,r))}return t},qe=e=>{let t=_e(e);return!(!t||!ri.test(t)||Ma.test(t))};var il=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);function He(e){return!!(il.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function sl(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let o=e.getBoundingClientRect(),n=window.innerWidth,r=window.innerHeight;return o.width>=n*.9&&o.height>=r*.9}var al=50,gn=.9,ll=2147483600,cl=1e3,At=new WeakMap;function _o(){At=new WeakMap}function dl(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function ul(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=ll}function pl(e,t){let o=t.position;if(o!=="fixed"&&o!=="absolute")return!1;let n=e.getBoundingClientRect();if(n.width/window.innerWidth<gn||n.height/window.innerHeight<gn)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>cl}function _t(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&sl(e)||e.closest("#sketch-ui-root")||e instanceof HTMLElement&&e.hasAttribute("data-sketch-ui-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-sketch-ui-ghost"))return!1;let o=performance.now(),n=At.get(e);if(n&&o-n.timestamp<al)return n.isValid;let r=window.getComputedStyle(e);return dl(e,r)?e.clientWidth/window.innerWidth>=gn&&e.clientHeight/window.innerHeight>=gn&&(ul(r)||pl(e,r))?(At.set(e,{isValid:!1,timestamp:o}),!1):(At.set(e,{isValid:!0,timestamp:o}),!0):(At.set(e,{isValid:!1,timestamp:o}),!1)}var ml=.75,mi=32,hn=3,yn=20,fi=100,ce=1;function st(e,t,o){return Math.min(o,Math.max(t,e))}function fl(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,o=window.innerHeight,{x:n,y:r}=e,i=n+e.width,s=r+e.height,a=n+e.width/2,c=r+e.height/2,d=st(Math.ceil(e.width/mi),hn,yn),u=st(Math.ceil(e.height/mi),hn,yn);if(d*u>fi){let g=Math.sqrt(fi/(d*u));d=st(Math.floor(d*g),hn,yn),u=st(Math.floor(u*g),hn,yn)}let p=new Set,f=[],m=(g,b)=>{let x=st(Math.round(g),0,t-1),$=st(Math.round(b),0,o-1),A=`${x}:${$}`;p.has(A)||(p.add(A),f.push({x,y:$}))};m(n+ce,r+ce),m(i-ce,r+ce),m(n+ce,s-ce),m(i-ce,s-ce),m(a,r+ce),m(a,s-ce),m(n+ce,c),m(i-ce,c),m(a,c);for(let g=0;g<d;g++){let b=n+(g+.5)/d*e.width;for(let x=0;x<u;x++)m(b,r+(x+.5)/u*e.height)}return f}function bn(e,t=_t,o=!0){let n={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=fl(e);for(let c of i)for(let d of document.elementsFromPoint(c.x,c.y))r.add(d);let s=[];for(let c of r){if(!t(c))continue;let d=c.getBoundingClientRect();if(d.width<=0||d.height<=0)continue;let u={left:d.left,top:d.top,right:d.left+d.width,bottom:d.top+d.height};if(o){let p=Math.max(n.left,u.left),f=Math.max(n.top,u.top),m=Math.min(n.right,u.right),g=Math.min(n.bottom,u.bottom),b=Math.max(0,m-p)*Math.max(0,g-f),x=d.width*d.height;x>0&&b/x>=ml&&s.push(c)}else n.left<u.right&&n.right>u.left&&n.top<u.bottom&&n.bottom>u.top&&s.push(c)}let a=s.filter(c=>!s.some(d=>d!==c&&d.contains(c)));return a.sort((c,d)=>{let u=c.compareDocumentPosition(d);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0}),a}V();function at(e,t,o){return e+(t-e)*o}V();var gl=.35,hl=.3,vn=.5,yl=2,J=null,Ie=null,Ho=0,Io=0,Ht=1,lt=null,j=null,U=null,gi=l.accent,bl="rgba(162,89,255,0.08)",vl="rgba(162,89,255,0.15)";function bi(){let e=z();e&&(J=document.createElement("canvas"),J.setAttribute("data-sketch-ui-ghost","true"),J.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(J),Do(),window.addEventListener("resize",Do))}function xn(e,t=4){if(!e){j&&(j.targetOpacity=0,It());return}let o={x:e.left,y:e.top,w:e.width,h:e.height};!j||!j.initialized?j=xi(o,t):(j.target=o,j.borderRadius=t,j.targetOpacity=1),It()}function Dt(e,t=4){if(!e){U&&(U.targetOpacity=0,It());return}let o={x:e.left,y:e.top,w:e.width,h:e.height};!U||!U.initialized?U=xi(o,t):(U.target=o,U.borderRadius=t,U.targetOpacity=1),It()}function vi(){lt!==null&&cancelAnimationFrame(lt),window.removeEventListener("resize",Do),J?.remove(),J=null,Ie=null,j=null,U=null}function xi(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function Do(){J&&(Ht=Math.max(window.devicePixelRatio||1,yl),Ho=window.innerWidth,Io=window.innerHeight,J.width=Ho*Ht,J.height=Io*Ht,J.style.width=`${Ho}px`,J.style.height=`${Io}px`,Ie=J.getContext("2d"),It())}function It(){lt===null&&(lt=requestAnimationFrame(wi))}function wi(){if(lt=null,!Ie||!J)return;let e=!1;j?.initialized&&(hi(j,gl)&&(e=!0),j.opacity<.01&&j.targetOpacity===0&&(j=null)),U?.initialized&&(hi(U,hl)&&(e=!0),U.opacity<.01&&U.targetOpacity===0&&(U=null)),Ie.setTransform(1,0,0,1,0,0),Ie.clearRect(0,0,J.width,J.height),Ie.setTransform(Ht,0,0,Ht,0,0),j&&yi(Ie,j,gi,bl),U&&yi(Ie,U,gi,vl),e&&(lt=requestAnimationFrame(wi))}function hi(e,t){let o=e.current,n=e.target,r=at(o.x,n.x,t),i=at(o.y,n.y,t),s=at(o.w,n.w,t),a=at(o.h,n.h,t),c=at(e.opacity,e.targetOpacity,t);return Math.abs(r-n.x)<vn&&Math.abs(i-n.y)<vn&&Math.abs(s-n.w)<vn&&Math.abs(a-n.h)<vn&&Math.abs(c-e.targetOpacity)<.01?(o.x=n.x,o.y=n.y,o.w=n.w,o.h=n.h,e.opacity=e.targetOpacity,!1):(o.x=r,o.y=i,o.w=s,o.h=a,e.opacity=c,!0)}function yi(e,t,o,n){let{x:r,y:i,w:s,h:a}=t.current;if(s<=0||a<=0)return;let c=Math.min(t.borderRadius,s/2,a/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,s,a,c):e.rect(r,i,s,a),e.fillStyle=n,e.fill(),e.strokeStyle=o,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}var xl=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],wl=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],Cl=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],El=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],Tl=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],Sl=[{key:"borderWidth",label:"Width",group:"border",controlType:"number-scrub",cssProperty:"border-width",tailwindPrefix:"border",tailwindScale:"borderWidth",defaultValue:"0",min:0,classPattern:"^border-(\\d+|\\[.+\\])$"},{key:"borderColor",label:"Color",group:"border",controlType:"color-swatch",cssProperty:"border-color",tailwindPrefix:"border",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^border-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"},{key:"borderStyle",label:"Style",group:"border",controlType:"segmented",cssProperty:"border-style",tailwindPrefix:"border",tailwindScale:"borderStyle",defaultValue:"none",classPattern:"^border-(solid|dashed|dotted|double|none)$",enumValues:[{value:"solid",tailwindValue:"solid",label:"Solid"},{value:"dashed",tailwindValue:"dashed",label:"Dashed"},{value:"dotted",tailwindValue:"dotted",label:"Dotted"},{value:"none",tailwindValue:"none",label:"None"}]},{key:"borderRadius",label:"Radius",group:"border",controlType:"number-scrub",cssProperty:"border-radius",tailwindPrefix:"rounded",tailwindScale:"borderRadius",defaultValue:"0",min:0},{key:"borderTopLeftRadius",label:"TL",group:"border",controlType:"number-scrub",cssProperty:"border-top-left-radius",tailwindPrefix:"rounded-tl",tailwindScale:"borderRadius",relatedPrefixes:["rounded","rounded-t","rounded-l"],defaultValue:"0",min:0},{key:"borderTopRightRadius",label:"TR",group:"border",controlType:"number-scrub",cssProperty:"border-top-right-radius",tailwindPrefix:"rounded-tr",tailwindScale:"borderRadius",relatedPrefixes:["rounded","rounded-t","rounded-r"],defaultValue:"0",min:0},{key:"borderBottomRightRadius",label:"BR",group:"border",controlType:"number-scrub",cssProperty:"border-bottom-right-radius",tailwindPrefix:"rounded-br",tailwindScale:"borderRadius",relatedPrefixes:["rounded","rounded-b","rounded-r"],defaultValue:"0",min:0},{key:"borderBottomLeftRadius",label:"BL",group:"border",controlType:"number-scrub",cssProperty:"border-bottom-left-radius",tailwindPrefix:"rounded-bl",tailwindScale:"borderRadius",relatedPrefixes:["rounded","rounded-b","rounded-l"],defaultValue:"0",min:0}],kl=[{key:"opacity",label:"Opacity",group:"effects",controlType:"slider",cssProperty:"opacity",tailwindPrefix:"opacity",tailwindScale:"opacity",defaultValue:"1",min:0,max:100}],ct=[...xl,...wl,...Cl,...El,...Tl,...Sl,...kl];V();var Ml=new Set(["auto","none","normal","inherit","initial"]);function Ci(e,t,o,n){let r=e[0],i=r.tailwindScale,s=document.createElement("div");s.style.cssText="display:flex; align-items:center; gap:4px;";let a=document.createElement("input");a.type="text",a.className="prop-input",a.style.cssText="width:60px; cursor:ew-resize;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${T};`,s.appendChild(a),s.appendChild(c);let d=new Map(t),u=!1,p=0,f=0;function m(){return d.get(r.key)??r.defaultValue}function g(v){let y=parseFloat(v);a.value=isNaN(y)?v:String(y);try{let L=rn(i,v).find(H=>H.cssValue===v);L?.token?c.textContent=`${r.tailwindPrefix}-${L.token}`:c.textContent=""}catch{c.textContent=""}}function b(v){let y=m();try{let C=rn(i,y);if(C.length===0)return{cssValue:`${v}px`,token:null};let L=C[0],H=Math.abs(C[0].numericValue-v);for(let k of C){let D=Math.abs(k.numericValue-v);D<H&&(H=D,L=k)}return{cssValue:L.cssValue,token:L.token}}catch{return{cssValue:`${v}px`,token:null}}}function x(){let v=m();try{let y=rn(i,v);if(y.length<2)return 1;let C=parseFloat(v),L=y.findIndex(H=>H.numericValue>=C);return L>0&&L<y.length&&Math.abs(y[L].numericValue-y[L-1].numericValue)||1}catch{return 1}}function $(v){let y=parseFloat(v);if(isNaN(y))return 0;if(v.includes("rem")){let C=parseFloat(getComputedStyle(document.documentElement).fontSize)||16;return y*C}return y}let A=v=>{if(!u)return;let y=(v.clientX-p)*.5,C=r.min!==void 0?r.min:-1/0,L=Math.max(C,f+y),{cssValue:H}=b(L);d.set(r.key,H),g(H),o(r.key,H)},N=()=>{u&&(u=!1,document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",N),a.style.cursor="ew-resize",n())};return a.addEventListener("mousedown",v=>{document.activeElement!==a&&(v.preventDefault(),u=!0,p=v.clientX,f=$(m()),a.style.cursor="ew-resize",document.addEventListener("mousemove",A),document.addEventListener("mouseup",N))}),a.addEventListener("focus",()=>{a.style.cursor="text"}),a.addEventListener("blur",()=>{a.style.cursor="ew-resize";let v=a.value.trim(),y=parseFloat(v);if(isNaN(y))Ml.has(v)?(d.set(r.key,v),g(v),o(r.key,v),n()):g(m());else{let L=v.match(/(px|rem|em|%|vw|vh|ch)$/)?v:`${y}px`;d.set(r.key,L),g(L),o(r.key,L),n()}}),a.addEventListener("keydown",v=>{if(v.key==="Enter")a.blur();else if(v.key==="ArrowUp"||v.key==="ArrowDown"){v.preventDefault();let y=x(),C=parseFloat(m())||0,L=r.min!==void 0?r.min:-1/0,H=v.key==="ArrowUp"?C+y:Math.max(L,C-y),{cssValue:k}=b(H);d.set(r.key,k),g(k),o(r.key,k),n()}else v.key==="Escape"&&(g(m()),a.blur())}),g(m()),{element:s,setValue(v,y){v===r.key&&(d.set(v,y),g(y))},destroy(){document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",N)}}}V();function Ei(e,t,o,n){let r=e[0],i=r.enumValues??[],s=document.createElement("div");s.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${l.bgTertiary};
    border-radius:${O.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let a=t.get(r.key)??r.defaultValue,c=[];function d(u){a=u;for(let{btn:p,value:f,opt:m}of c){let g=f===u;p.style.background=g?l.accent:"transparent",p.style.color=g?l.textOnAccent:l.textSecondary,p.title=g&&m.tailwindValue?`${m.label} (${m.tailwindValue})`:m.label}}for(let u of i){let p=document.createElement("button");p.style.cssText=`
      display:flex;
      align-items:center;
      justify-content:center;
      padding:2px 6px;
      border:none;
      border-radius:${O.xs};
      font-family:${T};
      font-size:10px;
      cursor:pointer;
      background:transparent;
      color:${l.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g," "),p.textContent=u.icon??u.label,p.title=u.label,p.addEventListener("click",()=>{d(u.value),o(r.key,u.value),n()}),c.push({btn:p,value:u.value,opt:u}),s.appendChild(p)}return d(a),{element:s,setValue(u,p){u===r.key&&d(p)},destroy(){}}}V();V();function wn(e){let t=parseInt(e.slice(1,3),16)/255,o=parseInt(e.slice(3,5),16)/255,n=parseInt(e.slice(5,7),16)/255,r=Math.max(t,o,n),i=Math.min(t,o,n),s=r-i,a=0;s!==0&&(r===t?a=((o-n)/s+(o<n?6:0))*60:r===o?a=((n-t)/s+2)*60:a=((t-o)/s+4)*60);let c=r===0?0:s/r*100,d=r*100;return{h:a,s:c,v:d}}function Cn(e){let t=e.h/360,o=e.s/100,n=e.v/100,r=Math.floor(t*6),i=t*6-r,s=n*(1-o),a=n*(1-i*o),c=n*(1-(1-i)*o),d,u,p;switch(r%6){case 0:d=n,u=c,p=s;break;case 1:d=a,u=n,p=s;break;case 2:d=s,u=n,p=c;break;case 3:d=s,u=a,p=n;break;case 4:d=c,u=s,p=n;break;case 5:d=n,u=s,p=a;break;default:d=0,u=0,p=0}let f=m=>Math.round(m*255).toString(16).padStart(2,"0");return`#${f(d)}${f(u)}${f(p)}`}var De=null;function Ze(e){ke();let t=z();if(!t)return;let o=document.createElement("div");o.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${_.lg};
    border-radius: ${O.md};
    font-family: ${T};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${P.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let w=o.getBoundingClientRect();w.right>window.innerWidth-8&&(o.style.left=`${window.innerWidth-w.width-8}px`),w.bottom>window.innerHeight-8&&(o.style.top=`${window.innerHeight-w.height-8}px`),o.style.opacity="1"});let n=wn(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let w=Pl(["Fill","Text"],0,M=>{r=M===0?"backgroundColor":"color",e.onPropertyChange?.(r)});o.appendChild(w)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let s=i.getContext("2d"),a=document.createElement("div");a.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${_.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(a),o.appendChild(c);function d(){let w=n.h,M=s.createLinearGradient(0,0,176,0);M.addColorStop(0,`hsl(${w}, 0%, 100%)`),M.addColorStop(1,`hsl(${w}, 100%, 50%)`),s.fillStyle=M,s.fillRect(0,0,176,120);let B=s.createLinearGradient(0,0,0,120);B.addColorStop(0,"rgba(0,0,0,0)"),B.addColorStop(1,"rgba(0,0,0,1)"),s.fillStyle=B,s.fillRect(0,0,176,120);let ne=n.s/100*176,Ne=(1-n.v/100)*120;a.style.left=`${ne}px`,a.style.top=`${Ne}px`}let u=!1;i.addEventListener("mousedown",w=>{u=!0,p(w)});function p(w){let M=i.getBoundingClientRect(),B=Math.max(0,Math.min(176,w.clientX-M.left)),ne=Math.max(0,Math.min(120,w.clientY-M.top));n.s=B/176*100,n.v=(1-ne/120)*100,d(),C()}let f=document.createElement("canvas");f.width=176,f.height=14,f.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let m=f.getContext("2d"),g=document.createElement("div");g.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${_.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let b=document.createElement("div");b.style.cssText="position:relative;width:176px;height:14px;",b.appendChild(f),b.appendChild(g),o.appendChild(b);function x(){let w=m.createLinearGradient(0,0,176,0);for(let M=0;M<=6;M++)w.addColorStop(M/6,`hsl(${M*60}, 100%, 50%)`);m.fillStyle=w,m.fillRect(0,0,176,14),g.style.left=`${n.h/360*176}px`}let $=!1;f.addEventListener("mousedown",w=>{$=!0,A(w)});function A(w){let M=f.getBoundingClientRect(),B=Math.max(0,Math.min(176,w.clientX-M.left));n.h=B/176*360,x(),d(),C()}let N=document.createElement("input");N.type="text",N.value=Cn(n),N.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: ${O.sm};
    color: ${l.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,N.addEventListener("keydown",w=>{w.key==="Enter"&&N.blur(),w.stopPropagation()}),N.addEventListener("blur",()=>{let w=N.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(w)){let M=w.startsWith("#")?w:`#${w}`;n=wn(M),d(),x(),C()}else N.value=Cn(n)}),o.appendChild(N);let v=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],y=document.createElement("div");y.style.cssText="display:flex;gap:4px;justify-content:center;";for(let w of v){let M=document.createElement("button");M.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${w};
      border: 1px solid ${l.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${P.fast};
    `,M.addEventListener("mouseenter",()=>{M.style.boxShadow=_.sm}),M.addEventListener("mouseleave",()=>{M.style.boxShadow="none"}),M.addEventListener("click",()=>{n=wn(w),d(),x(),N.value=w,C()}),y.appendChild(M)}o.appendChild(y);function C(){let w=Cn(n);N.value=w,e.onColorChange(w)}t.appendChild(o),De=o,d(),x();let L=w=>{u&&p(w),$&&A(w)},H=()=>{u=!1,$=!1};document.addEventListener("mousemove",L),document.addEventListener("mouseup",H);let k=w=>{w.key==="Escape"&&ke()};document.addEventListener("keydown",k,!0);let D=w=>{De&&!w.composedPath().includes(De)&&ke()};setTimeout(()=>document.addEventListener("mousedown",D,!0),0),o._cleanup=()=>{document.removeEventListener("mousemove",L),document.removeEventListener("mouseup",H),document.removeEventListener("keydown",k,!0),document.removeEventListener("mousedown",D,!0)},o._onClose=e.onClose}function ke(){De&&(De._cleanup?.(),De._onClose?.(),De.remove(),De=null)}function Pl(e,t,o){let n=document.createElement("div");n.style.cssText=`
    display: flex;
    background: ${l.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;let r=[];for(let i=0;i<e.length;i++){let s=document.createElement("button");s.textContent=e[i],s.style.cssText=`
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i===t?l.bgPrimary:"transparent"};
      box-shadow: ${i===t?_.sm:"none"};
      color: ${i===t?l.textPrimary:l.textSecondary};
      font-family: ${T}; font-size: 12px; cursor: pointer;
      transition: background ${P.fast}, color ${P.fast};
    `,s.addEventListener("click",()=>{r.forEach((a,c)=>{a.style.background=c===i?l.bgPrimary:"transparent",a.style.boxShadow=c===i?_.sm:"none",a.style.color=c===i?l.textPrimary:l.textSecondary}),o(i)}),r.push(s),n.appendChild(s)}return n}var Fo=null;function Ll(){return Fo||(Fo=document.createElement("canvas").getContext("2d")),Fo}function Ti(e,t,o,n){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let s=document.createElement("div");s.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${O.sm};
    border:1px solid ${l.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let a=document.createElement("input");a.type="text",a.placeholder="#rrggbb",a.className="prop-input",a.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${T};`,i.appendChild(s),i.appendChild(a),i.appendChild(c);let d=t.get(r.key)??r.defaultValue,u=!1;function p(g){let b=g.trim().toLowerCase();if(b==="transparent")return"transparent";if(b==="inherit"||b==="currentcolor"||b==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(b))return b;let x=Ll();x.fillStyle="#000000",x.fillStyle=b;let $=x.fillStyle;if($.startsWith("#"))return $;let A=$.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(A){let N=parseInt(A[1],10),v=parseInt(A[2],10),y=parseInt(A[3],10);return`#${((1<<24)+(N<<16)+(v<<8)+y).toString(16).slice(1)}`}return"#000000"}function f(g){d=g,a.value=g,g==="transparent"?s.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":s.style.background=g;try{let b=Et(),x=on(g,b.colorsReverse);x?c.textContent=`${r.tailwindPrefix??"bg"}-${x}`:c.textContent=""}catch{c.textContent=""}}function m(){if(u)return;let g=a.value.trim();if(!g){f(d);return}let b=p(g);f(b),o(r.key,b),n()}return s.addEventListener("click",()=>{if(u){ke(),u=!1;return}let g=s.getBoundingClientRect();u=!0,Ze({initialColor:p(d),position:{x:g.left-210,y:g.top},showPropertyToggle:!1,onColorChange:b=>{f(b),o(r.key,b)},onClose:()=>{u=!1,n()}})}),a.addEventListener("keydown",g=>{g.key==="Enter"?(m(),a.blur()):g.key==="Escape"&&(f(d),a.blur())}),a.addEventListener("blur",()=>{m()}),a.addEventListener("input",()=>{let g=a.value.trim(),b=p(g);s.style.background=b}),f(d),{element:i,setValue(g,b){g===r.key&&f(b)},destroy(){u&&(ke(),u=!1)}}}V();function Si(e,t,o,n){let r=e[0],i=r.min??0,s=r.max??100,a=r.key==="opacity",c=document.createElement("div");c.style.cssText="display:flex; align-items:center; gap:6px;";let d=document.createElement("input");d.type="range",d.min=String(i),d.max=String(s),d.step="1",d.className="prop-slider",d.style.cssText="flex:1;";let u=document.createElement("span");u.style.cssText=`
    font-family:${T};
    font-size:11px;
    color:${l.textPrimary};
    min-width:28px;
    text-align:right;
  `.trim().replace(/\n\s*/g," "),c.appendChild(d),c.appendChild(u);let p=t.get(r.key)??r.defaultValue;function f(b){let x=parseFloat(b);return isNaN(x)?a?s:i:a?Math.round(x*100):x}function m(b){return String(a?b/100:b)}function g(b){p=b;let x=f(b);d.value=String(x),u.textContent=a?`${x}%`:String(x)}return d.addEventListener("input",()=>{let b=parseInt(d.value,10),x=m(b);p=x,u.textContent=a?`${b}%`:String(b),o(r.key,x)}),d.addEventListener("change",()=>{n()}),g(p),{element:c,setValue(b,x){b===r.key&&g(x)},destroy(){}}}V();function ki(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function Mi(e,t,o,n){let r=new Map(t),i=[];for(let S of e){let E=ki(S.key);E&&i.push({descriptor:S,...E})}let s=document.createElement("div");s.style.cssText=`
    display:flex;
    flex-direction:column;
    gap:4px;
    font-family:${T};
    font-size:10px;
    color:${l.textSecondary};
    position:relative;
  `.trim().replace(/\n\s*/g," ");let a=document.createElement("div");a.style.cssText="position:relative; padding:4px;";let c=document.createElement("div");c.style.cssText=`
    background:${l.marginBoxBg};
    border:1px dashed ${l.marginBoxBorder};
    border-radius:${O.sm};
    padding:10px;
    position:relative;
  `.trim().replace(/\n\s*/g," ");let d=document.createElement("div");d.style.cssText=`
    background:${l.paddingBoxBg};
    border:1px dashed ${l.paddingBoxBorder};
    border-radius:${O.sm};
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
  `.trim().replace(/\n\s*/g," "),u.textContent="content";let p=[];function f(S){let E=document.createElement("span"),oe=r.get(S.key)??S.defaultValue;return E.textContent=A(oe),E.title=S.label,E.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),E.addEventListener("mouseenter",()=>{E.style.background=l.bgTertiary}),E.addEventListener("mouseleave",()=>{(document.activeElement!==m||m.dataset.key!==S.key)&&(E.style.background="transparent")}),E.addEventListener("click",()=>{x(S,E)}),p.push({key:S.key,span:E,descriptor:S}),E}let m=document.createElement("input");m.type="text",m.className="prop-input",m.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",s.appendChild(m);let g=null,b=null;function x(S,E){g&&g!==S&&$(),g=S,b=E,m.dataset.key=S.key;let oe=r.get(S.key)??S.defaultValue;m.value=A(oe);let W=0,Ue=0,Oe=E;for(;Oe&&Oe!==s;)W+=Oe.offsetLeft,Ue+=Oe.offsetTop,Oe=Oe.offsetParent;m.style.display="block",m.style.left=`${W}px`,m.style.top=`${Ue}px`;let wr=E.getBoundingClientRect();m.style.width=`${Math.max(40,wr.width+10)}px`,m.focus(),m.select()}function $(){if(!g||!b)return;let S=m.value.trim(),E=g,oe=b,W,Ue=parseFloat(S),Oe=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(Ue)?Oe.has(S)?W=S:W=r.get(E.key)??E.defaultValue:W=S.match(/(px|rem|em|%|vw|vh|ch)$/)?S:`${Ue}px`,r.set(E.key,W),oe.textContent=A(W),oe.style.background="transparent",m.style.display="none",m.dataset.key="",g=null,b=null,o(E.key,W),n()}m.addEventListener("keydown",S=>{if(S.key==="Enter")$();else if(S.key==="Escape"){if(g&&b){let E=r.get(g.key)??g.defaultValue;b.textContent=A(E)}m.style.display="none",m.dataset.key="",g=null,b=null}}),m.addEventListener("blur",()=>{$()});function A(S){let E=parseFloat(S);return isNaN(E)?S:E===Math.round(E)?String(Math.round(E)):S}function N(S){let E=document.createElement("span");return E.textContent=S,E.style.cssText=`
      font-size:9px;
      color:${l.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),E}function v(S,E){return i.find(oe=>oe.layer===S&&oe.side===E)}function y(S,E){let oe=v(S,E);if(!oe){let W=document.createElement("span");return W.textContent="-",W.style.cssText=`text-align:center; color:${l.textTertiary};`,W}return f(oe.descriptor)}let C=y("padding","top");C.style.gridRow="1",C.style.gridColumn="2",C.style.textAlign="center";let L=y("padding","left");L.style.gridRow="2",L.style.gridColumn="1";let H=y("padding","right");H.style.gridRow="2",H.style.gridColumn="3";let k=y("padding","bottom");k.style.gridRow="3",k.style.gridColumn="2",k.style.textAlign="center",u.style.gridRow="2",u.style.gridColumn="2",d.appendChild(C),d.appendChild(L),d.appendChild(u),d.appendChild(H),d.appendChild(k);let D=document.createElement("div");D.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let w=y("margin","top");w.style.gridRow="1",w.style.gridColumn="2",w.style.textAlign="center";let M=y("margin","left");M.style.gridRow="2",M.style.gridColumn="1";let B=y("margin","right");B.style.gridRow="2",B.style.gridColumn="3";let ne=y("margin","bottom");ne.style.gridRow="3",ne.style.gridColumn="2",ne.style.textAlign="center";let Ne=document.createElement("div");Ne.style.cssText="grid-row:2; grid-column:2;",Ne.appendChild(d),D.appendChild(w),D.appendChild(M),D.appendChild(Ne),D.appendChild(B),D.appendChild(ne);let tn=N("margin"),pa=N("padding"),nn=document.createElement("div");return nn.style.cssText="display:flex; gap:8px; padding:0 4px;",nn.appendChild(tn),nn.appendChild(pa),c.appendChild(D),a.appendChild(c),s.appendChild(nn),s.appendChild(a),{element:s,setValue(S,E){if(!ki(S))return;r.set(S,E);let W=p.find(Ue=>Ue.key===S);W&&(W.span.textContent=A(E))},destroy(){}}}V();var En=new Set;function Pi(e){return En.has(e)}var Tn=[];function Li(e){return Tn.push(e),()=>{let t=Tn.indexOf(e);t>=0&&Tn.splice(t,1)}}var Rl={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background",border:"Border",effects:"Effects"},Nl={"number-scrub":Ci,segmented:Ei,"color-swatch":Ti,slider:Si,"box-model":Mi},Ol=`
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
    border-radius: ${O.xs};
    padding: 4px 6px;
    font-family: ${T};
    font-size: 11px;
    color: ${l.textPrimary};
    outline: none;
    box-sizing: border-box;
    transition: border-color ${P.fast}, box-shadow ${P.fast};
  }
  .prop-input:hover {
    border-color: ${l.borderStrong};
  }
  .prop-input:focus {
    border-color: ${l.accent};
    box-shadow: 0 0 0 2px ${l.focusRing};
  }
  .prop-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: ${l.bgTertiary};
    outline: none;
    cursor: pointer;
  }
  .prop-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${l.accent};
    border: 2px solid white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    cursor: pointer;
  }
  .prop-slider:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 3px ${l.focusRing};
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
`;function $l(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function Al(e){let t=new Map;for(let o of e){let n=t.get(o.group);n||(n=[],t.set(o.group,n)),n.push(o)}return t}function _l(e){let t=[],o=new Map;for(let n of e)if(n.compound&&n.compoundGroup){let r=o.get(n.compoundGroup);r||(r=[],o.set(n.compoundGroup,r)),r.push(n)}else t.push({controlType:n.controlType,descriptors:[n]});for(let[,n]of o)t.push({controlType:n[0].controlType,descriptors:n});return t}var Hl=new Set(["flexDirection","justifyContent","alignItems","gap"]);function Il(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function Vo(e,t,o,n){let r=document.createElement("div");r.className="prop-sections";let i=document.createElement("style");i.textContent=Ol,r.appendChild(i);let s=[],a=Al(e);for(let[c,d]of a){let u=c==="layout"&&!Il(t)?d.filter(x=>!Hl.has(x.key)):d;if(u.length===0)continue;let p=document.createElement("div");p.className="prop-section";let f=document.createElement("div");f.className="prop-section-header",f.innerHTML=`<span>${Rl[c]}</span>${$l()}`;let m=document.createElement("div");m.className="prop-section-body";let g=En.has(c);if(g){let x=f.querySelector(".prop-section-chevron");x&&x.classList.add("collapsed"),m.classList.add("collapsed")}f.addEventListener("click",()=>{if(g=!g,g)En.add(c);else{En.delete(c);for(let $ of Tn)$(c)}let x=f.querySelector(".prop-section-chevron");x&&x.classList.toggle("collapsed",g),m.classList.toggle("collapsed",g)}),p.appendChild(f);let b=_l(u);for(let x of b){let $=Nl[x.controlType];if(!$)continue;let A=$(x.descriptors,t,o,n);if(x.descriptors.length>1||x.controlType==="box-model")m.appendChild(A.element);else{let N=document.createElement("div");N.className="prop-control-row";let v=document.createElement("span");v.className="prop-control-label",v.textContent=x.descriptors[0].label,v.title=x.descriptors[0].label;let y=document.createElement("div");y.className="prop-control-value",y.appendChild(A.element),N.appendChild(v),N.appendChild(y),m.appendChild(N)}s.push(A)}p.appendChild(m),r.appendChild(p)}return{container:r,controls:s}}V();var Dl=300,Ri=260,Ni=380,Oi="sketch-ui-sidebar-width",Fl=4,Vl=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${l.bgPrimary};
    border-left: 1px solid ${l.border};
    box-shadow: ${_.lg};
    z-index: 2147483645;
    font-family: ${T};
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform ${P.settle};
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
    width: ${Fl}px;
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
    border-radius: ${O.sm};
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
    border-radius: ${O.xs};
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
`;function zl(){try{let e=localStorage.getItem(Oi);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=Ri&&t<=Ni)return t}}catch{}return Math.min(Dl,Math.floor(window.innerWidth*.22))}function Bl(e){try{localStorage.setItem(Oi,String(e))}catch{}}function $i(e,t){let o=document.createElement("style");o.textContent=Vl,e.appendChild(o);let n=document.createElement("div");n.className="prop-sidebar",n.style.width=`${zl()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",n.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let s=document.createElement("div");s.className="prop-sidebar-header-info";let a=document.createElement("div");a.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let d=document.createElement("div");d.className="prop-sidebar-file-path",s.appendChild(a),s.appendChild(d);let u=document.createElement("button");u.className="prop-sidebar-close",u.title="Close panel",u.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>',i.appendChild(s),i.appendChild(u),n.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",n.appendChild(p);let f=document.createElement("div");f.className="prop-sidebar-content",n.appendChild(f),e.appendChild(n);let m=!1,g=0,b=0;r.addEventListener("pointerdown",k=>{k.preventDefault(),k.stopPropagation(),m=!0,g=k.clientX,b=n.offsetWidth,r.classList.add("active"),r.setPointerCapture(k.pointerId)}),r.addEventListener("pointermove",k=>{if(!m)return;let D=g-k.clientX,w=Math.max(Ri,Math.min(Ni,b+D));n.style.width=`${w}px`});let x=()=>{m&&(m=!1,r.classList.remove("active"),Bl(n.offsetWidth))};r.addEventListener("pointerup",x),r.addEventListener("pointercancel",x),n.addEventListener("pointerdown",k=>k.stopPropagation()),n.addEventListener("mousedown",k=>k.stopPropagation()),n.addEventListener("click",k=>k.stopPropagation()),n.addEventListener("mouseup",k=>k.stopPropagation()),u.addEventListener("click",()=>{N(),t&&t()});let $=!1;function A(k,D,w,M){a.textContent=`<${k}>`,a.appendChild(c),d.textContent=`${D}:${w}`,d.title=`${D}:${w}`,f.innerHTML="",f.appendChild(M),$||($=!0,n.offsetHeight,n.classList.add("visible"))}function N(){$&&($=!1,n.classList.remove("visible"))}function v(k){f.innerHTML="",f.appendChild(k)}function y(k,D,w){p.innerHTML="";let M=document.createElement("span");M.className="prop-sidebar-warning-text",M.textContent=k;let B=document.createElement("button");B.className="prop-sidebar-warning-btn",B.textContent=D,B.addEventListener("click",ne=>{ne.stopPropagation(),w()}),p.appendChild(M),p.appendChild(B),p.style.display="flex"}function C(){p.style.display="none",p.innerHTML=""}function L(){c.classList.add("active")}function H(){c.classList.remove("active")}return{show:A,hide:N,isVisible:()=>$,getElement:()=>n,replaceContent:v,showWarning:y,clearWarning:C,showSaving:L,hideSaving:H}}ge();var Ko=new Map(ct.map(e=>[e.key,e]));var Yl=new Set(["layout","spacing","size"]),ji=new Set(["typography","background","border","effects"]),Wl=5e3,h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map},Je=[],F,Ui,re=null,jl=300,pe=null,ut=null,Rn=new MutationObserver(()=>{h.selectedElement&&!document.contains(h.selectedElement)&&(clearTimeout(Ui),Ui=setTimeout(()=>{Ul()},80))});function Ul(){let e=h.elementIdentity,t=h.componentInfo;if(!e||!t){On();return}let o=Xl(e);if(o){Nn(o,t);return}Kl(e).then(n=>{n?Nn(n,t):On()})}function Xl(e){let t=document.querySelectorAll(e.tagName);for(let o of t)if(o instanceof HTMLElement)try{let n=le(o);for(;n;){if(be(n)){let r=n._debugSource,i=ae(n);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return o}n=n.return}}catch{}return null}async function Kl(e){let t=document.querySelectorAll(e.tagName);for(let o of t)if(o instanceof HTMLElement)try{let n=le(o);if(!n)continue;let r=await Ke(n);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let a="";if(i.fileName){let c=_e(i.fileName);qe(c)&&(a=c)}if(a&&e.filePath.endsWith(a)&&(i.lineNumber??0)===e.lineNumber)return o}}catch{}return null}function ql(e,t){let o=getComputedStyle(e),n=new Map;for(let r of ct){if(t&&!t.has(r.group)){n.set(r.key,r.defaultValue);continue}let i=o.getPropertyValue(r.cssProperty).trim();n.set(r.key,i||r.defaultValue)}return n}function Zl(e){if(!h.selectedElement)return;let t=getComputedStyle(h.selectedElement);for(let o of ct){if(o.group!==e||h.activeOverrides.has(o.key))continue;let r=t.getPropertyValue(o.cssProperty).trim()||o.defaultValue;h.currentValues.set(o.key,r),h.originalValues.get(o.key)===o.defaultValue&&h.originalValues.set(o.key,r);for(let i of Je)i.setValue(o.key,r)}}function Gt(){for(let e of Je)e.destroy();Je=[]}function Xi(){if(!h.selectedElement||!h.componentInfo)return;Gt();let{container:e,controls:t}=Vo(ct,h.currentValues,Zi,Ki);Je=t,F.replaceContent(e)}function Ki(){re&&clearTimeout(re),re=setTimeout(()=>{re=null,Zo()},jl)}function qo(){re&&(clearTimeout(re),re=null),ut&&(ut(),ut=null),pe&&(clearTimeout(pe.timeoutId),pe=null),h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map}}function qi(e){F=$i(e,()=>{$n(),Gt(),qo()}),Tr((t,o,n)=>{if(F&&F.hideSaving(),pe)if(clearTimeout(pe.timeoutId),t)pe=null;else{let{batch:r,previousOriginals:i}=pe;pe=null;for(let[s]of r){let a=i.get(s);a!==void 0&&h.originalValues.set(s,a)}if(h.selectedElement){for(let[s]of r){h.selectedElement.style[s]="",h.activeOverrides.delete(s);let a=h.originalValues.get(s);a!==void 0&&h.currentValues.set(s,a)}for(let s of Je)for(let[a]of r){let c=h.originalValues.get(a);c!==void 0&&s.setValue(a,c)}}if(F){let a={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[o||""]||n||"Failed to write changes";F.showWarning(a,"Dismiss",()=>F.clearWarning())}}else if(!t&&F){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[o||""]||n||"Failed to write changes";F.showWarning(i,"Dismiss",()=>F.clearWarning())}})}function Nn(e,t){h.pendingBatch.size>0&&Zo(),Gt(),h.selectedElement=e,h.componentInfo=t,h.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let o=new Set(Yl);for(let s of ji)Pi(s)||o.add(s);let n=ql(e,o);h.currentValues=n,h.originalValues=new Map(n),h.activeOverrides=new Map,h.pendingBatch=new Map,ut&&ut(),ut=Li(s=>{ji.has(s)&&Zl(s)});let{container:r,controls:i}=Vo(ct,h.currentValues,Zi,Ki);Je=i,Rn.disconnect(),Rn.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),F.show(t.componentName,t.filePath,t.lineNumber,r)}function Zi(e,t){let o=Ko.get(e);if(!o||!h.selectedElement)return;h.selectedElement.style[o.key]=t,h.activeOverrides.set(e,t),h.currentValues.set(e,t);let n=Et(),r=o.tailwindScale+"Reverse",i=n[r],s=i?on(t,i):null;if(!s&&o.enumValues){let a=o.enumValues.find(c=>c.value===t);a&&(s=a.tailwindValue)}if(h.pendingBatch.set(e,{property:e,cssProperty:o.cssProperty,value:t,tailwindPrefix:o.tailwindPrefix,tailwindToken:s,relatedPrefixes:o.relatedPrefixes,originalValue:h.originalValues.get(e)||o.defaultValue}),e==="display")if(Xi(),t==="none"){let a=h.originalValues.get("display")||"block";F.showWarning("Element hidden","Restore",()=>{h.selectedElement&&(h.selectedElement.style.display=a),h.activeOverrides.delete("display"),h.currentValues.set("display",a),h.pendingBatch.delete("display"),Xi(),F.clearWarning()})}else F.clearWarning()}function Zo(){if(h.pendingBatch.size===0||!h.componentInfo)return;let e=h.componentInfo.filePath,t=h.componentInfo.lineNumber,o=h.componentInfo.columnNumber-1;if(h.pendingBatch.size===1){let s=[...h.pendingBatch.values()][0],a=Ko.get(s.property);$e({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:o,...s,framework:"tailwind",classPattern:a?.classPattern,standalone:a?.standalone})}else $e({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:o,updates:[...h.pendingBatch.values()].map(s=>{let a=Ko.get(s.property);return{...s,classPattern:a?.classPattern,standalone:a?.standalone}}),framework:"tailwind"});h.selectedElement&&h.elementIdentity&&Bi({type:"propertyChange",elementIdentity:h.elementIdentity,element:h.selectedElement,overrides:[...h.pendingBatch.values()].map(s=>({cssProperty:s.cssProperty,previousValue:s.originalValue,newValue:s.value}))}),F&&F.showSaving();let n=new Map;for(let[s]of h.pendingBatch)n.set(s,h.originalValues.get(s)||"");for(let[s,a]of h.pendingBatch)h.originalValues.set(s,a.value);let r=new Map(h.pendingBatch),i=setTimeout(()=>{pe&&pe.batch===r&&(pe=null,F&&F.hideSaving())},Wl);pe={batch:r,previousOriginals:n,timeoutId:i},h.pendingBatch.clear()}function $n(){if(h.selectedElement){for(let[e]of h.activeOverrides)h.selectedElement.style[e]="";for(let[e,t]of h.originalValues)h.currentValues.set(e,t);for(let e of Je)for(let[t,o]of h.originalValues)e.setValue(t,o);h.activeOverrides.clear(),h.pendingBatch.clear()}}function On(){re&&(clearTimeout(re),re=null),Rn.disconnect(),$n(),Gt(),F&&F.hide(),qo()}function Ji(){re&&(clearTimeout(re),re=null),Rn.disconnect(),Zo(),Gt(),F&&F.hide(),qo()}function Qi(){return h.activeOverrides.size>0}Ro()||No({onCommitFiberRoot(){}});async function Jl(e){let t=le(e);if(!t)return null;try{let o=await Ke(t);if(o&&o.length>0){let n=[];for(let r of o){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||He(i))continue;let s="";if(r.fileName){let a=_e(r.fileName);qe(a)&&(s=a)}n.push({componentName:i,filePath:s,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(n.length>0)return{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}}catch(o){console.warn("[SketchUI] getOwnerStack failed, falling back to fiber walk:",o)}return ts(e,t)}function ts(e,t){let o=[],n=t;for(;n;){if(be(n)){let r=ae(n.type),i=n._debugSource||n._debugOwner?._debugSource,s="",a=0,c=0;i&&(s=i.fileName||"",a=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!He(r)&&o.push({componentName:r,filePath:s,lineNumber:a,columnNumber:c})}n=n.return}return o.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}function es(e){let t=le(e);return t?ts(e,t):null}var xe=null,ve=null,Me=!1,pt=!1,R=null,he=null,Qe="idle",X=null,Yt=null,Ql=null,ec=null,tc=null,nc=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${_.sm};
    border-radius: ${O.sm};
    padding: 4px 8px;
    z-index: 2147483646;
    font-family: ${T};
    white-space: nowrap;
    display: none;
    opacity: 0;
    transition: opacity ${P.medium};
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
`;function ns(e){Ql=e.onStart,ec=e.onMove,tc=e.onEnd}function os(){let e=z();if(!e)return;let t=document.createElement("style");t.textContent=nc,e.appendChild(t),R=document.createElement("div"),R.className="selection-label",e.appendChild(R),he=document.createElement("div"),he.className="marquee-box",e.appendChild(he),Me=!0,document.addEventListener("mousedown",An,!0),document.addEventListener("mousemove",_n,!0),document.addEventListener("mouseup",Hn,!0),document.addEventListener("keydown",Dn,!0),document.addEventListener("click",In,!0),document.addEventListener("scroll",Ge,!0),window.addEventListener("resize",Ge),pt=!0}function An(e){if(!Me||e.metaKey||e.ctrlKey)return;let t=document.elementFromPoint(e.clientX,e.clientY);if(!t?.closest("#sketch-ui-root")){if(e.preventDefault(),e.stopPropagation(),!t||!_t(t)){xe&&(Ji(),xe=null,ve=null,Dt(null),R&&(R.classList.remove("visible"),R.style.display="none"),dn(null));return}X={x:e.clientX,y:e.clientY},Yt=t,Qe="pending"}}function _n(e){if(Me){if(Qe==="pending"&&X){let t=Math.abs(e.clientX-X.x),o=Math.abs(e.clientY-X.y);(t>10||o>10)&&(Qe="marquee")}if(Qe==="marquee"&&X&&he){let t=Math.min(e.clientX,X.x),o=Math.min(e.clientY,X.y),n=Math.abs(e.clientX-X.x),r=Math.abs(e.clientY-X.y);he.style.display="block",he.style.left=`${t}px`,he.style.top=`${o}px`,he.style.width=`${n}px`,he.style.height=`${r}px`;return}if(Qe==="idle"){let t=document.elementFromPoint(e.clientX,e.clientY);if(!t||!_t(t)){xn(null);return}let o=t.getBoundingClientRect(),n=parseFloat(getComputedStyle(t).borderRadius)||4;xn(o,n+2)}}}function Hn(e){if(!Me)return;let t=Qe;if(Qe="idle",t==="marquee"&&X){he&&(he.style.display="none"),rc(Math.min(e.clientX,X.x),Math.min(e.clientY,X.y),Math.max(e.clientX,X.x),Math.max(e.clientY,X.y)),X=null,Yt=null;return}Yt&&oc(Yt),X=null,Yt=null}async function oc(e){try{ve=e,rs(e.getBoundingClientRect(),{}),sc();let t=await Jl(e);if(console.log("[SketchUI] selectElement:",e.tagName,"\u2192",t?.componentName,t?.filePath,"stack:",t?.stack?.map(o=>o.componentName)),!t)return;if(xe={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:e.getBoundingClientRect().top,left:e.getBoundingClientRect().left,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}},R){let o=t.filePath?`${t.filePath}:${t.lineNumber}`:"";R.innerHTML=`<span class="comp-name">${t.componentName}</span>${o?`<span class="comp-path">${o}</span>`:""}`}Nn(e,xe),dn({tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber})}catch(t){console.error("[SketchUI] selectElement error:",t)}}function rc(e,t,o,n){let r=bn({x:e,y:t,width:o-e,height:n-t});if(r.length===0)return;let i=[];for(let a of r.slice(0,50)){let c=es(a);c?.stack?.length&&i.push(c.stack)}if(i.length===0)return;let s=ic(i);if(s)for(let a of r){let c=es(a);if(c&&c.componentName===s.componentName){let d=a.getBoundingClientRect();if(ve=a,xe={tagName:a.tagName.toLowerCase(),componentName:s.componentName,filePath:s.filePath,lineNumber:s.lineNumber,columnNumber:s.columnNumber,stack:c.stack,boundingRect:{top:d.top,left:d.left,width:d.width,height:d.height}},rs(d,xe),R){let u=s.filePath?`${s.filePath}:${s.lineNumber}`:"";R.innerHTML=`<span class="comp-name">${s.componentName}</span>${u?`<span class="comp-path">${u}</span>`:""}`}return}}}function ic(e){if(e.length===0)return null;if(e.length===1)return e[0][0];let t=e[0],o=null;for(let n=0;n<t.length;n++){let r=t[n];if(e.every(s=>s[n]&&s[n].filePath===r.filePath&&s[n].lineNumber===r.lineNumber))o=r;else break}return o}function In(e){Me&&(e.metaKey||e.ctrlKey||e.preventDefault())}function Dn(e){if(Me&&e.key==="Escape"&&xe){if(Qi()){$n(),e.preventDefault();return}Wt(),e.preventDefault()}}function rs(e,t){if(ve){let o=parseFloat(getComputedStyle(ve).borderRadius)||4;Dt(e,o+2)}if(R){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),R.style.left=`${i}px`,R.style.top=`${r}px`,R.style.display="block",R.style.right="auto",R.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>R?.classList.add("visible")),requestAnimationFrame(()=>{if(!R)return;R.getBoundingClientRect().right>window.innerWidth-8&&(R.style.left="auto",R.style.right="8px")})}}function Ge(){if(!ve||!xe)return;let e=ve.getBoundingClientRect(),t=parseFloat(getComputedStyle(ve).borderRadius)||4;if(Dt(e,t+2),R&&R.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),R.style.left=`${e.left}px`,R.style.top=`${r}px`,R.style.right="auto",R.getBoundingClientRect().right>window.innerWidth-8&&(R.style.left="auto",R.style.right="8px")}}function sc(){xn(null)}function Wt(){On(),xe=null,ve=null,Dt(null),R&&(R.classList.remove("visible"),R.style.display="none"),dn(null)}function is(){return xe}function ss(){Me=!1,document.removeEventListener("mousedown",An,!0),document.removeEventListener("mousemove",_n,!0),document.removeEventListener("mouseup",Hn,!0),document.removeEventListener("keydown",Dn,!0),document.removeEventListener("click",In,!0),document.removeEventListener("scroll",Ge,!0),window.removeEventListener("resize",Ge),pt=!1,R?.remove(),R=null}function Jo(e){e&&!pt?(document.addEventListener("mousedown",An,!0),document.addEventListener("mousemove",_n,!0),document.addEventListener("mouseup",Hn,!0),document.addEventListener("keydown",Dn,!0),document.addEventListener("click",In,!0),document.addEventListener("scroll",Ge,!0),window.addEventListener("resize",Ge),pt=!0,Me=!0):!e&&pt&&(document.removeEventListener("mousedown",An,!0),document.removeEventListener("mousemove",_n,!0),document.removeEventListener("mouseup",Hn,!0),document.removeEventListener("keydown",Dn,!0),document.removeEventListener("click",In,!0),document.removeEventListener("scroll",Ge,!0),window.removeEventListener("resize",Ge),pt=!1,Me=!1)}function as(){return ve??null}var te=null,ee=null,Ye=null,ls=null,jt=!1,mt=null,Fn=[],Vn=new Map,zn=!1,ac=`
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
`,ft=null;function cs(){let e=z();if(!e)return;let t=document.createElement("style");t.textContent=ac,e.appendChild(t),ns({onStart:lc,onMove:cc,onEnd:dc}),St(o=>{o.type==="reorderComplete"&&(Qo(),Wt())})}function lc(e,t,o){Ye=o,ls=t,mt={x:e.clientX,y:e.clientY},jt=!1,zn=!1,Fn=[],Vn=new Map,ft=null;let n=z();if(!n)return;te=document.createElement("div"),te.className="drag-preview";let r=t.getBoundingClientRect();te.style.width=`${r.width}px`,te.style.height=`${r.height}px`,te.innerHTML=t.outerHTML,n.appendChild(te),ee=document.createElement("div"),ee.className="drop-indicator",n.appendChild(ee);let i=o.stack[1];if(!i)return;$e({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let s=St(a=>{if(a.type!=="siblingsList")return;s(),Fn=a.siblings;let c=document.querySelectorAll("*");for(let d of c){if(d.closest("#sketch-ui-root"))continue;let u=le(d);if(!u)continue;let p=u;for(;p;){if(be(p)){let f=p._debugSource||p._debugOwner?._debugSource;if(f){for(let m of a.siblings)f.lineNumber===m.lineNumber&&f.fileName===i.filePath&&Vn.set(m.lineNumber,{el:d,rect:d.getBoundingClientRect()});break}}p=p.return}}zn=!0})}function cc(e){if(!mt)return;let t=Math.abs(e.clientX-mt.x),o=Math.abs(e.clientY-mt.y);if(t<5&&o<5||(jt=!0,te&&(te.style.display="block",te.style.left=`${e.clientX+10}px`,te.style.top=`${e.clientY+10}px`),!zn||!Ye))return;let n=null,r=1/0,i=0,s=0,a=0;for(let c of Fn){if(c.lineNumber===Ye.lineNumber)continue;let d=Vn.get(c.lineNumber);if(!d)continue;let u=d.rect,p=u.top+u.height/2,f=Math.abs(e.clientY-p);f<r&&(r=f,n=c,e.clientY<p?i=u.top-2:i=u.bottom+2,s=u.left,a=u.width)}ft=n,n&&ee?(ee.style.display="block",ee.style.top=`${i}px`,ee.style.left=`${s}px`,ee.style.width=`${a}px`):ee&&(ee.style.display="none")}function dc(e){if(!jt||!ft||!Ye){Qo();return}$e({type:"reorder",filePath:Ye.filePath,fromLine:Ye.lineNumber,toLine:ft.lineNumber,fromComponent:Ye.componentName,toComponent:ft.componentName}),te&&(te.style.display="none"),ee&&(ee.style.display="none"),jt=!1,mt=null}function Qo(){te?.remove(),ee?.remove(),te=null,ee=null,Ye=null,ls=null,jt=!1,mt=null,zn=!1,Fn=[],Vn=new Map,ft=null}function ds(){Qo()}V();var We="http://www.w3.org/2000/svg",gt=null,K=null;function us(){let e=z();e&&(gt=document.createElementNS(We,"svg"),gt.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),K=document.createElementNS(We,"g"),K.setAttribute("class","annotation-root"),gt.appendChild(K),e.appendChild(gt),window.addEventListener("scroll",tr,{passive:!0}),tr())}var er=null;function tr(){er===null&&(er=requestAnimationFrame(()=>{er=null,K&&K.setAttribute("transform",`translate(${-window.scrollX}, ${-window.scrollY})`)}))}function ps(e,t,o,n){if(!K||t.length<2)return null;let r=document.createElementNS(We,"g");r.setAttribute("data-annotation-id",e);let i=document.createElementNS(We,"path");return i.setAttribute("d",ys(t)),i.setAttribute("stroke",o),i.setAttribute("stroke-width",String(n)),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.setAttribute("fill","none"),r.appendChild(i),K.appendChild(r),r}function ms(e,t,o,n,r,i){if(!K)return null;let s=document.createElementNS(We,"foreignObject");s.setAttribute("data-annotation-id",e),s.setAttribute("x",String(t)),s.setAttribute("y",String(o)),s.setAttribute("width","300"),s.setAttribute("height","100");let a=document.createElement("div");return a.style.cssText=`
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${_.sm};
    padding: 4px 8px;
    border-radius: ${O.sm};
    font-size: ${r}px;
    font-family: ${T};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,a.textContent=n,s.appendChild(a),K.appendChild(s),s}function fs(e,t,o,n){if(!K)return null;let r=document.createElementNS(We,"circle");return r.setAttribute("data-annotation-id",e),r.setAttribute("cx",String(t)),r.setAttribute("cy",String(o)),r.setAttribute("r","6"),r.setAttribute("fill",n),r.setAttribute("stroke","white"),r.setAttribute("stroke-width","1.5"),K.appendChild(r),r}function gs(){K&&(K.innerHTML="")}function hs(){window.removeEventListener("scroll",tr),gt?.remove(),gt=null,K=null}function ys(e){if(e.length===0)return"";let t=`M${e[0].x},${e[0].y}`;for(let o=1;o<e.length;o++)t+=` L${e[o].x},${e[o].y}`;return t}function bs(e,t){if(!K)return null;let o=[],n=document.createElementNS(We,"g"),r=document.createElementNS(We,"path");return r.setAttribute("stroke",e),r.setAttribute("stroke-width",String(t)),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("fill","none"),n.appendChild(r),K.appendChild(n),{path:r,group:n,addPoint(i,s){o.push({x:i,y:s}),r.setAttribute("d",ys(o))},getPoints(){return o}}}ge();V();var uc="2147483644";function vs(){window.addEventListener("scroll",xs,{passive:!0})}var nr=null;function xs(){nr===null&&(nr=requestAnimationFrame(()=>{nr=null;for(let e of Be().values())e.cloneEl.style.left=`${e.currentPos.x-window.scrollX}px`,e.cloneEl.style.top=`${e.currentPos.y-window.scrollY}px`}))}function ws(e,t){let o=e.getBoundingClientRect(),n=e.cloneNode(!0);n.setAttribute("data-sketch-ui-ghost","true"),n.style.position="fixed",n.style.left=`${o.left}px`,n.style.top=`${o.top}px`,n.style.width=`${o.width}px`,n.style.height=`${o.height}px`,n.style.zIndex=uc,n.style.pointerEvents="none",n.style.margin="0",n.style.boxSizing="border-box",n.style.boxShadow=_.sm,document.body.appendChild(n);let r=e.style.opacity||"",i=e.style.visibility||"",s=Pn();e.style.opacity=s?"0":"0.3",s&&(e.style.visibility="hidden");let a={id:crypto.randomUUID(),componentRef:t,originalRect:{top:o.top+window.scrollY,left:o.left+window.scrollX,width:o.width,height:o.height},currentPos:{x:o.left+window.scrollX,y:o.top+window.scrollY},cloneEl:n,originalEl:e,originalOpacity:r,originalVisibility:i};return Di(a),a}function Cs(e,t,o){let n=Be().get(e);n&&(n.currentPos={x:t,y:o},n.cloneEl.style.left=`${t-window.scrollX}px`,n.cloneEl.style.top=`${o-window.scrollY}px`)}function Es(e,t){for(let o of Be().values()){let n=o.cloneEl.getBoundingClientRect();if(e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom)return o}return null}function Ts(){window.removeEventListener("scroll",xs)}function Bn(e){let t=Be().get(e);t&&(t.cloneEl.style.boxShadow=_.lg,t.cloneEl.style.opacity="0.9",t.cloneEl.style.transition=`box-shadow ${P.settle}`)}function Ss(e){let t=Be().get(e);t&&(t.cloneEl.style.boxShadow=_.sm,t.cloneEl.style.opacity="1")}ge();V();Ut();var we={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-7 1-4 7z"/></svg>',grab:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V8a2 2 0 0 0-4 0v3"/><path d="M14 10V6a2 2 0 0 0-4 0v4"/><path d="M10 9.5V5a2 2 0 0 0-4 0v9"/><path d="M6 14c0 3.31 2.69 6 6 6h2a6 6 0 0 0 6-6v-2"/></svg>',move:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',draw:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',color:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22l1-1h3l9-9"/><path d="M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7"/><path d="M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14"/><path d="m9 7 6 6"/><path d="M20 2a2.83 2.83 0 0 1 0 4L16 10"/></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',lasso:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4c-4.42 0-8 2.24-8 5 0 1.72 1.3 3.24 3.3 4.2"/><path d="M12 4c4.42 0 8 2.24 8 5 0 2.76-3.58 5-8 5"/><path d="M7.3 13.2C5.71 14.08 5 15.27 5 16.5c0 2.49 3.13 4.5 7 4.5s7-2.01 7-4.5c0-1.23-.71-2.42-2.3-3.3"/></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18c3.87 0 7-3.13 7-7s-3.13-7-7-7H4"/><polyline points="8 10 4 6 8 2"/></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>'},Ds=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",Yn=navigator.platform.includes("Mac")?"Cmd":"Ctrl",fr=[{type:"pointer",icon:we.pointer,label:"Pointer",shortcut:"V"},{type:"grab",icon:we.grab,label:"Grab",shortcut:"H"},{type:"move",icon:we.move,label:"Move",shortcut:"M"},{type:"draw",icon:we.draw,label:"Draw",shortcut:"D"},{type:"color",icon:we.color,label:"Color",shortcut:"E"},{type:"text",icon:we.text,label:"Text",shortcut:"T"},{type:"lasso",icon:we.lasso,label:"Lasso",shortcut:"L"}],wc=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${O.lg};
    box-shadow: ${_.md};
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    gap: 4px;
    font-family: ${T};
    user-select: none;
    opacity: 0;
    animation: panelFadeIn ${P.settle} forwards;
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
    transition: background ${P.fast}, color ${P.fast};
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
    box-shadow: ${_.sm};
    color: ${l.textPrimary};
    padding: 4px 8px;
    border-radius: ${O.sm};
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity ${P.medium};
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
    transition: opacity ${P.medium};
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
    box-shadow: ${_.sm};
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
    transition: background ${P.fast}, color ${P.fast}, box-shadow ${P.fast};
  }
  .segment.active {
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    box-shadow: ${_.sm};
  }
  .clear-btn {
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
    transition: background ${P.fast}, color ${P.fast};
  }
  .clear-btn svg {
    width: 18px;
    height: 18px;
  }
  .clear-btn:hover {
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
    transition: background ${P.fast}, color ${P.fast};
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
    border-radius: ${O.lg};
    box-shadow: ${_.lg};
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
`,ie=null,q=null,jn=new Map,Pe=null,pr=null,mr=null;function Fs(e){pr=e}function Vs(e){mr=e}function zs(e){Pe&&(Pe.disabled=!e)}function Bs(){let e=z();if(!e)return;let t=document.createElement("style");t.textContent=wc,e.appendChild(t),ie=document.createElement("div"),ie.className="tools-panel";let o=[["pointer","grab"],["move"],["draw","color","text"],["lasso"]];for(let a=0;a<o.length;a++){if(a>0){let c=document.createElement("div");c.className="tool-divider",ie.appendChild(c)}for(let c of o[a]){let d=fr.find(f=>f.type===c),u=document.createElement("button");u.className=`tool-btn${d.type==="pointer"?" active":""}`,u.innerHTML=`${d.icon}<span class="tooltip">${d.label}<span class="shortcut-badge">${Ds}${d.shortcut}</span></span>`,u.addEventListener("click",()=>Vt(d.type));let p=null;u.addEventListener("mouseenter",()=>{p=setTimeout(()=>u.classList.add("tooltip-visible"),400)}),u.addEventListener("mouseleave",()=>{p&&clearTimeout(p),u.classList.remove("tooltip-visible")}),ie.appendChild(u),jn.set(d.type,u)}}q=document.createElement("div"),q.className="sub-options hidden",ie.appendChild(q);let n=document.createElement("div");n.className="tool-divider",ie.appendChild(n),Pe=document.createElement("button"),Pe.className="clear-btn",Pe.innerHTML=we.undo,Pe.title="Undo (Ctrl+Z)",Pe.disabled=!0,Pe.addEventListener("click",()=>{mr&&mr()}),ie.appendChild(Pe);let r=document.createElement("button");r.className="clear-btn",r.innerHTML=we.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{pr&&pr()}),ie.appendChild(r);let i=document.createElement("button");i.className="clear-btn",i.innerHTML=we.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{$s(),i.style.color=Os()?l.accent:""}),ie.appendChild(i);let s=document.createElement("button");s.className="help-btn",s.textContent="?",s.title=`Keyboard Shortcuts (${Ds}/)`,s.addEventListener("click",()=>Ys()),ie.appendChild(s),e.appendChild(ie),document.addEventListener("keydown",Gs,!0)}function Gs(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||!e.ctrlKey&&!e.metaKey)return;let o=e.key.toUpperCase();if(e.key==="/"||e.key==="?"){Ys(),e.preventDefault();return}let n=fr.find(r=>r.shortcut===o);n&&(Vt(n.type),e.preventDefault())}var Ce=null,Zt=null;function Ys(){Ce?Wn():Cc()}function Cc(){let e=z();if(!e||Ce)return;Ce=document.createElement("div"),Ce.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let o=document.createElement("div");o.className="shortcuts-title",o.textContent="Keyboard Shortcuts",t.appendChild(o);let n=[{label:"Tools",items:fr.map(r=>({action:r.label,keys:[Yn,r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[Yn,"Z"]},{action:"Toggle Originals",keys:[Yn,"."]},{action:"Keyboard Shortcuts",keys:[Yn,"/"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Grab Tool","Drag"]},{action:"Zoom",keys:["Scroll Wheel"]}]}];for(let r of n){let i=document.createElement("div");i.className="shortcuts-section";let s=document.createElement("div");s.className="shortcuts-section-label",s.textContent=r.label,i.appendChild(s);for(let a of r.items){let c=document.createElement("div");c.className="shortcut-row";let d=document.createElement("span");d.className="shortcut-action",d.textContent=a.action,c.appendChild(d);let u=document.createElement("span");u.className="shortcut-keys";for(let p=0;p<a.keys.length;p++){if(p>0){let m=document.createElement("span");m.className="shortcut-plus",m.textContent="+",u.appendChild(m)}let f=document.createElement("span");f.className="shortcut-key",f.textContent=a.keys[p],u.appendChild(f)}c.appendChild(u),i.appendChild(c)}t.appendChild(i)}Ce.appendChild(t),Ce.addEventListener("click",r=>{r.target===Ce&&Wn()}),e.appendChild(Ce),Zt=r=>{Wn()},document.addEventListener("keydown",Zt,!0)}function Wn(){Zt&&(document.removeEventListener("keydown",Zt,!0),Zt=null),Ce?.remove(),Ce=null}function Ws(e){for(let[t,o]of jn)o.classList.toggle("active",t===e);Ec(e)}function Ec(e){if(q){if(q.innerHTML="",q.classList.add("hidden"),q.classList.remove("visible"),e==="draw"){q.classList.remove("hidden"),requestAnimationFrame(()=>q?.classList.add("visible"));let t=ue(),o=document.createElement("button");o.className="color-swatch",o.style.background=t.brushColor,o.addEventListener("click",()=>{let r=o.getBoundingClientRect();Ze({initialColor:t.brushColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){zt("brushColor",i),o.style.background=i},onClose(){}})}),q.appendChild(o);let n=document.createElement("div");n.className="segmented-control";for(let r of[2,4,8]){let i=document.createElement("button");i.className=`segment${r===t.brushSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{zt("brushSize",r),n.querySelectorAll(".segment").forEach(s=>s.classList.remove("active")),i.classList.add("active"),Promise.resolve().then(()=>(yt(),Is)).then(s=>s.refreshDrawCursor())}),n.appendChild(i)}q.appendChild(n)}else if(e==="text"){q.classList.remove("hidden"),requestAnimationFrame(()=>q?.classList.add("visible"));let t=ue(),o=document.createElement("button");o.className="color-swatch",o.style.background=t.textColor,o.addEventListener("click",()=>{let r=o.getBoundingClientRect();Ze({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){zt("textColor",i),o.style.background=i},onClose(){}})}),q.appendChild(o);let n=document.createElement("div");n.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{zt("fontSize",r),n.querySelectorAll(".segment").forEach(s=>s.classList.remove("active")),i.classList.add("active")}),n.appendChild(i)}q.appendChild(n)}}}function js(e){let t=jn.get(e);t&&(t.style.backgroundColor=l.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function Us(){document.removeEventListener("keydown",Gs,!0),Wn(),ie?.remove(),ie=null,q=null,jn.clear()}yt();ar();V();var Xs="sketch-ui-onboarding-seen",Ee=null,Un=null;function Ks(){if(localStorage.getItem(Xs))return;let e=z();if(!e)return;Ee=document.createElement("div"),Ee.style.cssText=`
    position: fixed;
    left: 72px;
    top: 50%;
    transform: translateY(-50%);
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${_.md};
    border-radius: ${O.md};
    padding: 12px 16px;
    font-family: ${T};
    font-size: 12px;
    color: ${l.textPrimary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${P.medium};
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
  `;Ee.innerHTML=`Press ${t.map(n=>`<span style="${o}">${n}</span>`).join(" ")} to switch tools`,e.appendChild(Ee),requestAnimationFrame(()=>{Ee&&(Ee.style.opacity="1")}),Un=setTimeout(gr,5e3)}function gr(){Ee&&(localStorage.setItem(Xs,"1"),Ee.style.opacity="0",setTimeout(()=>{Ee?.remove(),Ee=null},150),Un&&(clearTimeout(Un),Un=null))}ge();function qs(){Jo(!0)}function Zs(){Jo(!1)}yt();Ut();var hr=!1,yr=0,br=0,Js={onMouseDown(e){hr=!0,yr=e.clientX,br=e.clientY,Gn("grabbing")},onMouseMove(e){if(!hr)return;let t=e.clientX-yr,o=e.clientY-br;Rs(t,o),yr=e.clientX,br=e.clientY},onMouseUp(e){hr=!1,Gn("grab")}};ge();var se=null,Jt={x:0,y:0},bt=!1,Tc=!1,Qs={onMouseDown(e){let t=Es(e.clientX,e.clientY);if(t){se=t,Jt={x:e.clientX+window.scrollX-t.currentPos.x,y:e.clientY+window.scrollY-t.currentPos.y},bt=!0,Bn(se.id);return}let o=is();if(!o){Tc=!0,Vt("pointer");return}let n=as();if(!n)return;if(zi(n)){for(let i of Be().values())if(i.originalEl===n||i.originalEl.contains(n)||n.contains(i.originalEl)){se=i,Jt={x:e.clientX+window.scrollX-i.currentPos.x,y:e.clientY+window.scrollY-i.currentPos.y},bt=!0,Bn(se.id);return}}let r=ws(n,{componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber});se=r,Jt={x:e.clientX+window.scrollX-r.currentPos.x,y:e.clientY+window.scrollY-r.currentPos.y},bt=!0,Bn(se.id)},onMouseMove(e){if(!bt||!se)return;let t=e.clientX+window.scrollX-Jt.x,o=e.clientY+window.scrollY-Jt.y;Cs(se.id,t,o)},onMouseUp(e){bt&&se&&(Fi(se.id,se.currentPos),Ss(se.id)),se=null,bt=!1}};ge();function Xn(e,t=2){if(e.length<=2)return e;let o=0,n=0,r=e[0],i=e[e.length-1];for(let s=1;s<e.length-1;s++){let a=Sc(e[s],r,i);a>o&&(o=a,n=s)}if(o>t){let s=Xn(e.slice(0,n+1),t),a=Xn(e.slice(n),t);return[...s.slice(0,-1),...a]}return[r,i]}function Sc(e,t,o){let n=o.x-t.x,r=o.y-t.y,i=n*n+r*r;if(i===0){let a=e.x-t.x,c=e.y-t.y;return Math.sqrt(a*a+c*c)}return Math.abs(r*e.x-n*e.y+o.x*t.y-o.y*t.x)/Math.sqrt(i)}yt();async function vt(e,t){let o=qt(e,t);if(!o)return null;let n=le(o);if(!n)return null;try{let i=await Ke(n);if(i&&i.length>0)for(let s of i){if(!s.functionName)continue;let a=s.functionName;if(a[0]!==a[0].toUpperCase()||He(a))continue;let c="";if(s.fileName){let d=_e(s.fileName);qe(d)&&(c=d)}return{componentName:a,filePath:c,lineNumber:s.lineNumber??0}}}catch{}let r=n;for(;r;){if(be(r)){let i=ae(r.type);if(i&&i[0]===i[0].toUpperCase()&&!He(i)){let s=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:s?.fileName||"",lineNumber:s?.lineNumber||0}}}r=r.return}return null}async function ea(e){let t=le(e);if(!t)return null;try{let n=await Ke(t);if(n&&n.length>0)for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||He(i))continue;let s="";if(r.fileName){let a=_e(r.fileName);qe(a)&&(s=a)}return{componentName:i,filePath:s,lineNumber:r.lineNumber??0}}}catch{}let o=t;for(;o;){if(be(o)){let n=ae(o.type);if(n&&n[0]===n[0].toUpperCase()&&!He(n)){let r=o._debugSource||o._debugOwner?._debugSource;return{componentName:n,filePath:r?.fileName||"",lineNumber:r?.lineNumber||0}}}o=o.return}return null}var Te=null,Kn=null,ta={onMouseDown(e){let t=ue();if(Te=bs(t.brushColor,t.brushSize),Te){let o=e.clientX+window.scrollX,n=e.clientY+window.scrollY;Te.addPoint(o,n)}Kn=vt(e.clientX,e.clientY)},onMouseMove(e){if(!Te)return;let t=e.clientX+window.scrollX,o=e.clientY+window.scrollY;Te.addPoint(t,o)},async onMouseUp(e){if(!Te)return;let t=Te.getPoints(),o=ue();if(Te.group.remove(),t.length<2){Te=null,Kn=null;return}let n=await Kn,r=Xn(t,2),i=crypto.randomUUID();ps(i,r,o.brushColor,o.brushSize),dt({type:"draw",id:i,points:r,color:o.brushColor,strokeWidth:o.brushSize,targetComponent:n}),Te=null,Kn=null}};ge();V();var Z=null,tt=null,qn=null,oa={onMouseDown(e){Z&&na();let t=e.clientX+window.scrollX,o=e.clientY+window.scrollY;tt={pageX:t,pageY:o},vt(e.clientX,e.clientY).then(n=>{qn=n}),Z=document.createElement("input"),Z.type="text",Z.placeholder="Type annotation...",Z.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${l.bgPrimary};
      color: ${l.textPrimary};
      border: 1.5px solid ${l.accent};
      border-radius: ${O.sm};
      padding: 4px 8px;
      font-size: ${ue().fontSize}px;
      font-family: ${T};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${l.accentSoft};
    `,Z.setAttribute("data-sketch-ui-ghost","true"),Z.addEventListener("keydown",n=>{n.key==="Enter"&&(na(),n.preventDefault()),n.key==="Escape"&&(ra(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(Z),Z.focus()},onMouseMove(){},onMouseUp(){}};function na(){if(!Z||!tt)return;let e=Z.value.trim();if(Z.remove(),Z=null,!e)return;let t=ue(),o=crypto.randomUUID();ms(o,tt.pageX,tt.pageY,e,t.fontSize,t.textColor),dt({type:"text",id:o,position:tt,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:qn}),tt=null,qn=null}function ra(){Z&&(Z.remove(),Z=null),tt=null,qn=null}function ia(){ra()}yt();ge();var Le=null,en=null,Qt="backgroundColor",Zn={bg:"",color:""},sa={async onMouseDown(e){ke();let t=qt(e.clientX,e.clientY);if(!t)return;Le=t,Zn={bg:getComputedStyle(t).backgroundColor,color:getComputedStyle(t).color};let o=await vt(e.clientX,e.clientY);if(!o)return;en=o;let n=kc(Zn.bg);Kt(!1),Ze({initialColor:n,position:{x:e.clientX+10,y:e.clientY+10},showPropertyToggle:!0,onColorChange(r){Le&&(Le.style[Qt]=r)},onPropertyChange(r){Qt=r},onClose(){if(Kt(!0),!Le||!en)return;let r=Qt==="backgroundColor"?Zn.bg:Zn.color,i=Le.style[Qt];if(i&&i!==r){let s=crypto.randomUUID(),a=Le.getBoundingClientRect();fs(s,a.right+window.scrollX,a.top+window.scrollY,i),dt({type:"colorChange",id:s,component:en,targetElement:Le,property:Qt,fromColor:r,toColor:i})}Le=null,en=null}})},onMouseMove(){},onMouseUp(){}};function kc(e){let t=e.match(/\d+/g);return!t||t.length<3?"#000000":"#"+t.slice(0,3).map(o=>parseInt(o).toString(16).padStart(2,"0")).join("")}function aa(){ke(),Kt(!0),Le=null,en=null}V();var la="http://www.w3.org/2000/svg",me=[],Re=null,xt=null,ca=[],vr=[],da={onMouseDown(e){Jn(),me=[{x:e.clientX,y:e.clientY}];let t=z();t&&(xt=document.createElementNS(la,"svg"),xt.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483647;"),Re=document.createElementNS(la,"path"),Re.setAttribute("stroke",l.accent),Re.setAttribute("stroke-width","1.5"),Re.setAttribute("fill",l.accentSoft),xt.appendChild(Re),t.appendChild(xt))},onMouseMove(e){!Re||me.length===0||(me.push({x:e.clientX,y:e.clientY}),Mc())},async onMouseUp(e){if(me.length<3){xr();return}let t=Pc();xr();let o=bn({x:t.left,y:t.top,width:t.right-t.left,height:t.bottom-t.top}),n=new Set,r=await Promise.all(o.map(i=>ea(i)));for(let i=0;i<o.length;i++){let s=r[i],a=o[i];s&&!n.has(`${s.filePath}:${s.lineNumber}`)&&(n.add(`${s.filePath}:${s.lineNumber}`),ca.push(a),Lc(a.getBoundingClientRect()))}}};function Mc(){if(!Re||me.length<2)return;let e=`M${me[0].x},${me[0].y}`;for(let t=1;t<me.length;t++)e+=` L${me[t].x},${me[t].y}`;e+=" Z",Re.setAttribute("d",e)}function Pc(){let e=1/0,t=1/0,o=-1/0,n=-1/0;for(let r of me)e=Math.min(e,r.x),t=Math.min(t,r.y),o=Math.max(o,r.x),n=Math.max(n,r.y);return{left:e,top:t,right:o,bottom:n}}function Lc(e){let t=document.createElement("div");t.setAttribute("data-sketch-ui-ghost","true"),t.style.cssText=`
    position: fixed;
    left: ${e.left}px;
    top: ${e.top}px;
    width: ${e.width}px;
    height: ${e.height}px;
    border: 1.5px solid ${l.accent};
    pointer-events: none;
    z-index: 2147483645;
  `,document.body.appendChild(t),vr.push(t)}function xr(){xt?.remove(),xt=null,Re=null,me=[]}function Jn(){xr(),vr.forEach(e=>e.remove()),vr=[],ca=[]}Ut();function ua(){let e=window.__SKETCH_UI_WS_PORT__;if(!e){console.warn("[SketchUI] No WebSocket port found.");return}if(document.getElementById("sketch-ui-root"))return;sn(e),Dr(Rc);let t=z();t&&qi(t),os(),bi(),cs(),us(),vs(),Bs(),cr(),Ks(),je("grab",Js),je("move",Qs),je("draw",ta),je("text",oa),je("color",sa),je("lasso",da),Hi((o,n)=>{gr(),js(o),n==="pointer"&&Zs(),n==="text"&&ia(),n==="color"&&aa(),n==="lasso"&&Jn(),ht(),_o(),o==="pointer"&&qs(),dr(o),Ws(o)}),Ii(()=>{Yr(Xo()),zs(Yi())}),Vs(()=>{let o=jo();o&&fe(`Undo: ${o}`)}),Vr(()=>{if(!Xo()){fe("No moved components to toggle");return}let o=!Pn();Vi(o),Gr(o)}),zr(()=>{let o=Wi();console.log("[SketchUI] Generate \u2014 serialized annotations:",JSON.stringify(o,null,2))}),Br(()=>{if(Mn()==="pointer")return!1;let o=jo();return o?(fe(`Undo: ${o}`),!0):!1}),Fs(()=>{Wt(),gs(),Jn(),Uo(),Ns(),fe("Canvas cleared")}),console.log("[SketchUI] Overlay initialized with Phase 2A canvas tools")}function Rc(){ht(),_o(),ss(),vi(),ds(),hs(),Ts(),Us(),ur(),Uo(),sr(),Sr(),Fr()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ua):ua();})();
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
