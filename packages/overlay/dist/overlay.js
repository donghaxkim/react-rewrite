"use strict";var FrameUp=(()=>{var Ac=Object.defineProperty;var S=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ea=(e,t)=>{for(var n in t)Ac(e,n,{get:t[n],enumerable:!0})};function $c(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),l=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+l).toString(16).slice(1)}`}return e}function Oc(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(E=>{try{return Array.from(E.cssRules)}catch{return[]}}).filter(E=>E instanceof CSSStyleRule&&E.selectorText===":root").flatMap(E=>Array.from(E.style)).filter(E=>E.startsWith("--")),n={},o={},r={},i={},a={},l={},c={},d={},u={},m={},f={},p={},h={},y={},P={},L={},V={},F={},U=(E,O,ge,he)=>{E[ge]=he,O[he]=ge};for(let E of t){let O=e.getPropertyValue(E).trim();if(!O)continue;let ge=E.match(/^--spacing-(.+)$/);if(ge){U(n,m,ge[1],O);continue}let he=E.match(/^--color-(.+)$/);if(he){let vo=he[1];o[vo]=O,f[$c(O)]=vo;continue}let A=E.match(/^--font-size-(.+)$/);if(A){U(r,p,A[1],O);continue}let Y=E.match(/^--font-weight-(.+)$/);if(Y){U(i,h,Y[1],O);continue}let b=E.match(/^--radius-(.+)$/);if(b){U(a,y,b[1],O);continue}let T=E.match(/^--border-(.+)$/);if(T){U(l,P,T[1],O);continue}let W=E.match(/^--opacity-(.+)$/);if(W){U(c,L,W[1],O);continue}let ne=E.match(/^--tracking-(.+)$/);if(ne){U(d,V,ne[1],O);continue}let oe=E.match(/^--leading-(.+)$/);if(oe){U(u,F,oe[1],O);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:l,opacity:c,letterSpacing:d,lineHeight:u,spacingReverse:m,colorsReverse:f,fontSizeReverse:p,fontWeightReverse:h,borderRadiusReverse:y,borderWidthReverse:P,opacityReverse:L,letterSpacingReverse:V,lineHeightReverse:F}}function Ic(e,t){let n={};for(let o of Hc){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function Co(e,t){return t.get(e)??null}function Ta(e,t,n){let r=(n??xt())[e],i=[];for(let[l,c]of r.entries()){let d=parseFloat(c);isNaN(d)||i.push({numericValue:d,token:l,cssValue:c})}let a=parseFloat(t);return isNaN(a)||i.some(c=>c.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((l,c)=>l.numericValue-c.numericValue),i}function Sa(e){wa=e,bn=null}function xt(){if(bn!==null)return bn;let e=Oc();return bn=Ic(e,wa??{}),bn}var Hc,wa,bn,Ft=S(()=>{"use strict";Hc=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];wa=null,bn=null});function Ma(e){Na=e}function Ke(){return Na}var Na,Vt=S(()=>{"use strict";Na=!1});var s,H,k,C,x,La,K=S(()=>{"use strict";s={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},H={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},k={xs:"4px",sm:"6px",md:"10px",lg:"14px"},C={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},x="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",La=`
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
`});var Sr,En,ka,Dc,vn,Ra,To,Aa,Pa,xn,Eo,st,Nr,Cn,Mr,zt,Lr,wo,Tn=S(()=>{"use strict";Sr="0.5.32",En=`bippy-${Sr}`,ka=Object.defineProperty,Dc=Object.prototype.hasOwnProperty,vn=()=>{},Ra=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},To=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),Aa=!1,xn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>Aa?!0:(e&&typeof e.inject=="function"&&(Pa=e.inject.toString()),!!Pa?.includes("(injected)")),Eo=new Set,st=new Set,Nr=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:En,checkDCE:Ra,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),st.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,Eo.forEach(a=>a())),i},on:vn,onCommitFiberRoot:vn,onCommitFiberUnmount:vn,onPostCommitFiberRoot:vn,renderers:t,supportsFiber:!0,supportsFlight:!0};try{ka(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let l=o.renderers;o=a,l.size>0&&(l.forEach((c,d)=>{st.add(c),a.renderers.set(d,c)}),Cn(e))}}});let r=window.hasOwnProperty,i=!1;ka(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{Cn(e)}return o},Cn=e=>{e&&Eo.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=Ra,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=En,t._instrumentationIsActive=!1;let n=To(t);if(n||(t.on=vn),t.renderers.size){t._instrumentationIsActive=!0,Eo.forEach(i=>i());return}let o=t.inject,r=xn(t);r&&!n&&(Aa=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return st.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,Eo.forEach(l=>l()),a}}(t.renderers.size||t._instrumentationIsActive||xn())&&e?.()}catch{}},Mr=()=>Dc.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),zt=e=>Mr()?(Cn(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Nr(e),Lr=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),wo=()=>{try{Lr()&&zt()}catch{}}});var $a=S(()=>{"use strict";Tn();wo()});function zr(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await Wr(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=Br(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var kr,Pr,Rr,Ar,$r,Or,Hr,Ir,Dr,_r,Fr,Vr,ye,Br,Wr,jr,ae,Ur,Gr,Z,_c,Yr=S(()=>{"use strict";Tn();kr=0,Pr=1,Rr=5,Ar=11,$r=13,Or=15,Hr=16,Ir=19,Dr=26,_r=27,Fr=28,Vr=30,ye=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};Br=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=Br(o,t,n);if(r)return r;o=n?null:o.sibling}return null},Wr=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await Wr(o,t,n);if(r)return r;o=n?null:o.sibling}return null},jr=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?jr(t.type||t.render):null},ae=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=jr(t);return o&&(o.displayName||o.name)||null},Ur=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||To(e)||xn(e)},Gr=e=>{let t=zt(e.onActive);t._instrumentationSource=e.name??En;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,l,c)=>{n!==i&&(n?.(a,l,c),e.onCommitFiberRoot?.(a,l,c))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,l)=>{t.onCommitFiberUnmount===i&&(o?.(a,l),e.onCommitFiberUnmount?.(a,l))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,l)=>{t.onPostCommitFiberRoot===i&&(r?.(a,l),e.onPostCommitFiberRoot?.(a,l))};t.onPostCommitFiberRoot=i}return t},Z=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},_c=Error()});var ct=S(()=>{"use strict";Tn();$a();Yr();});function wn(e,t){let n=0,o=0,r=0;do r=Ka[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function _a(e,t){return e.pos>=t?!1:e.peek()!==Uc}function Xa(e){let{length:t}=e,n=new Yc(e),o=[],r=0,i=0,a=0,l=0,c=0;do{let d=n.indexOf(";"),u=[],m=!0,f=0;for(r=0;n.pos<d;){let p;r=wn(n,r),r<f&&(m=!1),f=r,_a(n,d)?(i=wn(n,i),a=wn(n,a),l=wn(n,l),_a(n,d)?(c=wn(n,c),p=[r,i,a,l,c]):p=[r,i,a,l]):p=[r],u.push(p),n.pos++}m||Kc(u),o.push(u),n.pos=d+1}while(n.pos<=t);return o}function Kc(e){e.sort(Xc)}function Xc(e,t){return e[0]-t[0]}var Oa,Fc,Vc,Wa,zc,Bc,ja,Wc,Ua,jc,Ga,Ya,qr,Ha,Ia,Uc,Da,Gc,Ka,Yc,qa,qc,Zc,Za,Sn,So,Jc,Fa,Qc,ed,td,nd,Va,od,rd,id,ad,ld,za,Xe,sd,Kr,Xr,cd,dd,ud,pd,md,fd,gd,hd,Oe,Ba,yd,bd,Nn,Mn,Ct=S(()=>{"use strict";Tn();Yr();Oa=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Fc=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],Vc=["<anonymous>","eval",""],Wa=/\.(jsx|tsx|ts|js)$/,zc=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Bc=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,ja="(at Server)",Wc=/(^|@)\S+:\d+/,Ua=/^\s*at .*(\S+:\d+|\(native\))/m,jc=/^(eval@)?(\[native code\])?$/,Ga=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=Ha(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(Wc)){let i=Ia(r,void 0)[0];i&&o.push(i)}return qr(o,t)}return e.match(Ua)?Ha(e,t):Ia(e,t)},Ya=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},qr=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e,Ha=(e,t)=>qr(e.split(`
`).filter(n=>!!n.match(Ua)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=Ya(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}}),Ia=(e,t)=>qr(e.split(`
`).filter(n=>!n.match(jc)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,l=Ya(o.replace(r,""));return{functionName:a,fileName:l[0],lineNumber:l[1]?+l[1]:void 0,columnNumber:l[2]?+l[2]:void 0,source:o}}}),Uc=44,Da="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Gc=new Uint8Array(64),Ka=new Uint8Array(128);for(let e=0;e<Da.length;e++){let t=Da.charCodeAt(e);Gc[e]=t,Ka[t]=e}Yc=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};qa=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,qc=/^data:application\/json[^,]+base64,/,Zc=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,Za=typeof WeakRef<"u",Sn=new Map,So=new Map,Jc=e=>Za&&e instanceof WeakRef,Fa=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let u of r)if(u[0]<=o)i=u;else break;if(!i||i.length<4)return null;let[,a,l,c]=i;if(a===void 0||l===void 0||c===void 0)return null;let d=t[a];return d?{columnNumber:c,fileName:d,lineNumber:l+1}:null},Qc=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return Fa(o.map.mappings,o.map.sources,r,i)}return Fa(e.mappings,e.sources,t-1,n)},ed=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(Zc);a&&(o=a[1]||a[2])}if(!o)return null;let r=qa.test(o);if(!(qc.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},td=e=>({file:e.file,mappings:Xa(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),nd=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:Xa(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},Va=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(qa);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},od=async(e,t=fetch)=>{if(!Va(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=ed(e,n);if(!o||!Va(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?nd(i):td(i)}catch{return null}},rd=async(e,t=!0,n)=>{if(t&&Sn.has(e)){let i=Sn.get(e);if(i==null)return null;if(Jc(i)){let a=i.deref();if(a)return a;Sn.delete(e)}else return i}if(t&&So.has(e))return So.get(e);let o=od(e,n);t&&So.set(e,o);let r=await o;return t&&So.delete(e),t&&(r===null?Sn.set(e,null):Sn.set(e,Za?new WeakRef(r):r)),r},id=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await rd(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=Qc(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),ad=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",ld=()=>{let e=zt();for(let t of[...Array.from(st),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},za=e=>{for(let t of st){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},Xe=e=>`
    in ${e}`,sd=(e,t)=>{let n=Xe(e);return t&&(n+=` (at ${t})`),n},Kr=!1,Xr=(e,t)=>{if(!e||Kr)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,Kr=!0;let o=ld();za(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let l={DetermineComponentFrameRoot(){let u;try{if(t){let m=function(){throw Error()};if(Object.defineProperty(m.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(m,[])}catch(f){u=f}Reflect.construct(e,[],m)}else{try{m.call()}catch(f){u=f}e.call(m.prototype)}}else{try{throw Error()}catch(f){u=f}let m=e();m&&typeof m.catch=="function"&&m.catch(()=>{})}}catch(m){if(m instanceof Error&&u instanceof Error&&typeof m.stack=="string")return[m.stack,u.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,d]=l.DetermineComponentFrameRoot();if(c&&d){let u=c.split(`
`),m=d.split(`
`),f=0,p=0;for(;f<u.length&&!u[f].includes("DetermineComponentFrameRoot");)f++;for(;p<m.length&&!m[p].includes("DetermineComponentFrameRoot");)p++;if(f===u.length||p===m.length)for(f=u.length-1,p=m.length-1;f>=1&&p>=0&&u[f]!==m[p];)p--;for(;f>=1&&p>=0;f--,p--)if(u[f]!==m[p]){if(f!==1||p!==1)do if(f--,p--,p<0||u[f]!==m[p]){let h=`
${u[f].replace(" at new "," at ")}`,y=ae(e);return y&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",y)),h}while(f>=1&&p>=0);break}}}finally{Kr=!1,Error.prepareStackTrace=n,za(o),console.error=r,console.warn=i}let a=e?ae(e):"";return a?Xe(a):""},cd=(e,t)=>{let n=e.tag,o="";switch(n){case Fr:o=Xe("Activity");break;case Pr:o=Xr(e.type,!0);break;case Ar:o=Xr(e.type.render,!1);break;case kr:case Or:o=Xr(e.type,!1);break;case Rr:case Dr:case _r:o=Xe(e.type);break;case Hr:o=Xe("Lazy");break;case $r:o=e.child!==t&&t!==null?Xe("Suspense Fallback"):Xe("Suspense");break;case Ir:o=Xe("SuspenseList");break;case Vr:o=Xe("ViewTransition");break;default:return""}return o},dd=e=>{try{let t="",n=e,o=null;do{t+=cd(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=sd(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},ud=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},pd=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),md=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,fd=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!pd(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>md(a,o))||(i.push(o),t.set(r,i))}return t},gd=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(ja,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},hd=e=>{let t=[];return zr(e,n=>{if(!ad(n))return;let o=typeof n.type=="string"?n.type:ae(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:Ga(ud(n._debugStack?.stack))})},!0),t},Oe=async(e,t=!0,n)=>{let o=hd(e),r=Ga(dd(e)),i=fd(o),a=new Map;return id(r.map(l=>l.source?.includes(ja)??!1?gd(l,i,a):l).filter((l,c,d)=>{if(c===0)return!0;let u=d[c-1];return l.functionName!==u.functionName}),t,n)},Ba=e=>e.split("/").filter(Boolean).length,yd=e=>e.split("/").filter(Boolean)[0]??null,bd=e=>{let t=e.indexOf("/",1);if(t===-1||Ba(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!Wa.test(n)||Ba(n)<2)return e;let o=yd(n);return!o||o.startsWith("@")||o.length>4?e:n},Nn=e=>{if(!e||Vc.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=bd(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),l=i.indexOf(":");t=a!==-1&&(l===-1||a<l)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of Fc)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if(Oa.test(t)){let i=t.match(Oa);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Bc.test(i)&&(t=t.slice(0,r))}return t},Mn=e=>{let t=Nn(e);return!(!t||!Wa.test(t)||zc.test(t))}});function Cd(e){if(!e)return"";let t=e;for(let o of vd)if(t.startsWith(o)){t=t.slice(o.length);break}let n=t.match(/\/_next\/static\/chunks\/(?:app\/)?(.+)/);n&&(t=n[1]);for(let o of xd)t=t.replace(o,"");return t.startsWith("/")&&!t.startsWith("./")&&(t=t.slice(1)),t.startsWith("./")&&(t=t.slice(2)),t}function qe(e){if(!e)return"";let t=Nn(e);if(t&&Mn(t))return t;let n=Cd(e);return n&&Mn(n)||n&&/\.(tsx?|jsx?|mjs)$/.test(n)&&!n.includes("node_modules")&&!n.startsWith("../")&&!n.includes("/dist/")&&!n.includes("/build/")?n:""}var vd,xd,Ln=S(()=>{"use strict";Ct();vd=["webpack-internal:///(app-pages-browser)/./","webpack-internal:///(ssr)/./","webpack-internal:///(rsc)/./","webpack-internal:///./","webpack-internal:///","webpack:///(app-pages-browser)/./","webpack:///./","webpack:///","/@fs/","file:///","file://"],xd=[/\?[a-f0-9]+$/,/\?v=\d+$/,/\?t=\d+$/,/\?import$/]});function Ze(e){return!!(Ed.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function Zr(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}function Jr(){kn=new WeakMap}function Nd(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function Md(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=wd}function Ld(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<No||o.height/window.innerHeight<No)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>Sd}function Et(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&Zr(e)||e.closest("#frameup-root")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-placeholder"))return!1;let n=performance.now(),o=kn.get(e);if(o&&n-o.timestamp<Td)return o.isValid;let r=window.getComputedStyle(e);return Nd(e,r)?e.clientWidth/window.innerWidth>=No&&e.clientHeight/window.innerHeight>=No&&(Md(r)||Ld(e,r))?(kn.set(e,{isValid:!1,timestamp:n}),!1):(kn.set(e,{isValid:!0,timestamp:n}),!0):(kn.set(e,{isValid:!1,timestamp:n}),!1)}var Ed,Td,No,wd,Sd,kn,Tt=S(()=>{"use strict";Ed=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);Td=50,No=.9,wd=2147483600,Sd=1e3,kn=new WeakMap});function Bt(e,t,n){return Math.min(n,Math.max(t,e))}function Pd(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,l=o+e.width/2,c=r+e.height/2,d=Bt(Math.ceil(e.width/Ja),Mo,Lo),u=Bt(Math.ceil(e.height/Ja),Mo,Lo);if(d*u>Qa){let h=Math.sqrt(Qa/(d*u));d=Bt(Math.floor(d*h),Mo,Lo),u=Bt(Math.floor(u*h),Mo,Lo)}let m=new Set,f=[],p=(h,y)=>{let P=Bt(Math.round(h),0,t-1),L=Bt(Math.round(y),0,n-1),V=`${P}:${L}`;m.has(V)||(m.add(V),f.push({x:P,y:L}))};p(o+Ne,r+Ne),p(i-Ne,r+Ne),p(o+Ne,a-Ne),p(i-Ne,a-Ne),p(l,r+Ne),p(l,a-Ne),p(o+Ne,c),p(i-Ne,c),p(l,c);for(let h=0;h<d;h++){let y=o+(h+.5)/d*e.width;for(let P=0;P<u;P++)p(y,r+(P+.5)/u*e.height)}return f}function el(e,t=Et,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=Pd(e);for(let c of i)for(let d of document.elementsFromPoint(c.x,c.y))r.add(d);let a=[];for(let c of r){if(!t(c))continue;let d=c.getBoundingClientRect();if(d.width<=0||d.height<=0)continue;let u={left:d.left,top:d.top,right:d.left+d.width,bottom:d.top+d.height};if(n){let m=Math.max(o.left,u.left),f=Math.max(o.top,u.top),p=Math.min(o.right,u.right),h=Math.min(o.bottom,u.bottom),y=Math.max(0,p-m)*Math.max(0,h-f),P=d.width*d.height;P>0&&y/P>=kd&&a.push(c)}else o.left<u.right&&o.right>u.left&&o.top<u.bottom&&o.bottom>u.top&&a.push(c)}let l=a.filter(c=>!a.some(d=>d!==c&&d.contains(c)));return l.sort((c,d)=>{let u=c.compareDocumentPosition(d);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0}),l}var kd,Ja,Mo,Lo,Qa,Ne,tl=S(()=>{"use strict";Tt();kd=.75,Ja=32,Mo=3,Lo=20,Qa=100,Ne=1});function Wt(e,t,n){return e+(t-e)*n}var nl=S(()=>{"use strict"});function ll(){let e=X();e&&(re=document.createElement("canvas"),re.setAttribute("data-frameup-overlay","true"),re.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(re),ri(),window.addEventListener("resize",ri))}function Po(e,t=4){if(!e){le&&(le.targetOpacity=0,Je());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!le||!le.initialized?le=li(n,t):(le.target=n,le.borderRadius=t,le.targetOpacity=1),Je()}function wt(e,t=4){if(!e){j&&(j.targetOpacity=0,Je());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!j||!j.initialized?j=li(n,t):(j.target=n,j.borderRadius=t,j.targetOpacity=1),Je()}function sl(e){dt=e,Je()}function ii(){dt=null,Je()}function cl(e){for(j=null;G.length>e.length;)G.pop();for(let t=0;t<e.length;t++){let n=e[t],o={x:n.rect.left,y:n.rect.top,w:n.rect.width,h:n.rect.height};t<G.length?(G[t].target=o,G[t].borderRadius=n.borderRadius,G[t].targetOpacity=1):G.push(li(o,n.borderRadius))}Je()}function Rn(){G=[],Je()}function ai(e,t){if(!oi)return null;let n=pl();if(!n)return null;let o=gl(n.x,n.y,n.w,n.h);for(let r of o){let i=e-r.x,a=t-r.y;if(i*i+a*a<=il*il)return r.corner}return null}function dl(){return pl()}function ul(){Ut!==null&&cancelAnimationFrame(Ut),window.removeEventListener("resize",ri),re?.remove(),re=null,R=null,le=null,j=null,G=[],dt=null}function pl(){if(G.length>1)return ml(G);if(j&&j.opacity>=.5){let{x:e,y:t,w:n,h:o}=j.current;return{x:e,y:t,w:n,h:o}}if(G.length===1){let{x:e,y:t,w:n,h:o}=G[0].current;return{x:e,y:t,w:n,h:o}}return null}function ml(e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,r=-1/0;for(let i of e){let{x:a,y:l,w:c,h:d}=i.current;a<t&&(t=a),l<n&&(n=l),a+c>o&&(o=a+c),l+d>r&&(r=l+d)}return{x:t,y:n,w:o-t,h:r-n}}function li(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function ri(){re&&(Pn=Math.max(window.devicePixelRatio||1,Ad),Qr=window.innerWidth,ei=window.innerHeight,re.width=Qr*Pn,re.height=ei*Pn,re.style.width=`${Qr}px`,re.style.height=`${ei}px`,R=re.getContext("2d"),Je())}function Je(){Ut===null&&(Ut=requestAnimationFrame(fl))}function fl(){if(Ut=null,!R||!re)return;let e=!1;le?.initialized&&(ti(le,Rd)&&(e=!0),le.opacity<.01&&le.targetOpacity===0&&(le=null)),j?.initialized&&(ti(j,ol)&&(e=!0),j.opacity<.01&&j.targetOpacity===0&&(j=null));for(let t=G.length-1;t>=0;t--){let n=G[t];n.initialized&&ti(n,ol)&&(e=!0),n.opacity<.01&&n.targetOpacity===0&&G.splice(t,1)}if(R.setTransform(1,0,0,1,0,0),R.clearRect(0,0,re.width,re.height),R.setTransform(Pn,0,0,Pn,0,0),le&&ni(R,le,jt,$d),j&&(ni(R,j,jt,rl),oi&&al(R,j.current,j.opacity)),dt){if(R.save(),R.globalAlpha=.6,R.strokeStyle=jt,R.lineWidth=1,R.setLineDash([4,4]),dt.verticalLine){let{x:t}=dt.verticalLine;R.beginPath(),R.moveTo(t,0),R.lineTo(t,re.height),R.stroke()}if(dt.horizontalLine){let{y:t}=dt.horizontalLine;R.beginPath(),R.moveTo(0,t),R.lineTo(re.width,t),R.stroke()}R.restore()}if(G.length>0){for(let t of G)ni(R,t,jt,rl);if(oi&&G.length>0){let t=ml(G);t&&t.w>=24&&t.h>=24&&(G.length>1&&(R.globalAlpha=.6,R.beginPath(),R.rect(t.x,t.y,t.w,t.h),R.strokeStyle=jt,R.lineWidth=1,R.setLineDash([4,4]),R.stroke(),R.setLineDash([]),R.globalAlpha=1),al(R,t,1))}}e&&(Ut=requestAnimationFrame(fl))}function ti(e,t){let n=e.current,o=e.target,r=Wt(n.x,o.x,t),i=Wt(n.y,o.y,t),a=Wt(n.w,o.w,t),l=Wt(n.h,o.h,t),c=Wt(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<ko&&Math.abs(i-o.y)<ko&&Math.abs(a-o.w)<ko&&Math.abs(l-o.h)<ko&&Math.abs(c-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=l,e.opacity=c,!0)}function ni(e,t,n,o){let{x:r,y:i,w:a,h:l}=t.current;if(a<=0||l<=0)return;let c=Math.min(t.borderRadius,a/2,l/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,a,l,c):e.rect(r,i,a,l),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function gl(e,t,n,o){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+n,y:t},{corner:"br",x:e+n,y:t+o},{corner:"bl",x:e,y:t+o}]}function al(e,t,n){if(t.w<24||t.h<24)return;e.globalAlpha=n;let o=gl(t.x,t.y,t.w,t.h);for(let r of o)e.beginPath(),e.arc(r.x,r.y,Od,0,Math.PI*2),e.fillStyle=Hd,e.fill(),e.strokeStyle=Id,e.lineWidth=Dd,e.stroke();e.globalAlpha=1}var Rd,ol,ko,Ad,re,R,Qr,ei,Pn,Ut,le,j,G,jt,$d,rl,Od,il,Hd,Id,Dd,oi,dt,Ro=S(()=>{"use strict";we();nl();K();Rd=.35,ol=.3,ko=.5,Ad=2,re=null,R=null,Qr=0,ei=0,Pn=1,Ut=null,le=null,j=null,G=[],jt=s.accent,$d="rgba(162,89,255,0.08)",rl="rgba(162,89,255,0.15)",Od=4,il=10,Hd="#ffffff",Id=jt,Dd=1.5,oi=!0,dt=null});var _d,Fd,Vd,zd,Bd,ze,hl=S(()=>{"use strict";_d=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],Fd=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],Vd=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],zd=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],Bd=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],ze=[..._d,...Fd,...Vd,...zd,...Bd]});function yl(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let l=document.createElement("input");l.type="text",l.className="prop-input",l.style.cssText="width:60px; cursor:text;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${s.textSecondary}; font-family:${x};`,a.appendChild(l),a.appendChild(c);let d=new Map(t);function u(){return d.get(r.key)??r.defaultValue}function m(f){let p=parseFloat(f);l.value=isNaN(p)?f:String(p);try{let y=Ta(i,f).find(P=>P.cssValue===f);y?.token?c.textContent=`${r.tailwindPrefix}-${y.token}`:c.textContent=""}catch{c.textContent=""}}return l.addEventListener("blur",()=>{let f=l.value.trim(),p=parseFloat(f);if(isNaN(p))Wd.has(f)?(d.set(r.key,f),m(f),n(r.key,f),o()):m(u());else{let y=f.match(/(px|rem|em|%|vw|vh|ch)$/)?f:`${p}px`;d.set(r.key,y),m(y),n(r.key,y),o()}}),l.addEventListener("keydown",f=>{f.key==="Enter"?l.blur():f.key==="Escape"&&(m(u()),l.blur())}),m(u()),{element:a,setValue(f,p){f===r.key&&(d.set(f,p),m(p))},destroy(){}}}var Wd,bl=S(()=>{"use strict";Ft();K();Wd=new Set(["auto","none","normal","inherit","initial"])});function vl(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
    display:flex;
    align-items:center;
    gap:2px;
    background:${s.bgTertiary};
    border-radius:${k.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g," ");let l=t.get(r.key)??r.defaultValue,c=[];function d(u){l=u;for(let{btn:m,value:f,opt:p}of c){let h=f===u;m.style.background=h?s.accent:"transparent",m.style.color=h?s.textOnAccent:s.textSecondary,m.title=h&&p.tailwindValue?`${p.label} (${p.tailwindValue})`:p.label}}for(let u of i){let m=document.createElement("button");m.style.cssText=`
      display:flex;
      align-items:center;
      justify-content:center;
      padding:2px 6px;
      border:none;
      border-radius:${k.xs};
      font-family:${x};
      font-size:10px;
      cursor:pointer;
      background:transparent;
      color:${s.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g," "),m.textContent=u.icon??u.label,m.title=u.label,m.addEventListener("click",()=>{d(u.value),n(r.key,u.value),o()}),c.push({btn:m,value:u.value,opt:u}),a.appendChild(m)}return d(l),{element:a,setValue(u,m){u===r.key&&d(m)},destroy(){}}}var xl=S(()=>{"use strict";K()});function An(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,l=0;a!==0&&(r===t?l=((n-o)/a+(n<o?6:0))*60:r===n?l=((o-t)/a+2)*60:l=((t-n)/a+4)*60);let c=r===0?0:a/r*100,d=r*100;return{h:l,s:c,v:d}}function Ao(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),l=o*(1-i*n),c=o*(1-(1-i)*n),d,u,m;switch(r%6){case 0:d=o,u=c,m=a;break;case 1:d=l,u=o,m=a;break;case 2:d=a,u=o,m=c;break;case 3:d=a,u=l,m=o;break;case 4:d=c,u=a,m=o;break;case 5:d=o,u=a,m=l;break;default:d=0,u=0,m=0}let f=p=>Math.round(p*255).toString(16).padStart(2,"0");return`#${f(d)}${f(u)}${f(m)}`}var Cl=S(()=>{"use strict"});function $o(e){Gt();let t=X();if(!t)return;let n=document.createElement("div");n.style.cssText=`
    position: fixed;
    left: ${e.position.x}px;
    top: ${e.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    box-shadow: ${H.lg};
    border-radius: ${k.md};
    font-family: ${x};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${C.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,requestAnimationFrame(()=>{let b=n.getBoundingClientRect();b.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-b.width-8}px`),b.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-b.height-8}px`),n.style.opacity="1"});let o=An(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let b=jd(["Fill","Text"],0,T=>{r=T===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(b)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),l=document.createElement("div");l.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${H.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(l),n.appendChild(c);function d(){let b=o.h,T=a.createLinearGradient(0,0,176,0);T.addColorStop(0,`hsl(${b}, 0%, 100%)`),T.addColorStop(1,`hsl(${b}, 100%, 50%)`),a.fillStyle=T,a.fillRect(0,0,176,120);let W=a.createLinearGradient(0,0,0,120);W.addColorStop(0,"rgba(0,0,0,0)"),W.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=W,a.fillRect(0,0,176,120);let ne=o.s/100*176,oe=(1-o.v/100)*120;l.style.left=`${ne}px`,l.style.top=`${oe}px`}let u=!1;i.addEventListener("mousedown",b=>{u=!0,m(b)});function m(b){let T=i.getBoundingClientRect(),W=Math.max(0,Math.min(176,b.clientX-T.left)),ne=Math.max(0,Math.min(120,b.clientY-T.top));o.s=W/176*100,o.v=(1-ne/120)*100,d(),O()}let f=document.createElement("canvas");f.width=176,f.height=14,f.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let p=f.getContext("2d"),h=document.createElement("div");h.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${H.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let y=document.createElement("div");y.style.cssText="position:relative;width:176px;height:14px;",y.appendChild(f),y.appendChild(h),n.appendChild(y);function P(){let b=p.createLinearGradient(0,0,176,0);for(let T=0;T<=6;T++)b.addColorStop(T/6,`hsl(${T*60}, 100%, 50%)`);p.fillStyle=b,p.fillRect(0,0,176,14),h.style.left=`${o.h/360*176}px`}let L=!1;f.addEventListener("mousedown",b=>{L=!0,V(b)});function V(b){let T=f.getBoundingClientRect(),W=Math.max(0,Math.min(176,b.clientX-T.left));o.h=W/176*360,P(),d(),O()}let F=document.createElement("input");F.type="text",F.value=Ao(o),F.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${s.bgSecondary};
    border: 1px solid ${s.border};
    border-radius: ${k.sm};
    color: ${s.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,F.addEventListener("keydown",b=>{b.key==="Enter"&&F.blur(),b.stopPropagation()}),F.addEventListener("blur",()=>{let b=F.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(b)){let T=b.startsWith("#")?b:`#${b}`;o=An(T),d(),P(),O()}else F.value=Ao(o)}),n.appendChild(F);let U=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],E=document.createElement("div");E.style.cssText="display:flex;gap:4px;justify-content:center;";for(let b of U){let T=document.createElement("button");T.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${b};
      border: 1px solid ${s.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${C.fast};
    `,T.addEventListener("mouseenter",()=>{T.style.boxShadow=H.sm}),T.addEventListener("mouseleave",()=>{T.style.boxShadow="none"}),T.addEventListener("click",()=>{o=An(b),d(),P(),F.value=b,O()}),E.appendChild(T)}if(n.appendChild(E),e.projectColors&&e.projectColors.length>0){let b=document.createElement("div");b.textContent="Project",b.style.cssText=`
      font-size: 10px;
      color: ${s.textSecondary};
      font-family: ${x};
      margin-top: 2px;
    `,n.appendChild(b);let T=document.createElement("div");T.style.cssText="display:flex;gap:4px;flex-wrap:wrap;max-height:48px;overflow-y:auto;";for(let{token:W,hex:ne}of e.projectColors){let oe=document.createElement("button");oe.title=W,oe.style.cssText=`
        width: 12px; height: 12px; border-radius: 50%;
        background: ${ne};
        border: 1px solid ${s.border};
        cursor: pointer; padding: 0;
        transition: box-shadow ${C.fast};
      `,oe.addEventListener("mouseenter",()=>{oe.style.boxShadow=H.sm}),oe.addEventListener("mouseleave",()=>{oe.style.boxShadow="none"}),oe.addEventListener("click",()=>{o=An(ne),d(),P(),F.value=ne,O(),e.onPickedToken?.(W)}),T.appendChild(oe)}n.appendChild(T)}function O(){let b=Ao(o);F.value=b,e.onColorChange(b),e.onPickedToken?.(void 0)}t.appendChild(n),ut=n,d(),P();let ge=b=>{u&&m(b),L&&V(b)},he=()=>{u=!1,L=!1};document.addEventListener("mousemove",ge),document.addEventListener("mouseup",he);let A=b=>{b.key==="Escape"&&Gt()};document.addEventListener("keydown",A,!0);let Y=b=>{ut&&!b.composedPath().includes(ut)&&Gt()};setTimeout(()=>document.addEventListener("mousedown",Y,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",ge),document.removeEventListener("mouseup",he),document.removeEventListener("keydown",A,!0),document.removeEventListener("mousedown",Y,!0)},n._onClose=e.onClose}function Gt(){ut&&(ut._cleanup?.(),ut._onClose?.(),ut.remove(),ut=null)}function jd(e,t,n){let o=document.createElement("div");o.style.cssText=`
    display: flex;
    background: ${s.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;let r=[];for(let i=0;i<e.length;i++){let a=document.createElement("button");a.textContent=e[i],a.style.cssText=`
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i===t?s.bgPrimary:"transparent"};
      box-shadow: ${i===t?H.sm:"none"};
      color: ${i===t?s.textPrimary:s.textSecondary};
      font-family: ${x}; font-size: 12px; cursor: pointer;
      transition: background ${C.fast}, color ${C.fast};
    `,a.addEventListener("click",()=>{r.forEach((l,c)=>{l.style.background=c===i?s.bgPrimary:"transparent",l.style.boxShadow=c===i?H.sm:"none",l.style.color=c===i?s.textPrimary:s.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var ut,si=S(()=>{"use strict";K();we();Cl();ut=null});function Ud(){return ci||(ci=document.createElement("canvas").getContext("2d")),ci}function El(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${k.sm};
    border:1px solid ${s.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let l=document.createElement("input");l.type="text",l.placeholder="#rrggbb",l.className="prop-input",l.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${s.textSecondary}; font-family:${x};`,i.appendChild(a),i.appendChild(l),i.appendChild(c);let d=t.get(r.key)??r.defaultValue,u=!1;function m(h){let y=h.trim().toLowerCase();if(y==="transparent")return"transparent";if(y==="inherit"||y==="currentcolor"||y==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(y))return y;let P=Ud();P.fillStyle="#000000",P.fillStyle=y;let L=P.fillStyle;if(L.startsWith("#"))return L;let V=L.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(V){let F=parseInt(V[1],10),U=parseInt(V[2],10),E=parseInt(V[3],10);return`#${((1<<24)+(F<<16)+(U<<8)+E).toString(16).slice(1)}`}return"#000000"}function f(h){d=h,l.value=h,h==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=h;try{let y=xt(),P=Co(h,y.colorsReverse);P?c.textContent=`${r.tailwindPrefix??"bg"}-${P}`:c.textContent=""}catch{c.textContent=""}}function p(){if(u)return;let h=l.value.trim();if(!h){f(d);return}let y=m(h);f(y),n(r.key,y),o()}return a.addEventListener("click",()=>{if(u){Gt(),u=!1;return}let h=a.getBoundingClientRect();u=!0,$o({initialColor:m(d),position:{x:h.left-210,y:h.top},showPropertyToggle:!1,onColorChange:y=>{f(y),n(r.key,y)},onClose:()=>{u=!1,o()}})}),l.addEventListener("keydown",h=>{h.key==="Enter"?(p(),l.blur()):h.key==="Escape"&&(f(d),l.blur())}),l.addEventListener("blur",()=>{p()}),l.addEventListener("input",()=>{let h=l.value.trim(),y=m(h);a.style.background=y}),f(d),{element:i,setValue(h,y){h===r.key&&f(y)},destroy(){u&&(Gt(),u=!1)}}}var ci,Tl=S(()=>{"use strict";K();si();Ft();ci=null});function wl(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function Sl(e,t,n,o){let r=new Map(t),i=[];for(let N of e){let w=wl(N.key);w&&i.push({descriptor:N,...w})}let a=document.createElement("div");a.style.cssText=`
    display:flex;
    flex-direction:column;
    gap:4px;
    font-family:${x};
    font-size:10px;
    color:${s.textSecondary};
    position:relative;
  `.trim().replace(/\n\s*/g," ");let l=document.createElement("div");l.style.cssText="position:relative; padding:4px;";let c=document.createElement("div");c.style.cssText=`
    background:${s.marginBoxBg};
    border:1px dashed ${s.marginBoxBorder};
    border-radius:${k.sm};
    padding:10px;
    position:relative;
  `.trim().replace(/\n\s*/g," ");let d=document.createElement("div");d.style.cssText=`
    background:${s.paddingBoxBg};
    border:1px dashed ${s.paddingBoxBorder};
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
    color:${s.textTertiary};
    font-size:9px;
    padding:4px 6px;
    background:${s.bgSecondary};
    border-radius:3px;
    user-select:none;
  `.trim().replace(/\n\s*/g," "),u.textContent="content";let m=[];function f(N){let w=document.createElement("span"),Te=r.get(N.key)??N.defaultValue;return w.textContent=V(Te),w.title=N.label,w.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),w.addEventListener("mouseenter",()=>{w.style.background=s.bgTertiary}),w.addEventListener("mouseleave",()=>{(document.activeElement!==p||p.dataset.key!==N.key)&&(w.style.background="transparent")}),w.addEventListener("click",()=>{P(N,w)}),m.push({key:N.key,span:w,descriptor:N}),w}let p=document.createElement("input");p.type="text",p.className="prop-input",p.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(p);let h=null,y=null;function P(N,w){h&&h!==N&&L(),h=N,y=w,p.dataset.key=N.key;let Te=r.get(N.key)??N.defaultValue;p.value=V(Te);let ie=0,vt=0,lt=w;for(;lt&&lt!==a;)ie+=lt.offsetLeft,vt+=lt.offsetTop,lt=lt.offsetParent;p.style.display="block",p.style.left=`${ie}px`,p.style.top=`${vt}px`;let Ca=w.getBoundingClientRect();p.style.width=`${Math.max(40,Ca.width+10)}px`,p.focus(),p.select()}function L(){if(!h||!y)return;let N=p.value.trim(),w=h,Te=y,ie,vt=parseFloat(N),lt=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(vt)?lt.has(N)?ie=N:ie=r.get(w.key)??w.defaultValue:ie=N.match(/(px|rem|em|%|vw|vh|ch)$/)?N:`${vt}px`,r.set(w.key,ie),Te.textContent=V(ie),Te.style.background="transparent",p.style.display="none",p.dataset.key="",h=null,y=null,n(w.key,ie),o()}p.addEventListener("keydown",N=>{if(N.key==="Enter")L();else if(N.key==="Escape"){if(h&&y){let w=r.get(h.key)??h.defaultValue;y.textContent=V(w)}p.style.display="none",p.dataset.key="",h=null,y=null}}),p.addEventListener("blur",()=>{L()});function V(N){let w=parseFloat(N);return isNaN(w)?N:w===Math.round(w)?String(Math.round(w)):N}function F(N){let w=document.createElement("span");return w.textContent=N,w.style.cssText=`
      font-size:9px;
      color:${s.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),w}function U(N,w){return i.find(Te=>Te.layer===N&&Te.side===w)}function E(N,w){let Te=U(N,w);if(!Te){let ie=document.createElement("span");return ie.textContent="-",ie.style.cssText=`text-align:center; color:${s.textTertiary};`,ie}return f(Te.descriptor)}let O=E("padding","top");O.style.gridRow="1",O.style.gridColumn="2",O.style.textAlign="center";let ge=E("padding","left");ge.style.gridRow="2",ge.style.gridColumn="1";let he=E("padding","right");he.style.gridRow="2",he.style.gridColumn="3";let A=E("padding","bottom");A.style.gridRow="3",A.style.gridColumn="2",A.style.textAlign="center",u.style.gridRow="2",u.style.gridColumn="2",d.appendChild(O),d.appendChild(ge),d.appendChild(u),d.appendChild(he),d.appendChild(A);let Y=document.createElement("div");Y.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let b=E("margin","top");b.style.gridRow="1",b.style.gridColumn="2",b.style.textAlign="center";let T=E("margin","left");T.style.gridRow="2",T.style.gridColumn="1";let W=E("margin","right");W.style.gridRow="2",W.style.gridColumn="3";let ne=E("margin","bottom");ne.style.gridRow="3",ne.style.gridColumn="2",ne.style.textAlign="center";let oe=document.createElement("div");oe.style.cssText="grid-row:2; grid-column:2;",oe.appendChild(d),Y.appendChild(b),Y.appendChild(T),Y.appendChild(oe),Y.appendChild(W),Y.appendChild(ne);let vo=F("margin"),Rc=F("padding"),xo=document.createElement("div");return xo.style.cssText="display:flex; gap:8px; padding:0 4px;",xo.appendChild(vo),xo.appendChild(Rc),c.appendChild(Y),l.appendChild(c),a.appendChild(xo),a.appendChild(l),{element:a,setValue(N,w){if(!wl(N))return;r.set(N,w);let ie=m.find(vt=>vt.key===N);ie&&(ie.span.textContent=V(w))},destroy(){}}}var Nl=S(()=>{"use strict";K()});function Ml(e){return Oo.has(e)}function Ll(e){return Ho.push(e),()=>{let t=Ho.indexOf(e);t>=0&&Ho.splice(t,1)}}function Xd(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function qd(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function Zd(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}function Qd(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function di(e,t,n,o,r){let i=document.createElement("div");i.className="prop-sections";let a=document.createElement("style");a.textContent=Kd,i.appendChild(a);let l=[],c=qd(e);for(let[d,u]of c){let m=d==="layout"&&!Qd(t)?u.filter(L=>!Jd.has(L.key)):u;if(m.length===0)continue;let f=document.createElement("div");f.className="prop-section";let p=document.createElement("div");p.className="prop-section-header",p.innerHTML=`<span>${Gd[d]}</span>${Xd()}`;let h=document.createElement("div");h.className="prop-section-body";let y=Oo.has(d);if(y){let L=p.querySelector(".prop-section-chevron");L&&L.classList.add("collapsed"),h.classList.add("collapsed")}p.addEventListener("click",()=>{if(y=!y,y)Oo.add(d);else{Oo.delete(d);for(let V of Ho)V(d)}let L=p.querySelector(".prop-section-chevron");L&&L.classList.toggle("collapsed",y),h.classList.toggle("collapsed",y)}),f.appendChild(p);let P=Zd(m);for(let L of P){let V=Yd[L.controlType];if(!V)continue;let F=V(L.descriptors,t,n,o);if(L.descriptors.length>1||L.controlType==="box-model")h.appendChild(F.element);else{let U=document.createElement("div");U.className="prop-control-row";let E=document.createElement("span");E.className="prop-control-label",E.textContent=L.descriptors[0].label,E.title=L.descriptors[0].label;let O=document.createElement("div");O.className="prop-control-value",O.appendChild(F.element),U.appendChild(E),U.appendChild(O),h.appendChild(U)}l.push(F)}f.appendChild(h),i.appendChild(f)}if(r){let d=document.createElement("div");d.className="prop-show-all",d.textContent="Show all properties",d.addEventListener("click",r),i.appendChild(d)}return{container:i,controls:l}}var Oo,Ho,Gd,Yd,Kd,Jd,kl=S(()=>{"use strict";bl();xl();Tl();Nl();K();Oo=new Set;Ho=[];Gd={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},Yd={"number-scrub":yl,segmented:vl,"color-swatch":El,"box-model":Sl},Kd=`
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
    border-radius: ${k.xs};
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
`;Jd=new Set(["flexDirection","justifyContent","alignItems","gap"])});function ou(){try{let e=localStorage.getItem(Al);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=Pl&&t<=Rl)return t}}catch{}return Math.min(eu,Math.floor(window.innerWidth*.22))}function ru(e){try{localStorage.setItem(Al,String(e))}catch{}}function $l(e,t){let n=document.createElement("style");n.textContent=nu,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${ou()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let l=document.createElement("div");l.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let d=document.createElement("div");d.className="prop-sidebar-file-path",a.appendChild(l),a.appendChild(d);let u=document.createElement("button");u.className="prop-sidebar-close",u.title="Collapse panel",u.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="8,2 4,6 8,10"/></svg>',i.appendChild(a),i.appendChild(u),o.appendChild(i);let m=document.createElement("div");m.className="prop-sidebar-warning",m.style.display="none",o.appendChild(m);let f=document.createElement("div");f.className="prop-sidebar-content",o.appendChild(f),e.appendChild(o);let p=!1,h=0,y=0;r.addEventListener("pointerdown",A=>{A.preventDefault(),A.stopPropagation(),p=!0,h=A.clientX,y=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(A.pointerId)}),r.addEventListener("pointermove",A=>{if(!p)return;let Y=h-A.clientX,b=Math.max(Pl,Math.min(Rl,y+Y));o.style.width=`${b}px`});let P=()=>{p&&(p=!1,r.classList.remove("active"),ru(o.offsetWidth))};r.addEventListener("pointerup",P),r.addEventListener("pointercancel",P),o.addEventListener("pointerdown",A=>A.stopPropagation()),o.addEventListener("mousedown",A=>A.stopPropagation()),o.addEventListener("click",A=>A.stopPropagation()),o.addEventListener("mouseup",A=>A.stopPropagation()),u.addEventListener("click",()=>{F(),t&&t()});let L=!1;function V(A,Y,b,T){l.textContent=`<${A}>`,l.appendChild(c),d.textContent=`${Y}:${b}`,d.title=`${Y}:${b}`,f.innerHTML="",f.appendChild(T),L||(L=!0,o.offsetHeight,o.classList.add("visible"))}function F(){L&&(L=!1,o.classList.remove("visible"))}function U(A){f.innerHTML="",f.appendChild(A)}function E(A,Y,b){m.innerHTML="";let T=document.createElement("span");T.className="prop-sidebar-warning-text",T.textContent=A;let W=document.createElement("button");W.className="prop-sidebar-warning-btn",W.textContent=Y,W.addEventListener("click",ne=>{ne.stopPropagation(),b()}),m.appendChild(T),m.appendChild(W),m.style.display="flex"}function O(){m.style.display="none",m.innerHTML=""}function ge(){c.classList.add("active")}function he(){c.classList.remove("active")}return{show:V,hide:F,isVisible:()=>L,getElement:()=>o,replaceContent:U,showWarning:E,clearWarning:O,showSaving:ge,hideSaving:he}}var eu,Pl,Rl,Al,tu,nu,Ol=S(()=>{"use strict";K();eu=300,Pl=260,Rl=380,Al="frameup-sidebar-width",tu=4,nu=`
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${s.bgPrimary};
    border-left: 1px solid ${s.border};
    box-shadow: ${H.lg};
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
    width: ${tu}px;
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
    border-radius: ${k.sm};
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
    border-radius: ${k.xs};
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
`});function Hl(e){let t=e.parentElement,n=t?getComputedStyle(t):null,o=getComputedStyle(e);return{display:n?.display??"block",flexDirection:n?.flexDirection??"row",elementPosition:o.position}}function iu(e,t,n){let o=n&&n!=="none"?` ${n}`:"";return`translate(${e}px, ${t}px)${o}`}function pt(e){e.element.style.transform=iu(e.delta.dx,e.delta.dy,e.existingTransform)}function Il(e){e.existingTransform&&e.existingTransform!=="none"?e.element.style.transform=e.existingTransform:e.element.style.transform=""}function $n(e,t,n,o){e.style.transform=`translate(${t}px, ${n}px) scale(1.02)${o&&o!=="none"?` ${o}`:""}`,e.style.boxShadow=H.lg,e.style.transition="none",e.style.zIndex="2147483644"}function Dl(e){pt(e),e.element.style.boxShadow="",e.element.style.transition="",e.element.style.zIndex=""}function ui(e){let t=e.parentElement;if(!t)return 0;let n=e.tagName,o=0;for(let r of Array.from(t.children)){if(r===e)break;r.tagName===n&&o++}return o}function Yt(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=Z(n);for(;o;){if(ye(o)){let r=o._debugSource,i=ae(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function Io(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=Z(n);if(!o)continue;let r=await Oe(o);if(!r||r.length===0)continue;for(let i of r)if(!(!i.functionName||i.functionName!==e.componentName)&&i.fileName){let a=Nn(i.fileName);if(Mn(a)&&a.endsWith(e.filePath))return n}}catch{}return null}var On=S(()=>{"use strict";ct();Ct();K()});var Uo={};Ea(Uo,{addAnnotation:()=>vi,addMove:()=>yi,addTextEditAnnotation:()=>Wo,buildBatchOperations:()=>Si,canUndo:()=>wi,canvasUndo:()=>jo,getActiveTool:()=>_n,getAnnotations:()=>lu,getCanvasTransform:()=>Be,getMoveContainingElement:()=>Ti,getMoveForElement:()=>Ei,getMoves:()=>hi,getOriginalsHidden:()=>su,getToolOptions:()=>Kt,hasChanges:()=>Mt,hasMoveForElement:()=>Ci,hasTextAnnotations:()=>Bn,onAnnotationRemoved:()=>xi,onCanvasTransformChange:()=>zn,onStateChange:()=>gi,onToolChange:()=>fi,pageToViewport:()=>uu,peekUndoStack:()=>du,pushUndoAction:()=>Fn,removeAnnotation:()=>Fo,removeMove:()=>Bo,resetCanvas:()=>Nt,restoreMoveDelta:()=>au,serializeTextAnnotationsOnly:()=>Ni,setActiveTool:()=>Vo,setCanvasTransform:()=>Vn,setOriginalsHidden:()=>cu,setToolOption:()=>zo,updateMoveDelta:()=>bi,viewportToPage:()=>Xt});function fi(e){return Do.push(e),()=>{Do=Do.filter(t=>t!==e)}}function gi(e){return _o.push(e),()=>{_o=_o.filter(t=>t!==e)}}function mt(){_o.forEach(e=>e())}function _n(){return pi}function Vo(e){let t=pi;t!==e&&(pi=e,Do.forEach(n=>n(e,t)))}function Kt(){return{...Fl}}function zo(e,t){Fl[e]=t}function hi(){return de}function yi(e){de.set(e.id,e),Fn({type:"moveCreate",moveId:e.id})}function bi(e,t,n){let o=de.get(e);o&&(o.delta=t,pt(o),Fn({type:"moveDelta",moveId:e,previousDelta:n}))}function au(e,t){let n=de.get(e);n&&(n.delta=t,pt(n),mt())}function Bo(e){let t=de.get(e);t&&(t.element.style.cssText=t.originalCssText,t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),de.delete(e),mt())}function lu(){return Me}function vi(e){if(Me.push(e),e.type==="colorChange"){let t=e;He.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else He.push({type:"annotationAdd",annotationId:e.id});mt()}function Wo(e,t,n){Me.push(e),He.push({type:"textEditRestore",annotationId:e.id,elementIdentity:t,originalInnerHTML:n}),mt()}function xi(e){Vl=e}function Fo(e){Me=Me.filter(t=>t.id!==e),Vl?.(e),mt()}function su(){return mi}function cu(e){mi=e;for(let t of de.values())e?pt(t):Il(t);mt()}function Ci(e){for(let t of de.values())if(t.element===e||t.element.contains(e)||e.contains(t.element))return!0;return!1}function Ei(e){for(let t of de.values())if(t.element===e)return t}function Ti(e){for(let t of de.values())if(t.element===e||t.element.contains(e)||e.contains(t.element))return t}function jo(){let e=He.pop();if(!e)return null;switch(e.type){case"moveCreate":return Bo(e.moveId),"move removed";case"moveDelta":{let t=de.get(e.moveId);return t&&(t.delta=e.previousDelta,pt(t)),"move reverted"}case"annotationAdd":return Fo(e.annotationId),"annotation removed";case"colorChange":{let t=Me.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),Fo(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}case"textEditRestore":{let t=Yt(e.elementIdentity);return t&&(t.innerHTML=e.originalInnerHTML),Fo(e.annotationId),"text edit reverted"}}return null}function Fn(e){He.push(e),mt()}function du(){return He.length>0?He[He.length-1]:null}function Be(){return{scale:St,offsetX:In,offsetY:Dn}}function Vn(e,t,n){St=e,In=t,Dn=n,Hn.forEach(o=>o())}function zn(e){return Hn.push(e),()=>{Hn=Hn.filter(t=>t!==e)}}function Xt(e,t){return{x:(e-In)/St,y:(t-Dn)/St}}function uu(e,t){return{x:e*St+In,y:t*St+Dn}}function Nt(){for(let e of de.values())e.element.style.cssText=e.originalCssText,e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder);for(let e of Me)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of He)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}de=new Map,Me=[],He=[],mi=!0,St=1,In=0,Dn=0,Hn.forEach(e=>e()),mt()}function Mt(){return de.size>0||Me.length>0}function wi(){return He.length>0}function _l(e){let t=Math.abs(e),n=xt(),o=null,r=1/0;for(let[i,a]of n.spacing){let l;if(a.endsWith("rem"))l=parseFloat(a)*pu;else if(a.endsWith("px"))l=parseFloat(a);else continue;if(Number.isNaN(l))continue;let c=Math.abs(t-l);c<r&&(r=c,o=i)}return o!==null&&r<=Math.min(t*.15,8)?o:`[${Math.round(t)}px]`}function mu(e){if(!e)return"block";let t=e.elementPosition;if(t==="absolute"||t==="fixed")return"positioned";let n=e.display;return n==="flex"||n==="inline-flex"?"flex":n==="grid"||n==="inline-grid"?"grid":"block"}function Si(){let e=[];for(let t of Me){if(t.type==="colorChange"){let n=t,o=n.property==="backgroundColor"?"bg":"text";e.push({op:"updateClass",file:n.component.filePath,line:n.component.lineNumber,col:n.columnNumber??0,componentName:n.component.componentName,updates:[{tailwindPrefix:o,tailwindToken:n.pickedToken??null,value:n.toColor}]})}if(t.type==="textEdit"){let n=t;n.filePath&&e.push({op:"updateText",file:n.filePath,line:n.lineNumber,col:n.columnNumber,componentName:n.componentName,originalText:n.originalText,newText:n.newText})}}for(let t of de.values()){let n=t.identity.filePath||t.componentRef.filePath;if(!n)continue;let o=t.identity.lineNumber,r=t.identity.columnNumber,i=mu(t.parentLayout),a=t.element.tagName.toLowerCase(),l=t.element.className||void 0,c=t.element.parentElement,d=c?.tagName.toLowerCase(),u=c?.className||void 0,m=t.element.id||void 0,f={componentName:t.componentRef.componentName,tagName:a,className:l,parentTagName:d,parentClassName:u,nthOfType:t.nthOfType,id:m,jsxKey:t.jsxKey,fileMtime:t.fileMtime,fileSize:t.fileSize};Math.abs(t.delta.dx)>=1&&e.push({op:"moveSpacing",file:n,line:o,col:r,...f,axis:"x",token:_l(t.delta.dx),direction:t.delta.dx>0?"positive":"negative",layoutContext:i}),Math.abs(t.delta.dy)>=1&&e.push({op:"moveSpacing",file:n,line:o,col:r,...f,axis:"y",token:_l(t.delta.dy),direction:t.delta.dy>0?"positive":"negative",layoutContext:i})}return e}function Bn(){return Me.some(e=>e.type==="text")}function Ni(){let e=[];for(let t of Me)t.type==="text"&&e.push({type:"text",content:t.content,position:t.position,targetComponent:t.targetComponent?.componentName,targetFile:t.targetComponent?.filePath,targetLine:t.targetComponent?.lineNumber});return{moves:[],annotations:e,colorChanges:[],textEdits:[]}}var de,Me,He,pi,mi,Fl,St,In,Dn,Hn,Do,_o,Vl,pu,ue=S(()=>{"use strict";On();Ft();de=new Map,Me=[],He=[],pi="select",mi=!0,Fl={fontSize:16,textColor:"#ffffff"},St=1,In=0,Dn=0,Hn=[],Do=[],_o=[];Vl=null;pu=16});function Bl(){if(localStorage.getItem(zl))return;let e=X();if(!e)return;Ie=document.createElement("div"),Ie.style.cssText=`
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
  `,n.addEventListener("click",()=>Wn()),Ie.appendChild(t),Ie.appendChild(n),e.appendChild(Ie),requestAnimationFrame(()=>{Ie&&(Ie.style.opacity="1")})}function Wn(){Ie&&(localStorage.setItem(zl,"1"),Ie.style.opacity="0",setTimeout(()=>{Ie?.remove(),Ie=null},150))}var zl,Ie,Mi=S(()=>{"use strict";K();we();zl="frameup-onboarding-dismissed",Ie=null});function Go(e){let t=e.parentElement;if(!t)return 1;let n=1;for(let o=0;o<t.children.length&&t.children[o]!==e;o++)t.children[o].tagName===e.tagName&&n++;return n}var Li=S(()=>{"use strict"});function ki(e,t){return e.includes(":")?!1:e===t?!0:e.startsWith(`${t}-`)}var Wl=S(()=>{"use strict"});function Yl(e){let t=new Set(["spacing","size","background"]),o=getComputedStyle(e).display;(o==="flex"||o==="inline-flex"||o==="grid"||o==="inline-grid"||e.children.length>0)&&t.add("layout");let r=e.tagName.toLowerCase();return(Array.from(e.childNodes).some(a=>a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()??"").length>0)||gu.has(r))&&t.add("typography"),t}function bu(){let e=g.elementIdentity,t=g.componentInfo;if(!e||!t){kt();return}let n=vu(e);if(n){Gl(n,t).then(o=>{Jt(n,o)});return}xu(e).then(async o=>{if(o){let r=await Gl(o,t);Jt(o,r)}else kt()})}function vu(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=Z(n);for(;o;){if(ye(o)){let r=o._debugSource,i=ae(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function xu(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=Z(n);if(!o)continue;let r=await Oe(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let l=qe(i.fileName);if(l&&e.filePath.endsWith(l)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}async function Gl(e,t){let n=Z(e);if(!n)return t;try{let r=await Oe(n);if(r&&r.length>0)for(let i of r){if(!i.functionName)continue;let a=i.functionName;if(a[0]===a[0].toUpperCase()&&(a===t.componentName||!t.componentName)){let l=qe(i.fileName);if(l){let c=e.getBoundingClientRect();return{...t,filePath:l,lineNumber:i.lineNumber??t.lineNumber,columnNumber:i.columnNumber??t.columnNumber,boundingRect:{top:c.top,left:c.left,width:c.width,height:c.height}}}}}}catch{}let o=n;for(;o;){if(ye(o)){let r=ae(o.type),i=o._debugSource||o._debugOwner?._debugSource;if(r===t.componentName&&i?.fileName){let a=e.getBoundingClientRect();return{...t,filePath:i.fileName,lineNumber:i.lineNumber??t.lineNumber,columnNumber:i.columnNumber??t.columnNumber,boundingRect:{top:a.top,left:a.left,width:a.width,height:a.height}}}}o=o.return}return t}function Cu(e,t){let n=getComputedStyle(e),o=new Map;for(let r of ze){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function Eu(e){if(!g.selectedElement)return;let t=getComputedStyle(g.selectedElement);for(let n of ze){if(n.group!==e||g.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;g.currentValues.set(n.key,r),g.originalValues.get(n.key)===n.defaultValue&&g.originalValues.set(n.key,r);for(let i of Lt)i.setValue(n.key,r)}}function Zt(){for(let e of Lt)e.destroy();Lt=[]}function Pi(){if(!g.selectedElement||!g.componentInfo)return;Zt();let e=g.showAllGroups?null:Yl(g.selectedElement),t=e?ze.filter(a=>e.has(a.group)):ze,o=e!==null&&t.length<ze.length?()=>Jl(!0):void 0,{container:r,controls:i}=di(t,g.currentValues,Gn,qo,o);Lt=i,$.replaceContent(r)}function Kl(){if(!g.selectedElement||!g.componentInfo||g.pendingBatch.size===0)return;let e=g.selectedElement,t=g.componentInfo,n=e.parentElement,r=(e.getAttribute("class")||"").split(/\s+/).filter(Boolean),i=[];for(let[l,c]of g.pendingBatch){let d=Ko.get(c.property),u="";if(d?.classPattern){let p=new RegExp(d.classPattern);u=r.find(h=>!h.includes(":")&&p.test(h))||""}else u=r.find(p=>ki(p,c.tailwindPrefix))||"";let m=[];for(let p of c.relatedPrefixes??[]){let h=r.find(y=>ki(y,p));h&&m.push(h)}let f=c.tailwindToken||"";i.push({cssProperty:l,tailwindPrefix:c.tailwindPrefix,tailwindToken:c.tailwindToken,value:c.value,oldClass:u,newClass:f,relatedOldClasses:m})}let a={type:"property",componentName:t.componentName,tag:t.tagName,filePath:t.filePath,textContent:(e.textContent||"").slice(0,50),className:e.className,nthOfType:Go(e),parentTag:n?.tagName.toLowerCase()||"",parentClassName:n?.className||"",lineHint:t.lineNumber,updates:i};ft(a),es(a,e,g.activeOverrides)}function qo(){if(Ke()){Kl();return}Se&&clearTimeout(Se),Se=setTimeout(()=>{Se=null,Ri()},yu)}function Xo(){Se&&(clearTimeout(Se),Se=null),qt&&(qt(),qt=null),Le&&(clearTimeout(Le.timeoutId),Le=null),g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1,readOnly:!1}}function Xl(e){$=$l(e,()=>{Zo(),Zt(),Xo()}),ts((t,n,o)=>{if($&&$.hideSaving(),Le)if(clearTimeout(Le.timeoutId),t)Le=null;else{let{batch:r,previousOriginals:i}=Le;Le=null;for(let[a]of r){let l=i.get(a);l!==void 0&&g.originalValues.set(a,l)}if(g.selectedElement){for(let[a]of r){g.selectedElement.style[a]="",g.activeOverrides.delete(a);let l=g.originalValues.get(a);l!==void 0&&g.currentValues.set(a,l)}for(let a of Lt)for(let[l]of r){let c=g.originalValues.get(l);c!==void 0&&a.setValue(l,c)}}if($){let l={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";$.showWarning(l,"Dismiss",()=>$.clearWarning())}}else if(!t&&$){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";$.showWarning(i,"Dismiss",()=>$.clearWarning())}}),Yo=se(t=>{if(t.type==="updatePropertyComplete"&&t.success&&t.undoId&&jn){let{componentInfo:n,batch:o}=jn,r={componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber,columnNumber:n.columnNumber,tagName:n.tagName};for(let i of o)pe({type:"property",componentName:n.componentName,filePath:n.filePath,summary:`${i.cssProperty}: ${i.originalValue} \u2192 ${i.value}`,state:"active",propertyKey:i.cssProperty,elementIdentity:r,revertData:{type:"cliUndo",undoIds:[t.undoId]}});jn=null}})}function Jt(e,t){g.pendingBatch.size>0&&Ri(),Wn(),Zt(),g.showAllGroups=!1,g.readOnly=!1,g.selectedElement=e,g.componentInfo=t,g.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(fu);for(let u of jl)Ml(u)||n.add(u);let o=Cu(e,n);g.currentValues=o,g.originalValues=new Map(o),g.activeOverrides=new Map,g.pendingBatch=new Map,t.filePath||(g.readOnly=!0),qt&&qt(),qt=Ll(u=>{jl.has(u)&&Eu(u)});let r=g.showAllGroups?null:Yl(e),i=r?ze.filter(u=>r.has(u.group)):ze,l=r!==null&&i.length<ze.length?()=>Jl(!0):void 0,{container:c,controls:d}=di(i,g.currentValues,Gn,qo,l);Lt=d,Un.disconnect(),Un.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),$.show(t.componentName,t.filePath,t.lineNumber,c),t.filePath?$.clearWarning():$.showWarning("Source file couldn't be resolved for this element","Dismiss",()=>$.clearWarning())}function Gn(e,t){let n=Ko.get(e);if(!n||!g.selectedElement)return;g.selectedElement.style[n.key]=t,g.activeOverrides.set(e,t),g.currentValues.set(e,t);let o=xt(),r=n.tailwindScale+"Reverse",i=o[r],a=i?Co(t,i):null;if(!a&&n.enumValues){let l=n.enumValues.find(c=>c.value===t);l&&(a=l.tailwindValue)}if(g.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:g.originalValues.get(e)||n.defaultValue}),e==="display")if(Pi(),t==="none"){let l=g.originalValues.get("display")||"block";$.showWarning("Element hidden","Restore",()=>{g.selectedElement&&(g.selectedElement.style.display=l),g.activeOverrides.delete("display"),g.currentValues.set("display",l),g.pendingBatch.delete("display"),Pi(),$.clearWarning()})}else $.clearWarning()}function Ri(){if(g.pendingBatch.size===0||!g.componentInfo)return;let e=g.componentInfo.filePath;if(!e){g.pendingBatch.clear(),$&&($.hideSaving(),$.showWarning("This element can be inspected, but its source file couldn't be resolved","Dismiss",()=>$.clearWarning())),M("Can't save changes for this element");return}let t=g.componentInfo.lineNumber,n=g.componentInfo.columnNumber-1;if(jn={componentInfo:{...g.componentInfo},batch:[...g.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,originalValue:a.originalValue,value:a.value}))},g.pendingBatch.size===1){let a=[...g.pendingBatch.values()][0],l=Ko.get(a.property);J({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:n,...a,framework:"tailwind",classPattern:l?.classPattern,standalone:l?.standalone})}else J({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:n,updates:[...g.pendingBatch.values()].map(a=>{let l=Ko.get(a.property);return{...a,classPattern:l?.classPattern,standalone:l?.standalone}}),framework:"tailwind"});g.selectedElement&&g.elementIdentity&&Fn({type:"propertyChange",elementIdentity:g.elementIdentity,element:g.selectedElement,overrides:[...g.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),$&&$.showSaving();let o=new Map;for(let[a]of g.pendingBatch)o.set(a,g.originalValues.get(a)||"");for(let[a,l]of g.pendingBatch)g.originalValues.set(a,l.value);let r=new Map(g.pendingBatch),i=setTimeout(()=>{Le&&Le.batch===r&&(Le=null,$&&$.hideSaving())},hu);Le={batch:r,previousOriginals:o,timeoutId:i},g.pendingBatch.clear()}function Zo(){if(g.selectedElement){for(let[e]of g.activeOverrides)g.selectedElement.style[e]="";for(let[e,t]of g.originalValues)g.currentValues.set(e,t);for(let e of Lt)for(let[t,n]of g.originalValues)e.setValue(t,n);g.activeOverrides.clear(),g.pendingBatch.clear()}}function kt(){Se&&(clearTimeout(Se),Se=null),Un.disconnect(),Zo(),Zt(),$&&$.hide(),Xo()}function ql(){if(Ke()){Kl(),Un.disconnect(),Zt(),$&&$.hide(),Xo();return}Se&&(clearTimeout(Se),Se=null),Un.disconnect(),Ri(),Zt(),$&&$.hide(),Xo()}function Zl(){return g.activeOverrides.size>0}function Jl(e){g.showAllGroups=e,Pi()}function Ql(){Yo&&(Yo(),Yo=null),jn=null,kt()}var Ko,fu,jl,gu,hu,g,Lt,$,Ul,Se,yu,Le,jn,qt,Yo,Un,Ai=S(()=>{"use strict";hl();kl();Ol();Ft();De();Pt();we();ue();Mi();ct();Ct();Ln();Qt();Li();Vt();Wl();Ko=new Map(ze.map(e=>[e.key,e])),fu=new Set(["layout","spacing","size"]),jl=new Set(["typography","background"]),gu=new Set(["h1","h2","h3","h4","h5","h6","p","span","a","button","label","li","td","th","blockquote","figcaption"]);hu=5e3,g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1,readOnly:!1},Lt=[],Se=null,yu=300,Le=null,jn=null,qt=null,Yo=null,Un=new MutationObserver(()=>{g.selectedElement&&!document.contains(g.selectedElement)&&(clearTimeout(Ul),Ul=setTimeout(()=>{bu()},80))})});function ns(e,t){if(!Rt)return;let n=performance.now(),o=Math.abs(e-Rt.clientX),r=Math.abs(t-Rt.clientY),i=o<=2&&r<=2,a=n-Rt.timestamp<16;if(i||a)return Rt.element}function os(e,t,n){Rt={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function en(){Rt=null}var Rt,$i=S(()=>{"use strict";Rt=null});function Lu(){Hi=document.body.style.background||document.body.style.backgroundColor||"",Ii=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",Q=document.createElement("div"),Q.setAttribute("data-frameup-canvas-wrapper","true"),Q.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${n};
  `.trim().replace(/\n\s*/g," "),_e=document.createElement("div"),_e.setAttribute("data-frameup-dot-bg","true"),_e.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${s.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="frameup-root"||r.hasAttribute("data-frameup-interaction")||r.hasAttribute("data-frameup-placeholder")||r.hasAttribute("data-frameup-annotation")||r.hasAttribute("data-frameup-dot-bg")||r.hasAttribute("data-frameup-canvas-wrapper"))||(as.push(r),Q.appendChild(r));Q.style.position="relative",Q.style.zIndex="1",document.body.insertBefore(_e,document.body.firstChild),document.body.insertBefore(Q,_e.nextSibling),Oi=zn(is),is(),ls.forEach(r=>r(Q))}function is(){if(!Q||!_e)return;let{scale:e,offsetX:t,offsetY:n}=Be();Q.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=Nu*e,r=t%o,i=n%o;_e.style.backgroundImage=`radial-gradient(circle, ${Mu} ${rs}px, transparent ${rs}px)`,_e.style.backgroundSize=`${o}px ${o}px`,_e.style.backgroundPosition=`${r}px ${i}px`}function ku(e,t,n){let{scale:o,offsetX:r,offsetY:i}=Be(),a=Math.min(wu,Math.max(Tu,o+n));if(a===o)return;let l=(e-r)/o,c=(t-i)/o,d=e-l*a,u=t-c*a;Vn(a,d,u)}function ss(e){e.preventDefault();let t=-e.deltaY*Su,{scale:n}=Be(),o=t*n;ku(e.clientX,e.clientY,o)}function cs(e,t){let{scale:n,offsetX:o,offsetY:r}=Be();Vn(n,o+e,r+t)}function ds(){Vn(1,0,0)}function us(){return Q!==null}function ps(){Q?Di():Lu()}function Di(){if(ls.forEach(e=>e(null)),Oi?.(),Oi=null,Q){for(;Q.firstChild;)document.body.insertBefore(Q.firstChild,Q);Q.remove(),Q=null}_e?.remove(),_e=null,as=[],document.body.style.background=Hi,document.documentElement.style.background=Ii,Hi="",Ii=""}var Tu,wu,Su,Nu,rs,Mu,Q,_e,Oi,as,ls,Hi,Ii,Jo=S(()=>{"use strict";ue();K();Tu=.1,wu=5,Su=.002,Nu=24,rs=1,Mu="rgba(0,0,0,0.15)",Q=null,_e=null,Oi=null,as=[],ls=[],Hi="",Ii=""});function nn(e,t){return e.length>t?e.slice(0,t)+"\u2026":e}function et(){return z!==null}function ms(){document.addEventListener("dblclick",gs,!0),document.addEventListener("mousedown",bs,!0),Fi=se(e=>{e.type==="updateTextComplete"&&Ru(e)})}function fs(){z&&Vi(),document.removeEventListener("dblclick",gs,!0),document.removeEventListener("mousedown",bs,!0),Fi?.(),Fi=null}function Ru(e){if(e.success&&e.undoId&&tn){let t=tn,n={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};pe({type:"textEdit",componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,summary:`"${nn(t.originalText,20)}" \u2192 "${nn(t.newText,20)}"`,state:"active",elementIdentity:n,revertData:{type:"cliUndo",undoIds:[e.undoId]}})}else if(!e.success&&e.reason==="no-match"&&tn){let t=tn,n={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,originalText:t.originalText,newText:t.newText},o={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};Wo(n,o,t.originalInnerHTML),pe({type:"textAnnotation",componentName:n.componentName,filePath:n.filePath||"",summary:`"${nn(n.originalText,20)}" \u2192 "${nn(n.newText,20)}"`,state:"pending",elementIdentity:o,revertData:{type:"annotationRemove",annotationId:n.id,originalInnerHTML:t.originalInnerHTML,elementIdentity:o}})}tn=null}function Au(e){return!!(e.scrollHeight>e.clientHeight+4||e.querySelector("br")||getComputedStyle(e).whiteSpace!=="nowrap"&&e.getClientRects().length>1)}async function $u(e){let t=Z(e);if(!t)return null;try{let n=await Oe(t);if(n&&n.length>0)for(let o of n){if(!o.functionName)continue;let r=o.functionName;if(r[0]!==r[0].toUpperCase()||Ze(r))continue;let i=qe(o.fileName);return{tagName:e.tagName.toLowerCase(),componentName:r,filePath:i,lineNumber:o.lineNumber??0,columnNumber:o.columnNumber??0,stack:[],boundingRect:e.getBoundingClientRect()}}}catch{}try{let n=t;for(;n;){if(ye(n)){let o=ae(n.type),r=n._debugSource||n._debugOwner?._debugSource;if(o&&o[0]===o[0].toUpperCase()&&!Ze(o)&&r)return{tagName:e.tagName.toLowerCase(),componentName:o,filePath:r.fileName||"",lineNumber:r.lineNumber||0,columnNumber:r.columnNumber||0,stack:[],boundingRect:e.getBoundingClientRect()}}if(!n.return)break;n=n.return}}catch{}return null}function gs(e){z&&At();let t=null,n=e.target;n instanceof HTMLElement&&n!==document.documentElement&&n!==document.body&&!n.hasAttribute("data-frameup-interaction")&&!n.closest("#frameup-root")?t=n:t=$t(e.clientX,e.clientY),t&&(Pu.has(t.tagName)||t.textContent?.trim()&&(e.preventDefault(),Ou(t)))}function Ou(e){z=e,gt=e.textContent||"",Yn=e.innerHTML,Qo=gt,ee=null,$u(e).then(n=>{z===e&&(ee=n)}),_i=e.style.outline,e.style.outline=`2px solid ${s.accent}`,e.contentEditable="true",xs(!1),e.focus();let t=window.getSelection();if(t){t.removeAllRanges();let n=document.createRange();n.selectNodeContents(e),n.collapse(!1),t.addRange(n)}e.addEventListener("blur",ys),e.addEventListener("keydown",vs),e.addEventListener("input",hs)}function hs(){z&&(Qo=z.textContent||"")}function ys(){At()}function bs(e){if(!z)return;let t=e.target;if(t instanceof Node&&(t===z||z.contains(t)))return;if((t instanceof HTMLElement?t:null)?.closest("#frameup-root")){At();return}let o=Hu(e);if(o&&Et(o)){e.preventDefault(),e.stopPropagation(),At({nextSelection:o,reselectEditedElement:!1});return}e.preventDefault(),e.stopPropagation(),At({clearSelection:!0,reselectEditedElement:!1})}function vs(e){if(e.key==="Escape"){e.preventDefault(),At();return}if(e.key==="Enter"&&z&&!Au(z)){e.preventDefault(),At();return}e.stopPropagation()}function Hu(e){let t=e.target;return t instanceof HTMLElement&&t!==document.documentElement&&t!==document.body&&!t.hasAttribute("data-frameup-interaction")&&!t.closest("#frameup-root")?t:$t(e.clientX,e.clientY)}function At(e){if(!z)return;let t=Qo;if(t!==gt&&ee){if(Ke()&&ee.filePath){let r=z,i=r?.parentElement;ft({type:"text",componentName:ee.componentName,tag:ee.tagName,filePath:ee.filePath,className:r?.className||"",nthOfType:r?Go(r):1,parentTag:i?.tagName.toLowerCase()||"",parentClassName:i?.className||"",lineHint:ee.lineNumber,originalText:gt,newText:t});let a=z;if(Vi(),e?.nextSelection&&document.contains(e.nextSelection)){Qe(e.nextSelection,{skipSidebar:!1});return}if(e?.clearSelection){ke();return}if(e?.reselectEditedElement===!1)return;a&&document.contains(a)&&Qe(a,{skipSidebar:!1});return}if(ee.filePath)tn={componentInfo:ee,originalText:gt,newText:t,originalInnerHTML:Yn,tagName:ee.tagName},J({type:"updateText",filePath:ee.filePath,lineNumber:ee.lineNumber,columnNumber:ee.columnNumber,originalText:gt,newText:t});else{let r={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:ee.componentName,filePath:"",lineNumber:0,columnNumber:0,originalText:gt,newText:t},i={componentName:ee.componentName,filePath:"",lineNumber:0,columnNumber:0,tagName:ee.tagName};Wo(r,i,Yn),pe({type:"textAnnotation",componentName:r.componentName,filePath:r.filePath||"",summary:`"${nn(r.originalText,20)}" \u2192 "${nn(r.newText,20)}"`,state:"pending",elementIdentity:i,revertData:{type:"annotationRemove",annotationId:r.id,originalInnerHTML:Yn,elementIdentity:i}})}}let o=z;if(Vi(),e?.nextSelection&&document.contains(e.nextSelection)){Qe(e.nextSelection,{skipSidebar:!1});return}if(e?.clearSelection){ke();return}e?.reselectEditedElement!==!1&&o&&document.contains(o)&&Qe(o,{skipSidebar:!1})}function Vi(){z&&(z.removeEventListener("blur",ys),z.removeEventListener("keydown",vs),z.removeEventListener("input",hs),z.removeAttribute("contenteditable"),z.style.outline=_i,er(_n()),z=null,gt="",Yn="",Qo="",ee=null,_i="")}var Pu,z,gt,Yn,Qo,ee,_i,Fi,tn,Kn=S(()=>{"use strict";ct();Ct();Ln();De();K();Xn();ue();ue();Tt();on();Pt();Qt();Li();Vt();Pu=new Set(["IMG","INPUT","VIDEO","IFRAME","CANVAS","SELECT","TEXTAREA","HR","BR","EMBED","OBJECT","PROGRESS"]),z=null,gt="",Yn="",Qo="",ee=null,_i="",Fi=null,tn=null});function Es(e,t){zi.set(e,t)}function Ts(){I=document.createElement("div"),I.setAttribute("data-frameup-interaction","true"),I.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(I),document.addEventListener("scroll",en,!0),I.addEventListener("mousedown",e=>{if(tt){rn=e.clientX,qn=e.clientY,I&&(I.style.cursor="grabbing"),e.preventDefault();return}Zn?.onMouseDown?.(e)}),I.addEventListener("mousemove",e=>{if(tt&&rn!==0){cs(e.clientX-rn,e.clientY-qn),rn=e.clientX,qn=e.clientY;return}Zn?.onMouseMove?.(e)}),I.addEventListener("mouseup",e=>{if(tt){I&&(I.style.cursor="grab"),rn=0,qn=0;return}Zn?.onMouseUp?.(e)}),document.addEventListener("wheel",ws,{passive:!1}),document.addEventListener("keydown",Ss),document.addEventListener("keyup",Ns)}function ws(e){!I||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#frameup-root")||ss(e)}function Ss(e){if(e.key!==" "||et())return;let t=document.activeElement;t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t?.isContentEditable||(e.preventDefault(),!tt&&I&&(Cs=I.style.cursor,I.style.cursor="grab",I.style.pointerEvents="auto",tt=!0))}function Ns(e){if(e.key===" "&&tt&&(e.preventDefault(),tt=!1,rn=0,qn=0,I)){I.style.cursor=Cs;let t=_n();I.style.pointerEvents=t==="select"?"none":"auto"}}function tr(){return tt}function er(e){Zn=zi.get(e)||null,I&&(I.style.pointerEvents=e==="select"?"none":"auto"),Iu(e)}function Iu(e){if(I)switch(e){case"select":I.style.cursor="default";break;case"text":I.style.cursor="text";break;default:I.style.cursor="default"}}function xs(e){I&&(I.style.pointerEvents=e?"auto":"none")}function $t(e,t){let n=ns(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#frameup-root")&&!i.hasAttribute("data-frameup-interaction")&&!i.hasAttribute("data-frameup-placeholder")&&!(i===document.body||i===document.documentElement)&&!Zr(i)){r=i;break}return os(e,t,r),r}function Ms(){document.removeEventListener("scroll",en,!0),document.removeEventListener("wheel",ws),document.removeEventListener("keydown",Ss),document.removeEventListener("keyup",Ns),tt=!1,I?.remove(),I=null,Zn=null,zi.clear()}var I,Zn,zi,tt,rn,qn,Cs,Xn=S(()=>{"use strict";$i();Tt();Jo();Kn();ue();I=null,Zn=null,zi=new Map,tt=!1,rn=0,qn=0,Cs=""});function Ls(e,t,n,o,r,i){let a=e.left+e.width/2,l=e.top+e.height/2,c=t.left+t.width/2,d=t.top+t.height/2,u=c-a,m=d-l,f=Math.abs(u)<=r,p=Math.abs(m)<=r;return{dx:f?n+u/i:n,dy:p?o+m/i:o,snappedX:f,snappedY:p,guides:{verticalLine:f?{x:c,top:t.top,bottom:t.bottom}:null,horizontalLine:p?{y:d,left:t.left,right:t.right}:null}}}var ks=S(()=>{"use strict"});function Bi(e,t,n){let o=Xt(e,t),r=Ei(n);if(r)return be=r,nr={x:o.x,y:o.y},Qn={...r.delta},Jn=!1,$n(r.element,r.delta.dx,r.delta.dy,r.existingTransform),!0;let i=As(),a=$s();if(!i||!a||n!==a)return!1;let l=a.getBoundingClientRect(),c=a.style.cssText,d=getComputedStyle(a).transform,u=Z(a),m=u?.key!=null?String(u.key):void 0,f=ui(a),p={id:crypto.randomUUID(),componentRef:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber,columnNumber:i.columnNumber},element:a,placeholder:null,originalRect:l,delta:{dx:0,dy:0},originalCssText:c,existingTransform:d==="none"?"":d,identity:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber,columnNumber:i.columnNumber,tagName:a.tagName.toLowerCase()},parentLayout:Hl(a),nthOfType:f,jsxKey:m};return Os(i.filePath).then(({mtime:h,size:y})=>{p.fileMtime=h,p.fileSize=y}),yi(p),be=p,nr={x:o.x,y:o.y},Qn={dx:0,dy:0},Jn=!0,$n(a,0,0,p.existingTransform),!0}function Wi(e,t){if(!be)return;let n=Xt(e,t),o=Qn.dx+(n.x-nr.x),r=Qn.dy+(n.y-nr.y);$n(be.element,o,r,be.existingTransform);let i=be.element.parentElement;if(!i||i===document.body||i===document.documentElement){be.delta={dx:o,dy:r},ii();return}let a=be.element.getBoundingClientRect(),l=i.getBoundingClientRect(),{scale:c}=Be(),d=Ls(a,l,o,r,5,c);(d.snappedX||d.snappedY)&&$n(be.element,d.dx,d.dy,be.existingTransform),be.delta={dx:d.dx,dy:d.dy},sl(d.guides)}function Ps(){if(!be)return null;let e=be,t={...Qn},n={...e.delta};if(Jn||bi(e.id,n,t),Dl(e),ii(),pe({type:"move",componentName:e.componentRef.componentName,filePath:e.componentRef.filePath,summary:`moved (${Math.round(n.dx)}px, ${Math.round(n.dy)}px)`,state:"pending",elementIdentity:e.identity,revertData:Jn?{type:"moveRemove",moveId:e.id}:{type:"moveRestore",moveId:e.id,previousDelta:t}}),Ke()&&e.componentRef.filePath){let r=e.element,i=r?.parentElement;ft({type:"move",componentName:e.componentRef.componentName,tag:r?.tagName.toLowerCase()||"div",filePath:e.componentRef.filePath,className:r?.className||"",nthOfType:r?ui(r):1,parentTag:i?.tagName.toLowerCase()||"",parentClassName:i?.className||"",lineHint:e.componentRef.lineNumber,delta:{dx:n.dx,dy:n.dy},resolvedDx:null,resolvedDy:null})}let o=e.element;return be=null,Jn=!1,o}var be,nr,Qn,Jn,Rs=S(()=>{"use strict";On();Pt();ue();on();ks();Ro();Qt();De();Vt();ct();be=null,nr={x:0,y:0},Qn={dx:0,dy:0},Jn=!1});function or(e){let t=ji.get(e);if(t){if(Date.now()-t.timestamp>3e4){ji.delete(e);return}return t.filePath}}function rr(e,t){ji.set(e,{filePath:t,timestamp:Date.now()})}var ji,Ui=S(()=>{"use strict";ji=new Map});async function Du(e){let t=Z(e);if(!t)return null;try{let n=await Oe(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||Ze(i))continue;let a=qe(r.fileName);o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0){let r=o.find(i=>i.filePath)||o[0];return{tagName:e.tagName.toLowerCase(),componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber,columnNumber:r.columnNumber,stack:o}}}}catch(n){console.warn("[FrameUp] getOwnerStack failed, falling back to fiber walk:",n)}return Hs(e,t)}function Hs(e,t){let n=[],o=t;for(;o;){if(ye(o)){let r=ae(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",l=0,c=0;i&&(a=i.fileName||"",l=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!Ze(r)&&n.push({componentName:r,filePath:a,lineNumber:l,columnNumber:c})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function Is(e){let t=Z(e);return t?Hs(e,t):null}function _u(e){let t=e.tagName.toLowerCase(),n=e.getAttribute("data-component-name")?.trim(),o=e.getAttribute("aria-label")?.trim(),r=e.textContent?.trim(),i=n||o||(r?r.slice(0,24):"")||`<${t}>`;return{tagName:t,componentName:i,filePath:"",lineNumber:0,columnNumber:0,stack:[]}}function Ds(e,t){let n=$t(e,t);return n?Ti(n)?.element??n:null}function _s(e){Fu=e.onStart,Vu=e.onMove,zu=e.onEnd}function Fs(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=Bu,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),Fe=document.createElement("div"),Fe.className="marquee-box",e.appendChild(Fe),ot=!0,document.addEventListener("mousedown",ir,!0),document.addEventListener("mousemove",ar,!0),document.addEventListener("mouseup",lr,!0),document.addEventListener("keydown",cr,!0),document.addEventListener("click",sr,!0),document.addEventListener("scroll",nt,!0),window.addEventListener("resize",nt),an=!0}function ir(e){if(!ot||et()||tr()||e.metaKey||e.ctrlKey)return;let t=Ds(e.clientX,e.clientY);if(q||_.size>0){let o=ai(e.clientX,e.clientY);if(o){e.preventDefault(),e.stopPropagation();let r=dl();if(Pe=o,dr=r?{...r}:null,_.size>0){ht=[];for(let[i]of _){let a=getComputedStyle(i);ht.push({element:i,width:parseFloat(a.width)||i.offsetWidth,height:parseFloat(a.height)||i.offsetHeight})}eo=0,to=0}else if(B){let i=getComputedStyle(B);eo=parseFloat(i.width)||B.offsetWidth,to=parseFloat(i.height)||B.offsetHeight,ht=[]}D={x:e.clientX,y:e.clientY},me="resize-drag";return}}if(e.preventDefault(),e.stopPropagation(),!t||!Et(t)){(q||_.size>0)&&(ql(),q=null,B=null,ur(),wt(null),v&&(v.classList.remove("visible"),v.style.display="none"),je(null));return}if(D={x:e.clientX,y:e.clientY},We=t,no=e.shiftKey,Ci(t)&&Bi(e.clientX,e.clientY,t)){me="move-drag";return}if(!no&&B&&t===B){me="pending-move";return}me="pending"}function ar(e){if(ot&&!et()&&!tr()){if(me==="resize-drag"&&Pe&&D&&dr){e.preventDefault(),e.stopPropagation();let t=e.clientX-D.x,n=e.clientY-D.y;if(ht.length>0){for(let o of ht){let r=o.width,i=o.height;Pe==="tr"||Pe==="br"?r=Math.max(10,o.width+t):r=Math.max(10,o.width-t),Pe==="bl"||Pe==="br"?i=Math.max(10,o.height+n):i=Math.max(10,o.height-n),o.element.style.width=`${Math.round(r)}px`,o.element.style.height=`${Math.round(i)}px`}oo()}else{let o=eo,r=to;Pe==="tr"||Pe==="br"?o=Math.max(10,eo+t):o=Math.max(10,eo-t),Pe==="bl"||Pe==="br"?r=Math.max(10,to+n):r=Math.max(10,to-n),o=Math.round(o),r=Math.round(r),Gn("width",`${o}px`),Gn("height",`${r}px`),nt()}return}if(me==="pending-move"&&D){let t=Math.abs(e.clientX-D.x),n=Math.abs(e.clientY-D.y);(t>4||n>4)&&(We&&Bi(D.x,D.y,We)?(me="move-drag",Wi(e.clientX,e.clientY)):me="marquee");return}if(me==="move-drag"){Wi(e.clientX,e.clientY);return}if(me==="pending"&&D){let t=Math.abs(e.clientX-D.x),n=Math.abs(e.clientY-D.y);(t>10||n>10)&&(me="marquee")}if(me==="marquee"&&D&&Fe){let t=Math.min(e.clientX,D.x),n=Math.min(e.clientY,D.y),o=Math.abs(e.clientX-D.x),r=Math.abs(e.clientY-D.y);Fe.style.display="block",Fe.style.left=`${t}px`,Fe.style.top=`${n}px`,Fe.style.width=`${o}px`,Fe.style.height=`${r}px`;return}if(me==="idle"){if(q&&B||_.size>0){let i=ai(e.clientX,e.clientY);if(i){document.body.style.cursor=i==="tl"||i==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let n=Ds(e.clientX,e.clientY);if(!n||!Et(n)){Po(null);return}let o=n.getBoundingClientRect(),r=parseFloat(getComputedStyle(n).borderRadius)||4;Po(o,r+2)}}}function lr(e){if(!ot||et()||tr())return;let t=me;if(me="idle",t==="resize-drag"){document.body.style.cursor="",Pe=null,dr=null,D=null,ht.length>0?ht=[]:qo();return}if(t==="move-drag"){let n=Ps();n&&Gu(n),D=null,We=null;return}if(t==="pending-move"){D=null,We=null;return}if(t==="marquee"&&D){Fe&&(Fe.style.display="none"),Wu(Math.min(e.clientX,D.x),Math.min(e.clientY,D.y),Math.max(e.clientX,D.x),Math.max(e.clientY,D.y)),D=null,We=null,no=!1;return}We&&(no?ju(We):(ur(),Qe(We))),D=null,We=null,no=!1}async function Qe(e,t){try{let n=e.getBoundingClientRect();B=e,Gi(n,{}),Uu();let o=await Du(e)??_u(e);if(!o.filePath&&o.componentName){let r=or(o.componentName);if(r===void 0){let i=await pr(o.componentName);if(rr(o.componentName,i),i&&(o.filePath=i,o.stack))for(let a of o.stack)a.componentName===o.componentName&&!a.filePath&&(a.filePath=i)}else if(r&&(o.filePath=r,o.stack))for(let i of o.stack)i.componentName===o.componentName&&!i.filePath&&(i.filePath=r)}if(console.log("[FrameUp] selectElement:",e.tagName,"\u2192",o.componentName,o.filePath,"stack:",o.stack?.map(r=>r.componentName)),q={tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber,columnNumber:o.columnNumber,stack:o.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}},v){let r=o.filePath?`${o.filePath}:${o.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${o.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||Jt(e,q),je({tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber})}catch(n){console.error("[FrameUp] selectElement error:",n)}}function Wu(e,t,n,o){let r=el({x:e,y:t,width:n-e,height:o-t});if(r.length!==0){kt(),q=null,B=null,wt(null),v&&(v.classList.remove("visible"),v.style.display="none"),_.clear();for(let i of r.slice(0,50)){let a=Is(i);if(!a)continue;let l=i.getBoundingClientRect(),c={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:l.top,left:l.left,width:l.width,height:l.height}};_.set(i,{element:i,info:c})}if(_.size!==0){if(_.size===1){let[i,a]=[..._.entries()][0];_.clear(),B=i,q=a.info;let l=i.getBoundingClientRect();if(Gi(l,q),v){let c=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${c?`<span class="comp-path">${c}</span>`:""}`}Jt(i,q),je({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}oo(),je(null),v&&(v.innerHTML=`<span class="comp-name">${_.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function ju(e){if(_.has(e)){if(_.delete(e),_.size===1){let[r,i]=[..._.entries()][0];_.clear(),Rn(),B=r,q=i.info;let a=r.getBoundingClientRect();if(Gi(a,q),Jt(r,q),v){let l=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${l?`<span class="comp-path">${l}</span>`:""}`}je({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else _.size===0?(Rn(),ke()):(oo(),v&&(v.innerHTML=`<span class="comp-name">${_.size} elements selected</span>`));return}let t=Is(e);if(!t)return;q&&B&&_.size===0&&(_.set(B,{element:B,info:q}),kt(),q=null,B=null,wt(null));let n=e.getBoundingClientRect(),o={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}};_.set(e,{element:e,info:o}),oo(),je(null),v&&(v.innerHTML=`<span class="comp-name">${_.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function ur(){_.clear(),Rn()}function oo(){if(_.size===0){Rn();return}let e=[];for(let[t]of _){let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:n,borderRadius:o+2})}cl(e)}function sr(e){ot&&(et()||e.metaKey||e.ctrlKey||e.preventDefault())}function cr(e){if(ot&&e.key==="Escape"){if(_.size>0){ur(),v&&(v.classList.remove("visible"),v.style.display="none"),je(null),e.preventDefault();return}if(q){if(Zl()){Zo(),e.preventDefault();return}ke(),e.preventDefault()}}}function Gi(e,t){if(B){let n=parseFloat(getComputedStyle(B).borderRadius)||4;wt(e,n+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function nt(){if(_.size>0){oo();return}if(!B||!q)return;let e=B.getBoundingClientRect(),t=parseFloat(getComputedStyle(B).borderRadius)||4;if(wt(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function Uu(){Po(null)}function ke(){kt(),q=null,B=null,Pe=null,dr=null,ht=[],ur(),document.body.style.cursor="",wt(null),v&&(v.classList.remove("visible"),v.style.display="none"),je(null)}function As(){return q}function Vs(){ot=!1,document.removeEventListener("mousedown",ir,!0),document.removeEventListener("mousemove",ar,!0),document.removeEventListener("mouseup",lr,!0),document.removeEventListener("keydown",cr,!0),document.removeEventListener("click",sr,!0),document.removeEventListener("scroll",nt,!0),window.removeEventListener("resize",nt),an=!1,v?.remove(),v=null}function zs(e){e&&!an?(document.addEventListener("mousedown",ir,!0),document.addEventListener("mousemove",ar,!0),document.addEventListener("mouseup",lr,!0),document.addEventListener("keydown",cr,!0),document.addEventListener("click",sr,!0),document.addEventListener("scroll",nt,!0),window.addEventListener("resize",nt),an=!0,ot=!0):!e&&an&&(document.removeEventListener("mousedown",ir,!0),document.removeEventListener("mousemove",ar,!0),document.removeEventListener("mouseup",lr,!0),document.removeEventListener("keydown",cr,!0),document.removeEventListener("click",sr,!0),document.removeEventListener("scroll",nt,!0),window.removeEventListener("resize",nt),an=!1,ot=!1)}function $s(){return B??null}async function Gu(e){await Qe(e,{skipSidebar:!0})}var q,B,ot,an,_,v,Fe,me,D,We,Pe,dr,eo,to,ht,no,Fu,Vu,zu,Bu,on=S(()=>{"use strict";ct();Ct();Ln();we();Tt();tl();K();Ro();Ai();Xn();Rs();ue();Ui();De();Kn();Ur()||Gr({onCommitFiberRoot(){}});q=null,B=null,ot=!1,an=!1,_=new Map,v=null,Fe=null,me="idle",D=null,We=null,Pe=null,dr=null,eo=0,to=0,ht=[],no=!1,Fu=null,Vu=null,zu=null,Bu=`
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    box-shadow: ${H.sm};
    border-radius: ${k.sm};
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
`});function Yi(e){return ro.push(e),()=>{ro=ro.filter(t=>t!==e)}}function Ht(){ro.forEach(e=>e())}function pe(e){let t=crypto.randomUUID(),n={...e,id:t,timestamp:Date.now()};return Ve.set(t,n),Ht(),t}function Yu(e){let t=Ve.get(e);if(!(!t||t.state==="reverted")){switch(t.revertData.type){case"noop":return;case"cliUndo":case"generateUndo":gr.add(e),J({type:"revertChanges",undoIds:t.revertData.undoIds});break;case"moveRemove":{let{moveId:n}=t.revertData;Promise.resolve().then(()=>(ue(),Uo)).then(({removeMove:o})=>{o(n)}),fr(t);break}case"moveRestore":{let{moveId:n,previousDelta:o}=t.revertData;Promise.resolve().then(()=>(ue(),Uo)).then(({restoreMoveDelta:r})=>{r(n,o)}),fr(t);break}case"annotationRemove":{let{annotationId:n,originalInnerHTML:o}=t.revertData;Promise.resolve().then(()=>(ue(),Uo)).then(({removeAnnotation:r})=>{r(n)}),fr(t);break}}t.state="reverted",Ht()}}function Ki(){let e=0;for(let t of Ve.values())t.state!=="reverted"&&e++;return e}function lo(){return ln}function so(e){ln=e,Ht()}function Ku(){Ve.clear(),Ht()}function Ws(){let e=!1;for(let t of Ve.values())t.state==="pending"&&(t.state="active",e=!0);e&&Ht()}function js(){let e=!1;for(let[t,n]of Ve)n.state==="pending"&&(Ve.delete(t),e=!0);e&&Ht()}function qu(e){let t=Math.floor((Date.now()-e)/1e3);if(t<10)return"just now";let n=Math.floor(t/60),o=t%60;return`${n}:${String(o).padStart(2,"0")} ago`}function Zu(e){return e.split("/").pop()??e}function ao(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Bs(e){return!!e.elementIdentity}function Ju(e){return e.state!=="reverted"&&e.revertData.type!=="noop"}function Qu(e){let t=ao(e.summary).replaceAll(" \u2192 ",'<span class="arrow"> \u2192 </span>');return`<span class="component-name">${ao(e.componentName)}</span><span class="entry-separator">\u2022</span>${t}`}function fr(e){pe({type:e.type,componentName:e.componentName,filePath:e.filePath,summary:`reverted ${e.summary}`,state:"active",propertyKey:e.propertyKey,elementIdentity:e.elementIdentity,revertData:{type:"noop"}})}async function ep(e){let t=Ve.get(e),n=t?.elementIdentity;if(!t||!n)return;let o=Yt(n);if(o||(o=await Io(n)),!o){M(`Couldn't find ${t.componentName}`);return}await Qe(o,{skipSidebar:!1})}function tp(){if(!rt)return;let e=Array.from(Ve.values()).reverse();if(e.length===0){rt.innerHTML='<div class="changelog-empty">No logs yet. Changes will appear here.</div>';return}rt.innerHTML=e.map(o=>{let r=["changelog-entry",Bs(o)?"selectable":"",o.state==="reverted"?"reverted":"",o.state==="pending"?"pending":""].filter(Boolean).join(" "),i=o.filePath?Zu(o.filePath):"",a=qu(o.timestamp);return`<div class="${r}" data-entry-id="${ao(o.id)}">
  <span class="entry-summary">${Qu(o)}</span>
  ${i?`<span class="entry-file" title="${ao(i)}">${ao(i)}</span>`:""}
  <span class="entry-time">${a}</span>
  ${Ju(o)?'<button class="entry-revert" title="Revert this change">\u21A9</button>':""}
</div>`}).join("");let t=Array.from(rt.querySelectorAll(".entry-revert"));for(let o of t){let i=o.closest(".changelog-entry")?.dataset.entryId;i&&o.addEventListener("click",a=>{a.stopPropagation(),Yu(i)})}let n=Array.from(rt.querySelectorAll(".changelog-entry"));for(let o of n){let r=o.dataset.entryId;if(!r)continue;let i=Ve.get(r);!i||!Bs(i)||o.addEventListener("click",()=>{ep(r)})}}function np(){if(!it)return;let e=Ki();e===0?it.classList.add("hidden"):(it.classList.remove("hidden"),it.textContent=String(e))}function Us(e){io=document.createElement("style"),io.textContent=Xu,e.appendChild(io),fe=document.createElement("div"),fe.className="changelog-panel",fe.style.display="none";let t=document.createElement("div");t.className="changelog-header";let n=document.createElement("div");n.className="changelog-header-main";let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.classList.add("changelog-header-icon"),o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.7"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.innerHTML='<path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path>';let r=document.createElement("span");r.className="changelog-title",r.textContent="Logs",it=document.createElement("span"),it.className="changelog-badge hidden",it.textContent="0";let i=document.createElement("span");i.className="changelog-header-copy",i.textContent="Latest changes",Ot=document.createElement("svg"),Ot.className="changelog-chevron",Ot.setAttribute("viewBox","0 0 16 16"),Ot.setAttribute("fill","currentColor"),Ot.innerHTML='<path d="M3.5 5.5L8 10l4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',n.appendChild(o),n.appendChild(r),n.appendChild(it),n.appendChild(i),t.appendChild(n),t.appendChild(Ot),t.addEventListener("click",()=>so(!ln)),fe.appendChild(t),rt=document.createElement("div"),rt.className="changelog-body",fe.appendChild(rt),e.appendChild(fe);let a=Yi(()=>{tp(),np(),fe&&(ln&&fe.style.display==="none"?(fe.style.display="",requestAnimationFrame(()=>{requestAnimationFrame(()=>{fe?.classList.add("visible")})})):ln||(fe.style.display="none",fe.classList.remove("visible")),fe.classList.toggle("collapsed",!ln))});mr=se(c=>{if(c.type==="revertComplete"){for(let[d,u]of Ve){if(!gr.has(d))continue;let m=u.revertData;if(m.type!=="cliUndo"&&m.type!=="generateUndo")continue;let f=c.results.filter(p=>m.undoIds.includes(p.undoId));f.length!==0&&(gr.delete(d),f.every(p=>p.success)?fr(u):(u.state="active",Ht()))}for(let d of c.results)!d.success&&d.error&&M(`Revert failed: ${d.error}`)}});let l=hr;hr=()=>{l(),a()}}function Gs(){mr&&(mr(),mr=null),hr(),hr=()=>{},fe?.remove(),fe=null,io?.remove(),io=null,rt=null,it=null,Ot=null,gr.clear(),Ku(),ro=[]}var Ve,ln,gr,ro,fe,rt,it,Ot,mr,io,Xu,hr,Pt=S(()=>{"use strict";De();K();we();on();On();Ve=new Map,ln=!1,gr=new Set,ro=[];fe=null,rt=null,it=null,Ot=null,mr=null,io=null,Xu=`
  .changelog-panel {
    position: fixed;
    top: 16px;
    right: 16px;
    bottom: 16px;
    width: 380px;
    max-width: min(380px, calc(100vw - 32px));
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    border-radius: ${k.lg};
    box-shadow: ${H.lg};
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
    border-radius: ${k.xs};
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
`;hr=()=>{}});function Ys(e){return`${e.componentName}:${e.filePath}:${e.lineHint}:${e.tag}`}function Ks(e){cn=e}function rp(e){switch(e.type){case"property":return e.updates.map(t=>`${t.oldClass||"none"} \u2192 ${t.newClass}`).join(", ");case"text":return`"${e.originalText.slice(0,20)}" \u2192 "${e.newText.slice(0,20)}"`;case"reorder":return`reorder children (${e.fromIndex+1} \u2192 ${e.toIndex+1})`;case"move":return`move (${Math.round(e.delta.dx)}px, ${Math.round(e.delta.dy)}px)`}}function ft(e){if(!e.filePath){M("Cannot track changes \u2014 source file not resolved","warning");return}let t=Ys(e),n=at.get(t);if(n&&n.type==="property"&&e.type==="property")for(let o of e.updates){let r=n.updates.findIndex(i=>i.cssProperty===o.cssProperty);r>=0?n.updates[r]=o:n.updates.push(o)}else at.set(t,e);cn?.(at.size),pe({type:e.type==="reorder"?"property":e.type==="move"?"move":e.type==="text"?"textEdit":"property",componentName:e.componentName,filePath:e.filePath,summary:rp(e),state:"pending",revertData:{type:"noop"}})}function qi(){return sn}function ip(){return[...at.values()]}function Xi(){at.clear(),cn?.(0)}function es(e,t,n){let o=Ys(e);co.set(o,{element:t,overrides:new Map(n)})}function Xs(){js();for(let[,{element:e,overrides:t}]of co)for(let[n,o]of t)e.style[n]=o;co.clear(),Xi(),M("Discarded all pending changes","info")}function qs(){if(at.size===0||sn)return;sn=!0,cn?.(at.size);let e=ip();J({type:"applyAllChanges",changes:e}),yr=setTimeout(()=>{sn&&(sn=!1,cn?.(at.size),M("Apply timed out \u2014 changes still pending, try again","error"))},op)}var op,at,sn,yr,cn,co,Qt=S(()=>{"use strict";De();we();Pt();op=3e4,at=new Map,sn=!1,yr=null,cn=null;co=new Map;Zs(e=>{sn=!1,yr&&(clearTimeout(yr),yr=null),e.success?(Ws(),co.clear(),Xi(),M(`Applied ${e.appliedCount} change${e.appliedCount===1?"":"s"}`,"success")):e.appliedCount>0?(co.clear(),M(`Applied ${e.appliedCount}, failed ${e.failedCount}`,"warning"),Xi()):M(e.error||"Failed to apply changes","error"),cn?.(at.size)})});var ec={};Ea(ec,{destroyToolbar:()=>ta,getShadowRoot:()=>X,hideGenerateButton:()=>sp,mountToolbar:()=>ea,setOnCanvasUndo:()=>oa,setOnGenerate:()=>na,showToast:()=>M,updateComponentDetail:()=>je,updateGenerateButton:()=>yt});function ea(e){let t=document.createElement("div");t.id="frameup-root",document.body.appendChild(t),un=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=lp;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${Ji}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Confirm</button>
    <div class="pending-actions" style="display:none">
      <button class="confirm-btn" title="Confirm Changes">Confirm Changes</button>
      <button class="discard-btn" title="Discard all pending changes">\u2715</button>
    </div>
    <button class="icon-btn close-btn" title="Close FrameUp">
      ${ap}
    </button>
  `,un.appendChild(n),un.appendChild(o),te=o.querySelector(".undo-btn"),pn=o.querySelector(".generate-btn");let r=o.querySelector(".close-btn");dn=o.querySelector(".component-detail"),It=document.createElement("div"),It.className="toast",un.appendChild(It),te.addEventListener("click",()=>{J({type:"undo"}),te&&(te.innerHTML='<div class="spinner"></div>',te.disabled=!0)}),r.addEventListener("click",e),pn.addEventListener("click",()=>{Qi&&Qi()});let i=o.querySelector(".pending-actions"),a=o.querySelector(".confirm-btn"),l=o.querySelector(".discard-btn");Ks(c=>{c>0&&!qi()?(i.style.display="flex",a.textContent=`Confirm Changes (${c})`,a.disabled=!1):qi()?(i.style.display="flex",a.textContent="Applying...",a.disabled=!0,l.style.display="none"):(i.style.display="none",l.style.display="inline-block")}),a.addEventListener("click",()=>{qs()}),l.addEventListener("click",()=>{Xs()}),document.addEventListener("keydown",c=>{c.key==="z"&&(c.ctrlKey||c.metaKey)&&!c.shiftKey&&!cp()&&Qs?.()&&c.preventDefault()}),tc(()=>{M("Disconnected. Click to reconnect."),rc()}),nc(()=>{M("Disconnected: another tab took over")}),oc(()=>{uo=0,te&&(te.disabled=!0)}),se(c=>{switch(c.type){case"reorderComplete":c.success?(uo++,te&&(te.innerHTML=Js,setTimeout(()=>{te&&(te.innerHTML=Ji,te.disabled=!1)},200))):c.error&&M(c.error);break;case"undoComplete":c.success?(uo=Math.max(0,uo-1),te&&(te.innerHTML=Js,setTimeout(()=>{te&&(te.innerHTML=Ji,te.disabled=uo===0)},200))):c.error&&M(c.error);break;case"devServerDisconnected":M("Dev server disconnected");break;case"devServerReconnected":M("Dev server reconnected");break}})}function ta(){let e=document.getElementById("frameup-root");e&&e.remove(),un=null,te=null}function X(){return un}function na(e){Qi=e}function oa(e){Qs=e}function yt(e){pn&&(pn.disabled=!e)}function sp(){pn&&(pn.style.display="none")}function je(e){if(!dn)return;if(!e){dn.className="component-detail empty",dn.textContent="No selection";return}dn.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";dn.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function M(e,t="info"){It&&(It.textContent=e,It.classList.add("visible"),Zi&&clearTimeout(Zi),Zi=setTimeout(()=>{It?.classList.remove("visible")},2e3))}function cp(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var un,te,uo,It,Zi,dn,pn,Qi,Qs,Ji,ap,Js,lp,we=S(()=>{"use strict";De();K();Qt();un=null,te=null,uo=0,It=null,Zi=null,dn=null,pn=null,Qi=null,Qs=null,Ji='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',ap='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>',Js='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>',lp=`
  :host {
    all: initial;
  }
  ${La}
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
    border-radius: ${k.md};
    font-family: ${x};
    font-size: 12px;
    color: ${s.textPrimary};
    box-shadow: ${H.md};
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
    border-radius: ${k.sm};
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
    box-shadow: ${H.md};
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
  .pending-actions {
    display: none;
    align-items: center;
    gap: 4px;
  }
  .confirm-btn {
    background: ${s.accent};
    border: none;
    border-radius: ${k.sm};
    color: white;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    font-family: ${x};
    cursor: pointer;
    transition: background ${C.fast};
    white-space: nowrap;
  }
  .confirm-btn:hover { background: ${s.accentHover}; }
  .confirm-btn:disabled { background: ${s.bgTertiary}; color: ${s.textTertiary}; cursor: wait; }
  .discard-btn {
    padding: 4px 8px;
    background: transparent;
    color: #9ca3af;
    border: 1px solid #374151;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
  }
  .discard-btn:hover { color: #ef4444; border-color: #ef4444; }
`});function ts(e){ca=e}function Zs(e){da=e}function br(e){ve&&ve.readyState===WebSocket.OPEN||(sa=e,ve=new WebSocket(`ws://localhost:${e}`),ve.onopen=()=>{let t=mn>0;mn=0,t&&la&&la()},ve.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&Sa(n.tokens),n.type==="updatePropertyComplete"&&ca&&ca(n.success,n.errorCode,n.error),n.type==="config"&&(Ma(n.hasApiKey),n.hasApiKey&&Promise.resolve().then(()=>(we(),ec)).then(o=>o.hideGenerateButton())),n.type==="applyAllComplete"&&da&&da(n),po.forEach(o=>o(n))}catch{}},ve.onclose=t=>{if(ve=null,t.code===4001){aa&&aa();return}if(mn<dp){let n=500*Math.pow(2,mn);mn++,ra=setTimeout(()=>br(e),n)}else ia&&ia()},ve.onerror=()=>{})}function J(e){ve&&ve.readyState===WebSocket.OPEN&&ve.send(JSON.stringify(e))}function se(e){return po.push(e),()=>{po=po.filter(t=>t!==e)}}function ic(){ra&&clearTimeout(ra),ve&&(ve.close(),ve=null),po=[]}function pr(e){return new Promise(t=>{let n=se(o=>{o.type==="discoverFileResult"&&o.componentName===e&&(n(),t(o.filePath))});J({type:"discoverFile",componentName:e}),setTimeout(()=>{n(),t(null)},5e3)})}function tc(e){ia=e}function nc(e){aa=e}function oc(e){la=e}function rc(){sa&&(mn=0,br(sa))}function Os(e){return new Promise(t=>{let n=se(o=>{o.type==="fileStatResult"&&o.filePath===e&&(n(),t({mtime:o.mtime,size:o.size}))});J({type:"fileStat",filePath:e}),setTimeout(()=>{n(),t({mtime:0,size:0})},2e3)})}var ve,po,mn,dp,ra,ia,aa,la,sa,ca,da,De=S(()=>{"use strict";Ft();Vt();ve=null,po=[],mn=0,dp=5,ra=null,ia=null,aa=null,la=null,sa=null,ca=null;da=null});De();we();on();Ro();ct();De();on();we();Qt();Vt();var Ce=null,xe=null,Re=null,ua=null,mo=!1,fn=null,vr=[],fo=new Map,xr=!1,up=`
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
`,bt=null;function ac(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=up,e.appendChild(t),_s({onStart:pp,onMove:mp,onEnd:fp}),se(n=>{n.type==="reorderComplete"&&(gn(),ke())})}function pp(e,t,n){Re=n,ua=t,fn={x:e.clientX,y:e.clientY},mo=!1,xr=!1,vr=[],fo=new Map,bt=null;let o=X();if(!o)return;Ce=document.createElement("div"),Ce.className="drag-preview";let r=t.getBoundingClientRect();Ce.style.width=`${r.width}px`,Ce.style.height=`${r.height}px`,Ce.innerHTML=t.outerHTML,o.appendChild(Ce),xe=document.createElement("div"),xe.className="drop-indicator",o.appendChild(xe);let i=n.stack[1];if(!i?.filePath){M("Can't reorder this element"),gn();return}J({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=se(l=>{if(l.type!=="siblingsList")return;a(),vr=l.siblings;let c=document.querySelectorAll("*");for(let d of c){if(d.closest("#frameup-root"))continue;let u=Z(d);if(!u)continue;let m=u;for(;m;){if(ye(m)){let f=m._debugSource||m._debugOwner?._debugSource;if(f){for(let p of l.siblings)f.lineNumber===p.lineNumber&&f.fileName===i.filePath&&fo.set(p.lineNumber,{el:d,rect:d.getBoundingClientRect()});break}}m=m.return}}xr=!0})}function mp(e){if(!fn)return;let t=Math.abs(e.clientX-fn.x),n=Math.abs(e.clientY-fn.y);if(t<5&&n<5||(mo=!0,Ce&&(Ce.style.display="block",Ce.style.left=`${e.clientX+10}px`,Ce.style.top=`${e.clientY+10}px`),!xr||!Re))return;let o=null,r=1/0,i=0,a=0,l=0;for(let c of vr){if(c.lineNumber===Re.lineNumber)continue;let d=fo.get(c.lineNumber);if(!d)continue;let u=d.rect,m=u.top+u.height/2,f=Math.abs(e.clientY-m);f<r&&(r=f,o=c,e.clientY<m?i=u.top-2:i=u.bottom+2,a=u.left,l=u.width)}bt=o,o&&xe?(xe.style.display="block",xe.style.top=`${i}px`,xe.style.left=`${a}px`,xe.style.width=`${l}px`):xe&&(xe.style.display="none")}function fp(e){if(!mo||!bt||!Re){gn();return}if(!Re.filePath){M("Can't reorder this element"),gn();return}if(Ke()){let t=ua,n=t?.parentElement,r=(n?Array.from(n.children):[]).map(l=>({tag:l.tagName.toLowerCase(),className:l.className||"",textContent:(l.textContent||"").slice(0,30)})),i=t&&n?Array.from(n.children).indexOf(t):0,a=i;if(bt&&n){let l=fo.get(bt.lineNumber)?.el;if(l){let c=Array.from(n.children).indexOf(l);c>=0&&(a=c)}}ft({type:"reorder",componentName:Re.componentName,tag:t?.tagName.toLowerCase()||"div",filePath:Re.filePath,parentClassName:n?.className||"",lineHint:Re.lineNumber,childrenContext:r,fromIndex:i,toIndex:a}),gn();return}J({type:"reorder",filePath:Re.filePath,fromLine:Re.lineNumber,toLine:bt.lineNumber,fromComponent:Re.componentName,toComponent:bt.componentName}),Ce&&(Ce.style.display="none"),xe&&(xe.style.display="none"),mo=!1,fn=null}function gn(){Ce?.remove(),xe?.remove(),Ce=null,xe=null,Re=null,ua=null,mo=!1,fn=null,xr=!1,vr=[],fo=new Map,bt=null}function lc(){gn()}we();K();ue();var pa="http://www.w3.org/2000/svg",hn=null,Ae=null,ma=null;function sc(){let e=X();e&&(hn=document.createElementNS(pa,"svg"),hn.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),Ae=document.createElementNS(pa,"g"),Ae.setAttribute("class","annotation-root"),hn.appendChild(Ae),e.appendChild(hn),window.addEventListener("scroll",Cr,{passive:!0}),ma=zn(Cr),Cr())}function Cr(){if(!Ae)return;let{scale:e,offsetX:t,offsetY:n}=Be();Ae.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function cc(e,t,n,o,r,i){if(!Ae)return null;let a=document.createElementNS(pa,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let l=document.createElement("div");return l.style.cssText=`
    background: ${s.bgPrimary};
    color: ${s.textPrimary};
    border: 1px solid ${s.border};
    box-shadow: ${H.sm};
    padding: 4px 8px;
    border-radius: ${k.sm};
    font-size: ${r}px;
    font-family: ${x};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `,l.textContent=o,a.appendChild(l),Ae.appendChild(a),a}function dc(e){if(!Ae)return;let t=Ae.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function go(){Ae&&(Ae.innerHTML="")}function uc(){window.removeEventListener("scroll",Cr),ma?.(),ma=null,hn?.remove(),hn=null,Ae=null}On();ue();we();K();si();Jo();Kn();Pt();var yn={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9093 12.3603L17.0007 20.8537L14.1816 21.8798L11.0902 13.3864L6.91797 16.5422L8.4087 1.63318L19.134 12.0959L13.9093 12.3603Z"></path></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6V21H11V6H5V4H19V6H13Z"></path></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>',logs:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.53614 18.8862 7.33243 17.1346 5.86492L15 8V2L21 2L18.5535 4.44656C20.6649 6.28002 22 8.9841 22 12Z"></path></svg>'},pc=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",fa=navigator.platform.includes("Mac")?"Cmd":"Ctrl",ba=[{type:"select",icon:yn.pointer,label:"Select",shortcut:"S"},{type:"text",icon:yn.text,label:"Text",shortcut:"T"}],gp=`
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${s.bgPrimary};
    border: 1px solid ${s.border};
    border-radius: ${k.lg};
    box-shadow: ${H.md};
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
    box-shadow: ${H.sm};
    color: ${s.textPrimary};
    padding: 4px 8px;
    border-radius: ${k.sm};
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
    box-shadow: ${H.sm};
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
    border-radius: ${k.lg};
    box-shadow: ${H.lg};
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
`,Ee=null,$e=null,Tr=new Map,Ue=null,Ge=null,ho=null,ga=null,ha=null,ya=null;function fc(e){ga=e}function gc(e){ha=e}function hc(e){Ue&&(Ue.disabled=!e)}function mc(){if(!Ge||!ho)return;let e=Ki();Ge.classList.toggle("active",lo()),ho.classList.toggle("hidden",e===0),ho.textContent=String(e)}function yc(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=gp,e.appendChild(t),Ee=document.createElement("div"),Ee.className="tools-panel";let n=[["select","text"]];for(let l=0;l<n.length;l++){if(l>0){let c=document.createElement("div");c.className="tool-divider",Ee.appendChild(c)}for(let c of n[l]){let d=ba.find(f=>f.type===c),u=document.createElement("button");u.className=`tool-btn${d.type==="select"?" active":""}`,u.innerHTML=`${d.icon}<span class="tooltip">${d.label}<span class="shortcut-badge">${pc}${d.shortcut}</span></span>`,u.addEventListener("click",()=>Vo(d.type));let m=null;u.addEventListener("mouseenter",()=>{m=setTimeout(()=>u.classList.add("tooltip-visible"),400)}),u.addEventListener("mouseleave",()=>{m&&clearTimeout(m),u.classList.remove("tooltip-visible")}),Ee.appendChild(u),Tr.set(d.type,u)}}$e=document.createElement("div"),$e.className="sub-options hidden",Ee.appendChild($e);let o=document.createElement("div");o.className="tool-divider",Ee.appendChild(o),Ue=document.createElement("button"),Ue.className="action-btn",Ue.innerHTML=yn.undo,Ue.title="Undo (Ctrl+Z)",Ue.disabled=!0,Ue.addEventListener("click",()=>{ha&&ha()}),Ee.appendChild(Ue),Ge=document.createElement("button"),Ge.className="action-btn has-badge",Ge.innerHTML=`${yn.logs}<span class="action-badge hidden">0</span>`,Ge.title="Logs",Ge.addEventListener("click",()=>{so(!lo())}),ho=Ge.querySelector(".action-badge"),Ee.appendChild(Ge);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=yn.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{ga&&ga()}),Ee.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=yn.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{ps(),i.style.color=us()?s.accent:""}),Ee.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8H14V6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5C21 8.433 19.433 10 17.5 10H16V14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5V16H10V17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14H8V10H6.5C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5V8ZM8 8V6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM10 10V14H14V10H10Z"></path></svg>',a.title=`Keyboard Shortcuts (${pc}/)`,a.addEventListener("click",()=>vc()),Ee.appendChild(a),e.appendChild(Ee),document.addEventListener("keydown",bc,!0),ya=Yi(mc),mc()}function bc(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||et()||e.ctrlKey||e.metaKey||e.altKey)return;let n=e.key.toUpperCase();if(e.key==="?"){vc(),e.preventDefault();return}let o=ba.find(r=>r.shortcut===n);o&&(Vo(o.type),e.preventDefault())}var Ye=null,yo=null;function vc(){Ye?Er():hp()}function hp(){let e=X();if(!e||Ye)return;Ye=document.createElement("div"),Ye.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:ba.map(r=>({action:r.label,keys:[r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[fa,"Z"]},{action:"Toggle Logs",keys:[fa,"Shift","L"]},{action:"Keyboard Shortcuts",keys:["?"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Space","Drag"]},{action:"Zoom",keys:[fa,"Scroll"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let l of r.items){let c=document.createElement("div");c.className="shortcut-row";let d=document.createElement("span");d.className="shortcut-action",d.textContent=l.action,c.appendChild(d);let u=document.createElement("span");u.className="shortcut-keys";for(let m=0;m<l.keys.length;m++){if(m>0){let p=document.createElement("span");p.className="shortcut-plus",p.textContent="+",u.appendChild(p)}let f=document.createElement("span");f.className="shortcut-key",f.textContent=l.keys[m],u.appendChild(f)}c.appendChild(u),i.appendChild(c)}t.appendChild(i)}Ye.appendChild(t),Ye.addEventListener("click",r=>{r.target===Ye&&Er()}),e.appendChild(Ye),yo=r=>{Er()},document.addEventListener("keydown",yo,!0)}function Er(){yo&&(document.removeEventListener("keydown",yo,!0),yo=null),Ye?.remove(),Ye=null}function xc(e){for(let[t,n]of Tr)n.classList.toggle("active",t===e);yp(e)}function yp(e){if($e&&($e.innerHTML="",$e.classList.add("hidden"),$e.classList.remove("visible"),e==="text")){$e.classList.remove("hidden"),requestAnimationFrame(()=>$e?.classList.add("visible"));let t=Kt(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();$o({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){zo("textColor",i),n.style.background=i},onClose(){}})}),$e.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{zo("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}$e.appendChild(o)}}function Cc(e){let t=Tr.get(e);t&&(t.style.backgroundColor=s.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function Ec(){document.removeEventListener("keydown",bc,!0),ya?.(),ya=null,Er(),Ee?.remove(),Ee=null,$e=null,Ue=null,Ge=null,ho=null,Tr.clear()}Xn();$i();Tt();Mi();ue();Ai();ue();ct();Ct();Ln();Tt();Xn();Ui();De();async function Tc(e,t){let n=$t(e,t);if(!n)return null;let o=Z(n);if(!o)return null;let r=null;try{let i=await Oe(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let l=a.functionName;if(l[0]!==l[0].toUpperCase()||Ze(l))continue;let c=qe(a.fileName);r={componentName:l,filePath:c,lineNumber:a.lineNumber??0,columnNumber:a.columnNumber??0};break}}catch{}if(!r){let i=o;for(;i;){if(ye(i)){let a=ae(i.type);if(a&&a[0]===a[0].toUpperCase()&&!Ze(a)){let l=i._debugSource||i._debugOwner?._debugSource;r={componentName:a,filePath:l?.fileName||"",lineNumber:l?.lineNumber||0,columnNumber:l?.columnNumber??0};break}}i=i.return}}if(r&&!r.filePath&&r.componentName){let i=or(r.componentName);if(i===void 0){let a=await pr(r.componentName);rr(r.componentName,a),a&&(r.filePath=a)}else i&&(r.filePath=i)}return r}K();var ce=null,Dt=null,wr=null,Sc={onMouseDown(e){if(ce){wc();return}let t=Xt(e.clientX,e.clientY);Dt={pageX:t.x,pageY:t.y},Tc(e.clientX,e.clientY).then(n=>{wr=n}),ce=document.createElement("input"),ce.type="text",ce.placeholder="Type annotation...",ce.style.cssText=`
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${s.bgPrimary};
      color: ${s.textPrimary};
      border: 1.5px solid ${s.accent};
      border-radius: ${k.sm};
      padding: 4px 8px;
      font-size: ${Kt().fontSize}px;
      font-family: ${x};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${s.accentSoft};
    `,ce.setAttribute("data-frameup-overlay","true"),ce.addEventListener("keydown",n=>{n.key==="Enter"&&(wc(),n.preventDefault()),n.key==="Escape"&&(Nc(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(ce),ce.focus()},onMouseMove(){},onMouseUp(){}};function wc(){if(!ce||!Dt)return;let e=ce.value.trim();if(ce.remove(),ce=null,!e)return;let t=Kt(),n=crypto.randomUUID();cc(n,Dt.pageX,Dt.pageY,e,t.fontSize,t.textColor),vi({type:"text",id:n,position:Dt,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:wr}),Dt=null,wr=null}function Nc(){ce&&(ce.remove(),ce=null),Dt=null,wr=null}function Mc(){Nc()}Kn();Jo();K();Pt();var _t=null,bo=null;function Lc(e){let t=e instanceof Error&&e.stack?e.stack:String(e);return/frameup|overlay/i.test(t)}function bp(e){let t=X();if(!t)return;_t&&_t.parentNode&&_t.parentNode.removeChild(_t),bo&&clearTimeout(bo);let n=document.createElement("div");n.setAttribute("style",["position: fixed","bottom: 72px","right: 16px","z-index: 2147483647","background: rgba(30, 30, 30, 0.92)","color: #fff",`font-family: ${x}`,"font-size: 12px","padding: 10px 14px",`border-radius: ${k.sm}`,`box-shadow: ${H.md}`,"max-width: 320px","display: flex","align-items: center","gap: 10px","opacity: 0",`transition: opacity ${C.medium}`].join("; "));let o=document.createElement("span");o.textContent=e,o.setAttribute("style","flex: 1;");let r=document.createElement("button");r.textContent="Dismiss",r.setAttribute("style",["background: rgba(255,255,255,0.15)","border: none","color: #fff",`font-family: ${x}`,"font-size: 11px","padding: 3px 8px",`border-radius: ${k.xs}`,"cursor: pointer","white-space: nowrap"].join("; ")),r.addEventListener("click",()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),bo&&clearTimeout(bo),_t=null}),n.appendChild(o),n.appendChild(r),t.appendChild(n),_t=n,requestAnimationFrame(()=>{n.style.opacity="1"}),bo=setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),_t=null},8e3)}function va(e){console.error("[FrameUp]",e),bp("FrameUp encountered an error. Your app is unaffected.")}function vp(){window.addEventListener("error",e=>{Lc(e.error??e.message)&&(va(e.error??e.message),e.preventDefault())}),window.addEventListener("unhandledrejection",e=>{Lc(e.reason)&&(va(e.reason),e.preventDefault())})}var xa=null;function kc(e,t,n){t.originalCssText=n.style.cssText,t.element=n,pt(t)}function xp(){if(window!==window.top)return;let e=window.__FRAMEUP_WS_PORT__;if(!e){console.warn("[FrameUp] No WebSocket port found.");return}if(document.getElementById("frameup-root"))return;br(e),ea(Cp);let t=X();t&&(Xl(t),Us(t)),Fs(),ll(),ac(),sc(),xi(r=>dc(r)),xa=new MutationObserver(()=>{for(let[r,i]of hi())document.contains(i.element)||setTimeout(()=>{let a=Yt(i.identity);if(a){kc(r,i,a);return}Io(i.identity).then(l=>{l?kc(r,i,l):(Bo(r),M(`Component ${i.componentRef.componentName} removed \u2014 move cleared`))})},80)}),xa.observe(document.body,{childList:!0,subtree:!0}),document.addEventListener("keydown",r=>{(r.metaKey||r.ctrlKey)&&r.shiftKey&&r.key==="l"&&(r.preventDefault(),so(!lo()))}),yc(),ms(),Ts(),Bl(),Es("text",Sc),fi((r,i)=>{Wn(),Cc(r),i==="text"&&Mc(),en(),Jr(),zs(r==="select"),er(r),xc(r)}),gi(()=>{yt(Mt()),hc(wi())}),gc(()=>{let r=jo();r&&M(`Undo: ${r}`)});let n=!1,o=0;na(()=>{if(n){M("Generation in progress");return}let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);M(`Please wait ${a}s before retrying`);return}if(!Mt()){M("Nothing to confirm \u2014 make some visual changes first");return}let i=Si();if(i.length>0&&(n=!0,yt(!1),M(`Applying ${i.length} change${i.length!==1?"s":""}...`),J({type:"commitBatch",operations:i})),Bn()){let a=Ni();n=!0,yt(!1),M("Generating from annotations..."),J({type:"generate",annotations:a})}i.length===0&&!Bn()&&M("Nothing to confirm \u2014 make some visual changes first")}),se(r=>{if(r.type==="commitBatchComplete"){Bn()||(n=!1,yt(Mt()));let i=r.results?.filter(c=>c.success).length??0,a=r.results?.length??0,l=r.undoIds??[];r.success?(pe({type:"commitBatch",componentName:"Batch Apply",filePath:"",summary:`${i}/${a} changes applied`,state:"active",revertData:{type:"batchApplyUndo",undoIds:l}}),M(`Applied ${i}/${a} changes`),ke(),go(),Nt()):i>0?(pe({type:"commitBatch",componentName:"Batch Apply",filePath:"",summary:`${i}/${a} changes applied (${a-i} failed)`,state:"active",revertData:{type:"batchApplyUndo",undoIds:l}}),M(`Applied ${i}/${a} \u2014 ${a-i} failed`),ke(),go(),Nt()):(M(`Error: ${r.error||"Batch apply failed"}`),o=Date.now()+5e3,n=!1,yt(Mt()))}}),se(r=>{if(r.type==="generateProgress"&&M(r.message),r.type==="generateComplete")if(n=!1,yt(Mt()),r.success){let i=r.changes.length;pe({type:"generate",componentName:"AI Generate",filePath:r.changes[0]?.filePath||"",summary:`${i} file${i!==1?"s":""} changed`,state:"active",revertData:{type:"generateUndo",undoIds:r.undoIds||[]}});let a=r.changes.map(l=>l.description||l.filePath).join(", ");M(`Applied: ${a}`),ke(),go(),Nt()}else M(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),oa(()=>{let r=jo();return r?(M(`Undo: ${r}`),!0):!1}),fc(()=>{ke(),go(),Nt(),ds(),updateEyeButton(!0),M("Canvas cleared")}),console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools")}function Cp(){en(),Jr(),Vs(),ul(),lc(),Ql(),uc(),xa?.disconnect(),Ec(),Gs(),fs(),Ms(),Nt(),Di(),ic(),ta()}function Pc(){try{xp(),vp()}catch(e){va(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Pc):Pc();})();
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
