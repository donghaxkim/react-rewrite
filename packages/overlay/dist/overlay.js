"use strict";var FrameUp=(()=>{var ys=Object.defineProperty;var nt=(e,t)=>()=>(e&&(t=e(e=0)),t);var bs=(e,t)=>{for(var n in t)ys(e,n,{get:t[n],enumerable:!0})};var s,$,L,C,x,Vi,U=nt(()=>{"use strict";s={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},$={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},L={xs:"4px",sm:"6px",md:"10px",lg:"14px"},C={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},x="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",Vi=`
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
`});var ir,rn,Ui,Ls,tn,Ki,eo,qi,Xi,nn,Qn,ot,ar,on,lr,kt,sr,to,an=nt(()=>{"use strict";ir="0.5.32",rn=`bippy-${ir}`,Ui=Object.defineProperty,Ls=Object.prototype.hasOwnProperty,tn=()=>{},Ki=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},eo=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),qi=!1,nn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>qi?!0:(e&&typeof e.inject=="function"&&(Xi=e.inject.toString()),!!Xi?.includes("(injected)")),Qn=new Set,ot=new Set,ar=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:rn,checkDCE:Ki,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),ot.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,Qn.forEach(a=>a())),i},on:tn,onCommitFiberRoot:tn,onCommitFiberUnmount:tn,onPostCommitFiberRoot:tn,renderers:t,supportsFiber:!0,supportsFlight:!0};try{Ui(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let l=o.renderers;o=a,l.size>0&&(l.forEach((d,c)=>{ot.add(d),a.renderers.set(c,d)}),on(e))}}});let r=window.hasOwnProperty,i=!1;Ui(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{on(e)}return o},on=e=>{e&&Qn.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=Ki,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=rn,t._instrumentationIsActive=!1;let n=eo(t);if(n||(t.on=tn),t.renderers.size){t._instrumentationIsActive=!0,Qn.forEach(i=>i());return}let o=t.inject,r=nn(t);r&&!n&&(qi=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return ot.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,Qn.forEach(l=>l()),a}}(t.renderers.size||t._instrumentationIsActive||nn())&&e?.()}catch{}},lr=()=>Ls.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),kt=e=>lr()?(on(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):ar(e),sr=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),to=()=>{try{sr()&&kt()}catch{}}});var Zi=nt(()=>{"use strict";an();to()});function Cr(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await Tr(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=Er(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var cr,dr,ur,pr,mr,fr,gr,hr,yr,br,vr,xr,xe,Er,Tr,wr,ie,Sr,Mr,ne,Ns,Lr=nt(()=>{"use strict";an();cr=0,dr=1,ur=5,pr=11,mr=13,fr=15,gr=16,hr=19,yr=26,br=27,vr=28,xr=30,xe=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};Er=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=Er(o,t,n);if(r)return r;o=n?null:o.sibling}return null},Tr=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await Tr(o,t,n);if(r)return r;o=n?null:o.sibling}return null},wr=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?wr(t.type||t.render):null},ie=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=wr(t);return o&&(o.displayName||o.name)||null},Sr=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||eo(e)||nn(e)},Mr=e=>{let t=kt(e.onActive);t._instrumentationSource=e.name??rn;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,l,d)=>{n!==i&&(n?.(a,l,d),e.onCommitFiberRoot?.(a,l,d))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,l)=>{t.onCommitFiberUnmount===i&&(o?.(a,l),e.onCommitFiberUnmount?.(a,l))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,l)=>{t.onPostCommitFiberRoot===i&&(r?.(a,l),e.onPostCommitFiberRoot?.(a,l))};t.onPostCommitFiberRoot=i}return t},ne=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},Ns=Error()});var pt=nt(()=>{"use strict";an();Zi();Lr();});function ln(e,t){let n=0,o=0,r=0;do r=pa[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function na(e,t){return e.pos>=t?!1:e.peek()!==Hs}function ma(e){let{length:t}=e,n=new Ds(e),o=[],r=0,i=0,a=0,l=0,d=0;do{let c=n.indexOf(";"),u=[],p=!0,f=0;for(r=0;n.pos<c;){let m;r=ln(n,r),r<f&&(p=!1),f=r,na(n,c)?(i=ln(n,i),a=ln(n,a),l=ln(n,l),na(n,c)?(d=ln(n,d),m=[r,i,a,l,d]):m=[r,i,a,l]):m=[r],u.push(m),n.pos++}p||_s(u),o.push(u),n.pos=c+1}while(n.pos<=t);return o}function _s(e){e.sort(Fs)}function Fs(e,t){return e[0]-t[0]}var Ji,ks,Rs,la,Ps,$s,sa,As,ca,Os,da,ua,Rr,Qi,ea,Hs,ta,Is,pa,Ds,fa,Vs,zs,ga,sn,no,Bs,oa,Ws,Gs,js,Ys,ra,Us,Xs,Ks,qs,Zs,ia,Ge,Js,Nr,kr,Qs,ec,tc,nc,oc,rc,ic,ac,Oe,aa,lc,sc,Ne,He,Rt=nt(()=>{"use strict";an();Lr();Ji=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,ks=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],Rs=["<anonymous>","eval",""],la=/\.(jsx|tsx|ts|js)$/,Ps=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,$s=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,sa="(at Server)",As=/(^|@)\S+:\d+/,ca=/^\s*at .*(\S+:\d+|\(native\))/m,Os=/^(eval@)?(\[native code\])?$/,da=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=Qi(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(As)){let i=ea(r,void 0)[0];i&&o.push(i)}return Rr(o,t)}return e.match(ca)?Qi(e,t):ea(e,t)},ua=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},Rr=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e,Qi=(e,t)=>Rr(e.split(`
`).filter(n=>!!n.match(ca)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=ua(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}}),ea=(e,t)=>Rr(e.split(`
`).filter(n=>!n.match(Os)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,l=ua(o.replace(r,""));return{functionName:a,fileName:l[0],lineNumber:l[1]?+l[1]:void 0,columnNumber:l[2]?+l[2]:void 0,source:o}}}),Hs=44,ta="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Is=new Uint8Array(64),pa=new Uint8Array(128);for(let e=0;e<ta.length;e++){let t=ta.charCodeAt(e);Is[e]=t,pa[t]=e}Ds=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};fa=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Vs=/^data:application\/json[^,]+base64,/,zs=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,ga=typeof WeakRef<"u",sn=new Map,no=new Map,Bs=e=>ga&&e instanceof WeakRef,oa=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let u of r)if(u[0]<=o)i=u;else break;if(!i||i.length<4)return null;let[,a,l,d]=i;if(a===void 0||l===void 0||d===void 0)return null;let c=t[a];return c?{columnNumber:d,fileName:c,lineNumber:l+1}:null},Ws=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return oa(o.map.mappings,o.map.sources,r,i)}return oa(e.mappings,e.sources,t-1,n)},Gs=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(zs);a&&(o=a[1]||a[2])}if(!o)return null;let r=fa.test(o);if(!(Vs.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},js=e=>({file:e.file,mappings:ma(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),Ys=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:ma(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},ra=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(fa);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},Us=async(e,t=fetch)=>{if(!ra(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=Gs(e,n);if(!o||!ra(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?Ys(i):js(i)}catch{return null}},Xs=async(e,t=!0,n)=>{if(t&&sn.has(e)){let i=sn.get(e);if(i==null)return null;if(Bs(i)){let a=i.deref();if(a)return a;sn.delete(e)}else return i}if(t&&no.has(e))return no.get(e);let o=Us(e,n);t&&no.set(e,o);let r=await o;return t&&no.delete(e),t&&(r===null?sn.set(e,null):sn.set(e,ga?new WeakRef(r):r)),r},Ks=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await Xs(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=Ws(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),qs=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",Zs=()=>{let e=kt();for(let t of[...Array.from(ot),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},ia=e=>{for(let t of ot){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},Ge=e=>`
    in ${e}`,Js=(e,t)=>{let n=Ge(e);return t&&(n+=` (at ${t})`),n},Nr=!1,kr=(e,t)=>{if(!e||Nr)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,Nr=!0;let o=Zs();ia(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let l={DetermineComponentFrameRoot(){let u;try{if(t){let p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(f){u=f}Reflect.construct(e,[],p)}else{try{p.call()}catch(f){u=f}e.call(p.prototype)}}else{try{throw Error()}catch(f){u=f}let p=e();p&&typeof p.catch=="function"&&p.catch(()=>{})}}catch(p){if(p instanceof Error&&u instanceof Error&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[d,c]=l.DetermineComponentFrameRoot();if(d&&c){let u=d.split(`
`),p=c.split(`
`),f=0,m=0;for(;f<u.length&&!u[f].includes("DetermineComponentFrameRoot");)f++;for(;m<p.length&&!p[m].includes("DetermineComponentFrameRoot");)m++;if(f===u.length||m===p.length)for(f=u.length-1,m=p.length-1;f>=1&&m>=0&&u[f]!==p[m];)m--;for(;f>=1&&m>=0;f--,m--)if(u[f]!==p[m]){if(f!==1||m!==1)do if(f--,m--,m<0||u[f]!==p[m]){let h=`
${u[f].replace(" at new "," at ")}`,b=ie(e);return b&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",b)),h}while(f>=1&&m>=0);break}}}finally{Nr=!1,Error.prepareStackTrace=n,ia(o),console.error=r,console.warn=i}let a=e?ie(e):"";return a?Ge(a):""},Qs=(e,t)=>{let n=e.tag,o="";switch(n){case vr:o=Ge("Activity");break;case dr:o=kr(e.type,!0);break;case pr:o=kr(e.type.render,!1);break;case cr:case fr:o=kr(e.type,!1);break;case ur:case yr:case br:o=Ge(e.type);break;case gr:o=Ge("Lazy");break;case mr:o=e.child!==t&&t!==null?Ge("Suspense Fallback"):Ge("Suspense");break;case hr:o=Ge("SuspenseList");break;case xr:o=Ge("ViewTransition");break;default:return""}return o},ec=e=>{try{let t="",n=e,o=null;do{t+=Qs(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=Js(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},tc=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},nc=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),oc=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,rc=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!nc(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>oc(a,o))||(i.push(o),t.set(r,i))}return t},ic=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(sa,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},ac=e=>{let t=[];return Cr(e,n=>{if(!qs(n))return;let o=typeof n.type=="string"?n.type:ie(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:da(tc(n._debugStack?.stack))})},!0),t},Oe=async(e,t=!0,n)=>{let o=ac(e),r=da(ec(e)),i=rc(o),a=new Map;return Ks(r.map(l=>l.source?.includes(sa)??!1?ic(l,i,a):l).filter((l,d,c)=>{if(d===0)return!0;let u=c[d-1];return l.functionName!==u.functionName}),t,n)},aa=e=>e.split("/").filter(Boolean).length,lc=e=>e.split("/").filter(Boolean)[0]??null,sc=e=>{let t=e.indexOf("/",1);if(t===-1||aa(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!la.test(n)||aa(n)<2)return e;let o=lc(n);return!o||o.startsWith("@")||o.length>4?e:n},Ne=e=>{if(!e||Rs.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=sc(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),l=i.indexOf(":");t=a!==-1&&(l===-1||a<l)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of ks)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if(Ji.test(t)){let i=t.match(Ji);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);$s.test(i)&&(t=t.slice(0,r))}return t},He=e=>{let t=Ne(e);return!(!t||!la.test(t)||Ps.test(t))}});function Yc(e,t,n){let o=n&&n!=="none"?` ${n}`:"";return`translate(${e}px, ${t}px)${o}`}function at(e){e.element.style.transform=Yc(e.delta.dx,e.delta.dy,e.existingTransform)}function Wa(e){e.existingTransform&&e.existingTransform!=="none"?e.element.style.transform=e.existingTransform:e.element.style.transform=""}function mn(e,t,n,o){e.style.transform=`translate(${t}px, ${n}px) scale(1.02)${o&&o!=="none"?` ${o}`:""}`,e.style.boxShadow=$.lg,e.style.transition="none",e.style.zIndex="2147483644"}function Ga(e){at(e),e.element.style.boxShadow="",e.element.style.transition="",e.element.style.zIndex=""}function It(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);for(;o;){if(xe(o)){let r=o._debugSource,i=ie(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function mo(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);if(!o)continue;let r=await Oe(o);if(!r||r.length===0)continue;for(let i of r)if(!(!i.functionName||i.functionName!==e.componentName)&&i.fileName){let a=Ne(i.fileName);if(He(a)&&a.endsWith(e.filePath))return n}}catch{}return null}var fn=nt(()=>{"use strict";pt();Rt();U()});var To={};bs(To,{addAnnotation:()=>Zr,addMove:()=>Kr,addTextEditAnnotation:()=>xo,canUndo:()=>ni,canvasUndo:()=>Co,getActiveTool:()=>bn,getAnnotations:()=>Xc,getCanvasTransform:()=>_e,getMoveContainingElement:()=>ti,getMoveForElement:()=>ei,getMoves:()=>Xr,getOriginalsHidden:()=>Kc,getToolOptions:()=>Dt,hasChanges:()=>Eo,hasMoveForElement:()=>Qr,onAnnotationRemoved:()=>Jr,onCanvasTransformChange:()=>Cn,onStateChange:()=>Ur,onToolChange:()=>Yr,pageToViewport:()=>Jc,peekUndoStack:()=>Zc,pushUndoAction:()=>vn,removeAnnotation:()=>ho,removeMove:()=>vo,resetCanvas:()=>En,restoreMoveDelta:()=>Uc,serializeAnnotations:()=>oi,setActiveTool:()=>yo,setCanvasTransform:()=>xn,setOriginalsHidden:()=>qc,setToolOption:()=>bo,updateMoveDelta:()=>qr,viewportToPage:()=>_t});function Yr(e){return fo.push(e),()=>{fo=fo.filter(t=>t!==e)}}function Ur(e){return go.push(e),()=>{go=go.filter(t=>t!==e)}}function lt(){go.forEach(e=>e())}function bn(){return Gr}function yo(e){let t=Gr;t!==e&&(Gr=e,fo.forEach(n=>n(e,t)))}function Dt(){return{...ja}}function bo(e,t){ja[e]=t}function Xr(){return ae}function Kr(e){ae.set(e.id,e),vn({type:"moveCreate",moveId:e.id})}function qr(e,t,n){let o=ae.get(e);o&&(o.delta=t,at(o),vn({type:"moveDelta",moveId:e,previousDelta:n}))}function Uc(e,t){let n=ae.get(e);n&&(n.delta=t,at(n),lt())}function vo(e){let t=ae.get(e);t&&(t.element.style.cssText=t.originalCssText,t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),ae.delete(e),lt())}function Xc(){return De}function Zr(e){if(De.push(e),e.type==="colorChange"){let t=e;ke.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else ke.push({type:"annotationAdd",annotationId:e.id});lt()}function xo(e,t,n){De.push(e),ke.push({type:"textEditRestore",annotationId:e.id,elementIdentity:t,originalInnerHTML:n}),lt()}function Jr(e){Ya=e}function ho(e){De=De.filter(t=>t.id!==e),Ya?.(e),lt()}function Kc(){return jr}function qc(e){jr=e;for(let t of ae.values())e?at(t):Wa(t);lt()}function Qr(e){for(let t of ae.values())if(t.element===e||t.element.contains(e)||e.contains(t.element))return!0;return!1}function ei(e){for(let t of ae.values())if(t.element===e)return t}function ti(e){for(let t of ae.values())if(t.element===e||t.element.contains(e)||e.contains(t.element))return t}function Co(){let e=ke.pop();if(!e)return null;switch(e.type){case"moveCreate":return vo(e.moveId),"move removed";case"moveDelta":{let t=ae.get(e.moveId);return t&&(t.delta=e.previousDelta,at(t)),"move reverted"}case"annotationAdd":return ho(e.annotationId),"annotation removed";case"colorChange":{let t=De.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),ho(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}case"textEditRestore":{let t=It(e.elementIdentity);return t&&(t.innerHTML=e.originalInnerHTML),ho(e.annotationId),"text edit reverted"}}return null}function vn(e){ke.push(e),lt()}function Zc(){return ke.length>0?ke[ke.length-1]:null}function _e(){return{scale:gt,offsetX:hn,offsetY:yn}}function xn(e,t,n){gt=e,hn=t,yn=n,gn.forEach(o=>o())}function Cn(e){return gn.push(e),()=>{gn=gn.filter(t=>t!==e)}}function _t(e,t){return{x:(e-hn)/gt,y:(t-yn)/gt}}function Jc(e,t){return{x:e*gt+hn,y:t*gt+yn}}function En(){for(let e of ae.values())e.element.style.cssText=e.originalCssText,e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder);for(let e of De)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of ke)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}ae=new Map,De=[],ke=[],jr=!0,gt=1,hn=0,yn=0,gn.forEach(e=>e()),lt()}function Eo(){return ae.size>0||De.length>0}function ni(){return ke.length>0}function oi(){let e=Array.from(ae.values()).map(r=>({component:r.componentRef.componentName,file:r.componentRef.filePath,line:r.componentRef.lineNumber,originalRect:{top:r.originalRect.top,left:r.originalRect.left,width:r.originalRect.width,height:r.originalRect.height},delta:{dx:r.delta.dx,dy:r.delta.dy},siblingRects:(()=>{let i=r.element.parentElement;if(!i)return;let a=[];for(let l of Array.from(i.children)){if(l===r.element||!(l instanceof HTMLElement))continue;let d=l.getBoundingClientRect();a.push({component:l.tagName.toLowerCase(),rect:{top:d.top,left:d.left,width:d.width,height:d.height}})}return a.length>0?a:void 0})()})),t=[],n=[],o=[];for(let r of De)r.type==="text"?t.push({type:"text",content:r.content,position:r.position,targetComponent:r.targetComponent?.componentName,targetFile:r.targetComponent?.filePath,targetLine:r.targetComponent?.lineNumber}):r.type==="colorChange"?n.push({component:r.component.componentName,file:r.component.filePath,line:r.component.lineNumber,property:r.property,from:r.fromColor,to:r.toColor,pickedToken:r.pickedToken}):r.type==="textEdit"&&o.push({component:r.componentName,file:r.filePath,line:r.lineNumber,column:r.columnNumber,originalText:r.originalText,newText:r.newText});return{moves:e,annotations:t,colorChanges:n,textEdits:o}}var ae,De,ke,Gr,jr,ja,gt,hn,yn,gn,fo,go,Ya,le=nt(()=>{"use strict";fn();ae=new Map,De=[],ke=[],Gr="select",jr=!0,ja={fontSize:16,textColor:"#ffffff"},gt=1,hn=0,yn=0,gn=[],fo=[],go=[];Ya=null});function vs(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),l=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+l).toString(16).slice(1)}`}return e}function xs(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(E=>{try{return Array.from(E.cssRules)}catch{return[]}}).filter(E=>E instanceof CSSStyleRule&&E.selectorText===":root").flatMap(E=>Array.from(E.style)).filter(E=>E.startsWith("--")),n={},o={},r={},i={},a={},l={},d={},c={},u={},p={},f={},m={},h={},b={},N={},M={},_={},D={},W=(E,P,de,ue)=>{E[de]=ue,P[ue]=de};for(let E of t){let P=e.getPropertyValue(E).trim();if(!P)continue;let de=E.match(/^--spacing-(.+)$/);if(de){W(n,p,de[1],P);continue}let ue=E.match(/^--color-(.+)$/);if(ue){let Un=ue[1];o[Un]=P,f[vs(P)]=Un;continue}let R=E.match(/^--font-size-(.+)$/);if(R){W(r,m,R[1],P);continue}let Y=E.match(/^--font-weight-(.+)$/);if(Y){W(i,h,Y[1],P);continue}let y=E.match(/^--radius-(.+)$/);if(y){W(a,b,y[1],P);continue}let T=E.match(/^--border-(.+)$/);if(T){W(l,N,T[1],P);continue}let z=E.match(/^--opacity-(.+)$/);if(z){W(d,M,z[1],P);continue}let J=E.match(/^--tracking-(.+)$/);if(J){W(c,_,J[1],P);continue}let Q=E.match(/^--leading-(.+)$/);if(Q){W(u,D,Q[1],P);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:l,opacity:d,letterSpacing:c,lineHeight:u,spacingReverse:p,colorsReverse:f,fontSizeReverse:m,fontWeightReverse:h,borderRadiusReverse:b,borderWidthReverse:N,opacityReverse:M,letterSpacingReverse:_,lineHeightReverse:D}}var Cs=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];function Es(e,t){let n={};for(let o of Cs){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function Kn(e,t){return t.get(e)??null}function Pi(e,t,n){let r=(n??Jt())[e],i=[];for(let[l,d]of r.entries()){let c=parseFloat(d);isNaN(c)||i.push({numericValue:c,token:l,cssValue:d})}let a=parseFloat(t);return isNaN(a)||i.some(d=>d.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((l,d)=>l.numericValue-d.numericValue),i}var $i=null,Zt=null;function Ai(e){$i=e,Zt=null}function Jt(){if(Zt!==null)return Zt;let e=xs();return Zt=Es(e,$i??{}),Zt}var pe=null,Qt=[],Mt=0,Ts=5,qo=null,Zo=null,Jo=null,Qo=null,er=null,tr=null;function Oi(e){tr=e}function qn(e){pe&&pe.readyState===WebSocket.OPEN||(er=e,pe=new WebSocket(`ws://localhost:${e}`),pe.onopen=()=>{let t=Mt>0;Mt=0,t&&Qo&&Qo()},pe.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&Ai(n.tokens),n.type==="updatePropertyComplete"&&tr&&tr(n.success,n.errorCode,n.error),Qt.forEach(o=>o(n))}catch{}},pe.onclose=t=>{if(pe=null,t.code===4001){Jo&&Jo();return}if(Mt<Ts){let n=500*Math.pow(2,Mt);Mt++,qo=setTimeout(()=>qn(e),n)}else Zo&&Zo()},pe.onerror=()=>{})}function me(e){pe&&pe.readyState===WebSocket.OPEN&&pe.send(JSON.stringify(e))}function ve(e){return Qt.push(e),()=>{Qt=Qt.filter(t=>t!==e)}}function Hi(){qo&&clearTimeout(qo),pe&&(pe.close(),pe=null),Qt=[]}function Ii(e){Zo=e}function Di(e){Jo=e}function _i(e){Qo=e}function Fi(){er&&(Mt=0,qn(er))}U();var Nt=null,q=null,en=0,Zn=null,ut=null,nr=null,Lt=null,rr=null,Bi=null,or='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',ws='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>',zi='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>',Ss=`
  :host {
    all: initial;
  }
  ${Vi}
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
`;function Wi(e){let t=document.createElement("div");t.id="frameup-root",document.body.appendChild(t),Nt=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=Ss;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${or}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Confirm</button>
    <button class="icon-btn close-btn" title="Close FrameUp">
      ${ws}
    </button>
  `,Nt.appendChild(n),Nt.appendChild(o),q=o.querySelector(".undo-btn");let r=o.querySelector(".close-btn");Zn=o.querySelector(".generate-btn"),Lt=o.querySelector(".component-detail"),ut=document.createElement("div"),ut.className="toast",Nt.appendChild(ut),q.addEventListener("click",()=>{me({type:"undo"}),q&&(q.innerHTML='<div class="spinner"></div>',q.disabled=!0)}),r.addEventListener("click",e),Zn.addEventListener("click",()=>{rr&&rr()}),document.addEventListener("keydown",i=>{i.key==="z"&&(i.ctrlKey||i.metaKey)&&!i.shiftKey&&!Ms()&&Bi?.()&&i.preventDefault()}),Ii(()=>{F("Disconnected. Click to reconnect."),Fi()}),Di(()=>{F("Disconnected: another tab took over")}),_i(()=>{en=0,q&&(q.disabled=!0)}),ve(i=>{switch(i.type){case"reorderComplete":i.success?(en++,q&&(q.innerHTML=zi,setTimeout(()=>{q&&(q.innerHTML=or,q.disabled=!1)},200))):i.error&&F(i.error);break;case"undoComplete":i.success?(en=Math.max(0,en-1),q&&(q.innerHTML=zi,setTimeout(()=>{q&&(q.innerHTML=or,q.disabled=en===0)},200))):i.error&&F(i.error);break;case"devServerDisconnected":F("Dev server disconnected");break;case"devServerReconnected":F("Dev server reconnected");break}})}function Gi(){let e=document.getElementById("frameup-root");e&&e.remove(),Nt=null,q=null}function K(){return Nt}function ji(e){rr=e}function Yi(e){Bi=e}function Jn(e){Zn&&(Zn.disabled=!e)}function We(e){if(!Lt)return;if(!e){Lt.className="component-detail empty",Lt.textContent="No selection";return}Lt.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";Lt.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function F(e){ut&&(ut.textContent=e,ut.classList.add("visible"),nr&&clearTimeout(nr),nr=setTimeout(()=>{ut?.classList.remove("visible")},2e3))}function Ms(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}pt();Rt();var cc=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);function je(e){return!!(cc.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function Pr(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}var dc=50,oo=.9,uc=2147483600,pc=1e3,cn=new WeakMap;function $r(){cn=new WeakMap}function mc(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function fc(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=uc}function gc(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<oo||o.height/window.innerHeight<oo)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>pc}function mt(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&Pr(e)||e.closest("#frameup-root")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-placeholder"))return!1;let n=performance.now(),o=cn.get(e);if(o&&n-o.timestamp<dc)return o.isValid;let r=window.getComputedStyle(e);return mc(e,r)?e.clientWidth/window.innerWidth>=oo&&e.clientHeight/window.innerHeight>=oo&&(fc(r)||gc(e,r))?(cn.set(e,{isValid:!1,timestamp:n}),!1):(cn.set(e,{isValid:!0,timestamp:n}),!0):(cn.set(e,{isValid:!1,timestamp:n}),!1)}var hc=.75,ha=32,ro=3,io=20,ya=100,Te=1;function Pt(e,t,n){return Math.min(n,Math.max(t,e))}function yc(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,l=o+e.width/2,d=r+e.height/2,c=Pt(Math.ceil(e.width/ha),ro,io),u=Pt(Math.ceil(e.height/ha),ro,io);if(c*u>ya){let h=Math.sqrt(ya/(c*u));c=Pt(Math.floor(c*h),ro,io),u=Pt(Math.floor(u*h),ro,io)}let p=new Set,f=[],m=(h,b)=>{let N=Pt(Math.round(h),0,t-1),M=Pt(Math.round(b),0,n-1),_=`${N}:${M}`;p.has(_)||(p.add(_),f.push({x:N,y:M}))};m(o+Te,r+Te),m(i-Te,r+Te),m(o+Te,a-Te),m(i-Te,a-Te),m(l,r+Te),m(l,a-Te),m(o+Te,d),m(i-Te,d),m(l,d);for(let h=0;h<c;h++){let b=o+(h+.5)/c*e.width;for(let N=0;N<u;N++)m(b,r+(N+.5)/u*e.height)}return f}function ba(e,t=mt,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=yc(e);for(let d of i)for(let c of document.elementsFromPoint(d.x,d.y))r.add(c);let a=[];for(let d of r){if(!t(d))continue;let c=d.getBoundingClientRect();if(c.width<=0||c.height<=0)continue;let u={left:c.left,top:c.top,right:c.left+c.width,bottom:c.top+c.height};if(n){let p=Math.max(o.left,u.left),f=Math.max(o.top,u.top),m=Math.min(o.right,u.right),h=Math.min(o.bottom,u.bottom),b=Math.max(0,m-p)*Math.max(0,h-f),N=c.width*c.height;N>0&&b/N>=hc&&a.push(d)}else o.left<u.right&&o.right>u.left&&o.top<u.bottom&&o.bottom>u.top&&a.push(d)}let l=a.filter(d=>!a.some(c=>c!==d&&c.contains(d)));return l.sort((d,c)=>{let u=d.compareDocumentPosition(c);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0}),l}U();function $t(e,t,n){return e+(t-e)*n}U();var bc=.35,va=.3,ao=.5,vc=2,ee=null,k=null,Ar=0,Or=0,dn=1,Ot=null,oe=null,B=null,G=[],At=s.accent,xc="rgba(162,89,255,0.08)",xa="rgba(162,89,255,0.15)",Cc=4,Ca=10,Ec="#ffffff",Tc=At,wc=1.5,Dr=!0,rt=null;function Ta(){let e=K();e&&(ee=document.createElement("canvas"),ee.setAttribute("data-frameup-overlay","true"),ee.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(ee),_r(),window.addEventListener("resize",_r))}function lo(e,t=4){if(!e){oe&&(oe.targetOpacity=0,Ye());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!oe||!oe.initialized?oe=zr(n,t):(oe.target=n,oe.borderRadius=t,oe.targetOpacity=1),Ye()}function ft(e,t=4){if(!e){B&&(B.targetOpacity=0,Ye());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!B||!B.initialized?B=zr(n,t):(B.target=n,B.borderRadius=t,B.targetOpacity=1),Ye()}function wa(e){rt=e,Ye()}function Fr(){rt=null,Ye()}function Sa(e){for(B=null;G.length>e.length;)G.pop();for(let t=0;t<e.length;t++){let n=e[t],o={x:n.rect.left,y:n.rect.top,w:n.rect.width,h:n.rect.height};t<G.length?(G[t].target=o,G[t].borderRadius=n.borderRadius,G[t].targetOpacity=1):G.push(zr(o,n.borderRadius))}Ye()}function un(){G=[],Ye()}function Vr(e,t){if(!Dr)return null;let n=Na();if(!n)return null;let o=Pa(n.x,n.y,n.w,n.h);for(let r of o){let i=e-r.x,a=t-r.y;if(i*i+a*a<=Ca*Ca)return r.corner}return null}function Ma(){return Na()}function La(){Ot!==null&&cancelAnimationFrame(Ot),window.removeEventListener("resize",_r),ee?.remove(),ee=null,k=null,oe=null,B=null,G=[],rt=null}function Na(){if(G.length>1)return ka(G);if(B&&B.opacity>=.5){let{x:e,y:t,w:n,h:o}=B.current;return{x:e,y:t,w:n,h:o}}if(G.length===1){let{x:e,y:t,w:n,h:o}=G[0].current;return{x:e,y:t,w:n,h:o}}return null}function ka(e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,r=-1/0;for(let i of e){let{x:a,y:l,w:d,h:c}=i.current;a<t&&(t=a),l<n&&(n=l),a+d>o&&(o=a+d),l+c>r&&(r=l+c)}return{x:t,y:n,w:o-t,h:r-n}}function zr(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function _r(){ee&&(dn=Math.max(window.devicePixelRatio||1,vc),Ar=window.innerWidth,Or=window.innerHeight,ee.width=Ar*dn,ee.height=Or*dn,ee.style.width=`${Ar}px`,ee.style.height=`${Or}px`,k=ee.getContext("2d"),Ye())}function Ye(){Ot===null&&(Ot=requestAnimationFrame(Ra))}function Ra(){if(Ot=null,!k||!ee)return;let e=!1;oe?.initialized&&(Hr(oe,bc)&&(e=!0),oe.opacity<.01&&oe.targetOpacity===0&&(oe=null)),B?.initialized&&(Hr(B,va)&&(e=!0),B.opacity<.01&&B.targetOpacity===0&&(B=null));for(let t=G.length-1;t>=0;t--){let n=G[t];n.initialized&&Hr(n,va)&&(e=!0),n.opacity<.01&&n.targetOpacity===0&&G.splice(t,1)}if(k.setTransform(1,0,0,1,0,0),k.clearRect(0,0,ee.width,ee.height),k.setTransform(dn,0,0,dn,0,0),oe&&Ir(k,oe,At,xc),B&&(Ir(k,B,At,xa),Dr&&Ea(k,B.current,B.opacity)),rt){if(k.save(),k.globalAlpha=.6,k.strokeStyle=At,k.lineWidth=1,k.setLineDash([4,4]),rt.verticalLine){let{x:t}=rt.verticalLine;k.beginPath(),k.moveTo(t,0),k.lineTo(t,ee.height),k.stroke()}if(rt.horizontalLine){let{y:t}=rt.horizontalLine;k.beginPath(),k.moveTo(0,t),k.lineTo(ee.width,t),k.stroke()}k.restore()}if(G.length>0){for(let t of G)Ir(k,t,At,xa);if(Dr&&G.length>0){let t=ka(G);t&&t.w>=24&&t.h>=24&&(G.length>1&&(k.globalAlpha=.6,k.beginPath(),k.rect(t.x,t.y,t.w,t.h),k.strokeStyle=At,k.lineWidth=1,k.setLineDash([4,4]),k.stroke(),k.setLineDash([]),k.globalAlpha=1),Ea(k,t,1))}}e&&(Ot=requestAnimationFrame(Ra))}function Hr(e,t){let n=e.current,o=e.target,r=$t(n.x,o.x,t),i=$t(n.y,o.y,t),a=$t(n.w,o.w,t),l=$t(n.h,o.h,t),d=$t(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<ao&&Math.abs(i-o.y)<ao&&Math.abs(a-o.w)<ao&&Math.abs(l-o.h)<ao&&Math.abs(d-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=l,e.opacity=d,!0)}function Ir(e,t,n,o){let{x:r,y:i,w:a,h:l}=t.current;if(a<=0||l<=0)return;let d=Math.min(t.borderRadius,a/2,l/2);e.globalAlpha=t.opacity,e.beginPath(),d>0?e.roundRect(r,i,a,l,d):e.rect(r,i,a,l),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function Pa(e,t,n,o){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+n,y:t},{corner:"br",x:e+n,y:t+o},{corner:"bl",x:e,y:t+o}]}function Ea(e,t,n){if(t.w<24||t.h<24)return;e.globalAlpha=n;let o=Pa(t.x,t.y,t.w,t.h);for(let r of o)e.beginPath(),e.arc(r.x,r.y,Cc,0,Math.PI*2),e.fillStyle=Ec,e.fill(),e.strokeStyle=Tc,e.lineWidth=wc,e.stroke();e.globalAlpha=1}var Sc=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],Mc=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],Lc=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],Nc=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],kc=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],Ie=[...Sc,...Mc,...Lc,...Nc,...kc];U();var Rc=new Set(["auto","none","normal","inherit","initial"]);function $a(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let l=document.createElement("input");l.type="text",l.className="prop-input",l.style.cssText="width:60px; cursor:text;";let d=document.createElement("span");d.style.cssText=`font-size:10px; color:${s.textSecondary}; font-family:${x};`,a.appendChild(l),a.appendChild(d);let c=new Map(t);function u(){return c.get(r.key)??r.defaultValue}function p(f){let m=parseFloat(f);l.value=isNaN(m)?f:String(m);try{let b=Pi(i,f).find(N=>N.cssValue===f);b?.token?d.textContent=`${r.tailwindPrefix}-${b.token}`:d.textContent=""}catch{d.textContent=""}}return l.addEventListener("blur",()=>{let f=l.value.trim(),m=parseFloat(f);if(isNaN(m))Rc.has(f)?(c.set(r.key,f),p(f),n(r.key,f),o()):p(u());else{let b=f.match(/(px|rem|em|%|vw|vh|ch)$/)?f:`${m}px`;c.set(r.key,b),p(b),n(r.key,b),o()}}),l.addEventListener("keydown",f=>{f.key==="Enter"?l.blur():f.key==="Escape"&&(p(u()),l.blur())}),p(u()),{element:a,setValue(f,m){f===r.key&&(c.set(f,m),p(m))},destroy(){}}}U();function Aa(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),p.textContent=u.icon??u.label,p.title=u.label,p.addEventListener("click",()=>{c(u.value),n(r.key,u.value),o()}),d.push({btn:p,value:u.value,opt:u}),a.appendChild(p)}return c(l),{element:a,setValue(u,p){u===r.key&&c(p)},destroy(){}}}U();U();function pn(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,l=0;a!==0&&(r===t?l=((n-o)/a+(n<o?6:0))*60:r===n?l=((o-t)/a+2)*60:l=((t-n)/a+4)*60);let d=r===0?0:a/r*100,c=r*100;return{h:l,s:d,v:c}}function so(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),l=o*(1-i*n),d=o*(1-(1-i)*n),c,u,p;switch(r%6){case 0:c=o,u=d,p=a;break;case 1:c=l,u=o,p=a;break;case 2:c=a,u=o,p=d;break;case 3:c=a,u=l,p=o;break;case 4:c=d,u=a,p=o;break;case 5:c=o,u=a,p=l;break;default:c=0,u=0,p=0}let f=m=>Math.round(m*255).toString(16).padStart(2,"0");return`#${f(c)}${f(u)}${f(p)}`}var it=null;function co(e){Ht();let t=K();if(!t)return;let n=document.createElement("div");n.style.cssText=`
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
  `,requestAnimationFrame(()=>{let y=n.getBoundingClientRect();y.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-y.width-8}px`),y.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-y.height-8}px`),n.style.opacity="1"});let o=pn(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let y=Pc(["Fill","Text"],0,T=>{r=T===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(y)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),l=document.createElement("div");l.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${$.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let d=document.createElement("div");d.style.cssText="position:relative;width:176px;height:120px;",d.appendChild(i),d.appendChild(l),n.appendChild(d);function c(){let y=o.h,T=a.createLinearGradient(0,0,176,0);T.addColorStop(0,`hsl(${y}, 0%, 100%)`),T.addColorStop(1,`hsl(${y}, 100%, 50%)`),a.fillStyle=T,a.fillRect(0,0,176,120);let z=a.createLinearGradient(0,0,0,120);z.addColorStop(0,"rgba(0,0,0,0)"),z.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=z,a.fillRect(0,0,176,120);let J=o.s/100*176,Q=(1-o.v/100)*120;l.style.left=`${J}px`,l.style.top=`${Q}px`}let u=!1;i.addEventListener("mousedown",y=>{u=!0,p(y)});function p(y){let T=i.getBoundingClientRect(),z=Math.max(0,Math.min(176,y.clientX-T.left)),J=Math.max(0,Math.min(120,y.clientY-T.top));o.s=z/176*100,o.v=(1-J/120)*100,c(),P()}let f=document.createElement("canvas");f.width=176,f.height=14,f.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let m=f.getContext("2d"),h=document.createElement("div");h.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${$.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let b=document.createElement("div");b.style.cssText="position:relative;width:176px;height:14px;",b.appendChild(f),b.appendChild(h),n.appendChild(b);function N(){let y=m.createLinearGradient(0,0,176,0);for(let T=0;T<=6;T++)y.addColorStop(T/6,`hsl(${T*60}, 100%, 50%)`);m.fillStyle=y,m.fillRect(0,0,176,14),h.style.left=`${o.h/360*176}px`}let M=!1;f.addEventListener("mousedown",y=>{M=!0,_(y)});function _(y){let T=f.getBoundingClientRect(),z=Math.max(0,Math.min(176,y.clientX-T.left));o.h=z/176*360,N(),c(),P()}let D=document.createElement("input");D.type="text",D.value=so(o),D.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${s.bgSecondary};
    border: 1px solid ${s.border};
    border-radius: ${L.sm};
    color: ${s.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,D.addEventListener("keydown",y=>{y.key==="Enter"&&D.blur(),y.stopPropagation()}),D.addEventListener("blur",()=>{let y=D.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(y)){let T=y.startsWith("#")?y:`#${y}`;o=pn(T),c(),N(),P()}else D.value=so(o)}),n.appendChild(D);let W=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],E=document.createElement("div");E.style.cssText="display:flex;gap:4px;justify-content:center;";for(let y of W){let T=document.createElement("button");T.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${y};
      border: 1px solid ${s.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${C.fast};
    `,T.addEventListener("mouseenter",()=>{T.style.boxShadow=$.sm}),T.addEventListener("mouseleave",()=>{T.style.boxShadow="none"}),T.addEventListener("click",()=>{o=pn(y),c(),N(),D.value=y,P()}),E.appendChild(T)}if(n.appendChild(E),e.projectColors&&e.projectColors.length>0){let y=document.createElement("div");y.textContent="Project",y.style.cssText=`
      font-size: 10px;
      color: ${s.textSecondary};
      font-family: ${x};
      margin-top: 2px;
    `,n.appendChild(y);let T=document.createElement("div");T.style.cssText="display:flex;gap:4px;flex-wrap:wrap;max-height:48px;overflow-y:auto;";for(let{token:z,hex:J}of e.projectColors){let Q=document.createElement("button");Q.title=z,Q.style.cssText=`
        width: 12px; height: 12px; border-radius: 50%;
        background: ${J};
        border: 1px solid ${s.border};
        cursor: pointer; padding: 0;
        transition: box-shadow ${C.fast};
      `,Q.addEventListener("mouseenter",()=>{Q.style.boxShadow=$.sm}),Q.addEventListener("mouseleave",()=>{Q.style.boxShadow="none"}),Q.addEventListener("click",()=>{o=pn(J),c(),N(),D.value=J,P(),e.onPickedToken?.(z)}),T.appendChild(Q)}n.appendChild(T)}function P(){let y=so(o);D.value=y,e.onColorChange(y),e.onPickedToken?.(void 0)}t.appendChild(n),it=n,c(),N();let de=y=>{u&&p(y),M&&_(y)},ue=()=>{u=!1,M=!1};document.addEventListener("mousemove",de),document.addEventListener("mouseup",ue);let R=y=>{y.key==="Escape"&&Ht()};document.addEventListener("keydown",R,!0);let Y=y=>{it&&!y.composedPath().includes(it)&&Ht()};setTimeout(()=>document.addEventListener("mousedown",Y,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",de),document.removeEventListener("mouseup",ue),document.removeEventListener("keydown",R,!0),document.removeEventListener("mousedown",Y,!0)},n._onClose=e.onClose}function Ht(){it&&(it._cleanup?.(),it._onClose?.(),it.remove(),it=null)}function Pc(e,t,n){let o=document.createElement("div");o.style.cssText=`
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
    `,a.addEventListener("click",()=>{r.forEach((l,d)=>{l.style.background=d===i?s.bgPrimary:"transparent",l.style.boxShadow=d===i?$.sm:"none",l.style.color=d===i?s.textPrimary:s.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var Br=null;function $c(){return Br||(Br=document.createElement("canvas").getContext("2d")),Br}function Oa(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${L.sm};
    border:1px solid ${s.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let l=document.createElement("input");l.type="text",l.placeholder="#rrggbb",l.className="prop-input",l.style.cssText="flex:1; min-width:0;";let d=document.createElement("span");d.style.cssText=`font-size:10px; color:${s.textSecondary}; font-family:${x};`,i.appendChild(a),i.appendChild(l),i.appendChild(d);let c=t.get(r.key)??r.defaultValue,u=!1;function p(h){let b=h.trim().toLowerCase();if(b==="transparent")return"transparent";if(b==="inherit"||b==="currentcolor"||b==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(b))return b;let N=$c();N.fillStyle="#000000",N.fillStyle=b;let M=N.fillStyle;if(M.startsWith("#"))return M;let _=M.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(_){let D=parseInt(_[1],10),W=parseInt(_[2],10),E=parseInt(_[3],10);return`#${((1<<24)+(D<<16)+(W<<8)+E).toString(16).slice(1)}`}return"#000000"}function f(h){c=h,l.value=h,h==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=h;try{let b=Jt(),N=Kn(h,b.colorsReverse);N?d.textContent=`${r.tailwindPrefix??"bg"}-${N}`:d.textContent=""}catch{d.textContent=""}}function m(){if(u)return;let h=l.value.trim();if(!h){f(c);return}let b=p(h);f(b),n(r.key,b),o()}return a.addEventListener("click",()=>{if(u){Ht(),u=!1;return}let h=a.getBoundingClientRect();u=!0,co({initialColor:p(c),position:{x:h.left-210,y:h.top},showPropertyToggle:!1,onColorChange:b=>{f(b),n(r.key,b)},onClose:()=>{u=!1,o()}})}),l.addEventListener("keydown",h=>{h.key==="Enter"?(m(),l.blur()):h.key==="Escape"&&(f(c),l.blur())}),l.addEventListener("blur",()=>{m()}),l.addEventListener("input",()=>{let h=l.value.trim(),b=p(h);a.style.background=b}),f(c),{element:i,setValue(h,b){h===r.key&&f(b)},destroy(){u&&(Ht(),u=!1)}}}U();function Ha(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function Ia(e,t,n,o){let r=new Map(t),i=[];for(let S of e){let w=Ha(S.key);w&&i.push({descriptor:S,...w})}let a=document.createElement("div");a.style.cssText=`
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
  `.trim().replace(/\n\s*/g," "),u.textContent="content";let p=[];function f(S){let w=document.createElement("span"),be=r.get(S.key)??S.defaultValue;return w.textContent=_(be),w.title=S.label,w.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),w.addEventListener("mouseenter",()=>{w.style.background=s.bgTertiary}),w.addEventListener("mouseleave",()=>{(document.activeElement!==m||m.dataset.key!==S.key)&&(w.style.background="transparent")}),w.addEventListener("click",()=>{N(S,w)}),p.push({key:S.key,span:w,descriptor:S}),w}let m=document.createElement("input");m.type="text",m.className="prop-input",m.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(m);let h=null,b=null;function N(S,w){h&&h!==S&&M(),h=S,b=w,m.dataset.key=S.key;let be=r.get(S.key)??S.defaultValue;m.value=_(be);let te=0,dt=0,tt=w;for(;tt&&tt!==a;)te+=tt.offsetLeft,dt+=tt.offsetTop,tt=tt.offsetParent;m.style.display="block",m.style.left=`${te}px`,m.style.top=`${dt}px`;let Ri=w.getBoundingClientRect();m.style.width=`${Math.max(40,Ri.width+10)}px`,m.focus(),m.select()}function M(){if(!h||!b)return;let S=m.value.trim(),w=h,be=b,te,dt=parseFloat(S),tt=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(dt)?tt.has(S)?te=S:te=r.get(w.key)??w.defaultValue:te=S.match(/(px|rem|em|%|vw|vh|ch)$/)?S:`${dt}px`,r.set(w.key,te),be.textContent=_(te),be.style.background="transparent",m.style.display="none",m.dataset.key="",h=null,b=null,n(w.key,te),o()}m.addEventListener("keydown",S=>{if(S.key==="Enter")M();else if(S.key==="Escape"){if(h&&b){let w=r.get(h.key)??h.defaultValue;b.textContent=_(w)}m.style.display="none",m.dataset.key="",h=null,b=null}}),m.addEventListener("blur",()=>{M()});function _(S){let w=parseFloat(S);return isNaN(w)?S:w===Math.round(w)?String(Math.round(w)):S}function D(S){let w=document.createElement("span");return w.textContent=S,w.style.cssText=`
      font-size:9px;
      color:${s.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),w}function W(S,w){return i.find(be=>be.layer===S&&be.side===w)}function E(S,w){let be=W(S,w);if(!be){let te=document.createElement("span");return te.textContent="-",te.style.cssText=`text-align:center; color:${s.textTertiary};`,te}return f(be.descriptor)}let P=E("padding","top");P.style.gridRow="1",P.style.gridColumn="2",P.style.textAlign="center";let de=E("padding","left");de.style.gridRow="2",de.style.gridColumn="1";let ue=E("padding","right");ue.style.gridRow="2",ue.style.gridColumn="3";let R=E("padding","bottom");R.style.gridRow="3",R.style.gridColumn="2",R.style.textAlign="center",u.style.gridRow="2",u.style.gridColumn="2",c.appendChild(P),c.appendChild(de),c.appendChild(u),c.appendChild(ue),c.appendChild(R);let Y=document.createElement("div");Y.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let y=E("margin","top");y.style.gridRow="1",y.style.gridColumn="2",y.style.textAlign="center";let T=E("margin","left");T.style.gridRow="2",T.style.gridColumn="1";let z=E("margin","right");z.style.gridRow="2",z.style.gridColumn="3";let J=E("margin","bottom");J.style.gridRow="3",J.style.gridColumn="2",J.style.textAlign="center";let Q=document.createElement("div");Q.style.cssText="grid-row:2; grid-column:2;",Q.appendChild(c),Y.appendChild(y),Y.appendChild(T),Y.appendChild(Q),Y.appendChild(z),Y.appendChild(J);let Un=D("margin"),hs=D("padding"),Xn=document.createElement("div");return Xn.style.cssText="display:flex; gap:8px; padding:0 4px;",Xn.appendChild(Un),Xn.appendChild(hs),d.appendChild(Y),l.appendChild(d),a.appendChild(Xn),a.appendChild(l),{element:a,setValue(S,w){if(!Ha(S))return;r.set(S,w);let te=p.find(dt=>dt.key===S);te&&(te.span.textContent=_(w))},destroy(){}}}U();var uo=new Set;function Da(e){return uo.has(e)}var po=[];function _a(e){return po.push(e),()=>{let t=po.indexOf(e);t>=0&&po.splice(t,1)}}var Ac={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},Oc={"number-scrub":$a,segmented:Aa,"color-swatch":Oa,"box-model":Ia},Hc=`
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
`;function Ic(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function Dc(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function _c(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}var Fc=new Set(["flexDirection","justifyContent","alignItems","gap"]);function Vc(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function Wr(e,t,n,o,r){let i=document.createElement("div");i.className="prop-sections";let a=document.createElement("style");a.textContent=Hc,i.appendChild(a);let l=[],d=Dc(e);for(let[c,u]of d){let p=c==="layout"&&!Vc(t)?u.filter(M=>!Fc.has(M.key)):u;if(p.length===0)continue;let f=document.createElement("div");f.className="prop-section";let m=document.createElement("div");m.className="prop-section-header",m.innerHTML=`<span>${Ac[c]}</span>${Ic()}`;let h=document.createElement("div");h.className="prop-section-body";let b=uo.has(c);if(b){let M=m.querySelector(".prop-section-chevron");M&&M.classList.add("collapsed"),h.classList.add("collapsed")}m.addEventListener("click",()=>{if(b=!b,b)uo.add(c);else{uo.delete(c);for(let _ of po)_(c)}let M=m.querySelector(".prop-section-chevron");M&&M.classList.toggle("collapsed",b),h.classList.toggle("collapsed",b)}),f.appendChild(m);let N=_c(p);for(let M of N){let _=Oc[M.controlType];if(!_)continue;let D=_(M.descriptors,t,n,o);if(M.descriptors.length>1||M.controlType==="box-model")h.appendChild(D.element);else{let W=document.createElement("div");W.className="prop-control-row";let E=document.createElement("span");E.className="prop-control-label",E.textContent=M.descriptors[0].label,E.title=M.descriptors[0].label;let P=document.createElement("div");P.className="prop-control-value",P.appendChild(D.element),W.appendChild(E),W.appendChild(P),h.appendChild(W)}l.push(D)}f.appendChild(h),i.appendChild(f)}if(r){let c=document.createElement("div");c.className="prop-show-all",c.textContent="Show all properties",c.addEventListener("click",r),i.appendChild(c)}return{container:i,controls:l}}U();var zc=300,Fa=260,Va=380,za="frameup-sidebar-width",Bc=4,Wc=`
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
    width: ${Bc}px;
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
`;function Gc(){try{let e=localStorage.getItem(za);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=Fa&&t<=Va)return t}}catch{}return Math.min(zc,Math.floor(window.innerWidth*.22))}function jc(e){try{localStorage.setItem(za,String(e))}catch{}}function Ba(e,t){let n=document.createElement("style");n.textContent=Wc,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${Gc()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let l=document.createElement("div");l.className="prop-sidebar-component-name";let d=document.createElement("span");d.className="prop-sidebar-saving-dot";let c=document.createElement("div");c.className="prop-sidebar-file-path",a.appendChild(l),a.appendChild(c);let u=document.createElement("button");u.className="prop-sidebar-close",u.title="Collapse panel",u.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="8,2 4,6 8,10"/></svg>',i.appendChild(a),i.appendChild(u),o.appendChild(i);let p=document.createElement("div");p.className="prop-sidebar-warning",p.style.display="none",o.appendChild(p);let f=document.createElement("div");f.className="prop-sidebar-content",o.appendChild(f),e.appendChild(o);let m=!1,h=0,b=0;r.addEventListener("pointerdown",R=>{R.preventDefault(),R.stopPropagation(),m=!0,h=R.clientX,b=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(R.pointerId)}),r.addEventListener("pointermove",R=>{if(!m)return;let Y=h-R.clientX,y=Math.max(Fa,Math.min(Va,b+Y));o.style.width=`${y}px`});let N=()=>{m&&(m=!1,r.classList.remove("active"),jc(o.offsetWidth))};r.addEventListener("pointerup",N),r.addEventListener("pointercancel",N),o.addEventListener("pointerdown",R=>R.stopPropagation()),o.addEventListener("mousedown",R=>R.stopPropagation()),o.addEventListener("click",R=>R.stopPropagation()),o.addEventListener("mouseup",R=>R.stopPropagation()),u.addEventListener("click",()=>{D(),t&&t()});let M=!1;function _(R,Y,y,T){l.textContent=`<${R}>`,l.appendChild(d),c.textContent=`${Y}:${y}`,c.title=`${Y}:${y}`,f.innerHTML="",f.appendChild(T),M||(M=!0,o.offsetHeight,o.classList.add("visible"))}function D(){M&&(M=!1,o.classList.remove("visible"))}function W(R){f.innerHTML="",f.appendChild(R)}function E(R,Y,y){p.innerHTML="";let T=document.createElement("span");T.className="prop-sidebar-warning-text",T.textContent=R;let z=document.createElement("button");z.className="prop-sidebar-warning-btn",z.textContent=Y,z.addEventListener("click",J=>{J.stopPropagation(),y()}),p.appendChild(T),p.appendChild(z),p.style.display="flex"}function P(){p.style.display="none",p.innerHTML=""}function de(){d.classList.add("active")}function ue(){d.classList.remove("active")}return{show:_,hide:D,isVisible:()=>M,getElement:()=>o,replaceContent:W,showWarning:E,clearWarning:P,showSaving:de,hideSaving:ue}}U();fn();var st=new Map,Ft=!1,Mo=new Set,Tn=[];function ri(e){return Tn.push(e),()=>{Tn=Tn.filter(t=>t!==e)}}function Mn(){Tn.forEach(e=>e())}function Re(e){let t=crypto.randomUUID(),n={...e,id:t,timestamp:Date.now()};return st.set(t,n),Mn(),t}function Qc(e){let t=st.get(e);if(!(!t||t.state==="reverted")){switch(t.revertData.type){case"noop":return;case"cliUndo":case"generateUndo":Mo.add(e),me({type:"revertChanges",undoIds:t.revertData.undoIds});break;case"moveRemove":{let{moveId:n}=t.revertData;Promise.resolve().then(()=>(le(),To)).then(({removeMove:o})=>{o(n)}),So(t);break}case"moveRestore":{let{moveId:n,previousDelta:o}=t.revertData;Promise.resolve().then(()=>(le(),To)).then(({restoreMoveDelta:r})=>{r(n,o)}),So(t);break}case"annotationRemove":{let{annotationId:n,originalInnerHTML:o}=t.revertData;Promise.resolve().then(()=>(le(),To)).then(({removeAnnotation:r})=>{r(n)}),So(t);break}}t.state="reverted",Mn()}}function ii(){let e=0;for(let t of st.values())t.state!=="reverted"&&e++;return e}function Ln(){return Ft}function Nn(e){Ft=e,Mn()}function ed(){st.clear(),Mn()}var se=null,Ue=null,Xe=null,ht=null,wo=null,wn=null,td=`
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
    cursor: default;
  }
  .changelog-entry:last-child {
    border-bottom: none;
  }
  .changelog-entry.selectable {
    cursor: pointer;
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
  .entry-separator {
    color: ${s.textTertiary};
    margin: 0 6px;
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
`;function nd(e){let t=Math.floor((Date.now()-e)/1e3);if(t<10)return"just now";let n=Math.floor(t/60),o=t%60;return`${n}:${String(o).padStart(2,"0")} ago`}function od(e){return e.split("/").pop()??e}function Sn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ua(e){return!!e.elementIdentity}function rd(e){return e.state!=="reverted"&&e.revertData.type!=="noop"}function id(e){let t=Sn(e.summary).replaceAll(" \u2192 ",'<span class="arrow"> \u2192 </span>');return`<span class="component-name">${Sn(e.componentName)}</span><span class="entry-separator">\u2022</span>${t}`}function So(e){Re({type:e.type,componentName:e.componentName,filePath:e.filePath,summary:`reverted ${e.summary}`,state:"active",propertyKey:e.propertyKey,elementIdentity:e.elementIdentity,revertData:{type:"noop"}})}async function ad(e){let t=st.get(e),n=t?.elementIdentity;if(!t||!n)return;let o=It(n);if(o||(o=await mo(n)),!o){F(`Couldn't find ${t.componentName}`);return}await yt(o,{skipSidebar:!1})}function ld(){if(!Ue)return;let e=Array.from(st.values()).reverse();if(e.length===0){Ue.innerHTML='<div class="changelog-empty">No logs yet. Changes will appear here.</div>';return}Ue.innerHTML=e.map(o=>{let r=["changelog-entry",Ua(o)?"selectable":"",o.state==="reverted"?"reverted":"",o.state==="pending"?"pending":""].filter(Boolean).join(" "),i=o.filePath?od(o.filePath):"",a=nd(o.timestamp);return`<div class="${r}" data-entry-id="${Sn(o.id)}">
  <span class="entry-summary">${id(o)}</span>
  ${i?`<span class="entry-file" title="${Sn(i)}">${Sn(i)}</span>`:""}
  <span class="entry-time">${a}</span>
  ${rd(o)?'<button class="entry-revert" title="Revert this change">\u21A9</button>':""}
</div>`}).join("");let t=Array.from(Ue.querySelectorAll(".entry-revert"));for(let o of t){let i=o.closest(".changelog-entry")?.dataset.entryId;i&&o.addEventListener("click",a=>{a.stopPropagation(),Qc(i)})}let n=Array.from(Ue.querySelectorAll(".changelog-entry"));for(let o of n){let r=o.dataset.entryId;if(!r)continue;let i=st.get(r);!i||!Ua(i)||o.addEventListener("click",()=>{ad(r)})}}function sd(){if(!Xe)return;let e=ii();e===0?Xe.classList.add("hidden"):(Xe.classList.remove("hidden"),Xe.textContent=String(e))}function Xa(e){wn=document.createElement("style"),wn.textContent=td,e.appendChild(wn),se=document.createElement("div"),se.className="changelog-panel",se.style.display="none";let t=document.createElement("div");t.className="changelog-header";let n=document.createElement("div");n.className="changelog-header-main";let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.classList.add("changelog-header-icon"),o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.7"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.innerHTML='<path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path>';let r=document.createElement("span");r.className="changelog-title",r.textContent="Logs",Xe=document.createElement("span"),Xe.className="changelog-badge hidden",Xe.textContent="0";let i=document.createElement("span");i.className="changelog-header-copy",i.textContent="Latest changes",ht=document.createElement("svg"),ht.className="changelog-chevron",ht.setAttribute("viewBox","0 0 16 16"),ht.setAttribute("fill","currentColor"),ht.innerHTML='<path d="M3.5 5.5L8 10l4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',n.appendChild(o),n.appendChild(r),n.appendChild(Xe),n.appendChild(i),t.appendChild(n),t.appendChild(ht),t.addEventListener("click",()=>Nn(!Ft)),se.appendChild(t),Ue=document.createElement("div"),Ue.className="changelog-body",se.appendChild(Ue),e.appendChild(se);let a=ri(()=>{ld(),sd(),se&&(Ft&&se.style.display==="none"?(se.style.display="",requestAnimationFrame(()=>{requestAnimationFrame(()=>{se?.classList.add("visible")})})):Ft||(se.style.display="none",se.classList.remove("visible")),se.classList.toggle("collapsed",!Ft))});wo=ve(d=>{if(d.type==="revertComplete"){for(let[c,u]of st){if(!Mo.has(c))continue;let p=u.revertData;if(p.type!=="cliUndo"&&p.type!=="generateUndo")continue;let f=d.results.filter(m=>p.undoIds.includes(m.undoId));f.length!==0&&(Mo.delete(c),f.every(m=>m.success)?So(u):(u.state="active",Mn()))}for(let c of d.results)!c.success&&c.error&&F(`Revert failed: ${c.error}`)}});let l=Lo;Lo=()=>{l(),a()}}var Lo=()=>{};function Ka(){wo&&(wo(),wo=null),Lo(),Lo=()=>{},se?.remove(),se=null,wn?.remove(),wn=null,Ue=null,Xe=null,ht=null,Mo.clear(),ed(),Tn=[]}le();U();var qa="frameup-onboarding-dismissed",Pe=null;function Za(){if(localStorage.getItem(qa))return;let e=K();if(!e)return;Pe=document.createElement("div"),Pe.style.cssText=`
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
  `,n.addEventListener("click",()=>kn()),Pe.appendChild(t),Pe.appendChild(n),e.appendChild(Pe),requestAnimationFrame(()=>{Pe&&(Pe.style.opacity="1")})}function kn(){Pe&&(localStorage.setItem(qa,"1"),Pe.style.opacity="0",setTimeout(()=>{Pe?.remove(),Pe=null},150))}pt();Rt();var ai=new Map(Ie.map(e=>[e.key,e]));var cd=new Set(["layout","spacing","size"]),Ja=new Set(["typography","background"]),dd=new Set(["h1","h2","h3","h4","h5","h6","p","span","a","button","label","li","td","th","blockquote","figcaption"]);function el(e){let t=new Set(["spacing","size","background"]),o=getComputedStyle(e).display;(o==="flex"||o==="inline-flex"||o==="grid"||o==="inline-grid"||e.children.length>0)&&t.add("layout");let r=e.tagName.toLowerCase();return(Array.from(e.childNodes).some(a=>a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()??"").length>0)||dd.has(r))&&t.add("typography"),t}var ud=5e3,g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1},bt=[],A,Qa,Ce=null,pd=300,we=null,Rn=null,Vt=null,No=null,ko=new MutationObserver(()=>{g.selectedElement&&!document.contains(g.selectedElement)&&(clearTimeout(Qa),Qa=setTimeout(()=>{md()},80))});function md(){let e=g.elementIdentity,t=g.componentInfo;if(!e||!t){vt();return}let n=fd(e);if(n){zt(n,t);return}gd(e).then(o=>{o?zt(o,t):vt()})}function fd(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);for(;o;){if(xe(o)){let r=o._debugSource,i=ie(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function gd(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=ne(n);if(!o)continue;let r=await Oe(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let l="";if(i.fileName){let d=Ne(i.fileName);He(d)&&(l=d)}if(l&&e.filePath.endsWith(l)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}function hd(e,t){let n=getComputedStyle(e),o=new Map;for(let r of Ie){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function yd(e){if(!g.selectedElement)return;let t=getComputedStyle(g.selectedElement);for(let n of Ie){if(n.group!==e||g.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;g.currentValues.set(n.key,r),g.originalValues.get(n.key)===n.defaultValue&&g.originalValues.set(n.key,r);for(let i of bt)i.setValue(n.key,r)}}function Pn(){for(let e of bt)e.destroy();bt=[]}function li(){if(!g.selectedElement||!g.componentInfo)return;Pn();let e=g.showAllGroups?null:el(g.selectedElement),t=e?Ie.filter(a=>e.has(a.group)):Ie,o=e!==null&&t.length<Ie.length?()=>rl(!0):void 0,{container:r,controls:i}=Wr(t,g.currentValues,$n,Ro,o);bt=i,A.replaceContent(r)}function Ro(){Ce&&clearTimeout(Ce),Ce=setTimeout(()=>{Ce=null,ci()},pd)}function si(){Ce&&(clearTimeout(Ce),Ce=null),Vt&&(Vt(),Vt=null),we&&(clearTimeout(we.timeoutId),we=null),g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1}}function tl(e){A=Ba(e,()=>{Po(),Pn(),si()}),Oi((t,n,o)=>{if(A&&A.hideSaving(),we)if(clearTimeout(we.timeoutId),t)we=null;else{let{batch:r,previousOriginals:i}=we;we=null;for(let[a]of r){let l=i.get(a);l!==void 0&&g.originalValues.set(a,l)}if(g.selectedElement){for(let[a]of r){g.selectedElement.style[a]="",g.activeOverrides.delete(a);let l=g.originalValues.get(a);l!==void 0&&g.currentValues.set(a,l)}for(let a of bt)for(let[l]of r){let d=g.originalValues.get(l);d!==void 0&&a.setValue(l,d)}}if(A){let l={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";A.showWarning(l,"Dismiss",()=>A.clearWarning())}}else if(!t&&A){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";A.showWarning(i,"Dismiss",()=>A.clearWarning())}}),No=ve(t=>{if(t.type==="updatePropertyComplete"&&t.success&&t.undoId&&Rn){let{componentInfo:n,batch:o}=Rn,r={componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber,columnNumber:n.columnNumber,tagName:n.tagName};for(let i of o)Re({type:"property",componentName:n.componentName,filePath:n.filePath,summary:`${i.cssProperty}: ${i.originalValue} \u2192 ${i.value}`,state:"active",propertyKey:i.cssProperty,elementIdentity:r,revertData:{type:"cliUndo",undoIds:[t.undoId]}});Rn=null}})}function zt(e,t){g.pendingBatch.size>0&&ci(),kn(),Pn(),g.showAllGroups=!1,g.selectedElement=e,g.componentInfo=t,g.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(cd);for(let u of Ja)Da(u)||n.add(u);let o=hd(e,n);g.currentValues=o,g.originalValues=new Map(o),g.activeOverrides=new Map,g.pendingBatch=new Map,Vt&&Vt(),Vt=_a(u=>{Ja.has(u)&&yd(u)});let r=g.showAllGroups?null:el(e),i=r?Ie.filter(u=>r.has(u.group)):Ie,l=r!==null&&i.length<Ie.length?()=>rl(!0):void 0,{container:d,controls:c}=Wr(i,g.currentValues,$n,Ro,l);bt=c,ko.disconnect(),ko.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),A.show(t.componentName,t.filePath,t.lineNumber,d),t.filePath?A.clearWarning():A.showWarning("Source file couldn't be resolved for this element","Dismiss",()=>A.clearWarning())}function $n(e,t){let n=ai.get(e);if(!n||!g.selectedElement)return;g.selectedElement.style[n.key]=t,g.activeOverrides.set(e,t),g.currentValues.set(e,t);let o=Jt(),r=n.tailwindScale+"Reverse",i=o[r],a=i?Kn(t,i):null;if(!a&&n.enumValues){let l=n.enumValues.find(d=>d.value===t);l&&(a=l.tailwindValue)}if(g.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:g.originalValues.get(e)||n.defaultValue}),e==="display")if(li(),t==="none"){let l=g.originalValues.get("display")||"block";A.showWarning("Element hidden","Restore",()=>{g.selectedElement&&(g.selectedElement.style.display=l),g.activeOverrides.delete("display"),g.currentValues.set("display",l),g.pendingBatch.delete("display"),li(),A.clearWarning()})}else A.clearWarning()}function ci(){if(g.pendingBatch.size===0||!g.componentInfo)return;let e=g.componentInfo.filePath;if(!e){g.pendingBatch.clear(),A&&(A.hideSaving(),A.showWarning("This element can be inspected, but its source file couldn't be resolved","Dismiss",()=>A.clearWarning())),F("Can't save changes for this element");return}let t=g.componentInfo.lineNumber,n=g.componentInfo.columnNumber-1;if(Rn={componentInfo:{...g.componentInfo},batch:[...g.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,originalValue:a.originalValue,value:a.value}))},g.pendingBatch.size===1){let a=[...g.pendingBatch.values()][0],l=ai.get(a.property);me({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:n,...a,framework:"tailwind",classPattern:l?.classPattern,standalone:l?.standalone})}else me({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:n,updates:[...g.pendingBatch.values()].map(a=>{let l=ai.get(a.property);return{...a,classPattern:l?.classPattern,standalone:l?.standalone}}),framework:"tailwind"});g.selectedElement&&g.elementIdentity&&vn({type:"propertyChange",elementIdentity:g.elementIdentity,element:g.selectedElement,overrides:[...g.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),A&&A.showSaving();let o=new Map;for(let[a]of g.pendingBatch)o.set(a,g.originalValues.get(a)||"");for(let[a,l]of g.pendingBatch)g.originalValues.set(a,l.value);let r=new Map(g.pendingBatch),i=setTimeout(()=>{we&&we.batch===r&&(we=null,A&&A.hideSaving())},ud);we={batch:r,previousOriginals:o,timeoutId:i},g.pendingBatch.clear()}function Po(){if(g.selectedElement){for(let[e]of g.activeOverrides)g.selectedElement.style[e]="";for(let[e,t]of g.originalValues)g.currentValues.set(e,t);for(let e of bt)for(let[t,n]of g.originalValues)e.setValue(t,n);g.activeOverrides.clear(),g.pendingBatch.clear()}}function vt(){Ce&&(clearTimeout(Ce),Ce=null),ko.disconnect(),Po(),Pn(),A&&A.hide(),si()}function nl(){Ce&&(clearTimeout(Ce),Ce=null),ko.disconnect(),ci(),Pn(),A&&A.hide(),si()}function ol(){return g.activeOverrides.size>0}function rl(e){g.showAllGroups=e,li()}function il(){No&&(No(),No=null),Rn=null,vt()}var xt=null;function al(e,t){if(!xt)return;let n=performance.now(),o=Math.abs(e-xt.clientX),r=Math.abs(t-xt.clientY),i=o<=2&&r<=2,a=n-xt.timestamp<16;if(i||a)return xt.element}function ll(e,t,n){xt={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function Bt(){xt=null}le();U();var bd=.1,vd=5,xd=.002,Cd=24,sl=1,Ed="rgba(0,0,0,0.15)",Z=null,$e=null,di=null,dl=[],ul=[];var ui="",pi="";function Td(){ui=document.body.style.background||document.body.style.backgroundColor||"",pi=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",Z=document.createElement("div"),Z.setAttribute("data-frameup-canvas-wrapper","true"),Z.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${n};
  `.trim().replace(/\n\s*/g," "),$e=document.createElement("div"),$e.setAttribute("data-frameup-dot-bg","true"),$e.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${s.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="frameup-root"||r.hasAttribute("data-frameup-interaction")||r.hasAttribute("data-frameup-placeholder")||r.hasAttribute("data-frameup-annotation")||r.hasAttribute("data-frameup-dot-bg")||r.hasAttribute("data-frameup-canvas-wrapper"))||(dl.push(r),Z.appendChild(r));Z.style.position="relative",Z.style.zIndex="1",document.body.insertBefore($e,document.body.firstChild),document.body.insertBefore(Z,$e.nextSibling),di=Cn(cl),cl(),ul.forEach(r=>r(Z))}function cl(){if(!Z||!$e)return;let{scale:e,offsetX:t,offsetY:n}=_e();Z.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=Cd*e,r=t%o,i=n%o;$e.style.backgroundImage=`radial-gradient(circle, ${Ed} ${sl}px, transparent ${sl}px)`,$e.style.backgroundSize=`${o}px ${o}px`,$e.style.backgroundPosition=`${r}px ${i}px`}function wd(e,t,n){let{scale:o,offsetX:r,offsetY:i}=_e(),a=Math.min(vd,Math.max(bd,o+n));if(a===o)return;let l=(e-r)/o,d=(t-i)/o,c=e-l*a,u=t-d*a;xn(a,c,u)}function pl(e){e.preventDefault();let t=-e.deltaY*xd,{scale:n}=_e(),o=t*n;wd(e.clientX,e.clientY,o)}function ml(e,t){let{scale:n,offsetX:o,offsetY:r}=_e();xn(n,o+e,r+t)}function fl(){xn(1,0,0)}function gl(){return Z!==null}function hl(){Z?mi():Td()}function mi(){if(ul.forEach(e=>e(null)),di?.(),di=null,Z){for(;Z.firstChild;)document.body.insertBefore(Z.firstChild,Z);Z.remove(),Z=null}$e?.remove(),$e=null,dl=[],document.body.style.background=ui,document.documentElement.style.background=pi,ui="",pi=""}pt();Rt();U();le();le();function Gt(e,t){return e.length>t?e.slice(0,t)+"\u2026":e}var Sd=new Set(["IMG","INPUT","VIDEO","IFRAME","CANVAS","SELECT","TEXTAREA","HR","BR","EMBED","OBJECT","PROGRESS"]),j=null,Ct="",An="",$o="",Ee=null,fi="",gi=null,Wt=null;function Ke(){return j!==null}function yl(){document.addEventListener("dblclick",vl,!0),document.addEventListener("mousedown",El,!0),gi=ve(e=>{e.type==="updateTextComplete"&&Md(e)})}function bl(){j&&wl(),document.removeEventListener("dblclick",vl,!0),document.removeEventListener("mousedown",El,!0),gi?.(),gi=null}function Md(e){if(e.success&&e.undoId&&Wt){let t=Wt,n={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};Re({type:"textEdit",componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,summary:`"${Gt(t.originalText,20)}" \u2192 "${Gt(t.newText,20)}"`,state:"active",elementIdentity:n,revertData:{type:"cliUndo",undoIds:[e.undoId]}})}else if(!e.success&&e.reason==="no-match"&&Wt){let t=Wt,n={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,originalText:t.originalText,newText:t.newText},o={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};xo(n,o,t.originalInnerHTML),Re({type:"textAnnotation",componentName:n.componentName,filePath:n.filePath||"",summary:`"${Gt(n.originalText,20)}" \u2192 "${Gt(n.newText,20)}"`,state:"pending",elementIdentity:o,revertData:{type:"annotationRemove",annotationId:n.id,originalInnerHTML:t.originalInnerHTML,elementIdentity:o}})}Wt=null}function Ld(e){return!!(e.scrollHeight>e.clientHeight+4||e.querySelector("br")||getComputedStyle(e).whiteSpace!=="nowrap"&&e.getClientRects().length>1)}async function Nd(e){let t=ne(e);if(!t)return null;try{let n=await Oe(t);if(n&&n.length>0)for(let o of n){if(!o.functionName)continue;let r=o.functionName;if(r[0]!==r[0].toUpperCase()||je(r))continue;let i="";if(o.fileName){let a=Ne(o.fileName);He(a)&&(i=a)}return{tagName:e.tagName.toLowerCase(),componentName:r,filePath:i,lineNumber:o.lineNumber??0,columnNumber:o.columnNumber??0,stack:[],boundingRect:e.getBoundingClientRect()}}}catch{}try{let n=t;for(;n;){if(xe(n)){let o=ie(n.type),r=n._debugSource||n._debugOwner?._debugSource;if(o&&o[0]===o[0].toUpperCase()&&!je(o)&&r)return{tagName:e.tagName.toLowerCase(),componentName:o,filePath:r.fileName||"",lineNumber:r.lineNumber||0,columnNumber:r.columnNumber||0,stack:[],boundingRect:e.getBoundingClientRect()}}if(!n.return)break;n=n.return}}catch{}return null}function vl(e){j&&Et();let t=null,n=e.target;n instanceof HTMLElement&&n!==document.documentElement&&n!==document.body&&!n.hasAttribute("data-frameup-interaction")&&!n.closest("#frameup-root")?t=n:t=Tt(e.clientX,e.clientY),t&&(Sd.has(t.tagName)||t.textContent?.trim()&&(e.preventDefault(),kd(t)))}function kd(e){j=e,Ct=e.textContent||"",An=e.innerHTML,$o=Ct,Ee=null,Nd(e).then(n=>{j===e&&(Ee=n)}),fi=e.style.outline,e.style.outline=`2px solid ${s.accent}`,e.contentEditable="true",Sl(!1),e.focus();let t=window.getSelection();if(t){t.removeAllRanges();let n=document.createRange();n.selectNodeContents(e),n.collapse(!1),t.addRange(n)}e.addEventListener("blur",Cl),e.addEventListener("keydown",Tl),e.addEventListener("input",xl)}function xl(){j&&($o=j.textContent||"")}function Cl(){Et()}function El(e){if(!j)return;let t=e.target;if(t instanceof Node&&(t===j||j.contains(t)))return;if((t instanceof HTMLElement?t:null)?.closest("#frameup-root")){Et();return}let o=Rd(e);if(o&&mt(o)){e.preventDefault(),e.stopPropagation(),Et({nextSelection:o,reselectEditedElement:!1});return}e.preventDefault(),e.stopPropagation(),Et({clearSelection:!0,reselectEditedElement:!1})}function Tl(e){if(e.key==="Escape"){e.preventDefault(),Et();return}if(e.key==="Enter"&&j&&!Ld(j)){e.preventDefault(),Et();return}e.stopPropagation()}function Rd(e){let t=e.target;return t instanceof HTMLElement&&t!==document.documentElement&&t!==document.body&&!t.hasAttribute("data-frameup-interaction")&&!t.closest("#frameup-root")?t:Tt(e.clientX,e.clientY)}function Et(e){if(!j)return;let t=$o;if(t!==Ct&&Ee)if(Ee.filePath)Wt={componentInfo:Ee,originalText:Ct,newText:t,originalInnerHTML:An,tagName:Ee.tagName},me({type:"updateText",filePath:Ee.filePath,lineNumber:Ee.lineNumber,columnNumber:Ee.columnNumber,originalText:Ct,newText:t});else{let r={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:Ee.componentName,filePath:"",lineNumber:0,columnNumber:0,originalText:Ct,newText:t},i={componentName:Ee.componentName,filePath:"",lineNumber:0,columnNumber:0,tagName:Ee.tagName};xo(r,i,An),Re({type:"textAnnotation",componentName:r.componentName,filePath:r.filePath||"",summary:`"${Gt(r.originalText,20)}" \u2192 "${Gt(r.newText,20)}"`,state:"pending",elementIdentity:i,revertData:{type:"annotationRemove",annotationId:r.id,originalInnerHTML:An,elementIdentity:i}})}let o=j;if(wl(),e?.nextSelection&&document.contains(e.nextSelection)){yt(e.nextSelection,{skipSidebar:!1});return}if(e?.clearSelection){qe();return}e?.reselectEditedElement!==!1&&o&&document.contains(o)&&yt(o,{skipSidebar:!1})}function wl(){j&&(j.removeEventListener("blur",Cl),j.removeEventListener("keydown",Tl),j.removeEventListener("input",xl),j.removeAttribute("contenteditable"),j.style.outline=fi,Ao(bn()),j=null,Ct="",An="",$o="",Ee=null,fi="")}le();var O=null,Hn=null,hi=new Map,Ze=!1,jt=0,On=0,Ml="";function Ll(e,t){hi.set(e,t)}function Nl(){O=document.createElement("div"),O.setAttribute("data-frameup-interaction","true"),O.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(O),document.addEventListener("scroll",Bt,!0),O.addEventListener("mousedown",e=>{if(Ze){jt=e.clientX,On=e.clientY,O&&(O.style.cursor="grabbing"),e.preventDefault();return}Hn?.onMouseDown?.(e)}),O.addEventListener("mousemove",e=>{if(Ze&&jt!==0){ml(e.clientX-jt,e.clientY-On),jt=e.clientX,On=e.clientY;return}Hn?.onMouseMove?.(e)}),O.addEventListener("mouseup",e=>{if(Ze){O&&(O.style.cursor="grab"),jt=0,On=0;return}Hn?.onMouseUp?.(e)}),document.addEventListener("wheel",kl,{passive:!1}),document.addEventListener("keydown",Rl),document.addEventListener("keyup",Pl)}function kl(e){!O||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#frameup-root")||pl(e)}function Rl(e){if(e.key!==" "||Ke())return;let t=document.activeElement;t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t?.isContentEditable||(e.preventDefault(),!Ze&&O&&(Ml=O.style.cursor,O.style.cursor="grab",O.style.pointerEvents="auto",Ze=!0))}function Pl(e){if(e.key===" "&&Ze&&(e.preventDefault(),Ze=!1,jt=0,On=0,O)){O.style.cursor=Ml;let t=bn();O.style.pointerEvents=t==="select"?"none":"auto"}}function Oo(){return Ze}function Ao(e){Hn=hi.get(e)||null,O&&(O.style.pointerEvents=e==="select"?"none":"auto"),Pd(e)}function Pd(e){if(O)switch(e){case"select":O.style.cursor="default";break;case"text":O.style.cursor="text";break;default:O.style.cursor="default"}}function Sl(e){O&&(O.style.pointerEvents=e?"auto":"none")}function Tt(e,t){let n=al(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#frameup-root")&&!i.hasAttribute("data-frameup-interaction")&&!i.hasAttribute("data-frameup-placeholder")&&!(i===document.body||i===document.documentElement)&&!Pr(i)){r=i;break}return ll(e,t,r),r}function $l(){document.removeEventListener("scroll",Bt,!0),document.removeEventListener("wheel",kl),document.removeEventListener("keydown",Rl),document.removeEventListener("keyup",Pl),Ze=!1,O?.remove(),O=null,Hn=null,hi.clear()}fn();le();function Al(e,t,n,o,r,i){let a=e.left+e.width/2,l=e.top+e.height/2,d=t.left+t.width/2,c=t.top+t.height/2,u=d-a,p=c-l,f=Math.abs(u)<=r,m=Math.abs(p)<=r;return{dx:f?n+u/i:n,dy:m?o+p/i:o,snappedX:f,snappedY:m,guides:{verticalLine:f?{x:d,top:t.top,bottom:t.bottom}:null,horizontalLine:m?{y:c,left:t.left,right:t.right}:null}}}var fe=null,Ho={x:0,y:0},Dn={dx:0,dy:0},In=!1;function yi(e,t,n){let o=_t(e,t),r=ei(n);if(r)return fe=r,Ho={x:o.x,y:o.y},Dn={...r.delta},In=!1,mn(r.element,r.delta.dx,r.delta.dy,r.existingTransform),!0;let i=Hl(),a=Il();if(!i||!a||n!==a)return!1;let l=a.getBoundingClientRect(),d=a.style.cssText,c=getComputedStyle(a).transform,u={id:crypto.randomUUID(),componentRef:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber},element:a,placeholder:null,originalRect:l,delta:{dx:0,dy:0},originalCssText:d,existingTransform:c==="none"?"":c,identity:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber,columnNumber:i.columnNumber,tagName:a.tagName.toLowerCase()}};return Kr(u),fe=u,Ho={x:o.x,y:o.y},Dn={dx:0,dy:0},In=!0,mn(a,0,0,u.existingTransform),!0}function bi(e,t){if(!fe)return;let n=_t(e,t),o=Dn.dx+(n.x-Ho.x),r=Dn.dy+(n.y-Ho.y);mn(fe.element,o,r,fe.existingTransform);let i=fe.element.parentElement;if(!i||i===document.body||i===document.documentElement){fe.delta={dx:o,dy:r},Fr();return}let a=fe.element.getBoundingClientRect(),l=i.getBoundingClientRect(),{scale:d}=_e(),c=Al(a,l,o,r,5,d);(c.snappedX||c.snappedY)&&mn(fe.element,c.dx,c.dy,fe.existingTransform),fe.delta={dx:c.dx,dy:c.dy},wa(c.guides)}function Ol(){if(!fe)return null;let e=fe,t={...Dn},n={...e.delta};In||qr(e.id,n,t),Ga(e),Fr(),Re({type:"move",componentName:e.componentRef.componentName,filePath:e.componentRef.filePath,summary:`moved (${Math.round(n.dx)}px, ${Math.round(n.dy)}px)`,state:"pending",elementIdentity:e.identity,revertData:In?{type:"moveRemove",moveId:e.id}:{type:"moveRestore",moveId:e.id,previousDelta:t}});let o=e.element;return fe=null,In=!1,o}le();Sr()||Mr({onCommitFiberRoot(){}});async function $d(e){let t=ne(e);if(!t)return null;try{let n=await Oe(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||je(i))continue;let a="";if(r.fileName){let l=Ne(r.fileName);He(l)&&(a=l)}o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0)return{tagName:e.tagName.toLowerCase(),componentName:o[0].componentName,filePath:o[0].filePath,lineNumber:o[0].lineNumber,columnNumber:o[0].columnNumber,stack:o}}}catch(n){console.warn("[FrameUp] getOwnerStack failed, falling back to fiber walk:",n)}return Dl(e,t)}function Dl(e,t){let n=[],o=t;for(;o;){if(xe(o)){let r=ie(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",l=0,d=0;i&&(a=i.fileName||"",l=i.lineNumber||0,d=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!je(r)&&n.push({componentName:r,filePath:a,lineNumber:l,columnNumber:d})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function _l(e){let t=ne(e);return t?Dl(e,t):null}function Ad(e){let t=e.tagName.toLowerCase(),n=e.getAttribute("data-component-name")?.trim(),o=e.getAttribute("aria-label")?.trim(),r=e.textContent?.trim(),i=n||o||(r?r.slice(0,24):"")||`<${t}>`;return{tagName:t,componentName:i,filePath:"",lineNumber:0,columnNumber:0,stack:[]}}function Fl(e,t){let n=Tt(e,t);return n?ti(n)?.element??n:null}var X=null,V=null,Qe=!1,Yt=!1,I=new Map,v=null,Ae=null,ce="idle",H=null,Fe=null,Se=null,zo=null,_n=0,Fn=0,ct=[],Vn=!1,Od=null,Hd=null,Id=null,Dd=`
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
`;function Vl(e){Od=e.onStart,Hd=e.onMove,Id=e.onEnd}function zl(){let e=K();if(!e)return;let t=document.createElement("style");t.textContent=Dd,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),Ae=document.createElement("div"),Ae.className="marquee-box",e.appendChild(Ae),Qe=!0,document.addEventListener("mousedown",Io,!0),document.addEventListener("mousemove",Do,!0),document.addEventListener("mouseup",_o,!0),document.addEventListener("keydown",Vo,!0),document.addEventListener("click",Fo,!0),document.addEventListener("scroll",Je,!0),window.addEventListener("resize",Je),Yt=!0}function Io(e){if(!Qe||Ke()||Oo()||e.metaKey||e.ctrlKey)return;let t=Fl(e.clientX,e.clientY);if(X||I.size>0){let o=Vr(e.clientX,e.clientY);if(o){e.preventDefault(),e.stopPropagation();let r=Ma();if(Se=o,zo=r?{...r}:null,I.size>0){ct=[];for(let[i]of I){let a=getComputedStyle(i);ct.push({element:i,width:parseFloat(a.width)||i.offsetWidth,height:parseFloat(a.height)||i.offsetHeight})}_n=0,Fn=0}else if(V){let i=getComputedStyle(V);_n=parseFloat(i.width)||V.offsetWidth,Fn=parseFloat(i.height)||V.offsetHeight,ct=[]}H={x:e.clientX,y:e.clientY},ce="resize-drag";return}}if(e.preventDefault(),e.stopPropagation(),!t||!mt(t)){(X||I.size>0)&&(nl(),X=null,V=null,Bo(),ft(null),v&&(v.classList.remove("visible"),v.style.display="none"),We(null));return}if(H={x:e.clientX,y:e.clientY},Fe=t,Vn=e.shiftKey,Qr(t)&&yi(e.clientX,e.clientY,t)){ce="move-drag";return}if(!Vn&&V&&t===V){ce="pending-move";return}ce="pending"}function Do(e){if(Qe&&!Ke()&&!Oo()){if(ce==="resize-drag"&&Se&&H&&zo){e.preventDefault(),e.stopPropagation();let t=e.clientX-H.x,n=e.clientY-H.y;if(ct.length>0){for(let o of ct){let r=o.width,i=o.height;Se==="tr"||Se==="br"?r=Math.max(10,o.width+t):r=Math.max(10,o.width-t),Se==="bl"||Se==="br"?i=Math.max(10,o.height+n):i=Math.max(10,o.height-n),o.element.style.width=`${Math.round(r)}px`,o.element.style.height=`${Math.round(i)}px`}zn()}else{let o=_n,r=Fn;Se==="tr"||Se==="br"?o=Math.max(10,_n+t):o=Math.max(10,_n-t),Se==="bl"||Se==="br"?r=Math.max(10,Fn+n):r=Math.max(10,Fn-n),o=Math.round(o),r=Math.round(r),$n("width",`${o}px`),$n("height",`${r}px`),Je()}return}if(ce==="pending-move"&&H){let t=Math.abs(e.clientX-H.x),n=Math.abs(e.clientY-H.y);(t>4||n>4)&&(Fe&&yi(H.x,H.y,Fe)?(ce="move-drag",bi(e.clientX,e.clientY)):ce="marquee");return}if(ce==="move-drag"){bi(e.clientX,e.clientY);return}if(ce==="pending"&&H){let t=Math.abs(e.clientX-H.x),n=Math.abs(e.clientY-H.y);(t>10||n>10)&&(ce="marquee")}if(ce==="marquee"&&H&&Ae){let t=Math.min(e.clientX,H.x),n=Math.min(e.clientY,H.y),o=Math.abs(e.clientX-H.x),r=Math.abs(e.clientY-H.y);Ae.style.display="block",Ae.style.left=`${t}px`,Ae.style.top=`${n}px`,Ae.style.width=`${o}px`,Ae.style.height=`${r}px`;return}if(ce==="idle"){if(X&&V||I.size>0){let i=Vr(e.clientX,e.clientY);if(i){document.body.style.cursor=i==="tl"||i==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let n=Fl(e.clientX,e.clientY);if(!n||!mt(n)){lo(null);return}let o=n.getBoundingClientRect(),r=parseFloat(getComputedStyle(n).borderRadius)||4;lo(o,r+2)}}}function _o(e){if(!Qe||Ke()||Oo())return;let t=ce;if(ce="idle",t==="resize-drag"){document.body.style.cursor="",Se=null,zo=null,H=null,ct.length>0?ct=[]:Ro();return}if(t==="move-drag"){let n=Ol();n&&zd(n),H=null,Fe=null;return}if(t==="pending-move"){H=null,Fe=null;return}if(t==="marquee"&&H){Ae&&(Ae.style.display="none"),_d(Math.min(e.clientX,H.x),Math.min(e.clientY,H.y),Math.max(e.clientX,H.x),Math.max(e.clientY,H.y)),H=null,Fe=null,Vn=!1;return}Fe&&(Vn?Fd(Fe):(Bo(),yt(Fe))),H=null,Fe=null,Vn=!1}async function yt(e,t){try{let n=e.getBoundingClientRect();V=e,vi(n,{}),Vd();let o=await $d(e)??Ad(e);if(console.log("[FrameUp] selectElement:",e.tagName,"\u2192",o.componentName,o.filePath,"stack:",o.stack?.map(r=>r.componentName)),X={tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber,columnNumber:o.columnNumber,stack:o.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}},v){let r=o.filePath?`${o.filePath}:${o.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${o.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||zt(e,X),We({tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber})}catch(n){console.error("[FrameUp] selectElement error:",n)}}function _d(e,t,n,o){let r=ba({x:e,y:t,width:n-e,height:o-t});if(r.length!==0){vt(),X=null,V=null,ft(null),v&&(v.classList.remove("visible"),v.style.display="none"),I.clear();for(let i of r.slice(0,50)){let a=_l(i);if(!a)continue;let l=i.getBoundingClientRect(),d={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:l.top,left:l.left,width:l.width,height:l.height}};I.set(i,{element:i,info:d})}if(I.size!==0){if(I.size===1){let[i,a]=[...I.entries()][0];I.clear(),V=i,X=a.info;let l=i.getBoundingClientRect();if(vi(l,X),v){let d=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${d?`<span class="comp-path">${d}</span>`:""}`}zt(i,X),We({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}zn(),We(null),v&&(v.innerHTML=`<span class="comp-name">${I.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function Fd(e){if(I.has(e)){if(I.delete(e),I.size===1){let[r,i]=[...I.entries()][0];I.clear(),un(),V=r,X=i.info;let a=r.getBoundingClientRect();if(vi(a,X),zt(r,X),v){let l=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${l?`<span class="comp-path">${l}</span>`:""}`}We({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else I.size===0?(un(),qe()):(zn(),v&&(v.innerHTML=`<span class="comp-name">${I.size} elements selected</span>`));return}let t=_l(e);if(!t)return;X&&V&&I.size===0&&(I.set(V,{element:V,info:X}),vt(),X=null,V=null,ft(null));let n=e.getBoundingClientRect(),o={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}};I.set(e,{element:e,info:o}),zn(),We(null),v&&(v.innerHTML=`<span class="comp-name">${I.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function Bo(){I.clear(),un()}function zn(){if(I.size===0){un();return}let e=[];for(let[t]of I){let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:n,borderRadius:o+2})}Sa(e)}function Fo(e){Qe&&(Ke()||e.metaKey||e.ctrlKey||e.preventDefault())}function Vo(e){if(Qe&&e.key==="Escape"){if(I.size>0){Bo(),v&&(v.classList.remove("visible"),v.style.display="none"),We(null),e.preventDefault();return}if(X){if(ol()){Po(),e.preventDefault();return}qe(),e.preventDefault()}}}function vi(e,t){if(V){let n=parseFloat(getComputedStyle(V).borderRadius)||4;ft(e,n+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function Je(){if(I.size>0){zn();return}if(!V||!X)return;let e=V.getBoundingClientRect(),t=parseFloat(getComputedStyle(V).borderRadius)||4;if(ft(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function Vd(){lo(null)}function qe(){vt(),X=null,V=null,Se=null,zo=null,ct=[],Bo(),document.body.style.cursor="",ft(null),v&&(v.classList.remove("visible"),v.style.display="none"),We(null)}function Hl(){return X}function Bl(){Qe=!1,document.removeEventListener("mousedown",Io,!0),document.removeEventListener("mousemove",Do,!0),document.removeEventListener("mouseup",_o,!0),document.removeEventListener("keydown",Vo,!0),document.removeEventListener("click",Fo,!0),document.removeEventListener("scroll",Je,!0),window.removeEventListener("resize",Je),Yt=!1,v?.remove(),v=null}function Wl(e){e&&!Yt?(document.addEventListener("mousedown",Io,!0),document.addEventListener("mousemove",Do,!0),document.addEventListener("mouseup",_o,!0),document.addEventListener("keydown",Vo,!0),document.addEventListener("click",Fo,!0),document.addEventListener("scroll",Je,!0),window.addEventListener("resize",Je),Yt=!0,Qe=!0):!e&&Yt&&(document.removeEventListener("mousedown",Io,!0),document.removeEventListener("mousemove",Do,!0),document.removeEventListener("mouseup",_o,!0),document.removeEventListener("keydown",Vo,!0),document.removeEventListener("click",Fo,!0),document.removeEventListener("scroll",Je,!0),window.removeEventListener("resize",Je),Yt=!1,Qe=!1)}function Il(){return V??null}async function zd(e){await yt(e,{skipSidebar:!0})}pt();var he=null,ge=null,et=null,Gl=null,Bn=!1,Ut=null,Wo=[],Go=new Map,jo=!1,Bd=`
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
`,Xt=null;function jl(){let e=K();if(!e)return;let t=document.createElement("style");t.textContent=Bd,e.appendChild(t),Vl({onStart:Wd,onMove:Gd,onEnd:jd}),ve(n=>{n.type==="reorderComplete"&&(Wn(),qe())})}function Wd(e,t,n){et=n,Gl=t,Ut={x:e.clientX,y:e.clientY},Bn=!1,jo=!1,Wo=[],Go=new Map,Xt=null;let o=K();if(!o)return;he=document.createElement("div"),he.className="drag-preview";let r=t.getBoundingClientRect();he.style.width=`${r.width}px`,he.style.height=`${r.height}px`,he.innerHTML=t.outerHTML,o.appendChild(he),ge=document.createElement("div"),ge.className="drop-indicator",o.appendChild(ge);let i=n.stack[1];if(!i?.filePath){F("Can't reorder this element"),Wn();return}me({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=ve(l=>{if(l.type!=="siblingsList")return;a(),Wo=l.siblings;let d=document.querySelectorAll("*");for(let c of d){if(c.closest("#frameup-root"))continue;let u=ne(c);if(!u)continue;let p=u;for(;p;){if(xe(p)){let f=p._debugSource||p._debugOwner?._debugSource;if(f){for(let m of l.siblings)f.lineNumber===m.lineNumber&&f.fileName===i.filePath&&Go.set(m.lineNumber,{el:c,rect:c.getBoundingClientRect()});break}}p=p.return}}jo=!0})}function Gd(e){if(!Ut)return;let t=Math.abs(e.clientX-Ut.x),n=Math.abs(e.clientY-Ut.y);if(t<5&&n<5||(Bn=!0,he&&(he.style.display="block",he.style.left=`${e.clientX+10}px`,he.style.top=`${e.clientY+10}px`),!jo||!et))return;let o=null,r=1/0,i=0,a=0,l=0;for(let d of Wo){if(d.lineNumber===et.lineNumber)continue;let c=Go.get(d.lineNumber);if(!c)continue;let u=c.rect,p=u.top+u.height/2,f=Math.abs(e.clientY-p);f<r&&(r=f,o=d,e.clientY<p?i=u.top-2:i=u.bottom+2,a=u.left,l=u.width)}Xt=o,o&&ge?(ge.style.display="block",ge.style.top=`${i}px`,ge.style.left=`${a}px`,ge.style.width=`${l}px`):ge&&(ge.style.display="none")}function jd(e){if(!Bn||!Xt||!et){Wn();return}if(!et.filePath){F("Can't reorder this element"),Wn();return}me({type:"reorder",filePath:et.filePath,fromLine:et.lineNumber,toLine:Xt.lineNumber,fromComponent:et.componentName,toComponent:Xt.componentName}),he&&(he.style.display="none"),ge&&(ge.style.display="none"),Bn=!1,Ut=null}function Wn(){he?.remove(),ge?.remove(),he=null,ge=null,et=null,Gl=null,Bn=!1,Ut=null,jo=!1,Wo=[],Go=new Map,Xt=null}function Yl(){Wn()}U();le();var xi="http://www.w3.org/2000/svg",Kt=null,Me=null,Ci=null;function Ul(){let e=K();e&&(Kt=document.createElementNS(xi,"svg"),Kt.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),Me=document.createElementNS(xi,"g"),Me.setAttribute("class","annotation-root"),Kt.appendChild(Me),e.appendChild(Kt),window.addEventListener("scroll",Yo,{passive:!0}),Ci=Cn(Yo),Yo())}function Yo(){if(!Me)return;let{scale:e,offsetX:t,offsetY:n}=_e();Me.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function Xl(e,t,n,o,r,i){if(!Me)return null;let a=document.createElementNS(xi,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let l=document.createElement("div");return l.style.cssText=`
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
  `,l.textContent=o,a.appendChild(l),Me.appendChild(a),a}function Kl(e){if(!Me)return;let t=Me.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function Ei(){Me&&(Me.innerHTML="")}function ql(){window.removeEventListener("scroll",Yo),Ci?.(),Ci=null,Kt?.remove(),Kt=null,Me=null}fn();le();U();var qt={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9093 12.3603L17.0007 20.8537L14.1816 21.8798L11.0902 13.3864L6.91797 16.5422L8.4087 1.63318L19.134 12.0959L13.9093 12.3603Z"></path></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6V21H11V6H5V4H19V6H13Z"></path></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>',logs:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.53614 18.8862 7.33243 17.1346 5.86492L15 8V2L21 2L18.5535 4.44656C20.6649 6.28002 22 8.9841 22 12Z"></path></svg>'},Zl=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",Ti=navigator.platform.includes("Mac")?"Cmd":"Ctrl",Li=[{type:"select",icon:qt.pointer,label:"Select",shortcut:"S"},{type:"text",icon:qt.text,label:"Text",shortcut:"T"}],Yd=`
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
`,ye=null,Le=null,Xo=new Map,Ve=null,ze=null,Gn=null,wi=null,Si=null,Mi=null;function Ql(e){wi=e}function es(e){Si=e}function ts(e){Ve&&(Ve.disabled=!e)}function Jl(){if(!ze||!Gn)return;let e=ii();ze.classList.toggle("active",Ln()),Gn.classList.toggle("hidden",e===0),Gn.textContent=String(e)}function ns(){let e=K();if(!e)return;let t=document.createElement("style");t.textContent=Yd,e.appendChild(t),ye=document.createElement("div"),ye.className="tools-panel";let n=[["select","text"]];for(let l=0;l<n.length;l++){if(l>0){let d=document.createElement("div");d.className="tool-divider",ye.appendChild(d)}for(let d of n[l]){let c=Li.find(f=>f.type===d),u=document.createElement("button");u.className=`tool-btn${c.type==="select"?" active":""}`,u.innerHTML=`${c.icon}<span class="tooltip">${c.label}<span class="shortcut-badge">${Zl}${c.shortcut}</span></span>`,u.addEventListener("click",()=>yo(c.type));let p=null;u.addEventListener("mouseenter",()=>{p=setTimeout(()=>u.classList.add("tooltip-visible"),400)}),u.addEventListener("mouseleave",()=>{p&&clearTimeout(p),u.classList.remove("tooltip-visible")}),ye.appendChild(u),Xo.set(c.type,u)}}Le=document.createElement("div"),Le.className="sub-options hidden",ye.appendChild(Le);let o=document.createElement("div");o.className="tool-divider",ye.appendChild(o),Ve=document.createElement("button"),Ve.className="action-btn",Ve.innerHTML=qt.undo,Ve.title="Undo (Ctrl+Z)",Ve.disabled=!0,Ve.addEventListener("click",()=>{Si&&Si()}),ye.appendChild(Ve),ze=document.createElement("button"),ze.className="action-btn has-badge",ze.innerHTML=`${qt.logs}<span class="action-badge hidden">0</span>`,ze.title="Logs",ze.addEventListener("click",()=>{Nn(!Ln())}),Gn=ze.querySelector(".action-badge"),ye.appendChild(ze);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=qt.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{wi&&wi()}),ye.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=qt.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{hl(),i.style.color=gl()?s.accent:""}),ye.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8H14V6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5C21 8.433 19.433 10 17.5 10H16V14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5V16H10V17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14H8V10H6.5C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5V8ZM8 8V6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM10 10V14H14V10H10Z"></path></svg>',a.title=`Keyboard Shortcuts (${Zl}/)`,a.addEventListener("click",()=>rs()),ye.appendChild(a),e.appendChild(ye),document.addEventListener("keydown",os,!0),Mi=ri(Jl),Jl()}function os(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||Ke()||e.ctrlKey||e.metaKey||e.altKey)return;let n=e.key.toUpperCase();if(e.key==="?"){rs(),e.preventDefault();return}let o=Li.find(r=>r.shortcut===n);o&&(yo(o.type),e.preventDefault())}var Be=null,jn=null;function rs(){Be?Uo():Ud()}function Ud(){let e=K();if(!e||Be)return;Be=document.createElement("div"),Be.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:Li.map(r=>({action:r.label,keys:[r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[Ti,"Z"]},{action:"Toggle Logs",keys:[Ti,"Shift","L"]},{action:"Keyboard Shortcuts",keys:["?"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Space","Drag"]},{action:"Zoom",keys:[Ti,"Scroll"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let l of r.items){let d=document.createElement("div");d.className="shortcut-row";let c=document.createElement("span");c.className="shortcut-action",c.textContent=l.action,d.appendChild(c);let u=document.createElement("span");u.className="shortcut-keys";for(let p=0;p<l.keys.length;p++){if(p>0){let m=document.createElement("span");m.className="shortcut-plus",m.textContent="+",u.appendChild(m)}let f=document.createElement("span");f.className="shortcut-key",f.textContent=l.keys[p],u.appendChild(f)}d.appendChild(u),i.appendChild(d)}t.appendChild(i)}Be.appendChild(t),Be.addEventListener("click",r=>{r.target===Be&&Uo()}),e.appendChild(Be),jn=r=>{Uo()},document.addEventListener("keydown",jn,!0)}function Uo(){jn&&(document.removeEventListener("keydown",jn,!0),jn=null),Be?.remove(),Be=null}function is(e){for(let[t,n]of Xo)n.classList.toggle("active",t===e);Xd(e)}function Xd(e){if(Le&&(Le.innerHTML="",Le.classList.add("hidden"),Le.classList.remove("visible"),e==="text")){Le.classList.remove("hidden"),requestAnimationFrame(()=>Le?.classList.add("visible"));let t=Dt(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();co({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){bo("textColor",i),n.style.background=i},onClose(){}})}),Le.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{bo("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}Le.appendChild(o)}}function as(e){let t=Xo.get(e);t&&(t.style.backgroundColor=s.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function ls(){document.removeEventListener("keydown",os,!0),Mi?.(),Mi=null,Uo(),ye?.remove(),ye=null,Le=null,Ve=null,ze=null,Gn=null,Xo.clear()}le();le();pt();Rt();async function ss(e,t){let n=Tt(e,t);if(!n)return null;let o=ne(n);if(!o)return null;try{let i=await Oe(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let l=a.functionName;if(l[0]!==l[0].toUpperCase()||je(l))continue;let d="";if(a.fileName){let c=Ne(a.fileName);He(c)&&(d=c)}return{componentName:l,filePath:d,lineNumber:a.lineNumber??0}}}catch{}let r=o;for(;r;){if(xe(r)){let i=ie(r.type);if(i&&i[0]===i[0].toUpperCase()&&!je(i)){let a=r._debugSource||r._debugOwner?._debugSource;return{componentName:i,filePath:a?.fileName||"",lineNumber:a?.lineNumber||0}}}r=r.return}return null}U();var re=null,wt=null,Ko=null,ds={onMouseDown(e){if(re){cs();return}let t=_t(e.clientX,e.clientY);wt={pageX:t.x,pageY:t.y},ss(e.clientX,e.clientY).then(n=>{Ko=n}),re=document.createElement("input"),re.type="text",re.placeholder="Type annotation...",re.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${s.bgPrimary};
      color: ${s.textPrimary};
      border: 1.5px solid ${s.accent};
      border-radius: ${L.sm};
      padding: 4px 8px;
      font-size: ${Dt().fontSize}px;
      font-family: ${x};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${s.accentSoft};
    `,re.setAttribute("data-frameup-overlay","true"),re.addEventListener("keydown",n=>{n.key==="Enter"&&(cs(),n.preventDefault()),n.key==="Escape"&&(us(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(re),re.focus()},onMouseMove(){},onMouseUp(){}};function cs(){if(!re||!wt)return;let e=re.value.trim();if(re.remove(),re=null,!e)return;let t=Dt(),n=crypto.randomUUID();Xl(n,wt.pageX,wt.pageY,e,t.fontSize,t.textColor),Zr({type:"text",id:n,position:wt,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:Ko}),wt=null,Ko=null}function us(){re&&(re.remove(),re=null),wt=null,Ko=null}function ps(){us()}U();var St=null,Yn=null;function ms(e){let t=e instanceof Error&&e.stack?e.stack:String(e);return/frameup|overlay/i.test(t)}function Kd(e){let t=K();if(!t)return;St&&St.parentNode&&St.parentNode.removeChild(St),Yn&&clearTimeout(Yn);let n=document.createElement("div");n.setAttribute("style",["position: fixed","bottom: 72px","right: 16px","z-index: 2147483647","background: rgba(30, 30, 30, 0.92)","color: #fff",`font-family: ${x}`,"font-size: 12px","padding: 10px 14px",`border-radius: ${L.sm}`,`box-shadow: ${$.md}`,"max-width: 320px","display: flex","align-items: center","gap: 10px","opacity: 0",`transition: opacity ${C.medium}`].join("; "));let o=document.createElement("span");o.textContent=e,o.setAttribute("style","flex: 1;");let r=document.createElement("button");r.textContent="Dismiss",r.setAttribute("style",["background: rgba(255,255,255,0.15)","border: none","color: #fff",`font-family: ${x}`,"font-size: 11px","padding: 3px 8px",`border-radius: ${L.xs}`,"cursor: pointer","white-space: nowrap"].join("; ")),r.addEventListener("click",()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),Yn&&clearTimeout(Yn),St=null}),n.appendChild(o),n.appendChild(r),t.appendChild(n),St=n,requestAnimationFrame(()=>{n.style.opacity="1"}),Yn=setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),St=null},8e3)}function Ni(e){console.error("[FrameUp]",e),Kd("FrameUp encountered an error. Your app is unaffected.")}function qd(){window.addEventListener("error",e=>{ms(e.error??e.message)&&(Ni(e.error??e.message),e.preventDefault())}),window.addEventListener("unhandledrejection",e=>{ms(e.reason)&&(Ni(e.reason),e.preventDefault())})}var ki=null;function fs(e,t,n){t.originalCssText=n.style.cssText,t.element=n,at(t)}function Zd(){let e=window.__FRAMEUP_WS_PORT__;if(!e){console.warn("[FrameUp] No WebSocket port found.");return}if(document.getElementById("frameup-root"))return;qn(e),Wi(Jd);let t=K();t&&(tl(t),Xa(t)),zl(),Ta(),jl(),Ul(),Jr(r=>Kl(r)),ki=new MutationObserver(()=>{for(let[r,i]of Xr())document.contains(i.element)||setTimeout(()=>{let a=It(i.identity);if(a){fs(r,i,a);return}mo(i.identity).then(l=>{l?fs(r,i,l):(vo(r),F(`Component ${i.componentRef.componentName} removed \u2014 move cleared`))})},80)}),ki.observe(document.body,{childList:!0,subtree:!0}),document.addEventListener("keydown",r=>{(r.metaKey||r.ctrlKey)&&r.shiftKey&&r.key==="l"&&(r.preventDefault(),Nn(!Ln()))}),ns(),yl(),Nl(),Za(),Ll("text",ds),Yr((r,i)=>{kn(),as(r),i==="text"&&ps(),Bt(),$r(),Wl(r==="select"),Ao(r),is(r)}),Ur(()=>{Jn(Eo()),ts(ni())}),es(()=>{let r=Co();r&&F(`Undo: ${r}`)});let n=!1,o=0;ji(()=>{if(n){F("Generation in progress");return}let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);F(`Please wait ${a}s before retrying`);return}let i=oi();if(!i.moves.length&&!i.annotations.length&&!i.colorChanges.length&&!i.textEdits.length){F("Nothing to confirm \u2014 make some visual changes first");return}n=!0,Jn(!1),F("Generating..."),me({type:"generate",annotations:i})}),ve(r=>{if(r.type==="generateProgress"&&F(r.message),r.type==="generateComplete")if(n=!1,Jn(Eo()),r.success){let i=r.changes.length;Re({type:"generate",componentName:"AI Generate",filePath:r.changes[0]?.filePath||"",summary:`${i} file${i!==1?"s":""} changed`,state:"active",revertData:{type:"generateUndo",undoIds:r.undoIds||[]}});let a=r.changes.map(l=>l.description||l.filePath).join(", ");F(`Applied: ${a}`),qe(),Ei(),En()}else F(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),Yi(()=>{let r=Co();return r?(F(`Undo: ${r}`),!0):!1}),Ql(()=>{qe(),Ei(),En(),fl(),updateEyeButton(!0),F("Canvas cleared")}),console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools")}function Jd(){Bt(),$r(),Bl(),La(),Yl(),il(),ql(),ki?.disconnect(),ls(),Ka(),bl(),$l(),En(),mi(),Hi(),Gi()}function gs(){try{Zd(),qd()}catch(e){Ni(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",gs):gs();})();
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
