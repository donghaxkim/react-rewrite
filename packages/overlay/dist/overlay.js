"use strict";var FrameUp=(()=>{var _s=Object.defineProperty;var ge=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ds=(e,t)=>{for(var n in t)_s(e,n,{get:t[n],enumerable:!0})};function ri(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='5 9 2 12 5 15'/><polyline points='9 5 12 2 15 5'/><polyline points='15 19 12 22 9 19'/><polyline points='19 9 22 12 19 15'/><line x1='2' y1='12' x2='22' y2='12'/><line x1='12' y1='2' x2='12' y2='22'/></svg>`)}") 12 12, move`}function So(e){if(Cn&&Cn.size===e)return Cn.uri;let t=Math.max(e,2),n=t*2+4,o=n/2,r=`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${n}' height='${n}'><circle cx='${o}' cy='${o}' r='${t}' fill='none' stroke='${l.accent}' stroke-width='1.5'/></svg>`)}") ${o} ${o}, crosshair`;return Cn={size:e,uri:r},r}var l,R,k,M,w,oi,Cn,U=ge(()=>{"use strict";l={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},R={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},k={xs:"4px",sm:"6px",md:"10px",lg:"14px"},M={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},w="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",oi=`
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
`;Cn=null});var Lo,Bt,gi,Us,Ft,yi,Mn,bi,hi,zt,Sn,Fe,Ro,Vt,Po,ut,Oo,kn,Wt=ge(()=>{"use strict";Lo="0.5.32",Bt=`bippy-${Lo}`,gi=Object.defineProperty,Us=Object.prototype.hasOwnProperty,Ft=()=>{},yi=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},Mn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),bi=!1,zt=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>bi?!0:(e&&typeof e.inject=="function"&&(hi=e.inject.toString()),!!hi?.includes("(injected)")),Sn=new Set,Fe=new Set,Ro=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:Bt,checkDCE:yi,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),Fe.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,Sn.forEach(a=>a())),i},on:Ft,onCommitFiberRoot:Ft,onCommitFiberUnmount:Ft,onPostCommitFiberRoot:Ft,renderers:t,supportsFiber:!0,supportsFlight:!0};try{gi(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let s=o.renderers;o=a,s.size>0&&(s.forEach((c,u)=>{Fe.add(c),a.renderers.set(u,c)}),Vt(e))}}});let r=window.hasOwnProperty,i=!1;gi(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{Vt(e)}return o},Vt=e=>{e&&Sn.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=yi,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=Bt,t._instrumentationIsActive=!1;let n=Mn(t);if(n||(t.on=Ft),t.renderers.size){t._instrumentationIsActive=!0,Sn.forEach(i=>i());return}let o=t.inject,r=zt(t);r&&!n&&(bi=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return Fe.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,Sn.forEach(s=>s()),a}}(t.renderers.size||t._instrumentationIsActive||zt())&&e?.()}catch{}},Po=()=>Us.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),ut=e=>Po()?(Vt(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Ro(e),Oo=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),kn=()=>{try{Oo()&&ut()}catch{}}});var vi=ge(()=>{"use strict";Wt();kn()});function Yo(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await Go(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=Uo(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var Ao,$o,Ho,_o,Do,Io,Fo,zo,Vo,Bo,Wo,jo,Ce,Uo,Go,Xo,ue,Ko,qo,ae,Gs,Zo=ge(()=>{"use strict";Wt();Ao=0,$o=1,Ho=5,_o=11,Do=13,Io=15,Fo=16,zo=19,Vo=26,Bo=27,Wo=28,jo=30,Ce=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};Uo=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=Uo(o,t,n);if(r)return r;o=n?null:o.sibling}return null},Go=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await Go(o,t,n);if(r)return r;o=n?null:o.sibling}return null},Xo=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?Xo(t.type||t.render):null},ue=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=Xo(t);return o&&(o.displayName||o.name)||null},Ko=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||Mn(e)||zt(e)},qo=e=>{let t=ut(e.onActive);t._instrumentationSource=e.name??Bt;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,s,c)=>{n!==i&&(n?.(a,s,c),e.onCommitFiberRoot?.(a,s,c))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,s)=>{t.onCommitFiberUnmount===i&&(o?.(a,s),e.onCommitFiberUnmount?.(a,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,s)=>{t.onPostCommitFiberRoot===i&&(r?.(a,s),e.onPostCommitFiberRoot?.(a,s))};t.onPostCommitFiberRoot=i}return t},ae=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},Gs=Error()});var pt=ge(()=>{"use strict";Wt();vi();Zo();});function jt(e,t){let n=0,o=0,r=0;do r=$i[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function Ei(e,t){return e.pos>=t?!1:e.peek()!==el}function Hi(e){let{length:t}=e,n=new nl(e),o=[],r=0,i=0,a=0,s=0,c=0;do{let u=n.indexOf(";"),d=[],p=!0,m=0;for(r=0;n.pos<u;){let f;r=jt(n,r),r<m&&(p=!1),m=r,Ei(n,u)?(i=jt(n,i),a=jt(n,a),s=jt(n,s),Ei(n,u)?(c=jt(n,c),f=[r,i,a,s,c]):f=[r,i,a,s]):f=[r],d.push(f),n.pos++}p||ol(d),o.push(d),n.pos=u+1}while(n.pos<=t);return o}function ol(e){e.sort(rl)}function rl(e,t){return e[0]-t[0]}var xi,Xs,Ks,Li,qs,Zs,Ri,Js,Pi,Qs,Oi,Ai,er,Ci,wi,el,Ti,tl,$i,nl,_i,il,al,Di,Yt,Nn,sl,Si,ll,cl,dl,ul,Mi,pl,ml,fl,gl,hl,ki,Re,yl,Jo,Qo,bl,vl,xl,Cl,wl,Tl,El,Sl,ze,Ni,Ml,kl,Pe,Ve,Ut=ge(()=>{"use strict";Wt();Zo();xi=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Xs=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],Ks=["<anonymous>","eval",""],Li=/\.(jsx|tsx|ts|js)$/,qs=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Zs=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,Ri="(at Server)",Js=/(^|@)\S+:\d+/,Pi=/^\s*at .*(\S+:\d+|\(native\))/m,Qs=/^(eval@)?(\[native code\])?$/,Oi=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=Ci(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(Js)){let i=wi(r,void 0)[0];i&&o.push(i)}return er(o,t)}return e.match(Pi)?Ci(e,t):wi(e,t)},Ai=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},er=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e,Ci=(e,t)=>er(e.split(`
`).filter(n=>!!n.match(Pi)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=Ai(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}}),wi=(e,t)=>er(e.split(`
`).filter(n=>!n.match(Qs)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,s=Ai(o.replace(r,""));return{functionName:a,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:o}}}),el=44,Ti="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",tl=new Uint8Array(64),$i=new Uint8Array(128);for(let e=0;e<Ti.length;e++){let t=Ti.charCodeAt(e);tl[e]=t,$i[t]=e}nl=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};_i=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,il=/^data:application\/json[^,]+base64,/,al=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,Di=typeof WeakRef<"u",Yt=new Map,Nn=new Map,sl=e=>Di&&e instanceof WeakRef,Si=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let d of r)if(d[0]<=o)i=d;else break;if(!i||i.length<4)return null;let[,a,s,c]=i;if(a===void 0||s===void 0||c===void 0)return null;let u=t[a];return u?{columnNumber:c,fileName:u,lineNumber:s+1}:null},ll=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return Si(o.map.mappings,o.map.sources,r,i)}return Si(e.mappings,e.sources,t-1,n)},cl=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(al);a&&(o=a[1]||a[2])}if(!o)return null;let r=_i.test(o);if(!(il.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},dl=e=>({file:e.file,mappings:Hi(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),ul=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:Hi(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},Mi=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(_i);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},pl=async(e,t=fetch)=>{if(!Mi(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=cl(e,n);if(!o||!Mi(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?ul(i):dl(i)}catch{return null}},ml=async(e,t=!0,n)=>{if(t&&Yt.has(e)){let i=Yt.get(e);if(i==null)return null;if(sl(i)){let a=i.deref();if(a)return a;Yt.delete(e)}else return i}if(t&&Nn.has(e))return Nn.get(e);let o=pl(e,n);t&&Nn.set(e,o);let r=await o;return t&&Nn.delete(e),t&&(r===null?Yt.set(e,null):Yt.set(e,Di?new WeakRef(r):r)),r},fl=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await ml(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=ll(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),gl=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",hl=()=>{let e=ut();for(let t of[...Array.from(Fe),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},ki=e=>{for(let t of Fe){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},Re=e=>`
    in ${e}`,yl=(e,t)=>{let n=Re(e);return t&&(n+=` (at ${t})`),n},Jo=!1,Qo=(e,t)=>{if(!e||Jo)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,Jo=!0;let o=hl();ki(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let d;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(m){d=m}Reflect.construct(e,[],p)}else{try{p.call()}catch(m){d=m}e.call(p.prototype)}}else{try{throw Error()}catch(m){d=m}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&d instanceof Error&&typeof p.stack=="string")return[p.stack,d.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,u]=s.DetermineComponentFrameRoot();if(c&&u){let d=c.split(`
`),p=u.split(`
`),m=0,f=0;for(;m<d.length&&!d[m].includes("DetermineComponentFrameRoot");)m++;for(;f<p.length&&!p[f].includes("DetermineComponentFrameRoot");)f++;if(m===d.length||f===p.length)for(m=d.length-1,f=p.length-1;m>=1&&f>=0&&d[m]!==p[f];)f--;for(;m>=1&&f>=0;m--,f--)if(d[m]!==p[f]){if(m!==1||f!==1)do if(m--,f--,f<0||d[m]!==p[f]){let g=`
${d[m].replace(" at new "," at ")}`,b=ue(e);return b&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",b)),g}while(m>=1&&f>=0);break}}}finally{Jo=!1,Error.prepareStackTrace=n,ki(o),console.error=r,console.warn=i}let a=e?ue(e):"";return a?Re(a):""},bl=(e,t)=>{let n=e.tag,o="";switch(n){case Wo:o=Re("Activity");break;case $o:o=Qo(e.type,!0);break;case _o:o=Qo(e.type.render,!1);break;case Ao:case Io:o=Qo(e.type,!1);break;case Ho:case Vo:case Bo:o=Re(e.type);break;case Fo:o=Re("Lazy");break;case Do:o=e.child!==t&&t!==null?Re("Suspense Fallback"):Re("Suspense");break;case zo:o=Re("SuspenseList");break;case jo:o=Re("ViewTransition");break;default:return""}return o},vl=e=>{try{let t="",n=e,o=null;do{t+=bl(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=yl(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},xl=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},Cl=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),wl=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,Tl=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!Cl(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>wl(a,o))||(i.push(o),t.set(r,i))}return t},El=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(Ri,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},Sl=e=>{let t=[];return Yo(e,n=>{if(!gl(n))return;let o=typeof n.type=="string"?n.type:ue(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:Oi(xl(n._debugStack?.stack))})},!0),t},ze=async(e,t=!0,n)=>{let o=Sl(e),r=Oi(vl(e)),i=Tl(o),a=new Map;return fl(r.map(s=>s.source?.includes(Ri)??!1?El(s,i,a):s).filter((s,c,u)=>{if(c===0)return!0;let d=u[c-1];return s.functionName!==d.functionName}),t,n)},Ni=e=>e.split("/").filter(Boolean).length,Ml=e=>e.split("/").filter(Boolean)[0]??null,kl=e=>{let t=e.indexOf("/",1);if(t===-1||Ni(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!Li.test(n)||Ni(n)<2)return e;let o=Ml(n);return!o||o.startsWith("@")||o.length>4?e:n},Pe=e=>{if(!e||Ks.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=kl(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),s=i.indexOf(":");t=a!==-1&&(s===-1||a<s)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of Xs)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if(xi.test(t)){let i=t.match(xi);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Zs.test(i)&&(t=t.slice(0,r))}return t},Ve=e=>{let t=Pe(e);return!(!t||!Li.test(t)||qs.test(t))}});function mt(e){return!!(Nl.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function tr(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}function nr(){Gt=new WeakMap}function Ol(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function Al(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=Rl}function $l(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<Ln||o.height/window.innerHeight<Ln)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>Pl}function Xt(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&tr(e)||e.closest("#frameup-root")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-placeholder"))return!1;let n=performance.now(),o=Gt.get(e);if(o&&n-o.timestamp<Ll)return o.isValid;let r=window.getComputedStyle(e);return Ol(e,r)?e.clientWidth/window.innerWidth>=Ln&&e.clientHeight/window.innerHeight>=Ln&&(Al(r)||$l(e,r))?(Gt.set(e,{isValid:!1,timestamp:n}),!1):(Gt.set(e,{isValid:!0,timestamp:n}),!0):(Gt.set(e,{isValid:!1,timestamp:n}),!1)}var Nl,Ll,Ln,Rl,Pl,Gt,ft=ge(()=>{"use strict";Nl=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);Ll=50,Ln=.9,Rl=2147483600,Pl=1e3,Gt=new WeakMap});function uc(e,t,n){let o=n&&n!=="none"?` ${n}`:"";return`translate(${e}px, ${t}px)${o}`}function Qe(e){e.element.style.transform=uc(e.delta.dx,e.delta.dy,e.existingTransform)}function da(e){e.existingTransform&&e.existingTransform!=="none"?e.element.style.transform=e.existingTransform:e.element.style.transform=""}function Qt(e,t,n,o){e.style.transform=`translate(${t}px, ${n}px) scale(1.02)${o&&o!=="none"?` ${o}`:""}`,e.style.boxShadow=R.lg,e.style.transition="none",e.style.zIndex="2147483644"}function ua(e){Qe(e),e.element.style.boxShadow="",e.element.style.transition="",e.element.style.zIndex=""}function pa(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ae(n);for(;o;){if(Ce(o)){let r=o._debugSource,i=ue(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function ma(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ae(n);if(!o)continue;let r=await ze(o);if(!r||r.length===0)continue;for(let i of r)if(!(!i.functionName||i.functionName!==e.componentName)&&i.fileName){let a=Pe(i.fileName);if(Ve(a)&&a.endsWith(e.filePath))return n}}catch{}return null}var In=ge(()=>{"use strict";pt();Ut();U()});function ha(e){return Fn.push(e),()=>{Fn=Fn.filter(t=>t!==e)}}function ya(e){return zn.push(e),()=>{zn=zn.filter(t=>t!==e)}}function xt(){zn.forEach(e=>e())}function ba(){return mr}function gr(e){let t=mr;t!==e&&(mr=e,Fn.forEach(n=>n(e,t)))}function be(){return{...ga}}function nn(e,t){ga[e]=t}function va(){return ye}function xa(e){ye.set(e.id,e),jn({type:"moveCreate",moveId:e.id})}function Ca(e,t,n){let o=ye.get(e);o&&(o.delta=t,Qe(o),jn({type:"moveDelta",moveId:e,previousDelta:n}))}function hr(e){let t=ye.get(e);t&&(t.element.style.cssText=t.originalCssText,t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),ye.delete(e),xt())}function Wn(e){if(We.push(e),e.type==="colorChange"){let t=e;et.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else et.push({type:"annotationAdd",annotationId:e.id});xt()}function Ta(e){wa=e}function fa(e){We=We.filter(t=>t.id!==e),wa?.(e),xt()}function Ea(){return fr}function Sa(e){fr=e;for(let t of ye.values())e?Qe(t):da(t);xt()}function yr(e){for(let t of ye.values())if(t.element===e)return t}function br(){let e=et.pop();if(!e)return null;switch(e.type){case"moveCreate":return hr(e.moveId),"move removed";case"moveDelta":{let t=ye.get(e.moveId);return t&&(t.delta=e.previousDelta,Qe(t)),"move reverted"}case"annotationAdd":return fa(e.annotationId),"annotation removed";case"colorChange":{let t=We.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),fa(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}}return null}function jn(e){et.push(e),xt()}function tt(){return{scale:tn,offsetX:Vn,offsetY:Bn}}function Yn(e,t,n){tn=e,Vn=t,Bn=n,en.forEach(o=>o())}function Un(e){return en.push(e),()=>{en=en.filter(t=>t!==e)}}function je(e,t){return{x:(e-Vn)/tn,y:(t-Bn)/tn}}function Gn(){for(let e of ye.values())e.element.style.cssText=e.originalCssText,e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder);for(let e of We)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of et)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}ye=new Map,We=[],et=[],fr=!0,tn=1,Vn=0,Bn=0,en.forEach(e=>e()),xt()}function vr(){return ye.size>0||We.length>0}function Ma(){return et.length>0}function ka(){let e=Array.from(ye.values()).map(o=>({component:o.componentRef.componentName,file:o.componentRef.filePath,line:o.componentRef.lineNumber,originalRect:{top:o.originalRect.top,left:o.originalRect.left,width:o.originalRect.width,height:o.originalRect.height},delta:{dx:o.delta.dx,dy:o.delta.dy}})),t=[],n=[];for(let o of We)o.type==="draw"?t.push({type:"draw",startComponent:o.targetComponent?.componentName,startFile:o.targetComponent?.filePath,startLine:o.targetComponent?.lineNumber,points:o.points,color:o.color,strokeWidth:o.strokeWidth}):o.type==="text"?t.push({type:"text",content:o.content,position:o.position,targetComponent:o.targetComponent?.componentName,targetFile:o.targetComponent?.filePath,targetLine:o.targetComponent?.lineNumber}):o.type==="colorChange"&&n.push({component:o.component.componentName,file:o.component.filePath,line:o.component.lineNumber,property:o.property,from:o.fromColor,to:o.toColor});return{moves:e,annotations:t,colorChanges:n}}var ye,We,et,mr,fr,ga,tn,Vn,Bn,en,Fn,zn,wa,Se=ge(()=>{"use strict";In();ye=new Map,We=[],et=[],mr="pointer",fr=!0,ga={brushSize:4,brushColor:"#ef4444",fontSize:16,textColor:"#ffffff"},tn=1,Vn=0,Bn=0,en=[],Fn=[],zn=[];wa=null});function Dc(){Rr=document.body.style.background||document.body.style.backgroundColor||"",Pr=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",q=document.createElement("div"),q.setAttribute("data-frameup-canvas-wrapper","true"),q.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${n};
  `.trim().replace(/\n\s*/g," "),Te=document.createElement("div"),Te.setAttribute("data-frameup-dot-bg","true"),Te.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${l.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="frameup-root"||r.hasAttribute("data-frameup-interaction")||r.hasAttribute("data-frameup-placeholder")||r.hasAttribute("data-frameup-annotation")||r.hasAttribute("data-frameup-dot-bg")||r.hasAttribute("data-frameup-canvas-wrapper"))||(es.push(r),q.appendChild(r));q.style.position="relative",q.style.zIndex="1",document.body.insertBefore(Te,document.body.firstChild),document.body.insertBefore(q,Te.nextSibling),Lr=Un(Qa),Qa(),ts.forEach(r=>r(q))}function Qa(){if(!q||!Te)return;let{scale:e,offsetX:t,offsetY:n}=tt();q.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=Hc*e,r=t%o,i=n%o;Te.style.backgroundImage=`radial-gradient(circle, ${_c} ${Ja}px, transparent ${Ja}px)`,Te.style.backgroundSize=`${o}px ${o}px`,Te.style.backgroundPosition=`${r}px ${i}px`}function Ic(e,t,n){let{scale:o,offsetX:r,offsetY:i}=tt(),a=Math.min(Ac,Math.max(Oc,o+n));if(a===o)return;let s=(e-r)/o,c=(t-i)/o,u=e-s*a,d=t-c*a;Yn(a,u,d)}function ns(e){e.preventDefault();let t=-e.deltaY*$c,{scale:n}=tt(),o=t*n;Ic(e.clientX,e.clientY,o)}function os(e,t){let{scale:n,offsetX:o,offsetY:r}=tt();Yn(n,o+e,r+t)}function rs(){Yn(1,0,0)}function is(){return q!==null}function as(){q?Or():Dc()}function Or(){if(ts.forEach(e=>e(null)),Lr?.(),Lr=null,q){for(;q.firstChild;)document.body.insertBefore(q.firstChild,q);q.remove(),q=null}Te?.remove(),Te=null,es=[],document.body.style.background=Rr,document.documentElement.style.background=Pr,Rr="",Pr=""}var Oc,Ac,$c,Hc,Ja,_c,q,Te,Lr,es,ts,Rr,Pr,dn=ge(()=>{"use strict";Se();U();Oc=.1,Ac=5,$c=.002,Hc=24,Ja=1,_c="rgba(0,0,0,0.15)",q=null,Te=null,Lr=null,es=[],ts=[],Rr="",Pr=""});function ss(e,t){if(!rt)return;let n=performance.now(),o=Math.abs(e-rt.clientX),r=Math.abs(t-rt.clientY),i=o<=2&&r<=2,a=n-rt.timestamp<16;if(i||a)return rt.element}function ls(e,t,n){rt={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function Lt(){rt=null}var rt,Ar=ge(()=>{"use strict";rt=null});var ds={};Ds(ds,{activateInteraction:()=>_r,destroyInteraction:()=>Dr,getPageElementAtPoint:()=>pn,initInteraction:()=>Hr,refreshDrawCursor:()=>zc,registerToolHandler:()=>Rt,setInteractionCursor:()=>co,setInteractionPointerEvents:()=>Vc});function Rt(e,t){$r.set(e,t)}function Hr(){H=document.createElement("div"),H.setAttribute("data-frameup-interaction","true"),H.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(H),document.addEventListener("scroll",Lt,!0),H.addEventListener("mousedown",e=>{un?.onMouseDown?.(e)}),H.addEventListener("mousemove",e=>{un?.onMouseMove?.(e)}),H.addEventListener("mouseup",e=>{un?.onMouseUp?.(e)}),document.addEventListener("wheel",cs,{passive:!1})}function cs(e){!H||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#frameup-root")||ns(e)}function _r(e){un=$r.get(e)||null,H&&(H.style.pointerEvents=e==="pointer"?"none":"auto"),Fc(e)}function Fc(e){if(H)switch(e){case"pointer":H.style.cursor="default";break;case"grab":H.style.cursor="grab";break;case"move":H.style.cursor=ri();break;case"draw":H.style.cursor=So(be().brushSize);break;case"text":H.style.cursor="text";break;default:H.style.cursor="default"}}function zc(){ba()==="draw"&&H&&(H.style.cursor=So(be().brushSize))}function co(e){H&&(H.style.cursor=e)}function Vc(e){H&&(H.style.pointerEvents=e?"auto":"none")}function pn(e,t){let n=ss(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#frameup-root")&&!i.hasAttribute("data-frameup-interaction")&&!i.hasAttribute("data-frameup-placeholder")&&!(i===document.body||i===document.documentElement)&&!tr(i)){r=i;break}return ls(e,t,r),r}function Dr(){document.removeEventListener("scroll",Lt,!0),document.removeEventListener("wheel",cs),H?.remove(),H=null,un=null,$r.clear()}var H,un,$r,Pt=ge(()=>{"use strict";Se();U();Ar();ft();dn();H=null,un=null,$r=new Map});function Is(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),s=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+s).toString(16).slice(1)}`}return e}function Fs(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(C=>{try{return Array.from(C.cssRules)}catch{return[]}}).filter(C=>C instanceof CSSStyleRule&&C.selectorText===":root").flatMap(C=>Array.from(C.style)).filter(C=>C.startsWith("--")),n={},o={},r={},i={},a={},s={},c={},u={},d={},p={},m={},f={},g={},b={},x={},L={},A={},O={},I=(C,$,oe,re)=>{C[oe]=re,$[re]=oe};for(let C of t){let $=e.getPropertyValue(C).trim();if(!$)continue;let oe=C.match(/^--spacing-(.+)$/);if(oe){I(n,p,oe[1],$);continue}let re=C.match(/^--color-(.+)$/);if(re){let yn=re[1];o[yn]=$,m[Is($)]=yn;continue}let N=C.match(/^--font-size-(.+)$/);if(N){I(r,f,N[1],$);continue}let B=C.match(/^--font-weight-(.+)$/);if(B){I(i,g,B[1],$);continue}let y=C.match(/^--radius-(.+)$/);if(y){I(a,b,y[1],$);continue}let S=C.match(/^--border-(.+)$/);if(S){I(s,x,S[1],$);continue}let Y=C.match(/^--opacity-(.+)$/);if(Y){I(c,L,Y[1],$);continue}let ce=C.match(/^--tracking-(.+)$/);if(ce){I(u,A,ce[1],$);continue}let De=C.match(/^--leading-(.+)$/);if(De){I(d,O,De[1],$);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:s,opacity:c,letterSpacing:u,lineHeight:d,spacingReverse:p,colorsReverse:m,fontSizeReverse:f,fontWeightReverse:g,borderRadiusReverse:b,borderWidthReverse:x,opacityReverse:L,letterSpacingReverse:A,lineHeightReverse:O}}var zs=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function Vs(e,t){let n={};for(let o of zs){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function vn(e,t){return t.get(e)??null}function Xr(e,t,n){let r=(n??Ht())[e],i=[];for(let[s,c]of r.entries()){let u=parseFloat(c);isNaN(u)||i.push({numericValue:u,token:s,cssValue:c})}let a=parseFloat(t);return isNaN(a)||i.some(c=>c.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((s,c)=>s.numericValue-c.numericValue),i}var Kr=null,$t=null;function qr(e){Kr=e,$t=null}function Ht(){if($t!==null)return $t;let e=Fs();return $t=Vs(e,Kr??{}),$t}var ie=null,_t=[],lt=0,Bs=5,vo=null,xo=null,Co=null,wo=null,To=null,Eo=null;function Zr(e){Eo=e}function xn(e){ie&&ie.readyState===WebSocket.OPEN||(To=e,ie=new WebSocket(`ws://localhost:${e}`),ie.onopen=()=>{let t=lt>0;lt=0,t&&wo&&wo()},ie.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&qr(n.tokens),n.type==="updatePropertyComplete"&&Eo&&Eo(n.success,n.errorCode,n.error),_t.forEach(o=>o(n))}catch{}},ie.onclose=t=>{if(ie=null,t.code===4001){Co&&Co();return}if(lt<Bs){let n=500*Math.pow(2,lt);lt++,vo=setTimeout(()=>xn(e),n)}else xo&&xo()},ie.onerror=()=>{})}function Ee(e){ie&&ie.readyState===WebSocket.OPEN&&ie.send(JSON.stringify(e))}function Ke(e){return _t.push(e),()=>{_t=_t.filter(t=>t!==e)}}function Jr(){vo&&clearTimeout(vo),ie&&(ie.close(),ie=null),_t=[]}function Qr(e){xo=e}function ei(e){Co=e}function ti(e){wo=e}function ni(){To&&(lt=0,xn(To))}U();var dt=null,X=null,Dt=0,wn=null,Tn=null,qe=null,Mo=null,ct=null,It=null,No=null,si=null,Ws='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',li='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',ko='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',js='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',ii='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',Ys=`
  :host {
    all: initial;
  }
  ${oi}
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
    font-family: ${w};
    font-size: 12px;
    color: ${l.textPrimary};
    box-shadow: ${R.md};
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
    font-family: ${w};
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
    font-family: ${w};
    box-shadow: ${R.md};
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
`;function ci(e){let t=document.createElement("div");t.id="frameup-root",document.body.appendChild(t),dt=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=Ys;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn eye-btn" title="Toggle originals (.)">
      ${li}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${ko}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Confirm</button>
    <button class="icon-btn close-btn" title="Close FrameUp">
      ${js}
    </button>
  `,dt.appendChild(n),dt.appendChild(o),X=o.querySelector(".undo-btn");let r=o.querySelector(".close-btn");wn=o.querySelector(".generate-btn"),Tn=o.querySelector(".eye-btn"),ct=o.querySelector(".component-detail"),qe=document.createElement("div"),qe.className="toast",dt.appendChild(qe),X.addEventListener("click",()=>{Ee({type:"undo"}),X&&(X.innerHTML='<div class="spinner"></div>',X.disabled=!0)}),r.addEventListener("click",e),Tn.addEventListener("click",()=>{It&&It()}),wn.addEventListener("click",()=>{No&&No()}),document.addEventListener("keydown",i=>{i.key==="."&&(i.ctrlKey||i.metaKey)&&!ai()&&(It&&It(),i.preventDefault()),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!ai()&&si?.()&&i.preventDefault()}),Qr(()=>{K("Disconnected. Click to reconnect."),ni()}),ei(()=>{K("Disconnected: another tab took over")}),ti(()=>{Dt=0,X&&(X.disabled=!0)}),Ke(i=>{switch(i.type){case"reorderComplete":i.success?(Dt++,X&&(X.innerHTML=ii,setTimeout(()=>{X&&(X.innerHTML=ko,X.disabled=!1)},200))):i.error&&K(i.error);break;case"undoComplete":i.success?(Dt=Math.max(0,Dt-1),X&&(X.innerHTML=ii,setTimeout(()=>{X&&(X.innerHTML=ko,X.disabled=Dt===0)},200))):i.error&&K(i.error);break;case"devServerDisconnected":K("Dev server disconnected");break;case"devServerReconnected":K("Dev server reconnected");break}})}function di(){let e=document.getElementById("frameup-root");e&&e.remove(),dt=null,X=null}function G(){return dt}function ui(e){It=e}function pi(e){No=e}function mi(e){si=e}function En(e){Tn&&(Tn.innerHTML=e?li:Ws)}function fi(e){wn&&(wn.disabled=!e)}function Le(e){if(!ct)return;if(!e){ct.className="component-detail empty",ct.textContent="No selection";return}ct.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";ct.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function K(e){qe&&(qe.textContent=e,qe.classList.add("visible"),Mo&&clearTimeout(Mo),Mo=setTimeout(()=>{qe?.classList.remove("visible")},2e3))}function ai(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}pt();Ut();ft();ft();var Hl=.75,Ii=32,Rn=3,Pn=20,Fi=100,he=1;function gt(e,t,n){return Math.min(n,Math.max(t,e))}function _l(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,s=o+e.width/2,c=r+e.height/2,u=gt(Math.ceil(e.width/Ii),Rn,Pn),d=gt(Math.ceil(e.height/Ii),Rn,Pn);if(u*d>Fi){let g=Math.sqrt(Fi/(u*d));u=gt(Math.floor(u*g),Rn,Pn),d=gt(Math.floor(d*g),Rn,Pn)}let p=new Set,m=[],f=(g,b)=>{let x=gt(Math.round(g),0,t-1),L=gt(Math.round(b),0,n-1),A=`${x}:${L}`;p.has(A)||(p.add(A),m.push({x,y:L}))};f(o+he,r+he),f(i-he,r+he),f(o+he,a-he),f(i-he,a-he),f(s,r+he),f(s,a-he),f(o+he,c),f(i-he,c),f(s,c);for(let g=0;g<u;g++){let b=o+(g+.5)/u*e.width;for(let x=0;x<d;x++)f(b,r+(x+.5)/d*e.height)}return m}function zi(e,t=Xt,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=_l(e);for(let c of i)for(let u of document.elementsFromPoint(c.x,c.y))r.add(u);let a=[];for(let c of r){if(!t(c))continue;let u=c.getBoundingClientRect();if(u.width<=0||u.height<=0)continue;let d={left:u.left,top:u.top,right:u.left+u.width,bottom:u.top+u.height};if(n){let p=Math.max(o.left,d.left),m=Math.max(o.top,d.top),f=Math.min(o.right,d.right),g=Math.min(o.bottom,d.bottom),b=Math.max(0,f-p)*Math.max(0,g-m),x=u.width*u.height;x>0&&b/x>=Hl&&a.push(c)}else o.left<d.right&&o.right>d.left&&o.top<d.bottom&&o.bottom>d.top&&a.push(c)}let s=a.filter(c=>!a.some(u=>u!==c&&u.contains(c)));return s.sort((c,u)=>{let d=c.compareDocumentPosition(u);return d&Node.DOCUMENT_POSITION_FOLLOWING?-1:d&Node.DOCUMENT_POSITION_PRECEDING?1:0}),s}U();function ht(e,t,n){return e+(t-e)*n}U();var Dl=.35,Vi=.3,On=.5,Il=2,ne=null,W=null,or=0,rr=0,qt=1,yt=null,J=null,_=null,F=[],Kt=l.accent,Fl="rgba(162,89,255,0.08)",Bi="rgba(162,89,255,0.15)",zl=4,Wi=10,Vl="#ffffff",Bl=Kt,Wl=1.5,sr=!0;function Yi(){let e=G();e&&(ne=document.createElement("canvas"),ne.setAttribute("data-frameup-overlay","true"),ne.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(ne),lr(),window.addEventListener("resize",lr))}function An(e,t=4){if(!e){J&&(J.targetOpacity=0,Ze());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!J||!J.initialized?J=dr(n,t):(J.target=n,J.borderRadius=t,J.targetOpacity=1),Ze()}function Je(e,t=4){if(!e){_&&(_.targetOpacity=0,Ze());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!_||!_.initialized?_=dr(n,t):(_.target=n,_.borderRadius=t,_.targetOpacity=1),Ze()}function Ui(e){for(_=null;F.length>e.length;)F.pop();for(let t=0;t<e.length;t++){let n=e[t],o={x:n.rect.left,y:n.rect.top,w:n.rect.width,h:n.rect.height};t<F.length?(F[t].target=o,F[t].borderRadius=n.borderRadius,F[t].targetOpacity=1):F.push(dr(o,n.borderRadius))}Ze()}function Zt(){F=[],Ze()}function cr(e,t){if(!sr)return null;let n=Ki();if(!n)return null;let o=Ji(n.x,n.y,n.w,n.h);for(let r of o){let i=e-r.x,a=t-r.y;if(i*i+a*a<=Wi*Wi)return r.corner}return null}function Gi(){return Ki()}function Xi(){yt!==null&&cancelAnimationFrame(yt),window.removeEventListener("resize",lr),ne?.remove(),ne=null,W=null,J=null,_=null,F=[]}function Ki(){if(F.length>1)return qi(F);if(_&&_.opacity>=.5){let{x:e,y:t,w:n,h:o}=_.current;return{x:e,y:t,w:n,h:o}}if(F.length===1){let{x:e,y:t,w:n,h:o}=F[0].current;return{x:e,y:t,w:n,h:o}}return null}function qi(e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,r=-1/0;for(let i of e){let{x:a,y:s,w:c,h:u}=i.current;a<t&&(t=a),s<n&&(n=s),a+c>o&&(o=a+c),s+u>r&&(r=s+u)}return{x:t,y:n,w:o-t,h:r-n}}function dr(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function lr(){ne&&(qt=Math.max(window.devicePixelRatio||1,Il),or=window.innerWidth,rr=window.innerHeight,ne.width=or*qt,ne.height=rr*qt,ne.style.width=`${or}px`,ne.style.height=`${rr}px`,W=ne.getContext("2d"),Ze())}function Ze(){yt===null&&(yt=requestAnimationFrame(Zi))}function Zi(){if(yt=null,!W||!ne)return;let e=!1;J?.initialized&&(ir(J,Dl)&&(e=!0),J.opacity<.01&&J.targetOpacity===0&&(J=null)),_?.initialized&&(ir(_,Vi)&&(e=!0),_.opacity<.01&&_.targetOpacity===0&&(_=null));for(let t=F.length-1;t>=0;t--){let n=F[t];n.initialized&&ir(n,Vi)&&(e=!0),n.opacity<.01&&n.targetOpacity===0&&F.splice(t,1)}if(W.setTransform(1,0,0,1,0,0),W.clearRect(0,0,ne.width,ne.height),W.setTransform(qt,0,0,qt,0,0),J&&ar(W,J,Kt,Fl),_&&(ar(W,_,Kt,Bi),sr&&ji(W,_.current,_.opacity)),F.length>0){for(let t of F)ar(W,t,Kt,Bi);if(sr&&F.length>0){let t=qi(F);t&&t.w>=24&&t.h>=24&&(F.length>1&&(W.globalAlpha=.6,W.beginPath(),W.rect(t.x,t.y,t.w,t.h),W.strokeStyle=Kt,W.lineWidth=1,W.setLineDash([4,4]),W.stroke(),W.setLineDash([]),W.globalAlpha=1),ji(W,t,1))}}e&&(yt=requestAnimationFrame(Zi))}function ir(e,t){let n=e.current,o=e.target,r=ht(n.x,o.x,t),i=ht(n.y,o.y,t),a=ht(n.w,o.w,t),s=ht(n.h,o.h,t),c=ht(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<On&&Math.abs(i-o.y)<On&&Math.abs(a-o.w)<On&&Math.abs(s-o.h)<On&&Math.abs(c-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=s,e.opacity=c,!0)}function ar(e,t,n,o){let{x:r,y:i,w:a,h:s}=t.current;if(a<=0||s<=0)return;let c=Math.min(t.borderRadius,a/2,s/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,a,s,c):e.rect(r,i,a,s),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function Ji(e,t,n,o){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+n,y:t},{corner:"br",x:e+n,y:t+o},{corner:"bl",x:e,y:t+o}]}function ji(e,t,n){if(t.w<24||t.h<24)return;e.globalAlpha=n;let o=Ji(t.x,t.y,t.w,t.h);for(let r of o)e.beginPath(),e.arc(r.x,r.y,zl,0,Math.PI*2),e.fillStyle=Vl,e.fill(),e.strokeStyle=Bl,e.lineWidth=Wl,e.stroke();e.globalAlpha=1}var jl=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],Yl=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],Ul=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],Gl=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],Xl=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],bt=[...jl,...Yl,...Ul,...Gl,...Xl];U();var Kl=new Set(["auto","none","normal","inherit","initial"]);function Qi(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let s=document.createElement("input");s.type="text",s.className="prop-input",s.style.cssText="width:60px; cursor:text;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${w};`,a.appendChild(s),a.appendChild(c);let u=new Map(t);function d(){return u.get(r.key)??r.defaultValue}function p(m){let f=parseFloat(m);s.value=isNaN(f)?m:String(f);try{let b=Xr(i,m).find(x=>x.cssValue===m);b?.token?c.textContent=`${r.tailwindPrefix}-${b.token}`:c.textContent=""}catch{c.textContent=""}}return s.addEventListener("blur",()=>{let m=s.value.trim(),f=parseFloat(m);if(isNaN(f))Kl.has(m)?(u.set(r.key,m),p(m),n(r.key,m),o()):p(d());else{let b=m.match(/(px|rem|em|%|vw|vh|ch)$/)?m:`${f}px`;u.set(r.key,b),p(b),n(r.key,b),o()}}),s.addEventListener("keydown",m=>{m.key==="Enter"?s.blur():m.key==="Escape"&&(p(d()),s.blur())}),p(d()),{element:a,setValue(m,f){m===r.key&&(u.set(m,f),p(f))},destroy(){}}}U();function ea(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${l.bgTertiary};
    border-radius:${k.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let s=t.get(r.key)??r.defaultValue,c=[];function u(d){s=d;for(let{btn:p,value:m,opt:f}of c){let g=m===d;p.style.background=g?l.accent:"transparent",p.style.color=g?l.textOnAccent:l.textSecondary,p.title=g&&f.tailwindValue?`${f.label} (${f.tailwindValue})`:f.label}}for(let d of i){let p=document.createElement("button");p.style.cssText=`
      display:flex;
      align-items:center;
      justify-content:center;
      padding:2px 6px;
      border:none;
      border-radius:${k.xs};
      font-family:${w};
      font-size:10px;
      cursor:pointer;
      background:transparent;
      color:${l.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g," "),p.textContent=d.icon??d.label,p.title=d.label,p.addEventListener("click",()=>{u(d.value),n(r.key,d.value),o()}),c.push({btn:p,value:d.value,opt:d}),a.appendChild(p)}return u(s),{element:a,setValue(d,p){d===r.key&&u(p)},destroy(){}}}U();U();function $n(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,s=0;a!==0&&(r===t?s=((n-o)/a+(n<o?6:0))*60:r===n?s=((o-t)/a+2)*60:s=((t-n)/a+4)*60);let c=r===0?0:a/r*100,u=r*100;return{h:s,s:c,v:u}}function Hn(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),s=o*(1-i*n),c=o*(1-(1-i)*n),u,d,p;switch(r%6){case 0:u=o,d=c,p=a;break;case 1:u=s,d=o,p=a;break;case 2:u=a,d=o,p=c;break;case 3:u=a,d=s,p=o;break;case 4:u=c,d=a,p=o;break;case 5:u=o,d=a,p=s;break;default:u=0,d=0,p=0}let m=f=>Math.round(f*255).toString(16).padStart(2,"0");return`#${m(u)}${m(d)}${m(p)}`}var Be=null;function Jt(e){vt();let t=G();if(!t)return;let n=document.createElement("div");n.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${R.lg};
    border-radius: ${k.md};
    font-family: ${w};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${M.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let y=n.getBoundingClientRect();y.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-y.width-8}px`),y.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-y.height-8}px`),n.style.opacity="1"});let o=$n(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let y=ql(["Fill","Text"],0,S=>{r=S===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(y)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),s=document.createElement("div");s.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${R.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(s),n.appendChild(c);function u(){let y=o.h,S=a.createLinearGradient(0,0,176,0);S.addColorStop(0,`hsl(${y}, 0%, 100%)`),S.addColorStop(1,`hsl(${y}, 100%, 50%)`),a.fillStyle=S,a.fillRect(0,0,176,120);let Y=a.createLinearGradient(0,0,0,120);Y.addColorStop(0,"rgba(0,0,0,0)"),Y.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=Y,a.fillRect(0,0,176,120);let ce=o.s/100*176,De=(1-o.v/100)*120;s.style.left=`${ce}px`,s.style.top=`${De}px`}let d=!1;i.addEventListener("mousedown",y=>{d=!0,p(y)});function p(y){let S=i.getBoundingClientRect(),Y=Math.max(0,Math.min(176,y.clientX-S.left)),ce=Math.max(0,Math.min(120,y.clientY-S.top));o.s=Y/176*100,o.v=(1-ce/120)*100,u(),$()}let m=document.createElement("canvas");m.width=176,m.height=14,m.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let f=m.getContext("2d"),g=document.createElement("div");g.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${R.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let b=document.createElement("div");b.style.cssText="position:relative;width:176px;height:14px;",b.appendChild(m),b.appendChild(g),n.appendChild(b);function x(){let y=f.createLinearGradient(0,0,176,0);for(let S=0;S<=6;S++)y.addColorStop(S/6,`hsl(${S*60}, 100%, 50%)`);f.fillStyle=y,f.fillRect(0,0,176,14),g.style.left=`${o.h/360*176}px`}let L=!1;m.addEventListener("mousedown",y=>{L=!0,A(y)});function A(y){let S=m.getBoundingClientRect(),Y=Math.max(0,Math.min(176,y.clientX-S.left));o.h=Y/176*360,x(),u(),$()}let O=document.createElement("input");O.type="text",O.value=Hn(o),O.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: ${k.sm};
    color: ${l.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,O.addEventListener("keydown",y=>{y.key==="Enter"&&O.blur(),y.stopPropagation()}),O.addEventListener("blur",()=>{let y=O.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(y)){let S=y.startsWith("#")?y:`#${y}`;o=$n(S),u(),x(),$()}else O.value=Hn(o)}),n.appendChild(O);let I=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],C=document.createElement("div");C.style.cssText="display:flex;gap:4px;justify-content:center;";for(let y of I){let S=document.createElement("button");S.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${y};
      border: 1px solid ${l.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${M.fast};
    `,S.addEventListener("mouseenter",()=>{S.style.boxShadow=R.sm}),S.addEventListener("mouseleave",()=>{S.style.boxShadow="none"}),S.addEventListener("click",()=>{o=$n(y),u(),x(),O.value=y,$()}),C.appendChild(S)}n.appendChild(C);function $(){let y=Hn(o);O.value=y,e.onColorChange(y)}t.appendChild(n),Be=n,u(),x();let oe=y=>{d&&p(y),L&&A(y)},re=()=>{d=!1,L=!1};document.addEventListener("mousemove",oe),document.addEventListener("mouseup",re);let N=y=>{y.key==="Escape"&&vt()};document.addEventListener("keydown",N,!0);let B=y=>{Be&&!y.composedPath().includes(Be)&&vt()};setTimeout(()=>document.addEventListener("mousedown",B,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",oe),document.removeEventListener("mouseup",re),document.removeEventListener("keydown",N,!0),document.removeEventListener("mousedown",B,!0)},n._onClose=e.onClose}function vt(){Be&&(Be._cleanup?.(),Be._onClose?.(),Be.remove(),Be=null)}function ql(e,t,n){let o=document.createElement("div");o.style.cssText=`
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
      font-family: ${w}; font-size: 12px; cursor: pointer;
      transition: background ${M.fast}, color ${M.fast};
    `,a.addEventListener("click",()=>{r.forEach((s,c)=>{s.style.background=c===i?l.bgPrimary:"transparent",s.style.boxShadow=c===i?R.sm:"none",s.style.color=c===i?l.textPrimary:l.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var ur=null;function Zl(){return ur||(ur=document.createElement("canvas").getContext("2d")),ur}function ta(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${k.sm};
    border:1px solid ${l.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("input");s.type="text",s.placeholder="#rrggbb",s.className="prop-input",s.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${w};`,i.appendChild(a),i.appendChild(s),i.appendChild(c);let u=t.get(r.key)??r.defaultValue,d=!1;function p(g){let b=g.trim().toLowerCase();if(b==="transparent")return"transparent";if(b==="inherit"||b==="currentcolor"||b==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(b))return b;let x=Zl();x.fillStyle="#000000",x.fillStyle=b;let L=x.fillStyle;if(L.startsWith("#"))return L;let A=L.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(A){let O=parseInt(A[1],10),I=parseInt(A[2],10),C=parseInt(A[3],10);return`#${((1<<24)+(O<<16)+(I<<8)+C).toString(16).slice(1)}`}return"#000000"}function m(g){u=g,s.value=g,g==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=g;try{let b=Ht(),x=vn(g,b.colorsReverse);x?c.textContent=`${r.tailwindPrefix??"bg"}-${x}`:c.textContent=""}catch{c.textContent=""}}function f(){if(d)return;let g=s.value.trim();if(!g){m(u);return}let b=p(g);m(b),n(r.key,b),o()}return a.addEventListener("click",()=>{if(d){vt(),d=!1;return}let g=a.getBoundingClientRect();d=!0,Jt({initialColor:p(u),position:{x:g.left-210,y:g.top},showPropertyToggle:!1,onColorChange:b=>{m(b),n(r.key,b)},onClose:()=>{d=!1,o()}})}),s.addEventListener("keydown",g=>{g.key==="Enter"?(f(),s.blur()):g.key==="Escape"&&(m(u),s.blur())}),s.addEventListener("blur",()=>{f()}),s.addEventListener("input",()=>{let g=s.value.trim(),b=p(g);a.style.background=b}),m(u),{element:i,setValue(g,b){g===r.key&&m(b)},destroy(){d&&(vt(),d=!1)}}}U();function na(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function oa(e,t,n,o){let r=new Map(t),i=[];for(let E of e){let T=na(E.key);T&&i.push({descriptor:E,...T})}let a=document.createElement("div");a.style.cssText=`
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
    border-radius:${k.sm};
    padding:10px;
    position:relative;
  `.trim().replace(/\n\s*/g," ");let u=document.createElement("div");u.style.cssText=`
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
  `.trim().replace(/\n\s*/g," "),d.textContent="content";let p=[];function m(E){let T=document.createElement("span"),de=r.get(E.key)??E.defaultValue;return T.textContent=A(de),T.title=E.label,T.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),T.addEventListener("mouseenter",()=>{T.style.background=l.bgTertiary}),T.addEventListener("mouseleave",()=>{(document.activeElement!==f||f.dataset.key!==E.key)&&(T.style.background="transparent")}),T.addEventListener("click",()=>{x(E,T)}),p.push({key:E.key,span:T,descriptor:E}),T}let f=document.createElement("input");f.type="text",f.className="prop-input",f.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(f);let g=null,b=null;function x(E,T){g&&g!==E&&L(),g=E,b=T,f.dataset.key=E.key;let de=r.get(E.key)??E.defaultValue;f.value=A(de);let Z=0,Xe=0,Ie=T;for(;Ie&&Ie!==a;)Z+=Ie.offsetLeft,Xe+=Ie.offsetTop,Ie=Ie.offsetParent;f.style.display="block",f.style.left=`${Z}px`,f.style.top=`${Xe}px`;let Gr=T.getBoundingClientRect();f.style.width=`${Math.max(40,Gr.width+10)}px`,f.focus(),f.select()}function L(){if(!g||!b)return;let E=f.value.trim(),T=g,de=b,Z,Xe=parseFloat(E),Ie=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(Xe)?Ie.has(E)?Z=E:Z=r.get(T.key)??T.defaultValue:Z=E.match(/(px|rem|em|%|vw|vh|ch)$/)?E:`${Xe}px`,r.set(T.key,Z),de.textContent=A(Z),de.style.background="transparent",f.style.display="none",f.dataset.key="",g=null,b=null,n(T.key,Z),o()}f.addEventListener("keydown",E=>{if(E.key==="Enter")L();else if(E.key==="Escape"){if(g&&b){let T=r.get(g.key)??g.defaultValue;b.textContent=A(T)}f.style.display="none",f.dataset.key="",g=null,b=null}}),f.addEventListener("blur",()=>{L()});function A(E){let T=parseFloat(E);return isNaN(T)?E:T===Math.round(T)?String(Math.round(T)):E}function O(E){let T=document.createElement("span");return T.textContent=E,T.style.cssText=`
      font-size:9px;
      color:${l.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),T}function I(E,T){return i.find(de=>de.layer===E&&de.side===T)}function C(E,T){let de=I(E,T);if(!de){let Z=document.createElement("span");return Z.textContent="-",Z.style.cssText=`text-align:center; color:${l.textTertiary};`,Z}return m(de.descriptor)}let $=C("padding","top");$.style.gridRow="1",$.style.gridColumn="2",$.style.textAlign="center";let oe=C("padding","left");oe.style.gridRow="2",oe.style.gridColumn="1";let re=C("padding","right");re.style.gridRow="2",re.style.gridColumn="3";let N=C("padding","bottom");N.style.gridRow="3",N.style.gridColumn="2",N.style.textAlign="center",d.style.gridRow="2",d.style.gridColumn="2",u.appendChild($),u.appendChild(oe),u.appendChild(d),u.appendChild(re),u.appendChild(N);let B=document.createElement("div");B.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let y=C("margin","top");y.style.gridRow="1",y.style.gridColumn="2",y.style.textAlign="center";let S=C("margin","left");S.style.gridRow="2",S.style.gridColumn="1";let Y=C("margin","right");Y.style.gridRow="2",Y.style.gridColumn="3";let ce=C("margin","bottom");ce.style.gridRow="3",ce.style.gridColumn="2",ce.style.textAlign="center";let De=document.createElement("div");De.style.cssText="grid-row:2; grid-column:2;",De.appendChild(u),B.appendChild(y),B.appendChild(S),B.appendChild(De),B.appendChild(Y),B.appendChild(ce);let yn=O("margin"),Hs=O("padding"),bn=document.createElement("div");return bn.style.cssText="display:flex; gap:8px; padding:0 4px;",bn.appendChild(yn),bn.appendChild(Hs),c.appendChild(B),s.appendChild(c),a.appendChild(bn),a.appendChild(s),{element:a,setValue(E,T){if(!na(E))return;r.set(E,T);let Z=p.find(Xe=>Xe.key===E);Z&&(Z.span.textContent=A(T))},destroy(){}}}U();var _n=new Set;function ra(e){return _n.has(e)}var Dn=[];function ia(e){return Dn.push(e),()=>{let t=Dn.indexOf(e);t>=0&&Dn.splice(t,1)}}var Jl={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},Ql={"number-scrub":Qi,segmented:ea,"color-swatch":ta,"box-model":oa},ec=`
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
    border-radius: ${k.xs};
    padding: 4px 6px;
    font-family: ${w};
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
`;function tc(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function nc(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function oc(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}var rc=new Set(["flexDirection","justifyContent","alignItems","gap"]);function ic(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function pr(e,t,n,o){let r=document.createElement("div");r.className="prop-sections";let i=document.createElement("style");i.textContent=ec,r.appendChild(i);let a=[],s=nc(e);for(let[c,u]of s){let d=c==="layout"&&!ic(t)?u.filter(x=>!rc.has(x.key)):u;if(d.length===0)continue;let p=document.createElement("div");p.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${Jl[c]}</span>${tc()}`;let f=document.createElement("div");f.className="prop-section-body";let g=_n.has(c);if(g){let x=m.querySelector(".prop-section-chevron");x&&x.classList.add("collapsed"),f.classList.add("collapsed")}m.addEventListener("click",()=>{if(g=!g,g)_n.add(c);else{_n.delete(c);for(let L of Dn)L(c)}let x=m.querySelector(".prop-section-chevron");x&&x.classList.toggle("collapsed",g),f.classList.toggle("collapsed",g)}),p.appendChild(m);let b=oc(d);for(let x of b){let L=Ql[x.controlType];if(!L)continue;let A=L(x.descriptors,t,n,o);if(x.descriptors.length>1||x.controlType==="box-model")f.appendChild(A.element);else{let O=document.createElement("div");O.className="prop-control-row";let I=document.createElement("span");I.className="prop-control-label",I.textContent=x.descriptors[0].label,I.title=x.descriptors[0].label;let C=document.createElement("div");C.className="prop-control-value",C.appendChild(A.element),O.appendChild(I),O.appendChild(C),f.appendChild(O)}a.push(A)}p.appendChild(f),r.appendChild(p)}return{container:r,controls:a}}U();var ac=300,aa=260,sa=380,la="frameup-sidebar-width",sc=4,lc=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${l.bgPrimary};
    border-left: 1px solid ${l.border};
    box-shadow: ${R.lg};
    z-index: 2147483645;
    font-family: ${w};
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
    width: ${sc}px;
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
`;function cc(){try{let e=localStorage.getItem(la);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=aa&&t<=sa)return t}}catch{}return Math.min(ac,Math.floor(window.innerWidth*.22))}function dc(e){try{localStorage.setItem(la,String(e))}catch{}}function ca(e,t){let n=document.createElement("style");n.textContent=lc,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${cc()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let s=document.createElement("div");s.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let u=document.createElement("div");u.className="prop-sidebar-file-path",a.appendChild(s),a.appendChild(u);let d=document.createElement("button");d.className="prop-sidebar-close",d.title="Close panel",d.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>',i.appendChild(a),i.appendChild(d),o.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",o.appendChild(p);let m=document.createElement("div");m.className="prop-sidebar-content",o.appendChild(m),e.appendChild(o);let f=!1,g=0,b=0;r.addEventListener("pointerdown",N=>{N.preventDefault(),N.stopPropagation(),f=!0,g=N.clientX,b=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(N.pointerId)}),r.addEventListener("pointermove",N=>{if(!f)return;let B=g-N.clientX,y=Math.max(aa,Math.min(sa,b+B));o.style.width=`${y}px`});let x=()=>{f&&(f=!1,r.classList.remove("active"),dc(o.offsetWidth))};r.addEventListener("pointerup",x),r.addEventListener("pointercancel",x),o.addEventListener("pointerdown",N=>N.stopPropagation()),o.addEventListener("mousedown",N=>N.stopPropagation()),o.addEventListener("click",N=>N.stopPropagation()),o.addEventListener("mouseup",N=>N.stopPropagation()),d.addEventListener("click",()=>{O(),t&&t()});let L=!1;function A(N,B,y,S){s.textContent=`<${N}>`,s.appendChild(c),u.textContent=`${B}:${y}`,u.title=`${B}:${y}`,m.innerHTML="",m.appendChild(S),L||(L=!0,o.offsetHeight,o.classList.add("visible"))}function O(){L&&(L=!1,o.classList.remove("visible"))}function I(N){m.innerHTML="",m.appendChild(N)}function C(N,B,y){p.innerHTML="";let S=document.createElement("span");S.className="prop-sidebar-warning-text",S.textContent=N;let Y=document.createElement("button");Y.className="prop-sidebar-warning-btn",Y.textContent=B,Y.addEventListener("click",ce=>{ce.stopPropagation(),y()}),p.appendChild(S),p.appendChild(Y),p.style.display="flex"}function $(){p.style.display="none",p.innerHTML=""}function oe(){c.classList.add("active")}function re(){c.classList.remove("active")}return{show:A,hide:O,isVisible:()=>L,getElement:()=>o,replaceContent:I,showWarning:C,clearWarning:$,showSaving:oe,hideSaving:re}}Se();pt();Ut();var xr=new Map(bt.map(e=>[e.key,e]));var pc=new Set(["layout","spacing","size"]),Na=new Set(["typography","background"]),mc=5e3,h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map},nt=[],D,La,pe=null,fc=300,ve=null,Ct=null,Xn=new MutationObserver(()=>{h.selectedElement&&!document.contains(h.selectedElement)&&(clearTimeout(La),La=setTimeout(()=>{gc()},80))});function gc(){let e=h.elementIdentity,t=h.componentInfo;if(!e||!t){Tt();return}let n=hc(e);if(n){wt(n,t);return}yc(e).then(o=>{o?wt(o,t):Tt()})}function hc(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ae(n);for(;o;){if(Ce(o)){let r=o._debugSource,i=ue(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function yc(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ae(n);if(!o)continue;let r=await ze(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let s="";if(i.fileName){let c=Pe(i.fileName);Ve(c)&&(s=c)}if(s&&e.filePath.endsWith(s)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}function bc(e,t){let n=getComputedStyle(e),o=new Map;for(let r of bt){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function vc(e){if(!h.selectedElement)return;let t=getComputedStyle(h.selectedElement);for(let n of bt){if(n.group!==e||h.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;h.currentValues.set(n.key,r),h.originalValues.get(n.key)===n.defaultValue&&h.originalValues.set(n.key,r);for(let i of nt)i.setValue(n.key,r)}}function on(){for(let e of nt)e.destroy();nt=[]}function Ra(){if(!h.selectedElement||!h.componentInfo)return;on();let{container:e,controls:t}=pr(bt,h.currentValues,rn,Kn);nt=t,D.replaceContent(e)}function Kn(){pe&&clearTimeout(pe),pe=setTimeout(()=>{pe=null,wr()},fc)}function Cr(){pe&&(clearTimeout(pe),pe=null),Ct&&(Ct(),Ct=null),ve&&(clearTimeout(ve.timeoutId),ve=null),h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map}}function Pa(e){D=ca(e,()=>{qn(),on(),Cr()}),Zr((t,n,o)=>{if(D&&D.hideSaving(),ve)if(clearTimeout(ve.timeoutId),t)ve=null;else{let{batch:r,previousOriginals:i}=ve;ve=null;for(let[a]of r){let s=i.get(a);s!==void 0&&h.originalValues.set(a,s)}if(h.selectedElement){for(let[a]of r){h.selectedElement.style[a]="",h.activeOverrides.delete(a);let s=h.originalValues.get(a);s!==void 0&&h.currentValues.set(a,s)}for(let a of nt)for(let[s]of r){let c=h.originalValues.get(s);c!==void 0&&a.setValue(s,c)}}if(D){let s={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";D.showWarning(s,"Dismiss",()=>D.clearWarning())}}else if(!t&&D){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";D.showWarning(i,"Dismiss",()=>D.clearWarning())}})}function wt(e,t){h.pendingBatch.size>0&&wr(),on(),h.selectedElement=e,h.componentInfo=t,h.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(pc);for(let a of Na)ra(a)||n.add(a);let o=bc(e,n);h.currentValues=o,h.originalValues=new Map(o),h.activeOverrides=new Map,h.pendingBatch=new Map,Ct&&Ct(),Ct=ia(a=>{Na.has(a)&&vc(a)});let{container:r,controls:i}=pr(bt,h.currentValues,rn,Kn);nt=i,Xn.disconnect(),Xn.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),D.show(t.componentName,t.filePath,t.lineNumber,r)}function rn(e,t){let n=xr.get(e);if(!n||!h.selectedElement)return;h.selectedElement.style[n.key]=t,h.activeOverrides.set(e,t),h.currentValues.set(e,t);let o=Ht(),r=n.tailwindScale+"Reverse",i=o[r],a=i?vn(t,i):null;if(!a&&n.enumValues){let s=n.enumValues.find(c=>c.value===t);s&&(a=s.tailwindValue)}if(h.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:h.originalValues.get(e)||n.defaultValue}),e==="display")if(Ra(),t==="none"){let s=h.originalValues.get("display")||"block";D.showWarning("Element hidden","Restore",()=>{h.selectedElement&&(h.selectedElement.style.display=s),h.activeOverrides.delete("display"),h.currentValues.set("display",s),h.pendingBatch.delete("display"),Ra(),D.clearWarning()})}else D.clearWarning()}function wr(){if(h.pendingBatch.size===0||!h.componentInfo)return;let e=h.componentInfo.filePath,t=h.componentInfo.lineNumber,n=h.componentInfo.columnNumber-1;if(h.pendingBatch.size===1){let a=[...h.pendingBatch.values()][0],s=xr.get(a.property);Ee({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:n,...a,framework:"tailwind",classPattern:s?.classPattern,standalone:s?.standalone})}else Ee({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:n,updates:[...h.pendingBatch.values()].map(a=>{let s=xr.get(a.property);return{...a,classPattern:s?.classPattern,standalone:s?.standalone}}),framework:"tailwind"});h.selectedElement&&h.elementIdentity&&jn({type:"propertyChange",elementIdentity:h.elementIdentity,element:h.selectedElement,overrides:[...h.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),D&&D.showSaving();let o=new Map;for(let[a]of h.pendingBatch)o.set(a,h.originalValues.get(a)||"");for(let[a,s]of h.pendingBatch)h.originalValues.set(a,s.value);let r=new Map(h.pendingBatch),i=setTimeout(()=>{ve&&ve.batch===r&&(ve=null,D&&D.hideSaving())},mc);ve={batch:r,previousOriginals:o,timeoutId:i},h.pendingBatch.clear()}function qn(){if(h.selectedElement){for(let[e]of h.activeOverrides)h.selectedElement.style[e]="";for(let[e,t]of h.originalValues)h.currentValues.set(e,t);for(let e of nt)for(let[t,n]of h.originalValues)e.setValue(t,n);h.activeOverrides.clear(),h.pendingBatch.clear()}}function Tt(){pe&&(clearTimeout(pe),pe=null),Xn.disconnect(),qn(),on(),D&&D.hide(),Cr()}function Oa(){pe&&(clearTimeout(pe),pe=null),Xn.disconnect(),wr(),on(),D&&D.hide(),Cr()}function Aa(){return h.activeOverrides.size>0}Ko()||qo({onCommitFiberRoot(){}});async function xc(e){let t=ae(e);if(!t)return null;try{let n=await ze(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||mt(i))continue;let a="";if(r.fileName){let s=Pe(r.fileName);Ve(s)&&(a=s)}o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0)return{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}}catch(n){console.warn("[FrameUp] getOwnerStack failed, falling back to fiber walk:",n)}return $a(e,t)}function $a(e,t){let n=[],o=t;for(;o;){if(Ce(o)){let r=ue(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",s=0,c=0;i&&(a=i.fileName||"",s=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!mt(r)&&n.push({componentName:r,filePath:a,lineNumber:s,columnNumber:c})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function Ha(e){let t=ae(e);return t?$a(e,t):null}var j=null,V=null,$e=!1,St=!1,P=new Map,v=null,we=null,Oe="idle",z=null,Et=null,xe=null,oo=null,an=0,sn=0,Ye=[],Zn=!1,Cc=null,wc=null,Tc=null,Ec=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${R.sm};
    border-radius: ${k.sm};
    padding: 4px 8px;
    z-index: 2147483646;
    font-family: ${w};
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
`;function _a(e){Cc=e.onStart,wc=e.onMove,Tc=e.onEnd}function Da(){let e=G();if(!e)return;let t=document.createElement("style");t.textContent=Ec,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),we=document.createElement("div"),we.className="marquee-box",e.appendChild(we),$e=!0,document.addEventListener("mousedown",Jn,!0),document.addEventListener("mousemove",Qn,!0),document.addEventListener("mouseup",eo,!0),document.addEventListener("keydown",no,!0),document.addEventListener("click",to,!0),document.addEventListener("scroll",Ae,!0),window.addEventListener("resize",Ae),St=!0}function Jn(e){if(!$e||e.metaKey||e.ctrlKey)return;let t=document.elementFromPoint(e.clientX,e.clientY);if(t?.closest("#frameup-root"))return;if(j||P.size>0){let o=cr(e.clientX,e.clientY);if(o){e.preventDefault(),e.stopPropagation();let r=Gi();if(xe=o,oo=r?{...r}:null,P.size>0){Ye=[];for(let[i]of P){let a=getComputedStyle(i);Ye.push({element:i,width:parseFloat(a.width)||i.offsetWidth,height:parseFloat(a.height)||i.offsetHeight})}an=0,sn=0}else if(V){let i=getComputedStyle(V);an=parseFloat(i.width)||V.offsetWidth,sn=parseFloat(i.height)||V.offsetHeight,Ye=[]}z={x:e.clientX,y:e.clientY},Oe="resize-drag";return}}if(e.preventDefault(),e.stopPropagation(),!t||!Xt(t)){(j||P.size>0)&&(Oa(),j=null,V=null,ro(),Je(null),v&&(v.classList.remove("visible"),v.style.display="none"),Le(null));return}z={x:e.clientX,y:e.clientY},Et=t,Zn=e.shiftKey,Oe="pending"}function Qn(e){if($e){if(Oe==="resize-drag"&&xe&&z&&oo){e.preventDefault(),e.stopPropagation();let t=e.clientX-z.x,n=e.clientY-z.y;if(Ye.length>0){for(let o of Ye){let r=o.width,i=o.height;xe==="tr"||xe==="br"?r=Math.max(10,o.width+t):r=Math.max(10,o.width-t),xe==="bl"||xe==="br"?i=Math.max(10,o.height+n):i=Math.max(10,o.height-n),o.element.style.width=`${Math.round(r)}px`,o.element.style.height=`${Math.round(i)}px`}ln()}else{let o=an,r=sn;xe==="tr"||xe==="br"?o=Math.max(10,an+t):o=Math.max(10,an-t),xe==="bl"||xe==="br"?r=Math.max(10,sn+n):r=Math.max(10,sn-n),o=Math.round(o),r=Math.round(r),rn("width",`${o}px`),rn("height",`${r}px`),Ae()}return}if(Oe==="pending"&&z){let t=Math.abs(e.clientX-z.x),n=Math.abs(e.clientY-z.y);(t>10||n>10)&&(Oe="marquee")}if(Oe==="marquee"&&z&&we){let t=Math.min(e.clientX,z.x),n=Math.min(e.clientY,z.y),o=Math.abs(e.clientX-z.x),r=Math.abs(e.clientY-z.y);we.style.display="block",we.style.left=`${t}px`,we.style.top=`${n}px`,we.style.width=`${o}px`,we.style.height=`${r}px`;return}if(Oe==="idle"){if(j&&V||P.size>0){let i=cr(e.clientX,e.clientY);if(i){document.body.style.cursor=i==="tl"||i==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let n=document.elementFromPoint(e.clientX,e.clientY);if(!n||!Xt(n)){An(null);return}let o=n.getBoundingClientRect(),r=parseFloat(getComputedStyle(n).borderRadius)||4;An(o,r+2)}}}function eo(e){if(!$e)return;let t=Oe;if(Oe="idle",t==="resize-drag"){document.body.style.cursor="",xe=null,oo=null,z=null,Ye.length>0?Ye=[]:Kn();return}if(t==="marquee"&&z){we&&(we.style.display="none"),Sc(Math.min(e.clientX,z.x),Math.min(e.clientY,z.y),Math.max(e.clientX,z.x),Math.max(e.clientY,z.y)),z=null,Et=null,Zn=!1;return}Et&&(Zn?Mc(Et):(ro(),Ia(Et))),z=null,Et=null,Zn=!1}async function Ia(e,t){try{let n=e.getBoundingClientRect();V=e,Tr(n,{}),kc();let o=await xc(e);if(console.log("[FrameUp] selectElement:",e.tagName,"\u2192",o?.componentName,o?.filePath,"stack:",o?.stack?.map(r=>r.componentName)),!o)return;if(j={tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber,columnNumber:o.columnNumber,stack:o.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}},v){let r=o.filePath?`${o.filePath}:${o.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${o.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||wt(e,j),Le({tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber})}catch(n){console.error("[FrameUp] selectElement error:",n)}}function Sc(e,t,n,o){let r=zi({x:e,y:t,width:n-e,height:o-t});if(r.length!==0){Tt(),j=null,V=null,Je(null),v&&(v.classList.remove("visible"),v.style.display="none"),P.clear();for(let i of r.slice(0,50)){let a=Ha(i);if(!a)continue;let s=i.getBoundingClientRect(),c={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:s.top,left:s.left,width:s.width,height:s.height}};P.set(i,{element:i,info:c})}if(P.size!==0){if(P.size===1){let[i,a]=[...P.entries()][0];P.clear(),V=i,j=a.info;let s=i.getBoundingClientRect();if(Tr(s,j),v){let c=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${c?`<span class="comp-path">${c}</span>`:""}`}wt(i,j),Le({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}ln(),Le(null),v&&(v.innerHTML=`<span class="comp-name">${P.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function Mc(e){if(P.has(e)){if(P.delete(e),P.size===1){let[r,i]=[...P.entries()][0];P.clear(),Zt(),V=r,j=i.info;let a=r.getBoundingClientRect();if(Tr(a,j),wt(r,j),v){let s=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${s?`<span class="comp-path">${s}</span>`:""}`}Le({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else P.size===0?(Zt(),He()):(ln(),v&&(v.innerHTML=`<span class="comp-name">${P.size} elements selected</span>`));return}let t=Ha(e);if(!t)return;j&&V&&P.size===0&&(P.set(V,{element:V,info:j}),Tt(),j=null,V=null,Je(null));let n=e.getBoundingClientRect(),o={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}};P.set(e,{element:e,info:o}),ln(),Le(null),v&&(v.innerHTML=`<span class="comp-name">${P.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function ro(){P.clear(),Zt()}function ln(){if(P.size===0){Zt();return}let e=[];for(let[t]of P){let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:n,borderRadius:o+2})}Ui(e)}function to(e){$e&&(e.metaKey||e.ctrlKey||e.preventDefault())}function no(e){if($e&&e.key==="Escape"){if(P.size>0){ro(),v&&(v.classList.remove("visible"),v.style.display="none"),Le(null),e.preventDefault();return}if(j){if(Aa()){qn(),e.preventDefault();return}He(),e.preventDefault()}}}function Tr(e,t){if(V){let n=parseFloat(getComputedStyle(V).borderRadius)||4;Je(e,n+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function Ae(){if(P.size>0){ln();return}if(!V||!j)return;let e=V.getBoundingClientRect(),t=parseFloat(getComputedStyle(V).borderRadius)||4;if(Je(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function kc(){An(null)}function He(){Tt(),j=null,V=null,xe=null,oo=null,Ye=[],ro(),document.body.style.cursor="",Je(null),v&&(v.classList.remove("visible"),v.style.display="none"),Le(null)}function Fa(){return j}function za(){$e=!1,document.removeEventListener("mousedown",Jn,!0),document.removeEventListener("mousemove",Qn,!0),document.removeEventListener("mouseup",eo,!0),document.removeEventListener("keydown",no,!0),document.removeEventListener("click",to,!0),document.removeEventListener("scroll",Ae,!0),window.removeEventListener("resize",Ae),St=!1,v?.remove(),v=null}function Er(e){e&&!St?(document.addEventListener("mousedown",Jn,!0),document.addEventListener("mousemove",Qn,!0),document.addEventListener("mouseup",eo,!0),document.addEventListener("keydown",no,!0),document.addEventListener("click",to,!0),document.addEventListener("scroll",Ae,!0),window.addEventListener("resize",Ae),St=!0,$e=!0):!e&&St&&(document.removeEventListener("mousedown",Jn,!0),document.removeEventListener("mousemove",Qn,!0),document.removeEventListener("mouseup",eo,!0),document.removeEventListener("keydown",no,!0),document.removeEventListener("click",to,!0),document.removeEventListener("scroll",Ae,!0),window.removeEventListener("resize",Ae),St=!1,$e=!1)}function Va(){return V??null}async function Sr(e){await Ia(e,{skipSidebar:!0})}pt();var le=null,se=null,Ue=null,Ba=null,cn=!1,Mt=null,io=[],ao=new Map,so=!1,Nc=`
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
`,kt=null;function Wa(){let e=G();if(!e)return;let t=document.createElement("style");t.textContent=Nc,e.appendChild(t),_a({onStart:Lc,onMove:Rc,onEnd:Pc}),Ke(n=>{n.type==="reorderComplete"&&(Mr(),He())})}function Lc(e,t,n){Ue=n,Ba=t,Mt={x:e.clientX,y:e.clientY},cn=!1,so=!1,io=[],ao=new Map,kt=null;let o=G();if(!o)return;le=document.createElement("div"),le.className="drag-preview";let r=t.getBoundingClientRect();le.style.width=`${r.width}px`,le.style.height=`${r.height}px`,le.innerHTML=t.outerHTML,o.appendChild(le),se=document.createElement("div"),se.className="drop-indicator",o.appendChild(se);let i=n.stack[1];if(!i)return;Ee({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=Ke(s=>{if(s.type!=="siblingsList")return;a(),io=s.siblings;let c=document.querySelectorAll("*");for(let u of c){if(u.closest("#frameup-root"))continue;let d=ae(u);if(!d)continue;let p=d;for(;p;){if(Ce(p)){let m=p._debugSource||p._debugOwner?._debugSource;if(m){for(let f of s.siblings)m.lineNumber===f.lineNumber&&m.fileName===i.filePath&&ao.set(f.lineNumber,{el:u,rect:u.getBoundingClientRect()});break}}p=p.return}}so=!0})}function Rc(e){if(!Mt)return;let t=Math.abs(e.clientX-Mt.x),n=Math.abs(e.clientY-Mt.y);if(t<5&&n<5||(cn=!0,le&&(le.style.display="block",le.style.left=`${e.clientX+10}px`,le.style.top=`${e.clientY+10}px`),!so||!Ue))return;let o=null,r=1/0,i=0,a=0,s=0;for(let c of io){if(c.lineNumber===Ue.lineNumber)continue;let u=ao.get(c.lineNumber);if(!u)continue;let d=u.rect,p=d.top+d.height/2,m=Math.abs(e.clientY-p);m<r&&(r=m,o=c,e.clientY<p?i=d.top-2:i=d.bottom+2,a=d.left,s=d.width)}kt=o,o&&se?(se.style.display="block",se.style.top=`${i}px`,se.style.left=`${a}px`,se.style.width=`${s}px`):se&&(se.style.display="none")}function Pc(e){if(!cn||!kt||!Ue){Mr();return}Ee({type:"reorder",filePath:Ue.filePath,fromLine:Ue.lineNumber,toLine:kt.lineNumber,fromComponent:Ue.componentName,toComponent:kt.componentName}),le&&(le.style.display="none"),se&&(se.style.display="none"),cn=!1,Mt=null}function Mr(){le?.remove(),se?.remove(),le=null,se=null,Ue=null,Ba=null,cn=!1,Mt=null,so=!1,io=[],ao=new Map,kt=null}function ja(){Mr()}U();Se();var ot="http://www.w3.org/2000/svg",Nt=null,Q=null,kr=null;function Ya(){let e=G();e&&(Nt=document.createElementNS(ot,"svg"),Nt.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),Q=document.createElementNS(ot,"g"),Q.setAttribute("class","annotation-root"),Nt.appendChild(Q),e.appendChild(Nt),window.addEventListener("scroll",lo,{passive:!0}),kr=Un(lo),lo())}function lo(){if(!Q)return;let{scale:e,offsetX:t,offsetY:n}=tt();Q.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function Ua(e,t,n,o){if(!Q||t.length<2)return null;let r=document.createElementNS(ot,"g");r.setAttribute("data-annotation-id",e);let i=document.createElementNS(ot,"path");return i.setAttribute("d",qa(t)),i.setAttribute("stroke",n),i.setAttribute("stroke-width",String(o)),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.setAttribute("fill","none"),r.appendChild(i),Q.appendChild(r),r}function Ga(e,t,n,o,r,i){if(!Q)return null;let a=document.createElementNS(ot,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${R.sm};
    padding: 4px 8px;
    border-radius: ${k.sm};
    font-size: ${r}px;
    font-family: ${w};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,s.textContent=o,a.appendChild(s),Q.appendChild(a),a}function Xa(e){if(!Q)return;let t=Q.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function Nr(){Q&&(Q.innerHTML="")}function Ka(){window.removeEventListener("scroll",lo),kr?.(),kr=null,Nt?.remove(),Nt=null,Q=null}function qa(e){if(e.length===0)return"";let t=`M${e[0].x},${e[0].y}`;for(let n=1;n<e.length;n++)t+=` L${e[n].x},${e[n].y}`;return t}function Za(e,t){if(!Q)return null;let n=[],o=document.createElementNS(ot,"g"),r=document.createElementNS(ot,"path");return r.setAttribute("stroke",e),r.setAttribute("stroke-width",String(t)),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("fill","none"),o.appendChild(r),Q.appendChild(o),{path:r,group:o,addPoint(i,a){n.push({x:i,y:a}),r.setAttribute("d",qa(n))},getPoints(){return n}}}In();Se();U();dn();var Ge={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-7 1-4 7z"/></svg>',grab:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V8a2 2 0 0 0-4 0v3"/><path d="M14 10V6a2 2 0 0 0-4 0v4"/><path d="M10 9.5V5a2 2 0 0 0-4 0v9"/><path d="M6 14c0 3.31 2.69 6 6 6h2a6 6 0 0 0 6-6v-2"/></svg>',move:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',draw:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',color:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22l1-1h3l9-9"/><path d="M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7"/><path d="M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14"/><path d="m9 7 6 6"/><path d="M20 2a2.83 2.83 0 0 1 0 4L16 10"/></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9H3"/></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>'},us=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",uo=navigator.platform.includes("Mac")?"Cmd":"Ctrl",zr=[{type:"pointer",icon:Ge.pointer,label:"Pointer",shortcut:"V"},{type:"grab",icon:Ge.grab,label:"Grab",shortcut:"G"},{type:"move",icon:Ge.move,label:"Move",shortcut:"J"},{type:"draw",icon:Ge.draw,label:"Draw",shortcut:"D"},{type:"text",icon:Ge.text,label:"Text",shortcut:"T"}],Bc=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${k.lg};
    box-shadow: ${R.md};
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    gap: 4px;
    font-family: ${w};
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
    box-shadow: ${R.sm};
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
    font-family: ${w};
    cursor: pointer;
    padding: 0;
    transition: background ${M.fast}, color ${M.fast}, box-shadow ${M.fast};
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
    font-family: ${w};
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
    box-shadow: ${R.lg};
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
`,me=null,ee=null,mo=new Map,_e=null,Ir=null,Fr=null;function ps(e){Ir=e}function ms(e){Fr=e}function fs(e){_e&&(_e.disabled=!e)}function gs(){let e=G();if(!e)return;let t=document.createElement("style");t.textContent=Bc,e.appendChild(t),me=document.createElement("div"),me.className="tools-panel";let n=[["pointer","grab"],["move"],["draw","text"]];for(let s=0;s<n.length;s++){if(s>0){let c=document.createElement("div");c.className="tool-divider",me.appendChild(c)}for(let c of n[s]){let u=zr.find(m=>m.type===c),d=document.createElement("button");d.className=`tool-btn${u.type==="pointer"?" active":""}`,d.innerHTML=`${u.icon}<span class="tooltip">${u.label}<span class="shortcut-badge">${us}${u.shortcut}</span></span>`,d.addEventListener("click",()=>gr(u.type));let p=null;d.addEventListener("mouseenter",()=>{p=setTimeout(()=>d.classList.add("tooltip-visible"),400)}),d.addEventListener("mouseleave",()=>{p&&clearTimeout(p),d.classList.remove("tooltip-visible")}),me.appendChild(d),mo.set(u.type,d)}}ee=document.createElement("div"),ee.className="sub-options hidden",me.appendChild(ee);let o=document.createElement("div");o.className="tool-divider",me.appendChild(o),_e=document.createElement("button"),_e.className="action-btn",_e.innerHTML=Ge.undo,_e.title="Undo (Ctrl+Z)",_e.disabled=!0,_e.addEventListener("click",()=>{Fr&&Fr()}),me.appendChild(_e);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=Ge.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{Ir&&Ir()}),me.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=Ge.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{as(),i.style.color=is()?l.accent:""}),me.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.textContent="?",a.title=`Keyboard Shortcuts (${us}/)`,a.addEventListener("click",()=>ys()),me.appendChild(a),e.appendChild(me),document.addEventListener("keydown",hs,!0)}function hs(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||!e.ctrlKey&&!e.metaKey)return;let n=e.key.toUpperCase();if(e.key==="/"||e.key==="?"){ys(),e.preventDefault();return}let o=zr.find(r=>r.shortcut===n);o&&(gr(o.type),e.preventDefault())}var Me=null,mn=null;function ys(){Me?po():Wc()}function Wc(){let e=G();if(!e||Me)return;Me=document.createElement("div"),Me.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:zr.map(r=>({action:r.label,keys:[uo,r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[uo,"Z"]},{action:"Toggle Originals",keys:[uo,"."]},{action:"Keyboard Shortcuts",keys:[uo,"/"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Grab Tool","Drag"]},{action:"Zoom",keys:["Scroll Wheel"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let s of r.items){let c=document.createElement("div");c.className="shortcut-row";let u=document.createElement("span");u.className="shortcut-action",u.textContent=s.action,c.appendChild(u);let d=document.createElement("span");d.className="shortcut-keys";for(let p=0;p<s.keys.length;p++){if(p>0){let f=document.createElement("span");f.className="shortcut-plus",f.textContent="+",d.appendChild(f)}let m=document.createElement("span");m.className="shortcut-key",m.textContent=s.keys[p],d.appendChild(m)}c.appendChild(d),i.appendChild(c)}t.appendChild(i)}Me.appendChild(t),Me.addEventListener("click",r=>{r.target===Me&&po()}),e.appendChild(Me),mn=r=>{po()},document.addEventListener("keydown",mn,!0)}function po(){mn&&(document.removeEventListener("keydown",mn,!0),mn=null),Me?.remove(),Me=null}function bs(e){for(let[t,n]of mo)n.classList.toggle("active",t===e);jc(e)}function jc(e){if(ee){if(ee.innerHTML="",ee.classList.add("hidden"),ee.classList.remove("visible"),e==="draw"){ee.classList.remove("hidden"),requestAnimationFrame(()=>ee?.classList.add("visible"));let t=be(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.brushColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();Jt({initialColor:t.brushColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){nn("brushColor",i),n.style.background=i},onClose(){}})}),ee.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[2,4,8]){let i=document.createElement("button");i.className=`segment${r===t.brushSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{nn("brushSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active"),Promise.resolve().then(()=>(Pt(),ds)).then(a=>a.refreshDrawCursor())}),o.appendChild(i)}ee.appendChild(o)}else if(e==="text"){ee.classList.remove("hidden"),requestAnimationFrame(()=>ee?.classList.add("visible"));let t=be(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();Jt({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){nn("textColor",i),n.style.background=i},onClose(){}})}),ee.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{nn("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}ee.appendChild(o)}}}function vs(e){let t=mo.get(e);t&&(t.style.backgroundColor=l.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function xs(){document.removeEventListener("keydown",hs,!0),po(),me?.remove(),me=null,ee=null,mo.clear()}Pt();Ar();ft();U();var Cs="frameup-onboarding-seen",ke=null,fo=null;function ws(){if(localStorage.getItem(Cs))return;let e=G();if(!e)return;ke=document.createElement("div"),ke.style.cssText=`
    position: fixed;
    left: 72px;
    top: 50%;
    transform: translateY(-50%);
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${R.md};
    border-radius: ${k.md};
    padding: 12px 16px;
    font-family: ${w};
    font-size: 12px;
    color: ${l.textPrimary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${M.medium};
    max-width: 260px;
  `;let t=["V","H","M","D","C","T","L"],n=`
    display: inline-block;
    background: ${l.bgSecondary};
    color: ${l.textTertiary};
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 11px;
    font-family: ${w};
    margin: 0 2px;
  `;ke.innerHTML=`Press ${t.map(o=>`<span style="${n}">${o}</span>`).join(" ")} to switch tools`,e.appendChild(ke),requestAnimationFrame(()=>{ke&&(ke.style.opacity="1")}),fo=setTimeout(Vr,5e3)}function Vr(){ke&&(localStorage.setItem(Cs,"1"),ke.style.opacity="0",setTimeout(()=>{ke?.remove(),ke=null},150),fo&&(clearTimeout(fo),fo=null))}Se();function Ts(){Er(!0)}function Es(){Er(!1)}Pt();dn();var Br=!1,Wr=0,jr=0,Ss={onMouseDown(e){Br=!0,Wr=e.clientX,jr=e.clientY,co("grabbing")},onMouseMove(e){if(!Br)return;let t=e.clientX-Wr,n=e.clientY-jr;os(t,n),Wr=e.clientX,jr=e.clientY},onMouseUp(e){Br=!1,co("grab")}};In();Se();Pt();var fe=null,fn={x:0,y:0},Ot={dx:0,dy:0},At=!1,it=!1,gn=null,Ms={onMouseDown(e){gn=null,At=!1,it=!1;let t=je(e.clientX,e.clientY),n=pn(e.clientX,e.clientY);if(!n){He();return}let o=yr(n);if(o){fe=o,fn={x:t.x,y:t.y},Ot={...o.delta},At=!1,it=!0,Qt(o.element,o.delta.dx,o.delta.dy,o.existingTransform);return}let r=Fa(),i=Va();if(!r||!i||n!==i){gn=n;return}let a=yr(i);if(a){fe=a,fn={x:t.x,y:t.y},Ot={...a.delta},At=!1,it=!0,Qt(a.element,a.delta.dx,a.delta.dy,a.existingTransform);return}let s=i.getBoundingClientRect(),c=i.style.cssText,u=getComputedStyle(i).transform,d={id:crypto.randomUUID(),componentRef:{componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber},element:i,placeholder:null,originalRect:s,delta:{dx:0,dy:0},originalCssText:c,existingTransform:u==="none"?"":u,identity:{componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber,columnNumber:r.columnNumber,tagName:i.tagName.toLowerCase()}};xa(d),fe=d,fn={x:t.x,y:t.y},Ot={dx:0,dy:0},At=!0,it=!0,Qt(i,0,0,d.existingTransform)},onMouseMove(e){if(!it||!fe)return;let t=je(e.clientX,e.clientY),n=Ot.dx+(t.x-fn.x),o=Ot.dy+(t.y-fn.y);fe.delta={dx:n,dy:o},Qt(fe.element,n,o,fe.existingTransform)},onMouseUp(){it&&fe&&(At||Ca(fe.id,fe.delta,Ot),ua(fe),Sr(fe.element)),fe=null,it=!1,At=!1,gn&&(Sr(gn),gn=null)}};Se();function go(e,t=2){if(e.length<=2)return e;let n=0,o=0,r=e[0],i=e[e.length-1];for(let a=1;a<e.length-1;a++){let s=Yc(e[a],r,i);s>n&&(n=s,o=a)}if(n>t){let a=go(e.slice(0,o+1),t),s=go(e.slice(o),t);return[...a.slice(0,-1),...s]}return[r,i]}function Yc(e,t,n){let o=n.x-t.x,r=n.y-t.y,i=o*o+r*r;if(i===0){let s=e.x-t.x,c=e.y-t.y;return Math.sqrt(s*s+c*c)}return Math.abs(r*e.x-o*e.y+n.x*t.y-n.y*t.x)/Math.sqrt(i)}pt();Ut();ft();Pt();async function ho(e,t){let n=pn(e,t);if(!n)return null;let o=ae(n);if(!o)return null;try{let i=await ze(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let s=a.functionName;if(s[0]!==s[0].toUpperCase()||mt(s))continue;let c="";if(a.fileName){let u=Pe(a.fileName);Ve(u)&&(c=u)}return{componentName:s,filePath:c,lineNumber:a.lineNumber??0}}}catch{}let r=o;for(;r;){if(Ce(r)){let i=ue(r.type);if(i&&i[0]===i[0].toUpperCase()&&!mt(i)){let a=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:a?.fileName||"",lineNumber:a?.lineNumber||0}}}r=r.return}return null}var Ne=null,yo=null,ks={onMouseDown(e){let t=be();if(Ne=Za(t.brushColor,t.brushSize),Ne){let n=je(e.clientX,e.clientY);Ne.addPoint(n.x,n.y)}yo=ho(e.clientX,e.clientY)},onMouseMove(e){if(!Ne)return;let t=je(e.clientX,e.clientY);Ne.addPoint(t.x,t.y)},async onMouseUp(e){if(!Ne)return;let t=Ne.getPoints(),n=be();if(Ne.group.remove(),t.length<2){Ne=null,yo=null;return}let o=await yo,r=go(t,2),i=crypto.randomUUID();Ua(i,r,n.brushColor,n.brushSize),Wn({type:"draw",id:i,points:r,color:n.brushColor,strokeWidth:n.brushSize,targetComponent:o}),Ne=null,yo=null}};Se();U();var te=null,at=null,bo=null,Ls={onMouseDown(e){te&&Ns();let t=je(e.clientX,e.clientY);at={pageX:t.x,pageY:t.y},ho(e.clientX,e.clientY).then(n=>{bo=n}),te=document.createElement("input"),te.type="text",te.placeholder="Type annotation...",te.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${l.bgPrimary};
      color: ${l.textPrimary};
      border: 1.5px solid ${l.accent};
      border-radius: ${k.sm};
      padding: 4px 8px;
      font-size: ${be().fontSize}px;
      font-family: ${w};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${l.accentSoft};
    `,te.setAttribute("data-frameup-overlay","true"),te.addEventListener("keydown",n=>{n.key==="Enter"&&(Ns(),n.preventDefault()),n.key==="Escape"&&(Rs(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(te),te.focus()},onMouseMove(){},onMouseUp(){}};function Ns(){if(!te||!at)return;let e=te.value.trim();if(te.remove(),te=null,!e)return;let t=be(),n=crypto.randomUUID();Ga(n,at.pageX,at.pageY,e,t.fontSize,t.textColor),Wn({type:"text",id:n,position:at,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:bo}),at=null,bo=null}function Rs(){te&&(te.remove(),te=null),at=null,bo=null}function Ps(){Rs()}dn();U();var st=null,hn=null;function Os(e){let t=e instanceof Error&&e.stack?e.stack:String(e);return/frameup|overlay/i.test(t)}function Uc(e){let t=G();if(!t)return;st&&st.parentNode&&st.parentNode.removeChild(st),hn&&clearTimeout(hn);let n=document.createElement("div");n.setAttribute("style",["position: fixed","bottom: 72px","right: 16px","z-index: 2147483647","background: rgba(30, 30, 30, 0.92)","color: #fff",`font-family: ${w}`,"font-size: 12px","padding: 10px 14px",`border-radius: ${k.sm}`,`box-shadow: ${R.md}`,"max-width: 320px","display: flex","align-items: center","gap: 10px","opacity: 0",`transition: opacity ${M.medium}`].join("; "));let o=document.createElement("span");o.textContent=e,o.setAttribute("style","flex: 1;");let r=document.createElement("button");r.textContent="Dismiss",r.setAttribute("style",["background: rgba(255,255,255,0.15)","border: none","color: #fff",`font-family: ${w}`,"font-size: 11px","padding: 3px 8px",`border-radius: ${k.xs}`,"cursor: pointer","white-space: nowrap"].join("; ")),r.addEventListener("click",()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),hn&&clearTimeout(hn),st=null}),n.appendChild(o),n.appendChild(r),t.appendChild(n),st=n,requestAnimationFrame(()=>{n.style.opacity="1"}),hn=setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),st=null},8e3)}function Yr(e){console.error("[FrameUp]",e),Uc("FrameUp encountered an error. Your app is unaffected.")}function Gc(){window.addEventListener("error",e=>{Os(e.error??e.message)&&(Yr(e.error??e.message),e.preventDefault())}),window.addEventListener("unhandledrejection",e=>{Os(e.reason)&&(Yr(e.reason),e.preventDefault())})}var Ur=null;function As(e,t,n){t.originalCssText=n.style.cssText,t.element=n,Qe(t)}function Xc(){let e=window.__FRAMEUP_WS_PORT__;if(!e){console.warn("[FrameUp] No WebSocket port found.");return}if(document.getElementById("frameup-root"))return;xn(e),ci(Kc);let t=G();t&&Pa(t),Da(),Yi(),Wa(),Ya(),Ta(r=>Xa(r)),Ur=new MutationObserver(()=>{for(let[r,i]of va())document.contains(i.element)||setTimeout(()=>{let a=pa(i.identity);if(a){As(r,i,a);return}ma(i.identity).then(s=>{s?As(r,i,s):(hr(r),K(`Component ${i.componentRef.componentName} removed \u2014 move cleared`))})},80)}),Ur.observe(document.body,{childList:!0,subtree:!0}),gs(),Hr(),ws(),Rt("grab",Ss),Rt("move",Ms),Rt("draw",ks),Rt("text",Ls),ha((r,i)=>{Vr(),vs(r),i==="pointer"&&Es(),i==="text"&&Ps(),Lt(),nr(),r==="pointer"&&Ts(),_r(r),bs(r)}),ya(()=>{fi(vr()),fs(Ma())}),ms(()=>{let r=br();r&&K(`Undo: ${r}`)}),ui(()=>{if(!vr()){K("No moved components to toggle");return}let r=!Ea();Sa(r),En(r)});let n=!1,o=0;pi(()=>{if(n)return;let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);K(`Please wait ${a}s before retrying`);return}let i=ka();if(!i.moves.length&&!i.annotations.length&&!i.colorChanges.length){K("Nothing to confirm \u2014 make some visual changes first");return}n=!0,K("Generating..."),Ee({type:"generate",annotations:i})}),Ke(r=>{if(r.type==="generateProgress"&&K(r.message),r.type==="generateComplete")if(n=!1,r.success){let i=r.changes.map(a=>a.description||a.filePath).join(", ");K(`Applied: ${i}`),He(),Nr(),Gn(),En(!0)}else K(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),mi(()=>{let r=br();return r?(K(`Undo: ${r}`),!0):!1}),ps(()=>{He(),Nr(),Gn(),rs(),En(!0),K("Canvas cleared")}),console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools")}function Kc(){Lt(),nr(),za(),Xi(),ja(),Ka(),Ur?.disconnect(),xs(),Dr(),Gn(),Or(),Jr(),di()}function $s(){try{Xc(),Gc()}catch(e){Yr(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",$s):$s();})();
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
