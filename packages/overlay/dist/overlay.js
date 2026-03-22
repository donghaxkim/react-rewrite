"use strict";var SketchUI=(()=>{var As=Object.defineProperty;var $t=(e,t)=>()=>(e&&(t=e(e=0)),t);var $s=(e,t)=>{for(var n in t)As(e,n,{get:t[n],enumerable:!0})};function Qr(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='5 9 2 12 5 15'/><polyline points='9 5 12 2 15 5'/><polyline points='15 19 12 22 9 19'/><polyline points='19 9 22 12 19 15'/><line x1='2' y1='12' x2='22' y2='12'/><line x1='12' y1='2' x2='12' y2='22'/></svg>`)}") 12 12, move`}function ko(e){if(En&&En.size===e)return En.uri;let t=Math.max(e,2),n=t*2+4,o=n/2,r=`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${n}' height='${n}'><circle cx='${o}' cy='${o}' r='${t}' fill='none' stroke='${l.accent}' stroke-width='1.5'/></svg>`)}") ${o} ${o}, crosshair`;return En={size:e,uri:r},r}function ei(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M2 22l1-1h3l9-9'/><path d='M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7'/><path d='M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14'/><path d='m9 7 6 6'/><path d='M20 2a2.83 2.83 0 0 1 0 4L16 10'/></svg>`)}") 2 22, pointer`}var l,L,N,k,T,Jr,En,U=$t(()=>{"use strict";l={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},L={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},N={xs:"4px",sm:"6px",md:"10px",lg:"14px"},k={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},T="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",Jr=`
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
`;En=null});function sa(e){return Fn.push(e),()=>{Fn=Fn.filter(t=>t!==e)}}function la(e){return zn.push(e),()=>{zn=zn.filter(t=>t!==e)}}function je(){zn.forEach(e=>e())}function Gn(){return pr}function en(e){let t=pr;t!==e&&(pr=e,Fn.forEach(n=>n(e,t)))}function he(){return{...aa}}function tn(e,t){aa[e]=t}function Ue(){return ge}function ca(e){ge.set(e.id,e),_e.push({type:"ghostCreate",ghostId:e.id}),je()}function ua(e,t){let n=ge.get(e);if(!n)return;let o={...n.currentPos};n.currentPos=t,_e.push({type:"ghostMove",ghostId:e,previousPos:o}),je()}function cc(e){let t=ge.get(e);t&&(t.cloneEl.remove(),t.originalEl.style.opacity=t.originalOpacity,t.originalEl.style.visibility=t.originalVisibility,ge.delete(e),je())}function Ct(e){if(Ye.push(e),e.type==="colorChange"){let t=e;_e.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else _e.push({type:"annotationAdd",annotationId:e.id});je()}function pa(e){da=e}function fa(e){ma=e}function ia(e){Ye=Ye.filter(t=>t.id!==e),da?.(e),je()}function Wn(){return mr}function ga(e){mr=e;for(let t of ge.values())e?(t.originalEl.style.opacity="0",t.originalEl.style.visibility="hidden"):(t.originalEl.style.opacity="0.3",t.originalEl.style.visibility="visible");je()}function ha(e){for(let t of ge.values())if(t.originalEl===e||t.originalEl.contains(e)||e.contains(t.originalEl))return!0;return!1}function fr(){let e=_e.pop();if(!e)return null;switch(e.type){case"ghostCreate":return cc(e.ghostId),"ghost removed";case"ghostMove":{let t=ge.get(e.ghostId);return t&&(t.currentPos=e.previousPos,ma?.(e.ghostId,e.previousPos.x,e.previousPos.y)),"move reverted"}case"annotationAdd":return ia(e.annotationId),"annotation removed";case"colorChange":{let t=Ye.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),ia(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}}return null}function ya(e){_e.push(e),je()}function Se(){return{scale:Qt,offsetX:Vn,offsetY:Bn}}function Yn(e,t,n){Qt=e,Vn=t,Bn=n,Jt.forEach(o=>o())}function jn(e){return Jt.push(e),()=>{Jt=Jt.filter(t=>t!==e)}}function ye(e,t){return{x:(e-Vn)/Qt,y:(t-Bn)/Qt}}function Un(){for(let e of ge.values())e.cloneEl.remove(),e.originalEl.style.opacity=e.originalOpacity,e.originalEl.style.visibility=e.originalVisibility;for(let e of Ye)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of _e)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}ge=new Map,Ye=[],_e=[],mr=!0,Qt=1,Vn=0,Bn=0,Jt.forEach(e=>e()),je()}function gr(){return ge.size>0||Ye.length>0}function ba(){return _e.length>0}function va(){let e=[];for(let o of ge.values())e.push({component:o.componentRef.componentName,file:o.componentRef.filePath,line:o.componentRef.lineNumber,from:o.originalRect,to:o.currentPos});let t=[],n=[];for(let o of Ye)o.type==="draw"?t.push({type:"draw",startComponent:o.targetComponent?.componentName,startFile:o.targetComponent?.filePath,startLine:o.targetComponent?.lineNumber,points:o.points,color:o.color,strokeWidth:o.strokeWidth}):o.type==="text"?t.push({type:"text",content:o.content,position:o.position,targetComponent:o.targetComponent?.componentName,targetFile:o.targetComponent?.filePath,targetLine:o.targetComponent?.lineNumber}):o.type==="colorChange"&&n.push({component:o.component.componentName,file:o.component.filePath,line:o.component.lineNumber,property:o.property,from:o.fromColor,to:o.toColor});return{moves:e,annotations:t,colorChanges:n}}var ge,Ye,_e,pr,mr,aa,Qt,Vn,Bn,Jt,Fn,zn,da,ma,de=$t(()=>{"use strict";ge=new Map,Ye=[],_e=[],pr="pointer",mr=!0,aa={brushSize:4,brushColor:"#ef4444",fontSize:16,textColor:"#ffffff"},Qt=1,Vn=0,Bn=0,Jt=[],Fn=[],zn=[];da=null;ma=null});function wr(){return j}function Ra(e){return rn.push(e),()=>{rn=rn.filter(t=>t!==e)}}function Ec(){xr=document.body.style.background||document.body.style.backgroundColor||"",Cr=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",j=document.createElement("div"),j.setAttribute("data-sketch-ui-canvas-wrapper","true"),j.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${n};
  `.trim().replace(/\n\s*/g," "),we=document.createElement("div"),we.setAttribute("data-sketch-ui-dot-bg","true"),we.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${l.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="sketch-ui-root"||r.hasAttribute("data-sketch-ui-interaction")||r.hasAttribute("data-sketch-ui-ghost")||r.hasAttribute("data-sketch-ui-annotation")||r.hasAttribute("data-sketch-ui-dot-bg")||r.hasAttribute("data-sketch-ui-canvas-wrapper"))||(Na.push(r),j.appendChild(r));j.style.position="relative",j.style.zIndex="1",document.body.insertBefore(we,document.body.firstChild),document.body.insertBefore(j,we.nextSibling),vr=jn(Ma),Ma(),rn.forEach(r=>r(j))}function Ma(){if(!j||!we)return;let{scale:e,offsetX:t,offsetY:n}=Se();j.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=Cc*e,r=t%o,i=n%o;we.style.backgroundImage=`radial-gradient(circle, ${wc} ${ka}px, transparent ${ka}px)`,we.style.backgroundSize=`${o}px ${o}px`,we.style.backgroundPosition=`${r}px ${i}px`}function Tc(e,t,n){let{scale:o,offsetX:r,offsetY:i}=Se(),a=Math.min(vc,Math.max(bc,o+n));if(a===o)return;let s=(e-r)/o,c=(t-i)/o,d=e-s*a,u=t-c*a;Yn(a,d,u)}function La(e){e.preventDefault();let t=-e.deltaY*xc,{scale:n}=Se(),o=t*n;Tc(e.clientX,e.clientY,o)}function Pa(e,t){let{scale:n,offsetX:o,offsetY:r}=Se();Yn(n,o+e,r+t)}function Oa(){Yn(1,0,0)}function Aa(){return j!==null}function $a(){j?Er():Ec()}function Er(){if(rn.forEach(e=>e(null)),vr?.(),vr=null,j){for(;j.firstChild;)document.body.insertBefore(j.firstChild,j);j.remove(),j=null}we?.remove(),we=null,Na=[],document.body.style.background=xr,document.documentElement.style.background=Cr,xr="",Cr=""}var bc,vc,xc,Cc,ka,wc,j,we,vr,Na,rn,xr,Cr,St=$t(()=>{"use strict";de();U();bc=.1,vc=5,xc=.002,Cc=24,ka=1,wc="rgba(0,0,0,0.15)",j=null,we=null,vr=null,Na=[],rn=[];xr="",Cr=""});function rs(e,t){if(!st)return;let n=performance.now(),o=Math.abs(e-st.clientX),r=Math.abs(t-st.clientY),i=o<=2&&r<=2,a=n-st.timestamp<16;if(i||a)return st.element}function is(e,t,n){st={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function Lt(){st=null}var st,Lr=$t(()=>{"use strict";st=null});var ss={};$s(ss,{activateInteraction:()=>Ar,destroyInteraction:()=>$r,getPageElementAtPoint:()=>fn,initInteraction:()=>Or,refreshDrawCursor:()=>Vc,registerToolHandler:()=>lt,setInteractionCursor:()=>uo,setInteractionPointerEvents:()=>mn});function lt(e,t){Pr.set(e,t)}function Or(){A=document.createElement("div"),A.setAttribute("data-sketch-ui-interaction","true"),A.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(A),document.addEventListener("scroll",Lt,!0),A.addEventListener("mousedown",e=>{pn?.onMouseDown?.(e)}),A.addEventListener("mousemove",e=>{pn?.onMouseMove?.(e)}),A.addEventListener("mouseup",e=>{pn?.onMouseUp?.(e)}),document.addEventListener("wheel",as,{passive:!1})}function as(e){!A||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#sketch-ui-root")||La(e)}function Ar(e){pn=Pr.get(e)||null,A&&(A.style.pointerEvents=e==="pointer"?"none":"auto"),zc(e)}function zc(e){if(A)switch(e){case"pointer":A.style.cursor="default";break;case"grab":A.style.cursor="grab";break;case"move":A.style.cursor=Qr();break;case"draw":A.style.cursor=ko(he().brushSize);break;case"color":A.style.cursor=ei();break;case"text":A.style.cursor="text";break;default:A.style.cursor="default"}}function Vc(){Gn()==="draw"&&A&&(A.style.cursor=ko(he().brushSize))}function uo(e){A&&(A.style.cursor=e)}function mn(e){A&&(A.style.pointerEvents=e?"auto":"none")}function fn(e,t){let n=rs(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#sketch-ui-root")&&!i.hasAttribute("data-sketch-ui-interaction")&&!i.hasAttribute("data-sketch-ui-ghost")&&!(i===document.body||i===document.documentElement)){r=i;break}return is(e,t,r),r}function $r(){document.removeEventListener("scroll",Lt,!0),document.removeEventListener("wheel",as),A?.remove(),A=null,pn=null,Pr.clear()}var A,pn,Pr,Pt=$t(()=>{"use strict";de();U();Lr();St();A=null,pn=null,Pr=new Map});function Hs(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),s=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+s).toString(16).slice(1)}`}return e}function _s(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(C=>{try{return Array.from(C.cssRules)}catch{return[]}}).filter(C=>C instanceof CSSStyleRule&&C.selectorText===":root").flatMap(C=>Array.from(C.style)).filter(C=>C.startsWith("--")),n={},o={},r={},i={},a={},s={},c={},d={},u={},p={},m={},f={},g={},b={},x={},R={},$={},O={},z=(C,H,oe,re)=>{C[oe]=re,H[re]=oe};for(let C of t){let H=e.getPropertyValue(C).trim();if(!H)continue;let oe=C.match(/^--spacing-(.+)$/);if(oe){z(n,p,oe[1],H);continue}let re=C.match(/^--color-(.+)$/);if(re){let vn=re[1];o[vn]=H,m[Hs(H)]=vn;continue}let M=C.match(/^--font-size-(.+)$/);if(M){z(r,f,M[1],H);continue}let B=C.match(/^--font-weight-(.+)$/);if(B){z(i,g,B[1],H);continue}let y=C.match(/^--radius-(.+)$/);if(y){z(a,b,y[1],H);continue}let S=C.match(/^--border-(.+)$/);if(S){z(s,x,S[1],H);continue}let Y=C.match(/^--opacity-(.+)$/);if(Y){z(c,R,Y[1],H);continue}let ce=C.match(/^--tracking-(.+)$/);if(ce){z(d,$,ce[1],H);continue}let Ve=C.match(/^--leading-(.+)$/);if(Ve){z(u,O,Ve[1],H);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:s,opacity:c,letterSpacing:d,lineHeight:u,spacingReverse:p,colorsReverse:m,fontSizeReverse:f,fontWeightReverse:g,borderRadiusReverse:b,borderWidthReverse:x,opacityReverse:R,letterSpacingReverse:$,lineHeightReverse:O}}var Is=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function Ds(e,t){let n={};for(let o of Is){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function Cn(e,t){return t.get(e)??null}function Gr(e,t,n){let r=(n??_t())[e],i=[];for(let[s,c]of r.entries()){let d=parseFloat(c);isNaN(d)||i.push({numericValue:d,token:s,cssValue:c})}let a=parseFloat(t);return isNaN(a)||i.some(c=>c.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((s,c)=>s.numericValue-c.numericValue),i}var Wr=null,Ht=null;function Yr(e){Wr=e,Ht=null}function _t(){if(Ht!==null)return Ht;let e=_s();return Ht=Ds(e,Wr??{}),Ht}var ie=null,It=[],ut=0,Fs=5,xo=null,Co=null,wo=null,Eo=null,To=null,So=null;function jr(e){So=e}function wn(e){ie&&ie.readyState===WebSocket.OPEN||(To=e,ie=new WebSocket(`ws://localhost:${e}`),ie.onopen=()=>{let t=ut>0;ut=0,t&&Eo&&Eo()},ie.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&Yr(n.tokens),n.type==="updatePropertyComplete"&&So&&So(n.success,n.errorCode,n.error),It.forEach(o=>o(n))}catch{}},ie.onclose=t=>{if(ie=null,t.code===4001){wo&&wo();return}if(ut<Fs){let n=500*Math.pow(2,ut);ut++,xo=setTimeout(()=>wn(e),n)}else Co&&Co()},ie.onerror=()=>{})}function Te(e){ie&&ie.readyState===WebSocket.OPEN&&ie.send(JSON.stringify(e))}function Je(e){return It.push(e),()=>{It=It.filter(t=>t!==e)}}function Ur(){xo&&clearTimeout(xo),ie&&(ie.close(),ie=null),It=[]}function Xr(e){Co=e}function Kr(e){wo=e}function qr(e){Eo=e}function Zr(){To&&(ut=0,wn(To))}U();var pt=null,X=null,Dt=0,Tn=null,Sn=null,Qe=null,Mo=null,dt=null,Ft=null,Ro=null,oi=null,zs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',ri='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',No='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',Vs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',ti='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',Bs=`
  :host {
    all: initial;
  }
  ${Jr}
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
`;function ii(e){let t=document.createElement("div");t.id="sketch-ui-root",document.body.appendChild(t),pt=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=Bs;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn eye-btn" title="Toggle originals (.)">
      ${ri}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${No}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Generate</button>
    <button class="icon-btn close-btn" title="Close SketchUI">
      ${Vs}
    </button>
  `,pt.appendChild(n),pt.appendChild(o),X=o.querySelector(".undo-btn");let r=o.querySelector(".close-btn");Tn=o.querySelector(".generate-btn"),Sn=o.querySelector(".eye-btn"),dt=o.querySelector(".component-detail"),Qe=document.createElement("div"),Qe.className="toast",pt.appendChild(Qe),X.addEventListener("click",()=>{Te({type:"undo"}),X&&(X.innerHTML='<div class="spinner"></div>',X.disabled=!0)}),r.addEventListener("click",e),Sn.addEventListener("click",()=>{Ft&&Ft()}),Tn.addEventListener("click",()=>{Ro&&Ro()}),document.addEventListener("keydown",i=>{i.key==="."&&(i.ctrlKey||i.metaKey)&&!ni()&&(Ft&&Ft(),i.preventDefault()),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!ni()&&oi?.()&&i.preventDefault()}),Xr(()=>{Z("Disconnected. Click to reconnect."),Zr()}),Kr(()=>{Z("Disconnected: another tab took over")}),qr(()=>{Dt=0,X&&(X.disabled=!0)}),Je(i=>{switch(i.type){case"reorderComplete":i.success?(Dt++,X&&(X.innerHTML=ti,setTimeout(()=>{X&&(X.innerHTML=No,X.disabled=!1)},200))):i.error&&Z(i.error);break;case"undoComplete":i.success?(Dt=Math.max(0,Dt-1),X&&(X.innerHTML=ti,setTimeout(()=>{X&&(X.innerHTML=No,X.disabled=Dt===0)},200))):i.error&&Z(i.error);break;case"devServerDisconnected":Z("Dev server disconnected");break;case"devServerReconnected":Z("Dev server reconnected");break}})}function ai(){let e=document.getElementById("sketch-ui-root");e&&e.remove(),pt=null,X=null}function K(){return pt}function si(e){Ft=e}function li(e){Ro=e}function ci(e){oi=e}function kn(e){Sn&&(Sn.innerHTML=e?ri:zs)}function ui(e){Tn&&(Tn.disabled=!e)}function Oe(e){if(!dt)return;if(!e){dt.className="component-detail empty",dt.textContent="No selection";return}dt.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";dt.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function Z(e){Qe&&(Qe.textContent=e,Qe.classList.add("visible"),Mo&&clearTimeout(Mo),Mo=setTimeout(()=>{Qe?.classList.remove("visible")},2e3))}function ni(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var Lo="0.5.32",Gt=`bippy-${Lo}`,di=Object.defineProperty,Gs=Object.prototype.hasOwnProperty,zt=()=>{},mi=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},Nn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),fi=!1,pi,Vt=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>fi?!0:(e&&typeof e.inject=="function"&&(pi=e.inject.toString()),!!pi?.includes("(injected)")),Mn=new Set,Ge=new Set,Po=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:Gt,checkDCE:mi,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),Ge.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,Mn.forEach(a=>a())),i},on:zt,onCommitFiberRoot:zt,onCommitFiberUnmount:zt,onPostCommitFiberRoot:zt,renderers:t,supportsFiber:!0,supportsFlight:!0};try{di(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let s=o.renderers;o=a,s.size>0&&(s.forEach((c,d)=>{Ge.add(c),a.renderers.set(d,c)}),Bt(e))}}});let r=window.hasOwnProperty,i=!1;di(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{Bt(e)}return o},Bt=e=>{e&&Mn.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=mi,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=Gt,t._instrumentationIsActive=!1;let n=Nn(t);if(n||(t.on=zt),t.renderers.size){t._instrumentationIsActive=!0,Mn.forEach(i=>i());return}let o=t.inject,r=Vt(t);r&&!n&&(fi=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return Ge.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,Mn.forEach(s=>s()),a}}(t.renderers.size||t._instrumentationIsActive||Vt())&&e?.()}catch{}},Oo=()=>Gs.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),mt=e=>Oo()?(Bt(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Po(e),Ao=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),Rn=()=>{try{Ao()&&mt()}catch{}};Rn();var $o=0,Ho=1;var _o=5;var Io=11,Do=13;var Fo=15,zo=16;var Vo=19;var Bo=26,Go=27,Wo=28,Yo=30;var Ae=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};function jo(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await Xo(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=Uo(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var Uo=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=Uo(o,t,n);if(r)return r;o=n?null:o.sibling}return null},Xo=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await Xo(o,t,n);if(r)return r;o=n?null:o.sibling}return null};var Ko=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?Ko(t.type||t.render):null},xe=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=Ko(t);return o&&(o.displayName||o.name)||null};var qo=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||Nn(e)||Vt(e)};var Zo=e=>{let t=mt(e.onActive);t._instrumentationSource=e.name??Gt;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,s,c)=>{n!==i&&(n?.(a,s,c),e.onCommitFiberRoot?.(a,s,c))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,s)=>{t.onCommitFiberUnmount===i&&(o?.(a,s),e.onCommitFiberUnmount?.(a,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,s)=>{t.onPostCommitFiberRoot===i&&(r?.(a,s),e.onPostCommitFiberRoot?.(a,s))};t.onPostCommitFiberRoot=i}return t},Ce=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},Ws=Error();var gi=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Ys=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],js=["<anonymous>","eval",""],Ti=/\.(jsx|tsx|ts|js)$/,Us=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Xs=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,Si="(at Server)",Ks=/(^|@)\S+:\d+/,ki=/^\s*at .*(\S+:\d+|\(native\))/m,qs=/^(eval@)?(\[native code\])?$/;var Mi=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=hi(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(Ks)){let i=yi(r,void 0)[0];i&&o.push(i)}return er(o,t)}return e.match(ki)?hi(e,t):yi(e,t)},Ni=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},er=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e;var hi=(e,t)=>er(e.split(`
`).filter(n=>!!n.match(ki)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=Ni(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}});var yi=(e,t)=>er(e.split(`
`).filter(n=>!n.match(qs)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,s=Ni(o.replace(r,""));return{functionName:a,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:o}}});var Zs=44,bi="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Js=new Uint8Array(64),Ri=new Uint8Array(128);for(let e=0;e<bi.length;e++){let t=bi.charCodeAt(e);Js[e]=t,Ri[t]=e}function Wt(e,t){let n=0,o=0,r=0;do r=Ri[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function vi(e,t){return e.pos>=t?!1:e.peek()!==Zs}var Qs=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};function Li(e){let{length:t}=e,n=new Qs(e),o=[],r=0,i=0,a=0,s=0,c=0;do{let d=n.indexOf(";"),u=[],p=!0,m=0;for(r=0;n.pos<d;){let f;r=Wt(n,r),r<m&&(p=!1),m=r,vi(n,d)?(i=Wt(n,i),a=Wt(n,a),s=Wt(n,s),vi(n,d)?(c=Wt(n,c),f=[r,i,a,s,c]):f=[r,i,a,s]):f=[r],u.push(f),n.pos++}p||el(u),o.push(u),n.pos=d+1}while(n.pos<=t);return o}function el(e){e.sort(tl)}function tl(e,t){return e[0]-t[0]}var Pi=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,nl=/^data:application\/json[^,]+base64,/,ol=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,Oi=typeof WeakRef<"u",Yt=new Map,Ln=new Map,rl=e=>Oi&&e instanceof WeakRef,xi=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let u of r)if(u[0]<=o)i=u;else break;if(!i||i.length<4)return null;let[,a,s,c]=i;if(a===void 0||s===void 0||c===void 0)return null;let d=t[a];return d?{columnNumber:c,fileName:d,lineNumber:s+1}:null},il=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return xi(o.map.mappings,o.map.sources,r,i)}return xi(e.mappings,e.sources,t-1,n)},al=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(ol);a&&(o=a[1]||a[2])}if(!o)return null;let r=Pi.test(o);if(!(nl.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},sl=e=>({file:e.file,mappings:Li(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),ll=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:Li(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},Ci=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(Pi);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},cl=async(e,t=fetch)=>{if(!Ci(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=al(e,n);if(!o||!Ci(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?ll(i):sl(i)}catch{return null}},ul=async(e,t=!0,n)=>{if(t&&Yt.has(e)){let i=Yt.get(e);if(i==null)return null;if(rl(i)){let a=i.deref();if(a)return a;Yt.delete(e)}else return i}if(t&&Ln.has(e))return Ln.get(e);let o=cl(e,n);t&&Ln.set(e,o);let r=await o;return t&&Ln.delete(e),t&&(r===null?Yt.set(e,null):Yt.set(e,Oi?new WeakRef(r):r)),r},dl=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await ul(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=il(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),pl=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",ml=()=>{let e=mt();for(let t of[...Array.from(Ge),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},wi=e=>{for(let t of Ge){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},$e=e=>`
    in ${e}`,fl=(e,t)=>{let n=$e(e);return t&&(n+=` (at ${t})`),n},Jo=!1,Qo=(e,t)=>{if(!e||Jo)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,Jo=!0;let o=ml();wi(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let u;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(m){u=m}Reflect.construct(e,[],p)}else{try{p.call()}catch(m){u=m}e.call(p.prototype)}}else{try{throw Error()}catch(m){u=m}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&u instanceof Error&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,d]=s.DetermineComponentFrameRoot();if(c&&d){let u=c.split(`
`),p=d.split(`
`),m=0,f=0;for(;m<u.length&&!u[m].includes("DetermineComponentFrameRoot");)m++;for(;f<p.length&&!p[f].includes("DetermineComponentFrameRoot");)f++;if(m===u.length||f===p.length)for(m=u.length-1,f=p.length-1;m>=1&&f>=0&&u[m]!==p[f];)f--;for(;m>=1&&f>=0;m--,f--)if(u[m]!==p[f]){if(m!==1||f!==1)do if(m--,f--,f<0||u[m]!==p[f]){let g=`
${u[m].replace(" at new "," at ")}`,b=xe(e);return b&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",b)),g}while(m>=1&&f>=0);break}}}finally{Jo=!1,Error.prepareStackTrace=n,wi(o),console.error=r,console.warn=i}let a=e?xe(e):"";return a?$e(a):""},gl=(e,t)=>{let n=e.tag,o="";switch(n){case Wo:o=$e("Activity");break;case Ho:o=Qo(e.type,!0);break;case Io:o=Qo(e.type.render,!1);break;case $o:case Fo:o=Qo(e.type,!1);break;case _o:case Bo:case Go:o=$e(e.type);break;case zo:o=$e("Lazy");break;case Do:o=e.child!==t&&t!==null?$e("Suspense Fallback"):$e("Suspense");break;case Vo:o=$e("SuspenseList");break;case Yo:o=$e("ViewTransition");break;default:return""}return o},hl=e=>{try{let t="",n=e,o=null;do{t+=gl(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=fl(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},yl=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},bl=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),vl=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,xl=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!bl(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>vl(a,o))||(i.push(o),t.set(r,i))}return t},Cl=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(Si,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},wl=e=>{let t=[];return jo(e,n=>{if(!pl(n))return;let o=typeof n.type=="string"?n.type:xe(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:Mi(yl(n._debugStack?.stack))})},!0),t},ft=async(e,t=!0,n)=>{let o=wl(e),r=Mi(hl(e)),i=xl(o),a=new Map;return dl(r.map(s=>s.source?.includes(Si)??!1?Cl(s,i,a):s).filter((s,c,d)=>{if(c===0)return!0;let u=d[c-1];return s.functionName!==u.functionName}),t,n)};var Ei=e=>e.split("/").filter(Boolean).length,El=e=>e.split("/").filter(Boolean)[0]??null,Tl=e=>{let t=e.indexOf("/",1);if(t===-1||Ei(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!Ti.test(n)||Ei(n)<2)return e;let o=El(n);return!o||o.startsWith("@")||o.length>4?e:n},et=e=>{if(!e||js.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=Tl(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),s=i.indexOf(":");t=a!==-1&&(s===-1||a<s)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of Ys)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if(gi.test(t)){let i=t.match(gi);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Xs.test(i)&&(t=t.slice(0,r))}return t},gt=e=>{let t=et(e);return!(!t||!Ti.test(t)||Us.test(t))};var Sl=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);function ht(e){return!!(Sl.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function kl(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}var Ml=50,Pn=.9,Nl=2147483600,Rl=1e3,jt=new WeakMap;function tr(){jt=new WeakMap}function Ll(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function Pl(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=Nl}function Ol(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<Pn||o.height/window.innerHeight<Pn)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>Rl}function Ut(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&kl(e)||e.closest("#sketch-ui-root")||e instanceof HTMLElement&&e.hasAttribute("data-sketch-ui-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-sketch-ui-ghost"))return!1;let n=performance.now(),o=jt.get(e);if(o&&n-o.timestamp<Ml)return o.isValid;let r=window.getComputedStyle(e);return Ll(e,r)?e.clientWidth/window.innerWidth>=Pn&&e.clientHeight/window.innerHeight>=Pn&&(Pl(r)||Ol(e,r))?(jt.set(e,{isValid:!1,timestamp:n}),!1):(jt.set(e,{isValid:!0,timestamp:n}),!0):(jt.set(e,{isValid:!1,timestamp:n}),!1)}var Al=.75,Ai=32,On=3,An=20,$i=100,fe=1;function yt(e,t,n){return Math.min(n,Math.max(t,e))}function $l(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,s=o+e.width/2,c=r+e.height/2,d=yt(Math.ceil(e.width/Ai),On,An),u=yt(Math.ceil(e.height/Ai),On,An);if(d*u>$i){let g=Math.sqrt($i/(d*u));d=yt(Math.floor(d*g),On,An),u=yt(Math.floor(u*g),On,An)}let p=new Set,m=[],f=(g,b)=>{let x=yt(Math.round(g),0,t-1),R=yt(Math.round(b),0,n-1),$=`${x}:${R}`;p.has($)||(p.add($),m.push({x,y:R}))};f(o+fe,r+fe),f(i-fe,r+fe),f(o+fe,a-fe),f(i-fe,a-fe),f(s,r+fe),f(s,a-fe),f(o+fe,c),f(i-fe,c),f(s,c);for(let g=0;g<d;g++){let b=o+(g+.5)/d*e.width;for(let x=0;x<u;x++)f(b,r+(x+.5)/u*e.height)}return m}function Hi(e,t=Ut,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=$l(e);for(let c of i)for(let d of document.elementsFromPoint(c.x,c.y))r.add(d);let a=[];for(let c of r){if(!t(c))continue;let d=c.getBoundingClientRect();if(d.width<=0||d.height<=0)continue;let u={left:d.left,top:d.top,right:d.left+d.width,bottom:d.top+d.height};if(n){let p=Math.max(o.left,u.left),m=Math.max(o.top,u.top),f=Math.min(o.right,u.right),g=Math.min(o.bottom,u.bottom),b=Math.max(0,f-p)*Math.max(0,g-m),x=d.width*d.height;x>0&&b/x>=Al&&a.push(c)}else o.left<u.right&&o.right>u.left&&o.top<u.bottom&&o.bottom>u.top&&a.push(c)}let s=a.filter(c=>!a.some(d=>d!==c&&d.contains(c)));return s.sort((c,d)=>{let u=c.compareDocumentPosition(d);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0}),s}U();function bt(e,t,n){return e+(t-e)*n}U();var Hl=.35,_i=.3,$n=.5,_l=2,ne=null,G=null,nr=0,or=0,Kt=1,vt=null,Q=null,_=null,V=[],Xt=l.accent,Il="rgba(162,89,255,0.08)",Ii="rgba(162,89,255,0.15)",Dl=4,Di=10,Fl="#ffffff",zl=Xt,Vl=1.5,ar=!0;function zi(){let e=K();e&&(ne=document.createElement("canvas"),ne.setAttribute("data-sketch-ui-ghost","true"),ne.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(ne),sr(),window.addEventListener("resize",sr))}function qt(e,t=4){if(!e){Q&&(Q.targetOpacity=0,tt());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!Q||!Q.initialized?Q=cr(n,t):(Q.target=n,Q.borderRadius=t,Q.targetOpacity=1),tt()}function nt(e,t=4){if(!e){_&&(_.targetOpacity=0,tt());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!_||!_.initialized?_=cr(n,t):(_.target=n,_.borderRadius=t,_.targetOpacity=1),tt()}function Vi(e){for(_=null;V.length>e.length;)V.pop();for(let t=0;t<e.length;t++){let n=e[t],o={x:n.rect.left,y:n.rect.top,w:n.rect.width,h:n.rect.height};t<V.length?(V[t].target=o,V[t].borderRadius=n.borderRadius,V[t].targetOpacity=1):V.push(cr(o,n.borderRadius))}tt()}function Zt(){V=[],tt()}function lr(e,t){if(!ar)return null;let n=Wi();if(!n)return null;let o=Ui(n.x,n.y,n.w,n.h);for(let r of o){let i=e-r.x,a=t-r.y;if(i*i+a*a<=Di*Di)return r.corner}return null}function Bi(){return Wi()}function Gi(){vt!==null&&cancelAnimationFrame(vt),window.removeEventListener("resize",sr),ne?.remove(),ne=null,G=null,Q=null,_=null,V=[]}function Wi(){if(V.length>1)return Yi(V);if(_&&_.opacity>=.5){let{x:e,y:t,w:n,h:o}=_.current;return{x:e,y:t,w:n,h:o}}if(V.length===1){let{x:e,y:t,w:n,h:o}=V[0].current;return{x:e,y:t,w:n,h:o}}return null}function Yi(e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,r=-1/0;for(let i of e){let{x:a,y:s,w:c,h:d}=i.current;a<t&&(t=a),s<n&&(n=s),a+c>o&&(o=a+c),s+d>r&&(r=s+d)}return{x:t,y:n,w:o-t,h:r-n}}function cr(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function sr(){ne&&(Kt=Math.max(window.devicePixelRatio||1,_l),nr=window.innerWidth,or=window.innerHeight,ne.width=nr*Kt,ne.height=or*Kt,ne.style.width=`${nr}px`,ne.style.height=`${or}px`,G=ne.getContext("2d"),tt())}function tt(){vt===null&&(vt=requestAnimationFrame(ji))}function ji(){if(vt=null,!G||!ne)return;let e=!1;Q?.initialized&&(rr(Q,Hl)&&(e=!0),Q.opacity<.01&&Q.targetOpacity===0&&(Q=null)),_?.initialized&&(rr(_,_i)&&(e=!0),_.opacity<.01&&_.targetOpacity===0&&(_=null));for(let t=V.length-1;t>=0;t--){let n=V[t];n.initialized&&rr(n,_i)&&(e=!0),n.opacity<.01&&n.targetOpacity===0&&V.splice(t,1)}if(G.setTransform(1,0,0,1,0,0),G.clearRect(0,0,ne.width,ne.height),G.setTransform(Kt,0,0,Kt,0,0),Q&&ir(G,Q,Xt,Il),_&&(ir(G,_,Xt,Ii),ar&&Fi(G,_.current,_.opacity)),V.length>0){for(let t of V)ir(G,t,Xt,Ii);if(ar&&V.length>0){let t=Yi(V);t&&t.w>=24&&t.h>=24&&(V.length>1&&(G.globalAlpha=.6,G.beginPath(),G.rect(t.x,t.y,t.w,t.h),G.strokeStyle=Xt,G.lineWidth=1,G.setLineDash([4,4]),G.stroke(),G.setLineDash([]),G.globalAlpha=1),Fi(G,t,1))}}e&&(vt=requestAnimationFrame(ji))}function rr(e,t){let n=e.current,o=e.target,r=bt(n.x,o.x,t),i=bt(n.y,o.y,t),a=bt(n.w,o.w,t),s=bt(n.h,o.h,t),c=bt(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<$n&&Math.abs(i-o.y)<$n&&Math.abs(a-o.w)<$n&&Math.abs(s-o.h)<$n&&Math.abs(c-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=s,e.opacity=c,!0)}function ir(e,t,n,o){let{x:r,y:i,w:a,h:s}=t.current;if(a<=0||s<=0)return;let c=Math.min(t.borderRadius,a/2,s/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,a,s,c):e.rect(r,i,a,s),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function Ui(e,t,n,o){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+n,y:t},{corner:"br",x:e+n,y:t+o},{corner:"bl",x:e,y:t+o}]}function Fi(e,t,n){if(t.w<24||t.h<24)return;e.globalAlpha=n;let o=Ui(t.x,t.y,t.w,t.h);for(let r of o)e.beginPath(),e.arc(r.x,r.y,Dl,0,Math.PI*2),e.fillStyle=Fl,e.fill(),e.strokeStyle=zl,e.lineWidth=Vl,e.stroke();e.globalAlpha=1}var Bl=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],Gl=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],Wl=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],Yl=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],jl=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],xt=[...Bl,...Gl,...Wl,...Yl,...jl];U();var Ul=new Set(["auto","none","normal","inherit","initial"]);function Xi(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let s=document.createElement("input");s.type="text",s.className="prop-input",s.style.cssText="width:60px; cursor:text;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${T};`,a.appendChild(s),a.appendChild(c);let d=new Map(t);function u(){return d.get(r.key)??r.defaultValue}function p(m){let f=parseFloat(m);s.value=isNaN(f)?m:String(f);try{let b=Gr(i,m).find(x=>x.cssValue===m);b?.token?c.textContent=`${r.tailwindPrefix}-${b.token}`:c.textContent=""}catch{c.textContent=""}}return s.addEventListener("blur",()=>{let m=s.value.trim(),f=parseFloat(m);if(isNaN(f))Ul.has(m)?(d.set(r.key,m),p(m),n(r.key,m),o()):p(u());else{let b=m.match(/(px|rem|em|%|vw|vh|ch)$/)?m:`${f}px`;d.set(r.key,b),p(b),n(r.key,b),o()}}),s.addEventListener("keydown",m=>{m.key==="Enter"?s.blur():m.key==="Escape"&&(p(u()),s.blur())}),p(u()),{element:a,setValue(m,f){m===r.key&&(d.set(m,f),p(f))},destroy(){}}}U();function Ki(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),p.textContent=u.icon??u.label,p.title=u.label,p.addEventListener("click",()=>{d(u.value),n(r.key,u.value),o()}),c.push({btn:p,value:u.value,opt:u}),a.appendChild(p)}return d(s),{element:a,setValue(u,p){u===r.key&&d(p)},destroy(){}}}U();U();function Hn(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,s=0;a!==0&&(r===t?s=((n-o)/a+(n<o?6:0))*60:r===n?s=((o-t)/a+2)*60:s=((t-n)/a+4)*60);let c=r===0?0:a/r*100,d=r*100;return{h:s,s:c,v:d}}function _n(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),s=o*(1-i*n),c=o*(1-(1-i)*n),d,u,p;switch(r%6){case 0:d=o,u=c,p=a;break;case 1:d=s,u=o,p=a;break;case 2:d=a,u=o,p=c;break;case 3:d=a,u=s,p=o;break;case 4:d=c,u=a,p=o;break;case 5:d=o,u=a,p=s;break;default:d=0,u=0,p=0}let m=f=>Math.round(f*255).toString(16).padStart(2,"0");return`#${m(d)}${m(u)}${m(p)}`}var We=null;function ot(e){He();let t=K();if(!t)return;let n=document.createElement("div");n.style.cssText=`
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
  `,requestAnimationFrame(()=>{let y=n.getBoundingClientRect();y.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-y.width-8}px`),y.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-y.height-8}px`),n.style.opacity="1"});let o=Hn(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let y=Xl(["Fill","Text"],0,S=>{r=S===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(y)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),s=document.createElement("div");s.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${L.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(s),n.appendChild(c);function d(){let y=o.h,S=a.createLinearGradient(0,0,176,0);S.addColorStop(0,`hsl(${y}, 0%, 100%)`),S.addColorStop(1,`hsl(${y}, 100%, 50%)`),a.fillStyle=S,a.fillRect(0,0,176,120);let Y=a.createLinearGradient(0,0,0,120);Y.addColorStop(0,"rgba(0,0,0,0)"),Y.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=Y,a.fillRect(0,0,176,120);let ce=o.s/100*176,Ve=(1-o.v/100)*120;s.style.left=`${ce}px`,s.style.top=`${Ve}px`}let u=!1;i.addEventListener("mousedown",y=>{u=!0,p(y)});function p(y){let S=i.getBoundingClientRect(),Y=Math.max(0,Math.min(176,y.clientX-S.left)),ce=Math.max(0,Math.min(120,y.clientY-S.top));o.s=Y/176*100,o.v=(1-ce/120)*100,d(),H()}let m=document.createElement("canvas");m.width=176,m.height=14,m.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let f=m.getContext("2d"),g=document.createElement("div");g.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${L.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let b=document.createElement("div");b.style.cssText="position:relative;width:176px;height:14px;",b.appendChild(m),b.appendChild(g),n.appendChild(b);function x(){let y=f.createLinearGradient(0,0,176,0);for(let S=0;S<=6;S++)y.addColorStop(S/6,`hsl(${S*60}, 100%, 50%)`);f.fillStyle=y,f.fillRect(0,0,176,14),g.style.left=`${o.h/360*176}px`}let R=!1;m.addEventListener("mousedown",y=>{R=!0,$(y)});function $(y){let S=m.getBoundingClientRect(),Y=Math.max(0,Math.min(176,y.clientX-S.left));o.h=Y/176*360,x(),d(),H()}let O=document.createElement("input");O.type="text",O.value=_n(o),O.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: ${N.sm};
    color: ${l.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,O.addEventListener("keydown",y=>{y.key==="Enter"&&O.blur(),y.stopPropagation()}),O.addEventListener("blur",()=>{let y=O.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(y)){let S=y.startsWith("#")?y:`#${y}`;o=Hn(S),d(),x(),H()}else O.value=_n(o)}),n.appendChild(O);let z=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],C=document.createElement("div");C.style.cssText="display:flex;gap:4px;justify-content:center;";for(let y of z){let S=document.createElement("button");S.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${y};
      border: 1px solid ${l.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${k.fast};
    `,S.addEventListener("mouseenter",()=>{S.style.boxShadow=L.sm}),S.addEventListener("mouseleave",()=>{S.style.boxShadow="none"}),S.addEventListener("click",()=>{o=Hn(y),d(),x(),O.value=y,H()}),C.appendChild(S)}n.appendChild(C);function H(){let y=_n(o);O.value=y,e.onColorChange(y)}t.appendChild(n),We=n,d(),x();let oe=y=>{u&&p(y),R&&$(y)},re=()=>{u=!1,R=!1};document.addEventListener("mousemove",oe),document.addEventListener("mouseup",re);let M=y=>{y.key==="Escape"&&He()};document.addEventListener("keydown",M,!0);let B=y=>{We&&!y.composedPath().includes(We)&&He()};setTimeout(()=>document.addEventListener("mousedown",B,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",oe),document.removeEventListener("mouseup",re),document.removeEventListener("keydown",M,!0),document.removeEventListener("mousedown",B,!0)},n._onClose=e.onClose}function He(){We&&(We._cleanup?.(),We._onClose?.(),We.remove(),We=null)}function Xl(e,t,n){let o=document.createElement("div");o.style.cssText=`
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
    `,a.addEventListener("click",()=>{r.forEach((s,c)=>{s.style.background=c===i?l.bgPrimary:"transparent",s.style.boxShadow=c===i?L.sm:"none",s.style.color=c===i?l.textPrimary:l.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var ur=null;function Kl(){return ur||(ur=document.createElement("canvas").getContext("2d")),ur}function qi(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${N.sm};
    border:1px solid ${l.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("input");s.type="text",s.placeholder="#rrggbb",s.className="prop-input",s.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${T};`,i.appendChild(a),i.appendChild(s),i.appendChild(c);let d=t.get(r.key)??r.defaultValue,u=!1;function p(g){let b=g.trim().toLowerCase();if(b==="transparent")return"transparent";if(b==="inherit"||b==="currentcolor"||b==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(b))return b;let x=Kl();x.fillStyle="#000000",x.fillStyle=b;let R=x.fillStyle;if(R.startsWith("#"))return R;let $=R.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if($){let O=parseInt($[1],10),z=parseInt($[2],10),C=parseInt($[3],10);return`#${((1<<24)+(O<<16)+(z<<8)+C).toString(16).slice(1)}`}return"#000000"}function m(g){d=g,s.value=g,g==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=g;try{let b=_t(),x=Cn(g,b.colorsReverse);x?c.textContent=`${r.tailwindPrefix??"bg"}-${x}`:c.textContent=""}catch{c.textContent=""}}function f(){if(u)return;let g=s.value.trim();if(!g){m(d);return}let b=p(g);m(b),n(r.key,b),o()}return a.addEventListener("click",()=>{if(u){He(),u=!1;return}let g=a.getBoundingClientRect();u=!0,ot({initialColor:p(d),position:{x:g.left-210,y:g.top},showPropertyToggle:!1,onColorChange:b=>{m(b),n(r.key,b)},onClose:()=>{u=!1,o()}})}),s.addEventListener("keydown",g=>{g.key==="Enter"?(f(),s.blur()):g.key==="Escape"&&(m(d),s.blur())}),s.addEventListener("blur",()=>{f()}),s.addEventListener("input",()=>{let g=s.value.trim(),b=p(g);a.style.background=b}),m(d),{element:i,setValue(g,b){g===r.key&&m(b)},destroy(){u&&(He(),u=!1)}}}U();function Zi(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function Ji(e,t,n,o){let r=new Map(t),i=[];for(let E of e){let w=Zi(E.key);w&&i.push({descriptor:E,...w})}let a=document.createElement("div");a.style.cssText=`
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
  `.trim().replace(/\n\s*/g," "),u.textContent="content";let p=[];function m(E){let w=document.createElement("span"),ue=r.get(E.key)??E.defaultValue;return w.textContent=$(ue),w.title=E.label,w.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),w.addEventListener("mouseenter",()=>{w.style.background=l.bgTertiary}),w.addEventListener("mouseleave",()=>{(document.activeElement!==f||f.dataset.key!==E.key)&&(w.style.background="transparent")}),w.addEventListener("click",()=>{x(E,w)}),p.push({key:E.key,span:w,descriptor:E}),w}let f=document.createElement("input");f.type="text",f.className="prop-input",f.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(f);let g=null,b=null;function x(E,w){g&&g!==E&&R(),g=E,b=w,f.dataset.key=E.key;let ue=r.get(E.key)??E.defaultValue;f.value=$(ue);let J=0,Ze=0,Be=w;for(;Be&&Be!==a;)J+=Be.offsetLeft,Ze+=Be.offsetTop,Be=Be.offsetParent;f.style.display="block",f.style.left=`${J}px`,f.style.top=`${Ze}px`;let Br=w.getBoundingClientRect();f.style.width=`${Math.max(40,Br.width+10)}px`,f.focus(),f.select()}function R(){if(!g||!b)return;let E=f.value.trim(),w=g,ue=b,J,Ze=parseFloat(E),Be=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(Ze)?Be.has(E)?J=E:J=r.get(w.key)??w.defaultValue:J=E.match(/(px|rem|em|%|vw|vh|ch)$/)?E:`${Ze}px`,r.set(w.key,J),ue.textContent=$(J),ue.style.background="transparent",f.style.display="none",f.dataset.key="",g=null,b=null,n(w.key,J),o()}f.addEventListener("keydown",E=>{if(E.key==="Enter")R();else if(E.key==="Escape"){if(g&&b){let w=r.get(g.key)??g.defaultValue;b.textContent=$(w)}f.style.display="none",f.dataset.key="",g=null,b=null}}),f.addEventListener("blur",()=>{R()});function $(E){let w=parseFloat(E);return isNaN(w)?E:w===Math.round(w)?String(Math.round(w)):E}function O(E){let w=document.createElement("span");return w.textContent=E,w.style.cssText=`
      font-size:9px;
      color:${l.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),w}function z(E,w){return i.find(ue=>ue.layer===E&&ue.side===w)}function C(E,w){let ue=z(E,w);if(!ue){let J=document.createElement("span");return J.textContent="-",J.style.cssText=`text-align:center; color:${l.textTertiary};`,J}return m(ue.descriptor)}let H=C("padding","top");H.style.gridRow="1",H.style.gridColumn="2",H.style.textAlign="center";let oe=C("padding","left");oe.style.gridRow="2",oe.style.gridColumn="1";let re=C("padding","right");re.style.gridRow="2",re.style.gridColumn="3";let M=C("padding","bottom");M.style.gridRow="3",M.style.gridColumn="2",M.style.textAlign="center",u.style.gridRow="2",u.style.gridColumn="2",d.appendChild(H),d.appendChild(oe),d.appendChild(u),d.appendChild(re),d.appendChild(M);let B=document.createElement("div");B.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let y=C("margin","top");y.style.gridRow="1",y.style.gridColumn="2",y.style.textAlign="center";let S=C("margin","left");S.style.gridRow="2",S.style.gridColumn="1";let Y=C("margin","right");Y.style.gridRow="2",Y.style.gridColumn="3";let ce=C("margin","bottom");ce.style.gridRow="3",ce.style.gridColumn="2",ce.style.textAlign="center";let Ve=document.createElement("div");Ve.style.cssText="grid-row:2; grid-column:2;",Ve.appendChild(d),B.appendChild(y),B.appendChild(S),B.appendChild(Ve),B.appendChild(Y),B.appendChild(ce);let vn=O("margin"),Os=O("padding"),xn=document.createElement("div");return xn.style.cssText="display:flex; gap:8px; padding:0 4px;",xn.appendChild(vn),xn.appendChild(Os),c.appendChild(B),s.appendChild(c),a.appendChild(xn),a.appendChild(s),{element:a,setValue(E,w){if(!Zi(E))return;r.set(E,w);let J=p.find(Ze=>Ze.key===E);J&&(J.span.textContent=$(w))},destroy(){}}}U();var In=new Set;function Qi(e){return In.has(e)}var Dn=[];function ea(e){return Dn.push(e),()=>{let t=Dn.indexOf(e);t>=0&&Dn.splice(t,1)}}var ql={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},Zl={"number-scrub":Xi,segmented:Ki,"color-swatch":qi,"box-model":Ji},Jl=`
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
`;function Ql(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function ec(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function tc(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}var nc=new Set(["flexDirection","justifyContent","alignItems","gap"]);function oc(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function dr(e,t,n,o){let r=document.createElement("div");r.className="prop-sections";let i=document.createElement("style");i.textContent=Jl,r.appendChild(i);let a=[],s=ec(e);for(let[c,d]of s){let u=c==="layout"&&!oc(t)?d.filter(x=>!nc.has(x.key)):d;if(u.length===0)continue;let p=document.createElement("div");p.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${ql[c]}</span>${Ql()}`;let f=document.createElement("div");f.className="prop-section-body";let g=In.has(c);if(g){let x=m.querySelector(".prop-section-chevron");x&&x.classList.add("collapsed"),f.classList.add("collapsed")}m.addEventListener("click",()=>{if(g=!g,g)In.add(c);else{In.delete(c);for(let R of Dn)R(c)}let x=m.querySelector(".prop-section-chevron");x&&x.classList.toggle("collapsed",g),f.classList.toggle("collapsed",g)}),p.appendChild(m);let b=tc(u);for(let x of b){let R=Zl[x.controlType];if(!R)continue;let $=R(x.descriptors,t,n,o);if(x.descriptors.length>1||x.controlType==="box-model")f.appendChild($.element);else{let O=document.createElement("div");O.className="prop-control-row";let z=document.createElement("span");z.className="prop-control-label",z.textContent=x.descriptors[0].label,z.title=x.descriptors[0].label;let C=document.createElement("div");C.className="prop-control-value",C.appendChild($.element),O.appendChild(z),O.appendChild(C),f.appendChild(O)}a.push($)}p.appendChild(f),r.appendChild(p)}return{container:r,controls:a}}U();var rc=300,ta=260,na=380,oa="sketch-ui-sidebar-width",ic=4,ac=`
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
`;function sc(){try{let e=localStorage.getItem(oa);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=ta&&t<=na)return t}}catch{}return Math.min(rc,Math.floor(window.innerWidth*.22))}function lc(e){try{localStorage.setItem(oa,String(e))}catch{}}function ra(e,t){let n=document.createElement("style");n.textContent=ac,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${sc()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let s=document.createElement("div");s.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let d=document.createElement("div");d.className="prop-sidebar-file-path",a.appendChild(s),a.appendChild(d);let u=document.createElement("button");u.className="prop-sidebar-close",u.title="Close panel",u.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>',i.appendChild(a),i.appendChild(u),o.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",o.appendChild(p);let m=document.createElement("div");m.className="prop-sidebar-content",o.appendChild(m),e.appendChild(o);let f=!1,g=0,b=0;r.addEventListener("pointerdown",M=>{M.preventDefault(),M.stopPropagation(),f=!0,g=M.clientX,b=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(M.pointerId)}),r.addEventListener("pointermove",M=>{if(!f)return;let B=g-M.clientX,y=Math.max(ta,Math.min(na,b+B));o.style.width=`${y}px`});let x=()=>{f&&(f=!1,r.classList.remove("active"),lc(o.offsetWidth))};r.addEventListener("pointerup",x),r.addEventListener("pointercancel",x),o.addEventListener("pointerdown",M=>M.stopPropagation()),o.addEventListener("mousedown",M=>M.stopPropagation()),o.addEventListener("click",M=>M.stopPropagation()),o.addEventListener("mouseup",M=>M.stopPropagation()),u.addEventListener("click",()=>{O(),t&&t()});let R=!1;function $(M,B,y,S){s.textContent=`<${M}>`,s.appendChild(c),d.textContent=`${B}:${y}`,d.title=`${B}:${y}`,m.innerHTML="",m.appendChild(S),R||(R=!0,o.offsetHeight,o.classList.add("visible"))}function O(){R&&(R=!1,o.classList.remove("visible"))}function z(M){m.innerHTML="",m.appendChild(M)}function C(M,B,y){p.innerHTML="";let S=document.createElement("span");S.className="prop-sidebar-warning-text",S.textContent=M;let Y=document.createElement("button");Y.className="prop-sidebar-warning-btn",Y.textContent=B,Y.addEventListener("click",ce=>{ce.stopPropagation(),y()}),p.appendChild(S),p.appendChild(Y),p.style.display="flex"}function H(){p.style.display="none",p.innerHTML=""}function oe(){c.classList.add("active")}function re(){c.classList.remove("active")}return{show:$,hide:O,isVisible:()=>R,getElement:()=>o,replaceContent:z,showWarning:C,clearWarning:H,showSaving:oe,hideSaving:re}}de();var hr=new Map(xt.map(e=>[e.key,e]));var uc=new Set(["layout","spacing","size"]),xa=new Set(["typography","background"]),dc=5e3,h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map},rt=[],I,Ca,pe=null,pc=300,be=null,wt=null,Xn=new MutationObserver(()=>{h.selectedElement&&!document.contains(h.selectedElement)&&(clearTimeout(Ca),Ca=setTimeout(()=>{mc()},80))});function mc(){let e=h.elementIdentity,t=h.componentInfo;if(!e||!t){Tt();return}let n=fc(e);if(n){Et(n,t);return}gc(e).then(o=>{o?Et(o,t):Tt()})}function fc(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=Ce(n);for(;o;){if(Ae(o)){let r=o._debugSource,i=xe(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function gc(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=Ce(n);if(!o)continue;let r=await ft(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let s="";if(i.fileName){let c=et(i.fileName);gt(c)&&(s=c)}if(s&&e.filePath.endsWith(s)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}function hc(e,t){let n=getComputedStyle(e),o=new Map;for(let r of xt){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function yc(e){if(!h.selectedElement)return;let t=getComputedStyle(h.selectedElement);for(let n of xt){if(n.group!==e||h.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;h.currentValues.set(n.key,r),h.originalValues.get(n.key)===n.defaultValue&&h.originalValues.set(n.key,r);for(let i of rt)i.setValue(n.key,r)}}function nn(){for(let e of rt)e.destroy();rt=[]}function wa(){if(!h.selectedElement||!h.componentInfo)return;nn();let{container:e,controls:t}=dr(xt,h.currentValues,on,Kn);rt=t,I.replaceContent(e)}function Kn(){pe&&clearTimeout(pe),pe=setTimeout(()=>{pe=null,br()},pc)}function yr(){pe&&(clearTimeout(pe),pe=null),wt&&(wt(),wt=null),be&&(clearTimeout(be.timeoutId),be=null),h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map}}function Ea(e){I=ra(e,()=>{qn(),nn(),yr()}),jr((t,n,o)=>{if(I&&I.hideSaving(),be)if(clearTimeout(be.timeoutId),t)be=null;else{let{batch:r,previousOriginals:i}=be;be=null;for(let[a]of r){let s=i.get(a);s!==void 0&&h.originalValues.set(a,s)}if(h.selectedElement){for(let[a]of r){h.selectedElement.style[a]="",h.activeOverrides.delete(a);let s=h.originalValues.get(a);s!==void 0&&h.currentValues.set(a,s)}for(let a of rt)for(let[s]of r){let c=h.originalValues.get(s);c!==void 0&&a.setValue(s,c)}}if(I){let s={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";I.showWarning(s,"Dismiss",()=>I.clearWarning())}}else if(!t&&I){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";I.showWarning(i,"Dismiss",()=>I.clearWarning())}})}function Et(e,t){h.pendingBatch.size>0&&br(),nn(),h.selectedElement=e,h.componentInfo=t,h.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(uc);for(let a of xa)Qi(a)||n.add(a);let o=hc(e,n);h.currentValues=o,h.originalValues=new Map(o),h.activeOverrides=new Map,h.pendingBatch=new Map,wt&&wt(),wt=ea(a=>{xa.has(a)&&yc(a)});let{container:r,controls:i}=dr(xt,h.currentValues,on,Kn);rt=i,Xn.disconnect(),Xn.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),I.show(t.componentName,t.filePath,t.lineNumber,r)}function on(e,t){let n=hr.get(e);if(!n||!h.selectedElement)return;h.selectedElement.style[n.key]=t,h.activeOverrides.set(e,t),h.currentValues.set(e,t);let o=_t(),r=n.tailwindScale+"Reverse",i=o[r],a=i?Cn(t,i):null;if(!a&&n.enumValues){let s=n.enumValues.find(c=>c.value===t);s&&(a=s.tailwindValue)}if(h.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:h.originalValues.get(e)||n.defaultValue}),e==="display")if(wa(),t==="none"){let s=h.originalValues.get("display")||"block";I.showWarning("Element hidden","Restore",()=>{h.selectedElement&&(h.selectedElement.style.display=s),h.activeOverrides.delete("display"),h.currentValues.set("display",s),h.pendingBatch.delete("display"),wa(),I.clearWarning()})}else I.clearWarning()}function br(){if(h.pendingBatch.size===0||!h.componentInfo)return;let e=h.componentInfo.filePath,t=h.componentInfo.lineNumber,n=h.componentInfo.columnNumber-1;if(h.pendingBatch.size===1){let a=[...h.pendingBatch.values()][0],s=hr.get(a.property);Te({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:n,...a,framework:"tailwind",classPattern:s?.classPattern,standalone:s?.standalone})}else Te({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:n,updates:[...h.pendingBatch.values()].map(a=>{let s=hr.get(a.property);return{...a,classPattern:s?.classPattern,standalone:s?.standalone}}),framework:"tailwind"});h.selectedElement&&h.elementIdentity&&ya({type:"propertyChange",elementIdentity:h.elementIdentity,element:h.selectedElement,overrides:[...h.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),I&&I.showSaving();let o=new Map;for(let[a]of h.pendingBatch)o.set(a,h.originalValues.get(a)||"");for(let[a,s]of h.pendingBatch)h.originalValues.set(a,s.value);let r=new Map(h.pendingBatch),i=setTimeout(()=>{be&&be.batch===r&&(be=null,I&&I.hideSaving())},dc);be={batch:r,previousOriginals:o,timeoutId:i},h.pendingBatch.clear()}function qn(){if(h.selectedElement){for(let[e]of h.activeOverrides)h.selectedElement.style[e]="";for(let[e,t]of h.originalValues)h.currentValues.set(e,t);for(let e of rt)for(let[t,n]of h.originalValues)e.setValue(t,n);h.activeOverrides.clear(),h.pendingBatch.clear()}}function Tt(){pe&&(clearTimeout(pe),pe=null),Xn.disconnect(),qn(),nn(),I&&I.hide(),yr()}function Ta(){pe&&(clearTimeout(pe),pe=null),Xn.disconnect(),br(),nn(),I&&I.hide(),yr()}function Sa(){return h.activeOverrides.size>0}de();de();St();U();var Sc="2147483644",Tr=null;function Ha(){Tr=Ra(kc)}function kc(e){for(let t of Ue().values())e?(e.appendChild(t.cloneEl),t.cloneEl.style.position="absolute",t.cloneEl.style.left=`${t.currentPos.x}px`,t.cloneEl.style.top=`${t.currentPos.y}px`,t.cloneEl.style.transform="",t.cloneEl.style.transformOrigin=""):(document.body.appendChild(t.cloneEl),t.cloneEl.style.position="fixed",t.cloneEl.style.left=`${t.currentPos.x}px`,t.cloneEl.style.top=`${t.currentPos.y}px`,t.cloneEl.style.transform="",t.cloneEl.style.transformOrigin="")}function _a(e,t){let n=e.getBoundingClientRect(),{scale:o,offsetX:r,offsetY:i}=Se(),a=e.cloneNode(!0);a.setAttribute("data-sketch-ui-ghost","true"),a.style.width=`${n.width/o}px`,a.style.height=`${n.height/o}px`,a.style.zIndex=Sc,a.style.pointerEvents="none",a.style.margin="0",a.style.boxSizing="border-box",a.style.boxShadow=L.sm;let s=(n.left-r)/o,c=(n.top-i)/o,d=wr();d?(a.style.position="absolute",a.style.left=`${s}px`,a.style.top=`${c}px`,d.appendChild(a)):(a.style.position="fixed",a.style.left=`${n.left}px`,a.style.top=`${n.top}px`,a.style.transform=`scale(${o})`,a.style.transformOrigin="0 0",document.body.appendChild(a));let u=e.style.opacity||"",p=e.style.visibility||"",m=Wn();e.style.opacity=m?"0":"0.3",m&&(e.style.visibility="hidden");let f={id:crypto.randomUUID(),componentRef:t,originalRect:{top:c,left:s,width:n.width/o,height:n.height/o},currentPos:{x:s,y:c},cloneEl:a,originalEl:e,originalOpacity:u,originalVisibility:p};return ca(f),f}function Zn(e,t,n){let o=Ue().get(e);if(!o)return;if(o.currentPos={x:t,y:n},wr())o.cloneEl.style.left=`${t}px`,o.cloneEl.style.top=`${n}px`;else{let{scale:i,offsetX:a,offsetY:s}=Se();o.cloneEl.style.left=`${t*i+a}px`,o.cloneEl.style.top=`${n*i+s}px`,o.cloneEl.style.transform=`scale(${i})`,o.cloneEl.style.transformOrigin="0 0"}}function an(e,t){for(let n of Ue().values()){let o=n.cloneEl.getBoundingClientRect();if(e>=o.left&&e<=o.right&&t>=o.top&&t<=o.bottom)return n}return null}function Ia(){Tr?.(),Tr=null}function Jn(e){let t=Ue().get(e);t&&(t.cloneEl.style.boxShadow=L.lg,t.cloneEl.style.opacity="0.9",t.cloneEl.style.transition=`box-shadow ${k.settle}`)}function Da(e){let t=Ue().get(e);t&&(t.cloneEl.style.boxShadow=L.sm,t.cloneEl.style.opacity="1")}qo()||Zo({onCommitFiberRoot(){}});async function Mc(e){let t=Ce(e);if(!t)return null;try{let n=await ft(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||ht(i))continue;let a="";if(r.fileName){let s=et(r.fileName);gt(s)&&(a=s)}o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0)return{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}}catch(n){console.warn("[SketchUI] getOwnerStack failed, falling back to fiber walk:",n)}return Fa(e,t)}function Fa(e,t){let n=[],o=t;for(;o;){if(Ae(o)){let r=xe(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",s=0,c=0;i&&(a=i.fileName||"",s=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!ht(r)&&n.push({componentName:r,filePath:a,lineNumber:s,columnNumber:c})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function za(e){let t=Ce(e);return t?Fa(e,t):null}var W=null,F=null,Ne=null,Ie=!1,kt=!1,P=new Map,v=null,Ee=null,ke="idle",D=null,it=null,ve=null,io=null,sn=0,ln=0,Xe=[],Qn=!1,Nc=null,Rc=null,Lc=null,Pc=`
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
`;function Va(e){Nc=e.onStart,Rc=e.onMove,Lc=e.onEnd}function Ba(){let e=K();if(!e)return;let t=document.createElement("style");t.textContent=Pc,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),Ee=document.createElement("div"),Ee.className="marquee-box",e.appendChild(Ee),Ie=!0,document.addEventListener("mousedown",eo,!0),document.addEventListener("mousemove",to,!0),document.addEventListener("mouseup",no,!0),document.addEventListener("keydown",ro,!0),document.addEventListener("click",oo,!0),document.addEventListener("scroll",Me,!0),window.addEventListener("resize",Me),kt=!0}function eo(e){if(!Ie||e.metaKey||e.ctrlKey)return;let t=document.elementFromPoint(e.clientX,e.clientY);if(t?.closest("#sketch-ui-root"))return;if(W||P.size>0){let r=lr(e.clientX,e.clientY);if(r){e.preventDefault(),e.stopPropagation();let i=Bi();if(ve=r,io=i?{...i}:null,P.size>0){Xe=[];for(let[a]of P){let s=getComputedStyle(a);Xe.push({element:a,width:parseFloat(s.width)||a.offsetWidth,height:parseFloat(s.height)||a.offsetHeight})}sn=0,ln=0}else if(F){let a=getComputedStyle(F);sn=parseFloat(a.width)||F.offsetWidth,ln=parseFloat(a.height)||F.offsetHeight,Xe=[]}D={x:e.clientX,y:e.clientY},ke="resize-drag";return}}e.preventDefault(),e.stopPropagation();let o=an(e.clientX,e.clientY);if(o){e.shiftKey||cn(),D={x:e.clientX,y:e.clientY},it=o.originalEl,Ne=o,ke="pending";return}if(!t||!Ut(t)){(W||P.size>0)&&(Ta(),W=null,F=null,Ne=null,cn(),nt(null),v&&(v.classList.remove("visible"),v.style.display="none"),Oe(null));return}D={x:e.clientX,y:e.clientY},it=t,Ne=null,Qn=e.shiftKey,ke="pending"}function to(e){if(Ie){if(ke==="resize-drag"&&ve&&D&&io){e.preventDefault(),e.stopPropagation();let t=e.clientX-D.x,n=e.clientY-D.y;if(Xe.length>0){for(let o of Xe){let r=o.width,i=o.height;ve==="tr"||ve==="br"?r=Math.max(10,o.width+t):r=Math.max(10,o.width-t),ve==="bl"||ve==="br"?i=Math.max(10,o.height+n):i=Math.max(10,o.height-n),o.element.style.width=`${Math.round(r)}px`,o.element.style.height=`${Math.round(i)}px`}un()}else{let o=sn,r=ln;ve==="tr"||ve==="br"?o=Math.max(10,sn+t):o=Math.max(10,sn-t),ve==="bl"||ve==="br"?r=Math.max(10,ln+n):r=Math.max(10,ln-n),o=Math.round(o),r=Math.round(r),on("width",`${o}px`),on("height",`${r}px`),Me()}return}if(ke==="pending"&&D){let t=Math.abs(e.clientX-D.x),n=Math.abs(e.clientY-D.y);(t>10||n>10)&&(ke="marquee")}if(ke==="marquee"&&D&&Ee){let t=Math.min(e.clientX,D.x),n=Math.min(e.clientY,D.y),o=Math.abs(e.clientX-D.x),r=Math.abs(e.clientY-D.y);Ee.style.display="block",Ee.style.left=`${t}px`,Ee.style.top=`${n}px`,Ee.style.width=`${o}px`,Ee.style.height=`${r}px`;return}if(ke==="idle"){if(W&&F||P.size>0){let a=lr(e.clientX,e.clientY);if(a){document.body.style.cursor=a==="tl"||a==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let n=an(e.clientX,e.clientY);if(n){let a=n.cloneEl.getBoundingClientRect(),s=parseFloat(getComputedStyle(n.originalEl).borderRadius)||4;qt(a,s+2);return}let o=document.elementFromPoint(e.clientX,e.clientY);if(!o||!Ut(o)){qt(null);return}let r=o.getBoundingClientRect(),i=parseFloat(getComputedStyle(o).borderRadius)||4;qt(r,i+2)}}}function no(e){if(!Ie)return;let t=ke;if(ke="idle",t==="resize-drag"){document.body.style.cursor="",ve=null,io=null,D=null,Xe.length>0?Xe=[]:Kn();return}if(t==="marquee"&&D){Ee&&(Ee.style.display="none"),Ac(Math.min(e.clientX,D.x),Math.min(e.clientY,D.y),Math.max(e.clientX,D.x),Math.max(e.clientY,D.y)),D=null,it=null,Qn=!1;return}it&&(Qn?$c(it):(cn(),Oc(it))),D=null,it=null,Qn=!1}async function Oc(e){try{let t=Ne?Ne.cloneEl.getBoundingClientRect():e.getBoundingClientRect();F=e,Sr(t,{}),Hc();let n=await Mc(e);if(console.log("[SketchUI] selectElement:",e.tagName,"\u2192",n?.componentName,n?.filePath,"stack:",n?.stack?.map(o=>o.componentName)),!n)return;if(W={tagName:n.tagName,componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber,columnNumber:n.columnNumber,stack:n.stack,boundingRect:{top:t.top,left:t.left,width:t.width,height:t.height}},v){let o=n.filePath?`${n.filePath}:${n.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${n.componentName}</span>${o?`<span class="comp-path">${o}</span>`:""}`}Et(e,W),Oe({tagName:n.tagName,componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber})}catch(t){console.error("[SketchUI] selectElement error:",t)}}function Ac(e,t,n,o){let r=Hi({x:e,y:t,width:n-e,height:o-t});if(r.length!==0){Tt(),W=null,F=null,Ne=null,nt(null),v&&(v.classList.remove("visible"),v.style.display="none"),P.clear();for(let i of r.slice(0,50)){let a=za(i);if(!a)continue;let s=i.getBoundingClientRect(),c={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:s.top,left:s.left,width:s.width,height:s.height}};P.set(i,{element:i,info:c})}if(P.size!==0){if(P.size===1){let[i,a]=[...P.entries()][0];P.clear(),F=i,W=a.info;let s=i.getBoundingClientRect();if(Sr(s,W),v){let c=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${c?`<span class="comp-path">${c}</span>`:""}`}Et(i,W),Oe({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}un(),Oe(null),v&&(v.innerHTML=`<span class="comp-name">${P.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function $c(e){if(P.has(e)){if(P.delete(e),P.size===1){let[r,i]=[...P.entries()][0];P.clear(),Zt(),F=r,W=i.info;let a=r.getBoundingClientRect();if(Sr(a,W),Et(r,W),v){let s=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${s?`<span class="comp-path">${s}</span>`:""}`}Oe({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else P.size===0?(Zt(),at()):(un(),v&&(v.innerHTML=`<span class="comp-name">${P.size} elements selected</span>`));return}let t=za(e);if(!t)return;W&&F&&P.size===0&&(P.set(F,{element:F,info:W}),Tt(),W=null,F=null,nt(null));let n=e.getBoundingClientRect(),o={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}};P.set(e,{element:e,info:o}),un(),Oe(null),v&&(v.innerHTML=`<span class="comp-name">${P.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function cn(){P.clear(),Zt()}function un(){if(P.size===0){Zt();return}let e=[];for(let[t]of P){let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:n,borderRadius:o+2})}Vi(e)}function oo(e){Ie&&(e.metaKey||e.ctrlKey||e.preventDefault())}function ro(e){if(Ie&&e.key==="Escape"){if(P.size>0){cn(),v&&(v.classList.remove("visible"),v.style.display="none"),Oe(null),e.preventDefault();return}if(W){if(Sa()){qn(),e.preventDefault();return}at(),e.preventDefault()}}}function Sr(e,t){if(F){let n=parseFloat(getComputedStyle(F).borderRadius)||4;nt(e,n+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function Me(){if(P.size>0){un();return}if(!F||!W)return;let e=Ne?Ne.cloneEl.getBoundingClientRect():F.getBoundingClientRect(),t=parseFloat(getComputedStyle(F).borderRadius)||4;if(nt(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function Hc(){qt(null)}function at(){Tt(),W=null,F=null,Ne=null,ve=null,io=null,Xe=[],cn(),document.body.style.cursor="",nt(null),v&&(v.classList.remove("visible"),v.style.display="none"),Oe(null)}function Ga(){return W}function Wa(){Ie=!1,document.removeEventListener("mousedown",eo,!0),document.removeEventListener("mousemove",to,!0),document.removeEventListener("mouseup",no,!0),document.removeEventListener("keydown",ro,!0),document.removeEventListener("click",oo,!0),document.removeEventListener("scroll",Me,!0),window.removeEventListener("resize",Me),kt=!1,v?.remove(),v=null}function kr(e){e&&!kt?(document.addEventListener("mousedown",eo,!0),document.addEventListener("mousemove",to,!0),document.addEventListener("mouseup",no,!0),document.addEventListener("keydown",ro,!0),document.addEventListener("click",oo,!0),document.addEventListener("scroll",Me,!0),window.addEventListener("resize",Me),kt=!0,Ie=!0):!e&&kt&&(document.removeEventListener("mousedown",eo,!0),document.removeEventListener("mousemove",to,!0),document.removeEventListener("mouseup",no,!0),document.removeEventListener("keydown",ro,!0),document.removeEventListener("click",oo,!0),document.removeEventListener("scroll",Me,!0),window.removeEventListener("resize",Me),kt=!1,Ie=!1)}function Ya(){return F??null}function ja(e){Ne=e,F=e.originalEl,Me()}var se=null,ae=null,Ke=null,Ua=null,dn=!1,Mt=null,ao=[],so=new Map,lo=!1,_c=`
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
`,Nt=null;function Xa(){let e=K();if(!e)return;let t=document.createElement("style");t.textContent=_c,e.appendChild(t),Va({onStart:Ic,onMove:Dc,onEnd:Fc}),Je(n=>{n.type==="reorderComplete"&&(Mr(),at())})}function Ic(e,t,n){Ke=n,Ua=t,Mt={x:e.clientX,y:e.clientY},dn=!1,lo=!1,ao=[],so=new Map,Nt=null;let o=K();if(!o)return;se=document.createElement("div"),se.className="drag-preview";let r=t.getBoundingClientRect();se.style.width=`${r.width}px`,se.style.height=`${r.height}px`,se.innerHTML=t.outerHTML,o.appendChild(se),ae=document.createElement("div"),ae.className="drop-indicator",o.appendChild(ae);let i=n.stack[1];if(!i)return;Te({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=Je(s=>{if(s.type!=="siblingsList")return;a(),ao=s.siblings;let c=document.querySelectorAll("*");for(let d of c){if(d.closest("#sketch-ui-root"))continue;let u=Ce(d);if(!u)continue;let p=u;for(;p;){if(Ae(p)){let m=p._debugSource||p._debugOwner?._debugSource;if(m){for(let f of s.siblings)m.lineNumber===f.lineNumber&&m.fileName===i.filePath&&so.set(f.lineNumber,{el:d,rect:d.getBoundingClientRect()});break}}p=p.return}}lo=!0})}function Dc(e){if(!Mt)return;let t=Math.abs(e.clientX-Mt.x),n=Math.abs(e.clientY-Mt.y);if(t<5&&n<5||(dn=!0,se&&(se.style.display="block",se.style.left=`${e.clientX+10}px`,se.style.top=`${e.clientY+10}px`),!lo||!Ke))return;let o=null,r=1/0,i=0,a=0,s=0;for(let c of ao){if(c.lineNumber===Ke.lineNumber)continue;let d=so.get(c.lineNumber);if(!d)continue;let u=d.rect,p=u.top+u.height/2,m=Math.abs(e.clientY-p);m<r&&(r=m,o=c,e.clientY<p?i=u.top-2:i=u.bottom+2,a=u.left,s=u.width)}Nt=o,o&&ae?(ae.style.display="block",ae.style.top=`${i}px`,ae.style.left=`${a}px`,ae.style.width=`${s}px`):ae&&(ae.style.display="none")}function Fc(e){if(!dn||!Nt||!Ke){Mr();return}Te({type:"reorder",filePath:Ke.filePath,fromLine:Ke.lineNumber,toLine:Nt.lineNumber,fromComponent:Ke.componentName,toComponent:Nt.componentName}),se&&(se.style.display="none"),ae&&(ae.style.display="none"),dn=!1,Mt=null}function Mr(){se?.remove(),ae?.remove(),se=null,ae=null,Ke=null,Ua=null,dn=!1,Mt=null,lo=!1,ao=[],so=new Map,Nt=null}function Ka(){Mr()}U();de();var qe="http://www.w3.org/2000/svg",Rt=null,q=null,Nr=null;function qa(){let e=K();e&&(Rt=document.createElementNS(qe,"svg"),Rt.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),q=document.createElementNS(qe,"g"),q.setAttribute("class","annotation-root"),Rt.appendChild(q),e.appendChild(Rt),window.addEventListener("scroll",co,{passive:!0}),Nr=jn(co),co())}function co(){if(!q)return;let{scale:e,offsetX:t,offsetY:n}=Se();q.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function Za(e,t,n,o){if(!q||t.length<2)return null;let r=document.createElementNS(qe,"g");r.setAttribute("data-annotation-id",e);let i=document.createElementNS(qe,"path");return i.setAttribute("d",ns(t)),i.setAttribute("stroke",n),i.setAttribute("stroke-width",String(o)),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.setAttribute("fill","none"),r.appendChild(i),q.appendChild(r),r}function Ja(e,t,n,o,r,i){if(!q)return null;let a=document.createElementNS(qe,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
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
  `,s.textContent=o,a.appendChild(s),q.appendChild(a),a}function Qa(e,t,n,o){if(!q)return null;let r=document.createElementNS(qe,"circle");return r.setAttribute("data-annotation-id",e),r.setAttribute("cx",String(t)),r.setAttribute("cy",String(n)),r.setAttribute("r","6"),r.setAttribute("fill",o),r.setAttribute("stroke","white"),r.setAttribute("stroke-width","1.5"),q.appendChild(r),r}function es(e){if(!q)return;let t=q.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function Rr(){q&&(q.innerHTML="")}function ts(){window.removeEventListener("scroll",co),Nr?.(),Nr=null,Rt?.remove(),Rt=null,q=null}function ns(e){if(e.length===0)return"";let t=`M${e[0].x},${e[0].y}`;for(let n=1;n<e.length;n++)t+=` L${e[n].x},${e[n].y}`;return t}function os(e,t){if(!q)return null;let n=[],o=document.createElementNS(qe,"g"),r=document.createElementNS(qe,"path");return r.setAttribute("stroke",e),r.setAttribute("stroke-width",String(t)),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("fill","none"),o.appendChild(r),q.appendChild(o),{path:r,group:o,addPoint(i,a){n.push({x:i,y:a}),r.setAttribute("d",ns(n))},getPoints(){return n}}}de();U();St();var Fe={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-7 1-4 7z"/></svg>',grab:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V8a2 2 0 0 0-4 0v3"/><path d="M14 10V6a2 2 0 0 0-4 0v4"/><path d="M10 9.5V5a2 2 0 0 0-4 0v9"/><path d="M6 14c0 3.31 2.69 6 6 6h2a6 6 0 0 0 6-6v-2"/></svg>',move:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',draw:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',color:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22l1-1h3l9-9"/><path d="M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7"/><path d="M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14"/><path d="m9 7 6 6"/><path d="M20 2a2.83 2.83 0 0 1 0 4L16 10"/></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18c3.87 0 7-3.13 7-7s-3.13-7-7-7H4"/><polyline points="8 10 4 6 8 2"/></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>'},ls=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",po=navigator.platform.includes("Mac")?"Cmd":"Ctrl",Ir=[{type:"pointer",icon:Fe.pointer,label:"Pointer",shortcut:"V"},{type:"grab",icon:Fe.grab,label:"Grab",shortcut:"H"},{type:"move",icon:Fe.move,label:"Move",shortcut:"M"},{type:"draw",icon:Fe.draw,label:"Draw",shortcut:"D"},{type:"color",icon:Fe.color,label:"Color",shortcut:"E"},{type:"text",icon:Fe.text,label:"Text",shortcut:"T"}],Bc=`
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
`,me=null,ee=null,fo=new Map,De=null,Hr=null,_r=null;function cs(e){Hr=e}function us(e){_r=e}function ds(e){De&&(De.disabled=!e)}function ps(){let e=K();if(!e)return;let t=document.createElement("style");t.textContent=Bc,e.appendChild(t),me=document.createElement("div"),me.className="tools-panel";let n=[["pointer","grab"],["move"],["draw","color","text"]];for(let s=0;s<n.length;s++){if(s>0){let c=document.createElement("div");c.className="tool-divider",me.appendChild(c)}for(let c of n[s]){let d=Ir.find(m=>m.type===c),u=document.createElement("button");u.className=`tool-btn${d.type==="pointer"?" active":""}`,u.innerHTML=`${d.icon}<span class="tooltip">${d.label}<span class="shortcut-badge">${ls}${d.shortcut}</span></span>`,u.addEventListener("click",()=>en(d.type));let p=null;u.addEventListener("mouseenter",()=>{p=setTimeout(()=>u.classList.add("tooltip-visible"),400)}),u.addEventListener("mouseleave",()=>{p&&clearTimeout(p),u.classList.remove("tooltip-visible")}),me.appendChild(u),fo.set(d.type,u)}}ee=document.createElement("div"),ee.className="sub-options hidden",me.appendChild(ee);let o=document.createElement("div");o.className="tool-divider",me.appendChild(o),De=document.createElement("button"),De.className="action-btn",De.innerHTML=Fe.undo,De.title="Undo (Ctrl+Z)",De.disabled=!0,De.addEventListener("click",()=>{_r&&_r()}),me.appendChild(De);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=Fe.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{Hr&&Hr()}),me.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=Fe.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{$a(),i.style.color=Aa()?l.accent:""}),me.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.textContent="?",a.title=`Keyboard Shortcuts (${ls}/)`,a.addEventListener("click",()=>fs()),me.appendChild(a),e.appendChild(me),document.addEventListener("keydown",ms,!0)}function ms(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||!e.ctrlKey&&!e.metaKey)return;let n=e.key.toUpperCase();if(e.key==="/"||e.key==="?"){fs(),e.preventDefault();return}let o=Ir.find(r=>r.shortcut===n);o&&(en(o.type),e.preventDefault())}var Re=null,gn=null;function fs(){Re?mo():Gc()}function Gc(){let e=K();if(!e||Re)return;Re=document.createElement("div"),Re.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:Ir.map(r=>({action:r.label,keys:[po,r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[po,"Z"]},{action:"Toggle Originals",keys:[po,"."]},{action:"Keyboard Shortcuts",keys:[po,"/"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Grab Tool","Drag"]},{action:"Zoom",keys:["Scroll Wheel"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let s of r.items){let c=document.createElement("div");c.className="shortcut-row";let d=document.createElement("span");d.className="shortcut-action",d.textContent=s.action,c.appendChild(d);let u=document.createElement("span");u.className="shortcut-keys";for(let p=0;p<s.keys.length;p++){if(p>0){let f=document.createElement("span");f.className="shortcut-plus",f.textContent="+",u.appendChild(f)}let m=document.createElement("span");m.className="shortcut-key",m.textContent=s.keys[p],u.appendChild(m)}c.appendChild(u),i.appendChild(c)}t.appendChild(i)}Re.appendChild(t),Re.addEventListener("click",r=>{r.target===Re&&mo()}),e.appendChild(Re),gn=r=>{mo()},document.addEventListener("keydown",gn,!0)}function mo(){gn&&(document.removeEventListener("keydown",gn,!0),gn=null),Re?.remove(),Re=null}function gs(e){for(let[t,n]of fo)n.classList.toggle("active",t===e);Wc(e)}function Wc(e){if(ee){if(ee.innerHTML="",ee.classList.add("hidden"),ee.classList.remove("visible"),e==="draw"){ee.classList.remove("hidden"),requestAnimationFrame(()=>ee?.classList.add("visible"));let t=he(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.brushColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();ot({initialColor:t.brushColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){tn("brushColor",i),n.style.background=i},onClose(){}})}),ee.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[2,4,8]){let i=document.createElement("button");i.className=`segment${r===t.brushSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{tn("brushSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active"),Promise.resolve().then(()=>(Pt(),ss)).then(a=>a.refreshDrawCursor())}),o.appendChild(i)}ee.appendChild(o)}else if(e==="text"){ee.classList.remove("hidden"),requestAnimationFrame(()=>ee?.classList.add("visible"));let t=he(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();ot({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){tn("textColor",i),n.style.background=i},onClose(){}})}),ee.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{tn("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}ee.appendChild(o)}}}function hs(e){let t=fo.get(e);t&&(t.style.backgroundColor=l.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function ys(){document.removeEventListener("keydown",ms,!0),mo(),me?.remove(),me=null,ee=null,fo.clear()}Pt();Lr();U();var bs="sketch-ui-onboarding-seen",Le=null,go=null;function vs(){if(localStorage.getItem(bs))return;let e=K();if(!e)return;Le=document.createElement("div"),Le.style.cssText=`
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
  `;Le.innerHTML=`Press ${t.map(o=>`<span style="${n}">${o}</span>`).join(" ")} to switch tools`,e.appendChild(Le),requestAnimationFrame(()=>{Le&&(Le.style.opacity="1")}),go=setTimeout(Dr,5e3)}function Dr(){Le&&(localStorage.setItem(bs,"1"),Le.style.opacity="0",setTimeout(()=>{Le?.remove(),Le=null},150),go&&(clearTimeout(go),go=null))}de();function xs(){kr(!0)}function Cs(){kr(!1)}Pt();St();var Fr=!1,zr=0,Vr=0,ws={onMouseDown(e){Fr=!0,zr=e.clientX,Vr=e.clientY,uo("grabbing")},onMouseMove(e){if(!Fr)return;let t=e.clientX-zr,n=e.clientY-Vr;Pa(t,n),zr=e.clientX,Vr=e.clientY},onMouseUp(e){Fr=!1,uo("grab")}};de();var le=null,hn={x:0,y:0},Ot=!1,Yc=!1,Es={onMouseDown(e){let t=an(e.clientX,e.clientY);if(t){le=t;let a=ye(e.clientX,e.clientY);hn={x:a.x-t.currentPos.x,y:a.y-t.currentPos.y},Ot=!0,Jn(le.id);return}let n=Ga();if(!n){Yc=!0,en("pointer");return}let o=Ya();if(!o)return;if(ha(o)){for(let a of Ue().values())if(a.originalEl===o||a.originalEl.contains(o)||o.contains(a.originalEl)){le=a;let s=ye(e.clientX,e.clientY);hn={x:s.x-a.currentPos.x,y:s.y-a.currentPos.y},Ot=!0,Jn(le.id);return}}let r=_a(o,{componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber});le=r;let i=ye(e.clientX,e.clientY);hn={x:i.x-r.currentPos.x,y:i.y-r.currentPos.y},Ot=!0,Jn(le.id)},onMouseMove(e){if(!Ot||!le)return;let t=ye(e.clientX,e.clientY),n=t.x-hn.x,o=t.y-hn.y;Zn(le.id,n,o)},onMouseUp(e){Ot&&le&&(ua(le.id,le.currentPos),Da(le.id),ja(le)),le=null,Ot=!1}};de();function ho(e,t=2){if(e.length<=2)return e;let n=0,o=0,r=e[0],i=e[e.length-1];for(let a=1;a<e.length-1;a++){let s=jc(e[a],r,i);s>n&&(n=s,o=a)}if(n>t){let a=ho(e.slice(0,o+1),t),s=ho(e.slice(o),t);return[...a.slice(0,-1),...s]}return[r,i]}function jc(e,t,n){let o=n.x-t.x,r=n.y-t.y,i=o*o+r*r;if(i===0){let s=e.x-t.x,c=e.y-t.y;return Math.sqrt(s*s+c*c)}return Math.abs(r*e.x-o*e.y+n.x*t.y-n.y*t.x)/Math.sqrt(i)}Pt();async function At(e,t){let n=fn(e,t);if(!n)return null;let o=Ce(n);if(!o)return null;try{let i=await ft(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let s=a.functionName;if(s[0]!==s[0].toUpperCase()||ht(s))continue;let c="";if(a.fileName){let d=et(a.fileName);gt(d)&&(c=d)}return{componentName:s,filePath:c,lineNumber:a.lineNumber??0}}}catch{}let r=o;for(;r;){if(Ae(r)){let i=xe(r.type);if(i&&i[0]===i[0].toUpperCase()&&!ht(i)){let a=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:a?.fileName||"",lineNumber:a?.lineNumber||0}}}r=r.return}return null}var Pe=null,yo=null,Ts={onMouseDown(e){let t=he();if(Pe=os(t.brushColor,t.brushSize),Pe){let n=ye(e.clientX,e.clientY);Pe.addPoint(n.x,n.y)}yo=At(e.clientX,e.clientY)},onMouseMove(e){if(!Pe)return;let t=ye(e.clientX,e.clientY);Pe.addPoint(t.x,t.y)},async onMouseUp(e){if(!Pe)return;let t=Pe.getPoints(),n=he();if(Pe.group.remove(),t.length<2){Pe=null,yo=null;return}let o=await yo,r=ho(t,2),i=crypto.randomUUID();Za(i,r,n.brushColor,n.brushSize),Ct({type:"draw",id:i,points:r,color:n.brushColor,strokeWidth:n.brushSize,targetComponent:o}),Pe=null,yo=null}};de();U();var te=null,ct=null,bo=null,ks={onMouseDown(e){te&&Ss();let t=ye(e.clientX,e.clientY);ct={pageX:t.x,pageY:t.y},At(e.clientX,e.clientY).then(n=>{bo=n}),te=document.createElement("input"),te.type="text",te.placeholder="Type annotation...",te.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${l.bgPrimary};
      color: ${l.textPrimary};
      border: 1.5px solid ${l.accent};
      border-radius: ${N.sm};
      padding: 4px 8px;
      font-size: ${he().fontSize}px;
      font-family: ${T};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${l.accentSoft};
    `,te.setAttribute("data-sketch-ui-ghost","true"),te.addEventListener("keydown",n=>{n.key==="Enter"&&(Ss(),n.preventDefault()),n.key==="Escape"&&(Ms(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(te),te.focus()},onMouseMove(){},onMouseUp(){}};function Ss(){if(!te||!ct)return;let e=te.value.trim();if(te.remove(),te=null,!e)return;let t=he(),n=crypto.randomUUID();Ja(n,ct.pageX,ct.pageY,e,t.fontSize,t.textColor),Ct({type:"text",id:n,position:ct,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:bo}),ct=null,bo=null}function Ms(){te&&(te.remove(),te=null),ct=null,bo=null}function Ns(){Ms()}Pt();de();var ze=null,bn=null,yn="backgroundColor",vo={bg:"",color:""},Rs={async onMouseDown(e){He();let t=fn(e.clientX,e.clientY);if(!t)return;ze=t,vo={bg:getComputedStyle(t).backgroundColor,color:getComputedStyle(t).color};let n=await At(e.clientX,e.clientY);if(!n)return;bn=n;let o=Uc(vo.bg);mn(!1),ot({initialColor:o,position:{x:e.clientX+10,y:e.clientY+10},showPropertyToggle:!0,onColorChange(r){ze&&(ze.style[yn]=r)},onPropertyChange(r){yn=r},onClose(){if(mn(!0),!ze||!bn)return;let r=yn==="backgroundColor"?vo.bg:vo.color,i=ze.style[yn];if(i&&i!==r){let a=crypto.randomUUID(),s=ze.getBoundingClientRect(),c=ye(s.right,s.top);Qa(a,c.x,c.y,i),Ct({type:"colorChange",id:a,component:bn,targetElement:ze,property:yn,fromColor:r,toColor:i})}ze=null,bn=null}})},onMouseMove(){},onMouseUp(){}};function Uc(e){let t=e.match(/\d+/g);return!t||t.length<3?"#000000":"#"+t.slice(0,3).map(n=>parseInt(n).toString(16).padStart(2,"0")).join("")}function Ls(){He(),mn(!0),ze=null,bn=null}St();function Ps(){let e=window.__SKETCH_UI_WS_PORT__;if(!e){console.warn("[SketchUI] No WebSocket port found.");return}if(document.getElementById("sketch-ui-root"))return;wn(e),ii(Xc);let t=K();t&&Ea(t),Ba(),zi(),Xa(),qa(),Ha(),pa(r=>es(r)),fa((r,i,a)=>Zn(r,i,a)),ps(),Or(),vs(),lt("grab",ws),lt("move",Es),lt("draw",Ts),lt("text",ks),lt("color",Rs),sa((r,i)=>{Dr(),hs(r),i==="pointer"&&Cs(),i==="text"&&Ns(),i==="color"&&Ls(),Lt(),tr(),r==="pointer"&&xs(),Ar(r),gs(r)}),la(()=>{ui(gr()),ds(ba())}),us(()=>{let r=fr();r&&Z(`Undo: ${r}`)}),si(()=>{if(!gr()){Z("No moved components to toggle");return}let r=!Wn();ga(r),kn(r)});let n=!1,o=0;li(()=>{if(n)return;let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);Z(`Please wait ${a}s before retrying`);return}let i=va();if(!i.moves.length&&!i.annotations.length&&!i.colorChanges.length){Z("Nothing to generate \u2014 make some visual changes first");return}n=!0,Z("Generating..."),Te({type:"generate",annotations:i})}),Je(r=>{if(r.type==="generateProgress"&&Z(r.message),r.type==="generateComplete")if(n=!1,r.success){let i=r.changes.map(a=>a.description||a.filePath).join(", ");Z(`Applied: ${i}`),at(),Rr(),Un(),kn(!0)}else Z(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),ci(()=>{if(Gn()==="pointer")return!1;let r=fr();return r?(Z(`Undo: ${r}`),!0):!1}),cs(()=>{at(),Rr(),Un(),Oa(),kn(!0),Z("Canvas cleared")}),console.log("[SketchUI] Overlay initialized with Phase 2A canvas tools")}function Xc(){Lt(),tr(),Wa(),Gi(),Ka(),ts(),Ia(),ys(),$r(),Un(),Er(),Ur(),ai()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ps):Ps();})();
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
