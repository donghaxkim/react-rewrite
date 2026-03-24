"use strict";var FrameUp=(()=>{var Vs=Object.defineProperty;var ge=(e,t)=>()=>(e&&(t=e(e=0)),t);var zs=(e,t)=>{for(var o in t)Vs(e,o,{get:t[o],enumerable:!0})};function ai(){return`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${l.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='5 9 2 12 5 15'/><polyline points='9 5 12 2 15 5'/><polyline points='15 19 12 22 9 19'/><polyline points='19 9 22 12 19 15'/><line x1='2' y1='12' x2='22' y2='12'/><line x1='12' y1='2' x2='12' y2='22'/></svg>`)}") 12 12, move`}function Mo(e){if(wn&&wn.size===e)return wn.uri;let t=Math.max(e,2),o=t*2+4,n=o/2,r=`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${o}' height='${o}'><circle cx='${n}' cy='${n}' r='${t}' fill='none' stroke='${l.accent}' stroke-width='1.5'/></svg>`)}") ${n} ${n}, crosshair`;return wn={size:e,uri:r},r}var l,P,L,M,w,ii,wn,U=ge(()=>{"use strict";l={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},P={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},L={xs:"4px",sm:"6px",md:"10px",lg:"14px"},M={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},w="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",ii=`
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
`;wn=null});var Ro,Gt,bi,Zs,Bt,vi,Ln,xi,yi,Wt,Mn,ze,Po,Yt,Oo,pt,Ao,kn,Ut=ge(()=>{"use strict";Ro="0.5.32",Gt=`bippy-${Ro}`,bi=Object.defineProperty,Zs=Object.prototype.hasOwnProperty,Bt=()=>{},vi=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},Ln=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),xi=!1,Wt=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>xi?!0:(e&&typeof e.inject=="function"&&(yi=e.inject.toString()),!!yi?.includes("(injected)")),Mn=new Set,ze=new Set,Po=e=>{let t=new Map,o=0,n={_instrumentationIsActive:!1,_instrumentationSource:Gt,checkDCE:vi,hasUnsupportedRendererAttached:!1,inject(r){let i=++o;return t.set(i,r),ze.add(r),n._instrumentationIsActive||(n._instrumentationIsActive=!0,Mn.forEach(a=>a())),i},on:Bt,onCommitFiberRoot:Bt,onCommitFiberUnmount:Bt,onPostCommitFiberRoot:Bt,renderers:t,supportsFiber:!0,supportsFlight:!0};try{bi(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return n},set(a){if(a&&typeof a=="object"){let s=n.renderers;n=a,s.size>0&&(s.forEach((c,u)=>{ze.add(c),a.renderers.set(u,c)}),Yt(e))}}});let r=window.hasOwnProperty,i=!1;bi(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{Yt(e)}return n},Yt=e=>{e&&Mn.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=vi,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=Gt,t._instrumentationIsActive=!1;let o=Ln(t);if(o||(t.on=Bt),t.renderers.size){t._instrumentationIsActive=!0,Mn.forEach(i=>i());return}let n=t.inject,r=Wt(t);r&&!o&&(xi=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=n(i);return ze.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,Mn.forEach(s=>s()),a}}(t.renderers.size||t._instrumentationIsActive||Wt())&&e?.()}catch{}},Oo=()=>Zs.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),pt=e=>Oo()?(Yt(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Po(e),Ao=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),kn=()=>{try{Ao()&&pt()}catch{}}});var Ci=ge(()=>{"use strict";Ut();kn()});function Uo(e,t,o=!1){if(!e)return null;let n=t(e);if(n instanceof Promise)return(async()=>{if(await n===!0)return e;let i=o?e.return:e.child;for(;i;){let a=await Xo(i,t,o);if(a)return a;i=o?null:i.sibling}return null})();if(n===!0)return e;let r=o?e.return:e.child;for(;r;){let i=jo(r,t,o);if(i)return i;r=o?null:r.sibling}return null}var $o,Ho,_o,Do,Io,Fo,Vo,zo,Bo,Wo,Yo,Go,Ce,jo,Xo,Ko,pe,Zo,qo,se,qs,Jo=ge(()=>{"use strict";Ut();$o=0,Ho=1,_o=5,Do=11,Io=13,Fo=15,Vo=16,zo=19,Bo=26,Wo=27,Yo=28,Go=30,Ce=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};jo=(e,t,o=!1)=>{if(!e)return null;if(t(e)===!0)return e;let n=o?e.return:e.child;for(;n;){let r=jo(n,t,o);if(r)return r;n=o?null:n.sibling}return null},Xo=async(e,t,o=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let n=o?e.return:e.child;for(;n;){let r=await Xo(n,t,o);if(r)return r;n=o?null:n.sibling}return null},Ko=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?Ko(t.type||t.render):null},pe=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let o=t.displayName||t.name||null;if(o)return o;let n=Ko(t);return n&&(n.displayName||n.name)||null},Zo=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||Ln(e)||Wt(e)},qo=e=>{let t=pt(e.onActive);t._instrumentationSource=e.name??Gt;let o=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,s,c)=>{o!==i&&(o?.(a,s,c),e.onCommitFiberRoot?.(a,s,c))};t.onCommitFiberRoot=i}let n=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,s)=>{t.onCommitFiberUnmount===i&&(n?.(a,s),e.onCommitFiberUnmount?.(a,s))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,s)=>{t.onPostCommitFiberRoot===i&&(r?.(a,s),e.onPostCommitFiberRoot?.(a,s))};t.onPostCommitFiberRoot=i}return t},se=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let o of t.renderers.values())try{let n=o.findFiberByHostInstance?.(e);if(n)return n}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let o in e)if(o.startsWith("__reactContainer$")||o.startsWith("__reactInternalInstance$")||o.startsWith("__reactFiber"))return e[o]||null}return null},qs=Error()});var mt=ge(()=>{"use strict";Ut();Ci();Jo();});function jt(e,t){let o=0,n=0,r=0;do r=_i[e.next()],o|=(r&31)<<n,n+=5;while(r&32);let i=o&1;return o>>>=1,i&&(o=-2147483648|-o),t+o}function Mi(e,t){return e.pos>=t?!1:e.peek()!==rl}function Di(e){let{length:t}=e,o=new al(e),n=[],r=0,i=0,a=0,s=0,c=0;do{let u=o.indexOf(";"),d=[],p=!0,m=0;for(r=0;o.pos<u;){let f;r=jt(o,r),r<m&&(p=!1),m=r,Mi(o,u)?(i=jt(o,i),a=jt(o,a),s=jt(o,s),Mi(o,u)?(c=jt(o,c),f=[r,i,a,s,c]):f=[r,i,a,s]):f=[r],d.push(f),o.pos++}p||sl(d),n.push(d),o.pos=u+1}while(o.pos<=t);return n}function sl(e){e.sort(ll)}function ll(e,t){return e[0]-t[0]}var wi,Js,Qs,Pi,el,tl,Oi,nl,Ai,ol,$i,Hi,tr,Ti,Ei,rl,Si,il,_i,al,Ii,cl,dl,Fi,Xt,Nn,ul,Li,pl,ml,fl,gl,ki,hl,bl,yl,vl,xl,Ni,Re,Cl,Qo,er,wl,Tl,El,Sl,Ml,Ll,kl,Nl,Be,Ri,Rl,Pl,Pe,We,Kt=ge(()=>{"use strict";Ut();Jo();wi=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Js=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],Qs=["<anonymous>","eval",""],Pi=/\.(jsx|tsx|ts|js)$/,el=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,tl=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,Oi="(at Server)",nl=/(^|@)\S+:\d+/,Ai=/^\s*at .*(\S+:\d+|\(native\))/m,ol=/^(eval@)?(\[native code\])?$/,$i=(e,t)=>{if(t?.includeInElement!==!1){let o=e.split(`
`),n=[];for(let r of o)if(/^\s*at\s+/.test(r)){let i=Ti(r,void 0)[0];i&&n.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");n.push({functionName:i,source:r})}else if(r.match(nl)){let i=Ei(r,void 0)[0];i&&n.push(i)}return tr(n,t)}return e.match(Ai)?Ti(e,t):Ei(e,t)},Hi=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,o=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return o?[o[1],o[2]||void 0,o[3]||void 0]:[t,void 0,void 0]},tr=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e,Ti=(e,t)=>tr(e.split(`
`).filter(o=>!!o.match(Ai)),t).map(o=>{let n=o;n.includes("(eval ")&&(n=n.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=n.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=Hi(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:n}}),Ei=(e,t)=>tr(e.split(`
`).filter(o=>!o.match(ol)),t).map(o=>{let n=o;if(n.includes(" > eval")&&(n=n.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!n.includes("@")&&!n.includes(":"))return{functionName:n};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=n.match(r),a=i&&i[1]?i[1]:void 0,s=Hi(n.replace(r,""));return{functionName:a,fileName:s[0],lineNumber:s[1]?+s[1]:void 0,columnNumber:s[2]?+s[2]:void 0,source:n}}}),rl=44,Si="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",il=new Uint8Array(64),_i=new Uint8Array(128);for(let e=0;e<Si.length;e++){let t=Si.charCodeAt(e);il[e]=t,_i[t]=e}al=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:o}=this,n=t.indexOf(e,o);return n===-1?t.length:n}};Ii=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,cl=/^data:application\/json[^,]+base64,/,dl=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,Fi=typeof WeakRef<"u",Xt=new Map,Nn=new Map,ul=e=>Fi&&e instanceof WeakRef,Li=(e,t,o,n)=>{if(o<0||o>=e.length)return null;let r=e[o];if(!r||r.length===0)return null;let i=null;for(let d of r)if(d[0]<=n)i=d;else break;if(!i||i.length<4)return null;let[,a,s,c]=i;if(a===void 0||s===void 0||c===void 0)return null;let u=t[a];return u?{columnNumber:c,fileName:u,lineNumber:s+1}:null},pl=(e,t,o)=>{if(e.sections){let n=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&o>=a.offset.column)n=a;else break;if(!n)return null;let r=t-n.offset.line,i=t===n.offset.line?o-n.offset.column:o;return Li(n.map.mappings,n.map.sources,r,i)}return Li(e.mappings,e.sources,t-1,o)},ml=(e,t)=>{let o=t.split(`
`),n;for(let i=o.length-1;i>=0&&!n;i--){let a=o[i].match(dl);a&&(n=a[1]||a[2])}if(!n)return null;let r=Ii.test(n);if(!(cl.test(n)||r||n.startsWith("/"))){let i=e.split("/");i[i.length-1]=n,n=i.join("/")}return n},fl=e=>({file:e.file,mappings:Di(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),gl=e=>{let t=e.sections.map(({map:n,offset:r})=>({map:{...n,mappings:Di(n.mappings)},offset:r})),o=new Set;for(let n of t)for(let r of n.map.sources)o.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(o),sourcesContent:void 0,version:3}},ki=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let o=t.match(Ii);if(!o)return!0;let n=o[0].toLowerCase();return n==="http:"||n==="https:"},hl=async(e,t=fetch)=>{if(!ki(e))return null;let o;try{let r=await t(e);if(!r.ok)return null;o=await r.text()}catch{return null}if(!o)return null;let n=ml(e,o);if(!n||!ki(n))return null;try{let r=await t(n);if(!r.ok)return null;let i=await r.json();return"sections"in i?gl(i):fl(i)}catch{return null}},bl=async(e,t=!0,o)=>{if(t&&Xt.has(e)){let i=Xt.get(e);if(i==null)return null;if(ul(i)){let a=i.deref();if(a)return a;Xt.delete(e)}else return i}if(t&&Nn.has(e))return Nn.get(e);let n=hl(e,o);t&&Nn.set(e,n);let r=await n;return t&&Nn.delete(e),t&&(r===null?Xt.set(e,null):Xt.set(e,Fi?new WeakRef(r):r)),r},yl=async(e,t=!0,o)=>await Promise.all(e.map(async n=>{if(!n.fileName)return n;let r=await bl(n.fileName,t,o);if(!r||typeof n.lineNumber!="number"||typeof n.columnNumber!="number")return n;let i=pl(r,n.lineNumber,n.columnNumber);return i?{...n,source:i.fileName&&n.source?n.source.replace(n.fileName,i.fileName):n.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:n})),vl=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",xl=()=>{let e=pt();for(let t of[...Array.from(ze),...Array.from(e.renderers.values())]){let o=t.currentDispatcherRef;if(o&&typeof o=="object")return"H"in o?o.H:o.current}return null},Ni=e=>{for(let t of ze){let o=t.currentDispatcherRef;o&&typeof o=="object"&&("H"in o?o.H=e:o.current=e)}},Re=e=>`
    in ${e}`,Cl=(e,t)=>{let o=Re(e);return t&&(o+=` (at ${t})`),o},Qo=!1,er=(e,t)=>{if(!e||Qo)return"";let o=Error.prepareStackTrace;Error.prepareStackTrace=void 0,Qo=!0;let n=xl();Ni(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let s={DetermineComponentFrameRoot(){let d;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(m){d=m}Reflect.construct(e,[],p)}else{try{p.call()}catch(m){d=m}e.call(p.prototype)}}else{try{throw Error()}catch(m){d=m}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&d instanceof Error&&typeof p.stack=="string")return[p.stack,d.stack]}return[null,null]}};s.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(s.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(s.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,u]=s.DetermineComponentFrameRoot();if(c&&u){let d=c.split(`
`),p=u.split(`
`),m=0,f=0;for(;m<d.length&&!d[m].includes("DetermineComponentFrameRoot");)m++;for(;f<p.length&&!p[f].includes("DetermineComponentFrameRoot");)f++;if(m===d.length||f===p.length)for(m=d.length-1,f=p.length-1;m>=1&&f>=0&&d[m]!==p[f];)f--;for(;m>=1&&f>=0;m--,f--)if(d[m]!==p[f]){if(m!==1||f!==1)do if(m--,f--,f<0||d[m]!==p[f]){let g=`
${d[m].replace(" at new "," at ")}`,y=pe(e);return y&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",y)),g}while(m>=1&&f>=0);break}}}finally{Qo=!1,Error.prepareStackTrace=o,Ni(n),console.error=r,console.warn=i}let a=e?pe(e):"";return a?Re(a):""},wl=(e,t)=>{let o=e.tag,n="";switch(o){case Yo:n=Re("Activity");break;case Ho:n=er(e.type,!0);break;case Do:n=er(e.type.render,!1);break;case $o:case Fo:n=er(e.type,!1);break;case _o:case Bo:case Wo:n=Re(e.type);break;case Vo:n=Re("Lazy");break;case Io:n=e.child!==t&&t!==null?Re("Suspense Fallback"):Re("Suspense");break;case zo:n=Re("SuspenseList");break;case Go:n=Re("ViewTransition");break;default:return""}return n},Tl=e=>{try{let t="",o=e,n=null;do{t+=wl(o,n);let r=o._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=Cl(a.name,a.env))}n=o,o=o.return}while(o);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},El=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let o=e;if(!o)return"";Error.prepareStackTrace=t,o.startsWith(`Error: react-stack-top-frame
`)&&(o=o.slice(29));let n=o.indexOf(`
`);if(n!==-1&&(o=o.slice(n+1)),n=Math.max(o.indexOf("react_stack_bottom_frame"),o.indexOf("react-stack-bottom-frame")),n!==-1&&(n=o.lastIndexOf(`
`,n)),n!==-1)o=o.slice(0,n);else return"";return o},Sl=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),Ml=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,Ll=e=>{let t=new Map;for(let o of e)for(let n of o.stackFrames){if(!Sl(n))continue;let r=n.functionName,i=t.get(r)??[];i.some(a=>Ml(a,n))||(i.push(n),t.set(r,i))}return t},kl=(e,t,o)=>{if(!e.functionName)return{...e,isServer:!0};let n=t.get(e.functionName);if(!n||n.length===0)return{...e,isServer:!0};let r=o.get(e.functionName)??0,i=n[r%n.length];return o.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(Oi,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},Nl=e=>{let t=[];return Uo(e,o=>{if(!vl(o))return;let n=typeof o.type=="string"?o.type:pe(o.type)||"<anonymous>";t.push({componentName:n,stackFrames:$i(El(o._debugStack?.stack))})},!0),t},Be=async(e,t=!0,o)=>{let n=Nl(e),r=$i(Tl(e)),i=Ll(n),a=new Map;return yl(r.map(s=>s.source?.includes(Oi)??!1?kl(s,i,a):s).filter((s,c,u)=>{if(c===0)return!0;let d=u[c-1];return s.functionName!==d.functionName}),t,o)},Ri=e=>e.split("/").filter(Boolean).length,Rl=e=>e.split("/").filter(Boolean)[0]??null,Pl=e=>{let t=e.indexOf("/",1);if(t===-1||Ri(e.slice(0,t))!==1)return e;let o=e.slice(t);if(!Pi.test(o)||Ri(o)<2)return e;let n=Rl(o);return!n||n.startsWith("@")||n.length>4?e:o},Pe=e=>{if(!e||Qs.some(i=>i===e))return"";let t=e,o=t.startsWith("http://")||t.startsWith("https://");if(o)try{t=new URL(t).pathname}catch{}if(o&&(t=Pl(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),s=i.indexOf(":");t=a!==-1&&(s===-1||a<s)?i.slice(a+1):i}let n=!0;for(;n;){n=!1;for(let i of Js)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),n=!0;break}}if(wi.test(t)){let i=t.match(wi);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);tl.test(i)&&(t=t.slice(0,r))}return t},We=e=>{let t=Pe(e);return!(!t||!Pi.test(t)||el.test(t))}});function ft(e){return!!(Ol.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function nr(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let o=e.getBoundingClientRect(),n=window.innerWidth,r=window.innerHeight;return o.width>=n*.9&&o.height>=r*.9}function or(){Zt=new WeakMap}function _l(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function Dl(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=$l}function Il(e,t){let o=t.position;if(o!=="fixed"&&o!=="absolute")return!1;let n=e.getBoundingClientRect();if(n.width/window.innerWidth<Rn||n.height/window.innerHeight<Rn)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>Hl}function qt(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&nr(e)||e.closest("#frameup-root")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-placeholder"))return!1;let o=performance.now(),n=Zt.get(e);if(n&&o-n.timestamp<Al)return n.isValid;let r=window.getComputedStyle(e);return _l(e,r)?e.clientWidth/window.innerWidth>=Rn&&e.clientHeight/window.innerHeight>=Rn&&(Dl(r)||Il(e,r))?(Zt.set(e,{isValid:!1,timestamp:o}),!1):(Zt.set(e,{isValid:!0,timestamp:o}),!0):(Zt.set(e,{isValid:!1,timestamp:o}),!1)}var Ol,Al,Rn,$l,Hl,Zt,gt=ge(()=>{"use strict";Ol=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);Al=50,Rn=.9,$l=2147483600,Hl=1e3,Zt=new WeakMap});function gc(e,t,o){let n=o&&o!=="none"?` ${o}`:"";return`translate(${e}px, ${t}px)${n}`}function tt(e){e.element.style.transform=gc(e.delta.dx,e.delta.dy,e.existingTransform)}function ma(e){e.existingTransform&&e.existingTransform!=="none"?e.element.style.transform=e.existingTransform:e.element.style.transform=""}function wt(e,t,o,n){e.style.transform=`translate(${t}px, ${o}px) scale(1.02)${n&&n!=="none"?` ${n}`:""}`,e.style.boxShadow=P.lg,e.style.transition="none",e.style.zIndex="2147483644"}function fa(e){tt(e),e.element.style.boxShadow="",e.element.style.transition="",e.element.style.zIndex=""}function ga(e){let t=document.querySelectorAll(e.tagName);for(let o of t)if(o instanceof HTMLElement)try{let n=se(o);for(;n;){if(Ce(n)){let r=n._debugSource,i=pe(n);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return o}n=n.return}}catch{}return null}async function ha(e){let t=document.querySelectorAll(e.tagName);for(let o of t)if(o instanceof HTMLElement)try{let n=se(o);if(!n)continue;let r=await Be(n);if(!r||r.length===0)continue;for(let i of r)if(!(!i.functionName||i.functionName!==e.componentName)&&i.fileName){let a=Pe(i.fileName);if(We(a)&&a.endsWith(e.filePath))return o}}catch{}return null}var Fn=ge(()=>{"use strict";mt();Kt();U()});function va(e){return Vn.push(e),()=>{Vn=Vn.filter(t=>t!==e)}}function xa(e){return zn.push(e),()=>{zn=zn.filter(t=>t!==e)}}function Tt(){zn.forEach(e=>e())}function Ca(){return gr}function br(e){let t=gr;t!==e&&(gr=e,Vn.forEach(o=>o(e,t)))}function ye(){return{...ya}}function on(e,t){ya[e]=t}function wa(){return be}function Ta(e){be.set(e.id,e),Gn({type:"moveCreate",moveId:e.id})}function Ea(e,t,o){let n=be.get(e);n&&(n.delta=t,tt(n),Gn({type:"moveDelta",moveId:e,previousDelta:o}))}function yr(e){let t=be.get(e);t&&(t.element.style.cssText=t.originalCssText,t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),be.delete(e),Tt())}function Yn(e){if(Ue.push(e),e.type==="colorChange"){let t=e;nt.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else nt.push({type:"annotationAdd",annotationId:e.id});Tt()}function Ma(e){Sa=e}function ba(e){Ue=Ue.filter(t=>t.id!==e),Sa?.(e),Tt()}function La(){return hr}function ka(e){hr=e;for(let t of be.values())e?tt(t):ma(t);Tt()}function vr(e){for(let t of be.values())if(t.element===e)return t}function xr(){let e=nt.pop();if(!e)return null;switch(e.type){case"moveCreate":return yr(e.moveId),"move removed";case"moveDelta":{let t=be.get(e.moveId);return t&&(t.delta=e.previousDelta,tt(t)),"move reverted"}case"annotationAdd":return ba(e.annotationId),"annotation removed";case"colorChange":{let t=Ue.find(o=>o.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),ba(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let o of t.overrides)t.element.style[o.cssProperty]=o.previousValue;return"property reverted"}}return null}function Gn(e){nt.push(e),Tt()}function Ae(){return{scale:nn,offsetX:Bn,offsetY:Wn}}function Un(e,t,o){nn=e,Bn=t,Wn=o,tn.forEach(n=>n())}function jn(e){return tn.push(e),()=>{tn=tn.filter(t=>t!==e)}}function je(e,t){return{x:(e-Bn)/nn,y:(t-Wn)/nn}}function Xn(){for(let e of be.values())e.element.style.cssText=e.originalCssText,e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder);for(let e of Ue)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of nt)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let o of t.overrides)t.element.style[o.cssProperty]=o.previousValue}be=new Map,Ue=[],nt=[],hr=!0,nn=1,Bn=0,Wn=0,tn.forEach(e=>e()),Tt()}function Cr(){return be.size>0||Ue.length>0}function Na(){return nt.length>0}function Ra(){let e=Array.from(be.values()).map(n=>({component:n.componentRef.componentName,file:n.componentRef.filePath,line:n.componentRef.lineNumber,originalRect:{top:n.originalRect.top,left:n.originalRect.left,width:n.originalRect.width,height:n.originalRect.height},delta:{dx:n.delta.dx,dy:n.delta.dy},siblingRects:(()=>{let r=n.element.parentElement;if(!r)return;let i=[];for(let a of Array.from(r.children)){if(a===n.element||!(a instanceof HTMLElement))continue;let s=a.getBoundingClientRect();i.push({component:a.tagName.toLowerCase(),rect:{top:s.top,left:s.left,width:s.width,height:s.height}})}return i.length>0?i:void 0})()})),t=[],o=[];for(let n of Ue)n.type==="draw"?t.push({type:"draw",startComponent:n.targetComponent?.componentName,startFile:n.targetComponent?.filePath,startLine:n.targetComponent?.lineNumber,points:n.points,color:n.color,strokeWidth:n.strokeWidth}):n.type==="text"?t.push({type:"text",content:n.content,position:n.position,targetComponent:n.targetComponent?.componentName,targetFile:n.targetComponent?.filePath,targetLine:n.targetComponent?.lineNumber}):n.type==="colorChange"&&o.push({component:n.component.componentName,file:n.component.filePath,line:n.component.lineNumber,property:n.property,from:n.fromColor,to:n.toColor,pickedToken:n.pickedToken});return{moves:e,annotations:t,colorChanges:o}}var be,Ue,nt,gr,hr,ya,nn,Bn,Wn,tn,Vn,zn,Sa,Se=ge(()=>{"use strict";Fn();be=new Map,Ue=[],nt=[],gr="pointer",hr=!0,ya={brushSize:4,brushColor:"#ef4444",fontSize:16,textColor:"#ffffff"},nn=1,Bn=0,Wn=0,tn=[],Vn=[],zn=[];Sa=null});function zc(){Or=document.body.style.background||document.body.style.backgroundColor||"",Ar=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,o=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",Z=document.createElement("div"),Z.setAttribute("data-frameup-canvas-wrapper","true"),Z.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${o};
  `.trim().replace(/\n\s*/g," "),Te=document.createElement("div"),Te.setAttribute("data-frameup-dot-bg","true"),Te.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${l.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let n=Array.from(document.body.childNodes);for(let r of n)r instanceof HTMLElement&&(r.id==="frameup-root"||r.hasAttribute("data-frameup-interaction")||r.hasAttribute("data-frameup-placeholder")||r.hasAttribute("data-frameup-annotation")||r.hasAttribute("data-frameup-dot-bg")||r.hasAttribute("data-frameup-canvas-wrapper"))||(os.push(r),Z.appendChild(r));Z.style.position="relative",Z.style.zIndex="1",document.body.insertBefore(Te,document.body.firstChild),document.body.insertBefore(Z,Te.nextSibling),Pr=jn(ns),ns(),rs.forEach(r=>r(Z))}function ns(){if(!Z||!Te)return;let{scale:e,offsetX:t,offsetY:o}=Ae();Z.style.transform=`translate(${t}px, ${o}px) scale(${e})`;let n=Fc*e,r=t%n,i=o%n;Te.style.backgroundImage=`radial-gradient(circle, ${Vc} ${ts}px, transparent ${ts}px)`,Te.style.backgroundSize=`${n}px ${n}px`,Te.style.backgroundPosition=`${r}px ${i}px`}function Bc(e,t,o){let{scale:n,offsetX:r,offsetY:i}=Ae(),a=Math.min(Dc,Math.max(_c,n+o));if(a===n)return;let s=(e-r)/n,c=(t-i)/n,u=e-s*a,d=t-c*a;Un(a,u,d)}function is(e){e.preventDefault();let t=-e.deltaY*Ic,{scale:o}=Ae(),n=t*o;Bc(e.clientX,e.clientY,n)}function as(e,t){let{scale:o,offsetX:n,offsetY:r}=Ae();Un(o,n+e,r+t)}function ss(){Un(1,0,0)}function ls(){return Z!==null}function cs(){Z?$r():zc()}function $r(){if(rs.forEach(e=>e(null)),Pr?.(),Pr=null,Z){for(;Z.firstChild;)document.body.insertBefore(Z.firstChild,Z);Z.remove(),Z=null}Te?.remove(),Te=null,os=[],document.body.style.background=Or,document.documentElement.style.background=Ar,Or="",Ar=""}var _c,Dc,Ic,Fc,ts,Vc,Z,Te,Pr,os,rs,Or,Ar,un=ge(()=>{"use strict";Se();U();_c=.1,Dc=5,Ic=.002,Fc=24,ts=1,Vc="rgba(0,0,0,0.15)",Z=null,Te=null,Pr=null,os=[],rs=[],Or="",Ar=""});function ds(e,t){if(!it)return;let o=performance.now(),n=Math.abs(e-it.clientX),r=Math.abs(t-it.clientY),i=n<=2&&r<=2,a=o-it.timestamp<16;if(i||a)return it.element}function us(e,t,o){it={clientX:e,clientY:t,element:o,timestamp:performance.now()}}function Ot(){it=null}var it,Hr=ge(()=>{"use strict";it=null});var ms={};zs(ms,{activateInteraction:()=>Ir,destroyInteraction:()=>Fr,getPageElementAtPoint:()=>mn,initInteraction:()=>Dr,refreshDrawCursor:()=>Yc,registerToolHandler:()=>At,setInteractionCursor:()=>uo,setInteractionPointerEvents:()=>Gc});function At(e,t){_r.set(e,t)}function Dr(){_=document.createElement("div"),_.setAttribute("data-frameup-interaction","true"),_.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(_),document.addEventListener("scroll",Ot,!0),_.addEventListener("mousedown",e=>{pn?.onMouseDown?.(e)}),_.addEventListener("mousemove",e=>{pn?.onMouseMove?.(e)}),_.addEventListener("mouseup",e=>{pn?.onMouseUp?.(e)}),document.addEventListener("wheel",ps,{passive:!1})}function ps(e){!_||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#frameup-root")||is(e)}function Ir(e){pn=_r.get(e)||null,_&&(_.style.pointerEvents=e==="pointer"?"none":"auto"),Wc(e)}function Wc(e){if(_)switch(e){case"pointer":_.style.cursor="default";break;case"grab":_.style.cursor="grab";break;case"move":_.style.cursor=ai();break;case"draw":_.style.cursor=Mo(ye().brushSize);break;case"text":_.style.cursor="text";break;default:_.style.cursor="default"}}function Yc(){Ca()==="draw"&&_&&(_.style.cursor=Mo(ye().brushSize))}function uo(e){_&&(_.style.cursor=e)}function Gc(e){_&&(_.style.pointerEvents=e?"auto":"none")}function mn(e,t){let o=ds(e,t);if(o!==void 0)return o;let n=document.elementsFromPoint(e,t),r=null;for(let i of n)if(i instanceof HTMLElement&&!i.closest("#frameup-root")&&!i.hasAttribute("data-frameup-interaction")&&!i.hasAttribute("data-frameup-placeholder")&&!(i===document.body||i===document.documentElement)&&!nr(i)){r=i;break}return us(e,t,r),r}function Fr(){document.removeEventListener("scroll",Ot,!0),document.removeEventListener("wheel",ps),_?.remove(),_=null,pn=null,_r.clear()}var _,pn,_r,$t=ge(()=>{"use strict";Se();U();Hr();gt();un();_=null,pn=null,_r=new Map});function Bs(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let o=document.createElement("canvas").getContext("2d");o.fillStyle="#000000",o.fillStyle=t;let n=o.fillStyle;if(n.startsWith("#"))return n;let r=n.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),s=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+s).toString(16).slice(1)}`}return e}function Ws(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(C=>{try{return Array.from(C.cssRules)}catch{return[]}}).filter(C=>C instanceof CSSStyleRule&&C.selectorText===":root").flatMap(C=>Array.from(C.style)).filter(C=>C.startsWith("--")),o={},n={},r={},i={},a={},s={},c={},u={},d={},p={},m={},f={},g={},y={},x={},R={},$={},A={},F=(C,H,re,ie)=>{C[re]=ie,H[ie]=re};for(let C of t){let H=e.getPropertyValue(C).trim();if(!H)continue;let re=C.match(/^--spacing-(.+)$/);if(re){F(o,p,re[1],H);continue}let ie=C.match(/^--color-(.+)$/);if(ie){let yn=ie[1];n[yn]=H,m[Bs(H)]=yn;continue}let N=C.match(/^--font-size-(.+)$/);if(N){F(r,f,N[1],H);continue}let W=C.match(/^--font-weight-(.+)$/);if(W){F(i,g,W[1],H);continue}let b=C.match(/^--radius-(.+)$/);if(b){F(a,y,b[1],H);continue}let S=C.match(/^--border-(.+)$/);if(S){F(s,x,S[1],H);continue}let G=C.match(/^--opacity-(.+)$/);if(G){F(c,R,G[1],H);continue}let de=C.match(/^--tracking-(.+)$/);if(de){F(u,$,de[1],H);continue}let Fe=C.match(/^--leading-(.+)$/);if(Fe){F(d,A,Fe[1],H);continue}}return{spacing:o,colors:n,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:s,opacity:c,letterSpacing:u,lineHeight:d,spacingReverse:p,colorsReverse:m,fontSizeReverse:f,fontWeightReverse:g,borderRadiusReverse:y,borderWidthReverse:x,opacityReverse:R,letterSpacingReverse:$,lineHeightReverse:A}}var Ys=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function Gs(e,t){let o={};for(let n of Ys){let r=e[n]??{},i=t[n]??{};o[n]=new Map([...Object.entries(r),...Object.entries(i)])}return o}function xn(e,t){return t.get(e)??null}function Zr(e,t,o){let r=(o??It())[e],i=[];for(let[s,c]of r.entries()){let u=parseFloat(c);isNaN(u)||i.push({numericValue:u,token:s,cssValue:c})}let a=parseFloat(t);return isNaN(a)||i.some(c=>c.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((s,c)=>s.numericValue-c.numericValue),i}var qr=null,Dt=null;function Jr(e){qr=e,Dt=null}function It(){if(Dt!==null)return Dt;let e=Ws();return Dt=Gs(e,qr??{}),Dt}var ae=null,Ft=[],ct=0,Us=5,xo=null,Co=null,wo=null,To=null,Eo=null,So=null;function Qr(e){So=e}function Cn(e){ae&&ae.readyState===WebSocket.OPEN||(Eo=e,ae=new WebSocket(`ws://localhost:${e}`),ae.onopen=()=>{let t=ct>0;ct=0,t&&To&&To()},ae.onmessage=t=>{try{let o=JSON.parse(t.data);o.type==="tailwindTokens"&&Jr(o.tokens),o.type==="updatePropertyComplete"&&So&&So(o.success,o.errorCode,o.error),Ft.forEach(n=>n(o))}catch{}},ae.onclose=t=>{if(ae=null,t.code===4001){wo&&wo();return}if(ct<Us){let o=500*Math.pow(2,ct);ct++,xo=setTimeout(()=>Cn(e),o)}else Co&&Co()},ae.onerror=()=>{})}function Ee(e){ae&&ae.readyState===WebSocket.OPEN&&ae.send(JSON.stringify(e))}function Je(e){return Ft.push(e),()=>{Ft=Ft.filter(t=>t!==e)}}function ei(){xo&&clearTimeout(xo),ae&&(ae.close(),ae=null),Ft=[]}function ti(e){Co=e}function ni(e){wo=e}function oi(e){To=e}function ri(){Eo&&(ct=0,Cn(Eo))}U();var ut=null,X=null,Vt=0,Tn=null,En=null,Qe=null,Lo=null,dt=null,zt=null,No=null,ci=null,js='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>',di='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path></svg>',ko='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',Xs='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>',si='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>',Ks=`
  :host {
    all: initial;
  }
  ${ii}
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
    font-family: ${w};
    font-size: 12px;
    color: ${l.textPrimary};
    box-shadow: ${P.md};
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
    box-shadow: ${P.md};
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
`;function ui(e){let t=document.createElement("div");t.id="frameup-root",document.body.appendChild(t),ut=t.attachShadow({mode:"open"});let o=document.createElement("style");o.textContent=Ks;let n=document.createElement("div");n.className="toolbar",n.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn eye-btn" title="Toggle originals (.)">
      ${di}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${ko}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Confirm</button>
    <button class="icon-btn close-btn" title="Close FrameUp">
      ${Xs}
    </button>
  `,ut.appendChild(o),ut.appendChild(n),X=n.querySelector(".undo-btn");let r=n.querySelector(".close-btn");Tn=n.querySelector(".generate-btn"),En=n.querySelector(".eye-btn"),dt=n.querySelector(".component-detail"),Qe=document.createElement("div"),Qe.className="toast",ut.appendChild(Qe),X.addEventListener("click",()=>{Ee({type:"undo"}),X&&(X.innerHTML='<div class="spinner"></div>',X.disabled=!0)}),r.addEventListener("click",e),En.addEventListener("click",()=>{zt&&zt()}),Tn.addEventListener("click",()=>{No&&No()}),document.addEventListener("keydown",i=>{i.key==="."&&(i.ctrlKey||i.metaKey)&&!li()&&(zt&&zt(),i.preventDefault()),i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!li()&&ci?.()&&i.preventDefault()}),ti(()=>{K("Disconnected. Click to reconnect."),ri()}),ni(()=>{K("Disconnected: another tab took over")}),oi(()=>{Vt=0,X&&(X.disabled=!0)}),Je(i=>{switch(i.type){case"reorderComplete":i.success?(Vt++,X&&(X.innerHTML=si,setTimeout(()=>{X&&(X.innerHTML=ko,X.disabled=!1)},200))):i.error&&K(i.error);break;case"undoComplete":i.success?(Vt=Math.max(0,Vt-1),X&&(X.innerHTML=si,setTimeout(()=>{X&&(X.innerHTML=ko,X.disabled=Vt===0)},200))):i.error&&K(i.error);break;case"devServerDisconnected":K("Dev server disconnected");break;case"devServerReconnected":K("Dev server reconnected");break}})}function pi(){let e=document.getElementById("frameup-root");e&&e.remove(),ut=null,X=null}function j(){return ut}function mi(e){zt=e}function fi(e){No=e}function gi(e){ci=e}function Sn(e){En&&(En.innerHTML=e?di:js)}function hi(e){Tn&&(Tn.disabled=!e)}function Ne(e){if(!dt)return;if(!e){dt.className="component-detail empty",dt.textContent="No selection";return}dt.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";dt.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function K(e){Qe&&(Qe.textContent=e,Qe.classList.add("visible"),Lo&&clearTimeout(Lo),Lo=setTimeout(()=>{Qe?.classList.remove("visible")},2e3))}function li(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}mt();Kt();gt();gt();var Fl=.75,Vi=32,Pn=3,On=20,zi=100,he=1;function ht(e,t,o){return Math.min(o,Math.max(t,e))}function Vl(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,o=window.innerHeight,{x:n,y:r}=e,i=n+e.width,a=r+e.height,s=n+e.width/2,c=r+e.height/2,u=ht(Math.ceil(e.width/Vi),Pn,On),d=ht(Math.ceil(e.height/Vi),Pn,On);if(u*d>zi){let g=Math.sqrt(zi/(u*d));u=ht(Math.floor(u*g),Pn,On),d=ht(Math.floor(d*g),Pn,On)}let p=new Set,m=[],f=(g,y)=>{let x=ht(Math.round(g),0,t-1),R=ht(Math.round(y),0,o-1),$=`${x}:${R}`;p.has($)||(p.add($),m.push({x,y:R}))};f(n+he,r+he),f(i-he,r+he),f(n+he,a-he),f(i-he,a-he),f(s,r+he),f(s,a-he),f(n+he,c),f(i-he,c),f(s,c);for(let g=0;g<u;g++){let y=n+(g+.5)/u*e.width;for(let x=0;x<d;x++)f(y,r+(x+.5)/d*e.height)}return m}function Bi(e,t=qt,o=!0){let n={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=Vl(e);for(let c of i)for(let u of document.elementsFromPoint(c.x,c.y))r.add(u);let a=[];for(let c of r){if(!t(c))continue;let u=c.getBoundingClientRect();if(u.width<=0||u.height<=0)continue;let d={left:u.left,top:u.top,right:u.left+u.width,bottom:u.top+u.height};if(o){let p=Math.max(n.left,d.left),m=Math.max(n.top,d.top),f=Math.min(n.right,d.right),g=Math.min(n.bottom,d.bottom),y=Math.max(0,f-p)*Math.max(0,g-m),x=u.width*u.height;x>0&&y/x>=Fl&&a.push(c)}else n.left<d.right&&n.right>d.left&&n.top<d.bottom&&n.bottom>d.top&&a.push(c)}let s=a.filter(c=>!a.some(u=>u!==c&&u.contains(c)));return s.sort((c,u)=>{let d=c.compareDocumentPosition(u);return d&Node.DOCUMENT_POSITION_FOLLOWING?-1:d&Node.DOCUMENT_POSITION_PRECEDING?1:0}),s}U();function bt(e,t,o){return e+(t-e)*o}U();var zl=.35,Wi=.3,An=.5,Bl=2,oe=null,k=null,rr=0,ir=0,Jt=1,vt=null,Q=null,D=null,V=[],yt=l.accent,Wl="rgba(162,89,255,0.08)",Yi="rgba(162,89,255,0.15)",Yl=4,Gi=10,Gl="#ffffff",Ul=yt,jl=1.5,lr=!0,Ye=null;function ji(){let e=j();e&&(oe=document.createElement("canvas"),oe.setAttribute("data-frameup-overlay","true"),oe.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(oe),cr(),window.addEventListener("resize",cr))}function $n(e,t=4){if(!e){Q&&(Q.targetOpacity=0,Oe());return}let o={x:e.left,y:e.top,w:e.width,h:e.height};!Q||!Q.initialized?Q=pr(o,t):(Q.target=o,Q.borderRadius=t,Q.targetOpacity=1),Oe()}function et(e,t=4){if(!e){D&&(D.targetOpacity=0,Oe());return}let o={x:e.left,y:e.top,w:e.width,h:e.height};!D||!D.initialized?D=pr(o,t):(D.target=o,D.borderRadius=t,D.targetOpacity=1),Oe()}function Xi(e){Ye=e,Oe()}function dr(){Ye=null,Oe()}function Ki(e){for(D=null;V.length>e.length;)V.pop();for(let t=0;t<e.length;t++){let o=e[t],n={x:o.rect.left,y:o.rect.top,w:o.rect.width,h:o.rect.height};t<V.length?(V[t].target=n,V[t].borderRadius=o.borderRadius,V[t].targetOpacity=1):V.push(pr(n,o.borderRadius))}Oe()}function Qt(){V=[],Oe()}function ur(e,t){if(!lr)return null;let o=Ji();if(!o)return null;let n=ta(o.x,o.y,o.w,o.h);for(let r of n){let i=e-r.x,a=t-r.y;if(i*i+a*a<=Gi*Gi)return r.corner}return null}function Zi(){return Ji()}function qi(){vt!==null&&cancelAnimationFrame(vt),window.removeEventListener("resize",cr),oe?.remove(),oe=null,k=null,Q=null,D=null,V=[],Ye=null}function Ji(){if(V.length>1)return Qi(V);if(D&&D.opacity>=.5){let{x:e,y:t,w:o,h:n}=D.current;return{x:e,y:t,w:o,h:n}}if(V.length===1){let{x:e,y:t,w:o,h:n}=V[0].current;return{x:e,y:t,w:o,h:n}}return null}function Qi(e){if(e.length===0)return null;let t=1/0,o=1/0,n=-1/0,r=-1/0;for(let i of e){let{x:a,y:s,w:c,h:u}=i.current;a<t&&(t=a),s<o&&(o=s),a+c>n&&(n=a+c),s+u>r&&(r=s+u)}return{x:t,y:o,w:n-t,h:r-o}}function pr(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function cr(){oe&&(Jt=Math.max(window.devicePixelRatio||1,Bl),rr=window.innerWidth,ir=window.innerHeight,oe.width=rr*Jt,oe.height=ir*Jt,oe.style.width=`${rr}px`,oe.style.height=`${ir}px`,k=oe.getContext("2d"),Oe())}function Oe(){vt===null&&(vt=requestAnimationFrame(ea))}function ea(){if(vt=null,!k||!oe)return;let e=!1;Q?.initialized&&(ar(Q,zl)&&(e=!0),Q.opacity<.01&&Q.targetOpacity===0&&(Q=null)),D?.initialized&&(ar(D,Wi)&&(e=!0),D.opacity<.01&&D.targetOpacity===0&&(D=null));for(let t=V.length-1;t>=0;t--){let o=V[t];o.initialized&&ar(o,Wi)&&(e=!0),o.opacity<.01&&o.targetOpacity===0&&V.splice(t,1)}if(k.setTransform(1,0,0,1,0,0),k.clearRect(0,0,oe.width,oe.height),k.setTransform(Jt,0,0,Jt,0,0),Q&&sr(k,Q,yt,Wl),D&&(sr(k,D,yt,Yi),lr&&Ui(k,D.current,D.opacity)),Ye){if(k.save(),k.globalAlpha=.6,k.strokeStyle=yt,k.lineWidth=1,k.setLineDash([4,4]),Ye.verticalLine){let{x:t,top:o,bottom:n}=Ye.verticalLine;k.beginPath(),k.moveTo(t,o),k.lineTo(t,n),k.stroke()}if(Ye.horizontalLine){let{y:t,left:o,right:n}=Ye.horizontalLine;k.beginPath(),k.moveTo(o,t),k.lineTo(n,t),k.stroke()}k.restore()}if(V.length>0){for(let t of V)sr(k,t,yt,Yi);if(lr&&V.length>0){let t=Qi(V);t&&t.w>=24&&t.h>=24&&(V.length>1&&(k.globalAlpha=.6,k.beginPath(),k.rect(t.x,t.y,t.w,t.h),k.strokeStyle=yt,k.lineWidth=1,k.setLineDash([4,4]),k.stroke(),k.setLineDash([]),k.globalAlpha=1),Ui(k,t,1))}}e&&(vt=requestAnimationFrame(ea))}function ar(e,t){let o=e.current,n=e.target,r=bt(o.x,n.x,t),i=bt(o.y,n.y,t),a=bt(o.w,n.w,t),s=bt(o.h,n.h,t),c=bt(e.opacity,e.targetOpacity,t);return Math.abs(r-n.x)<An&&Math.abs(i-n.y)<An&&Math.abs(a-n.w)<An&&Math.abs(s-n.h)<An&&Math.abs(c-e.targetOpacity)<.01?(o.x=n.x,o.y=n.y,o.w=n.w,o.h=n.h,e.opacity=e.targetOpacity,!1):(o.x=r,o.y=i,o.w=a,o.h=s,e.opacity=c,!0)}function sr(e,t,o,n){let{x:r,y:i,w:a,h:s}=t.current;if(a<=0||s<=0)return;let c=Math.min(t.borderRadius,a/2,s/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,a,s,c):e.rect(r,i,a,s),e.fillStyle=n,e.fill(),e.strokeStyle=o,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function ta(e,t,o,n){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+o,y:t},{corner:"br",x:e+o,y:t+n},{corner:"bl",x:e,y:t+n}]}function Ui(e,t,o){if(t.w<24||t.h<24)return;e.globalAlpha=o;let n=ta(t.x,t.y,t.w,t.h);for(let r of n)e.beginPath(),e.arc(r.x,r.y,Yl,0,Math.PI*2),e.fillStyle=Gl,e.fill(),e.strokeStyle=Ul,e.lineWidth=jl,e.stroke();e.globalAlpha=1}var Xl=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],Kl=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],Zl=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],ql=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],Jl=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],xt=[...Xl,...Kl,...Zl,...ql,...Jl];U();var Ql=new Set(["auto","none","normal","inherit","initial"]);function na(e,t,o,n){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let s=document.createElement("input");s.type="text",s.className="prop-input",s.style.cssText="width:60px; cursor:text;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${w};`,a.appendChild(s),a.appendChild(c);let u=new Map(t);function d(){return u.get(r.key)??r.defaultValue}function p(m){let f=parseFloat(m);s.value=isNaN(f)?m:String(f);try{let y=Zr(i,m).find(x=>x.cssValue===m);y?.token?c.textContent=`${r.tailwindPrefix}-${y.token}`:c.textContent=""}catch{c.textContent=""}}return s.addEventListener("blur",()=>{let m=s.value.trim(),f=parseFloat(m);if(isNaN(f))Ql.has(m)?(u.set(r.key,m),p(m),o(r.key,m),n()):p(d());else{let y=m.match(/(px|rem|em|%|vw|vh|ch)$/)?m:`${f}px`;u.set(r.key,y),p(y),o(r.key,y),n()}}),s.addEventListener("keydown",m=>{m.key==="Enter"?s.blur():m.key==="Escape"&&(p(d()),s.blur())}),p(d()),{element:a,setValue(m,f){m===r.key&&(u.set(m,f),p(f))},destroy(){}}}U();function oa(e,t,o,n){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
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
      font-family:${w};
      font-size:10px;
      cursor:pointer;
      background:transparent;
      color:${l.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g," "),p.textContent=d.icon??d.label,p.title=d.label,p.addEventListener("click",()=>{u(d.value),o(r.key,d.value),n()}),c.push({btn:p,value:d.value,opt:d}),a.appendChild(p)}return u(s),{element:a,setValue(d,p){d===r.key&&u(p)},destroy(){}}}U();U();function Hn(e){let t=parseInt(e.slice(1,3),16)/255,o=parseInt(e.slice(3,5),16)/255,n=parseInt(e.slice(5,7),16)/255,r=Math.max(t,o,n),i=Math.min(t,o,n),a=r-i,s=0;a!==0&&(r===t?s=((o-n)/a+(o<n?6:0))*60:r===o?s=((n-t)/a+2)*60:s=((t-o)/a+4)*60);let c=r===0?0:a/r*100,u=r*100;return{h:s,s:c,v:u}}function _n(e){let t=e.h/360,o=e.s/100,n=e.v/100,r=Math.floor(t*6),i=t*6-r,a=n*(1-o),s=n*(1-i*o),c=n*(1-(1-i)*o),u,d,p;switch(r%6){case 0:u=n,d=c,p=a;break;case 1:u=s,d=n,p=a;break;case 2:u=a,d=n,p=c;break;case 3:u=a,d=s,p=n;break;case 4:u=c,d=a,p=n;break;case 5:u=n,d=a,p=s;break;default:u=0,d=0,p=0}let m=f=>Math.round(f*255).toString(16).padStart(2,"0");return`#${m(u)}${m(d)}${m(p)}`}var Ge=null;function en(e){Ct();let t=j();if(!t)return;let o=document.createElement("div");o.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${P.lg};
    border-radius: ${L.md};
    font-family: ${w};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${M.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let b=o.getBoundingClientRect();b.right>window.innerWidth-8&&(o.style.left=`${window.innerWidth-b.width-8}px`),b.bottom>window.innerHeight-8&&(o.style.top=`${window.innerHeight-b.height-8}px`),o.style.opacity="1"});let n=Hn(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let b=ec(["Fill","Text"],0,S=>{r=S===0?"backgroundColor":"color",e.onPropertyChange?.(r)});o.appendChild(b)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),s=document.createElement("div");s.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${P.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(s),o.appendChild(c);function u(){let b=n.h,S=a.createLinearGradient(0,0,176,0);S.addColorStop(0,`hsl(${b}, 0%, 100%)`),S.addColorStop(1,`hsl(${b}, 100%, 50%)`),a.fillStyle=S,a.fillRect(0,0,176,120);let G=a.createLinearGradient(0,0,0,120);G.addColorStop(0,"rgba(0,0,0,0)"),G.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=G,a.fillRect(0,0,176,120);let de=n.s/100*176,Fe=(1-n.v/100)*120;s.style.left=`${de}px`,s.style.top=`${Fe}px`}let d=!1;i.addEventListener("mousedown",b=>{d=!0,p(b)});function p(b){let S=i.getBoundingClientRect(),G=Math.max(0,Math.min(176,b.clientX-S.left)),de=Math.max(0,Math.min(120,b.clientY-S.top));n.s=G/176*100,n.v=(1-de/120)*100,u(),H()}let m=document.createElement("canvas");m.width=176,m.height=14,m.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let f=m.getContext("2d"),g=document.createElement("div");g.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${P.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let y=document.createElement("div");y.style.cssText="position:relative;width:176px;height:14px;",y.appendChild(m),y.appendChild(g),o.appendChild(y);function x(){let b=f.createLinearGradient(0,0,176,0);for(let S=0;S<=6;S++)b.addColorStop(S/6,`hsl(${S*60}, 100%, 50%)`);f.fillStyle=b,f.fillRect(0,0,176,14),g.style.left=`${n.h/360*176}px`}let R=!1;m.addEventListener("mousedown",b=>{R=!0,$(b)});function $(b){let S=m.getBoundingClientRect(),G=Math.max(0,Math.min(176,b.clientX-S.left));n.h=G/176*360,x(),u(),H()}let A=document.createElement("input");A.type="text",A.value=_n(n),A.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${l.bgSecondary};
    border: 1px solid ${l.border};
    border-radius: ${L.sm};
    color: ${l.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,A.addEventListener("keydown",b=>{b.key==="Enter"&&A.blur(),b.stopPropagation()}),A.addEventListener("blur",()=>{let b=A.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(b)){let S=b.startsWith("#")?b:`#${b}`;n=Hn(S),u(),x(),H()}else A.value=_n(n)}),o.appendChild(A);let F=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],C=document.createElement("div");C.style.cssText="display:flex;gap:4px;justify-content:center;";for(let b of F){let S=document.createElement("button");S.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${b};
      border: 1px solid ${l.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${M.fast};
    `,S.addEventListener("mouseenter",()=>{S.style.boxShadow=P.sm}),S.addEventListener("mouseleave",()=>{S.style.boxShadow="none"}),S.addEventListener("click",()=>{n=Hn(b),u(),x(),A.value=b,H()}),C.appendChild(S)}o.appendChild(C);function H(){let b=_n(n);A.value=b,e.onColorChange(b)}t.appendChild(o),Ge=o,u(),x();let re=b=>{d&&p(b),R&&$(b)},ie=()=>{d=!1,R=!1};document.addEventListener("mousemove",re),document.addEventListener("mouseup",ie);let N=b=>{b.key==="Escape"&&Ct()};document.addEventListener("keydown",N,!0);let W=b=>{Ge&&!b.composedPath().includes(Ge)&&Ct()};setTimeout(()=>document.addEventListener("mousedown",W,!0),0),o._cleanup=()=>{document.removeEventListener("mousemove",re),document.removeEventListener("mouseup",ie),document.removeEventListener("keydown",N,!0),document.removeEventListener("mousedown",W,!0)},o._onClose=e.onClose}function Ct(){Ge&&(Ge._cleanup?.(),Ge._onClose?.(),Ge.remove(),Ge=null)}function ec(e,t,o){let n=document.createElement("div");n.style.cssText=`
    display: flex;
    background: ${l.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;let r=[];for(let i=0;i<e.length;i++){let a=document.createElement("button");a.textContent=e[i],a.style.cssText=`
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i===t?l.bgPrimary:"transparent"};
      box-shadow: ${i===t?P.sm:"none"};
      color: ${i===t?l.textPrimary:l.textSecondary};
      font-family: ${w}; font-size: 12px; cursor: pointer;
      transition: background ${M.fast}, color ${M.fast};
    `,a.addEventListener("click",()=>{r.forEach((s,c)=>{s.style.background=c===i?l.bgPrimary:"transparent",s.style.boxShadow=c===i?P.sm:"none",s.style.color=c===i?l.textPrimary:l.textSecondary}),o(i)}),r.push(a),n.appendChild(a)}return n}var mr=null;function tc(){return mr||(mr=document.createElement("canvas").getContext("2d")),mr}function ra(e,t,o,n){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${L.sm};
    border:1px solid ${l.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let s=document.createElement("input");s.type="text",s.placeholder="#rrggbb",s.className="prop-input",s.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${l.textSecondary}; font-family:${w};`,i.appendChild(a),i.appendChild(s),i.appendChild(c);let u=t.get(r.key)??r.defaultValue,d=!1;function p(g){let y=g.trim().toLowerCase();if(y==="transparent")return"transparent";if(y==="inherit"||y==="currentcolor"||y==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(y))return y;let x=tc();x.fillStyle="#000000",x.fillStyle=y;let R=x.fillStyle;if(R.startsWith("#"))return R;let $=R.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if($){let A=parseInt($[1],10),F=parseInt($[2],10),C=parseInt($[3],10);return`#${((1<<24)+(A<<16)+(F<<8)+C).toString(16).slice(1)}`}return"#000000"}function m(g){u=g,s.value=g,g==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=g;try{let y=It(),x=xn(g,y.colorsReverse);x?c.textContent=`${r.tailwindPrefix??"bg"}-${x}`:c.textContent=""}catch{c.textContent=""}}function f(){if(d)return;let g=s.value.trim();if(!g){m(u);return}let y=p(g);m(y),o(r.key,y),n()}return a.addEventListener("click",()=>{if(d){Ct(),d=!1;return}let g=a.getBoundingClientRect();d=!0,en({initialColor:p(u),position:{x:g.left-210,y:g.top},showPropertyToggle:!1,onColorChange:y=>{m(y),o(r.key,y)},onClose:()=>{d=!1,n()}})}),s.addEventListener("keydown",g=>{g.key==="Enter"?(f(),s.blur()):g.key==="Escape"&&(m(u),s.blur())}),s.addEventListener("blur",()=>{f()}),s.addEventListener("input",()=>{let g=s.value.trim(),y=p(g);a.style.background=y}),m(u),{element:i,setValue(g,y){g===r.key&&m(y)},destroy(){d&&(Ct(),d=!1)}}}U();function ia(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function aa(e,t,o,n){let r=new Map(t),i=[];for(let E of e){let T=ia(E.key);T&&i.push({descriptor:E,...T})}let a=document.createElement("div");a.style.cssText=`
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
  `.trim().replace(/\n\s*/g," "),d.textContent="content";let p=[];function m(E){let T=document.createElement("span"),ue=r.get(E.key)??E.defaultValue;return T.textContent=$(ue),T.title=E.label,T.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),T.addEventListener("mouseenter",()=>{T.style.background=l.bgTertiary}),T.addEventListener("mouseleave",()=>{(document.activeElement!==f||f.dataset.key!==E.key)&&(T.style.background="transparent")}),T.addEventListener("click",()=>{x(E,T)}),p.push({key:E.key,span:T,descriptor:E}),T}let f=document.createElement("input");f.type="text",f.className="prop-input",f.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(f);let g=null,y=null;function x(E,T){g&&g!==E&&R(),g=E,y=T,f.dataset.key=E.key;let ue=r.get(E.key)??E.defaultValue;f.value=$(ue);let J=0,qe=0,Ve=T;for(;Ve&&Ve!==a;)J+=Ve.offsetLeft,qe+=Ve.offsetTop,Ve=Ve.offsetParent;f.style.display="block",f.style.left=`${J}px`,f.style.top=`${qe}px`;let Kr=T.getBoundingClientRect();f.style.width=`${Math.max(40,Kr.width+10)}px`,f.focus(),f.select()}function R(){if(!g||!y)return;let E=f.value.trim(),T=g,ue=y,J,qe=parseFloat(E),Ve=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(qe)?Ve.has(E)?J=E:J=r.get(T.key)??T.defaultValue:J=E.match(/(px|rem|em|%|vw|vh|ch)$/)?E:`${qe}px`,r.set(T.key,J),ue.textContent=$(J),ue.style.background="transparent",f.style.display="none",f.dataset.key="",g=null,y=null,o(T.key,J),n()}f.addEventListener("keydown",E=>{if(E.key==="Enter")R();else if(E.key==="Escape"){if(g&&y){let T=r.get(g.key)??g.defaultValue;y.textContent=$(T)}f.style.display="none",f.dataset.key="",g=null,y=null}}),f.addEventListener("blur",()=>{R()});function $(E){let T=parseFloat(E);return isNaN(T)?E:T===Math.round(T)?String(Math.round(T)):E}function A(E){let T=document.createElement("span");return T.textContent=E,T.style.cssText=`
      font-size:9px;
      color:${l.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),T}function F(E,T){return i.find(ue=>ue.layer===E&&ue.side===T)}function C(E,T){let ue=F(E,T);if(!ue){let J=document.createElement("span");return J.textContent="-",J.style.cssText=`text-align:center; color:${l.textTertiary};`,J}return m(ue.descriptor)}let H=C("padding","top");H.style.gridRow="1",H.style.gridColumn="2",H.style.textAlign="center";let re=C("padding","left");re.style.gridRow="2",re.style.gridColumn="1";let ie=C("padding","right");ie.style.gridRow="2",ie.style.gridColumn="3";let N=C("padding","bottom");N.style.gridRow="3",N.style.gridColumn="2",N.style.textAlign="center",d.style.gridRow="2",d.style.gridColumn="2",u.appendChild(H),u.appendChild(re),u.appendChild(d),u.appendChild(ie),u.appendChild(N);let W=document.createElement("div");W.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let b=C("margin","top");b.style.gridRow="1",b.style.gridColumn="2",b.style.textAlign="center";let S=C("margin","left");S.style.gridRow="2",S.style.gridColumn="1";let G=C("margin","right");G.style.gridRow="2",G.style.gridColumn="3";let de=C("margin","bottom");de.style.gridRow="3",de.style.gridColumn="2",de.style.textAlign="center";let Fe=document.createElement("div");Fe.style.cssText="grid-row:2; grid-column:2;",Fe.appendChild(u),W.appendChild(b),W.appendChild(S),W.appendChild(Fe),W.appendChild(G),W.appendChild(de);let yn=A("margin"),Fs=A("padding"),vn=document.createElement("div");return vn.style.cssText="display:flex; gap:8px; padding:0 4px;",vn.appendChild(yn),vn.appendChild(Fs),c.appendChild(W),s.appendChild(c),a.appendChild(vn),a.appendChild(s),{element:a,setValue(E,T){if(!ia(E))return;r.set(E,T);let J=p.find(qe=>qe.key===E);J&&(J.span.textContent=$(T))},destroy(){}}}U();var Dn=new Set;function sa(e){return Dn.has(e)}var In=[];function la(e){return In.push(e),()=>{let t=In.indexOf(e);t>=0&&In.splice(t,1)}}var nc={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},oc={"number-scrub":na,segmented:oa,"color-swatch":ra,"box-model":aa},rc=`
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
    border-radius: ${L.xs};
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
`;function ic(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function ac(e){let t=new Map;for(let o of e){let n=t.get(o.group);n||(n=[],t.set(o.group,n)),n.push(o)}return t}function sc(e){let t=[],o=new Map;for(let n of e)if(n.compound&&n.compoundGroup){let r=o.get(n.compoundGroup);r||(r=[],o.set(n.compoundGroup,r)),r.push(n)}else t.push({controlType:n.controlType,descriptors:[n]});for(let[,n]of o)t.push({controlType:n[0].controlType,descriptors:n});return t}var lc=new Set(["flexDirection","justifyContent","alignItems","gap"]);function cc(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function fr(e,t,o,n){let r=document.createElement("div");r.className="prop-sections";let i=document.createElement("style");i.textContent=rc,r.appendChild(i);let a=[],s=ac(e);for(let[c,u]of s){let d=c==="layout"&&!cc(t)?u.filter(x=>!lc.has(x.key)):u;if(d.length===0)continue;let p=document.createElement("div");p.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${nc[c]}</span>${ic()}`;let f=document.createElement("div");f.className="prop-section-body";let g=Dn.has(c);if(g){let x=m.querySelector(".prop-section-chevron");x&&x.classList.add("collapsed"),f.classList.add("collapsed")}m.addEventListener("click",()=>{if(g=!g,g)Dn.add(c);else{Dn.delete(c);for(let R of In)R(c)}let x=m.querySelector(".prop-section-chevron");x&&x.classList.toggle("collapsed",g),f.classList.toggle("collapsed",g)}),p.appendChild(m);let y=sc(d);for(let x of y){let R=oc[x.controlType];if(!R)continue;let $=R(x.descriptors,t,o,n);if(x.descriptors.length>1||x.controlType==="box-model")f.appendChild($.element);else{let A=document.createElement("div");A.className="prop-control-row";let F=document.createElement("span");F.className="prop-control-label",F.textContent=x.descriptors[0].label,F.title=x.descriptors[0].label;let C=document.createElement("div");C.className="prop-control-value",C.appendChild($.element),A.appendChild(F),A.appendChild(C),f.appendChild(A)}a.push($)}p.appendChild(f),r.appendChild(p)}return{container:r,controls:a}}U();var dc=300,ca=260,da=380,ua="frameup-sidebar-width",uc=4,pc=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${l.bgPrimary};
    border-left: 1px solid ${l.border};
    box-shadow: ${P.lg};
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
    width: ${uc}px;
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
`;function mc(){try{let e=localStorage.getItem(ua);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=ca&&t<=da)return t}}catch{}return Math.min(dc,Math.floor(window.innerWidth*.22))}function fc(e){try{localStorage.setItem(ua,String(e))}catch{}}function pa(e,t){let o=document.createElement("style");o.textContent=pc,e.appendChild(o);let n=document.createElement("div");n.className="prop-sidebar",n.style.width=`${mc()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",n.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let s=document.createElement("div");s.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let u=document.createElement("div");u.className="prop-sidebar-file-path",a.appendChild(s),a.appendChild(u);let d=document.createElement("button");d.className="prop-sidebar-close",d.title="Close panel",d.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>',i.appendChild(a),i.appendChild(d),n.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",n.appendChild(p);let m=document.createElement("div");m.className="prop-sidebar-content",n.appendChild(m),e.appendChild(n);let f=!1,g=0,y=0;r.addEventListener("pointerdown",N=>{N.preventDefault(),N.stopPropagation(),f=!0,g=N.clientX,y=n.offsetWidth,r.classList.add("active"),r.setPointerCapture(N.pointerId)}),r.addEventListener("pointermove",N=>{if(!f)return;let W=g-N.clientX,b=Math.max(ca,Math.min(da,y+W));n.style.width=`${b}px`});let x=()=>{f&&(f=!1,r.classList.remove("active"),fc(n.offsetWidth))};r.addEventListener("pointerup",x),r.addEventListener("pointercancel",x),n.addEventListener("pointerdown",N=>N.stopPropagation()),n.addEventListener("mousedown",N=>N.stopPropagation()),n.addEventListener("click",N=>N.stopPropagation()),n.addEventListener("mouseup",N=>N.stopPropagation()),d.addEventListener("click",()=>{A(),t&&t()});let R=!1;function $(N,W,b,S){s.textContent=`<${N}>`,s.appendChild(c),u.textContent=`${W}:${b}`,u.title=`${W}:${b}`,m.innerHTML="",m.appendChild(S),R||(R=!0,n.offsetHeight,n.classList.add("visible"))}function A(){R&&(R=!1,n.classList.remove("visible"))}function F(N){m.innerHTML="",m.appendChild(N)}function C(N,W,b){p.innerHTML="";let S=document.createElement("span");S.className="prop-sidebar-warning-text",S.textContent=N;let G=document.createElement("button");G.className="prop-sidebar-warning-btn",G.textContent=W,G.addEventListener("click",de=>{de.stopPropagation(),b()}),p.appendChild(S),p.appendChild(G),p.style.display="flex"}function H(){p.style.display="none",p.innerHTML=""}function re(){c.classList.add("active")}function ie(){c.classList.remove("active")}return{show:$,hide:A,isVisible:()=>R,getElement:()=>n,replaceContent:F,showWarning:C,clearWarning:H,showSaving:re,hideSaving:ie}}Se();mt();Kt();var wr=new Map(xt.map(e=>[e.key,e]));var hc=new Set(["layout","spacing","size"]),Pa=new Set(["typography","background"]),bc=5e3,h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map},ot=[],I,Oa,me=null,yc=300,ve=null,Et=null,Kn=new MutationObserver(()=>{h.selectedElement&&!document.contains(h.selectedElement)&&(clearTimeout(Oa),Oa=setTimeout(()=>{vc()},80))});function vc(){let e=h.elementIdentity,t=h.componentInfo;if(!e||!t){Mt();return}let o=xc(e);if(o){St(o,t);return}Cc(e).then(n=>{n?St(n,t):Mt()})}function xc(e){let t=document.querySelectorAll(e.tagName);for(let o of t)if(o instanceof HTMLElement)try{let n=se(o);for(;n;){if(Ce(n)){let r=n._debugSource,i=pe(n);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return o}n=n.return}}catch{}return null}async function Cc(e){let t=document.querySelectorAll(e.tagName);for(let o of t)if(o instanceof HTMLElement)try{let n=se(o);if(!n)continue;let r=await Be(n);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let s="";if(i.fileName){let c=Pe(i.fileName);We(c)&&(s=c)}if(s&&e.filePath.endsWith(s)&&(i.lineNumber??0)===e.lineNumber)return o}}catch{}return null}function wc(e,t){let o=getComputedStyle(e),n=new Map;for(let r of xt){if(t&&!t.has(r.group)){n.set(r.key,r.defaultValue);continue}let i=o.getPropertyValue(r.cssProperty).trim();n.set(r.key,i||r.defaultValue)}return n}function Tc(e){if(!h.selectedElement)return;let t=getComputedStyle(h.selectedElement);for(let o of xt){if(o.group!==e||h.activeOverrides.has(o.key))continue;let r=t.getPropertyValue(o.cssProperty).trim()||o.defaultValue;h.currentValues.set(o.key,r),h.originalValues.get(o.key)===o.defaultValue&&h.originalValues.set(o.key,r);for(let i of ot)i.setValue(o.key,r)}}function rn(){for(let e of ot)e.destroy();ot=[]}function Aa(){if(!h.selectedElement||!h.componentInfo)return;rn();let{container:e,controls:t}=fr(xt,h.currentValues,an,Zn);ot=t,I.replaceContent(e)}function Zn(){me&&clearTimeout(me),me=setTimeout(()=>{me=null,Er()},yc)}function Tr(){me&&(clearTimeout(me),me=null),Et&&(Et(),Et=null),ve&&(clearTimeout(ve.timeoutId),ve=null),h={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map}}function $a(e){I=pa(e,()=>{qn(),rn(),Tr()}),Qr((t,o,n)=>{if(I&&I.hideSaving(),ve)if(clearTimeout(ve.timeoutId),t)ve=null;else{let{batch:r,previousOriginals:i}=ve;ve=null;for(let[a]of r){let s=i.get(a);s!==void 0&&h.originalValues.set(a,s)}if(h.selectedElement){for(let[a]of r){h.selectedElement.style[a]="",h.activeOverrides.delete(a);let s=h.originalValues.get(a);s!==void 0&&h.currentValues.set(a,s)}for(let a of ot)for(let[s]of r){let c=h.originalValues.get(s);c!==void 0&&a.setValue(s,c)}}if(I){let s={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[o||""]||n||"Failed to write changes";I.showWarning(s,"Dismiss",()=>I.clearWarning())}}else if(!t&&I){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[o||""]||n||"Failed to write changes";I.showWarning(i,"Dismiss",()=>I.clearWarning())}})}function St(e,t){h.pendingBatch.size>0&&Er(),rn(),h.selectedElement=e,h.componentInfo=t,h.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let o=new Set(hc);for(let a of Pa)sa(a)||o.add(a);let n=wc(e,o);h.currentValues=n,h.originalValues=new Map(n),h.activeOverrides=new Map,h.pendingBatch=new Map,Et&&Et(),Et=la(a=>{Pa.has(a)&&Tc(a)});let{container:r,controls:i}=fr(xt,h.currentValues,an,Zn);ot=i,Kn.disconnect(),Kn.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),I.show(t.componentName,t.filePath,t.lineNumber,r)}function an(e,t){let o=wr.get(e);if(!o||!h.selectedElement)return;h.selectedElement.style[o.key]=t,h.activeOverrides.set(e,t),h.currentValues.set(e,t);let n=It(),r=o.tailwindScale+"Reverse",i=n[r],a=i?xn(t,i):null;if(!a&&o.enumValues){let s=o.enumValues.find(c=>c.value===t);s&&(a=s.tailwindValue)}if(h.pendingBatch.set(e,{property:e,cssProperty:o.cssProperty,value:t,tailwindPrefix:o.tailwindPrefix,tailwindToken:a,relatedPrefixes:o.relatedPrefixes,originalValue:h.originalValues.get(e)||o.defaultValue}),e==="display")if(Aa(),t==="none"){let s=h.originalValues.get("display")||"block";I.showWarning("Element hidden","Restore",()=>{h.selectedElement&&(h.selectedElement.style.display=s),h.activeOverrides.delete("display"),h.currentValues.set("display",s),h.pendingBatch.delete("display"),Aa(),I.clearWarning()})}else I.clearWarning()}function Er(){if(h.pendingBatch.size===0||!h.componentInfo)return;let e=h.componentInfo.filePath,t=h.componentInfo.lineNumber,o=h.componentInfo.columnNumber-1;if(h.pendingBatch.size===1){let a=[...h.pendingBatch.values()][0],s=wr.get(a.property);Ee({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:o,...a,framework:"tailwind",classPattern:s?.classPattern,standalone:s?.standalone})}else Ee({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:o,updates:[...h.pendingBatch.values()].map(a=>{let s=wr.get(a.property);return{...a,classPattern:s?.classPattern,standalone:s?.standalone}}),framework:"tailwind"});h.selectedElement&&h.elementIdentity&&Gn({type:"propertyChange",elementIdentity:h.elementIdentity,element:h.selectedElement,overrides:[...h.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),I&&I.showSaving();let n=new Map;for(let[a]of h.pendingBatch)n.set(a,h.originalValues.get(a)||"");for(let[a,s]of h.pendingBatch)h.originalValues.set(a,s.value);let r=new Map(h.pendingBatch),i=setTimeout(()=>{ve&&ve.batch===r&&(ve=null,I&&I.hideSaving())},bc);ve={batch:r,previousOriginals:n,timeoutId:i},h.pendingBatch.clear()}function qn(){if(h.selectedElement){for(let[e]of h.activeOverrides)h.selectedElement.style[e]="";for(let[e,t]of h.originalValues)h.currentValues.set(e,t);for(let e of ot)for(let[t,o]of h.originalValues)e.setValue(t,o);h.activeOverrides.clear(),h.pendingBatch.clear()}}function Mt(){me&&(clearTimeout(me),me=null),Kn.disconnect(),qn(),rn(),I&&I.hide(),Tr()}function Ha(){me&&(clearTimeout(me),me=null),Kn.disconnect(),Er(),rn(),I&&I.hide(),Tr()}function _a(){return h.activeOverrides.size>0}Zo()||qo({onCommitFiberRoot(){}});async function Ec(e){let t=se(e);if(!t)return null;try{let o=await Be(t);if(o&&o.length>0){let n=[];for(let r of o){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||ft(i))continue;let a="";if(r.fileName){let s=Pe(r.fileName);We(s)&&(a=s)}n.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(n.length>0)return{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}}catch(o){console.warn("[FrameUp] getOwnerStack failed, falling back to fiber walk:",o)}return Da(e,t)}function Da(e,t){let o=[],n=t;for(;n;){if(Ce(n)){let r=pe(n.type),i=n._debugSource||n._debugOwner?._debugSource,a="",s=0,c=0;i&&(a=i.fileName||"",s=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!ft(r)&&o.push({componentName:r,filePath:a,lineNumber:s,columnNumber:c})}n=n.return}return o.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}function Ia(e){let t=se(e);return t?Da(e,t):null}var Y=null,B=null,_e=!1,kt=!1,O=new Map,v=null,we=null,$e="idle",z=null,Lt=null,xe=null,ro=null,sn=0,ln=0,Xe=[],Jn=!1,Sc=null,Mc=null,Lc=null,kc=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${P.sm};
    border-radius: ${L.sm};
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
`;function Fa(e){Sc=e.onStart,Mc=e.onMove,Lc=e.onEnd}function Va(){let e=j();if(!e)return;let t=document.createElement("style");t.textContent=kc,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),we=document.createElement("div"),we.className="marquee-box",e.appendChild(we),_e=!0,document.addEventListener("mousedown",Qn,!0),document.addEventListener("mousemove",eo,!0),document.addEventListener("mouseup",to,!0),document.addEventListener("keydown",oo,!0),document.addEventListener("click",no,!0),document.addEventListener("scroll",He,!0),window.addEventListener("resize",He),kt=!0}function Qn(e){if(!_e||e.metaKey||e.ctrlKey)return;let t=document.elementFromPoint(e.clientX,e.clientY);if(t?.closest("#frameup-root"))return;if(Y||O.size>0){let n=ur(e.clientX,e.clientY);if(n){e.preventDefault(),e.stopPropagation();let r=Zi();if(xe=n,ro=r?{...r}:null,O.size>0){Xe=[];for(let[i]of O){let a=getComputedStyle(i);Xe.push({element:i,width:parseFloat(a.width)||i.offsetWidth,height:parseFloat(a.height)||i.offsetHeight})}sn=0,ln=0}else if(B){let i=getComputedStyle(B);sn=parseFloat(i.width)||B.offsetWidth,ln=parseFloat(i.height)||B.offsetHeight,Xe=[]}z={x:e.clientX,y:e.clientY},$e="resize-drag";return}}if(e.preventDefault(),e.stopPropagation(),!t||!qt(t)){(Y||O.size>0)&&(Ha(),Y=null,B=null,io(),et(null),v&&(v.classList.remove("visible"),v.style.display="none"),Ne(null));return}z={x:e.clientX,y:e.clientY},Lt=t,Jn=e.shiftKey,$e="pending"}function eo(e){if(_e){if($e==="resize-drag"&&xe&&z&&ro){e.preventDefault(),e.stopPropagation();let t=e.clientX-z.x,o=e.clientY-z.y;if(Xe.length>0){for(let n of Xe){let r=n.width,i=n.height;xe==="tr"||xe==="br"?r=Math.max(10,n.width+t):r=Math.max(10,n.width-t),xe==="bl"||xe==="br"?i=Math.max(10,n.height+o):i=Math.max(10,n.height-o),n.element.style.width=`${Math.round(r)}px`,n.element.style.height=`${Math.round(i)}px`}cn()}else{let n=sn,r=ln;xe==="tr"||xe==="br"?n=Math.max(10,sn+t):n=Math.max(10,sn-t),xe==="bl"||xe==="br"?r=Math.max(10,ln+o):r=Math.max(10,ln-o),n=Math.round(n),r=Math.round(r),an("width",`${n}px`),an("height",`${r}px`),He()}return}if($e==="pending"&&z){let t=Math.abs(e.clientX-z.x),o=Math.abs(e.clientY-z.y);(t>10||o>10)&&($e="marquee")}if($e==="marquee"&&z&&we){let t=Math.min(e.clientX,z.x),o=Math.min(e.clientY,z.y),n=Math.abs(e.clientX-z.x),r=Math.abs(e.clientY-z.y);we.style.display="block",we.style.left=`${t}px`,we.style.top=`${o}px`,we.style.width=`${n}px`,we.style.height=`${r}px`;return}if($e==="idle"){if(Y&&B||O.size>0){let i=ur(e.clientX,e.clientY);if(i){document.body.style.cursor=i==="tl"||i==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let o=document.elementFromPoint(e.clientX,e.clientY);if(!o||!qt(o)){$n(null);return}let n=o.getBoundingClientRect(),r=parseFloat(getComputedStyle(o).borderRadius)||4;$n(n,r+2)}}}function to(e){if(!_e)return;let t=$e;if($e="idle",t==="resize-drag"){document.body.style.cursor="",xe=null,ro=null,z=null,Xe.length>0?Xe=[]:Zn();return}if(t==="marquee"&&z){we&&(we.style.display="none"),Nc(Math.min(e.clientX,z.x),Math.min(e.clientY,z.y),Math.max(e.clientX,z.x),Math.max(e.clientY,z.y)),z=null,Lt=null,Jn=!1;return}Lt&&(Jn?Rc(Lt):(io(),za(Lt))),z=null,Lt=null,Jn=!1}async function za(e,t){try{let o=e.getBoundingClientRect();B=e,Sr(o,{}),Pc();let n=await Ec(e);if(console.log("[FrameUp] selectElement:",e.tagName,"\u2192",n?.componentName,n?.filePath,"stack:",n?.stack?.map(r=>r.componentName)),!n)return;if(Y={tagName:n.tagName,componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber,columnNumber:n.columnNumber,stack:n.stack,boundingRect:{top:o.top,left:o.left,width:o.width,height:o.height}},v){let r=n.filePath?`${n.filePath}:${n.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${n.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||St(e,Y),Ne({tagName:n.tagName,componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber})}catch(o){console.error("[FrameUp] selectElement error:",o)}}function Nc(e,t,o,n){let r=Bi({x:e,y:t,width:o-e,height:n-t});if(r.length!==0){Mt(),Y=null,B=null,et(null),v&&(v.classList.remove("visible"),v.style.display="none"),O.clear();for(let i of r.slice(0,50)){let a=Ia(i);if(!a)continue;let s=i.getBoundingClientRect(),c={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:s.top,left:s.left,width:s.width,height:s.height}};O.set(i,{element:i,info:c})}if(O.size!==0){if(O.size===1){let[i,a]=[...O.entries()][0];O.clear(),B=i,Y=a.info;let s=i.getBoundingClientRect();if(Sr(s,Y),v){let c=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${c?`<span class="comp-path">${c}</span>`:""}`}St(i,Y),Ne({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}cn(),Ne(null),v&&(v.innerHTML=`<span class="comp-name">${O.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function Rc(e){if(O.has(e)){if(O.delete(e),O.size===1){let[r,i]=[...O.entries()][0];O.clear(),Qt(),B=r,Y=i.info;let a=r.getBoundingClientRect();if(Sr(a,Y),St(r,Y),v){let s=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${s?`<span class="comp-path">${s}</span>`:""}`}Ne({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else O.size===0?(Qt(),De()):(cn(),v&&(v.innerHTML=`<span class="comp-name">${O.size} elements selected</span>`));return}let t=Ia(e);if(!t)return;Y&&B&&O.size===0&&(O.set(B,{element:B,info:Y}),Mt(),Y=null,B=null,et(null));let o=e.getBoundingClientRect(),n={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:o.top,left:o.left,width:o.width,height:o.height}};O.set(e,{element:e,info:n}),cn(),Ne(null),v&&(v.innerHTML=`<span class="comp-name">${O.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function io(){O.clear(),Qt()}function cn(){if(O.size===0){Qt();return}let e=[];for(let[t]of O){let o=t.getBoundingClientRect(),n=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:o,borderRadius:n+2})}Ki(e)}function no(e){_e&&(e.metaKey||e.ctrlKey||e.preventDefault())}function oo(e){if(_e&&e.key==="Escape"){if(O.size>0){io(),v&&(v.classList.remove("visible"),v.style.display="none"),Ne(null),e.preventDefault();return}if(Y){if(_a()){qn(),e.preventDefault();return}De(),e.preventDefault()}}}function Sr(e,t){if(B){let o=parseFloat(getComputedStyle(B).borderRadius)||4;et(e,o+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function He(){if(O.size>0){cn();return}if(!B||!Y)return;let e=B.getBoundingClientRect(),t=parseFloat(getComputedStyle(B).borderRadius)||4;if(et(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function Pc(){$n(null)}function De(){Mt(),Y=null,B=null,xe=null,ro=null,Xe=[],io(),document.body.style.cursor="",et(null),v&&(v.classList.remove("visible"),v.style.display="none"),Ne(null)}function Ba(){return Y}function Wa(){_e=!1,document.removeEventListener("mousedown",Qn,!0),document.removeEventListener("mousemove",eo,!0),document.removeEventListener("mouseup",to,!0),document.removeEventListener("keydown",oo,!0),document.removeEventListener("click",no,!0),document.removeEventListener("scroll",He,!0),window.removeEventListener("resize",He),kt=!1,v?.remove(),v=null}function Mr(e){e&&!kt?(document.addEventListener("mousedown",Qn,!0),document.addEventListener("mousemove",eo,!0),document.addEventListener("mouseup",to,!0),document.addEventListener("keydown",oo,!0),document.addEventListener("click",no,!0),document.addEventListener("scroll",He,!0),window.addEventListener("resize",He),kt=!0,_e=!0):!e&&kt&&(document.removeEventListener("mousedown",Qn,!0),document.removeEventListener("mousemove",eo,!0),document.removeEventListener("mouseup",to,!0),document.removeEventListener("keydown",oo,!0),document.removeEventListener("click",no,!0),document.removeEventListener("scroll",He,!0),window.removeEventListener("resize",He),kt=!1,_e=!1)}function Ya(){return B??null}async function Lr(e){await za(e,{skipSidebar:!0})}mt();var ce=null,le=null,Ke=null,Ga=null,dn=!1,Nt=null,ao=[],so=new Map,lo=!1,Oc=`
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
`,Rt=null;function Ua(){let e=j();if(!e)return;let t=document.createElement("style");t.textContent=Oc,e.appendChild(t),Fa({onStart:Ac,onMove:$c,onEnd:Hc}),Je(o=>{o.type==="reorderComplete"&&(kr(),De())})}function Ac(e,t,o){Ke=o,Ga=t,Nt={x:e.clientX,y:e.clientY},dn=!1,lo=!1,ao=[],so=new Map,Rt=null;let n=j();if(!n)return;ce=document.createElement("div"),ce.className="drag-preview";let r=t.getBoundingClientRect();ce.style.width=`${r.width}px`,ce.style.height=`${r.height}px`,ce.innerHTML=t.outerHTML,n.appendChild(ce),le=document.createElement("div"),le.className="drop-indicator",n.appendChild(le);let i=o.stack[1];if(!i)return;Ee({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=Je(s=>{if(s.type!=="siblingsList")return;a(),ao=s.siblings;let c=document.querySelectorAll("*");for(let u of c){if(u.closest("#frameup-root"))continue;let d=se(u);if(!d)continue;let p=d;for(;p;){if(Ce(p)){let m=p._debugSource||p._debugOwner?._debugSource;if(m){for(let f of s.siblings)m.lineNumber===f.lineNumber&&m.fileName===i.filePath&&so.set(f.lineNumber,{el:u,rect:u.getBoundingClientRect()});break}}p=p.return}}lo=!0})}function $c(e){if(!Nt)return;let t=Math.abs(e.clientX-Nt.x),o=Math.abs(e.clientY-Nt.y);if(t<5&&o<5||(dn=!0,ce&&(ce.style.display="block",ce.style.left=`${e.clientX+10}px`,ce.style.top=`${e.clientY+10}px`),!lo||!Ke))return;let n=null,r=1/0,i=0,a=0,s=0;for(let c of ao){if(c.lineNumber===Ke.lineNumber)continue;let u=so.get(c.lineNumber);if(!u)continue;let d=u.rect,p=d.top+d.height/2,m=Math.abs(e.clientY-p);m<r&&(r=m,n=c,e.clientY<p?i=d.top-2:i=d.bottom+2,a=d.left,s=d.width)}Rt=n,n&&le?(le.style.display="block",le.style.top=`${i}px`,le.style.left=`${a}px`,le.style.width=`${s}px`):le&&(le.style.display="none")}function Hc(e){if(!dn||!Rt||!Ke){kr();return}Ee({type:"reorder",filePath:Ke.filePath,fromLine:Ke.lineNumber,toLine:Rt.lineNumber,fromComponent:Ke.componentName,toComponent:Rt.componentName}),ce&&(ce.style.display="none"),le&&(le.style.display="none"),dn=!1,Nt=null}function kr(){ce?.remove(),le?.remove(),ce=null,le=null,Ke=null,Ga=null,dn=!1,Nt=null,lo=!1,ao=[],so=new Map,Rt=null}function ja(){kr()}U();Se();var rt="http://www.w3.org/2000/svg",Pt=null,ee=null,Nr=null;function Xa(){let e=j();e&&(Pt=document.createElementNS(rt,"svg"),Pt.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),ee=document.createElementNS(rt,"g"),ee.setAttribute("class","annotation-root"),Pt.appendChild(ee),e.appendChild(Pt),window.addEventListener("scroll",co,{passive:!0}),Nr=jn(co),co())}function co(){if(!ee)return;let{scale:e,offsetX:t,offsetY:o}=Ae();ee.setAttribute("transform",`translate(${t}, ${o}) scale(${e})`)}function Ka(e,t,o,n){if(!ee||t.length<2)return null;let r=document.createElementNS(rt,"g");r.setAttribute("data-annotation-id",e);let i=document.createElementNS(rt,"path");return i.setAttribute("d",Qa(t)),i.setAttribute("stroke",o),i.setAttribute("stroke-width",String(n)),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),i.setAttribute("fill","none"),r.appendChild(i),ee.appendChild(r),r}function Za(e,t,o,n,r,i){if(!ee)return null;let a=document.createElementNS(rt,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(o)),a.setAttribute("width","300"),a.setAttribute("height","100");let s=document.createElement("div");return s.style.cssText=`
    background: ${l.bgPrimary};
    color: ${l.textPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${P.sm};
    padding: 4px 8px;
    border-radius: ${L.sm};
    font-size: ${r}px;
    font-family: ${w};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,s.textContent=n,a.appendChild(s),ee.appendChild(a),a}function qa(e){if(!ee)return;let t=ee.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function Rr(){ee&&(ee.innerHTML="")}function Ja(){window.removeEventListener("scroll",co),Nr?.(),Nr=null,Pt?.remove(),Pt=null,ee=null}function Qa(e){if(e.length===0)return"";let t=`M${e[0].x},${e[0].y}`;for(let o=1;o<e.length;o++)t+=` L${e[o].x},${e[o].y}`;return t}function es(e,t){if(!ee)return null;let o=[],n=document.createElementNS(rt,"g"),r=document.createElementNS(rt,"path");return r.setAttribute("stroke",e),r.setAttribute("stroke-width",String(t)),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r.setAttribute("fill","none"),n.appendChild(r),ee.appendChild(n),{path:r,group:n,addPoint(i,a){o.push({x:i,y:a}),r.setAttribute("d",Qa(o))},getPoints(){return o}}}Fn();Se();U();un();var Ze={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9093 12.3603L17.0007 20.8537L14.1816 21.8798L11.0902 13.3864L6.91797 16.5422L8.4087 1.63318L19.134 12.0959L13.9093 12.3603Z"></path></svg>',grab:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L16.2426 6.24264L14.8284 7.65685L12 4.82843L9.17157 7.65685L7.75736 6.24264L12 2ZM2 12L6.24264 7.75736L7.65685 9.17157L4.82843 12L7.65685 14.8284L6.24264 16.2426L2 12ZM22 12L17.7574 16.2426L16.3431 14.8284L19.1716 12L16.3431 9.17157L17.7574 7.75736L22 12ZM12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14ZM12 22L7.75736 17.7574L9.17157 16.3431L12 19.1716L14.8284 16.3431L16.2426 17.7574L12 22Z"></path></svg>',move:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 11V8L22 12L18 16V13H13V18H16L12 22L8 18H11V13H6V16L2 12L6 8V11H11V6H8L12 2L16 6H13V11H18Z"></path></svg>',draw:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>',color:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.5222 2 22 5.97778 22 10.8889C22 13.9556 19.5111 16.4444 16.4444 16.4444H14.4778C13.5556 16.4444 12.8111 17.1889 12.8111 18.1111C12.8111 18.5333 12.9778 18.9222 13.2333 19.2111C13.5 19.5111 13.6667 19.9 13.6667 20.3333C13.6667 21.2556 12.9 22 12 22C6.47778 22 2 17.5222 2 12C2 6.47778 6.47778 2 12 2ZM10.8111 18.1111C10.8111 16.0843 12.451 14.4444 14.4778 14.4444H16.4444C18.4065 14.4444 20 12.851 20 10.8889C20 7.1392 16.4677 4 12 4C7.58235 4 4 7.58235 4 12C4 16.19 7.2226 19.6285 11.324 19.9718C10.9948 19.4168 10.8111 18.7761 10.8111 18.1111ZM7.5 12C6.67157 12 6 11.3284 6 10.5C6 9.67157 6.67157 9 7.5 9C8.32843 9 9 9.67157 9 10.5C9 11.3284 8.32843 12 7.5 12ZM16.5 12C15.6716 12 15 11.3284 15 10.5C15 9.67157 15.6716 9 16.5 9C17.3284 9 18 9.67157 18 10.5C18 11.3284 17.3284 12 16.5 12ZM12 9C11.1716 9 10.5 8.32843 10.5 7.5C10.5 6.67157 11.1716 6 12 6C12.8284 6 13.5 6.67157 13.5 7.5C13.5 8.32843 12.8284 9 12 9Z"></path></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6V21H11V6H5V4H19V6H13Z"></path></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.53614 18.8862 7.33243 17.1346 5.86492L15 8V2L21 2L18.5535 4.44656C20.6649 6.28002 22 8.9841 22 12Z"></path></svg>'},fs=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",po=navigator.platform.includes("Mac")?"Cmd":"Ctrl",Br=[{type:"pointer",icon:Ze.pointer,label:"Pointer",shortcut:"V"},{type:"grab",icon:Ze.grab,label:"Grab",shortcut:"G"},{type:"move",icon:Ze.move,label:"Move",shortcut:"J"},{type:"draw",icon:Ze.draw,label:"Draw",shortcut:"D"},{type:"text",icon:Ze.text,label:"Text",shortcut:"T"}],Uc=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    border-radius: ${L.lg};
    box-shadow: ${P.md};
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
    box-shadow: ${P.sm};
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
    box-shadow: ${P.sm};
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
    box-shadow: ${P.sm};
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
    border-radius: ${L.lg};
    box-shadow: ${P.lg};
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
`,fe=null,te=null,fo=new Map,Ie=null,Vr=null,zr=null;function gs(e){Vr=e}function hs(e){zr=e}function bs(e){Ie&&(Ie.disabled=!e)}function ys(){let e=j();if(!e)return;let t=document.createElement("style");t.textContent=Uc,e.appendChild(t),fe=document.createElement("div"),fe.className="tools-panel";let o=[["pointer","grab"],["move"],["draw","text"]];for(let s=0;s<o.length;s++){if(s>0){let c=document.createElement("div");c.className="tool-divider",fe.appendChild(c)}for(let c of o[s]){let u=Br.find(m=>m.type===c),d=document.createElement("button");d.className=`tool-btn${u.type==="pointer"?" active":""}`,d.innerHTML=`${u.icon}<span class="tooltip">${u.label}<span class="shortcut-badge">${fs}${u.shortcut}</span></span>`,d.addEventListener("click",()=>br(u.type));let p=null;d.addEventListener("mouseenter",()=>{p=setTimeout(()=>d.classList.add("tooltip-visible"),400)}),d.addEventListener("mouseleave",()=>{p&&clearTimeout(p),d.classList.remove("tooltip-visible")}),fe.appendChild(d),fo.set(u.type,d)}}te=document.createElement("div"),te.className="sub-options hidden",fe.appendChild(te);let n=document.createElement("div");n.className="tool-divider",fe.appendChild(n),Ie=document.createElement("button"),Ie.className="action-btn",Ie.innerHTML=Ze.undo,Ie.title="Undo (Ctrl+Z)",Ie.disabled=!0,Ie.addEventListener("click",()=>{zr&&zr()}),fe.appendChild(Ie);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=Ze.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{Vr&&Vr()}),fe.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=Ze.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{cs(),i.style.color=ls()?l.accent:""}),fe.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8H14V6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5C21 8.433 19.433 10 17.5 10H16V14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5V16H10V17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14H8V10H6.5C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5V8ZM8 8V6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM10 10V14H14V10H10Z"></path></svg>',a.title=`Keyboard Shortcuts (${fs}/)`,a.addEventListener("click",()=>xs()),fe.appendChild(a),e.appendChild(fe),document.addEventListener("keydown",vs,!0)}function vs(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||!e.ctrlKey&&!e.metaKey)return;let o=e.key.toUpperCase();if(e.key==="/"||e.key==="?"){xs(),e.preventDefault();return}let n=Br.find(r=>r.shortcut===o);n&&(br(n.type),e.preventDefault())}var Me=null,fn=null;function xs(){Me?mo():jc()}function jc(){let e=j();if(!e||Me)return;Me=document.createElement("div"),Me.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let o=document.createElement("div");o.className="shortcuts-title",o.textContent="Keyboard Shortcuts",t.appendChild(o);let n=[{label:"Tools",items:Br.map(r=>({action:r.label,keys:[po,r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[po,"Z"]},{action:"Toggle Originals",keys:[po,"."]},{action:"Keyboard Shortcuts",keys:[po,"/"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Grab Tool","Drag"]},{action:"Zoom",keys:["Scroll Wheel"]}]}];for(let r of n){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let s of r.items){let c=document.createElement("div");c.className="shortcut-row";let u=document.createElement("span");u.className="shortcut-action",u.textContent=s.action,c.appendChild(u);let d=document.createElement("span");d.className="shortcut-keys";for(let p=0;p<s.keys.length;p++){if(p>0){let f=document.createElement("span");f.className="shortcut-plus",f.textContent="+",d.appendChild(f)}let m=document.createElement("span");m.className="shortcut-key",m.textContent=s.keys[p],d.appendChild(m)}c.appendChild(d),i.appendChild(c)}t.appendChild(i)}Me.appendChild(t),Me.addEventListener("click",r=>{r.target===Me&&mo()}),e.appendChild(Me),fn=r=>{mo()},document.addEventListener("keydown",fn,!0)}function mo(){fn&&(document.removeEventListener("keydown",fn,!0),fn=null),Me?.remove(),Me=null}function Cs(e){for(let[t,o]of fo)o.classList.toggle("active",t===e);Xc(e)}function Xc(e){if(te){if(te.innerHTML="",te.classList.add("hidden"),te.classList.remove("visible"),e==="draw"){te.classList.remove("hidden"),requestAnimationFrame(()=>te?.classList.add("visible"));let t=ye(),o=document.createElement("button");o.className="color-swatch",o.style.background=t.brushColor,o.addEventListener("click",()=>{let r=o.getBoundingClientRect();en({initialColor:t.brushColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){on("brushColor",i),o.style.background=i},onClose(){}})}),te.appendChild(o);let n=document.createElement("div");n.className="segmented-control";for(let r of[2,4,8]){let i=document.createElement("button");i.className=`segment${r===t.brushSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{on("brushSize",r),n.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active"),Promise.resolve().then(()=>($t(),ms)).then(a=>a.refreshDrawCursor())}),n.appendChild(i)}te.appendChild(n)}else if(e==="text"){te.classList.remove("hidden"),requestAnimationFrame(()=>te?.classList.add("visible"));let t=ye(),o=document.createElement("button");o.className="color-swatch",o.style.background=t.textColor,o.addEventListener("click",()=>{let r=o.getBoundingClientRect();en({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){on("textColor",i),o.style.background=i},onClose(){}})}),te.appendChild(o);let n=document.createElement("div");n.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{on("fontSize",r),n.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),n.appendChild(i)}te.appendChild(n)}}}function ws(e){let t=fo.get(e);t&&(t.style.backgroundColor=l.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function Ts(){document.removeEventListener("keydown",vs,!0),mo(),fe?.remove(),fe=null,te=null,fo.clear()}$t();Hr();gt();U();var Es="frameup-onboarding-seen",Le=null,go=null;function Ss(){if(localStorage.getItem(Es))return;let e=j();if(!e)return;Le=document.createElement("div"),Le.style.cssText=`
    position: fixed;
    left: 72px;
    top: 50%;
    transform: translateY(-50%);
    background: ${l.bgPrimary};
    border: 1px solid ${l.border};
    box-shadow: ${P.md};
    border-radius: ${L.md};
    padding: 12px 16px;
    font-family: ${w};
    font-size: 12px;
    color: ${l.textPrimary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${M.medium};
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
  `;Le.innerHTML=`Press ${t.map(n=>`<span style="${o}">${n}</span>`).join(" ")} to switch tools`,e.appendChild(Le),requestAnimationFrame(()=>{Le&&(Le.style.opacity="1")}),go=setTimeout(Wr,5e3)}function Wr(){Le&&(localStorage.setItem(Es,"1"),Le.style.opacity="0",setTimeout(()=>{Le?.remove(),Le=null},150),go&&(clearTimeout(go),go=null))}Se();function Ms(){Mr(!0)}function Ls(){Mr(!1)}$t();un();var Yr=!1,Gr=0,Ur=0,ks={onMouseDown(e){Yr=!0,Gr=e.clientX,Ur=e.clientY,uo("grabbing")},onMouseMove(e){if(!Yr)return;let t=e.clientX-Gr,o=e.clientY-Ur;as(t,o),Gr=e.clientX,Ur=e.clientY},onMouseUp(e){Yr=!1,uo("grab")}};Fn();Se();$t();function Ns(e,t,o,n,r,i){let a=e.left+e.width/2,s=e.top+e.height/2,c=t.left+t.width/2,u=t.top+t.height/2,d=c-a,p=u-s,m=Math.abs(d)<=r,f=Math.abs(p)<=r;return{dx:m?o+d/i:o,dy:f?n+p/i:n,snappedX:m,snappedY:f,guides:{verticalLine:m?{x:c,top:t.top,bottom:t.bottom}:null,horizontalLine:f?{y:u,left:t.left,right:t.right}:null}}}var q=null,gn={x:0,y:0},Ht={dx:0,dy:0},_t=!1,at=!1,hn=null,Rs={onMouseDown(e){hn=null,_t=!1,at=!1;let t=je(e.clientX,e.clientY),o=mn(e.clientX,e.clientY);if(!o){De();return}let n=vr(o);if(n){q=n,gn={x:t.x,y:t.y},Ht={...n.delta},_t=!1,at=!0,wt(n.element,n.delta.dx,n.delta.dy,n.existingTransform);return}let r=Ba(),i=Ya();if(!r||!i||o!==i){hn=o;return}let a=vr(i);if(a){q=a,gn={x:t.x,y:t.y},Ht={...a.delta},_t=!1,at=!0,wt(a.element,a.delta.dx,a.delta.dy,a.existingTransform);return}let s=i.getBoundingClientRect(),c=i.style.cssText,u=getComputedStyle(i).transform,d={id:crypto.randomUUID(),componentRef:{componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber},element:i,placeholder:null,originalRect:s,delta:{dx:0,dy:0},originalCssText:c,existingTransform:u==="none"?"":u,identity:{componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber,columnNumber:r.columnNumber,tagName:i.tagName.toLowerCase()}};Ta(d),q=d,gn={x:t.x,y:t.y},Ht={dx:0,dy:0},_t=!0,at=!0,wt(i,0,0,d.existingTransform)},onMouseMove(e){if(!at||!q)return;let t=je(e.clientX,e.clientY),o=Ht.dx+(t.x-gn.x),n=Ht.dy+(t.y-gn.y);wt(q.element,o,n,q.existingTransform);let r=q.element.parentElement;if(!r||r===document.body||r===document.documentElement){q.delta={dx:o,dy:n},dr();return}let i=q.element.getBoundingClientRect(),a=r.getBoundingClientRect(),{scale:s}=Ae(),c=Ns(i,a,o,n,5,s);(c.snappedX||c.snappedY)&&wt(q.element,c.dx,c.dy,q.existingTransform),q.delta={dx:c.dx,dy:c.dy},Xi(c.guides)},onMouseUp(){at&&q&&(_t||Ea(q.id,q.delta,Ht),fa(q),dr(),Lr(q.element)),q=null,at=!1,_t=!1,hn&&(Lr(hn),hn=null)}};Se();function ho(e,t=2){if(e.length<=2)return e;let o=0,n=0,r=e[0],i=e[e.length-1];for(let a=1;a<e.length-1;a++){let s=Kc(e[a],r,i);s>o&&(o=s,n=a)}if(o>t){let a=ho(e.slice(0,n+1),t),s=ho(e.slice(n),t);return[...a.slice(0,-1),...s]}return[r,i]}function Kc(e,t,o){let n=o.x-t.x,r=o.y-t.y,i=n*n+r*r;if(i===0){let s=e.x-t.x,c=e.y-t.y;return Math.sqrt(s*s+c*c)}return Math.abs(r*e.x-n*e.y+o.x*t.y-o.y*t.x)/Math.sqrt(i)}mt();Kt();gt();$t();async function bo(e,t){let o=mn(e,t);if(!o)return null;let n=se(o);if(!n)return null;try{let i=await Be(n);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let s=a.functionName;if(s[0]!==s[0].toUpperCase()||ft(s))continue;let c="";if(a.fileName){let u=Pe(a.fileName);We(u)&&(c=u)}return{componentName:s,filePath:c,lineNumber:a.lineNumber??0}}}catch{}let r=n;for(;r;){if(Ce(r)){let i=pe(r.type);if(i&&i[0]===i[0].toUpperCase()&&!ft(i)){let a=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:a?.fileName||"",lineNumber:a?.lineNumber||0}}}r=r.return}return null}var ke=null,yo=null,Ps={onMouseDown(e){let t=ye();if(ke=es(t.brushColor,t.brushSize),ke){let o=je(e.clientX,e.clientY);ke.addPoint(o.x,o.y)}yo=bo(e.clientX,e.clientY)},onMouseMove(e){if(!ke)return;let t=je(e.clientX,e.clientY);ke.addPoint(t.x,t.y)},onMouseUp(e){if(!ke)return;let t=ke.getPoints(),o=ye();if(ke.group.remove(),t.length<2){ke=null,yo=null;return}let n=ho(t,2),r=crypto.randomUUID();Ka(r,n,o.brushColor,o.brushSize);let i={type:"draw",id:r,points:n,color:o.brushColor,strokeWidth:o.brushSize,targetComponent:null};Yn(i);let a=yo;yo=null,a?.then(s=>{i.targetComponent=s}),ke=null}};Se();U();var ne=null,st=null,vo=null,As={onMouseDown(e){ne&&Os();let t=je(e.clientX,e.clientY);st={pageX:t.x,pageY:t.y},bo(e.clientX,e.clientY).then(o=>{vo=o}),ne=document.createElement("input"),ne.type="text",ne.placeholder="Type annotation...",ne.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${l.bgPrimary};
      color: ${l.textPrimary};
      border: 1.5px solid ${l.accent};
      border-radius: ${L.sm};
      padding: 4px 8px;
      font-size: ${ye().fontSize}px;
      font-family: ${w};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${l.accentSoft};
    `,ne.setAttribute("data-frameup-overlay","true"),ne.addEventListener("keydown",o=>{o.key==="Enter"&&(Os(),o.preventDefault()),o.key==="Escape"&&($s(),o.preventDefault()),o.stopPropagation()}),document.body.appendChild(ne),ne.focus()},onMouseMove(){},onMouseUp(){}};function Os(){if(!ne||!st)return;let e=ne.value.trim();if(ne.remove(),ne=null,!e)return;let t=ye(),o=crypto.randomUUID();Za(o,st.pageX,st.pageY,e,t.fontSize,t.textColor),Yn({type:"text",id:o,position:st,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:vo}),st=null,vo=null}function $s(){ne&&(ne.remove(),ne=null),st=null,vo=null}function Hs(){$s()}un();U();var lt=null,bn=null;function _s(e){let t=e instanceof Error&&e.stack?e.stack:String(e);return/frameup|overlay/i.test(t)}function Zc(e){let t=j();if(!t)return;lt&&lt.parentNode&&lt.parentNode.removeChild(lt),bn&&clearTimeout(bn);let o=document.createElement("div");o.setAttribute("style",["position: fixed","bottom: 72px","right: 16px","z-index: 2147483647","background: rgba(30, 30, 30, 0.92)","color: #fff",`font-family: ${w}`,"font-size: 12px","padding: 10px 14px",`border-radius: ${L.sm}`,`box-shadow: ${P.md}`,"max-width: 320px","display: flex","align-items: center","gap: 10px","opacity: 0",`transition: opacity ${M.medium}`].join("; "));let n=document.createElement("span");n.textContent=e,n.setAttribute("style","flex: 1;");let r=document.createElement("button");r.textContent="Dismiss",r.setAttribute("style",["background: rgba(255,255,255,0.15)","border: none","color: #fff",`font-family: ${w}`,"font-size: 11px","padding: 3px 8px",`border-radius: ${L.xs}`,"cursor: pointer","white-space: nowrap"].join("; ")),r.addEventListener("click",()=>{o.style.opacity="0",setTimeout(()=>o.remove(),200),bn&&clearTimeout(bn),lt=null}),o.appendChild(n),o.appendChild(r),t.appendChild(o),lt=o,requestAnimationFrame(()=>{o.style.opacity="1"}),bn=setTimeout(()=>{o.style.opacity="0",setTimeout(()=>o.remove(),200),lt=null},8e3)}function jr(e){console.error("[FrameUp]",e),Zc("FrameUp encountered an error. Your app is unaffected.")}function qc(){window.addEventListener("error",e=>{_s(e.error??e.message)&&(jr(e.error??e.message),e.preventDefault())}),window.addEventListener("unhandledrejection",e=>{_s(e.reason)&&(jr(e.reason),e.preventDefault())})}var Xr=null;function Ds(e,t,o){t.originalCssText=o.style.cssText,t.element=o,tt(t)}function Jc(){let e=window.__FRAMEUP_WS_PORT__;if(!e){console.warn("[FrameUp] No WebSocket port found.");return}if(document.getElementById("frameup-root"))return;Cn(e),ui(Qc);let t=j();t&&$a(t),Va(),ji(),Ua(),Xa(),Ma(r=>qa(r)),Xr=new MutationObserver(()=>{for(let[r,i]of wa())document.contains(i.element)||setTimeout(()=>{let a=ga(i.identity);if(a){Ds(r,i,a);return}ha(i.identity).then(s=>{s?Ds(r,i,s):(yr(r),K(`Component ${i.componentRef.componentName} removed \u2014 move cleared`))})},80)}),Xr.observe(document.body,{childList:!0,subtree:!0}),ys(),Dr(),Ss(),At("grab",ks),At("move",Rs),At("draw",Ps),At("text",As),va((r,i)=>{Wr(),ws(r),i==="pointer"&&Ls(),i==="text"&&Hs(),Ot(),or(),r==="pointer"&&Ms(),Ir(r),Cs(r)}),xa(()=>{hi(Cr()),bs(Na())}),hs(()=>{let r=xr();r&&K(`Undo: ${r}`)}),mi(()=>{if(!Cr()){K("No moved components to toggle");return}let r=!La();ka(r),Sn(r)});let o=!1,n=0;fi(()=>{if(o)return;let r=Date.now();if(r<n){let a=Math.ceil((n-r)/1e3);K(`Please wait ${a}s before retrying`);return}let i=Ra();if(!i.moves.length&&!i.annotations.length&&!i.colorChanges.length){K("Nothing to confirm \u2014 make some visual changes first");return}o=!0,K("Generating..."),Ee({type:"generate",annotations:i})}),Je(r=>{if(r.type==="generateProgress"&&K(r.message),r.type==="generateComplete")if(o=!1,r.success){let i=r.changes.map(a=>a.description||a.filePath).join(", ");K(`Applied: ${i}`),De(),Rr(),Xn(),Sn(!0)}else K(`Error: ${r.error||"Generation failed"}`),n=Date.now()+5e3}),gi(()=>{let r=xr();return r?(K(`Undo: ${r}`),!0):!1}),gs(()=>{De(),Rr(),Xn(),ss(),Sn(!0),K("Canvas cleared")}),console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools")}function Qc(){Ot(),or(),Wa(),qi(),ja(),Ja(),Xr?.disconnect(),Ts(),Fr(),Xn(),$r(),ei(),pi()}function Is(){try{Jc(),qc()}catch(e){jr(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Is):Is();})();
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
