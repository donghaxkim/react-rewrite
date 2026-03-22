"use strict";var FrameUp=(()=>{var $s=Object.defineProperty;var Ot=(e,t)=>()=>(e&&(t=e(e=0)),t);var As=(e,t)=>{for(var o in t)$s(e,o,{get:t[o],enumerable:!0})};function Qr(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='5 9 2 12 5 15'/><polyline points='9 5 12 2 15 5'/><polyline points='15 19 12 22 9 19'/><polyline points='19 9 22 12 19 15'/><line x1='2' y1='12' x2='22' y2='12'/><line x1='12' y1='2' x2='12' y2='22'/></svg>`)}") 12 12, move`}function To(e){if(xn&&xn.size===e)return xn.uri;let t=Math.max(e,2),o=t*2+4,n=o/2,r=`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${o}' height='${o}'><circle cx='${n}' cy='${n}' r='${t}' fill='none' stroke='${l.accent}' stroke-width='1.5'/></svg>`)}") ${n} ${n}, crosshair`;return xn={size:e,uri:r},r}var l,L,M,k,w,Jr,xn,j=Ot(()=>{"use strict";l={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},L={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},M={xs:"4px",sm:"6px",md:"10px",lg:"14px"},k={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},w="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",Jr=`
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/__frameup/inter-regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/__frameup/inter-semibold.woff2') format('woff2');
  }
`;xn=null});function aa(e){return _n.push(e),()=>{_n=_n.filter(t=>t!==e)}}function sa(e){return In.push(e),()=>{In=In.filter(t=>t!==e)}}function We(){In.forEach(e=>e())}function la(){return dr}function pr(e){let t=dr;t!==e&&(dr=e,_n.forEach(o=>o(e,t)))}function ge(){return{...ia}}function Qt(e,t){ia[e]=t}function Ye(){return fe}function ca(e){fe.set(e.id,e),He.push({type:"ghostCreate",ghostId:e.id}),We()}function da(e,t,o){let n=fe.get(e);if(!n)return;let r=o??{...n.currentPos};n.currentPos=t,He.push({type:"ghostMove",ghostId:e,previousPos:r}),We()}function cc(e){let t=fe.get(e);t&&(t.cloneEl.remove(),t.originalEl.style.opacity=t.originalOpacity,t.originalEl.style.visibility=t.originalVisibility,fe.delete(e),We())}function zn(e){if(Ge.push(e),e.type==="colorChange"){let t=e;He.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else He.push({type:"annotationAdd",annotationId:e.id});We()}function pa(e){ua=e}function fa(e){ma=e}function ra(e){Ge=Ge.filter(t=>t.id!==e),ua?.(e),We()}function Vn(){return ur}function ga(e){ur=e;for(let t of fe.values())e?(t.originalEl.style.opacity="0",t.originalEl.style.visibility="hidden"):(t.originalEl.style.opacity="0.3",t.originalEl.style.visibility="visible");We()}function ha(e){for(let t of fe.values())if(t.originalEl===e||t.originalEl.contains(e)||e.contains(t.originalEl))return!0;return!1}function mr(){let e=He.pop();if(!e)return null;switch(e.type){case"ghostCreate":return cc(e.ghostId),"ghost removed";case"ghostMove":{let t=fe.get(e.ghostId);return t&&(t.currentPos=e.previousPos,ma?.(e.ghostId,e.previousPos.x,e.previousPos.y)),"move reverted"}case"annotationAdd":return ra(e.annotationId),"annotation removed";case"colorChange":{let t=Ge.find(o=>o.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),ra(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let o of t.overrides)t.element.style[o.cssProperty]=o.previousValue;return"property reverted"}}return null}function ya(e){He.push(e),We()}function Te(){return{scale:Jt,offsetX:Dn,offsetY:Fn}}function Bn(e,t,o){Jt=e,Dn=t,Fn=o,Zt.forEach(n=>n())}function Gn(e){return Zt.push(e),()=>{Zt=Zt.filter(t=>t!==e)}}function Se(e,t){return{x:(e-Dn)/Jt,y:(t-Fn)/Jt}}function Wn(){for(let e of fe.values())e.cloneEl.remove(),e.originalEl.style.opacity=e.originalOpacity,e.originalEl.style.visibility=e.originalVisibility;for(let e of Ge)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of He)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let o of t.overrides)t.element.style[o.cssProperty]=o.previousValue}fe=new Map,Ge=[],He=[],ur=!0,Jt=1,Dn=0,Fn=0,Zt.forEach(e=>e()),We()}function fr(){return fe.size>0||Ge.length>0}function ba(){return He.length>0}function va(){let e=[];for(let n of fe.values())e.push({component:n.componentRef.componentName,file:n.componentRef.filePath,line:n.componentRef.lineNumber,from:n.originalRect,to:n.currentPos});let t=[],o=[];for(let n of Ge)n.type==="draw"?t.push({type:"draw",startComponent:n.targetComponent?.componentName,startFile:n.targetComponent?.filePath,startLine:n.targetComponent?.lineNumber,points:n.points,color:n.color,strokeWidth:n.strokeWidth}):n.type==="text"?t.push({type:"text",content:n.content,position:n.position,targetComponent:n.targetComponent?.componentName,targetFile:n.targetComponent?.filePath,targetLine:n.targetComponent?.lineNumber}):n.type==="colorChange"&&o.push({component:n.component.componentName,file:n.component.filePath,line:n.component.lineNumber,property:n.property,from:n.fromColor,to:n.toColor});return{moves:e,annotations:t,colorChanges:o}}var fe,Ge,He,dr,ur,ia,Jt,Dn,Fn,Zt,_n,In,ua,ma,he=Ot(()=>{"use strict";fe=new Map,Ge=[],He=[],dr="pointer",ur=!0,ia={brushSize:4,brushColor:"#ef4444",fontSize:16,textColor:"#ffffff"},Jt=1,Dn=0,Fn=0,Zt=[],_n=[],In=[];ua=null;ma=null});function Cr(){return X}function La(e){return nn.push(e),()=>{nn=nn.filter(t=>t!==e)}}function Ec(){vr=document.body.style.background||document.body.style.backgroundColor||"",xr=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,o=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",X=document.createElement("div"),X.setAttribute("data-frameup-canvas-wrapper","true"),X.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${o};
  `.trim().replace(/\n\s*/g," "),Ce=document.createElement("div"),Ce.setAttribute("data-frameup-dot-bg","true"),Ce.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${l.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let n=Array.from(document.body.childNodes);for(let r of n)r instanceof HTMLElement&&(r.id==="frameup-root"||r.hasAttribute("data-frameup-interaction")||r.hasAttribute("data-frameup-ghost")||r.hasAttribute("data-frameup-annotation")||r.hasAttribute("data-frameup-dot-bg")||r.hasAttribute("data-frameup-canvas-wrapper"))||(Na.push(r),X.appendChild(r));X.style.position="relative",X.style.zIndex="1",document.body.insertBefore(Ce,document.body.firstChild),document.body.insertBefore(X,Ce.nextSibling),br=Gn(Ma),Ma(),nn.forEach(r=>r(X))}function Ma(){if(!X||!Ce)return;let{scale:e,offsetX:t,offsetY:o}=Te();X.style.transform=`translate(${t}px, ${o}px) scale(${e})`;let n=Cc*e,r=t%n,i=o%n;Ce.style.backgroundImage=`radial-gradient(circle, ${wc} ${ka}px, transparent ${ka}px)`,Ce.style.backgroundSize=`${n}px ${n}px`,Ce.style.backgroundPosition=`${r}px ${i}px`}function Tc(e,t,o){let{scale:n,offsetX:r,offsetY:i}=Te(),a=Math.min(vc,Math.max(bc,n+o));if(a===n)return;let s=(e-r)/n,c=(t-i)/n,u=e-s*a,d=t-c*a;Bn(a,u,d)}function Ra(e){e.preventDefault();let t=-e.deltaY*xc,{scale:o}=Te(),n=t*o;Tc(e.clientX,e.clientY,n)}function Pa(e,t){let{scale:o,offsetX:n,offsetY:r}=Te();Bn(o,n+e,r+t)}function Oa(){Bn(1,0,0)}function $a(){return X!==null}function Aa(){X?wr():Ec()}function wr(){if(nn.forEach(e=>e(null)),br?.(),br=null,X){for(;X.firstChild;)document.body.insertBefore(X.firstChild,X);X.remove(),X=null}Ce?.remove(),Ce=null,Na=[],document.body.style.background=vr,document.documentElement.style.background=xr,vr="",xr=""}var bc,vc,xc,Cc,ka,wc,X,Ce,br,Na,nn,vr,xr,wt=Ot(()=>{"use strict";he();j();bc=.1,vc=5,xc=.002,Cc=24,ka=1,wc="rgba(0,0,0,0.15)",X=null,Ce=null,br=null,Na=[],nn=[];vr="",xr=""});function is(e,t){if(!rt)return;let o=performance.now(),n=Math.abs(e-rt.clientX),r=Math.abs(t-rt.clientY),i=n<=2&&r<=2,a=o-rt.timestamp<16;if(i||a)return rt.element}function as(e,t,o){rt={clientX:e,clientY:t,element:o,timestamp:performance.now()}}function Mt(){rt=null}var rt,Lr=Ot(()=>{"use strict";rt=null});var ls={};As(ls,{activateInteraction:()=>Or,destroyInteraction:()=>$r,getPageElementAtPoint:()=>un,initInteraction:()=>Pr,refreshDrawCursor:()=>zc,registerToolHandler:()=>Nt,setInteractionCursor:()=>so,setInteractionPointerEvents:()=>Vc});function Nt(e,t){Rr.set(e,t)}function Pr(){H=document.createElement("div"),H.setAttribute("data-frameup-interaction","true"),H.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(H),document.addEventListener("scroll",Mt,!0),H.addEventListener("mousedown",e=>{dn?.onMouseDown?.(e)}),H.addEventListener("mousemove",e=>{dn?.onMouseMove?.(e)}),H.addEventListener("mouseup",e=>{dn?.onMouseUp?.(e)}),document.addEventListener("wheel",ss,{passive:!1})}function ss(e){!H||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#frameup-root")||Ra(e)}function Or(e){dn=Rr.get(e)||null,H&&(H.style.pointerEvents=e==="pointer"?"none":"auto"),Fc(e)}function Fc(e){if(H)switch(e){case"pointer":H.style.cursor="default";break;case"grab":H.style.cursor="grab";break;case"move":H.style.cursor=Qr();break;case"draw":H.style.cursor=To(ge().brushSize);break;case"text":H.style.cursor="text";break;default:H.style.cursor="default"}}function zc(){la()==="draw"&&H&&(H.style.cursor=To(ge().brushSize))}function so(e){H&&(H.style.cursor=e)}function Vc(e){H&&(H.style.pointerEvents=e?"auto":"none")}function un(e,t){let o=is(e,t);if(o!==void 0)return o;let n=document.elementsFromPoint(e,t),r=null;for(let i of n)if(i instanceof HTMLElement&&!i.closest("#frameup-root")&&!i.hasAttribute("data-frameup-interaction")&&!i.hasAttribute("data-frameup-ghost")&&!(i===document.body||i===document.documentElement)){r=i;break}return as(e,t,r),r}function $r(){document.removeEventListener("scroll",Mt,!0),document.removeEventListener("wheel",ss),H?.remove(),H=null,dn=null,Rr.clear()}var H,dn,Rr,Lt=Ot(()=>{"use strict";he();j();Lr();wt();H=null,dn=null,Rr=new Map});function Hs(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let o=document.createElement("canvas").getContext("2d");o.fillStyle="#000000",o.fillStyle=t;let n=o.fillStyle;if(n.startsWith("#"))return n;let r=n.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),s=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+s).toString(16).slice(1)}`}return e}function _s(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(C=>{try{return Array.from(C.cssRules)}catch{return[]}}).filter(C=>C instanceof CSSStyleRule&&C.selectorText===":root").flatMap(C=>Array.from(C.style)).filter(C=>C.startsWith("--")),o={},n={},r={},i={},a={},s={},c={},u={},d={},p={},m={},f={},g={},b={},x={},R={},$={},O={},z=(C,A,oe,re)=>{C[oe]=re,A[re]=oe};for(let C of t){let A=e.getPropertyValue(C).trim();if(!A)continue;let oe=C.match(/^--spacing-(.+)$/);if(oe){z(o,p,oe[1],A);continue}let re=C.match(/^--color-(.+)$/);if(re){let hn=re[1];n[hn]=A,m[Hs(A)]=hn;continue}let N=C.match(/^--font-size-(.+)$/);if(N){z(r,f,N[1],A);continue}let B=C.match(/^--font-weight-(.+)$/);if(B){z(i,g,B[1],A);continue}let y=C.match(/^--radius-(.+)$/);if(y){z(a,b,y[1],A);continue}let S=C.match(/^--border-(.+)$/);if(S){z(s,x,S[1],A);continue}let Y=C.match(/^--opacity-(.+)$/);if(Y){z(c,R,Y[1],A);continue}let ce=C.match(/^--tracking-(.+)$/);if(ce){z(u,$,ce[1],A);continue}let Fe=C.match(/^--leading-(.+)$/);if(Fe){z(d,O,Fe[1],A);continue}}return{spacing:o,colors:n,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:s,opacity:c,letterSpacing:u,lineHeight:d,spacingReverse:p,colorsReverse:m,fontSizeReverse:f,fontWeightReverse:g,borderRadiusReverse:b,borderWidthReverse:x,opacityReverse:R,letterSpacingReverse:$,lineHeightReverse:O}}var Is=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function Ds(e,t){let o={};for(let n of Is){let r=e[n]??{},i=t[n]??{};o[n]=new Map([...Object.entries(r),...Object.entries(i)])}return o}function bn(e,t){return t.get(e)??null}function Gr(e,t,o){let r=(o??At())[e],i=[];for(let[s,c]of r.entries()){let u=parseFloat(c);isNaN(u)||i.push({numericValue:u,token:s,cssValue:c})}let a=parseFloat(t);return isNaN(a)||i.some(c=>c.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((s,c)=>s.numericValue-c.numericValue),i}var Wr=null,$t=null;function Yr(e){Wr=e,$t=null}function At(){if($t!==null)return $t;let e=_s();return $t=Ds(e,Wr??{}),$t}var ie=null,Ht=[],st=0,Fs=5,bo=null,vo=null,xo=null,Co=null,wo=null,Eo=null;function jr(e){Eo=e}function vn(e){ie&&ie.readyState===WebSocket.OPEN||(wo=e,ie=new WebSocket(`ws://localhost:${e}`),ie.onopen=()=>{let t=st>0;st=0,t&&Co&&Co()},ie.onmessage=t=>{try{let o=JSON.parse(t.data);o.type==="tailwindTokens"&&Yr(o.tokens),o.type==="updatePropertyComplete"&&Eo&&Eo(o.success,o.errorCode,o.error),Ht.forEach(n=>n(o))}catch{}},ie.onclose=t=>{if(ie=null,t.code===4001){xo&&xo();return}if(st<Fs){let o=500*Math.pow(2,st);st++,bo=setTimeout(()=>vn(e),o)}else vo&&vo()},ie.onerror=()=>{})}function Ee(e){ie&&ie.readyState===WebSocket.OPEN&&ie.send(JSON.stringify(e))}function qe(e){return Ht.push(e),()=>{Ht=Ht.filter(t=>t!==e)}}function Ur(){bo&&clearTimeout(bo),ie&&(ie.close(),ie=null),Ht=[]}function Xr(e){vo=e}function Kr(e){xo=e}function qr(e){Co=e}function Zr(){wo&&(st=0,vn(wo))}j();var ct=null,K=null,_t=0,Cn=null,wn=null,Ze=null,So=null,lt=null,It=null,Mo=null,ni=null,zs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',oi='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',ko='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',Vs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',ei='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',Bs=`
  :host {
    all: initial;
  }
  ${Jr}
  .toolbar {
    position: fixed;
    bottom: 16px;
    left: 76px;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${M.md};
    font-family: ${w};
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
    border-radius: ${M.sm};
    color: white;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    font-family: ${w};
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
    left: 76px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    color: ${l.textPrimary};
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-family: ${w};
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
`;function ri(e){let t=document.createElement("div");t.id="frameup-root",document.body.appendChild(t),ct=t.attachShadow({mode:"open"});let o=document.createElement("style");o.textContent=Bs;let n=document.createElement("div");n.className="toolbar",n.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn eye-btn" title="Toggle originals (.)">
      ${oi}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${ko}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Generate</button>
    <button class="icon-btn close-btn" title="Close FrameUp">
      ${Vs}
    </button>
  `,ct.appendChild(o),ct.appendChild(n),K=n.querySelector(".undo-btn");let r=n.querySelector(".close-btn");Cn=n.querySelector(".generate-btn"),wn=n.querySelector(".eye-btn"),lt=n.querySelector(".component-detail"),Ze=document.createElement("div"),Ze.className="toast",ct.appendChild(Ze),K.addEventListener("click",()=>{Ee({type:"undo"}),K&&(K.innerHTML='<div class="spinner"></div>',K.disabled=!0)}),r.addEventListener("click",e),wn.addEventListener("click",()=>{It&&It()}),Cn.addEventListener("click",()=>{Mo&&Mo()}),document.addEventListener("keydown",i=>{i.key==="."&&(i.ctrlKey||i.metaKey)&&!ti()&&(It&&It(),i.preventDefault()),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!ti()&&ni?.()&&i.preventDefault()}),Xr(()=>{q("Disconnected. Click to reconnect."),Zr()}),Kr(()=>{q("Disconnected: another tab took over")}),qr(()=>{_t=0,K&&(K.disabled=!0)}),qe(i=>{switch(i.type){case"reorderComplete":i.success?(_t++,K&&(K.innerHTML=ei,setTimeout(()=>{K&&(K.innerHTML=ko,K.disabled=!1)},200))):i.error&&q(i.error);break;case"undoComplete":i.success?(_t=Math.max(0,_t-1),K&&(K.innerHTML=ei,setTimeout(()=>{K&&(K.innerHTML=ko,K.disabled=_t===0)},200))):i.error&&q(i.error);break;case"devServerDisconnected":q("Dev server disconnected");break;case"devServerReconnected":q("Dev server reconnected");break}})}function ii(){let e=document.getElementById("frameup-root");e&&e.remove(),ct=null,K=null}function U(){return ct}function ai(e){It=e}function si(e){Mo=e}function li(e){ni=e}function En(e){wn&&(wn.innerHTML=e?oi:zs)}function ci(e){Cn&&(Cn.disabled=!e)}function Oe(e){if(!lt)return;if(!e){lt.className="component-detail empty",lt.textContent="No selection";return}lt.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";lt.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function q(e){Ze&&(Ze.textContent=e,Ze.classList.add("visible"),So&&clearTimeout(So),So=setTimeout(()=>{Ze?.classList.remove("visible")},2e3))}function ti(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var No="0.5.32",Vt=`bippy-${No}`,di=Object.defineProperty,Gs=Object.prototype.hasOwnProperty,Dt=()=>{},pi=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},Sn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),mi=!1,ui,Ft=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>mi?!0:(e&&typeof e.inject=="function"&&(ui=e.inject.toString()),!!ui?.includes("(injected)")),Tn=new Set,Ve=new Set,Lo=e=>{let t=new Map,o=0,n={_instrumentationIsActive:!1,_instrumentationSource:Vt,checkDCE:pi,hasUnsupportedRendererAttached:!1,inject(r){let i=++o;return t.set(i,r),Ve.add(r),n._instrumentationIsActive||(n._instrumentationIsActive=!0,Tn.forEach(a=>a())),i},on:Dt,onCommitFiberRoot:Dt,onCommitFiberUnmount:Dt,onPostCommitFiberRoot:Dt,renderers:t,supportsFiber:!0,supportsFlight:!0};try{di(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return n},set(a){if(a&&typeof a=="object"){let s=n.renderers;n=a,s.size>0&&(s.forEach((c,u)=>{Ve.add(c),a.renderers.set(u,c)}),zt(e))}}});let r=window.hasOwnProperty,i=!1;di(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{zt(e)}return n},zt=e=>{e&&Tn.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=pi,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=Vt,t._instrumentationIsActive=!1;let o=Sn(t);if(o||(t.on=Dt),t.renderers.size){t._instrumentationIsActive=!0,Tn.forEach(i=>i());return}let n=t.inject,r=Ft(t);r&&!o&&(mi=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=n(i);return Ve.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,Tn.forEach(s=>s()),a}}(t.renderers.size||t._instrumentationIsActive||Ft())&&e?.()}catch{}},Ro=()=>Gs.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),dt=e=>Ro()?(zt(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Lo(e),Po=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),kn=()=>{try{Po()&&dt()}catch{}};kn();var Oo=0,$o=1;var Ao=5;var Ho=11,_o=13;var Io=15,Do=16;var Fo=19;var zo=26,Vo=27,Bo=28,Go=30;var $e=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};function Wo(e,t,o=!1){if(!e)return null;let n=t(e);if(n instanceof Promise)return(async()=>{if(await n===!0)return e;let i=o?e.return:e.child;for(;i;){let a=await jo(i,t,o);if(a)return a;i=o?null:i.sibling}return null})();if(n===!0)return e;let r=o?e.return:e.child;for(;r;){let i=Yo(r,t,o);if(i)return i;r=o?null:r.sibling}return null}var Yo=(e,t,o=!1)=>{if(!e)return null;if(t(e)===!0)return e;let n=o?e.return:e.child;for(;n;){let r=Yo(n,t,o);if(r)return r;n=o?null:n.sibling}return null},jo=async(e,t,o=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let n=o?e.return:e.child;for(;n;){let r=await jo(n,t,o);if(r)return r;n=o?null:n.sibling}return null};var Uo=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?Uo(t.type||t.render):null},ve=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let o=t.displayName||t.name||null;if(o)return o;let n=Uo(t);return n&&(n.displayName||n.name)||null};var Xo=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||Sn(e)||Ft(e)};var Ko=e=>{let t=dt(e.onActive);t._instrumentationSource=e.name??Vt;let o=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,s,c)=>{o!==i&&(o?.(a,s,c),e.onCommitFiberRoot?.(a,s,c))};t.onCommitFiberRoot=i}let n=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,s)=>{t.onCommitFiberUnmount===i&&(n?.(a,s),e.onCommitFiberUnmount?.(a,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,s)=>{t.onPostCommitFiberRoot===i&&(r?.(a,s),e.onPostCommitFiberRoot?.(a,s))};t.onPostCommitFiberRoot=i}return t},xe=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let o of t.renderers.values())try{let n=o.findFiberByHostInstance?.(e);if(n)return n}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let o in e)if(o.startsWith("__reactContainer$")||o.startsWith("__reactInternalInstance$")||o.startsWith("__reactFiber"))return e[o]||null}return null},Ws=Error();var fi=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Ys=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],js=["<anonymous>","eval",""],Ei=/\.(jsx|tsx|ts|js)$/,Us=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Xs=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,Ti="(at Server)",Ks=/(^|@)\S+:\d+/,Si=/^\s*at .*(\S+:\d+|\(native\))/m,qs=/^(eval@)?(\[native code\])?$/;var ki=(e,t)=>{if(t?.includeInElement!==!1){let o=e.split(`
`),n=[];for(let r of o)if(/^\s*at\s+/.test(r)){let i=gi(r,void 0)[0];i&&n.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");n.push({functionName:i,source:r})}else if(r.match(Ks)){let i=hi(r,void 0)[0];i&&n.push(i)}return Jo(n,t)}return e.match(Si)?gi(e,t):hi(e,t)},Mi=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,o=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return o?[o[1],o[2]||void 0,o[3]||void 0]:[t,void 0,void 0]},Jo=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e;var gi=(e,t)=>Jo(e.split(`
`).filter(o=>!!o.match(Si)),t).map(o=>{let n=o;n.includes("(eval ")&&(n=n.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=n.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=Mi(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:n}});var hi=(e,t)=>Jo(e.split(`
`).filter(o=>!o.match(qs)),t).map(o=>{let n=o;if(n.includes(" > eval")&&(n=n.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!n.includes("@")&&!n.includes(":"))return{functionName:n};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=n.match(r),a=i&&i[1]?i[1]:void 0,s=Mi(n.replace(r,""));return{functionName:a,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:n}}});var Zs=44,yi="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Js=new Uint8Array(64),Ni=new Uint8Array(128);for(let e=0;e<yi.length;e++){let t=yi.charCodeAt(e);Js[e]=t,Ni[t]=e}function Bt(e,t){let o=0,n=0,r=0;do r=Ni[e.next()],o|=(r&31)<<n,n+=5;while(r&32);let i=o&1;return o>>>=1,i&&(o=-2147483648|-o),t+o}function bi(e,t){return e.pos>=t?!1:e.peek()!==Zs}var Qs=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:o}=this,n=t.indexOf(e,o);return n===-1?t.length:n}};function Li(e){let{length:t}=e,o=new Qs(e),n=[],r=0,i=0,a=0,s=0,c=0;do{let u=o.indexOf(";"),d=[],p=!0,m=0;for(r=0;o.pos<u;){let f;r=Bt(o,r),r<m&&(p=!1),m=r,bi(o,u)?(i=Bt(o,i),a=Bt(o,a),s=Bt(o,s),bi(o,u)?(c=Bt(o,c),f=[r,i,a,s,c]):f=[r,i,a,s]):f=[r],d.push(f),o.pos++}p||el(d),n.push(d),o.pos=u+1}while(o.pos<=t);return n}function el(e){e.sort(tl)}function tl(e,t){return e[0]-t[0]}var Ri=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,nl=/^data:application\/json[^,]+base64,/,ol=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,Pi=typeof WeakRef<"u",Gt=new Map,Mn=new Map,rl=e=>Pi&&e instanceof WeakRef,vi=(e,t,o,n)=>{if(o<0||o>=e.length)return null;let r=e[o];if(!r||r.length===0)return null;let i=null;for(let d of r)if(d[0]<=n)i=d;else break;if(!i||i.length<4)return null;let[,a,s,c]=i;if(a===void 0||s===void 0||c===void 0)return null;let u=t[a];return u?{columnNumber:c,fileName:u,lineNumber:s+1}:null},il=(e,t,o)=>{if(e.sections){let n=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&o>=a.offset.column)n=a;else break;if(!n)return null;let r=t-n.offset.line,i=t===n.offset.line?o-n.offset.column:o;return vi(n.map.mappings,n.map.sources,r,i)}return vi(e.mappings,e.sources,t-1,o)},al=(e,t)=>{let o=t.split(`
`),n;for(let i=o.length-1;i>=0&&!n;i--){let a=o[i].match(ol);a&&(n=a[1]||a[2])}if(!n)return null;let r=Ri.test(n);if(!(nl.test(n)||r||n.startsWith("/"))){let i=e.split("/");i[i.length-1]=n,n=i.join("/")}return n},sl=e=>({file:e.file,mappings:Li(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),ll=e=>{let t=e.sections.map(({map:n,offset:r})=>({map:{...n,mappings:Li(n.mappings)},offset:r})),o=new Set;for(let n of t)for(let r of n.map.sources)o.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(o),sourcesContent:void 0,version:3}},xi=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let o=t.match(Ri);if(!o)return!0;let n=o[0].toLowerCase();return n==="http:"||n==="https:"},cl=async(e,t=fetch)=>{if(!xi(e))return null;let o;try{let r=await t(e);if(!r.ok)return null;o=await r.text()}catch{return null}if(!o)return null;let n=al(e,o);if(!n||!xi(n))return null;try{let r=await t(n);if(!r.ok)return null;let i=await r.json();return"sections"in i?ll(i):sl(i)}catch{return null}},dl=async(e,t=!0,o)=>{if(t&&Gt.has(e)){let i=Gt.get(e);if(i==null)return null;if(rl(i)){let a=i.deref();if(a)return a;Gt.delete(e)}else return i}if(t&&Mn.has(e))return Mn.get(e);let n=cl(e,o);t&&Mn.set(e,n);let r=await n;return t&&Mn.delete(e),t&&(r===null?Gt.set(e,null):Gt.set(e,Pi?new WeakRef(r):r)),r},ul=async(e,t=!0,o)=>await Promise.all(e.map(async n=>{if(!n.fileName)return n;let r=await dl(n.fileName,t,o);if(!r||typeof n.lineNumber!="number"||typeof n.columnNumber!="number")return n;let i=il(r,n.lineNumber,n.columnNumber);return i?{...n,source:i.fileName&&n.source?n.source.replace(n.fileName,i.fileName):n.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:n})),pl=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",ml=()=>{let e=dt();for(let t of[...Array.from(Ve),...Array.from(e.renderers.values())]){let o=t.currentDispatcherRef;if(o&&typeof o=="object")return"H"in o?o.H:o.current}return null},Ci=e=>{for(let t of Ve){let o=t.currentDispatcherRef;o&&typeof o=="object"&&("H"in o?o.H=e:o.current=e)}},Ae=e=>`
    in ${e}`,fl=(e,t)=>{let o=Ae(e);return t&&(o+=` (at ${t})`),o},qo=!1,Zo=(e,t)=>{if(!e||qo)return"";let o=Error.prepareStackTrace;Error.prepareStackTrace=void 0,qo=!0;let n=ml();Ci(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let d;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(m){d=m}Reflect.construct(e,[],p)}else{try{p.call()}catch(m){d=m}e.call(p.prototype)}}else{try{throw Error()}catch(m){d=m}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&d instanceof Error&&typeof p.stack=="string")return[p.stack,d.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,u]=s.DetermineComponentFrameRoot();if(c&&u){let d=c.split(`
`),p=u.split(`
`),m=0,f=0;for(;m<d.length&&!d[m].includes("DetermineComponentFrameRoot");)m++;for(;f<p.length&&!p[f].includes("DetermineComponentFrameRoot");)f++;if(m===d.length||f===p.length)for(m=d.length-1,f=p.length-1;m>=1&&f>=0&&d[m]!==p[f];)f--;for(;m>=1&&f>=0;m--,f--)if(d[m]!==p[f]){if(m!==1||f!==1)do if(m--,f--,f<0||d[m]!==p[f]){let g=`
${d[m].replace(" at new "," at ")}`,b=ve(e);return b&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",b)),g}while(m>=1&&f>=0);break}}}finally{qo=!1,Error.prepareStackTrace=o,Ci(n),console.error=r,console.warn=i}let a=e?ve(e):"";return a?Ae(a):""},gl=(e,t)=>{let o=e.tag,n="";switch(o){case Bo:n=Ae("Activity");break;case $o:n=Zo(e.type,!0);break;case Ho:n=Zo(e.type.render,!1);break;case Oo:case Io:n=Zo(e.type,!1);break;case Ao:case zo:case Vo:n=Ae(e.type);break;case Do:n=Ae("Lazy");break;case _o:n=e.child!==t&&t!==null?Ae("Suspense Fallback"):Ae("Suspense");break;case Fo:n=Ae("SuspenseList");break;case Go:n=Ae("ViewTransition");break;default:return""}return n},hl=e=>{try{let t="",o=e,n=null;do{t+=gl(o,n);let r=o._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=fl(a.name,a.env))}n=o,o=o.return}while(o);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},yl=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let o=e;if(!o)return"";Error.prepareStackTrace=t,o.startsWith(`Error: react-stack-top-frame
`)&&(o=o.slice(29));let n=o.indexOf(`
`);if(n!==-1&&(o=o.slice(n+1)),n=Math.max(o.indexOf("react_stack_bottom_frame"),o.indexOf("react-stack-bottom-frame")),n!==-1&&(n=o.lastIndexOf(`
`,n)),n!==-1)o=o.slice(0,n);else return"";return o},bl=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),vl=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,xl=e=>{let t=new Map;for(let o of e)for(let n of o.stackFrames){if(!bl(n))continue;let r=n.functionName,i=t.get(r)??[];i.some(a=>vl(a,n))||(i.push(n),t.set(r,i))}return t},Cl=(e,t,o)=>{if(!e.functionName)return{...e,isServer:!0};let n=t.get(e.functionName);if(!n||n.length===0)return{...e,isServer:!0};let r=o.get(e.functionName)??0,i=n[r%n.length];return o.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(Ti,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},wl=e=>{let t=[];return Wo(e,o=>{if(!pl(o))return;let n=typeof o.type=="string"?o.type:ve(o.type)||"<anonymous>";t.push({componentName:n,stackFrames:ki(yl(o._debugStack?.stack))})},!0),t},ut=async(e,t=!0,o)=>{let n=wl(e),r=ki(hl(e)),i=xl(n),a=new Map;return ul(r.map(s=>s.source?.includes(Ti)??!1?Cl(s,i,a):s).filter((s,c,u)=>{if(c===0)return!0;let d=u[c-1];return s.functionName!==d.functionName}),t,o)};var wi=e=>e.split("/").filter(Boolean).length,El=e=>e.split("/").filter(Boolean)[0]??null,Tl=e=>{let t=e.indexOf("/",1);if(t===-1||wi(e.slice(0,t))!==1)return e;let o=e.slice(t);if(!Ei.test(o)||wi(o)<2)return e;let n=El(o);return!n||n.startsWith("@")||n.length>4?e:o},Je=e=>{if(!e||js.some(i=>i===e))return"";let t=e,o=t.startsWith("http://")||t.startsWith("https://");if(o)try{t=new URL(t).pathname}catch{}if(o&&(t=Tl(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),s=i.indexOf(":");t=a!==-1&&(s===-1||a<s)?i.slice(a+1):i}let n=!0;for(;n;){n=!1;for(let i of Ys)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),n=!0;break}}if(fi.test(t)){let i=t.match(fi);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Xs.test(i)&&(t=t.slice(0,r))}return t},pt=e=>{let t=Je(e);return!(!t||!Ei.test(t)||Us.test(t))};var Sl=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);function mt(e){return!!(Sl.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function kl(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let o=e.getBoundingClientRect(),n=window.innerWidth,r=window.innerHeight;return o.width>=n*.9&&o.height>=r*.9}var Ml=50,Nn=.9,Nl=2147483600,Ll=1e3,Wt=new WeakMap;function Qo(){Wt=new WeakMap}function Rl(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function Pl(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=Nl}function Ol(e,t){let o=t.position;if(o!=="fixed"&&o!=="absolute")return!1;let n=e.getBoundingClientRect();if(n.width/window.innerWidth<Nn||n.height/window.innerHeight<Nn)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>Ll}function Yt(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&kl(e)||e.closest("#frameup-root")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-ghost"))return!1;let o=performance.now(),n=Wt.get(e);if(n&&o-n.timestamp<Ml)return n.isValid;let r=window.getComputedStyle(e);return Rl(e,r)?e.clientWidth/window.innerWidth>=Nn&&e.clientHeight/window.innerHeight>=Nn&&(Pl(r)||Ol(e,r))?(Wt.set(e,{isValid:!1,timestamp:o}),!1):(Wt.set(e,{isValid:!0,timestamp:o}),!0):(Wt.set(e,{isValid:!1,timestamp:o}),!1)}var $l=.75,Oi=32,Ln=3,Rn=20,$i=100,me=1;function ft(e,t,o){return Math.min(o,Math.max(t,e))}function Al(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,o=window.innerHeight,{x:n,y:r}=e,i=n+e.width,a=r+e.height,s=n+e.width/2,c=r+e.height/2,u=ft(Math.ceil(e.width/Oi),Ln,Rn),d=ft(Math.ceil(e.height/Oi),Ln,Rn);if(u*d>$i){let g=Math.sqrt($i/(u*d));u=ft(Math.floor(u*g),Ln,Rn),d=ft(Math.floor(d*g),Ln,Rn)}let p=new Set,m=[],f=(g,b)=>{let x=ft(Math.round(g),0,t-1),R=ft(Math.round(b),0,o-1),$=`${x}:${R}`;p.has($)||(p.add($),m.push({x,y:R}))};f(n+me,r+me),f(i-me,r+me),f(n+me,a-me),f(i-me,a-me),f(s,r+me),f(s,a-me),f(n+me,c),f(i-me,c),f(s,c);for(let g=0;g<u;g++){let b=n+(g+.5)/u*e.width;for(let x=0;x<d;x++)f(b,r+(x+.5)/d*e.height)}return m}function Ai(e,t=Yt,o=!0){let n={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=Al(e);for(let c of i)for(let u of document.elementsFromPoint(c.x,c.y))r.add(u);let a=[];for(let c of r){if(!t(c))continue;let u=c.getBoundingClientRect();if(u.width<=0||u.height<=0)continue;let d={left:u.left,top:u.top,right:u.left+u.width,bottom:u.top+u.height};if(o){let p=Math.max(n.left,d.left),m=Math.max(n.top,d.top),f=Math.min(n.right,d.right),g=Math.min(n.bottom,d.bottom),b=Math.max(0,f-p)*Math.max(0,g-m),x=u.width*u.height;x>0&&b/x>=$l&&a.push(c)}else n.left<d.right&&n.right>d.left&&n.top<d.bottom&&n.bottom>d.top&&a.push(c)}let s=a.filter(c=>!a.some(u=>u!==c&&u.contains(c)));return s.sort((c,u)=>{let d=c.compareDocumentPosition(u);return d&Node.DOCUMENT_POSITION_FOLLOWING?-1:d&Node.DOCUMENT_POSITION_PRECEDING?1:0}),s}j();function gt(e,t,o){return e+(t-e)*o}j();var Hl=.35,Hi=.3,Pn=.5,_l=2,ne=null,G=null,er=0,tr=0,Ut=1,ht=null,J=null,_=null,V=[],jt=l.accent,Il="rgba(162,89,255,0.08)",_i="rgba(162,89,255,0.15)",Dl=4,Ii=10,Fl="#ffffff",zl=jt,Vl=1.5,rr=!0;function Fi(){let e=U();e&&(ne=document.createElement("canvas"),ne.setAttribute("data-frameup-ghost","true"),ne.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(ne),ir(),window.addEventListener("resize",ir))}function Xt(e,t=4){if(!e){J&&(J.targetOpacity=0,Qe());return}let o={x:e.left,y:e.top,w:e.width,h:e.height};!J||!J.initialized?J=sr(o,t):(J.target=o,J.borderRadius=t,J.targetOpacity=1),Qe()}function et(e,t=4){if(!e){_&&(_.targetOpacity=0,Qe());return}let o={x:e.left,y:e.top,w:e.width,h:e.height};!_||!_.initialized?_=sr(o,t):(_.target=o,_.borderRadius=t,_.targetOpacity=1),Qe()}function zi(e){for(_=null;V.length>e.length;)V.pop();for(let t=0;t<e.length;t++){let o=e[t],n={x:o.rect.left,y:o.rect.top,w:o.rect.width,h:o.rect.height};t<V.length?(V[t].target=n,V[t].borderRadius=o.borderRadius,V[t].targetOpacity=1):V.push(sr(n,o.borderRadius))}Qe()}function Kt(){V=[],Qe()}function ar(e,t){if(!rr)return null;let o=Gi();if(!o)return null;let n=ji(o.x,o.y,o.w,o.h);for(let r of n){let i=e-r.x,a=t-r.y;if(i*i+a*a<=Ii*Ii)return r.corner}return null}function Vi(){return Gi()}function Bi(){ht!==null&&cancelAnimationFrame(ht),window.removeEventListener("resize",ir),ne?.remove(),ne=null,G=null,J=null,_=null,V=[]}function Gi(){if(V.length>1)return Wi(V);if(_&&_.opacity>=.5){let{x:e,y:t,w:o,h:n}=_.current;return{x:e,y:t,w:o,h:n}}if(V.length===1){let{x:e,y:t,w:o,h:n}=V[0].current;return{x:e,y:t,w:o,h:n}}return null}function Wi(e){if(e.length===0)return null;let t=1/0,o=1/0,n=-1/0,r=-1/0;for(let i of e){let{x:a,y:s,w:c,h:u}=i.current;a<t&&(t=a),s<o&&(o=s),a+c>n&&(n=a+c),s+u>r&&(r=s+u)}return{x:t,y:o,w:n-t,h:r-o}}function sr(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function ir(){ne&&(Ut=Math.max(window.devicePixelRatio||1,_l),er=window.innerWidth,tr=window.innerHeight,ne.width=er*Ut,ne.height=tr*Ut,ne.style.width=`${er}px`,ne.style.height=`${tr}px`,G=ne.getContext("2d"),Qe())}function Qe(){ht===null&&(ht=requestAnimationFrame(Yi))}function Yi(){if(ht=null,!G||!ne)return;let e=!1;J?.initialized&&(nr(J,Hl)&&(e=!0),J.opacity<.01&&J.targetOpacity===0&&(J=null)),_?.initialized&&(nr(_,Hi)&&(e=!0),_.opacity<.01&&_.targetOpacity===0&&(_=null));for(let t=V.length-1;t>=0;t--){let o=V[t];o.initialized&&nr(o,Hi)&&(e=!0),o.opacity<.01&&o.targetOpacity===0&&V.splice(t,1)}if(G.setTransform(1,0,0,1,0,0),G.clearRect(0,0,ne.width,ne.height),G.setTransform(Ut,0,0,Ut,0,0),J&&or(G,J,jt,Il),_&&(or(G,_,jt,_i),rr&&Di(G,_.current,_.opacity)),V.length>0){for(let t of V)or(G,t,jt,_i);if(rr&&V.length>0){let t=Wi(V);t&&t.w>=24&&t.h>=24&&(V.length>1&&(G.globalAlpha=.6,G.beginPath(),G.rect(t.x,t.y,t.w,t.h),G.strokeStyle=jt,G.lineWidth=1,G.setLineDash([4,4]),G.stroke(),G.setLineDash([]),G.globalAlpha=1),Di(G,t,1))}}e&&(ht=requestAnimationFrame(Yi))}function nr(e,t){let o=e.current,n=e.target,r=gt(o.x,n.x,t),i=gt(o.y,n.y,t),a=gt(o.w,n.w,t),s=gt(o.h,n.h,t),c=gt(e.opacity,e.targetOpacity,t);return Math.abs(r-n.x)<Pn&&Math.abs(i-n.y)<Pn&&Math.abs(a-n.w)<Pn&&Math.abs(s-n.h)<Pn&&Math.abs(c-e.targetOpacity)<.01?(o.x=n.x,o.y=n.y,o.w=n.w,o.h=n.h,e.opacity=e.targetOpacity,!1):(o.x=r,o.y=i,o.w=a,o.h=s,e.opacity=c,!0)}function or(e,t,o,n){let{x:r,y:i,w:a,h:s}=t.current;if(a<=0||s<=0)return;let c=Math.min(t.borderRadius,a/2,s/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,a,s,c):e.rect(r,i,a,s),e.fillStyle=n,e.fill(),e.strokeStyle=o,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function ji(e,t,o,n){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+o,y:t},{corner:"br",x:e+o,y:t+n},{corner:"bl",x:e,y:t+n}]}function Di(e,t,o){if(t.w<24||t.h<24)return;e.globalAlpha=o;let n=ji(t.x,t.y,t.w,t.h);for(let r of n)e.beginPath(),e.arc(r.x,r.y,Dl,0,Math.PI*2),e.fillStyle=Fl,e.fill(),e.strokeStyle=zl,e.lineWidth=Vl,e.stroke();e.globalAlpha=1}var Bl=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],Gl=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],Wl=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],Yl=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],jl=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],yt=[...Bl,...Gl,...Wl,...Yl,...jl];j();var Ul=new Set(["auto","none","normal","inherit","initial"]);function Ui(e,t,o,n){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let s=document.createElement("input");s.type="text",s.className="prop-input",s.style.cssText="width:60px; cursor:text;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${w};`,a.appendChild(s),a.appendChild(c);let u=new Map(t);function d(){return u.get(r.key)??r.defaultValue}function p(m){let f=parseFloat(m);s.value=isNaN(f)?m:String(f);try{let b=Gr(i,m).find(x=>x.cssValue===m);b?.token?c.textContent=`${r.tailwindPrefix}-${b.token}`:c.textContent=""}catch{c.textContent=""}}return s.addEventListener("blur",()=>{let m=s.value.trim(),f=parseFloat(m);if(isNaN(f))Ul.has(m)?(u.set(r.key,m),p(m),o(r.key,m),n()):p(d());else{let b=m.match(/(px|rem|em|%|vw|vh|ch)$/)?m:`${f}px`;u.set(r.key,b),p(b),o(r.key,b),n()}}),s.addEventListener("keydown",m=>{m.key==="Enter"?s.blur():m.key==="Escape"&&(p(d()),s.blur())}),p(d()),{element:a,setValue(m,f){m===r.key&&(u.set(m,f),p(f))},destroy(){}}}j();function Xi(e,t,o,n){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${l.bgTertiary};
    border-radius:${M.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let s=t.get(r.key)??r.defaultValue,c=[];function u(d){s=d;for(let{btn:p,value:m,opt:f}of c){let g=m===d;p.style.background=g?l.accent:"transparent",p.style.color=g?l.textOnAccent:l.textSecondary,p.title=g&&f.tailwindValue?`${f.label} (${f.tailwindValue})`:f.label}}for(let d of i){let p=document.createElement("button");p.style.cssText=`
      display:flex;
      align-items:center;
      justify-content:center;
      padding:2px 6px;
      border:none;
      border-radius:${M.xs};
      font-family:${w};
      font-size:10px;
      cursor:pointer;
      background:transparent;
      color:${l.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g," "),p.textContent=d.icon??d.label,p.title=d.label,p.addEventListener("click",()=>{u(d.value),o(r.key,d.value),n()}),c.push({btn:p,value:d.value,opt:d}),a.appendChild(p)}return u(s),{element:a,setValue(d,p){d===r.key&&u(p)},destroy(){}}}j();j();function On(e){let t=parseInt(e.slice(1,3),16)/255,o=parseInt(e.slice(3,5),16)/255,n=parseInt(e.slice(5,7),16)/255,r=Math.max(t,o,n),i=Math.min(t,o,n),a=r-i,s=0;a!==0&&(r===t?s=((o-n)/a+(o<n?6:0))*60:r===o?s=((n-t)/a+2)*60:s=((t-o)/a+4)*60);let c=r===0?0:a/r*100,u=r*100;return{h:s,s:c,v:u}}function $n(e){let t=e.h/360,o=e.s/100,n=e.v/100,r=Math.floor(t*6),i=t*6-r,a=n*(1-o),s=n*(1-i*o),c=n*(1-(1-i)*o),u,d,p;switch(r%6){case 0:u=n,d=c,p=a;break;case 1:u=s,d=n,p=a;break;case 2:u=a,d=n,p=c;break;case 3:u=a,d=s,p=n;break;case 4:u=c,d=a,p=n;break;case 5:u=n,d=a,p=s;break;default:u=0,d=0,p=0}let m=f=>Math.round(f*255).toString(16).padStart(2,"0");return`#${m(u)}${m(d)}${m(p)}`}var Be=null;function qt(e){bt();let t=U();if(!t)return;let o=document.createElement("div");o.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${L.lg};
    border-radius: ${M.md};
    font-family: ${w};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${k.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let y=o.getBoundingClientRect();y.right>window.innerWidth-8&&(o.style.left=`${window.innerWidth-y.width-8}px`),y.bottom>window.innerHeight-8&&(o.style.top=`${window.innerHeight-y.height-8}px`),o.style.opacity="1"});let n=On(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let y=Xl(["Fill","Text"],0,S=>{r=S===0?"backgroundColor":"color",e.onPropertyChange?.(r)});o.appendChild(y)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),s=document.createElement("div");s.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${L.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(s),o.appendChild(c);function u(){let y=n.h,S=a.createLinearGradient(0,0,176,0);S.addColorStop(0,`hsl(${y}, 0%, 100%)`),S.addColorStop(1,`hsl(${y}, 100%, 50%)`),a.fillStyle=S,a.fillRect(0,0,176,120);let Y=a.createLinearGradient(0,0,0,120);Y.addColorStop(0,"rgba(0,0,0,0)"),Y.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=Y,a.fillRect(0,0,176,120);let ce=n.s/100*176,Fe=(1-n.v/100)*120;s.style.left=`${ce}px`,s.style.top=`${Fe}px`}let d=!1;i.addEventListener("mousedown",y=>{d=!0,p(y)});function p(y){let S=i.getBoundingClientRect(),Y=Math.max(0,Math.min(176,y.clientX-S.left)),ce=Math.max(0,Math.min(120,y.clientY-S.top));n.s=Y/176*100,n.v=(1-ce/120)*100,u(),A()}let m=document.createElement("canvas");m.width=176,m.height=14,m.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let f=m.getContext("2d"),g=document.createElement("div");g.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${L.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let b=document.createElement("div");b.style.cssText="position:relative;width:176px;height:14px;",b.appendChild(m),b.appendChild(g),o.appendChild(b);function x(){let y=f.createLinearGradient(0,0,176,0);for(let S=0;S<=6;S++)y.addColorStop(S/6,`hsl(${S*60}, 100%, 50%)`);f.fillStyle=y,f.fillRect(0,0,176,14),g.style.left=`${n.h/360*176}px`}let R=!1;m.addEventListener("mousedown",y=>{R=!0,$(y)});function $(y){let S=m.getBoundingClientRect(),Y=Math.max(0,Math.min(176,y.clientX-S.left));n.h=Y/176*360,x(),u(),A()}let O=document.createElement("input");O.type="text",O.value=$n(n),O.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: ${M.sm};
    color: ${l.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,O.addEventListener("keydown",y=>{y.key==="Enter"&&O.blur(),y.stopPropagation()}),O.addEventListener("blur",()=>{let y=O.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(y)){let S=y.startsWith("#")?y:`#${y}`;n=On(S),u(),x(),A()}else O.value=$n(n)}),o.appendChild(O);let z=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],C=document.createElement("div");C.style.cssText="display:flex;gap:4px;justify-content:center;";for(let y of z){let S=document.createElement("button");S.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${y};
      border: 1px solid ${l.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${k.fast};
    `,S.addEventListener("mouseenter",()=>{S.style.boxShadow=L.sm}),S.addEventListener("mouseleave",()=>{S.style.boxShadow="none"}),S.addEventListener("click",()=>{n=On(y),u(),x(),O.value=y,A()}),C.appendChild(S)}o.appendChild(C);function A(){let y=$n(n);O.value=y,e.onColorChange(y)}t.appendChild(o),Be=o,u(),x();let oe=y=>{d&&p(y),R&&$(y)},re=()=>{d=!1,R=!1};document.addEventListener("mousemove",oe),document.addEventListener("mouseup",re);let N=y=>{y.key==="Escape"&&bt()};document.addEventListener("keydown",N,!0);let B=y=>{Be&&!y.composedPath().includes(Be)&&bt()};setTimeout(()=>document.addEventListener("mousedown",B,!0),0),o._cleanup=()=>{document.removeEventListener("mousemove",oe),document.removeEventListener("mouseup",re),document.removeEventListener("keydown",N,!0),document.removeEventListener("mousedown",B,!0)},o._onClose=e.onClose}function bt(){Be&&(Be._cleanup?.(),Be._onClose?.(),Be.remove(),Be=null)}function Xl(e,t,o){let n=document.createElement("div");n.style.cssText=`
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
      font-family: ${w}; font-size: 12px; cursor: pointer;
      transition: background ${k.fast}, color ${k.fast};
    `,a.addEventListener("click",()=>{r.forEach((s,c)=>{s.style.background=c===i?l.bgPrimary:"transparent",s.style.boxShadow=c===i?L.sm:"none",s.style.color=c===i?l.textPrimary:l.textSecondary}),o(i)}),r.push(a),n.appendChild(a)}return n}var lr=null;function Kl(){return lr||(lr=document.createElement("canvas").getContext("2d")),lr}function Ki(e,t,o,n){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${M.sm};
    border:1px solid ${l.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("input");s.type="text",s.placeholder="#rrggbb",s.className="prop-input",s.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${w};`,i.appendChild(a),i.appendChild(s),i.appendChild(c);let u=t.get(r.key)??r.defaultValue,d=!1;function p(g){let b=g.trim().toLowerCase();if(b==="transparent")return"transparent";if(b==="inherit"||b==="currentcolor"||b==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(b))return b;let x=Kl();x.fillStyle="#000000",x.fillStyle=b;let R=x.fillStyle;if(R.startsWith("#"))return R;let $=R.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if($){let O=parseInt($[1],10),z=parseInt($[2],10),C=parseInt($[3],10);return`#${((1<<24)+(O<<16)+(z<<8)+C).toString(16).slice(1)}`}return"#000000"}function m(g){u=g,s.value=g,g==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=g;try{let b=At(),x=bn(g,b.colorsReverse);x?c.textContent=`${r.tailwindPrefix??"bg"}-${x}`:c.textContent=""}catch{c.textContent=""}}function f(){if(d)return;let g=s.value.trim();if(!g){m(u);return}let b=p(g);m(b),o(r.key,b),n()}return a.addEventListener("click",()=>{if(d){bt(),d=!1;return}let g=a.getBoundingClientRect();d=!0,qt({initialColor:p(u),position:{x:g.left-210,y:g.top},showPropertyToggle:!1,onColorChange:b=>{m(b),o(r.key,b)},onClose:()=>{d=!1,n()}})}),s.addEventListener("keydown",g=>{g.key==="Enter"?(f(),s.blur()):g.key==="Escape"&&(m(u),s.blur())}),s.addEventListener("blur",()=>{f()}),s.addEventListener("input",()=>{let g=s.value.trim(),b=p(g);a.style.background=b}),m(u),{element:i,setValue(g,b){g===r.key&&m(b)},destroy(){d&&(bt(),d=!1)}}}j();function qi(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function Zi(e,t,o,n){let r=new Map(t),i=[];for(let T of e){let E=qi(T.key);E&&i.push({descriptor:T,...E})}let a=document.createElement("div");a.style.cssText=`
    display:flex;
    flex-direction:column;
    gap:4px;
    font-family:${w};
    font-size:10px;
    color:${l.textSecondary};
    position:relative;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("div");s.style.cssText="position:relative; padding:4px;";let c=document.createElement("div");c.style.cssText=`
    background:${l.marginBoxBg};
    border:1px dashed ${l.marginBoxBorder};
    border-radius:${M.sm};
    padding:10px;
    position:relative;
  `.trim().replace(/\n\s*/g," ");let u=document.createElement("div");u.style.cssText=`
    background:${l.paddingBoxBg};
    border:1px dashed ${l.paddingBoxBorder};
    border-radius:${M.sm};
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
  `.trim().replace(/\n\s*/g," "),d.textContent="content";let p=[];function m(T){let E=document.createElement("span"),de=r.get(T.key)??T.defaultValue;return E.textContent=$(de),E.title=T.label,E.style.cssText=`
      cursor:pointer;
      color:${l.textPrimary};
      font-size:10px;
      font-family:${w};
      padding:1px 4px;
      border-radius:3px;
      text-align:center;
      transition:background 100ms ease;
      display:inline-block;
      min-width:18px;
    `.trim().replace(/\n\s*/g," "),E.addEventListener("mouseenter",()=>{E.style.background=l.bgTertiary}),E.addEventListener("mouseleave",()=>{(document.activeElement!==f||f.dataset.key!==T.key)&&(E.style.background="transparent")}),E.addEventListener("click",()=>{x(T,E)}),p.push({key:T.key,span:E,descriptor:T}),E}let f=document.createElement("input");f.type="text",f.className="prop-input",f.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(f);let g=null,b=null;function x(T,E){g&&g!==T&&R(),g=T,b=E,f.dataset.key=T.key;let de=r.get(T.key)??T.defaultValue;f.value=$(de);let Z=0,Ke=0,ze=E;for(;ze&&ze!==a;)Z+=ze.offsetLeft,Ke+=ze.offsetTop,ze=ze.offsetParent;f.style.display="block",f.style.left=`${Z}px`,f.style.top=`${Ke}px`;let Br=E.getBoundingClientRect();f.style.width=`${Math.max(40,Br.width+10)}px`,f.focus(),f.select()}function R(){if(!g||!b)return;let T=f.value.trim(),E=g,de=b,Z,Ke=parseFloat(T),ze=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(Ke)?ze.has(T)?Z=T:Z=r.get(E.key)??E.defaultValue:Z=T.match(/(px|rem|em|%|vw|vh|ch)$/)?T:`${Ke}px`,r.set(E.key,Z),de.textContent=$(Z),de.style.background="transparent",f.style.display="none",f.dataset.key="",g=null,b=null,o(E.key,Z),n()}f.addEventListener("keydown",T=>{if(T.key==="Enter")R();else if(T.key==="Escape"){if(g&&b){let E=r.get(g.key)??g.defaultValue;b.textContent=$(E)}f.style.display="none",f.dataset.key="",g=null,b=null}}),f.addEventListener("blur",()=>{R()});function $(T){let E=parseFloat(T);return isNaN(E)?T:E===Math.round(E)?String(Math.round(E)):T}function O(T){let E=document.createElement("span");return E.textContent=T,E.style.cssText=`
      font-size:9px;
      color:${l.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),E}function z(T,E){return i.find(de=>de.layer===T&&de.side===E)}function C(T,E){let de=z(T,E);if(!de){let Z=document.createElement("span");return Z.textContent="-",Z.style.cssText=`text-align:center; color:${l.textTertiary};`,Z}return m(de.descriptor)}let A=C("padding","top");A.style.gridRow="1",A.style.gridColumn="2",A.style.textAlign="center";let oe=C("padding","left");oe.style.gridRow="2",oe.style.gridColumn="1";let re=C("padding","right");re.style.gridRow="2",re.style.gridColumn="3";let N=C("padding","bottom");N.style.gridRow="3",N.style.gridColumn="2",N.style.textAlign="center",d.style.gridRow="2",d.style.gridColumn="2",u.appendChild(A),u.appendChild(oe),u.appendChild(d),u.appendChild(re),u.appendChild(N);let B=document.createElement("div");B.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let y=C("margin","top");y.style.gridRow="1",y.style.gridColumn="2",y.style.textAlign="center";let S=C("margin","left");S.style.gridRow="2",S.style.gridColumn="1";let Y=C("margin","right");Y.style.gridRow="2",Y.style.gridColumn="3";let ce=C("margin","bottom");ce.style.gridRow="3",ce.style.gridColumn="2",ce.style.textAlign="center";let Fe=document.createElement("div");Fe.style.cssText="grid-row:2; grid-column:2;",Fe.appendChild(u),B.appendChild(y),B.appendChild(S),B.appendChild(Fe),B.appendChild(Y),B.appendChild(ce);let hn=O("margin"),Os=O("padding"),yn=document.createElement("div");return yn.style.cssText="display:flex; gap:8px; padding:0 4px;",yn.appendChild(hn),yn.appendChild(Os),c.appendChild(B),s.appendChild(c),a.appendChild(yn),a.appendChild(s),{element:a,setValue(T,E){if(!qi(T))return;r.set(T,E);let Z=p.find(Ke=>Ke.key===T);Z&&(Z.span.textContent=$(E))},destroy(){}}}j();var An=new Set;function Ji(e){return An.has(e)}var Hn=[];function Qi(e){return Hn.push(e),()=>{let t=Hn.indexOf(e);t>=0&&Hn.splice(t,1)}}var ql={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},Zl={"number-scrub":Ui,segmented:Xi,"color-swatch":Ki,"box-model":Zi},Jl=`
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
    font-family: ${w};
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
    border-radius: ${M.xs};
    padding: 4px 6px;
    font-family: ${w};
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
    font-family: ${w};
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
`;function Ql(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function ec(e){let t=new Map;for(let o of e){let n=t.get(o.group);n||(n=[],t.set(o.group,n)),n.push(o)}return t}function tc(e){let t=[],o=new Map;for(let n of e)if(n.compound&&n.compoundGroup){let r=o.get(n.compoundGroup);r||(r=[],o.set(n.compoundGroup,r)),r.push(n)}else t.push({controlType:n.controlType,descriptors:[n]});for(let[,n]of o)t.push({controlType:n[0].controlType,descriptors:n});return t}var nc=new Set(["flexDirection","justifyContent","alignItems","gap"]);function oc(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function cr(e,t,o,n){let r=document.createElement("div");r.className="prop-sections";let i=document.createElement("style");i.textContent=Jl,r.appendChild(i);let a=[],s=ec(e);for(let[c,u]of s){let d=c==="layout"&&!oc(t)?u.filter(x=>!nc.has(x.key)):u;if(d.length===0)continue;let p=document.createElement("div");p.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${ql[c]}</span>${Ql()}`;let f=document.createElement("div");f.className="prop-section-body";let g=An.has(c);if(g){let x=m.querySelector(".prop-section-chevron");x&&x.classList.add("collapsed"),f.classList.add("collapsed")}m.addEventListener("click",()=>{if(g=!g,g)An.add(c);else{An.delete(c);for(let R of Hn)R(c)}let x=m.querySelector(".prop-section-chevron");x&&x.classList.toggle("collapsed",g),f.classList.toggle("collapsed",g)}),p.appendChild(m);let b=tc(d);for(let x of b){let R=Zl[x.controlType];if(!R)continue;let $=R(x.descriptors,t,o,n);if(x.descriptors.length>1||x.controlType==="box-model")f.appendChild($.element);else{let O=document.createElement("div");O.className="prop-control-row";let z=document.createElement("span");z.className="prop-control-label",z.textContent=x.descriptors[0].label,z.title=x.descriptors[0].label;let C=document.createElement("div");C.className="prop-control-value",C.appendChild($.element),O.appendChild(z),O.appendChild(C),f.appendChild(O)}a.push($)}p.appendChild(f),r.appendChild(p)}return{container:r,controls:a}}j();var rc=300,ea=260,ta=380,na="frameup-sidebar-width",ic=4,ac=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${l.bgPrimary};
    border-left: 1px solid ${l.border};
    box-shadow: ${L.lg};
    z-index: 2147483645;
    font-family: ${w};
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
    width: ${ic}px;
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
    border-radius: ${M.sm};
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
    font-family: ${w};
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
    font-family: ${w};
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: ${M.xs};
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
`;function sc(){try{let e=localStorage.getItem(na);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=ea&&t<=ta)return t}}catch{}return Math.min(rc,Math.floor(window.innerWidth*.22))}function lc(e){try{localStorage.setItem(na,String(e))}catch{}}function oa(e,t){let o=document.createElement("style");o.textContent=ac,e.appendChild(o);let n=document.createElement("div");n.className="prop-sidebar",n.style.width=`${sc()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",n.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let s=document.createElement("div");s.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let u=document.createElement("div");u.className="prop-sidebar-file-path",a.appendChild(s),a.appendChild(u);let d=document.createElement("button");d.className="prop-sidebar-close",d.title="Close panel",d.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>',i.appendChild(a),i.appendChild(d),n.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",n.appendChild(p);let m=document.createElement("div");m.className="prop-sidebar-content",n.appendChild(m),e.appendChild(n);let f=!1,g=0,b=0;r.addEventListener("pointerdown",N=>{N.preventDefault(),N.stopPropagation(),f=!0,g=N.clientX,b=n.offsetWidth,r.classList.add("active"),r.setPointerCapture(N.pointerId)}),r.addEventListener("pointermove",N=>{if(!f)return;let B=g-N.clientX,y=Math.max(ea,Math.min(ta,b+B));n.style.width=`${y}px`});let x=()=>{f&&(f=!1,r.classList.remove("active"),lc(n.offsetWidth))};r.addEventListener("pointerup",x),r.addEventListener("pointercancel",x),n.addEventListener("pointerdown",N=>N.stopPropagation()),n.addEventListener("mousedown",N=>N.stopPropagation()),n.addEventListener("click",N=>N.stopPropagation()),n.addEventListener("mouseup",N=>N.stopPropagation()),d.addEventListener("click",()=>{O(),t&&t()});let R=!1;function $(N,B,y,S){s.textContent=`<${N}>`,s.appendChild(c),u.textContent=`${B}:${y}`,u.title=`${B}:${y}`,m.innerHTML="",m.appendChild(S),R||(R=!0,n.offsetHeight,n.classList.add("visible"))}function O(){R&&(R=!1,n.classList.remove("visible"))}function z(N){m.innerHTML="",m.appendChild(N)}function C(N,B,y){p.innerHTML="";let S=document.createElement("span");S.className="prop-sidebar-warning-text",S.textContent=N;let Y=document.createElement("button");Y.className="prop-sidebar-warning-btn",Y.textContent=B,Y.addEventListener("click",ce=>{ce.stopPropagation(),y()}),p.appendChild(S),p.appendChild(Y),p.style.display="flex"}function A(){p.style.display="none",p.innerHTML=""}function oe(){c.classList.add("active")}function re(){c.classList.remove("active")}return{show:$,hide:O,isVisible:()=>R,getElement:()=>n,replaceContent:z,showWarning:C,clearWarning:A,showSaving:oe,hideSaving:re}}he();var gr=new Map(yt.map(e=>[e.key,e]));var dc=new Set(["layout","spacing","size"]),xa=new Set(["typography","background"]),uc=5e3,h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map},tt=[],I,Ca,ue=null,pc=300,ye=null,vt=null,Yn=new MutationObserver(()=>{h.selectedElement&&!document.contains(h.selectedElement)&&(clearTimeout(Ca),Ca=setTimeout(()=>{mc()},80))});function mc(){let e=h.elementIdentity,t=h.componentInfo;if(!e||!t){Ct();return}let o=fc(e);if(o){xt(o,t);return}gc(e).then(n=>{n?xt(n,t):Ct()})}function fc(e){let t=document.querySelectorAll(e.tagName);for(let o of t)if(o instanceof HTMLElement)try{let n=xe(o);for(;n;){if($e(n)){let r=n._debugSource,i=ve(n);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return o}n=n.return}}catch{}return null}async function gc(e){let t=document.querySelectorAll(e.tagName);for(let o of t)if(o instanceof HTMLElement)try{let n=xe(o);if(!n)continue;let r=await ut(n);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let s="";if(i.fileName){let c=Je(i.fileName);pt(c)&&(s=c)}if(s&&e.filePath.endsWith(s)&&(i.lineNumber??0)===e.lineNumber)return o}}catch{}return null}function hc(e,t){let o=getComputedStyle(e),n=new Map;for(let r of yt){if(t&&!t.has(r.group)){n.set(r.key,r.defaultValue);continue}let i=o.getPropertyValue(r.cssProperty).trim();n.set(r.key,i||r.defaultValue)}return n}function yc(e){if(!h.selectedElement)return;let t=getComputedStyle(h.selectedElement);for(let o of yt){if(o.group!==e||h.activeOverrides.has(o.key))continue;let r=t.getPropertyValue(o.cssProperty).trim()||o.defaultValue;h.currentValues.set(o.key,r),h.originalValues.get(o.key)===o.defaultValue&&h.originalValues.set(o.key,r);for(let i of tt)i.setValue(o.key,r)}}function en(){for(let e of tt)e.destroy();tt=[]}function wa(){if(!h.selectedElement||!h.componentInfo)return;en();let{container:e,controls:t}=cr(yt,h.currentValues,tn,jn);tt=t,I.replaceContent(e)}function jn(){ue&&clearTimeout(ue),ue=setTimeout(()=>{ue=null,yr()},pc)}function hr(){ue&&(clearTimeout(ue),ue=null),vt&&(vt(),vt=null),ye&&(clearTimeout(ye.timeoutId),ye=null),h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map}}function Ea(e){I=oa(e,()=>{Un(),en(),hr()}),jr((t,o,n)=>{if(I&&I.hideSaving(),ye)if(clearTimeout(ye.timeoutId),t)ye=null;else{let{batch:r,previousOriginals:i}=ye;ye=null;for(let[a]of r){let s=i.get(a);s!==void 0&&h.originalValues.set(a,s)}if(h.selectedElement){for(let[a]of r){h.selectedElement.style[a]="",h.activeOverrides.delete(a);let s=h.originalValues.get(a);s!==void 0&&h.currentValues.set(a,s)}for(let a of tt)for(let[s]of r){let c=h.originalValues.get(s);c!==void 0&&a.setValue(s,c)}}if(I){let s={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[o||""]||n||"Failed to write changes";I.showWarning(s,"Dismiss",()=>I.clearWarning())}}else if(!t&&I){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[o||""]||n||"Failed to write changes";I.showWarning(i,"Dismiss",()=>I.clearWarning())}})}function xt(e,t){h.pendingBatch.size>0&&yr(),en(),h.selectedElement=e,h.componentInfo=t,h.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let o=new Set(dc);for(let a of xa)Ji(a)||o.add(a);let n=hc(e,o);h.currentValues=n,h.originalValues=new Map(n),h.activeOverrides=new Map,h.pendingBatch=new Map,vt&&vt(),vt=Qi(a=>{xa.has(a)&&yc(a)});let{container:r,controls:i}=cr(yt,h.currentValues,tn,jn);tt=i,Yn.disconnect(),Yn.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),I.show(t.componentName,t.filePath,t.lineNumber,r)}function tn(e,t){let o=gr.get(e);if(!o||!h.selectedElement)return;h.selectedElement.style[o.key]=t,h.activeOverrides.set(e,t),h.currentValues.set(e,t);let n=At(),r=o.tailwindScale+"Reverse",i=n[r],a=i?bn(t,i):null;if(!a&&o.enumValues){let s=o.enumValues.find(c=>c.value===t);s&&(a=s.tailwindValue)}if(h.pendingBatch.set(e,{property:e,cssProperty:o.cssProperty,value:t,tailwindPrefix:o.tailwindPrefix,tailwindToken:a,relatedPrefixes:o.relatedPrefixes,originalValue:h.originalValues.get(e)||o.defaultValue}),e==="display")if(wa(),t==="none"){let s=h.originalValues.get("display")||"block";I.showWarning("Element hidden","Restore",()=>{h.selectedElement&&(h.selectedElement.style.display=s),h.activeOverrides.delete("display"),h.currentValues.set("display",s),h.pendingBatch.delete("display"),wa(),I.clearWarning()})}else I.clearWarning()}function yr(){if(h.pendingBatch.size===0||!h.componentInfo)return;let e=h.componentInfo.filePath,t=h.componentInfo.lineNumber,o=h.componentInfo.columnNumber-1;if(h.pendingBatch.size===1){let a=[...h.pendingBatch.values()][0],s=gr.get(a.property);Ee({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:o,...a,framework:"tailwind",classPattern:s?.classPattern,standalone:s?.standalone})}else Ee({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:o,updates:[...h.pendingBatch.values()].map(a=>{let s=gr.get(a.property);return{...a,classPattern:s?.classPattern,standalone:s?.standalone}}),framework:"tailwind"});h.selectedElement&&h.elementIdentity&&ya({type:"propertyChange",elementIdentity:h.elementIdentity,element:h.selectedElement,overrides:[...h.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),I&&I.showSaving();let n=new Map;for(let[a]of h.pendingBatch)n.set(a,h.originalValues.get(a)||"");for(let[a,s]of h.pendingBatch)h.originalValues.set(a,s.value);let r=new Map(h.pendingBatch),i=setTimeout(()=>{ye&&ye.batch===r&&(ye=null,I&&I.hideSaving())},uc);ye={batch:r,previousOriginals:n,timeoutId:i},h.pendingBatch.clear()}function Un(){if(h.selectedElement){for(let[e]of h.activeOverrides)h.selectedElement.style[e]="";for(let[e,t]of h.originalValues)h.currentValues.set(e,t);for(let e of tt)for(let[t,o]of h.originalValues)e.setValue(t,o);h.activeOverrides.clear(),h.pendingBatch.clear()}}function Ct(){ue&&(clearTimeout(ue),ue=null),Yn.disconnect(),Un(),en(),I&&I.hide(),hr()}function Ta(){ue&&(clearTimeout(ue),ue=null),Yn.disconnect(),yr(),en(),I&&I.hide(),hr()}function Sa(){return h.activeOverrides.size>0}he();he();wt();j();var Sc="2147483644",Er=null;function Ha(){Er=La(kc)}function kc(e){for(let t of Ye().values())e?(e.appendChild(t.cloneEl),t.cloneEl.style.position="absolute",t.cloneEl.style.left=`${t.currentPos.x}px`,t.cloneEl.style.top=`${t.currentPos.y}px`,t.cloneEl.style.transform="",t.cloneEl.style.transformOrigin=""):(document.body.appendChild(t.cloneEl),t.cloneEl.style.position="fixed",t.cloneEl.style.left=`${t.currentPos.x}px`,t.cloneEl.style.top=`${t.currentPos.y}px`,t.cloneEl.style.transform="",t.cloneEl.style.transformOrigin="")}function _a(e,t){let o=e.getBoundingClientRect(),{scale:n,offsetX:r,offsetY:i}=Te(),a=e.cloneNode(!0);a.setAttribute("data-frameup-ghost","true"),a.style.width=`${o.width/n}px`,a.style.height=`${o.height/n}px`,a.style.zIndex=Sc,a.style.pointerEvents="none",a.style.margin="0",a.style.boxSizing="border-box",a.style.boxShadow=L.sm;let s=(o.left-r)/n,c=(o.top-i)/n,u=Cr();u?(a.style.position="absolute",a.style.left=`${s}px`,a.style.top=`${c}px`,u.appendChild(a)):(a.style.position="fixed",a.style.left=`${o.left}px`,a.style.top=`${o.top}px`,a.style.transform=`scale(${n})`,a.style.transformOrigin="0 0",document.body.appendChild(a));let d=e.style.opacity||"",p=e.style.visibility||"",m=Vn();e.style.opacity=m?"0":"0.3",m&&(e.style.visibility="hidden");let f={id:crypto.randomUUID(),componentRef:t,originalRect:{top:c,left:s,width:o.width/n,height:o.height/n},currentPos:{x:s,y:c},cloneEl:a,originalEl:e,originalOpacity:d,originalVisibility:p};return ca(f),f}function Xn(e,t,o){let n=Ye().get(e);if(!n)return;if(n.currentPos={x:t,y:o},Cr())n.cloneEl.style.left=`${t}px`,n.cloneEl.style.top=`${o}px`;else{let{scale:i,offsetX:a,offsetY:s}=Te();n.cloneEl.style.left=`${t*i+a}px`,n.cloneEl.style.top=`${o*i+s}px`,n.cloneEl.style.transform=`scale(${i})`,n.cloneEl.style.transformOrigin="0 0"}}function on(e,t){for(let o of Ye().values()){let n=o.cloneEl.getBoundingClientRect();if(e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom)return o}return null}function Ia(){Er?.(),Er=null}function Kn(e){let t=Ye().get(e);t&&(t.cloneEl.style.boxShadow=L.lg,t.cloneEl.style.opacity="0.9",t.cloneEl.style.transition=`box-shadow ${k.settle}`)}function Da(e){let t=Ye().get(e);t&&(t.cloneEl.style.boxShadow=L.sm,t.cloneEl.style.opacity="1")}Xo()||Ko({onCommitFiberRoot(){}});async function Mc(e){let t=xe(e);if(!t)return null;try{let o=await ut(t);if(o&&o.length>0){let n=[];for(let r of o){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||mt(i))continue;let a="";if(r.fileName){let s=Je(r.fileName);pt(s)&&(a=s)}n.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(n.length>0)return{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}}catch(o){console.warn("[FrameUp] getOwnerStack failed, falling back to fiber walk:",o)}return Fa(e,t)}function Fa(e,t){let o=[],n=t;for(;n;){if($e(n)){let r=ve(n.type),i=n._debugSource||n._debugOwner?._debugSource,a="",s=0,c=0;i&&(a=i.fileName||"",s=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!mt(r)&&o.push({componentName:r,filePath:a,lineNumber:s,columnNumber:c})}n=n.return}return o.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}function za(e){let t=xe(e);return t?Fa(e,t):null}var W=null,F=null,Ne=null,_e=!1,Et=!1,P=new Map,v=null,we=null,ke="idle",D=null,nt=null,be=null,no=null,rn=0,an=0,je=[],qn=!1,Nc=null,Lc=null,Rc=null,Pc=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${L.sm};
    border-radius: ${M.sm};
    padding: 4px 8px;
    z-index: 2147483646;
    font-family: ${w};
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
`;function Va(e){Nc=e.onStart,Lc=e.onMove,Rc=e.onEnd}function Ba(){let e=U();if(!e)return;let t=document.createElement("style");t.textContent=Pc,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),we=document.createElement("div"),we.className="marquee-box",e.appendChild(we),_e=!0,document.addEventListener("mousedown",Zn,!0),document.addEventListener("mousemove",Jn,!0),document.addEventListener("mouseup",Qn,!0),document.addEventListener("keydown",to,!0),document.addEventListener("click",eo,!0),document.addEventListener("scroll",Me,!0),window.addEventListener("resize",Me),Et=!0}function Zn(e){if(!_e||e.metaKey||e.ctrlKey)return;let t=document.elementFromPoint(e.clientX,e.clientY);if(t?.closest("#frameup-root"))return;if(W||P.size>0){let r=ar(e.clientX,e.clientY);if(r){e.preventDefault(),e.stopPropagation();let i=Vi();if(be=r,no=i?{...i}:null,P.size>0){je=[];for(let[a]of P){let s=getComputedStyle(a);je.push({element:a,width:parseFloat(s.width)||a.offsetWidth,height:parseFloat(s.height)||a.offsetHeight})}rn=0,an=0}else if(F){let a=getComputedStyle(F);rn=parseFloat(a.width)||F.offsetWidth,an=parseFloat(a.height)||F.offsetHeight,je=[]}D={x:e.clientX,y:e.clientY},ke="resize-drag";return}}e.preventDefault(),e.stopPropagation();let n=on(e.clientX,e.clientY);if(n){e.shiftKey||sn(),D={x:e.clientX,y:e.clientY},nt=n.originalEl,Ne=n,ke="pending";return}if(!t||!Yt(t)){(W||P.size>0)&&(Ta(),W=null,F=null,Ne=null,sn(),et(null),v&&(v.classList.remove("visible"),v.style.display="none"),Oe(null));return}D={x:e.clientX,y:e.clientY},nt=t,Ne=null,qn=e.shiftKey,ke="pending"}function Jn(e){if(_e){if(ke==="resize-drag"&&be&&D&&no){e.preventDefault(),e.stopPropagation();let t=e.clientX-D.x,o=e.clientY-D.y;if(je.length>0){for(let n of je){let r=n.width,i=n.height;be==="tr"||be==="br"?r=Math.max(10,n.width+t):r=Math.max(10,n.width-t),be==="bl"||be==="br"?i=Math.max(10,n.height+o):i=Math.max(10,n.height-o),n.element.style.width=`${Math.round(r)}px`,n.element.style.height=`${Math.round(i)}px`}ln()}else{let n=rn,r=an;be==="tr"||be==="br"?n=Math.max(10,rn+t):n=Math.max(10,rn-t),be==="bl"||be==="br"?r=Math.max(10,an+o):r=Math.max(10,an-o),n=Math.round(n),r=Math.round(r),tn("width",`${n}px`),tn("height",`${r}px`),Me()}return}if(ke==="pending"&&D){let t=Math.abs(e.clientX-D.x),o=Math.abs(e.clientY-D.y);(t>10||o>10)&&(ke="marquee")}if(ke==="marquee"&&D&&we){let t=Math.min(e.clientX,D.x),o=Math.min(e.clientY,D.y),n=Math.abs(e.clientX-D.x),r=Math.abs(e.clientY-D.y);we.style.display="block",we.style.left=`${t}px`,we.style.top=`${o}px`,we.style.width=`${n}px`,we.style.height=`${r}px`;return}if(ke==="idle"){if(W&&F||P.size>0){let a=ar(e.clientX,e.clientY);if(a){document.body.style.cursor=a==="tl"||a==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let o=on(e.clientX,e.clientY);if(o){let a=o.cloneEl.getBoundingClientRect(),s=parseFloat(getComputedStyle(o.originalEl).borderRadius)||4;Xt(a,s+2);return}let n=document.elementFromPoint(e.clientX,e.clientY);if(!n||!Yt(n)){Xt(null);return}let r=n.getBoundingClientRect(),i=parseFloat(getComputedStyle(n).borderRadius)||4;Xt(r,i+2)}}}function Qn(e){if(!_e)return;let t=ke;if(ke="idle",t==="resize-drag"){document.body.style.cursor="",be=null,no=null,D=null,je.length>0?je=[]:jn();return}if(t==="marquee"&&D){we&&(we.style.display="none"),Oc(Math.min(e.clientX,D.x),Math.min(e.clientY,D.y),Math.max(e.clientX,D.x),Math.max(e.clientY,D.y)),D=null,nt=null,qn=!1;return}nt&&(qn?$c(nt):(sn(),Ga(nt))),D=null,nt=null,qn=!1}async function Ga(e,t){try{let o=Ne?Ne.cloneEl.getBoundingClientRect():e.getBoundingClientRect();F=e,Tr(o,{}),Ac();let n=await Mc(e);if(console.log("[FrameUp] selectElement:",e.tagName,"\u2192",n?.componentName,n?.filePath,"stack:",n?.stack?.map(r=>r.componentName)),!n)return;if(W={tagName:n.tagName,componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber,columnNumber:n.columnNumber,stack:n.stack,boundingRect:{top:o.top,left:o.left,width:o.width,height:o.height}},v){let r=n.filePath?`${n.filePath}:${n.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${n.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||xt(e,W),Oe({tagName:n.tagName,componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber})}catch(o){console.error("[FrameUp] selectElement error:",o)}}function Oc(e,t,o,n){let r=Ai({x:e,y:t,width:o-e,height:n-t});if(r.length!==0){Ct(),W=null,F=null,Ne=null,et(null),v&&(v.classList.remove("visible"),v.style.display="none"),P.clear();for(let i of r.slice(0,50)){let a=za(i);if(!a)continue;let s=i.getBoundingClientRect(),c={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:s.top,left:s.left,width:s.width,height:s.height}};P.set(i,{element:i,info:c})}if(P.size!==0){if(P.size===1){let[i,a]=[...P.entries()][0];P.clear(),F=i,W=a.info;let s=i.getBoundingClientRect();if(Tr(s,W),v){let c=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${c?`<span class="comp-path">${c}</span>`:""}`}xt(i,W),Oe({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}ln(),Oe(null),v&&(v.innerHTML=`<span class="comp-name">${P.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function $c(e){if(P.has(e)){if(P.delete(e),P.size===1){let[r,i]=[...P.entries()][0];P.clear(),Kt(),F=r,W=i.info;let a=r.getBoundingClientRect();if(Tr(a,W),xt(r,W),v){let s=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${s?`<span class="comp-path">${s}</span>`:""}`}Oe({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else P.size===0?(Kt(),Ie()):(ln(),v&&(v.innerHTML=`<span class="comp-name">${P.size} elements selected</span>`));return}let t=za(e);if(!t)return;W&&F&&P.size===0&&(P.set(F,{element:F,info:W}),Ct(),W=null,F=null,et(null));let o=e.getBoundingClientRect(),n={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:o.top,left:o.left,width:o.width,height:o.height}};P.set(e,{element:e,info:n}),ln(),Oe(null),v&&(v.innerHTML=`<span class="comp-name">${P.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function sn(){P.clear(),Kt()}function ln(){if(P.size===0){Kt();return}let e=[];for(let[t]of P){let o=t.getBoundingClientRect(),n=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:o,borderRadius:n+2})}zi(e)}function eo(e){_e&&(e.metaKey||e.ctrlKey||e.preventDefault())}function to(e){if(_e&&e.key==="Escape"){if(P.size>0){sn(),v&&(v.classList.remove("visible"),v.style.display="none"),Oe(null),e.preventDefault();return}if(W){if(Sa()){Un(),e.preventDefault();return}Ie(),e.preventDefault()}}}function Tr(e,t){if(F){let o=parseFloat(getComputedStyle(F).borderRadius)||4;et(e,o+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function Me(){if(P.size>0){ln();return}if(!F||!W)return;let e=Ne?Ne.cloneEl.getBoundingClientRect():F.getBoundingClientRect(),t=parseFloat(getComputedStyle(F).borderRadius)||4;if(et(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function Ac(){Xt(null)}function Ie(){Ct(),W=null,F=null,Ne=null,be=null,no=null,je=[],sn(),document.body.style.cursor="",et(null),v&&(v.classList.remove("visible"),v.style.display="none"),Oe(null)}function Wa(){return W}function Ya(){_e=!1,document.removeEventListener("mousedown",Zn,!0),document.removeEventListener("mousemove",Jn,!0),document.removeEventListener("mouseup",Qn,!0),document.removeEventListener("keydown",to,!0),document.removeEventListener("click",eo,!0),document.removeEventListener("scroll",Me,!0),window.removeEventListener("resize",Me),Et=!1,v?.remove(),v=null}function Sr(e){e&&!Et?(document.addEventListener("mousedown",Zn,!0),document.addEventListener("mousemove",Jn,!0),document.addEventListener("mouseup",Qn,!0),document.addEventListener("keydown",to,!0),document.addEventListener("click",eo,!0),document.addEventListener("scroll",Me,!0),window.addEventListener("resize",Me),Et=!0,_e=!0):!e&&Et&&(document.removeEventListener("mousedown",Zn,!0),document.removeEventListener("mousemove",Jn,!0),document.removeEventListener("mouseup",Qn,!0),document.removeEventListener("keydown",to,!0),document.removeEventListener("click",eo,!0),document.removeEventListener("scroll",Me,!0),window.removeEventListener("resize",Me),Et=!1,_e=!1)}function ja(){return F??null}async function Ua(e){await Ga(e,{skipSidebar:!0})}function Xa(e){Ne=e,F=e.originalEl,Me()}var se=null,ae=null,Ue=null,Ka=null,cn=!1,Tt=null,oo=[],ro=new Map,io=!1,Hc=`
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
`,St=null;function qa(){let e=U();if(!e)return;let t=document.createElement("style");t.textContent=Hc,e.appendChild(t),Va({onStart:_c,onMove:Ic,onEnd:Dc}),qe(o=>{o.type==="reorderComplete"&&(kr(),Ie())})}function _c(e,t,o){Ue=o,Ka=t,Tt={x:e.clientX,y:e.clientY},cn=!1,io=!1,oo=[],ro=new Map,St=null;let n=U();if(!n)return;se=document.createElement("div"),se.className="drag-preview";let r=t.getBoundingClientRect();se.style.width=`${r.width}px`,se.style.height=`${r.height}px`,se.innerHTML=t.outerHTML,n.appendChild(se),ae=document.createElement("div"),ae.className="drop-indicator",n.appendChild(ae);let i=o.stack[1];if(!i)return;Ee({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=qe(s=>{if(s.type!=="siblingsList")return;a(),oo=s.siblings;let c=document.querySelectorAll("*");for(let u of c){if(u.closest("#frameup-root"))continue;let d=xe(u);if(!d)continue;let p=d;for(;p;){if($e(p)){let m=p._debugSource||p._debugOwner?._debugSource;if(m){for(let f of s.siblings)m.lineNumber===f.lineNumber&&m.fileName===i.filePath&&ro.set(f.lineNumber,{el:u,rect:u.getBoundingClientRect()});break}}p=p.return}}io=!0})}function Ic(e){if(!Tt)return;let t=Math.abs(e.clientX-Tt.x),o=Math.abs(e.clientY-Tt.y);if(t<5&&o<5||(cn=!0,se&&(se.style.display="block",se.style.left=`${e.clientX+10}px`,se.style.top=`${e.clientY+10}px`),!io||!Ue))return;let n=null,r=1/0,i=0,a=0,s=0;for(let c of oo){if(c.lineNumber===Ue.lineNumber)continue;let u=ro.get(c.lineNumber);if(!u)continue;let d=u.rect,p=d.top+d.height/2,m=Math.abs(e.clientY-p);m<r&&(r=m,n=c,e.clientY<p?i=d.top-2:i=d.bottom+2,a=d.left,s=d.width)}St=n,n&&ae?(ae.style.display="block",ae.style.top=`${i}px`,ae.style.left=`${a}px`,ae.style.width=`${s}px`):ae&&(ae.style.display="none")}function Dc(e){if(!cn||!St||!Ue){kr();return}Ee({type:"reorder",filePath:Ue.filePath,fromLine:Ue.lineNumber,toLine:St.lineNumber,fromComponent:Ue.componentName,toComponent:St.componentName}),se&&(se.style.display="none"),ae&&(ae.style.display="none"),cn=!1,Tt=null}function kr(){se?.remove(),ae?.remove(),se=null,ae=null,Ue=null,Ka=null,cn=!1,Tt=null,io=!1,oo=[],ro=new Map,St=null}function Za(){kr()}j();he();var ot="http://www.w3.org/2000/svg",kt=null,Q=null,Mr=null;function Ja(){let e=U();e&&(kt=document.createElementNS(ot,"svg"),kt.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),Q=document.createElementNS(ot,"g"),Q.setAttribute("class","annotation-root"),kt.appendChild(Q),e.appendChild(kt),window.addEventListener("scroll",ao,{passive:!0}),Mr=Gn(ao),ao())}function ao(){if(!Q)return;let{scale:e,offsetX:t,offsetY:o}=Te();Q.setAttribute("transform",`translate(${t}, ${o}) scale(${e})`)}function Qa(e,t,o,n){if(!Q||t.length<2)return null;let r=document.createElementNS(ot,"g");r.setAttribute("data-annotation-id",e);let i=document.createElementNS(ot,"path");return i.setAttribute("d",os(t)),i.setAttribute("stroke",o),i.setAttribute("stroke-width",String(n)),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.setAttribute("fill","none"),r.appendChild(i),Q.appendChild(r),r}function es(e,t,o,n,r,i){if(!Q)return null;let a=document.createElementNS(ot,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(o)),a.setAttribute("width","300"),a.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${L.sm};
    padding: 4px 8px;
    border-radius: ${M.sm};
    font-size: ${r}px;
    font-family: ${w};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,s.textContent=n,a.appendChild(s),Q.appendChild(a),a}function ts(e){if(!Q)return;let t=Q.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function Nr(){Q&&(Q.innerHTML="")}function ns(){window.removeEventListener("scroll",ao),Mr?.(),Mr=null,kt?.remove(),kt=null,Q=null}function os(e){if(e.length===0)return"";let t=`M${e[0].x},${e[0].y}`;for(let o=1;o<e.length;o++)t+=` L${e[o].x},${e[o].y}`;return t}function rs(e,t){if(!Q)return null;let o=[],n=document.createElementNS(ot,"g"),r=document.createElementNS(ot,"path");return r.setAttribute("stroke",e),r.setAttribute("stroke-width",String(t)),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("fill","none"),n.appendChild(r),Q.appendChild(n),{path:r,group:n,addPoint(i,a){o.push({x:i,y:a}),r.setAttribute("d",os(o))},getPoints(){return o}}}he();j();wt();var Xe={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-7 1-4 7z"/></svg>',grab:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V8a2 2 0 0 0-4 0v3"/><path d="M14 10V6a2 2 0 0 0-4 0v4"/><path d="M10 9.5V5a2 2 0 0 0-4 0v9"/><path d="M6 14c0 3.31 2.69 6 6 6h2a6 6 0 0 0 6-6v-2"/></svg>',move:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',draw:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',color:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22l1-1h3l9-9"/><path d="M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7"/><path d="M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14"/><path d="m9 7 6 6"/><path d="M20 2a2.83 2.83 0 0 1 0 4L16 10"/></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9H3"/></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>'},cs=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",lo=navigator.platform.includes("Mac")?"Cmd":"Ctrl",_r=[{type:"pointer",icon:Xe.pointer,label:"Pointer",shortcut:"V"},{type:"grab",icon:Xe.grab,label:"Grab",shortcut:"G"},{type:"move",icon:Xe.move,label:"Move",shortcut:"J"},{type:"draw",icon:Xe.draw,label:"Draw",shortcut:"D"},{type:"text",icon:Xe.text,label:"Text",shortcut:"T"}],Bc=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${M.lg};
    box-shadow: ${L.md};
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    gap: 4px;
    font-family: ${w};
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
    border-radius: ${M.sm};
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
    font-family: ${w};
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
    font-family: ${w};
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
    border-radius: ${M.lg};
    box-shadow: ${L.lg};
    padding: 24px 28px;
    min-width: 320px;
    max-width: 420px;
    font-family: ${w};
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
    font-family: ${w};
    color: ${l.textSecondary};
    box-shadow: 0 1px 0 rgba(0,0,0,0.06);
  }
  .shortcut-plus {
    font-size: 10px;
    color: ${l.textTertiary};
  }
`,pe=null,ee=null,uo=new Map,De=null,Ar=null,Hr=null;function ds(e){Ar=e}function us(e){Hr=e}function ps(e){De&&(De.disabled=!e)}function ms(){let e=U();if(!e)return;let t=document.createElement("style");t.textContent=Bc,e.appendChild(t),pe=document.createElement("div"),pe.className="tools-panel";let o=[["pointer","grab"],["move"],["draw","text"]];for(let s=0;s<o.length;s++){if(s>0){let c=document.createElement("div");c.className="tool-divider",pe.appendChild(c)}for(let c of o[s]){let u=_r.find(m=>m.type===c),d=document.createElement("button");d.className=`tool-btn${u.type==="pointer"?" active":""}`,d.innerHTML=`${u.icon}<span class="tooltip">${u.label}<span class="shortcut-badge">${cs}${u.shortcut}</span></span>`,d.addEventListener("click",()=>pr(u.type));let p=null;d.addEventListener("mouseenter",()=>{p=setTimeout(()=>d.classList.add("tooltip-visible"),400)}),d.addEventListener("mouseleave",()=>{p&&clearTimeout(p),d.classList.remove("tooltip-visible")}),pe.appendChild(d),uo.set(u.type,d)}}ee=document.createElement("div"),ee.className="sub-options hidden",pe.appendChild(ee);let n=document.createElement("div");n.className="tool-divider",pe.appendChild(n),De=document.createElement("button"),De.className="action-btn",De.innerHTML=Xe.undo,De.title="Undo (Ctrl+Z)",De.disabled=!0,De.addEventListener("click",()=>{Hr&&Hr()}),pe.appendChild(De);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=Xe.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{Ar&&Ar()}),pe.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=Xe.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{Aa(),i.style.color=$a()?l.accent:""}),pe.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.textContent="?",a.title=`Keyboard Shortcuts (${cs}/)`,a.addEventListener("click",()=>gs()),pe.appendChild(a),e.appendChild(pe),document.addEventListener("keydown",fs,!0)}function fs(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||!e.ctrlKey&&!e.metaKey)return;let o=e.key.toUpperCase();if(e.key==="/"||e.key==="?"){gs(),e.preventDefault();return}let n=_r.find(r=>r.shortcut===o);n&&(pr(n.type),e.preventDefault())}var Le=null,pn=null;function gs(){Le?co():Gc()}function Gc(){let e=U();if(!e||Le)return;Le=document.createElement("div"),Le.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let o=document.createElement("div");o.className="shortcuts-title",o.textContent="Keyboard Shortcuts",t.appendChild(o);let n=[{label:"Tools",items:_r.map(r=>({action:r.label,keys:[lo,r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[lo,"Z"]},{action:"Toggle Originals",keys:[lo,"."]},{action:"Keyboard Shortcuts",keys:[lo,"/"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Grab Tool","Drag"]},{action:"Zoom",keys:["Scroll Wheel"]}]}];for(let r of n){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let s of r.items){let c=document.createElement("div");c.className="shortcut-row";let u=document.createElement("span");u.className="shortcut-action",u.textContent=s.action,c.appendChild(u);let d=document.createElement("span");d.className="shortcut-keys";for(let p=0;p<s.keys.length;p++){if(p>0){let f=document.createElement("span");f.className="shortcut-plus",f.textContent="+",d.appendChild(f)}let m=document.createElement("span");m.className="shortcut-key",m.textContent=s.keys[p],d.appendChild(m)}c.appendChild(d),i.appendChild(c)}t.appendChild(i)}Le.appendChild(t),Le.addEventListener("click",r=>{r.target===Le&&co()}),e.appendChild(Le),pn=r=>{co()},document.addEventListener("keydown",pn,!0)}function co(){pn&&(document.removeEventListener("keydown",pn,!0),pn=null),Le?.remove(),Le=null}function hs(e){for(let[t,o]of uo)o.classList.toggle("active",t===e);Wc(e)}function Wc(e){if(ee){if(ee.innerHTML="",ee.classList.add("hidden"),ee.classList.remove("visible"),e==="draw"){ee.classList.remove("hidden"),requestAnimationFrame(()=>ee?.classList.add("visible"));let t=ge(),o=document.createElement("button");o.className="color-swatch",o.style.background=t.brushColor,o.addEventListener("click",()=>{let r=o.getBoundingClientRect();qt({initialColor:t.brushColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){Qt("brushColor",i),o.style.background=i},onClose(){}})}),ee.appendChild(o);let n=document.createElement("div");n.className="segmented-control";for(let r of[2,4,8]){let i=document.createElement("button");i.className=`segment${r===t.brushSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{Qt("brushSize",r),n.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active"),Promise.resolve().then(()=>(Lt(),ls)).then(a=>a.refreshDrawCursor())}),n.appendChild(i)}ee.appendChild(n)}else if(e==="text"){ee.classList.remove("hidden"),requestAnimationFrame(()=>ee?.classList.add("visible"));let t=ge(),o=document.createElement("button");o.className="color-swatch",o.style.background=t.textColor,o.addEventListener("click",()=>{let r=o.getBoundingClientRect();qt({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){Qt("textColor",i),o.style.background=i},onClose(){}})}),ee.appendChild(o);let n=document.createElement("div");n.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{Qt("fontSize",r),n.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),n.appendChild(i)}ee.appendChild(n)}}}function ys(e){let t=uo.get(e);t&&(t.style.backgroundColor=l.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function bs(){document.removeEventListener("keydown",fs,!0),co(),pe?.remove(),pe=null,ee=null,uo.clear()}Lt();Lr();j();var vs="frameup-onboarding-seen",Re=null,po=null;function xs(){if(localStorage.getItem(vs))return;let e=U();if(!e)return;Re=document.createElement("div"),Re.style.cssText=`
    position: fixed;
    left: 72px;
    top: 50%;
    transform: translateY(-50%);
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${L.md};
    border-radius: ${M.md};
    padding: 12px 16px;
    font-family: ${w};
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
    font-family: ${w};
    margin: 0 2px;
  `;Re.innerHTML=`Press ${t.map(n=>`<span style="${o}">${n}</span>`).join(" ")} to switch tools`,e.appendChild(Re),requestAnimationFrame(()=>{Re&&(Re.style.opacity="1")}),po=setTimeout(Ir,5e3)}function Ir(){Re&&(localStorage.setItem(vs,"1"),Re.style.opacity="0",setTimeout(()=>{Re?.remove(),Re=null},150),po&&(clearTimeout(po),po=null))}he();function Cs(){Sr(!0)}function ws(){Sr(!1)}Lt();wt();var Dr=!1,Fr=0,zr=0,Es={onMouseDown(e){Dr=!0,Fr=e.clientX,zr=e.clientY,so("grabbing")},onMouseMove(e){if(!Dr)return;let t=e.clientX-Fr,o=e.clientY-zr;Pa(t,o),Fr=e.clientX,zr=e.clientY},onMouseUp(e){Dr=!1,so("grab")}};he();Lt();var le=null,mn={x:0,y:0},Rt=!1,mo=!1,Pt=null,fn=null,Ts={onMouseDown(e){fn=null,mo=!1,Pt=null;let t=on(e.clientX,e.clientY);if(t){le=t,Pt={...t.currentPos};let s=Se(e.clientX,e.clientY);mn={x:s.x-t.currentPos.x,y:s.y-t.currentPos.y},Rt=!0,Kn(le.id);return}let o=un(e.clientX,e.clientY);if(!o){Ie();return}let n=Wa(),r=ja();if(!n||!r||o!==r){fn=o;return}if(ha(r)){for(let s of Ye().values())if(s.originalEl===r||s.originalEl.contains(r)||r.contains(s.originalEl)){le=s,Pt={...s.currentPos};let c=Se(e.clientX,e.clientY);mn={x:c.x-s.currentPos.x,y:c.y-s.currentPos.y},Rt=!0,Kn(le.id);return}}let i=_a(r,{componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber});le=i,mo=!0;let a=Se(e.clientX,e.clientY);mn={x:a.x-i.currentPos.x,y:a.y-i.currentPos.y},Rt=!0,Kn(le.id)},onMouseMove(e){if(!Rt||!le)return;let t=Se(e.clientX,e.clientY),o=t.x-mn.x,n=t.y-mn.y;Xn(le.id,o,n)},onMouseUp(e){Rt&&le&&(mo||Pt&&da(le.id,le.currentPos,Pt),Da(le.id),Xa(le)),le=null,Rt=!1,mo=!1,Pt=null,fn&&(Ua(fn),fn=null)}};he();function fo(e,t=2){if(e.length<=2)return e;let o=0,n=0,r=e[0],i=e[e.length-1];for(let a=1;a<e.length-1;a++){let s=Yc(e[a],r,i);s>o&&(o=s,n=a)}if(o>t){let a=fo(e.slice(0,n+1),t),s=fo(e.slice(n),t);return[...a.slice(0,-1),...s]}return[r,i]}function Yc(e,t,o){let n=o.x-t.x,r=o.y-t.y,i=n*n+r*r;if(i===0){let s=e.x-t.x,c=e.y-t.y;return Math.sqrt(s*s+c*c)}return Math.abs(r*e.x-n*e.y+o.x*t.y-o.y*t.x)/Math.sqrt(i)}Lt();async function go(e,t){let o=un(e,t);if(!o)return null;let n=xe(o);if(!n)return null;try{let i=await ut(n);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let s=a.functionName;if(s[0]!==s[0].toUpperCase()||mt(s))continue;let c="";if(a.fileName){let u=Je(a.fileName);pt(u)&&(c=u)}return{componentName:s,filePath:c,lineNumber:a.lineNumber??0}}}catch{}let r=n;for(;r;){if($e(r)){let i=ve(r.type);if(i&&i[0]===i[0].toUpperCase()&&!mt(i)){let a=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:a?.fileName||"",lineNumber:a?.lineNumber||0}}}r=r.return}return null}var Pe=null,ho=null,Ss={onMouseDown(e){let t=ge();if(Pe=rs(t.brushColor,t.brushSize),Pe){let o=Se(e.clientX,e.clientY);Pe.addPoint(o.x,o.y)}ho=go(e.clientX,e.clientY)},onMouseMove(e){if(!Pe)return;let t=Se(e.clientX,e.clientY);Pe.addPoint(t.x,t.y)},async onMouseUp(e){if(!Pe)return;let t=Pe.getPoints(),o=ge();if(Pe.group.remove(),t.length<2){Pe=null,ho=null;return}let n=await ho,r=fo(t,2),i=crypto.randomUUID();Qa(i,r,o.brushColor,o.brushSize),zn({type:"draw",id:i,points:r,color:o.brushColor,strokeWidth:o.brushSize,targetComponent:n}),Pe=null,ho=null}};he();j();var te=null,it=null,yo=null,Ms={onMouseDown(e){te&&ks();let t=Se(e.clientX,e.clientY);it={pageX:t.x,pageY:t.y},go(e.clientX,e.clientY).then(o=>{yo=o}),te=document.createElement("input"),te.type="text",te.placeholder="Type annotation...",te.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${l.bgPrimary};
      color: ${l.textPrimary};
      border: 1.5px solid ${l.accent};
      border-radius: ${M.sm};
      padding: 4px 8px;
      font-size: ${ge().fontSize}px;
      font-family: ${w};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${l.accentSoft};
    `,te.setAttribute("data-frameup-ghost","true"),te.addEventListener("keydown",o=>{o.key==="Enter"&&(ks(),o.preventDefault()),o.key==="Escape"&&(Ns(),o.preventDefault()),o.stopPropagation()}),document.body.appendChild(te),te.focus()},onMouseMove(){},onMouseUp(){}};function ks(){if(!te||!it)return;let e=te.value.trim();if(te.remove(),te=null,!e)return;let t=ge(),o=crypto.randomUUID();es(o,it.pageX,it.pageY,e,t.fontSize,t.textColor),zn({type:"text",id:o,position:it,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:yo}),it=null,yo=null}function Ns(){te&&(te.remove(),te=null),it=null,yo=null}function Ls(){Ns()}wt();j();var at=null,gn=null;function Rs(e){let t=e instanceof Error&&e.stack?e.stack:String(e);return/frameup|overlay/i.test(t)}function jc(e){let t=U();if(!t)return;at&&at.parentNode&&at.parentNode.removeChild(at),gn&&clearTimeout(gn);let o=document.createElement("div");o.setAttribute("style",["position: fixed","bottom: 72px","right: 16px","z-index: 2147483647","background: rgba(30, 30, 30, 0.92)","color: #fff",`font-family: ${w}`,"font-size: 12px","padding: 10px 14px",`border-radius: ${M.sm}`,`box-shadow: ${L.md}`,"max-width: 320px","display: flex","align-items: center","gap: 10px","opacity: 0",`transition: opacity ${k.medium}`].join("; "));let n=document.createElement("span");n.textContent=e,n.setAttribute("style","flex: 1;");let r=document.createElement("button");r.textContent="Dismiss",r.setAttribute("style",["background: rgba(255,255,255,0.15)","border: none","color: #fff",`font-family: ${w}`,"font-size: 11px","padding: 3px 8px",`border-radius: ${M.xs}`,"cursor: pointer","white-space: nowrap"].join("; ")),r.addEventListener("click",()=>{o.style.opacity="0",setTimeout(()=>o.remove(),200),gn&&clearTimeout(gn),at=null}),o.appendChild(n),o.appendChild(r),t.appendChild(o),at=o,requestAnimationFrame(()=>{o.style.opacity="1"}),gn=setTimeout(()=>{o.style.opacity="0",setTimeout(()=>o.remove(),200),at=null},8e3)}function Vr(e){console.error("[FrameUp]",e),jc("FrameUp encountered an error. Your app is unaffected.")}function Uc(){window.addEventListener("error",e=>{Rs(e.error??e.message)&&(Vr(e.error??e.message),e.preventDefault())}),window.addEventListener("unhandledrejection",e=>{Rs(e.reason)&&(Vr(e.reason),e.preventDefault())})}function Xc(){let e=window.__FRAMEUP_WS_PORT__;if(!e){console.warn("[FrameUp] No WebSocket port found.");return}if(document.getElementById("frameup-root"))return;vn(e),ri(Kc);let t=U();t&&Ea(t),Ba(),Fi(),qa(),Ja(),Ha(),pa(r=>ts(r)),fa((r,i,a)=>Xn(r,i,a)),ms(),Pr(),xs(),Nt("grab",Es),Nt("move",Ts),Nt("draw",Ss),Nt("text",Ms),aa((r,i)=>{Ir(),ys(r),i==="pointer"&&ws(),i==="text"&&Ls(),Mt(),Qo(),r==="pointer"&&Cs(),Or(r),hs(r)}),sa(()=>{ci(fr()),ps(ba())}),us(()=>{let r=mr();r&&q(`Undo: ${r}`)}),ai(()=>{if(!fr()){q("No moved components to toggle");return}let r=!Vn();ga(r),En(r)});let o=!1,n=0;si(()=>{if(o)return;let r=Date.now();if(r<n){let a=Math.ceil((n-r)/1e3);q(`Please wait ${a}s before retrying`);return}let i=va();if(!i.moves.length&&!i.annotations.length&&!i.colorChanges.length){q("Nothing to generate \u2014 make some visual changes first");return}o=!0,q("Generating..."),Ee({type:"generate",annotations:i})}),qe(r=>{if(r.type==="generateProgress"&&q(r.message),r.type==="generateComplete")if(o=!1,r.success){let i=r.changes.map(a=>a.description||a.filePath).join(", ");q(`Applied: ${i}`),Ie(),Nr(),Wn(),En(!0)}else q(`Error: ${r.error||"Generation failed"}`),n=Date.now()+5e3}),li(()=>{let r=mr();return r?(q(`Undo: ${r}`),!0):!1}),ds(()=>{Ie(),Nr(),Wn(),Oa(),En(!0),q("Canvas cleared")}),console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools")}function Kc(){Mt(),Qo(),Ya(),Bi(),Za(),ns(),Ia(),bs(),$r(),Wn(),wr(),Ur(),ii()}function Ps(){try{Xc(),Uc()}catch(e){Vr(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ps):Ps();})();
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
