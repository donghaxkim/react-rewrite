"use strict";var FrameUp=(()=>{var tl=Object.defineProperty;var ye=(e,t)=>()=>(e&&(t=e(e=0)),t);var nl=(e,t)=>{for(var n in t)tl(e,n,{get:t[n],enumerable:!0})};function yi(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='5 9 2 12 5 15'/><polyline points='9 5 12 2 15 5'/><polyline points='15 19 12 22 9 19'/><polyline points='19 9 22 12 19 15'/><line x1='2' y1='12' x2='22' y2='12'/><line x1='12' y1='2' x2='12' y2='22'/></svg>`)}") 12 12, move`}function Ao(e){if(Sn&&Sn.size===e)return Sn.uri;let t=Math.max(e,2),n=t*2+4,o=n/2,r=`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${n}' height='${n}'><circle cx='${o}' cy='${o}' r='${t}' fill='none' stroke='${l.accent}' stroke-width='1.5'/></svg>`)}") ${o} ${o}, crosshair`;return Sn={size:e,uri:r},r}var l,O,N,M,x,bi,Sn,Y=ye(()=>{"use strict";l={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},O={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},N={xs:"4px",sm:"6px",md:"10px",lg:"14px"},M={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},x="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",bi=`
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
`;Sn=null});var _o,Ut,Ni,ul,Gt,Ri,Pn,Pi,ki,Yt,Rn,Xe,Do,jt,Fo,vt,Vo,On,Xt=ye(()=>{"use strict";_o="0.5.32",Ut=`bippy-${_o}`,Ni=Object.defineProperty,ul=Object.prototype.hasOwnProperty,Gt=()=>{},Ri=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},Pn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),Pi=!1,Yt=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>Pi?!0:(e&&typeof e.inject=="function"&&(ki=e.inject.toString()),!!ki?.includes("(injected)")),Rn=new Set,Xe=new Set,Do=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:Ut,checkDCE:Ri,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),Xe.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,Rn.forEach(a=>a())),i},on:Gt,onCommitFiberRoot:Gt,onCommitFiberUnmount:Gt,onPostCommitFiberRoot:Gt,renderers:t,supportsFiber:!0,supportsFlight:!0};try{Ni(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let s=o.renderers;o=a,s.size>0&&(s.forEach((c,u)=>{Xe.add(c),a.renderers.set(u,c)}),jt(e))}}});let r=window.hasOwnProperty,i=!1;Ni(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{jt(e)}return o},jt=e=>{e&&Rn.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=Ri,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=Ut,t._instrumentationIsActive=!1;let n=Pn(t);if(n||(t.on=Gt),t.renderers.size){t._instrumentationIsActive=!0,Rn.forEach(i=>i());return}let o=t.inject,r=Yt(t);r&&!n&&(Pi=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return Xe.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,Rn.forEach(s=>s()),a}}(t.renderers.size||t._instrumentationIsActive||Yt())&&e?.()}catch{}},Fo=()=>ul.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),vt=e=>Fo()?(jt(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Do(e),Vo=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),On=()=>{try{Vo()&&vt()}catch{}}});var Oi=ye(()=>{"use strict";Xt();On()});function Qo(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await tr(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=er(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var zo,Bo,Wo,Go,Yo,jo,Uo,Xo,Ko,Zo,qo,Jo,fe,er,tr,nr,se,or,rr,oe,pl,ir=ye(()=>{"use strict";Xt();zo=0,Bo=1,Wo=5,Go=11,Yo=13,jo=15,Uo=16,Xo=19,Ko=26,Zo=27,qo=28,Jo=30,fe=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};er=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=er(o,t,n);if(r)return r;o=n?null:o.sibling}return null},tr=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await tr(o,t,n);if(r)return r;o=n?null:o.sibling}return null},nr=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?nr(t.type||t.render):null},se=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=nr(t);return o&&(o.displayName||o.name)||null},or=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||Pn(e)||Yt(e)},rr=e=>{let t=vt(e.onActive);t._instrumentationSource=e.name??Ut;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,s,c)=>{n!==i&&(n?.(a,s,c),e.onCommitFiberRoot?.(a,s,c))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,s)=>{t.onCommitFiberUnmount===i&&(o?.(a,s),e.onCommitFiberUnmount?.(a,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,s)=>{t.onPostCommitFiberRoot===i&&(r?.(a,s),e.onPostCommitFiberRoot?.(a,s))};t.onPostCommitFiberRoot=i}return t},oe=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},pl=Error()});var ot=ye(()=>{"use strict";Xt();Oi();ir();});function Kt(e,t){let n=0,o=0,r=0;do r=Ui[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function _i(e,t){return e.pos>=t?!1:e.peek()!==vl}function Xi(e){let{length:t}=e,n=new Cl(e),o=[],r=0,i=0,a=0,s=0,c=0;do{let u=n.indexOf(";"),d=[],p=!0,f=0;for(r=0;n.pos<u;){let m;r=Kt(n,r),r<f&&(p=!1),f=r,_i(n,u)?(i=Kt(n,i),a=Kt(n,a),s=Kt(n,s),_i(n,u)?(c=Kt(n,c),m=[r,i,a,s,c]):m=[r,i,a,s]):m=[r],d.push(m),n.pos++}p||Tl(d),o.push(d),n.pos=u+1}while(n.pos<=t);return o}function Tl(e){e.sort(El)}function El(e,t){return e[0]-t[0]}var Ai,ml,fl,Bi,gl,hl,Wi,bl,Gi,yl,Yi,ji,lr,$i,Hi,vl,Ii,xl,Ui,Cl,Ki,wl,Sl,Zi,Zt,An,Ml,Di,Ll,Nl,kl,Rl,Fi,Pl,Ol,Al,$l,Hl,Vi,Ie,Il,ar,sr,_l,Dl,Fl,Vl,zl,Bl,Wl,Gl,ke,zi,Yl,jl,Se,Re,xt=ye(()=>{"use strict";Xt();ir();Ai=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,ml=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],fl=["<anonymous>","eval",""],Bi=/\.(jsx|tsx|ts|js)$/,gl=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,hl=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,Wi="(at Server)",bl=/(^|@)\S+:\d+/,Gi=/^\s*at .*(\S+:\d+|\(native\))/m,yl=/^(eval@)?(\[native code\])?$/,Yi=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=$i(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(bl)){let i=Hi(r,void 0)[0];i&&o.push(i)}return lr(o,t)}return e.match(Gi)?$i(e,t):Hi(e,t)},ji=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},lr=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e,$i=(e,t)=>lr(e.split(`
`).filter(n=>!!n.match(Gi)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=ji(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}}),Hi=(e,t)=>lr(e.split(`
`).filter(n=>!n.match(yl)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,s=ji(o.replace(r,""));return{functionName:a,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:o}}}),vl=44,Ii="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",xl=new Uint8Array(64),Ui=new Uint8Array(128);for(let e=0;e<Ii.length;e++){let t=Ii.charCodeAt(e);xl[e]=t,Ui[t]=e}Cl=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};Ki=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,wl=/^data:application\/json[^,]+base64,/,Sl=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,Zi=typeof WeakRef<"u",Zt=new Map,An=new Map,Ml=e=>Zi&&e instanceof WeakRef,Di=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let d of r)if(d[0]<=o)i=d;else break;if(!i||i.length<4)return null;let[,a,s,c]=i;if(a===void 0||s===void 0||c===void 0)return null;let u=t[a];return u?{columnNumber:c,fileName:u,lineNumber:s+1}:null},Ll=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return Di(o.map.mappings,o.map.sources,r,i)}return Di(e.mappings,e.sources,t-1,n)},Nl=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(Sl);a&&(o=a[1]||a[2])}if(!o)return null;let r=Ki.test(o);if(!(wl.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},kl=e=>({file:e.file,mappings:Xi(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),Rl=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:Xi(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},Fi=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(Ki);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},Pl=async(e,t=fetch)=>{if(!Fi(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=Nl(e,n);if(!o||!Fi(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?Rl(i):kl(i)}catch{return null}},Ol=async(e,t=!0,n)=>{if(t&&Zt.has(e)){let i=Zt.get(e);if(i==null)return null;if(Ml(i)){let a=i.deref();if(a)return a;Zt.delete(e)}else return i}if(t&&An.has(e))return An.get(e);let o=Pl(e,n);t&&An.set(e,o);let r=await o;return t&&An.delete(e),t&&(r===null?Zt.set(e,null):Zt.set(e,Zi?new WeakRef(r):r)),r},Al=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await Ol(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=Ll(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),$l=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",Hl=()=>{let e=vt();for(let t of[...Array.from(Xe),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},Vi=e=>{for(let t of Xe){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},Ie=e=>`
    in ${e}`,Il=(e,t)=>{let n=Ie(e);return t&&(n+=` (at ${t})`),n},ar=!1,sr=(e,t)=>{if(!e||ar)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,ar=!0;let o=Hl();Vi(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let d;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(f){d=f}Reflect.construct(e,[],p)}else{try{p.call()}catch(f){d=f}e.call(p.prototype)}}else{try{throw Error()}catch(f){d=f}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&d instanceof Error&&typeof p.stack=="string")return[p.stack,d.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,u]=s.DetermineComponentFrameRoot();if(c&&u){let d=c.split(`
`),p=u.split(`
`),f=0,m=0;for(;f<d.length&&!d[f].includes("DetermineComponentFrameRoot");)f++;for(;m<p.length&&!p[m].includes("DetermineComponentFrameRoot");)m++;if(f===d.length||m===p.length)for(f=d.length-1,m=p.length-1;f>=1&&m>=0&&d[f]!==p[m];)m--;for(;f>=1&&m>=0;f--,m--)if(d[f]!==p[m]){if(f!==1||m!==1)do if(f--,m--,m<0||d[f]!==p[m]){let h=`
${d[f].replace(" at new "," at ")}`,y=se(e);return y&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",y)),h}while(f>=1&&m>=0);break}}}finally{ar=!1,Error.prepareStackTrace=n,Vi(o),console.error=r,console.warn=i}let a=e?se(e):"";return a?Ie(a):""},_l=(e,t)=>{let n=e.tag,o="";switch(n){case qo:o=Ie("Activity");break;case Bo:o=sr(e.type,!0);break;case Go:o=sr(e.type.render,!1);break;case zo:case jo:o=sr(e.type,!1);break;case Wo:case Ko:case Zo:o=Ie(e.type);break;case Uo:o=Ie("Lazy");break;case Yo:o=e.child!==t&&t!==null?Ie("Suspense Fallback"):Ie("Suspense");break;case Xo:o=Ie("SuspenseList");break;case Jo:o=Ie("ViewTransition");break;default:return""}return o},Dl=e=>{try{let t="",n=e,o=null;do{t+=_l(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=Il(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},Fl=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},Vl=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),zl=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,Bl=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!Vl(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>zl(a,o))||(i.push(o),t.set(r,i))}return t},Wl=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(Wi,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},Gl=e=>{let t=[];return Qo(e,n=>{if(!$l(n))return;let o=typeof n.type=="string"?n.type:se(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:Yi(Fl(n._debugStack?.stack))})},!0),t},ke=async(e,t=!0,n)=>{let o=Gl(e),r=Yi(Dl(e)),i=Bl(o),a=new Map;return Al(r.map(s=>s.source?.includes(Wi)??!1?Wl(s,i,a):s).filter((s,c,u)=>{if(c===0)return!0;let d=u[c-1];return s.functionName!==d.functionName}),t,n)},zi=e=>e.split("/").filter(Boolean).length,Yl=e=>e.split("/").filter(Boolean)[0]??null,jl=e=>{let t=e.indexOf("/",1);if(t===-1||zi(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!Bi.test(n)||zi(n)<2)return e;let o=Yl(n);return!o||o.startsWith("@")||o.length>4?e:n},Se=e=>{if(!e||fl.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=jl(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),s=i.indexOf(":");t=a!==-1&&(s===-1||a<s)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of ml)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if(Ai.test(t)){let i=t.match(Ai);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);hl.test(i)&&(t=t.slice(0,r))}return t},Re=e=>{let t=Se(e);return!(!t||!Bi.test(t)||gl.test(t))}});function _e(e){return!!(Ul.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function cr(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}function dr(){qt=new WeakMap}function ql(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function Jl(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=Kl}function Ql(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<$n||o.height/window.innerHeight<$n)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>Zl}function Jt(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&cr(e)||e.closest("#frameup-root")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-placeholder"))return!1;let n=performance.now(),o=qt.get(e);if(o&&n-o.timestamp<Xl)return o.isValid;let r=window.getComputedStyle(e);return ql(e,r)?e.clientWidth/window.innerWidth>=$n&&e.clientHeight/window.innerHeight>=$n&&(Jl(r)||Ql(e,r))?(qt.set(e,{isValid:!1,timestamp:n}),!1):(qt.set(e,{isValid:!0,timestamp:n}),!0):(qt.set(e,{isValid:!1,timestamp:n}),!1)}var Ul,Xl,$n,Kl,Zl,qt,rt=ye(()=>{"use strict";Ul=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);Xl=50,$n=.9,Kl=2147483600,Zl=1e3,qt=new WeakMap});function Rc(e,t,n){let o=n&&n!=="none"?` ${n}`:"";return`translate(${e}px, ${t}px)${o}`}function at(e){e.element.style.transform=Rc(e.delta.dx,e.delta.dy,e.existingTransform)}function wa(e){e.existingTransform&&e.existingTransform!=="none"?e.element.style.transform=e.existingTransform:e.element.style.transform=""}function Mt(e,t,n,o){e.style.transform=`translate(${t}px, ${n}px) scale(1.02)${o&&o!=="none"?` ${o}`:""}`,e.style.boxShadow=O.lg,e.style.transition="none",e.style.zIndex="2147483644"}function Sa(e){at(e),e.element.style.boxShadow="",e.element.style.transition="",e.element.style.zIndex=""}function Bn(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);for(;o;){if(fe(o)){let r=o._debugSource,i=se(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function Ma(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);if(!o)continue;let r=await ke(o);if(!r||r.length===0)continue;for(let i of r)if(!(!i.functionName||i.functionName!==e.componentName)&&i.fileName){let a=Se(i.fileName);if(Re(a)&&a.endsWith(e.filePath))return n}}catch{}return null}var Wn=ye(()=>{"use strict";ot();xt();Y()});function Na(e){return Gn.push(e),()=>{Gn=Gn.filter(t=>t!==e)}}function ka(e){return Yn.push(e),()=>{Yn=Yn.filter(t=>t!==e)}}function st(){Yn.forEach(e=>e())}function Xn(){return Er}function Sr(e){let t=Er;t!==e&&(Er=e,Gn.forEach(n=>n(e,t)))}function Ve(){return{...La}}function an(e,t){La[e]=t}function Ra(){return Ce}function Pa(e){Ce.set(e.id,e),Kn({type:"moveCreate",moveId:e.id})}function Oa(e,t,n){let o=Ce.get(e);o&&(o.delta=t,at(o),Kn({type:"moveDelta",moveId:e,previousDelta:n}))}function Mr(e){let t=Ce.get(e);t&&(t.element.style.cssText=t.originalCssText,t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),Ce.delete(e),st())}function Aa(e){if(Fe.push(e),e.type==="colorChange"){let t=e;qe.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else qe.push({type:"annotationAdd",annotationId:e.id});st()}function Lr(e,t,n){Fe.push(e),qe.push({type:"textEditRestore",annotationId:e.id,elementIdentity:t,originalInnerHTML:n}),st()}function Ha(e){$a=e}function Tr(e){Fe=Fe.filter(t=>t.id!==e),$a?.(e),st()}function Ia(){return wr}function _a(e){wr=e;for(let t of Ce.values())e?at(t):wa(t);st()}function Nr(e){for(let t of Ce.values())if(t.element===e)return t}function kr(){let e=qe.pop();if(!e)return null;switch(e.type){case"moveCreate":return Mr(e.moveId),"move removed";case"moveDelta":{let t=Ce.get(e.moveId);return t&&(t.delta=e.previousDelta,at(t)),"move reverted"}case"annotationAdd":return Tr(e.annotationId),"annotation removed";case"colorChange":{let t=Fe.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),Tr(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}case"textEditRestore":{let t=Bn(e.elementIdentity);return t&&(t.innerHTML=e.originalInnerHTML),Tr(e.annotationId),"text edit reverted"}}return null}function Kn(e){qe.push(e),st()}function ze(){return{scale:rn,offsetX:jn,offsetY:Un}}function Zn(e,t,n){rn=e,jn=t,Un=n,on.forEach(o=>o())}function qn(e){return on.push(e),()=>{on=on.filter(t=>t!==e)}}function sn(e,t){return{x:(e-jn)/rn,y:(t-Un)/rn}}function Jn(){for(let e of Ce.values())e.element.style.cssText=e.originalCssText,e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder);for(let e of Fe)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of qe)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}Ce=new Map,Fe=[],qe=[],wr=!0,rn=1,jn=0,Un=0,on.forEach(e=>e()),st()}function Qn(){return Ce.size>0||Fe.length>0}function Da(){return qe.length>0}function Fa(){let e=Array.from(Ce.values()).map(r=>({component:r.componentRef.componentName,file:r.componentRef.filePath,line:r.componentRef.lineNumber,originalRect:{top:r.originalRect.top,left:r.originalRect.left,width:r.originalRect.width,height:r.originalRect.height},delta:{dx:r.delta.dx,dy:r.delta.dy},siblingRects:(()=>{let i=r.element.parentElement;if(!i)return;let a=[];for(let s of Array.from(i.children)){if(s===r.element||!(s instanceof HTMLElement))continue;let c=s.getBoundingClientRect();a.push({component:s.tagName.toLowerCase(),rect:{top:c.top,left:c.left,width:c.width,height:c.height}})}return a.length>0?a:void 0})()})),t=[],n=[],o=[];for(let r of Fe)r.type==="text"?t.push({type:"text",content:r.content,position:r.position,targetComponent:r.targetComponent?.componentName,targetFile:r.targetComponent?.filePath,targetLine:r.targetComponent?.lineNumber}):r.type==="colorChange"?n.push({component:r.component.componentName,file:r.component.filePath,line:r.component.lineNumber,property:r.property,from:r.fromColor,to:r.toColor,pickedToken:r.pickedToken}):r.type==="textEdit"&&o.push({component:r.componentName,file:r.filePath,line:r.lineNumber,column:r.columnNumber,originalText:r.originalText,newText:r.newText});return{moves:e,annotations:t,colorChanges:n,textEdits:o}}var Ce,Fe,qe,Er,wr,La,rn,jn,Un,on,Gn,Yn,$a,Me=ye(()=>{"use strict";Wn();Ce=new Map,Fe=[],qe=[],Er="select",wr=!0,La={fontSize:16,textColor:"#ffffff"},rn=1,jn=0,Un=0,on=[],Gn=[],Yn=[];$a=null});function od(){Br=document.body.style.background||document.body.style.backgroundColor||"",Wr=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",Z=document.createElement("div"),Z.setAttribute("data-frameup-canvas-wrapper","true"),Z.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${n};
  `.trim().replace(/\n\s*/g," "),Ne=document.createElement("div"),Ne.setAttribute("data-frameup-dot-bg","true"),Ne.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${l.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="frameup-root"||r.hasAttribute("data-frameup-interaction")||r.hasAttribute("data-frameup-placeholder")||r.hasAttribute("data-frameup-annotation")||r.hasAttribute("data-frameup-dot-bg")||r.hasAttribute("data-frameup-canvas-wrapper"))||(cs.push(r),Z.appendChild(r));Z.style.position="relative",Z.style.zIndex="1",document.body.insertBefore(Ne,document.body.firstChild),document.body.insertBefore(Z,Ne.nextSibling),zr=qn(ls),ls(),ds.forEach(r=>r(Z))}function ls(){if(!Z||!Ne)return;let{scale:e,offsetX:t,offsetY:n}=ze();Z.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=td*e,r=t%o,i=n%o;Ne.style.backgroundImage=`radial-gradient(circle, ${nd} ${ss}px, transparent ${ss}px)`,Ne.style.backgroundSize=`${o}px ${o}px`,Ne.style.backgroundPosition=`${r}px ${i}px`}function rd(e,t,n){let{scale:o,offsetX:r,offsetY:i}=ze(),a=Math.min(Qc,Math.max(Jc,o+n));if(a===o)return;let s=(e-r)/o,c=(t-i)/o,u=e-s*a,d=t-c*a;Zn(a,u,d)}function us(e){e.preventDefault();let t=-e.deltaY*ed,{scale:n}=ze(),o=t*n;rd(e.clientX,e.clientY,o)}function ps(e,t){let{scale:n,offsetX:o,offsetY:r}=ze();Zn(n,o+e,r+t)}function ms(){Zn(1,0,0)}function fs(){return Z!==null}function gs(){Z?Gr():od()}function Gr(){if(ds.forEach(e=>e(null)),zr?.(),zr=null,Z){for(;Z.firstChild;)document.body.insertBefore(Z.firstChild,Z);Z.remove(),Z=null}Ne?.remove(),Ne=null,cs=[],document.body.style.background=Br,document.documentElement.style.background=Wr,Br="",Wr=""}var Jc,Qc,ed,td,ss,nd,Z,Ne,zr,cs,ds,Br,Wr,fn=ye(()=>{"use strict";Me();Y();Jc=.1,Qc=5,ed=.002,td=24,ss=1,nd="rgba(0,0,0,0.15)",Z=null,Ne=null,zr=null,cs=[],ds=[],Br="",Wr=""});function hs(e,t){if(!ct)return;let n=performance.now(),o=Math.abs(e-ct.clientX),r=Math.abs(t-ct.clientY),i=o<=2&&r<=2,a=n-ct.timestamp<16;if(i||a)return ct.element}function bs(e,t,n){ct={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function Ht(){ct=null}var ct,Yr=ye(()=>{"use strict";ct=null});var vs={};nl(vs,{activateInteraction:()=>hn,destroyInteraction:()=>Kr,getPageElementAtPoint:()=>dt,initInteraction:()=>Ur,refreshDrawCursor:()=>ad,registerToolHandler:()=>It,setInteractionCursor:()=>bo,setInteractionPointerEvents:()=>Xr});function It(e,t){jr.set(e,t)}function Ur(){I=document.createElement("div"),I.setAttribute("data-frameup-interaction","true"),I.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(I),document.addEventListener("scroll",Ht,!0),I.addEventListener("mousedown",e=>{gn?.onMouseDown?.(e)}),I.addEventListener("mousemove",e=>{gn?.onMouseMove?.(e)}),I.addEventListener("mouseup",e=>{gn?.onMouseUp?.(e)}),document.addEventListener("wheel",ys,{passive:!1})}function ys(e){!I||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#frameup-root")||us(e)}function hn(e){gn=jr.get(e)||null,I&&(I.style.pointerEvents=e==="pointer"?"none":"auto"),id(e)}function id(e){if(I)switch(e){case"pointer":I.style.cursor="default";break;case"grab":I.style.cursor="grab";break;case"move":I.style.cursor=yi();break;case"draw":I.style.cursor=Ao(Ve().brushSize);break;case"text":I.style.cursor="text";break;default:I.style.cursor="default"}}function ad(){Xn()==="draw"&&I&&(I.style.cursor=Ao(Ve().brushSize))}function bo(e){I&&(I.style.cursor=e)}function Xr(e){I&&(I.style.pointerEvents=e?"auto":"none")}function dt(e,t){let n=hs(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#frameup-root")&&!i.hasAttribute("data-frameup-interaction")&&!i.hasAttribute("data-frameup-placeholder")&&!(i===document.body||i===document.documentElement)&&!cr(i)){r=i;break}return bs(e,t,r),r}function Kr(){document.removeEventListener("scroll",Ht,!0),document.removeEventListener("wheel",ys),I?.remove(),I=null,gn=null,jr.clear()}var I,gn,jr,ut=ye(()=>{"use strict";Me();Y();Yr();rt();fn();I=null,gn=null,jr=new Map});function ol(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),s=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+s).toString(16).slice(1)}`}return e}function rl(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(C=>{try{return Array.from(C.cssRules)}catch{return[]}}).filter(C=>C instanceof CSSStyleRule&&C.selectorText===":root").flatMap(C=>Array.from(C.style)).filter(C=>C.startsWith("--")),n={},o={},r={},i={},a={},s={},c={},u={},d={},p={},f={},m={},h={},y={},L={},S={},H={},$={},V=(C,P,le,ce)=>{C[le]=ce,P[ce]=le};for(let C of t){let P=e.getPropertyValue(C).trim();if(!P)continue;let le=C.match(/^--spacing-(.+)$/);if(le){V(n,p,le[1],P);continue}let ce=C.match(/^--color-(.+)$/);if(ce){let Cn=ce[1];o[Cn]=P,f[ol(P)]=Cn;continue}let R=C.match(/^--font-size-(.+)$/);if(R){V(r,m,R[1],P);continue}let G=C.match(/^--font-weight-(.+)$/);if(G){V(i,h,G[1],P);continue}let b=C.match(/^--radius-(.+)$/);if(b){V(a,y,b[1],P);continue}let T=C.match(/^--border-(.+)$/);if(T){V(s,L,T[1],P);continue}let _=C.match(/^--opacity-(.+)$/);if(_){V(c,S,_[1],P);continue}let Q=C.match(/^--tracking-(.+)$/);if(Q){V(u,H,Q[1],P);continue}let ee=C.match(/^--leading-(.+)$/);if(ee){V(d,$,ee[1],P);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:s,opacity:c,letterSpacing:u,lineHeight:d,spacingReverse:p,colorsReverse:f,fontSizeReverse:m,fontWeightReverse:h,borderRadiusReverse:y,borderWidthReverse:L,opacityReverse:S,letterSpacingReverse:H,lineHeightReverse:$}}var il=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function al(e,t){let n={};for(let o of il){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function En(e,t){return t.get(e)??null}function li(e,t,n){let r=(n??Vt())[e],i=[];for(let[s,c]of r.entries()){let u=parseFloat(c);isNaN(u)||i.push({numericValue:u,token:s,cssValue:c})}let a=parseFloat(t);return isNaN(a)||i.some(c=>c.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((s,c)=>s.numericValue-c.numericValue),i}var ci=null,Ft=null;function di(e){ci=e,Ft=null}function Vt(){if(Ft!==null)return Ft;let e=rl();return Ft=al(e,ci??{}),Ft}var de=null,zt=[],ht=0,sl=5,Lo=null,No=null,ko=null,Ro=null,Po=null,Oo=null;function ui(e){Oo=e}function wn(e){de&&de.readyState===WebSocket.OPEN||(Po=e,de=new WebSocket(`ws://localhost:${e}`),de.onopen=()=>{let t=ht>0;ht=0,t&&Ro&&Ro()},de.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&di(n.tokens),n.type==="updatePropertyComplete"&&Oo&&Oo(n.success,n.errorCode,n.error),zt.forEach(o=>o(n))}catch{}},de.onclose=t=>{if(de=null,t.code===4001){ko&&ko();return}if(ht<sl){let n=500*Math.pow(2,ht);ht++,Lo=setTimeout(()=>wn(e),n)}else No&&No()},de.onerror=()=>{})}function ve(e){de&&de.readyState===WebSocket.OPEN&&de.send(JSON.stringify(e))}function $e(e){return zt.push(e),()=>{zt=zt.filter(t=>t!==e)}}function pi(){Lo&&clearTimeout(Lo),de&&(de.close(),de=null),zt=[]}function mi(e){No=e}function fi(e){ko=e}function gi(e){Ro=e}function hi(){Po&&(ht=0,wn(Po))}Y();var yt=null,K=null,Bt=0,Mn=null,Ln=null,nt=null,$o=null,bt=null,Wt=null,Io=null,Ci=null,ll='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>',Ti='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path></svg>',Ho='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',cl='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>',vi='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>',dl=`
  :host {
    all: initial;
  }
  ${bi}
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
    border-radius: ${N.md};
    font-family: ${x};
    font-size: 12px;
    color: ${l.textPrimary};
    box-shadow: ${O.md};
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
    border-radius: ${N.sm};
    color: white;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    font-family: ${x};
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
    font-family: ${x};
    box-shadow: ${O.md};
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
`;function Ei(e){let t=document.createElement("div");t.id="frameup-root",document.body.appendChild(t),yt=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=dl;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn eye-btn" title="Toggle originals (.)">
      ${Ti}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${Ho}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Confirm</button>
    <button class="icon-btn close-btn" title="Close FrameUp">
      ${cl}
    </button>
  `,yt.appendChild(n),yt.appendChild(o),K=o.querySelector(".undo-btn");let r=o.querySelector(".close-btn");Mn=o.querySelector(".generate-btn"),Ln=o.querySelector(".eye-btn"),bt=o.querySelector(".component-detail"),nt=document.createElement("div"),nt.className="toast",yt.appendChild(nt),K.addEventListener("click",()=>{ve({type:"undo"}),K&&(K.innerHTML='<div class="spinner"></div>',K.disabled=!0)}),r.addEventListener("click",e),Ln.addEventListener("click",()=>{Wt&&Wt()}),Mn.addEventListener("click",()=>{Io&&Io()}),document.addEventListener("keydown",i=>{i.key==="."&&(i.ctrlKey||i.metaKey)&&!xi()&&(Wt&&Wt(),i.preventDefault()),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!xi()&&Ci?.()&&i.preventDefault()}),mi(()=>{U("Disconnected. Click to reconnect."),hi()}),fi(()=>{U("Disconnected: another tab took over")}),gi(()=>{Bt=0,K&&(K.disabled=!0)}),$e(i=>{switch(i.type){case"reorderComplete":i.success?(Bt++,K&&(K.innerHTML=vi,setTimeout(()=>{K&&(K.innerHTML=Ho,K.disabled=!1)},200))):i.error&&U(i.error);break;case"undoComplete":i.success?(Bt=Math.max(0,Bt-1),K&&(K.innerHTML=vi,setTimeout(()=>{K&&(K.innerHTML=Ho,K.disabled=Bt===0)},200))):i.error&&U(i.error);break;case"devServerDisconnected":U("Dev server disconnected");break;case"devServerReconnected":U("Dev server reconnected");break}})}function wi(){let e=document.getElementById("frameup-root");e&&e.remove(),yt=null,K=null}function X(){return yt}function Si(e){Wt=e}function Mi(e){Io=e}function Li(e){Ci=e}function Nn(e){Ln&&(Ln.innerHTML=e?Ti:ll)}function kn(e){Mn&&(Mn.disabled=!e)}function He(e){if(!bt)return;if(!e){bt.className="component-detail empty",bt.textContent="No selection";return}bt.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";bt.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function U(e){nt&&(nt.textContent=e,nt.classList.add("visible"),$o&&clearTimeout($o),$o=setTimeout(()=>{nt?.classList.remove("visible")},2e3))}function xi(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}ot();xt();rt();rt();var ec=.75,qi=32,Hn=3,In=20,Ji=100,xe=1;function Ct(e,t,n){return Math.min(n,Math.max(t,e))}function tc(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,s=o+e.width/2,c=r+e.height/2,u=Ct(Math.ceil(e.width/qi),Hn,In),d=Ct(Math.ceil(e.height/qi),Hn,In);if(u*d>Ji){let h=Math.sqrt(Ji/(u*d));u=Ct(Math.floor(u*h),Hn,In),d=Ct(Math.floor(d*h),Hn,In)}let p=new Set,f=[],m=(h,y)=>{let L=Ct(Math.round(h),0,t-1),S=Ct(Math.round(y),0,n-1),H=`${L}:${S}`;p.has(H)||(p.add(H),f.push({x:L,y:S}))};m(o+xe,r+xe),m(i-xe,r+xe),m(o+xe,a-xe),m(i-xe,a-xe),m(s,r+xe),m(s,a-xe),m(o+xe,c),m(i-xe,c),m(s,c);for(let h=0;h<u;h++){let y=o+(h+.5)/u*e.width;for(let L=0;L<d;L++)m(y,r+(L+.5)/d*e.height)}return f}function Qi(e,t=Jt,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=tc(e);for(let c of i)for(let u of document.elementsFromPoint(c.x,c.y))r.add(u);let a=[];for(let c of r){if(!t(c))continue;let u=c.getBoundingClientRect();if(u.width<=0||u.height<=0)continue;let d={left:u.left,top:u.top,right:u.left+u.width,bottom:u.top+u.height};if(n){let p=Math.max(o.left,d.left),f=Math.max(o.top,d.top),m=Math.min(o.right,d.right),h=Math.min(o.bottom,d.bottom),y=Math.max(0,m-p)*Math.max(0,h-f),L=u.width*u.height;L>0&&y/L>=ec&&a.push(c)}else o.left<d.right&&o.right>d.left&&o.top<d.bottom&&o.bottom>d.top&&a.push(c)}let s=a.filter(c=>!a.some(u=>u!==c&&u.contains(c)));return s.sort((c,u)=>{let d=c.compareDocumentPosition(u);return d&Node.DOCUMENT_POSITION_FOLLOWING?-1:d&Node.DOCUMENT_POSITION_PRECEDING?1:0}),s}Y();function Tt(e,t,n){return e+(t-e)*n}Y();var nc=.35,ea=.3,_n=.5,oc=2,te=null,k=null,ur=0,pr=0,Qt=1,wt=null,re=null,D=null,z=[],Et=l.accent,rc="rgba(162,89,255,0.08)",ta="rgba(162,89,255,0.15)",ic=4,na=10,ac="#ffffff",sc=Et,lc=1.5,gr=!0,Ke=null;function ra(){let e=X();e&&(te=document.createElement("canvas"),te.setAttribute("data-frameup-overlay","true"),te.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(te),hr(),window.addEventListener("resize",hr))}function Dn(e,t=4){if(!e){re&&(re.targetOpacity=0,De());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!re||!re.initialized?re=vr(n,t):(re.target=n,re.borderRadius=t,re.targetOpacity=1),De()}function it(e,t=4){if(!e){D&&(D.targetOpacity=0,De());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!D||!D.initialized?D=vr(n,t):(D.target=n,D.borderRadius=t,D.targetOpacity=1),De()}function ia(e){Ke=e,De()}function br(){Ke=null,De()}function aa(e){for(D=null;z.length>e.length;)z.pop();for(let t=0;t<e.length;t++){let n=e[t],o={x:n.rect.left,y:n.rect.top,w:n.rect.width,h:n.rect.height};t<z.length?(z[t].target=o,z[t].borderRadius=n.borderRadius,z[t].targetOpacity=1):z.push(vr(o,n.borderRadius))}De()}function en(){z=[],De()}function yr(e,t){if(!gr)return null;let n=ca();if(!n)return null;let o=pa(n.x,n.y,n.w,n.h);for(let r of o){let i=e-r.x,a=t-r.y;if(i*i+a*a<=na*na)return r.corner}return null}function sa(){return ca()}function la(){wt!==null&&cancelAnimationFrame(wt),window.removeEventListener("resize",hr),te?.remove(),te=null,k=null,re=null,D=null,z=[],Ke=null}function ca(){if(z.length>1)return da(z);if(D&&D.opacity>=.5){let{x:e,y:t,w:n,h:o}=D.current;return{x:e,y:t,w:n,h:o}}if(z.length===1){let{x:e,y:t,w:n,h:o}=z[0].current;return{x:e,y:t,w:n,h:o}}return null}function da(e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,r=-1/0;for(let i of e){let{x:a,y:s,w:c,h:u}=i.current;a<t&&(t=a),s<n&&(n=s),a+c>o&&(o=a+c),s+u>r&&(r=s+u)}return{x:t,y:n,w:o-t,h:r-n}}function vr(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function hr(){te&&(Qt=Math.max(window.devicePixelRatio||1,oc),ur=window.innerWidth,pr=window.innerHeight,te.width=ur*Qt,te.height=pr*Qt,te.style.width=`${ur}px`,te.style.height=`${pr}px`,k=te.getContext("2d"),De())}function De(){wt===null&&(wt=requestAnimationFrame(ua))}function ua(){if(wt=null,!k||!te)return;let e=!1;re?.initialized&&(mr(re,nc)&&(e=!0),re.opacity<.01&&re.targetOpacity===0&&(re=null)),D?.initialized&&(mr(D,ea)&&(e=!0),D.opacity<.01&&D.targetOpacity===0&&(D=null));for(let t=z.length-1;t>=0;t--){let n=z[t];n.initialized&&mr(n,ea)&&(e=!0),n.opacity<.01&&n.targetOpacity===0&&z.splice(t,1)}if(k.setTransform(1,0,0,1,0,0),k.clearRect(0,0,te.width,te.height),k.setTransform(Qt,0,0,Qt,0,0),re&&fr(k,re,Et,rc),D&&(fr(k,D,Et,ta),gr&&oa(k,D.current,D.opacity)),Ke){if(k.save(),k.globalAlpha=.6,k.strokeStyle=Et,k.lineWidth=1,k.setLineDash([4,4]),Ke.verticalLine){let{x:t}=Ke.verticalLine;k.beginPath(),k.moveTo(t,0),k.lineTo(t,te.height),k.stroke()}if(Ke.horizontalLine){let{y:t}=Ke.horizontalLine;k.beginPath(),k.moveTo(0,t),k.lineTo(te.width,t),k.stroke()}k.restore()}if(z.length>0){for(let t of z)fr(k,t,Et,ta);if(gr&&z.length>0){let t=da(z);t&&t.w>=24&&t.h>=24&&(z.length>1&&(k.globalAlpha=.6,k.beginPath(),k.rect(t.x,t.y,t.w,t.h),k.strokeStyle=Et,k.lineWidth=1,k.setLineDash([4,4]),k.stroke(),k.setLineDash([]),k.globalAlpha=1),oa(k,t,1))}}e&&(wt=requestAnimationFrame(ua))}function mr(e,t){let n=e.current,o=e.target,r=Tt(n.x,o.x,t),i=Tt(n.y,o.y,t),a=Tt(n.w,o.w,t),s=Tt(n.h,o.h,t),c=Tt(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<_n&&Math.abs(i-o.y)<_n&&Math.abs(a-o.w)<_n&&Math.abs(s-o.h)<_n&&Math.abs(c-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=s,e.opacity=c,!0)}function fr(e,t,n,o){let{x:r,y:i,w:a,h:s}=t.current;if(a<=0||s<=0)return;let c=Math.min(t.borderRadius,a/2,s/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,a,s,c):e.rect(r,i,a,s),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function pa(e,t,n,o){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+n,y:t},{corner:"br",x:e+n,y:t+o},{corner:"bl",x:e,y:t+o}]}function oa(e,t,n){if(t.w<24||t.h<24)return;e.globalAlpha=n;let o=pa(t.x,t.y,t.w,t.h);for(let r of o)e.beginPath(),e.arc(r.x,r.y,ic,0,Math.PI*2),e.fillStyle=ac,e.fill(),e.strokeStyle=sc,e.lineWidth=lc,e.stroke();e.globalAlpha=1}var cc=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],dc=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],uc=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],pc=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],mc=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],Pe=[...cc,...dc,...uc,...pc,...mc];Y();var fc=new Set(["auto","none","normal","inherit","initial"]);function ma(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let s=document.createElement("input");s.type="text",s.className="prop-input",s.style.cssText="width:60px; cursor:text;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${x};`,a.appendChild(s),a.appendChild(c);let u=new Map(t);function d(){return u.get(r.key)??r.defaultValue}function p(f){let m=parseFloat(f);s.value=isNaN(m)?f:String(m);try{let y=li(i,f).find(L=>L.cssValue===f);y?.token?c.textContent=`${r.tailwindPrefix}-${y.token}`:c.textContent=""}catch{c.textContent=""}}return s.addEventListener("blur",()=>{let f=s.value.trim(),m=parseFloat(f);if(isNaN(m))fc.has(f)?(u.set(r.key,f),p(f),n(r.key,f),o()):p(d());else{let y=f.match(/(px|rem|em|%|vw|vh|ch)$/)?f:`${m}px`;u.set(r.key,y),p(y),n(r.key,y),o()}}),s.addEventListener("keydown",f=>{f.key==="Enter"?s.blur():f.key==="Escape"&&(p(d()),s.blur())}),p(d()),{element:a,setValue(f,m){f===r.key&&(u.set(f,m),p(m))},destroy(){}}}Y();function fa(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${l.bgTertiary};
    border-radius:${N.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let s=t.get(r.key)??r.defaultValue,c=[];function u(d){s=d;for(let{btn:p,value:f,opt:m}of c){let h=f===d;p.style.background=h?l.accent:"transparent",p.style.color=h?l.textOnAccent:l.textSecondary,p.title=h&&m.tailwindValue?`${m.label} (${m.tailwindValue})`:m.label}}for(let d of i){let p=document.createElement("button");p.style.cssText=`
      display:flex;
      align-items:center;
      justify-content:center;
      padding:2px 6px;
      border:none;
      border-radius:${N.xs};
      font-family:${x};
      font-size:10px;
      cursor:pointer;
      background:transparent;
      color:${l.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g," "),p.textContent=d.icon??d.label,p.title=d.label,p.addEventListener("click",()=>{u(d.value),n(r.key,d.value),o()}),c.push({btn:p,value:d.value,opt:d}),a.appendChild(p)}return u(s),{element:a,setValue(d,p){d===r.key&&u(p)},destroy(){}}}Y();Y();function tn(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,s=0;a!==0&&(r===t?s=((n-o)/a+(n<o?6:0))*60:r===n?s=((o-t)/a+2)*60:s=((t-n)/a+4)*60);let c=r===0?0:a/r*100,u=r*100;return{h:s,s:c,v:u}}function Fn(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),s=o*(1-i*n),c=o*(1-(1-i)*n),u,d,p;switch(r%6){case 0:u=o,d=c,p=a;break;case 1:u=s,d=o,p=a;break;case 2:u=a,d=o,p=c;break;case 3:u=a,d=s,p=o;break;case 4:u=c,d=a,p=o;break;case 5:u=o,d=a,p=s;break;default:u=0,d=0,p=0}let f=m=>Math.round(m*255).toString(16).padStart(2,"0");return`#${f(u)}${f(d)}${f(p)}`}var Ze=null;function nn(e){St();let t=X();if(!t)return;let n=document.createElement("div");n.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${O.lg};
    border-radius: ${N.md};
    font-family: ${x};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${M.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let b=n.getBoundingClientRect();b.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-b.width-8}px`),b.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-b.height-8}px`),n.style.opacity="1"});let o=tn(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let b=gc(["Fill","Text"],0,T=>{r=T===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(b)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),s=document.createElement("div");s.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${O.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(s),n.appendChild(c);function u(){let b=o.h,T=a.createLinearGradient(0,0,176,0);T.addColorStop(0,`hsl(${b}, 0%, 100%)`),T.addColorStop(1,`hsl(${b}, 100%, 50%)`),a.fillStyle=T,a.fillRect(0,0,176,120);let _=a.createLinearGradient(0,0,0,120);_.addColorStop(0,"rgba(0,0,0,0)"),_.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=_,a.fillRect(0,0,176,120);let Q=o.s/100*176,ee=(1-o.v/100)*120;s.style.left=`${Q}px`,s.style.top=`${ee}px`}let d=!1;i.addEventListener("mousedown",b=>{d=!0,p(b)});function p(b){let T=i.getBoundingClientRect(),_=Math.max(0,Math.min(176,b.clientX-T.left)),Q=Math.max(0,Math.min(120,b.clientY-T.top));o.s=_/176*100,o.v=(1-Q/120)*100,u(),P()}let f=document.createElement("canvas");f.width=176,f.height=14,f.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let m=f.getContext("2d"),h=document.createElement("div");h.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${O.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let y=document.createElement("div");y.style.cssText="position:relative;width:176px;height:14px;",y.appendChild(f),y.appendChild(h),n.appendChild(y);function L(){let b=m.createLinearGradient(0,0,176,0);for(let T=0;T<=6;T++)b.addColorStop(T/6,`hsl(${T*60}, 100%, 50%)`);m.fillStyle=b,m.fillRect(0,0,176,14),h.style.left=`${o.h/360*176}px`}let S=!1;f.addEventListener("mousedown",b=>{S=!0,H(b)});function H(b){let T=f.getBoundingClientRect(),_=Math.max(0,Math.min(176,b.clientX-T.left));o.h=_/176*360,L(),u(),P()}let $=document.createElement("input");$.type="text",$.value=Fn(o),$.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: ${N.sm};
    color: ${l.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,$.addEventListener("keydown",b=>{b.key==="Enter"&&$.blur(),b.stopPropagation()}),$.addEventListener("blur",()=>{let b=$.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(b)){let T=b.startsWith("#")?b:`#${b}`;o=tn(T),u(),L(),P()}else $.value=Fn(o)}),n.appendChild($);let V=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],C=document.createElement("div");C.style.cssText="display:flex;gap:4px;justify-content:center;";for(let b of V){let T=document.createElement("button");T.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${b};
      border: 1px solid ${l.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${M.fast};
    `,T.addEventListener("mouseenter",()=>{T.style.boxShadow=O.sm}),T.addEventListener("mouseleave",()=>{T.style.boxShadow="none"}),T.addEventListener("click",()=>{o=tn(b),u(),L(),$.value=b,P()}),C.appendChild(T)}if(n.appendChild(C),e.projectColors&&e.projectColors.length>0){let b=document.createElement("div");b.textContent="Project",b.style.cssText=`
      font-size: 10px;
      color: ${l.textSecondary};
      font-family: ${x};
      margin-top: 2px;
    `,n.appendChild(b);let T=document.createElement("div");T.style.cssText="display:flex;gap:4px;flex-wrap:wrap;max-height:48px;overflow-y:auto;";for(let{token:_,hex:Q}of e.projectColors){let ee=document.createElement("button");ee.title=_,ee.style.cssText=`
        width: 12px; height: 12px; border-radius: 50%;
        background: ${Q};
        border: 1px solid ${l.border};
        cursor: pointer; padding: 0;
        transition: box-shadow ${M.fast};
      `,ee.addEventListener("mouseenter",()=>{ee.style.boxShadow=O.sm}),ee.addEventListener("mouseleave",()=>{ee.style.boxShadow="none"}),ee.addEventListener("click",()=>{o=tn(Q),u(),L(),$.value=Q,P(),e.onPickedToken?.(_)}),T.appendChild(ee)}n.appendChild(T)}function P(){let b=Fn(o);$.value=b,e.onColorChange(b),e.onPickedToken?.(void 0)}t.appendChild(n),Ze=n,u(),L();let le=b=>{d&&p(b),S&&H(b)},ce=()=>{d=!1,S=!1};document.addEventListener("mousemove",le),document.addEventListener("mouseup",ce);let R=b=>{b.key==="Escape"&&St()};document.addEventListener("keydown",R,!0);let G=b=>{Ze&&!b.composedPath().includes(Ze)&&St()};setTimeout(()=>document.addEventListener("mousedown",G,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",le),document.removeEventListener("mouseup",ce),document.removeEventListener("keydown",R,!0),document.removeEventListener("mousedown",G,!0)},n._onClose=e.onClose}function St(){Ze&&(Ze._cleanup?.(),Ze._onClose?.(),Ze.remove(),Ze=null)}function gc(e,t,n){let o=document.createElement("div");o.style.cssText=`
    display: flex;
    background: ${l.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;let r=[];for(let i=0;i<e.length;i++){let a=document.createElement("button");a.textContent=e[i],a.style.cssText=`
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i===t?l.bgPrimary:"transparent"};
      box-shadow: ${i===t?O.sm:"none"};
      color: ${i===t?l.textPrimary:l.textSecondary};
      font-family: ${x}; font-size: 12px; cursor: pointer;
      transition: background ${M.fast}, color ${M.fast};
    `,a.addEventListener("click",()=>{r.forEach((s,c)=>{s.style.background=c===i?l.bgPrimary:"transparent",s.style.boxShadow=c===i?O.sm:"none",s.style.color=c===i?l.textPrimary:l.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var xr=null;function hc(){return xr||(xr=document.createElement("canvas").getContext("2d")),xr}function ga(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${N.sm};
    border:1px solid ${l.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("input");s.type="text",s.placeholder="#rrggbb",s.className="prop-input",s.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${x};`,i.appendChild(a),i.appendChild(s),i.appendChild(c);let u=t.get(r.key)??r.defaultValue,d=!1;function p(h){let y=h.trim().toLowerCase();if(y==="transparent")return"transparent";if(y==="inherit"||y==="currentcolor"||y==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(y))return y;let L=hc();L.fillStyle="#000000",L.fillStyle=y;let S=L.fillStyle;if(S.startsWith("#"))return S;let H=S.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(H){let $=parseInt(H[1],10),V=parseInt(H[2],10),C=parseInt(H[3],10);return`#${((1<<24)+($<<16)+(V<<8)+C).toString(16).slice(1)}`}return"#000000"}function f(h){u=h,s.value=h,h==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=h;try{let y=Vt(),L=En(h,y.colorsReverse);L?c.textContent=`${r.tailwindPrefix??"bg"}-${L}`:c.textContent=""}catch{c.textContent=""}}function m(){if(d)return;let h=s.value.trim();if(!h){f(u);return}let y=p(h);f(y),n(r.key,y),o()}return a.addEventListener("click",()=>{if(d){St(),d=!1;return}let h=a.getBoundingClientRect();d=!0,nn({initialColor:p(u),position:{x:h.left-210,y:h.top},showPropertyToggle:!1,onColorChange:y=>{f(y),n(r.key,y)},onClose:()=>{d=!1,o()}})}),s.addEventListener("keydown",h=>{h.key==="Enter"?(m(),s.blur()):h.key==="Escape"&&(f(u),s.blur())}),s.addEventListener("blur",()=>{m()}),s.addEventListener("input",()=>{let h=s.value.trim(),y=p(h);a.style.background=y}),f(u),{element:i,setValue(h,y){h===r.key&&f(y)},destroy(){d&&(St(),d=!1)}}}Y();function ha(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function ba(e,t,n,o){let r=new Map(t),i=[];for(let w of e){let E=ha(w.key);E&&i.push({descriptor:w,...E})}let a=document.createElement("div");a.style.cssText=`
    display:flex;
    flex-direction:column;
    gap:4px;
    font-family:${x};
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
  `.trim().replace(/\n\s*/g," "),d.textContent="content";let p=[];function f(w){let E=document.createElement("span"),me=r.get(w.key)??w.defaultValue;return E.textContent=H(me),E.title=w.label,E.style.cssText=`
      cursor:pointer;
      color:${l.textPrimary};
      font-size:10px;
      font-family:${x};
      padding:1px 4px;
      border-radius:3px;
      text-align:center;
      transition:background 100ms ease;
      display:inline-block;
      min-width:18px;
    `.trim().replace(/\n\s*/g," "),E.addEventListener("mouseenter",()=>{E.style.background=l.bgTertiary}),E.addEventListener("mouseleave",()=>{(document.activeElement!==m||m.dataset.key!==w.key)&&(E.style.background="transparent")}),E.addEventListener("click",()=>{L(w,E)}),p.push({key:w.key,span:E,descriptor:w}),E}let m=document.createElement("input");m.type="text",m.className="prop-input",m.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(m);let h=null,y=null;function L(w,E){h&&h!==w&&S(),h=w,y=E,m.dataset.key=w.key;let me=r.get(w.key)??w.defaultValue;m.value=H(me);let ne=0,tt=0,Ue=E;for(;Ue&&Ue!==a;)ne+=Ue.offsetLeft,tt+=Ue.offsetTop,Ue=Ue.offsetParent;m.style.display="block",m.style.left=`${ne}px`,m.style.top=`${tt}px`;let si=E.getBoundingClientRect();m.style.width=`${Math.max(40,si.width+10)}px`,m.focus(),m.select()}function S(){if(!h||!y)return;let w=m.value.trim(),E=h,me=y,ne,tt=parseFloat(w),Ue=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(tt)?Ue.has(w)?ne=w:ne=r.get(E.key)??E.defaultValue:ne=w.match(/(px|rem|em|%|vw|vh|ch)$/)?w:`${tt}px`,r.set(E.key,ne),me.textContent=H(ne),me.style.background="transparent",m.style.display="none",m.dataset.key="",h=null,y=null,n(E.key,ne),o()}m.addEventListener("keydown",w=>{if(w.key==="Enter")S();else if(w.key==="Escape"){if(h&&y){let E=r.get(h.key)??h.defaultValue;y.textContent=H(E)}m.style.display="none",m.dataset.key="",h=null,y=null}}),m.addEventListener("blur",()=>{S()});function H(w){let E=parseFloat(w);return isNaN(E)?w:E===Math.round(E)?String(Math.round(E)):w}function $(w){let E=document.createElement("span");return E.textContent=w,E.style.cssText=`
      font-size:9px;
      color:${l.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),E}function V(w,E){return i.find(me=>me.layer===w&&me.side===E)}function C(w,E){let me=V(w,E);if(!me){let ne=document.createElement("span");return ne.textContent="-",ne.style.cssText=`text-align:center; color:${l.textTertiary};`,ne}return f(me.descriptor)}let P=C("padding","top");P.style.gridRow="1",P.style.gridColumn="2",P.style.textAlign="center";let le=C("padding","left");le.style.gridRow="2",le.style.gridColumn="1";let ce=C("padding","right");ce.style.gridRow="2",ce.style.gridColumn="3";let R=C("padding","bottom");R.style.gridRow="3",R.style.gridColumn="2",R.style.textAlign="center",d.style.gridRow="2",d.style.gridColumn="2",u.appendChild(P),u.appendChild(le),u.appendChild(d),u.appendChild(ce),u.appendChild(R);let G=document.createElement("div");G.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let b=C("margin","top");b.style.gridRow="1",b.style.gridColumn="2",b.style.textAlign="center";let T=C("margin","left");T.style.gridRow="2",T.style.gridColumn="1";let _=C("margin","right");_.style.gridRow="2",_.style.gridColumn="3";let Q=C("margin","bottom");Q.style.gridRow="3",Q.style.gridColumn="2",Q.style.textAlign="center";let ee=document.createElement("div");ee.style.cssText="grid-row:2; grid-column:2;",ee.appendChild(u),G.appendChild(b),G.appendChild(T),G.appendChild(ee),G.appendChild(_),G.appendChild(Q);let Cn=$("margin"),el=$("padding"),Tn=document.createElement("div");return Tn.style.cssText="display:flex; gap:8px; padding:0 4px;",Tn.appendChild(Cn),Tn.appendChild(el),c.appendChild(G),s.appendChild(c),a.appendChild(Tn),a.appendChild(s),{element:a,setValue(w,E){if(!ha(w))return;r.set(w,E);let ne=p.find(tt=>tt.key===w);ne&&(ne.span.textContent=H(E))},destroy(){}}}Y();var Vn=new Set;function ya(e){return Vn.has(e)}var zn=[];function va(e){return zn.push(e),()=>{let t=zn.indexOf(e);t>=0&&zn.splice(t,1)}}var bc={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},yc={"number-scrub":ma,segmented:fa,"color-swatch":ga,"box-model":ba},vc=`
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
    font-family: ${x};
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
    font-family: ${x};
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
    font-family: ${x};
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
    font-family: ${x};
    font-size: 11px;
    color: ${l.textTertiary};
    cursor: pointer;
    text-align: center;
    user-select: none;
  }
  .prop-show-all:hover {
    color: ${l.accent};
  }
`;function xc(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function Cc(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function Tc(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}var Ec=new Set(["flexDirection","justifyContent","alignItems","gap"]);function wc(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function Cr(e,t,n,o,r){let i=document.createElement("div");i.className="prop-sections";let a=document.createElement("style");a.textContent=vc,i.appendChild(a);let s=[],c=Cc(e);for(let[u,d]of c){let p=u==="layout"&&!wc(t)?d.filter(S=>!Ec.has(S.key)):d;if(p.length===0)continue;let f=document.createElement("div");f.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${bc[u]}</span>${xc()}`;let h=document.createElement("div");h.className="prop-section-body";let y=Vn.has(u);if(y){let S=m.querySelector(".prop-section-chevron");S&&S.classList.add("collapsed"),h.classList.add("collapsed")}m.addEventListener("click",()=>{if(y=!y,y)Vn.add(u);else{Vn.delete(u);for(let H of zn)H(u)}let S=m.querySelector(".prop-section-chevron");S&&S.classList.toggle("collapsed",y),h.classList.toggle("collapsed",y)}),f.appendChild(m);let L=Tc(p);for(let S of L){let H=yc[S.controlType];if(!H)continue;let $=H(S.descriptors,t,n,o);if(S.descriptors.length>1||S.controlType==="box-model")h.appendChild($.element);else{let V=document.createElement("div");V.className="prop-control-row";let C=document.createElement("span");C.className="prop-control-label",C.textContent=S.descriptors[0].label,C.title=S.descriptors[0].label;let P=document.createElement("div");P.className="prop-control-value",P.appendChild($.element),V.appendChild(C),V.appendChild(P),h.appendChild(V)}s.push($)}f.appendChild(h),i.appendChild(f)}if(r){let u=document.createElement("div");u.className="prop-show-all",u.textContent="Show all properties",u.addEventListener("click",r),i.appendChild(u)}return{container:i,controls:s}}Y();var Sc=300,xa=260,Ca=380,Ta="frameup-sidebar-width",Mc=4,Lc=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${l.bgPrimary};
    border-left: 1px solid ${l.border};
    box-shadow: ${O.lg};
    z-index: 2147483645;
    font-family: ${x};
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
    width: ${Mc}px;
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
    font-family: ${x};
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
    font-family: ${x};
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
`;function Nc(){try{let e=localStorage.getItem(Ta);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=xa&&t<=Ca)return t}}catch{}return Math.min(Sc,Math.floor(window.innerWidth*.22))}function kc(e){try{localStorage.setItem(Ta,String(e))}catch{}}function Ea(e,t){let n=document.createElement("style");n.textContent=Lc,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${Nc()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let s=document.createElement("div");s.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let u=document.createElement("div");u.className="prop-sidebar-file-path",a.appendChild(s),a.appendChild(u);let d=document.createElement("button");d.className="prop-sidebar-close",d.title="Collapse panel",d.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="8,2 4,6 8,10"/></svg>',i.appendChild(a),i.appendChild(d),o.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",o.appendChild(p);let f=document.createElement("div");f.className="prop-sidebar-content",o.appendChild(f),e.appendChild(o);let m=!1,h=0,y=0;r.addEventListener("pointerdown",R=>{R.preventDefault(),R.stopPropagation(),m=!0,h=R.clientX,y=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(R.pointerId)}),r.addEventListener("pointermove",R=>{if(!m)return;let G=h-R.clientX,b=Math.max(xa,Math.min(Ca,y+G));o.style.width=`${b}px`});let L=()=>{m&&(m=!1,r.classList.remove("active"),kc(o.offsetWidth))};r.addEventListener("pointerup",L),r.addEventListener("pointercancel",L),o.addEventListener("pointerdown",R=>R.stopPropagation()),o.addEventListener("mousedown",R=>R.stopPropagation()),o.addEventListener("click",R=>R.stopPropagation()),o.addEventListener("mouseup",R=>R.stopPropagation()),d.addEventListener("click",()=>{$(),t&&t()});let S=!1;function H(R,G,b,T){s.textContent=`<${R}>`,s.appendChild(c),u.textContent=`${G}:${b}`,u.title=`${G}:${b}`,f.innerHTML="",f.appendChild(T),S||(S=!0,o.offsetHeight,o.classList.add("visible"))}function $(){S&&(S=!1,o.classList.remove("visible"))}function V(R){f.innerHTML="",f.appendChild(R)}function C(R,G,b){p.innerHTML="";let T=document.createElement("span");T.className="prop-sidebar-warning-text",T.textContent=R;let _=document.createElement("button");_.className="prop-sidebar-warning-btn",_.textContent=G,_.addEventListener("click",Q=>{Q.stopPropagation(),b()}),p.appendChild(T),p.appendChild(_),p.style.display="flex"}function P(){p.style.display="none",p.innerHTML=""}function le(){c.classList.add("active")}function ce(){c.classList.remove("active")}return{show:H,hide:$,isVisible:()=>S,getElement:()=>o,replaceContent:V,showWarning:C,clearWarning:P,showSaving:le,hideSaving:ce}}Me();ot();xt();var Rr=new Map(Pe.map(e=>[e.key,e]));var Pc=new Set(["layout","spacing","size"]),Va=new Set(["typography","background"]),Oc=new Set(["h1","h2","h3","h4","h5","h6","p","span","a","button","label","li","td","th","blockquote","figcaption"]);function Ba(e){let t=new Set(["spacing","size","background"]),o=getComputedStyle(e).display;(o==="flex"||o==="inline-flex"||o==="grid"||o==="inline-grid"||e.children.length>0)&&t.add("layout");let r=e.tagName.toLowerCase();return(Array.from(e.childNodes).some(a=>a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()??"").length>0)||Oc.has(r))&&t.add("typography"),t}var Ac=5e3,g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1},lt=[],F,za,ge=null,$c=300,Te=null,Lt=null,eo=new MutationObserver(()=>{g.selectedElement&&!document.contains(g.selectedElement)&&(clearTimeout(za),za=setTimeout(()=>{Hc()},80))});function Hc(){let e=g.elementIdentity,t=g.componentInfo;if(!e||!t){kt();return}let n=Ic(e);if(n){Nt(n,t);return}_c(e).then(o=>{o?Nt(o,t):kt()})}function Ic(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);for(;o;){if(fe(o)){let r=o._debugSource,i=se(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function _c(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);if(!o)continue;let r=await ke(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let s="";if(i.fileName){let c=Se(i.fileName);Re(c)&&(s=c)}if(s&&e.filePath.endsWith(s)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}function Dc(e,t){let n=getComputedStyle(e),o=new Map;for(let r of Pe){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function Fc(e){if(!g.selectedElement)return;let t=getComputedStyle(g.selectedElement);for(let n of Pe){if(n.group!==e||g.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;g.currentValues.set(n.key,r),g.originalValues.get(n.key)===n.defaultValue&&g.originalValues.set(n.key,r);for(let i of lt)i.setValue(n.key,r)}}function ln(){for(let e of lt)e.destroy();lt=[]}function Pr(){if(!g.selectedElement||!g.componentInfo)return;ln();let e=g.showAllGroups?null:Ba(g.selectedElement),t=e?Pe.filter(a=>e.has(a.group)):Pe,o=e!==null&&t.length<Pe.length?()=>ja(!0):void 0,{container:r,controls:i}=Cr(t,g.currentValues,cn,to,o);lt=i,F.replaceContent(r)}function to(){ge&&clearTimeout(ge),ge=setTimeout(()=>{ge=null,Ar()},$c)}function Or(){ge&&(clearTimeout(ge),ge=null),Lt&&(Lt(),Lt=null),Te&&(clearTimeout(Te.timeoutId),Te=null),g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1}}function Wa(e){F=Ea(e,()=>{no(),ln(),Or()}),ui((t,n,o)=>{if(F&&F.hideSaving(),Te)if(clearTimeout(Te.timeoutId),t)Te=null;else{let{batch:r,previousOriginals:i}=Te;Te=null;for(let[a]of r){let s=i.get(a);s!==void 0&&g.originalValues.set(a,s)}if(g.selectedElement){for(let[a]of r){g.selectedElement.style[a]="",g.activeOverrides.delete(a);let s=g.originalValues.get(a);s!==void 0&&g.currentValues.set(a,s)}for(let a of lt)for(let[s]of r){let c=g.originalValues.get(s);c!==void 0&&a.setValue(s,c)}}if(F){let s={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";F.showWarning(s,"Dismiss",()=>F.clearWarning())}}else if(!t&&F){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";F.showWarning(i,"Dismiss",()=>F.clearWarning())}})}function Nt(e,t){g.pendingBatch.size>0&&Ar(),ln(),g.showAllGroups=!1,g.selectedElement=e,g.componentInfo=t,g.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(Pc);for(let d of Va)ya(d)||n.add(d);let o=Dc(e,n);g.currentValues=o,g.originalValues=new Map(o),g.activeOverrides=new Map,g.pendingBatch=new Map,Lt&&Lt(),Lt=va(d=>{Va.has(d)&&Fc(d)});let r=g.showAllGroups?null:Ba(e),i=r?Pe.filter(d=>r.has(d.group)):Pe,s=r!==null&&i.length<Pe.length?()=>ja(!0):void 0,{container:c,controls:u}=Cr(i,g.currentValues,cn,to,s);lt=u,eo.disconnect(),eo.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),F.show(t.componentName,t.filePath,t.lineNumber,c)}function cn(e,t){let n=Rr.get(e);if(!n||!g.selectedElement)return;g.selectedElement.style[n.key]=t,g.activeOverrides.set(e,t),g.currentValues.set(e,t);let o=Vt(),r=n.tailwindScale+"Reverse",i=o[r],a=i?En(t,i):null;if(!a&&n.enumValues){let s=n.enumValues.find(c=>c.value===t);s&&(a=s.tailwindValue)}if(g.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:g.originalValues.get(e)||n.defaultValue}),e==="display")if(Pr(),t==="none"){let s=g.originalValues.get("display")||"block";F.showWarning("Element hidden","Restore",()=>{g.selectedElement&&(g.selectedElement.style.display=s),g.activeOverrides.delete("display"),g.currentValues.set("display",s),g.pendingBatch.delete("display"),Pr(),F.clearWarning()})}else F.clearWarning()}function Ar(){if(g.pendingBatch.size===0||!g.componentInfo)return;let e=g.componentInfo.filePath,t=g.componentInfo.lineNumber,n=g.componentInfo.columnNumber-1;if(g.pendingBatch.size===1){let a=[...g.pendingBatch.values()][0],s=Rr.get(a.property);ve({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:n,...a,framework:"tailwind",classPattern:s?.classPattern,standalone:s?.standalone})}else ve({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:n,updates:[...g.pendingBatch.values()].map(a=>{let s=Rr.get(a.property);return{...a,classPattern:s?.classPattern,standalone:s?.standalone}}),framework:"tailwind"});g.selectedElement&&g.elementIdentity&&Kn({type:"propertyChange",elementIdentity:g.elementIdentity,element:g.selectedElement,overrides:[...g.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),F&&F.showSaving();let o=new Map;for(let[a]of g.pendingBatch)o.set(a,g.originalValues.get(a)||"");for(let[a,s]of g.pendingBatch)g.originalValues.set(a,s.value);let r=new Map(g.pendingBatch),i=setTimeout(()=>{Te&&Te.batch===r&&(Te=null,F&&F.hideSaving())},Ac);Te={batch:r,previousOriginals:o,timeoutId:i},g.pendingBatch.clear()}function no(){if(g.selectedElement){for(let[e]of g.activeOverrides)g.selectedElement.style[e]="";for(let[e,t]of g.originalValues)g.currentValues.set(e,t);for(let e of lt)for(let[t,n]of g.originalValues)e.setValue(t,n);g.activeOverrides.clear(),g.pendingBatch.clear()}}function kt(){ge&&(clearTimeout(ge),ge=null),eo.disconnect(),no(),ln(),F&&F.hide(),Or()}function Ga(){ge&&(clearTimeout(ge),ge=null),eo.disconnect(),Ar(),ln(),F&&F.hide(),Or()}function Ya(){return g.activeOverrides.size>0}function ja(e){g.showAllGroups=e,Pr()}or()||rr({onCommitFiberRoot(){}});async function Vc(e){let t=oe(e);if(!t)return null;try{let n=await ke(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||_e(i))continue;let a="";if(r.fileName){let s=Se(r.fileName);Re(s)&&(a=s)}o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0)return{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}}catch(n){console.warn("[FrameUp] getOwnerStack failed, falling back to fiber walk:",n)}return Ua(e,t)}function Ua(e,t){let n=[],o=t;for(;o;){if(fe(o)){let r=se(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",s=0,c=0;i&&(a=i.fileName||"",s=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!_e(r)&&n.push({componentName:r,filePath:a,lineNumber:s,columnNumber:c})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function Xa(e){let t=oe(e);return t?Ua(e,t):null}var j=null,W=null,Ge=!1,Pt=!1,A=new Map,v=null,Le=null,Be="idle",B=null,Rt=null,Ee=null,co=null,dn=0,un=0,Je=[],oo=!1,zc=null,Bc=null,Wc=null,Gc=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${O.sm};
    border-radius: ${N.sm};
    padding: 4px 8px;
    z-index: 2147483646;
    font-family: ${x};
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
`;function Ka(e){zc=e.onStart,Bc=e.onMove,Wc=e.onEnd}function Za(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=Gc,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),Le=document.createElement("div"),Le.className="marquee-box",e.appendChild(Le),Ge=!0,document.addEventListener("mousedown",ro,!0),document.addEventListener("mousemove",io,!0),document.addEventListener("mouseup",ao,!0),document.addEventListener("keydown",lo,!0),document.addEventListener("click",so,!0),document.addEventListener("scroll",We,!0),window.addEventListener("resize",We),Pt=!0}function ro(e){if(!Ge||e.metaKey||e.ctrlKey)return;let t=document.elementFromPoint(e.clientX,e.clientY);if(t?.closest("#frameup-root"))return;if(j||A.size>0){let o=yr(e.clientX,e.clientY);if(o){e.preventDefault(),e.stopPropagation();let r=sa();if(Ee=o,co=r?{...r}:null,A.size>0){Je=[];for(let[i]of A){let a=getComputedStyle(i);Je.push({element:i,width:parseFloat(a.width)||i.offsetWidth,height:parseFloat(a.height)||i.offsetHeight})}dn=0,un=0}else if(W){let i=getComputedStyle(W);dn=parseFloat(i.width)||W.offsetWidth,un=parseFloat(i.height)||W.offsetHeight,Je=[]}B={x:e.clientX,y:e.clientY},Be="resize-drag";return}}if(e.preventDefault(),e.stopPropagation(),!t||!Jt(t)){(j||A.size>0)&&(Ga(),j=null,W=null,po(),it(null),v&&(v.classList.remove("visible"),v.style.display="none"),He(null));return}B={x:e.clientX,y:e.clientY},Rt=t,oo=e.shiftKey,Be="pending"}function io(e){if(Ge){if(Be==="resize-drag"&&Ee&&B&&co){e.preventDefault(),e.stopPropagation();let t=e.clientX-B.x,n=e.clientY-B.y;if(Je.length>0){for(let o of Je){let r=o.width,i=o.height;Ee==="tr"||Ee==="br"?r=Math.max(10,o.width+t):r=Math.max(10,o.width-t),Ee==="bl"||Ee==="br"?i=Math.max(10,o.height+n):i=Math.max(10,o.height-n),o.element.style.width=`${Math.round(r)}px`,o.element.style.height=`${Math.round(i)}px`}pn()}else{let o=dn,r=un;Ee==="tr"||Ee==="br"?o=Math.max(10,dn+t):o=Math.max(10,dn-t),Ee==="bl"||Ee==="br"?r=Math.max(10,un+n):r=Math.max(10,un-n),o=Math.round(o),r=Math.round(r),cn("width",`${o}px`),cn("height",`${r}px`),We()}return}if(Be==="pending"&&B){let t=Math.abs(e.clientX-B.x),n=Math.abs(e.clientY-B.y);(t>10||n>10)&&(Be="marquee")}if(Be==="marquee"&&B&&Le){let t=Math.min(e.clientX,B.x),n=Math.min(e.clientY,B.y),o=Math.abs(e.clientX-B.x),r=Math.abs(e.clientY-B.y);Le.style.display="block",Le.style.left=`${t}px`,Le.style.top=`${n}px`,Le.style.width=`${o}px`,Le.style.height=`${r}px`;return}if(Be==="idle"){if(j&&W||A.size>0){let i=yr(e.clientX,e.clientY);if(i){document.body.style.cursor=i==="tl"||i==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let n=document.elementFromPoint(e.clientX,e.clientY);if(!n||!Jt(n)){Dn(null);return}let o=n.getBoundingClientRect(),r=parseFloat(getComputedStyle(n).borderRadius)||4;Dn(o,r+2)}}}function ao(e){if(!Ge)return;let t=Be;if(Be="idle",t==="resize-drag"){document.body.style.cursor="",Ee=null,co=null,B=null,Je.length>0?Je=[]:to();return}if(t==="marquee"&&B){Le&&(Le.style.display="none"),Yc(Math.min(e.clientX,B.x),Math.min(e.clientY,B.y),Math.max(e.clientX,B.x),Math.max(e.clientY,B.y)),B=null,Rt=null,oo=!1;return}Rt&&(oo?jc(Rt):(po(),uo(Rt))),B=null,Rt=null,oo=!1}async function uo(e,t){try{let n=e.getBoundingClientRect();W=e,$r(n,{}),Uc();let o=await Vc(e);if(console.log("[FrameUp] selectElement:",e.tagName,"\u2192",o?.componentName,o?.filePath,"stack:",o?.stack?.map(r=>r.componentName)),!o)return;if(j={tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber,columnNumber:o.columnNumber,stack:o.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}},v){let r=o.filePath?`${o.filePath}:${o.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${o.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||Nt(e,j),He({tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber})}catch(n){console.error("[FrameUp] selectElement error:",n)}}function Yc(e,t,n,o){let r=Qi({x:e,y:t,width:n-e,height:o-t});if(r.length!==0){kt(),j=null,W=null,it(null),v&&(v.classList.remove("visible"),v.style.display="none"),A.clear();for(let i of r.slice(0,50)){let a=Xa(i);if(!a)continue;let s=i.getBoundingClientRect(),c={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:s.top,left:s.left,width:s.width,height:s.height}};A.set(i,{element:i,info:c})}if(A.size!==0){if(A.size===1){let[i,a]=[...A.entries()][0];A.clear(),W=i,j=a.info;let s=i.getBoundingClientRect();if($r(s,j),v){let c=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${c?`<span class="comp-path">${c}</span>`:""}`}Nt(i,j),He({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}pn(),He(null),v&&(v.innerHTML=`<span class="comp-name">${A.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function jc(e){if(A.has(e)){if(A.delete(e),A.size===1){let[r,i]=[...A.entries()][0];A.clear(),en(),W=r,j=i.info;let a=r.getBoundingClientRect();if($r(a,j),Nt(r,j),v){let s=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${s?`<span class="comp-path">${s}</span>`:""}`}He({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else A.size===0?(en(),Ye()):(pn(),v&&(v.innerHTML=`<span class="comp-name">${A.size} elements selected</span>`));return}let t=Xa(e);if(!t)return;j&&W&&A.size===0&&(A.set(W,{element:W,info:j}),kt(),j=null,W=null,it(null));let n=e.getBoundingClientRect(),o={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}};A.set(e,{element:e,info:o}),pn(),He(null),v&&(v.innerHTML=`<span class="comp-name">${A.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function po(){A.clear(),en()}function pn(){if(A.size===0){en();return}let e=[];for(let[t]of A){let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:n,borderRadius:o+2})}aa(e)}function so(e){Ge&&(e.metaKey||e.ctrlKey||e.preventDefault())}function lo(e){if(Ge&&e.key==="Escape"){if(A.size>0){po(),v&&(v.classList.remove("visible"),v.style.display="none"),He(null),e.preventDefault();return}if(j){if(Ya()){no(),e.preventDefault();return}Ye(),e.preventDefault()}}}function $r(e,t){if(W){let n=parseFloat(getComputedStyle(W).borderRadius)||4;it(e,n+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function We(){if(A.size>0){pn();return}if(!W||!j)return;let e=W.getBoundingClientRect(),t=parseFloat(getComputedStyle(W).borderRadius)||4;if(it(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function Uc(){Dn(null)}function Ye(){kt(),j=null,W=null,Ee=null,co=null,Je=[],po(),document.body.style.cursor="",it(null),v&&(v.classList.remove("visible"),v.style.display="none"),He(null)}function qa(){return j}function Ja(){Ge=!1,document.removeEventListener("mousedown",ro,!0),document.removeEventListener("mousemove",io,!0),document.removeEventListener("mouseup",ao,!0),document.removeEventListener("keydown",lo,!0),document.removeEventListener("click",so,!0),document.removeEventListener("scroll",We,!0),window.removeEventListener("resize",We),Pt=!1,v?.remove(),v=null}function Hr(e){e&&!Pt?(document.addEventListener("mousedown",ro,!0),document.addEventListener("mousemove",io,!0),document.addEventListener("mouseup",ao,!0),document.addEventListener("keydown",lo,!0),document.addEventListener("click",so,!0),document.addEventListener("scroll",We,!0),window.addEventListener("resize",We),Pt=!0,Ge=!0):!e&&Pt&&(document.removeEventListener("mousedown",ro,!0),document.removeEventListener("mousemove",io,!0),document.removeEventListener("mouseup",ao,!0),document.removeEventListener("keydown",lo,!0),document.removeEventListener("click",so,!0),document.removeEventListener("scroll",We,!0),window.removeEventListener("resize",We),Pt=!1,Ge=!1)}function Qa(){return W??null}async function Ir(e){await uo(e,{skipSidebar:!0})}ot();var pe=null,ue=null,Qe=null,es=null,mn=!1,Ot=null,mo=[],fo=new Map,go=!1,Xc=`
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
`,At=null;function ts(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=Xc,e.appendChild(t),Ka({onStart:Kc,onMove:Zc,onEnd:qc}),$e(n=>{n.type==="reorderComplete"&&(_r(),Ye())})}function Kc(e,t,n){Qe=n,es=t,Ot={x:e.clientX,y:e.clientY},mn=!1,go=!1,mo=[],fo=new Map,At=null;let o=X();if(!o)return;pe=document.createElement("div"),pe.className="drag-preview";let r=t.getBoundingClientRect();pe.style.width=`${r.width}px`,pe.style.height=`${r.height}px`,pe.innerHTML=t.outerHTML,o.appendChild(pe),ue=document.createElement("div"),ue.className="drop-indicator",o.appendChild(ue);let i=n.stack[1];if(!i)return;ve({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=$e(s=>{if(s.type!=="siblingsList")return;a(),mo=s.siblings;let c=document.querySelectorAll("*");for(let u of c){if(u.closest("#frameup-root"))continue;let d=oe(u);if(!d)continue;let p=d;for(;p;){if(fe(p)){let f=p._debugSource||p._debugOwner?._debugSource;if(f){for(let m of s.siblings)f.lineNumber===m.lineNumber&&f.fileName===i.filePath&&fo.set(m.lineNumber,{el:u,rect:u.getBoundingClientRect()});break}}p=p.return}}go=!0})}function Zc(e){if(!Ot)return;let t=Math.abs(e.clientX-Ot.x),n=Math.abs(e.clientY-Ot.y);if(t<5&&n<5||(mn=!0,pe&&(pe.style.display="block",pe.style.left=`${e.clientX+10}px`,pe.style.top=`${e.clientY+10}px`),!go||!Qe))return;let o=null,r=1/0,i=0,a=0,s=0;for(let c of mo){if(c.lineNumber===Qe.lineNumber)continue;let u=fo.get(c.lineNumber);if(!u)continue;let d=u.rect,p=d.top+d.height/2,f=Math.abs(e.clientY-p);f<r&&(r=f,o=c,e.clientY<p?i=d.top-2:i=d.bottom+2,a=d.left,s=d.width)}At=o,o&&ue?(ue.style.display="block",ue.style.top=`${i}px`,ue.style.left=`${a}px`,ue.style.width=`${s}px`):ue&&(ue.style.display="none")}function qc(e){if(!mn||!At||!Qe){_r();return}ve({type:"reorder",filePath:Qe.filePath,fromLine:Qe.lineNumber,toLine:At.lineNumber,fromComponent:Qe.componentName,toComponent:At.componentName}),pe&&(pe.style.display="none"),ue&&(ue.style.display="none"),mn=!1,Ot=null}function _r(){pe?.remove(),ue?.remove(),pe=null,ue=null,Qe=null,es=null,mn=!1,Ot=null,go=!1,mo=[],fo=new Map,At=null}function ns(){_r()}Y();Me();var Dr="http://www.w3.org/2000/svg",$t=null,we=null,Fr=null;function os(){let e=X();e&&($t=document.createElementNS(Dr,"svg"),$t.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),we=document.createElementNS(Dr,"g"),we.setAttribute("class","annotation-root"),$t.appendChild(we),e.appendChild($t),window.addEventListener("scroll",ho,{passive:!0}),Fr=qn(ho),ho())}function ho(){if(!we)return;let{scale:e,offsetX:t,offsetY:n}=ze();we.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function rs(e,t,n,o,r,i){if(!we)return null;let a=document.createElementNS(Dr,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${O.sm};
    padding: 4px 8px;
    border-radius: ${N.sm};
    font-size: ${r}px;
    font-family: ${x};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,s.textContent=o,a.appendChild(s),we.appendChild(a),a}function is(e){if(!we)return;let t=we.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function Vr(){we&&(we.innerHTML="")}function as(){window.removeEventListener("scroll",ho),Fr?.(),Fr=null,$t?.remove(),$t=null,we=null}Wn();Me();Y();fn();ot();xt();Y();ut();Me();Me();rt();var sd=new Set(["IMG","INPUT","VIDEO","IFRAME","CANVAS","SELECT","TEXTAREA","HR","BR","EMBED","OBJECT","PROGRESS"]),q=null,pt="",vo="",Co="",he=null,Zr="",qr=null,yo=null;function xs(){return q!==null}function Cs(){document.addEventListener("dblclick",Es,!0),qr=$e(e=>{e.type==="updateTextComplete"&&ld(e)})}function Ts(){q&&Ls(),document.removeEventListener("dblclick",Es,!0),qr?.(),qr=null}function ld(e){if(!e.success&&e.reason==="no-match"&&yo){let t=yo,n={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,originalText:t.originalText,newText:t.newText},o={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};Lr(n,o,t.originalInnerHTML)}yo=null}function cd(e){return!!(e.scrollHeight>e.clientHeight+4||e.querySelector("br")||getComputedStyle(e).whiteSpace!=="nowrap"&&e.getClientRects().length>1)}async function dd(e){let t=oe(e);if(!t)return null;try{let n=await ke(t);if(n&&n.length>0)for(let o of n){if(!o.functionName)continue;let r=o.functionName;if(r[0]!==r[0].toUpperCase()||_e(r))continue;let i="";if(o.fileName){let a=Se(o.fileName);Re(a)&&(i=a)}return{tagName:e.tagName.toLowerCase(),componentName:r,filePath:i,lineNumber:o.lineNumber??0,columnNumber:o.columnNumber??0,stack:[],boundingRect:e.getBoundingClientRect()}}}catch{}try{let n=t;for(;n;){if(fe(n)){let o=se(n.type),r=n._debugSource||n._debugOwner?._debugSource;if(o&&o[0]===o[0].toUpperCase()&&!_e(o)&&r)return{tagName:e.tagName.toLowerCase(),componentName:o,filePath:r.fileName||"",lineNumber:r.lineNumber||0,columnNumber:r.columnNumber||0,stack:[],boundingRect:e.getBoundingClientRect()}}if(!n.return)break;n=n.return}}catch{}return null}function Es(e){q&&xo();let t=null,n=e.target;n instanceof HTMLElement&&n!==document.documentElement&&n!==document.body&&!n.hasAttribute("data-frameup-interaction")&&!n.closest("#frameup-root")?t=n:t=dt(e.clientX,e.clientY),t&&(sd.has(t.tagName)||t.textContent?.trim()&&(e.preventDefault(),ud(t)))}function ud(e){q=e,pt=e.textContent||"",vo=e.innerHTML,Co=pt,he=null,dd(e).then(n=>{q===e&&(he=n)}),Zr=e.style.outline,e.style.outline=`2px solid ${l.accent}`,e.contentEditable="true",Xr(!1),e.focus();let t=window.getSelection();if(t){t.removeAllRanges();let n=document.createRange();n.selectNodeContents(e),n.collapse(!1),t.addRange(n)}e.addEventListener("blur",Ss),e.addEventListener("keydown",Ms),e.addEventListener("input",ws)}function ws(){q&&(Co=q.textContent||"")}function Ss(){xo()}function Ms(e){if(e.key==="Escape"){e.preventDefault(),xo();return}if(e.key==="Enter"&&q&&!cd(q)){e.preventDefault(),xo();return}e.stopPropagation()}function xo(){if(!q)return;let e=Co;if(e!==pt&&he)if(he.filePath)yo={componentInfo:he,originalText:pt,newText:e,originalInnerHTML:vo,tagName:he.tagName},ve({type:"updateText",filePath:he.filePath,lineNumber:he.lineNumber,columnNumber:he.columnNumber,originalText:pt,newText:e});else{let o={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:he.componentName,filePath:"",lineNumber:0,columnNumber:0,originalText:pt,newText:e},r={componentName:he.componentName,filePath:"",lineNumber:0,columnNumber:0,tagName:he.tagName};Lr(o,r,vo)}let n=q;Ls(),n&&document.contains(n)&&uo(n,{skipSidebar:!1})}function Ls(){q&&(q.removeEventListener("blur",Ss),q.removeEventListener("keydown",Ms),q.removeEventListener("input",ws),q.removeAttribute("contenteditable"),q.style.outline=Zr,hn(Xn()),q=null,pt="",vo="",Co="",he=null,Zr="")}var et={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9093 12.3603L17.0007 20.8537L14.1816 21.8798L11.0902 13.3864L6.91797 16.5422L8.4087 1.63318L19.134 12.0959L13.9093 12.3603Z"></path></svg>',grab:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L16.2426 6.24264L14.8284 7.65685L12 4.82843L9.17157 7.65685L7.75736 6.24264L12 2ZM2 12L6.24264 7.75736L7.65685 9.17157L4.82843 12L7.65685 14.8284L6.24264 16.2426L2 12ZM22 12L17.7574 16.2426L16.3431 14.8284L19.1716 12L16.3431 9.17157L17.7574 7.75736L22 12ZM12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14ZM12 22L7.75736 17.7574L9.17157 16.3431L12 19.1716L14.8284 16.3431L16.2426 17.7574L12 22Z"></path></svg>',move:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 11V8L22 12L18 16V13H13V18H16L12 22L8 18H11V13H6V16L2 12L6 8V11H11V6H8L12 2L16 6H13V11H18Z"></path></svg>',draw:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>',color:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.5222 2 22 5.97778 22 10.8889C22 13.9556 19.5111 16.4444 16.4444 16.4444H14.4778C13.5556 16.4444 12.8111 17.1889 12.8111 18.1111C12.8111 18.5333 12.9778 18.9222 13.2333 19.2111C13.5 19.5111 13.6667 19.9 13.6667 20.3333C13.6667 21.2556 12.9 22 12 22C6.47778 22 2 17.5222 2 12C2 6.47778 6.47778 2 12 2ZM10.8111 18.1111C10.8111 16.0843 12.451 14.4444 14.4778 14.4444H16.4444C18.4065 14.4444 20 12.851 20 10.8889C20 7.1392 16.4677 4 12 4C7.58235 4 4 7.58235 4 12C4 16.19 7.2226 19.6285 11.324 19.9718C10.9948 19.4168 10.8111 18.7761 10.8111 18.1111ZM7.5 12C6.67157 12 6 11.3284 6 10.5C6 9.67157 6.67157 9 7.5 9C8.32843 9 9 9.67157 9 10.5C9 11.3284 8.32843 12 7.5 12ZM16.5 12C15.6716 12 15 11.3284 15 10.5C15 9.67157 15.6716 9 16.5 9C17.3284 9 18 9.67157 18 10.5C18 11.3284 17.3284 12 16.5 12ZM12 9C11.1716 9 10.5 8.32843 10.5 7.5C10.5 6.67157 11.1716 6 12 6C12.8284 6 13.5 6.67157 13.5 7.5C13.5 8.32843 12.8284 9 12 9Z"></path></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6V21H11V6H5V4H19V6H13Z"></path></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.53614 18.8862 7.33243 17.1346 5.86492L15 8V2L21 2L18.5535 4.44656C20.6649 6.28002 22 8.9841 22 12Z"></path></svg>'},Ns=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",To=navigator.platform.includes("Mac")?"Cmd":"Ctrl",ei=[{type:"pointer",icon:et.pointer,label:"Pointer",shortcut:"V"},{type:"grab",icon:et.grab,label:"Grab",shortcut:"G"},{type:"move",icon:et.move,label:"Move",shortcut:"J"},{type:"draw",icon:et.draw,label:"Draw",shortcut:"D"},{type:"text",icon:et.text,label:"Text",shortcut:"T"}],pd=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${N.lg};
    box-shadow: ${O.md};
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    gap: 4px;
    font-family: ${x};
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
    box-shadow: ${O.sm};
    color: ${l.textPrimary};
    padding: 4px 8px;
    border-radius: ${N.sm};
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
    box-shadow: ${O.sm};
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
    font-family: ${x};
    cursor: pointer;
    padding: 0;
    transition: background ${M.fast}, color ${M.fast}, box-shadow ${M.fast};
  }
  .segment.active {
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    box-shadow: ${O.sm};
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
    font-family: ${x};
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
    border-radius: ${N.lg};
    box-shadow: ${O.lg};
    padding: 24px 28px;
    min-width: 320px;
    max-width: 420px;
    font-family: ${x};
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
    font-family: ${x};
    color: ${l.textSecondary};
    box-shadow: 0 1px 0 rgba(0,0,0,0.06);
  }
  .shortcut-plus {
    font-size: 10px;
    color: ${l.textTertiary};
  }
`,be=null,ie=null,wo=new Map,je=null,Jr=null,Qr=null;function ks(e){Jr=e}function Rs(e){Qr=e}function Ps(e){je&&(je.disabled=!e)}function Os(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=pd,e.appendChild(t),be=document.createElement("div"),be.className="tools-panel";let n=[["pointer","grab"],["move"],["draw","text"]];for(let s=0;s<n.length;s++){if(s>0){let c=document.createElement("div");c.className="tool-divider",be.appendChild(c)}for(let c of n[s]){let u=ei.find(f=>f.type===c),d=document.createElement("button");d.className=`tool-btn${u.type==="pointer"?" active":""}`,d.innerHTML=`${u.icon}<span class="tooltip">${u.label}<span class="shortcut-badge">${Ns}${u.shortcut}</span></span>`,d.addEventListener("click",()=>Sr(u.type));let p=null;d.addEventListener("mouseenter",()=>{p=setTimeout(()=>d.classList.add("tooltip-visible"),400)}),d.addEventListener("mouseleave",()=>{p&&clearTimeout(p),d.classList.remove("tooltip-visible")}),be.appendChild(d),wo.set(u.type,d)}}ie=document.createElement("div"),ie.className="sub-options hidden",be.appendChild(ie);let o=document.createElement("div");o.className="tool-divider",be.appendChild(o),je=document.createElement("button"),je.className="action-btn",je.innerHTML=et.undo,je.title="Undo (Ctrl+Z)",je.disabled=!0,je.addEventListener("click",()=>{Qr&&Qr()}),be.appendChild(je);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=et.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{Jr&&Jr()}),be.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=et.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{gs(),i.style.color=fs()?l.accent:""}),be.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8H14V6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5C21 8.433 19.433 10 17.5 10H16V14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5V16H10V17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14H8V10H6.5C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5V8ZM8 8V6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM10 10V14H14V10H10Z"></path></svg>',a.title=`Keyboard Shortcuts (${Ns}/)`,a.addEventListener("click",()=>$s()),be.appendChild(a),e.appendChild(be),document.addEventListener("keydown",As,!0)}function As(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||xs()||!e.ctrlKey&&!e.metaKey)return;let n=e.key.toUpperCase();if(e.key==="/"||e.key==="?"){$s(),e.preventDefault();return}let o=ei.find(r=>r.shortcut===n);o&&(Sr(o.type),e.preventDefault())}var Oe=null,bn=null;function $s(){Oe?Eo():md()}function md(){let e=X();if(!e||Oe)return;Oe=document.createElement("div"),Oe.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:ei.map(r=>({action:r.label,keys:[To,r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[To,"Z"]},{action:"Toggle Originals",keys:[To,"."]},{action:"Keyboard Shortcuts",keys:[To,"/"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Grab Tool","Drag"]},{action:"Zoom",keys:["Scroll Wheel"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let s of r.items){let c=document.createElement("div");c.className="shortcut-row";let u=document.createElement("span");u.className="shortcut-action",u.textContent=s.action,c.appendChild(u);let d=document.createElement("span");d.className="shortcut-keys";for(let p=0;p<s.keys.length;p++){if(p>0){let m=document.createElement("span");m.className="shortcut-plus",m.textContent="+",d.appendChild(m)}let f=document.createElement("span");f.className="shortcut-key",f.textContent=s.keys[p],d.appendChild(f)}c.appendChild(d),i.appendChild(c)}t.appendChild(i)}Oe.appendChild(t),Oe.addEventListener("click",r=>{r.target===Oe&&Eo()}),e.appendChild(Oe),bn=r=>{Eo()},document.addEventListener("keydown",bn,!0)}function Eo(){bn&&(document.removeEventListener("keydown",bn,!0),bn=null),Oe?.remove(),Oe=null}function Hs(e){for(let[t,n]of wo)n.classList.toggle("active",t===e);fd(e)}function fd(e){if(ie){if(ie.innerHTML="",ie.classList.add("hidden"),ie.classList.remove("visible"),e==="draw"){ie.classList.remove("hidden"),requestAnimationFrame(()=>ie?.classList.add("visible"));let t=Ve(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.brushColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();nn({initialColor:t.brushColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){an("brushColor",i),n.style.background=i},onClose(){}})}),ie.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[2,4,8]){let i=document.createElement("button");i.className=`segment${r===t.brushSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{an("brushSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active"),Promise.resolve().then(()=>(ut(),vs)).then(a=>a.refreshDrawCursor())}),o.appendChild(i)}ie.appendChild(o)}else if(e==="text"){ie.classList.remove("hidden"),requestAnimationFrame(()=>ie?.classList.add("visible"));let t=Ve(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();nn({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){an("textColor",i),n.style.background=i},onClose(){}})}),ie.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{an("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}ie.appendChild(o)}}}function Is(e){let t=wo.get(e);t&&(t.style.backgroundColor=l.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function _s(){document.removeEventListener("keydown",As,!0),Eo(),be?.remove(),be=null,ie=null,wo.clear()}ut();Yr();rt();Y();var Ds="frameup-onboarding-seen",Ae=null,So=null;function Fs(){if(localStorage.getItem(Ds))return;let e=X();if(!e)return;Ae=document.createElement("div"),Ae.style.cssText=`
    position: fixed;
    left: 72px;
    top: 50%;
    transform: translateY(-50%);
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${O.md};
    border-radius: ${N.md};
    padding: 12px 16px;
    font-family: ${x};
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
    font-family: ${x};
    margin: 0 2px;
  `;Ae.innerHTML=`Press ${t.map(o=>`<span style="${n}">${o}</span>`).join(" ")} to switch tools`,e.appendChild(Ae),requestAnimationFrame(()=>{Ae&&(Ae.style.opacity="1")}),So=setTimeout(ti,5e3)}function ti(){Ae&&(localStorage.setItem(Ds,"1"),Ae.style.opacity="0",setTimeout(()=>{Ae?.remove(),Ae=null},150),So&&(clearTimeout(So),So=null))}Me();function Vs(){Hr(!0)}function zs(){Hr(!1)}ut();fn();var ni=!1,oi=0,ri=0,Bs={onMouseDown(e){ni=!0,oi=e.clientX,ri=e.clientY,bo("grabbing")},onMouseMove(e){if(!ni)return;let t=e.clientX-oi,n=e.clientY-ri;ps(t,n),oi=e.clientX,ri=e.clientY},onMouseUp(e){ni=!1,bo("grab")}};Wn();Me();ut();function Ws(e,t,n,o,r,i){let a=e.left+e.width/2,s=e.top+e.height/2,c=t.left+t.width/2,u=t.top+t.height/2,d=c-a,p=u-s,f=Math.abs(d)<=r,m=Math.abs(p)<=r;return{dx:f?n+d/i:n,dy:m?o+p/i:o,snappedX:f,snappedY:m,guides:{verticalLine:f?{x:c,top:t.top,bottom:t.bottom}:null,horizontalLine:m?{y:u,left:t.left,right:t.right}:null}}}var J=null,yn={x:0,y:0},_t={dx:0,dy:0},Dt=!1,mt=!1,vn=null,Gs={onMouseDown(e){vn=null,Dt=!1,mt=!1;let t=sn(e.clientX,e.clientY),n=dt(e.clientX,e.clientY);if(!n){Ye();return}let o=Nr(n);if(o){J=o,yn={x:t.x,y:t.y},_t={...o.delta},Dt=!1,mt=!0,Mt(o.element,o.delta.dx,o.delta.dy,o.existingTransform);return}let r=qa(),i=Qa();if(!r||!i||n!==i){vn=n;return}let a=Nr(i);if(a){J=a,yn={x:t.x,y:t.y},_t={...a.delta},Dt=!1,mt=!0,Mt(a.element,a.delta.dx,a.delta.dy,a.existingTransform);return}let s=i.getBoundingClientRect(),c=i.style.cssText,u=getComputedStyle(i).transform,d={id:crypto.randomUUID(),componentRef:{componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber},element:i,placeholder:null,originalRect:s,delta:{dx:0,dy:0},originalCssText:c,existingTransform:u==="none"?"":u,identity:{componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber,columnNumber:r.columnNumber,tagName:i.tagName.toLowerCase()}};Pa(d),J=d,yn={x:t.x,y:t.y},_t={dx:0,dy:0},Dt=!0,mt=!0,Mt(i,0,0,d.existingTransform)},onMouseMove(e){if(!mt||!J)return;let t=sn(e.clientX,e.clientY),n=_t.dx+(t.x-yn.x),o=_t.dy+(t.y-yn.y);Mt(J.element,n,o,J.existingTransform);let r=J.element.parentElement;if(!r||r===document.body||r===document.documentElement){J.delta={dx:n,dy:o},br();return}let i=J.element.getBoundingClientRect(),a=r.getBoundingClientRect(),{scale:s}=ze(),c=Ws(i,a,n,o,5,s);(c.snappedX||c.snappedY)&&Mt(J.element,c.dx,c.dy,J.existingTransform),J.delta={dx:c.dx,dy:c.dy},ia(c.guides)},onMouseUp(){mt&&J&&(Dt||Oa(J.id,J.delta,_t),Sa(J),br(),Ir(J.element)),J=null,mt=!1,Dt=!1,vn&&(Ir(vn),vn=null)}};Me();ot();xt();rt();ut();async function Ys(e,t){let n=dt(e,t);if(!n)return null;let o=oe(n);if(!o)return null;try{let i=await ke(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let s=a.functionName;if(s[0]!==s[0].toUpperCase()||_e(s))continue;let c="";if(a.fileName){let u=Se(a.fileName);Re(u)&&(c=u)}return{componentName:s,filePath:c,lineNumber:a.lineNumber??0}}}catch{}let r=o;for(;r;){if(fe(r)){let i=se(r.type);if(i&&i[0]===i[0].toUpperCase()&&!_e(i)){let a=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:a?.fileName||"",lineNumber:a?.lineNumber||0}}}r=r.return}return null}Y();var ae=null,ft=null,Mo=null,Us={onMouseDown(e){ae&&js();let t=sn(e.clientX,e.clientY);ft={pageX:t.x,pageY:t.y},Ys(e.clientX,e.clientY).then(n=>{Mo=n}),ae=document.createElement("input"),ae.type="text",ae.placeholder="Type annotation...",ae.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${l.bgPrimary};
      color: ${l.textPrimary};
      border: 1.5px solid ${l.accent};
      border-radius: ${N.sm};
      padding: 4px 8px;
      font-size: ${Ve().fontSize}px;
      font-family: ${x};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${l.accentSoft};
    `,ae.setAttribute("data-frameup-overlay","true"),ae.addEventListener("keydown",n=>{n.key==="Enter"&&(js(),n.preventDefault()),n.key==="Escape"&&(Xs(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(ae),ae.focus()},onMouseMove(){},onMouseUp(){}};function js(){if(!ae||!ft)return;let e=ae.value.trim();if(ae.remove(),ae=null,!e)return;let t=Ve(),n=crypto.randomUUID();rs(n,ft.pageX,ft.pageY,e,t.fontSize,t.textColor),Aa({type:"text",id:n,position:ft,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:Mo}),ft=null,Mo=null}function Xs(){ae&&(ae.remove(),ae=null),ft=null,Mo=null}function Ks(){Xs()}fn();Y();var gt=null,xn=null;function Zs(e){let t=e instanceof Error&&e.stack?e.stack:String(e);return/frameup|overlay/i.test(t)}function gd(e){let t=X();if(!t)return;gt&&gt.parentNode&&gt.parentNode.removeChild(gt),xn&&clearTimeout(xn);let n=document.createElement("div");n.setAttribute("style",["position: fixed","bottom: 72px","right: 16px","z-index: 2147483647","background: rgba(30, 30, 30, 0.92)","color: #fff",`font-family: ${x}`,"font-size: 12px","padding: 10px 14px",`border-radius: ${N.sm}`,`box-shadow: ${O.md}`,"max-width: 320px","display: flex","align-items: center","gap: 10px","opacity: 0",`transition: opacity ${M.medium}`].join("; "));let o=document.createElement("span");o.textContent=e,o.setAttribute("style","flex: 1;");let r=document.createElement("button");r.textContent="Dismiss",r.setAttribute("style",["background: rgba(255,255,255,0.15)","border: none","color: #fff",`font-family: ${x}`,"font-size: 11px","padding: 3px 8px",`border-radius: ${N.xs}`,"cursor: pointer","white-space: nowrap"].join("; ")),r.addEventListener("click",()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),xn&&clearTimeout(xn),gt=null}),n.appendChild(o),n.appendChild(r),t.appendChild(n),gt=n,requestAnimationFrame(()=>{n.style.opacity="1"}),xn=setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),gt=null},8e3)}function ii(e){console.error("[FrameUp]",e),gd("FrameUp encountered an error. Your app is unaffected.")}function hd(){window.addEventListener("error",e=>{Zs(e.error??e.message)&&(ii(e.error??e.message),e.preventDefault())}),window.addEventListener("unhandledrejection",e=>{Zs(e.reason)&&(ii(e.reason),e.preventDefault())})}var ai=null;function qs(e,t,n){t.originalCssText=n.style.cssText,t.element=n,at(t)}function bd(){let e=window.__FRAMEUP_WS_PORT__;if(!e){console.warn("[FrameUp] No WebSocket port found.");return}if(document.getElementById("frameup-root"))return;wn(e),Ei(yd);let t=X();t&&Wa(t),Za(),ra(),ts(),os(),Ha(r=>is(r)),ai=new MutationObserver(()=>{for(let[r,i]of Ra())document.contains(i.element)||setTimeout(()=>{let a=Bn(i.identity);if(a){qs(r,i,a);return}Ma(i.identity).then(s=>{s?qs(r,i,s):(Mr(r),U(`Component ${i.componentRef.componentName} removed \u2014 move cleared`))})},80)}),ai.observe(document.body,{childList:!0,subtree:!0}),Os(),Cs(),Ur(),Fs(),It("grab",Bs),It("move",Gs),It("draw",void 0),It("text",Us),Na((r,i)=>{ti(),Is(r),i==="pointer"&&zs(),i==="text"&&Ks(),Ht(),dr(),r==="pointer"&&Vs(),hn(r),Hs(r)}),ka(()=>{kn(Qn()),Ps(Da())}),Rs(()=>{let r=kr();r&&U(`Undo: ${r}`)}),Si(()=>{if(!Qn()){U("No moved components to toggle");return}let r=!Ia();_a(r),Nn(r)});let n=!1,o=0;Mi(()=>{if(n){U("Generation in progress");return}let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);U(`Please wait ${a}s before retrying`);return}let i=Fa();if(!i.moves.length&&!i.annotations.length&&!i.colorChanges.length&&!i.textEdits.length){U("Nothing to confirm \u2014 make some visual changes first");return}n=!0,kn(!1),U("Generating..."),ve({type:"generate",annotations:i})}),$e(r=>{if(r.type==="generateProgress"&&U(r.message),r.type==="generateComplete")if(n=!1,kn(Qn()),r.success){let i=r.changes.map(a=>a.description||a.filePath).join(", ");U(`Applied: ${i}`),Ye(),Vr(),Jn(),Nn(!0)}else U(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),Li(()=>{let r=kr();return r?(U(`Undo: ${r}`),!0):!1}),ks(()=>{Ye(),Vr(),Jn(),ms(),Nn(!0),U("Canvas cleared")}),console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools")}function yd(){Ht(),dr(),Ja(),la(),ns(),as(),ai?.disconnect(),_s(),Ts(),Kr(),Jn(),Gr(),pi(),wi()}function Js(){try{bd(),hd()}catch(e){ii(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Js):Js();})();
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
