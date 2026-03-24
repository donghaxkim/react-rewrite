"use strict";var FrameUp=(()=>{var al=Object.defineProperty;var ve=(e,t)=>()=>(e&&(t=e(e=0)),t);var sl=(e,t)=>{for(var n in t)al(e,n,{get:t[n],enumerable:!0})};function Ci(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='5 9 2 12 5 15'/><polyline points='9 5 12 2 15 5'/><polyline points='15 19 12 22 9 19'/><polyline points='19 9 22 12 19 15'/><line x1='2' y1='12' x2='22' y2='12'/><line x1='12' y1='2' x2='12' y2='22'/></svg>`)}") 12 12, move`}function Do(e){if(Ln&&Ln.size===e)return Ln.uri;let t=Math.max(e,2),n=t*2+4,o=n/2,r=`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${n}' height='${n}'><circle cx='${o}' cy='${o}' r='${t}' fill='none' stroke='${l.accent}' stroke-width='1.5'/></svg>`)}") ${o} ${o}, crosshair`;return Ln={size:e,uri:r},r}var l,R,L,M,C,xi,Ln,j=ve(()=>{"use strict";l={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},R={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},L={xs:"4px",sm:"6px",md:"10px",lg:"14px"},M={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},C="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",xi=`
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
`;Ln=null});var Bo,Zt,Pi,hl,Ut,Oi,On,$i,Ai,Xt,An,Xe,Wo,Kt,Yo,Ct,jo,$n,qt=ve(()=>{"use strict";Bo="0.5.32",Zt=`bippy-${Bo}`,Pi=Object.defineProperty,hl=Object.prototype.hasOwnProperty,Ut=()=>{},Oi=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},On=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),$i=!1,Xt=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>$i?!0:(e&&typeof e.inject=="function"&&(Ai=e.inject.toString()),!!Ai?.includes("(injected)")),An=new Set,Xe=new Set,Wo=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:Zt,checkDCE:Oi,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),Xe.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,An.forEach(a=>a())),i},on:Ut,onCommitFiberRoot:Ut,onCommitFiberUnmount:Ut,onPostCommitFiberRoot:Ut,renderers:t,supportsFiber:!0,supportsFlight:!0};try{Pi(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let s=o.renderers;o=a,s.size>0&&(s.forEach((c,u)=>{Xe.add(c),a.renderers.set(u,c)}),Kt(e))}}});let r=window.hasOwnProperty,i=!1;Pi(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{Kt(e)}return o},Kt=e=>{e&&An.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=Oi,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=Zt,t._instrumentationIsActive=!1;let n=On(t);if(n||(t.on=Ut),t.renderers.size){t._instrumentationIsActive=!0,An.forEach(i=>i());return}let o=t.inject,r=Xt(t);r&&!n&&($i=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return Xe.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,An.forEach(s=>s()),a}}(t.renderers.size||t._instrumentationIsActive||Xt())&&e?.()}catch{}},Yo=()=>hl.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),Ct=e=>Yo()?(Kt(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Wo(e),jo=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),$n=()=>{try{jo()&&Ct()}catch{}}});var Hi=ve(()=>{"use strict";qt();$n()});function rr(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await ar(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=ir(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var Go,Uo,Xo,Ko,Zo,qo,Jo,Qo,er,tr,nr,or,ge,ir,ar,sr,se,lr,cr,ne,bl,dr=ve(()=>{"use strict";qt();Go=0,Uo=1,Xo=5,Ko=11,Zo=13,qo=15,Jo=16,Qo=19,er=26,tr=27,nr=28,or=30,ge=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};ir=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=ir(o,t,n);if(r)return r;o=n?null:o.sibling}return null},ar=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await ar(o,t,n);if(r)return r;o=n?null:o.sibling}return null},sr=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?sr(t.type||t.render):null},se=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=sr(t);return o&&(o.displayName||o.name)||null},lr=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||On(e)||Xt(e)},cr=e=>{let t=Ct(e.onActive);t._instrumentationSource=e.name??Zt;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,s,c)=>{n!==i&&(n?.(a,s,c),e.onCommitFiberRoot?.(a,s,c))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,s)=>{t.onCommitFiberUnmount===i&&(o?.(a,s),e.onCommitFiberUnmount?.(a,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,s)=>{t.onPostCommitFiberRoot===i&&(r?.(a,s),e.onPostCommitFiberRoot?.(a,s))};t.onPostCommitFiberRoot=i}return t},ne=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},bl=Error()});var rt=ve(()=>{"use strict";qt();Hi();dr();});function Jt(e,t){let n=0,o=0,r=0;do r=Zi[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function Vi(e,t){return e.pos>=t?!1:e.peek()!==wl}function qi(e){let{length:t}=e,n=new Ml(e),o=[],r=0,i=0,a=0,s=0,c=0;do{let u=n.indexOf(";"),d=[],p=!0,m=0;for(r=0;n.pos<u;){let f;r=Jt(n,r),r<m&&(p=!1),m=r,Vi(n,u)?(i=Jt(n,i),a=Jt(n,a),s=Jt(n,s),Vi(n,u)?(c=Jt(n,c),f=[r,i,a,s,c]):f=[r,i,a,s]):f=[r],d.push(f),n.pos++}p||Ll(d),o.push(d),n.pos=u+1}while(n.pos<=t);return o}function Ll(e){e.sort(Nl)}function Nl(e,t){return e[0]-t[0]}var Ii,yl,vl,ji,xl,Cl,Gi,El,Ui,Tl,Xi,Ki,mr,_i,Di,wl,Fi,Sl,Zi,Ml,Ji,kl,Rl,Qi,Qt,Hn,Pl,zi,Al,Ol,$l,Hl,Bi,Il,_l,Dl,Fl,Vl,Wi,_e,zl,ur,pr,Bl,Wl,Yl,jl,Gl,Ul,Xl,Kl,Re,Yi,Zl,ql,Le,Pe,Et=ve(()=>{"use strict";qt();dr();Ii=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,yl=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],vl=["<anonymous>","eval",""],ji=/\.(jsx|tsx|ts|js)$/,xl=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Cl=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,Gi="(at Server)",El=/(^|@)\S+:\d+/,Ui=/^\s*at .*(\S+:\d+|\(native\))/m,Tl=/^(eval@)?(\[native code\])?$/,Xi=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=_i(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(El)){let i=Di(r,void 0)[0];i&&o.push(i)}return mr(o,t)}return e.match(Ui)?_i(e,t):Di(e,t)},Ki=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},mr=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e,_i=(e,t)=>mr(e.split(`
`).filter(n=>!!n.match(Ui)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=Ki(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}}),Di=(e,t)=>mr(e.split(`
`).filter(n=>!n.match(Tl)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,s=Ki(o.replace(r,""));return{functionName:a,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:o}}}),wl=44,Fi="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Sl=new Uint8Array(64),Zi=new Uint8Array(128);for(let e=0;e<Fi.length;e++){let t=Fi.charCodeAt(e);Sl[e]=t,Zi[t]=e}Ml=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};Ji=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,kl=/^data:application\/json[^,]+base64,/,Rl=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,Qi=typeof WeakRef<"u",Qt=new Map,Hn=new Map,Pl=e=>Qi&&e instanceof WeakRef,zi=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let d of r)if(d[0]<=o)i=d;else break;if(!i||i.length<4)return null;let[,a,s,c]=i;if(a===void 0||s===void 0||c===void 0)return null;let u=t[a];return u?{columnNumber:c,fileName:u,lineNumber:s+1}:null},Al=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return zi(o.map.mappings,o.map.sources,r,i)}return zi(e.mappings,e.sources,t-1,n)},Ol=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(Rl);a&&(o=a[1]||a[2])}if(!o)return null;let r=Ji.test(o);if(!(kl.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},$l=e=>({file:e.file,mappings:qi(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),Hl=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:qi(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},Bi=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(Ji);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},Il=async(e,t=fetch)=>{if(!Bi(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=Ol(e,n);if(!o||!Bi(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?Hl(i):$l(i)}catch{return null}},_l=async(e,t=!0,n)=>{if(t&&Qt.has(e)){let i=Qt.get(e);if(i==null)return null;if(Pl(i)){let a=i.deref();if(a)return a;Qt.delete(e)}else return i}if(t&&Hn.has(e))return Hn.get(e);let o=Il(e,n);t&&Hn.set(e,o);let r=await o;return t&&Hn.delete(e),t&&(r===null?Qt.set(e,null):Qt.set(e,Qi?new WeakRef(r):r)),r},Dl=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await _l(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=Al(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),Fl=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",Vl=()=>{let e=Ct();for(let t of[...Array.from(Xe),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},Wi=e=>{for(let t of Xe){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},_e=e=>`
    in ${e}`,zl=(e,t)=>{let n=_e(e);return t&&(n+=` (at ${t})`),n},ur=!1,pr=(e,t)=>{if(!e||ur)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,ur=!0;let o=Vl();Wi(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let d;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(m){d=m}Reflect.construct(e,[],p)}else{try{p.call()}catch(m){d=m}e.call(p.prototype)}}else{try{throw Error()}catch(m){d=m}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&d instanceof Error&&typeof p.stack=="string")return[p.stack,d.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,u]=s.DetermineComponentFrameRoot();if(c&&u){let d=c.split(`
`),p=u.split(`
`),m=0,f=0;for(;m<d.length&&!d[m].includes("DetermineComponentFrameRoot");)m++;for(;f<p.length&&!p[f].includes("DetermineComponentFrameRoot");)f++;if(m===d.length||f===p.length)for(m=d.length-1,f=p.length-1;m>=1&&f>=0&&d[m]!==p[f];)f--;for(;m>=1&&f>=0;m--,f--)if(d[m]!==p[f]){if(m!==1||f!==1)do if(m--,f--,f<0||d[m]!==p[f]){let g=`
${d[m].replace(" at new "," at ")}`,y=se(e);return y&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",y)),g}while(m>=1&&f>=0);break}}}finally{ur=!1,Error.prepareStackTrace=n,Wi(o),console.error=r,console.warn=i}let a=e?se(e):"";return a?_e(a):""},Bl=(e,t)=>{let n=e.tag,o="";switch(n){case nr:o=_e("Activity");break;case Uo:o=pr(e.type,!0);break;case Ko:o=pr(e.type.render,!1);break;case Go:case qo:o=pr(e.type,!1);break;case Xo:case er:case tr:o=_e(e.type);break;case Jo:o=_e("Lazy");break;case Zo:o=e.child!==t&&t!==null?_e("Suspense Fallback"):_e("Suspense");break;case Qo:o=_e("SuspenseList");break;case or:o=_e("ViewTransition");break;default:return""}return o},Wl=e=>{try{let t="",n=e,o=null;do{t+=Bl(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=zl(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},Yl=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},jl=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),Gl=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,Ul=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!jl(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>Gl(a,o))||(i.push(o),t.set(r,i))}return t},Xl=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(Gi,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},Kl=e=>{let t=[];return rr(e,n=>{if(!Fl(n))return;let o=typeof n.type=="string"?n.type:se(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:Xi(Yl(n._debugStack?.stack))})},!0),t},Re=async(e,t=!0,n)=>{let o=Kl(e),r=Xi(Wl(e)),i=Ul(o),a=new Map;return Dl(r.map(s=>s.source?.includes(Gi)??!1?Xl(s,i,a):s).filter((s,c,u)=>{if(c===0)return!0;let d=u[c-1];return s.functionName!==d.functionName}),t,n)},Yi=e=>e.split("/").filter(Boolean).length,Zl=e=>e.split("/").filter(Boolean)[0]??null,ql=e=>{let t=e.indexOf("/",1);if(t===-1||Yi(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!ji.test(n)||Yi(n)<2)return e;let o=Zl(n);return!o||o.startsWith("@")||o.length>4?e:n},Le=e=>{if(!e||vl.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=ql(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),s=i.indexOf(":");t=a!==-1&&(s===-1||a<s)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of yl)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if(Ii.test(t)){let i=t.match(Ii);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Cl.test(i)&&(t=t.slice(0,r))}return t},Pe=e=>{let t=Le(e);return!(!t||!ji.test(t)||xl.test(t))}});function De(e){return!!(Jl.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function fr(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}function gr(){en=new WeakMap}function nc(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function oc(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=ec}function rc(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<In||o.height/window.innerHeight<In)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>tc}function tn(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&fr(e)||e.closest("#frameup-root")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-placeholder"))return!1;let n=performance.now(),o=en.get(e);if(o&&n-o.timestamp<Ql)return o.isValid;let r=window.getComputedStyle(e);return nc(e,r)?e.clientWidth/window.innerWidth>=In&&e.clientHeight/window.innerHeight>=In&&(oc(r)||rc(e,r))?(en.set(e,{isValid:!1,timestamp:n}),!1):(en.set(e,{isValid:!0,timestamp:n}),!0):(en.set(e,{isValid:!1,timestamp:n}),!1)}var Jl,Ql,In,ec,tc,en,it=ve(()=>{"use strict";Jl=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);Ql=50,In=.9,ec=2147483600,tc=1e3,en=new WeakMap});function Hc(e,t,n){let o=n&&n!=="none"?` ${n}`:"";return`translate(${e}px, ${t}px)${o}`}function st(e){e.element.style.transform=Hc(e.delta.dx,e.delta.dy,e.existingTransform)}function La(e){e.existingTransform&&e.existingTransform!=="none"?e.element.style.transform=e.existingTransform:e.element.style.transform=""}function kt(e,t,n,o){e.style.transform=`translate(${t}px, ${n}px) scale(1.02)${o&&o!=="none"?` ${o}`:""}`,e.style.boxShadow=R.lg,e.style.transition="none",e.style.zIndex="2147483644"}function Na(e){st(e),e.element.style.boxShadow="",e.element.style.transition="",e.element.style.zIndex=""}function Yn(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);for(;o;){if(ge(o)){let r=o._debugSource,i=se(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function ka(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);if(!o)continue;let r=await Re(o);if(!r||r.length===0)continue;for(let i of r)if(!(!i.functionName||i.functionName!==e.componentName)&&i.fileName){let a=Le(i.fileName);if(Pe(a)&&a.endsWith(e.filePath))return n}}catch{}return null}var jn=ve(()=>{"use strict";rt();Et();j()});function Pa(e){return Gn.push(e),()=>{Gn=Gn.filter(t=>t!==e)}}function Aa(e){return Un.push(e),()=>{Un=Un.filter(t=>t!==e)}}function lt(){Un.forEach(e=>e())}function Zn(){return Nr}function Rr(e){let t=Nr;t!==e&&(Nr=e,Gn.forEach(n=>n(e,t)))}function Te(){return{...Ra}}function cn(e,t){Ra[e]=t}function Oa(){return Ee}function $a(e){Ee.set(e.id,e),Jn({type:"moveCreate",moveId:e.id})}function Ha(e,t,n){let o=Ee.get(e);o&&(o.delta=t,st(o),Jn({type:"moveDelta",moveId:e,previousDelta:n}))}function Pr(e){let t=Ee.get(e);t&&(t.element.style.cssText=t.originalCssText,t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),Ee.delete(e),lt())}function qn(e){if(Ve.push(e),e.type==="colorChange"){let t=e;qe.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else qe.push({type:"annotationAdd",annotationId:e.id});lt()}function Ar(e,t,n){Ve.push(e),qe.push({type:"textEditRestore",annotationId:e.id,elementIdentity:t,originalInnerHTML:n}),lt()}function _a(e){Ia=e}function Lr(e){Ve=Ve.filter(t=>t.id!==e),Ia?.(e),lt()}function Da(){return kr}function Fa(e){kr=e;for(let t of Ee.values())e?st(t):La(t);lt()}function Or(e){for(let t of Ee.values())if(t.element===e)return t}function $r(){let e=qe.pop();if(!e)return null;switch(e.type){case"moveCreate":return Pr(e.moveId),"move removed";case"moveDelta":{let t=Ee.get(e.moveId);return t&&(t.delta=e.previousDelta,st(t)),"move reverted"}case"annotationAdd":return Lr(e.annotationId),"annotation removed";case"colorChange":{let t=Ve.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),Lr(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}case"textEditRestore":{let t=Yn(e.elementIdentity);return t&&(t.innerHTML=e.originalInnerHTML),Lr(e.annotationId),"text edit reverted"}}return null}function Jn(e){qe.push(e),lt()}function ze(){return{scale:ln,offsetX:Xn,offsetY:Kn}}function Qn(e,t,n){ln=e,Xn=t,Kn=n,sn.forEach(o=>o())}function eo(e){return sn.push(e),()=>{sn=sn.filter(t=>t!==e)}}function Je(e,t){return{x:(e-Xn)/ln,y:(t-Kn)/ln}}function to(){for(let e of Ee.values())e.element.style.cssText=e.originalCssText,e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder);for(let e of Ve)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of qe)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}Ee=new Map,Ve=[],qe=[],kr=!0,ln=1,Xn=0,Kn=0,sn.forEach(e=>e()),lt()}function no(){return Ee.size>0||Ve.length>0}function Va(){return qe.length>0}function za(){let e=Array.from(Ee.values()).map(r=>({component:r.componentRef.componentName,file:r.componentRef.filePath,line:r.componentRef.lineNumber,originalRect:{top:r.originalRect.top,left:r.originalRect.left,width:r.originalRect.width,height:r.originalRect.height},delta:{dx:r.delta.dx,dy:r.delta.dy},siblingRects:(()=>{let i=r.element.parentElement;if(!i)return;let a=[];for(let s of Array.from(i.children)){if(s===r.element||!(s instanceof HTMLElement))continue;let c=s.getBoundingClientRect();a.push({component:s.tagName.toLowerCase(),rect:{top:c.top,left:c.left,width:c.width,height:c.height}})}return a.length>0?a:void 0})()})),t=[],n=[],o=[];for(let r of Ve)r.type==="draw"?t.push({type:"draw",startComponent:r.targetComponent?.componentName,startFile:r.targetComponent?.filePath,startLine:r.targetComponent?.lineNumber,points:r.points,color:r.color,strokeWidth:r.strokeWidth}):r.type==="text"?t.push({type:"text",content:r.content,position:r.position,targetComponent:r.targetComponent?.componentName,targetFile:r.targetComponent?.filePath,targetLine:r.targetComponent?.lineNumber}):r.type==="colorChange"?n.push({component:r.component.componentName,file:r.component.filePath,line:r.component.lineNumber,property:r.property,from:r.fromColor,to:r.toColor,pickedToken:r.pickedToken}):r.type==="textEdit"&&o.push({component:r.componentName,file:r.filePath,line:r.lineNumber,column:r.columnNumber,originalText:r.originalText,newText:r.newText});return{moves:e,annotations:t,colorChanges:n,textEdits:o}}var Ee,Ve,qe,Nr,kr,Ra,ln,Xn,Kn,sn,Gn,Un,Ia,we=ve(()=>{"use strict";jn();Ee=new Map,Ve=[],qe=[],Nr="pointer",kr=!0,Ra={brushSize:4,brushColor:"#ef4444",fontSize:16,textColor:"#ffffff"},ln=1,Xn=0,Kn=0,sn=[],Gn=[],Un=[];Ia=null});function sd(){jr=document.body.style.background||document.body.style.backgroundColor||"",Gr=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",Z=document.createElement("div"),Z.setAttribute("data-frameup-canvas-wrapper","true"),Z.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${n};
  `.trim().replace(/\n\s*/g," "),ke=document.createElement("div"),ke.setAttribute("data-frameup-dot-bg","true"),ke.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${l.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="frameup-root"||r.hasAttribute("data-frameup-interaction")||r.hasAttribute("data-frameup-placeholder")||r.hasAttribute("data-frameup-annotation")||r.hasAttribute("data-frameup-dot-bg")||r.hasAttribute("data-frameup-canvas-wrapper"))||(fs.push(r),Z.appendChild(r));Z.style.position="relative",Z.style.zIndex="1",document.body.insertBefore(ke,document.body.firstChild),document.body.insertBefore(Z,ke.nextSibling),Yr=eo(ms),ms(),gs.forEach(r=>r(Z))}function ms(){if(!Z||!ke)return;let{scale:e,offsetX:t,offsetY:n}=ze();Z.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=id*e,r=t%o,i=n%o;ke.style.backgroundImage=`radial-gradient(circle, ${ad} ${ps}px, transparent ${ps}px)`,ke.style.backgroundSize=`${o}px ${o}px`,ke.style.backgroundPosition=`${r}px ${i}px`}function ld(e,t,n){let{scale:o,offsetX:r,offsetY:i}=ze(),a=Math.min(od,Math.max(nd,o+n));if(a===o)return;let s=(e-r)/o,c=(t-i)/o,u=e-s*a,d=t-c*a;Qn(a,u,d)}function hs(e){e.preventDefault();let t=-e.deltaY*rd,{scale:n}=ze(),o=t*n;ld(e.clientX,e.clientY,o)}function bs(e,t){let{scale:n,offsetX:o,offsetY:r}=ze();Qn(n,o+e,r+t)}function ys(){Qn(1,0,0)}function vs(){return Z!==null}function xs(){Z?Ur():sd()}function Ur(){if(gs.forEach(e=>e(null)),Yr?.(),Yr=null,Z){for(;Z.firstChild;)document.body.insertBefore(Z.firstChild,Z);Z.remove(),Z=null}ke?.remove(),ke=null,fs=[],document.body.style.background=jr,document.documentElement.style.background=Gr,jr="",Gr=""}var nd,od,rd,id,ps,ad,Z,ke,Yr,fs,gs,jr,Gr,hn=ve(()=>{"use strict";we();j();nd=.1,od=5,rd=.002,id=24,ps=1,ad="rgba(0,0,0,0.15)",Z=null,ke=null,Yr=null,fs=[],gs=[],jr="",Gr=""});function Cs(e,t){if(!ut)return;let n=performance.now(),o=Math.abs(e-ut.clientX),r=Math.abs(t-ut.clientY),i=o<=2&&r<=2,a=n-ut.timestamp<16;if(i||a)return ut.element}function Es(e,t,n){ut={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function Dt(){ut=null}var ut,Xr=ve(()=>{"use strict";ut=null});var ws={};sl(ws,{activateInteraction:()=>yn,destroyInteraction:()=>Jr,getPageElementAtPoint:()=>pt,initInteraction:()=>Zr,refreshDrawCursor:()=>dd,registerToolHandler:()=>Ft,setInteractionCursor:()=>vo,setInteractionPointerEvents:()=>qr});function Ft(e,t){Kr.set(e,t)}function Zr(){I=document.createElement("div"),I.setAttribute("data-frameup-interaction","true"),I.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(I),document.addEventListener("scroll",Dt,!0),I.addEventListener("mousedown",e=>{bn?.onMouseDown?.(e)}),I.addEventListener("mousemove",e=>{bn?.onMouseMove?.(e)}),I.addEventListener("mouseup",e=>{bn?.onMouseUp?.(e)}),document.addEventListener("wheel",Ts,{passive:!1})}function Ts(e){!I||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#frameup-root")||hs(e)}function yn(e){bn=Kr.get(e)||null,I&&(I.style.pointerEvents=e==="pointer"?"none":"auto"),cd(e)}function cd(e){if(I)switch(e){case"pointer":I.style.cursor="default";break;case"grab":I.style.cursor="grab";break;case"move":I.style.cursor=Ci();break;case"draw":I.style.cursor=Do(Te().brushSize);break;case"text":I.style.cursor="text";break;default:I.style.cursor="default"}}function dd(){Zn()==="draw"&&I&&(I.style.cursor=Do(Te().brushSize))}function vo(e){I&&(I.style.cursor=e)}function qr(e){I&&(I.style.pointerEvents=e?"auto":"none")}function pt(e,t){let n=Cs(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#frameup-root")&&!i.hasAttribute("data-frameup-interaction")&&!i.hasAttribute("data-frameup-placeholder")&&!(i===document.body||i===document.documentElement)&&!fr(i)){r=i;break}return Es(e,t,r),r}function Jr(){document.removeEventListener("scroll",Dt,!0),document.removeEventListener("wheel",Ts),I?.remove(),I=null,bn=null,Kr.clear()}var I,bn,Kr,mt=ve(()=>{"use strict";we();j();Xr();it();hn();I=null,bn=null,Kr=new Map});function ll(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),s=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+s).toString(16).slice(1)}`}return e}function cl(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(E=>{try{return Array.from(E.cssRules)}catch{return[]}}).filter(E=>E instanceof CSSStyleRule&&E.selectorText===":root").flatMap(E=>Array.from(E.style)).filter(E=>E.startsWith("--")),n={},o={},r={},i={},a={},s={},c={},u={},d={},p={},m={},f={},g={},y={},x={},P={},H={},A={},V=(E,$,ce,de)=>{E[ce]=de,$[de]=ce};for(let E of t){let $=e.getPropertyValue(E).trim();if(!$)continue;let ce=E.match(/^--spacing-(.+)$/);if(ce){V(n,p,ce[1],$);continue}let de=E.match(/^--color-(.+)$/);if(de){let Tn=de[1];o[Tn]=$,m[ll($)]=Tn;continue}let k=E.match(/^--font-size-(.+)$/);if(k){V(r,f,k[1],$);continue}let Y=E.match(/^--font-weight-(.+)$/);if(Y){V(i,g,Y[1],$);continue}let b=E.match(/^--radius-(.+)$/);if(b){V(a,y,b[1],$);continue}let T=E.match(/^--border-(.+)$/);if(T){V(s,x,T[1],$);continue}let _=E.match(/^--opacity-(.+)$/);if(_){V(c,P,_[1],$);continue}let J=E.match(/^--tracking-(.+)$/);if(J){V(u,H,J[1],$);continue}let Q=E.match(/^--leading-(.+)$/);if(Q){V(d,A,Q[1],$);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:s,opacity:c,letterSpacing:u,lineHeight:d,spacingReverse:p,colorsReverse:m,fontSizeReverse:f,fontWeightReverse:g,borderRadiusReverse:y,borderWidthReverse:x,opacityReverse:P,letterSpacingReverse:H,lineHeightReverse:A}}var dl=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function ul(e,t){let n={};for(let o of dl){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function Sn(e,t){return t.get(e)??null}function ui(e,t,n){let r=(n??Wt())[e],i=[];for(let[s,c]of r.entries()){let u=parseFloat(c);isNaN(u)||i.push({numericValue:u,token:s,cssValue:c})}let a=parseFloat(t);return isNaN(a)||i.some(c=>c.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((s,c)=>s.numericValue-c.numericValue),i}var pi=null,Bt=null;function mi(e){pi=e,Bt=null}function Wt(){if(Bt!==null)return Bt;let e=cl();return Bt=ul(e,pi??{}),Bt}var ue=null,Yt=[],yt=0,pl=5,Ao=null,Oo=null,$o=null,Ho=null,Io=null,_o=null;function fi(e){_o=e}function Mn(e){ue&&ue.readyState===WebSocket.OPEN||(Io=e,ue=new WebSocket(`ws://localhost:${e}`),ue.onopen=()=>{let t=yt>0;yt=0,t&&Ho&&Ho()},ue.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&mi(n.tokens),n.type==="updatePropertyComplete"&&_o&&_o(n.success,n.errorCode,n.error),Yt.forEach(o=>o(n))}catch{}},ue.onclose=t=>{if(ue=null,t.code===4001){$o&&$o();return}if(yt<pl){let n=500*Math.pow(2,yt);yt++,Ao=setTimeout(()=>Mn(e),n)}else Oo&&Oo()},ue.onerror=()=>{})}function xe(e){ue&&ue.readyState===WebSocket.OPEN&&ue.send(JSON.stringify(e))}function He(e){return Yt.push(e),()=>{Yt=Yt.filter(t=>t!==e)}}function gi(){Ao&&clearTimeout(Ao),ue&&(ue.close(),ue=null),Yt=[]}function hi(e){Oo=e}function bi(e){$o=e}function yi(e){Ho=e}function vi(){Io&&(yt=0,Mn(Io))}j();var xt=null,K=null,jt=0,Nn=null,kn=null,ot=null,Fo=null,vt=null,Gt=null,zo=null,wi=null,ml='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>',Si='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path></svg>',Vo='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',fl='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>',Ei='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>',gl=`
  :host {
    all: initial;
  }
  ${xi}
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
    border-radius: ${L.md};
    font-family: ${C};
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
    border-radius: ${L.sm};
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
`;function Mi(e){let t=document.createElement("div");t.id="frameup-root",document.body.appendChild(t),xt=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=gl;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn eye-btn" title="Toggle originals (.)">
      ${Si}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${Vo}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Confirm</button>
    <button class="icon-btn close-btn" title="Close FrameUp">
      ${fl}
    </button>
  `,xt.appendChild(n),xt.appendChild(o),K=o.querySelector(".undo-btn");let r=o.querySelector(".close-btn");Nn=o.querySelector(".generate-btn"),kn=o.querySelector(".eye-btn"),vt=o.querySelector(".component-detail"),ot=document.createElement("div"),ot.className="toast",xt.appendChild(ot),K.addEventListener("click",()=>{xe({type:"undo"}),K&&(K.innerHTML='<div class="spinner"></div>',K.disabled=!0)}),r.addEventListener("click",e),kn.addEventListener("click",()=>{Gt&&Gt()}),Nn.addEventListener("click",()=>{zo&&zo()}),document.addEventListener("keydown",i=>{i.key==="."&&(i.ctrlKey||i.metaKey)&&!Ti()&&(Gt&&Gt(),i.preventDefault()),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!Ti()&&wi?.()&&i.preventDefault()}),hi(()=>{U("Disconnected. Click to reconnect."),vi()}),bi(()=>{U("Disconnected: another tab took over")}),yi(()=>{jt=0,K&&(K.disabled=!0)}),He(i=>{switch(i.type){case"reorderComplete":i.success?(jt++,K&&(K.innerHTML=Ei,setTimeout(()=>{K&&(K.innerHTML=Vo,K.disabled=!1)},200))):i.error&&U(i.error);break;case"undoComplete":i.success?(jt=Math.max(0,jt-1),K&&(K.innerHTML=Ei,setTimeout(()=>{K&&(K.innerHTML=Vo,K.disabled=jt===0)},200))):i.error&&U(i.error);break;case"devServerDisconnected":U("Dev server disconnected");break;case"devServerReconnected":U("Dev server reconnected");break}})}function Li(){let e=document.getElementById("frameup-root");e&&e.remove(),xt=null,K=null}function X(){return xt}function Ni(e){Gt=e}function ki(e){zo=e}function Ri(e){wi=e}function Rn(e){kn&&(kn.innerHTML=e?Si:ml)}function Pn(e){Nn&&(Nn.disabled=!e)}function Ie(e){if(!vt)return;if(!e){vt.className="component-detail empty",vt.textContent="No selection";return}vt.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";vt.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function U(e){ot&&(ot.textContent=e,ot.classList.add("visible"),Fo&&clearTimeout(Fo),Fo=setTimeout(()=>{ot?.classList.remove("visible")},2e3))}function Ti(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}rt();Et();it();it();var ic=.75,ea=32,_n=3,Dn=20,ta=100,Ce=1;function Tt(e,t,n){return Math.min(n,Math.max(t,e))}function ac(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,s=o+e.width/2,c=r+e.height/2,u=Tt(Math.ceil(e.width/ea),_n,Dn),d=Tt(Math.ceil(e.height/ea),_n,Dn);if(u*d>ta){let g=Math.sqrt(ta/(u*d));u=Tt(Math.floor(u*g),_n,Dn),d=Tt(Math.floor(d*g),_n,Dn)}let p=new Set,m=[],f=(g,y)=>{let x=Tt(Math.round(g),0,t-1),P=Tt(Math.round(y),0,n-1),H=`${x}:${P}`;p.has(H)||(p.add(H),m.push({x,y:P}))};f(o+Ce,r+Ce),f(i-Ce,r+Ce),f(o+Ce,a-Ce),f(i-Ce,a-Ce),f(s,r+Ce),f(s,a-Ce),f(o+Ce,c),f(i-Ce,c),f(s,c);for(let g=0;g<u;g++){let y=o+(g+.5)/u*e.width;for(let x=0;x<d;x++)f(y,r+(x+.5)/d*e.height)}return m}function na(e,t=tn,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=ac(e);for(let c of i)for(let u of document.elementsFromPoint(c.x,c.y))r.add(u);let a=[];for(let c of r){if(!t(c))continue;let u=c.getBoundingClientRect();if(u.width<=0||u.height<=0)continue;let d={left:u.left,top:u.top,right:u.left+u.width,bottom:u.top+u.height};if(n){let p=Math.max(o.left,d.left),m=Math.max(o.top,d.top),f=Math.min(o.right,d.right),g=Math.min(o.bottom,d.bottom),y=Math.max(0,f-p)*Math.max(0,g-m),x=u.width*u.height;x>0&&y/x>=ic&&a.push(c)}else o.left<d.right&&o.right>d.left&&o.top<d.bottom&&o.bottom>d.top&&a.push(c)}let s=a.filter(c=>!a.some(u=>u!==c&&u.contains(c)));return s.sort((c,u)=>{let d=c.compareDocumentPosition(u);return d&Node.DOCUMENT_POSITION_FOLLOWING?-1:d&Node.DOCUMENT_POSITION_PRECEDING?1:0}),s}j();function wt(e,t,n){return e+(t-e)*n}j();var sc=.35,oa=.3,Fn=.5,lc=2,le=null,N=null,hr=0,br=0,nn=1,Mt=null,oe=null,D=null,z=[],St=l.accent,cc="rgba(162,89,255,0.08)",ra="rgba(162,89,255,0.15)",dc=4,ia=10,uc="#ffffff",pc=St,mc=1.5,xr=!0,Ke=null;function sa(){let e=X();e&&(le=document.createElement("canvas"),le.setAttribute("data-frameup-overlay","true"),le.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(le),Cr(),window.addEventListener("resize",Cr))}function Vn(e,t=4){if(!e){oe&&(oe.targetOpacity=0,Fe());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!oe||!oe.initialized?oe=wr(n,t):(oe.target=n,oe.borderRadius=t,oe.targetOpacity=1),Fe()}function at(e,t=4){if(!e){D&&(D.targetOpacity=0,Fe());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!D||!D.initialized?D=wr(n,t):(D.target=n,D.borderRadius=t,D.targetOpacity=1),Fe()}function la(e){Ke=e,Fe()}function Er(){Ke=null,Fe()}function ca(e){for(D=null;z.length>e.length;)z.pop();for(let t=0;t<e.length;t++){let n=e[t],o={x:n.rect.left,y:n.rect.top,w:n.rect.width,h:n.rect.height};t<z.length?(z[t].target=o,z[t].borderRadius=n.borderRadius,z[t].targetOpacity=1):z.push(wr(o,n.borderRadius))}Fe()}function on(){z=[],Fe()}function Tr(e,t){if(!xr)return null;let n=pa();if(!n)return null;let o=ga(n.x,n.y,n.w,n.h);for(let r of o){let i=e-r.x,a=t-r.y;if(i*i+a*a<=ia*ia)return r.corner}return null}function da(){return pa()}function ua(){Mt!==null&&cancelAnimationFrame(Mt),window.removeEventListener("resize",Cr),le?.remove(),le=null,N=null,oe=null,D=null,z=[],Ke=null}function pa(){if(z.length>1)return ma(z);if(D&&D.opacity>=.5){let{x:e,y:t,w:n,h:o}=D.current;return{x:e,y:t,w:n,h:o}}if(z.length===1){let{x:e,y:t,w:n,h:o}=z[0].current;return{x:e,y:t,w:n,h:o}}return null}function ma(e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,r=-1/0;for(let i of e){let{x:a,y:s,w:c,h:u}=i.current;a<t&&(t=a),s<n&&(n=s),a+c>o&&(o=a+c),s+u>r&&(r=s+u)}return{x:t,y:n,w:o-t,h:r-n}}function wr(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function Cr(){le&&(nn=Math.max(window.devicePixelRatio||1,lc),hr=window.innerWidth,br=window.innerHeight,le.width=hr*nn,le.height=br*nn,le.style.width=`${hr}px`,le.style.height=`${br}px`,N=le.getContext("2d"),Fe())}function Fe(){Mt===null&&(Mt=requestAnimationFrame(fa))}function fa(){if(Mt=null,!N||!le)return;let e=!1;oe?.initialized&&(yr(oe,sc)&&(e=!0),oe.opacity<.01&&oe.targetOpacity===0&&(oe=null)),D?.initialized&&(yr(D,oa)&&(e=!0),D.opacity<.01&&D.targetOpacity===0&&(D=null));for(let t=z.length-1;t>=0;t--){let n=z[t];n.initialized&&yr(n,oa)&&(e=!0),n.opacity<.01&&n.targetOpacity===0&&z.splice(t,1)}if(N.setTransform(1,0,0,1,0,0),N.clearRect(0,0,le.width,le.height),N.setTransform(nn,0,0,nn,0,0),oe&&vr(N,oe,St,cc),D&&(vr(N,D,St,ra),xr&&aa(N,D.current,D.opacity)),Ke){if(N.save(),N.globalAlpha=.6,N.strokeStyle=St,N.lineWidth=1,N.setLineDash([4,4]),Ke.verticalLine){let{x:t,top:n,bottom:o}=Ke.verticalLine;N.beginPath(),N.moveTo(t,n),N.lineTo(t,o),N.stroke()}if(Ke.horizontalLine){let{y:t,left:n,right:o}=Ke.horizontalLine;N.beginPath(),N.moveTo(n,t),N.lineTo(o,t),N.stroke()}N.restore()}if(z.length>0){for(let t of z)vr(N,t,St,ra);if(xr&&z.length>0){let t=ma(z);t&&t.w>=24&&t.h>=24&&(z.length>1&&(N.globalAlpha=.6,N.beginPath(),N.rect(t.x,t.y,t.w,t.h),N.strokeStyle=St,N.lineWidth=1,N.setLineDash([4,4]),N.stroke(),N.setLineDash([]),N.globalAlpha=1),aa(N,t,1))}}e&&(Mt=requestAnimationFrame(fa))}function yr(e,t){let n=e.current,o=e.target,r=wt(n.x,o.x,t),i=wt(n.y,o.y,t),a=wt(n.w,o.w,t),s=wt(n.h,o.h,t),c=wt(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<Fn&&Math.abs(i-o.y)<Fn&&Math.abs(a-o.w)<Fn&&Math.abs(s-o.h)<Fn&&Math.abs(c-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=s,e.opacity=c,!0)}function vr(e,t,n,o){let{x:r,y:i,w:a,h:s}=t.current;if(a<=0||s<=0)return;let c=Math.min(t.borderRadius,a/2,s/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,a,s,c):e.rect(r,i,a,s),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function ga(e,t,n,o){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+n,y:t},{corner:"br",x:e+n,y:t+o},{corner:"bl",x:e,y:t+o}]}function aa(e,t,n){if(t.w<24||t.h<24)return;e.globalAlpha=n;let o=ga(t.x,t.y,t.w,t.h);for(let r of o)e.beginPath(),e.arc(r.x,r.y,dc,0,Math.PI*2),e.fillStyle=uc,e.fill(),e.strokeStyle=pc,e.lineWidth=mc,e.stroke();e.globalAlpha=1}var fc=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],gc=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],hc=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],bc=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],yc=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],Lt=[...fc,...gc,...hc,...bc,...yc];j();var vc=new Set(["auto","none","normal","inherit","initial"]);function ha(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let s=document.createElement("input");s.type="text",s.className="prop-input",s.style.cssText="width:60px; cursor:text;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${C};`,a.appendChild(s),a.appendChild(c);let u=new Map(t);function d(){return u.get(r.key)??r.defaultValue}function p(m){let f=parseFloat(m);s.value=isNaN(f)?m:String(f);try{let y=ui(i,m).find(x=>x.cssValue===m);y?.token?c.textContent=`${r.tailwindPrefix}-${y.token}`:c.textContent=""}catch{c.textContent=""}}return s.addEventListener("blur",()=>{let m=s.value.trim(),f=parseFloat(m);if(isNaN(f))vc.has(m)?(u.set(r.key,m),p(m),n(r.key,m),o()):p(d());else{let y=m.match(/(px|rem|em|%|vw|vh|ch)$/)?m:`${f}px`;u.set(r.key,y),p(y),n(r.key,y),o()}}),s.addEventListener("keydown",m=>{m.key==="Enter"?s.blur():m.key==="Escape"&&(p(d()),s.blur())}),p(d()),{element:a,setValue(m,f){m===r.key&&(u.set(m,f),p(f))},destroy(){}}}j();function ba(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${l.bgTertiary};
    border-radius:${L.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let s=t.get(r.key)??r.defaultValue,c=[];function u(d){s=d;for(let{btn:p,value:m,opt:f}of c){let g=m===d;p.style.background=g?l.accent:"transparent",p.style.color=g?l.textOnAccent:l.textSecondary,p.title=g&&f.tailwindValue?`${f.label} (${f.tailwindValue})`:f.label}}for(let d of i){let p=document.createElement("button");p.style.cssText=`
      display:flex;
      align-items:center;
      justify-content:center;
      padding:2px 6px;
      border:none;
      border-radius:${L.xs};
      font-family:${C};
      font-size:10px;
      cursor:pointer;
      background:transparent;
      color:${l.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g," "),p.textContent=d.icon??d.label,p.title=d.label,p.addEventListener("click",()=>{u(d.value),n(r.key,d.value),o()}),c.push({btn:p,value:d.value,opt:d}),a.appendChild(p)}return u(s),{element:a,setValue(d,p){d===r.key&&u(p)},destroy(){}}}j();j();function rn(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,s=0;a!==0&&(r===t?s=((n-o)/a+(n<o?6:0))*60:r===n?s=((o-t)/a+2)*60:s=((t-n)/a+4)*60);let c=r===0?0:a/r*100,u=r*100;return{h:s,s:c,v:u}}function zn(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),s=o*(1-i*n),c=o*(1-(1-i)*n),u,d,p;switch(r%6){case 0:u=o,d=c,p=a;break;case 1:u=s,d=o,p=a;break;case 2:u=a,d=o,p=c;break;case 3:u=a,d=s,p=o;break;case 4:u=c,d=a,p=o;break;case 5:u=o,d=a,p=s;break;default:u=0,d=0,p=0}let m=f=>Math.round(f*255).toString(16).padStart(2,"0");return`#${m(u)}${m(d)}${m(p)}`}var Ze=null;function an(e){Nt();let t=X();if(!t)return;let n=document.createElement("div");n.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${R.lg};
    border-radius: ${L.md};
    font-family: ${C};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${M.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let b=n.getBoundingClientRect();b.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-b.width-8}px`),b.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-b.height-8}px`),n.style.opacity="1"});let o=rn(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let b=xc(["Fill","Text"],0,T=>{r=T===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(b)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),s=document.createElement("div");s.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${R.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(s),n.appendChild(c);function u(){let b=o.h,T=a.createLinearGradient(0,0,176,0);T.addColorStop(0,`hsl(${b}, 0%, 100%)`),T.addColorStop(1,`hsl(${b}, 100%, 50%)`),a.fillStyle=T,a.fillRect(0,0,176,120);let _=a.createLinearGradient(0,0,0,120);_.addColorStop(0,"rgba(0,0,0,0)"),_.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=_,a.fillRect(0,0,176,120);let J=o.s/100*176,Q=(1-o.v/100)*120;s.style.left=`${J}px`,s.style.top=`${Q}px`}let d=!1;i.addEventListener("mousedown",b=>{d=!0,p(b)});function p(b){let T=i.getBoundingClientRect(),_=Math.max(0,Math.min(176,b.clientX-T.left)),J=Math.max(0,Math.min(120,b.clientY-T.top));o.s=_/176*100,o.v=(1-J/120)*100,u(),$()}let m=document.createElement("canvas");m.width=176,m.height=14,m.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let f=m.getContext("2d"),g=document.createElement("div");g.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${R.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let y=document.createElement("div");y.style.cssText="position:relative;width:176px;height:14px;",y.appendChild(m),y.appendChild(g),n.appendChild(y);function x(){let b=f.createLinearGradient(0,0,176,0);for(let T=0;T<=6;T++)b.addColorStop(T/6,`hsl(${T*60}, 100%, 50%)`);f.fillStyle=b,f.fillRect(0,0,176,14),g.style.left=`${o.h/360*176}px`}let P=!1;m.addEventListener("mousedown",b=>{P=!0,H(b)});function H(b){let T=m.getBoundingClientRect(),_=Math.max(0,Math.min(176,b.clientX-T.left));o.h=_/176*360,x(),u(),$()}let A=document.createElement("input");A.type="text",A.value=zn(o),A.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: ${L.sm};
    color: ${l.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,A.addEventListener("keydown",b=>{b.key==="Enter"&&A.blur(),b.stopPropagation()}),A.addEventListener("blur",()=>{let b=A.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(b)){let T=b.startsWith("#")?b:`#${b}`;o=rn(T),u(),x(),$()}else A.value=zn(o)}),n.appendChild(A);let V=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],E=document.createElement("div");E.style.cssText="display:flex;gap:4px;justify-content:center;";for(let b of V){let T=document.createElement("button");T.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${b};
      border: 1px solid ${l.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${M.fast};
    `,T.addEventListener("mouseenter",()=>{T.style.boxShadow=R.sm}),T.addEventListener("mouseleave",()=>{T.style.boxShadow="none"}),T.addEventListener("click",()=>{o=rn(b),u(),x(),A.value=b,$()}),E.appendChild(T)}if(n.appendChild(E),e.projectColors&&e.projectColors.length>0){let b=document.createElement("div");b.textContent="Project",b.style.cssText=`
      font-size: 10px;
      color: ${l.textSecondary};
      font-family: ${C};
      margin-top: 2px;
    `,n.appendChild(b);let T=document.createElement("div");T.style.cssText="display:flex;gap:4px;flex-wrap:wrap;max-height:48px;overflow-y:auto;";for(let{token:_,hex:J}of e.projectColors){let Q=document.createElement("button");Q.title=_,Q.style.cssText=`
        width: 12px; height: 12px; border-radius: 50%;
        background: ${J};
        border: 1px solid ${l.border};
        cursor: pointer; padding: 0;
        transition: box-shadow ${M.fast};
      `,Q.addEventListener("mouseenter",()=>{Q.style.boxShadow=R.sm}),Q.addEventListener("mouseleave",()=>{Q.style.boxShadow="none"}),Q.addEventListener("click",()=>{o=rn(J),u(),x(),A.value=J,$(),e.onPickedToken?.(_)}),T.appendChild(Q)}n.appendChild(T)}function $(){let b=zn(o);A.value=b,e.onColorChange(b),e.onPickedToken?.(void 0)}t.appendChild(n),Ze=n,u(),x();let ce=b=>{d&&p(b),P&&H(b)},de=()=>{d=!1,P=!1};document.addEventListener("mousemove",ce),document.addEventListener("mouseup",de);let k=b=>{b.key==="Escape"&&Nt()};document.addEventListener("keydown",k,!0);let Y=b=>{Ze&&!b.composedPath().includes(Ze)&&Nt()};setTimeout(()=>document.addEventListener("mousedown",Y,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",ce),document.removeEventListener("mouseup",de),document.removeEventListener("keydown",k,!0),document.removeEventListener("mousedown",Y,!0)},n._onClose=e.onClose}function Nt(){Ze&&(Ze._cleanup?.(),Ze._onClose?.(),Ze.remove(),Ze=null)}function xc(e,t,n){let o=document.createElement("div");o.style.cssText=`
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
      font-family: ${C}; font-size: 12px; cursor: pointer;
      transition: background ${M.fast}, color ${M.fast};
    `,a.addEventListener("click",()=>{r.forEach((s,c)=>{s.style.background=c===i?l.bgPrimary:"transparent",s.style.boxShadow=c===i?R.sm:"none",s.style.color=c===i?l.textPrimary:l.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var Sr=null;function Cc(){return Sr||(Sr=document.createElement("canvas").getContext("2d")),Sr}function ya(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${L.sm};
    border:1px solid ${l.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("input");s.type="text",s.placeholder="#rrggbb",s.className="prop-input",s.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${C};`,i.appendChild(a),i.appendChild(s),i.appendChild(c);let u=t.get(r.key)??r.defaultValue,d=!1;function p(g){let y=g.trim().toLowerCase();if(y==="transparent")return"transparent";if(y==="inherit"||y==="currentcolor"||y==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(y))return y;let x=Cc();x.fillStyle="#000000",x.fillStyle=y;let P=x.fillStyle;if(P.startsWith("#"))return P;let H=P.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(H){let A=parseInt(H[1],10),V=parseInt(H[2],10),E=parseInt(H[3],10);return`#${((1<<24)+(A<<16)+(V<<8)+E).toString(16).slice(1)}`}return"#000000"}function m(g){u=g,s.value=g,g==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=g;try{let y=Wt(),x=Sn(g,y.colorsReverse);x?c.textContent=`${r.tailwindPrefix??"bg"}-${x}`:c.textContent=""}catch{c.textContent=""}}function f(){if(d)return;let g=s.value.trim();if(!g){m(u);return}let y=p(g);m(y),n(r.key,y),o()}return a.addEventListener("click",()=>{if(d){Nt(),d=!1;return}let g=a.getBoundingClientRect();d=!0,an({initialColor:p(u),position:{x:g.left-210,y:g.top},showPropertyToggle:!1,onColorChange:y=>{m(y),n(r.key,y)},onClose:()=>{d=!1,o()}})}),s.addEventListener("keydown",g=>{g.key==="Enter"?(f(),s.blur()):g.key==="Escape"&&(m(u),s.blur())}),s.addEventListener("blur",()=>{f()}),s.addEventListener("input",()=>{let g=s.value.trim(),y=p(g);a.style.background=y}),m(u),{element:i,setValue(g,y){g===r.key&&m(y)},destroy(){d&&(Nt(),d=!1)}}}j();function va(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function xa(e,t,n,o){let r=new Map(t),i=[];for(let S of e){let w=va(S.key);w&&i.push({descriptor:S,...w})}let a=document.createElement("div");a.style.cssText=`
    display:flex;
    flex-direction:column;
    gap:4px;
    font-family:${C};
    font-size:10px;
    color:${l.textSecondary};
    position:relative;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("div");s.style.cssText="position:relative; padding:4px;";let c=document.createElement("div");c.style.cssText=`
    background:${l.marginBoxBg};
    border:1px dashed ${l.marginBoxBorder};
    border-radius:${L.sm};
    padding:10px;
    position:relative;
  `.trim().replace(/\n\s*/g," ");let u=document.createElement("div");u.style.cssText=`
    background:${l.paddingBoxBg};
    border:1px dashed ${l.paddingBoxBorder};
    border-radius:${L.sm};
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
  `.trim().replace(/\n\s*/g," "),d.textContent="content";let p=[];function m(S){let w=document.createElement("span"),fe=r.get(S.key)??S.defaultValue;return w.textContent=H(fe),w.title=S.label,w.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),w.addEventListener("mouseenter",()=>{w.style.background=l.bgTertiary}),w.addEventListener("mouseleave",()=>{(document.activeElement!==f||f.dataset.key!==S.key)&&(w.style.background="transparent")}),w.addEventListener("click",()=>{x(S,w)}),p.push({key:S.key,span:w,descriptor:S}),w}let f=document.createElement("input");f.type="text",f.className="prop-input",f.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(f);let g=null,y=null;function x(S,w){g&&g!==S&&P(),g=S,y=w,f.dataset.key=S.key;let fe=r.get(S.key)??S.defaultValue;f.value=H(fe);let te=0,nt=0,Ue=w;for(;Ue&&Ue!==a;)te+=Ue.offsetLeft,nt+=Ue.offsetTop,Ue=Ue.offsetParent;f.style.display="block",f.style.left=`${te}px`,f.style.top=`${nt}px`;let di=w.getBoundingClientRect();f.style.width=`${Math.max(40,di.width+10)}px`,f.focus(),f.select()}function P(){if(!g||!y)return;let S=f.value.trim(),w=g,fe=y,te,nt=parseFloat(S),Ue=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(nt)?Ue.has(S)?te=S:te=r.get(w.key)??w.defaultValue:te=S.match(/(px|rem|em|%|vw|vh|ch)$/)?S:`${nt}px`,r.set(w.key,te),fe.textContent=H(te),fe.style.background="transparent",f.style.display="none",f.dataset.key="",g=null,y=null,n(w.key,te),o()}f.addEventListener("keydown",S=>{if(S.key==="Enter")P();else if(S.key==="Escape"){if(g&&y){let w=r.get(g.key)??g.defaultValue;y.textContent=H(w)}f.style.display="none",f.dataset.key="",g=null,y=null}}),f.addEventListener("blur",()=>{P()});function H(S){let w=parseFloat(S);return isNaN(w)?S:w===Math.round(w)?String(Math.round(w)):S}function A(S){let w=document.createElement("span");return w.textContent=S,w.style.cssText=`
      font-size:9px;
      color:${l.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),w}function V(S,w){return i.find(fe=>fe.layer===S&&fe.side===w)}function E(S,w){let fe=V(S,w);if(!fe){let te=document.createElement("span");return te.textContent="-",te.style.cssText=`text-align:center; color:${l.textTertiary};`,te}return m(fe.descriptor)}let $=E("padding","top");$.style.gridRow="1",$.style.gridColumn="2",$.style.textAlign="center";let ce=E("padding","left");ce.style.gridRow="2",ce.style.gridColumn="1";let de=E("padding","right");de.style.gridRow="2",de.style.gridColumn="3";let k=E("padding","bottom");k.style.gridRow="3",k.style.gridColumn="2",k.style.textAlign="center",d.style.gridRow="2",d.style.gridColumn="2",u.appendChild($),u.appendChild(ce),u.appendChild(d),u.appendChild(de),u.appendChild(k);let Y=document.createElement("div");Y.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let b=E("margin","top");b.style.gridRow="1",b.style.gridColumn="2",b.style.textAlign="center";let T=E("margin","left");T.style.gridRow="2",T.style.gridColumn="1";let _=E("margin","right");_.style.gridRow="2",_.style.gridColumn="3";let J=E("margin","bottom");J.style.gridRow="3",J.style.gridColumn="2",J.style.textAlign="center";let Q=document.createElement("div");Q.style.cssText="grid-row:2; grid-column:2;",Q.appendChild(u),Y.appendChild(b),Y.appendChild(T),Y.appendChild(Q),Y.appendChild(_),Y.appendChild(J);let Tn=A("margin"),il=A("padding"),wn=document.createElement("div");return wn.style.cssText="display:flex; gap:8px; padding:0 4px;",wn.appendChild(Tn),wn.appendChild(il),c.appendChild(Y),s.appendChild(c),a.appendChild(wn),a.appendChild(s),{element:a,setValue(S,w){if(!va(S))return;r.set(S,w);let te=p.find(nt=>nt.key===S);te&&(te.span.textContent=H(w))},destroy(){}}}j();var Bn=new Set;function Ca(e){return Bn.has(e)}var Wn=[];function Ea(e){return Wn.push(e),()=>{let t=Wn.indexOf(e);t>=0&&Wn.splice(t,1)}}var Ec={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},Tc={"number-scrub":ha,segmented:ba,"color-swatch":ya,"box-model":xa},wc=`
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
    border-radius: ${L.xs};
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
`;function Sc(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function Mc(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function Lc(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}var Nc=new Set(["flexDirection","justifyContent","alignItems","gap"]);function kc(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function Mr(e,t,n,o){let r=document.createElement("div");r.className="prop-sections";let i=document.createElement("style");i.textContent=wc,r.appendChild(i);let a=[],s=Mc(e);for(let[c,u]of s){let d=c==="layout"&&!kc(t)?u.filter(x=>!Nc.has(x.key)):u;if(d.length===0)continue;let p=document.createElement("div");p.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${Ec[c]}</span>${Sc()}`;let f=document.createElement("div");f.className="prop-section-body";let g=Bn.has(c);if(g){let x=m.querySelector(".prop-section-chevron");x&&x.classList.add("collapsed"),f.classList.add("collapsed")}m.addEventListener("click",()=>{if(g=!g,g)Bn.add(c);else{Bn.delete(c);for(let P of Wn)P(c)}let x=m.querySelector(".prop-section-chevron");x&&x.classList.toggle("collapsed",g),f.classList.toggle("collapsed",g)}),p.appendChild(m);let y=Lc(d);for(let x of y){let P=Tc[x.controlType];if(!P)continue;let H=P(x.descriptors,t,n,o);if(x.descriptors.length>1||x.controlType==="box-model")f.appendChild(H.element);else{let A=document.createElement("div");A.className="prop-control-row";let V=document.createElement("span");V.className="prop-control-label",V.textContent=x.descriptors[0].label,V.title=x.descriptors[0].label;let E=document.createElement("div");E.className="prop-control-value",E.appendChild(H.element),A.appendChild(V),A.appendChild(E),f.appendChild(A)}a.push(H)}p.appendChild(f),r.appendChild(p)}return{container:r,controls:a}}j();var Rc=300,Ta=260,wa=380,Sa="frameup-sidebar-width",Pc=4,Ac=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${l.bgPrimary};
    border-left: 1px solid ${l.border};
    box-shadow: ${R.lg};
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
    width: ${Pc}px;
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
    border-radius: ${L.sm};
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
    border-radius: ${L.xs};
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
`;function Oc(){try{let e=localStorage.getItem(Sa);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=Ta&&t<=wa)return t}}catch{}return Math.min(Rc,Math.floor(window.innerWidth*.22))}function $c(e){try{localStorage.setItem(Sa,String(e))}catch{}}function Ma(e,t){let n=document.createElement("style");n.textContent=Ac,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${Oc()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let s=document.createElement("div");s.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let u=document.createElement("div");u.className="prop-sidebar-file-path",a.appendChild(s),a.appendChild(u);let d=document.createElement("button");d.className="prop-sidebar-close",d.title="Close panel",d.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>',i.appendChild(a),i.appendChild(d),o.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",o.appendChild(p);let m=document.createElement("div");m.className="prop-sidebar-content",o.appendChild(m),e.appendChild(o);let f=!1,g=0,y=0;r.addEventListener("pointerdown",k=>{k.preventDefault(),k.stopPropagation(),f=!0,g=k.clientX,y=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(k.pointerId)}),r.addEventListener("pointermove",k=>{if(!f)return;let Y=g-k.clientX,b=Math.max(Ta,Math.min(wa,y+Y));o.style.width=`${b}px`});let x=()=>{f&&(f=!1,r.classList.remove("active"),$c(o.offsetWidth))};r.addEventListener("pointerup",x),r.addEventListener("pointercancel",x),o.addEventListener("pointerdown",k=>k.stopPropagation()),o.addEventListener("mousedown",k=>k.stopPropagation()),o.addEventListener("click",k=>k.stopPropagation()),o.addEventListener("mouseup",k=>k.stopPropagation()),d.addEventListener("click",()=>{A(),t&&t()});let P=!1;function H(k,Y,b,T){s.textContent=`<${k}>`,s.appendChild(c),u.textContent=`${Y}:${b}`,u.title=`${Y}:${b}`,m.innerHTML="",m.appendChild(T),P||(P=!0,o.offsetHeight,o.classList.add("visible"))}function A(){P&&(P=!1,o.classList.remove("visible"))}function V(k){m.innerHTML="",m.appendChild(k)}function E(k,Y,b){p.innerHTML="";let T=document.createElement("span");T.className="prop-sidebar-warning-text",T.textContent=k;let _=document.createElement("button");_.className="prop-sidebar-warning-btn",_.textContent=Y,_.addEventListener("click",J=>{J.stopPropagation(),b()}),p.appendChild(T),p.appendChild(_),p.style.display="flex"}function $(){p.style.display="none",p.innerHTML=""}function ce(){c.classList.add("active")}function de(){c.classList.remove("active")}return{show:H,hide:A,isVisible:()=>P,getElement:()=>o,replaceContent:V,showWarning:E,clearWarning:$,showSaving:ce,hideSaving:de}}we();rt();Et();var Hr=new Map(Lt.map(e=>[e.key,e]));var Ic=new Set(["layout","spacing","size"]),Ba=new Set(["typography","background"]),_c=5e3,h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map},ct=[],F,Wa,he=null,Dc=300,Se=null,Rt=null,oo=new MutationObserver(()=>{h.selectedElement&&!document.contains(h.selectedElement)&&(clearTimeout(Wa),Wa=setTimeout(()=>{Fc()},80))});function Fc(){let e=h.elementIdentity,t=h.componentInfo;if(!e||!t){At();return}let n=Vc(e);if(n){Pt(n,t);return}zc(e).then(o=>{o?Pt(o,t):At()})}function Vc(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);for(;o;){if(ge(o)){let r=o._debugSource,i=se(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function zc(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);if(!o)continue;let r=await Re(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let s="";if(i.fileName){let c=Le(i.fileName);Pe(c)&&(s=c)}if(s&&e.filePath.endsWith(s)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}function Bc(e,t){let n=getComputedStyle(e),o=new Map;for(let r of Lt){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function Wc(e){if(!h.selectedElement)return;let t=getComputedStyle(h.selectedElement);for(let n of Lt){if(n.group!==e||h.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;h.currentValues.set(n.key,r),h.originalValues.get(n.key)===n.defaultValue&&h.originalValues.set(n.key,r);for(let i of ct)i.setValue(n.key,r)}}function dn(){for(let e of ct)e.destroy();ct=[]}function Ya(){if(!h.selectedElement||!h.componentInfo)return;dn();let{container:e,controls:t}=Mr(Lt,h.currentValues,un,ro);ct=t,F.replaceContent(e)}function ro(){he&&clearTimeout(he),he=setTimeout(()=>{he=null,_r()},Dc)}function Ir(){he&&(clearTimeout(he),he=null),Rt&&(Rt(),Rt=null),Se&&(clearTimeout(Se.timeoutId),Se=null),h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map}}function ja(e){F=Ma(e,()=>{io(),dn(),Ir()}),fi((t,n,o)=>{if(F&&F.hideSaving(),Se)if(clearTimeout(Se.timeoutId),t)Se=null;else{let{batch:r,previousOriginals:i}=Se;Se=null;for(let[a]of r){let s=i.get(a);s!==void 0&&h.originalValues.set(a,s)}if(h.selectedElement){for(let[a]of r){h.selectedElement.style[a]="",h.activeOverrides.delete(a);let s=h.originalValues.get(a);s!==void 0&&h.currentValues.set(a,s)}for(let a of ct)for(let[s]of r){let c=h.originalValues.get(s);c!==void 0&&a.setValue(s,c)}}if(F){let s={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";F.showWarning(s,"Dismiss",()=>F.clearWarning())}}else if(!t&&F){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";F.showWarning(i,"Dismiss",()=>F.clearWarning())}})}function Pt(e,t){h.pendingBatch.size>0&&_r(),dn(),h.selectedElement=e,h.componentInfo=t,h.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(Ic);for(let a of Ba)Ca(a)||n.add(a);let o=Bc(e,n);h.currentValues=o,h.originalValues=new Map(o),h.activeOverrides=new Map,h.pendingBatch=new Map,Rt&&Rt(),Rt=Ea(a=>{Ba.has(a)&&Wc(a)});let{container:r,controls:i}=Mr(Lt,h.currentValues,un,ro);ct=i,oo.disconnect(),oo.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),F.show(t.componentName,t.filePath,t.lineNumber,r)}function un(e,t){let n=Hr.get(e);if(!n||!h.selectedElement)return;h.selectedElement.style[n.key]=t,h.activeOverrides.set(e,t),h.currentValues.set(e,t);let o=Wt(),r=n.tailwindScale+"Reverse",i=o[r],a=i?Sn(t,i):null;if(!a&&n.enumValues){let s=n.enumValues.find(c=>c.value===t);s&&(a=s.tailwindValue)}if(h.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:h.originalValues.get(e)||n.defaultValue}),e==="display")if(Ya(),t==="none"){let s=h.originalValues.get("display")||"block";F.showWarning("Element hidden","Restore",()=>{h.selectedElement&&(h.selectedElement.style.display=s),h.activeOverrides.delete("display"),h.currentValues.set("display",s),h.pendingBatch.delete("display"),Ya(),F.clearWarning()})}else F.clearWarning()}function _r(){if(h.pendingBatch.size===0||!h.componentInfo)return;let e=h.componentInfo.filePath,t=h.componentInfo.lineNumber,n=h.componentInfo.columnNumber-1;if(h.pendingBatch.size===1){let a=[...h.pendingBatch.values()][0],s=Hr.get(a.property);xe({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:n,...a,framework:"tailwind",classPattern:s?.classPattern,standalone:s?.standalone})}else xe({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:n,updates:[...h.pendingBatch.values()].map(a=>{let s=Hr.get(a.property);return{...a,classPattern:s?.classPattern,standalone:s?.standalone}}),framework:"tailwind"});h.selectedElement&&h.elementIdentity&&Jn({type:"propertyChange",elementIdentity:h.elementIdentity,element:h.selectedElement,overrides:[...h.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),F&&F.showSaving();let o=new Map;for(let[a]of h.pendingBatch)o.set(a,h.originalValues.get(a)||"");for(let[a,s]of h.pendingBatch)h.originalValues.set(a,s.value);let r=new Map(h.pendingBatch),i=setTimeout(()=>{Se&&Se.batch===r&&(Se=null,F&&F.hideSaving())},_c);Se={batch:r,previousOriginals:o,timeoutId:i},h.pendingBatch.clear()}function io(){if(h.selectedElement){for(let[e]of h.activeOverrides)h.selectedElement.style[e]="";for(let[e,t]of h.originalValues)h.currentValues.set(e,t);for(let e of ct)for(let[t,n]of h.originalValues)e.setValue(t,n);h.activeOverrides.clear(),h.pendingBatch.clear()}}function At(){he&&(clearTimeout(he),he=null),oo.disconnect(),io(),dn(),F&&F.hide(),Ir()}function Ga(){he&&(clearTimeout(he),he=null),oo.disconnect(),_r(),dn(),F&&F.hide(),Ir()}function Ua(){return h.activeOverrides.size>0}lr()||cr({onCommitFiberRoot(){}});async function Yc(e){let t=ne(e);if(!t)return null;try{let n=await Re(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||De(i))continue;let a="";if(r.fileName){let s=Le(r.fileName);Pe(s)&&(a=s)}o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0)return{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}}catch(n){console.warn("[FrameUp] getOwnerStack failed, falling back to fiber walk:",n)}return Xa(e,t)}function Xa(e,t){let n=[],o=t;for(;o;){if(ge(o)){let r=se(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",s=0,c=0;i&&(a=i.fileName||"",s=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!De(r)&&n.push({componentName:r,filePath:a,lineNumber:s,columnNumber:c})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function Ka(e){let t=ne(e);return t?Xa(e,t):null}var G=null,W=null,Ye=!1,$t=!1,O=new Map,v=null,Ne=null,Be="idle",B=null,Ot=null,Me=null,mo=null,pn=0,mn=0,Qe=[],ao=!1,jc=null,Gc=null,Uc=null,Xc=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${R.sm};
    border-radius: ${L.sm};
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
`;function Za(e){jc=e.onStart,Gc=e.onMove,Uc=e.onEnd}function qa(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=Xc,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),Ne=document.createElement("div"),Ne.className="marquee-box",e.appendChild(Ne),Ye=!0,document.addEventListener("mousedown",so,!0),document.addEventListener("mousemove",lo,!0),document.addEventListener("mouseup",co,!0),document.addEventListener("keydown",po,!0),document.addEventListener("click",uo,!0),document.addEventListener("scroll",We,!0),window.addEventListener("resize",We),$t=!0}function so(e){if(!Ye||e.metaKey||e.ctrlKey)return;let t=document.elementFromPoint(e.clientX,e.clientY);if(t?.closest("#frameup-root"))return;if(G||O.size>0){let o=Tr(e.clientX,e.clientY);if(o){e.preventDefault(),e.stopPropagation();let r=da();if(Me=o,mo=r?{...r}:null,O.size>0){Qe=[];for(let[i]of O){let a=getComputedStyle(i);Qe.push({element:i,width:parseFloat(a.width)||i.offsetWidth,height:parseFloat(a.height)||i.offsetHeight})}pn=0,mn=0}else if(W){let i=getComputedStyle(W);pn=parseFloat(i.width)||W.offsetWidth,mn=parseFloat(i.height)||W.offsetHeight,Qe=[]}B={x:e.clientX,y:e.clientY},Be="resize-drag";return}}if(e.preventDefault(),e.stopPropagation(),!t||!tn(t)){(G||O.size>0)&&(Ga(),G=null,W=null,fo(),at(null),v&&(v.classList.remove("visible"),v.style.display="none"),Ie(null));return}B={x:e.clientX,y:e.clientY},Ot=t,ao=e.shiftKey,Be="pending"}function lo(e){if(Ye){if(Be==="resize-drag"&&Me&&B&&mo){e.preventDefault(),e.stopPropagation();let t=e.clientX-B.x,n=e.clientY-B.y;if(Qe.length>0){for(let o of Qe){let r=o.width,i=o.height;Me==="tr"||Me==="br"?r=Math.max(10,o.width+t):r=Math.max(10,o.width-t),Me==="bl"||Me==="br"?i=Math.max(10,o.height+n):i=Math.max(10,o.height-n),o.element.style.width=`${Math.round(r)}px`,o.element.style.height=`${Math.round(i)}px`}fn()}else{let o=pn,r=mn;Me==="tr"||Me==="br"?o=Math.max(10,pn+t):o=Math.max(10,pn-t),Me==="bl"||Me==="br"?r=Math.max(10,mn+n):r=Math.max(10,mn-n),o=Math.round(o),r=Math.round(r),un("width",`${o}px`),un("height",`${r}px`),We()}return}if(Be==="pending"&&B){let t=Math.abs(e.clientX-B.x),n=Math.abs(e.clientY-B.y);(t>10||n>10)&&(Be="marquee")}if(Be==="marquee"&&B&&Ne){let t=Math.min(e.clientX,B.x),n=Math.min(e.clientY,B.y),o=Math.abs(e.clientX-B.x),r=Math.abs(e.clientY-B.y);Ne.style.display="block",Ne.style.left=`${t}px`,Ne.style.top=`${n}px`,Ne.style.width=`${o}px`,Ne.style.height=`${r}px`;return}if(Be==="idle"){if(G&&W||O.size>0){let i=Tr(e.clientX,e.clientY);if(i){document.body.style.cursor=i==="tl"||i==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let n=document.elementFromPoint(e.clientX,e.clientY);if(!n||!tn(n)){Vn(null);return}let o=n.getBoundingClientRect(),r=parseFloat(getComputedStyle(n).borderRadius)||4;Vn(o,r+2)}}}function co(e){if(!Ye)return;let t=Be;if(Be="idle",t==="resize-drag"){document.body.style.cursor="",Me=null,mo=null,B=null,Qe.length>0?Qe=[]:ro();return}if(t==="marquee"&&B){Ne&&(Ne.style.display="none"),Kc(Math.min(e.clientX,B.x),Math.min(e.clientY,B.y),Math.max(e.clientX,B.x),Math.max(e.clientY,B.y)),B=null,Ot=null,ao=!1;return}Ot&&(ao?Zc(Ot):(fo(),Ja(Ot))),B=null,Ot=null,ao=!1}async function Ja(e,t){try{let n=e.getBoundingClientRect();W=e,Dr(n,{}),qc();let o=await Yc(e);if(console.log("[FrameUp] selectElement:",e.tagName,"\u2192",o?.componentName,o?.filePath,"stack:",o?.stack?.map(r=>r.componentName)),!o)return;if(G={tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber,columnNumber:o.columnNumber,stack:o.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}},v){let r=o.filePath?`${o.filePath}:${o.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${o.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||Pt(e,G),Ie({tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber})}catch(n){console.error("[FrameUp] selectElement error:",n)}}function Kc(e,t,n,o){let r=na({x:e,y:t,width:n-e,height:o-t});if(r.length!==0){At(),G=null,W=null,at(null),v&&(v.classList.remove("visible"),v.style.display="none"),O.clear();for(let i of r.slice(0,50)){let a=Ka(i);if(!a)continue;let s=i.getBoundingClientRect(),c={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:s.top,left:s.left,width:s.width,height:s.height}};O.set(i,{element:i,info:c})}if(O.size!==0){if(O.size===1){let[i,a]=[...O.entries()][0];O.clear(),W=i,G=a.info;let s=i.getBoundingClientRect();if(Dr(s,G),v){let c=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${c?`<span class="comp-path">${c}</span>`:""}`}Pt(i,G),Ie({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}fn(),Ie(null),v&&(v.innerHTML=`<span class="comp-name">${O.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function Zc(e){if(O.has(e)){if(O.delete(e),O.size===1){let[r,i]=[...O.entries()][0];O.clear(),on(),W=r,G=i.info;let a=r.getBoundingClientRect();if(Dr(a,G),Pt(r,G),v){let s=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${s?`<span class="comp-path">${s}</span>`:""}`}Ie({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else O.size===0?(on(),je()):(fn(),v&&(v.innerHTML=`<span class="comp-name">${O.size} elements selected</span>`));return}let t=Ka(e);if(!t)return;G&&W&&O.size===0&&(O.set(W,{element:W,info:G}),At(),G=null,W=null,at(null));let n=e.getBoundingClientRect(),o={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}};O.set(e,{element:e,info:o}),fn(),Ie(null),v&&(v.innerHTML=`<span class="comp-name">${O.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function fo(){O.clear(),on()}function fn(){if(O.size===0){on();return}let e=[];for(let[t]of O){let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:n,borderRadius:o+2})}ca(e)}function uo(e){Ye&&(e.metaKey||e.ctrlKey||e.preventDefault())}function po(e){if(Ye&&e.key==="Escape"){if(O.size>0){fo(),v&&(v.classList.remove("visible"),v.style.display="none"),Ie(null),e.preventDefault();return}if(G){if(Ua()){io(),e.preventDefault();return}je(),e.preventDefault()}}}function Dr(e,t){if(W){let n=parseFloat(getComputedStyle(W).borderRadius)||4;at(e,n+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function We(){if(O.size>0){fn();return}if(!W||!G)return;let e=W.getBoundingClientRect(),t=parseFloat(getComputedStyle(W).borderRadius)||4;if(at(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function qc(){Vn(null)}function je(){At(),G=null,W=null,Me=null,mo=null,Qe=[],fo(),document.body.style.cursor="",at(null),v&&(v.classList.remove("visible"),v.style.display="none"),Ie(null)}function Qa(){return G}function es(){Ye=!1,document.removeEventListener("mousedown",so,!0),document.removeEventListener("mousemove",lo,!0),document.removeEventListener("mouseup",co,!0),document.removeEventListener("keydown",po,!0),document.removeEventListener("click",uo,!0),document.removeEventListener("scroll",We,!0),window.removeEventListener("resize",We),$t=!1,v?.remove(),v=null}function Fr(e){e&&!$t?(document.addEventListener("mousedown",so,!0),document.addEventListener("mousemove",lo,!0),document.addEventListener("mouseup",co,!0),document.addEventListener("keydown",po,!0),document.addEventListener("click",uo,!0),document.addEventListener("scroll",We,!0),window.addEventListener("resize",We),$t=!0,Ye=!0):!e&&$t&&(document.removeEventListener("mousedown",so,!0),document.removeEventListener("mousemove",lo,!0),document.removeEventListener("mouseup",co,!0),document.removeEventListener("keydown",po,!0),document.removeEventListener("click",uo,!0),document.removeEventListener("scroll",We,!0),window.removeEventListener("resize",We),$t=!1,Ye=!1)}function ts(){return W??null}async function Vr(e){await Ja(e,{skipSidebar:!0})}rt();var me=null,pe=null,et=null,ns=null,gn=!1,Ht=null,go=[],ho=new Map,bo=!1,Jc=`
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
`,It=null;function os(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=Jc,e.appendChild(t),Za({onStart:Qc,onMove:ed,onEnd:td}),He(n=>{n.type==="reorderComplete"&&(zr(),je())})}function Qc(e,t,n){et=n,ns=t,Ht={x:e.clientX,y:e.clientY},gn=!1,bo=!1,go=[],ho=new Map,It=null;let o=X();if(!o)return;me=document.createElement("div"),me.className="drag-preview";let r=t.getBoundingClientRect();me.style.width=`${r.width}px`,me.style.height=`${r.height}px`,me.innerHTML=t.outerHTML,o.appendChild(me),pe=document.createElement("div"),pe.className="drop-indicator",o.appendChild(pe);let i=n.stack[1];if(!i)return;xe({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=He(s=>{if(s.type!=="siblingsList")return;a(),go=s.siblings;let c=document.querySelectorAll("*");for(let u of c){if(u.closest("#frameup-root"))continue;let d=ne(u);if(!d)continue;let p=d;for(;p;){if(ge(p)){let m=p._debugSource||p._debugOwner?._debugSource;if(m){for(let f of s.siblings)m.lineNumber===f.lineNumber&&m.fileName===i.filePath&&ho.set(f.lineNumber,{el:u,rect:u.getBoundingClientRect()});break}}p=p.return}}bo=!0})}function ed(e){if(!Ht)return;let t=Math.abs(e.clientX-Ht.x),n=Math.abs(e.clientY-Ht.y);if(t<5&&n<5||(gn=!0,me&&(me.style.display="block",me.style.left=`${e.clientX+10}px`,me.style.top=`${e.clientY+10}px`),!bo||!et))return;let o=null,r=1/0,i=0,a=0,s=0;for(let c of go){if(c.lineNumber===et.lineNumber)continue;let u=ho.get(c.lineNumber);if(!u)continue;let d=u.rect,p=d.top+d.height/2,m=Math.abs(e.clientY-p);m<r&&(r=m,o=c,e.clientY<p?i=d.top-2:i=d.bottom+2,a=d.left,s=d.width)}It=o,o&&pe?(pe.style.display="block",pe.style.top=`${i}px`,pe.style.left=`${a}px`,pe.style.width=`${s}px`):pe&&(pe.style.display="none")}function td(e){if(!gn||!It||!et){zr();return}xe({type:"reorder",filePath:et.filePath,fromLine:et.lineNumber,toLine:It.lineNumber,fromComponent:et.componentName,toComponent:It.componentName}),me&&(me.style.display="none"),pe&&(pe.style.display="none"),gn=!1,Ht=null}function zr(){me?.remove(),pe?.remove(),me=null,pe=null,et=null,ns=null,gn=!1,Ht=null,bo=!1,go=[],ho=new Map,It=null}function rs(){zr()}j();we();var dt="http://www.w3.org/2000/svg",_t=null,re=null,Br=null;function is(){let e=X();e&&(_t=document.createElementNS(dt,"svg"),_t.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),re=document.createElementNS(dt,"g"),re.setAttribute("class","annotation-root"),_t.appendChild(re),e.appendChild(_t),window.addEventListener("scroll",yo,{passive:!0}),Br=eo(yo),yo())}function yo(){if(!re)return;let{scale:e,offsetX:t,offsetY:n}=ze();re.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function as(e,t,n,o){if(!re||t.length<2)return null;let r=document.createElementNS(dt,"g");r.setAttribute("data-annotation-id",e);let i=document.createElementNS(dt,"path");return i.setAttribute("d",ds(t)),i.setAttribute("stroke",n),i.setAttribute("stroke-width",String(o)),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.setAttribute("fill","none"),r.appendChild(i),re.appendChild(r),r}function ss(e,t,n,o,r,i){if(!re)return null;let a=document.createElementNS(dt,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${R.sm};
    padding: 4px 8px;
    border-radius: ${L.sm};
    font-size: ${r}px;
    font-family: ${C};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,s.textContent=o,a.appendChild(s),re.appendChild(a),a}function ls(e){if(!re)return;let t=re.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function Wr(){re&&(re.innerHTML="")}function cs(){window.removeEventListener("scroll",yo),Br?.(),Br=null,_t?.remove(),_t=null,re=null}function ds(e){if(e.length===0)return"";let t=`M${e[0].x},${e[0].y}`;for(let n=1;n<e.length;n++)t+=` L${e[n].x},${e[n].y}`;return t}function us(e,t){if(!re)return null;let n=[],o=document.createElementNS(dt,"g"),r=document.createElementNS(dt,"path");return r.setAttribute("stroke",e),r.setAttribute("stroke-width",String(t)),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("fill","none"),o.appendChild(r),re.appendChild(o),{path:r,group:o,addPoint(i,a){n.push({x:i,y:a}),r.setAttribute("d",ds(n))},getPoints(){return n}}}jn();we();j();hn();rt();Et();j();mt();we();we();it();var ud=new Set(["IMG","INPUT","VIDEO","IFRAME","CANVAS","SELECT","TEXTAREA","HR","BR","EMBED","OBJECT","PROGRESS"]),ee=null,ft="",Co="",To="",be=null,Qr="",ei=null,xo=null;function Ss(){return ee!==null}function Ms(){document.addEventListener("dblclick",ks,!0),ei=He(e=>{e.type==="updateTextComplete"&&pd(e)})}function Ls(){ee&&Os(),document.removeEventListener("dblclick",ks,!0),ei?.(),ei=null}function pd(e){if(!e.success&&e.reason==="no-match"&&xo){let t=xo,n={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,originalText:t.originalText,newText:t.newText},o={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};Ar(n,o,t.originalInnerHTML)}xo=null}function Ns(e){return!!(e.scrollHeight>e.clientHeight+4||e.querySelector("br")||getComputedStyle(e).whiteSpace!=="nowrap"&&e.getClientRects().length>1)}async function md(e){let t=ne(e);if(!t)return null;try{let n=await Re(t);if(n&&n.length>0)for(let o of n){if(!o.functionName)continue;let r=o.functionName;if(r[0]!==r[0].toUpperCase()||De(r))continue;let i="";if(o.fileName){let a=Le(o.fileName);Pe(a)&&(i=a)}return{tagName:e.tagName.toLowerCase(),componentName:r,filePath:i,lineNumber:o.lineNumber??0,columnNumber:o.columnNumber??0,stack:[],boundingRect:e.getBoundingClientRect()}}}catch{}try{let n=t;for(;n;){if(ge(n)){let o=se(n.type),r=n._debugSource||n._debugOwner?._debugSource;if(o&&o[0]===o[0].toUpperCase()&&!De(o)&&r)return{tagName:e.tagName.toLowerCase(),componentName:o,filePath:r.fileName||"",lineNumber:r.lineNumber||0,columnNumber:r.columnNumber||0,stack:[],boundingRect:e.getBoundingClientRect()}}if(!n.return)break;n=n.return}}catch{}return null}function ks(e){ee&&Eo();let t=null,n=e.target;n instanceof HTMLElement&&n!==document.documentElement&&n!==document.body&&!n.hasAttribute("data-frameup-interaction")&&!n.closest("#frameup-root")?t=n:t=pt(e.clientX,e.clientY),t&&(ud.has(t.tagName)||t.textContent?.trim()&&fd(t))}function fd(e){if(ee=e,ft=e.textContent||"",Co=e.innerHTML,To=ft,be=null,md(e).then(t=>{ee===e&&(be=t)}),Qr=e.style.outline,e.style.outline=`2px solid ${l.accent}`,e.contentEditable="true",qr(!1),e.focus(),!Ns(e)){let t=window.getSelection();t&&(t.removeAllRanges(),t.selectAllChildren(e))}e.addEventListener("blur",Ps),e.addEventListener("keydown",As),e.addEventListener("input",Rs)}function Rs(){ee&&(To=ee.textContent||"")}function Ps(){Eo()}function As(e){if(e.key==="Escape"){e.preventDefault(),Eo();return}if(e.key==="Enter"&&ee&&!Ns(ee)){e.preventDefault(),Eo();return}e.stopPropagation()}function Eo(){if(!ee)return;let e=To;if(e!==ft&&be)if(be.filePath)xo={componentInfo:be,originalText:ft,newText:e,originalInnerHTML:Co,tagName:be.tagName},xe({type:"updateText",filePath:be.filePath,lineNumber:be.lineNumber,columnNumber:be.columnNumber,originalText:ft,newText:e});else{let n={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:be.componentName,filePath:"",lineNumber:0,columnNumber:0,originalText:ft,newText:e},o={componentName:be.componentName,filePath:"",lineNumber:0,columnNumber:0,tagName:be.tagName};Ar(n,o,Co)}Os()}function Os(){ee&&(ee.removeEventListener("blur",Ps),ee.removeEventListener("keydown",As),ee.removeEventListener("input",Rs),ee.removeAttribute("contenteditable"),ee.style.outline=Qr,yn(Zn()),ee=null,ft="",Co="",To="",be=null,Qr="")}var tt={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9093 12.3603L17.0007 20.8537L14.1816 21.8798L11.0902 13.3864L6.91797 16.5422L8.4087 1.63318L19.134 12.0959L13.9093 12.3603Z"></path></svg>',grab:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L16.2426 6.24264L14.8284 7.65685L12 4.82843L9.17157 7.65685L7.75736 6.24264L12 2ZM2 12L6.24264 7.75736L7.65685 9.17157L4.82843 12L7.65685 14.8284L6.24264 16.2426L2 12ZM22 12L17.7574 16.2426L16.3431 14.8284L19.1716 12L16.3431 9.17157L17.7574 7.75736L22 12ZM12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14ZM12 22L7.75736 17.7574L9.17157 16.3431L12 19.1716L14.8284 16.3431L16.2426 17.7574L12 22Z"></path></svg>',move:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 11V8L22 12L18 16V13H13V18H16L12 22L8 18H11V13H6V16L2 12L6 8V11H11V6H8L12 2L16 6H13V11H18Z"></path></svg>',draw:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>',color:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.5222 2 22 5.97778 22 10.8889C22 13.9556 19.5111 16.4444 16.4444 16.4444H14.4778C13.5556 16.4444 12.8111 17.1889 12.8111 18.1111C12.8111 18.5333 12.9778 18.9222 13.2333 19.2111C13.5 19.5111 13.6667 19.9 13.6667 20.3333C13.6667 21.2556 12.9 22 12 22C6.47778 22 2 17.5222 2 12C2 6.47778 6.47778 2 12 2ZM10.8111 18.1111C10.8111 16.0843 12.451 14.4444 14.4778 14.4444H16.4444C18.4065 14.4444 20 12.851 20 10.8889C20 7.1392 16.4677 4 12 4C7.58235 4 4 7.58235 4 12C4 16.19 7.2226 19.6285 11.324 19.9718C10.9948 19.4168 10.8111 18.7761 10.8111 18.1111ZM7.5 12C6.67157 12 6 11.3284 6 10.5C6 9.67157 6.67157 9 7.5 9C8.32843 9 9 9.67157 9 10.5C9 11.3284 8.32843 12 7.5 12ZM16.5 12C15.6716 12 15 11.3284 15 10.5C15 9.67157 15.6716 9 16.5 9C17.3284 9 18 9.67157 18 10.5C18 11.3284 17.3284 12 16.5 12ZM12 9C11.1716 9 10.5 8.32843 10.5 7.5C10.5 6.67157 11.1716 6 12 6C12.8284 6 13.5 6.67157 13.5 7.5C13.5 8.32843 12.8284 9 12 9Z"></path></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6V21H11V6H5V4H19V6H13Z"></path></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.53614 18.8862 7.33243 17.1346 5.86492L15 8V2L21 2L18.5535 4.44656C20.6649 6.28002 22 8.9841 22 12Z"></path></svg>'},$s=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",wo=navigator.platform.includes("Mac")?"Cmd":"Ctrl",oi=[{type:"pointer",icon:tt.pointer,label:"Pointer",shortcut:"V"},{type:"grab",icon:tt.grab,label:"Grab",shortcut:"G"},{type:"move",icon:tt.move,label:"Move",shortcut:"J"},{type:"draw",icon:tt.draw,label:"Draw",shortcut:"D"},{type:"text",icon:tt.text,label:"Text",shortcut:"T"}],gd=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${L.lg};
    box-shadow: ${R.md};
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
    box-shadow: ${R.sm};
    color: ${l.textPrimary};
    padding: 4px 8px;
    border-radius: ${L.sm};
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
    font-family: ${C};
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
    border-radius: ${L.lg};
    box-shadow: ${R.lg};
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
`,ye=null,ie=null,Mo=new Map,Ge=null,ti=null,ni=null;function Hs(e){ti=e}function Is(e){ni=e}function _s(e){Ge&&(Ge.disabled=!e)}function Ds(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=gd,e.appendChild(t),ye=document.createElement("div"),ye.className="tools-panel";let n=[["pointer","grab"],["move"],["draw","text"]];for(let s=0;s<n.length;s++){if(s>0){let c=document.createElement("div");c.className="tool-divider",ye.appendChild(c)}for(let c of n[s]){let u=oi.find(m=>m.type===c),d=document.createElement("button");d.className=`tool-btn${u.type==="pointer"?" active":""}`,d.innerHTML=`${u.icon}<span class="tooltip">${u.label}<span class="shortcut-badge">${$s}${u.shortcut}</span></span>`,d.addEventListener("click",()=>Rr(u.type));let p=null;d.addEventListener("mouseenter",()=>{p=setTimeout(()=>d.classList.add("tooltip-visible"),400)}),d.addEventListener("mouseleave",()=>{p&&clearTimeout(p),d.classList.remove("tooltip-visible")}),ye.appendChild(d),Mo.set(u.type,d)}}ie=document.createElement("div"),ie.className="sub-options hidden",ye.appendChild(ie);let o=document.createElement("div");o.className="tool-divider",ye.appendChild(o),Ge=document.createElement("button"),Ge.className="action-btn",Ge.innerHTML=tt.undo,Ge.title="Undo (Ctrl+Z)",Ge.disabled=!0,Ge.addEventListener("click",()=>{ni&&ni()}),ye.appendChild(Ge);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=tt.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{ti&&ti()}),ye.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=tt.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{xs(),i.style.color=vs()?l.accent:""}),ye.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8H14V6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5C21 8.433 19.433 10 17.5 10H16V14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5V16H10V17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14H8V10H6.5C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5V8ZM8 8V6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM10 10V14H14V10H10Z"></path></svg>',a.title=`Keyboard Shortcuts (${$s}/)`,a.addEventListener("click",()=>Vs()),ye.appendChild(a),e.appendChild(ye),document.addEventListener("keydown",Fs,!0)}function Fs(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||Ss()||!e.ctrlKey&&!e.metaKey)return;let n=e.key.toUpperCase();if(e.key==="/"||e.key==="?"){Vs(),e.preventDefault();return}let o=oi.find(r=>r.shortcut===n);o&&(Rr(o.type),e.preventDefault())}var Ae=null,vn=null;function Vs(){Ae?So():hd()}function hd(){let e=X();if(!e||Ae)return;Ae=document.createElement("div"),Ae.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:oi.map(r=>({action:r.label,keys:[wo,r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[wo,"Z"]},{action:"Toggle Originals",keys:[wo,"."]},{action:"Keyboard Shortcuts",keys:[wo,"/"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Grab Tool","Drag"]},{action:"Zoom",keys:["Scroll Wheel"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let s of r.items){let c=document.createElement("div");c.className="shortcut-row";let u=document.createElement("span");u.className="shortcut-action",u.textContent=s.action,c.appendChild(u);let d=document.createElement("span");d.className="shortcut-keys";for(let p=0;p<s.keys.length;p++){if(p>0){let f=document.createElement("span");f.className="shortcut-plus",f.textContent="+",d.appendChild(f)}let m=document.createElement("span");m.className="shortcut-key",m.textContent=s.keys[p],d.appendChild(m)}c.appendChild(d),i.appendChild(c)}t.appendChild(i)}Ae.appendChild(t),Ae.addEventListener("click",r=>{r.target===Ae&&So()}),e.appendChild(Ae),vn=r=>{So()},document.addEventListener("keydown",vn,!0)}function So(){vn&&(document.removeEventListener("keydown",vn,!0),vn=null),Ae?.remove(),Ae=null}function zs(e){for(let[t,n]of Mo)n.classList.toggle("active",t===e);bd(e)}function bd(e){if(ie){if(ie.innerHTML="",ie.classList.add("hidden"),ie.classList.remove("visible"),e==="draw"){ie.classList.remove("hidden"),requestAnimationFrame(()=>ie?.classList.add("visible"));let t=Te(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.brushColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();an({initialColor:t.brushColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){cn("brushColor",i),n.style.background=i},onClose(){}})}),ie.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[2,4,8]){let i=document.createElement("button");i.className=`segment${r===t.brushSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{cn("brushSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active"),Promise.resolve().then(()=>(mt(),ws)).then(a=>a.refreshDrawCursor())}),o.appendChild(i)}ie.appendChild(o)}else if(e==="text"){ie.classList.remove("hidden"),requestAnimationFrame(()=>ie?.classList.add("visible"));let t=Te(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();an({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){cn("textColor",i),n.style.background=i},onClose(){}})}),ie.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{cn("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}ie.appendChild(o)}}}function Bs(e){let t=Mo.get(e);t&&(t.style.backgroundColor=l.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function Ws(){document.removeEventListener("keydown",Fs,!0),So(),ye?.remove(),ye=null,ie=null,Mo.clear()}mt();Xr();it();j();var Ys="frameup-onboarding-seen",Oe=null,Lo=null;function js(){if(localStorage.getItem(Ys))return;let e=X();if(!e)return;Oe=document.createElement("div"),Oe.style.cssText=`
    position: fixed;
    left: 72px;
    top: 50%;
    transform: translateY(-50%);
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${R.md};
    border-radius: ${L.md};
    padding: 12px 16px;
    font-family: ${C};
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
    font-family: ${C};
    margin: 0 2px;
  `;Oe.innerHTML=`Press ${t.map(o=>`<span style="${n}">${o}</span>`).join(" ")} to switch tools`,e.appendChild(Oe),requestAnimationFrame(()=>{Oe&&(Oe.style.opacity="1")}),Lo=setTimeout(ri,5e3)}function ri(){Oe&&(localStorage.setItem(Ys,"1"),Oe.style.opacity="0",setTimeout(()=>{Oe?.remove(),Oe=null},150),Lo&&(clearTimeout(Lo),Lo=null))}we();function Gs(){Fr(!0)}function Us(){Fr(!1)}mt();hn();var ii=!1,ai=0,si=0,Xs={onMouseDown(e){ii=!0,ai=e.clientX,si=e.clientY,vo("grabbing")},onMouseMove(e){if(!ii)return;let t=e.clientX-ai,n=e.clientY-si;bs(t,n),ai=e.clientX,si=e.clientY},onMouseUp(e){ii=!1,vo("grab")}};jn();we();mt();function Ks(e,t,n,o,r,i){let a=e.left+e.width/2,s=e.top+e.height/2,c=t.left+t.width/2,u=t.top+t.height/2,d=c-a,p=u-s,m=Math.abs(d)<=r,f=Math.abs(p)<=r;return{dx:m?n+d/i:n,dy:f?o+p/i:o,snappedX:m,snappedY:f,guides:{verticalLine:m?{x:c,top:t.top,bottom:t.bottom}:null,horizontalLine:f?{y:u,left:t.left,right:t.right}:null}}}var q=null,xn={x:0,y:0},Vt={dx:0,dy:0},zt=!1,gt=!1,Cn=null,Zs={onMouseDown(e){Cn=null,zt=!1,gt=!1;let t=Je(e.clientX,e.clientY),n=pt(e.clientX,e.clientY);if(!n){je();return}let o=Or(n);if(o){q=o,xn={x:t.x,y:t.y},Vt={...o.delta},zt=!1,gt=!0,kt(o.element,o.delta.dx,o.delta.dy,o.existingTransform);return}let r=Qa(),i=ts();if(!r||!i||n!==i){Cn=n;return}let a=Or(i);if(a){q=a,xn={x:t.x,y:t.y},Vt={...a.delta},zt=!1,gt=!0,kt(a.element,a.delta.dx,a.delta.dy,a.existingTransform);return}let s=i.getBoundingClientRect(),c=i.style.cssText,u=getComputedStyle(i).transform,d={id:crypto.randomUUID(),componentRef:{componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber},element:i,placeholder:null,originalRect:s,delta:{dx:0,dy:0},originalCssText:c,existingTransform:u==="none"?"":u,identity:{componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber,columnNumber:r.columnNumber,tagName:i.tagName.toLowerCase()}};$a(d),q=d,xn={x:t.x,y:t.y},Vt={dx:0,dy:0},zt=!0,gt=!0,kt(i,0,0,d.existingTransform)},onMouseMove(e){if(!gt||!q)return;let t=Je(e.clientX,e.clientY),n=Vt.dx+(t.x-xn.x),o=Vt.dy+(t.y-xn.y);kt(q.element,n,o,q.existingTransform);let r=q.element.parentElement;if(!r||r===document.body||r===document.documentElement){q.delta={dx:n,dy:o},Er();return}let i=q.element.getBoundingClientRect(),a=r.getBoundingClientRect(),{scale:s}=ze(),c=Ks(i,a,n,o,5,s);(c.snappedX||c.snappedY)&&kt(q.element,c.dx,c.dy,q.existingTransform),q.delta={dx:c.dx,dy:c.dy},la(c.guides)},onMouseUp(){gt&&q&&(zt||Ha(q.id,q.delta,Vt),Na(q),Er(),Vr(q.element)),q=null,gt=!1,zt=!1,Cn&&(Vr(Cn),Cn=null)}};we();function No(e,t=2){if(e.length<=2)return e;let n=0,o=0,r=e[0],i=e[e.length-1];for(let a=1;a<e.length-1;a++){let s=yd(e[a],r,i);s>n&&(n=s,o=a)}if(n>t){let a=No(e.slice(0,o+1),t),s=No(e.slice(o),t);return[...a.slice(0,-1),...s]}return[r,i]}function yd(e,t,n){let o=n.x-t.x,r=n.y-t.y,i=o*o+r*r;if(i===0){let s=e.x-t.x,c=e.y-t.y;return Math.sqrt(s*s+c*c)}return Math.abs(r*e.x-o*e.y+n.x*t.y-n.y*t.x)/Math.sqrt(i)}rt();Et();it();mt();async function ko(e,t){let n=pt(e,t);if(!n)return null;let o=ne(n);if(!o)return null;try{let i=await Re(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let s=a.functionName;if(s[0]!==s[0].toUpperCase()||De(s))continue;let c="";if(a.fileName){let u=Le(a.fileName);Pe(u)&&(c=u)}return{componentName:s,filePath:c,lineNumber:a.lineNumber??0}}}catch{}let r=o;for(;r;){if(ge(r)){let i=se(r.type);if(i&&i[0]===i[0].toUpperCase()&&!De(i)){let a=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:a?.fileName||"",lineNumber:a?.lineNumber||0}}}r=r.return}return null}var $e=null,Ro=null,qs={onMouseDown(e){let t=Te();if($e=us(t.brushColor,t.brushSize),$e){let n=Je(e.clientX,e.clientY);$e.addPoint(n.x,n.y)}Ro=ko(e.clientX,e.clientY)},onMouseMove(e){if(!$e)return;let t=Je(e.clientX,e.clientY);$e.addPoint(t.x,t.y)},onMouseUp(e){if(!$e)return;let t=$e.getPoints(),n=Te();if($e.group.remove(),t.length<2){$e=null,Ro=null;return}let o=No(t,2),r=crypto.randomUUID();as(r,o,n.brushColor,n.brushSize);let i={type:"draw",id:r,points:o,color:n.brushColor,strokeWidth:n.brushSize,targetComponent:null};qn(i);let a=Ro;Ro=null,a?.then(s=>{i.targetComponent=s}),$e=null}};we();j();var ae=null,ht=null,Po=null,Qs={onMouseDown(e){ae&&Js();let t=Je(e.clientX,e.clientY);ht={pageX:t.x,pageY:t.y},ko(e.clientX,e.clientY).then(n=>{Po=n}),ae=document.createElement("input"),ae.type="text",ae.placeholder="Type annotation...",ae.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${l.bgPrimary};
      color: ${l.textPrimary};
      border: 1.5px solid ${l.accent};
      border-radius: ${L.sm};
      padding: 4px 8px;
      font-size: ${Te().fontSize}px;
      font-family: ${C};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${l.accentSoft};
    `,ae.setAttribute("data-frameup-overlay","true"),ae.addEventListener("keydown",n=>{n.key==="Enter"&&(Js(),n.preventDefault()),n.key==="Escape"&&(el(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(ae),ae.focus()},onMouseMove(){},onMouseUp(){}};function Js(){if(!ae||!ht)return;let e=ae.value.trim();if(ae.remove(),ae=null,!e)return;let t=Te(),n=crypto.randomUUID();ss(n,ht.pageX,ht.pageY,e,t.fontSize,t.textColor),qn({type:"text",id:n,position:ht,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:Po}),ht=null,Po=null}function el(){ae&&(ae.remove(),ae=null),ht=null,Po=null}function tl(){el()}hn();j();var bt=null,En=null;function nl(e){let t=e instanceof Error&&e.stack?e.stack:String(e);return/frameup|overlay/i.test(t)}function vd(e){let t=X();if(!t)return;bt&&bt.parentNode&&bt.parentNode.removeChild(bt),En&&clearTimeout(En);let n=document.createElement("div");n.setAttribute("style",["position: fixed","bottom: 72px","right: 16px","z-index: 2147483647","background: rgba(30, 30, 30, 0.92)","color: #fff",`font-family: ${C}`,"font-size: 12px","padding: 10px 14px",`border-radius: ${L.sm}`,`box-shadow: ${R.md}`,"max-width: 320px","display: flex","align-items: center","gap: 10px","opacity: 0",`transition: opacity ${M.medium}`].join("; "));let o=document.createElement("span");o.textContent=e,o.setAttribute("style","flex: 1;");let r=document.createElement("button");r.textContent="Dismiss",r.setAttribute("style",["background: rgba(255,255,255,0.15)","border: none","color: #fff",`font-family: ${C}`,"font-size: 11px","padding: 3px 8px",`border-radius: ${L.xs}`,"cursor: pointer","white-space: nowrap"].join("; ")),r.addEventListener("click",()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),En&&clearTimeout(En),bt=null}),n.appendChild(o),n.appendChild(r),t.appendChild(n),bt=n,requestAnimationFrame(()=>{n.style.opacity="1"}),En=setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),bt=null},8e3)}function li(e){console.error("[FrameUp]",e),vd("FrameUp encountered an error. Your app is unaffected.")}function xd(){window.addEventListener("error",e=>{nl(e.error??e.message)&&(li(e.error??e.message),e.preventDefault())}),window.addEventListener("unhandledrejection",e=>{nl(e.reason)&&(li(e.reason),e.preventDefault())})}var ci=null;function ol(e,t,n){t.originalCssText=n.style.cssText,t.element=n,st(t)}function Cd(){let e=window.__FRAMEUP_WS_PORT__;if(!e){console.warn("[FrameUp] No WebSocket port found.");return}if(document.getElementById("frameup-root"))return;Mn(e),Mi(Ed);let t=X();t&&ja(t),qa(),sa(),os(),is(),_a(r=>ls(r)),ci=new MutationObserver(()=>{for(let[r,i]of Oa())document.contains(i.element)||setTimeout(()=>{let a=Yn(i.identity);if(a){ol(r,i,a);return}ka(i.identity).then(s=>{s?ol(r,i,s):(Pr(r),U(`Component ${i.componentRef.componentName} removed \u2014 move cleared`))})},80)}),ci.observe(document.body,{childList:!0,subtree:!0}),Ds(),Ms(),Zr(),js(),Ft("grab",Xs),Ft("move",Zs),Ft("draw",qs),Ft("text",Qs),Pa((r,i)=>{ri(),Bs(r),i==="pointer"&&Us(),i==="text"&&tl(),Dt(),gr(),r==="pointer"&&Gs(),yn(r),zs(r)}),Aa(()=>{Pn(no()),_s(Va())}),Is(()=>{let r=$r();r&&U(`Undo: ${r}`)}),Ni(()=>{if(!no()){U("No moved components to toggle");return}let r=!Da();Fa(r),Rn(r)});let n=!1,o=0;ki(()=>{if(n){U("Generation in progress");return}let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);U(`Please wait ${a}s before retrying`);return}let i=za();if(!i.moves.length&&!i.annotations.length&&!i.colorChanges.length&&!i.textEdits.length){U("Nothing to confirm \u2014 make some visual changes first");return}n=!0,Pn(!1),U("Generating..."),xe({type:"generate",annotations:i})}),He(r=>{if(r.type==="generateProgress"&&U(r.message),r.type==="generateComplete")if(n=!1,Pn(no()),r.success){let i=r.changes.map(a=>a.description||a.filePath).join(", ");U(`Applied: ${i}`),je(),Wr(),to(),Rn(!0)}else U(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),Ri(()=>{let r=$r();return r?(U(`Undo: ${r}`),!0):!1}),Hs(()=>{je(),Wr(),to(),ys(),Rn(!0),U("Canvas cleared")}),console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools")}function Ed(){Dt(),gr(),es(),ua(),rs(),cs(),ci?.disconnect(),Ws(),Ls(),Jr(),to(),Ur(),gi(),Li()}function rl(){try{Cd(),xd()}catch(e){li(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",rl):rl();})();
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
