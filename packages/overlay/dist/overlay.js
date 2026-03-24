"use strict";var FrameUp=(()=>{var gs=Object.defineProperty;var Qe=(e,t)=>()=>(e&&(t=e(e=0)),t);var hs=(e,t)=>{for(var n in t)gs(e,n,{get:t[n],enumerable:!0})};var s,$,L,C,x,Di,U=Qe(()=>{"use strict";s={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},$={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},L={xs:"4px",sm:"6px",md:"10px",lg:"14px"},C={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},x="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",Di=`
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
`});var tr,nn,Gi,Ss,Qt,Yi,Zn,Ui,ji,en,qn,et,nr,tn,or,Nt,rr,Jn,on=Qe(()=>{"use strict";tr="0.5.32",nn=`bippy-${tr}`,Gi=Object.defineProperty,Ss=Object.prototype.hasOwnProperty,Qt=()=>{},Yi=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},Zn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),Ui=!1,en=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>Ui?!0:(e&&typeof e.inject=="function"&&(ji=e.inject.toString()),!!ji?.includes("(injected)")),qn=new Set,et=new Set,nr=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:nn,checkDCE:Yi,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),et.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,qn.forEach(a=>a())),i},on:Qt,onCommitFiberRoot:Qt,onCommitFiberUnmount:Qt,onPostCommitFiberRoot:Qt,renderers:t,supportsFiber:!0,supportsFlight:!0};try{Gi(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let l=o.renderers;o=a,l.size>0&&(l.forEach((d,c)=>{et.add(d),a.renderers.set(c,d)}),tn(e))}}});let r=window.hasOwnProperty,i=!1;Gi(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{tn(e)}return o},tn=e=>{e&&qn.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=Yi,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=nn,t._instrumentationIsActive=!1;let n=Zn(t);if(n||(t.on=Qt),t.renderers.size){t._instrumentationIsActive=!0,qn.forEach(i=>i());return}let o=t.inject,r=en(t);r&&!n&&(Ui=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return et.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,qn.forEach(l=>l()),a}}(t.renderers.size||t._instrumentationIsActive||en())&&e?.()}catch{}},or=()=>Ss.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),Nt=e=>or()?(tn(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):nr(e),rr=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),Jn=()=>{try{rr()&&Nt()}catch{}}});var Xi=Qe(()=>{"use strict";on();Jn()});function yr(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await vr(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=br(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var ir,ar,lr,sr,cr,dr,ur,pr,mr,fr,gr,hr,ve,br,vr,xr,ae,Cr,Er,oe,Ms,Tr=Qe(()=>{"use strict";on();ir=0,ar=1,lr=5,sr=11,cr=13,dr=15,ur=16,pr=19,mr=26,fr=27,gr=28,hr=30,ve=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};br=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=br(o,t,n);if(r)return r;o=n?null:o.sibling}return null},vr=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await vr(o,t,n);if(r)return r;o=n?null:o.sibling}return null},xr=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?xr(t.type||t.render):null},ae=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=xr(t);return o&&(o.displayName||o.name)||null},Cr=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||Zn(e)||en(e)},Er=e=>{let t=Nt(e.onActive);t._instrumentationSource=e.name??nn;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,l,d)=>{n!==i&&(n?.(a,l,d),e.onCommitFiberRoot?.(a,l,d))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,l)=>{t.onCommitFiberUnmount===i&&(o?.(a,l),e.onCommitFiberUnmount?.(a,l))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,l)=>{t.onPostCommitFiberRoot===i&&(r?.(a,l),e.onPostCommitFiberRoot?.(a,l))};t.onPostCommitFiberRoot=i}return t},oe=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},Ms=Error()});var dt=Qe(()=>{"use strict";on();Xi();Tr();});function rn(e,t){let n=0,o=0,r=0;do r=ca[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function Qi(e,t){return e.pos>=t?!1:e.peek()!==Os}function da(e){let{length:t}=e,n=new Hs(e),o=[],r=0,i=0,a=0,l=0,d=0;do{let c=n.indexOf(";"),u=[],p=!0,f=0;for(r=0;n.pos<c;){let m;r=rn(n,r),r<f&&(p=!1),f=r,Qi(n,c)?(i=rn(n,i),a=rn(n,a),l=rn(n,l),Qi(n,c)?(d=rn(n,d),m=[r,i,a,l,d]):m=[r,i,a,l]):m=[r],u.push(m),n.pos++}p||Is(u),o.push(u),n.pos=c+1}while(n.pos<=t);return o}function Is(e){e.sort(Ds)}function Ds(e,t){return e[0]-t[0]}var Ki,Ls,Ns,ra,ks,Rs,ia,Ps,aa,$s,la,sa,Mr,qi,Zi,Os,Ji,As,ca,Hs,ua,_s,Fs,pa,an,Qn,Vs,ea,zs,Bs,Ws,Gs,ta,js,Ys,Us,Xs,Ks,na,We,qs,wr,Sr,Zs,Js,Qs,ec,tc,nc,oc,rc,Oe,oa,ic,ac,Ne,Ae,kt=Qe(()=>{"use strict";on();Tr();Ki=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Ls=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],Ns=["<anonymous>","eval",""],ra=/\.(jsx|tsx|ts|js)$/,ks=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Rs=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,ia="(at Server)",Ps=/(^|@)\S+:\d+/,aa=/^\s*at .*(\S+:\d+|\(native\))/m,$s=/^(eval@)?(\[native code\])?$/,la=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=qi(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(Ps)){let i=Zi(r,void 0)[0];i&&o.push(i)}return Mr(o,t)}return e.match(aa)?qi(e,t):Zi(e,t)},sa=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},Mr=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e,qi=(e,t)=>Mr(e.split(`
`).filter(n=>!!n.match(aa)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=sa(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}}),Zi=(e,t)=>Mr(e.split(`
`).filter(n=>!n.match($s)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,l=sa(o.replace(r,""));return{functionName:a,fileName:l[0],lineNumber:l[1]?+l[1]:void 0,columnNumber:l[2]?+l[2]:void 0,source:o}}}),Os=44,Ji="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",As=new Uint8Array(64),ca=new Uint8Array(128);for(let e=0;e<Ji.length;e++){let t=Ji.charCodeAt(e);As[e]=t,ca[t]=e}Hs=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};ua=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,_s=/^data:application\/json[^,]+base64,/,Fs=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,pa=typeof WeakRef<"u",an=new Map,Qn=new Map,Vs=e=>pa&&e instanceof WeakRef,ea=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let u of r)if(u[0]<=o)i=u;else break;if(!i||i.length<4)return null;let[,a,l,d]=i;if(a===void 0||l===void 0||d===void 0)return null;let c=t[a];return c?{columnNumber:d,fileName:c,lineNumber:l+1}:null},zs=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return ea(o.map.mappings,o.map.sources,r,i)}return ea(e.mappings,e.sources,t-1,n)},Bs=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(Fs);a&&(o=a[1]||a[2])}if(!o)return null;let r=ua.test(o);if(!(_s.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},Ws=e=>({file:e.file,mappings:da(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),Gs=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:da(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},ta=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(ua);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},js=async(e,t=fetch)=>{if(!ta(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=Bs(e,n);if(!o||!ta(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?Gs(i):Ws(i)}catch{return null}},Ys=async(e,t=!0,n)=>{if(t&&an.has(e)){let i=an.get(e);if(i==null)return null;if(Vs(i)){let a=i.deref();if(a)return a;an.delete(e)}else return i}if(t&&Qn.has(e))return Qn.get(e);let o=js(e,n);t&&Qn.set(e,o);let r=await o;return t&&Qn.delete(e),t&&(r===null?an.set(e,null):an.set(e,pa?new WeakRef(r):r)),r},Us=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await Ys(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=zs(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),Xs=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",Ks=()=>{let e=Nt();for(let t of[...Array.from(et),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},na=e=>{for(let t of et){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},We=e=>`
    in ${e}`,qs=(e,t)=>{let n=We(e);return t&&(n+=` (at ${t})`),n},wr=!1,Sr=(e,t)=>{if(!e||wr)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,wr=!0;let o=Ks();na(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let l={DetermineComponentFrameRoot(){let u;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(f){u=f}Reflect.construct(e,[],p)}else{try{p.call()}catch(f){u=f}e.call(p.prototype)}}else{try{throw Error()}catch(f){u=f}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&u instanceof Error&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[d,c]=l.DetermineComponentFrameRoot();if(d&&c){let u=d.split(`
`),p=c.split(`
`),f=0,m=0;for(;f<u.length&&!u[f].includes("DetermineComponentFrameRoot");)f++;for(;m<p.length&&!p[m].includes("DetermineComponentFrameRoot");)m++;if(f===u.length||m===p.length)for(f=u.length-1,m=p.length-1;f>=1&&m>=0&&u[f]!==p[m];)m--;for(;f>=1&&m>=0;f--,m--)if(u[f]!==p[m]){if(f!==1||m!==1)do if(f--,m--,m<0||u[f]!==p[m]){let h=`
${u[f].replace(" at new "," at ")}`,b=ae(e);return b&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",b)),h}while(f>=1&&m>=0);break}}}finally{wr=!1,Error.prepareStackTrace=n,na(o),console.error=r,console.warn=i}let a=e?ae(e):"";return a?We(a):""},Zs=(e,t)=>{let n=e.tag,o="";switch(n){case gr:o=We("Activity");break;case ar:o=Sr(e.type,!0);break;case sr:o=Sr(e.type.render,!1);break;case ir:case dr:o=Sr(e.type,!1);break;case lr:case mr:case fr:o=We(e.type);break;case ur:o=We("Lazy");break;case cr:o=e.child!==t&&t!==null?We("Suspense Fallback"):We("Suspense");break;case pr:o=We("SuspenseList");break;case hr:o=We("ViewTransition");break;default:return""}return o},Js=e=>{try{let t="",n=e,o=null;do{t+=Zs(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=qs(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},Qs=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},ec=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),tc=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,nc=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!ec(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>tc(a,o))||(i.push(o),t.set(r,i))}return t},oc=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(ia,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},rc=e=>{let t=[];return yr(e,n=>{if(!Xs(n))return;let o=typeof n.type=="string"?n.type:ae(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:la(Qs(n._debugStack?.stack))})},!0),t},Oe=async(e,t=!0,n)=>{let o=rc(e),r=la(Js(e)),i=nc(o),a=new Map;return Us(r.map(l=>l.source?.includes(ia)??!1?oc(l,i,a):l).filter((l,d,c)=>{if(d===0)return!0;let u=c[d-1];return l.functionName!==u.functionName}),t,n)},oa=e=>e.split("/").filter(Boolean).length,ic=e=>e.split("/").filter(Boolean)[0]??null,ac=e=>{let t=e.indexOf("/",1);if(t===-1||oa(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!ra.test(n)||oa(n)<2)return e;let o=ic(n);return!o||o.startsWith("@")||o.length>4?e:n},Ne=e=>{if(!e||Ns.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=ac(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),l=i.indexOf(":");t=a!==-1&&(l===-1||a<l)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of Ls)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if(Ki.test(t)){let i=t.match(Ki);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Rs.test(i)&&(t=t.slice(0,r))}return t},Ae=e=>{let t=Ne(e);return!(!t||!ra.test(t)||ks.test(t))}});function Gc(e,t,n){let o=n&&n!=="none"?` ${n}`:"";return`translate(${e}px, ${t}px)${o}`}function mt(e){e.element.style.transform=Gc(e.delta.dx,e.delta.dy,e.existingTransform)}function Va(e){e.existingTransform&&e.existingTransform!=="none"?e.element.style.transform=e.existingTransform:e.element.style.transform=""}function un(e,t,n,o){e.style.transform=`translate(${t}px, ${n}px) scale(1.02)${o&&o!=="none"?` ${o}`:""}`,e.style.boxShadow=$.lg,e.style.transition="none",e.style.zIndex="2147483644"}function za(e){mt(e),e.element.style.boxShadow="",e.element.style.transition="",e.element.style.zIndex=""}function co(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);for(;o;){if(ve(o)){let r=o._debugSource,i=ae(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function Ba(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);if(!o)continue;let r=await Oe(o);if(!r||r.length===0)continue;for(let i of r)if(!(!i.functionName||i.functionName!==e.componentName)&&i.fileName){let a=Ne(i.fileName);if(Ae(a)&&a.endsWith(e.filePath))return n}}catch{}return null}var uo=Qe(()=>{"use strict";dt();kt();U()});var Qr={};hs(Qr,{addAnnotation:()=>Ur,addMove:()=>jr,addTextEditAnnotation:()=>bo,canUndo:()=>Zr,canvasUndo:()=>vo,getActiveTool:()=>gn,getAnnotations:()=>jc,getCanvasTransform:()=>De,getMoveForElement:()=>qr,getMoves:()=>Gr,getOriginalsHidden:()=>Yc,getToolOptions:()=>Ht,hasChanges:()=>xo,hasMoveForElement:()=>Kr,onAnnotationRemoved:()=>Xr,onCanvasTransformChange:()=>bn,onStateChange:()=>Wr,onToolChange:()=>Br,pageToViewport:()=>Kc,peekUndoStack:()=>Xc,pushUndoAction:()=>hn,removeAnnotation:()=>fo,removeMove:()=>yo,resetCanvas:()=>vn,serializeAnnotations:()=>Jr,setActiveTool:()=>go,setCanvasTransform:()=>yn,setOriginalsHidden:()=>Uc,setToolOption:()=>ho,updateMoveDelta:()=>Yr,viewportToPage:()=>It});function Br(e){return po.push(e),()=>{po=po.filter(t=>t!==e)}}function Wr(e){return mo.push(e),()=>{mo=mo.filter(t=>t!==e)}}function gt(){mo.forEach(e=>e())}function gn(){return Vr}function go(e){let t=Vr;t!==e&&(Vr=e,po.forEach(n=>n(e,t)))}function Ht(){return{...Wa}}function ho(e,t){Wa[e]=t}function Gr(){return xe}function jr(e){xe.set(e.id,e),hn({type:"moveCreate",moveId:e.id})}function Yr(e,t,n){let o=xe.get(e);o&&(o.delta=t,mt(o),hn({type:"moveDelta",moveId:e,previousDelta:n}))}function yo(e){let t=xe.get(e);t&&(t.element.style.cssText=t.originalCssText,t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),xe.delete(e),gt())}function jc(){return Ie}function Ur(e){if(Ie.push(e),e.type==="colorChange"){let t=e;ke.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else ke.push({type:"annotationAdd",annotationId:e.id});gt()}function bo(e,t,n){Ie.push(e),ke.push({type:"textEditRestore",annotationId:e.id,elementIdentity:t,originalInnerHTML:n}),gt()}function Xr(e){Ga=e}function fo(e){Ie=Ie.filter(t=>t.id!==e),Ga?.(e),gt()}function Yc(){return zr}function Uc(e){zr=e;for(let t of xe.values())e?mt(t):Va(t);gt()}function Kr(e){for(let t of xe.values())if(t.element===e||t.element.contains(e)||e.contains(t.element))return!0;return!1}function qr(e){for(let t of xe.values())if(t.element===e)return t}function vo(){let e=ke.pop();if(!e)return null;switch(e.type){case"moveCreate":return yo(e.moveId),"move removed";case"moveDelta":{let t=xe.get(e.moveId);return t&&(t.delta=e.previousDelta,mt(t)),"move reverted"}case"annotationAdd":return fo(e.annotationId),"annotation removed";case"colorChange":{let t=Ie.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),fo(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}case"textEditRestore":{let t=co(e.elementIdentity);return t&&(t.innerHTML=e.originalInnerHTML),fo(e.annotationId),"text edit reverted"}}return null}function hn(e){ke.push(e),gt()}function Xc(){return ke.length>0?ke[ke.length-1]:null}function De(){return{scale:ft,offsetX:mn,offsetY:fn}}function yn(e,t,n){ft=e,mn=t,fn=n,pn.forEach(o=>o())}function bn(e){return pn.push(e),()=>{pn=pn.filter(t=>t!==e)}}function It(e,t){return{x:(e-mn)/ft,y:(t-fn)/ft}}function Kc(e,t){return{x:e*ft+mn,y:t*ft+fn}}function vn(){for(let e of xe.values())e.element.style.cssText=e.originalCssText,e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder);for(let e of Ie)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of ke)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}xe=new Map,Ie=[],ke=[],zr=!0,ft=1,mn=0,fn=0,pn.forEach(e=>e()),gt()}function xo(){return xe.size>0||Ie.length>0}function Zr(){return ke.length>0}function Jr(){let e=Array.from(xe.values()).map(r=>({component:r.componentRef.componentName,file:r.componentRef.filePath,line:r.componentRef.lineNumber,originalRect:{top:r.originalRect.top,left:r.originalRect.left,width:r.originalRect.width,height:r.originalRect.height},delta:{dx:r.delta.dx,dy:r.delta.dy},siblingRects:(()=>{let i=r.element.parentElement;if(!i)return;let a=[];for(let l of Array.from(i.children)){if(l===r.element||!(l instanceof HTMLElement))continue;let d=l.getBoundingClientRect();a.push({component:l.tagName.toLowerCase(),rect:{top:d.top,left:d.left,width:d.width,height:d.height}})}return a.length>0?a:void 0})()})),t=[],n=[],o=[];for(let r of Ie)r.type==="text"?t.push({type:"text",content:r.content,position:r.position,targetComponent:r.targetComponent?.componentName,targetFile:r.targetComponent?.filePath,targetLine:r.targetComponent?.lineNumber}):r.type==="colorChange"?n.push({component:r.component.componentName,file:r.component.filePath,line:r.component.lineNumber,property:r.property,from:r.fromColor,to:r.toColor,pickedToken:r.pickedToken}):r.type==="textEdit"&&o.push({component:r.componentName,file:r.filePath,line:r.lineNumber,column:r.columnNumber,originalText:r.originalText,newText:r.newText});return{moves:e,annotations:t,colorChanges:n,textEdits:o}}var xe,Ie,ke,Vr,zr,Wa,ft,mn,fn,pn,po,mo,Ga,me=Qe(()=>{"use strict";uo();xe=new Map,Ie=[],ke=[],Vr="select",zr=!0,Wa={fontSize:16,textColor:"#ffffff"},ft=1,mn=0,fn=0,pn=[],po=[],mo=[];Ga=null});function ys(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),l=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+l).toString(16).slice(1)}`}return e}function bs(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(E=>{try{return Array.from(E.cssRules)}catch{return[]}}).filter(E=>E instanceof CSSStyleRule&&E.selectorText===":root").flatMap(E=>Array.from(E.style)).filter(E=>E.startsWith("--")),n={},o={},r={},i={},a={},l={},d={},c={},u={},p={},f={},m={},h={},b={},N={},M={},D={},I={},W=(E,P,ce,de)=>{E[ce]=de,P[de]=ce};for(let E of t){let P=e.getPropertyValue(E).trim();if(!P)continue;let ce=E.match(/^--spacing-(.+)$/);if(ce){W(n,p,ce[1],P);continue}let de=E.match(/^--color-(.+)$/);if(de){let Gn=de[1];o[Gn]=P,f[ys(P)]=Gn;continue}let R=E.match(/^--font-size-(.+)$/);if(R){W(r,m,R[1],P);continue}let Y=E.match(/^--font-weight-(.+)$/);if(Y){W(i,h,Y[1],P);continue}let y=E.match(/^--radius-(.+)$/);if(y){W(a,b,y[1],P);continue}let T=E.match(/^--border-(.+)$/);if(T){W(l,N,T[1],P);continue}let V=E.match(/^--opacity-(.+)$/);if(V){W(d,M,V[1],P);continue}let Q=E.match(/^--tracking-(.+)$/);if(Q){W(c,D,Q[1],P);continue}let ee=E.match(/^--leading-(.+)$/);if(ee){W(u,I,ee[1],P);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:l,opacity:d,letterSpacing:c,lineHeight:u,spacingReverse:p,colorsReverse:f,fontSizeReverse:m,fontWeightReverse:h,borderRadiusReverse:b,borderWidthReverse:N,opacityReverse:M,letterSpacingReverse:D,lineHeightReverse:I}}var vs=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function xs(e,t){let n={};for(let o of vs){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function Yn(e,t){return t.get(e)??null}function Ni(e,t,n){let r=(n??qt())[e],i=[];for(let[l,d]of r.entries()){let c=parseFloat(d);isNaN(c)||i.push({numericValue:c,token:l,cssValue:d})}let a=parseFloat(t);return isNaN(a)||i.some(d=>d.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((l,d)=>l.numericValue-d.numericValue),i}var ki=null,Kt=null;function Ri(e){ki=e,Kt=null}function qt(){if(Kt!==null)return Kt;let e=bs();return Kt=xs(e,ki??{}),Kt}var ue=null,Zt=[],St=0,Cs=5,Yo=null,Uo=null,Xo=null,Ko=null,qo=null,Zo=null;function Pi(e){Zo=e}function Un(e){ue&&ue.readyState===WebSocket.OPEN||(qo=e,ue=new WebSocket(`ws://localhost:${e}`),ue.onopen=()=>{let t=St>0;St=0,t&&Ko&&Ko()},ue.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&Ri(n.tokens),n.type==="updatePropertyComplete"&&Zo&&Zo(n.success,n.errorCode,n.error),Zt.forEach(o=>o(n))}catch{}},ue.onclose=t=>{if(ue=null,t.code===4001){Xo&&Xo();return}if(St<Cs){let n=500*Math.pow(2,St);St++,Yo=setTimeout(()=>Un(e),n)}else Uo&&Uo()},ue.onerror=()=>{})}function pe(e){ue&&ue.readyState===WebSocket.OPEN&&ue.send(JSON.stringify(e))}function be(e){return Zt.push(e),()=>{Zt=Zt.filter(t=>t!==e)}}function $i(){Yo&&clearTimeout(Yo),ue&&(ue.close(),ue=null),Zt=[]}function Oi(e){Uo=e}function Ai(e){Xo=e}function Hi(e){Ko=e}function Ii(){qo&&(St=0,Un(qo))}U();var Lt=null,Z=null,Jt=0,Xn=null,ct=null,Jo=null,Mt=null,er=null,Fi=null,Qo='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',Es='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>',_i='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>',Ts=`
  :host {
    all: initial;
  }
  ${Di}
  .toolbar {
    position: fixed;
    bottom: 16px;
    left: 76px;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    border-radius: ${L.md};
    font-family: ${x};
    font-size: 12px;
    color: ${s.textPrimary};
    box-shadow: ${$.md};
    user-select: none;
    opacity: 0;
    animation: fadeIn ${C.settle} forwards;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  .divider {
    width: 1px;
    height: 16px;
    background: ${s.border};
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
    color: ${s.textSecondary};
    cursor: pointer;
    padding: 0;
    transition: background ${C.fast}, color ${C.fast};
  }
  .icon-btn svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  .icon-btn:hover:not(:disabled) {
    background: ${s.bgSecondary};
    color: ${s.textPrimary};
  }
  .icon-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }
  .icon-btn.active {
    color: ${s.accent};
  }
  .close-btn {
    color: ${s.textTertiary};
  }
  .close-btn:hover {
    background: ${s.dangerSoft};
    color: ${s.danger};
  }
  .generate-btn {
    background: ${s.accent};
    border: none;
    border-radius: ${L.sm};
    color: white;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    font-family: ${x};
    cursor: pointer;
    transition: background ${C.fast};
  }
  .generate-btn:hover:not(:disabled) {
    background: ${s.accentHover};
  }
  .generate-btn:disabled {
    background: ${s.bgTertiary};
    color: ${s.textTertiary};
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
    color: ${s.accent};
    font-size: 11px;
    font-weight: 600;
    font-family: monospace;
    flex-shrink: 0;
  }
  .component-detail .name {
    color: ${s.textPrimary};
    font-size: 12px;
    font-weight: 600;
    flex-shrink: 0;
  }
  .component-detail .path {
    color: ${s.textTertiary};
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .component-detail.empty {
    color: ${s.textTertiary};
    font-size: 12px;
  }
  .toast {
    position: fixed;
    bottom: 68px;
    left: 76px;
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    color: ${s.textPrimary};
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-family: ${x};
    box-shadow: ${$.md};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${C.medium};
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
    border: 2px solid ${s.border};
    border-top-color: ${s.textSecondary};
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
`;function Vi(e){let t=document.createElement("div");t.id="frameup-root",document.body.appendChild(t),Lt=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=Ts;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${Qo}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Confirm</button>
    <button class="icon-btn close-btn" title="Close FrameUp">
      ${Es}
    </button>
  `,Lt.appendChild(n),Lt.appendChild(o),Z=o.querySelector(".undo-btn");let r=o.querySelector(".close-btn");Xn=o.querySelector(".generate-btn"),Mt=o.querySelector(".component-detail"),ct=document.createElement("div"),ct.className="toast",Lt.appendChild(ct),Z.addEventListener("click",()=>{pe({type:"undo"}),Z&&(Z.innerHTML='<div class="spinner"></div>',Z.disabled=!0)}),r.addEventListener("click",e),Xn.addEventListener("click",()=>{er&&er()}),document.addEventListener("keydown",i=>{i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!ws()&&Fi?.()&&i.preventDefault()}),Oi(()=>{X("Disconnected. Click to reconnect."),Ii()}),Ai(()=>{X("Disconnected: another tab took over")}),Hi(()=>{Jt=0,Z&&(Z.disabled=!0)}),be(i=>{switch(i.type){case"reorderComplete":i.success?(Jt++,Z&&(Z.innerHTML=_i,setTimeout(()=>{Z&&(Z.innerHTML=Qo,Z.disabled=!1)},200))):i.error&&X(i.error);break;case"undoComplete":i.success?(Jt=Math.max(0,Jt-1),Z&&(Z.innerHTML=_i,setTimeout(()=>{Z&&(Z.innerHTML=Qo,Z.disabled=Jt===0)},200))):i.error&&X(i.error);break;case"devServerDisconnected":X("Dev server disconnected");break;case"devServerReconnected":X("Dev server reconnected");break}})}function zi(){let e=document.getElementById("frameup-root");e&&e.remove(),Lt=null,Z=null}function q(){return Lt}function Bi(e){er=e}function Wi(e){Fi=e}function Kn(e){Xn&&(Xn.disabled=!e)}function Be(e){if(!Mt)return;if(!e){Mt.className="component-detail empty",Mt.textContent="No selection";return}Mt.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";Mt.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function X(e){ct&&(ct.textContent=e,ct.classList.add("visible"),Jo&&clearTimeout(Jo),Jo=setTimeout(()=>{ct?.classList.remove("visible")},2e3))}function ws(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}dt();kt();var lc=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);function Ge(e){return!!(lc.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function Lr(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}var sc=50,eo=.9,cc=2147483600,dc=1e3,ln=new WeakMap;function Nr(){ln=new WeakMap}function uc(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function pc(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=cc}function mc(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<eo||o.height/window.innerHeight<eo)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>dc}function ut(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&Lr(e)||e.closest("#frameup-root")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-placeholder"))return!1;let n=performance.now(),o=ln.get(e);if(o&&n-o.timestamp<sc)return o.isValid;let r=window.getComputedStyle(e);return uc(e,r)?e.clientWidth/window.innerWidth>=eo&&e.clientHeight/window.innerHeight>=eo&&(pc(r)||mc(e,r))?(ln.set(e,{isValid:!1,timestamp:n}),!1):(ln.set(e,{isValid:!0,timestamp:n}),!0):(ln.set(e,{isValid:!1,timestamp:n}),!1)}var fc=.75,ma=32,to=3,no=20,fa=100,Te=1;function Rt(e,t,n){return Math.min(n,Math.max(t,e))}function gc(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,l=o+e.width/2,d=r+e.height/2,c=Rt(Math.ceil(e.width/ma),to,no),u=Rt(Math.ceil(e.height/ma),to,no);if(c*u>fa){let h=Math.sqrt(fa/(c*u));c=Rt(Math.floor(c*h),to,no),u=Rt(Math.floor(u*h),to,no)}let p=new Set,f=[],m=(h,b)=>{let N=Rt(Math.round(h),0,t-1),M=Rt(Math.round(b),0,n-1),D=`${N}:${M}`;p.has(D)||(p.add(D),f.push({x:N,y:M}))};m(o+Te,r+Te),m(i-Te,r+Te),m(o+Te,a-Te),m(i-Te,a-Te),m(l,r+Te),m(l,a-Te),m(o+Te,d),m(i-Te,d),m(l,d);for(let h=0;h<c;h++){let b=o+(h+.5)/c*e.width;for(let N=0;N<u;N++)m(b,r+(N+.5)/u*e.height)}return f}function ga(e,t=ut,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=gc(e);for(let d of i)for(let c of document.elementsFromPoint(d.x,d.y))r.add(c);let a=[];for(let d of r){if(!t(d))continue;let c=d.getBoundingClientRect();if(c.width<=0||c.height<=0)continue;let u={left:c.left,top:c.top,right:c.left+c.width,bottom:c.top+c.height};if(n){let p=Math.max(o.left,u.left),f=Math.max(o.top,u.top),m=Math.min(o.right,u.right),h=Math.min(o.bottom,u.bottom),b=Math.max(0,m-p)*Math.max(0,h-f),N=c.width*c.height;N>0&&b/N>=fc&&a.push(d)}else o.left<u.right&&o.right>u.left&&o.top<u.bottom&&o.bottom>u.top&&a.push(d)}let l=a.filter(d=>!a.some(c=>c!==d&&c.contains(d)));return l.sort((d,c)=>{let u=d.compareDocumentPosition(c);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0}),l}U();function Pt(e,t,n){return e+(t-e)*n}U();var hc=.35,ha=.3,oo=.5,yc=2,te=null,k=null,kr=0,Rr=0,sn=1,Ot=null,re=null,z=null,G=[],$t=s.accent,bc="rgba(162,89,255,0.08)",ya="rgba(162,89,255,0.15)",vc=4,ba=10,xc="#ffffff",Cc=$t,Ec=1.5,Or=!0,tt=null;function xa(){let e=q();e&&(te=document.createElement("canvas"),te.setAttribute("data-frameup-overlay","true"),te.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(te),Ar(),window.addEventListener("resize",Ar))}function ro(e,t=4){if(!e){re&&(re.targetOpacity=0,je());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!re||!re.initialized?re=Dr(n,t):(re.target=n,re.borderRadius=t,re.targetOpacity=1),je()}function pt(e,t=4){if(!e){z&&(z.targetOpacity=0,je());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!z||!z.initialized?z=Dr(n,t):(z.target=n,z.borderRadius=t,z.targetOpacity=1),je()}function Ca(e){tt=e,je()}function Hr(){tt=null,je()}function Ea(e){for(z=null;G.length>e.length;)G.pop();for(let t=0;t<e.length;t++){let n=e[t],o={x:n.rect.left,y:n.rect.top,w:n.rect.width,h:n.rect.height};t<G.length?(G[t].target=o,G[t].borderRadius=n.borderRadius,G[t].targetOpacity=1):G.push(Dr(o,n.borderRadius))}je()}function cn(){G=[],je()}function Ir(e,t){if(!Or)return null;let n=Sa();if(!n)return null;let o=Na(n.x,n.y,n.w,n.h);for(let r of o){let i=e-r.x,a=t-r.y;if(i*i+a*a<=ba*ba)return r.corner}return null}function Ta(){return Sa()}function wa(){Ot!==null&&cancelAnimationFrame(Ot),window.removeEventListener("resize",Ar),te?.remove(),te=null,k=null,re=null,z=null,G=[],tt=null}function Sa(){if(G.length>1)return Ma(G);if(z&&z.opacity>=.5){let{x:e,y:t,w:n,h:o}=z.current;return{x:e,y:t,w:n,h:o}}if(G.length===1){let{x:e,y:t,w:n,h:o}=G[0].current;return{x:e,y:t,w:n,h:o}}return null}function Ma(e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,r=-1/0;for(let i of e){let{x:a,y:l,w:d,h:c}=i.current;a<t&&(t=a),l<n&&(n=l),a+d>o&&(o=a+d),l+c>r&&(r=l+c)}return{x:t,y:n,w:o-t,h:r-n}}function Dr(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function Ar(){te&&(sn=Math.max(window.devicePixelRatio||1,yc),kr=window.innerWidth,Rr=window.innerHeight,te.width=kr*sn,te.height=Rr*sn,te.style.width=`${kr}px`,te.style.height=`${Rr}px`,k=te.getContext("2d"),je())}function je(){Ot===null&&(Ot=requestAnimationFrame(La))}function La(){if(Ot=null,!k||!te)return;let e=!1;re?.initialized&&(Pr(re,hc)&&(e=!0),re.opacity<.01&&re.targetOpacity===0&&(re=null)),z?.initialized&&(Pr(z,ha)&&(e=!0),z.opacity<.01&&z.targetOpacity===0&&(z=null));for(let t=G.length-1;t>=0;t--){let n=G[t];n.initialized&&Pr(n,ha)&&(e=!0),n.opacity<.01&&n.targetOpacity===0&&G.splice(t,1)}if(k.setTransform(1,0,0,1,0,0),k.clearRect(0,0,te.width,te.height),k.setTransform(sn,0,0,sn,0,0),re&&$r(k,re,$t,bc),z&&($r(k,z,$t,ya),Or&&va(k,z.current,z.opacity)),tt){if(k.save(),k.globalAlpha=.6,k.strokeStyle=$t,k.lineWidth=1,k.setLineDash([4,4]),tt.verticalLine){let{x:t}=tt.verticalLine;k.beginPath(),k.moveTo(t,0),k.lineTo(t,te.height),k.stroke()}if(tt.horizontalLine){let{y:t}=tt.horizontalLine;k.beginPath(),k.moveTo(0,t),k.lineTo(te.width,t),k.stroke()}k.restore()}if(G.length>0){for(let t of G)$r(k,t,$t,ya);if(Or&&G.length>0){let t=Ma(G);t&&t.w>=24&&t.h>=24&&(G.length>1&&(k.globalAlpha=.6,k.beginPath(),k.rect(t.x,t.y,t.w,t.h),k.strokeStyle=$t,k.lineWidth=1,k.setLineDash([4,4]),k.stroke(),k.setLineDash([]),k.globalAlpha=1),va(k,t,1))}}e&&(Ot=requestAnimationFrame(La))}function Pr(e,t){let n=e.current,o=e.target,r=Pt(n.x,o.x,t),i=Pt(n.y,o.y,t),a=Pt(n.w,o.w,t),l=Pt(n.h,o.h,t),d=Pt(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<oo&&Math.abs(i-o.y)<oo&&Math.abs(a-o.w)<oo&&Math.abs(l-o.h)<oo&&Math.abs(d-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=l,e.opacity=d,!0)}function $r(e,t,n,o){let{x:r,y:i,w:a,h:l}=t.current;if(a<=0||l<=0)return;let d=Math.min(t.borderRadius,a/2,l/2);e.globalAlpha=t.opacity,e.beginPath(),d>0?e.roundRect(r,i,a,l,d):e.rect(r,i,a,l),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function Na(e,t,n,o){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+n,y:t},{corner:"br",x:e+n,y:t+o},{corner:"bl",x:e,y:t+o}]}function va(e,t,n){if(t.w<24||t.h<24)return;e.globalAlpha=n;let o=Na(t.x,t.y,t.w,t.h);for(let r of o)e.beginPath(),e.arc(r.x,r.y,vc,0,Math.PI*2),e.fillStyle=xc,e.fill(),e.strokeStyle=Cc,e.lineWidth=Ec,e.stroke();e.globalAlpha=1}var Tc=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],wc=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],Sc=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],Mc=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],Lc=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],He=[...Tc,...wc,...Sc,...Mc,...Lc];U();var Nc=new Set(["auto","none","normal","inherit","initial"]);function ka(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let l=document.createElement("input");l.type="text",l.className="prop-input",l.style.cssText="width:60px; cursor:text;";let d=document.createElement("span");d.style.cssText=`font-size:10px; color:${s.textSecondary}; font-family:${x};`,a.appendChild(l),a.appendChild(d);let c=new Map(t);function u(){return c.get(r.key)??r.defaultValue}function p(f){let m=parseFloat(f);l.value=isNaN(m)?f:String(m);try{let b=Ni(i,f).find(N=>N.cssValue===f);b?.token?d.textContent=`${r.tailwindPrefix}-${b.token}`:d.textContent=""}catch{d.textContent=""}}return l.addEventListener("blur",()=>{let f=l.value.trim(),m=parseFloat(f);if(isNaN(m))Nc.has(f)?(c.set(r.key,f),p(f),n(r.key,f),o()):p(u());else{let b=f.match(/(px|rem|em|%|vw|vh|ch)$/)?f:`${m}px`;c.set(r.key,b),p(b),n(r.key,b),o()}}),l.addEventListener("keydown",f=>{f.key==="Enter"?l.blur():f.key==="Escape"&&(p(u()),l.blur())}),p(u()),{element:a,setValue(f,m){f===r.key&&(c.set(f,m),p(m))},destroy(){}}}U();function Ra(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${s.bgTertiary};
    border-radius:${L.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let l=t.get(r.key)??r.defaultValue,d=[];function c(u){l=u;for(let{btn:p,value:f,opt:m}of d){let h=f===u;p.style.background=h?s.accent:"transparent",p.style.color=h?s.textOnAccent:s.textSecondary,p.title=h&&m.tailwindValue?`${m.label} (${m.tailwindValue})`:m.label}}for(let u of i){let p=document.createElement("button");p.style.cssText=`
      display:flex;
      align-items:center;
      justify-content:center;
      padding:2px 6px;
      border:none;
      border-radius:${L.xs};
      font-family:${x};
      font-size:10px;
      cursor:pointer;
      background:transparent;
      color:${s.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g," "),p.textContent=u.icon??u.label,p.title=u.label,p.addEventListener("click",()=>{c(u.value),n(r.key,u.value),o()}),d.push({btn:p,value:u.value,opt:u}),a.appendChild(p)}return c(l),{element:a,setValue(u,p){u===r.key&&c(p)},destroy(){}}}U();U();function dn(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,l=0;a!==0&&(r===t?l=((n-o)/a+(n<o?6:0))*60:r===n?l=((o-t)/a+2)*60:l=((t-n)/a+4)*60);let d=r===0?0:a/r*100,c=r*100;return{h:l,s:d,v:c}}function io(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),l=o*(1-i*n),d=o*(1-(1-i)*n),c,u,p;switch(r%6){case 0:c=o,u=d,p=a;break;case 1:c=l,u=o,p=a;break;case 2:c=a,u=o,p=d;break;case 3:c=a,u=l,p=o;break;case 4:c=d,u=a,p=o;break;case 5:c=o,u=a,p=l;break;default:c=0,u=0,p=0}let f=m=>Math.round(m*255).toString(16).padStart(2,"0");return`#${f(c)}${f(u)}${f(p)}`}var nt=null;function ao(e){At();let t=q();if(!t)return;let n=document.createElement("div");n.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    box-shadow: ${$.lg};
    border-radius: ${L.md};
    font-family: ${x};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${C.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let y=n.getBoundingClientRect();y.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-y.width-8}px`),y.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-y.height-8}px`),n.style.opacity="1"});let o=dn(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let y=kc(["Fill","Text"],0,T=>{r=T===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(y)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),l=document.createElement("div");l.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${$.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let d=document.createElement("div");d.style.cssText="position:relative;width:176px;height:120px;",d.appendChild(i),d.appendChild(l),n.appendChild(d);function c(){let y=o.h,T=a.createLinearGradient(0,0,176,0);T.addColorStop(0,`hsl(${y}, 0%, 100%)`),T.addColorStop(1,`hsl(${y}, 100%, 50%)`),a.fillStyle=T,a.fillRect(0,0,176,120);let V=a.createLinearGradient(0,0,0,120);V.addColorStop(0,"rgba(0,0,0,0)"),V.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=V,a.fillRect(0,0,176,120);let Q=o.s/100*176,ee=(1-o.v/100)*120;l.style.left=`${Q}px`,l.style.top=`${ee}px`}let u=!1;i.addEventListener("mousedown",y=>{u=!0,p(y)});function p(y){let T=i.getBoundingClientRect(),V=Math.max(0,Math.min(176,y.clientX-T.left)),Q=Math.max(0,Math.min(120,y.clientY-T.top));o.s=V/176*100,o.v=(1-Q/120)*100,c(),P()}let f=document.createElement("canvas");f.width=176,f.height=14,f.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let m=f.getContext("2d"),h=document.createElement("div");h.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${$.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let b=document.createElement("div");b.style.cssText="position:relative;width:176px;height:14px;",b.appendChild(f),b.appendChild(h),n.appendChild(b);function N(){let y=m.createLinearGradient(0,0,176,0);for(let T=0;T<=6;T++)y.addColorStop(T/6,`hsl(${T*60}, 100%, 50%)`);m.fillStyle=y,m.fillRect(0,0,176,14),h.style.left=`${o.h/360*176}px`}let M=!1;f.addEventListener("mousedown",y=>{M=!0,D(y)});function D(y){let T=f.getBoundingClientRect(),V=Math.max(0,Math.min(176,y.clientX-T.left));o.h=V/176*360,N(),c(),P()}let I=document.createElement("input");I.type="text",I.value=io(o),I.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${s.bgSecondary};
    border: 1px solid ${s.border};
    border-radius: ${L.sm};
    color: ${s.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,I.addEventListener("keydown",y=>{y.key==="Enter"&&I.blur(),y.stopPropagation()}),I.addEventListener("blur",()=>{let y=I.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(y)){let T=y.startsWith("#")?y:`#${y}`;o=dn(T),c(),N(),P()}else I.value=io(o)}),n.appendChild(I);let W=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],E=document.createElement("div");E.style.cssText="display:flex;gap:4px;justify-content:center;";for(let y of W){let T=document.createElement("button");T.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${y};
      border: 1px solid ${s.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${C.fast};
    `,T.addEventListener("mouseenter",()=>{T.style.boxShadow=$.sm}),T.addEventListener("mouseleave",()=>{T.style.boxShadow="none"}),T.addEventListener("click",()=>{o=dn(y),c(),N(),I.value=y,P()}),E.appendChild(T)}if(n.appendChild(E),e.projectColors&&e.projectColors.length>0){let y=document.createElement("div");y.textContent="Project",y.style.cssText=`
      font-size: 10px;
      color: ${s.textSecondary};
      font-family: ${x};
      margin-top: 2px;
    `,n.appendChild(y);let T=document.createElement("div");T.style.cssText="display:flex;gap:4px;flex-wrap:wrap;max-height:48px;overflow-y:auto;";for(let{token:V,hex:Q}of e.projectColors){let ee=document.createElement("button");ee.title=V,ee.style.cssText=`
        width: 12px; height: 12px; border-radius: 50%;
        background: ${Q};
        border: 1px solid ${s.border};
        cursor: pointer; padding: 0;
        transition: box-shadow ${C.fast};
      `,ee.addEventListener("mouseenter",()=>{ee.style.boxShadow=$.sm}),ee.addEventListener("mouseleave",()=>{ee.style.boxShadow="none"}),ee.addEventListener("click",()=>{o=dn(Q),c(),N(),I.value=Q,P(),e.onPickedToken?.(V)}),T.appendChild(ee)}n.appendChild(T)}function P(){let y=io(o);I.value=y,e.onColorChange(y),e.onPickedToken?.(void 0)}t.appendChild(n),nt=n,c(),N();let ce=y=>{u&&p(y),M&&D(y)},de=()=>{u=!1,M=!1};document.addEventListener("mousemove",ce),document.addEventListener("mouseup",de);let R=y=>{y.key==="Escape"&&At()};document.addEventListener("keydown",R,!0);let Y=y=>{nt&&!y.composedPath().includes(nt)&&At()};setTimeout(()=>document.addEventListener("mousedown",Y,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",ce),document.removeEventListener("mouseup",de),document.removeEventListener("keydown",R,!0),document.removeEventListener("mousedown",Y,!0)},n._onClose=e.onClose}function At(){nt&&(nt._cleanup?.(),nt._onClose?.(),nt.remove(),nt=null)}function kc(e,t,n){let o=document.createElement("div");o.style.cssText=`
    display: flex;
    background: ${s.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;let r=[];for(let i=0;i<e.length;i++){let a=document.createElement("button");a.textContent=e[i],a.style.cssText=`
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i===t?s.bgPrimary:"transparent"};
      box-shadow: ${i===t?$.sm:"none"};
      color: ${i===t?s.textPrimary:s.textSecondary};
      font-family: ${x}; font-size: 12px; cursor: pointer;
      transition: background ${C.fast}, color ${C.fast};
    `,a.addEventListener("click",()=>{r.forEach((l,d)=>{l.style.background=d===i?s.bgPrimary:"transparent",l.style.boxShadow=d===i?$.sm:"none",l.style.color=d===i?s.textPrimary:s.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var _r=null;function Rc(){return _r||(_r=document.createElement("canvas").getContext("2d")),_r}function Pa(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${L.sm};
    border:1px solid ${s.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let l=document.createElement("input");l.type="text",l.placeholder="#rrggbb",l.className="prop-input",l.style.cssText="flex:1; min-width:0;";let d=document.createElement("span");d.style.cssText=`font-size:10px; color:${s.textSecondary}; font-family:${x};`,i.appendChild(a),i.appendChild(l),i.appendChild(d);let c=t.get(r.key)??r.defaultValue,u=!1;function p(h){let b=h.trim().toLowerCase();if(b==="transparent")return"transparent";if(b==="inherit"||b==="currentcolor"||b==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(b))return b;let N=Rc();N.fillStyle="#000000",N.fillStyle=b;let M=N.fillStyle;if(M.startsWith("#"))return M;let D=M.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(D){let I=parseInt(D[1],10),W=parseInt(D[2],10),E=parseInt(D[3],10);return`#${((1<<24)+(I<<16)+(W<<8)+E).toString(16).slice(1)}`}return"#000000"}function f(h){c=h,l.value=h,h==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=h;try{let b=qt(),N=Yn(h,b.colorsReverse);N?d.textContent=`${r.tailwindPrefix??"bg"}-${N}`:d.textContent=""}catch{d.textContent=""}}function m(){if(u)return;let h=l.value.trim();if(!h){f(c);return}let b=p(h);f(b),n(r.key,b),o()}return a.addEventListener("click",()=>{if(u){At(),u=!1;return}let h=a.getBoundingClientRect();u=!0,ao({initialColor:p(c),position:{x:h.left-210,y:h.top},showPropertyToggle:!1,onColorChange:b=>{f(b),n(r.key,b)},onClose:()=>{u=!1,o()}})}),l.addEventListener("keydown",h=>{h.key==="Enter"?(m(),l.blur()):h.key==="Escape"&&(f(c),l.blur())}),l.addEventListener("blur",()=>{m()}),l.addEventListener("input",()=>{let h=l.value.trim(),b=p(h);a.style.background=b}),f(c),{element:i,setValue(h,b){h===r.key&&f(b)},destroy(){u&&(At(),u=!1)}}}U();function $a(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function Oa(e,t,n,o){let r=new Map(t),i=[];for(let S of e){let w=$a(S.key);w&&i.push({descriptor:S,...w})}let a=document.createElement("div");a.style.cssText=`
    display:flex;
    flex-direction:column;
    gap:4px;
    font-family:${x};
    font-size:10px;
    color:${s.textSecondary};
    position:relative;
  `.trim().replace(/\n\s*/g," ");let l=document.createElement("div");l.style.cssText="position:relative; padding:4px;";let d=document.createElement("div");d.style.cssText=`
    background:${s.marginBoxBg};
    border:1px dashed ${s.marginBoxBorder};
    border-radius:${L.sm};
    padding:10px;
    position:relative;
  `.trim().replace(/\n\s*/g," ");let c=document.createElement("div");c.style.cssText=`
    background:${s.paddingBoxBg};
    border:1px dashed ${s.paddingBoxBorder};
    border-radius:${L.sm};
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
    color:${s.textTertiary};
    font-size:9px;
    padding:4px 6px;
    background:${s.bgSecondary};
    border-radius:3px;
    user-select:none;
  `.trim().replace(/\n\s*/g," "),u.textContent="content";let p=[];function f(S){let w=document.createElement("span"),ye=r.get(S.key)??S.defaultValue;return w.textContent=D(ye),w.title=S.label,w.style.cssText=`
      cursor:pointer;
      color:${s.textPrimary};
      font-size:10px;
      font-family:${x};
      padding:1px 4px;
      border-radius:3px;
      text-align:center;
      transition:background 100ms ease;
      display:inline-block;
      min-width:18px;
    `.trim().replace(/\n\s*/g," "),w.addEventListener("mouseenter",()=>{w.style.background=s.bgTertiary}),w.addEventListener("mouseleave",()=>{(document.activeElement!==m||m.dataset.key!==S.key)&&(w.style.background="transparent")}),w.addEventListener("click",()=>{N(S,w)}),p.push({key:S.key,span:w,descriptor:S}),w}let m=document.createElement("input");m.type="text",m.className="prop-input",m.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(m);let h=null,b=null;function N(S,w){h&&h!==S&&M(),h=S,b=w,m.dataset.key=S.key;let ye=r.get(S.key)??S.defaultValue;m.value=D(ye);let ne=0,st=0,Je=w;for(;Je&&Je!==a;)ne+=Je.offsetLeft,st+=Je.offsetTop,Je=Je.offsetParent;m.style.display="block",m.style.left=`${ne}px`,m.style.top=`${st}px`;let Li=w.getBoundingClientRect();m.style.width=`${Math.max(40,Li.width+10)}px`,m.focus(),m.select()}function M(){if(!h||!b)return;let S=m.value.trim(),w=h,ye=b,ne,st=parseFloat(S),Je=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(st)?Je.has(S)?ne=S:ne=r.get(w.key)??w.defaultValue:ne=S.match(/(px|rem|em|%|vw|vh|ch)$/)?S:`${st}px`,r.set(w.key,ne),ye.textContent=D(ne),ye.style.background="transparent",m.style.display="none",m.dataset.key="",h=null,b=null,n(w.key,ne),o()}m.addEventListener("keydown",S=>{if(S.key==="Enter")M();else if(S.key==="Escape"){if(h&&b){let w=r.get(h.key)??h.defaultValue;b.textContent=D(w)}m.style.display="none",m.dataset.key="",h=null,b=null}}),m.addEventListener("blur",()=>{M()});function D(S){let w=parseFloat(S);return isNaN(w)?S:w===Math.round(w)?String(Math.round(w)):S}function I(S){let w=document.createElement("span");return w.textContent=S,w.style.cssText=`
      font-size:9px;
      color:${s.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),w}function W(S,w){return i.find(ye=>ye.layer===S&&ye.side===w)}function E(S,w){let ye=W(S,w);if(!ye){let ne=document.createElement("span");return ne.textContent="-",ne.style.cssText=`text-align:center; color:${s.textTertiary};`,ne}return f(ye.descriptor)}let P=E("padding","top");P.style.gridRow="1",P.style.gridColumn="2",P.style.textAlign="center";let ce=E("padding","left");ce.style.gridRow="2",ce.style.gridColumn="1";let de=E("padding","right");de.style.gridRow="2",de.style.gridColumn="3";let R=E("padding","bottom");R.style.gridRow="3",R.style.gridColumn="2",R.style.textAlign="center",u.style.gridRow="2",u.style.gridColumn="2",c.appendChild(P),c.appendChild(ce),c.appendChild(u),c.appendChild(de),c.appendChild(R);let Y=document.createElement("div");Y.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let y=E("margin","top");y.style.gridRow="1",y.style.gridColumn="2",y.style.textAlign="center";let T=E("margin","left");T.style.gridRow="2",T.style.gridColumn="1";let V=E("margin","right");V.style.gridRow="2",V.style.gridColumn="3";let Q=E("margin","bottom");Q.style.gridRow="3",Q.style.gridColumn="2",Q.style.textAlign="center";let ee=document.createElement("div");ee.style.cssText="grid-row:2; grid-column:2;",ee.appendChild(c),Y.appendChild(y),Y.appendChild(T),Y.appendChild(ee),Y.appendChild(V),Y.appendChild(Q);let Gn=I("margin"),fs=I("padding"),jn=document.createElement("div");return jn.style.cssText="display:flex; gap:8px; padding:0 4px;",jn.appendChild(Gn),jn.appendChild(fs),d.appendChild(Y),l.appendChild(d),a.appendChild(jn),a.appendChild(l),{element:a,setValue(S,w){if(!$a(S))return;r.set(S,w);let ne=p.find(st=>st.key===S);ne&&(ne.span.textContent=D(w))},destroy(){}}}U();var lo=new Set;function Aa(e){return lo.has(e)}var so=[];function Ha(e){return so.push(e),()=>{let t=so.indexOf(e);t>=0&&so.splice(t,1)}}var Pc={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},$c={"number-scrub":ka,segmented:Ra,"color-swatch":Pa,"box-model":Oa},Oc=`
  .prop-section {
    border-bottom: 1px solid ${s.border};
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
    background: ${s.bgSecondary};
    cursor: pointer;
    user-select: none;
    font-family: ${x};
    font-size: 11px;
    font-weight: 600;
    color: ${s.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .prop-section-header:hover {
    background: ${s.bgTertiary};
  }
  .prop-section-chevron {
    width: 12px;
    height: 12px;
    transition: transform 150ms ease;
    color: ${s.textTertiary};
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
    background: ${s.bgTertiary};
    border: 1px solid ${s.border};
    border-radius: ${L.xs};
    padding: 4px 6px;
    font-family: ${x};
    font-size: 11px;
    color: ${s.textPrimary};
    outline: none;
    box-sizing: border-box;
    transition: border-color ${C.fast}, box-shadow ${C.fast};
  }
  .prop-input:hover {
    border-color: ${s.borderStrong};
  }
  .prop-input:focus {
    border-color: ${s.accent};
    box-shadow: 0 0 0 2px ${s.focusRing};
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
    color: ${s.textTertiary};
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
    color: ${s.textTertiary};
    cursor: pointer;
    text-align: center;
    user-select: none;
  }
  .prop-show-all:hover {
    color: ${s.accent};
  }
`;function Ac(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function Hc(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function Ic(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}var Dc=new Set(["flexDirection","justifyContent","alignItems","gap"]);function _c(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function Fr(e,t,n,o,r){let i=document.createElement("div");i.className="prop-sections";let a=document.createElement("style");a.textContent=Oc,i.appendChild(a);let l=[],d=Hc(e);for(let[c,u]of d){let p=c==="layout"&&!_c(t)?u.filter(M=>!Dc.has(M.key)):u;if(p.length===0)continue;let f=document.createElement("div");f.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${Pc[c]}</span>${Ac()}`;let h=document.createElement("div");h.className="prop-section-body";let b=lo.has(c);if(b){let M=m.querySelector(".prop-section-chevron");M&&M.classList.add("collapsed"),h.classList.add("collapsed")}m.addEventListener("click",()=>{if(b=!b,b)lo.add(c);else{lo.delete(c);for(let D of so)D(c)}let M=m.querySelector(".prop-section-chevron");M&&M.classList.toggle("collapsed",b),h.classList.toggle("collapsed",b)}),f.appendChild(m);let N=Ic(p);for(let M of N){let D=$c[M.controlType];if(!D)continue;let I=D(M.descriptors,t,n,o);if(M.descriptors.length>1||M.controlType==="box-model")h.appendChild(I.element);else{let W=document.createElement("div");W.className="prop-control-row";let E=document.createElement("span");E.className="prop-control-label",E.textContent=M.descriptors[0].label,E.title=M.descriptors[0].label;let P=document.createElement("div");P.className="prop-control-value",P.appendChild(I.element),W.appendChild(E),W.appendChild(P),h.appendChild(W)}l.push(I)}f.appendChild(h),i.appendChild(f)}if(r){let c=document.createElement("div");c.className="prop-show-all",c.textContent="Show all properties",c.addEventListener("click",r),i.appendChild(c)}return{container:i,controls:l}}U();var Fc=300,Ia=260,Da=380,_a="frameup-sidebar-width",Vc=4,zc=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${s.bgPrimary};
    border-left: 1px solid ${s.border};
    box-shadow: ${$.lg};
    z-index: 2147483645;
    font-family: ${x};
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform ${C.settle};
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
    width: ${Vc}px;
    cursor: col-resize;
    z-index: 1;
  }
  .prop-sidebar-resize:hover,
  .prop-sidebar-resize.active {
    background: ${s.accent};
    opacity: 0.3;
  }
  .prop-sidebar-header {
    padding: 12px 16px;
    border-bottom: 1px solid ${s.border};
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
    color: ${s.textTertiary};
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${L.sm};
  }
  .prop-sidebar-close:hover {
    background: ${s.bgTertiary};
    color: ${s.textPrimary};
  }
  .prop-sidebar-component-name {
    font-size: 13px;
    font-weight: 600;
    color: ${s.textPrimary};
    margin: 0 0 4px;
    line-height: 1.3;
  }
  .prop-sidebar-file-path {
    font-size: 11px;
    color: ${s.textTertiary};
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
    background: ${s.accent};
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
    background: ${s.dangerSoft};
    border-bottom: 1px solid ${s.danger};
    font-family: ${x};
    font-size: 11px;
    color: ${s.danger};
    flex-shrink: 0;
  }
  .prop-sidebar-warning-text {
    flex: 1;
    font-weight: 500;
  }
  .prop-sidebar-warning-btn {
    border: 1px solid ${s.danger};
    background: none;
    color: ${s.danger};
    font-family: ${x};
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: ${L.xs};
    cursor: pointer;
    white-space: nowrap;
  }
  .prop-sidebar-warning-btn:hover {
    background: ${s.danger};
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
    background: ${s.borderStrong};
    border-radius: 3px;
  }
`;function Bc(){try{let e=localStorage.getItem(_a);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=Ia&&t<=Da)return t}}catch{}return Math.min(Fc,Math.floor(window.innerWidth*.22))}function Wc(e){try{localStorage.setItem(_a,String(e))}catch{}}function Fa(e,t){let n=document.createElement("style");n.textContent=zc,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${Bc()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let l=document.createElement("div");l.className="prop-sidebar-component-name";let d=document.createElement("span");d.className="prop-sidebar-saving-dot";let c=document.createElement("div");c.className="prop-sidebar-file-path",a.appendChild(l),a.appendChild(c);let u=document.createElement("button");u.className="prop-sidebar-close",u.title="Collapse panel",u.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="8,2 4,6 8,10"/></svg>',i.appendChild(a),i.appendChild(u),o.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",o.appendChild(p);let f=document.createElement("div");f.className="prop-sidebar-content",o.appendChild(f),e.appendChild(o);let m=!1,h=0,b=0;r.addEventListener("pointerdown",R=>{R.preventDefault(),R.stopPropagation(),m=!0,h=R.clientX,b=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(R.pointerId)}),r.addEventListener("pointermove",R=>{if(!m)return;let Y=h-R.clientX,y=Math.max(Ia,Math.min(Da,b+Y));o.style.width=`${y}px`});let N=()=>{m&&(m=!1,r.classList.remove("active"),Wc(o.offsetWidth))};r.addEventListener("pointerup",N),r.addEventListener("pointercancel",N),o.addEventListener("pointerdown",R=>R.stopPropagation()),o.addEventListener("mousedown",R=>R.stopPropagation()),o.addEventListener("click",R=>R.stopPropagation()),o.addEventListener("mouseup",R=>R.stopPropagation()),u.addEventListener("click",()=>{I(),t&&t()});let M=!1;function D(R,Y,y,T){l.textContent=`<${R}>`,l.appendChild(d),c.textContent=`${Y}:${y}`,c.title=`${Y}:${y}`,f.innerHTML="",f.appendChild(T),M||(M=!0,o.offsetHeight,o.classList.add("visible"))}function I(){M&&(M=!1,o.classList.remove("visible"))}function W(R){f.innerHTML="",f.appendChild(R)}function E(R,Y,y){p.innerHTML="";let T=document.createElement("span");T.className="prop-sidebar-warning-text",T.textContent=R;let V=document.createElement("button");V.className="prop-sidebar-warning-btn",V.textContent=Y,V.addEventListener("click",Q=>{Q.stopPropagation(),y()}),p.appendChild(T),p.appendChild(V),p.style.display="flex"}function P(){p.style.display="none",p.innerHTML=""}function ce(){d.classList.add("active")}function de(){d.classList.remove("active")}return{show:D,hide:I,isVisible:()=>M,getElement:()=>o,replaceContent:W,showWarning:E,clearWarning:P,showSaving:ce,hideSaving:de}}U();var Dt=new Map,ot=!1,xn=[];function ei(e){return xn.push(e),()=>{xn=xn.filter(t=>t!==e)}}function En(){xn.forEach(e=>e())}var qc=3e3;function Zc(e,t){let n=Array.from(Dt.values());for(let o=n.length-1;o>=0;o--){let r=n[o];if(r.type==="property"&&r.state==="active"&&r.propertyKey===t&&r.elementIdentity&&r.elementIdentity.filePath===e.filePath&&r.elementIdentity.lineNumber===e.lineNumber&&r.elementIdentity.columnNumber===e.columnNumber&&Date.now()-r.timestamp<qc)return r}return null}function Ue(e){let t=crypto.randomUUID(),n={...e,id:t,timestamp:Date.now()};return Dt.set(t,n),En(),t}function Ya(e,t,n,o){let r=Zc(t,n);return r?(r.timestamp=Date.now(),r.summary=e.summary,r.revertData.type==="cliUndo"&&r.revertData.undoIds.push(o),En(),r.id):Ue(e)}function Jc(e){let t=Dt.get(e);if(!(!t||t.state==="reverted")){switch(t.revertData.type){case"cliUndo":case"generateUndo":pe({type:"revertChanges",undoIds:t.revertData.undoIds});break;case"moveRemove":{let{moveId:n}=t.revertData;Promise.resolve().then(()=>(me(),Qr)).then(({removeMove:o})=>{o(n)});break}case"annotationRemove":{let{annotationId:n,originalInnerHTML:o}=t.revertData;Promise.resolve().then(()=>(me(),Qr)).then(({removeAnnotation:r})=>{r(n)});break}}t.state="reverted",En()}}function ti(){let e=0;for(let t of Dt.values())t.state!=="reverted"&&e++;return e}function Tn(){return ot}function wn(e){ot=e,En()}function Qc(){Dt.clear(),En()}var le=null,it=null,Ye=null,yt=null,Co=null,rt=null,Cn=null,ed=`
  .changelog-panel {
    position: fixed;
    top: 16px;
    right: 16px;
    bottom: 16px;
    width: 380px;
    max-width: min(380px, calc(100vw - 32px));
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    border-radius: ${L.lg};
    box-shadow: ${$.lg};
    z-index: 2147483646;
    display: flex;
    flex-direction: column;
    font-family: ${x};
    font-size: 12px;
    user-select: none;
    opacity: 0;
    transform: translateX(16px);
    transition: opacity ${C.settle}, transform ${C.settle};
    overflow: hidden;
  }
  .changelog-panel.visible {
    opacity: 1;
    transform: translateX(0);
  }
  .changelog-panel.collapsed {
    bottom: auto;
    width: 320px;
  }
  .changelog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    cursor: pointer;
    gap: 10px;
    border-bottom: 1px solid ${s.border};
    background: ${s.bgSecondary};
    transition: background ${C.fast};
    flex-shrink: 0;
  }
  .changelog-header:hover {
    background: ${s.bgTertiary};
  }
  .changelog-header-main {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex: 1;
  }
  .changelog-header-icon {
    width: 18px;
    height: 18px;
    color: ${s.accent};
    flex-shrink: 0;
  }
  .changelog-title {
    font-size: 13px;
    font-weight: 600;
    color: ${s.textPrimary};
  }
  .changelog-badge {
    background: ${s.accent};
    color: #ffffff;
    font-size: 10px;
    font-weight: 600;
    font-family: ${x};
    padding: 1px 6px;
    border-radius: 9999px;
    line-height: 16px;
  }
  .changelog-badge.hidden {
    display: none;
  }
  .changelog-header-copy {
    color: ${s.textTertiary};
    font-size: 11px;
  }
  .changelog-chevron {
    width: 14px;
    height: 14px;
    color: ${s.textTertiary};
    transition: transform ${C.medium};
    flex-shrink: 0;
  }
  .changelog-panel:not(.collapsed) .changelog-chevron {
    transform: rotate(180deg);
  }
  .changelog-body {
    flex: 1;
    overflow-y: auto;
    background: ${s.bgPrimary};
  }
  .changelog-panel.collapsed .changelog-body {
    display: none;
  }
  .changelog-entry {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    min-height: 38px;
    border-bottom: 1px solid ${s.border};
    transition: background ${C.fast};
  }
  .changelog-entry:last-child {
    border-bottom: none;
  }
  .changelog-entry:hover {
    background: ${s.bgTertiary};
  }
  .changelog-entry.reverted {
    opacity: 0.5;
  }
  .changelog-entry.reverted .entry-summary {
    text-decoration: line-through;
  }
  .changelog-entry.pending .entry-summary {
    font-style: italic;
  }
  .entry-summary {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${s.textSecondary};
    min-width: 0;
    line-height: 1.3;
  }
  .component-name {
    color: ${s.textPrimary};
    font-weight: 600;
  }
  .arrow {
    color: ${s.textTertiary};
  }
  .entry-file {
    color: ${s.textTertiary};
    flex-shrink: 0;
    font-size: 11px;
    max-width: 96px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .entry-time {
    color: ${s.textTertiary};
    flex-shrink: 0;
    font-size: 11px;
    min-width: 48px;
    text-align: right;
  }
  .entry-revert {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    color: ${s.accent};
    font-size: 14px;
    border-radius: ${L.xs};
    opacity: 0;
    transition: opacity ${C.fast}, background ${C.fast};
  }
  .changelog-entry:hover .entry-revert {
    opacity: 1;
  }
  .entry-revert:hover {
    background: ${s.accentSoft};
  }
  .changelog-entry.reverted .entry-revert {
    display: none;
  }
  .changelog-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
    padding: 16px;
    color: ${s.textTertiary};
    text-align: center;
  }
`;function td(e){let t=Math.floor((Date.now()-e)/1e3);if(t<10)return"just now";let n=Math.floor(t/60),o=t%60;return`${n}:${String(o).padStart(2,"0")} ago`}function nd(e){return e.split("/").pop()??e}function ht(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ja(){if(!it)return;let e=Array.from(Dt.values()).reverse();if(e.length===0){it.innerHTML='<div class="changelog-empty">No logs yet. Changes will appear here.</div>';return}it.innerHTML=e.map(n=>{let o=["changelog-entry",n.state==="reverted"?"reverted":"",n.state==="pending"?"pending":""].filter(Boolean).join(" "),r=ht(n.summary),i=n.summary.indexOf(" \u2192 "),a;if(i!==-1){let c=ht(n.summary.slice(0,i)),u=ht(n.summary.slice(i+3)),p=c.indexOf(" ");if(p!==-1){let f=c.slice(0,p),m=c.slice(p);a=`<span class="component-name">${f}</span>${ht(m)}<span class="arrow"> \u2192 </span>${u}`}else a=`<span class="component-name">${c}</span><span class="arrow"> \u2192 </span>${u}`}else a=r;let l=n.filePath?nd(n.filePath):"",d=td(n.timestamp);return`<div class="${o}" data-entry-id="${ht(n.id)}">
  <span class="entry-summary">${a}</span>
  ${l?`<span class="entry-file" title="${ht(l)}">${ht(l)}</span>`:""}
  <span class="entry-time">${d}</span>
  <button class="entry-revert" title="Revert this change">\u21A9</button>
</div>`}).join("");let t=Array.from(it.querySelectorAll(".entry-revert"));for(let n of t){let r=n.closest(".changelog-entry")?.dataset.entryId;r&&n.addEventListener("click",i=>{i.stopPropagation(),Jc(r)})}}function od(){if(!Ye)return;let e=ti();e===0?Ye.classList.add("hidden"):(Ye.classList.remove("hidden"),Ye.textContent=String(e))}function Ua(e){Cn=document.createElement("style"),Cn.textContent=ed,e.appendChild(Cn),le=document.createElement("div"),le.className="changelog-panel",le.style.display="none";let t=document.createElement("div");t.className="changelog-header";let n=document.createElement("div");n.className="changelog-header-main";let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.classList.add("changelog-header-icon"),o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.7"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.innerHTML='<path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path>';let r=document.createElement("span");r.className="changelog-title",r.textContent="Logs",Ye=document.createElement("span"),Ye.className="changelog-badge hidden",Ye.textContent="0";let i=document.createElement("span");i.className="changelog-header-copy",i.textContent="Latest changes",yt=document.createElement("svg"),yt.className="changelog-chevron",yt.setAttribute("viewBox","0 0 16 16"),yt.setAttribute("fill","currentColor"),yt.innerHTML='<path d="M3.5 5.5L8 10l4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',n.appendChild(o),n.appendChild(r),n.appendChild(Ye),n.appendChild(i),t.appendChild(n),t.appendChild(yt),t.addEventListener("click",()=>wn(!ot)),le.appendChild(t),it=document.createElement("div"),it.className="changelog-body",le.appendChild(it),e.appendChild(le);let a=ei(()=>{ja(),od(),le&&(ot&&le.style.display==="none"?(le.style.display="",requestAnimationFrame(()=>{requestAnimationFrame(()=>{le?.classList.add("visible")})})):ot||(le.style.display="none",le.classList.remove("visible")),le.classList.toggle("collapsed",!ot),ot&&rt===null?rt=window.setInterval(()=>{ja()},1e4):!ot&&rt!==null&&(clearInterval(rt),rt=null))});Co=be(d=>{if(d.type==="revertComplete")for(let c of d.results)!c.success&&c.error&&X(`Revert failed: ${c.error}`)});let l=Eo;Eo=()=>{l(),a()}}var Eo=()=>{};function Xa(){rt!==null&&(clearInterval(rt),rt=null),Co&&(Co(),Co=null),Eo(),Eo=()=>{},le?.remove(),le=null,Cn?.remove(),Cn=null,it=null,Ye=null,yt=null,Qc(),xn=[]}me();U();var Ka="frameup-onboarding-dismissed",Re=null;function qa(){if(localStorage.getItem(Ka))return;let e=q();if(!e)return;Re=document.createElement("div"),Re.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: ${s.bgSecondary};
    font-family: ${x};
    font-size: 12px;
    color: ${s.textSecondary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${C.medium};
    pointer-events: auto;
  `;let t=document.createElement("span");t.textContent="Click any element to edit its properties. Double-click text to edit it.";let n=document.createElement("span");n.textContent="\xD7",n.style.cssText=`
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 0 4px;
    color: ${s.textTertiary};
  `,n.addEventListener("click",()=>Sn()),Re.appendChild(t),Re.appendChild(n),e.appendChild(Re),requestAnimationFrame(()=>{Re&&(Re.style.opacity="1")})}function Sn(){Re&&(localStorage.setItem(Ka,"1"),Re.style.opacity="0",setTimeout(()=>{Re?.remove(),Re=null},150))}dt();kt();var ni=new Map(He.map(e=>[e.key,e]));var rd=new Set(["layout","spacing","size"]),Za=new Set(["typography","background"]),id=new Set(["h1","h2","h3","h4","h5","h6","p","span","a","button","label","li","td","th","blockquote","figcaption"]);function Qa(e){let t=new Set(["spacing","size","background"]),o=getComputedStyle(e).display;(o==="flex"||o==="inline-flex"||o==="grid"||o==="inline-grid"||e.children.length>0)&&t.add("layout");let r=e.tagName.toLowerCase();return(Array.from(e.childNodes).some(a=>a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()??"").length>0)||id.has(r))&&t.add("typography"),t}var ad=5e3,g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1},bt=[],B,Ja,Ce=null,ld=300,we=null,Mn=null,_t=null,To=null,wo=new MutationObserver(()=>{g.selectedElement&&!document.contains(g.selectedElement)&&(clearTimeout(Ja),Ja=setTimeout(()=>{sd()},80))});function sd(){let e=g.elementIdentity,t=g.componentInfo;if(!e||!t){vt();return}let n=cd(e);if(n){Ft(n,t);return}dd(e).then(o=>{o?Ft(o,t):vt()})}function cd(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);for(;o;){if(ve(o)){let r=o._debugSource,i=ae(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function dd(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);if(!o)continue;let r=await Oe(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let l="";if(i.fileName){let d=Ne(i.fileName);Ae(d)&&(l=d)}if(l&&e.filePath.endsWith(l)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}function ud(e,t){let n=getComputedStyle(e),o=new Map;for(let r of He){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function pd(e){if(!g.selectedElement)return;let t=getComputedStyle(g.selectedElement);for(let n of He){if(n.group!==e||g.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;g.currentValues.set(n.key,r),g.originalValues.get(n.key)===n.defaultValue&&g.originalValues.set(n.key,r);for(let i of bt)i.setValue(n.key,r)}}function Ln(){for(let e of bt)e.destroy();bt=[]}function oi(){if(!g.selectedElement||!g.componentInfo)return;Ln();let e=g.showAllGroups?null:Qa(g.selectedElement),t=e?He.filter(a=>e.has(a.group)):He,o=e!==null&&t.length<He.length?()=>ol(!0):void 0,{container:r,controls:i}=Fr(t,g.currentValues,Nn,So,o);bt=i,B.replaceContent(r)}function So(){Ce&&clearTimeout(Ce),Ce=setTimeout(()=>{Ce=null,ii()},ld)}function ri(){Ce&&(clearTimeout(Ce),Ce=null),_t&&(_t(),_t=null),we&&(clearTimeout(we.timeoutId),we=null),g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1}}function el(e){B=Fa(e,()=>{Mo(),Ln(),ri()}),Pi((t,n,o)=>{if(B&&B.hideSaving(),we)if(clearTimeout(we.timeoutId),t)we=null;else{let{batch:r,previousOriginals:i}=we;we=null;for(let[a]of r){let l=i.get(a);l!==void 0&&g.originalValues.set(a,l)}if(g.selectedElement){for(let[a]of r){g.selectedElement.style[a]="",g.activeOverrides.delete(a);let l=g.originalValues.get(a);l!==void 0&&g.currentValues.set(a,l)}for(let a of bt)for(let[l]of r){let d=g.originalValues.get(l);d!==void 0&&a.setValue(l,d)}}if(B){let l={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";B.showWarning(l,"Dismiss",()=>B.clearWarning())}}else if(!t&&B){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";B.showWarning(i,"Dismiss",()=>B.clearWarning())}}),To=be(t=>{if(t.type==="updatePropertyComplete"&&t.success&&t.undoId&&Mn){let{componentInfo:n,batch:o}=Mn,r={componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber,columnNumber:n.columnNumber,tagName:n.tagName};for(let i of o)Ya({type:"property",componentName:n.componentName,filePath:n.filePath,summary:`${i.cssProperty}: ${i.originalValue} \u2192 ${i.value}`,state:"active",propertyKey:i.cssProperty,elementIdentity:r,revertData:{type:"cliUndo",undoIds:[t.undoId]}},r,i.cssProperty,t.undoId);Mn=null}})}function Ft(e,t){g.pendingBatch.size>0&&ii(),Sn(),Ln(),g.showAllGroups=!1,g.selectedElement=e,g.componentInfo=t,g.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(rd);for(let u of Za)Aa(u)||n.add(u);let o=ud(e,n);g.currentValues=o,g.originalValues=new Map(o),g.activeOverrides=new Map,g.pendingBatch=new Map,_t&&_t(),_t=Ha(u=>{Za.has(u)&&pd(u)});let r=g.showAllGroups?null:Qa(e),i=r?He.filter(u=>r.has(u.group)):He,l=r!==null&&i.length<He.length?()=>ol(!0):void 0,{container:d,controls:c}=Fr(i,g.currentValues,Nn,So,l);bt=c,wo.disconnect(),wo.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),B.show(t.componentName,t.filePath,t.lineNumber,d)}function Nn(e,t){let n=ni.get(e);if(!n||!g.selectedElement)return;g.selectedElement.style[n.key]=t,g.activeOverrides.set(e,t),g.currentValues.set(e,t);let o=qt(),r=n.tailwindScale+"Reverse",i=o[r],a=i?Yn(t,i):null;if(!a&&n.enumValues){let l=n.enumValues.find(d=>d.value===t);l&&(a=l.tailwindValue)}if(g.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:g.originalValues.get(e)||n.defaultValue}),e==="display")if(oi(),t==="none"){let l=g.originalValues.get("display")||"block";B.showWarning("Element hidden","Restore",()=>{g.selectedElement&&(g.selectedElement.style.display=l),g.activeOverrides.delete("display"),g.currentValues.set("display",l),g.pendingBatch.delete("display"),oi(),B.clearWarning()})}else B.clearWarning()}function ii(){if(g.pendingBatch.size===0||!g.componentInfo)return;let e=g.componentInfo.filePath,t=g.componentInfo.lineNumber,n=g.componentInfo.columnNumber-1;if(Mn={componentInfo:{...g.componentInfo},batch:[...g.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,originalValue:a.originalValue,value:a.value}))},g.pendingBatch.size===1){let a=[...g.pendingBatch.values()][0],l=ni.get(a.property);pe({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:n,...a,framework:"tailwind",classPattern:l?.classPattern,standalone:l?.standalone})}else pe({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:n,updates:[...g.pendingBatch.values()].map(a=>{let l=ni.get(a.property);return{...a,classPattern:l?.classPattern,standalone:l?.standalone}}),framework:"tailwind"});g.selectedElement&&g.elementIdentity&&hn({type:"propertyChange",elementIdentity:g.elementIdentity,element:g.selectedElement,overrides:[...g.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),B&&B.showSaving();let o=new Map;for(let[a]of g.pendingBatch)o.set(a,g.originalValues.get(a)||"");for(let[a,l]of g.pendingBatch)g.originalValues.set(a,l.value);let r=new Map(g.pendingBatch),i=setTimeout(()=>{we&&we.batch===r&&(we=null,B&&B.hideSaving())},ad);we={batch:r,previousOriginals:o,timeoutId:i},g.pendingBatch.clear()}function Mo(){if(g.selectedElement){for(let[e]of g.activeOverrides)g.selectedElement.style[e]="";for(let[e,t]of g.originalValues)g.currentValues.set(e,t);for(let e of bt)for(let[t,n]of g.originalValues)e.setValue(t,n);g.activeOverrides.clear(),g.pendingBatch.clear()}}function vt(){Ce&&(clearTimeout(Ce),Ce=null),wo.disconnect(),Mo(),Ln(),B&&B.hide(),ri()}function tl(){Ce&&(clearTimeout(Ce),Ce=null),wo.disconnect(),ii(),Ln(),B&&B.hide(),ri()}function nl(){return g.activeOverrides.size>0}function ol(e){g.showAllGroups=e,oi()}function rl(){To&&(To(),To=null),Mn=null,vt()}var xt=null;function il(e,t){if(!xt)return;let n=performance.now(),o=Math.abs(e-xt.clientX),r=Math.abs(t-xt.clientY),i=o<=2&&r<=2,a=n-xt.timestamp<16;if(i||a)return xt.element}function al(e,t,n){xt={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function Vt(){xt=null}me();U();var md=.1,fd=5,gd=.002,hd=24,ll=1,yd="rgba(0,0,0,0.15)",J=null,Pe=null,ai=null,cl=[],dl=[];var li="",si="";function bd(){li=document.body.style.background||document.body.style.backgroundColor||"",si=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",J=document.createElement("div"),J.setAttribute("data-frameup-canvas-wrapper","true"),J.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${n};
  `.trim().replace(/\n\s*/g," "),Pe=document.createElement("div"),Pe.setAttribute("data-frameup-dot-bg","true"),Pe.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${s.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="frameup-root"||r.hasAttribute("data-frameup-interaction")||r.hasAttribute("data-frameup-placeholder")||r.hasAttribute("data-frameup-annotation")||r.hasAttribute("data-frameup-dot-bg")||r.hasAttribute("data-frameup-canvas-wrapper"))||(cl.push(r),J.appendChild(r));J.style.position="relative",J.style.zIndex="1",document.body.insertBefore(Pe,document.body.firstChild),document.body.insertBefore(J,Pe.nextSibling),ai=bn(sl),sl(),dl.forEach(r=>r(J))}function sl(){if(!J||!Pe)return;let{scale:e,offsetX:t,offsetY:n}=De();J.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=hd*e,r=t%o,i=n%o;Pe.style.backgroundImage=`radial-gradient(circle, ${yd} ${ll}px, transparent ${ll}px)`,Pe.style.backgroundSize=`${o}px ${o}px`,Pe.style.backgroundPosition=`${r}px ${i}px`}function vd(e,t,n){let{scale:o,offsetX:r,offsetY:i}=De(),a=Math.min(fd,Math.max(md,o+n));if(a===o)return;let l=(e-r)/o,d=(t-i)/o,c=e-l*a,u=t-d*a;yn(a,c,u)}function ul(e){e.preventDefault();let t=-e.deltaY*gd,{scale:n}=De(),o=t*n;vd(e.clientX,e.clientY,o)}function pl(e,t){let{scale:n,offsetX:o,offsetY:r}=De();yn(n,o+e,r+t)}function ml(){yn(1,0,0)}function fl(){return J!==null}function gl(){J?ci():bd()}function ci(){if(dl.forEach(e=>e(null)),ai?.(),ai=null,J){for(;J.firstChild;)document.body.insertBefore(J.firstChild,J);J.remove(),J=null}Pe?.remove(),Pe=null,cl=[],document.body.style.background=li,document.documentElement.style.background=si,li="",si=""}dt();kt();U();me();me();function Bt(e,t){return e.length>t?e.slice(0,t)+"\u2026":e}var xd=new Set(["IMG","INPUT","VIDEO","IFRAME","CANVAS","SELECT","TEXTAREA","HR","BR","EMBED","OBJECT","PROGRESS"]),j=null,Ct="",kn="",Lo="",Ee=null,di="",ui=null,zt=null;function No(){return j!==null}function hl(){document.addEventListener("dblclick",bl,!0),document.addEventListener("mousedown",Cl,!0),ui=be(e=>{e.type==="updateTextComplete"&&Cd(e)})}function yl(){j&&Tl(),document.removeEventListener("dblclick",bl,!0),document.removeEventListener("mousedown",Cl,!0),ui?.(),ui=null}function Cd(e){if(e.success&&e.undoId&&zt){let t=zt;Ue({type:"textEdit",componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,summary:`"${Bt(t.originalText,20)}" \u2192 "${Bt(t.newText,20)}"`,state:"active",revertData:{type:"cliUndo",undoIds:[e.undoId]}})}else if(!e.success&&e.reason==="no-match"&&zt){let t=zt,n={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,originalText:t.originalText,newText:t.newText},o={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};bo(n,o,t.originalInnerHTML),Ue({type:"textAnnotation",componentName:n.componentName,filePath:n.filePath||"",summary:`"${Bt(n.originalText,20)}" \u2192 "${Bt(n.newText,20)}"`,state:"pending",revertData:{type:"annotationRemove",annotationId:n.id,originalInnerHTML:t.originalInnerHTML,elementIdentity:o}})}zt=null}function Ed(e){return!!(e.scrollHeight>e.clientHeight+4||e.querySelector("br")||getComputedStyle(e).whiteSpace!=="nowrap"&&e.getClientRects().length>1)}async function Td(e){let t=oe(e);if(!t)return null;try{let n=await Oe(t);if(n&&n.length>0)for(let o of n){if(!o.functionName)continue;let r=o.functionName;if(r[0]!==r[0].toUpperCase()||Ge(r))continue;let i="";if(o.fileName){let a=Ne(o.fileName);Ae(a)&&(i=a)}return{tagName:e.tagName.toLowerCase(),componentName:r,filePath:i,lineNumber:o.lineNumber??0,columnNumber:o.columnNumber??0,stack:[],boundingRect:e.getBoundingClientRect()}}}catch{}try{let n=t;for(;n;){if(ve(n)){let o=ae(n.type),r=n._debugSource||n._debugOwner?._debugSource;if(o&&o[0]===o[0].toUpperCase()&&!Ge(o)&&r)return{tagName:e.tagName.toLowerCase(),componentName:o,filePath:r.fileName||"",lineNumber:r.lineNumber||0,columnNumber:r.columnNumber||0,stack:[],boundingRect:e.getBoundingClientRect()}}if(!n.return)break;n=n.return}}catch{}return null}function bl(e){j&&Et();let t=null,n=e.target;n instanceof HTMLElement&&n!==document.documentElement&&n!==document.body&&!n.hasAttribute("data-frameup-interaction")&&!n.closest("#frameup-root")?t=n:t=Pn(e.clientX,e.clientY),t&&(xd.has(t.tagName)||t.textContent?.trim()&&(e.preventDefault(),wd(t)))}function wd(e){j=e,Ct=e.textContent||"",kn=e.innerHTML,Lo=Ct,Ee=null,Td(e).then(n=>{j===e&&(Ee=n)}),di=e.style.outline,e.style.outline=`2px solid ${s.accent}`,e.contentEditable="true",wl(!1),e.focus();let t=window.getSelection();if(t){t.removeAllRanges();let n=document.createRange();n.selectNodeContents(e),n.collapse(!1),t.addRange(n)}e.addEventListener("blur",xl),e.addEventListener("keydown",El),e.addEventListener("input",vl)}function vl(){j&&(Lo=j.textContent||"")}function xl(){Et()}function Cl(e){if(!j)return;let t=e.target;if(t instanceof Node&&(t===j||j.contains(t)))return;if((t instanceof HTMLElement?t:null)?.closest("#frameup-root")){Et();return}let o=Sd(e);if(o&&ut(o)){e.preventDefault(),e.stopPropagation(),Et({nextSelection:o,reselectEditedElement:!1});return}e.preventDefault(),e.stopPropagation(),Et({clearSelection:!0,reselectEditedElement:!1})}function El(e){if(e.key==="Escape"){e.preventDefault(),Et();return}if(e.key==="Enter"&&j&&!Ed(j)){e.preventDefault(),Et();return}e.stopPropagation()}function Sd(e){let t=e.target;return t instanceof HTMLElement&&t!==document.documentElement&&t!==document.body&&!t.hasAttribute("data-frameup-interaction")&&!t.closest("#frameup-root")?t:Pn(e.clientX,e.clientY)}function Et(e){if(!j)return;let t=Lo;if(t!==Ct&&Ee)if(Ee.filePath)zt={componentInfo:Ee,originalText:Ct,newText:t,originalInnerHTML:kn,tagName:Ee.tagName},pe({type:"updateText",filePath:Ee.filePath,lineNumber:Ee.lineNumber,columnNumber:Ee.columnNumber,originalText:Ct,newText:t});else{let r={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:Ee.componentName,filePath:"",lineNumber:0,columnNumber:0,originalText:Ct,newText:t},i={componentName:Ee.componentName,filePath:"",lineNumber:0,columnNumber:0,tagName:Ee.tagName};bo(r,i,kn),Ue({type:"textAnnotation",componentName:r.componentName,filePath:r.filePath||"",summary:`"${Bt(r.originalText,20)}" \u2192 "${Bt(r.newText,20)}"`,state:"pending",revertData:{type:"annotationRemove",annotationId:r.id,originalInnerHTML:kn,elementIdentity:i}})}let o=j;if(Tl(),e?.nextSelection&&document.contains(e.nextSelection)){Rn(e.nextSelection,{skipSidebar:!1});return}if(e?.clearSelection){Xe();return}e?.reselectEditedElement!==!1&&o&&document.contains(o)&&Rn(o,{skipSidebar:!1})}function Tl(){j&&(j.removeEventListener("blur",xl),j.removeEventListener("keydown",El),j.removeEventListener("input",vl),j.removeAttribute("contenteditable"),j.style.outline=di,ko(gn()),j=null,Ct="",kn="",Lo="",Ee=null,di="")}me();var O=null,On=null,pi=new Map,Ke=!1,Wt=0,$n=0,Sl="";function Ml(e,t){pi.set(e,t)}function Ll(){O=document.createElement("div"),O.setAttribute("data-frameup-interaction","true"),O.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(O),document.addEventListener("scroll",Vt,!0),O.addEventListener("mousedown",e=>{if(Ke){Wt=e.clientX,$n=e.clientY,O&&(O.style.cursor="grabbing"),e.preventDefault();return}On?.onMouseDown?.(e)}),O.addEventListener("mousemove",e=>{if(Ke&&Wt!==0){pl(e.clientX-Wt,e.clientY-$n),Wt=e.clientX,$n=e.clientY;return}On?.onMouseMove?.(e)}),O.addEventListener("mouseup",e=>{if(Ke){O&&(O.style.cursor="grab"),Wt=0,$n=0;return}On?.onMouseUp?.(e)}),document.addEventListener("wheel",Nl,{passive:!1}),document.addEventListener("keydown",kl),document.addEventListener("keyup",Rl)}function Nl(e){!O||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#frameup-root")||ul(e)}function kl(e){if(e.key!==" "||No())return;let t=document.activeElement;t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t?.isContentEditable||(e.preventDefault(),!Ke&&O&&(Sl=O.style.cursor,O.style.cursor="grab",O.style.pointerEvents="auto",Ke=!0))}function Rl(e){if(e.key===" "&&Ke&&(e.preventDefault(),Ke=!1,Wt=0,$n=0,O)){O.style.cursor=Sl;let t=gn();O.style.pointerEvents=t==="select"?"none":"auto"}}function Ro(){return Ke}function ko(e){On=pi.get(e)||null,O&&(O.style.pointerEvents=e==="select"?"none":"auto"),Md(e)}function Md(e){if(O)switch(e){case"select":O.style.cursor="default";break;case"text":O.style.cursor="text";break;default:O.style.cursor="default"}}function wl(e){O&&(O.style.pointerEvents=e?"auto":"none")}function Pn(e,t){let n=il(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#frameup-root")&&!i.hasAttribute("data-frameup-interaction")&&!i.hasAttribute("data-frameup-placeholder")&&!(i===document.body||i===document.documentElement)&&!Lr(i)){r=i;break}return al(e,t,r),r}function Pl(){document.removeEventListener("scroll",Vt,!0),document.removeEventListener("wheel",Nl),document.removeEventListener("keydown",kl),document.removeEventListener("keyup",Rl),Ke=!1,O?.remove(),O=null,On=null,pi.clear()}uo();me();function $l(e,t,n,o,r,i){let a=e.left+e.width/2,l=e.top+e.height/2,d=t.left+t.width/2,c=t.top+t.height/2,u=d-a,p=c-l,f=Math.abs(u)<=r,m=Math.abs(p)<=r;return{dx:f?n+u/i:n,dy:m?o+p/i:o,snappedX:f,snappedY:m,guides:{verticalLine:f?{x:d,top:t.top,bottom:t.bottom}:null,horizontalLine:m?{y:c,left:t.left,right:t.right}:null}}}var _=null,Po={x:0,y:0},Hn={dx:0,dy:0},An=!1;function mi(e,t,n){let o=It(e,t),r=qr(n);if(r)return _=r,Po={x:o.x,y:o.y},Hn={...r.delta},An=!1,un(r.element,r.delta.dx,r.delta.dy,r.existingTransform),!0;let i=Al(),a=Hl();if(!i||!a||n!==a)return!1;let l=a.getBoundingClientRect(),d=a.style.cssText,c=getComputedStyle(a).transform,u={id:crypto.randomUUID(),componentRef:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber},element:a,placeholder:null,originalRect:l,delta:{dx:0,dy:0},originalCssText:d,existingTransform:c==="none"?"":c,identity:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber,columnNumber:i.columnNumber,tagName:a.tagName.toLowerCase()}};return jr(u),_=u,Po={x:o.x,y:o.y},Hn={dx:0,dy:0},An=!0,un(a,0,0,u.existingTransform),!0}function fi(e,t){if(!_)return;let n=It(e,t),o=Hn.dx+(n.x-Po.x),r=Hn.dy+(n.y-Po.y);un(_.element,o,r,_.existingTransform);let i=_.element.parentElement;if(!i||i===document.body||i===document.documentElement){_.delta={dx:o,dy:r},Hr();return}let a=_.element.getBoundingClientRect(),l=i.getBoundingClientRect(),{scale:d}=De(),c=$l(a,l,o,r,5,d);(c.snappedX||c.snappedY)&&un(_.element,c.dx,c.dy,_.existingTransform),_.delta={dx:c.dx,dy:c.dy},Ca(c.guides)}function Ol(){if(!_)return null;An||Yr(_.id,_.delta,Hn),za(_),Hr(),An&&Ue({type:"move",componentName:_.componentRef.componentName,filePath:_.componentRef.filePath,summary:`moved (${Math.round(_.delta.dx)}px, ${Math.round(_.delta.dy)}px)`,state:"pending",elementIdentity:_.identity,revertData:{type:"moveRemove",moveId:_.id}});let e=_.element;return _=null,An=!1,e}me();Cr()||Er({onCommitFiberRoot(){}});async function Ld(e){let t=oe(e);if(!t)return null;try{let n=await Oe(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||Ge(i))continue;let a="";if(r.fileName){let l=Ne(r.fileName);Ae(l)&&(a=l)}o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0)return{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}}catch(n){console.warn("[FrameUp] getOwnerStack failed, falling back to fiber walk:",n)}return Il(e,t)}function Il(e,t){let n=[],o=t;for(;o;){if(ve(o)){let r=ae(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",l=0,d=0;i&&(a=i.fileName||"",l=i.lineNumber||0,d=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!Ge(r)&&n.push({componentName:r,filePath:a,lineNumber:l,columnNumber:d})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function Dl(e){let t=oe(e);return t?Il(e,t):null}var K=null,F=null,Ze=!1,Gt=!1,H=new Map,v=null,$e=null,se="idle",A=null,_e=null,Se=null,Do=null,In=0,Dn=0,at=[],_n=!1,Nd=null,kd=null,Rd=null,Pd=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    box-shadow: ${$.sm};
    border-radius: ${L.sm};
    padding: 4px 8px;
    z-index: 2147483646;
    font-family: ${x};
    white-space: nowrap;
    display: none;
    opacity: 0;
    transition: opacity ${C.medium};
  }
  .selection-label.visible {
    opacity: 1;
  }
  .selection-label .comp-name {
    color: ${s.textPrimary};
    font-size: 12px;
    font-weight: 600;
  }
  .selection-label .comp-path {
    color: ${s.textSecondary};
    font-size: 11px;
    margin-left: 8px;
  }
  .selection-label .loading-dots {
    color: ${s.textTertiary};
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
    border: 1px solid ${s.accent};
    background: ${s.accentSoft};
    border-radius: 2px;
    z-index: 2147483646;
    display: none;
    pointer-events: none;
  }
`;function _l(e){Nd=e.onStart,kd=e.onMove,Rd=e.onEnd}function Fl(){let e=q();if(!e)return;let t=document.createElement("style");t.textContent=Pd,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),$e=document.createElement("div"),$e.className="marquee-box",e.appendChild($e),Ze=!0,document.addEventListener("mousedown",$o,!0),document.addEventListener("mousemove",Oo,!0),document.addEventListener("mouseup",Ao,!0),document.addEventListener("keydown",Io,!0),document.addEventListener("click",Ho,!0),document.addEventListener("scroll",qe,!0),window.addEventListener("resize",qe),Gt=!0}function $o(e){if(!Ze||Ro()||e.metaKey||e.ctrlKey)return;let t=document.elementFromPoint(e.clientX,e.clientY);if(t?.closest("#frameup-root"))return;if(K||H.size>0){let o=Ir(e.clientX,e.clientY);if(o){e.preventDefault(),e.stopPropagation();let r=Ta();if(Se=o,Do=r?{...r}:null,H.size>0){at=[];for(let[i]of H){let a=getComputedStyle(i);at.push({element:i,width:parseFloat(a.width)||i.offsetWidth,height:parseFloat(a.height)||i.offsetHeight})}In=0,Dn=0}else if(F){let i=getComputedStyle(F);In=parseFloat(i.width)||F.offsetWidth,Dn=parseFloat(i.height)||F.offsetHeight,at=[]}A={x:e.clientX,y:e.clientY},se="resize-drag";return}}if(e.preventDefault(),e.stopPropagation(),!t||!ut(t)){(K||H.size>0)&&(tl(),K=null,F=null,_o(),pt(null),v&&(v.classList.remove("visible"),v.style.display="none"),Be(null));return}if(A={x:e.clientX,y:e.clientY},_e=t,_n=e.shiftKey,Kr(t)&&mi(e.clientX,e.clientY,t)){se="move-drag";return}if(!_n&&F&&t===F){se="pending-move";return}se="pending"}function Oo(e){if(Ze&&!Ro()){if(se==="resize-drag"&&Se&&A&&Do){e.preventDefault(),e.stopPropagation();let t=e.clientX-A.x,n=e.clientY-A.y;if(at.length>0){for(let o of at){let r=o.width,i=o.height;Se==="tr"||Se==="br"?r=Math.max(10,o.width+t):r=Math.max(10,o.width-t),Se==="bl"||Se==="br"?i=Math.max(10,o.height+n):i=Math.max(10,o.height-n),o.element.style.width=`${Math.round(r)}px`,o.element.style.height=`${Math.round(i)}px`}Fn()}else{let o=In,r=Dn;Se==="tr"||Se==="br"?o=Math.max(10,In+t):o=Math.max(10,In-t),Se==="bl"||Se==="br"?r=Math.max(10,Dn+n):r=Math.max(10,Dn-n),o=Math.round(o),r=Math.round(r),Nn("width",`${o}px`),Nn("height",`${r}px`),qe()}return}if(se==="pending-move"&&A){let t=Math.abs(e.clientX-A.x),n=Math.abs(e.clientY-A.y);(t>4||n>4)&&(_e&&mi(A.x,A.y,_e)?(se="move-drag",fi(e.clientX,e.clientY)):se="marquee");return}if(se==="move-drag"){fi(e.clientX,e.clientY);return}if(se==="pending"&&A){let t=Math.abs(e.clientX-A.x),n=Math.abs(e.clientY-A.y);(t>10||n>10)&&(se="marquee")}if(se==="marquee"&&A&&$e){let t=Math.min(e.clientX,A.x),n=Math.min(e.clientY,A.y),o=Math.abs(e.clientX-A.x),r=Math.abs(e.clientY-A.y);$e.style.display="block",$e.style.left=`${t}px`,$e.style.top=`${n}px`,$e.style.width=`${o}px`,$e.style.height=`${r}px`;return}if(se==="idle"){if(K&&F||H.size>0){let i=Ir(e.clientX,e.clientY);if(i){document.body.style.cursor=i==="tl"||i==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let n=document.elementFromPoint(e.clientX,e.clientY);if(!n||!ut(n)){ro(null);return}let o=n.getBoundingClientRect(),r=parseFloat(getComputedStyle(n).borderRadius)||4;ro(o,r+2)}}}function Ao(e){if(!Ze||Ro())return;let t=se;if(se="idle",t==="resize-drag"){document.body.style.cursor="",Se=null,Do=null,A=null,at.length>0?at=[]:So();return}if(t==="move-drag"){let n=Ol();n&&Hd(n),A=null,_e=null;return}if(t==="pending-move"){A=null,_e=null;return}if(t==="marquee"&&A){$e&&($e.style.display="none"),$d(Math.min(e.clientX,A.x),Math.min(e.clientY,A.y),Math.max(e.clientX,A.x),Math.max(e.clientY,A.y)),A=null,_e=null,_n=!1;return}_e&&(_n?Od(_e):(_o(),Rn(_e))),A=null,_e=null,_n=!1}async function Rn(e,t){try{let n=e.getBoundingClientRect();F=e,gi(n,{}),Ad();let o=await Ld(e);if(console.log("[FrameUp] selectElement:",e.tagName,"\u2192",o?.componentName,o?.filePath,"stack:",o?.stack?.map(r=>r.componentName)),!o)return;if(K={tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber,columnNumber:o.columnNumber,stack:o.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}},v){let r=o.filePath?`${o.filePath}:${o.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${o.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||Ft(e,K),Be({tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber})}catch(n){console.error("[FrameUp] selectElement error:",n)}}function $d(e,t,n,o){let r=ga({x:e,y:t,width:n-e,height:o-t});if(r.length!==0){vt(),K=null,F=null,pt(null),v&&(v.classList.remove("visible"),v.style.display="none"),H.clear();for(let i of r.slice(0,50)){let a=Dl(i);if(!a)continue;let l=i.getBoundingClientRect(),d={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:l.top,left:l.left,width:l.width,height:l.height}};H.set(i,{element:i,info:d})}if(H.size!==0){if(H.size===1){let[i,a]=[...H.entries()][0];H.clear(),F=i,K=a.info;let l=i.getBoundingClientRect();if(gi(l,K),v){let d=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${d?`<span class="comp-path">${d}</span>`:""}`}Ft(i,K),Be({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}Fn(),Be(null),v&&(v.innerHTML=`<span class="comp-name">${H.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function Od(e){if(H.has(e)){if(H.delete(e),H.size===1){let[r,i]=[...H.entries()][0];H.clear(),cn(),F=r,K=i.info;let a=r.getBoundingClientRect();if(gi(a,K),Ft(r,K),v){let l=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${l?`<span class="comp-path">${l}</span>`:""}`}Be({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else H.size===0?(cn(),Xe()):(Fn(),v&&(v.innerHTML=`<span class="comp-name">${H.size} elements selected</span>`));return}let t=Dl(e);if(!t)return;K&&F&&H.size===0&&(H.set(F,{element:F,info:K}),vt(),K=null,F=null,pt(null));let n=e.getBoundingClientRect(),o={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}};H.set(e,{element:e,info:o}),Fn(),Be(null),v&&(v.innerHTML=`<span class="comp-name">${H.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function _o(){H.clear(),cn()}function Fn(){if(H.size===0){cn();return}let e=[];for(let[t]of H){let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:n,borderRadius:o+2})}Ea(e)}function Ho(e){Ze&&(e.metaKey||e.ctrlKey||e.preventDefault())}function Io(e){if(Ze&&e.key==="Escape"){if(H.size>0){_o(),v&&(v.classList.remove("visible"),v.style.display="none"),Be(null),e.preventDefault();return}if(K){if(nl()){Mo(),e.preventDefault();return}Xe(),e.preventDefault()}}}function gi(e,t){if(F){let n=parseFloat(getComputedStyle(F).borderRadius)||4;pt(e,n+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function qe(){if(H.size>0){Fn();return}if(!F||!K)return;let e=F.getBoundingClientRect(),t=parseFloat(getComputedStyle(F).borderRadius)||4;if(pt(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function Ad(){ro(null)}function Xe(){vt(),K=null,F=null,Se=null,Do=null,at=[],_o(),document.body.style.cursor="",pt(null),v&&(v.classList.remove("visible"),v.style.display="none"),Be(null)}function Al(){return K}function Vl(){Ze=!1,document.removeEventListener("mousedown",$o,!0),document.removeEventListener("mousemove",Oo,!0),document.removeEventListener("mouseup",Ao,!0),document.removeEventListener("keydown",Io,!0),document.removeEventListener("click",Ho,!0),document.removeEventListener("scroll",qe,!0),window.removeEventListener("resize",qe),Gt=!1,v?.remove(),v=null}function zl(e){e&&!Gt?(document.addEventListener("mousedown",$o,!0),document.addEventListener("mousemove",Oo,!0),document.addEventListener("mouseup",Ao,!0),document.addEventListener("keydown",Io,!0),document.addEventListener("click",Ho,!0),document.addEventListener("scroll",qe,!0),window.addEventListener("resize",qe),Gt=!0,Ze=!0):!e&&Gt&&(document.removeEventListener("mousedown",$o,!0),document.removeEventListener("mousemove",Oo,!0),document.removeEventListener("mouseup",Ao,!0),document.removeEventListener("keydown",Io,!0),document.removeEventListener("click",Ho,!0),document.removeEventListener("scroll",qe,!0),window.removeEventListener("resize",qe),Gt=!1,Ze=!1)}function Hl(){return F??null}async function Hd(e){await Rn(e,{skipSidebar:!0})}dt();var ge=null,fe=null,lt=null,Bl=null,Vn=!1,jt=null,Fo=[],Vo=new Map,zo=!1,Id=`
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
`,Yt=null;function Wl(){let e=q();if(!e)return;let t=document.createElement("style");t.textContent=Id,e.appendChild(t),_l({onStart:Dd,onMove:_d,onEnd:Fd}),be(n=>{n.type==="reorderComplete"&&(hi(),Xe())})}function Dd(e,t,n){lt=n,Bl=t,jt={x:e.clientX,y:e.clientY},Vn=!1,zo=!1,Fo=[],Vo=new Map,Yt=null;let o=q();if(!o)return;ge=document.createElement("div"),ge.className="drag-preview";let r=t.getBoundingClientRect();ge.style.width=`${r.width}px`,ge.style.height=`${r.height}px`,ge.innerHTML=t.outerHTML,o.appendChild(ge),fe=document.createElement("div"),fe.className="drop-indicator",o.appendChild(fe);let i=n.stack[1];if(!i)return;pe({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=be(l=>{if(l.type!=="siblingsList")return;a(),Fo=l.siblings;let d=document.querySelectorAll("*");for(let c of d){if(c.closest("#frameup-root"))continue;let u=oe(c);if(!u)continue;let p=u;for(;p;){if(ve(p)){let f=p._debugSource||p._debugOwner?._debugSource;if(f){for(let m of l.siblings)f.lineNumber===m.lineNumber&&f.fileName===i.filePath&&Vo.set(m.lineNumber,{el:c,rect:c.getBoundingClientRect()});break}}p=p.return}}zo=!0})}function _d(e){if(!jt)return;let t=Math.abs(e.clientX-jt.x),n=Math.abs(e.clientY-jt.y);if(t<5&&n<5||(Vn=!0,ge&&(ge.style.display="block",ge.style.left=`${e.clientX+10}px`,ge.style.top=`${e.clientY+10}px`),!zo||!lt))return;let o=null,r=1/0,i=0,a=0,l=0;for(let d of Fo){if(d.lineNumber===lt.lineNumber)continue;let c=Vo.get(d.lineNumber);if(!c)continue;let u=c.rect,p=u.top+u.height/2,f=Math.abs(e.clientY-p);f<r&&(r=f,o=d,e.clientY<p?i=u.top-2:i=u.bottom+2,a=u.left,l=u.width)}Yt=o,o&&fe?(fe.style.display="block",fe.style.top=`${i}px`,fe.style.left=`${a}px`,fe.style.width=`${l}px`):fe&&(fe.style.display="none")}function Fd(e){if(!Vn||!Yt||!lt){hi();return}pe({type:"reorder",filePath:lt.filePath,fromLine:lt.lineNumber,toLine:Yt.lineNumber,fromComponent:lt.componentName,toComponent:Yt.componentName}),ge&&(ge.style.display="none"),fe&&(fe.style.display="none"),Vn=!1,jt=null}function hi(){ge?.remove(),fe?.remove(),ge=null,fe=null,lt=null,Bl=null,Vn=!1,jt=null,zo=!1,Fo=[],Vo=new Map,Yt=null}function Gl(){hi()}U();me();var yi="http://www.w3.org/2000/svg",Ut=null,Me=null,bi=null;function jl(){let e=q();e&&(Ut=document.createElementNS(yi,"svg"),Ut.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),Me=document.createElementNS(yi,"g"),Me.setAttribute("class","annotation-root"),Ut.appendChild(Me),e.appendChild(Ut),window.addEventListener("scroll",Bo,{passive:!0}),bi=bn(Bo),Bo())}function Bo(){if(!Me)return;let{scale:e,offsetX:t,offsetY:n}=De();Me.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function Yl(e,t,n,o,r,i){if(!Me)return null;let a=document.createElementNS(yi,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let l=document.createElement("div");return l.style.cssText=`
    background: ${s.bgPrimary};
    color: ${s.textPrimary};
    border: 1px solid ${s.border};
    box-shadow: ${$.sm};
    padding: 4px 8px;
    border-radius: ${L.sm};
    font-size: ${r}px;
    font-family: ${x};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,l.textContent=o,a.appendChild(l),Me.appendChild(a),a}function Ul(e){if(!Me)return;let t=Me.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function vi(){Me&&(Me.innerHTML="")}function Xl(){window.removeEventListener("scroll",Bo),bi?.(),bi=null,Ut?.remove(),Ut=null,Me=null}uo();me();U();var Xt={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9093 12.3603L17.0007 20.8537L14.1816 21.8798L11.0902 13.3864L6.91797 16.5422L8.4087 1.63318L19.134 12.0959L13.9093 12.3603Z"></path></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6V21H11V6H5V4H19V6H13Z"></path></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>',logs:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.53614 18.8862 7.33243 17.1346 5.86492L15 8V2L21 2L18.5535 4.44656C20.6649 6.28002 22 8.9841 22 12Z"></path></svg>'},Kl=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",xi=navigator.platform.includes("Mac")?"Cmd":"Ctrl",wi=[{type:"select",icon:Xt.pointer,label:"Select",shortcut:"S"},{type:"text",icon:Xt.text,label:"Text",shortcut:"T"}],Vd=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    border-radius: ${L.lg};
    box-shadow: ${$.md};
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    gap: 4px;
    font-family: ${x};
    user-select: none;
    opacity: 0;
    animation: panelFadeIn ${C.settle} forwards;
  }
  @keyframes panelFadeIn {
    to { opacity: 1; }
  }
  .tool-divider {
    width: 16px;
    height: 1px;
    background: ${s.border};
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
    color: ${s.textSecondary};
    cursor: pointer;
    border-radius: 50%;
    position: relative;
    padding: 0;
    transition: background ${C.fast}, color ${C.fast};
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
    background: ${s.bgSecondary};
    color: ${s.textPrimary};
  }
  .tool-btn.active {
    background: ${s.accentSoft};
    color: ${s.accent};
    border-left-color: ${s.accent};
    border-radius: 0 50% 50% 0;
  }
  .tool-btn .tooltip {
    display: none;
    position: absolute;
    left: 44px;
    top: 50%;
    transform: translateY(-50%);
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    box-shadow: ${$.sm};
    color: ${s.textPrimary};
    padding: 4px 8px;
    border-radius: ${L.sm};
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity ${C.medium};
    z-index: 2147483647;
  }
  .tool-btn .tooltip .shortcut-badge {
    display: inline-block;
    background: ${s.bgSecondary};
    color: ${s.textTertiary};
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
    border-top: 1px solid ${s.border};
    border-bottom: 1px solid ${s.border};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    opacity: 0;
    transition: opacity ${C.medium};
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
    box-shadow: ${$.sm};
  }
  .segmented-control {
    display: flex;
    background: ${s.bgSecondary};
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
    color: ${s.textSecondary};
    font-size: 10px;
    font-family: ${x};
    cursor: pointer;
    padding: 0;
    transition: background ${C.fast}, color ${C.fast}, box-shadow ${C.fast};
  }
  .segment.active {
    background: ${s.bgPrimary};
    color: ${s.textPrimary};
    box-shadow: ${$.sm};
  }
  .action-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: ${s.textSecondary};
    cursor: pointer;
    border-radius: 50%;
    padding: 0;
    transition: background ${C.fast}, color ${C.fast}, opacity ${C.fast};
  }
  .action-btn svg {
    width: 18px;
    height: 18px;
  }
  .action-btn:hover {
    background: ${s.bgSecondary};
    color: ${s.textPrimary};
  }
  .action-btn.active {
    background: ${s.accentSoft};
    color: ${s.accent};
  }
  .action-btn:disabled {
    opacity: 0.3;
    cursor: default;
    pointer-events: none;
  }
  .action-btn.has-badge {
    position: relative;
  }
  .action-badge {
    position: absolute;
    top: 3px;
    right: 3px;
    min-width: 14px;
    height: 14px;
    padding: 0 4px;
    border-radius: 999px;
    background: ${s.accent};
    color: #ffffff;
    font-size: 9px;
    font-weight: 700;
    line-height: 14px;
    text-align: center;
    box-sizing: border-box;
    pointer-events: none;
  }
  .action-badge.hidden {
    display: none;
  }
  .action-btn.danger:hover {
    background: ${s.dangerSoft};
    color: ${s.danger};
  }
  .help-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: ${s.textTertiary};
    cursor: pointer;
    border-radius: 50%;
    padding: 0;
    font-size: 14px;
    font-weight: 600;
    font-family: ${x};
    transition: background ${C.fast}, color ${C.fast};
  }
  .help-btn:hover {
    background: ${s.bgSecondary};
    color: ${s.textPrimary};
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
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    border-radius: ${L.lg};
    box-shadow: ${$.lg};
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
    color: ${s.textPrimary};
    margin: 0 0 16px 0;
  }
  .shortcuts-section {
    margin-bottom: 14px;
  }
  .shortcuts-section-label {
    font-size: 10px;
    font-weight: 600;
    color: ${s.textTertiary};
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
    color: ${s.textPrimary};
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
    background: ${s.bgSecondary};
    border: 1px solid ${s.border};
    border-radius: 5px;
    font-size: 11px;
    font-family: ${x};
    color: ${s.textSecondary};
    box-shadow: 0 1px 0 rgba(0,0,0,0.06);
  }
  .shortcut-plus {
    font-size: 10px;
    color: ${s.textTertiary};
  }
`,he=null,Le=null,Go=new Map,Fe=null,Ve=null,zn=null,Ci=null,Ei=null,Ti=null;function Zl(e){Ci=e}function Jl(e){Ei=e}function Ql(e){Fe&&(Fe.disabled=!e)}function ql(){if(!Ve||!zn)return;let e=ti();Ve.classList.toggle("active",Tn()),zn.classList.toggle("hidden",e===0),zn.textContent=String(e)}function es(){let e=q();if(!e)return;let t=document.createElement("style");t.textContent=Vd,e.appendChild(t),he=document.createElement("div"),he.className="tools-panel";let n=[["select","text"]];for(let l=0;l<n.length;l++){if(l>0){let d=document.createElement("div");d.className="tool-divider",he.appendChild(d)}for(let d of n[l]){let c=wi.find(f=>f.type===d),u=document.createElement("button");u.className=`tool-btn${c.type==="select"?" active":""}`,u.innerHTML=`${c.icon}<span class="tooltip">${c.label}<span class="shortcut-badge">${Kl}${c.shortcut}</span></span>`,u.addEventListener("click",()=>go(c.type));let p=null;u.addEventListener("mouseenter",()=>{p=setTimeout(()=>u.classList.add("tooltip-visible"),400)}),u.addEventListener("mouseleave",()=>{p&&clearTimeout(p),u.classList.remove("tooltip-visible")}),he.appendChild(u),Go.set(c.type,u)}}Le=document.createElement("div"),Le.className="sub-options hidden",he.appendChild(Le);let o=document.createElement("div");o.className="tool-divider",he.appendChild(o),Fe=document.createElement("button"),Fe.className="action-btn",Fe.innerHTML=Xt.undo,Fe.title="Undo (Ctrl+Z)",Fe.disabled=!0,Fe.addEventListener("click",()=>{Ei&&Ei()}),he.appendChild(Fe),Ve=document.createElement("button"),Ve.className="action-btn has-badge",Ve.innerHTML=`${Xt.logs}<span class="action-badge hidden">0</span>`,Ve.title="Logs",Ve.addEventListener("click",()=>{wn(!Tn())}),zn=Ve.querySelector(".action-badge"),he.appendChild(Ve);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=Xt.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{Ci&&Ci()}),he.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=Xt.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{gl(),i.style.color=fl()?s.accent:""}),he.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8H14V6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5C21 8.433 19.433 10 17.5 10H16V14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5V16H10V17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14H8V10H6.5C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5V8ZM8 8V6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM10 10V14H14V10H10Z"></path></svg>',a.title=`Keyboard Shortcuts (${Kl}/)`,a.addEventListener("click",()=>ns()),he.appendChild(a),e.appendChild(he),document.addEventListener("keydown",ts,!0),Ti=ei(ql),ql()}function ts(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||No()||e.ctrlKey||e.metaKey||e.altKey)return;let n=e.key.toUpperCase();if(e.key==="?"){ns(),e.preventDefault();return}let o=wi.find(r=>r.shortcut===n);o&&(go(o.type),e.preventDefault())}var ze=null,Bn=null;function ns(){ze?Wo():zd()}function zd(){let e=q();if(!e||ze)return;ze=document.createElement("div"),ze.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:wi.map(r=>({action:r.label,keys:[r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[xi,"Z"]},{action:"Toggle Logs",keys:[xi,"Shift","L"]},{action:"Keyboard Shortcuts",keys:["?"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Space","Drag"]},{action:"Zoom",keys:[xi,"Scroll"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let l of r.items){let d=document.createElement("div");d.className="shortcut-row";let c=document.createElement("span");c.className="shortcut-action",c.textContent=l.action,d.appendChild(c);let u=document.createElement("span");u.className="shortcut-keys";for(let p=0;p<l.keys.length;p++){if(p>0){let m=document.createElement("span");m.className="shortcut-plus",m.textContent="+",u.appendChild(m)}let f=document.createElement("span");f.className="shortcut-key",f.textContent=l.keys[p],u.appendChild(f)}d.appendChild(u),i.appendChild(d)}t.appendChild(i)}ze.appendChild(t),ze.addEventListener("click",r=>{r.target===ze&&Wo()}),e.appendChild(ze),Bn=r=>{Wo()},document.addEventListener("keydown",Bn,!0)}function Wo(){Bn&&(document.removeEventListener("keydown",Bn,!0),Bn=null),ze?.remove(),ze=null}function os(e){for(let[t,n]of Go)n.classList.toggle("active",t===e);Bd(e)}function Bd(e){if(Le&&(Le.innerHTML="",Le.classList.add("hidden"),Le.classList.remove("visible"),e==="text")){Le.classList.remove("hidden"),requestAnimationFrame(()=>Le?.classList.add("visible"));let t=Ht(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();ao({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){ho("textColor",i),n.style.background=i},onClose(){}})}),Le.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{ho("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}Le.appendChild(o)}}function rs(e){let t=Go.get(e);t&&(t.style.backgroundColor=s.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function is(){document.removeEventListener("keydown",ts,!0),Ti?.(),Ti=null,Wo(),he?.remove(),he=null,Le=null,Fe=null,Ve=null,zn=null,Go.clear()}me();me();dt();kt();async function as(e,t){let n=Pn(e,t);if(!n)return null;let o=oe(n);if(!o)return null;try{let i=await Oe(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let l=a.functionName;if(l[0]!==l[0].toUpperCase()||Ge(l))continue;let d="";if(a.fileName){let c=Ne(a.fileName);Ae(c)&&(d=c)}return{componentName:l,filePath:d,lineNumber:a.lineNumber??0}}}catch{}let r=o;for(;r;){if(ve(r)){let i=ae(r.type);if(i&&i[0]===i[0].toUpperCase()&&!Ge(i)){let a=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:a?.fileName||"",lineNumber:a?.lineNumber||0}}}r=r.return}return null}U();var ie=null,Tt=null,jo=null,ss={onMouseDown(e){if(ie){ls();return}let t=It(e.clientX,e.clientY);Tt={pageX:t.x,pageY:t.y},as(e.clientX,e.clientY).then(n=>{jo=n}),ie=document.createElement("input"),ie.type="text",ie.placeholder="Type annotation...",ie.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${s.bgPrimary};
      color: ${s.textPrimary};
      border: 1.5px solid ${s.accent};
      border-radius: ${L.sm};
      padding: 4px 8px;
      font-size: ${Ht().fontSize}px;
      font-family: ${x};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${s.accentSoft};
    `,ie.setAttribute("data-frameup-overlay","true"),ie.addEventListener("keydown",n=>{n.key==="Enter"&&(ls(),n.preventDefault()),n.key==="Escape"&&(cs(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(ie),ie.focus()},onMouseMove(){},onMouseUp(){}};function ls(){if(!ie||!Tt)return;let e=ie.value.trim();if(ie.remove(),ie=null,!e)return;let t=Ht(),n=crypto.randomUUID();Yl(n,Tt.pageX,Tt.pageY,e,t.fontSize,t.textColor),Ur({type:"text",id:n,position:Tt,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:jo}),Tt=null,jo=null}function cs(){ie&&(ie.remove(),ie=null),Tt=null,jo=null}function ds(){cs()}U();var wt=null,Wn=null;function us(e){let t=e instanceof Error&&e.stack?e.stack:String(e);return/frameup|overlay/i.test(t)}function Wd(e){let t=q();if(!t)return;wt&&wt.parentNode&&wt.parentNode.removeChild(wt),Wn&&clearTimeout(Wn);let n=document.createElement("div");n.setAttribute("style",["position: fixed","bottom: 72px","right: 16px","z-index: 2147483647","background: rgba(30, 30, 30, 0.92)","color: #fff",`font-family: ${x}`,"font-size: 12px","padding: 10px 14px",`border-radius: ${L.sm}`,`box-shadow: ${$.md}`,"max-width: 320px","display: flex","align-items: center","gap: 10px","opacity: 0",`transition: opacity ${C.medium}`].join("; "));let o=document.createElement("span");o.textContent=e,o.setAttribute("style","flex: 1;");let r=document.createElement("button");r.textContent="Dismiss",r.setAttribute("style",["background: rgba(255,255,255,0.15)","border: none","color: #fff",`font-family: ${x}`,"font-size: 11px","padding: 3px 8px",`border-radius: ${L.xs}`,"cursor: pointer","white-space: nowrap"].join("; ")),r.addEventListener("click",()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),Wn&&clearTimeout(Wn),wt=null}),n.appendChild(o),n.appendChild(r),t.appendChild(n),wt=n,requestAnimationFrame(()=>{n.style.opacity="1"}),Wn=setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),wt=null},8e3)}function Si(e){console.error("[FrameUp]",e),Wd("FrameUp encountered an error. Your app is unaffected.")}function Gd(){window.addEventListener("error",e=>{us(e.error??e.message)&&(Si(e.error??e.message),e.preventDefault())}),window.addEventListener("unhandledrejection",e=>{us(e.reason)&&(Si(e.reason),e.preventDefault())})}var Mi=null;function ps(e,t,n){t.originalCssText=n.style.cssText,t.element=n,mt(t)}function jd(){let e=window.__FRAMEUP_WS_PORT__;if(!e){console.warn("[FrameUp] No WebSocket port found.");return}if(document.getElementById("frameup-root"))return;Un(e),Vi(Yd);let t=q();t&&(el(t),Ua(t)),Fl(),xa(),Wl(),jl(),Xr(r=>Ul(r)),Mi=new MutationObserver(()=>{for(let[r,i]of Gr())document.contains(i.element)||setTimeout(()=>{let a=co(i.identity);if(a){ps(r,i,a);return}Ba(i.identity).then(l=>{l?ps(r,i,l):(yo(r),X(`Component ${i.componentRef.componentName} removed \u2014 move cleared`))})},80)}),Mi.observe(document.body,{childList:!0,subtree:!0}),document.addEventListener("keydown",r=>{(r.metaKey||r.ctrlKey)&&r.shiftKey&&r.key==="l"&&(r.preventDefault(),wn(!Tn()))}),es(),hl(),Ll(),qa(),Ml("text",ss),Br((r,i)=>{Sn(),rs(r),i==="text"&&ds(),Vt(),Nr(),zl(r==="select"),ko(r),os(r)}),Wr(()=>{Kn(xo()),Ql(Zr())}),Jl(()=>{let r=vo();r&&X(`Undo: ${r}`)});let n=!1,o=0;Bi(()=>{if(n){X("Generation in progress");return}let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);X(`Please wait ${a}s before retrying`);return}let i=Jr();if(!i.moves.length&&!i.annotations.length&&!i.colorChanges.length&&!i.textEdits.length){X("Nothing to confirm \u2014 make some visual changes first");return}n=!0,Kn(!1),X("Generating..."),pe({type:"generate",annotations:i})}),be(r=>{if(r.type==="generateProgress"&&X(r.message),r.type==="generateComplete")if(n=!1,Kn(xo()),r.success){let i=r.changes.length;Ue({type:"generate",componentName:"AI Generate",filePath:r.changes[0]?.filePath||"",summary:`${i} file${i!==1?"s":""} changed`,state:"active",revertData:{type:"generateUndo",undoIds:r.undoIds||[]}});let a=r.changes.map(l=>l.description||l.filePath).join(", ");X(`Applied: ${a}`),Xe(),vi(),vn()}else X(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),Wi(()=>{let r=vo();return r?(X(`Undo: ${r}`),!0):!1}),Zl(()=>{Xe(),vi(),vn(),ml(),updateEyeButton(!0),X("Canvas cleared")}),console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools")}function Yd(){Vt(),Nr(),Vl(),wa(),Gl(),rl(),Xl(),Mi?.disconnect(),is(),Xa(),yl(),Pl(),vn(),ci(),$i(),zi()}function ms(){try{jd(),Gd()}catch(e){Si(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ms):ms();})();
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
