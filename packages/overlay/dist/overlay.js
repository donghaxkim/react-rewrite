"use strict";var FrameUp=(()=>{function Is(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),s=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+s).toString(16).slice(1)}`}return e}function _s(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(x=>{try{return Array.from(x.cssRules)}catch{return[]}}).filter(x=>x instanceof CSSStyleRule&&x.selectorText===":root").flatMap(x=>Array.from(x.style)).filter(x=>x.startsWith("--")),n={},o={},r={},i={},a={},s={},d={},c={},u={},p={},f={},m={},h={},b={},L={},S={},_={},$={},B=(x,P,se,le)=>{x[se]=le,P[le]=se};for(let x of t){let P=e.getPropertyValue(x).trim();if(!P)continue;let se=x.match(/^--spacing-(.+)$/);if(se){B(n,p,se[1],P);continue}let le=x.match(/^--color-(.+)$/);if(le){let cn=le[1];o[cn]=P,f[Is(P)]=cn;continue}let R=x.match(/^--font-size-(.+)$/);if(R){B(r,m,R[1],P);continue}let G=x.match(/^--font-weight-(.+)$/);if(G){B(i,h,G[1],P);continue}let y=x.match(/^--radius-(.+)$/);if(y){B(a,b,y[1],P);continue}let E=x.match(/^--border-(.+)$/);if(E){B(s,L,E[1],P);continue}let F=x.match(/^--opacity-(.+)$/);if(F){B(d,S,F[1],P);continue}let q=x.match(/^--tracking-(.+)$/);if(q){B(c,_,q[1],P);continue}let J=x.match(/^--leading-(.+)$/);if(J){B(u,$,J[1],P);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:s,opacity:d,letterSpacing:c,lineHeight:u,spacingReverse:p,colorsReverse:f,fontSizeReverse:m,fontWeightReverse:h,borderRadiusReverse:b,borderWidthReverse:L,opacityReverse:S,letterSpacingReverse:_,lineHeightReverse:$}}var Ds=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function Fs(e,t){let n={};for(let o of Ds){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function un(e,t){return t.get(e)??null}function zr(e,t,n){let r=(n??Lt())[e],i=[];for(let[s,d]of r.entries()){let c=parseFloat(d);isNaN(c)||i.push({numericValue:c,token:s,cssValue:d})}let a=parseFloat(t);return isNaN(a)||i.some(d=>d.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((s,d)=>s.numericValue-d.numericValue),i}var Br=null,Mt=null;function Wr(e){Br=e,Mt=null}function Lt(){if(Mt!==null)return Mt;let e=_s();return Mt=Fs(e,Br??{}),Mt}var ce=null,Nt=[],lt=0,Vs=5,ho=null,yo=null,bo=null,vo=null,xo=null,Co=null;function Gr(e){Co=e}function pn(e){ce&&ce.readyState===WebSocket.OPEN||(xo=e,ce=new WebSocket(`ws://localhost:${e}`),ce.onopen=()=>{let t=lt>0;lt=0,t&&vo&&vo()},ce.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&Wr(n.tokens),n.type==="updatePropertyComplete"&&Co&&Co(n.success,n.errorCode,n.error),Nt.forEach(o=>o(n))}catch{}},ce.onclose=t=>{if(ce=null,t.code===4001){bo&&bo();return}if(lt<Vs){let n=500*Math.pow(2,lt);lt++,ho=setTimeout(()=>pn(e),n)}else yo&&yo()},ce.onerror=()=>{})}function be(e){ce&&ce.readyState===WebSocket.OPEN&&ce.send(JSON.stringify(e))}function Ae(e){return Nt.push(e),()=>{Nt=Nt.filter(t=>t!==e)}}function Yr(){ho&&clearTimeout(ho),ce&&(ce.close(),ce=null),Nt=[]}function jr(e){yo=e}function Ur(e){bo=e}function Xr(e){vo=e}function Kr(){xo&&(lt=0,pn(xo))}var l={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},I={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},k={xs:"4px",sm:"6px",md:"10px",lg:"14px"},M={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},C="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",Zr=`
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
`;var dt=null,X=null,kt=0,mn=null,fn=null,Je=null,Eo=null,ct=null,Rt=null,wo=null,Qr=null,zs='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>',ei='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path></svg>',To='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',Bs='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>',qr='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>',Ws=`
  :host {
    all: initial;
  }
  ${Zr}
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
    border-radius: ${k.md};
    font-family: ${C};
    font-size: 12px;
    color: ${l.textPrimary};
    box-shadow: ${I.md};
    user-select: none;
    opacity: 0;
    animation: fadeIn ${M.settle} forwards;
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
    transition: background ${M.fast}, color ${M.fast};
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
    border-radius: ${k.sm};
    color: white;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    font-family: ${C};
    cursor: pointer;
    transition: background ${M.fast};
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
    font-family: ${C};
    box-shadow: ${I.md};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${M.medium};
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
`;function ti(e){let t=document.createElement("div");t.id="frameup-root",document.body.appendChild(t),dt=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=Ws;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn eye-btn" title="Toggle originals (.)">
      ${ei}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${To}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Confirm</button>
    <button class="icon-btn close-btn" title="Close FrameUp">
      ${Bs}
    </button>
  `,dt.appendChild(n),dt.appendChild(o),X=o.querySelector(".undo-btn");let r=o.querySelector(".close-btn");mn=o.querySelector(".generate-btn"),fn=o.querySelector(".eye-btn"),ct=o.querySelector(".component-detail"),Je=document.createElement("div"),Je.className="toast",dt.appendChild(Je),X.addEventListener("click",()=>{be({type:"undo"}),X&&(X.innerHTML='<div class="spinner"></div>',X.disabled=!0)}),r.addEventListener("click",e),fn.addEventListener("click",()=>{Rt&&Rt()}),mn.addEventListener("click",()=>{wo&&wo()}),document.addEventListener("keydown",i=>{i.key==="."&&(i.ctrlKey||i.metaKey)&&!Jr()&&(Rt&&Rt(),i.preventDefault()),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!Jr()&&Qr?.()&&i.preventDefault()}),jr(()=>{j("Disconnected. Click to reconnect."),Kr()}),Ur(()=>{j("Disconnected: another tab took over")}),Xr(()=>{kt=0,X&&(X.disabled=!0)}),Ae(i=>{switch(i.type){case"reorderComplete":i.success?(kt++,X&&(X.innerHTML=qr,setTimeout(()=>{X&&(X.innerHTML=To,X.disabled=!1)},200))):i.error&&j(i.error);break;case"undoComplete":i.success?(kt=Math.max(0,kt-1),X&&(X.innerHTML=qr,setTimeout(()=>{X&&(X.innerHTML=To,X.disabled=kt===0)},200))):i.error&&j(i.error);break;case"devServerDisconnected":j("Dev server disconnected");break;case"devServerReconnected":j("Dev server reconnected");break}})}function ni(){let e=document.getElementById("frameup-root");e&&e.remove(),dt=null,X=null}function U(){return dt}function oi(e){Rt=e}function ri(e){wo=e}function ii(e){Qr=e}function gn(e){fn&&(fn.innerHTML=e?ei:zs)}function hn(e){mn&&(mn.disabled=!e)}function He(e){if(!ct)return;if(!e){ct.className="component-detail empty",ct.textContent="No selection";return}ct.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";ct.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function j(e){Je&&(Je.textContent=e,Je.classList.add("visible"),Eo&&clearTimeout(Eo),Eo=setTimeout(()=>{Je?.classList.remove("visible")},2e3))}function Jr(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var So="0.5.32",Ht=`bippy-${So}`,ai=Object.defineProperty,Gs=Object.prototype.hasOwnProperty,Pt=()=>{},li=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},bn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),ci=!1,si,Ot=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>ci?!0:(e&&typeof e.inject=="function"&&(si=e.inject.toString()),!!si?.includes("(injected)")),yn=new Set,Ye=new Set,Mo=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:Ht,checkDCE:li,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),Ye.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,yn.forEach(a=>a())),i},on:Pt,onCommitFiberRoot:Pt,onCommitFiberUnmount:Pt,onPostCommitFiberRoot:Pt,renderers:t,supportsFiber:!0,supportsFlight:!0};try{ai(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let s=o.renderers;o=a,s.size>0&&(s.forEach((d,c)=>{Ye.add(d),a.renderers.set(c,d)}),At(e))}}});let r=window.hasOwnProperty,i=!1;ai(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{At(e)}return o},At=e=>{e&&yn.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=li,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=Ht,t._instrumentationIsActive=!1;let n=bn(t);if(n||(t.on=Pt),t.renderers.size){t._instrumentationIsActive=!0,yn.forEach(i=>i());return}let o=t.inject,r=Ot(t);r&&!n&&(ci=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return Ye.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,yn.forEach(s=>s()),a}}(t.renderers.size||t._instrumentationIsActive||Ot())&&e?.()}catch{}},Lo=()=>Gs.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),ut=e=>Lo()?(At(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Mo(e),No=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),vn=()=>{try{No()&&ut()}catch{}};vn();var ko=0,Ro=1;var Po=5;var Oo=11,Ao=13;var Ho=15,$o=16;var Io=19;var _o=26,Do=27,Fo=28,Vo=30;var me=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};function zo(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await Wo(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=Bo(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var Bo=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=Bo(o,t,n);if(r)return r;o=n?null:o.sibling}return null},Wo=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await Wo(o,t,n);if(r)return r;o=n?null:o.sibling}return null};var Go=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?Go(t.type||t.render):null},ie=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=Go(t);return o&&(o.displayName||o.name)||null};var Yo=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||bn(e)||Ot(e)};var jo=e=>{let t=ut(e.onActive);t._instrumentationSource=e.name??Ht;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,s,d)=>{n!==i&&(n?.(a,s,d),e.onCommitFiberRoot?.(a,s,d))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,s)=>{t.onCommitFiberUnmount===i&&(o?.(a,s),e.onCommitFiberUnmount?.(a,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,s)=>{t.onPostCommitFiberRoot===i&&(r?.(a,s),e.onPostCommitFiberRoot?.(a,s))};t.onPostCommitFiberRoot=i}return t},ne=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},Ys=Error();var di=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,js=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],Us=["<anonymous>","eval",""],vi=/\.(jsx|tsx|ts|js)$/,Xs=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Ks=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,xi="(at Server)",Zs=/(^|@)\S+:\d+/,Ci=/^\s*at .*(\S+:\d+|\(native\))/m,qs=/^(eval@)?(\[native code\])?$/;var Ei=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=ui(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(Zs)){let i=pi(r,void 0)[0];i&&o.push(i)}return Ko(o,t)}return e.match(Ci)?ui(e,t):pi(e,t)},Ti=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},Ko=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e;var ui=(e,t)=>Ko(e.split(`
`).filter(n=>!!n.match(Ci)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=Ti(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}});var pi=(e,t)=>Ko(e.split(`
`).filter(n=>!n.match(qs)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,s=Ti(o.replace(r,""));return{functionName:a,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:o}}});var Js=44,mi="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Qs=new Uint8Array(64),wi=new Uint8Array(128);for(let e=0;e<mi.length;e++){let t=mi.charCodeAt(e);Qs[e]=t,wi[t]=e}function $t(e,t){let n=0,o=0,r=0;do r=wi[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function fi(e,t){return e.pos>=t?!1:e.peek()!==Js}var el=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};function Si(e){let{length:t}=e,n=new el(e),o=[],r=0,i=0,a=0,s=0,d=0;do{let c=n.indexOf(";"),u=[],p=!0,f=0;for(r=0;n.pos<c;){let m;r=$t(n,r),r<f&&(p=!1),f=r,fi(n,c)?(i=$t(n,i),a=$t(n,a),s=$t(n,s),fi(n,c)?(d=$t(n,d),m=[r,i,a,s,d]):m=[r,i,a,s]):m=[r],u.push(m),n.pos++}p||tl(u),o.push(u),n.pos=c+1}while(n.pos<=t);return o}function tl(e){e.sort(nl)}function nl(e,t){return e[0]-t[0]}var Mi=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,ol=/^data:application\/json[^,]+base64,/,rl=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,Li=typeof WeakRef<"u",It=new Map,xn=new Map,il=e=>Li&&e instanceof WeakRef,gi=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let u of r)if(u[0]<=o)i=u;else break;if(!i||i.length<4)return null;let[,a,s,d]=i;if(a===void 0||s===void 0||d===void 0)return null;let c=t[a];return c?{columnNumber:d,fileName:c,lineNumber:s+1}:null},al=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return gi(o.map.mappings,o.map.sources,r,i)}return gi(e.mappings,e.sources,t-1,n)},sl=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(rl);a&&(o=a[1]||a[2])}if(!o)return null;let r=Mi.test(o);if(!(ol.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},ll=e=>({file:e.file,mappings:Si(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),cl=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:Si(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},hi=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(Mi);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},dl=async(e,t=fetch)=>{if(!hi(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=sl(e,n);if(!o||!hi(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?cl(i):ll(i)}catch{return null}},ul=async(e,t=!0,n)=>{if(t&&It.has(e)){let i=It.get(e);if(i==null)return null;if(il(i)){let a=i.deref();if(a)return a;It.delete(e)}else return i}if(t&&xn.has(e))return xn.get(e);let o=dl(e,n);t&&xn.set(e,o);let r=await o;return t&&xn.delete(e),t&&(r===null?It.set(e,null):It.set(e,Li?new WeakRef(r):r)),r},pl=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await ul(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=al(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),ml=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",fl=()=>{let e=ut();for(let t of[...Array.from(Ye),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},yi=e=>{for(let t of Ye){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},$e=e=>`
    in ${e}`,gl=(e,t)=>{let n=$e(e);return t&&(n+=` (at ${t})`),n},Uo=!1,Xo=(e,t)=>{if(!e||Uo)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,Uo=!0;let o=fl();yi(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let u;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(f){u=f}Reflect.construct(e,[],p)}else{try{p.call()}catch(f){u=f}e.call(p.prototype)}}else{try{throw Error()}catch(f){u=f}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&u instanceof Error&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[d,c]=s.DetermineComponentFrameRoot();if(d&&c){let u=d.split(`
`),p=c.split(`
`),f=0,m=0;for(;f<u.length&&!u[f].includes("DetermineComponentFrameRoot");)f++;for(;m<p.length&&!p[m].includes("DetermineComponentFrameRoot");)m++;if(f===u.length||m===p.length)for(f=u.length-1,m=p.length-1;f>=1&&m>=0&&u[f]!==p[m];)m--;for(;f>=1&&m>=0;f--,m--)if(u[f]!==p[m]){if(f!==1||m!==1)do if(f--,m--,m<0||u[f]!==p[m]){let h=`
${u[f].replace(" at new "," at ")}`,b=ie(e);return b&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",b)),h}while(f>=1&&m>=0);break}}}finally{Uo=!1,Error.prepareStackTrace=n,yi(o),console.error=r,console.warn=i}let a=e?ie(e):"";return a?$e(a):""},hl=(e,t)=>{let n=e.tag,o="";switch(n){case Fo:o=$e("Activity");break;case Ro:o=Xo(e.type,!0);break;case Oo:o=Xo(e.type.render,!1);break;case ko:case Ho:o=Xo(e.type,!1);break;case Po:case _o:case Do:o=$e(e.type);break;case $o:o=$e("Lazy");break;case Ao:o=e.child!==t&&t!==null?$e("Suspense Fallback"):$e("Suspense");break;case Io:o=$e("SuspenseList");break;case Vo:o=$e("ViewTransition");break;default:return""}return o},yl=e=>{try{let t="",n=e,o=null;do{t+=hl(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=gl(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},bl=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},vl=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),xl=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,Cl=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!vl(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>xl(a,o))||(i.push(o),t.set(r,i))}return t},El=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(xi,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},Tl=e=>{let t=[];return zo(e,n=>{if(!ml(n))return;let o=typeof n.type=="string"?n.type:ie(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:Ei(bl(n._debugStack?.stack))})},!0),t},Ne=async(e,t=!0,n)=>{let o=Tl(e),r=Ei(yl(e)),i=Cl(o),a=new Map;return pl(r.map(s=>s.source?.includes(xi)??!1?El(s,i,a):s).filter((s,d,c)=>{if(d===0)return!0;let u=c[d-1];return s.functionName!==u.functionName}),t,n)};var bi=e=>e.split("/").filter(Boolean).length,wl=e=>e.split("/").filter(Boolean)[0]??null,Sl=e=>{let t=e.indexOf("/",1);if(t===-1||bi(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!vi.test(n)||bi(n)<2)return e;let o=wl(n);return!o||o.startsWith("@")||o.length>4?e:n},we=e=>{if(!e||Us.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=Sl(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),s=i.indexOf(":");t=a!==-1&&(s===-1||a<s)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of js)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if(di.test(t)){let i=t.match(di);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Ks.test(i)&&(t=t.slice(0,r))}return t},ke=e=>{let t=we(e);return!(!t||!vi.test(t)||Xs.test(t))};var Ml=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);function Ie(e){return!!(Ml.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function Zo(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}var Ll=50,Cn=.9,Nl=2147483600,kl=1e3,_t=new WeakMap;function qo(){_t=new WeakMap}function Rl(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function Pl(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=Nl}function Ol(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<Cn||o.height/window.innerHeight<Cn)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>kl}function Dt(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&Zo(e)||e.closest("#frameup-root")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-placeholder"))return!1;let n=performance.now(),o=_t.get(e);if(o&&n-o.timestamp<Ll)return o.isValid;let r=window.getComputedStyle(e);return Rl(e,r)?e.clientWidth/window.innerWidth>=Cn&&e.clientHeight/window.innerHeight>=Cn&&(Pl(r)||Ol(e,r))?(_t.set(e,{isValid:!1,timestamp:n}),!1):(_t.set(e,{isValid:!0,timestamp:n}),!0):(_t.set(e,{isValid:!1,timestamp:n}),!1)}var Al=.75,Ni=32,En=3,Tn=20,ki=100,ve=1;function pt(e,t,n){return Math.min(n,Math.max(t,e))}function Hl(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,s=o+e.width/2,d=r+e.height/2,c=pt(Math.ceil(e.width/Ni),En,Tn),u=pt(Math.ceil(e.height/Ni),En,Tn);if(c*u>ki){let h=Math.sqrt(ki/(c*u));c=pt(Math.floor(c*h),En,Tn),u=pt(Math.floor(u*h),En,Tn)}let p=new Set,f=[],m=(h,b)=>{let L=pt(Math.round(h),0,t-1),S=pt(Math.round(b),0,n-1),_=`${L}:${S}`;p.has(_)||(p.add(_),f.push({x:L,y:S}))};m(o+ve,r+ve),m(i-ve,r+ve),m(o+ve,a-ve),m(i-ve,a-ve),m(s,r+ve),m(s,a-ve),m(o+ve,d),m(i-ve,d),m(s,d);for(let h=0;h<c;h++){let b=o+(h+.5)/c*e.width;for(let L=0;L<u;L++)m(b,r+(L+.5)/u*e.height)}return f}function Ri(e,t=Dt,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=Hl(e);for(let d of i)for(let c of document.elementsFromPoint(d.x,d.y))r.add(c);let a=[];for(let d of r){if(!t(d))continue;let c=d.getBoundingClientRect();if(c.width<=0||c.height<=0)continue;let u={left:c.left,top:c.top,right:c.left+c.width,bottom:c.top+c.height};if(n){let p=Math.max(o.left,u.left),f=Math.max(o.top,u.top),m=Math.min(o.right,u.right),h=Math.min(o.bottom,u.bottom),b=Math.max(0,m-p)*Math.max(0,h-f),L=c.width*c.height;L>0&&b/L>=Al&&a.push(d)}else o.left<u.right&&o.right>u.left&&o.top<u.bottom&&o.bottom>u.top&&a.push(d)}let s=a.filter(d=>!a.some(c=>c!==d&&c.contains(d)));return s.sort((d,c)=>{let u=d.compareDocumentPosition(c);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0}),s}function mt(e,t,n){return e+(t-e)*n}var $l=.35,Pi=.3,wn=.5,Il=2,Q=null,N=null,Jo=0,Qo=0,Ft=1,gt=null,oe=null,V=null,W=[],ft=l.accent,_l="rgba(162,89,255,0.08)",Oi="rgba(162,89,255,0.15)",Dl=4,Ai=10,Fl="#ffffff",Vl=ft,zl=1.5,nr=!0,je=null;function $i(){let e=U();e&&(Q=document.createElement("canvas"),Q.setAttribute("data-frameup-overlay","true"),Q.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(Q),or(),window.addEventListener("resize",or))}function Sn(e,t=4){if(!e){oe&&(oe.targetOpacity=0,_e());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!oe||!oe.initialized?oe=ar(n,t):(oe.target=n,oe.borderRadius=t,oe.targetOpacity=1),_e()}function Qe(e,t=4){if(!e){V&&(V.targetOpacity=0,_e());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!V||!V.initialized?V=ar(n,t):(V.target=n,V.borderRadius=t,V.targetOpacity=1),_e()}function Ii(e){je=e,_e()}function rr(){je=null,_e()}function _i(e){for(V=null;W.length>e.length;)W.pop();for(let t=0;t<e.length;t++){let n=e[t],o={x:n.rect.left,y:n.rect.top,w:n.rect.width,h:n.rect.height};t<W.length?(W[t].target=o,W[t].borderRadius=n.borderRadius,W[t].targetOpacity=1):W.push(ar(o,n.borderRadius))}_e()}function Vt(){W=[],_e()}function ir(e,t){if(!nr)return null;let n=Vi();if(!n)return null;let o=Wi(n.x,n.y,n.w,n.h);for(let r of o){let i=e-r.x,a=t-r.y;if(i*i+a*a<=Ai*Ai)return r.corner}return null}function Di(){return Vi()}function Fi(){gt!==null&&cancelAnimationFrame(gt),window.removeEventListener("resize",or),Q?.remove(),Q=null,N=null,oe=null,V=null,W=[],je=null}function Vi(){if(W.length>1)return zi(W);if(V&&V.opacity>=.5){let{x:e,y:t,w:n,h:o}=V.current;return{x:e,y:t,w:n,h:o}}if(W.length===1){let{x:e,y:t,w:n,h:o}=W[0].current;return{x:e,y:t,w:n,h:o}}return null}function zi(e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,r=-1/0;for(let i of e){let{x:a,y:s,w:d,h:c}=i.current;a<t&&(t=a),s<n&&(n=s),a+d>o&&(o=a+d),s+c>r&&(r=s+c)}return{x:t,y:n,w:o-t,h:r-n}}function ar(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function or(){Q&&(Ft=Math.max(window.devicePixelRatio||1,Il),Jo=window.innerWidth,Qo=window.innerHeight,Q.width=Jo*Ft,Q.height=Qo*Ft,Q.style.width=`${Jo}px`,Q.style.height=`${Qo}px`,N=Q.getContext("2d"),_e())}function _e(){gt===null&&(gt=requestAnimationFrame(Bi))}function Bi(){if(gt=null,!N||!Q)return;let e=!1;oe?.initialized&&(er(oe,$l)&&(e=!0),oe.opacity<.01&&oe.targetOpacity===0&&(oe=null)),V?.initialized&&(er(V,Pi)&&(e=!0),V.opacity<.01&&V.targetOpacity===0&&(V=null));for(let t=W.length-1;t>=0;t--){let n=W[t];n.initialized&&er(n,Pi)&&(e=!0),n.opacity<.01&&n.targetOpacity===0&&W.splice(t,1)}if(N.setTransform(1,0,0,1,0,0),N.clearRect(0,0,Q.width,Q.height),N.setTransform(Ft,0,0,Ft,0,0),oe&&tr(N,oe,ft,_l),V&&(tr(N,V,ft,Oi),nr&&Hi(N,V.current,V.opacity)),je){if(N.save(),N.globalAlpha=.6,N.strokeStyle=ft,N.lineWidth=1,N.setLineDash([4,4]),je.verticalLine){let{x:t}=je.verticalLine;N.beginPath(),N.moveTo(t,0),N.lineTo(t,Q.height),N.stroke()}if(je.horizontalLine){let{y:t}=je.horizontalLine;N.beginPath(),N.moveTo(0,t),N.lineTo(Q.width,t),N.stroke()}N.restore()}if(W.length>0){for(let t of W)tr(N,t,ft,Oi);if(nr&&W.length>0){let t=zi(W);t&&t.w>=24&&t.h>=24&&(W.length>1&&(N.globalAlpha=.6,N.beginPath(),N.rect(t.x,t.y,t.w,t.h),N.strokeStyle=ft,N.lineWidth=1,N.setLineDash([4,4]),N.stroke(),N.setLineDash([]),N.globalAlpha=1),Hi(N,t,1))}}e&&(gt=requestAnimationFrame(Bi))}function er(e,t){let n=e.current,o=e.target,r=mt(n.x,o.x,t),i=mt(n.y,o.y,t),a=mt(n.w,o.w,t),s=mt(n.h,o.h,t),d=mt(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<wn&&Math.abs(i-o.y)<wn&&Math.abs(a-o.w)<wn&&Math.abs(s-o.h)<wn&&Math.abs(d-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=s,e.opacity=d,!0)}function tr(e,t,n,o){let{x:r,y:i,w:a,h:s}=t.current;if(a<=0||s<=0)return;let d=Math.min(t.borderRadius,a/2,s/2);e.globalAlpha=t.opacity,e.beginPath(),d>0?e.roundRect(r,i,a,s,d):e.rect(r,i,a,s),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function Wi(e,t,n,o){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+n,y:t},{corner:"br",x:e+n,y:t+o},{corner:"bl",x:e,y:t+o}]}function Hi(e,t,n){if(t.w<24||t.h<24)return;e.globalAlpha=n;let o=Wi(t.x,t.y,t.w,t.h);for(let r of o)e.beginPath(),e.arc(r.x,r.y,Dl,0,Math.PI*2),e.fillStyle=Fl,e.fill(),e.strokeStyle=Vl,e.lineWidth=zl,e.stroke();e.globalAlpha=1}var Bl=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],Wl=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],Gl=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],Yl=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],jl=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],Re=[...Bl,...Wl,...Gl,...Yl,...jl];var Ul=new Set(["auto","none","normal","inherit","initial"]);function Gi(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let s=document.createElement("input");s.type="text",s.className="prop-input",s.style.cssText="width:60px; cursor:text;";let d=document.createElement("span");d.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${C};`,a.appendChild(s),a.appendChild(d);let c=new Map(t);function u(){return c.get(r.key)??r.defaultValue}function p(f){let m=parseFloat(f);s.value=isNaN(m)?f:String(m);try{let b=zr(i,f).find(L=>L.cssValue===f);b?.token?d.textContent=`${r.tailwindPrefix}-${b.token}`:d.textContent=""}catch{d.textContent=""}}return s.addEventListener("blur",()=>{let f=s.value.trim(),m=parseFloat(f);if(isNaN(m))Ul.has(f)?(c.set(r.key,f),p(f),n(r.key,f),o()):p(u());else{let b=f.match(/(px|rem|em|%|vw|vh|ch)$/)?f:`${m}px`;c.set(r.key,b),p(b),n(r.key,b),o()}}),s.addEventListener("keydown",f=>{f.key==="Enter"?s.blur():f.key==="Escape"&&(p(u()),s.blur())}),p(u()),{element:a,setValue(f,m){f===r.key&&(c.set(f,m),p(m))},destroy(){}}}function Yi(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${l.bgTertiary};
    border-radius:${k.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let s=t.get(r.key)??r.defaultValue,d=[];function c(u){s=u;for(let{btn:p,value:f,opt:m}of d){let h=f===u;p.style.background=h?l.accent:"transparent",p.style.color=h?l.textOnAccent:l.textSecondary,p.title=h&&m.tailwindValue?`${m.label} (${m.tailwindValue})`:m.label}}for(let u of i){let p=document.createElement("button");p.style.cssText=`
      display:flex;
      align-items:center;
      justify-content:center;
      padding:2px 6px;
      border:none;
      border-radius:${k.xs};
      font-family:${C};
      font-size:10px;
      cursor:pointer;
      background:transparent;
      color:${l.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g," "),p.textContent=u.icon??u.label,p.title=u.label,p.addEventListener("click",()=>{c(u.value),n(r.key,u.value),o()}),d.push({btn:p,value:u.value,opt:u}),a.appendChild(p)}return c(s),{element:a,setValue(u,p){u===r.key&&c(p)},destroy(){}}}function zt(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,s=0;a!==0&&(r===t?s=((n-o)/a+(n<o?6:0))*60:r===n?s=((o-t)/a+2)*60:s=((t-n)/a+4)*60);let d=r===0?0:a/r*100,c=r*100;return{h:s,s:d,v:c}}function Mn(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),s=o*(1-i*n),d=o*(1-(1-i)*n),c,u,p;switch(r%6){case 0:c=o,u=d,p=a;break;case 1:c=s,u=o,p=a;break;case 2:c=a,u=o,p=d;break;case 3:c=a,u=s,p=o;break;case 4:c=d,u=a,p=o;break;case 5:c=o,u=a,p=s;break;default:c=0,u=0,p=0}let f=m=>Math.round(m*255).toString(16).padStart(2,"0");return`#${f(c)}${f(u)}${f(p)}`}var Ue=null;function Ln(e){ht();let t=U();if(!t)return;let n=document.createElement("div");n.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${I.lg};
    border-radius: ${k.md};
    font-family: ${C};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${M.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let y=n.getBoundingClientRect();y.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-y.width-8}px`),y.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-y.height-8}px`),n.style.opacity="1"});let o=zt(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let y=Xl(["Fill","Text"],0,E=>{r=E===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(y)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),s=document.createElement("div");s.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${I.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let d=document.createElement("div");d.style.cssText="position:relative;width:176px;height:120px;",d.appendChild(i),d.appendChild(s),n.appendChild(d);function c(){let y=o.h,E=a.createLinearGradient(0,0,176,0);E.addColorStop(0,`hsl(${y}, 0%, 100%)`),E.addColorStop(1,`hsl(${y}, 100%, 50%)`),a.fillStyle=E,a.fillRect(0,0,176,120);let F=a.createLinearGradient(0,0,0,120);F.addColorStop(0,"rgba(0,0,0,0)"),F.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=F,a.fillRect(0,0,176,120);let q=o.s/100*176,J=(1-o.v/100)*120;s.style.left=`${q}px`,s.style.top=`${J}px`}let u=!1;i.addEventListener("mousedown",y=>{u=!0,p(y)});function p(y){let E=i.getBoundingClientRect(),F=Math.max(0,Math.min(176,y.clientX-E.left)),q=Math.max(0,Math.min(120,y.clientY-E.top));o.s=F/176*100,o.v=(1-q/120)*100,c(),P()}let f=document.createElement("canvas");f.width=176,f.height=14,f.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let m=f.getContext("2d"),h=document.createElement("div");h.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${I.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let b=document.createElement("div");b.style.cssText="position:relative;width:176px;height:14px;",b.appendChild(f),b.appendChild(h),n.appendChild(b);function L(){let y=m.createLinearGradient(0,0,176,0);for(let E=0;E<=6;E++)y.addColorStop(E/6,`hsl(${E*60}, 100%, 50%)`);m.fillStyle=y,m.fillRect(0,0,176,14),h.style.left=`${o.h/360*176}px`}let S=!1;f.addEventListener("mousedown",y=>{S=!0,_(y)});function _(y){let E=f.getBoundingClientRect(),F=Math.max(0,Math.min(176,y.clientX-E.left));o.h=F/176*360,L(),c(),P()}let $=document.createElement("input");$.type="text",$.value=Mn(o),$.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: ${k.sm};
    color: ${l.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,$.addEventListener("keydown",y=>{y.key==="Enter"&&$.blur(),y.stopPropagation()}),$.addEventListener("blur",()=>{let y=$.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(y)){let E=y.startsWith("#")?y:`#${y}`;o=zt(E),c(),L(),P()}else $.value=Mn(o)}),n.appendChild($);let B=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],x=document.createElement("div");x.style.cssText="display:flex;gap:4px;justify-content:center;";for(let y of B){let E=document.createElement("button");E.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${y};
      border: 1px solid ${l.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${M.fast};
    `,E.addEventListener("mouseenter",()=>{E.style.boxShadow=I.sm}),E.addEventListener("mouseleave",()=>{E.style.boxShadow="none"}),E.addEventListener("click",()=>{o=zt(y),c(),L(),$.value=y,P()}),x.appendChild(E)}if(n.appendChild(x),e.projectColors&&e.projectColors.length>0){let y=document.createElement("div");y.textContent="Project",y.style.cssText=`
      font-size: 10px;
      color: ${l.textSecondary};
      font-family: ${C};
      margin-top: 2px;
    `,n.appendChild(y);let E=document.createElement("div");E.style.cssText="display:flex;gap:4px;flex-wrap:wrap;max-height:48px;overflow-y:auto;";for(let{token:F,hex:q}of e.projectColors){let J=document.createElement("button");J.title=F,J.style.cssText=`
        width: 12px; height: 12px; border-radius: 50%;
        background: ${q};
        border: 1px solid ${l.border};
        cursor: pointer; padding: 0;
        transition: box-shadow ${M.fast};
      `,J.addEventListener("mouseenter",()=>{J.style.boxShadow=I.sm}),J.addEventListener("mouseleave",()=>{J.style.boxShadow="none"}),J.addEventListener("click",()=>{o=zt(q),c(),L(),$.value=q,P(),e.onPickedToken?.(F)}),E.appendChild(J)}n.appendChild(E)}function P(){let y=Mn(o);$.value=y,e.onColorChange(y),e.onPickedToken?.(void 0)}t.appendChild(n),Ue=n,c(),L();let se=y=>{u&&p(y),S&&_(y)},le=()=>{u=!1,S=!1};document.addEventListener("mousemove",se),document.addEventListener("mouseup",le);let R=y=>{y.key==="Escape"&&ht()};document.addEventListener("keydown",R,!0);let G=y=>{Ue&&!y.composedPath().includes(Ue)&&ht()};setTimeout(()=>document.addEventListener("mousedown",G,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",se),document.removeEventListener("mouseup",le),document.removeEventListener("keydown",R,!0),document.removeEventListener("mousedown",G,!0)},n._onClose=e.onClose}function ht(){Ue&&(Ue._cleanup?.(),Ue._onClose?.(),Ue.remove(),Ue=null)}function Xl(e,t,n){let o=document.createElement("div");o.style.cssText=`
    display: flex;
    background: ${l.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;let r=[];for(let i=0;i<e.length;i++){let a=document.createElement("button");a.textContent=e[i],a.style.cssText=`
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i===t?l.bgPrimary:"transparent"};
      box-shadow: ${i===t?I.sm:"none"};
      color: ${i===t?l.textPrimary:l.textSecondary};
      font-family: ${C}; font-size: 12px; cursor: pointer;
      transition: background ${M.fast}, color ${M.fast};
    `,a.addEventListener("click",()=>{r.forEach((s,d)=>{s.style.background=d===i?l.bgPrimary:"transparent",s.style.boxShadow=d===i?I.sm:"none",s.style.color=d===i?l.textPrimary:l.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var sr=null;function Kl(){return sr||(sr=document.createElement("canvas").getContext("2d")),sr}function ji(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${k.sm};
    border:1px solid ${l.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("input");s.type="text",s.placeholder="#rrggbb",s.className="prop-input",s.style.cssText="flex:1; min-width:0;";let d=document.createElement("span");d.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${C};`,i.appendChild(a),i.appendChild(s),i.appendChild(d);let c=t.get(r.key)??r.defaultValue,u=!1;function p(h){let b=h.trim().toLowerCase();if(b==="transparent")return"transparent";if(b==="inherit"||b==="currentcolor"||b==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(b))return b;let L=Kl();L.fillStyle="#000000",L.fillStyle=b;let S=L.fillStyle;if(S.startsWith("#"))return S;let _=S.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(_){let $=parseInt(_[1],10),B=parseInt(_[2],10),x=parseInt(_[3],10);return`#${((1<<24)+($<<16)+(B<<8)+x).toString(16).slice(1)}`}return"#000000"}function f(h){c=h,s.value=h,h==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=h;try{let b=Lt(),L=un(h,b.colorsReverse);L?d.textContent=`${r.tailwindPrefix??"bg"}-${L}`:d.textContent=""}catch{d.textContent=""}}function m(){if(u)return;let h=s.value.trim();if(!h){f(c);return}let b=p(h);f(b),n(r.key,b),o()}return a.addEventListener("click",()=>{if(u){ht(),u=!1;return}let h=a.getBoundingClientRect();u=!0,Ln({initialColor:p(c),position:{x:h.left-210,y:h.top},showPropertyToggle:!1,onColorChange:b=>{f(b),n(r.key,b)},onClose:()=>{u=!1,o()}})}),s.addEventListener("keydown",h=>{h.key==="Enter"?(m(),s.blur()):h.key==="Escape"&&(f(c),s.blur())}),s.addEventListener("blur",()=>{m()}),s.addEventListener("input",()=>{let h=s.value.trim(),b=p(h);a.style.background=b}),f(c),{element:i,setValue(h,b){h===r.key&&f(b)},destroy(){u&&(ht(),u=!1)}}}function Ui(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function Xi(e,t,n,o){let r=new Map(t),i=[];for(let w of e){let T=Ui(w.key);T&&i.push({descriptor:w,...T})}let a=document.createElement("div");a.style.cssText=`
    display:flex;
    flex-direction:column;
    gap:4px;
    font-family:${C};
    font-size:10px;
    color:${l.textSecondary};
    position:relative;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("div");s.style.cssText="position:relative; padding:4px;";let d=document.createElement("div");d.style.cssText=`
    background:${l.marginBoxBg};
    border:1px dashed ${l.marginBoxBorder};
    border-radius:${k.sm};
    padding:10px;
    position:relative;
  `.trim().replace(/\n\s*/g," ");let c=document.createElement("div");c.style.cssText=`
    background:${l.paddingBoxBg};
    border:1px dashed ${l.paddingBoxBorder};
    border-radius:${k.sm};
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
  `.trim().replace(/\n\s*/g," "),u.textContent="content";let p=[];function f(w){let T=document.createElement("span"),pe=r.get(w.key)??w.defaultValue;return T.textContent=_(pe),T.title=w.label,T.style.cssText=`
      cursor:pointer;
      color:${l.textPrimary};
      font-size:10px;
      font-family:${C};
      padding:1px 4px;
      border-radius:3px;
      text-align:center;
      transition:background 100ms ease;
      display:inline-block;
      min-width:18px;
    `.trim().replace(/\n\s*/g," "),T.addEventListener("mouseenter",()=>{T.style.background=l.bgTertiary}),T.addEventListener("mouseleave",()=>{(document.activeElement!==m||m.dataset.key!==w.key)&&(T.style.background="transparent")}),T.addEventListener("click",()=>{L(w,T)}),p.push({key:w.key,span:T,descriptor:w}),T}let m=document.createElement("input");m.type="text",m.className="prop-input",m.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(m);let h=null,b=null;function L(w,T){h&&h!==w&&S(),h=w,b=T,m.dataset.key=w.key;let pe=r.get(w.key)??w.defaultValue;m.value=_(pe);let te=0,qe=0,Ge=T;for(;Ge&&Ge!==a;)te+=Ge.offsetLeft,qe+=Ge.offsetTop,Ge=Ge.offsetParent;m.style.display="block",m.style.left=`${te}px`,m.style.top=`${qe}px`;let Vr=T.getBoundingClientRect();m.style.width=`${Math.max(40,Vr.width+10)}px`,m.focus(),m.select()}function S(){if(!h||!b)return;let w=m.value.trim(),T=h,pe=b,te,qe=parseFloat(w),Ge=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(qe)?Ge.has(w)?te=w:te=r.get(T.key)??T.defaultValue:te=w.match(/(px|rem|em|%|vw|vh|ch)$/)?w:`${qe}px`,r.set(T.key,te),pe.textContent=_(te),pe.style.background="transparent",m.style.display="none",m.dataset.key="",h=null,b=null,n(T.key,te),o()}m.addEventListener("keydown",w=>{if(w.key==="Enter")S();else if(w.key==="Escape"){if(h&&b){let T=r.get(h.key)??h.defaultValue;b.textContent=_(T)}m.style.display="none",m.dataset.key="",h=null,b=null}}),m.addEventListener("blur",()=>{S()});function _(w){let T=parseFloat(w);return isNaN(T)?w:T===Math.round(T)?String(Math.round(T)):w}function $(w){let T=document.createElement("span");return T.textContent=w,T.style.cssText=`
      font-size:9px;
      color:${l.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),T}function B(w,T){return i.find(pe=>pe.layer===w&&pe.side===T)}function x(w,T){let pe=B(w,T);if(!pe){let te=document.createElement("span");return te.textContent="-",te.style.cssText=`text-align:center; color:${l.textTertiary};`,te}return f(pe.descriptor)}let P=x("padding","top");P.style.gridRow="1",P.style.gridColumn="2",P.style.textAlign="center";let se=x("padding","left");se.style.gridRow="2",se.style.gridColumn="1";let le=x("padding","right");le.style.gridRow="2",le.style.gridColumn="3";let R=x("padding","bottom");R.style.gridRow="3",R.style.gridColumn="2",R.style.textAlign="center",u.style.gridRow="2",u.style.gridColumn="2",c.appendChild(P),c.appendChild(se),c.appendChild(u),c.appendChild(le),c.appendChild(R);let G=document.createElement("div");G.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let y=x("margin","top");y.style.gridRow="1",y.style.gridColumn="2",y.style.textAlign="center";let E=x("margin","left");E.style.gridRow="2",E.style.gridColumn="1";let F=x("margin","right");F.style.gridRow="2",F.style.gridColumn="3";let q=x("margin","bottom");q.style.gridRow="3",q.style.gridColumn="2",q.style.textAlign="center";let J=document.createElement("div");J.style.cssText="grid-row:2; grid-column:2;",J.appendChild(c),G.appendChild(y),G.appendChild(E),G.appendChild(J),G.appendChild(F),G.appendChild(q);let cn=$("margin"),$s=$("padding"),dn=document.createElement("div");return dn.style.cssText="display:flex; gap:8px; padding:0 4px;",dn.appendChild(cn),dn.appendChild($s),d.appendChild(G),s.appendChild(d),a.appendChild(dn),a.appendChild(s),{element:a,setValue(w,T){if(!Ui(w))return;r.set(w,T);let te=p.find(qe=>qe.key===w);te&&(te.span.textContent=_(T))},destroy(){}}}var Nn=new Set;function Ki(e){return Nn.has(e)}var kn=[];function Zi(e){return kn.push(e),()=>{let t=kn.indexOf(e);t>=0&&kn.splice(t,1)}}var Zl={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},ql={"number-scrub":Gi,segmented:Yi,"color-swatch":ji,"box-model":Xi},Jl=`
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
    font-family: ${C};
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
    border-radius: ${k.xs};
    padding: 4px 6px;
    font-family: ${C};
    font-size: 11px;
    color: ${l.textPrimary};
    outline: none;
    box-sizing: border-box;
    transition: border-color ${M.fast}, box-shadow ${M.fast};
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
    font-family: ${C};
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
  .prop-show-all {
    padding: 8px 14px;
    font-family: ${C};
    font-size: 11px;
    color: ${l.textTertiary};
    cursor: pointer;
    text-align: center;
    user-select: none;
  }
  .prop-show-all:hover {
    color: ${l.accent};
  }
`;function Ql(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function ec(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function tc(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}var nc=new Set(["flexDirection","justifyContent","alignItems","gap"]);function oc(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function lr(e,t,n,o,r){let i=document.createElement("div");i.className="prop-sections";let a=document.createElement("style");a.textContent=Jl,i.appendChild(a);let s=[],d=ec(e);for(let[c,u]of d){let p=c==="layout"&&!oc(t)?u.filter(S=>!nc.has(S.key)):u;if(p.length===0)continue;let f=document.createElement("div");f.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${Zl[c]}</span>${Ql()}`;let h=document.createElement("div");h.className="prop-section-body";let b=Nn.has(c);if(b){let S=m.querySelector(".prop-section-chevron");S&&S.classList.add("collapsed"),h.classList.add("collapsed")}m.addEventListener("click",()=>{if(b=!b,b)Nn.add(c);else{Nn.delete(c);for(let _ of kn)_(c)}let S=m.querySelector(".prop-section-chevron");S&&S.classList.toggle("collapsed",b),h.classList.toggle("collapsed",b)}),f.appendChild(m);let L=tc(p);for(let S of L){let _=ql[S.controlType];if(!_)continue;let $=_(S.descriptors,t,n,o);if(S.descriptors.length>1||S.controlType==="box-model")h.appendChild($.element);else{let B=document.createElement("div");B.className="prop-control-row";let x=document.createElement("span");x.className="prop-control-label",x.textContent=S.descriptors[0].label,x.title=S.descriptors[0].label;let P=document.createElement("div");P.className="prop-control-value",P.appendChild($.element),B.appendChild(x),B.appendChild(P),h.appendChild(B)}s.push($)}f.appendChild(h),i.appendChild(f)}if(r){let c=document.createElement("div");c.className="prop-show-all",c.textContent="Show all properties",c.addEventListener("click",r),i.appendChild(c)}return{container:i,controls:s}}var rc=300,qi=260,Ji=380,Qi="frameup-sidebar-width",ic=4,ac=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${l.bgPrimary};
    border-left: 1px solid ${l.border};
    box-shadow: ${I.lg};
    z-index: 2147483645;
    font-family: ${C};
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform ${M.settle};
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
    border-radius: ${k.sm};
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
    font-family: ${C};
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
    font-family: ${C};
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: ${k.xs};
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
`;function sc(){try{let e=localStorage.getItem(Qi);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=qi&&t<=Ji)return t}}catch{}return Math.min(rc,Math.floor(window.innerWidth*.22))}function lc(e){try{localStorage.setItem(Qi,String(e))}catch{}}function ea(e,t){let n=document.createElement("style");n.textContent=ac,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${sc()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let s=document.createElement("div");s.className="prop-sidebar-component-name";let d=document.createElement("span");d.className="prop-sidebar-saving-dot";let c=document.createElement("div");c.className="prop-sidebar-file-path",a.appendChild(s),a.appendChild(c);let u=document.createElement("button");u.className="prop-sidebar-close",u.title="Collapse panel",u.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="8,2 4,6 8,10"/></svg>',i.appendChild(a),i.appendChild(u),o.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",o.appendChild(p);let f=document.createElement("div");f.className="prop-sidebar-content",o.appendChild(f),e.appendChild(o);let m=!1,h=0,b=0;r.addEventListener("pointerdown",R=>{R.preventDefault(),R.stopPropagation(),m=!0,h=R.clientX,b=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(R.pointerId)}),r.addEventListener("pointermove",R=>{if(!m)return;let G=h-R.clientX,y=Math.max(qi,Math.min(Ji,b+G));o.style.width=`${y}px`});let L=()=>{m&&(m=!1,r.classList.remove("active"),lc(o.offsetWidth))};r.addEventListener("pointerup",L),r.addEventListener("pointercancel",L),o.addEventListener("pointerdown",R=>R.stopPropagation()),o.addEventListener("mousedown",R=>R.stopPropagation()),o.addEventListener("click",R=>R.stopPropagation()),o.addEventListener("mouseup",R=>R.stopPropagation()),u.addEventListener("click",()=>{$(),t&&t()});let S=!1;function _(R,G,y,E){s.textContent=`<${R}>`,s.appendChild(d),c.textContent=`${G}:${y}`,c.title=`${G}:${y}`,f.innerHTML="",f.appendChild(E),S||(S=!0,o.offsetHeight,o.classList.add("visible"))}function $(){S&&(S=!1,o.classList.remove("visible"))}function B(R){f.innerHTML="",f.appendChild(R)}function x(R,G,y){p.innerHTML="";let E=document.createElement("span");E.className="prop-sidebar-warning-text",E.textContent=R;let F=document.createElement("button");F.className="prop-sidebar-warning-btn",F.textContent=G,F.addEventListener("click",q=>{q.stopPropagation(),y()}),p.appendChild(E),p.appendChild(F),p.style.display="flex"}function P(){p.style.display="none",p.innerHTML=""}function se(){d.classList.add("active")}function le(){d.classList.remove("active")}return{show:_,hide:$,isVisible:()=>S,getElement:()=>o,replaceContent:B,showWarning:x,clearWarning:P,showSaving:se,hideSaving:le}}function cc(e,t,n){let o=n&&n!=="none"?` ${n}`:"";return`translate(${e}px, ${t}px)${o}`}function et(e){e.element.style.transform=cc(e.delta.dx,e.delta.dy,e.existingTransform)}function ta(e){e.existingTransform&&e.existingTransform!=="none"?e.element.style.transform=e.existingTransform:e.element.style.transform=""}function Bt(e,t,n,o){e.style.transform=`translate(${t}px, ${n}px) scale(1.02)${o&&o!=="none"?` ${o}`:""}`,e.style.boxShadow=I.lg,e.style.transition="none",e.style.zIndex="2147483644"}function na(e){et(e),e.element.style.boxShadow="",e.element.style.transition="",e.element.style.zIndex=""}function Rn(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);for(;o;){if(me(o)){let r=o._debugSource,i=ie(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function oa(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);if(!o)continue;let r=await Ne(o);if(!r||r.length===0)continue;for(let i of r)if(!(!i.functionName||i.functionName!==e.componentName)&&i.fileName){let a=we(i.fileName);if(ke(a)&&a.endsWith(e.filePath))return n}}catch{}return null}var fe=new Map,De=[],Xe=[],dr="select",ur=!0,ra={fontSize:16,textColor:"#ffffff"},Gt=1,An=0,Hn=0,Wt=[],Pn=[],On=[];function ia(e){return Pn.push(e),()=>{Pn=Pn.filter(t=>t!==e)}}function aa(e){return On.push(e),()=>{On=On.filter(t=>t!==e)}}function tt(){On.forEach(e=>e())}function $n(){return dr}function pr(e){let t=dr;t!==e&&(dr=e,Pn.forEach(n=>n(e,t)))}function Yt(){return{...ra}}function mr(e,t){ra[e]=t}function sa(){return fe}function la(e){fe.set(e.id,e),In({type:"moveCreate",moveId:e.id})}function ca(e,t,n){let o=fe.get(e);o&&(o.delta=t,et(o),In({type:"moveDelta",moveId:e,previousDelta:n}))}function fr(e){let t=fe.get(e);t&&(t.element.style.cssText=t.originalCssText,t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),fe.delete(e),tt())}function da(e){if(De.push(e),e.type==="colorChange"){let t=e;Xe.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else Xe.push({type:"annotationAdd",annotationId:e.id});tt()}function gr(e,t,n){De.push(e),Xe.push({type:"textEditRestore",annotationId:e.id,elementIdentity:t,originalInnerHTML:n}),tt()}var ua=null;function pa(e){ua=e}function cr(e){De=De.filter(t=>t.id!==e),ua?.(e),tt()}function ma(){return ur}function fa(e){ur=e;for(let t of fe.values())e?et(t):ta(t);tt()}function ga(e){for(let t of fe.values())if(t.element===e||t.element.contains(e)||e.contains(t.element))return!0;return!1}function ha(e){for(let t of fe.values())if(t.element===e)return t}function hr(){let e=Xe.pop();if(!e)return null;switch(e.type){case"moveCreate":return fr(e.moveId),"move removed";case"moveDelta":{let t=fe.get(e.moveId);return t&&(t.delta=e.previousDelta,et(t)),"move reverted"}case"annotationAdd":return cr(e.annotationId),"annotation removed";case"colorChange":{let t=De.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),cr(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}case"textEditRestore":{let t=Rn(e.elementIdentity);return t&&(t.innerHTML=e.originalInnerHTML),cr(e.annotationId),"text edit reverted"}}return null}function In(e){Xe.push(e),tt()}function Fe(){return{scale:Gt,offsetX:An,offsetY:Hn}}function _n(e,t,n){Gt=e,An=t,Hn=n,Wt.forEach(o=>o())}function Dn(e){return Wt.push(e),()=>{Wt=Wt.filter(t=>t!==e)}}function jt(e,t){return{x:(e-An)/Gt,y:(t-Hn)/Gt}}function Fn(){for(let e of fe.values())e.element.style.cssText=e.originalCssText,e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder);for(let e of De)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of Xe)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}fe=new Map,De=[],Xe=[],ur=!0,Gt=1,An=0,Hn=0,Wt.forEach(e=>e()),tt()}function Vn(){return fe.size>0||De.length>0}function ya(){return Xe.length>0}function ba(){let e=Array.from(fe.values()).map(r=>({component:r.componentRef.componentName,file:r.componentRef.filePath,line:r.componentRef.lineNumber,originalRect:{top:r.originalRect.top,left:r.originalRect.left,width:r.originalRect.width,height:r.originalRect.height},delta:{dx:r.delta.dx,dy:r.delta.dy},siblingRects:(()=>{let i=r.element.parentElement;if(!i)return;let a=[];for(let s of Array.from(i.children)){if(s===r.element||!(s instanceof HTMLElement))continue;let d=s.getBoundingClientRect();a.push({component:s.tagName.toLowerCase(),rect:{top:d.top,left:d.left,width:d.width,height:d.height}})}return a.length>0?a:void 0})()})),t=[],n=[],o=[];for(let r of De)r.type==="text"?t.push({type:"text",content:r.content,position:r.position,targetComponent:r.targetComponent?.componentName,targetFile:r.targetComponent?.filePath,targetLine:r.targetComponent?.lineNumber}):r.type==="colorChange"?n.push({component:r.component.componentName,file:r.component.filePath,line:r.component.lineNumber,property:r.property,from:r.fromColor,to:r.toColor,pickedToken:r.pickedToken}):r.type==="textEdit"&&o.push({component:r.componentName,file:r.filePath,line:r.lineNumber,column:r.columnNumber,originalText:r.originalText,newText:r.newText});return{moves:e,annotations:t,colorChanges:n,textEdits:o}}var va="frameup-onboarding-dismissed",Se=null;function xa(){if(localStorage.getItem(va))return;let e=U();if(!e)return;Se=document.createElement("div"),Se.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: ${l.bgSecondary};
    font-family: ${C};
    font-size: 12px;
    color: ${l.textSecondary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${M.medium};
    pointer-events: auto;
  `;let t=document.createElement("span");t.textContent="Click any element to edit its properties. Double-click text to edit it.";let n=document.createElement("span");n.textContent="\xD7",n.style.cssText=`
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 0 4px;
    color: ${l.textTertiary};
  `,n.addEventListener("click",()=>Ut()),Se.appendChild(t),Se.appendChild(n),e.appendChild(Se),requestAnimationFrame(()=>{Se&&(Se.style.opacity="1")})}function Ut(){Se&&(localStorage.setItem(va,"1"),Se.style.opacity="0",setTimeout(()=>{Se?.remove(),Se=null},150))}var yr=new Map(Re.map(e=>[e.key,e]));var dc=new Set(["layout","spacing","size"]),Ca=new Set(["typography","background"]),uc=new Set(["h1","h2","h3","h4","h5","h6","p","span","a","button","label","li","td","th","blockquote","figcaption"]);function Ta(e){let t=new Set(["spacing","size","background"]),o=getComputedStyle(e).display;(o==="flex"||o==="inline-flex"||o==="grid"||o==="inline-grid"||e.children.length>0)&&t.add("layout");let r=e.tagName.toLowerCase();return(Array.from(e.childNodes).some(a=>a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()??"").length>0)||uc.has(r))&&t.add("typography"),t}var pc=5e3,g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1},nt=[],z,Ea,ge=null,mc=300,xe=null,yt=null,zn=new MutationObserver(()=>{g.selectedElement&&!document.contains(g.selectedElement)&&(clearTimeout(Ea),Ea=setTimeout(()=>{fc()},80))});function fc(){let e=g.elementIdentity,t=g.componentInfo;if(!e||!t){vt();return}let n=gc(e);if(n){bt(n,t);return}hc(e).then(o=>{o?bt(o,t):vt()})}function gc(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);for(;o;){if(me(o)){let r=o._debugSource,i=ie(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function hc(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);if(!o)continue;let r=await Ne(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let s="";if(i.fileName){let d=we(i.fileName);ke(d)&&(s=d)}if(s&&e.filePath.endsWith(s)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}function yc(e,t){let n=getComputedStyle(e),o=new Map;for(let r of Re){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function bc(e){if(!g.selectedElement)return;let t=getComputedStyle(g.selectedElement);for(let n of Re){if(n.group!==e||g.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;g.currentValues.set(n.key,r),g.originalValues.get(n.key)===n.defaultValue&&g.originalValues.set(n.key,r);for(let i of nt)i.setValue(n.key,r)}}function Xt(){for(let e of nt)e.destroy();nt=[]}function br(){if(!g.selectedElement||!g.componentInfo)return;Xt();let e=g.showAllGroups?null:Ta(g.selectedElement),t=e?Re.filter(a=>e.has(a.group)):Re,o=e!==null&&t.length<Re.length?()=>La(!0):void 0,{container:r,controls:i}=lr(t,g.currentValues,Kt,Bn,o);nt=i,z.replaceContent(r)}function Bn(){ge&&clearTimeout(ge),ge=setTimeout(()=>{ge=null,xr()},mc)}function vr(){ge&&(clearTimeout(ge),ge=null),yt&&(yt(),yt=null),xe&&(clearTimeout(xe.timeoutId),xe=null),g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1}}function wa(e){z=ea(e,()=>{Wn(),Xt(),vr()}),Gr((t,n,o)=>{if(z&&z.hideSaving(),xe)if(clearTimeout(xe.timeoutId),t)xe=null;else{let{batch:r,previousOriginals:i}=xe;xe=null;for(let[a]of r){let s=i.get(a);s!==void 0&&g.originalValues.set(a,s)}if(g.selectedElement){for(let[a]of r){g.selectedElement.style[a]="",g.activeOverrides.delete(a);let s=g.originalValues.get(a);s!==void 0&&g.currentValues.set(a,s)}for(let a of nt)for(let[s]of r){let d=g.originalValues.get(s);d!==void 0&&a.setValue(s,d)}}if(z){let s={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";z.showWarning(s,"Dismiss",()=>z.clearWarning())}}else if(!t&&z){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";z.showWarning(i,"Dismiss",()=>z.clearWarning())}})}function bt(e,t){g.pendingBatch.size>0&&xr(),Ut(),Xt(),g.showAllGroups=!1,g.selectedElement=e,g.componentInfo=t,g.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(dc);for(let u of Ca)Ki(u)||n.add(u);let o=yc(e,n);g.currentValues=o,g.originalValues=new Map(o),g.activeOverrides=new Map,g.pendingBatch=new Map,yt&&yt(),yt=Zi(u=>{Ca.has(u)&&bc(u)});let r=g.showAllGroups?null:Ta(e),i=r?Re.filter(u=>r.has(u.group)):Re,s=r!==null&&i.length<Re.length?()=>La(!0):void 0,{container:d,controls:c}=lr(i,g.currentValues,Kt,Bn,s);nt=c,zn.disconnect(),zn.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),z.show(t.componentName,t.filePath,t.lineNumber,d)}function Kt(e,t){let n=yr.get(e);if(!n||!g.selectedElement)return;g.selectedElement.style[n.key]=t,g.activeOverrides.set(e,t),g.currentValues.set(e,t);let o=Lt(),r=n.tailwindScale+"Reverse",i=o[r],a=i?un(t,i):null;if(!a&&n.enumValues){let s=n.enumValues.find(d=>d.value===t);s&&(a=s.tailwindValue)}if(g.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:g.originalValues.get(e)||n.defaultValue}),e==="display")if(br(),t==="none"){let s=g.originalValues.get("display")||"block";z.showWarning("Element hidden","Restore",()=>{g.selectedElement&&(g.selectedElement.style.display=s),g.activeOverrides.delete("display"),g.currentValues.set("display",s),g.pendingBatch.delete("display"),br(),z.clearWarning()})}else z.clearWarning()}function xr(){if(g.pendingBatch.size===0||!g.componentInfo)return;let e=g.componentInfo.filePath,t=g.componentInfo.lineNumber,n=g.componentInfo.columnNumber-1;if(g.pendingBatch.size===1){let a=[...g.pendingBatch.values()][0],s=yr.get(a.property);be({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:n,...a,framework:"tailwind",classPattern:s?.classPattern,standalone:s?.standalone})}else be({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:n,updates:[...g.pendingBatch.values()].map(a=>{let s=yr.get(a.property);return{...a,classPattern:s?.classPattern,standalone:s?.standalone}}),framework:"tailwind"});g.selectedElement&&g.elementIdentity&&In({type:"propertyChange",elementIdentity:g.elementIdentity,element:g.selectedElement,overrides:[...g.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),z&&z.showSaving();let o=new Map;for(let[a]of g.pendingBatch)o.set(a,g.originalValues.get(a)||"");for(let[a,s]of g.pendingBatch)g.originalValues.set(a,s.value);let r=new Map(g.pendingBatch),i=setTimeout(()=>{xe&&xe.batch===r&&(xe=null,z&&z.hideSaving())},pc);xe={batch:r,previousOriginals:o,timeoutId:i},g.pendingBatch.clear()}function Wn(){if(g.selectedElement){for(let[e]of g.activeOverrides)g.selectedElement.style[e]="";for(let[e,t]of g.originalValues)g.currentValues.set(e,t);for(let e of nt)for(let[t,n]of g.originalValues)e.setValue(t,n);g.activeOverrides.clear(),g.pendingBatch.clear()}}function vt(){ge&&(clearTimeout(ge),ge=null),zn.disconnect(),Wn(),Xt(),z&&z.hide(),vr()}function Sa(){ge&&(clearTimeout(ge),ge=null),zn.disconnect(),xr(),Xt(),z&&z.hide(),vr()}function Ma(){return g.activeOverrides.size>0}function La(e){g.showAllGroups=e,br()}var ot=null;function Na(e,t){if(!ot)return;let n=performance.now(),o=Math.abs(e-ot.clientX),r=Math.abs(t-ot.clientY),i=o<=2&&r<=2,a=n-ot.timestamp<16;if(i||a)return ot.element}function ka(e,t,n){ot={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function xt(){ot=null}var vc=.1,xc=5,Cc=.002,Ec=24,Ra=1,Tc="rgba(0,0,0,0.15)",K=null,Me=null,Cr=null,Oa=[],Aa=[];var Er="",Tr="";function wc(){Er=document.body.style.background||document.body.style.backgroundColor||"",Tr=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",K=document.createElement("div"),K.setAttribute("data-frameup-canvas-wrapper","true"),K.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${n};
  `.trim().replace(/\n\s*/g," "),Me=document.createElement("div"),Me.setAttribute("data-frameup-dot-bg","true"),Me.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${l.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="frameup-root"||r.hasAttribute("data-frameup-interaction")||r.hasAttribute("data-frameup-placeholder")||r.hasAttribute("data-frameup-annotation")||r.hasAttribute("data-frameup-dot-bg")||r.hasAttribute("data-frameup-canvas-wrapper"))||(Oa.push(r),K.appendChild(r));K.style.position="relative",K.style.zIndex="1",document.body.insertBefore(Me,document.body.firstChild),document.body.insertBefore(K,Me.nextSibling),Cr=Dn(Pa),Pa(),Aa.forEach(r=>r(K))}function Pa(){if(!K||!Me)return;let{scale:e,offsetX:t,offsetY:n}=Fe();K.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=Ec*e,r=t%o,i=n%o;Me.style.backgroundImage=`radial-gradient(circle, ${Tc} ${Ra}px, transparent ${Ra}px)`,Me.style.backgroundSize=`${o}px ${o}px`,Me.style.backgroundPosition=`${r}px ${i}px`}function Sc(e,t,n){let{scale:o,offsetX:r,offsetY:i}=Fe(),a=Math.min(xc,Math.max(vc,o+n));if(a===o)return;let s=(e-r)/o,d=(t-i)/o,c=e-s*a,u=t-d*a;_n(a,c,u)}function Ha(e){e.preventDefault();let t=-e.deltaY*Cc,{scale:n}=Fe(),o=t*n;Sc(e.clientX,e.clientY,o)}function $a(e,t){let{scale:n,offsetX:o,offsetY:r}=Fe();_n(n,o+e,r+t)}function Ia(){_n(1,0,0)}function _a(){return K!==null}function Da(){K?wr():wc()}function wr(){if(Aa.forEach(e=>e(null)),Cr?.(),Cr=null,K){for(;K.firstChild;)document.body.insertBefore(K.firstChild,K);K.remove(),K=null}Me?.remove(),Me=null,Oa=[],document.body.style.background=Er,document.documentElement.style.background=Tr,Er="",Tr=""}var Mc=new Set(["IMG","INPUT","VIDEO","IFRAME","CANVAS","SELECT","TEXTAREA","HR","BR","EMBED","OBJECT","PROGRESS"]),Z=null,rt="",Yn="",Un="",he=null,Sr="",Mr=null,Gn=null;function Xn(){return Z!==null}function Fa(){document.addEventListener("dblclick",za,!0),Mr=Ae(e=>{e.type==="updateTextComplete"&&Lc(e)})}function Va(){Z&&Ya(),document.removeEventListener("dblclick",za,!0),Mr?.(),Mr=null}function Lc(e){if(!e.success&&e.reason==="no-match"&&Gn){let t=Gn,n={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,originalText:t.originalText,newText:t.newText},o={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};gr(n,o,t.originalInnerHTML)}Gn=null}function Nc(e){return!!(e.scrollHeight>e.clientHeight+4||e.querySelector("br")||getComputedStyle(e).whiteSpace!=="nowrap"&&e.getClientRects().length>1)}async function kc(e){let t=ne(e);if(!t)return null;try{let n=await Ne(t);if(n&&n.length>0)for(let o of n){if(!o.functionName)continue;let r=o.functionName;if(r[0]!==r[0].toUpperCase()||Ie(r))continue;let i="";if(o.fileName){let a=we(o.fileName);ke(a)&&(i=a)}return{tagName:e.tagName.toLowerCase(),componentName:r,filePath:i,lineNumber:o.lineNumber??0,columnNumber:o.columnNumber??0,stack:[],boundingRect:e.getBoundingClientRect()}}}catch{}try{let n=t;for(;n;){if(me(n)){let o=ie(n.type),r=n._debugSource||n._debugOwner?._debugSource;if(o&&o[0]===o[0].toUpperCase()&&!Ie(o)&&r)return{tagName:e.tagName.toLowerCase(),componentName:o,filePath:r.fileName||"",lineNumber:r.lineNumber||0,columnNumber:r.columnNumber||0,stack:[],boundingRect:e.getBoundingClientRect()}}if(!n.return)break;n=n.return}}catch{}return null}function za(e){Z&&jn();let t=null,n=e.target;n instanceof HTMLElement&&n!==document.documentElement&&n!==document.body&&!n.hasAttribute("data-frameup-interaction")&&!n.closest("#frameup-root")?t=n:t=Zn(e.clientX,e.clientY),t&&(Mc.has(t.tagName)||t.textContent?.trim()&&(e.preventDefault(),Rc(t)))}function Rc(e){Z=e,rt=e.textContent||"",Yn=e.innerHTML,Un=rt,he=null,kc(e).then(n=>{Z===e&&(he=n)}),Sr=e.style.outline,e.style.outline=`2px solid ${l.accent}`,e.contentEditable="true",ja(!1),e.focus();let t=window.getSelection();if(t){t.removeAllRanges();let n=document.createRange();n.selectNodeContents(e),n.collapse(!1),t.addRange(n)}e.addEventListener("blur",Wa),e.addEventListener("keydown",Ga),e.addEventListener("input",Ba)}function Ba(){Z&&(Un=Z.textContent||"")}function Wa(){jn()}function Ga(e){if(e.key==="Escape"){e.preventDefault(),jn();return}if(e.key==="Enter"&&Z&&!Nc(Z)){e.preventDefault(),jn();return}e.stopPropagation()}function jn(){if(!Z)return;let e=Un;if(e!==rt&&he)if(he.filePath)Gn={componentInfo:he,originalText:rt,newText:e,originalInnerHTML:Yn,tagName:he.tagName},be({type:"updateText",filePath:he.filePath,lineNumber:he.lineNumber,columnNumber:he.columnNumber,originalText:rt,newText:e});else{let o={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:he.componentName,filePath:"",lineNumber:0,columnNumber:0,originalText:rt,newText:e},r={componentName:he.componentName,filePath:"",lineNumber:0,columnNumber:0,tagName:he.tagName};gr(o,r,Yn)}let n=Z;Ya(),n&&document.contains(n)&&qn(n,{skipSidebar:!1})}function Ya(){Z&&(Z.removeEventListener("blur",Wa),Z.removeEventListener("keydown",Ga),Z.removeEventListener("input",Ba),Z.removeAttribute("contenteditable"),Z.style.outline=Sr,Kn($n()),Z=null,rt="",Yn="",Un="",he=null,Sr="")}var O=null,qt=null,Lr=new Map,Ve=!1,Ct=0,Zt=0,Ua="";function Xa(e,t){Lr.set(e,t)}function Ka(){O=document.createElement("div"),O.setAttribute("data-frameup-interaction","true"),O.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(O),document.addEventListener("scroll",xt,!0),O.addEventListener("mousedown",e=>{if(Ve){Ct=e.clientX,Zt=e.clientY,O&&(O.style.cursor="grabbing"),e.preventDefault();return}qt?.onMouseDown?.(e)}),O.addEventListener("mousemove",e=>{if(Ve&&Ct!==0){$a(e.clientX-Ct,e.clientY-Zt),Ct=e.clientX,Zt=e.clientY;return}qt?.onMouseMove?.(e)}),O.addEventListener("mouseup",e=>{if(Ve){O&&(O.style.cursor="grab"),Ct=0,Zt=0;return}qt?.onMouseUp?.(e)}),document.addEventListener("wheel",Za,{passive:!1}),document.addEventListener("keydown",qa),document.addEventListener("keyup",Ja)}function Za(e){!O||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#frameup-root")||Ha(e)}function qa(e){if(e.key!==" "||Xn())return;let t=document.activeElement;t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t?.isContentEditable||(e.preventDefault(),!Ve&&O&&(Ua=O.style.cursor,O.style.cursor="grab",O.style.pointerEvents="auto",Ve=!0))}function Ja(e){if(e.key===" "&&Ve&&(e.preventDefault(),Ve=!1,Ct=0,Zt=0,O)){O.style.cursor=Ua;let t=$n();O.style.pointerEvents=t==="select"?"none":"auto"}}function Jn(){return Ve}function Kn(e){qt=Lr.get(e)||null,O&&(O.style.pointerEvents=e==="select"?"none":"auto"),Pc(e)}function Pc(e){if(O)switch(e){case"select":O.style.cursor="default";break;case"text":O.style.cursor="text";break;default:O.style.cursor="default"}}function ja(e){O&&(O.style.pointerEvents=e?"auto":"none")}function Zn(e,t){let n=Na(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#frameup-root")&&!i.hasAttribute("data-frameup-interaction")&&!i.hasAttribute("data-frameup-placeholder")&&!(i===document.body||i===document.documentElement)&&!Zo(i)){r=i;break}return ka(e,t,r),r}function Qa(){document.removeEventListener("scroll",xt,!0),document.removeEventListener("wheel",Za),document.removeEventListener("keydown",qa),document.removeEventListener("keyup",Ja),Ve=!1,O?.remove(),O=null,qt=null,Lr.clear()}function es(e,t,n,o,r,i){let a=e.left+e.width/2,s=e.top+e.height/2,d=t.left+t.width/2,c=t.top+t.height/2,u=d-a,p=c-s,f=Math.abs(u)<=r,m=Math.abs(p)<=r;return{dx:f?n+u/i:n,dy:m?o+p/i:o,snappedX:f,snappedY:m,guides:{verticalLine:f?{x:d,top:t.top,bottom:t.bottom}:null,horizontalLine:m?{y:c,left:t.left,right:t.right}:null}}}var ee=null,Qn={x:0,y:0},Jt={dx:0,dy:0},eo=!1;function Nr(e,t,n){let o=jt(e,t),r=ha(n);if(r)return ee=r,Qn={x:o.x,y:o.y},Jt={...r.delta},eo=!1,Bt(r.element,r.delta.dx,r.delta.dy,r.existingTransform),!0;let i=ns(),a=os();if(!i||!a||n!==a)return!1;let s=a.getBoundingClientRect(),d=a.style.cssText,c=getComputedStyle(a).transform,u={id:crypto.randomUUID(),componentRef:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber},element:a,placeholder:null,originalRect:s,delta:{dx:0,dy:0},originalCssText:d,existingTransform:c==="none"?"":c,identity:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber,columnNumber:i.columnNumber,tagName:a.tagName.toLowerCase()}};return la(u),ee=u,Qn={x:o.x,y:o.y},Jt={dx:0,dy:0},eo=!0,Bt(a,0,0,u.existingTransform),!0}function kr(e,t){if(!ee)return;let n=jt(e,t),o=Jt.dx+(n.x-Qn.x),r=Jt.dy+(n.y-Qn.y);Bt(ee.element,o,r,ee.existingTransform);let i=ee.element.parentElement;if(!i||i===document.body||i===document.documentElement){ee.delta={dx:o,dy:r},rr();return}let a=ee.element.getBoundingClientRect(),s=i.getBoundingClientRect(),{scale:d}=Fe(),c=es(a,s,o,r,5,d);(c.snappedX||c.snappedY)&&Bt(ee.element,c.dx,c.dy,ee.existingTransform),ee.delta={dx:c.dx,dy:c.dy},Ii(c.guides)}function ts(){if(!ee)return null;eo||ca(ee.id,ee.delta,Jt),na(ee),rr();let e=ee.element;return ee=null,eo=!1,e}Yo()||jo({onCommitFiberRoot(){}});async function Oc(e){let t=ne(e);if(!t)return null;try{let n=await Ne(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||Ie(i))continue;let a="";if(r.fileName){let s=we(r.fileName);ke(s)&&(a=s)}o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0)return{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}}catch(n){console.warn("[FrameUp] getOwnerStack failed, falling back to fiber walk:",n)}return rs(e,t)}function rs(e,t){let n=[],o=t;for(;o;){if(me(o)){let r=ie(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",s=0,d=0;i&&(a=i.fileName||"",s=i.lineNumber||0,d=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!Ie(r)&&n.push({componentName:r,filePath:a,lineNumber:s,columnNumber:d})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function is(e){let t=ne(e);return t?rs(e,t):null}var Y=null,D=null,Be=!1,Et=!1,H=new Map,v=null,Le=null,ae="idle",A=null,Pe=null,Ce=null,ao=null,Qt=0,en=0,Ke=[],tn=!1,Ac=null,Hc=null,$c=null,Ic=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${I.sm};
    border-radius: ${k.sm};
    padding: 4px 8px;
    z-index: 2147483646;
    font-family: ${C};
    white-space: nowrap;
    display: none;
    opacity: 0;
    transition: opacity ${M.medium};
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
`;function as(e){Ac=e.onStart,Hc=e.onMove,$c=e.onEnd}function ss(){let e=U();if(!e)return;let t=document.createElement("style");t.textContent=Ic,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),Le=document.createElement("div"),Le.className="marquee-box",e.appendChild(Le),Be=!0,document.addEventListener("mousedown",to,!0),document.addEventListener("mousemove",no,!0),document.addEventListener("mouseup",oo,!0),document.addEventListener("keydown",io,!0),document.addEventListener("click",ro,!0),document.addEventListener("scroll",ze,!0),window.addEventListener("resize",ze),Et=!0}function to(e){if(!Be||Jn()||e.metaKey||e.ctrlKey)return;let t=document.elementFromPoint(e.clientX,e.clientY);if(t?.closest("#frameup-root"))return;if(Y||H.size>0){let o=ir(e.clientX,e.clientY);if(o){e.preventDefault(),e.stopPropagation();let r=Di();if(Ce=o,ao=r?{...r}:null,H.size>0){Ke=[];for(let[i]of H){let a=getComputedStyle(i);Ke.push({element:i,width:parseFloat(a.width)||i.offsetWidth,height:parseFloat(a.height)||i.offsetHeight})}Qt=0,en=0}else if(D){let i=getComputedStyle(D);Qt=parseFloat(i.width)||D.offsetWidth,en=parseFloat(i.height)||D.offsetHeight,Ke=[]}A={x:e.clientX,y:e.clientY},ae="resize-drag";return}}if(e.preventDefault(),e.stopPropagation(),!t||!Dt(t)){(Y||H.size>0)&&(Sa(),Y=null,D=null,so(),Qe(null),v&&(v.classList.remove("visible"),v.style.display="none"),He(null));return}if(A={x:e.clientX,y:e.clientY},Pe=t,tn=e.shiftKey,ga(t)&&Nr(e.clientX,e.clientY,t)){ae="move-drag";return}if(!tn&&D&&t===D){ae="pending-move";return}ae="pending"}function no(e){if(Be&&!Jn()){if(ae==="resize-drag"&&Ce&&A&&ao){e.preventDefault(),e.stopPropagation();let t=e.clientX-A.x,n=e.clientY-A.y;if(Ke.length>0){for(let o of Ke){let r=o.width,i=o.height;Ce==="tr"||Ce==="br"?r=Math.max(10,o.width+t):r=Math.max(10,o.width-t),Ce==="bl"||Ce==="br"?i=Math.max(10,o.height+n):i=Math.max(10,o.height-n),o.element.style.width=`${Math.round(r)}px`,o.element.style.height=`${Math.round(i)}px`}nn()}else{let o=Qt,r=en;Ce==="tr"||Ce==="br"?o=Math.max(10,Qt+t):o=Math.max(10,Qt-t),Ce==="bl"||Ce==="br"?r=Math.max(10,en+n):r=Math.max(10,en-n),o=Math.round(o),r=Math.round(r),Kt("width",`${o}px`),Kt("height",`${r}px`),ze()}return}if(ae==="pending-move"&&A){let t=Math.abs(e.clientX-A.x),n=Math.abs(e.clientY-A.y);(t>4||n>4)&&(Pe&&Nr(A.x,A.y,Pe)?(ae="move-drag",kr(e.clientX,e.clientY)):ae="marquee");return}if(ae==="move-drag"){kr(e.clientX,e.clientY);return}if(ae==="pending"&&A){let t=Math.abs(e.clientX-A.x),n=Math.abs(e.clientY-A.y);(t>10||n>10)&&(ae="marquee")}if(ae==="marquee"&&A&&Le){let t=Math.min(e.clientX,A.x),n=Math.min(e.clientY,A.y),o=Math.abs(e.clientX-A.x),r=Math.abs(e.clientY-A.y);Le.style.display="block",Le.style.left=`${t}px`,Le.style.top=`${n}px`,Le.style.width=`${o}px`,Le.style.height=`${r}px`;return}if(ae==="idle"){if(Y&&D||H.size>0){let i=ir(e.clientX,e.clientY);if(i){document.body.style.cursor=i==="tl"||i==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let n=document.elementFromPoint(e.clientX,e.clientY);if(!n||!Dt(n)){Sn(null);return}let o=n.getBoundingClientRect(),r=parseFloat(getComputedStyle(n).borderRadius)||4;Sn(o,r+2)}}}function oo(e){if(!Be||Jn())return;let t=ae;if(ae="idle",t==="resize-drag"){document.body.style.cursor="",Ce=null,ao=null,A=null,Ke.length>0?Ke=[]:Bn();return}if(t==="move-drag"){let n=ts();n&&Vc(n),A=null,Pe=null;return}if(t==="pending-move"){A=null,Pe=null;return}if(t==="marquee"&&A){Le&&(Le.style.display="none"),_c(Math.min(e.clientX,A.x),Math.min(e.clientY,A.y),Math.max(e.clientX,A.x),Math.max(e.clientY,A.y)),A=null,Pe=null,tn=!1;return}Pe&&(tn?Dc(Pe):(so(),qn(Pe))),A=null,Pe=null,tn=!1}async function qn(e,t){try{let n=e.getBoundingClientRect();D=e,Rr(n,{}),Fc();let o=await Oc(e);if(console.log("[FrameUp] selectElement:",e.tagName,"\u2192",o?.componentName,o?.filePath,"stack:",o?.stack?.map(r=>r.componentName)),!o)return;if(Y={tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber,columnNumber:o.columnNumber,stack:o.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}},v){let r=o.filePath?`${o.filePath}:${o.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${o.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||bt(e,Y),He({tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber})}catch(n){console.error("[FrameUp] selectElement error:",n)}}function _c(e,t,n,o){let r=Ri({x:e,y:t,width:n-e,height:o-t});if(r.length!==0){vt(),Y=null,D=null,Qe(null),v&&(v.classList.remove("visible"),v.style.display="none"),H.clear();for(let i of r.slice(0,50)){let a=is(i);if(!a)continue;let s=i.getBoundingClientRect(),d={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:s.top,left:s.left,width:s.width,height:s.height}};H.set(i,{element:i,info:d})}if(H.size!==0){if(H.size===1){let[i,a]=[...H.entries()][0];H.clear(),D=i,Y=a.info;let s=i.getBoundingClientRect();if(Rr(s,Y),v){let d=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${d?`<span class="comp-path">${d}</span>`:""}`}bt(i,Y),He({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}nn(),He(null),v&&(v.innerHTML=`<span class="comp-name">${H.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function Dc(e){if(H.has(e)){if(H.delete(e),H.size===1){let[r,i]=[...H.entries()][0];H.clear(),Vt(),D=r,Y=i.info;let a=r.getBoundingClientRect();if(Rr(a,Y),bt(r,Y),v){let s=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${s?`<span class="comp-path">${s}</span>`:""}`}He({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else H.size===0?(Vt(),it()):(nn(),v&&(v.innerHTML=`<span class="comp-name">${H.size} elements selected</span>`));return}let t=is(e);if(!t)return;Y&&D&&H.size===0&&(H.set(D,{element:D,info:Y}),vt(),Y=null,D=null,Qe(null));let n=e.getBoundingClientRect(),o={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}};H.set(e,{element:e,info:o}),nn(),He(null),v&&(v.innerHTML=`<span class="comp-name">${H.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function so(){H.clear(),Vt()}function nn(){if(H.size===0){Vt();return}let e=[];for(let[t]of H){let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:n,borderRadius:o+2})}_i(e)}function ro(e){Be&&(e.metaKey||e.ctrlKey||e.preventDefault())}function io(e){if(Be&&e.key==="Escape"){if(H.size>0){so(),v&&(v.classList.remove("visible"),v.style.display="none"),He(null),e.preventDefault();return}if(Y){if(Ma()){Wn(),e.preventDefault();return}it(),e.preventDefault()}}}function Rr(e,t){if(D){let n=parseFloat(getComputedStyle(D).borderRadius)||4;Qe(e,n+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function ze(){if(H.size>0){nn();return}if(!D||!Y)return;let e=D.getBoundingClientRect(),t=parseFloat(getComputedStyle(D).borderRadius)||4;if(Qe(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function Fc(){Sn(null)}function it(){vt(),Y=null,D=null,Ce=null,ao=null,Ke=[],so(),document.body.style.cursor="",Qe(null),v&&(v.classList.remove("visible"),v.style.display="none"),He(null)}function ns(){return Y}function ls(){Be=!1,document.removeEventListener("mousedown",to,!0),document.removeEventListener("mousemove",no,!0),document.removeEventListener("mouseup",oo,!0),document.removeEventListener("keydown",io,!0),document.removeEventListener("click",ro,!0),document.removeEventListener("scroll",ze,!0),window.removeEventListener("resize",ze),Et=!1,v?.remove(),v=null}function cs(e){e&&!Et?(document.addEventListener("mousedown",to,!0),document.addEventListener("mousemove",no,!0),document.addEventListener("mouseup",oo,!0),document.addEventListener("keydown",io,!0),document.addEventListener("click",ro,!0),document.addEventListener("scroll",ze,!0),window.addEventListener("resize",ze),Et=!0,Be=!0):!e&&Et&&(document.removeEventListener("mousedown",to,!0),document.removeEventListener("mousemove",no,!0),document.removeEventListener("mouseup",oo,!0),document.removeEventListener("keydown",io,!0),document.removeEventListener("click",ro,!0),document.removeEventListener("scroll",ze,!0),window.removeEventListener("resize",ze),Et=!1,Be=!1)}function os(){return D??null}async function Vc(e){await qn(e,{skipSidebar:!0})}var ue=null,de=null,Ze=null,ds=null,on=!1,Tt=null,lo=[],co=new Map,uo=!1,zc=`
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
`,wt=null;function us(){let e=U();if(!e)return;let t=document.createElement("style");t.textContent=zc,e.appendChild(t),as({onStart:Bc,onMove:Wc,onEnd:Gc}),Ae(n=>{n.type==="reorderComplete"&&(Pr(),it())})}function Bc(e,t,n){Ze=n,ds=t,Tt={x:e.clientX,y:e.clientY},on=!1,uo=!1,lo=[],co=new Map,wt=null;let o=U();if(!o)return;ue=document.createElement("div"),ue.className="drag-preview";let r=t.getBoundingClientRect();ue.style.width=`${r.width}px`,ue.style.height=`${r.height}px`,ue.innerHTML=t.outerHTML,o.appendChild(ue),de=document.createElement("div"),de.className="drop-indicator",o.appendChild(de);let i=n.stack[1];if(!i)return;be({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=Ae(s=>{if(s.type!=="siblingsList")return;a(),lo=s.siblings;let d=document.querySelectorAll("*");for(let c of d){if(c.closest("#frameup-root"))continue;let u=ne(c);if(!u)continue;let p=u;for(;p;){if(me(p)){let f=p._debugSource||p._debugOwner?._debugSource;if(f){for(let m of s.siblings)f.lineNumber===m.lineNumber&&f.fileName===i.filePath&&co.set(m.lineNumber,{el:c,rect:c.getBoundingClientRect()});break}}p=p.return}}uo=!0})}function Wc(e){if(!Tt)return;let t=Math.abs(e.clientX-Tt.x),n=Math.abs(e.clientY-Tt.y);if(t<5&&n<5||(on=!0,ue&&(ue.style.display="block",ue.style.left=`${e.clientX+10}px`,ue.style.top=`${e.clientY+10}px`),!uo||!Ze))return;let o=null,r=1/0,i=0,a=0,s=0;for(let d of lo){if(d.lineNumber===Ze.lineNumber)continue;let c=co.get(d.lineNumber);if(!c)continue;let u=c.rect,p=u.top+u.height/2,f=Math.abs(e.clientY-p);f<r&&(r=f,o=d,e.clientY<p?i=u.top-2:i=u.bottom+2,a=u.left,s=u.width)}wt=o,o&&de?(de.style.display="block",de.style.top=`${i}px`,de.style.left=`${a}px`,de.style.width=`${s}px`):de&&(de.style.display="none")}function Gc(e){if(!on||!wt||!Ze){Pr();return}be({type:"reorder",filePath:Ze.filePath,fromLine:Ze.lineNumber,toLine:wt.lineNumber,fromComponent:Ze.componentName,toComponent:wt.componentName}),ue&&(ue.style.display="none"),de&&(de.style.display="none"),on=!1,Tt=null}function Pr(){ue?.remove(),de?.remove(),ue=null,de=null,Ze=null,ds=null,on=!1,Tt=null,uo=!1,lo=[],co=new Map,wt=null}function ps(){Pr()}var Or="http://www.w3.org/2000/svg",St=null,Ee=null,Ar=null;function ms(){let e=U();e&&(St=document.createElementNS(Or,"svg"),St.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),Ee=document.createElementNS(Or,"g"),Ee.setAttribute("class","annotation-root"),St.appendChild(Ee),e.appendChild(St),window.addEventListener("scroll",po,{passive:!0}),Ar=Dn(po),po())}function po(){if(!Ee)return;let{scale:e,offsetX:t,offsetY:n}=Fe();Ee.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function fs(e,t,n,o,r,i){if(!Ee)return null;let a=document.createElementNS(Or,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${I.sm};
    padding: 4px 8px;
    border-radius: ${k.sm};
    font-size: ${r}px;
    font-family: ${C};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,s.textContent=o,a.appendChild(s),Ee.appendChild(a),a}function gs(e){if(!Ee)return;let t=Ee.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function Hr(){Ee&&(Ee.innerHTML="")}function hs(){window.removeEventListener("scroll",po),Ar?.(),Ar=null,St?.remove(),St=null,Ee=null}var an={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9093 12.3603L17.0007 20.8537L14.1816 21.8798L11.0902 13.3864L6.91797 16.5422L8.4087 1.63318L19.134 12.0959L13.9093 12.3603Z"></path></svg>',grab:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L16.2426 6.24264L14.8284 7.65685L12 4.82843L9.17157 7.65685L7.75736 6.24264L12 2ZM2 12L6.24264 7.75736L7.65685 9.17157L4.82843 12L7.65685 14.8284L6.24264 16.2426L2 12ZM22 12L17.7574 16.2426L16.3431 14.8284L19.1716 12L16.3431 9.17157L17.7574 7.75736L22 12ZM12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14ZM12 22L7.75736 17.7574L9.17157 16.3431L12 19.1716L14.8284 16.3431L16.2426 17.7574L12 22Z"></path></svg>',move:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 11V8L22 12L18 16V13H13V18H16L12 22L8 18H11V13H6V16L2 12L6 8V11H11V6H8L12 2L16 6H13V11H18Z"></path></svg>',draw:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>',color:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.5222 2 22 5.97778 22 10.8889C22 13.9556 19.5111 16.4444 16.4444 16.4444H14.4778C13.5556 16.4444 12.8111 17.1889 12.8111 18.1111C12.8111 18.5333 12.9778 18.9222 13.2333 19.2111C13.5 19.5111 13.6667 19.9 13.6667 20.3333C13.6667 21.2556 12.9 22 12 22C6.47778 22 2 17.5222 2 12C2 6.47778 6.47778 2 12 2ZM10.8111 18.1111C10.8111 16.0843 12.451 14.4444 14.4778 14.4444H16.4444C18.4065 14.4444 20 12.851 20 10.8889C20 7.1392 16.4677 4 12 4C7.58235 4 4 7.58235 4 12C4 16.19 7.2226 19.6285 11.324 19.9718C10.9948 19.4168 10.8111 18.7761 10.8111 18.1111ZM7.5 12C6.67157 12 6 11.3284 6 10.5C6 9.67157 6.67157 9 7.5 9C8.32843 9 9 9.67157 9 10.5C9 11.3284 8.32843 12 7.5 12ZM16.5 12C15.6716 12 15 11.3284 15 10.5C15 9.67157 15.6716 9 16.5 9C17.3284 9 18 9.67157 18 10.5C18 11.3284 17.3284 12 16.5 12ZM12 9C11.1716 9 10.5 8.32843 10.5 7.5C10.5 6.67157 11.1716 6 12 6C12.8284 6 13.5 6.67157 13.5 7.5C13.5 8.32843 12.8284 9 12 9Z"></path></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6V21H11V6H5V4H19V6H13Z"></path></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.53614 18.8862 7.33243 17.1346 5.86492L15 8V2L21 2L18.5535 4.44656C20.6649 6.28002 22 8.9841 22 12Z"></path></svg>'},ys=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",rn=navigator.platform.includes("Mac")?"Cmd":"Ctrl",_r=[{type:"select",icon:an.pointer,label:"Select",shortcut:"V"},{type:"text",icon:an.text,label:"Text",shortcut:"T"}],Yc=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${k.lg};
    box-shadow: ${I.md};
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    gap: 4px;
    font-family: ${C};
    user-select: none;
    opacity: 0;
    animation: panelFadeIn ${M.settle} forwards;
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
    transition: background ${M.fast}, color ${M.fast};
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
    box-shadow: ${I.sm};
    color: ${l.textPrimary};
    padding: 4px 8px;
    border-radius: ${k.sm};
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity ${M.medium};
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
    transition: opacity ${M.medium};
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
    box-shadow: ${I.sm};
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
    font-family: ${C};
    cursor: pointer;
    padding: 0;
    transition: background ${M.fast}, color ${M.fast}, box-shadow ${M.fast};
  }
  .segment.active {
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    box-shadow: ${I.sm};
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
    transition: background ${M.fast}, color ${M.fast}, opacity ${M.fast};
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
    font-family: ${C};
    transition: background ${M.fast}, color ${M.fast};
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
    border-radius: ${k.lg};
    box-shadow: ${I.lg};
    padding: 24px 28px;
    min-width: 320px;
    max-width: 420px;
    font-family: ${C};
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
    font-family: ${C};
    color: ${l.textSecondary};
    box-shadow: 0 1px 0 rgba(0,0,0,0.06);
  }
  .shortcut-plus {
    font-size: 10px;
    color: ${l.textTertiary};
  }
`,ye=null,Te=null,fo=new Map,We=null,$r=null,Ir=null;function bs(e){$r=e}function vs(e){Ir=e}function xs(e){We&&(We.disabled=!e)}function Cs(){let e=U();if(!e)return;let t=document.createElement("style");t.textContent=Yc,e.appendChild(t),ye=document.createElement("div"),ye.className="tools-panel";let n=[["select","text"]];for(let s=0;s<n.length;s++){if(s>0){let d=document.createElement("div");d.className="tool-divider",ye.appendChild(d)}for(let d of n[s]){let c=_r.find(f=>f.type===d),u=document.createElement("button");u.className=`tool-btn${c.type==="select"?" active":""}`,u.innerHTML=`${c.icon}<span class="tooltip">${c.label}<span class="shortcut-badge">${ys}${c.shortcut}</span></span>`,u.addEventListener("click",()=>pr(c.type));let p=null;u.addEventListener("mouseenter",()=>{p=setTimeout(()=>u.classList.add("tooltip-visible"),400)}),u.addEventListener("mouseleave",()=>{p&&clearTimeout(p),u.classList.remove("tooltip-visible")}),ye.appendChild(u),fo.set(c.type,u)}}Te=document.createElement("div"),Te.className="sub-options hidden",ye.appendChild(Te);let o=document.createElement("div");o.className="tool-divider",ye.appendChild(o),We=document.createElement("button"),We.className="action-btn",We.innerHTML=an.undo,We.title="Undo (Ctrl+Z)",We.disabled=!0,We.addEventListener("click",()=>{Ir&&Ir()}),ye.appendChild(We);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=an.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{$r&&$r()}),ye.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=an.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{Da(),i.style.color=_a()?l.accent:""}),ye.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8H14V6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5C21 8.433 19.433 10 17.5 10H16V14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5V16H10V17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14H8V10H6.5C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5V8ZM8 8V6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM10 10V14H14V10H10Z"></path></svg>',a.title=`Keyboard Shortcuts (${ys}/)`,a.addEventListener("click",()=>Ts()),ye.appendChild(a),e.appendChild(ye),document.addEventListener("keydown",Es,!0)}function Es(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||Xn()||!e.ctrlKey&&!e.metaKey)return;let n=e.key.toUpperCase();if(e.key==="/"||e.key==="?"){Ts(),e.preventDefault();return}let o=_r.find(r=>r.shortcut===n);o&&(pr(o.type),e.preventDefault())}var Oe=null,sn=null;function Ts(){Oe?mo():jc()}function jc(){let e=U();if(!e||Oe)return;Oe=document.createElement("div"),Oe.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:_r.map(r=>({action:r.label,keys:[rn,r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[rn,"Z"]},{action:"Toggle Originals",keys:[rn,"."]},{action:"Keyboard Shortcuts",keys:[rn,"/"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Space","Drag"]},{action:"Zoom",keys:[rn,"Scroll"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let s of r.items){let d=document.createElement("div");d.className="shortcut-row";let c=document.createElement("span");c.className="shortcut-action",c.textContent=s.action,d.appendChild(c);let u=document.createElement("span");u.className="shortcut-keys";for(let p=0;p<s.keys.length;p++){if(p>0){let m=document.createElement("span");m.className="shortcut-plus",m.textContent="+",u.appendChild(m)}let f=document.createElement("span");f.className="shortcut-key",f.textContent=s.keys[p],u.appendChild(f)}d.appendChild(u),i.appendChild(d)}t.appendChild(i)}Oe.appendChild(t),Oe.addEventListener("click",r=>{r.target===Oe&&mo()}),e.appendChild(Oe),sn=r=>{mo()},document.addEventListener("keydown",sn,!0)}function mo(){sn&&(document.removeEventListener("keydown",sn,!0),sn=null),Oe?.remove(),Oe=null}function ws(e){for(let[t,n]of fo)n.classList.toggle("active",t===e);Uc(e)}function Uc(e){if(Te&&(Te.innerHTML="",Te.classList.add("hidden"),Te.classList.remove("visible"),e==="text")){Te.classList.remove("hidden"),requestAnimationFrame(()=>Te?.classList.add("visible"));let t=Yt(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();Ln({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){mr("textColor",i),n.style.background=i},onClose(){}})}),Te.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{mr("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}Te.appendChild(o)}}function Ss(e){let t=fo.get(e);t&&(t.style.backgroundColor=l.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function Ms(){document.removeEventListener("keydown",Es,!0),mo(),ye?.remove(),ye=null,Te=null,fo.clear()}async function Ls(e,t){let n=Zn(e,t);if(!n)return null;let o=ne(n);if(!o)return null;try{let i=await Ne(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let s=a.functionName;if(s[0]!==s[0].toUpperCase()||Ie(s))continue;let d="";if(a.fileName){let c=we(a.fileName);ke(c)&&(d=c)}return{componentName:s,filePath:d,lineNumber:a.lineNumber??0}}}catch{}let r=o;for(;r;){if(me(r)){let i=ie(r.type);if(i&&i[0]===i[0].toUpperCase()&&!Ie(i)){let a=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:a?.fileName||"",lineNumber:a?.lineNumber||0}}}r=r.return}return null}var re=null,at=null,go=null,ks={onMouseDown(e){re&&Ns();let t=jt(e.clientX,e.clientY);at={pageX:t.x,pageY:t.y},Ls(e.clientX,e.clientY).then(n=>{go=n}),re=document.createElement("input"),re.type="text",re.placeholder="Type annotation...",re.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${l.bgPrimary};
      color: ${l.textPrimary};
      border: 1.5px solid ${l.accent};
      border-radius: ${k.sm};
      padding: 4px 8px;
      font-size: ${Yt().fontSize}px;
      font-family: ${C};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${l.accentSoft};
    `,re.setAttribute("data-frameup-overlay","true"),re.addEventListener("keydown",n=>{n.key==="Enter"&&(Ns(),n.preventDefault()),n.key==="Escape"&&(Rs(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(re),re.focus()},onMouseMove(){},onMouseUp(){}};function Ns(){if(!re||!at)return;let e=re.value.trim();if(re.remove(),re=null,!e)return;let t=Yt(),n=crypto.randomUUID();fs(n,at.pageX,at.pageY,e,t.fontSize,t.textColor),da({type:"text",id:n,position:at,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:go}),at=null,go=null}function Rs(){re&&(re.remove(),re=null),at=null,go=null}function Ps(){Rs()}var st=null,ln=null;function Os(e){let t=e instanceof Error&&e.stack?e.stack:String(e);return/frameup|overlay/i.test(t)}function Xc(e){let t=U();if(!t)return;st&&st.parentNode&&st.parentNode.removeChild(st),ln&&clearTimeout(ln);let n=document.createElement("div");n.setAttribute("style",["position: fixed","bottom: 72px","right: 16px","z-index: 2147483647","background: rgba(30, 30, 30, 0.92)","color: #fff",`font-family: ${C}`,"font-size: 12px","padding: 10px 14px",`border-radius: ${k.sm}`,`box-shadow: ${I.md}`,"max-width: 320px","display: flex","align-items: center","gap: 10px","opacity: 0",`transition: opacity ${M.medium}`].join("; "));let o=document.createElement("span");o.textContent=e,o.setAttribute("style","flex: 1;");let r=document.createElement("button");r.textContent="Dismiss",r.setAttribute("style",["background: rgba(255,255,255,0.15)","border: none","color: #fff",`font-family: ${C}`,"font-size: 11px","padding: 3px 8px",`border-radius: ${k.xs}`,"cursor: pointer","white-space: nowrap"].join("; ")),r.addEventListener("click",()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),ln&&clearTimeout(ln),st=null}),n.appendChild(o),n.appendChild(r),t.appendChild(n),st=n,requestAnimationFrame(()=>{n.style.opacity="1"}),ln=setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),st=null},8e3)}function Dr(e){console.error("[FrameUp]",e),Xc("FrameUp encountered an error. Your app is unaffected.")}function Kc(){window.addEventListener("error",e=>{Os(e.error??e.message)&&(Dr(e.error??e.message),e.preventDefault())}),window.addEventListener("unhandledrejection",e=>{Os(e.reason)&&(Dr(e.reason),e.preventDefault())})}var Fr=null;function As(e,t,n){t.originalCssText=n.style.cssText,t.element=n,et(t)}function Zc(){let e=window.__FRAMEUP_WS_PORT__;if(!e){console.warn("[FrameUp] No WebSocket port found.");return}if(document.getElementById("frameup-root"))return;pn(e),ti(qc);let t=U();t&&wa(t),ss(),$i(),us(),ms(),pa(r=>gs(r)),Fr=new MutationObserver(()=>{for(let[r,i]of sa())document.contains(i.element)||setTimeout(()=>{let a=Rn(i.identity);if(a){As(r,i,a);return}oa(i.identity).then(s=>{s?As(r,i,s):(fr(r),j(`Component ${i.componentRef.componentName} removed \u2014 move cleared`))})},80)}),Fr.observe(document.body,{childList:!0,subtree:!0}),Cs(),Fa(),Ka(),xa(),Xa("text",ks),ia((r,i)=>{Ut(),Ss(r),i==="text"&&Ps(),xt(),qo(),cs(r==="select"),Kn(r),ws(r)}),aa(()=>{hn(Vn()),xs(ya())}),vs(()=>{let r=hr();r&&j(`Undo: ${r}`)}),oi(()=>{if(!Vn()){j("No moved components to toggle");return}let r=!ma();fa(r),gn(r)});let n=!1,o=0;ri(()=>{if(n){j("Generation in progress");return}let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);j(`Please wait ${a}s before retrying`);return}let i=ba();if(!i.moves.length&&!i.annotations.length&&!i.colorChanges.length&&!i.textEdits.length){j("Nothing to confirm \u2014 make some visual changes first");return}n=!0,hn(!1),j("Generating..."),be({type:"generate",annotations:i})}),Ae(r=>{if(r.type==="generateProgress"&&j(r.message),r.type==="generateComplete")if(n=!1,hn(Vn()),r.success){let i=r.changes.map(a=>a.description||a.filePath).join(", ");j(`Applied: ${i}`),it(),Hr(),Fn(),gn(!0)}else j(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),ii(()=>{let r=hr();return r?(j(`Undo: ${r}`),!0):!1}),bs(()=>{it(),Hr(),Fn(),Ia(),gn(!0),j("Canvas cleared")}),console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools")}function qc(){xt(),qo(),ls(),Fi(),ps(),hs(),Fr?.disconnect(),Ms(),Va(),Qa(),Fn(),wr(),Yr(),ni()}function Hs(){try{Zc(),Kc()}catch(e){Dr(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Hs):Hs();})();
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
