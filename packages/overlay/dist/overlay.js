"use strict";var FrameUp=(()=>{var qs=Object.defineProperty;var ye=(e,t)=>()=>(e&&(t=e(e=0)),t);var Js=(e,t)=>{for(var n in t)qs(e,n,{get:t[n],enumerable:!0})};var l,H,k,M,C,mi,j=ye(()=>{"use strict";l={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},H={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},k={xs:"4px",sm:"6px",md:"10px",lg:"14px"},M={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},C="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",mi=`
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
`});var Ho,Ut,Ti,sl,Gt,Si,Pn,Mi,wi,Yt,Rn,Ue,$o,jt,Io,yt,_o,On,Xt=ye(()=>{"use strict";Ho="0.5.32",Ut=`bippy-${Ho}`,Ti=Object.defineProperty,sl=Object.prototype.hasOwnProperty,Gt=()=>{},Si=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},Pn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),Mi=!1,Yt=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>Mi?!0:(e&&typeof e.inject=="function"&&(wi=e.inject.toString()),!!wi?.includes("(injected)")),Rn=new Set,Ue=new Set,$o=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:Ut,checkDCE:Si,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),Ue.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,Rn.forEach(a=>a())),i},on:Gt,onCommitFiberRoot:Gt,onCommitFiberUnmount:Gt,onPostCommitFiberRoot:Gt,renderers:t,supportsFiber:!0,supportsFlight:!0};try{Ti(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let s=o.renderers;o=a,s.size>0&&(s.forEach((c,u)=>{Ue.add(c),a.renderers.set(u,c)}),jt(e))}}});let r=window.hasOwnProperty,i=!1;Ti(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{jt(e)}return o},jt=e=>{e&&Rn.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=Si,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=Ut,t._instrumentationIsActive=!1;let n=Pn(t);if(n||(t.on=Gt),t.renderers.size){t._instrumentationIsActive=!0,Rn.forEach(i=>i());return}let o=t.inject,r=Yt(t);r&&!n&&(Mi=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return Ue.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,Rn.forEach(s=>s()),a}}(t.renderers.size||t._instrumentationIsActive||Yt())&&e?.()}catch{}},Io=()=>sl.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),yt=e=>Io()?(jt(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):$o(e),_o=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),On=()=>{try{_o()&&yt()}catch{}}});var Li=ye(()=>{"use strict";Xt();On()});function Zo(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await Jo(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=qo(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var Do,Fo,Vo,zo,Bo,Wo,Go,Yo,jo,Uo,Xo,Ko,fe,qo,Jo,Qo,se,er,tr,oe,ll,nr=ye(()=>{"use strict";Xt();Do=0,Fo=1,Vo=5,zo=11,Bo=13,Wo=15,Go=16,Yo=19,jo=26,Uo=27,Xo=28,Ko=30,fe=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};qo=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=qo(o,t,n);if(r)return r;o=n?null:o.sibling}return null},Jo=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await Jo(o,t,n);if(r)return r;o=n?null:o.sibling}return null},Qo=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?Qo(t.type||t.render):null},se=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=Qo(t);return o&&(o.displayName||o.name)||null},er=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||Pn(e)||Yt(e)},tr=e=>{let t=yt(e.onActive);t._instrumentationSource=e.name??Ut;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,s,c)=>{n!==i&&(n?.(a,s,c),e.onCommitFiberRoot?.(a,s,c))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,s)=>{t.onCommitFiberUnmount===i&&(o?.(a,s),e.onCommitFiberUnmount?.(a,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,s)=>{t.onPostCommitFiberRoot===i&&(r?.(a,s),e.onPostCommitFiberRoot?.(a,s))};t.onPostCommitFiberRoot=i}return t},oe=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},ll=Error()});var nt=ye(()=>{"use strict";Xt();Li();nr();});function Kt(e,t){let n=0,o=0,r=0;do r=Bi[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function Oi(e,t){return e.pos>=t?!1:e.peek()!==gl}function Wi(e){let{length:t}=e,n=new bl(e),o=[],r=0,i=0,a=0,s=0,c=0;do{let u=n.indexOf(";"),d=[],p=!0,f=0;for(r=0;n.pos<u;){let m;r=Kt(n,r),r<f&&(p=!1),f=r,Oi(n,u)?(i=Kt(n,i),a=Kt(n,a),s=Kt(n,s),Oi(n,u)?(c=Kt(n,c),m=[r,i,a,s,c]):m=[r,i,a,s]):m=[r],d.push(m),n.pos++}p||yl(d),o.push(d),n.pos=u+1}while(n.pos<=t);return o}function yl(e){e.sort(vl)}function vl(e,t){return e[0]-t[0]}var Ni,cl,dl,_i,ul,pl,Di,ml,Fi,fl,Vi,zi,ir,ki,Ri,gl,Pi,hl,Bi,bl,Gi,xl,Cl,Yi,Zt,An,El,Ai,Tl,wl,Sl,Ml,Hi,Ll,Nl,kl,Rl,Pl,$i,Ie,Ol,or,rr,Al,Hl,$l,Il,_l,Dl,Fl,Vl,ke,Ii,zl,Bl,Se,Re,vt=ye(()=>{"use strict";Xt();nr();Ni=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,cl=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],dl=["<anonymous>","eval",""],_i=/\.(jsx|tsx|ts|js)$/,ul=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,pl=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,Di="(at Server)",ml=/(^|@)\S+:\d+/,Fi=/^\s*at .*(\S+:\d+|\(native\))/m,fl=/^(eval@)?(\[native code\])?$/,Vi=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=ki(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(ml)){let i=Ri(r,void 0)[0];i&&o.push(i)}return ir(o,t)}return e.match(Fi)?ki(e,t):Ri(e,t)},zi=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},ir=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e,ki=(e,t)=>ir(e.split(`
`).filter(n=>!!n.match(Fi)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=zi(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}}),Ri=(e,t)=>ir(e.split(`
`).filter(n=>!n.match(fl)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,s=zi(o.replace(r,""));return{functionName:a,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:o}}}),gl=44,Pi="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",hl=new Uint8Array(64),Bi=new Uint8Array(128);for(let e=0;e<Pi.length;e++){let t=Pi.charCodeAt(e);hl[e]=t,Bi[t]=e}bl=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};Gi=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,xl=/^data:application\/json[^,]+base64,/,Cl=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,Yi=typeof WeakRef<"u",Zt=new Map,An=new Map,El=e=>Yi&&e instanceof WeakRef,Ai=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let d of r)if(d[0]<=o)i=d;else break;if(!i||i.length<4)return null;let[,a,s,c]=i;if(a===void 0||s===void 0||c===void 0)return null;let u=t[a];return u?{columnNumber:c,fileName:u,lineNumber:s+1}:null},Tl=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return Ai(o.map.mappings,o.map.sources,r,i)}return Ai(e.mappings,e.sources,t-1,n)},wl=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(Cl);a&&(o=a[1]||a[2])}if(!o)return null;let r=Gi.test(o);if(!(xl.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},Sl=e=>({file:e.file,mappings:Wi(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),Ml=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:Wi(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},Hi=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(Gi);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},Ll=async(e,t=fetch)=>{if(!Hi(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=wl(e,n);if(!o||!Hi(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?Ml(i):Sl(i)}catch{return null}},Nl=async(e,t=!0,n)=>{if(t&&Zt.has(e)){let i=Zt.get(e);if(i==null)return null;if(El(i)){let a=i.deref();if(a)return a;Zt.delete(e)}else return i}if(t&&An.has(e))return An.get(e);let o=Ll(e,n);t&&An.set(e,o);let r=await o;return t&&An.delete(e),t&&(r===null?Zt.set(e,null):Zt.set(e,Yi?new WeakRef(r):r)),r},kl=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await Nl(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=Tl(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),Rl=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",Pl=()=>{let e=yt();for(let t of[...Array.from(Ue),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},$i=e=>{for(let t of Ue){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},Ie=e=>`
    in ${e}`,Ol=(e,t)=>{let n=Ie(e);return t&&(n+=` (at ${t})`),n},or=!1,rr=(e,t)=>{if(!e||or)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,or=!0;let o=Pl();$i(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let d;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(f){d=f}Reflect.construct(e,[],p)}else{try{p.call()}catch(f){d=f}e.call(p.prototype)}}else{try{throw Error()}catch(f){d=f}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&d instanceof Error&&typeof p.stack=="string")return[p.stack,d.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,u]=s.DetermineComponentFrameRoot();if(c&&u){let d=c.split(`
`),p=u.split(`
`),f=0,m=0;for(;f<d.length&&!d[f].includes("DetermineComponentFrameRoot");)f++;for(;m<p.length&&!p[m].includes("DetermineComponentFrameRoot");)m++;if(f===d.length||m===p.length)for(f=d.length-1,m=p.length-1;f>=1&&m>=0&&d[f]!==p[m];)m--;for(;f>=1&&m>=0;f--,m--)if(d[f]!==p[m]){if(f!==1||m!==1)do if(f--,m--,m<0||d[f]!==p[m]){let h=`
${d[f].replace(" at new "," at ")}`,y=se(e);return y&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",y)),h}while(f>=1&&m>=0);break}}}finally{or=!1,Error.prepareStackTrace=n,$i(o),console.error=r,console.warn=i}let a=e?se(e):"";return a?Ie(a):""},Al=(e,t)=>{let n=e.tag,o="";switch(n){case Xo:o=Ie("Activity");break;case Fo:o=rr(e.type,!0);break;case zo:o=rr(e.type.render,!1);break;case Do:case Wo:o=rr(e.type,!1);break;case Vo:case jo:case Uo:o=Ie(e.type);break;case Go:o=Ie("Lazy");break;case Bo:o=e.child!==t&&t!==null?Ie("Suspense Fallback"):Ie("Suspense");break;case Yo:o=Ie("SuspenseList");break;case Ko:o=Ie("ViewTransition");break;default:return""}return o},Hl=e=>{try{let t="",n=e,o=null;do{t+=Al(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=Ol(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},$l=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},Il=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),_l=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,Dl=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!Il(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>_l(a,o))||(i.push(o),t.set(r,i))}return t},Fl=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(Di,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},Vl=e=>{let t=[];return Zo(e,n=>{if(!Rl(n))return;let o=typeof n.type=="string"?n.type:se(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:Vi($l(n._debugStack?.stack))})},!0),t},ke=async(e,t=!0,n)=>{let o=Vl(e),r=Vi(Hl(e)),i=Dl(o),a=new Map;return kl(r.map(s=>s.source?.includes(Di)??!1?Fl(s,i,a):s).filter((s,c,u)=>{if(c===0)return!0;let d=u[c-1];return s.functionName!==d.functionName}),t,n)},Ii=e=>e.split("/").filter(Boolean).length,zl=e=>e.split("/").filter(Boolean)[0]??null,Bl=e=>{let t=e.indexOf("/",1);if(t===-1||Ii(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!_i.test(n)||Ii(n)<2)return e;let o=zl(n);return!o||o.startsWith("@")||o.length>4?e:n},Se=e=>{if(!e||dl.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=Bl(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),s=i.indexOf(":");t=a!==-1&&(s===-1||a<s)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of cl)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if(Ni.test(t)){let i=t.match(Ni);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);pl.test(i)&&(t=t.slice(0,r))}return t},Re=e=>{let t=Se(e);return!(!t||!_i.test(t)||ul.test(t))}});function _e(e){return!!(Wl.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function ar(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}function sr(){qt=new WeakMap}function Ul(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function Xl(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=Yl}function Kl(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<Hn||o.height/window.innerHeight<Hn)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>jl}function Jt(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&ar(e)||e.closest("#frameup-root")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-placeholder"))return!1;let n=performance.now(),o=qt.get(e);if(o&&n-o.timestamp<Gl)return o.isValid;let r=window.getComputedStyle(e);return Ul(e,r)?e.clientWidth/window.innerWidth>=Hn&&e.clientHeight/window.innerHeight>=Hn&&(Xl(r)||Kl(e,r))?(qt.set(e,{isValid:!1,timestamp:n}),!1):(qt.set(e,{isValid:!0,timestamp:n}),!0):(qt.set(e,{isValid:!1,timestamp:n}),!1)}var Wl,Gl,Hn,Yl,jl,qt,ot=ye(()=>{"use strict";Wl=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);Gl=50,Hn=.9,Yl=2147483600,jl=1e3,qt=new WeakMap});function Mc(e,t,n){let o=n&&n!=="none"?` ${n}`:"";return`translate(${e}px, ${t}px)${o}`}function it(e){e.element.style.transform=Mc(e.delta.dx,e.delta.dy,e.existingTransform)}function va(e){e.existingTransform&&e.existingTransform!=="none"?e.element.style.transform=e.existingTransform:e.element.style.transform=""}function St(e,t,n,o){e.style.transform=`translate(${t}px, ${n}px) scale(1.02)${o&&o!=="none"?` ${o}`:""}`,e.style.boxShadow=H.lg,e.style.transition="none",e.style.zIndex="2147483644"}function xa(e){it(e),e.element.style.boxShadow="",e.element.style.transition="",e.element.style.zIndex=""}function Bn(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);for(;o;){if(fe(o)){let r=o._debugSource,i=se(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function Ca(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);if(!o)continue;let r=await ke(o);if(!r||r.length===0)continue;for(let i of r)if(!(!i.functionName||i.functionName!==e.componentName)&&i.fileName){let a=Se(i.fileName);if(Re(a)&&a.endsWith(e.filePath))return n}}catch{}return null}var Wn=ye(()=>{"use strict";nt();vt();j()});function Ta(e){return Gn.push(e),()=>{Gn=Gn.filter(t=>t!==e)}}function wa(e){return Yn.push(e),()=>{Yn=Yn.filter(t=>t!==e)}}function at(){Yn.forEach(e=>e())}function Sa(){return xr}function Er(e){let t=xr;t!==e&&(xr=e,Gn.forEach(n=>n(e,t)))}function Mt(){return{...Ea}}function an(e,t){Ea[e]=t}function Ma(){return Ce}function La(e){Ce.set(e.id,e),Xn({type:"moveCreate",moveId:e.id})}function Na(e,t,n){let o=Ce.get(e);o&&(o.delta=t,it(o),Xn({type:"moveDelta",moveId:e,previousDelta:n}))}function Tr(e){let t=Ce.get(e);t&&(t.element.style.cssText=t.originalCssText,t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),Ce.delete(e),at())}function ka(e){if(Fe.push(e),e.type==="colorChange"){let t=e;Ze.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else Ze.push({type:"annotationAdd",annotationId:e.id});at()}function wr(e,t,n){Fe.push(e),Ze.push({type:"textEditRestore",annotationId:e.id,elementIdentity:t,originalInnerHTML:n}),at()}function Pa(e){Ra=e}function vr(e){Fe=Fe.filter(t=>t.id!==e),Ra?.(e),at()}function Oa(){return Cr}function Aa(e){Cr=e;for(let t of Ce.values())e?it(t):va(t);at()}function Sr(e){for(let t of Ce.values())if(t.element===e)return t}function Mr(){let e=Ze.pop();if(!e)return null;switch(e.type){case"moveCreate":return Tr(e.moveId),"move removed";case"moveDelta":{let t=Ce.get(e.moveId);return t&&(t.delta=e.previousDelta,it(t)),"move reverted"}case"annotationAdd":return vr(e.annotationId),"annotation removed";case"colorChange":{let t=Fe.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),vr(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}case"textEditRestore":{let t=Bn(e.elementIdentity);return t&&(t.innerHTML=e.originalInnerHTML),vr(e.annotationId),"text edit reverted"}}return null}function Xn(e){Ze.push(e),at()}function Ve(){return{scale:rn,offsetX:jn,offsetY:Un}}function Kn(e,t,n){rn=e,jn=t,Un=n,on.forEach(o=>o())}function Zn(e){return on.push(e),()=>{on=on.filter(t=>t!==e)}}function sn(e,t){return{x:(e-jn)/rn,y:(t-Un)/rn}}function qn(){for(let e of Ce.values())e.element.style.cssText=e.originalCssText,e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder);for(let e of Fe)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of Ze)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}Ce=new Map,Fe=[],Ze=[],Cr=!0,rn=1,jn=0,Un=0,on.forEach(e=>e()),at()}function Jn(){return Ce.size>0||Fe.length>0}function Ha(){return Ze.length>0}function $a(){let e=Array.from(Ce.values()).map(r=>({component:r.componentRef.componentName,file:r.componentRef.filePath,line:r.componentRef.lineNumber,originalRect:{top:r.originalRect.top,left:r.originalRect.left,width:r.originalRect.width,height:r.originalRect.height},delta:{dx:r.delta.dx,dy:r.delta.dy},siblingRects:(()=>{let i=r.element.parentElement;if(!i)return;let a=[];for(let s of Array.from(i.children)){if(s===r.element||!(s instanceof HTMLElement))continue;let c=s.getBoundingClientRect();a.push({component:s.tagName.toLowerCase(),rect:{top:c.top,left:c.left,width:c.width,height:c.height}})}return a.length>0?a:void 0})()})),t=[],n=[],o=[];for(let r of Fe)r.type==="text"?t.push({type:"text",content:r.content,position:r.position,targetComponent:r.targetComponent?.componentName,targetFile:r.targetComponent?.filePath,targetLine:r.targetComponent?.lineNumber}):r.type==="colorChange"?n.push({component:r.component.componentName,file:r.component.filePath,line:r.component.lineNumber,property:r.property,from:r.fromColor,to:r.toColor,pickedToken:r.pickedToken}):r.type==="textEdit"&&o.push({component:r.componentName,file:r.filePath,line:r.lineNumber,column:r.columnNumber,originalText:r.originalText,newText:r.newText});return{moves:e,annotations:t,colorChanges:n,textEdits:o}}var Ce,Fe,Ze,xr,Cr,Ea,rn,jn,Un,on,Gn,Yn,Ra,Oe=ye(()=>{"use strict";Wn();Ce=new Map,Fe=[],Ze=[],xr="select",Cr=!0,Ea={fontSize:16,textColor:"#ffffff"},rn=1,jn=0,Un=0,on=[],Gn=[],Yn=[];Ra=null});function Qc(){Fr=document.body.style.background||document.body.style.backgroundColor||"",Vr=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",Z=document.createElement("div"),Z.setAttribute("data-frameup-canvas-wrapper","true"),Z.style.cssText=`
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
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="frameup-root"||r.hasAttribute("data-frameup-interaction")||r.hasAttribute("data-frameup-placeholder")||r.hasAttribute("data-frameup-annotation")||r.hasAttribute("data-frameup-dot-bg")||r.hasAttribute("data-frameup-canvas-wrapper"))||(ss.push(r),Z.appendChild(r));Z.style.position="relative",Z.style.zIndex="1",document.body.insertBefore(Ne,document.body.firstChild),document.body.insertBefore(Z,Ne.nextSibling),Dr=Zn(as),as(),ls.forEach(r=>r(Z))}function as(){if(!Z||!Ne)return;let{scale:e,offsetX:t,offsetY:n}=Ve();Z.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=qc*e,r=t%o,i=n%o;Ne.style.backgroundImage=`radial-gradient(circle, ${Jc} ${is}px, transparent ${is}px)`,Ne.style.backgroundSize=`${o}px ${o}px`,Ne.style.backgroundPosition=`${r}px ${i}px`}function ed(e,t,n){let{scale:o,offsetX:r,offsetY:i}=Ve(),a=Math.min(Kc,Math.max(Xc,o+n));if(a===o)return;let s=(e-r)/o,c=(t-i)/o,u=e-s*a,d=t-c*a;Kn(a,u,d)}function cs(e){e.preventDefault();let t=-e.deltaY*Zc,{scale:n}=Ve(),o=t*n;ed(e.clientX,e.clientY,o)}function ds(e,t){let{scale:n,offsetX:o,offsetY:r}=Ve();Kn(n,o+e,r+t)}function us(){Kn(1,0,0)}function ps(){return Z!==null}function ms(){Z?zr():Qc()}function zr(){if(ls.forEach(e=>e(null)),Dr?.(),Dr=null,Z){for(;Z.firstChild;)document.body.insertBefore(Z.firstChild,Z);Z.remove(),Z=null}Ne?.remove(),Ne=null,ss=[],document.body.style.background=Fr,document.documentElement.style.background=Vr,Fr="",Vr=""}var Xc,Kc,Zc,qc,is,Jc,Z,Ne,Dr,ss,ls,Fr,Vr,gn=ye(()=>{"use strict";Oe();j();Xc=.1,Kc=5,Zc=.002,qc=24,is=1,Jc="rgba(0,0,0,0.15)",Z=null,Ne=null,Dr=null,ss=[],ls=[],Fr="",Vr=""});function fs(e,t){if(!lt)return;let n=performance.now(),o=Math.abs(e-lt.clientX),r=Math.abs(t-lt.clientY),i=o<=2&&r<=2,a=n-lt.timestamp<16;if(i||a)return lt.element}function gs(e,t,n){lt={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function $t(){lt=null}var lt,Br=ye(()=>{"use strict";lt=null});var bs={};Js(bs,{activateInteraction:()=>bn,destroyInteraction:()=>jr,getPageElementAtPoint:()=>ct,initInteraction:()=>Gr,registerToolHandler:()=>It,setInteractionCursor:()=>ho,setInteractionPointerEvents:()=>Yr});function It(e,t){Wr.set(e,t)}function Gr(){W=document.createElement("div"),W.setAttribute("data-frameup-interaction","true"),W.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(W),document.addEventListener("scroll",$t,!0),W.addEventListener("mousedown",e=>{hn?.onMouseDown?.(e)}),W.addEventListener("mousemove",e=>{hn?.onMouseMove?.(e)}),W.addEventListener("mouseup",e=>{hn?.onMouseUp?.(e)}),document.addEventListener("wheel",hs,{passive:!1})}function hs(e){!W||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#frameup-root")||cs(e)}function bn(e){hn=Wr.get(e)||null,W&&(W.style.pointerEvents=e==="pointer"?"none":"auto"),td(e)}function td(e){if(W)switch(e){case"pointer":W.style.cursor="default";break;case"grab":W.style.cursor="grab";break;case"text":W.style.cursor="text";break;default:W.style.cursor="default"}}function ho(e){W&&(W.style.cursor=e)}function Yr(e){W&&(W.style.pointerEvents=e?"auto":"none")}function ct(e,t){let n=fs(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#frameup-root")&&!i.hasAttribute("data-frameup-interaction")&&!i.hasAttribute("data-frameup-placeholder")&&!(i===document.body||i===document.documentElement)&&!ar(i)){r=i;break}return gs(e,t,r),r}function jr(){document.removeEventListener("scroll",$t,!0),document.removeEventListener("wheel",hs),W?.remove(),W=null,hn=null,Wr.clear()}var W,hn,Wr,dt=ye(()=>{"use strict";Br();ot();gn();W=null,hn=null,Wr=new Map});function Qs(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),s=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+s).toString(16).slice(1)}`}return e}function el(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(x=>{try{return Array.from(x.cssRules)}catch{return[]}}).filter(x=>x instanceof CSSStyleRule&&x.selectorText===":root").flatMap(x=>Array.from(x.style)).filter(x=>x.startsWith("--")),n={},o={},r={},i={},a={},s={},c={},u={},d={},p={},f={},m={},h={},y={},L={},S={},$={},A={},F=(x,P,le,ce)=>{x[le]=ce,P[ce]=le};for(let x of t){let P=e.getPropertyValue(x).trim();if(!P)continue;let le=x.match(/^--spacing-(.+)$/);if(le){F(n,p,le[1],P);continue}let ce=x.match(/^--color-(.+)$/);if(ce){let En=ce[1];o[En]=P,f[Qs(P)]=En;continue}let R=x.match(/^--font-size-(.+)$/);if(R){F(r,m,R[1],P);continue}let G=x.match(/^--font-weight-(.+)$/);if(G){F(i,h,G[1],P);continue}let b=x.match(/^--radius-(.+)$/);if(b){F(a,y,b[1],P);continue}let E=x.match(/^--border-(.+)$/);if(E){F(s,L,E[1],P);continue}let I=x.match(/^--opacity-(.+)$/);if(I){F(c,S,I[1],P);continue}let Q=x.match(/^--tracking-(.+)$/);if(Q){F(u,$,Q[1],P);continue}let ee=x.match(/^--leading-(.+)$/);if(ee){F(d,A,ee[1],P);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:s,opacity:c,letterSpacing:u,lineHeight:d,spacingReverse:p,colorsReverse:f,fontSizeReverse:m,fontWeightReverse:h,borderRadiusReverse:y,borderWidthReverse:L,opacityReverse:S,letterSpacingReverse:$,lineHeightReverse:A}}var tl=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function nl(e,t){let n={};for(let o of tl){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function wn(e,t){return t.get(e)??null}function ri(e,t,n){let r=(n??Vt())[e],i=[];for(let[s,c]of r.entries()){let u=parseFloat(c);isNaN(u)||i.push({numericValue:u,token:s,cssValue:c})}let a=parseFloat(t);return isNaN(a)||i.some(c=>c.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((s,c)=>s.numericValue-c.numericValue),i}var ii=null,Ft=null;function ai(e){ii=e,Ft=null}function Vt(){if(Ft!==null)return Ft;let e=el();return Ft=nl(e,ii??{}),Ft}var de=null,zt=[],gt=0,ol=5,So=null,Mo=null,Lo=null,No=null,ko=null,Ro=null;function si(e){Ro=e}function Sn(e){de&&de.readyState===WebSocket.OPEN||(ko=e,de=new WebSocket(`ws://localhost:${e}`),de.onopen=()=>{let t=gt>0;gt=0,t&&No&&No()},de.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&ai(n.tokens),n.type==="updatePropertyComplete"&&Ro&&Ro(n.success,n.errorCode,n.error),zt.forEach(o=>o(n))}catch{}},de.onclose=t=>{if(de=null,t.code===4001){Lo&&Lo();return}if(gt<ol){let n=500*Math.pow(2,gt);gt++,So=setTimeout(()=>Sn(e),n)}else Mo&&Mo()},de.onerror=()=>{})}function ve(e){de&&de.readyState===WebSocket.OPEN&&de.send(JSON.stringify(e))}function He(e){return zt.push(e),()=>{zt=zt.filter(t=>t!==e)}}function li(){So&&clearTimeout(So),de&&(de.close(),de=null),zt=[]}function ci(e){Mo=e}function di(e){Lo=e}function ui(e){No=e}function pi(){ko&&(gt=0,Sn(ko))}j();var bt=null,K=null,Bt=0,Mn=null,Ln=null,tt=null,Po=null,ht=null,Wt=null,Ao=null,hi=null,rl='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>',bi='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path></svg>',Oo='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',il='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>',fi='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>',al=`
  :host {
    all: initial;
  }
  ${mi}
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
    box-shadow: ${H.md};
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
    box-shadow: ${H.md};
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
`;function yi(e){let t=document.createElement("div");t.id="frameup-root",document.body.appendChild(t),bt=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=al;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn eye-btn" title="Toggle originals (.)">
      ${bi}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${Oo}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Confirm</button>
    <button class="icon-btn close-btn" title="Close FrameUp">
      ${il}
    </button>
  `,bt.appendChild(n),bt.appendChild(o),K=o.querySelector(".undo-btn");let r=o.querySelector(".close-btn");Mn=o.querySelector(".generate-btn"),Ln=o.querySelector(".eye-btn"),ht=o.querySelector(".component-detail"),tt=document.createElement("div"),tt.className="toast",bt.appendChild(tt),K.addEventListener("click",()=>{ve({type:"undo"}),K&&(K.innerHTML='<div class="spinner"></div>',K.disabled=!0)}),r.addEventListener("click",e),Ln.addEventListener("click",()=>{Wt&&Wt()}),Mn.addEventListener("click",()=>{Ao&&Ao()}),document.addEventListener("keydown",i=>{i.key==="."&&(i.ctrlKey||i.metaKey)&&!gi()&&(Wt&&Wt(),i.preventDefault()),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!gi()&&hi?.()&&i.preventDefault()}),ci(()=>{U("Disconnected. Click to reconnect."),pi()}),di(()=>{U("Disconnected: another tab took over")}),ui(()=>{Bt=0,K&&(K.disabled=!0)}),He(i=>{switch(i.type){case"reorderComplete":i.success?(Bt++,K&&(K.innerHTML=fi,setTimeout(()=>{K&&(K.innerHTML=Oo,K.disabled=!1)},200))):i.error&&U(i.error);break;case"undoComplete":i.success?(Bt=Math.max(0,Bt-1),K&&(K.innerHTML=fi,setTimeout(()=>{K&&(K.innerHTML=Oo,K.disabled=Bt===0)},200))):i.error&&U(i.error);break;case"devServerDisconnected":U("Dev server disconnected");break;case"devServerReconnected":U("Dev server reconnected");break}})}function vi(){let e=document.getElementById("frameup-root");e&&e.remove(),bt=null,K=null}function X(){return bt}function xi(e){Wt=e}function Ci(e){Ao=e}function Ei(e){hi=e}function Nn(e){Ln&&(Ln.innerHTML=e?bi:rl)}function kn(e){Mn&&(Mn.disabled=!e)}function $e(e){if(!ht)return;if(!e){ht.className="component-detail empty",ht.textContent="No selection";return}ht.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";ht.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function U(e){tt&&(tt.textContent=e,tt.classList.add("visible"),Po&&clearTimeout(Po),Po=setTimeout(()=>{tt?.classList.remove("visible")},2e3))}function gi(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}nt();vt();ot();ot();var Zl=.75,ji=32,$n=3,In=20,Ui=100,xe=1;function xt(e,t,n){return Math.min(n,Math.max(t,e))}function ql(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,s=o+e.width/2,c=r+e.height/2,u=xt(Math.ceil(e.width/ji),$n,In),d=xt(Math.ceil(e.height/ji),$n,In);if(u*d>Ui){let h=Math.sqrt(Ui/(u*d));u=xt(Math.floor(u*h),$n,In),d=xt(Math.floor(d*h),$n,In)}let p=new Set,f=[],m=(h,y)=>{let L=xt(Math.round(h),0,t-1),S=xt(Math.round(y),0,n-1),$=`${L}:${S}`;p.has($)||(p.add($),f.push({x:L,y:S}))};m(o+xe,r+xe),m(i-xe,r+xe),m(o+xe,a-xe),m(i-xe,a-xe),m(s,r+xe),m(s,a-xe),m(o+xe,c),m(i-xe,c),m(s,c);for(let h=0;h<u;h++){let y=o+(h+.5)/u*e.width;for(let L=0;L<d;L++)m(y,r+(L+.5)/d*e.height)}return f}function Xi(e,t=Jt,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=ql(e);for(let c of i)for(let u of document.elementsFromPoint(c.x,c.y))r.add(u);let a=[];for(let c of r){if(!t(c))continue;let u=c.getBoundingClientRect();if(u.width<=0||u.height<=0)continue;let d={left:u.left,top:u.top,right:u.left+u.width,bottom:u.top+u.height};if(n){let p=Math.max(o.left,d.left),f=Math.max(o.top,d.top),m=Math.min(o.right,d.right),h=Math.min(o.bottom,d.bottom),y=Math.max(0,m-p)*Math.max(0,h-f),L=u.width*u.height;L>0&&y/L>=Zl&&a.push(c)}else o.left<d.right&&o.right>d.left&&o.top<d.bottom&&o.bottom>d.top&&a.push(c)}let s=a.filter(c=>!a.some(u=>u!==c&&u.contains(c)));return s.sort((c,u)=>{let d=c.compareDocumentPosition(u);return d&Node.DOCUMENT_POSITION_FOLLOWING?-1:d&Node.DOCUMENT_POSITION_PRECEDING?1:0}),s}j();function Ct(e,t,n){return e+(t-e)*n}j();var Jl=.35,Ki=.3,_n=.5,Ql=2,te=null,N=null,lr=0,cr=0,Qt=1,Tt=null,re=null,_=null,V=[],Et=l.accent,ec="rgba(162,89,255,0.08)",Zi="rgba(162,89,255,0.15)",tc=4,qi=10,nc="#ffffff",oc=Et,rc=1.5,pr=!0,Xe=null;function Qi(){let e=X();e&&(te=document.createElement("canvas"),te.setAttribute("data-frameup-overlay","true"),te.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(te),mr(),window.addEventListener("resize",mr))}function Dn(e,t=4){if(!e){re&&(re.targetOpacity=0,De());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!re||!re.initialized?re=hr(n,t):(re.target=n,re.borderRadius=t,re.targetOpacity=1),De()}function rt(e,t=4){if(!e){_&&(_.targetOpacity=0,De());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!_||!_.initialized?_=hr(n,t):(_.target=n,_.borderRadius=t,_.targetOpacity=1),De()}function ea(e){Xe=e,De()}function fr(){Xe=null,De()}function ta(e){for(_=null;V.length>e.length;)V.pop();for(let t=0;t<e.length;t++){let n=e[t],o={x:n.rect.left,y:n.rect.top,w:n.rect.width,h:n.rect.height};t<V.length?(V[t].target=o,V[t].borderRadius=n.borderRadius,V[t].targetOpacity=1):V.push(hr(o,n.borderRadius))}De()}function en(){V=[],De()}function gr(e,t){if(!pr)return null;let n=ra();if(!n)return null;let o=sa(n.x,n.y,n.w,n.h);for(let r of o){let i=e-r.x,a=t-r.y;if(i*i+a*a<=qi*qi)return r.corner}return null}function na(){return ra()}function oa(){Tt!==null&&cancelAnimationFrame(Tt),window.removeEventListener("resize",mr),te?.remove(),te=null,N=null,re=null,_=null,V=[],Xe=null}function ra(){if(V.length>1)return ia(V);if(_&&_.opacity>=.5){let{x:e,y:t,w:n,h:o}=_.current;return{x:e,y:t,w:n,h:o}}if(V.length===1){let{x:e,y:t,w:n,h:o}=V[0].current;return{x:e,y:t,w:n,h:o}}return null}function ia(e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,r=-1/0;for(let i of e){let{x:a,y:s,w:c,h:u}=i.current;a<t&&(t=a),s<n&&(n=s),a+c>o&&(o=a+c),s+u>r&&(r=s+u)}return{x:t,y:n,w:o-t,h:r-n}}function hr(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function mr(){te&&(Qt=Math.max(window.devicePixelRatio||1,Ql),lr=window.innerWidth,cr=window.innerHeight,te.width=lr*Qt,te.height=cr*Qt,te.style.width=`${lr}px`,te.style.height=`${cr}px`,N=te.getContext("2d"),De())}function De(){Tt===null&&(Tt=requestAnimationFrame(aa))}function aa(){if(Tt=null,!N||!te)return;let e=!1;re?.initialized&&(dr(re,Jl)&&(e=!0),re.opacity<.01&&re.targetOpacity===0&&(re=null)),_?.initialized&&(dr(_,Ki)&&(e=!0),_.opacity<.01&&_.targetOpacity===0&&(_=null));for(let t=V.length-1;t>=0;t--){let n=V[t];n.initialized&&dr(n,Ki)&&(e=!0),n.opacity<.01&&n.targetOpacity===0&&V.splice(t,1)}if(N.setTransform(1,0,0,1,0,0),N.clearRect(0,0,te.width,te.height),N.setTransform(Qt,0,0,Qt,0,0),re&&ur(N,re,Et,ec),_&&(ur(N,_,Et,Zi),pr&&Ji(N,_.current,_.opacity)),Xe){if(N.save(),N.globalAlpha=.6,N.strokeStyle=Et,N.lineWidth=1,N.setLineDash([4,4]),Xe.verticalLine){let{x:t}=Xe.verticalLine;N.beginPath(),N.moveTo(t,0),N.lineTo(t,te.height),N.stroke()}if(Xe.horizontalLine){let{y:t}=Xe.horizontalLine;N.beginPath(),N.moveTo(0,t),N.lineTo(te.width,t),N.stroke()}N.restore()}if(V.length>0){for(let t of V)ur(N,t,Et,Zi);if(pr&&V.length>0){let t=ia(V);t&&t.w>=24&&t.h>=24&&(V.length>1&&(N.globalAlpha=.6,N.beginPath(),N.rect(t.x,t.y,t.w,t.h),N.strokeStyle=Et,N.lineWidth=1,N.setLineDash([4,4]),N.stroke(),N.setLineDash([]),N.globalAlpha=1),Ji(N,t,1))}}e&&(Tt=requestAnimationFrame(aa))}function dr(e,t){let n=e.current,o=e.target,r=Ct(n.x,o.x,t),i=Ct(n.y,o.y,t),a=Ct(n.w,o.w,t),s=Ct(n.h,o.h,t),c=Ct(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<_n&&Math.abs(i-o.y)<_n&&Math.abs(a-o.w)<_n&&Math.abs(s-o.h)<_n&&Math.abs(c-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=s,e.opacity=c,!0)}function ur(e,t,n,o){let{x:r,y:i,w:a,h:s}=t.current;if(a<=0||s<=0)return;let c=Math.min(t.borderRadius,a/2,s/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,a,s,c):e.rect(r,i,a,s),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function sa(e,t,n,o){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+n,y:t},{corner:"br",x:e+n,y:t+o},{corner:"bl",x:e,y:t+o}]}function Ji(e,t,n){if(t.w<24||t.h<24)return;e.globalAlpha=n;let o=sa(t.x,t.y,t.w,t.h);for(let r of o)e.beginPath(),e.arc(r.x,r.y,tc,0,Math.PI*2),e.fillStyle=nc,e.fill(),e.strokeStyle=oc,e.lineWidth=rc,e.stroke();e.globalAlpha=1}var ic=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],ac=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],sc=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],lc=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],cc=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],Pe=[...ic,...ac,...sc,...lc,...cc];j();var dc=new Set(["auto","none","normal","inherit","initial"]);function la(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let s=document.createElement("input");s.type="text",s.className="prop-input",s.style.cssText="width:60px; cursor:text;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${C};`,a.appendChild(s),a.appendChild(c);let u=new Map(t);function d(){return u.get(r.key)??r.defaultValue}function p(f){let m=parseFloat(f);s.value=isNaN(m)?f:String(m);try{let y=ri(i,f).find(L=>L.cssValue===f);y?.token?c.textContent=`${r.tailwindPrefix}-${y.token}`:c.textContent=""}catch{c.textContent=""}}return s.addEventListener("blur",()=>{let f=s.value.trim(),m=parseFloat(f);if(isNaN(m))dc.has(f)?(u.set(r.key,f),p(f),n(r.key,f),o()):p(d());else{let y=f.match(/(px|rem|em|%|vw|vh|ch)$/)?f:`${m}px`;u.set(r.key,y),p(y),n(r.key,y),o()}}),s.addEventListener("keydown",f=>{f.key==="Enter"?s.blur():f.key==="Escape"&&(p(d()),s.blur())}),p(d()),{element:a,setValue(f,m){f===r.key&&(u.set(f,m),p(m))},destroy(){}}}j();function ca(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${l.bgTertiary};
    border-radius:${k.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let s=t.get(r.key)??r.defaultValue,c=[];function u(d){s=d;for(let{btn:p,value:f,opt:m}of c){let h=f===d;p.style.background=h?l.accent:"transparent",p.style.color=h?l.textOnAccent:l.textSecondary,p.title=h&&m.tailwindValue?`${m.label} (${m.tailwindValue})`:m.label}}for(let d of i){let p=document.createElement("button");p.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),p.textContent=d.icon??d.label,p.title=d.label,p.addEventListener("click",()=>{u(d.value),n(r.key,d.value),o()}),c.push({btn:p,value:d.value,opt:d}),a.appendChild(p)}return u(s),{element:a,setValue(d,p){d===r.key&&u(p)},destroy(){}}}j();j();function tn(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,s=0;a!==0&&(r===t?s=((n-o)/a+(n<o?6:0))*60:r===n?s=((o-t)/a+2)*60:s=((t-n)/a+4)*60);let c=r===0?0:a/r*100,u=r*100;return{h:s,s:c,v:u}}function Fn(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),s=o*(1-i*n),c=o*(1-(1-i)*n),u,d,p;switch(r%6){case 0:u=o,d=c,p=a;break;case 1:u=s,d=o,p=a;break;case 2:u=a,d=o,p=c;break;case 3:u=a,d=s,p=o;break;case 4:u=c,d=a,p=o;break;case 5:u=o,d=a,p=s;break;default:u=0,d=0,p=0}let f=m=>Math.round(m*255).toString(16).padStart(2,"0");return`#${f(u)}${f(d)}${f(p)}`}var Ke=null;function nn(e){wt();let t=X();if(!t)return;let n=document.createElement("div");n.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${H.lg};
    border-radius: ${k.md};
    font-family: ${C};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${M.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let b=n.getBoundingClientRect();b.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-b.width-8}px`),b.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-b.height-8}px`),n.style.opacity="1"});let o=tn(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let b=uc(["Fill","Text"],0,E=>{r=E===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(b)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),s=document.createElement("div");s.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${H.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(s),n.appendChild(c);function u(){let b=o.h,E=a.createLinearGradient(0,0,176,0);E.addColorStop(0,`hsl(${b}, 0%, 100%)`),E.addColorStop(1,`hsl(${b}, 100%, 50%)`),a.fillStyle=E,a.fillRect(0,0,176,120);let I=a.createLinearGradient(0,0,0,120);I.addColorStop(0,"rgba(0,0,0,0)"),I.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=I,a.fillRect(0,0,176,120);let Q=o.s/100*176,ee=(1-o.v/100)*120;s.style.left=`${Q}px`,s.style.top=`${ee}px`}let d=!1;i.addEventListener("mousedown",b=>{d=!0,p(b)});function p(b){let E=i.getBoundingClientRect(),I=Math.max(0,Math.min(176,b.clientX-E.left)),Q=Math.max(0,Math.min(120,b.clientY-E.top));o.s=I/176*100,o.v=(1-Q/120)*100,u(),P()}let f=document.createElement("canvas");f.width=176,f.height=14,f.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let m=f.getContext("2d"),h=document.createElement("div");h.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${H.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let y=document.createElement("div");y.style.cssText="position:relative;width:176px;height:14px;",y.appendChild(f),y.appendChild(h),n.appendChild(y);function L(){let b=m.createLinearGradient(0,0,176,0);for(let E=0;E<=6;E++)b.addColorStop(E/6,`hsl(${E*60}, 100%, 50%)`);m.fillStyle=b,m.fillRect(0,0,176,14),h.style.left=`${o.h/360*176}px`}let S=!1;f.addEventListener("mousedown",b=>{S=!0,$(b)});function $(b){let E=f.getBoundingClientRect(),I=Math.max(0,Math.min(176,b.clientX-E.left));o.h=I/176*360,L(),u(),P()}let A=document.createElement("input");A.type="text",A.value=Fn(o),A.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: ${k.sm};
    color: ${l.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,A.addEventListener("keydown",b=>{b.key==="Enter"&&A.blur(),b.stopPropagation()}),A.addEventListener("blur",()=>{let b=A.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(b)){let E=b.startsWith("#")?b:`#${b}`;o=tn(E),u(),L(),P()}else A.value=Fn(o)}),n.appendChild(A);let F=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],x=document.createElement("div");x.style.cssText="display:flex;gap:4px;justify-content:center;";for(let b of F){let E=document.createElement("button");E.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${b};
      border: 1px solid ${l.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${M.fast};
    `,E.addEventListener("mouseenter",()=>{E.style.boxShadow=H.sm}),E.addEventListener("mouseleave",()=>{E.style.boxShadow="none"}),E.addEventListener("click",()=>{o=tn(b),u(),L(),A.value=b,P()}),x.appendChild(E)}if(n.appendChild(x),e.projectColors&&e.projectColors.length>0){let b=document.createElement("div");b.textContent="Project",b.style.cssText=`
      font-size: 10px;
      color: ${l.textSecondary};
      font-family: ${C};
      margin-top: 2px;
    `,n.appendChild(b);let E=document.createElement("div");E.style.cssText="display:flex;gap:4px;flex-wrap:wrap;max-height:48px;overflow-y:auto;";for(let{token:I,hex:Q}of e.projectColors){let ee=document.createElement("button");ee.title=I,ee.style.cssText=`
        width: 12px; height: 12px; border-radius: 50%;
        background: ${Q};
        border: 1px solid ${l.border};
        cursor: pointer; padding: 0;
        transition: box-shadow ${M.fast};
      `,ee.addEventListener("mouseenter",()=>{ee.style.boxShadow=H.sm}),ee.addEventListener("mouseleave",()=>{ee.style.boxShadow="none"}),ee.addEventListener("click",()=>{o=tn(Q),u(),L(),A.value=Q,P(),e.onPickedToken?.(I)}),E.appendChild(ee)}n.appendChild(E)}function P(){let b=Fn(o);A.value=b,e.onColorChange(b),e.onPickedToken?.(void 0)}t.appendChild(n),Ke=n,u(),L();let le=b=>{d&&p(b),S&&$(b)},ce=()=>{d=!1,S=!1};document.addEventListener("mousemove",le),document.addEventListener("mouseup",ce);let R=b=>{b.key==="Escape"&&wt()};document.addEventListener("keydown",R,!0);let G=b=>{Ke&&!b.composedPath().includes(Ke)&&wt()};setTimeout(()=>document.addEventListener("mousedown",G,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",le),document.removeEventListener("mouseup",ce),document.removeEventListener("keydown",R,!0),document.removeEventListener("mousedown",G,!0)},n._onClose=e.onClose}function wt(){Ke&&(Ke._cleanup?.(),Ke._onClose?.(),Ke.remove(),Ke=null)}function uc(e,t,n){let o=document.createElement("div");o.style.cssText=`
    display: flex;
    background: ${l.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;let r=[];for(let i=0;i<e.length;i++){let a=document.createElement("button");a.textContent=e[i],a.style.cssText=`
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i===t?l.bgPrimary:"transparent"};
      box-shadow: ${i===t?H.sm:"none"};
      color: ${i===t?l.textPrimary:l.textSecondary};
      font-family: ${C}; font-size: 12px; cursor: pointer;
      transition: background ${M.fast}, color ${M.fast};
    `,a.addEventListener("click",()=>{r.forEach((s,c)=>{s.style.background=c===i?l.bgPrimary:"transparent",s.style.boxShadow=c===i?H.sm:"none",s.style.color=c===i?l.textPrimary:l.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var br=null;function pc(){return br||(br=document.createElement("canvas").getContext("2d")),br}function da(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${k.sm};
    border:1px solid ${l.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("input");s.type="text",s.placeholder="#rrggbb",s.className="prop-input",s.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${C};`,i.appendChild(a),i.appendChild(s),i.appendChild(c);let u=t.get(r.key)??r.defaultValue,d=!1;function p(h){let y=h.trim().toLowerCase();if(y==="transparent")return"transparent";if(y==="inherit"||y==="currentcolor"||y==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(y))return y;let L=pc();L.fillStyle="#000000",L.fillStyle=y;let S=L.fillStyle;if(S.startsWith("#"))return S;let $=S.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if($){let A=parseInt($[1],10),F=parseInt($[2],10),x=parseInt($[3],10);return`#${((1<<24)+(A<<16)+(F<<8)+x).toString(16).slice(1)}`}return"#000000"}function f(h){u=h,s.value=h,h==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=h;try{let y=Vt(),L=wn(h,y.colorsReverse);L?c.textContent=`${r.tailwindPrefix??"bg"}-${L}`:c.textContent=""}catch{c.textContent=""}}function m(){if(d)return;let h=s.value.trim();if(!h){f(u);return}let y=p(h);f(y),n(r.key,y),o()}return a.addEventListener("click",()=>{if(d){wt(),d=!1;return}let h=a.getBoundingClientRect();d=!0,nn({initialColor:p(u),position:{x:h.left-210,y:h.top},showPropertyToggle:!1,onColorChange:y=>{f(y),n(r.key,y)},onClose:()=>{d=!1,o()}})}),s.addEventListener("keydown",h=>{h.key==="Enter"?(m(),s.blur()):h.key==="Escape"&&(f(u),s.blur())}),s.addEventListener("blur",()=>{m()}),s.addEventListener("input",()=>{let h=s.value.trim(),y=p(h);a.style.background=y}),f(u),{element:i,setValue(h,y){h===r.key&&f(y)},destroy(){d&&(wt(),d=!1)}}}j();function ua(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function pa(e,t,n,o){let r=new Map(t),i=[];for(let w of e){let T=ua(w.key);T&&i.push({descriptor:w,...T})}let a=document.createElement("div");a.style.cssText=`
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
  `.trim().replace(/\n\s*/g," "),d.textContent="content";let p=[];function f(w){let T=document.createElement("span"),me=r.get(w.key)??w.defaultValue;return T.textContent=$(me),T.title=w.label,T.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),T.addEventListener("mouseenter",()=>{T.style.background=l.bgTertiary}),T.addEventListener("mouseleave",()=>{(document.activeElement!==m||m.dataset.key!==w.key)&&(T.style.background="transparent")}),T.addEventListener("click",()=>{L(w,T)}),p.push({key:w.key,span:T,descriptor:w}),T}let m=document.createElement("input");m.type="text",m.className="prop-input",m.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(m);let h=null,y=null;function L(w,T){h&&h!==w&&S(),h=w,y=T,m.dataset.key=w.key;let me=r.get(w.key)??w.defaultValue;m.value=$(me);let ne=0,et=0,je=T;for(;je&&je!==a;)ne+=je.offsetLeft,et+=je.offsetTop,je=je.offsetParent;m.style.display="block",m.style.left=`${ne}px`,m.style.top=`${et}px`;let oi=T.getBoundingClientRect();m.style.width=`${Math.max(40,oi.width+10)}px`,m.focus(),m.select()}function S(){if(!h||!y)return;let w=m.value.trim(),T=h,me=y,ne,et=parseFloat(w),je=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(et)?je.has(w)?ne=w:ne=r.get(T.key)??T.defaultValue:ne=w.match(/(px|rem|em|%|vw|vh|ch)$/)?w:`${et}px`,r.set(T.key,ne),me.textContent=$(ne),me.style.background="transparent",m.style.display="none",m.dataset.key="",h=null,y=null,n(T.key,ne),o()}m.addEventListener("keydown",w=>{if(w.key==="Enter")S();else if(w.key==="Escape"){if(h&&y){let T=r.get(h.key)??h.defaultValue;y.textContent=$(T)}m.style.display="none",m.dataset.key="",h=null,y=null}}),m.addEventListener("blur",()=>{S()});function $(w){let T=parseFloat(w);return isNaN(T)?w:T===Math.round(T)?String(Math.round(T)):w}function A(w){let T=document.createElement("span");return T.textContent=w,T.style.cssText=`
      font-size:9px;
      color:${l.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),T}function F(w,T){return i.find(me=>me.layer===w&&me.side===T)}function x(w,T){let me=F(w,T);if(!me){let ne=document.createElement("span");return ne.textContent="-",ne.style.cssText=`text-align:center; color:${l.textTertiary};`,ne}return f(me.descriptor)}let P=x("padding","top");P.style.gridRow="1",P.style.gridColumn="2",P.style.textAlign="center";let le=x("padding","left");le.style.gridRow="2",le.style.gridColumn="1";let ce=x("padding","right");ce.style.gridRow="2",ce.style.gridColumn="3";let R=x("padding","bottom");R.style.gridRow="3",R.style.gridColumn="2",R.style.textAlign="center",d.style.gridRow="2",d.style.gridColumn="2",u.appendChild(P),u.appendChild(le),u.appendChild(d),u.appendChild(ce),u.appendChild(R);let G=document.createElement("div");G.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let b=x("margin","top");b.style.gridRow="1",b.style.gridColumn="2",b.style.textAlign="center";let E=x("margin","left");E.style.gridRow="2",E.style.gridColumn="1";let I=x("margin","right");I.style.gridRow="2",I.style.gridColumn="3";let Q=x("margin","bottom");Q.style.gridRow="3",Q.style.gridColumn="2",Q.style.textAlign="center";let ee=document.createElement("div");ee.style.cssText="grid-row:2; grid-column:2;",ee.appendChild(u),G.appendChild(b),G.appendChild(E),G.appendChild(ee),G.appendChild(I),G.appendChild(Q);let En=A("margin"),Zs=A("padding"),Tn=document.createElement("div");return Tn.style.cssText="display:flex; gap:8px; padding:0 4px;",Tn.appendChild(En),Tn.appendChild(Zs),c.appendChild(G),s.appendChild(c),a.appendChild(Tn),a.appendChild(s),{element:a,setValue(w,T){if(!ua(w))return;r.set(w,T);let ne=p.find(et=>et.key===w);ne&&(ne.span.textContent=$(T))},destroy(){}}}j();var Vn=new Set;function ma(e){return Vn.has(e)}var zn=[];function fa(e){return zn.push(e),()=>{let t=zn.indexOf(e);t>=0&&zn.splice(t,1)}}var mc={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},fc={"number-scrub":la,segmented:ca,"color-swatch":da,"box-model":pa},gc=`
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
`;function hc(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function bc(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function yc(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}var vc=new Set(["flexDirection","justifyContent","alignItems","gap"]);function xc(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function yr(e,t,n,o,r){let i=document.createElement("div");i.className="prop-sections";let a=document.createElement("style");a.textContent=gc,i.appendChild(a);let s=[],c=bc(e);for(let[u,d]of c){let p=u==="layout"&&!xc(t)?d.filter(S=>!vc.has(S.key)):d;if(p.length===0)continue;let f=document.createElement("div");f.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${mc[u]}</span>${hc()}`;let h=document.createElement("div");h.className="prop-section-body";let y=Vn.has(u);if(y){let S=m.querySelector(".prop-section-chevron");S&&S.classList.add("collapsed"),h.classList.add("collapsed")}m.addEventListener("click",()=>{if(y=!y,y)Vn.add(u);else{Vn.delete(u);for(let $ of zn)$(u)}let S=m.querySelector(".prop-section-chevron");S&&S.classList.toggle("collapsed",y),h.classList.toggle("collapsed",y)}),f.appendChild(m);let L=yc(p);for(let S of L){let $=fc[S.controlType];if(!$)continue;let A=$(S.descriptors,t,n,o);if(S.descriptors.length>1||S.controlType==="box-model")h.appendChild(A.element);else{let F=document.createElement("div");F.className="prop-control-row";let x=document.createElement("span");x.className="prop-control-label",x.textContent=S.descriptors[0].label,x.title=S.descriptors[0].label;let P=document.createElement("div");P.className="prop-control-value",P.appendChild(A.element),F.appendChild(x),F.appendChild(P),h.appendChild(F)}s.push(A)}f.appendChild(h),i.appendChild(f)}if(r){let u=document.createElement("div");u.className="prop-show-all",u.textContent="Show all properties",u.addEventListener("click",r),i.appendChild(u)}return{container:i,controls:s}}j();var Cc=300,ga=260,ha=380,ba="frameup-sidebar-width",Ec=4,Tc=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${l.bgPrimary};
    border-left: 1px solid ${l.border};
    box-shadow: ${H.lg};
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
    width: ${Ec}px;
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
`;function wc(){try{let e=localStorage.getItem(ba);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=ga&&t<=ha)return t}}catch{}return Math.min(Cc,Math.floor(window.innerWidth*.22))}function Sc(e){try{localStorage.setItem(ba,String(e))}catch{}}function ya(e,t){let n=document.createElement("style");n.textContent=Tc,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${wc()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let s=document.createElement("div");s.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let u=document.createElement("div");u.className="prop-sidebar-file-path",a.appendChild(s),a.appendChild(u);let d=document.createElement("button");d.className="prop-sidebar-close",d.title="Collapse panel",d.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="8,2 4,6 8,10"/></svg>',i.appendChild(a),i.appendChild(d),o.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",o.appendChild(p);let f=document.createElement("div");f.className="prop-sidebar-content",o.appendChild(f),e.appendChild(o);let m=!1,h=0,y=0;r.addEventListener("pointerdown",R=>{R.preventDefault(),R.stopPropagation(),m=!0,h=R.clientX,y=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(R.pointerId)}),r.addEventListener("pointermove",R=>{if(!m)return;let G=h-R.clientX,b=Math.max(ga,Math.min(ha,y+G));o.style.width=`${b}px`});let L=()=>{m&&(m=!1,r.classList.remove("active"),Sc(o.offsetWidth))};r.addEventListener("pointerup",L),r.addEventListener("pointercancel",L),o.addEventListener("pointerdown",R=>R.stopPropagation()),o.addEventListener("mousedown",R=>R.stopPropagation()),o.addEventListener("click",R=>R.stopPropagation()),o.addEventListener("mouseup",R=>R.stopPropagation()),d.addEventListener("click",()=>{A(),t&&t()});let S=!1;function $(R,G,b,E){s.textContent=`<${R}>`,s.appendChild(c),u.textContent=`${G}:${b}`,u.title=`${G}:${b}`,f.innerHTML="",f.appendChild(E),S||(S=!0,o.offsetHeight,o.classList.add("visible"))}function A(){S&&(S=!1,o.classList.remove("visible"))}function F(R){f.innerHTML="",f.appendChild(R)}function x(R,G,b){p.innerHTML="";let E=document.createElement("span");E.className="prop-sidebar-warning-text",E.textContent=R;let I=document.createElement("button");I.className="prop-sidebar-warning-btn",I.textContent=G,I.addEventListener("click",Q=>{Q.stopPropagation(),b()}),p.appendChild(E),p.appendChild(I),p.style.display="flex"}function P(){p.style.display="none",p.innerHTML=""}function le(){c.classList.add("active")}function ce(){c.classList.remove("active")}return{show:$,hide:A,isVisible:()=>S,getElement:()=>o,replaceContent:F,showWarning:x,clearWarning:P,showSaving:le,hideSaving:ce}}Oe();j();var Ia="frameup-onboarding-dismissed",Me=null;function _a(){if(localStorage.getItem(Ia))return;let e=X();if(!e)return;Me=document.createElement("div"),Me.style.cssText=`
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
  `,n.addEventListener("click",()=>ln()),Me.appendChild(t),Me.appendChild(n),e.appendChild(Me),requestAnimationFrame(()=>{Me&&(Me.style.opacity="1")})}function ln(){Me&&(localStorage.setItem(Ia,"1"),Me.style.opacity="0",setTimeout(()=>{Me?.remove(),Me=null},150))}nt();vt();var Lr=new Map(Pe.map(e=>[e.key,e]));var Lc=new Set(["layout","spacing","size"]),Da=new Set(["typography","background"]),Nc=new Set(["h1","h2","h3","h4","h5","h6","p","span","a","button","label","li","td","th","blockquote","figcaption"]);function Va(e){let t=new Set(["spacing","size","background"]),o=getComputedStyle(e).display;(o==="flex"||o==="inline-flex"||o==="grid"||o==="inline-grid"||e.children.length>0)&&t.add("layout");let r=e.tagName.toLowerCase();return(Array.from(e.childNodes).some(a=>a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()??"").length>0)||Nc.has(r))&&t.add("typography"),t}var kc=5e3,g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1},st=[],D,Fa,ge=null,Rc=300,Ee=null,Lt=null,Qn=new MutationObserver(()=>{g.selectedElement&&!document.contains(g.selectedElement)&&(clearTimeout(Fa),Fa=setTimeout(()=>{Pc()},80))});function Pc(){let e=g.elementIdentity,t=g.componentInfo;if(!e||!t){kt();return}let n=Oc(e);if(n){Nt(n,t);return}Ac(e).then(o=>{o?Nt(o,t):kt()})}function Oc(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);for(;o;){if(fe(o)){let r=o._debugSource,i=se(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function Ac(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);if(!o)continue;let r=await ke(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let s="";if(i.fileName){let c=Se(i.fileName);Re(c)&&(s=c)}if(s&&e.filePath.endsWith(s)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}function Hc(e,t){let n=getComputedStyle(e),o=new Map;for(let r of Pe){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function $c(e){if(!g.selectedElement)return;let t=getComputedStyle(g.selectedElement);for(let n of Pe){if(n.group!==e||g.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;g.currentValues.set(n.key,r),g.originalValues.get(n.key)===n.defaultValue&&g.originalValues.set(n.key,r);for(let i of st)i.setValue(n.key,r)}}function cn(){for(let e of st)e.destroy();st=[]}function Nr(){if(!g.selectedElement||!g.componentInfo)return;cn();let e=g.showAllGroups?null:Va(g.selectedElement),t=e?Pe.filter(a=>e.has(a.group)):Pe,o=e!==null&&t.length<Pe.length?()=>Ga(!0):void 0,{container:r,controls:i}=yr(t,g.currentValues,dn,eo,o);st=i,D.replaceContent(r)}function eo(){ge&&clearTimeout(ge),ge=setTimeout(()=>{ge=null,Rr()},Rc)}function kr(){ge&&(clearTimeout(ge),ge=null),Lt&&(Lt(),Lt=null),Ee&&(clearTimeout(Ee.timeoutId),Ee=null),g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1}}function za(e){D=ya(e,()=>{to(),cn(),kr()}),si((t,n,o)=>{if(D&&D.hideSaving(),Ee)if(clearTimeout(Ee.timeoutId),t)Ee=null;else{let{batch:r,previousOriginals:i}=Ee;Ee=null;for(let[a]of r){let s=i.get(a);s!==void 0&&g.originalValues.set(a,s)}if(g.selectedElement){for(let[a]of r){g.selectedElement.style[a]="",g.activeOverrides.delete(a);let s=g.originalValues.get(a);s!==void 0&&g.currentValues.set(a,s)}for(let a of st)for(let[s]of r){let c=g.originalValues.get(s);c!==void 0&&a.setValue(s,c)}}if(D){let s={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";D.showWarning(s,"Dismiss",()=>D.clearWarning())}}else if(!t&&D){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";D.showWarning(i,"Dismiss",()=>D.clearWarning())}})}function Nt(e,t){g.pendingBatch.size>0&&Rr(),ln(),cn(),g.showAllGroups=!1,g.selectedElement=e,g.componentInfo=t,g.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(Lc);for(let d of Da)ma(d)||n.add(d);let o=Hc(e,n);g.currentValues=o,g.originalValues=new Map(o),g.activeOverrides=new Map,g.pendingBatch=new Map,Lt&&Lt(),Lt=fa(d=>{Da.has(d)&&$c(d)});let r=g.showAllGroups?null:Va(e),i=r?Pe.filter(d=>r.has(d.group)):Pe,s=r!==null&&i.length<Pe.length?()=>Ga(!0):void 0,{container:c,controls:u}=yr(i,g.currentValues,dn,eo,s);st=u,Qn.disconnect(),Qn.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),D.show(t.componentName,t.filePath,t.lineNumber,c)}function dn(e,t){let n=Lr.get(e);if(!n||!g.selectedElement)return;g.selectedElement.style[n.key]=t,g.activeOverrides.set(e,t),g.currentValues.set(e,t);let o=Vt(),r=n.tailwindScale+"Reverse",i=o[r],a=i?wn(t,i):null;if(!a&&n.enumValues){let s=n.enumValues.find(c=>c.value===t);s&&(a=s.tailwindValue)}if(g.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:g.originalValues.get(e)||n.defaultValue}),e==="display")if(Nr(),t==="none"){let s=g.originalValues.get("display")||"block";D.showWarning("Element hidden","Restore",()=>{g.selectedElement&&(g.selectedElement.style.display=s),g.activeOverrides.delete("display"),g.currentValues.set("display",s),g.pendingBatch.delete("display"),Nr(),D.clearWarning()})}else D.clearWarning()}function Rr(){if(g.pendingBatch.size===0||!g.componentInfo)return;let e=g.componentInfo.filePath,t=g.componentInfo.lineNumber,n=g.componentInfo.columnNumber-1;if(g.pendingBatch.size===1){let a=[...g.pendingBatch.values()][0],s=Lr.get(a.property);ve({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:n,...a,framework:"tailwind",classPattern:s?.classPattern,standalone:s?.standalone})}else ve({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:n,updates:[...g.pendingBatch.values()].map(a=>{let s=Lr.get(a.property);return{...a,classPattern:s?.classPattern,standalone:s?.standalone}}),framework:"tailwind"});g.selectedElement&&g.elementIdentity&&Xn({type:"propertyChange",elementIdentity:g.elementIdentity,element:g.selectedElement,overrides:[...g.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),D&&D.showSaving();let o=new Map;for(let[a]of g.pendingBatch)o.set(a,g.originalValues.get(a)||"");for(let[a,s]of g.pendingBatch)g.originalValues.set(a,s.value);let r=new Map(g.pendingBatch),i=setTimeout(()=>{Ee&&Ee.batch===r&&(Ee=null,D&&D.hideSaving())},kc);Ee={batch:r,previousOriginals:o,timeoutId:i},g.pendingBatch.clear()}function to(){if(g.selectedElement){for(let[e]of g.activeOverrides)g.selectedElement.style[e]="";for(let[e,t]of g.originalValues)g.currentValues.set(e,t);for(let e of st)for(let[t,n]of g.originalValues)e.setValue(t,n);g.activeOverrides.clear(),g.pendingBatch.clear()}}function kt(){ge&&(clearTimeout(ge),ge=null),Qn.disconnect(),to(),cn(),D&&D.hide(),kr()}function Ba(){ge&&(clearTimeout(ge),ge=null),Qn.disconnect(),Rr(),cn(),D&&D.hide(),kr()}function Wa(){return g.activeOverrides.size>0}function Ga(e){g.showAllGroups=e,Nr()}er()||tr({onCommitFiberRoot(){}});async function Ic(e){let t=oe(e);if(!t)return null;try{let n=await ke(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||_e(i))continue;let a="";if(r.fileName){let s=Se(r.fileName);Re(s)&&(a=s)}o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0)return{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}}catch(n){console.warn("[FrameUp] getOwnerStack failed, falling back to fiber walk:",n)}return Ya(e,t)}function Ya(e,t){let n=[],o=t;for(;o;){if(fe(o)){let r=se(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",s=0,c=0;i&&(a=i.fileName||"",s=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!_e(r)&&n.push({componentName:r,filePath:a,lineNumber:s,columnNumber:c})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function ja(e){let t=oe(e);return t?Ya(e,t):null}var Y=null,B=null,We=!1,Pt=!1,O=new Map,v=null,Le=null,ze="idle",z=null,Rt=null,Te=null,lo=null,un=0,pn=0,qe=[],no=!1,_c=null,Dc=null,Fc=null,Vc=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${H.sm};
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
`;function Ua(e){_c=e.onStart,Dc=e.onMove,Fc=e.onEnd}function Xa(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=Vc,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),Le=document.createElement("div"),Le.className="marquee-box",e.appendChild(Le),We=!0,document.addEventListener("mousedown",oo,!0),document.addEventListener("mousemove",ro,!0),document.addEventListener("mouseup",io,!0),document.addEventListener("keydown",so,!0),document.addEventListener("click",ao,!0),document.addEventListener("scroll",Be,!0),window.addEventListener("resize",Be),Pt=!0}function oo(e){if(!We||e.metaKey||e.ctrlKey)return;let t=document.elementFromPoint(e.clientX,e.clientY);if(t?.closest("#frameup-root"))return;if(Y||O.size>0){let o=gr(e.clientX,e.clientY);if(o){e.preventDefault(),e.stopPropagation();let r=na();if(Te=o,lo=r?{...r}:null,O.size>0){qe=[];for(let[i]of O){let a=getComputedStyle(i);qe.push({element:i,width:parseFloat(a.width)||i.offsetWidth,height:parseFloat(a.height)||i.offsetHeight})}un=0,pn=0}else if(B){let i=getComputedStyle(B);un=parseFloat(i.width)||B.offsetWidth,pn=parseFloat(i.height)||B.offsetHeight,qe=[]}z={x:e.clientX,y:e.clientY},ze="resize-drag";return}}if(e.preventDefault(),e.stopPropagation(),!t||!Jt(t)){(Y||O.size>0)&&(Ba(),Y=null,B=null,uo(),rt(null),v&&(v.classList.remove("visible"),v.style.display="none"),$e(null));return}z={x:e.clientX,y:e.clientY},Rt=t,no=e.shiftKey,ze="pending"}function ro(e){if(We){if(ze==="resize-drag"&&Te&&z&&lo){e.preventDefault(),e.stopPropagation();let t=e.clientX-z.x,n=e.clientY-z.y;if(qe.length>0){for(let o of qe){let r=o.width,i=o.height;Te==="tr"||Te==="br"?r=Math.max(10,o.width+t):r=Math.max(10,o.width-t),Te==="bl"||Te==="br"?i=Math.max(10,o.height+n):i=Math.max(10,o.height-n),o.element.style.width=`${Math.round(r)}px`,o.element.style.height=`${Math.round(i)}px`}mn()}else{let o=un,r=pn;Te==="tr"||Te==="br"?o=Math.max(10,un+t):o=Math.max(10,un-t),Te==="bl"||Te==="br"?r=Math.max(10,pn+n):r=Math.max(10,pn-n),o=Math.round(o),r=Math.round(r),dn("width",`${o}px`),dn("height",`${r}px`),Be()}return}if(ze==="pending"&&z){let t=Math.abs(e.clientX-z.x),n=Math.abs(e.clientY-z.y);(t>10||n>10)&&(ze="marquee")}if(ze==="marquee"&&z&&Le){let t=Math.min(e.clientX,z.x),n=Math.min(e.clientY,z.y),o=Math.abs(e.clientX-z.x),r=Math.abs(e.clientY-z.y);Le.style.display="block",Le.style.left=`${t}px`,Le.style.top=`${n}px`,Le.style.width=`${o}px`,Le.style.height=`${r}px`;return}if(ze==="idle"){if(Y&&B||O.size>0){let i=gr(e.clientX,e.clientY);if(i){document.body.style.cursor=i==="tl"||i==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let n=document.elementFromPoint(e.clientX,e.clientY);if(!n||!Jt(n)){Dn(null);return}let o=n.getBoundingClientRect(),r=parseFloat(getComputedStyle(n).borderRadius)||4;Dn(o,r+2)}}}function io(e){if(!We)return;let t=ze;if(ze="idle",t==="resize-drag"){document.body.style.cursor="",Te=null,lo=null,z=null,qe.length>0?qe=[]:eo();return}if(t==="marquee"&&z){Le&&(Le.style.display="none"),zc(Math.min(e.clientX,z.x),Math.min(e.clientY,z.y),Math.max(e.clientX,z.x),Math.max(e.clientY,z.y)),z=null,Rt=null,no=!1;return}Rt&&(no?Bc(Rt):(uo(),co(Rt))),z=null,Rt=null,no=!1}async function co(e,t){try{let n=e.getBoundingClientRect();B=e,Pr(n,{}),Wc();let o=await Ic(e);if(console.log("[FrameUp] selectElement:",e.tagName,"\u2192",o?.componentName,o?.filePath,"stack:",o?.stack?.map(r=>r.componentName)),!o)return;if(Y={tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber,columnNumber:o.columnNumber,stack:o.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}},v){let r=o.filePath?`${o.filePath}:${o.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${o.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||Nt(e,Y),$e({tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber})}catch(n){console.error("[FrameUp] selectElement error:",n)}}function zc(e,t,n,o){let r=Xi({x:e,y:t,width:n-e,height:o-t});if(r.length!==0){kt(),Y=null,B=null,rt(null),v&&(v.classList.remove("visible"),v.style.display="none"),O.clear();for(let i of r.slice(0,50)){let a=ja(i);if(!a)continue;let s=i.getBoundingClientRect(),c={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:s.top,left:s.left,width:s.width,height:s.height}};O.set(i,{element:i,info:c})}if(O.size!==0){if(O.size===1){let[i,a]=[...O.entries()][0];O.clear(),B=i,Y=a.info;let s=i.getBoundingClientRect();if(Pr(s,Y),v){let c=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${c?`<span class="comp-path">${c}</span>`:""}`}Nt(i,Y),$e({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}mn(),$e(null),v&&(v.innerHTML=`<span class="comp-name">${O.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function Bc(e){if(O.has(e)){if(O.delete(e),O.size===1){let[r,i]=[...O.entries()][0];O.clear(),en(),B=r,Y=i.info;let a=r.getBoundingClientRect();if(Pr(a,Y),Nt(r,Y),v){let s=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${s?`<span class="comp-path">${s}</span>`:""}`}$e({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else O.size===0?(en(),Ge()):(mn(),v&&(v.innerHTML=`<span class="comp-name">${O.size} elements selected</span>`));return}let t=ja(e);if(!t)return;Y&&B&&O.size===0&&(O.set(B,{element:B,info:Y}),kt(),Y=null,B=null,rt(null));let n=e.getBoundingClientRect(),o={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}};O.set(e,{element:e,info:o}),mn(),$e(null),v&&(v.innerHTML=`<span class="comp-name">${O.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function uo(){O.clear(),en()}function mn(){if(O.size===0){en();return}let e=[];for(let[t]of O){let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:n,borderRadius:o+2})}ta(e)}function ao(e){We&&(e.metaKey||e.ctrlKey||e.preventDefault())}function so(e){if(We&&e.key==="Escape"){if(O.size>0){uo(),v&&(v.classList.remove("visible"),v.style.display="none"),$e(null),e.preventDefault();return}if(Y){if(Wa()){to(),e.preventDefault();return}Ge(),e.preventDefault()}}}function Pr(e,t){if(B){let n=parseFloat(getComputedStyle(B).borderRadius)||4;rt(e,n+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function Be(){if(O.size>0){mn();return}if(!B||!Y)return;let e=B.getBoundingClientRect(),t=parseFloat(getComputedStyle(B).borderRadius)||4;if(rt(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function Wc(){Dn(null)}function Ge(){kt(),Y=null,B=null,Te=null,lo=null,qe=[],uo(),document.body.style.cursor="",rt(null),v&&(v.classList.remove("visible"),v.style.display="none"),$e(null)}function Ka(){return Y}function Za(){We=!1,document.removeEventListener("mousedown",oo,!0),document.removeEventListener("mousemove",ro,!0),document.removeEventListener("mouseup",io,!0),document.removeEventListener("keydown",so,!0),document.removeEventListener("click",ao,!0),document.removeEventListener("scroll",Be,!0),window.removeEventListener("resize",Be),Pt=!1,v?.remove(),v=null}function Or(e){e&&!Pt?(document.addEventListener("mousedown",oo,!0),document.addEventListener("mousemove",ro,!0),document.addEventListener("mouseup",io,!0),document.addEventListener("keydown",so,!0),document.addEventListener("click",ao,!0),document.addEventListener("scroll",Be,!0),window.addEventListener("resize",Be),Pt=!0,We=!0):!e&&Pt&&(document.removeEventListener("mousedown",oo,!0),document.removeEventListener("mousemove",ro,!0),document.removeEventListener("mouseup",io,!0),document.removeEventListener("keydown",so,!0),document.removeEventListener("click",ao,!0),document.removeEventListener("scroll",Be,!0),window.removeEventListener("resize",Be),Pt=!1,We=!1)}function qa(){return B??null}async function Ar(e){await co(e,{skipSidebar:!0})}nt();var pe=null,ue=null,Je=null,Ja=null,fn=!1,Ot=null,po=[],mo=new Map,fo=!1,Gc=`
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
`,At=null;function Qa(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=Gc,e.appendChild(t),Ua({onStart:Yc,onMove:jc,onEnd:Uc}),He(n=>{n.type==="reorderComplete"&&(Hr(),Ge())})}function Yc(e,t,n){Je=n,Ja=t,Ot={x:e.clientX,y:e.clientY},fn=!1,fo=!1,po=[],mo=new Map,At=null;let o=X();if(!o)return;pe=document.createElement("div"),pe.className="drag-preview";let r=t.getBoundingClientRect();pe.style.width=`${r.width}px`,pe.style.height=`${r.height}px`,pe.innerHTML=t.outerHTML,o.appendChild(pe),ue=document.createElement("div"),ue.className="drop-indicator",o.appendChild(ue);let i=n.stack[1];if(!i)return;ve({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=He(s=>{if(s.type!=="siblingsList")return;a(),po=s.siblings;let c=document.querySelectorAll("*");for(let u of c){if(u.closest("#frameup-root"))continue;let d=oe(u);if(!d)continue;let p=d;for(;p;){if(fe(p)){let f=p._debugSource||p._debugOwner?._debugSource;if(f){for(let m of s.siblings)f.lineNumber===m.lineNumber&&f.fileName===i.filePath&&mo.set(m.lineNumber,{el:u,rect:u.getBoundingClientRect()});break}}p=p.return}}fo=!0})}function jc(e){if(!Ot)return;let t=Math.abs(e.clientX-Ot.x),n=Math.abs(e.clientY-Ot.y);if(t<5&&n<5||(fn=!0,pe&&(pe.style.display="block",pe.style.left=`${e.clientX+10}px`,pe.style.top=`${e.clientY+10}px`),!fo||!Je))return;let o=null,r=1/0,i=0,a=0,s=0;for(let c of po){if(c.lineNumber===Je.lineNumber)continue;let u=mo.get(c.lineNumber);if(!u)continue;let d=u.rect,p=d.top+d.height/2,f=Math.abs(e.clientY-p);f<r&&(r=f,o=c,e.clientY<p?i=d.top-2:i=d.bottom+2,a=d.left,s=d.width)}At=o,o&&ue?(ue.style.display="block",ue.style.top=`${i}px`,ue.style.left=`${a}px`,ue.style.width=`${s}px`):ue&&(ue.style.display="none")}function Uc(e){if(!fn||!At||!Je){Hr();return}ve({type:"reorder",filePath:Je.filePath,fromLine:Je.lineNumber,toLine:At.lineNumber,fromComponent:Je.componentName,toComponent:At.componentName}),pe&&(pe.style.display="none"),ue&&(ue.style.display="none"),fn=!1,Ot=null}function Hr(){pe?.remove(),ue?.remove(),pe=null,ue=null,Je=null,Ja=null,fn=!1,Ot=null,fo=!1,po=[],mo=new Map,At=null}function es(){Hr()}j();Oe();var $r="http://www.w3.org/2000/svg",Ht=null,we=null,Ir=null;function ts(){let e=X();e&&(Ht=document.createElementNS($r,"svg"),Ht.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),we=document.createElementNS($r,"g"),we.setAttribute("class","annotation-root"),Ht.appendChild(we),e.appendChild(Ht),window.addEventListener("scroll",go,{passive:!0}),Ir=Zn(go),go())}function go(){if(!we)return;let{scale:e,offsetX:t,offsetY:n}=Ve();we.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function ns(e,t,n,o,r,i){if(!we)return null;let a=document.createElementNS($r,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${H.sm};
    padding: 4px 8px;
    border-radius: ${k.sm};
    font-size: ${r}px;
    font-family: ${C};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,s.textContent=o,a.appendChild(s),we.appendChild(a),a}function os(e){if(!we)return;let t=we.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function _r(){we&&(we.innerHTML="")}function rs(){window.removeEventListener("scroll",go),Ir?.(),Ir=null,Ht?.remove(),Ht=null,we=null}Wn();Oe();j();gn();nt();vt();j();dt();Oe();Oe();ot();var nd=new Set(["IMG","INPUT","VIDEO","IFRAME","CANVAS","SELECT","TEXTAREA","HR","BR","EMBED","OBJECT","PROGRESS"]),q=null,ut="",yo="",xo="",he=null,Ur="",Xr=null,bo=null;function ys(){return q!==null}function vs(){document.addEventListener("dblclick",Cs,!0),Xr=He(e=>{e.type==="updateTextComplete"&&od(e)})}function xs(){q&&Ss(),document.removeEventListener("dblclick",Cs,!0),Xr?.(),Xr=null}function od(e){if(!e.success&&e.reason==="no-match"&&bo){let t=bo,n={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,originalText:t.originalText,newText:t.newText},o={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};wr(n,o,t.originalInnerHTML)}bo=null}function rd(e){return!!(e.scrollHeight>e.clientHeight+4||e.querySelector("br")||getComputedStyle(e).whiteSpace!=="nowrap"&&e.getClientRects().length>1)}async function id(e){let t=oe(e);if(!t)return null;try{let n=await ke(t);if(n&&n.length>0)for(let o of n){if(!o.functionName)continue;let r=o.functionName;if(r[0]!==r[0].toUpperCase()||_e(r))continue;let i="";if(o.fileName){let a=Se(o.fileName);Re(a)&&(i=a)}return{tagName:e.tagName.toLowerCase(),componentName:r,filePath:i,lineNumber:o.lineNumber??0,columnNumber:o.columnNumber??0,stack:[],boundingRect:e.getBoundingClientRect()}}}catch{}try{let n=t;for(;n;){if(fe(n)){let o=se(n.type),r=n._debugSource||n._debugOwner?._debugSource;if(o&&o[0]===o[0].toUpperCase()&&!_e(o)&&r)return{tagName:e.tagName.toLowerCase(),componentName:o,filePath:r.fileName||"",lineNumber:r.lineNumber||0,columnNumber:r.columnNumber||0,stack:[],boundingRect:e.getBoundingClientRect()}}if(!n.return)break;n=n.return}}catch{}return null}function Cs(e){q&&vo();let t=null,n=e.target;n instanceof HTMLElement&&n!==document.documentElement&&n!==document.body&&!n.hasAttribute("data-frameup-interaction")&&!n.closest("#frameup-root")?t=n:t=ct(e.clientX,e.clientY),t&&(nd.has(t.tagName)||t.textContent?.trim()&&(e.preventDefault(),ad(t)))}function ad(e){q=e,ut=e.textContent||"",yo=e.innerHTML,xo=ut,he=null,id(e).then(n=>{q===e&&(he=n)}),Ur=e.style.outline,e.style.outline=`2px solid ${l.accent}`,e.contentEditable="true",Yr(!1),e.focus();let t=window.getSelection();if(t){t.removeAllRanges();let n=document.createRange();n.selectNodeContents(e),n.collapse(!1),t.addRange(n)}e.addEventListener("blur",Ts),e.addEventListener("keydown",ws),e.addEventListener("input",Es)}function Es(){q&&(xo=q.textContent||"")}function Ts(){vo()}function ws(e){if(e.key==="Escape"){e.preventDefault(),vo();return}if(e.key==="Enter"&&q&&!rd(q)){e.preventDefault(),vo();return}e.stopPropagation()}function vo(){if(!q)return;let e=xo;if(e!==ut&&he)if(he.filePath)bo={componentInfo:he,originalText:ut,newText:e,originalInnerHTML:yo,tagName:he.tagName},ve({type:"updateText",filePath:he.filePath,lineNumber:he.lineNumber,columnNumber:he.columnNumber,originalText:ut,newText:e});else{let o={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:he.componentName,filePath:"",lineNumber:0,columnNumber:0,originalText:ut,newText:e},r={componentName:he.componentName,filePath:"",lineNumber:0,columnNumber:0,tagName:he.tagName};wr(o,r,yo)}let n=q;Ss(),n&&document.contains(n)&&co(n,{skipSidebar:!1})}function Ss(){q&&(q.removeEventListener("blur",Ts),q.removeEventListener("keydown",ws),q.removeEventListener("input",Es),q.removeAttribute("contenteditable"),q.style.outline=Ur,bn(Sa()),q=null,ut="",yo="",xo="",he=null,Ur="")}var Qe={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9093 12.3603L17.0007 20.8537L14.1816 21.8798L11.0902 13.3864L6.91797 16.5422L8.4087 1.63318L19.134 12.0959L13.9093 12.3603Z"></path></svg>',grab:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L16.2426 6.24264L14.8284 7.65685L12 4.82843L9.17157 7.65685L7.75736 6.24264L12 2ZM2 12L6.24264 7.75736L7.65685 9.17157L4.82843 12L7.65685 14.8284L6.24264 16.2426L2 12ZM22 12L17.7574 16.2426L16.3431 14.8284L19.1716 12L16.3431 9.17157L17.7574 7.75736L22 12ZM12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14ZM12 22L7.75736 17.7574L9.17157 16.3431L12 19.1716L14.8284 16.3431L16.2426 17.7574L12 22Z"></path></svg>',move:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 11V8L22 12L18 16V13H13V18H16L12 22L8 18H11V13H6V16L2 12L6 8V11H11V6H8L12 2L16 6H13V11H18Z"></path></svg>',draw:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>',color:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.5222 2 22 5.97778 22 10.8889C22 13.9556 19.5111 16.4444 16.4444 16.4444H14.4778C13.5556 16.4444 12.8111 17.1889 12.8111 18.1111C12.8111 18.5333 12.9778 18.9222 13.2333 19.2111C13.5 19.5111 13.6667 19.9 13.6667 20.3333C13.6667 21.2556 12.9 22 12 22C6.47778 22 2 17.5222 2 12C2 6.47778 6.47778 2 12 2ZM10.8111 18.1111C10.8111 16.0843 12.451 14.4444 14.4778 14.4444H16.4444C18.4065 14.4444 20 12.851 20 10.8889C20 7.1392 16.4677 4 12 4C7.58235 4 4 7.58235 4 12C4 16.19 7.2226 19.6285 11.324 19.9718C10.9948 19.4168 10.8111 18.7761 10.8111 18.1111ZM7.5 12C6.67157 12 6 11.3284 6 10.5C6 9.67157 6.67157 9 7.5 9C8.32843 9 9 9.67157 9 10.5C9 11.3284 8.32843 12 7.5 12ZM16.5 12C15.6716 12 15 11.3284 15 10.5C15 9.67157 15.6716 9 16.5 9C17.3284 9 18 9.67157 18 10.5C18 11.3284 17.3284 12 16.5 12ZM12 9C11.1716 9 10.5 8.32843 10.5 7.5C10.5 6.67157 11.1716 6 12 6C12.8284 6 13.5 6.67157 13.5 7.5C13.5 8.32843 12.8284 9 12 9Z"></path></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6V21H11V6H5V4H19V6H13Z"></path></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.53614 18.8862 7.33243 17.1346 5.86492L15 8V2L21 2L18.5535 4.44656C20.6649 6.28002 22 8.9841 22 12Z"></path></svg>'},Ms=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",Co=navigator.platform.includes("Mac")?"Cmd":"Ctrl",qr=[{type:"pointer",icon:Qe.pointer,label:"Pointer",shortcut:"V"},{type:"grab",icon:Qe.grab,label:"Grab",shortcut:"G"},{type:"move",icon:Qe.move,label:"Move",shortcut:"J"},{type:"draw",icon:Qe.draw,label:"Draw",shortcut:"D"},{type:"text",icon:Qe.text,label:"Text",shortcut:"T"}],sd=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${k.lg};
    box-shadow: ${H.md};
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
    box-shadow: ${H.sm};
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
    box-shadow: ${H.sm};
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
    box-shadow: ${H.sm};
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
    box-shadow: ${H.lg};
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
`,be=null,ie=null,To=new Map,Ye=null,Kr=null,Zr=null;function Ls(e){Kr=e}function Ns(e){Zr=e}function ks(e){Ye&&(Ye.disabled=!e)}function Rs(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=sd,e.appendChild(t),be=document.createElement("div"),be.className="tools-panel";let n=[["pointer","grab"],["move"],["draw","text"]];for(let s=0;s<n.length;s++){if(s>0){let c=document.createElement("div");c.className="tool-divider",be.appendChild(c)}for(let c of n[s]){let u=qr.find(f=>f.type===c),d=document.createElement("button");d.className=`tool-btn${u.type==="pointer"?" active":""}`,d.innerHTML=`${u.icon}<span class="tooltip">${u.label}<span class="shortcut-badge">${Ms}${u.shortcut}</span></span>`,d.addEventListener("click",()=>Er(u.type));let p=null;d.addEventListener("mouseenter",()=>{p=setTimeout(()=>d.classList.add("tooltip-visible"),400)}),d.addEventListener("mouseleave",()=>{p&&clearTimeout(p),d.classList.remove("tooltip-visible")}),be.appendChild(d),To.set(u.type,d)}}ie=document.createElement("div"),ie.className="sub-options hidden",be.appendChild(ie);let o=document.createElement("div");o.className="tool-divider",be.appendChild(o),Ye=document.createElement("button"),Ye.className="action-btn",Ye.innerHTML=Qe.undo,Ye.title="Undo (Ctrl+Z)",Ye.disabled=!0,Ye.addEventListener("click",()=>{Zr&&Zr()}),be.appendChild(Ye);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=Qe.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{Kr&&Kr()}),be.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=Qe.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{ms(),i.style.color=ps()?l.accent:""}),be.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8H14V6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5C21 8.433 19.433 10 17.5 10H16V14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5V16H10V17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14H8V10H6.5C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5V8ZM8 8V6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM10 10V14H14V10H10Z"></path></svg>',a.title=`Keyboard Shortcuts (${Ms}/)`,a.addEventListener("click",()=>Os()),be.appendChild(a),e.appendChild(be),document.addEventListener("keydown",Ps,!0)}function Ps(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||ys()||!e.ctrlKey&&!e.metaKey)return;let n=e.key.toUpperCase();if(e.key==="/"||e.key==="?"){Os(),e.preventDefault();return}let o=qr.find(r=>r.shortcut===n);o&&(Er(o.type),e.preventDefault())}var Ae=null,yn=null;function Os(){Ae?Eo():ld()}function ld(){let e=X();if(!e||Ae)return;Ae=document.createElement("div"),Ae.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:qr.map(r=>({action:r.label,keys:[Co,r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[Co,"Z"]},{action:"Toggle Originals",keys:[Co,"."]},{action:"Keyboard Shortcuts",keys:[Co,"/"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Grab Tool","Drag"]},{action:"Zoom",keys:["Scroll Wheel"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let s of r.items){let c=document.createElement("div");c.className="shortcut-row";let u=document.createElement("span");u.className="shortcut-action",u.textContent=s.action,c.appendChild(u);let d=document.createElement("span");d.className="shortcut-keys";for(let p=0;p<s.keys.length;p++){if(p>0){let m=document.createElement("span");m.className="shortcut-plus",m.textContent="+",d.appendChild(m)}let f=document.createElement("span");f.className="shortcut-key",f.textContent=s.keys[p],d.appendChild(f)}c.appendChild(d),i.appendChild(c)}t.appendChild(i)}Ae.appendChild(t),Ae.addEventListener("click",r=>{r.target===Ae&&Eo()}),e.appendChild(Ae),yn=r=>{Eo()},document.addEventListener("keydown",yn,!0)}function Eo(){yn&&(document.removeEventListener("keydown",yn,!0),yn=null),Ae?.remove(),Ae=null}function As(e){for(let[t,n]of To)n.classList.toggle("active",t===e);cd(e)}function cd(e){if(ie){if(ie.innerHTML="",ie.classList.add("hidden"),ie.classList.remove("visible"),e==="draw"){ie.classList.remove("hidden"),requestAnimationFrame(()=>ie?.classList.add("visible"));let t=Mt(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.brushColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();nn({initialColor:t.brushColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){an("brushColor",i),n.style.background=i},onClose(){}})}),ie.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[2,4,8]){let i=document.createElement("button");i.className=`segment${r===t.brushSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{an("brushSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active"),Promise.resolve().then(()=>(dt(),bs)).then(a=>a.refreshDrawCursor())}),o.appendChild(i)}ie.appendChild(o)}else if(e==="text"){ie.classList.remove("hidden"),requestAnimationFrame(()=>ie?.classList.add("visible"));let t=Mt(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();nn({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){an("textColor",i),n.style.background=i},onClose(){}})}),ie.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{an("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}ie.appendChild(o)}}}function Hs(e){let t=To.get(e);t&&(t.style.backgroundColor=l.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function $s(){document.removeEventListener("keydown",Ps,!0),Eo(),be?.remove(),be=null,ie=null,To.clear()}dt();Br();ot();Oe();function Is(){Or(!0)}function _s(){Or(!1)}dt();gn();var Jr=!1,Qr=0,ei=0,Ds={onMouseDown(e){Jr=!0,Qr=e.clientX,ei=e.clientY,ho("grabbing")},onMouseMove(e){if(!Jr)return;let t=e.clientX-Qr,n=e.clientY-ei;ds(t,n),Qr=e.clientX,ei=e.clientY},onMouseUp(e){Jr=!1,ho("grab")}};Wn();Oe();dt();function Fs(e,t,n,o,r,i){let a=e.left+e.width/2,s=e.top+e.height/2,c=t.left+t.width/2,u=t.top+t.height/2,d=c-a,p=u-s,f=Math.abs(d)<=r,m=Math.abs(p)<=r;return{dx:f?n+d/i:n,dy:m?o+p/i:o,snappedX:f,snappedY:m,guides:{verticalLine:f?{x:c,top:t.top,bottom:t.bottom}:null,horizontalLine:m?{y:u,left:t.left,right:t.right}:null}}}var J=null,vn={x:0,y:0},_t={dx:0,dy:0},Dt=!1,pt=!1,xn=null,Vs={onMouseDown(e){xn=null,Dt=!1,pt=!1;let t=sn(e.clientX,e.clientY),n=ct(e.clientX,e.clientY);if(!n){Ge();return}let o=Sr(n);if(o){J=o,vn={x:t.x,y:t.y},_t={...o.delta},Dt=!1,pt=!0,St(o.element,o.delta.dx,o.delta.dy,o.existingTransform);return}let r=Ka(),i=qa();if(!r||!i||n!==i){xn=n;return}let a=Sr(i);if(a){J=a,vn={x:t.x,y:t.y},_t={...a.delta},Dt=!1,pt=!0,St(a.element,a.delta.dx,a.delta.dy,a.existingTransform);return}let s=i.getBoundingClientRect(),c=i.style.cssText,u=getComputedStyle(i).transform,d={id:crypto.randomUUID(),componentRef:{componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber},element:i,placeholder:null,originalRect:s,delta:{dx:0,dy:0},originalCssText:c,existingTransform:u==="none"?"":u,identity:{componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber,columnNumber:r.columnNumber,tagName:i.tagName.toLowerCase()}};La(d),J=d,vn={x:t.x,y:t.y},_t={dx:0,dy:0},Dt=!0,pt=!0,St(i,0,0,d.existingTransform)},onMouseMove(e){if(!pt||!J)return;let t=sn(e.clientX,e.clientY),n=_t.dx+(t.x-vn.x),o=_t.dy+(t.y-vn.y);St(J.element,n,o,J.existingTransform);let r=J.element.parentElement;if(!r||r===document.body||r===document.documentElement){J.delta={dx:n,dy:o},fr();return}let i=J.element.getBoundingClientRect(),a=r.getBoundingClientRect(),{scale:s}=Ve(),c=Fs(i,a,n,o,5,s);(c.snappedX||c.snappedY)&&St(J.element,c.dx,c.dy,J.existingTransform),J.delta={dx:c.dx,dy:c.dy},ea(c.guides)},onMouseUp(){pt&&J&&(Dt||Na(J.id,J.delta,_t),xa(J),fr(),Ar(J.element)),J=null,pt=!1,Dt=!1,xn&&(Ar(xn),xn=null)}};Oe();nt();vt();ot();dt();async function zs(e,t){let n=ct(e,t);if(!n)return null;let o=oe(n);if(!o)return null;try{let i=await ke(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let s=a.functionName;if(s[0]!==s[0].toUpperCase()||_e(s))continue;let c="";if(a.fileName){let u=Se(a.fileName);Re(u)&&(c=u)}return{componentName:s,filePath:c,lineNumber:a.lineNumber??0}}}catch{}let r=o;for(;r;){if(fe(r)){let i=se(r.type);if(i&&i[0]===i[0].toUpperCase()&&!_e(i)){let a=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:a?.fileName||"",lineNumber:a?.lineNumber||0}}}r=r.return}return null}j();var ae=null,mt=null,wo=null,Ws={onMouseDown(e){ae&&Bs();let t=sn(e.clientX,e.clientY);mt={pageX:t.x,pageY:t.y},zs(e.clientX,e.clientY).then(n=>{wo=n}),ae=document.createElement("input"),ae.type="text",ae.placeholder="Type annotation...",ae.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${l.bgPrimary};
      color: ${l.textPrimary};
      border: 1.5px solid ${l.accent};
      border-radius: ${k.sm};
      padding: 4px 8px;
      font-size: ${Mt().fontSize}px;
      font-family: ${C};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${l.accentSoft};
    `,ae.setAttribute("data-frameup-overlay","true"),ae.addEventListener("keydown",n=>{n.key==="Enter"&&(Bs(),n.preventDefault()),n.key==="Escape"&&(Gs(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(ae),ae.focus()},onMouseMove(){},onMouseUp(){}};function Bs(){if(!ae||!mt)return;let e=ae.value.trim();if(ae.remove(),ae=null,!e)return;let t=Mt(),n=crypto.randomUUID();ns(n,mt.pageX,mt.pageY,e,t.fontSize,t.textColor),ka({type:"text",id:n,position:mt,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:wo}),mt=null,wo=null}function Gs(){ae&&(ae.remove(),ae=null),mt=null,wo=null}function Ys(){Gs()}gn();j();var ft=null,Cn=null;function js(e){let t=e instanceof Error&&e.stack?e.stack:String(e);return/frameup|overlay/i.test(t)}function dd(e){let t=X();if(!t)return;ft&&ft.parentNode&&ft.parentNode.removeChild(ft),Cn&&clearTimeout(Cn);let n=document.createElement("div");n.setAttribute("style",["position: fixed","bottom: 72px","right: 16px","z-index: 2147483647","background: rgba(30, 30, 30, 0.92)","color: #fff",`font-family: ${C}`,"font-size: 12px","padding: 10px 14px",`border-radius: ${k.sm}`,`box-shadow: ${H.md}`,"max-width: 320px","display: flex","align-items: center","gap: 10px","opacity: 0",`transition: opacity ${M.medium}`].join("; "));let o=document.createElement("span");o.textContent=e,o.setAttribute("style","flex: 1;");let r=document.createElement("button");r.textContent="Dismiss",r.setAttribute("style",["background: rgba(255,255,255,0.15)","border: none","color: #fff",`font-family: ${C}`,"font-size: 11px","padding: 3px 8px",`border-radius: ${k.xs}`,"cursor: pointer","white-space: nowrap"].join("; ")),r.addEventListener("click",()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),Cn&&clearTimeout(Cn),ft=null}),n.appendChild(o),n.appendChild(r),t.appendChild(n),ft=n,requestAnimationFrame(()=>{n.style.opacity="1"}),Cn=setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),ft=null},8e3)}function ti(e){console.error("[FrameUp]",e),dd("FrameUp encountered an error. Your app is unaffected.")}function ud(){window.addEventListener("error",e=>{js(e.error??e.message)&&(ti(e.error??e.message),e.preventDefault())}),window.addEventListener("unhandledrejection",e=>{js(e.reason)&&(ti(e.reason),e.preventDefault())})}var ni=null;function Us(e,t,n){t.originalCssText=n.style.cssText,t.element=n,it(t)}function pd(){let e=window.__FRAMEUP_WS_PORT__;if(!e){console.warn("[FrameUp] No WebSocket port found.");return}if(document.getElementById("frameup-root"))return;Sn(e),yi(md);let t=X();t&&za(t),Xa(),Qi(),Qa(),ts(),Pa(r=>os(r)),ni=new MutationObserver(()=>{for(let[r,i]of Ma())document.contains(i.element)||setTimeout(()=>{let a=Bn(i.identity);if(a){Us(r,i,a);return}Ca(i.identity).then(s=>{s?Us(r,i,s):(Tr(r),U(`Component ${i.componentRef.componentName} removed \u2014 move cleared`))})},80)}),ni.observe(document.body,{childList:!0,subtree:!0}),Rs(),vs(),Gr(),_a(),It("grab",Ds),It("move",Vs),It("draw",void 0),It("text",Ws),Ta((r,i)=>{ln(),Hs(r),i==="pointer"&&_s(),i==="text"&&Ys(),$t(),sr(),r==="pointer"&&Is(),bn(r),As(r)}),wa(()=>{kn(Jn()),ks(Ha())}),Ns(()=>{let r=Mr();r&&U(`Undo: ${r}`)}),xi(()=>{if(!Jn()){U("No moved components to toggle");return}let r=!Oa();Aa(r),Nn(r)});let n=!1,o=0;Ci(()=>{if(n){U("Generation in progress");return}let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);U(`Please wait ${a}s before retrying`);return}let i=$a();if(!i.moves.length&&!i.annotations.length&&!i.colorChanges.length&&!i.textEdits.length){U("Nothing to confirm \u2014 make some visual changes first");return}n=!0,kn(!1),U("Generating..."),ve({type:"generate",annotations:i})}),He(r=>{if(r.type==="generateProgress"&&U(r.message),r.type==="generateComplete")if(n=!1,kn(Jn()),r.success){let i=r.changes.map(a=>a.description||a.filePath).join(", ");U(`Applied: ${i}`),Ge(),_r(),qn(),Nn(!0)}else U(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),Ei(()=>{let r=Mr();return r?(U(`Undo: ${r}`),!0):!1}),Ls(()=>{Ge(),_r(),qn(),us(),Nn(!0),U("Canvas cleared")}),console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools")}function md(){$t(),sr(),Za(),oa(),es(),rs(),ni?.disconnect(),$s(),xs(),jr(),qn(),zr(),li(),vi()}function Xs(){try{pd(),ud()}catch(e){ti(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Xs):Xs();})();
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
