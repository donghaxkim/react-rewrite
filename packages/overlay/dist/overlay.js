"use strict";var SketchUI=(()=>{var ha=Object.defineProperty;var Tt=(e,t)=>()=>(e&&(t=e(e=0)),t);var ya=(e,t)=>{for(var n in t)ha(e,n,{get:t[n],enumerable:!0})};function Hr(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='5 9 2 12 5 15'/><polyline points='9 5 12 2 15 5'/><polyline points='15 19 12 22 9 19'/><polyline points='19 9 22 12 19 15'/><line x1='2' y1='12' x2='22' y2='12'/><line x1='12' y1='2' x2='12' y2='22'/></svg>`)}") 12 12, move`}function po(e){if(dn&&dn.size===e)return dn.uri;let t=Math.max(e,2),n=t*2+4,o=n/2,r=`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${n}' height='${n}'><circle cx='${o}' cy='${o}' r='${t}' fill='none' stroke='${l.accent}' stroke-width='1.5'/></svg>`)}") ${o} ${o}, crosshair`;return dn={size:e,uri:r},r}function Ir(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M2 22l1-1h3l9-9'/><path d='M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7'/><path d='M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14'/><path d='m9 7 6 6'/><path d='M20 2a2.83 2.83 0 0 1 0 4L16 10'/></svg>`)}") 2 22, pointer`}function Dr(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><line x1='8' y1='2' x2='8' y2='14' stroke='${l.accent}' stroke-width='1'/><line x1='2' y1='8' x2='14' y2='8' stroke='${l.accent}' stroke-width='1'/></svg>`)}") 8 8, crosshair`}var l,_,O,P,T,_r,dn,V=Tt(()=>{"use strict";l={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},_={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},O={xs:"4px",sm:"6px",md:"10px",lg:"14px"},P={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},T="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",_r=`
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
`;dn=null});function zi(e){return Pn.push(e),()=>{Pn=Pn.filter(t=>t!==e)}}function Bi(e){return Ln.push(e),()=>{Ln=Ln.filter(t=>t!==e)}}function Ge(){Ln.forEach(e=>e())}function On(){return Uo}function Wt(e){let t=Uo;t!==e&&(Uo=e,Pn.forEach(n=>n(e,t)))}function pe(){return{...Vi}}function Yt(e,t){Vi[e]=t}function We(){return ue}function Gi(e){ue.set(e.id,e),Be.push({type:"ghostCreate",ghostId:e.id}),Ge()}function Wi(e,t){let n=ue.get(e);if(!n)return;let o={...n.currentPos};n.currentPos=t,Be.push({type:"ghostMove",ghostId:e,previousPos:o}),Ge()}function jl(e){let t=ue.get(e);t&&(t.cloneEl.remove(),t.originalEl.style.opacity=t.originalOpacity,t.originalEl.style.visibility=t.originalVisibility,ue.delete(e),Ge())}function pt(e){ze.push(e),Be.push({type:"annotationAdd",annotationId:e.id}),Ge()}function Fi(e){ze=ze.filter(t=>t.id!==e),Ge()}function $n(){return Xo}function Yi(e){Xo=e;for(let t of ue.values())e?(t.originalEl.style.opacity="0",t.originalEl.style.visibility="hidden"):(t.originalEl.style.opacity="0.3",t.originalEl.style.visibility="visible");Ge()}function ji(e){for(let t of ue.values())if(t.originalEl===e||t.originalEl.contains(e)||e.contains(t.originalEl))return!0;return!1}function Ko(){let e=Be.pop();if(!e)return null;switch(e.type){case"ghostCreate":return jl(e.ghostId),"ghost removed";case"ghostMove":{let t=ue.get(e.ghostId);return t&&(t.currentPos=e.previousPos,t.cloneEl.style.left=`${e.previousPos.x}px`,t.cloneEl.style.top=`${e.previousPos.y}px`),"move reverted"}case"annotationAdd":return Fi(e.annotationId),"annotation removed";case"colorChange":{let t=ze.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),Fi(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}}return null}function Ui(e){Be.push(e),Ge()}function ye(){return{scale:Gt,offsetX:Rn,offsetY:Nn}}function An(e,t,n){Gt=e,Rn=t,Nn=n,Bt.forEach(o=>o())}function mt(e){return Bt.push(e),()=>{Bt=Bt.filter(t=>t!==e)}}function me(e,t){return{x:(e-Rn)/Gt,y:(t-Nn)/Gt}}function qo(){for(let e of ue.values())e.cloneEl.remove(),e.originalEl.style.opacity=e.originalOpacity,e.originalEl.style.visibility=e.originalVisibility;for(let e of ze)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of Be)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}ue=new Map,ze=[],Be=[],Xo=!1,Gt=1,Rn=0,Nn=0,Bt.forEach(e=>e()),Ge()}function Zo(){return ue.size>0||ze.length>0}function Xi(){return Be.length>0}function Ki(){let e=[];for(let o of ue.values())e.push({component:o.componentRef.componentName,file:o.componentRef.filePath,line:o.componentRef.lineNumber,from:o.originalRect,to:o.currentPos});let t=[],n=[];for(let o of ze)o.type==="draw"?t.push({type:"draw",startComponent:o.targetComponent?.componentName,startFile:o.targetComponent?.filePath,startLine:o.targetComponent?.lineNumber,points:o.points,color:o.color,strokeWidth:o.strokeWidth}):o.type==="text"?t.push({type:"text",content:o.content,position:o.position,targetComponent:o.targetComponent?.componentName,targetFile:o.targetComponent?.filePath,targetLine:o.targetComponent?.lineNumber}):o.type==="colorChange"&&n.push({component:o.component.componentName,file:o.component.filePath,line:o.component.lineNumber,property:o.property,from:o.fromColor,to:o.toColor});return{moves:e,annotations:t,colorChanges:n}}var ue,ze,Be,Uo,Xo,Vi,Gt,Rn,Nn,Bt,Pn,Ln,re=Tt(()=>{"use strict";ue=new Map,ze=[],Be=[],Uo="pointer",Xo=!1,Vi={brushSize:4,brushColor:"#ef4444",fontSize:16,textColor:"#ffffff"},Gt=1,Rn=0,Nn=0,Bt=[],Pn=[],Ln=[]});function xc(){cr=document.body.style.background||document.body.style.backgroundColor||"",dr=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",W=document.createElement("div"),W.setAttribute("data-sketch-ui-canvas-wrapper","true"),W.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${n};
  `.trim().replace(/\n\s*/g," "),ve=document.createElement("div"),ve.setAttribute("data-sketch-ui-dot-bg","true"),ve.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${l.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="sketch-ui-root"||r.hasAttribute("data-sketch-ui-interaction")||r.hasAttribute("data-sketch-ui-ghost")||r.hasAttribute("data-sketch-ui-annotation")||r.hasAttribute("data-sketch-ui-dot-bg")||r.hasAttribute("data-sketch-ui-canvas-wrapper"))||(Ns.push(r),W.appendChild(r));W.style.position="relative",W.style.zIndex="1",document.body.insertBefore(ve,document.body.firstChild),document.body.insertBefore(W,ve.nextSibling),lr=mt(Rs),Rs()}function Rs(){if(!W||!ve)return;let{scale:e,offsetX:t,offsetY:n}=ye();W.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=bc*e,r=t%o,i=n%o;ve.style.backgroundImage=`radial-gradient(circle, ${vc} ${Ls}px, transparent ${Ls}px)`,ve.style.backgroundSize=`${o}px ${o}px`,ve.style.backgroundPosition=`${r}px ${i}px`}function Cc(e,t,n){let{scale:o,offsetX:r,offsetY:i}=ye(),s=Math.min(hc,Math.max(gc,o+n));if(s===o)return;let a=(e-r)/o,c=(t-i)/o,d=e-a*s,u=t-c*s;An(s,d,u)}function Os(e){e.preventDefault();let t=-e.deltaY*yc,{scale:n}=ye(),o=t*n;Cc(e.clientX,e.clientY,o)}function $s(e,t){let{scale:n,offsetX:o,offsetY:r}=ye();An(n,o+e,r+t)}function As(){An(1,0,0)}function _s(){return W!==null}function Hs(){W?ur():xc()}function ur(){if(lr?.(),lr=null,W){for(;W.firstChild;)document.body.insertBefore(W.firstChild,W);W.remove(),W=null}ve?.remove(),ve=null,Ns=[],document.body.style.background=cr,document.documentElement.style.background=dr,cr="",dr=""}var gc,hc,yc,bc,Ls,vc,W,ve,lr,Ns,cr,dr,qt=Tt(()=>{"use strict";re();V();gc=.1,hc=5,yc=.002,bc=24,Ls=1,vc="rgba(0,0,0,0.15)",W=null,ve=null,lr=null,Ns=[],cr="",dr=""});function Is(e,t){if(!nt)return;let n=performance.now(),o=Math.abs(e-nt.clientX),r=Math.abs(t-nt.clientY),i=o<=2&&r<=2,s=n-nt.timestamp<16;if(i||s)return nt.element}function Ds(e,t,n){nt={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function vt(){nt=null}var nt,pr=Tt(()=>{"use strict";nt=null});var Vs={};ya(Vs,{activateInteraction:()=>gr,destroyInteraction:()=>hr,getPageElementAtPoint:()=>Qt,initInteraction:()=>fr,refreshDrawCursor:()=>Ec,registerToolHandler:()=>Xe,setInteractionCursor:()=>Kn,setInteractionPointerEvents:()=>Jt});function Xe(e,t){mr.set(e,t)}function fr(){I=document.createElement("div"),I.setAttribute("data-sketch-ui-interaction","true"),I.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(I),document.addEventListener("scroll",vt,!0),I.addEventListener("mousedown",e=>{Zt?.onMouseDown?.(e)}),I.addEventListener("mousemove",e=>{Zt?.onMouseMove?.(e)}),I.addEventListener("mouseup",e=>{Zt?.onMouseUp?.(e)}),document.addEventListener("wheel",Fs,{passive:!1})}function Fs(e){!I||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#sketch-ui-root")||Os(e)}function gr(e){Zt=mr.get(e)||null,I&&(I.style.pointerEvents=e==="pointer"?"none":"auto"),wc(e)}function wc(e){if(I)switch(e){case"pointer":I.style.cursor="default";break;case"grab":I.style.cursor="grab";break;case"move":I.style.cursor=Hr();break;case"draw":I.style.cursor=po(pe().brushSize);break;case"color":I.style.cursor=Ir();break;case"text":I.style.cursor="text";break;case"lasso":I.style.cursor=Dr();break;default:I.style.cursor="default"}}function Ec(){On()==="draw"&&I&&(I.style.cursor=po(pe().brushSize))}function Kn(e){I&&(I.style.cursor=e)}function Jt(e){I&&(I.style.pointerEvents=e?"auto":"none")}function Qt(e,t){let n=Is(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#sketch-ui-root")&&!i.hasAttribute("data-sketch-ui-interaction")&&!i.hasAttribute("data-sketch-ui-ghost")&&!(i===document.body||i===document.documentElement)){r=i;break}return Ds(e,t,r),r}function hr(){document.removeEventListener("scroll",vt,!0),document.removeEventListener("wheel",Fs),I?.remove(),I=null,Zt=null,mr.clear()}var I,Zt,mr,xt=Tt(()=>{"use strict";re();V();pr();qt();I=null,Zt=null,mr=new Map});function ba(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),s=parseInt(r[2],10),a=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(s<<8)+a).toString(16).slice(1)}`}return e}function va(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(y=>{try{return Array.from(y.cssRules)}catch{return[]}}).filter(y=>y instanceof CSSStyleRule&&y.selectorText===":root").flatMap(y=>Array.from(y.style)).filter(y=>y.startsWith("--")),n={},o={},r={},i={},s={},a={},c={},d={},u={},p={},f={},m={},g={},b={},x={},$={},A={},N={},v=(y,w,L,H)=>{y[L]=H,w[H]=L};for(let y of t){let w=e.getPropertyValue(y).trim();if(!w)continue;let L=y.match(/^--spacing-(.+)$/);if(L){v(n,p,L[1],w);continue}let H=y.match(/^--color-(.+)$/);if(H){let rn=H[1];o[rn]=w,f[ba(w)]=rn;continue}let k=y.match(/^--font-size-(.+)$/);if(k){v(r,m,k[1],w);continue}let D=y.match(/^--font-weight-(.+)$/);if(D){v(i,g,D[1],w);continue}let C=y.match(/^--radius-(.+)$/);if(C){v(s,b,C[1],w);continue}let M=y.match(/^--border-(.+)$/);if(M){v(a,x,M[1],w);continue}let B=y.match(/^--opacity-(.+)$/);if(B){v(c,$,B[1],w);continue}let ne=y.match(/^--tracking-(.+)$/);if(ne){v(d,A,ne[1],w);continue}let $e=y.match(/^--leading-(.+)$/);if($e){v(u,N,$e[1],w);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:s,borderWidth:a,opacity:c,letterSpacing:d,lineHeight:u,spacingReverse:p,colorsReverse:f,fontSizeReverse:m,fontWeightReverse:g,borderRadiusReverse:b,borderWidthReverse:x,opacityReverse:$,letterSpacingReverse:A,lineHeightReverse:N}}var xa=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function Ca(e,t){let n={};for(let o of xa){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function an(e,t){return t.get(e)??null}function ln(e,t,n){let r=(n??kt())[e],i=[];for(let[a,c]of r.entries()){let d=parseFloat(c);isNaN(d)||i.push({numericValue:d,token:a,cssValue:c})}let s=parseFloat(t);return isNaN(s)||i.some(c=>c.cssValue===t)||i.push({numericValue:s,token:null,cssValue:t}),i.sort((a,c)=>a.numericValue-c.numericValue),i}var Mr=null,St=null;function Pr(e){Mr=e,St=null}function kt(){if(St!==null)return St;let e=va();return St=Ca(e,Mr??{}),St}var Q=null,Mt=[],rt=0,wa=5,io=null,so=null,ao=null,lo=null,co=null,uo=null;function Lr(e){uo=e}function cn(e){Q&&Q.readyState===WebSocket.OPEN||(co=e,Q=new WebSocket(`ws://localhost:${e}`),Q.onopen=()=>{let t=rt>0;rt=0,t&&lo&&lo()},Q.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&Pr(n.tokens),n.type==="updatePropertyComplete"&&uo&&uo(n.success,n.errorCode,n.error),Mt.forEach(o=>o(n))}catch{}},Q.onclose=t=>{if(Q=null,t.code===4001){ao&&ao();return}if(rt<wa){let n=500*Math.pow(2,rt);rt++,io=setTimeout(()=>cn(e),n)}else so&&so()},Q.onerror=()=>{})}function _e(e){Q&&Q.readyState===WebSocket.OPEN&&Q.send(JSON.stringify(e))}function Pt(e){return Mt.push(e),()=>{Mt=Mt.filter(t=>t!==e)}}function Rr(){io&&clearTimeout(io),Q&&(Q.close(),Q=null),Mt=[]}function Nr(e){so=e}function Or(e){ao=e}function $r(e){lo=e}function Ar(){co&&(rt=0,cn(co))}V();var st=null,G=null,Lt=0,un=null,pn=null,qe=null,mo=null,it=null,Rt=null,go=null,zr=null,Br='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',Ea='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',fo='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',Ta='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',Fr='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',Sa=`
  :host {
    all: initial;
  }
  ${_r}
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
`;function Gr(e){let t=document.createElement("div");t.id="sketch-ui-root",document.body.appendChild(t),st=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=Sa;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn eye-btn" title="Toggle originals (.)">
      ${Br}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${fo}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Generate</button>
    <button class="icon-btn close-btn" title="Close SketchUI">
      ${Ta}
    </button>
  `,st.appendChild(n),st.appendChild(o),G=o.querySelector(".undo-btn");let r=o.querySelector(".close-btn");un=o.querySelector(".generate-btn"),pn=o.querySelector(".eye-btn"),it=o.querySelector(".component-detail"),qe=document.createElement("div"),qe.className="toast",st.appendChild(qe),G.addEventListener("click",()=>{_e({type:"undo"}),G&&(G.innerHTML='<div class="spinner"></div>',G.disabled=!0)}),r.addEventListener("click",e),pn.addEventListener("click",()=>{Rt&&Rt()}),un.addEventListener("click",()=>{go&&go()}),document.addEventListener("keydown",i=>{i.key==="."&&(i.ctrlKey||i.metaKey)&&!Vr()&&(Rt&&Rt(),i.preventDefault()),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!Vr()&&zr?.()&&i.preventDefault()}),Nr(()=>{he("Disconnected. Click to reconnect."),Ar()}),Or(()=>{he("Disconnected: another tab took over")}),$r(()=>{Lt=0,G&&(G.disabled=!0)}),Pt(i=>{switch(i.type){case"reorderComplete":i.success?(Lt++,G&&(G.innerHTML=Fr,setTimeout(()=>{G&&(G.innerHTML=fo,G.disabled=!1)},200))):i.error&&he(i.error);break;case"undoComplete":i.success?(Lt=Math.max(0,Lt-1),G&&(G.innerHTML=Fr,setTimeout(()=>{G&&(G.innerHTML=fo,G.disabled=Lt===0)},200))):i.error&&he(i.error);break;case"devServerDisconnected":he("Dev server disconnected");break;case"devServerReconnected":he("Dev server reconnected");break}})}function Wr(){let e=document.getElementById("sketch-ui-root");e&&e.remove(),st=null,G=null}function z(){return st}function Yr(e){Rt=e}function jr(e){go=e}function Ur(e){zr=e}function Xr(e){pn&&(pn.innerHTML=e?Ea:Br)}function Kr(e){un&&(un.disabled=!e)}function mn(e){if(!it)return;if(!e){it.className="component-detail empty",it.textContent="No selection";return}it.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";it.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function he(e){qe&&(qe.textContent=e,qe.classList.add("visible"),mo&&clearTimeout(mo),mo=setTimeout(()=>{qe?.classList.remove("visible")},2e3))}function Vr(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var ho="0.5.32",At=`bippy-${ho}`,qr=Object.defineProperty,ka=Object.prototype.hasOwnProperty,Nt=()=>{},Jr=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},gn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),Qr=!1,Zr,Ot=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>Qr?!0:(e&&typeof e.inject=="function"&&(Zr=e.inject.toString()),!!Zr?.includes("(injected)")),fn=new Set,He=new Set,yo=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:At,checkDCE:Jr,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),He.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,fn.forEach(s=>s())),i},on:Nt,onCommitFiberRoot:Nt,onCommitFiberUnmount:Nt,onPostCommitFiberRoot:Nt,renderers:t,supportsFiber:!0,supportsFlight:!0};try{qr(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(s){if(s&&typeof s=="object"){let a=o.renderers;o=s,a.size>0&&(a.forEach((c,d)=>{He.add(c),s.renderers.set(d,c)}),$t(e))}}});let r=window.hasOwnProperty,i=!1;qr(window,"hasOwnProperty",{configurable:!0,value:function(...s){try{if(!i&&s[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,s)},writable:!0})}catch{$t(e)}return o},$t=e=>{e&&fn.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=Jr,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=At,t._instrumentationIsActive=!1;let n=gn(t);if(n||(t.on=Nt),t.renderers.size){t._instrumentationIsActive=!0,fn.forEach(i=>i());return}let o=t.inject,r=Ot(t);r&&!n&&(Qr=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let s=o(i);return He.add(i),r&&t.renderers.set(s,i),t._instrumentationIsActive=!0,fn.forEach(a=>a()),s}}(t.renderers.size||t._instrumentationIsActive||Ot())&&e?.()}catch{}},bo=()=>ka.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),at=e=>bo()?($t(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):yo(e),vo=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),hn=()=>{try{vo()&&at()}catch{}};hn();var xo=0,Co=1;var wo=5;var Eo=11,To=13;var So=15,ko=16;var Mo=19;var Po=26,Lo=27,Ro=28,No=30;var xe=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};function Oo(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let s=await Ao(i,t,n);if(s)return s;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=$o(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var $o=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=$o(o,t,n);if(r)return r;o=n?null:o.sibling}return null},Ao=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await Ao(o,t,n);if(r)return r;o=n?null:o.sibling}return null};var _o=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?_o(t.type||t.render):null},le=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=_o(t);return o&&(o.displayName||o.name)||null};var Ho=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||gn(e)||Ot(e)};var Io=e=>{let t=at(e.onActive);t._instrumentationSource=e.name??At;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(s,a,c)=>{n!==i&&(n?.(s,a,c),e.onCommitFiberRoot?.(s,a,c))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(s,a)=>{t.onCommitFiberUnmount===i&&(o?.(s,a),e.onCommitFiberUnmount?.(s,a))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(s,a)=>{t.onPostCommitFiberRoot===i&&(r?.(s,a),e.onPostCommitFiberRoot?.(s,a))};t.onPostCommitFiberRoot=i}return t},ce=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},Ma=Error();var ei=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Pa=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],La=["<anonymous>","eval",""],ci=/\.(jsx|tsx|ts|js)$/,Ra=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Na=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,di="(at Server)",Oa=/(^|@)\S+:\d+/,ui=/^\s*at .*(\S+:\d+|\(native\))/m,$a=/^(eval@)?(\[native code\])?$/;var pi=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=ti(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(Oa)){let i=ni(r,void 0)[0];i&&o.push(i)}return Vo(o,t)}return e.match(ui)?ti(e,t):ni(e,t)},mi=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},Vo=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e;var ti=(e,t)=>Vo(e.split(`
`).filter(n=>!!n.match(ui)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let s=mi(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(s[0])?void 0:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:o}});var ni=(e,t)=>Vo(e.split(`
`).filter(n=>!n.match($a)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),s=i&&i[1]?i[1]:void 0,a=mi(o.replace(r,""));return{functionName:s,fileName:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}}});var Aa=44,oi="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_a=new Uint8Array(64),fi=new Uint8Array(128);for(let e=0;e<oi.length;e++){let t=oi.charCodeAt(e);_a[e]=t,fi[t]=e}function _t(e,t){let n=0,o=0,r=0;do r=fi[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function ri(e,t){return e.pos>=t?!1:e.peek()!==Aa}var Ha=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};function gi(e){let{length:t}=e,n=new Ha(e),o=[],r=0,i=0,s=0,a=0,c=0;do{let d=n.indexOf(";"),u=[],p=!0,f=0;for(r=0;n.pos<d;){let m;r=_t(n,r),r<f&&(p=!1),f=r,ri(n,d)?(i=_t(n,i),s=_t(n,s),a=_t(n,a),ri(n,d)?(c=_t(n,c),m=[r,i,s,a,c]):m=[r,i,s,a]):m=[r],u.push(m),n.pos++}p||Ia(u),o.push(u),n.pos=d+1}while(n.pos<=t);return o}function Ia(e){e.sort(Da)}function Da(e,t){return e[0]-t[0]}var hi=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Fa=/^data:application\/json[^,]+base64,/,Va=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,yi=typeof WeakRef<"u",Ht=new Map,yn=new Map,za=e=>yi&&e instanceof WeakRef,ii=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let u of r)if(u[0]<=o)i=u;else break;if(!i||i.length<4)return null;let[,s,a,c]=i;if(s===void 0||a===void 0||c===void 0)return null;let d=t[s];return d?{columnNumber:c,fileName:d,lineNumber:a+1}:null},Ba=(e,t,n)=>{if(e.sections){let o=null;for(let s of e.sections)if(t>s.offset.line||t===s.offset.line&&n>=s.offset.column)o=s;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return ii(o.map.mappings,o.map.sources,r,i)}return ii(e.mappings,e.sources,t-1,n)},Ga=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let s=n[i].match(Va);s&&(o=s[1]||s[2])}if(!o)return null;let r=hi.test(o);if(!(Fa.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},Wa=e=>({file:e.file,mappings:gi(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),Ya=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:gi(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},si=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(hi);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},ja=async(e,t=fetch)=>{if(!si(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=Ga(e,n);if(!o||!si(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?Ya(i):Wa(i)}catch{return null}},Ua=async(e,t=!0,n)=>{if(t&&Ht.has(e)){let i=Ht.get(e);if(i==null)return null;if(za(i)){let s=i.deref();if(s)return s;Ht.delete(e)}else return i}if(t&&yn.has(e))return yn.get(e);let o=ja(e,n);t&&yn.set(e,o);let r=await o;return t&&yn.delete(e),t&&(r===null?Ht.set(e,null):Ht.set(e,yi?new WeakRef(r):r)),r},Xa=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await Ua(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=Ba(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),Ka=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",qa=()=>{let e=at();for(let t of[...Array.from(He),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},ai=e=>{for(let t of He){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},Me=e=>`
    in ${e}`,Za=(e,t)=>{let n=Me(e);return t&&(n+=` (at ${t})`),n},Do=!1,Fo=(e,t)=>{if(!e||Do)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,Do=!0;let o=qa();ai(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let a={DetermineComponentFrameRoot(){let u;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(f){u=f}Reflect.construct(e,[],p)}else{try{p.call()}catch(f){u=f}e.call(p.prototype)}}else{try{throw Error()}catch(f){u=f}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&u instanceof Error&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,d]=a.DetermineComponentFrameRoot();if(c&&d){let u=c.split(`
`),p=d.split(`
`),f=0,m=0;for(;f<u.length&&!u[f].includes("DetermineComponentFrameRoot");)f++;for(;m<p.length&&!p[m].includes("DetermineComponentFrameRoot");)m++;if(f===u.length||m===p.length)for(f=u.length-1,m=p.length-1;f>=1&&m>=0&&u[f]!==p[m];)m--;for(;f>=1&&m>=0;f--,m--)if(u[f]!==p[m]){if(f!==1||m!==1)do if(f--,m--,m<0||u[f]!==p[m]){let g=`
${u[f].replace(" at new "," at ")}`,b=le(e);return b&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",b)),g}while(f>=1&&m>=0);break}}}finally{Do=!1,Error.prepareStackTrace=n,ai(o),console.error=r,console.warn=i}let s=e?le(e):"";return s?Me(s):""},Ja=(e,t)=>{let n=e.tag,o="";switch(n){case Ro:o=Me("Activity");break;case Co:o=Fo(e.type,!0);break;case Eo:o=Fo(e.type.render,!1);break;case xo:case So:o=Fo(e.type,!1);break;case wo:case Po:case Lo:o=Me(e.type);break;case ko:o=Me("Lazy");break;case To:o=e.child!==t&&t!==null?Me("Suspense Fallback"):Me("Suspense");break;case Mo:o=Me("SuspenseList");break;case No:o=Me("ViewTransition");break;default:return""}return o},Qa=e=>{try{let t="",n=e,o=null;do{t+=Ja(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let s=r[i];typeof s.name=="string"&&(t+=Za(s.name,s.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},el=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},tl=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),nl=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,ol=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!tl(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(s=>nl(s,o))||(i.push(o),t.set(r,i))}return t},rl=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(di,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},il=e=>{let t=[];return Oo(e,n=>{if(!Ka(n))return;let o=typeof n.type=="string"?n.type:le(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:pi(el(n._debugStack?.stack))})},!0),t},Ze=async(e,t=!0,n)=>{let o=il(e),r=pi(Qa(e)),i=ol(o),s=new Map;return Xa(r.map(a=>a.source?.includes(di)??!1?rl(a,i,s):a).filter((a,c,d)=>{if(c===0)return!0;let u=d[c-1];return a.functionName!==u.functionName}),t,n)};var li=e=>e.split("/").filter(Boolean).length,sl=e=>e.split("/").filter(Boolean)[0]??null,al=e=>{let t=e.indexOf("/",1);if(t===-1||li(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!ci.test(n)||li(n)<2)return e;let o=sl(n);return!o||o.startsWith("@")||o.length>4?e:n},Ie=e=>{if(!e||La.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=al(t)),t.startsWith("about://React/")){let i=t.slice(14),s=i.indexOf("/"),a=i.indexOf(":");t=s!==-1&&(a===-1||s<a)?i.slice(s+1):i}let o=!0;for(;o;){o=!1;for(let i of Pa)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if(ei.test(t)){let i=t.match(ei);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Na.test(i)&&(t=t.slice(0,r))}return t},Je=e=>{let t=Ie(e);return!(!t||!ci.test(t)||Ra.test(t))};var ll=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);function De(e){return!!(ll.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function cl(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}var dl=50,bn=.9,ul=2147483600,pl=1e3,It=new WeakMap;function zo(){It=new WeakMap}function ml(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function fl(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=ul}function gl(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<bn||o.height/window.innerHeight<bn)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>pl}function Dt(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&cl(e)||e.closest("#sketch-ui-root")||e instanceof HTMLElement&&e.hasAttribute("data-sketch-ui-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-sketch-ui-ghost"))return!1;let n=performance.now(),o=It.get(e);if(o&&n-o.timestamp<dl)return o.isValid;let r=window.getComputedStyle(e);return ml(e,r)?e.clientWidth/window.innerWidth>=bn&&e.clientHeight/window.innerHeight>=bn&&(fl(r)||gl(e,r))?(It.set(e,{isValid:!1,timestamp:n}),!1):(It.set(e,{isValid:!0,timestamp:n}),!0):(It.set(e,{isValid:!1,timestamp:n}),!1)}var hl=.75,bi=32,vn=3,xn=20,vi=100,de=1;function lt(e,t,n){return Math.min(n,Math.max(t,e))}function yl(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,s=r+e.height,a=o+e.width/2,c=r+e.height/2,d=lt(Math.ceil(e.width/bi),vn,xn),u=lt(Math.ceil(e.height/bi),vn,xn);if(d*u>vi){let g=Math.sqrt(vi/(d*u));d=lt(Math.floor(d*g),vn,xn),u=lt(Math.floor(u*g),vn,xn)}let p=new Set,f=[],m=(g,b)=>{let x=lt(Math.round(g),0,t-1),$=lt(Math.round(b),0,n-1),A=`${x}:${$}`;p.has(A)||(p.add(A),f.push({x,y:$}))};m(o+de,r+de),m(i-de,r+de),m(o+de,s-de),m(i-de,s-de),m(a,r+de),m(a,s-de),m(o+de,c),m(i-de,c),m(a,c);for(let g=0;g<d;g++){let b=o+(g+.5)/d*e.width;for(let x=0;x<u;x++)m(b,r+(x+.5)/u*e.height)}return f}function Cn(e,t=Dt,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=yl(e);for(let c of i)for(let d of document.elementsFromPoint(c.x,c.y))r.add(d);let s=[];for(let c of r){if(!t(c))continue;let d=c.getBoundingClientRect();if(d.width<=0||d.height<=0)continue;let u={left:d.left,top:d.top,right:d.left+d.width,bottom:d.top+d.height};if(n){let p=Math.max(o.left,u.left),f=Math.max(o.top,u.top),m=Math.min(o.right,u.right),g=Math.min(o.bottom,u.bottom),b=Math.max(0,m-p)*Math.max(0,g-f),x=d.width*d.height;x>0&&b/x>=hl&&s.push(c)}else o.left<u.right&&o.right>u.left&&o.top<u.bottom&&o.bottom>u.top&&s.push(c)}let a=s.filter(c=>!s.some(d=>d!==c&&d.contains(c)));return a.sort((c,d)=>{let u=c.compareDocumentPosition(d);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0}),a}V();function ct(e,t,n){return e+(t-e)*n}V();var bl=.35,vl=.3,wn=.5,xl=2,J=null,Fe=null,Bo=0,Go=0,Ft=1,dt=null,j=null,U=null,xi=l.accent,Cl="rgba(162,89,255,0.08)",wl="rgba(162,89,255,0.15)";function Ei(){let e=z();e&&(J=document.createElement("canvas"),J.setAttribute("data-sketch-ui-ghost","true"),J.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(J),Wo(),window.addEventListener("resize",Wo))}function En(e,t=4){if(!e){j&&(j.targetOpacity=0,Vt());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!j||!j.initialized?j=Si(n,t):(j.target=n,j.borderRadius=t,j.targetOpacity=1),Vt()}function zt(e,t=4){if(!e){U&&(U.targetOpacity=0,Vt());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!U||!U.initialized?U=Si(n,t):(U.target=n,U.borderRadius=t,U.targetOpacity=1),Vt()}function Ti(){dt!==null&&cancelAnimationFrame(dt),window.removeEventListener("resize",Wo),J?.remove(),J=null,Fe=null,j=null,U=null}function Si(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function Wo(){J&&(Ft=Math.max(window.devicePixelRatio||1,xl),Bo=window.innerWidth,Go=window.innerHeight,J.width=Bo*Ft,J.height=Go*Ft,J.style.width=`${Bo}px`,J.style.height=`${Go}px`,Fe=J.getContext("2d"),Vt())}function Vt(){dt===null&&(dt=requestAnimationFrame(ki))}function ki(){if(dt=null,!Fe||!J)return;let e=!1;j?.initialized&&(Ci(j,bl)&&(e=!0),j.opacity<.01&&j.targetOpacity===0&&(j=null)),U?.initialized&&(Ci(U,vl)&&(e=!0),U.opacity<.01&&U.targetOpacity===0&&(U=null)),Fe.setTransform(1,0,0,1,0,0),Fe.clearRect(0,0,J.width,J.height),Fe.setTransform(Ft,0,0,Ft,0,0),j&&wi(Fe,j,xi,Cl),U&&wi(Fe,U,xi,wl),e&&(dt=requestAnimationFrame(ki))}function Ci(e,t){let n=e.current,o=e.target,r=ct(n.x,o.x,t),i=ct(n.y,o.y,t),s=ct(n.w,o.w,t),a=ct(n.h,o.h,t),c=ct(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<wn&&Math.abs(i-o.y)<wn&&Math.abs(s-o.w)<wn&&Math.abs(a-o.h)<wn&&Math.abs(c-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=s,n.h=a,e.opacity=c,!0)}function wi(e,t,n,o){let{x:r,y:i,w:s,h:a}=t.current;if(s<=0||a<=0)return;let c=Math.min(t.borderRadius,s/2,a/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,s,a,c):e.rect(r,i,s,a),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}var El=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],Tl=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],Sl=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],kl=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],Ml=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],Pl=[{key:"borderWidth",label:"Width",group:"border",controlType:"number-scrub",cssProperty:"border-width",tailwindPrefix:"border",tailwindScale:"borderWidth",defaultValue:"0",min:0,classPattern:"^border-(\\d+|\\[.+\\])$"},{key:"borderColor",label:"Color",group:"border",controlType:"color-swatch",cssProperty:"border-color",tailwindPrefix:"border",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^border-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"},{key:"borderStyle",label:"Style",group:"border",controlType:"segmented",cssProperty:"border-style",tailwindPrefix:"border",tailwindScale:"borderStyle",defaultValue:"none",classPattern:"^border-(solid|dashed|dotted|double|none)$",enumValues:[{value:"solid",tailwindValue:"solid",label:"Solid"},{value:"dashed",tailwindValue:"dashed",label:"Dashed"},{value:"dotted",tailwindValue:"dotted",label:"Dotted"},{value:"none",tailwindValue:"none",label:"None"}]},{key:"borderRadius",label:"Radius",group:"border",controlType:"number-scrub",cssProperty:"border-radius",tailwindPrefix:"rounded",tailwindScale:"borderRadius",defaultValue:"0",min:0},{key:"borderTopLeftRadius",label:"TL",group:"border",controlType:"number-scrub",cssProperty:"border-top-left-radius",tailwindPrefix:"rounded-tl",tailwindScale:"borderRadius",relatedPrefixes:["rounded","rounded-t","rounded-l"],defaultValue:"0",min:0},{key:"borderTopRightRadius",label:"TR",group:"border",controlType:"number-scrub",cssProperty:"border-top-right-radius",tailwindPrefix:"rounded-tr",tailwindScale:"borderRadius",relatedPrefixes:["rounded","rounded-t","rounded-r"],defaultValue:"0",min:0},{key:"borderBottomRightRadius",label:"BR",group:"border",controlType:"number-scrub",cssProperty:"border-bottom-right-radius",tailwindPrefix:"rounded-br",tailwindScale:"borderRadius",relatedPrefixes:["rounded","rounded-b","rounded-r"],defaultValue:"0",min:0},{key:"borderBottomLeftRadius",label:"BL",group:"border",controlType:"number-scrub",cssProperty:"border-bottom-left-radius",tailwindPrefix:"rounded-bl",tailwindScale:"borderRadius",relatedPrefixes:["rounded","rounded-b","rounded-l"],defaultValue:"0",min:0}],Ll=[{key:"opacity",label:"Opacity",group:"effects",controlType:"slider",cssProperty:"opacity",tailwindPrefix:"opacity",tailwindScale:"opacity",defaultValue:"1",min:0,max:100}],ut=[...El,...Tl,...Sl,...kl,...Ml,...Pl,...Ll];V();var Rl=new Set(["auto","none","normal","inherit","initial"]);function Mi(e,t,n,o){let r=e[0],i=r.tailwindScale,s=document.createElement("div");s.style.cssText="display:flex; align-items:center; gap:4px;";let a=document.createElement("input");a.type="text",a.className="prop-input",a.style.cssText="width:60px; cursor:ew-resize;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${T};`,s.appendChild(a),s.appendChild(c);let d=new Map(t),u=!1,p=0,f=0;function m(){return d.get(r.key)??r.defaultValue}function g(v){let y=parseFloat(v);a.value=isNaN(y)?v:String(y);try{let L=ln(i,v).find(H=>H.cssValue===v);L?.token?c.textContent=`${r.tailwindPrefix}-${L.token}`:c.textContent=""}catch{c.textContent=""}}function b(v){let y=m();try{let w=ln(i,y);if(w.length===0)return{cssValue:`${v}px`,token:null};let L=w[0],H=Math.abs(w[0].numericValue-v);for(let k of w){let D=Math.abs(k.numericValue-v);D<H&&(H=D,L=k)}return{cssValue:L.cssValue,token:L.token}}catch{return{cssValue:`${v}px`,token:null}}}function x(){let v=m();try{let y=ln(i,v);if(y.length<2)return 1;let w=parseFloat(v),L=y.findIndex(H=>H.numericValue>=w);return L>0&&L<y.length&&Math.abs(y[L].numericValue-y[L-1].numericValue)||1}catch{return 1}}function $(v){let y=parseFloat(v);if(isNaN(y))return 0;if(v.includes("rem")){let w=parseFloat(getComputedStyle(document.documentElement).fontSize)||16;return y*w}return y}let A=v=>{if(!u)return;let y=(v.clientX-p)*.5,w=r.min!==void 0?r.min:-1/0,L=Math.max(w,f+y),{cssValue:H}=b(L);d.set(r.key,H),g(H),n(r.key,H)},N=()=>{u&&(u=!1,document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",N),a.style.cursor="ew-resize",o())};return a.addEventListener("mousedown",v=>{document.activeElement!==a&&(v.preventDefault(),u=!0,p=v.clientX,f=$(m()),a.style.cursor="ew-resize",document.addEventListener("mousemove",A),document.addEventListener("mouseup",N))}),a.addEventListener("focus",()=>{a.style.cursor="text"}),a.addEventListener("blur",()=>{a.style.cursor="ew-resize";let v=a.value.trim(),y=parseFloat(v);if(isNaN(y))Rl.has(v)?(d.set(r.key,v),g(v),n(r.key,v),o()):g(m());else{let L=v.match(/(px|rem|em|%|vw|vh|ch)$/)?v:`${y}px`;d.set(r.key,L),g(L),n(r.key,L),o()}}),a.addEventListener("keydown",v=>{if(v.key==="Enter")a.blur();else if(v.key==="ArrowUp"||v.key==="ArrowDown"){v.preventDefault();let y=x(),w=parseFloat(m())||0,L=r.min!==void 0?r.min:-1/0,H=v.key==="ArrowUp"?w+y:Math.max(L,w-y),{cssValue:k}=b(H);d.set(r.key,k),g(k),n(r.key,k),o()}else v.key==="Escape"&&(g(m()),a.blur())}),g(m()),{element:s,setValue(v,y){v===r.key&&(d.set(v,y),g(y))},destroy(){document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",N)}}}V();function Pi(e,t,n,o){let r=e[0],i=r.enumValues??[],s=document.createElement("div");s.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),p.textContent=u.icon??u.label,p.title=u.label,p.addEventListener("click",()=>{d(u.value),n(r.key,u.value),o()}),c.push({btn:p,value:u.value,opt:u}),s.appendChild(p)}return d(a),{element:s,setValue(u,p){u===r.key&&d(p)},destroy(){}}}V();V();function Tn(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),s=r-i,a=0;s!==0&&(r===t?a=((n-o)/s+(n<o?6:0))*60:r===n?a=((o-t)/s+2)*60:a=((t-n)/s+4)*60);let c=r===0?0:s/r*100,d=r*100;return{h:a,s:c,v:d}}function Sn(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,s=o*(1-n),a=o*(1-i*n),c=o*(1-(1-i)*n),d,u,p;switch(r%6){case 0:d=o,u=c,p=s;break;case 1:d=a,u=o,p=s;break;case 2:d=s,u=o,p=c;break;case 3:d=s,u=a,p=o;break;case 4:d=c,u=s,p=o;break;case 5:d=o,u=s,p=a;break;default:d=0,u=0,p=0}let f=m=>Math.round(m*255).toString(16).padStart(2,"0");return`#${f(d)}${f(u)}${f(p)}`}var Ve=null;function Qe(e){Pe();let t=z();if(!t)return;let n=document.createElement("div");n.style.cssText=`
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
  `,requestAnimationFrame(()=>{let C=n.getBoundingClientRect();C.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-C.width-8}px`),C.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-C.height-8}px`),n.style.opacity="1"});let o=Tn(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let C=Nl(["Fill","Text"],0,M=>{r=M===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(C)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let s=i.getContext("2d"),a=document.createElement("div");a.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${_.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(a),n.appendChild(c);function d(){let C=o.h,M=s.createLinearGradient(0,0,176,0);M.addColorStop(0,`hsl(${C}, 0%, 100%)`),M.addColorStop(1,`hsl(${C}, 100%, 50%)`),s.fillStyle=M,s.fillRect(0,0,176,120);let B=s.createLinearGradient(0,0,0,120);B.addColorStop(0,"rgba(0,0,0,0)"),B.addColorStop(1,"rgba(0,0,0,1)"),s.fillStyle=B,s.fillRect(0,0,176,120);let ne=o.s/100*176,$e=(1-o.v/100)*120;a.style.left=`${ne}px`,a.style.top=`${$e}px`}let u=!1;i.addEventListener("mousedown",C=>{u=!0,p(C)});function p(C){let M=i.getBoundingClientRect(),B=Math.max(0,Math.min(176,C.clientX-M.left)),ne=Math.max(0,Math.min(120,C.clientY-M.top));o.s=B/176*100,o.v=(1-ne/120)*100,d(),w()}let f=document.createElement("canvas");f.width=176,f.height=14,f.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let m=f.getContext("2d"),g=document.createElement("div");g.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${_.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let b=document.createElement("div");b.style.cssText="position:relative;width:176px;height:14px;",b.appendChild(f),b.appendChild(g),n.appendChild(b);function x(){let C=m.createLinearGradient(0,0,176,0);for(let M=0;M<=6;M++)C.addColorStop(M/6,`hsl(${M*60}, 100%, 50%)`);m.fillStyle=C,m.fillRect(0,0,176,14),g.style.left=`${o.h/360*176}px`}let $=!1;f.addEventListener("mousedown",C=>{$=!0,A(C)});function A(C){let M=f.getBoundingClientRect(),B=Math.max(0,Math.min(176,C.clientX-M.left));o.h=B/176*360,x(),d(),w()}let N=document.createElement("input");N.type="text",N.value=Sn(o),N.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: ${O.sm};
    color: ${l.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,N.addEventListener("keydown",C=>{C.key==="Enter"&&N.blur(),C.stopPropagation()}),N.addEventListener("blur",()=>{let C=N.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(C)){let M=C.startsWith("#")?C:`#${C}`;o=Tn(M),d(),x(),w()}else N.value=Sn(o)}),n.appendChild(N);let v=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],y=document.createElement("div");y.style.cssText="display:flex;gap:4px;justify-content:center;";for(let C of v){let M=document.createElement("button");M.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${C};
      border: 1px solid ${l.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${P.fast};
    `,M.addEventListener("mouseenter",()=>{M.style.boxShadow=_.sm}),M.addEventListener("mouseleave",()=>{M.style.boxShadow="none"}),M.addEventListener("click",()=>{o=Tn(C),d(),x(),N.value=C,w()}),y.appendChild(M)}n.appendChild(y);function w(){let C=Sn(o);N.value=C,e.onColorChange(C)}t.appendChild(n),Ve=n,d(),x();let L=C=>{u&&p(C),$&&A(C)},H=()=>{u=!1,$=!1};document.addEventListener("mousemove",L),document.addEventListener("mouseup",H);let k=C=>{C.key==="Escape"&&Pe()};document.addEventListener("keydown",k,!0);let D=C=>{Ve&&!C.composedPath().includes(Ve)&&Pe()};setTimeout(()=>document.addEventListener("mousedown",D,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",L),document.removeEventListener("mouseup",H),document.removeEventListener("keydown",k,!0),document.removeEventListener("mousedown",D,!0)},n._onClose=e.onClose}function Pe(){Ve&&(Ve._cleanup?.(),Ve._onClose?.(),Ve.remove(),Ve=null)}function Nl(e,t,n){let o=document.createElement("div");o.style.cssText=`
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
    `,s.addEventListener("click",()=>{r.forEach((a,c)=>{a.style.background=c===i?l.bgPrimary:"transparent",a.style.boxShadow=c===i?_.sm:"none",a.style.color=c===i?l.textPrimary:l.textSecondary}),n(i)}),r.push(s),o.appendChild(s)}return o}var Yo=null;function Ol(){return Yo||(Yo=document.createElement("canvas").getContext("2d")),Yo}function Li(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let s=document.createElement("div");s.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${O.sm};
    border:1px solid ${l.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let a=document.createElement("input");a.type="text",a.placeholder="#rrggbb",a.className="prop-input",a.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${T};`,i.appendChild(s),i.appendChild(a),i.appendChild(c);let d=t.get(r.key)??r.defaultValue,u=!1;function p(g){let b=g.trim().toLowerCase();if(b==="transparent")return"transparent";if(b==="inherit"||b==="currentcolor"||b==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(b))return b;let x=Ol();x.fillStyle="#000000",x.fillStyle=b;let $=x.fillStyle;if($.startsWith("#"))return $;let A=$.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(A){let N=parseInt(A[1],10),v=parseInt(A[2],10),y=parseInt(A[3],10);return`#${((1<<24)+(N<<16)+(v<<8)+y).toString(16).slice(1)}`}return"#000000"}function f(g){d=g,a.value=g,g==="transparent"?s.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":s.style.background=g;try{let b=kt(),x=an(g,b.colorsReverse);x?c.textContent=`${r.tailwindPrefix??"bg"}-${x}`:c.textContent=""}catch{c.textContent=""}}function m(){if(u)return;let g=a.value.trim();if(!g){f(d);return}let b=p(g);f(b),n(r.key,b),o()}return s.addEventListener("click",()=>{if(u){Pe(),u=!1;return}let g=s.getBoundingClientRect();u=!0,Qe({initialColor:p(d),position:{x:g.left-210,y:g.top},showPropertyToggle:!1,onColorChange:b=>{f(b),n(r.key,b)},onClose:()=>{u=!1,o()}})}),a.addEventListener("keydown",g=>{g.key==="Enter"?(m(),a.blur()):g.key==="Escape"&&(f(d),a.blur())}),a.addEventListener("blur",()=>{m()}),a.addEventListener("input",()=>{let g=a.value.trim(),b=p(g);s.style.background=b}),f(d),{element:i,setValue(g,b){g===r.key&&f(b)},destroy(){u&&(Pe(),u=!1)}}}V();function Ri(e,t,n,o){let r=e[0],i=r.min??0,s=r.max??100,a=r.key==="opacity",c=document.createElement("div");c.style.cssText="display:flex; align-items:center; gap:6px;";let d=document.createElement("input");d.type="range",d.min=String(i),d.max=String(s),d.step="1",d.className="prop-slider",d.style.cssText="flex:1;";let u=document.createElement("span");u.style.cssText=`
    font-family:${T};
    font-size:11px;
    color:${l.textPrimary};
    min-width:28px;
    text-align:right;
  `.trim().replace(/\n\s*/g," "),c.appendChild(d),c.appendChild(u);let p=t.get(r.key)??r.defaultValue;function f(b){let x=parseFloat(b);return isNaN(x)?a?s:i:a?Math.round(x*100):x}function m(b){return String(a?b/100:b)}function g(b){p=b;let x=f(b);d.value=String(x),u.textContent=a?`${x}%`:String(x)}return d.addEventListener("input",()=>{let b=parseInt(d.value,10),x=m(b);p=x,u.textContent=a?`${b}%`:String(b),n(r.key,x)}),d.addEventListener("change",()=>{o()}),g(p),{element:c,setValue(b,x){b===r.key&&g(x)},destroy(){}}}V();function Ni(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function Oi(e,t,n,o){let r=new Map(t),i=[];for(let S of e){let E=Ni(S.key);E&&i.push({descriptor:S,...E})}let s=document.createElement("div");s.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),E.addEventListener("mouseenter",()=>{E.style.background=l.bgTertiary}),E.addEventListener("mouseleave",()=>{(document.activeElement!==m||m.dataset.key!==S.key)&&(E.style.background="transparent")}),E.addEventListener("click",()=>{x(S,E)}),p.push({key:S.key,span:E,descriptor:S}),E}let m=document.createElement("input");m.type="text",m.className="prop-input",m.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",s.appendChild(m);let g=null,b=null;function x(S,E){g&&g!==S&&$(),g=S,b=E,m.dataset.key=S.key;let oe=r.get(S.key)??S.defaultValue;m.value=A(oe);let Y=0,Ke=0,Ae=E;for(;Ae&&Ae!==s;)Y+=Ae.offsetLeft,Ke+=Ae.offsetTop,Ae=Ae.offsetParent;m.style.display="block",m.style.left=`${Y}px`,m.style.top=`${Ke}px`;let kr=E.getBoundingClientRect();m.style.width=`${Math.max(40,kr.width+10)}px`,m.focus(),m.select()}function $(){if(!g||!b)return;let S=m.value.trim(),E=g,oe=b,Y,Ke=parseFloat(S),Ae=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(Ke)?Ae.has(S)?Y=S:Y=r.get(E.key)??E.defaultValue:Y=S.match(/(px|rem|em|%|vw|vh|ch)$/)?S:`${Ke}px`,r.set(E.key,Y),oe.textContent=A(Y),oe.style.background="transparent",m.style.display="none",m.dataset.key="",g=null,b=null,n(E.key,Y),o()}m.addEventListener("keydown",S=>{if(S.key==="Enter")$();else if(S.key==="Escape"){if(g&&b){let E=r.get(g.key)??g.defaultValue;b.textContent=A(E)}m.style.display="none",m.dataset.key="",g=null,b=null}}),m.addEventListener("blur",()=>{$()});function A(S){let E=parseFloat(S);return isNaN(E)?S:E===Math.round(E)?String(Math.round(E)):S}function N(S){let E=document.createElement("span");return E.textContent=S,E.style.cssText=`
      font-size:9px;
      color:${l.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),E}function v(S,E){return i.find(oe=>oe.layer===S&&oe.side===E)}function y(S,E){let oe=v(S,E);if(!oe){let Y=document.createElement("span");return Y.textContent="-",Y.style.cssText=`text-align:center; color:${l.textTertiary};`,Y}return f(oe.descriptor)}let w=y("padding","top");w.style.gridRow="1",w.style.gridColumn="2",w.style.textAlign="center";let L=y("padding","left");L.style.gridRow="2",L.style.gridColumn="1";let H=y("padding","right");H.style.gridRow="2",H.style.gridColumn="3";let k=y("padding","bottom");k.style.gridRow="3",k.style.gridColumn="2",k.style.textAlign="center",u.style.gridRow="2",u.style.gridColumn="2",d.appendChild(w),d.appendChild(L),d.appendChild(u),d.appendChild(H),d.appendChild(k);let D=document.createElement("div");D.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let C=y("margin","top");C.style.gridRow="1",C.style.gridColumn="2",C.style.textAlign="center";let M=y("margin","left");M.style.gridRow="2",M.style.gridColumn="1";let B=y("margin","right");B.style.gridRow="2",B.style.gridColumn="3";let ne=y("margin","bottom");ne.style.gridRow="3",ne.style.gridColumn="2",ne.style.textAlign="center";let $e=document.createElement("div");$e.style.cssText="grid-row:2; grid-column:2;",$e.appendChild(d),D.appendChild(C),D.appendChild(M),D.appendChild($e),D.appendChild(B),D.appendChild(ne);let rn=N("margin"),ga=N("padding"),sn=document.createElement("div");return sn.style.cssText="display:flex; gap:8px; padding:0 4px;",sn.appendChild(rn),sn.appendChild(ga),c.appendChild(D),a.appendChild(c),s.appendChild(sn),s.appendChild(a),{element:s,setValue(S,E){if(!Ni(S))return;r.set(S,E);let Y=p.find(Ke=>Ke.key===S);Y&&(Y.span.textContent=A(E))},destroy(){}}}V();var kn=new Set;function $i(e){return kn.has(e)}var Mn=[];function Ai(e){return Mn.push(e),()=>{let t=Mn.indexOf(e);t>=0&&Mn.splice(t,1)}}var $l={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background",border:"Border",effects:"Effects"},Al={"number-scrub":Mi,segmented:Pi,"color-swatch":Li,slider:Ri,"box-model":Oi},_l=`
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
`;function Hl(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function Il(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function Dl(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}var Fl=new Set(["flexDirection","justifyContent","alignItems","gap"]);function Vl(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function jo(e,t,n,o){let r=document.createElement("div");r.className="prop-sections";let i=document.createElement("style");i.textContent=_l,r.appendChild(i);let s=[],a=Il(e);for(let[c,d]of a){let u=c==="layout"&&!Vl(t)?d.filter(x=>!Fl.has(x.key)):d;if(u.length===0)continue;let p=document.createElement("div");p.className="prop-section";let f=document.createElement("div");f.className="prop-section-header",f.innerHTML=`<span>${$l[c]}</span>${Hl()}`;let m=document.createElement("div");m.className="prop-section-body";let g=kn.has(c);if(g){let x=f.querySelector(".prop-section-chevron");x&&x.classList.add("collapsed"),m.classList.add("collapsed")}f.addEventListener("click",()=>{if(g=!g,g)kn.add(c);else{kn.delete(c);for(let $ of Mn)$(c)}let x=f.querySelector(".prop-section-chevron");x&&x.classList.toggle("collapsed",g),m.classList.toggle("collapsed",g)}),p.appendChild(f);let b=Dl(u);for(let x of b){let $=Al[x.controlType];if(!$)continue;let A=$(x.descriptors,t,n,o);if(x.descriptors.length>1||x.controlType==="box-model")m.appendChild(A.element);else{let N=document.createElement("div");N.className="prop-control-row";let v=document.createElement("span");v.className="prop-control-label",v.textContent=x.descriptors[0].label,v.title=x.descriptors[0].label;let y=document.createElement("div");y.className="prop-control-value",y.appendChild(A.element),N.appendChild(v),N.appendChild(y),m.appendChild(N)}s.push(A)}p.appendChild(m),r.appendChild(p)}return{container:r,controls:s}}V();var zl=300,_i=260,Hi=380,Ii="sketch-ui-sidebar-width",Bl=4,Gl=`
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
    width: ${Bl}px;
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
`;function Wl(){try{let e=localStorage.getItem(Ii);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=_i&&t<=Hi)return t}}catch{}return Math.min(zl,Math.floor(window.innerWidth*.22))}function Yl(e){try{localStorage.setItem(Ii,String(e))}catch{}}function Di(e,t){let n=document.createElement("style");n.textContent=Gl,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${Wl()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let s=document.createElement("div");s.className="prop-sidebar-header-info";let a=document.createElement("div");a.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let d=document.createElement("div");d.className="prop-sidebar-file-path",s.appendChild(a),s.appendChild(d);let u=document.createElement("button");u.className="prop-sidebar-close",u.title="Close panel",u.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>',i.appendChild(s),i.appendChild(u),o.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",o.appendChild(p);let f=document.createElement("div");f.className="prop-sidebar-content",o.appendChild(f),e.appendChild(o);let m=!1,g=0,b=0;r.addEventListener("pointerdown",k=>{k.preventDefault(),k.stopPropagation(),m=!0,g=k.clientX,b=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(k.pointerId)}),r.addEventListener("pointermove",k=>{if(!m)return;let D=g-k.clientX,C=Math.max(_i,Math.min(Hi,b+D));o.style.width=`${C}px`});let x=()=>{m&&(m=!1,r.classList.remove("active"),Yl(o.offsetWidth))};r.addEventListener("pointerup",x),r.addEventListener("pointercancel",x),o.addEventListener("pointerdown",k=>k.stopPropagation()),o.addEventListener("mousedown",k=>k.stopPropagation()),o.addEventListener("click",k=>k.stopPropagation()),o.addEventListener("mouseup",k=>k.stopPropagation()),u.addEventListener("click",()=>{N(),t&&t()});let $=!1;function A(k,D,C,M){a.textContent=`<${k}>`,a.appendChild(c),d.textContent=`${D}:${C}`,d.title=`${D}:${C}`,f.innerHTML="",f.appendChild(M),$||($=!0,o.offsetHeight,o.classList.add("visible"))}function N(){$&&($=!1,o.classList.remove("visible"))}function v(k){f.innerHTML="",f.appendChild(k)}function y(k,D,C){p.innerHTML="";let M=document.createElement("span");M.className="prop-sidebar-warning-text",M.textContent=k;let B=document.createElement("button");B.className="prop-sidebar-warning-btn",B.textContent=D,B.addEventListener("click",ne=>{ne.stopPropagation(),C()}),p.appendChild(M),p.appendChild(B),p.style.display="flex"}function w(){p.style.display="none",p.innerHTML=""}function L(){c.classList.add("active")}function H(){c.classList.remove("active")}return{show:A,hide:N,isVisible:()=>$,getElement:()=>o,replaceContent:v,showWarning:y,clearWarning:w,showSaving:L,hideSaving:H}}re();var Jo=new Map(ut.map(e=>[e.key,e]));var Ul=new Set(["layout","spacing","size"]),qi=new Set(["typography","background","border","effects"]),Xl=5e3,h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map},et=[],F,Zi,ie=null,Kl=300,fe=null,ft=null,_n=new MutationObserver(()=>{h.selectedElement&&!document.contains(h.selectedElement)&&(clearTimeout(Zi),Zi=setTimeout(()=>{ql()},80))});function ql(){let e=h.elementIdentity,t=h.componentInfo;if(!e||!t){In();return}let n=Zl(e);if(n){Hn(n,t);return}Jl(e).then(o=>{o?Hn(o,t):In()})}function Zl(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ce(n);for(;o;){if(xe(o)){let r=o._debugSource,i=le(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function Jl(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ce(n);if(!o)continue;let r=await Ze(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let a="";if(i.fileName){let c=Ie(i.fileName);Je(c)&&(a=c)}if(a&&e.filePath.endsWith(a)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}function Ql(e,t){let n=getComputedStyle(e),o=new Map;for(let r of ut){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function ec(e){if(!h.selectedElement)return;let t=getComputedStyle(h.selectedElement);for(let n of ut){if(n.group!==e||h.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;h.currentValues.set(n.key,r),h.originalValues.get(n.key)===n.defaultValue&&h.originalValues.set(n.key,r);for(let i of et)i.setValue(n.key,r)}}function jt(){for(let e of et)e.destroy();et=[]}function Ji(){if(!h.selectedElement||!h.componentInfo)return;jt();let{container:e,controls:t}=jo(ut,h.currentValues,ts,Qi);et=t,F.replaceContent(e)}function Qi(){ie&&clearTimeout(ie),ie=setTimeout(()=>{ie=null,er()},Kl)}function Qo(){ie&&(clearTimeout(ie),ie=null),ft&&(ft(),ft=null),fe&&(clearTimeout(fe.timeoutId),fe=null),h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map}}function es(e){F=Di(e,()=>{Dn(),jt(),Qo()}),Lr((t,n,o)=>{if(F&&F.hideSaving(),fe)if(clearTimeout(fe.timeoutId),t)fe=null;else{let{batch:r,previousOriginals:i}=fe;fe=null;for(let[s]of r){let a=i.get(s);a!==void 0&&h.originalValues.set(s,a)}if(h.selectedElement){for(let[s]of r){h.selectedElement.style[s]="",h.activeOverrides.delete(s);let a=h.originalValues.get(s);a!==void 0&&h.currentValues.set(s,a)}for(let s of et)for(let[a]of r){let c=h.originalValues.get(a);c!==void 0&&s.setValue(a,c)}}if(F){let a={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";F.showWarning(a,"Dismiss",()=>F.clearWarning())}}else if(!t&&F){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";F.showWarning(i,"Dismiss",()=>F.clearWarning())}})}function Hn(e,t){h.pendingBatch.size>0&&er(),jt(),h.selectedElement=e,h.componentInfo=t,h.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(Ul);for(let s of qi)$i(s)||n.add(s);let o=Ql(e,n);h.currentValues=o,h.originalValues=new Map(o),h.activeOverrides=new Map,h.pendingBatch=new Map,ft&&ft(),ft=Ai(s=>{qi.has(s)&&ec(s)});let{container:r,controls:i}=jo(ut,h.currentValues,ts,Qi);et=i,_n.disconnect(),_n.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),F.show(t.componentName,t.filePath,t.lineNumber,r)}function ts(e,t){let n=Jo.get(e);if(!n||!h.selectedElement)return;h.selectedElement.style[n.key]=t,h.activeOverrides.set(e,t),h.currentValues.set(e,t);let o=kt(),r=n.tailwindScale+"Reverse",i=o[r],s=i?an(t,i):null;if(!s&&n.enumValues){let a=n.enumValues.find(c=>c.value===t);a&&(s=a.tailwindValue)}if(h.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:s,relatedPrefixes:n.relatedPrefixes,originalValue:h.originalValues.get(e)||n.defaultValue}),e==="display")if(Ji(),t==="none"){let a=h.originalValues.get("display")||"block";F.showWarning("Element hidden","Restore",()=>{h.selectedElement&&(h.selectedElement.style.display=a),h.activeOverrides.delete("display"),h.currentValues.set("display",a),h.pendingBatch.delete("display"),Ji(),F.clearWarning()})}else F.clearWarning()}function er(){if(h.pendingBatch.size===0||!h.componentInfo)return;let e=h.componentInfo.filePath,t=h.componentInfo.lineNumber,n=h.componentInfo.columnNumber-1;if(h.pendingBatch.size===1){let s=[...h.pendingBatch.values()][0],a=Jo.get(s.property);_e({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:n,...s,framework:"tailwind",classPattern:a?.classPattern,standalone:a?.standalone})}else _e({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:n,updates:[...h.pendingBatch.values()].map(s=>{let a=Jo.get(s.property);return{...s,classPattern:a?.classPattern,standalone:a?.standalone}}),framework:"tailwind"});h.selectedElement&&h.elementIdentity&&Ui({type:"propertyChange",elementIdentity:h.elementIdentity,element:h.selectedElement,overrides:[...h.pendingBatch.values()].map(s=>({cssProperty:s.cssProperty,previousValue:s.originalValue,newValue:s.value}))}),F&&F.showSaving();let o=new Map;for(let[s]of h.pendingBatch)o.set(s,h.originalValues.get(s)||"");for(let[s,a]of h.pendingBatch)h.originalValues.set(s,a.value);let r=new Map(h.pendingBatch),i=setTimeout(()=>{fe&&fe.batch===r&&(fe=null,F&&F.hideSaving())},Xl);fe={batch:r,previousOriginals:o,timeoutId:i},h.pendingBatch.clear()}function Dn(){if(h.selectedElement){for(let[e]of h.activeOverrides)h.selectedElement.style[e]="";for(let[e,t]of h.originalValues)h.currentValues.set(e,t);for(let e of et)for(let[t,n]of h.originalValues)e.setValue(t,n);h.activeOverrides.clear(),h.pendingBatch.clear()}}function In(){ie&&(clearTimeout(ie),ie=null),_n.disconnect(),Dn(),jt(),F&&F.hide(),Qo()}function ns(){ie&&(clearTimeout(ie),ie=null),_n.disconnect(),er(),jt(),F&&F.hide(),Qo()}function os(){return h.activeOverrides.size>0}Ho()||Io({onCommitFiberRoot(){}});async function tc(e){let t=ce(e);if(!t)return null;try{let n=await Ze(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||De(i))continue;let s="";if(r.fileName){let a=Ie(r.fileName);Je(a)&&(s=a)}o.push({componentName:i,filePath:s,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0)return{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}}catch(n){console.warn("[SketchUI] getOwnerStack failed, falling back to fiber walk:",n)}return is(e,t)}function is(e,t){let n=[],o=t;for(;o;){if(xe(o)){let r=le(o.type),i=o._debugSource||o._debugOwner?._debugSource,s="",a=0,c=0;i&&(s=i.fileName||"",a=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!De(r)&&n.push({componentName:r,filePath:s,lineNumber:a,columnNumber:c})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function rs(e){let t=ce(e);return t?is(e,t):null}var we=null,Ce=null,Le=!1,gt=!1,R=null,be=null,tt="idle",X=null,Ut=null,nc=null,oc=null,rc=null,ic=`
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
`;function ss(e){nc=e.onStart,oc=e.onMove,rc=e.onEnd}function as(){let e=z();if(!e)return;let t=document.createElement("style");t.textContent=ic,e.appendChild(t),R=document.createElement("div"),R.className="selection-label",e.appendChild(R),be=document.createElement("div"),be.className="marquee-box",e.appendChild(be),Le=!0,document.addEventListener("mousedown",Fn,!0),document.addEventListener("mousemove",Vn,!0),document.addEventListener("mouseup",zn,!0),document.addEventListener("keydown",Gn,!0),document.addEventListener("click",Bn,!0),document.addEventListener("scroll",Ye,!0),window.addEventListener("resize",Ye),gt=!0}function Fn(e){if(!Le||e.metaKey||e.ctrlKey)return;let t=document.elementFromPoint(e.clientX,e.clientY);if(!t?.closest("#sketch-ui-root")){if(e.preventDefault(),e.stopPropagation(),!t||!Dt(t)){we&&(ns(),we=null,Ce=null,zt(null),R&&(R.classList.remove("visible"),R.style.display="none"),mn(null));return}X={x:e.clientX,y:e.clientY},Ut=t,tt="pending"}}function Vn(e){if(Le){if(tt==="pending"&&X){let t=Math.abs(e.clientX-X.x),n=Math.abs(e.clientY-X.y);(t>10||n>10)&&(tt="marquee")}if(tt==="marquee"&&X&&be){let t=Math.min(e.clientX,X.x),n=Math.min(e.clientY,X.y),o=Math.abs(e.clientX-X.x),r=Math.abs(e.clientY-X.y);be.style.display="block",be.style.left=`${t}px`,be.style.top=`${n}px`,be.style.width=`${o}px`,be.style.height=`${r}px`;return}if(tt==="idle"){let t=document.elementFromPoint(e.clientX,e.clientY);if(!t||!Dt(t)){En(null);return}let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;En(n,o+2)}}}function zn(e){if(!Le)return;let t=tt;if(tt="idle",t==="marquee"&&X){be&&(be.style.display="none"),ac(Math.min(e.clientX,X.x),Math.min(e.clientY,X.y),Math.max(e.clientX,X.x),Math.max(e.clientY,X.y)),X=null,Ut=null;return}Ut&&sc(Ut),X=null,Ut=null}async function sc(e){try{Ce=e,ls(e.getBoundingClientRect(),{}),cc();let t=await tc(e);if(console.log("[SketchUI] selectElement:",e.tagName,"\u2192",t?.componentName,t?.filePath,"stack:",t?.stack?.map(n=>n.componentName)),!t)return;if(we={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:e.getBoundingClientRect().top,left:e.getBoundingClientRect().left,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}},R){let n=t.filePath?`${t.filePath}:${t.lineNumber}`:"";R.innerHTML=`<span class="comp-name">${t.componentName}</span>${n?`<span class="comp-path">${n}</span>`:""}`}Hn(e,we),mn({tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber})}catch(t){console.error("[SketchUI] selectElement error:",t)}}function ac(e,t,n,o){let r=Cn({x:e,y:t,width:n-e,height:o-t});if(r.length===0)return;let i=[];for(let a of r.slice(0,50)){let c=rs(a);c?.stack?.length&&i.push(c.stack)}if(i.length===0)return;let s=lc(i);if(s)for(let a of r){let c=rs(a);if(c&&c.componentName===s.componentName){let d=a.getBoundingClientRect();if(Ce=a,we={tagName:a.tagName.toLowerCase(),componentName:s.componentName,filePath:s.filePath,lineNumber:s.lineNumber,columnNumber:s.columnNumber,stack:c.stack,boundingRect:{top:d.top,left:d.left,width:d.width,height:d.height}},ls(d,we),R){let u=s.filePath?`${s.filePath}:${s.lineNumber}`:"";R.innerHTML=`<span class="comp-name">${s.componentName}</span>${u?`<span class="comp-path">${u}</span>`:""}`}return}}}function lc(e){if(e.length===0)return null;if(e.length===1)return e[0][0];let t=e[0],n=null;for(let o=0;o<t.length;o++){let r=t[o];if(e.every(s=>s[o]&&s[o].filePath===r.filePath&&s[o].lineNumber===r.lineNumber))n=r;else break}return n}function Bn(e){Le&&(e.metaKey||e.ctrlKey||e.preventDefault())}function Gn(e){if(Le&&e.key==="Escape"&&we){if(os()){Dn(),e.preventDefault();return}Xt(),e.preventDefault()}}function ls(e,t){if(Ce){let n=parseFloat(getComputedStyle(Ce).borderRadius)||4;zt(e,n+2)}if(R){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),R.style.left=`${i}px`,R.style.top=`${r}px`,R.style.display="block",R.style.right="auto",R.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>R?.classList.add("visible")),requestAnimationFrame(()=>{if(!R)return;R.getBoundingClientRect().right>window.innerWidth-8&&(R.style.left="auto",R.style.right="8px")})}}function Ye(){if(!Ce||!we)return;let e=Ce.getBoundingClientRect(),t=parseFloat(getComputedStyle(Ce).borderRadius)||4;if(zt(e,t+2),R&&R.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),R.style.left=`${e.left}px`,R.style.top=`${r}px`,R.style.right="auto",R.getBoundingClientRect().right>window.innerWidth-8&&(R.style.left="auto",R.style.right="8px")}}function cc(){En(null)}function Xt(){In(),we=null,Ce=null,zt(null),R&&(R.classList.remove("visible"),R.style.display="none"),mn(null)}function cs(){return we}function ds(){Le=!1,document.removeEventListener("mousedown",Fn,!0),document.removeEventListener("mousemove",Vn,!0),document.removeEventListener("mouseup",zn,!0),document.removeEventListener("keydown",Gn,!0),document.removeEventListener("click",Bn,!0),document.removeEventListener("scroll",Ye,!0),window.removeEventListener("resize",Ye),gt=!1,R?.remove(),R=null}function tr(e){e&&!gt?(document.addEventListener("mousedown",Fn,!0),document.addEventListener("mousemove",Vn,!0),document.addEventListener("mouseup",zn,!0),document.addEventListener("keydown",Gn,!0),document.addEventListener("click",Bn,!0),document.addEventListener("scroll",Ye,!0),window.addEventListener("resize",Ye),gt=!0,Le=!0):!e&&gt&&(document.removeEventListener("mousedown",Fn,!0),document.removeEventListener("mousemove",Vn,!0),document.removeEventListener("mouseup",zn,!0),document.removeEventListener("keydown",Gn,!0),document.removeEventListener("click",Bn,!0),document.removeEventListener("scroll",Ye,!0),window.removeEventListener("resize",Ye),gt=!1,Le=!1)}function us(){return Ce??null}var te=null,ee=null,je=null,ps=null,Kt=!1,ht=null,Wn=[],Yn=new Map,jn=!1,dc=`
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
`,yt=null;function ms(){let e=z();if(!e)return;let t=document.createElement("style");t.textContent=dc,e.appendChild(t),ss({onStart:uc,onMove:pc,onEnd:mc}),Pt(n=>{n.type==="reorderComplete"&&(nr(),Xt())})}function uc(e,t,n){je=n,ps=t,ht={x:e.clientX,y:e.clientY},Kt=!1,jn=!1,Wn=[],Yn=new Map,yt=null;let o=z();if(!o)return;te=document.createElement("div"),te.className="drag-preview";let r=t.getBoundingClientRect();te.style.width=`${r.width}px`,te.style.height=`${r.height}px`,te.innerHTML=t.outerHTML,o.appendChild(te),ee=document.createElement("div"),ee.className="drop-indicator",o.appendChild(ee);let i=n.stack[1];if(!i)return;_e({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let s=Pt(a=>{if(a.type!=="siblingsList")return;s(),Wn=a.siblings;let c=document.querySelectorAll("*");for(let d of c){if(d.closest("#sketch-ui-root"))continue;let u=ce(d);if(!u)continue;let p=u;for(;p;){if(xe(p)){let f=p._debugSource||p._debugOwner?._debugSource;if(f){for(let m of a.siblings)f.lineNumber===m.lineNumber&&f.fileName===i.filePath&&Yn.set(m.lineNumber,{el:d,rect:d.getBoundingClientRect()});break}}p=p.return}}jn=!0})}function pc(e){if(!ht)return;let t=Math.abs(e.clientX-ht.x),n=Math.abs(e.clientY-ht.y);if(t<5&&n<5||(Kt=!0,te&&(te.style.display="block",te.style.left=`${e.clientX+10}px`,te.style.top=`${e.clientY+10}px`),!jn||!je))return;let o=null,r=1/0,i=0,s=0,a=0;for(let c of Wn){if(c.lineNumber===je.lineNumber)continue;let d=Yn.get(c.lineNumber);if(!d)continue;let u=d.rect,p=u.top+u.height/2,f=Math.abs(e.clientY-p);f<r&&(r=f,o=c,e.clientY<p?i=u.top-2:i=u.bottom+2,s=u.left,a=u.width)}yt=o,o&&ee?(ee.style.display="block",ee.style.top=`${i}px`,ee.style.left=`${s}px`,ee.style.width=`${a}px`):ee&&(ee.style.display="none")}function mc(e){if(!Kt||!yt||!je){nr();return}_e({type:"reorder",filePath:je.filePath,fromLine:je.lineNumber,toLine:yt.lineNumber,fromComponent:je.componentName,toComponent:yt.componentName}),te&&(te.style.display="none"),ee&&(ee.style.display="none"),Kt=!1,ht=null}function nr(){te?.remove(),ee?.remove(),te=null,ee=null,je=null,ps=null,Kt=!1,ht=null,jn=!1,Wn=[],Yn=new Map,yt=null}function fs(){nr()}V();re();var Ue="http://www.w3.org/2000/svg",bt=null,K=null,rr=null;function gs(){let e=z();e&&(bt=document.createElementNS(Ue,"svg"),bt.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),K=document.createElementNS(Ue,"g"),K.setAttribute("class","annotation-root"),bt.appendChild(K),e.appendChild(bt),window.addEventListener("scroll",Un,{passive:!0}),rr=mt(Un),Un())}var or=null;function Un(){or===null&&(or=requestAnimationFrame(()=>{if(or=null,!K)return;let{scale:e,offsetX:t,offsetY:n}=ye();K.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}))}function hs(e,t,n,o){if(!K||t.length<2)return null;let r=document.createElementNS(Ue,"g");r.setAttribute("data-annotation-id",e);let i=document.createElementNS(Ue,"path");return i.setAttribute("d",Cs(t)),i.setAttribute("stroke",n),i.setAttribute("stroke-width",String(o)),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.setAttribute("fill","none"),r.appendChild(i),K.appendChild(r),r}function ys(e,t,n,o,r,i){if(!K)return null;let s=document.createElementNS(Ue,"foreignObject");s.setAttribute("data-annotation-id",e),s.setAttribute("x",String(t)),s.setAttribute("y",String(n)),s.setAttribute("width","300"),s.setAttribute("height","100");let a=document.createElement("div");return a.style.cssText=`
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
  `,a.textContent=o,s.appendChild(a),K.appendChild(s),s}function bs(e,t,n,o){if(!K)return null;let r=document.createElementNS(Ue,"circle");return r.setAttribute("data-annotation-id",e),r.setAttribute("cx",String(t)),r.setAttribute("cy",String(n)),r.setAttribute("r","6"),r.setAttribute("fill",o),r.setAttribute("stroke","white"),r.setAttribute("stroke-width","1.5"),K.appendChild(r),r}function vs(){K&&(K.innerHTML="")}function xs(){window.removeEventListener("scroll",Un),rr?.(),rr=null,bt?.remove(),bt=null,K=null}function Cs(e){if(e.length===0)return"";let t=`M${e[0].x},${e[0].y}`;for(let n=1;n<e.length;n++)t+=` L${e[n].x},${e[n].y}`;return t}function ws(e,t){if(!K)return null;let n=[],o=document.createElementNS(Ue,"g"),r=document.createElementNS(Ue,"path");return r.setAttribute("stroke",e),r.setAttribute("stroke-width",String(t)),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("fill","none"),o.appendChild(r),K.appendChild(o),{path:r,group:o,addPoint(i,s){n.push({x:i,y:s}),r.setAttribute("d",Cs(n))},getPoints(){return n}}}re();re();V();var fc="2147483644",sr=null;function Es(){window.addEventListener("scroll",ar,{passive:!0}),sr=mt(ar)}var ir=null;function ar(){ir===null&&(ir=requestAnimationFrame(()=>{ir=null;let{scale:e,offsetX:t,offsetY:n}=ye();for(let o of We().values()){let r=o.currentPos.x*e+t,i=o.currentPos.y*e+n;o.cloneEl.style.left=`${r}px`,o.cloneEl.style.top=`${i}px`,o.cloneEl.style.transform=`scale(${e})`,o.cloneEl.style.transformOrigin="0 0"}}))}function Ts(e,t){let n=e.getBoundingClientRect(),{scale:o,offsetX:r,offsetY:i}=ye(),s=e.cloneNode(!0);s.setAttribute("data-sketch-ui-ghost","true"),s.style.position="fixed",s.style.left=`${n.left}px`,s.style.top=`${n.top}px`,s.style.width=`${n.width/o}px`,s.style.height=`${n.height/o}px`,s.style.transform=`scale(${o})`,s.style.transformOrigin="0 0",s.style.zIndex=fc,s.style.pointerEvents="none",s.style.margin="0",s.style.boxSizing="border-box",s.style.boxShadow=_.sm,document.body.appendChild(s);let a=e.style.opacity||"",c=e.style.visibility||"",d=$n();e.style.opacity=d?"0":"0.3",d&&(e.style.visibility="hidden");let u=(n.left-r)/o,p=(n.top-i)/o,f={id:crypto.randomUUID(),componentRef:t,originalRect:{top:p,left:u,width:n.width/o,height:n.height/o},currentPos:{x:u,y:p},cloneEl:s,originalEl:e,originalOpacity:a,originalVisibility:c};return Gi(f),f}function Ss(e,t,n){let o=We().get(e);if(!o)return;o.currentPos={x:t,y:n};let{scale:r,offsetX:i,offsetY:s}=ye();o.cloneEl.style.left=`${t*r+i}px`,o.cloneEl.style.top=`${n*r+s}px`,o.cloneEl.style.transform=`scale(${r})`}function ks(e,t){for(let n of We().values()){let o=n.cloneEl.getBoundingClientRect();if(e>=o.left&&e<=o.right&&t>=o.top&&t<=o.bottom)return n}return null}function Ms(){window.removeEventListener("scroll",ar),sr?.(),sr=null}function Xn(e){let t=We().get(e);t&&(t.cloneEl.style.boxShadow=_.lg,t.cloneEl.style.opacity="0.9",t.cloneEl.style.transition=`box-shadow ${P.settle}`)}function Ps(e){let t=We().get(e);t&&(t.cloneEl.style.boxShadow=_.sm,t.cloneEl.style.opacity="1")}re();V();qt();var Ee={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-7 1-4 7z"/></svg>',grab:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V8a2 2 0 0 0-4 0v3"/><path d="M14 10V6a2 2 0 0 0-4 0v4"/><path d="M10 9.5V5a2 2 0 0 0-4 0v9"/><path d="M6 14c0 3.31 2.69 6 6 6h2a6 6 0 0 0 6-6v-2"/></svg>',move:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',draw:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',color:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22l1-1h3l9-9"/><path d="M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7"/><path d="M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14"/><path d="m9 7 6 6"/><path d="M20 2a2.83 2.83 0 0 1 0 4L16 10"/></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',lasso:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4c-4.42 0-8 2.24-8 5 0 1.72 1.3 3.24 3.3 4.2"/><path d="M12 4c4.42 0 8 2.24 8 5 0 2.76-3.58 5-8 5"/><path d="M7.3 13.2C5.71 14.08 5 15.27 5 16.5c0 2.49 3.13 4.5 7 4.5s7-2.01 7-4.5c0-1.23-.71-2.42-2.3-3.3"/></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18c3.87 0 7-3.13 7-7s-3.13-7-7-7H4"/><polyline points="8 10 4 6 8 2"/></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>'},zs=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",qn=navigator.platform.includes("Mac")?"Cmd":"Ctrl",vr=[{type:"pointer",icon:Ee.pointer,label:"Pointer",shortcut:"V"},{type:"grab",icon:Ee.grab,label:"Grab",shortcut:"H"},{type:"move",icon:Ee.move,label:"Move",shortcut:"M"},{type:"draw",icon:Ee.draw,label:"Draw",shortcut:"D"},{type:"color",icon:Ee.color,label:"Color",shortcut:"E"},{type:"text",icon:Ee.text,label:"Text",shortcut:"T"},{type:"lasso",icon:Ee.lasso,label:"Lasso",shortcut:"L"}],Tc=`
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
`,se=null,q=null,Jn=new Map,Re=null,yr=null,br=null;function Bs(e){yr=e}function Gs(e){br=e}function Ws(e){Re&&(Re.disabled=!e)}function Ys(){let e=z();if(!e)return;let t=document.createElement("style");t.textContent=Tc,e.appendChild(t),se=document.createElement("div"),se.className="tools-panel";let n=[["pointer","grab"],["move"],["draw","color","text"],["lasso"]];for(let a=0;a<n.length;a++){if(a>0){let c=document.createElement("div");c.className="tool-divider",se.appendChild(c)}for(let c of n[a]){let d=vr.find(f=>f.type===c),u=document.createElement("button");u.className=`tool-btn${d.type==="pointer"?" active":""}`,u.innerHTML=`${d.icon}<span class="tooltip">${d.label}<span class="shortcut-badge">${zs}${d.shortcut}</span></span>`,u.addEventListener("click",()=>Wt(d.type));let p=null;u.addEventListener("mouseenter",()=>{p=setTimeout(()=>u.classList.add("tooltip-visible"),400)}),u.addEventListener("mouseleave",()=>{p&&clearTimeout(p),u.classList.remove("tooltip-visible")}),se.appendChild(u),Jn.set(d.type,u)}}q=document.createElement("div"),q.className="sub-options hidden",se.appendChild(q);let o=document.createElement("div");o.className="tool-divider",se.appendChild(o),Re=document.createElement("button"),Re.className="clear-btn",Re.innerHTML=Ee.undo,Re.title="Undo (Ctrl+Z)",Re.disabled=!0,Re.addEventListener("click",()=>{br&&br()}),se.appendChild(Re);let r=document.createElement("button");r.className="clear-btn",r.innerHTML=Ee.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{yr&&yr()}),se.appendChild(r);let i=document.createElement("button");i.className="clear-btn",i.innerHTML=Ee.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{Hs(),i.style.color=_s()?l.accent:""}),se.appendChild(i);let s=document.createElement("button");s.className="help-btn",s.textContent="?",s.title=`Keyboard Shortcuts (${zs}/)`,s.addEventListener("click",()=>Us()),se.appendChild(s),e.appendChild(se),document.addEventListener("keydown",js,!0)}function js(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||!e.ctrlKey&&!e.metaKey)return;let n=e.key.toUpperCase();if(e.key==="/"||e.key==="?"){Us(),e.preventDefault();return}let o=vr.find(r=>r.shortcut===n);o&&(Wt(o.type),e.preventDefault())}var Te=null,en=null;function Us(){Te?Zn():Sc()}function Sc(){let e=z();if(!e||Te)return;Te=document.createElement("div"),Te.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:vr.map(r=>({action:r.label,keys:[qn,r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[qn,"Z"]},{action:"Toggle Originals",keys:[qn,"."]},{action:"Keyboard Shortcuts",keys:[qn,"/"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Grab Tool","Drag"]},{action:"Zoom",keys:["Scroll Wheel"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let s=document.createElement("div");s.className="shortcuts-section-label",s.textContent=r.label,i.appendChild(s);for(let a of r.items){let c=document.createElement("div");c.className="shortcut-row";let d=document.createElement("span");d.className="shortcut-action",d.textContent=a.action,c.appendChild(d);let u=document.createElement("span");u.className="shortcut-keys";for(let p=0;p<a.keys.length;p++){if(p>0){let m=document.createElement("span");m.className="shortcut-plus",m.textContent="+",u.appendChild(m)}let f=document.createElement("span");f.className="shortcut-key",f.textContent=a.keys[p],u.appendChild(f)}c.appendChild(u),i.appendChild(c)}t.appendChild(i)}Te.appendChild(t),Te.addEventListener("click",r=>{r.target===Te&&Zn()}),e.appendChild(Te),en=r=>{Zn()},document.addEventListener("keydown",en,!0)}function Zn(){en&&(document.removeEventListener("keydown",en,!0),en=null),Te?.remove(),Te=null}function Xs(e){for(let[t,n]of Jn)n.classList.toggle("active",t===e);kc(e)}function kc(e){if(q){if(q.innerHTML="",q.classList.add("hidden"),q.classList.remove("visible"),e==="draw"){q.classList.remove("hidden"),requestAnimationFrame(()=>q?.classList.add("visible"));let t=pe(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.brushColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();Qe({initialColor:t.brushColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){Yt("brushColor",i),n.style.background=i},onClose(){}})}),q.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[2,4,8]){let i=document.createElement("button");i.className=`segment${r===t.brushSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{Yt("brushSize",r),o.querySelectorAll(".segment").forEach(s=>s.classList.remove("active")),i.classList.add("active"),Promise.resolve().then(()=>(xt(),Vs)).then(s=>s.refreshDrawCursor())}),o.appendChild(i)}q.appendChild(o)}else if(e==="text"){q.classList.remove("hidden"),requestAnimationFrame(()=>q?.classList.add("visible"));let t=pe(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();Qe({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){Yt("textColor",i),n.style.background=i},onClose(){}})}),q.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{Yt("fontSize",r),o.querySelectorAll(".segment").forEach(s=>s.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}q.appendChild(o)}}}function Ks(e){let t=Jn.get(e);t&&(t.style.backgroundColor=l.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function qs(){document.removeEventListener("keydown",js,!0),Zn(),se?.remove(),se=null,q=null,Jn.clear()}xt();pr();V();var Zs="sketch-ui-onboarding-seen",Se=null,Qn=null;function Js(){if(localStorage.getItem(Zs))return;let e=z();if(!e)return;Se=document.createElement("div"),Se.style.cssText=`
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
  `;let t=["V","H","M","D","C","T","L"],n=`
    display: inline-block;
    background: ${l.bgSecondary};
    color: ${l.textTertiary};
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 11px;
    font-family: ${T};
    margin: 0 2px;
  `;Se.innerHTML=`Press ${t.map(o=>`<span style="${n}">${o}</span>`).join(" ")} to switch tools`,e.appendChild(Se),requestAnimationFrame(()=>{Se&&(Se.style.opacity="1")}),Qn=setTimeout(xr,5e3)}function xr(){Se&&(localStorage.setItem(Zs,"1"),Se.style.opacity="0",setTimeout(()=>{Se?.remove(),Se=null},150),Qn&&(clearTimeout(Qn),Qn=null))}re();function Qs(){tr(!0)}function ea(){tr(!1)}xt();qt();var Cr=!1,wr=0,Er=0,ta={onMouseDown(e){Cr=!0,wr=e.clientX,Er=e.clientY,Kn("grabbing")},onMouseMove(e){if(!Cr)return;let t=e.clientX-wr,n=e.clientY-Er;$s(t,n),wr=e.clientX,Er=e.clientY},onMouseUp(e){Cr=!1,Kn("grab")}};re();var ae=null,tn={x:0,y:0},Ct=!1,Mc=!1,na={onMouseDown(e){let t=ks(e.clientX,e.clientY);if(t){ae=t;let s=me(e.clientX,e.clientY);tn={x:s.x-t.currentPos.x,y:s.y-t.currentPos.y},Ct=!0,Xn(ae.id);return}let n=cs();if(!n){Mc=!0,Wt("pointer");return}let o=us();if(!o)return;if(ji(o)){for(let s of We().values())if(s.originalEl===o||s.originalEl.contains(o)||o.contains(s.originalEl)){ae=s;let a=me(e.clientX,e.clientY);tn={x:a.x-s.currentPos.x,y:a.y-s.currentPos.y},Ct=!0,Xn(ae.id);return}}let r=Ts(o,{componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber});ae=r;let i=me(e.clientX,e.clientY);tn={x:i.x-r.currentPos.x,y:i.y-r.currentPos.y},Ct=!0,Xn(ae.id)},onMouseMove(e){if(!Ct||!ae)return;let t=me(e.clientX,e.clientY),n=t.x-tn.x,o=t.y-tn.y;Ss(ae.id,n,o)},onMouseUp(e){Ct&&ae&&(Wi(ae.id,ae.currentPos),Ps(ae.id)),ae=null,Ct=!1}};re();function eo(e,t=2){if(e.length<=2)return e;let n=0,o=0,r=e[0],i=e[e.length-1];for(let s=1;s<e.length-1;s++){let a=Pc(e[s],r,i);a>n&&(n=a,o=s)}if(n>t){let s=eo(e.slice(0,o+1),t),a=eo(e.slice(o),t);return[...s.slice(0,-1),...a]}return[r,i]}function Pc(e,t,n){let o=n.x-t.x,r=n.y-t.y,i=o*o+r*r;if(i===0){let a=e.x-t.x,c=e.y-t.y;return Math.sqrt(a*a+c*c)}return Math.abs(r*e.x-o*e.y+n.x*t.y-n.y*t.x)/Math.sqrt(i)}xt();async function wt(e,t){let n=Qt(e,t);if(!n)return null;let o=ce(n);if(!o)return null;try{let i=await Ze(o);if(i&&i.length>0)for(let s of i){if(!s.functionName)continue;let a=s.functionName;if(a[0]!==a[0].toUpperCase()||De(a))continue;let c="";if(s.fileName){let d=Ie(s.fileName);Je(d)&&(c=d)}return{componentName:a,filePath:c,lineNumber:s.lineNumber??0}}}catch{}let r=o;for(;r;){if(xe(r)){let i=le(r.type);if(i&&i[0]===i[0].toUpperCase()&&!De(i)){let s=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:s?.fileName||"",lineNumber:s?.lineNumber||0}}}r=r.return}return null}async function oa(e){let t=ce(e);if(!t)return null;try{let o=await Ze(t);if(o&&o.length>0)for(let r of o){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||De(i))continue;let s="";if(r.fileName){let a=Ie(r.fileName);Je(a)&&(s=a)}return{componentName:i,filePath:s,lineNumber:r.lineNumber??0}}}catch{}let n=t;for(;n;){if(xe(n)){let o=le(n.type);if(o&&o[0]===o[0].toUpperCase()&&!De(o)){let r=n._debugSource||n._debugOwner?._debugSource;return{componentName:o,filePath:r?.fileName||"",lineNumber:r?.lineNumber||0}}}n=n.return}return null}var ke=null,to=null,ra={onMouseDown(e){let t=pe();if(ke=ws(t.brushColor,t.brushSize),ke){let n=me(e.clientX,e.clientY);ke.addPoint(n.x,n.y)}to=wt(e.clientX,e.clientY)},onMouseMove(e){if(!ke)return;let t=me(e.clientX,e.clientY);ke.addPoint(t.x,t.y)},async onMouseUp(e){if(!ke)return;let t=ke.getPoints(),n=pe();if(ke.group.remove(),t.length<2){ke=null,to=null;return}let o=await to,r=eo(t,2),i=crypto.randomUUID();hs(i,r,n.brushColor,n.brushSize),pt({type:"draw",id:i,points:r,color:n.brushColor,strokeWidth:n.brushSize,targetComponent:o}),ke=null,to=null}};re();V();var Z=null,ot=null,no=null,sa={onMouseDown(e){Z&&ia();let t=me(e.clientX,e.clientY);ot={pageX:t.x,pageY:t.y},wt(e.clientX,e.clientY).then(n=>{no=n}),Z=document.createElement("input"),Z.type="text",Z.placeholder="Type annotation...",Z.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${l.bgPrimary};
      color: ${l.textPrimary};
      border: 1.5px solid ${l.accent};
      border-radius: ${O.sm};
      padding: 4px 8px;
      font-size: ${pe().fontSize}px;
      font-family: ${T};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${l.accentSoft};
    `,Z.setAttribute("data-sketch-ui-ghost","true"),Z.addEventListener("keydown",n=>{n.key==="Enter"&&(ia(),n.preventDefault()),n.key==="Escape"&&(aa(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(Z),Z.focus()},onMouseMove(){},onMouseUp(){}};function ia(){if(!Z||!ot)return;let e=Z.value.trim();if(Z.remove(),Z=null,!e)return;let t=pe(),n=crypto.randomUUID();ys(n,ot.pageX,ot.pageY,e,t.fontSize,t.textColor),pt({type:"text",id:n,position:ot,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:no}),ot=null,no=null}function aa(){Z&&(Z.remove(),Z=null),ot=null,no=null}function la(){aa()}xt();re();var Ne=null,on=null,nn="backgroundColor",oo={bg:"",color:""},ca={async onMouseDown(e){Pe();let t=Qt(e.clientX,e.clientY);if(!t)return;Ne=t,oo={bg:getComputedStyle(t).backgroundColor,color:getComputedStyle(t).color};let n=await wt(e.clientX,e.clientY);if(!n)return;on=n;let o=Lc(oo.bg);Jt(!1),Qe({initialColor:o,position:{x:e.clientX+10,y:e.clientY+10},showPropertyToggle:!0,onColorChange(r){Ne&&(Ne.style[nn]=r)},onPropertyChange(r){nn=r},onClose(){if(Jt(!0),!Ne||!on)return;let r=nn==="backgroundColor"?oo.bg:oo.color,i=Ne.style[nn];if(i&&i!==r){let s=crypto.randomUUID(),a=Ne.getBoundingClientRect(),c=me(a.right,a.top);bs(s,c.x,c.y,i),pt({type:"colorChange",id:s,component:on,targetElement:Ne,property:nn,fromColor:r,toColor:i})}Ne=null,on=null}})},onMouseMove(){},onMouseUp(){}};function Lc(e){let t=e.match(/\d+/g);return!t||t.length<3?"#000000":"#"+t.slice(0,3).map(n=>parseInt(n).toString(16).padStart(2,"0")).join("")}function da(){Pe(),Jt(!0),Ne=null,on=null}V();var ua="http://www.w3.org/2000/svg",ge=[],Oe=null,Et=null,pa=[],Tr=[],ma={onMouseDown(e){ro(),ge=[{x:e.clientX,y:e.clientY}];let t=z();t&&(Et=document.createElementNS(ua,"svg"),Et.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483647;"),Oe=document.createElementNS(ua,"path"),Oe.setAttribute("stroke",l.accent),Oe.setAttribute("stroke-width","1.5"),Oe.setAttribute("fill",l.accentSoft),Et.appendChild(Oe),t.appendChild(Et))},onMouseMove(e){!Oe||ge.length===0||(ge.push({x:e.clientX,y:e.clientY}),Rc())},async onMouseUp(e){if(ge.length<3){Sr();return}let t=Nc();Sr();let n=Cn({x:t.left,y:t.top,width:t.right-t.left,height:t.bottom-t.top}),o=new Set,r=await Promise.all(n.map(i=>oa(i)));for(let i=0;i<n.length;i++){let s=r[i],a=n[i];s&&!o.has(`${s.filePath}:${s.lineNumber}`)&&(o.add(`${s.filePath}:${s.lineNumber}`),pa.push(a),Oc(a.getBoundingClientRect()))}}};function Rc(){if(!Oe||ge.length<2)return;let e=`M${ge[0].x},${ge[0].y}`;for(let t=1;t<ge.length;t++)e+=` L${ge[t].x},${ge[t].y}`;e+=" Z",Oe.setAttribute("d",e)}function Nc(){let e=1/0,t=1/0,n=-1/0,o=-1/0;for(let r of ge)e=Math.min(e,r.x),t=Math.min(t,r.y),n=Math.max(n,r.x),o=Math.max(o,r.y);return{left:e,top:t,right:n,bottom:o}}function Oc(e){let t=document.createElement("div");t.setAttribute("data-sketch-ui-ghost","true"),t.style.cssText=`
    position: fixed;
    left: ${e.left}px;
    top: ${e.top}px;
    width: ${e.width}px;
    height: ${e.height}px;
    border: 1.5px solid ${l.accent};
    pointer-events: none;
    z-index: 2147483645;
  `,document.body.appendChild(t),Tr.push(t)}function Sr(){Et?.remove(),Et=null,Oe=null,ge=[]}function ro(){Sr(),Tr.forEach(e=>e.remove()),Tr=[],pa=[]}qt();function fa(){let e=window.__SKETCH_UI_WS_PORT__;if(!e){console.warn("[SketchUI] No WebSocket port found.");return}if(document.getElementById("sketch-ui-root"))return;cn(e),Gr($c);let t=z();t&&es(t),as(),Ei(),ms(),gs(),Es(),Ys(),fr(),Js(),Xe("grab",ta),Xe("move",na),Xe("draw",ra),Xe("text",sa),Xe("color",ca),Xe("lasso",ma),zi((n,o)=>{xr(),Ks(n),o==="pointer"&&ea(),o==="text"&&la(),o==="color"&&da(),o==="lasso"&&ro(),vt(),zo(),n==="pointer"&&Qs(),gr(n),Xs(n)}),Bi(()=>{Kr(Zo()),Ws(Xi())}),Gs(()=>{let n=Ko();n&&he(`Undo: ${n}`)}),Yr(()=>{if(!Zo()){he("No moved components to toggle");return}let n=!$n();Yi(n),Xr(n)}),jr(()=>{let n=Ki();console.log("[SketchUI] Generate \u2014 serialized annotations:",JSON.stringify(n,null,2))}),Ur(()=>{if(On()==="pointer")return!1;let n=Ko();return n?(he(`Undo: ${n}`),!0):!1}),Bs(()=>{Xt(),vs(),ro(),qo(),As(),he("Canvas cleared")}),console.log("[SketchUI] Overlay initialized with Phase 2A canvas tools")}function $c(){vt(),zo(),ds(),Ti(),fs(),xs(),Ms(),qs(),hr(),qo(),ur(),Rr(),Wr()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fa):fa();})();
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
