"use strict";var FrameUp=(()=>{var Pc=Object.defineProperty;var S=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ca=(e,t)=>{for(var n in t)Pc(e,n,{get:t[n],enumerable:!0})};function Rc(e){let t=e.trim().toLowerCase();if(t==="transparent")return"transparent";if(/^#[0-9a-fA-F]{3,8}$/.test(t))return t;let n=document.createElement("canvas").getContext("2d");n.fillStyle="#000000",n.fillStyle=t;let o=n.fillStyle;if(o.startsWith("#"))return o;let r=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(r){let i=parseInt(r[1],10),a=parseInt(r[2],10),l=parseInt(r[3],10);return`#${((1<<24)+(i<<16)+(a<<8)+l).toString(16).slice(1)}`}return e}function Ac(){if(typeof document>"u")return{};let e=getComputedStyle(document.documentElement),t=Array.from(document.styleSheets).flatMap(E=>{try{return Array.from(E.cssRules)}catch{return[]}}).filter(E=>E instanceof CSSStyleRule&&E.selectorText===":root").flatMap(E=>Array.from(E.style)).filter(E=>E.startsWith("--")),n={},o={},r={},i={},a={},l={},c={},d={},u={},m={},f={},p={},h={},y={},P={},L={},V={},F={},j=(E,O,ge,he)=>{E[ge]=he,O[he]=ge};for(let E of t){let O=e.getPropertyValue(E).trim();if(!O)continue;let ge=E.match(/^--spacing-(.+)$/);if(ge){j(n,m,ge[1],O);continue}let he=E.match(/^--color-(.+)$/);if(he){let xo=he[1];o[xo]=O,f[Rc(O)]=xo;continue}let A=E.match(/^--font-size-(.+)$/);if(A){j(r,p,A[1],O);continue}let Y=E.match(/^--font-weight-(.+)$/);if(Y){j(i,h,Y[1],O);continue}let b=E.match(/^--radius-(.+)$/);if(b){j(a,y,b[1],O);continue}let T=E.match(/^--border-(.+)$/);if(T){j(l,P,T[1],O);continue}let W=E.match(/^--opacity-(.+)$/);if(W){j(c,L,W[1],O);continue}let te=E.match(/^--tracking-(.+)$/);if(te){j(d,V,te[1],O);continue}let ne=E.match(/^--leading-(.+)$/);if(ne){j(u,F,ne[1],O);continue}}return{spacing:n,colors:o,fontSize:r,fontWeight:i,borderRadius:a,borderWidth:l,opacity:c,letterSpacing:d,lineHeight:u,spacingReverse:m,colorsReverse:f,fontSizeReverse:p,fontWeightReverse:h,borderRadiusReverse:y,borderWidthReverse:P,opacityReverse:L,letterSpacingReverse:V,lineHeightReverse:F}}function Oc(e,t){let n={};for(let o of $c){let r=e[o]??{},i=t[o]??{};n[o]=new Map([...Object.entries(r),...Object.entries(i)])}return n}function Eo(e,t){return t.get(e)??null}function Ea(e,t,n){let r=(n??vt())[e],i=[];for(let[l,c]of r.entries()){let d=parseFloat(c);isNaN(d)||i.push({numericValue:d,token:l,cssValue:c})}let a=parseFloat(t);return isNaN(a)||i.some(c=>c.cssValue===t)||i.push({numericValue:a,token:null,cssValue:t}),i.sort((l,c)=>l.numericValue-c.numericValue),i}function wa(e){Ta=e,vn=null}function vt(){if(vn!==null)return vn;let e=Ac();return vn=Oc(e,Ta??{}),vn}var $c,Ta,vn,Ft=S(()=>{"use strict";$c=["spacing","colors","fontSize","fontWeight","borderRadius","borderWidth","opacity","letterSpacing","lineHeight","spacingReverse","colorsReverse","fontSizeReverse","fontWeightReverse","borderRadiusReverse","borderWidthReverse","opacityReverse","letterSpacingReverse","lineHeightReverse"];Ta=null,vn=null});function Na(e){Sa=e}function Ke(){return Sa}var Sa,Vt=S(()=>{"use strict";Sa=!1});var s,H,k,C,x,Ma,K=S(()=>{"use strict";s={bgPrimary:"#ffffff",bgSecondary:"#f7f7f8",bgTertiary:"#efefef",border:"rgba(0,0,0,0.08)",borderStrong:"rgba(0,0,0,0.15)",textPrimary:"#1a1a1a",textSecondary:"#6b6b6b",textTertiary:"#9b9b9b",accent:"#a259ff",accentHover:"#8b3ee0",accentSoft:"rgba(162,89,255,0.08)",accentMedium:"rgba(162,89,255,0.15)",danger:"#e5484d",dangerSoft:"rgba(229,72,77,0.08)",textOnAccent:"#ffffff",marginBoxBg:"rgba(255,200,100,0.15)",marginBoxBorder:"rgba(200,150,0,0.4)",paddingBoxBg:"rgba(100,180,255,0.12)",paddingBoxBorder:"rgba(50,120,200,0.35)",focusRing:"rgba(162,89,255,0.25)"},H={sm:"0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",md:"0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",lg:"0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)"},k={xs:"4px",sm:"6px",md:"10px",lg:"14px"},C={fast:"100ms ease",medium:"150ms ease",settle:"200ms ease"},x="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",Ma=`
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
`});var Nr,Tn,La,Hc,xn,Pa,wo,Ra,ka,Cn,To,st,Mr,En,Lr,zt,kr,So,wn=S(()=>{"use strict";Nr="0.5.32",Tn=`bippy-${Nr}`,La=Object.defineProperty,Hc=Object.prototype.hasOwnProperty,xn=()=>{},Pa=e=>{try{Function.prototype.toString.call(e).indexOf("^_^")>-1&&setTimeout(()=>{throw Error("React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production: https://reactjs.org/link/perf-use-production-build")})}catch{}},wo=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>!!(e&&"getFiberRoots"in e),Ra=!1,Cn=(e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__)=>Ra?!0:(e&&typeof e.inject=="function"&&(ka=e.inject.toString()),!!ka?.includes("(injected)")),To=new Set,st=new Set,Mr=e=>{let t=new Map,n=0,o={_instrumentationIsActive:!1,_instrumentationSource:Tn,checkDCE:Pa,hasUnsupportedRendererAttached:!1,inject(r){let i=++n;return t.set(i,r),st.add(r),o._instrumentationIsActive||(o._instrumentationIsActive=!0,To.forEach(a=>a())),i},on:xn,onCommitFiberRoot:xn,onCommitFiberUnmount:xn,onPostCommitFiberRoot:xn,renderers:t,supportsFiber:!0,supportsFlight:!0};try{La(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__",{configurable:!0,enumerable:!0,get(){return o},set(a){if(a&&typeof a=="object"){let l=o.renderers;o=a,l.size>0&&(l.forEach((c,d)=>{st.add(c),a.renderers.set(d,c)}),En(e))}}});let r=window.hasOwnProperty,i=!1;La(window,"hasOwnProperty",{configurable:!0,value:function(...a){try{if(!i&&a[0]==="__REACT_DEVTOOLS_GLOBAL_HOOK__")return globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__=void 0,i=!0,-0}catch{}return r.apply(this,a)},writable:!0})}catch{En(e)}return o},En=e=>{e&&To.add(e);try{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t)return;if(!t._instrumentationSource){t.checkDCE=Pa,t.supportsFiber=!0,t.supportsFlight=!0,t.hasUnsupportedRendererAttached=!1,t._instrumentationSource=Tn,t._instrumentationIsActive=!1;let n=wo(t);if(n||(t.on=xn),t.renderers.size){t._instrumentationIsActive=!0,To.forEach(i=>i());return}let o=t.inject,r=Cn(t);r&&!n&&(Ra=!0,t.inject({scheduleRefresh(){}})&&(t._instrumentationIsActive=!0)),t.inject=i=>{let a=o(i);return st.add(i),r&&t.renderers.set(a,i),t._instrumentationIsActive=!0,To.forEach(l=>l()),a}}(t.renderers.size||t._instrumentationIsActive||Cn())&&e?.()}catch{}},Lr=()=>Hc.call(globalThis,"__REACT_DEVTOOLS_GLOBAL_HOOK__"),zt=e=>Lr()?(En(e),globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__):Mr(e),kr=()=>!!(typeof window<"u"&&(window.document?.createElement||window.navigator?.product==="ReactNative")),So=()=>{try{kr()&&zt()}catch{}}});var Aa=S(()=>{"use strict";wn();So()});function Br(e,t,n=!1){if(!e)return null;let o=t(e);if(o instanceof Promise)return(async()=>{if(await o===!0)return e;let i=n?e.return:e.child;for(;i;){let a=await Ur(i,t,n);if(a)return a;i=n?null:i.sibling}return null})();if(o===!0)return e;let r=n?e.return:e.child;for(;r;){let i=Wr(r,t,n);if(i)return i;r=n?null:r.sibling}return null}var Pr,Rr,Ar,$r,Or,Hr,Ir,Dr,_r,Fr,Vr,zr,ye,Wr,Ur,jr,ae,Gr,Yr,oe,Ic,Kr=S(()=>{"use strict";wn();Pr=0,Rr=1,Ar=5,$r=11,Or=13,Hr=15,Ir=16,Dr=19,_r=26,Fr=27,Vr=28,zr=30,ye=e=>{switch(e.tag){case 1:case 11:case 0:case 14:case 15:return!0;default:return!1}};Wr=(e,t,n=!1)=>{if(!e)return null;if(t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=Wr(o,t,n);if(r)return r;o=n?null:o.sibling}return null},Ur=async(e,t,n=!1)=>{if(!e)return null;if(await t(e)===!0)return e;let o=n?e.return:e.child;for(;o;){let r=await Ur(o,t,n);if(r)return r;o=n?null:o.sibling}return null},jr=e=>{let t=e;return typeof t=="function"?t:typeof t=="object"&&t?jr(t.type||t.render):null},ae=e=>{let t=e;if(typeof t=="string")return t;if(typeof t!="function"&&!(typeof t=="object"&&t))return null;let n=t.displayName||t.name||null;if(n)return n;let o=jr(t);return o&&(o.displayName||o.name)||null},Gr=()=>{let e=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;return!!e?._instrumentationIsActive||wo(e)||Cn(e)},Yr=e=>{let t=zt(e.onActive);t._instrumentationSource=e.name??Tn;let n=t.onCommitFiberRoot;if(e.onCommitFiberRoot){let i=(a,l,c)=>{n!==i&&(n?.(a,l,c),e.onCommitFiberRoot?.(a,l,c))};t.onCommitFiberRoot=i}let o=t.onCommitFiberUnmount;if(e.onCommitFiberUnmount){let i=(a,l)=>{t.onCommitFiberUnmount===i&&(o?.(a,l),e.onCommitFiberUnmount?.(a,l))};t.onCommitFiberUnmount=i}let r=t.onPostCommitFiberRoot;if(e.onPostCommitFiberRoot){let i=(a,l)=>{t.onPostCommitFiberRoot===i&&(r?.(a,l),e.onPostCommitFiberRoot?.(a,l))};t.onPostCommitFiberRoot=i}return t},oe=e=>{let t=globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t?.renderers)for(let n of t.renderers.values())try{let o=n.findFiberByHostInstance?.(e);if(o)return o}catch{}if(typeof e=="object"&&e){if("_reactRootContainer"in e)return e._reactRootContainer?._internalRoot?.current?.child;for(let n in e)if(n.startsWith("__reactContainer$")||n.startsWith("__reactInternalInstance$")||n.startsWith("__reactFiber"))return e[n]||null}return null},Ic=Error()});var xt=S(()=>{"use strict";wn();Aa();Kr();});function Sn(e,t){let n=0,o=0,r=0;do r=Ya[e.next()],n|=(r&31)<<o,o+=5;while(r&32);let i=n&1;return n>>>=1,i&&(n=-2147483648|-n),t+n}function Da(e,t){return e.pos>=t?!1:e.peek()!==Wc}function Ka(e){let{length:t}=e,n=new jc(e),o=[],r=0,i=0,a=0,l=0,c=0;do{let d=n.indexOf(";"),u=[],m=!0,f=0;for(r=0;n.pos<d;){let p;r=Sn(n,r),r<f&&(m=!1),f=r,Da(n,d)?(i=Sn(n,i),a=Sn(n,a),l=Sn(n,l),Da(n,d)?(c=Sn(n,c),p=[r,i,a,l,c]):p=[r,i,a,l]):p=[r],u.push(p),n.pos++}m||Gc(u),o.push(u),n.pos=d+1}while(n.pos<=t);return o}function Gc(e){e.sort(Yc)}function Yc(e,t){return e[0]-t[0]}var $a,Dc,_c,Ba,Fc,Vc,Wa,zc,Ua,Bc,ja,Ga,Zr,Oa,Ha,Wc,Ia,Uc,Ya,jc,Xa,Kc,Xc,qa,Nn,No,qc,_a,Zc,Jc,Qc,ed,Fa,td,nd,od,rd,id,Va,Xe,ad,Xr,qr,ld,sd,cd,dd,ud,pd,md,fd,Oe,za,gd,hd,Mn,Ln,Ct=S(()=>{"use strict";wn();Kr();$a=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Dc=["rsc://","file:///","webpack://","webpack-internal://","node:","turbopack://","metro://","/app-pages-browser/","/(app-pages-browser)/"],_c=["<anonymous>","eval",""],Ba=/\.(jsx|tsx|ts|js)$/,Fc=/(\.min|bundle|chunk|vendor|vendors|runtime|polyfill|polyfills)\.(js|mjs|cjs)$|(chunk|bundle|vendor|vendors|runtime|polyfill|polyfills|framework|app|main|index)[-_.][A-Za-z0-9_-]{4,}\.(js|mjs|cjs)$|[\da-f]{8,}\.(js|mjs|cjs)$|[-_.][\da-f]{20,}\.(js|mjs|cjs)$|\/dist\/|\/build\/|\/.next\/|\/out\/|\/node_modules\/|\.webpack\.|\.vite\.|\.turbopack\./i,Vc=/^\?[\w~.-]+(?:=[^&#]*)?(?:&[\w~.-]+(?:=[^&#]*)?)*$/,Wa="(at Server)",zc=/(^|@)\S+:\d+/,Ua=/^\s*at .*(\S+:\d+|\(native\))/m,Bc=/^(eval@)?(\[native code\])?$/,ja=(e,t)=>{if(t?.includeInElement!==!1){let n=e.split(`
`),o=[];for(let r of n)if(/^\s*at\s+/.test(r)){let i=Oa(r,void 0)[0];i&&o.push(i)}else if(/^\s*in\s+/.test(r)){let i=r.replace(/^\s*in\s+/,"").replace(/\s*\(at .*\)$/,"");o.push({functionName:i,source:r})}else if(r.match(zc)){let i=Ha(r,void 0)[0];i&&o.push(i)}return Zr(o,t)}return e.match(Ua)?Oa(e,t):Ha(e,t)},Ga=e=>{if(!e.includes(":"))return[e,void 0,void 0];let t=e.startsWith("(")&&/:\d+\)$/.test(e)?e.slice(1,-1):e,n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t);return n?[n[1],n[2]||void 0,n[3]||void 0]:[t,void 0,void 0]},Zr=(e,t)=>t&&t.slice!=null?Array.isArray(t.slice)?e.slice(t.slice[0],t.slice[1]):e.slice(0,t.slice):e,Oa=(e,t)=>Zr(e.split(`
`).filter(n=>!!n.match(Ua)),t).map(n=>{let o=n;o.includes("(eval ")&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let r=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),i=r.match(/ (\(.+\)$)/);r=i?r.replace(i[0],""):r;let a=Ga(i?i[1]:r);return{functionName:i&&r||void 0,fileName:["eval","<anonymous>"].includes(a[0])?void 0:a[0],lineNumber:a[1]?+a[1]:void 0,columnNumber:a[2]?+a[2]:void 0,source:o}}),Ha=(e,t)=>Zr(e.split(`
`).filter(n=>!n.match(Bc)),t).map(n=>{let o=n;if(o.includes(" > eval")&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!o.includes("@")&&!o.includes(":"))return{functionName:o};{let r=/(([^\n\r"\u2028\u2029]*".[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*(?:@[^\n\r"\u2028\u2029]*"[^\n\r@\u2028\u2029]*)*(?:[\n\r\u2028\u2029][^@]*)?)?[^@]*)@/,i=o.match(r),a=i&&i[1]?i[1]:void 0,l=Ga(o.replace(r,""));return{functionName:a,fileName:l[0],lineNumber:l[1]?+l[1]:void 0,columnNumber:l[2]?+l[2]:void 0,source:o}}}),Wc=44,Ia="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Uc=new Uint8Array(64),Ya=new Uint8Array(128);for(let e=0;e<Ia.length;e++){let t=Ia.charCodeAt(e);Uc[e]=t,Ya[t]=e}jc=class{constructor(e){this.pos=0,this.buffer=e}next(){return this.buffer.charCodeAt(this.pos++)}peek(){return this.buffer.charCodeAt(this.pos)}indexOf(e){let{buffer:t,pos:n}=this,o=t.indexOf(e,n);return o===-1?t.length:o}};Xa=/^[a-zA-Z][a-zA-Z\d+\-.]*:/,Kc=/^data:application\/json[^,]+base64,/,Xc=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^*]+?)[ \t]*(?:\*\/)[ \t]*$)/,qa=typeof WeakRef<"u",Nn=new Map,No=new Map,qc=e=>qa&&e instanceof WeakRef,_a=(e,t,n,o)=>{if(n<0||n>=e.length)return null;let r=e[n];if(!r||r.length===0)return null;let i=null;for(let u of r)if(u[0]<=o)i=u;else break;if(!i||i.length<4)return null;let[,a,l,c]=i;if(a===void 0||l===void 0||c===void 0)return null;let d=t[a];return d?{columnNumber:c,fileName:d,lineNumber:l+1}:null},Zc=(e,t,n)=>{if(e.sections){let o=null;for(let a of e.sections)if(t>a.offset.line||t===a.offset.line&&n>=a.offset.column)o=a;else break;if(!o)return null;let r=t-o.offset.line,i=t===o.offset.line?n-o.offset.column:n;return _a(o.map.mappings,o.map.sources,r,i)}return _a(e.mappings,e.sources,t-1,n)},Jc=(e,t)=>{let n=t.split(`
`),o;for(let i=n.length-1;i>=0&&!o;i--){let a=n[i].match(Xc);a&&(o=a[1]||a[2])}if(!o)return null;let r=Xa.test(o);if(!(Kc.test(o)||r||o.startsWith("/"))){let i=e.split("/");i[i.length-1]=o,o=i.join("/")}return o},Qc=e=>({file:e.file,mappings:Ka(e.mappings),names:e.names,sourceRoot:e.sourceRoot,sources:e.sources,sourcesContent:e.sourcesContent,version:3}),ed=e=>{let t=e.sections.map(({map:o,offset:r})=>({map:{...o,mappings:Ka(o.mappings)},offset:r})),n=new Set;for(let o of t)for(let r of o.map.sources)n.add(r);return{file:e.file,mappings:[],names:[],sections:t,sourceRoot:void 0,sources:Array.from(n),sourcesContent:void 0,version:3}},Fa=e=>{if(!e)return!1;let t=e.trim();if(!t)return!1;let n=t.match(Xa);if(!n)return!0;let o=n[0].toLowerCase();return o==="http:"||o==="https:"},td=async(e,t=fetch)=>{if(!Fa(e))return null;let n;try{let r=await t(e);if(!r.ok)return null;n=await r.text()}catch{return null}if(!n)return null;let o=Jc(e,n);if(!o||!Fa(o))return null;try{let r=await t(o);if(!r.ok)return null;let i=await r.json();return"sections"in i?ed(i):Qc(i)}catch{return null}},nd=async(e,t=!0,n)=>{if(t&&Nn.has(e)){let i=Nn.get(e);if(i==null)return null;if(qc(i)){let a=i.deref();if(a)return a;Nn.delete(e)}else return i}if(t&&No.has(e))return No.get(e);let o=td(e,n);t&&No.set(e,o);let r=await o;return t&&No.delete(e),t&&(r===null?Nn.set(e,null):Nn.set(e,qa?new WeakRef(r):r)),r},od=async(e,t=!0,n)=>await Promise.all(e.map(async o=>{if(!o.fileName)return o;let r=await nd(o.fileName,t,n);if(!r||typeof o.lineNumber!="number"||typeof o.columnNumber!="number")return o;let i=Zc(r,o.lineNumber,o.columnNumber);return i?{...o,source:i.fileName&&o.source?o.source.replace(o.fileName,i.fileName):o.source,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,isSymbolicated:!0}:o})),rd=e=>e._debugStack instanceof Error&&typeof e._debugStack?.stack=="string",id=()=>{let e=zt();for(let t of[...Array.from(st),...Array.from(e.renderers.values())]){let n=t.currentDispatcherRef;if(n&&typeof n=="object")return"H"in n?n.H:n.current}return null},Va=e=>{for(let t of st){let n=t.currentDispatcherRef;n&&typeof n=="object"&&("H"in n?n.H=e:n.current=e)}},Xe=e=>`
    in ${e}`,ad=(e,t)=>{let n=Xe(e);return t&&(n+=` (at ${t})`),n},Xr=!1,qr=(e,t)=>{if(!e||Xr)return"";let n=Error.prepareStackTrace;Error.prepareStackTrace=void 0,Xr=!0;let o=id();Va(null);let r=console.error,i=console.warn;console.error=()=>{},console.warn=()=>{};try{let l={DetermineComponentFrameRoot(){let u;try{if(t){let m=function(){throw Error()};if(Object.defineProperty(m.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(m,[])}catch(f){u=f}Reflect.construct(e,[],m)}else{try{m.call()}catch(f){u=f}e.call(m.prototype)}}else{try{throw Error()}catch(f){u=f}let m=e();m&&typeof m.catch=="function"&&m.catch(()=>{})}}catch(m){if(m instanceof Error&&u instanceof Error&&typeof m.stack=="string")return[m.stack,u.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot",Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name")?.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});let[c,d]=l.DetermineComponentFrameRoot();if(c&&d){let u=c.split(`
`),m=d.split(`
`),f=0,p=0;for(;f<u.length&&!u[f].includes("DetermineComponentFrameRoot");)f++;for(;p<m.length&&!m[p].includes("DetermineComponentFrameRoot");)p++;if(f===u.length||p===m.length)for(f=u.length-1,p=m.length-1;f>=1&&p>=0&&u[f]!==m[p];)p--;for(;f>=1&&p>=0;f--,p--)if(u[f]!==m[p]){if(f!==1||p!==1)do if(f--,p--,p<0||u[f]!==m[p]){let h=`
${u[f].replace(" at new "," at ")}`,y=ae(e);return y&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",y)),h}while(f>=1&&p>=0);break}}}finally{Xr=!1,Error.prepareStackTrace=n,Va(o),console.error=r,console.warn=i}let a=e?ae(e):"";return a?Xe(a):""},ld=(e,t)=>{let n=e.tag,o="";switch(n){case Vr:o=Xe("Activity");break;case Rr:o=qr(e.type,!0);break;case $r:o=qr(e.type.render,!1);break;case Pr:case Hr:o=qr(e.type,!1);break;case Ar:case _r:case Fr:o=Xe(e.type);break;case Ir:o=Xe("Lazy");break;case Or:o=e.child!==t&&t!==null?Xe("Suspense Fallback"):Xe("Suspense");break;case Dr:o=Xe("SuspenseList");break;case zr:o=Xe("ViewTransition");break;default:return""}return o},sd=e=>{try{let t="",n=e,o=null;do{t+=ld(n,o);let r=n._debugInfo;if(r&&Array.isArray(r))for(let i=r.length-1;i>=0;i--){let a=r[i];typeof a.name=="string"&&(t+=ad(a.name,a.env))}o=n,n=n.return}while(n);return t}catch(t){return t instanceof Error?`
Error generating stack: ${t.message}
${t.stack}`:""}},cd=e=>{let t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;let n=e;if(!n)return"";Error.prepareStackTrace=t,n.startsWith(`Error: react-stack-top-frame
`)&&(n=n.slice(29));let o=n.indexOf(`
`);if(o!==-1&&(n=n.slice(o+1)),o=Math.max(n.indexOf("react_stack_bottom_frame"),n.indexOf("react-stack-bottom-frame")),o!==-1&&(o=n.lastIndexOf(`
`,o)),o!==-1)n=n.slice(0,o);else return"";return n},dd=e=>!!(e.fileName?.startsWith("rsc://")&&e.functionName),ud=(e,t)=>e.fileName===t.fileName&&e.lineNumber===t.lineNumber&&e.columnNumber===t.columnNumber,pd=e=>{let t=new Map;for(let n of e)for(let o of n.stackFrames){if(!dd(o))continue;let r=o.functionName,i=t.get(r)??[];i.some(a=>ud(a,o))||(i.push(o),t.set(r,i))}return t},md=(e,t,n)=>{if(!e.functionName)return{...e,isServer:!0};let o=t.get(e.functionName);if(!o||o.length===0)return{...e,isServer:!0};let r=n.get(e.functionName)??0,i=o[r%o.length];return n.set(e.functionName,r+1),{...e,isServer:!0,fileName:i.fileName,lineNumber:i.lineNumber,columnNumber:i.columnNumber,source:e.source?.replace(Wa,`(${i.fileName}:${i.lineNumber}:${i.columnNumber})`)}},fd=e=>{let t=[];return Br(e,n=>{if(!rd(n))return;let o=typeof n.type=="string"?n.type:ae(n.type)||"<anonymous>";t.push({componentName:o,stackFrames:ja(cd(n._debugStack?.stack))})},!0),t},Oe=async(e,t=!0,n)=>{let o=fd(e),r=ja(sd(e)),i=pd(o),a=new Map;return od(r.map(l=>l.source?.includes(Wa)??!1?md(l,i,a):l).filter((l,c,d)=>{if(c===0)return!0;let u=d[c-1];return l.functionName!==u.functionName}),t,n)},za=e=>e.split("/").filter(Boolean).length,gd=e=>e.split("/").filter(Boolean)[0]??null,hd=e=>{let t=e.indexOf("/",1);if(t===-1||za(e.slice(0,t))!==1)return e;let n=e.slice(t);if(!Ba.test(n)||za(n)<2)return e;let o=gd(n);return!o||o.startsWith("@")||o.length>4?e:n},Mn=e=>{if(!e||_c.some(i=>i===e))return"";let t=e,n=t.startsWith("http://")||t.startsWith("https://");if(n)try{t=new URL(t).pathname}catch{}if(n&&(t=hd(t)),t.startsWith("about://React/")){let i=t.slice(14),a=i.indexOf("/"),l=i.indexOf(":");t=a!==-1&&(l===-1||a<l)?i.slice(a+1):i}let o=!0;for(;o;){o=!1;for(let i of Dc)if(t.startsWith(i)){t=t.slice(i.length),i==="file:///"&&(t=`/${t.replace(/^\/+/,"")}`),o=!0;break}}if($a.test(t)){let i=t.match($a);i&&(t=t.slice(i[0].length))}if(t.startsWith("//")){let i=t.indexOf("/",2);t=i===-1?"":t.slice(i)}let r=t.indexOf("?");if(r!==-1){let i=t.slice(r);Vc.test(i)&&(t=t.slice(0,r))}return t},Ln=e=>{let t=Mn(e);return!(!t||!Ba.test(t)||Fc.test(t))}});function vd(e){if(!e)return"";let t=e;for(let o of yd)if(t.startsWith(o)){t=t.slice(o.length);break}let n=t.match(/\/_next\/static\/chunks\/(?:app\/)?(.+)/);n&&(t=n[1]);for(let o of bd)t=t.replace(o,"");return t.startsWith("/")&&!t.startsWith("./")&&(t=t.slice(1)),t.startsWith("./")&&(t=t.slice(2)),t}function qe(e){if(!e)return"";let t=Mn(e);if(t&&Ln(t))return t;let n=vd(e);return n&&Ln(n)||n&&/\.(tsx?|jsx?|mjs)$/.test(n)&&!n.includes("node_modules")&&!n.startsWith("../")&&!n.includes("/dist/")&&!n.includes("/build/")?n:""}var yd,bd,kn=S(()=>{"use strict";Ct();yd=["webpack-internal:///(app-pages-browser)/./","webpack-internal:///(ssr)/./","webpack-internal:///(rsc)/./","webpack-internal:///./","webpack-internal:///","webpack:///(app-pages-browser)/./","webpack:///./","webpack:///","/@fs/","file:///","file://"],bd=[/\?[a-f0-9]+$/,/\?v=\d+$/,/\?t=\d+$/,/\?import$/]});function Ze(e){return!!(xd.has(e)||e.startsWith("_")||e.startsWith("$")||e.includes("Provider")||e.includes("Context")||e==="Head"||e==="html"||e==="body")}function Jr(e){let t=e.tagName.toLowerCase();if(t==="html"||t==="body")return!0;let n=e.getBoundingClientRect(),o=window.innerWidth,r=window.innerHeight;return n.width>=o*.9&&n.height>=r*.9}function Qr(){Pn=new WeakMap}function wd(e,t){return t.display!=="none"&&t.visibility!=="hidden"&&t.opacity!=="0"}function Sd(e){let t=parseInt(e.zIndex,10);return e.pointerEvents==="none"&&e.position==="fixed"&&!isNaN(t)&&t>=Ed}function Nd(e,t){let n=t.position;if(n!=="fixed"&&n!=="absolute")return!1;let o=e.getBoundingClientRect();if(o.width/window.innerWidth<Mo||o.height/window.innerHeight<Mo)return!1;let r=t.backgroundColor;if(r==="transparent"||r==="rgba(0, 0, 0, 0)"||parseFloat(t.opacity)<.1)return!0;let i=parseInt(t.zIndex,10);return!isNaN(i)&&i>Td}function Et(e){let t=e instanceof HTMLElement?e.tagName.toLowerCase():"";if(t==="html"||t==="body"||e instanceof HTMLElement&&Jr(e)||e.closest("#frameup-root")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-interaction")||e instanceof HTMLElement&&e.hasAttribute("data-frameup-placeholder"))return!1;let n=performance.now(),o=Pn.get(e);if(o&&n-o.timestamp<Cd)return o.isValid;let r=window.getComputedStyle(e);return wd(e,r)?e.clientWidth/window.innerWidth>=Mo&&e.clientHeight/window.innerHeight>=Mo&&(Sd(r)||Nd(e,r))?(Pn.set(e,{isValid:!1,timestamp:n}),!1):(Pn.set(e,{isValid:!0,timestamp:n}),!0):(Pn.set(e,{isValid:!1,timestamp:n}),!1)}var xd,Cd,Mo,Ed,Td,Pn,Tt=S(()=>{"use strict";xd=new Set(["InnerLayoutRouter","OuterLayoutRouter","RedirectErrorBoundary","RedirectBoundary","HTTPAccessFallbackErrorBoundary","HTTPAccessFallbackBoundary","LoadingBoundary","ErrorBoundary","ScrollAndFocusHandler","InnerScrollAndFocusHandler","RenderFromTemplateContext","DevRootHTTPAccessFallbackBoundary","AppDevOverlayErrorBoundary","AppDevOverlay","HotReload","Router","ErrorBoundaryHandler","AppRouter","ServerRoot","SegmentStateProvider","RootErrorBoundary","Suspense","Fragment","StrictMode","ReplaySsrOnlyErrors","SegmentViewNode","SegmentTrieNode"]);Cd=50,Mo=.9,Ed=2147483600,Td=1e3,Pn=new WeakMap});function Bt(e,t,n){return Math.min(n,Math.max(t,e))}function Ld(e){if(e.width<=0||e.height<=0)return[];let t=window.innerWidth,n=window.innerHeight,{x:o,y:r}=e,i=o+e.width,a=r+e.height,l=o+e.width/2,c=r+e.height/2,d=Bt(Math.ceil(e.width/Za),Lo,ko),u=Bt(Math.ceil(e.height/Za),Lo,ko);if(d*u>Ja){let h=Math.sqrt(Ja/(d*u));d=Bt(Math.floor(d*h),Lo,ko),u=Bt(Math.floor(u*h),Lo,ko)}let m=new Set,f=[],p=(h,y)=>{let P=Bt(Math.round(h),0,t-1),L=Bt(Math.round(y),0,n-1),V=`${P}:${L}`;m.has(V)||(m.add(V),f.push({x:P,y:L}))};p(o+Ne,r+Ne),p(i-Ne,r+Ne),p(o+Ne,a-Ne),p(i-Ne,a-Ne),p(l,r+Ne),p(l,a-Ne),p(o+Ne,c),p(i-Ne,c),p(l,c);for(let h=0;h<d;h++){let y=o+(h+.5)/d*e.width;for(let P=0;P<u;P++)p(y,r+(P+.5)/u*e.height)}return f}function Qa(e,t=Et,n=!0){let o={left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height},r=new Set,i=Ld(e);for(let c of i)for(let d of document.elementsFromPoint(c.x,c.y))r.add(d);let a=[];for(let c of r){if(!t(c))continue;let d=c.getBoundingClientRect();if(d.width<=0||d.height<=0)continue;let u={left:d.left,top:d.top,right:d.left+d.width,bottom:d.top+d.height};if(n){let m=Math.max(o.left,u.left),f=Math.max(o.top,u.top),p=Math.min(o.right,u.right),h=Math.min(o.bottom,u.bottom),y=Math.max(0,p-m)*Math.max(0,h-f),P=d.width*d.height;P>0&&y/P>=Md&&a.push(c)}else o.left<u.right&&o.right>u.left&&o.top<u.bottom&&o.bottom>u.top&&a.push(c)}let l=a.filter(c=>!a.some(d=>d!==c&&d.contains(c)));return l.sort((c,d)=>{let u=c.compareDocumentPosition(d);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0}),l}var Md,Za,Lo,ko,Ja,Ne,el=S(()=>{"use strict";Tt();Md=.75,Za=32,Lo=3,ko=20,Ja=100,Ne=1});function Wt(e,t,n){return e+(t-e)*n}var tl=S(()=>{"use strict"});function al(){let e=X();e&&(re=document.createElement("canvas"),re.setAttribute("data-frameup-overlay","true"),re.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `,e.appendChild(re),ii(),window.addEventListener("resize",ii))}function Ro(e,t=4){if(!e){le&&(le.targetOpacity=0,Je());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!le||!le.initialized?le=si(n,t):(le.target=n,le.borderRadius=t,le.targetOpacity=1),Je()}function wt(e,t=4){if(!e){U&&(U.targetOpacity=0,Je());return}let n={x:e.left,y:e.top,w:e.width,h:e.height};!U||!U.initialized?U=si(n,t):(U.target=n,U.borderRadius=t,U.targetOpacity=1),Je()}function ll(e){ct=e,Je()}function ai(){ct=null,Je()}function sl(e){for(U=null;G.length>e.length;)G.pop();for(let t=0;t<e.length;t++){let n=e[t],o={x:n.rect.left,y:n.rect.top,w:n.rect.width,h:n.rect.height};t<G.length?(G[t].target=o,G[t].borderRadius=n.borderRadius,G[t].targetOpacity=1):G.push(si(o,n.borderRadius))}Je()}function An(){G=[],Je()}function li(e,t){if(!ri)return null;let n=ul();if(!n)return null;let o=fl(n.x,n.y,n.w,n.h);for(let r of o){let i=e-r.x,a=t-r.y;if(i*i+a*a<=rl*rl)return r.corner}return null}function cl(){return ul()}function dl(){jt!==null&&cancelAnimationFrame(jt),window.removeEventListener("resize",ii),re?.remove(),re=null,R=null,le=null,U=null,G=[],ct=null}function ul(){if(G.length>1)return pl(G);if(U&&U.opacity>=.5){let{x:e,y:t,w:n,h:o}=U.current;return{x:e,y:t,w:n,h:o}}if(G.length===1){let{x:e,y:t,w:n,h:o}=G[0].current;return{x:e,y:t,w:n,h:o}}return null}function pl(e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,r=-1/0;for(let i of e){let{x:a,y:l,w:c,h:d}=i.current;a<t&&(t=a),l<n&&(n=l),a+c>o&&(o=a+c),l+d>r&&(r=l+d)}return{x:t,y:n,w:o-t,h:r-n}}function si(e,t){return{current:{...e},target:{...e},borderRadius:t,opacity:1,targetOpacity:1,initialized:!0}}function ii(){re&&(Rn=Math.max(window.devicePixelRatio||1,Pd),ei=window.innerWidth,ti=window.innerHeight,re.width=ei*Rn,re.height=ti*Rn,re.style.width=`${ei}px`,re.style.height=`${ti}px`,R=re.getContext("2d"),Je())}function Je(){jt===null&&(jt=requestAnimationFrame(ml))}function ml(){if(jt=null,!R||!re)return;let e=!1;le?.initialized&&(ni(le,kd)&&(e=!0),le.opacity<.01&&le.targetOpacity===0&&(le=null)),U?.initialized&&(ni(U,nl)&&(e=!0),U.opacity<.01&&U.targetOpacity===0&&(U=null));for(let t=G.length-1;t>=0;t--){let n=G[t];n.initialized&&ni(n,nl)&&(e=!0),n.opacity<.01&&n.targetOpacity===0&&G.splice(t,1)}if(R.setTransform(1,0,0,1,0,0),R.clearRect(0,0,re.width,re.height),R.setTransform(Rn,0,0,Rn,0,0),le&&oi(R,le,Ut,Rd),U&&(oi(R,U,Ut,ol),ri&&il(R,U.current,U.opacity)),ct){if(R.save(),R.globalAlpha=.6,R.strokeStyle=Ut,R.lineWidth=1,R.setLineDash([4,4]),ct.verticalLine){let{x:t}=ct.verticalLine;R.beginPath(),R.moveTo(t,0),R.lineTo(t,re.height),R.stroke()}if(ct.horizontalLine){let{y:t}=ct.horizontalLine;R.beginPath(),R.moveTo(0,t),R.lineTo(re.width,t),R.stroke()}R.restore()}if(G.length>0){for(let t of G)oi(R,t,Ut,ol);if(ri&&G.length>0){let t=pl(G);t&&t.w>=24&&t.h>=24&&(G.length>1&&(R.globalAlpha=.6,R.beginPath(),R.rect(t.x,t.y,t.w,t.h),R.strokeStyle=Ut,R.lineWidth=1,R.setLineDash([4,4]),R.stroke(),R.setLineDash([]),R.globalAlpha=1),il(R,t,1))}}e&&(jt=requestAnimationFrame(ml))}function ni(e,t){let n=e.current,o=e.target,r=Wt(n.x,o.x,t),i=Wt(n.y,o.y,t),a=Wt(n.w,o.w,t),l=Wt(n.h,o.h,t),c=Wt(e.opacity,e.targetOpacity,t);return Math.abs(r-o.x)<Po&&Math.abs(i-o.y)<Po&&Math.abs(a-o.w)<Po&&Math.abs(l-o.h)<Po&&Math.abs(c-e.targetOpacity)<.01?(n.x=o.x,n.y=o.y,n.w=o.w,n.h=o.h,e.opacity=e.targetOpacity,!1):(n.x=r,n.y=i,n.w=a,n.h=l,e.opacity=c,!0)}function oi(e,t,n,o){let{x:r,y:i,w:a,h:l}=t.current;if(a<=0||l<=0)return;let c=Math.min(t.borderRadius,a/2,l/2);e.globalAlpha=t.opacity,e.beginPath(),c>0?e.roundRect(r,i,a,l,c):e.rect(r,i,a,l),e.fillStyle=o,e.fill(),e.strokeStyle=n,e.lineWidth=1.5,e.stroke(),e.globalAlpha=1}function fl(e,t,n,o){return[{corner:"tl",x:e,y:t},{corner:"tr",x:e+n,y:t},{corner:"br",x:e+n,y:t+o},{corner:"bl",x:e,y:t+o}]}function il(e,t,n){if(t.w<24||t.h<24)return;e.globalAlpha=n;let o=fl(t.x,t.y,t.w,t.h);for(let r of o)e.beginPath(),e.arc(r.x,r.y,Ad,0,Math.PI*2),e.fillStyle=$d,e.fill(),e.strokeStyle=Od,e.lineWidth=Hd,e.stroke();e.globalAlpha=1}var kd,nl,Po,Pd,re,R,ei,ti,Rn,jt,le,U,G,Ut,Rd,ol,Ad,rl,$d,Od,Hd,ri,ct,Ao=S(()=>{"use strict";we();tl();K();kd=.35,nl=.3,Po=.5,Pd=2,re=null,R=null,ei=0,ti=0,Rn=1,jt=null,le=null,U=null,G=[],Ut=s.accent,Rd="rgba(162,89,255,0.08)",ol="rgba(162,89,255,0.15)",Ad=4,rl=10,$d="#ffffff",Od=Ut,Hd=1.5,ri=!0,ct=null});var Id,Dd,_d,Fd,Vd,Ve,gl=S(()=>{"use strict";Id=[{key:"display",label:"Display",group:"layout",controlType:"segmented",cssProperty:"display",tailwindPrefix:"",tailwindScale:"display",defaultValue:"block",standalone:!0,classPattern:"^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",enumValues:[{value:"block",tailwindValue:"block",label:"Block"},{value:"flex",tailwindValue:"flex",label:"Flex"},{value:"grid",tailwindValue:"grid",label:"Grid"},{value:"inline-flex",tailwindValue:"inline-flex",label:"Inline Flex"},{value:"none",tailwindValue:"hidden",label:"None"}]},{key:"flexDirection",label:"Direction",group:"layout",controlType:"segmented",cssProperty:"flex-direction",tailwindPrefix:"flex",tailwindScale:"flexDirection",defaultValue:"row",classPattern:"^flex-(row|col|row-reverse|col-reverse)$",enumValues:[{value:"row",tailwindValue:"row",label:"Row",icon:"\u2192"},{value:"column",tailwindValue:"col",label:"Column",icon:"\u2193"},{value:"row-reverse",tailwindValue:"row-reverse",label:"Row Reverse",icon:"\u2190"},{value:"column-reverse",tailwindValue:"col-reverse",label:"Column Reverse",icon:"\u2191"}]},{key:"justifyContent",label:"Justify",group:"layout",controlType:"segmented",cssProperty:"justify-content",tailwindPrefix:"justify",tailwindScale:"justifyContent",defaultValue:"flex-start",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"space-between",tailwindValue:"between",label:"Between"},{value:"space-around",tailwindValue:"around",label:"Around"},{value:"space-evenly",tailwindValue:"evenly",label:"Evenly"}]},{key:"alignItems",label:"Align",group:"layout",controlType:"segmented",cssProperty:"align-items",tailwindPrefix:"items",tailwindScale:"alignItems",defaultValue:"stretch",enumValues:[{value:"flex-start",tailwindValue:"start",label:"Start"},{value:"center",tailwindValue:"center",label:"Center"},{value:"flex-end",tailwindValue:"end",label:"End"},{value:"stretch",tailwindValue:"stretch",label:"Stretch"},{value:"baseline",tailwindValue:"baseline",label:"Baseline"}]},{key:"gap",label:"Gap",group:"layout",controlType:"number-scrub",cssProperty:"gap",tailwindPrefix:"gap",tailwindScale:"spacing",defaultValue:"0",min:0}],Dd=[{key:"paddingTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"padding-top",tailwindPrefix:"pt",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"padding-right",tailwindPrefix:"pr",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"padding-bottom",tailwindPrefix:"pb",tailwindScale:"spacing",relatedPrefixes:["p","py"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"paddingLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"padding-left",tailwindPrefix:"pl",tailwindScale:"spacing",relatedPrefixes:["p","px"],defaultValue:"0",min:0,compound:!0,compoundGroup:"spacing"},{key:"marginTop",label:"Top",group:"spacing",controlType:"box-model",cssProperty:"margin-top",tailwindPrefix:"mt",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginRight",label:"Right",group:"spacing",controlType:"box-model",cssProperty:"margin-right",tailwindPrefix:"mr",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginBottom",label:"Bottom",group:"spacing",controlType:"box-model",cssProperty:"margin-bottom",tailwindPrefix:"mb",tailwindScale:"spacing",relatedPrefixes:["m","my"],defaultValue:"0",compound:!0,compoundGroup:"spacing"},{key:"marginLeft",label:"Left",group:"spacing",controlType:"box-model",cssProperty:"margin-left",tailwindPrefix:"ml",tailwindScale:"spacing",relatedPrefixes:["m","mx"],defaultValue:"0",compound:!0,compoundGroup:"spacing"}],_d=[{key:"width",label:"W",group:"size",controlType:"number-scrub",cssProperty:"width",tailwindPrefix:"w",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"height",label:"H",group:"size",controlType:"number-scrub",cssProperty:"height",tailwindPrefix:"h",tailwindScale:"spacing",defaultValue:"auto",min:0},{key:"minWidth",label:"Min W",group:"size",controlType:"number-scrub",cssProperty:"min-width",tailwindPrefix:"min-w",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxWidth",label:"Max W",group:"size",controlType:"number-scrub",cssProperty:"max-width",tailwindPrefix:"max-w",tailwindScale:"spacing",defaultValue:"none"},{key:"minHeight",label:"Min H",group:"size",controlType:"number-scrub",cssProperty:"min-height",tailwindPrefix:"min-h",tailwindScale:"spacing",defaultValue:"0",min:0},{key:"maxHeight",label:"Max H",group:"size",controlType:"number-scrub",cssProperty:"max-height",tailwindPrefix:"max-h",tailwindScale:"spacing",defaultValue:"none"}],Fd=[{key:"fontSize",label:"Size",group:"typography",controlType:"number-scrub",cssProperty:"font-size",tailwindPrefix:"text",tailwindScale:"fontSize",defaultValue:"16px",min:0,classPattern:"^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$"},{key:"fontWeight",label:"Weight",group:"typography",controlType:"segmented",cssProperty:"font-weight",tailwindPrefix:"font",tailwindScale:"fontWeight",defaultValue:"400",enumValues:[{value:"300",tailwindValue:"light",label:"300"},{value:"400",tailwindValue:"normal",label:"400"},{value:"500",tailwindValue:"medium",label:"500"},{value:"600",tailwindValue:"semibold",label:"600"},{value:"700",tailwindValue:"bold",label:"700"}]},{key:"lineHeight",label:"Height",group:"typography",controlType:"number-scrub",cssProperty:"line-height",tailwindPrefix:"leading",tailwindScale:"lineHeight",defaultValue:"normal"},{key:"letterSpacing",label:"Spacing",group:"typography",controlType:"number-scrub",cssProperty:"letter-spacing",tailwindPrefix:"tracking",tailwindScale:"letterSpacing",defaultValue:"normal"},{key:"textAlign",label:"Align",group:"typography",controlType:"segmented",cssProperty:"text-align",tailwindPrefix:"text",tailwindScale:"textAlign",defaultValue:"left",classPattern:"^text-(left|center|right|justify|start|end)$",enumValues:[{value:"left",tailwindValue:"left",label:"Left"},{value:"center",tailwindValue:"center",label:"Center"},{value:"right",tailwindValue:"right",label:"Right"},{value:"justify",tailwindValue:"justify",label:"Justify"}]},{key:"color",label:"Color",group:"typography",controlType:"color-swatch",cssProperty:"color",tailwindPrefix:"text",tailwindScale:"colors",defaultValue:"#000000",classPattern:"^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$"}],Vd=[{key:"backgroundColor",label:"Color",group:"background",controlType:"color-swatch",cssProperty:"background-color",tailwindPrefix:"bg",tailwindScale:"colors",defaultValue:"transparent"}],Ve=[...Id,...Dd,..._d,...Fd,...Vd]});function hl(e,t,n,o){let r=e[0],i=r.tailwindScale,a=document.createElement("div");a.style.cssText="display:flex; align-items:center; gap:4px;";let l=document.createElement("input");l.type="text",l.className="prop-input",l.style.cssText="width:60px; cursor:text;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${s.textSecondary}; font-family:${x};`,a.appendChild(l),a.appendChild(c);let d=new Map(t);function u(){return d.get(r.key)??r.defaultValue}function m(f){let p=parseFloat(f);l.value=isNaN(p)?f:String(p);try{let y=Ea(i,f).find(P=>P.cssValue===f);y?.token?c.textContent=`${r.tailwindPrefix}-${y.token}`:c.textContent=""}catch{c.textContent=""}}return l.addEventListener("blur",()=>{let f=l.value.trim(),p=parseFloat(f);if(isNaN(p))zd.has(f)?(d.set(r.key,f),m(f),n(r.key,f),o()):m(u());else{let y=f.match(/(px|rem|em|%|vw|vh|ch)$/)?f:`${p}px`;d.set(r.key,y),m(y),n(r.key,y),o()}}),l.addEventListener("keydown",f=>{f.key==="Enter"?l.blur():f.key==="Escape"&&(m(u()),l.blur())}),m(u()),{element:a,setValue(f,p){f===r.key&&(d.set(f,p),m(p))},destroy(){}}}var zd,yl=S(()=>{"use strict";Ft();K();zd=new Set(["auto","none","normal","inherit","initial"])});function bl(e,t,n,o){let r=e[0],i=r.enumValues??[],a=document.createElement("div");a.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),m.textContent=u.icon??u.label,m.title=u.label,m.addEventListener("click",()=>{d(u.value),n(r.key,u.value),o()}),c.push({btn:m,value:u.value,opt:u}),a.appendChild(m)}return d(l),{element:a,setValue(u,m){u===r.key&&d(m)},destroy(){}}}var vl=S(()=>{"use strict";K()});function $n(e){let t=parseInt(e.slice(1,3),16)/255,n=parseInt(e.slice(3,5),16)/255,o=parseInt(e.slice(5,7),16)/255,r=Math.max(t,n,o),i=Math.min(t,n,o),a=r-i,l=0;a!==0&&(r===t?l=((n-o)/a+(n<o?6:0))*60:r===n?l=((o-t)/a+2)*60:l=((t-n)/a+4)*60);let c=r===0?0:a/r*100,d=r*100;return{h:l,s:c,v:d}}function $o(e){let t=e.h/360,n=e.s/100,o=e.v/100,r=Math.floor(t*6),i=t*6-r,a=o*(1-n),l=o*(1-i*n),c=o*(1-(1-i)*n),d,u,m;switch(r%6){case 0:d=o,u=c,m=a;break;case 1:d=l,u=o,m=a;break;case 2:d=a,u=o,m=c;break;case 3:d=a,u=l,m=o;break;case 4:d=c,u=a,m=o;break;case 5:d=o,u=a,m=l;break;default:d=0,u=0,m=0}let f=p=>Math.round(p*255).toString(16).padStart(2,"0");return`#${f(d)}${f(u)}${f(m)}`}var xl=S(()=>{"use strict"});function Oo(e){Gt();let t=X();if(!t)return;let n=document.createElement("div");n.style.cssText=`
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
  `,requestAnimationFrame(()=>{let b=n.getBoundingClientRect();b.right>window.innerWidth-8&&(n.style.left=`${window.innerWidth-b.width-8}px`),b.bottom>window.innerHeight-8&&(n.style.top=`${window.innerHeight-b.height-8}px`),n.style.opacity="1"});let o=$n(e.initialColor),r="backgroundColor";if(e.showPropertyToggle){let b=Bd(["Fill","Text"],0,T=>{r=T===0?"backgroundColor":"color",e.onPropertyChange?.(r)});n.appendChild(b)}let i=document.createElement("canvas");i.width=176,i.height=120,i.style.cssText="width:176px;height:120px;border-radius:4px;cursor:crosshair;";let a=i.getContext("2d"),l=document.createElement("div");l.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${H.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;let c=document.createElement("div");c.style.cssText="position:relative;width:176px;height:120px;",c.appendChild(i),c.appendChild(l),n.appendChild(c);function d(){let b=o.h,T=a.createLinearGradient(0,0,176,0);T.addColorStop(0,`hsl(${b}, 0%, 100%)`),T.addColorStop(1,`hsl(${b}, 100%, 50%)`),a.fillStyle=T,a.fillRect(0,0,176,120);let W=a.createLinearGradient(0,0,0,120);W.addColorStop(0,"rgba(0,0,0,0)"),W.addColorStop(1,"rgba(0,0,0,1)"),a.fillStyle=W,a.fillRect(0,0,176,120);let te=o.s/100*176,ne=(1-o.v/100)*120;l.style.left=`${te}px`,l.style.top=`${ne}px`}let u=!1;i.addEventListener("mousedown",b=>{u=!0,m(b)});function m(b){let T=i.getBoundingClientRect(),W=Math.max(0,Math.min(176,b.clientX-T.left)),te=Math.max(0,Math.min(120,b.clientY-T.top));o.s=W/176*100,o.v=(1-te/120)*100,d(),O()}let f=document.createElement("canvas");f.width=176,f.height=14,f.style.cssText="width:176px;height:14px;border-radius:7px;cursor:crosshair;";let p=f.getContext("2d"),h=document.createElement("div");h.style.cssText=`
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${H.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;let y=document.createElement("div");y.style.cssText="position:relative;width:176px;height:14px;",y.appendChild(f),y.appendChild(h),n.appendChild(y);function P(){let b=p.createLinearGradient(0,0,176,0);for(let T=0;T<=6;T++)b.addColorStop(T/6,`hsl(${T*60}, 100%, 50%)`);p.fillStyle=b,p.fillRect(0,0,176,14),h.style.left=`${o.h/360*176}px`}let L=!1;f.addEventListener("mousedown",b=>{L=!0,V(b)});function V(b){let T=f.getBoundingClientRect(),W=Math.max(0,Math.min(176,b.clientX-T.left));o.h=W/176*360,P(),d(),O()}let F=document.createElement("input");F.type="text",F.value=$o(o),F.style.cssText=`
    width: 100%; box-sizing: border-box;
    background: ${s.bgSecondary};
    border: 1px solid ${s.border};
    border-radius: ${k.sm};
    color: ${s.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `,F.addEventListener("keydown",b=>{b.key==="Enter"&&F.blur(),b.stopPropagation()}),F.addEventListener("blur",()=>{let b=F.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(b)){let T=b.startsWith("#")?b:`#${b}`;o=$n(T),d(),P(),O()}else F.value=$o(o)}),n.appendChild(F);let j=["#000000","#ffffff","#e5484d","#f76b15","#f5d90a","#30a46c","#0091ff","#a259ff"],E=document.createElement("div");E.style.cssText="display:flex;gap:4px;justify-content:center;";for(let b of j){let T=document.createElement("button");T.style.cssText=`
      width: 12px; height: 12px; border-radius: 50%;
      background: ${b};
      border: 1px solid ${s.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${C.fast};
    `,T.addEventListener("mouseenter",()=>{T.style.boxShadow=H.sm}),T.addEventListener("mouseleave",()=>{T.style.boxShadow="none"}),T.addEventListener("click",()=>{o=$n(b),d(),P(),F.value=b,O()}),E.appendChild(T)}if(n.appendChild(E),e.projectColors&&e.projectColors.length>0){let b=document.createElement("div");b.textContent="Project",b.style.cssText=`
      font-size: 10px;
      color: ${s.textSecondary};
      font-family: ${x};
      margin-top: 2px;
    `,n.appendChild(b);let T=document.createElement("div");T.style.cssText="display:flex;gap:4px;flex-wrap:wrap;max-height:48px;overflow-y:auto;";for(let{token:W,hex:te}of e.projectColors){let ne=document.createElement("button");ne.title=W,ne.style.cssText=`
        width: 12px; height: 12px; border-radius: 50%;
        background: ${te};
        border: 1px solid ${s.border};
        cursor: pointer; padding: 0;
        transition: box-shadow ${C.fast};
      `,ne.addEventListener("mouseenter",()=>{ne.style.boxShadow=H.sm}),ne.addEventListener("mouseleave",()=>{ne.style.boxShadow="none"}),ne.addEventListener("click",()=>{o=$n(te),d(),P(),F.value=te,O(),e.onPickedToken?.(W)}),T.appendChild(ne)}n.appendChild(T)}function O(){let b=$o(o);F.value=b,e.onColorChange(b),e.onPickedToken?.(void 0)}t.appendChild(n),dt=n,d(),P();let ge=b=>{u&&m(b),L&&V(b)},he=()=>{u=!1,L=!1};document.addEventListener("mousemove",ge),document.addEventListener("mouseup",he);let A=b=>{b.key==="Escape"&&Gt()};document.addEventListener("keydown",A,!0);let Y=b=>{dt&&!b.composedPath().includes(dt)&&Gt()};setTimeout(()=>document.addEventListener("mousedown",Y,!0),0),n._cleanup=()=>{document.removeEventListener("mousemove",ge),document.removeEventListener("mouseup",he),document.removeEventListener("keydown",A,!0),document.removeEventListener("mousedown",Y,!0)},n._onClose=e.onClose}function Gt(){dt&&(dt._cleanup?.(),dt._onClose?.(),dt.remove(),dt=null)}function Bd(e,t,n){let o=document.createElement("div");o.style.cssText=`
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
    `,a.addEventListener("click",()=>{r.forEach((l,c)=>{l.style.background=c===i?s.bgPrimary:"transparent",l.style.boxShadow=c===i?H.sm:"none",l.style.color=c===i?s.textPrimary:s.textSecondary}),n(i)}),r.push(a),o.appendChild(a)}return o}var dt,ci=S(()=>{"use strict";K();we();xl();dt=null});function Wd(){return di||(di=document.createElement("canvas").getContext("2d")),di}function Cl(e,t,n,o){let r=e[0],i=document.createElement("div");i.style.cssText="display:flex; align-items:center; gap:6px;";let a=document.createElement("div");a.style.cssText=`
    width:20px;
    height:20px;
    border-radius:${k.sm};
    border:1px solid ${s.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g," ");let l=document.createElement("input");l.type="text",l.placeholder="#rrggbb",l.className="prop-input",l.style.cssText="flex:1; min-width:0;";let c=document.createElement("span");c.style.cssText=`font-size:10px; color:${s.textSecondary}; font-family:${x};`,i.appendChild(a),i.appendChild(l),i.appendChild(c);let d=t.get(r.key)??r.defaultValue,u=!1;function m(h){let y=h.trim().toLowerCase();if(y==="transparent")return"transparent";if(y==="inherit"||y==="currentcolor"||y==="unset")return"#000000";if(/^#[0-9a-fA-F]{3,8}$/.test(y))return y;let P=Wd();P.fillStyle="#000000",P.fillStyle=y;let L=P.fillStyle;if(L.startsWith("#"))return L;let V=L.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(V){let F=parseInt(V[1],10),j=parseInt(V[2],10),E=parseInt(V[3],10);return`#${((1<<24)+(F<<16)+(j<<8)+E).toString(16).slice(1)}`}return"#000000"}function f(h){d=h,l.value=h,h==="transparent"?a.style.background="repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px":a.style.background=h;try{let y=vt(),P=Eo(h,y.colorsReverse);P?c.textContent=`${r.tailwindPrefix??"bg"}-${P}`:c.textContent=""}catch{c.textContent=""}}function p(){if(u)return;let h=l.value.trim();if(!h){f(d);return}let y=m(h);f(y),n(r.key,y),o()}return a.addEventListener("click",()=>{if(u){Gt(),u=!1;return}let h=a.getBoundingClientRect();u=!0,Oo({initialColor:m(d),position:{x:h.left-210,y:h.top},showPropertyToggle:!1,onColorChange:y=>{f(y),n(r.key,y)},onClose:()=>{u=!1,o()}})}),l.addEventListener("keydown",h=>{h.key==="Enter"?(p(),l.blur()):h.key==="Escape"&&(f(d),l.blur())}),l.addEventListener("blur",()=>{p()}),l.addEventListener("input",()=>{let h=l.value.trim(),y=m(h);a.style.background=y}),f(d),{element:i,setValue(h,y){h===r.key&&f(y)},destroy(){u&&(Gt(),u=!1)}}}var di,El=S(()=>{"use strict";K();ci();Ft();di=null});function Tl(e){return e==="paddingTop"?{layer:"padding",side:"top"}:e==="paddingRight"?{layer:"padding",side:"right"}:e==="paddingBottom"?{layer:"padding",side:"bottom"}:e==="paddingLeft"?{layer:"padding",side:"left"}:e==="marginTop"?{layer:"margin",side:"top"}:e==="marginRight"?{layer:"margin",side:"right"}:e==="marginBottom"?{layer:"margin",side:"bottom"}:e==="marginLeft"?{layer:"margin",side:"left"}:null}function wl(e,t,n,o){let r=new Map(t),i=[];for(let N of e){let w=Tl(N.key);w&&i.push({descriptor:N,...w})}let a=document.createElement("div");a.style.cssText=`
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
    `.trim().replace(/\n\s*/g," "),w.addEventListener("mouseenter",()=>{w.style.background=s.bgTertiary}),w.addEventListener("mouseleave",()=>{(document.activeElement!==p||p.dataset.key!==N.key)&&(w.style.background="transparent")}),w.addEventListener("click",()=>{P(N,w)}),m.push({key:N.key,span:w,descriptor:N}),w}let p=document.createElement("input");p.type="text",p.className="prop-input",p.style.cssText="width:40px; text-align:center; display:none; position:absolute; z-index:10;",a.appendChild(p);let h=null,y=null;function P(N,w){h&&h!==N&&L(),h=N,y=w,p.dataset.key=N.key;let Te=r.get(N.key)??N.defaultValue;p.value=V(Te);let ie=0,bt=0,lt=w;for(;lt&&lt!==a;)ie+=lt.offsetLeft,bt+=lt.offsetTop,lt=lt.offsetParent;p.style.display="block",p.style.left=`${ie}px`,p.style.top=`${bt}px`;let xa=w.getBoundingClientRect();p.style.width=`${Math.max(40,xa.width+10)}px`,p.focus(),p.select()}function L(){if(!h||!y)return;let N=p.value.trim(),w=h,Te=y,ie,bt=parseFloat(N),lt=new Set(["auto","none","normal","inherit","initial","0"]);isNaN(bt)?lt.has(N)?ie=N:ie=r.get(w.key)??w.defaultValue:ie=N.match(/(px|rem|em|%|vw|vh|ch)$/)?N:`${bt}px`,r.set(w.key,ie),Te.textContent=V(ie),Te.style.background="transparent",p.style.display="none",p.dataset.key="",h=null,y=null,n(w.key,ie),o()}p.addEventListener("keydown",N=>{if(N.key==="Enter")L();else if(N.key==="Escape"){if(h&&y){let w=r.get(h.key)??h.defaultValue;y.textContent=V(w)}p.style.display="none",p.dataset.key="",h=null,y=null}}),p.addEventListener("blur",()=>{L()});function V(N){let w=parseFloat(N);return isNaN(w)?N:w===Math.round(w)?String(Math.round(w)):N}function F(N){let w=document.createElement("span");return w.textContent=N,w.style.cssText=`
      font-size:9px;
      color:${s.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g," "),w}function j(N,w){return i.find(Te=>Te.layer===N&&Te.side===w)}function E(N,w){let Te=j(N,w);if(!Te){let ie=document.createElement("span");return ie.textContent="-",ie.style.cssText=`text-align:center; color:${s.textTertiary};`,ie}return f(Te.descriptor)}let O=E("padding","top");O.style.gridRow="1",O.style.gridColumn="2",O.style.textAlign="center";let ge=E("padding","left");ge.style.gridRow="2",ge.style.gridColumn="1";let he=E("padding","right");he.style.gridRow="2",he.style.gridColumn="3";let A=E("padding","bottom");A.style.gridRow="3",A.style.gridColumn="2",A.style.textAlign="center",u.style.gridRow="2",u.style.gridColumn="2",d.appendChild(O),d.appendChild(ge),d.appendChild(u),d.appendChild(he),d.appendChild(A);let Y=document.createElement("div");Y.style.cssText=`
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g," ");let b=E("margin","top");b.style.gridRow="1",b.style.gridColumn="2",b.style.textAlign="center";let T=E("margin","left");T.style.gridRow="2",T.style.gridColumn="1";let W=E("margin","right");W.style.gridRow="2",W.style.gridColumn="3";let te=E("margin","bottom");te.style.gridRow="3",te.style.gridColumn="2",te.style.textAlign="center";let ne=document.createElement("div");ne.style.cssText="grid-row:2; grid-column:2;",ne.appendChild(d),Y.appendChild(b),Y.appendChild(T),Y.appendChild(ne),Y.appendChild(W),Y.appendChild(te);let xo=F("margin"),kc=F("padding"),Co=document.createElement("div");return Co.style.cssText="display:flex; gap:8px; padding:0 4px;",Co.appendChild(xo),Co.appendChild(kc),c.appendChild(Y),l.appendChild(c),a.appendChild(Co),a.appendChild(l),{element:a,setValue(N,w){if(!Tl(N))return;r.set(N,w);let ie=m.find(bt=>bt.key===N);ie&&(ie.span.textContent=V(w))},destroy(){}}}var Sl=S(()=>{"use strict";K()});function Nl(e){return Ho.has(e)}function Ml(e){return Io.push(e),()=>{let t=Io.indexOf(e);t>=0&&Io.splice(t,1)}}function Yd(){return'<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>'}function Kd(e){let t=new Map;for(let n of e){let o=t.get(n.group);o||(o=[],t.set(n.group,o)),o.push(n)}return t}function Xd(e){let t=[],n=new Map;for(let o of e)if(o.compound&&o.compoundGroup){let r=n.get(o.compoundGroup);r||(r=[],n.set(o.compoundGroup,r)),r.push(o)}else t.push({controlType:o.controlType,descriptors:[o]});for(let[,o]of n)t.push({controlType:o[0].controlType,descriptors:o});return t}function Zd(e){let t=e.get("display")??"";return t==="flex"||t==="inline-flex"}function ui(e,t,n,o,r){let i=document.createElement("div");i.className="prop-sections";let a=document.createElement("style");a.textContent=Gd,i.appendChild(a);let l=[],c=Kd(e);for(let[d,u]of c){let m=d==="layout"&&!Zd(t)?u.filter(L=>!qd.has(L.key)):u;if(m.length===0)continue;let f=document.createElement("div");f.className="prop-section";let p=document.createElement("div");p.className="prop-section-header",p.innerHTML=`<span>${Ud[d]}</span>${Yd()}`;let h=document.createElement("div");h.className="prop-section-body";let y=Ho.has(d);if(y){let L=p.querySelector(".prop-section-chevron");L&&L.classList.add("collapsed"),h.classList.add("collapsed")}p.addEventListener("click",()=>{if(y=!y,y)Ho.add(d);else{Ho.delete(d);for(let V of Io)V(d)}let L=p.querySelector(".prop-section-chevron");L&&L.classList.toggle("collapsed",y),h.classList.toggle("collapsed",y)}),f.appendChild(p);let P=Xd(m);for(let L of P){let V=jd[L.controlType];if(!V)continue;let F=V(L.descriptors,t,n,o);if(L.descriptors.length>1||L.controlType==="box-model")h.appendChild(F.element);else{let j=document.createElement("div");j.className="prop-control-row";let E=document.createElement("span");E.className="prop-control-label",E.textContent=L.descriptors[0].label,E.title=L.descriptors[0].label;let O=document.createElement("div");O.className="prop-control-value",O.appendChild(F.element),j.appendChild(E),j.appendChild(O),h.appendChild(j)}l.push(F)}f.appendChild(h),i.appendChild(f)}if(r){let d=document.createElement("div");d.className="prop-show-all",d.textContent="Show all properties",d.addEventListener("click",r),i.appendChild(d)}return{container:i,controls:l}}var Ho,Io,Ud,jd,Gd,qd,Ll=S(()=>{"use strict";yl();vl();El();Sl();K();Ho=new Set;Io=[];Ud={layout:"Layout",spacing:"Spacing",size:"Size",typography:"Typography",background:"Background"},jd={"number-scrub":hl,segmented:bl,"color-swatch":Cl,"box-model":wl},Gd=`
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
`;qd=new Set(["flexDirection","justifyContent","alignItems","gap"])});function tu(){try{let e=localStorage.getItem(Rl);if(e){let t=parseInt(e,10);if(!isNaN(t)&&t>=kl&&t<=Pl)return t}}catch{}return Math.min(Jd,Math.floor(window.innerWidth*.22))}function nu(e){try{localStorage.setItem(Rl,String(e))}catch{}}function Al(e,t){let n=document.createElement("style");n.textContent=eu,e.appendChild(n);let o=document.createElement("div");o.className="prop-sidebar",o.style.width=`${tu()}px`;let r=document.createElement("div");r.className="prop-sidebar-resize",o.appendChild(r);let i=document.createElement("div");i.className="prop-sidebar-header";let a=document.createElement("div");a.className="prop-sidebar-header-info";let l=document.createElement("div");l.className="prop-sidebar-component-name";let c=document.createElement("span");c.className="prop-sidebar-saving-dot";let d=document.createElement("div");d.className="prop-sidebar-file-path",a.appendChild(l),a.appendChild(d);let u=document.createElement("button");u.className="prop-sidebar-close",u.title="Collapse panel",u.innerHTML='<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="8,2 4,6 8,10"/></svg>',i.appendChild(a),i.appendChild(u),o.appendChild(i);let m=document.createElement("div");m.className="prop-sidebar-warning",m.style.display="none",o.appendChild(m);let f=document.createElement("div");f.className="prop-sidebar-content",o.appendChild(f),e.appendChild(o);let p=!1,h=0,y=0;r.addEventListener("pointerdown",A=>{A.preventDefault(),A.stopPropagation(),p=!0,h=A.clientX,y=o.offsetWidth,r.classList.add("active"),r.setPointerCapture(A.pointerId)}),r.addEventListener("pointermove",A=>{if(!p)return;let Y=h-A.clientX,b=Math.max(kl,Math.min(Pl,y+Y));o.style.width=`${b}px`});let P=()=>{p&&(p=!1,r.classList.remove("active"),nu(o.offsetWidth))};r.addEventListener("pointerup",P),r.addEventListener("pointercancel",P),o.addEventListener("pointerdown",A=>A.stopPropagation()),o.addEventListener("mousedown",A=>A.stopPropagation()),o.addEventListener("click",A=>A.stopPropagation()),o.addEventListener("mouseup",A=>A.stopPropagation()),u.addEventListener("click",()=>{F(),t&&t()});let L=!1;function V(A,Y,b,T){l.textContent=`<${A}>`,l.appendChild(c),d.textContent=`${Y}:${b}`,d.title=`${Y}:${b}`,f.innerHTML="",f.appendChild(T),L||(L=!0,o.offsetHeight,o.classList.add("visible"))}function F(){L&&(L=!1,o.classList.remove("visible"))}function j(A){f.innerHTML="",f.appendChild(A)}function E(A,Y,b){m.innerHTML="";let T=document.createElement("span");T.className="prop-sidebar-warning-text",T.textContent=A;let W=document.createElement("button");W.className="prop-sidebar-warning-btn",W.textContent=Y,W.addEventListener("click",te=>{te.stopPropagation(),b()}),m.appendChild(T),m.appendChild(W),m.style.display="flex"}function O(){m.style.display="none",m.innerHTML=""}function ge(){c.classList.add("active")}function he(){c.classList.remove("active")}return{show:V,hide:F,isVisible:()=>L,getElement:()=>o,replaceContent:j,showWarning:E,clearWarning:O,showSaving:ge,hideSaving:he}}var Jd,kl,Pl,Rl,Qd,eu,$l=S(()=>{"use strict";K();Jd=300,kl=260,Pl=380,Rl="frameup-sidebar-width",Qd=4,eu=`
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
    width: ${Qd}px;
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
`});function Ol(e){let t=e.parentElement,n=t?getComputedStyle(t):null,o=getComputedStyle(e);return{display:n?.display??"block",flexDirection:n?.flexDirection??"row",elementPosition:o.position}}function ou(e,t,n){let o=n&&n!=="none"?` ${n}`:"";return`translate(${e}px, ${t}px)${o}`}function ut(e){e.element.style.transform=ou(e.delta.dx,e.delta.dy,e.existingTransform)}function Hl(e){e.existingTransform&&e.existingTransform!=="none"?e.element.style.transform=e.existingTransform:e.element.style.transform=""}function On(e,t,n,o){e.style.transform=`translate(${t}px, ${n}px) scale(1.02)${o&&o!=="none"?` ${o}`:""}`,e.style.boxShadow=H.lg,e.style.transition="none",e.style.zIndex="2147483644"}function Il(e){ut(e),e.element.style.boxShadow="",e.element.style.transition="",e.element.style.zIndex=""}function Yt(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);for(;o;){if(ye(o)){let r=o._debugSource,i=ae(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function Do(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);if(!o)continue;let r=await Oe(o);if(!r||r.length===0)continue;for(let i of r)if(!(!i.functionName||i.functionName!==e.componentName)&&i.fileName){let a=Mn(i.fileName);if(Ln(a)&&a.endsWith(e.filePath))return n}}catch{}return null}var Hn=S(()=>{"use strict";xt();Ct();K()});var Go={};Ca(Go,{addAnnotation:()=>vi,addMove:()=>yi,addTextEditAnnotation:()=>Uo,buildBatchOperations:()=>Si,canUndo:()=>wi,canvasUndo:()=>jo,getActiveTool:()=>Fn,getAnnotations:()=>iu,getCanvasTransform:()=>ze,getMoveContainingElement:()=>Ti,getMoveForElement:()=>Ei,getMoves:()=>hi,getOriginalsHidden:()=>au,getToolOptions:()=>Kt,hasChanges:()=>Mt,hasMoveForElement:()=>Ci,hasTextAnnotations:()=>Wn,onAnnotationRemoved:()=>xi,onCanvasTransformChange:()=>Bn,onStateChange:()=>gi,onToolChange:()=>fi,pageToViewport:()=>cu,peekUndoStack:()=>su,pushUndoAction:()=>Vn,removeAnnotation:()=>Vo,removeMove:()=>Wo,resetCanvas:()=>Nt,restoreMoveDelta:()=>ru,serializeTextAnnotationsOnly:()=>Ni,setActiveTool:()=>zo,setCanvasTransform:()=>zn,setOriginalsHidden:()=>lu,setToolOption:()=>Bo,updateMoveDelta:()=>bi,viewportToPage:()=>Xt});function fi(e){return _o.push(e),()=>{_o=_o.filter(t=>t!==e)}}function gi(e){return Fo.push(e),()=>{Fo=Fo.filter(t=>t!==e)}}function pt(){Fo.forEach(e=>e())}function Fn(){return pi}function zo(e){let t=pi;t!==e&&(pi=e,_o.forEach(n=>n(e,t)))}function Kt(){return{..._l}}function Bo(e,t){_l[e]=t}function hi(){return ce}function yi(e){ce.set(e.id,e),Vn({type:"moveCreate",moveId:e.id})}function bi(e,t,n){let o=ce.get(e);o&&(o.delta=t,ut(o),Vn({type:"moveDelta",moveId:e,previousDelta:n}))}function ru(e,t){let n=ce.get(e);n&&(n.delta=t,ut(n),pt())}function Wo(e){let t=ce.get(e);t&&(t.element.style.cssText=t.originalCssText,t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),ce.delete(e),pt())}function iu(){return Me}function vi(e){if(Me.push(e),e.type==="colorChange"){let t=e;He.push({type:"colorChange",annotationId:e.id,property:t.property,previousColor:t.fromColor})}else He.push({type:"annotationAdd",annotationId:e.id});pt()}function Uo(e,t,n){Me.push(e),He.push({type:"textEditRestore",annotationId:e.id,elementIdentity:t,originalInnerHTML:n}),pt()}function xi(e){Fl=e}function Vo(e){Me=Me.filter(t=>t.id!==e),Fl?.(e),pt()}function au(){return mi}function lu(e){mi=e;for(let t of ce.values())e?ut(t):Hl(t);pt()}function Ci(e){for(let t of ce.values())if(t.element===e||t.element.contains(e)||e.contains(t.element))return!0;return!1}function Ei(e){for(let t of ce.values())if(t.element===e)return t}function Ti(e){for(let t of ce.values())if(t.element===e||t.element.contains(e)||e.contains(t.element))return t}function jo(){let e=He.pop();if(!e)return null;switch(e.type){case"moveCreate":return Wo(e.moveId),"move removed";case"moveDelta":{let t=ce.get(e.moveId);return t&&(t.delta=e.previousDelta,ut(t)),"move reverted"}case"annotationAdd":return Vo(e.annotationId),"annotation removed";case"colorChange":{let t=Me.find(n=>n.id===e.annotationId);return t?.targetElement&&(t.targetElement.style[e.property]=e.previousColor),Vo(e.annotationId),"color reverted"}case"propertyChange":{let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue;return"property reverted"}case"textEditRestore":{let t=Yt(e.elementIdentity);return t&&(t.innerHTML=e.originalInnerHTML),Vo(e.annotationId),"text edit reverted"}}return null}function Vn(e){He.push(e),pt()}function su(){return He.length>0?He[He.length-1]:null}function ze(){return{scale:St,offsetX:Dn,offsetY:_n}}function zn(e,t,n){St=e,Dn=t,_n=n,In.forEach(o=>o())}function Bn(e){return In.push(e),()=>{In=In.filter(t=>t!==e)}}function Xt(e,t){return{x:(e-Dn)/St,y:(t-_n)/St}}function cu(e,t){return{x:e*St+Dn,y:t*St+_n}}function Nt(){for(let e of ce.values())e.element.style.cssText=e.originalCssText,e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder);for(let e of Me)if(e.type==="colorChange"){let t=e;t.targetElement&&(t.targetElement.style[t.property]=t.fromColor)}for(let e of He)if(e.type==="propertyChange"){let t=e;if(t.element&&document.contains(t.element))for(let n of t.overrides)t.element.style[n.cssProperty]=n.previousValue}ce=new Map,Me=[],He=[],mi=!0,St=1,Dn=0,_n=0,In.forEach(e=>e()),pt()}function Mt(){return ce.size>0||Me.length>0}function wi(){return He.length>0}function Dl(e){let t=Math.abs(e),n=vt(),o=null,r=1/0;for(let[i,a]of n.spacing){let l;if(a.endsWith("rem"))l=parseFloat(a)*du;else if(a.endsWith("px"))l=parseFloat(a);else continue;if(Number.isNaN(l))continue;let c=Math.abs(t-l);c<r&&(r=c,o=i)}return o!==null&&r<=Math.min(t*.15,8)?o:`[${Math.round(t)}px]`}function uu(e){if(!e)return"block";let t=e.elementPosition;if(t==="absolute"||t==="fixed")return"positioned";let n=e.display;return n==="flex"||n==="inline-flex"?"flex":n==="grid"||n==="inline-grid"?"grid":"block"}function Si(){let e=[];for(let t of Me){if(t.type==="colorChange"){let n=t,o=n.property==="backgroundColor"?"bg":"text";e.push({op:"updateClass",file:n.component.filePath,line:n.component.lineNumber,col:n.columnNumber??0,componentName:n.component.componentName,updates:[{tailwindPrefix:o,tailwindToken:n.pickedToken??null,value:n.toColor}]})}if(t.type==="textEdit"){let n=t;n.filePath&&e.push({op:"updateText",file:n.filePath,line:n.lineNumber,col:n.columnNumber,componentName:n.componentName,originalText:n.originalText,newText:n.newText})}}for(let t of ce.values()){if(!t.componentRef.filePath)continue;let n=t.identity.columnNumber,o=uu(t.parentLayout);Math.abs(t.delta.dx)>=1&&e.push({op:"moveSpacing",file:t.componentRef.filePath,line:t.componentRef.lineNumber,col:n,componentName:t.componentRef.componentName,axis:"x",token:Dl(t.delta.dx),direction:t.delta.dx>0?"positive":"negative",layoutContext:o}),Math.abs(t.delta.dy)>=1&&e.push({op:"moveSpacing",file:t.componentRef.filePath,line:t.componentRef.lineNumber,col:n,componentName:t.componentRef.componentName,axis:"y",token:Dl(t.delta.dy),direction:t.delta.dy>0?"positive":"negative",layoutContext:o})}return e}function Wn(){return Me.some(e=>e.type==="text")}function Ni(){let e=[];for(let t of Me)t.type==="text"&&e.push({type:"text",content:t.content,position:t.position,targetComponent:t.targetComponent?.componentName,targetFile:t.targetComponent?.filePath,targetLine:t.targetComponent?.lineNumber});return{moves:[],annotations:e,colorChanges:[],textEdits:[]}}var ce,Me,He,pi,mi,_l,St,Dn,_n,In,_o,Fo,Fl,du,de=S(()=>{"use strict";Hn();Ft();ce=new Map,Me=[],He=[],pi="select",mi=!0,_l={fontSize:16,textColor:"#ffffff"},St=1,Dn=0,_n=0,In=[],_o=[],Fo=[];Fl=null;du=16});function zl(){if(localStorage.getItem(Vl))return;let e=X();if(!e)return;Ie=document.createElement("div"),Ie.style.cssText=`
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
  `,n.addEventListener("click",()=>Un()),Ie.appendChild(t),Ie.appendChild(n),e.appendChild(Ie),requestAnimationFrame(()=>{Ie&&(Ie.style.opacity="1")})}function Un(){Ie&&(localStorage.setItem(Vl,"1"),Ie.style.opacity="0",setTimeout(()=>{Ie?.remove(),Ie=null},150))}var Vl,Ie,Mi=S(()=>{"use strict";K();we();Vl="frameup-onboarding-dismissed",Ie=null});function qt(e){let t=e.parentElement;if(!t)return 1;let n=1;for(let o=0;o<t.children.length&&t.children[o]!==e;o++)t.children[o].tagName===e.tagName&&n++;return n}var Yo=S(()=>{"use strict"});function Li(e,t){return e.includes(":")?!1:e===t?!0:e.startsWith(`${t}-`)}var Bl=S(()=>{"use strict"});function Gl(e){let t=new Set(["spacing","size","background"]),o=getComputedStyle(e).display;(o==="flex"||o==="inline-flex"||o==="grid"||o==="inline-grid"||e.children.length>0)&&t.add("layout");let r=e.tagName.toLowerCase();return(Array.from(e.childNodes).some(a=>a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()??"").length>0)||mu.has(r))&&t.add("typography"),t}function hu(){let e=g.elementIdentity,t=g.componentInfo;if(!e||!t){kt();return}let n=yu(e);if(n){jl(n,t).then(o=>{Qt(n,o)});return}bu(e).then(async o=>{if(o){let r=await jl(o,t);Qt(o,r)}else kt()})}function yu(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);for(;o;){if(ye(o)){let r=o._debugSource,i=ae(o);if(r&&i===e.componentName&&r.fileName?.endsWith(e.filePath)&&r.lineNumber===e.lineNumber)return n}o=o.return}}catch{}return null}async function bu(e){let t=document.querySelectorAll(e.tagName);for(let n of t)if(n instanceof HTMLElement)try{let o=oe(n);if(!o)continue;let r=await Oe(o);if(!r||r.length===0)continue;for(let i of r){if(!i.functionName||i.functionName!==e.componentName)continue;let l=qe(i.fileName);if(l&&e.filePath.endsWith(l)&&(i.lineNumber??0)===e.lineNumber)return n}}catch{}return null}async function jl(e,t){let n=oe(e);if(!n)return t;try{let r=await Oe(n);if(r&&r.length>0)for(let i of r){if(!i.functionName)continue;let a=i.functionName;if(a[0]===a[0].toUpperCase()&&(a===t.componentName||!t.componentName)){let l=qe(i.fileName);if(l){let c=e.getBoundingClientRect();return{...t,filePath:l,lineNumber:i.lineNumber??t.lineNumber,columnNumber:i.columnNumber??t.columnNumber,boundingRect:{top:c.top,left:c.left,width:c.width,height:c.height}}}}}}catch{}let o=n;for(;o;){if(ye(o)){let r=ae(o.type),i=o._debugSource||o._debugOwner?._debugSource;if(r===t.componentName&&i?.fileName){let a=e.getBoundingClientRect();return{...t,filePath:i.fileName,lineNumber:i.lineNumber??t.lineNumber,columnNumber:i.columnNumber??t.columnNumber,boundingRect:{top:a.top,left:a.left,width:a.width,height:a.height}}}}o=o.return}return t}function vu(e,t){let n=getComputedStyle(e),o=new Map;for(let r of Ve){if(t&&!t.has(r.group)){o.set(r.key,r.defaultValue);continue}let i=n.getPropertyValue(r.cssProperty).trim();o.set(r.key,i||r.defaultValue)}return o}function xu(e){if(!g.selectedElement)return;let t=getComputedStyle(g.selectedElement);for(let n of Ve){if(n.group!==e||g.activeOverrides.has(n.key))continue;let r=t.getPropertyValue(n.cssProperty).trim()||n.defaultValue;g.currentValues.set(n.key,r),g.originalValues.get(n.key)===n.defaultValue&&g.originalValues.set(n.key,r);for(let i of Lt)i.setValue(n.key,r)}}function Jt(){for(let e of Lt)e.destroy();Lt=[]}function ki(){if(!g.selectedElement||!g.componentInfo)return;Jt();let e=g.showAllGroups?null:Gl(g.selectedElement),t=e?Ve.filter(a=>e.has(a.group)):Ve,o=e!==null&&t.length<Ve.length?()=>Zl(!0):void 0,{container:r,controls:i}=ui(t,g.currentValues,Yn,Zo,o);Lt=i,$.replaceContent(r)}function Yl(){if(!g.selectedElement||!g.componentInfo||g.pendingBatch.size===0)return;let e=g.selectedElement,t=g.componentInfo,n=e.parentElement,r=(e.getAttribute("class")||"").split(/\s+/).filter(Boolean),i=[];for(let[l,c]of g.pendingBatch){let d=Xo.get(c.property),u="";if(d?.classPattern){let p=new RegExp(d.classPattern);u=r.find(h=>!h.includes(":")&&p.test(h))||""}else u=r.find(p=>Li(p,c.tailwindPrefix))||"";let m=[];for(let p of c.relatedPrefixes??[]){let h=r.find(y=>Li(y,p));h&&m.push(h)}let f=c.tailwindToken||"";i.push({cssProperty:l,tailwindPrefix:c.tailwindPrefix,tailwindToken:c.tailwindToken,value:c.value,oldClass:u,newClass:f,relatedOldClasses:m})}let a={type:"property",componentName:t.componentName,tag:t.tagName,filePath:t.filePath,textContent:(e.textContent||"").slice(0,50),className:e.className,nthOfType:qt(e),parentTag:n?.tagName.toLowerCase()||"",parentClassName:n?.className||"",lineHint:t.lineNumber,updates:i};mt(a),Ql(a,e,g.activeOverrides)}function Zo(){if(Ke()){Yl();return}Se&&clearTimeout(Se),Se=setTimeout(()=>{Se=null,Pi()},gu)}function qo(){Se&&(clearTimeout(Se),Se=null),Zt&&(Zt(),Zt=null),Le&&(clearTimeout(Le.timeoutId),Le=null),g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1,readOnly:!1}}function Kl(e){$=Al(e,()=>{Jo(),Jt(),qo()}),es((t,n,o)=>{if($&&$.hideSaving(),Le)if(clearTimeout(Le.timeoutId),t)Le=null;else{let{batch:r,previousOriginals:i}=Le;Le=null;for(let[a]of r){let l=i.get(a);l!==void 0&&g.originalValues.set(a,l)}if(g.selectedElement){for(let[a]of r){g.selectedElement.style[a]="",g.activeOverrides.delete(a);let l=g.originalValues.get(a);l!==void 0&&g.currentValues.set(a,l)}for(let a of Lt)for(let[l]of r){let c=g.originalValues.get(l);c!==void 0&&a.setValue(l,c)}}if($){let l={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";$.showWarning(l,"Dismiss",()=>$.clearWarning())}}else if(!t&&$){let i={DYNAMIC_CLASSNAME:"Cannot modify dynamic className expression",CONFLICTING_CLASS:"Conflicting conditional class detected",ELEMENT_NOT_FOUND:"Could not find element in source"}[n||""]||o||"Failed to write changes";$.showWarning(i,"Dismiss",()=>$.clearWarning())}}),Ko=pe(t=>{if(t.type==="updatePropertyComplete"&&t.success&&t.undoId&&jn){let{componentInfo:n,batch:o}=jn,r={componentName:n.componentName,filePath:n.filePath,lineNumber:n.lineNumber,columnNumber:n.columnNumber,tagName:n.tagName};for(let i of o)ue({type:"property",componentName:n.componentName,filePath:n.filePath,summary:`${i.cssProperty}: ${i.originalValue} \u2192 ${i.value}`,state:"active",propertyKey:i.cssProperty,elementIdentity:r,revertData:{type:"cliUndo",undoIds:[t.undoId]}});jn=null}})}function Qt(e,t){g.pendingBatch.size>0&&Pi(),Un(),Jt(),g.showAllGroups=!1,g.readOnly=!1,g.selectedElement=e,g.componentInfo=t,g.elementIdentity={componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,tagName:t.tagName};let n=new Set(pu);for(let u of Wl)Nl(u)||n.add(u);let o=vu(e,n);g.currentValues=o,g.originalValues=new Map(o),g.activeOverrides=new Map,g.pendingBatch=new Map,t.filePath||(g.readOnly=!0),Zt&&Zt(),Zt=Ml(u=>{Wl.has(u)&&xu(u)});let r=g.showAllGroups?null:Gl(e),i=r?Ve.filter(u=>r.has(u.group)):Ve,l=r!==null&&i.length<Ve.length?()=>Zl(!0):void 0,{container:c,controls:d}=ui(i,g.currentValues,Yn,Zo,l);Lt=d,Gn.disconnect(),Gn.observe(e.parentElement||document.body,{childList:!0,subtree:!0}),$.show(t.componentName,t.filePath,t.lineNumber,c),t.filePath?$.clearWarning():$.showWarning("Source file couldn't be resolved for this element","Dismiss",()=>$.clearWarning())}function Yn(e,t){let n=Xo.get(e);if(!n||!g.selectedElement)return;g.selectedElement.style[n.key]=t,g.activeOverrides.set(e,t),g.currentValues.set(e,t);let o=vt(),r=n.tailwindScale+"Reverse",i=o[r],a=i?Eo(t,i):null;if(!a&&n.enumValues){let l=n.enumValues.find(c=>c.value===t);l&&(a=l.tailwindValue)}if(g.pendingBatch.set(e,{property:e,cssProperty:n.cssProperty,value:t,tailwindPrefix:n.tailwindPrefix,tailwindToken:a,relatedPrefixes:n.relatedPrefixes,originalValue:g.originalValues.get(e)||n.defaultValue}),e==="display")if(ki(),t==="none"){let l=g.originalValues.get("display")||"block";$.showWarning("Element hidden","Restore",()=>{g.selectedElement&&(g.selectedElement.style.display=l),g.activeOverrides.delete("display"),g.currentValues.set("display",l),g.pendingBatch.delete("display"),ki(),$.clearWarning()})}else $.clearWarning()}function Pi(){if(g.pendingBatch.size===0||!g.componentInfo)return;let e=g.componentInfo.filePath;if(!e){g.pendingBatch.clear(),$&&($.hideSaving(),$.showWarning("This element can be inspected, but its source file couldn't be resolved","Dismiss",()=>$.clearWarning())),M("Can't save changes for this element");return}let t=g.componentInfo.lineNumber,n=g.componentInfo.columnNumber-1;if(jn={componentInfo:{...g.componentInfo},batch:[...g.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,originalValue:a.originalValue,value:a.value}))},g.pendingBatch.size===1){let a=[...g.pendingBatch.values()][0],l=Xo.get(a.property);Z({type:"updateProperty",filePath:e,lineNumber:t,columnNumber:n,...a,framework:"tailwind",classPattern:l?.classPattern,standalone:l?.standalone})}else Z({type:"updateProperties",filePath:e,lineNumber:t,columnNumber:n,updates:[...g.pendingBatch.values()].map(a=>{let l=Xo.get(a.property);return{...a,classPattern:l?.classPattern,standalone:l?.standalone}}),framework:"tailwind"});g.selectedElement&&g.elementIdentity&&Vn({type:"propertyChange",elementIdentity:g.elementIdentity,element:g.selectedElement,overrides:[...g.pendingBatch.values()].map(a=>({cssProperty:a.cssProperty,previousValue:a.originalValue,newValue:a.value}))}),$&&$.showSaving();let o=new Map;for(let[a]of g.pendingBatch)o.set(a,g.originalValues.get(a)||"");for(let[a,l]of g.pendingBatch)g.originalValues.set(a,l.value);let r=new Map(g.pendingBatch),i=setTimeout(()=>{Le&&Le.batch===r&&(Le=null,$&&$.hideSaving())},fu);Le={batch:r,previousOriginals:o,timeoutId:i},g.pendingBatch.clear()}function Jo(){if(g.selectedElement){for(let[e]of g.activeOverrides)g.selectedElement.style[e]="";for(let[e,t]of g.originalValues)g.currentValues.set(e,t);for(let e of Lt)for(let[t,n]of g.originalValues)e.setValue(t,n);g.activeOverrides.clear(),g.pendingBatch.clear()}}function kt(){Se&&(clearTimeout(Se),Se=null),Gn.disconnect(),Jo(),Jt(),$&&$.hide(),qo()}function Xl(){if(Ke()){Yl(),Gn.disconnect(),Jt(),$&&$.hide(),qo();return}Se&&(clearTimeout(Se),Se=null),Gn.disconnect(),Pi(),Jt(),$&&$.hide(),qo()}function ql(){return g.activeOverrides.size>0}function Zl(e){g.showAllGroups=e,ki()}function Jl(){Ko&&(Ko(),Ko=null),jn=null,kt()}var Xo,pu,Wl,mu,fu,g,Lt,$,Ul,Se,gu,Le,jn,Zt,Ko,Gn,Ri=S(()=>{"use strict";gl();Ll();$l();Ft();Be();Pt();we();de();Mi();xt();Ct();kn();en();Yo();Vt();Bl();Xo=new Map(Ve.map(e=>[e.key,e])),pu=new Set(["layout","spacing","size"]),Wl=new Set(["typography","background"]),mu=new Set(["h1","h2","h3","h4","h5","h6","p","span","a","button","label","li","td","th","blockquote","figcaption"]);fu=5e3,g={selectedElement:null,componentInfo:null,elementIdentity:null,currentValues:new Map,originalValues:new Map,activeOverrides:new Map,pendingBatch:new Map,showAllGroups:!1,readOnly:!1},Lt=[],Se=null,gu=300,Le=null,jn=null,Zt=null,Ko=null,Gn=new MutationObserver(()=>{g.selectedElement&&!document.contains(g.selectedElement)&&(clearTimeout(Ul),Ul=setTimeout(()=>{hu()},80))})});function ts(e,t){if(!Rt)return;let n=performance.now(),o=Math.abs(e-Rt.clientX),r=Math.abs(t-Rt.clientY),i=o<=2&&r<=2,a=n-Rt.timestamp<16;if(i||a)return Rt.element}function ns(e,t,n){Rt={clientX:e,clientY:t,element:n,timestamp:performance.now()}}function tn(){Rt=null}var Rt,Ai=S(()=>{"use strict";Rt=null});function Nu(){Oi=document.body.style.background||document.body.style.backgroundColor||"",Hi=document.documentElement.style.background||document.documentElement.style.backgroundColor||"";let e=getComputedStyle(document.body).backgroundColor,t=getComputedStyle(document.documentElement).backgroundColor,n=e&&e!=="rgba(0, 0, 0, 0)"?e:t&&t!=="rgba(0, 0, 0, 0)"?t:"#ffffff";document.body.style.background="transparent",document.documentElement.style.background="transparent",J=document.createElement("div"),J.setAttribute("data-frameup-canvas-wrapper","true"),J.style.cssText=`
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${n};
  `.trim().replace(/\n\s*/g," "),De=document.createElement("div"),De.setAttribute("data-frameup-dot-bg","true"),De.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${s.bgSecondary};
  `.trim().replace(/\n\s*/g," ");let o=Array.from(document.body.childNodes);for(let r of o)r instanceof HTMLElement&&(r.id==="frameup-root"||r.hasAttribute("data-frameup-interaction")||r.hasAttribute("data-frameup-placeholder")||r.hasAttribute("data-frameup-annotation")||r.hasAttribute("data-frameup-dot-bg")||r.hasAttribute("data-frameup-canvas-wrapper"))||(is.push(r),J.appendChild(r));J.style.position="relative",J.style.zIndex="1",document.body.insertBefore(De,document.body.firstChild),document.body.insertBefore(J,De.nextSibling),$i=Bn(rs),rs(),as.forEach(r=>r(J))}function rs(){if(!J||!De)return;let{scale:e,offsetX:t,offsetY:n}=ze();J.style.transform=`translate(${t}px, ${n}px) scale(${e})`;let o=wu*e,r=t%o,i=n%o;De.style.backgroundImage=`radial-gradient(circle, ${Su} ${os}px, transparent ${os}px)`,De.style.backgroundSize=`${o}px ${o}px`,De.style.backgroundPosition=`${r}px ${i}px`}function Mu(e,t,n){let{scale:o,offsetX:r,offsetY:i}=ze(),a=Math.min(Eu,Math.max(Cu,o+n));if(a===o)return;let l=(e-r)/o,c=(t-i)/o,d=e-l*a,u=t-c*a;zn(a,d,u)}function ls(e){e.preventDefault();let t=-e.deltaY*Tu,{scale:n}=ze(),o=t*n;Mu(e.clientX,e.clientY,o)}function ss(e,t){let{scale:n,offsetX:o,offsetY:r}=ze();zn(n,o+e,r+t)}function cs(){zn(1,0,0)}function ds(){return J!==null}function us(){J?Ii():Nu()}function Ii(){if(as.forEach(e=>e(null)),$i?.(),$i=null,J){for(;J.firstChild;)document.body.insertBefore(J.firstChild,J);J.remove(),J=null}De?.remove(),De=null,is=[],document.body.style.background=Oi,document.documentElement.style.background=Hi,Oi="",Hi=""}var Cu,Eu,Tu,wu,os,Su,J,De,$i,is,as,Oi,Hi,Qo=S(()=>{"use strict";de();K();Cu=.1,Eu=5,Tu=.002,wu=24,os=1,Su="rgba(0,0,0,0.15)",J=null,De=null,$i=null,is=[],as=[],Oi="",Hi=""});function on(e,t){return e.length>t?e.slice(0,t)+"\u2026":e}function et(){return z!==null}function ps(){document.addEventListener("dblclick",fs,!0),document.addEventListener("mousedown",ys,!0),_i=pe(e=>{e.type==="updateTextComplete"&&ku(e)})}function ms(){z&&Fi(),document.removeEventListener("dblclick",fs,!0),document.removeEventListener("mousedown",ys,!0),_i?.(),_i=null}function ku(e){if(e.success&&e.undoId&&nn){let t=nn,n={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};ue({type:"textEdit",componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,summary:`"${on(t.originalText,20)}" \u2192 "${on(t.newText,20)}"`,state:"active",elementIdentity:n,revertData:{type:"cliUndo",undoIds:[e.undoId]}})}else if(!e.success&&e.reason==="no-match"&&nn){let t=nn,n={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,originalText:t.originalText,newText:t.newText},o={componentName:t.componentInfo.componentName,filePath:t.componentInfo.filePath,lineNumber:t.componentInfo.lineNumber,columnNumber:t.componentInfo.columnNumber,tagName:t.tagName};Uo(n,o,t.originalInnerHTML),ue({type:"textAnnotation",componentName:n.componentName,filePath:n.filePath||"",summary:`"${on(n.originalText,20)}" \u2192 "${on(n.newText,20)}"`,state:"pending",elementIdentity:o,revertData:{type:"annotationRemove",annotationId:n.id,originalInnerHTML:t.originalInnerHTML,elementIdentity:o}})}nn=null}function Pu(e){return!!(e.scrollHeight>e.clientHeight+4||e.querySelector("br")||getComputedStyle(e).whiteSpace!=="nowrap"&&e.getClientRects().length>1)}async function Ru(e){let t=oe(e);if(!t)return null;try{let n=await Oe(t);if(n&&n.length>0)for(let o of n){if(!o.functionName)continue;let r=o.functionName;if(r[0]!==r[0].toUpperCase()||Ze(r))continue;let i=qe(o.fileName);return{tagName:e.tagName.toLowerCase(),componentName:r,filePath:i,lineNumber:o.lineNumber??0,columnNumber:o.columnNumber??0,stack:[],boundingRect:e.getBoundingClientRect()}}}catch{}try{let n=t;for(;n;){if(ye(n)){let o=ae(n.type),r=n._debugSource||n._debugOwner?._debugSource;if(o&&o[0]===o[0].toUpperCase()&&!Ze(o)&&r)return{tagName:e.tagName.toLowerCase(),componentName:o,filePath:r.fileName||"",lineNumber:r.lineNumber||0,columnNumber:r.columnNumber||0,stack:[],boundingRect:e.getBoundingClientRect()}}if(!n.return)break;n=n.return}}catch{}return null}function fs(e){z&&At();let t=null,n=e.target;n instanceof HTMLElement&&n!==document.documentElement&&n!==document.body&&!n.hasAttribute("data-frameup-interaction")&&!n.closest("#frameup-root")?t=n:t=$t(e.clientX,e.clientY),t&&(Lu.has(t.tagName)||t.textContent?.trim()&&(e.preventDefault(),Au(t)))}function Au(e){z=e,ft=e.textContent||"",Kn=e.innerHTML,er=ft,Q=null,Ru(e).then(n=>{z===e&&(Q=n)}),Di=e.style.outline,e.style.outline=`2px solid ${s.accent}`,e.contentEditable="true",vs(!1),e.focus();let t=window.getSelection();if(t){t.removeAllRanges();let n=document.createRange();n.selectNodeContents(e),n.collapse(!1),t.addRange(n)}e.addEventListener("blur",hs),e.addEventListener("keydown",bs),e.addEventListener("input",gs)}function gs(){z&&(er=z.textContent||"")}function hs(){At()}function ys(e){if(!z)return;let t=e.target;if(t instanceof Node&&(t===z||z.contains(t)))return;if((t instanceof HTMLElement?t:null)?.closest("#frameup-root")){At();return}let o=$u(e);if(o&&Et(o)){e.preventDefault(),e.stopPropagation(),At({nextSelection:o,reselectEditedElement:!1});return}e.preventDefault(),e.stopPropagation(),At({clearSelection:!0,reselectEditedElement:!1})}function bs(e){if(e.key==="Escape"){e.preventDefault(),At();return}if(e.key==="Enter"&&z&&!Pu(z)){e.preventDefault(),At();return}e.stopPropagation()}function $u(e){let t=e.target;return t instanceof HTMLElement&&t!==document.documentElement&&t!==document.body&&!t.hasAttribute("data-frameup-interaction")&&!t.closest("#frameup-root")?t:$t(e.clientX,e.clientY)}function At(e){if(!z)return;let t=er;if(t!==ft&&Q){if(Ke()&&Q.filePath){let r=z,i=r?.parentElement;mt({type:"text",componentName:Q.componentName,tag:Q.tagName,filePath:Q.filePath,className:r?.className||"",nthOfType:r?qt(r):1,parentTag:i?.tagName.toLowerCase()||"",parentClassName:i?.className||"",lineHint:Q.lineNumber,originalText:ft,newText:t});let a=z;if(Fi(),e?.nextSelection&&document.contains(e.nextSelection)){Qe(e.nextSelection,{skipSidebar:!1});return}if(e?.clearSelection){ke();return}if(e?.reselectEditedElement===!1)return;a&&document.contains(a)&&Qe(a,{skipSidebar:!1});return}if(Q.filePath)nn={componentInfo:Q,originalText:ft,newText:t,originalInnerHTML:Kn,tagName:Q.tagName},Z({type:"updateText",filePath:Q.filePath,lineNumber:Q.lineNumber,columnNumber:Q.columnNumber,originalText:ft,newText:t});else{let r={type:"textEdit",id:`text-edit-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,componentName:Q.componentName,filePath:"",lineNumber:0,columnNumber:0,originalText:ft,newText:t},i={componentName:Q.componentName,filePath:"",lineNumber:0,columnNumber:0,tagName:Q.tagName};Uo(r,i,Kn),ue({type:"textAnnotation",componentName:r.componentName,filePath:r.filePath||"",summary:`"${on(r.originalText,20)}" \u2192 "${on(r.newText,20)}"`,state:"pending",elementIdentity:i,revertData:{type:"annotationRemove",annotationId:r.id,originalInnerHTML:Kn,elementIdentity:i}})}}let o=z;if(Fi(),e?.nextSelection&&document.contains(e.nextSelection)){Qe(e.nextSelection,{skipSidebar:!1});return}if(e?.clearSelection){ke();return}e?.reselectEditedElement!==!1&&o&&document.contains(o)&&Qe(o,{skipSidebar:!1})}function Fi(){z&&(z.removeEventListener("blur",hs),z.removeEventListener("keydown",bs),z.removeEventListener("input",gs),z.removeAttribute("contenteditable"),z.style.outline=Di,tr(Fn()),z=null,ft="",Kn="",er="",Q=null,Di="")}var Lu,z,ft,Kn,er,Q,Di,_i,nn,Xn=S(()=>{"use strict";xt();Ct();kn();Be();K();qn();de();de();Tt();rn();Pt();en();Yo();Vt();Lu=new Set(["IMG","INPUT","VIDEO","IFRAME","CANVAS","SELECT","TEXTAREA","HR","BR","EMBED","OBJECT","PROGRESS"]),z=null,ft="",Kn="",er="",Q=null,Di="",_i=null,nn=null});function Cs(e,t){Vi.set(e,t)}function Es(){I=document.createElement("div"),I.setAttribute("data-frameup-interaction","true"),I.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `,document.body.appendChild(I),document.addEventListener("scroll",tn,!0),I.addEventListener("mousedown",e=>{if(tt){an=e.clientX,Zn=e.clientY,I&&(I.style.cursor="grabbing"),e.preventDefault();return}Jn?.onMouseDown?.(e)}),I.addEventListener("mousemove",e=>{if(tt&&an!==0){ss(e.clientX-an,e.clientY-Zn),an=e.clientX,Zn=e.clientY;return}Jn?.onMouseMove?.(e)}),I.addEventListener("mouseup",e=>{if(tt){I&&(I.style.cursor="grab"),an=0,Zn=0;return}Jn?.onMouseUp?.(e)}),document.addEventListener("wheel",Ts,{passive:!1}),document.addEventListener("keydown",ws),document.addEventListener("keyup",Ss)}function Ts(e){!I||!e.ctrlKey&&!e.metaKey||e.target?.closest?.("#frameup-root")||ls(e)}function ws(e){if(e.key!==" "||et())return;let t=document.activeElement;t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t?.isContentEditable||(e.preventDefault(),!tt&&I&&(xs=I.style.cursor,I.style.cursor="grab",I.style.pointerEvents="auto",tt=!0))}function Ss(e){if(e.key===" "&&tt&&(e.preventDefault(),tt=!1,an=0,Zn=0,I)){I.style.cursor=xs;let t=Fn();I.style.pointerEvents=t==="select"?"none":"auto"}}function nr(){return tt}function tr(e){Jn=Vi.get(e)||null,I&&(I.style.pointerEvents=e==="select"?"none":"auto"),Ou(e)}function Ou(e){if(I)switch(e){case"select":I.style.cursor="default";break;case"text":I.style.cursor="text";break;default:I.style.cursor="default"}}function vs(e){I&&(I.style.pointerEvents=e?"auto":"none")}function $t(e,t){let n=ts(e,t);if(n!==void 0)return n;let o=document.elementsFromPoint(e,t),r=null;for(let i of o)if(i instanceof HTMLElement&&!i.closest("#frameup-root")&&!i.hasAttribute("data-frameup-interaction")&&!i.hasAttribute("data-frameup-placeholder")&&!(i===document.body||i===document.documentElement)&&!Jr(i)){r=i;break}return ns(e,t,r),r}function Ns(){document.removeEventListener("scroll",tn,!0),document.removeEventListener("wheel",Ts),document.removeEventListener("keydown",ws),document.removeEventListener("keyup",Ss),tt=!1,I?.remove(),I=null,Jn=null,Vi.clear()}var I,Jn,Vi,tt,an,Zn,xs,qn=S(()=>{"use strict";Ai();Tt();Qo();Xn();de();I=null,Jn=null,Vi=new Map,tt=!1,an=0,Zn=0,xs=""});function Ms(e,t,n,o,r,i){let a=e.left+e.width/2,l=e.top+e.height/2,c=t.left+t.width/2,d=t.top+t.height/2,u=c-a,m=d-l,f=Math.abs(u)<=r,p=Math.abs(m)<=r;return{dx:f?n+u/i:n,dy:p?o+m/i:o,snappedX:f,snappedY:p,guides:{verticalLine:f?{x:c,top:t.top,bottom:t.bottom}:null,horizontalLine:p?{y:d,left:t.left,right:t.right}:null}}}var Ls=S(()=>{"use strict"});function zi(e,t,n){let o=Xt(e,t),r=Ei(n);if(r)return be=r,or={x:o.x,y:o.y},eo={...r.delta},Qn=!1,On(r.element,r.delta.dx,r.delta.dy,r.existingTransform),!0;let i=Rs(),a=As();if(!i||!a||n!==a)return!1;let l=a.getBoundingClientRect(),c=a.style.cssText,d=getComputedStyle(a).transform,u={id:crypto.randomUUID(),componentRef:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber,columnNumber:i.columnNumber},element:a,placeholder:null,originalRect:l,delta:{dx:0,dy:0},originalCssText:c,existingTransform:d==="none"?"":d,identity:{componentName:i.componentName,filePath:i.filePath,lineNumber:i.lineNumber,columnNumber:i.columnNumber,tagName:a.tagName.toLowerCase()},parentLayout:Ol(a)};return yi(u),be=u,or={x:o.x,y:o.y},eo={dx:0,dy:0},Qn=!0,On(a,0,0,u.existingTransform),!0}function Bi(e,t){if(!be)return;let n=Xt(e,t),o=eo.dx+(n.x-or.x),r=eo.dy+(n.y-or.y);On(be.element,o,r,be.existingTransform);let i=be.element.parentElement;if(!i||i===document.body||i===document.documentElement){be.delta={dx:o,dy:r},ai();return}let a=be.element.getBoundingClientRect(),l=i.getBoundingClientRect(),{scale:c}=ze(),d=Ms(a,l,o,r,5,c);(d.snappedX||d.snappedY)&&On(be.element,d.dx,d.dy,be.existingTransform),be.delta={dx:d.dx,dy:d.dy},ll(d.guides)}function ks(){if(!be)return null;let e=be,t={...eo},n={...e.delta};if(Qn||bi(e.id,n,t),Il(e),ai(),ue({type:"move",componentName:e.componentRef.componentName,filePath:e.componentRef.filePath,summary:`moved (${Math.round(n.dx)}px, ${Math.round(n.dy)}px)`,state:"pending",elementIdentity:e.identity,revertData:Qn?{type:"moveRemove",moveId:e.id}:{type:"moveRestore",moveId:e.id,previousDelta:t}}),Ke()&&e.componentRef.filePath){let r=e.element,i=r?.parentElement;mt({type:"move",componentName:e.componentRef.componentName,tag:r?.tagName.toLowerCase()||"div",filePath:e.componentRef.filePath,className:r?.className||"",nthOfType:r?qt(r):1,parentTag:i?.tagName.toLowerCase()||"",parentClassName:i?.className||"",lineHint:e.componentRef.lineNumber,delta:{dx:n.dx,dy:n.dy},resolvedDx:null,resolvedDy:null})}let o=e.element;return be=null,Qn=!1,o}var be,or,eo,Qn,Ps=S(()=>{"use strict";Hn();Pt();de();rn();Ls();Ao();en();Yo();Vt();be=null,or={x:0,y:0},eo={dx:0,dy:0},Qn=!1});function rr(e){let t=Wi.get(e);if(t){if(Date.now()-t.timestamp>3e4){Wi.delete(e);return}return t.filePath}}function ir(e,t){Wi.set(e,{filePath:t,timestamp:Date.now()})}var Wi,Ui=S(()=>{"use strict";Wi=new Map});async function Hu(e){let t=oe(e);if(!t)return null;try{let n=await Oe(t);if(n&&n.length>0){let o=[];for(let r of n){if(!r.functionName)continue;let i=r.functionName;if(i[0]!==i[0].toUpperCase()||Ze(i))continue;let a=qe(r.fileName);o.push({componentName:i,filePath:a,lineNumber:r.lineNumber??0,columnNumber:r.columnNumber??0})}if(o.length>0){let r=o.find(i=>i.filePath)||o[0];return{tagName:e.tagName.toLowerCase(),componentName:r.componentName,filePath:r.filePath,lineNumber:r.lineNumber,columnNumber:r.columnNumber,stack:o}}}}catch(n){console.warn("[FrameUp] getOwnerStack failed, falling back to fiber walk:",n)}return $s(e,t)}function $s(e,t){let n=[],o=t;for(;o;){if(ye(o)){let r=ae(o.type),i=o._debugSource||o._debugOwner?._debugSource,a="",l=0,c=0;i&&(a=i.fileName||"",l=i.lineNumber||0,c=i.columnNumber||0),r&&r[0]===r[0].toUpperCase()&&!Ze(r)&&n.push({componentName:r,filePath:a,lineNumber:l,columnNumber:c})}o=o.return}return n.length===0?null:{tagName:e.tagName.toLowerCase(),componentName:n[0].componentName,filePath:n[0].filePath,lineNumber:n[0].lineNumber,columnNumber:n[0].columnNumber,stack:n}}function Os(e){let t=oe(e);return t?$s(e,t):null}function Iu(e){let t=e.tagName.toLowerCase(),n=e.getAttribute("data-component-name")?.trim(),o=e.getAttribute("aria-label")?.trim(),r=e.textContent?.trim(),i=n||o||(r?r.slice(0,24):"")||`<${t}>`;return{tagName:t,componentName:i,filePath:"",lineNumber:0,columnNumber:0,stack:[]}}function Hs(e,t){let n=$t(e,t);return n?Ti(n)?.element??n:null}function Is(e){Du=e.onStart,_u=e.onMove,Fu=e.onEnd}function Ds(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=Vu,e.appendChild(t),v=document.createElement("div"),v.className="selection-label",e.appendChild(v),_e=document.createElement("div"),_e.className="marquee-box",e.appendChild(_e),ot=!0,document.addEventListener("mousedown",ar,!0),document.addEventListener("mousemove",lr,!0),document.addEventListener("mouseup",sr,!0),document.addEventListener("keydown",dr,!0),document.addEventListener("click",cr,!0),document.addEventListener("scroll",nt,!0),window.addEventListener("resize",nt),ln=!0}function ar(e){if(!ot||et()||nr()||e.metaKey||e.ctrlKey)return;let t=Hs(e.clientX,e.clientY);if(q||_.size>0){let o=li(e.clientX,e.clientY);if(o){e.preventDefault(),e.stopPropagation();let r=cl();if(Pe=o,ur=r?{...r}:null,_.size>0){gt=[];for(let[i]of _){let a=getComputedStyle(i);gt.push({element:i,width:parseFloat(a.width)||i.offsetWidth,height:parseFloat(a.height)||i.offsetHeight})}to=0,no=0}else if(B){let i=getComputedStyle(B);to=parseFloat(i.width)||B.offsetWidth,no=parseFloat(i.height)||B.offsetHeight,gt=[]}D={x:e.clientX,y:e.clientY},me="resize-drag";return}}if(e.preventDefault(),e.stopPropagation(),!t||!Et(t)){(q||_.size>0)&&(Xl(),q=null,B=null,pr(),wt(null),v&&(v.classList.remove("visible"),v.style.display="none"),Ue(null));return}if(D={x:e.clientX,y:e.clientY},We=t,oo=e.shiftKey,Ci(t)&&zi(e.clientX,e.clientY,t)){me="move-drag";return}if(!oo&&B&&t===B){me="pending-move";return}me="pending"}function lr(e){if(ot&&!et()&&!nr()){if(me==="resize-drag"&&Pe&&D&&ur){e.preventDefault(),e.stopPropagation();let t=e.clientX-D.x,n=e.clientY-D.y;if(gt.length>0){for(let o of gt){let r=o.width,i=o.height;Pe==="tr"||Pe==="br"?r=Math.max(10,o.width+t):r=Math.max(10,o.width-t),Pe==="bl"||Pe==="br"?i=Math.max(10,o.height+n):i=Math.max(10,o.height-n),o.element.style.width=`${Math.round(r)}px`,o.element.style.height=`${Math.round(i)}px`}ro()}else{let o=to,r=no;Pe==="tr"||Pe==="br"?o=Math.max(10,to+t):o=Math.max(10,to-t),Pe==="bl"||Pe==="br"?r=Math.max(10,no+n):r=Math.max(10,no-n),o=Math.round(o),r=Math.round(r),Yn("width",`${o}px`),Yn("height",`${r}px`),nt()}return}if(me==="pending-move"&&D){let t=Math.abs(e.clientX-D.x),n=Math.abs(e.clientY-D.y);(t>4||n>4)&&(We&&zi(D.x,D.y,We)?(me="move-drag",Bi(e.clientX,e.clientY)):me="marquee");return}if(me==="move-drag"){Bi(e.clientX,e.clientY);return}if(me==="pending"&&D){let t=Math.abs(e.clientX-D.x),n=Math.abs(e.clientY-D.y);(t>10||n>10)&&(me="marquee")}if(me==="marquee"&&D&&_e){let t=Math.min(e.clientX,D.x),n=Math.min(e.clientY,D.y),o=Math.abs(e.clientX-D.x),r=Math.abs(e.clientY-D.y);_e.style.display="block",_e.style.left=`${t}px`,_e.style.top=`${n}px`,_e.style.width=`${o}px`,_e.style.height=`${r}px`;return}if(me==="idle"){if(q&&B||_.size>0){let i=li(e.clientX,e.clientY);if(i){document.body.style.cursor=i==="tl"||i==="br"?"nwse-resize":"nesw-resize";return}else document.body.style.cursor=""}let n=Hs(e.clientX,e.clientY);if(!n||!Et(n)){Ro(null);return}let o=n.getBoundingClientRect(),r=parseFloat(getComputedStyle(n).borderRadius)||4;Ro(o,r+2)}}}function sr(e){if(!ot||et()||nr())return;let t=me;if(me="idle",t==="resize-drag"){document.body.style.cursor="",Pe=null,ur=null,D=null,gt.length>0?gt=[]:Zo();return}if(t==="move-drag"){let n=ks();n&&Uu(n),D=null,We=null;return}if(t==="pending-move"){D=null,We=null;return}if(t==="marquee"&&D){_e&&(_e.style.display="none"),zu(Math.min(e.clientX,D.x),Math.min(e.clientY,D.y),Math.max(e.clientX,D.x),Math.max(e.clientY,D.y)),D=null,We=null,oo=!1;return}We&&(oo?Bu(We):(pr(),Qe(We))),D=null,We=null,oo=!1}async function Qe(e,t){try{let n=e.getBoundingClientRect();B=e,ji(n,{}),Wu();let o=await Hu(e)??Iu(e);if(!o.filePath&&o.componentName){let r=rr(o.componentName);if(r===void 0){let i=await mr(o.componentName);if(ir(o.componentName,i),i&&(o.filePath=i,o.stack))for(let a of o.stack)a.componentName===o.componentName&&!a.filePath&&(a.filePath=i)}else if(r&&(o.filePath=r,o.stack))for(let i of o.stack)i.componentName===o.componentName&&!i.filePath&&(i.filePath=r)}if(console.log("[FrameUp] selectElement:",e.tagName,"\u2192",o.componentName,o.filePath,"stack:",o.stack?.map(r=>r.componentName)),q={tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber,columnNumber:o.columnNumber,stack:o.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}},v){let r=o.filePath?`${o.filePath}:${o.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${o.componentName}</span>${r?`<span class="comp-path">${r}</span>`:""}`}t?.skipSidebar||Qt(e,q),Ue({tagName:o.tagName,componentName:o.componentName,filePath:o.filePath,lineNumber:o.lineNumber})}catch(n){console.error("[FrameUp] selectElement error:",n)}}function zu(e,t,n,o){let r=Qa({x:e,y:t,width:n-e,height:o-t});if(r.length!==0){kt(),q=null,B=null,wt(null),v&&(v.classList.remove("visible"),v.style.display="none"),_.clear();for(let i of r.slice(0,50)){let a=Os(i);if(!a)continue;let l=i.getBoundingClientRect(),c={tagName:a.tagName,componentName:a.componentName,filePath:a.filePath,lineNumber:a.lineNumber,columnNumber:a.columnNumber,stack:a.stack,boundingRect:{top:l.top,left:l.left,width:l.width,height:l.height}};_.set(i,{element:i,info:c})}if(_.size!==0){if(_.size===1){let[i,a]=[..._.entries()][0];_.clear(),B=i,q=a.info;let l=i.getBoundingClientRect();if(ji(l,q),v){let c=a.info.filePath?`${a.info.filePath}:${a.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${a.info.componentName}</span>${c?`<span class="comp-path">${c}</span>`:""}`}Qt(i,q),Ue({tagName:a.info.tagName,componentName:a.info.componentName,filePath:a.info.filePath,lineNumber:a.info.lineNumber});return}ro(),Ue(null),v&&(v.innerHTML=`<span class="comp-name">${_.size} elements selected</span>`,v.style.display="block",v.style.left=`${e}px`,v.style.top=`${Math.max(0,t-36)}px`,v.style.right="auto",requestAnimationFrame(()=>v?.classList.add("visible")))}}}function Bu(e){if(_.has(e)){if(_.delete(e),_.size===1){let[r,i]=[..._.entries()][0];_.clear(),An(),B=r,q=i.info;let a=r.getBoundingClientRect();if(ji(a,q),Qt(r,q),v){let l=i.info.filePath?`${i.info.filePath}:${i.info.lineNumber}`:"";v.innerHTML=`<span class="comp-name">${i.info.componentName}</span>${l?`<span class="comp-path">${l}</span>`:""}`}Ue({tagName:i.info.tagName,componentName:i.info.componentName,filePath:i.info.filePath,lineNumber:i.info.lineNumber})}else _.size===0?(An(),ke()):(ro(),v&&(v.innerHTML=`<span class="comp-name">${_.size} elements selected</span>`));return}let t=Os(e);if(!t)return;q&&B&&_.size===0&&(_.set(B,{element:B,info:q}),kt(),q=null,B=null,wt(null));let n=e.getBoundingClientRect(),o={tagName:t.tagName,componentName:t.componentName,filePath:t.filePath,lineNumber:t.lineNumber,columnNumber:t.columnNumber,stack:t.stack,boundingRect:{top:n.top,left:n.left,width:n.width,height:n.height}};_.set(e,{element:e,info:o}),ro(),Ue(null),v&&(v.innerHTML=`<span class="comp-name">${_.size} elements selected</span>`,v.style.display="block",requestAnimationFrame(()=>v?.classList.add("visible")))}function pr(){_.clear(),An()}function ro(){if(_.size===0){An();return}let e=[];for(let[t]of _){let n=t.getBoundingClientRect(),o=parseFloat(getComputedStyle(t).borderRadius)||4;e.push({rect:n,borderRadius:o+2})}sl(e)}function cr(e){ot&&(et()||e.metaKey||e.ctrlKey||e.preventDefault())}function dr(e){if(ot&&e.key==="Escape"){if(_.size>0){pr(),v&&(v.classList.remove("visible"),v.style.display="none"),Ue(null),e.preventDefault();return}if(q){if(ql()){Jo(),e.preventDefault();return}ke(),e.preventDefault()}}}function ji(e,t){if(B){let n=parseFloat(getComputedStyle(B).borderRadius)||4;wt(e,n+2)}if(v){let r=e.top-28-8,i=e.left;r<0&&(r=e.bottom+8),v.style.left=`${i}px`,v.style.top=`${r}px`,v.style.display="block",v.style.right="auto",v.innerHTML='<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>',requestAnimationFrame(()=>v?.classList.add("visible")),requestAnimationFrame(()=>{if(!v)return;v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")})}}function nt(){if(_.size>0){ro();return}if(!B||!q)return;let e=B.getBoundingClientRect(),t=parseFloat(getComputedStyle(B).borderRadius)||4;if(wt(e,t+2),v&&v.style.display!=="none"){let r=e.top-28-8;r<0&&(r=e.bottom+8),v.style.left=`${e.left}px`,v.style.top=`${r}px`,v.style.right="auto",v.getBoundingClientRect().right>window.innerWidth-8&&(v.style.left="auto",v.style.right="8px")}}function Wu(){Ro(null)}function ke(){kt(),q=null,B=null,Pe=null,ur=null,gt=[],pr(),document.body.style.cursor="",wt(null),v&&(v.classList.remove("visible"),v.style.display="none"),Ue(null)}function Rs(){return q}function _s(){ot=!1,document.removeEventListener("mousedown",ar,!0),document.removeEventListener("mousemove",lr,!0),document.removeEventListener("mouseup",sr,!0),document.removeEventListener("keydown",dr,!0),document.removeEventListener("click",cr,!0),document.removeEventListener("scroll",nt,!0),window.removeEventListener("resize",nt),ln=!1,v?.remove(),v=null}function Fs(e){e&&!ln?(document.addEventListener("mousedown",ar,!0),document.addEventListener("mousemove",lr,!0),document.addEventListener("mouseup",sr,!0),document.addEventListener("keydown",dr,!0),document.addEventListener("click",cr,!0),document.addEventListener("scroll",nt,!0),window.addEventListener("resize",nt),ln=!0,ot=!0):!e&&ln&&(document.removeEventListener("mousedown",ar,!0),document.removeEventListener("mousemove",lr,!0),document.removeEventListener("mouseup",sr,!0),document.removeEventListener("keydown",dr,!0),document.removeEventListener("click",cr,!0),document.removeEventListener("scroll",nt,!0),window.removeEventListener("resize",nt),ln=!1,ot=!1)}function As(){return B??null}async function Uu(e){await Qe(e,{skipSidebar:!0})}var q,B,ot,ln,_,v,_e,me,D,We,Pe,ur,to,no,gt,oo,Du,_u,Fu,Vu,rn=S(()=>{"use strict";xt();Ct();kn();we();Tt();el();K();Ao();Ri();qn();Ps();de();Ui();Be();Xn();Gr()||Yr({onCommitFiberRoot(){}});q=null,B=null,ot=!1,ln=!1,_=new Map,v=null,_e=null,me="idle",D=null,We=null,Pe=null,ur=null,to=0,no=0,gt=[],oo=!1,Du=null,_u=null,Fu=null,Vu=`
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
`});function Gi(e){return io.push(e),()=>{io=io.filter(t=>t!==e)}}function Ht(){io.forEach(e=>e())}function ue(e){let t=crypto.randomUUID(),n={...e,id:t,timestamp:Date.now()};return Fe.set(t,n),Ht(),t}function ju(e){let t=Fe.get(e);if(!(!t||t.state==="reverted")){switch(t.revertData.type){case"noop":return;case"cliUndo":case"generateUndo":hr.add(e),Z({type:"revertChanges",undoIds:t.revertData.undoIds});break;case"moveRemove":{let{moveId:n}=t.revertData;Promise.resolve().then(()=>(de(),Go)).then(({removeMove:o})=>{o(n)}),gr(t);break}case"moveRestore":{let{moveId:n,previousDelta:o}=t.revertData;Promise.resolve().then(()=>(de(),Go)).then(({restoreMoveDelta:r})=>{r(n,o)}),gr(t);break}case"annotationRemove":{let{annotationId:n,originalInnerHTML:o}=t.revertData;Promise.resolve().then(()=>(de(),Go)).then(({removeAnnotation:r})=>{r(n)}),gr(t);break}}t.state="reverted",Ht()}}function Yi(){let e=0;for(let t of Fe.values())t.state!=="reverted"&&e++;return e}function so(){return sn}function co(e){sn=e,Ht()}function Gu(){Fe.clear(),Ht()}function zs(){let e=!1;for(let t of Fe.values())t.state==="pending"&&(t.state="active",e=!0);e&&Ht()}function Bs(){let e=!1;for(let[t,n]of Fe)n.state==="pending"&&(Fe.delete(t),e=!0);e&&Ht()}function Ku(e){let t=Math.floor((Date.now()-e)/1e3);if(t<10)return"just now";let n=Math.floor(t/60),o=t%60;return`${n}:${String(o).padStart(2,"0")} ago`}function Xu(e){return e.split("/").pop()??e}function lo(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Vs(e){return!!e.elementIdentity}function qu(e){return e.state!=="reverted"&&e.revertData.type!=="noop"}function Zu(e){let t=lo(e.summary).replaceAll(" \u2192 ",'<span class="arrow"> \u2192 </span>');return`<span class="component-name">${lo(e.componentName)}</span><span class="entry-separator">\u2022</span>${t}`}function gr(e){ue({type:e.type,componentName:e.componentName,filePath:e.filePath,summary:`reverted ${e.summary}`,state:"active",propertyKey:e.propertyKey,elementIdentity:e.elementIdentity,revertData:{type:"noop"}})}async function Ju(e){let t=Fe.get(e),n=t?.elementIdentity;if(!t||!n)return;let o=Yt(n);if(o||(o=await Do(n)),!o){M(`Couldn't find ${t.componentName}`);return}await Qe(o,{skipSidebar:!1})}function Qu(){if(!rt)return;let e=Array.from(Fe.values()).reverse();if(e.length===0){rt.innerHTML='<div class="changelog-empty">No logs yet. Changes will appear here.</div>';return}rt.innerHTML=e.map(o=>{let r=["changelog-entry",Vs(o)?"selectable":"",o.state==="reverted"?"reverted":"",o.state==="pending"?"pending":""].filter(Boolean).join(" "),i=o.filePath?Xu(o.filePath):"",a=Ku(o.timestamp);return`<div class="${r}" data-entry-id="${lo(o.id)}">
  <span class="entry-summary">${Zu(o)}</span>
  ${i?`<span class="entry-file" title="${lo(i)}">${lo(i)}</span>`:""}
  <span class="entry-time">${a}</span>
  ${qu(o)?'<button class="entry-revert" title="Revert this change">\u21A9</button>':""}
</div>`}).join("");let t=Array.from(rt.querySelectorAll(".entry-revert"));for(let o of t){let i=o.closest(".changelog-entry")?.dataset.entryId;i&&o.addEventListener("click",a=>{a.stopPropagation(),ju(i)})}let n=Array.from(rt.querySelectorAll(".changelog-entry"));for(let o of n){let r=o.dataset.entryId;if(!r)continue;let i=Fe.get(r);!i||!Vs(i)||o.addEventListener("click",()=>{Ju(r)})}}function ep(){if(!it)return;let e=Yi();e===0?it.classList.add("hidden"):(it.classList.remove("hidden"),it.textContent=String(e))}function Ws(e){ao=document.createElement("style"),ao.textContent=Yu,e.appendChild(ao),fe=document.createElement("div"),fe.className="changelog-panel",fe.style.display="none";let t=document.createElement("div");t.className="changelog-header";let n=document.createElement("div");n.className="changelog-header-main";let o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.classList.add("changelog-header-icon"),o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.7"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),o.innerHTML='<path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path>';let r=document.createElement("span");r.className="changelog-title",r.textContent="Logs",it=document.createElement("span"),it.className="changelog-badge hidden",it.textContent="0";let i=document.createElement("span");i.className="changelog-header-copy",i.textContent="Latest changes",Ot=document.createElement("svg"),Ot.className="changelog-chevron",Ot.setAttribute("viewBox","0 0 16 16"),Ot.setAttribute("fill","currentColor"),Ot.innerHTML='<path d="M3.5 5.5L8 10l4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',n.appendChild(o),n.appendChild(r),n.appendChild(it),n.appendChild(i),t.appendChild(n),t.appendChild(Ot),t.addEventListener("click",()=>co(!sn)),fe.appendChild(t),rt=document.createElement("div"),rt.className="changelog-body",fe.appendChild(rt),e.appendChild(fe);let a=Gi(()=>{Qu(),ep(),fe&&(sn&&fe.style.display==="none"?(fe.style.display="",requestAnimationFrame(()=>{requestAnimationFrame(()=>{fe?.classList.add("visible")})})):sn||(fe.style.display="none",fe.classList.remove("visible")),fe.classList.toggle("collapsed",!sn))});fr=pe(c=>{if(c.type==="revertComplete"){for(let[d,u]of Fe){if(!hr.has(d))continue;let m=u.revertData;if(m.type!=="cliUndo"&&m.type!=="generateUndo")continue;let f=c.results.filter(p=>m.undoIds.includes(p.undoId));f.length!==0&&(hr.delete(d),f.every(p=>p.success)?gr(u):(u.state="active",Ht()))}for(let d of c.results)!d.success&&d.error&&M(`Revert failed: ${d.error}`)}});let l=yr;yr=()=>{l(),a()}}function Us(){fr&&(fr(),fr=null),yr(),yr=()=>{},fe?.remove(),fe=null,ao?.remove(),ao=null,rt=null,it=null,Ot=null,hr.clear(),Gu(),io=[]}var Fe,sn,hr,io,fe,rt,it,Ot,fr,ao,Yu,yr,Pt=S(()=>{"use strict";Be();K();we();rn();Hn();Fe=new Map,sn=!1,hr=new Set,io=[];fe=null,rt=null,it=null,Ot=null,fr=null,ao=null,Yu=`
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
`;yr=()=>{}});function js(e){return`${e.componentName}:${e.filePath}:${e.lineHint}:${e.tag}`}function Gs(e){dn=e}function np(e){switch(e.type){case"property":return e.updates.map(t=>`${t.oldClass||"none"} \u2192 ${t.newClass}`).join(", ");case"text":return`"${e.originalText.slice(0,20)}" \u2192 "${e.newText.slice(0,20)}"`;case"reorder":return`reorder children (${e.fromIndex+1} \u2192 ${e.toIndex+1})`;case"move":return`move (${Math.round(e.delta.dx)}px, ${Math.round(e.delta.dy)}px)`}}function mt(e){if(!e.filePath){M("Cannot track changes \u2014 source file not resolved","warning");return}let t=js(e),n=at.get(t);if(n&&n.type==="property"&&e.type==="property")for(let o of e.updates){let r=n.updates.findIndex(i=>i.cssProperty===o.cssProperty);r>=0?n.updates[r]=o:n.updates.push(o)}else at.set(t,e);dn?.(at.size),ue({type:e.type==="reorder"?"property":e.type==="move"?"move":e.type==="text"?"textEdit":"property",componentName:e.componentName,filePath:e.filePath,summary:np(e),state:"pending",revertData:{type:"noop"}})}function Xi(){return cn}function op(){return[...at.values()]}function Ki(){at.clear(),dn?.(0)}function Ql(e,t,n){let o=js(e);uo.set(o,{element:t,overrides:new Map(n)})}function Ys(){Bs();for(let[,{element:e,overrides:t}]of uo)for(let[n,o]of t)e.style[n]=o;uo.clear(),Ki(),M("Discarded all pending changes","info")}function Ks(){if(at.size===0||cn)return;cn=!0,dn?.(at.size);let e=op();Z({type:"applyAllChanges",changes:e}),br=setTimeout(()=>{cn&&(cn=!1,dn?.(at.size),M("Apply timed out \u2014 changes still pending, try again","error"))},tp)}var tp,at,cn,br,dn,uo,en=S(()=>{"use strict";Be();we();Pt();tp=3e4,at=new Map,cn=!1,br=null,dn=null;uo=new Map;Xs(e=>{cn=!1,br&&(clearTimeout(br),br=null),e.success?(zs(),uo.clear(),Ki(),M(`Applied ${e.appliedCount} change${e.appliedCount===1?"":"s"}`,"success")):e.appliedCount>0?(uo.clear(),M(`Applied ${e.appliedCount}, failed ${e.failedCount}`,"warning"),Ki()):M(e.error||"Failed to apply changes","error"),dn?.(at.size)})});var Js={};Ca(Js,{destroyToolbar:()=>ea,getShadowRoot:()=>X,hideGenerateButton:()=>ap,mountToolbar:()=>Qi,setOnCanvasUndo:()=>na,setOnGenerate:()=>ta,showToast:()=>M,updateComponentDetail:()=>Ue,updateGenerateButton:()=>ht});function Qi(e){let t=document.createElement("div");t.id="frameup-root",document.body.appendChild(t),pn=t.attachShadow({mode:"open"});let n=document.createElement("style");n.textContent=ip;let o=document.createElement("div");o.className="toolbar",o.innerHTML=`
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${Zi}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Confirm</button>
    <div class="pending-actions" style="display:none">
      <button class="confirm-btn" title="Confirm Changes">Confirm Changes</button>
      <button class="discard-btn" title="Discard all pending changes">\u2715</button>
    </div>
    <button class="icon-btn close-btn" title="Close FrameUp">
      ${rp}
    </button>
  `,pn.appendChild(n),pn.appendChild(o),ee=o.querySelector(".undo-btn"),mn=o.querySelector(".generate-btn");let r=o.querySelector(".close-btn");un=o.querySelector(".component-detail"),It=document.createElement("div"),It.className="toast",pn.appendChild(It),ee.addEventListener("click",()=>{Z({type:"undo"}),ee&&(ee.innerHTML='<div class="spinner"></div>',ee.disabled=!0)}),r.addEventListener("click",e),mn.addEventListener("click",()=>{Ji&&Ji()});let i=o.querySelector(".pending-actions"),a=o.querySelector(".confirm-btn"),l=o.querySelector(".discard-btn");Gs(c=>{c>0&&!Xi()?(i.style.display="flex",a.textContent=`Confirm Changes (${c})`,a.disabled=!1):Xi()?(i.style.display="flex",a.textContent="Applying...",a.disabled=!0,l.style.display="none"):(i.style.display="none",l.style.display="inline-block")}),a.addEventListener("click",()=>{Ks()}),l.addEventListener("click",()=>{Ys()}),document.addEventListener("keydown",c=>{c.key==="z"&&(c.ctrlKey||c.metaKey)&&!c.shiftKey&&!lp()&&Zs?.()&&c.preventDefault()}),Qs(()=>{M("Disconnected. Click to reconnect."),nc()}),ec(()=>{M("Disconnected: another tab took over")}),tc(()=>{po=0,ee&&(ee.disabled=!0)}),pe(c=>{switch(c.type){case"reorderComplete":c.success?(po++,ee&&(ee.innerHTML=qs,setTimeout(()=>{ee&&(ee.innerHTML=Zi,ee.disabled=!1)},200))):c.error&&M(c.error);break;case"undoComplete":c.success?(po=Math.max(0,po-1),ee&&(ee.innerHTML=qs,setTimeout(()=>{ee&&(ee.innerHTML=Zi,ee.disabled=po===0)},200))):c.error&&M(c.error);break;case"devServerDisconnected":M("Dev server disconnected");break;case"devServerReconnected":M("Dev server reconnected");break}})}function ea(){let e=document.getElementById("frameup-root");e&&e.remove(),pn=null,ee=null}function X(){return pn}function ta(e){Ji=e}function na(e){Zs=e}function ht(e){mn&&(mn.disabled=!e)}function ap(){mn&&(mn.style.display="none")}function Ue(e){if(!un)return;if(!e){un.className="component-detail empty",un.textContent="No selection";return}un.className="component-detail";let t=e.filePath?e.filePath.replace(/^.*?\/src\//,"src/")+":"+e.lineNumber:"";un.innerHTML=`<span class="tag">&lt;${e.tagName}&gt;</span><span class="name">${e.componentName}</span>${t?`<span class="path">${t}</span>`:""}`}function M(e,t="info"){It&&(It.textContent=e,It.classList.add("visible"),qi&&clearTimeout(qi),qi=setTimeout(()=>{It?.classList.remove("visible")},2e3))}function lp(){let e=document.activeElement;return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement}var pn,ee,po,It,qi,un,mn,Ji,Zs,Zi,rp,qs,ip,we=S(()=>{"use strict";Be();K();en();pn=null,ee=null,po=0,It=null,qi=null,un=null,mn=null,Ji=null,Zs=null,Zi='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',rp='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>',qs='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>',ip=`
  :host {
    all: initial;
  }
  ${Ma}
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
`});function es(e){sa=e}function Xs(e){ca=e}function vr(e){ve&&ve.readyState===WebSocket.OPEN||(la=e,ve=new WebSocket(`ws://localhost:${e}`),ve.onopen=()=>{let t=fn>0;fn=0,t&&aa&&aa()},ve.onmessage=t=>{try{let n=JSON.parse(t.data);n.type==="tailwindTokens"&&wa(n.tokens),n.type==="updatePropertyComplete"&&sa&&sa(n.success,n.errorCode,n.error),n.type==="config"&&(Na(n.hasApiKey),n.hasApiKey&&Promise.resolve().then(()=>(we(),Js)).then(o=>o.hideGenerateButton())),n.type==="applyAllComplete"&&ca&&ca(n),mo.forEach(o=>o(n))}catch{}},ve.onclose=t=>{if(ve=null,t.code===4001){ia&&ia();return}if(fn<sp){let n=500*Math.pow(2,fn);fn++,oa=setTimeout(()=>vr(e),n)}else ra&&ra()},ve.onerror=()=>{})}function Z(e){ve&&ve.readyState===WebSocket.OPEN&&ve.send(JSON.stringify(e))}function pe(e){return mo.push(e),()=>{mo=mo.filter(t=>t!==e)}}function oc(){oa&&clearTimeout(oa),ve&&(ve.close(),ve=null),mo=[]}function mr(e){return new Promise(t=>{let n=pe(o=>{o.type==="discoverFileResult"&&o.componentName===e&&(n(),t(o.filePath))});Z({type:"discoverFile",componentName:e}),setTimeout(()=>{n(),t(null)},5e3)})}function Qs(e){ra=e}function ec(e){ia=e}function tc(e){aa=e}function nc(){la&&(fn=0,vr(la))}var ve,mo,fn,sp,oa,ra,ia,aa,la,sa,ca,Be=S(()=>{"use strict";Ft();Vt();ve=null,mo=[],fn=0,sp=5,oa=null,ra=null,ia=null,aa=null,la=null,sa=null;ca=null});Be();we();rn();Ao();xt();Be();rn();we();en();Vt();var Ce=null,xe=null,Re=null,da=null,fo=!1,gn=null,xr=[],go=new Map,Cr=!1,cp=`
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
`,yt=null;function rc(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=cp,e.appendChild(t),Is({onStart:dp,onMove:up,onEnd:pp}),pe(n=>{n.type==="reorderComplete"&&(hn(),ke())})}function dp(e,t,n){Re=n,da=t,gn={x:e.clientX,y:e.clientY},fo=!1,Cr=!1,xr=[],go=new Map,yt=null;let o=X();if(!o)return;Ce=document.createElement("div"),Ce.className="drag-preview";let r=t.getBoundingClientRect();Ce.style.width=`${r.width}px`,Ce.style.height=`${r.height}px`,Ce.innerHTML=t.outerHTML,o.appendChild(Ce),xe=document.createElement("div"),xe.className="drop-indicator",o.appendChild(xe);let i=n.stack[1];if(!i?.filePath){M("Can't reorder this element"),hn();return}Z({type:"getSiblings",filePath:i.filePath,parentLine:i.lineNumber});let a=pe(l=>{if(l.type!=="siblingsList")return;a(),xr=l.siblings;let c=document.querySelectorAll("*");for(let d of c){if(d.closest("#frameup-root"))continue;let u=oe(d);if(!u)continue;let m=u;for(;m;){if(ye(m)){let f=m._debugSource||m._debugOwner?._debugSource;if(f){for(let p of l.siblings)f.lineNumber===p.lineNumber&&f.fileName===i.filePath&&go.set(p.lineNumber,{el:d,rect:d.getBoundingClientRect()});break}}m=m.return}}Cr=!0})}function up(e){if(!gn)return;let t=Math.abs(e.clientX-gn.x),n=Math.abs(e.clientY-gn.y);if(t<5&&n<5||(fo=!0,Ce&&(Ce.style.display="block",Ce.style.left=`${e.clientX+10}px`,Ce.style.top=`${e.clientY+10}px`),!Cr||!Re))return;let o=null,r=1/0,i=0,a=0,l=0;for(let c of xr){if(c.lineNumber===Re.lineNumber)continue;let d=go.get(c.lineNumber);if(!d)continue;let u=d.rect,m=u.top+u.height/2,f=Math.abs(e.clientY-m);f<r&&(r=f,o=c,e.clientY<m?i=u.top-2:i=u.bottom+2,a=u.left,l=u.width)}yt=o,o&&xe?(xe.style.display="block",xe.style.top=`${i}px`,xe.style.left=`${a}px`,xe.style.width=`${l}px`):xe&&(xe.style.display="none")}function pp(e){if(!fo||!yt||!Re){hn();return}if(!Re.filePath){M("Can't reorder this element"),hn();return}if(Ke()){let t=da,n=t?.parentElement,r=(n?Array.from(n.children):[]).map(l=>({tag:l.tagName.toLowerCase(),className:l.className||"",textContent:(l.textContent||"").slice(0,30)})),i=t&&n?Array.from(n.children).indexOf(t):0,a=i;if(yt&&n){let l=go.get(yt.lineNumber)?.el;if(l){let c=Array.from(n.children).indexOf(l);c>=0&&(a=c)}}mt({type:"reorder",componentName:Re.componentName,tag:t?.tagName.toLowerCase()||"div",filePath:Re.filePath,parentClassName:n?.className||"",lineHint:Re.lineNumber,childrenContext:r,fromIndex:i,toIndex:a}),hn();return}Z({type:"reorder",filePath:Re.filePath,fromLine:Re.lineNumber,toLine:yt.lineNumber,fromComponent:Re.componentName,toComponent:yt.componentName}),Ce&&(Ce.style.display="none"),xe&&(xe.style.display="none"),fo=!1,gn=null}function hn(){Ce?.remove(),xe?.remove(),Ce=null,xe=null,Re=null,da=null,fo=!1,gn=null,Cr=!1,xr=[],go=new Map,yt=null}function ic(){hn()}we();K();de();var ua="http://www.w3.org/2000/svg",yn=null,Ae=null,pa=null;function ac(){let e=X();e&&(yn=document.createElementNS(ua,"svg"),yn.setAttribute("style","position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"),Ae=document.createElementNS(ua,"g"),Ae.setAttribute("class","annotation-root"),yn.appendChild(Ae),e.appendChild(yn),window.addEventListener("scroll",Er,{passive:!0}),pa=Bn(Er),Er())}function Er(){if(!Ae)return;let{scale:e,offsetX:t,offsetY:n}=ze();Ae.setAttribute("transform",`translate(${t}, ${n}) scale(${e})`)}function lc(e,t,n,o,r,i){if(!Ae)return null;let a=document.createElementNS(ua,"foreignObject");a.setAttribute("data-annotation-id",e),a.setAttribute("x",String(t)),a.setAttribute("y",String(n)),a.setAttribute("width","300"),a.setAttribute("height","100");let l=document.createElement("div");return l.style.cssText=`
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
  `,l.textContent=o,a.appendChild(l),Ae.appendChild(a),a}function sc(e){if(!Ae)return;let t=Ae.querySelector(`[data-annotation-id="${e}"]`);t&&t.remove()}function ho(){Ae&&(Ae.innerHTML="")}function cc(){window.removeEventListener("scroll",Er),pa?.(),pa=null,yn?.remove(),yn=null,Ae=null}Hn();de();we();K();ci();Qo();Xn();Pt();var bn={pointer:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9093 12.3603L17.0007 20.8537L14.1816 21.8798L11.0902 13.3864L6.91797 16.5422L8.4087 1.63318L19.134 12.0959L13.9093 12.3603Z"></path></svg>',text:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6V21H11V6H5V4H19V6H13Z"></path></svg>',canvas:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>',logs:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path></svg>',undo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>',reset:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.53614 18.8862 7.33243 17.1346 5.86492L15 8V2L21 2L18.5535 4.44656C20.6649 6.28002 22 8.9841 22 12Z"></path></svg>'},dc=navigator.platform.includes("Mac")?"\u2318":"Ctrl+",ma=navigator.platform.includes("Mac")?"Cmd":"Ctrl",ya=[{type:"select",icon:bn.pointer,label:"Select",shortcut:"S"},{type:"text",icon:bn.text,label:"Text",shortcut:"T"}],mp=`
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
`,Ee=null,$e=null,wr=new Map,je=null,Ge=null,yo=null,fa=null,ga=null,ha=null;function pc(e){fa=e}function mc(e){ga=e}function fc(e){je&&(je.disabled=!e)}function uc(){if(!Ge||!yo)return;let e=Yi();Ge.classList.toggle("active",so()),yo.classList.toggle("hidden",e===0),yo.textContent=String(e)}function gc(){let e=X();if(!e)return;let t=document.createElement("style");t.textContent=mp,e.appendChild(t),Ee=document.createElement("div"),Ee.className="tools-panel";let n=[["select","text"]];for(let l=0;l<n.length;l++){if(l>0){let c=document.createElement("div");c.className="tool-divider",Ee.appendChild(c)}for(let c of n[l]){let d=ya.find(f=>f.type===c),u=document.createElement("button");u.className=`tool-btn${d.type==="select"?" active":""}`,u.innerHTML=`${d.icon}<span class="tooltip">${d.label}<span class="shortcut-badge">${dc}${d.shortcut}</span></span>`,u.addEventListener("click",()=>zo(d.type));let m=null;u.addEventListener("mouseenter",()=>{m=setTimeout(()=>u.classList.add("tooltip-visible"),400)}),u.addEventListener("mouseleave",()=>{m&&clearTimeout(m),u.classList.remove("tooltip-visible")}),Ee.appendChild(u),wr.set(d.type,u)}}$e=document.createElement("div"),$e.className="sub-options hidden",Ee.appendChild($e);let o=document.createElement("div");o.className="tool-divider",Ee.appendChild(o),je=document.createElement("button"),je.className="action-btn",je.innerHTML=bn.undo,je.title="Undo (Ctrl+Z)",je.disabled=!0,je.addEventListener("click",()=>{ga&&ga()}),Ee.appendChild(je),Ge=document.createElement("button"),Ge.className="action-btn has-badge",Ge.innerHTML=`${bn.logs}<span class="action-badge hidden">0</span>`,Ge.title="Logs",Ge.addEventListener("click",()=>{co(!so())}),yo=Ge.querySelector(".action-badge"),Ee.appendChild(Ge);let r=document.createElement("button");r.className="action-btn danger",r.innerHTML=bn.reset,r.title="Reset Canvas",r.addEventListener("click",()=>{fa&&fa()}),Ee.appendChild(r);let i=document.createElement("button");i.className="action-btn",i.innerHTML=bn.canvas,i.title="Toggle Infinite Canvas",i.addEventListener("click",()=>{us(),i.style.color=ds()?s.accent:""}),Ee.appendChild(i);let a=document.createElement("button");a.className="help-btn",a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8H14V6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5C21 8.433 19.433 10 17.5 10H16V14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5V16H10V17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14H8V10H6.5C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5V8ZM8 8V6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM10 10V14H14V10H10Z"></path></svg>',a.title=`Keyboard Shortcuts (${dc}/)`,a.addEventListener("click",()=>yc()),Ee.appendChild(a),e.appendChild(Ee),document.addEventListener("keydown",hc,!0),ha=Gi(uc),uc()}function hc(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||et()||e.ctrlKey||e.metaKey||e.altKey)return;let n=e.key.toUpperCase();if(e.key==="?"){yc(),e.preventDefault();return}let o=ya.find(r=>r.shortcut===n);o&&(zo(o.type),e.preventDefault())}var Ye=null,bo=null;function yc(){Ye?Tr():fp()}function fp(){let e=X();if(!e||Ye)return;Ye=document.createElement("div"),Ye.className="shortcuts-overlay";let t=document.createElement("div");t.className="shortcuts-card";let n=document.createElement("div");n.className="shortcuts-title",n.textContent="Keyboard Shortcuts",t.appendChild(n);let o=[{label:"Tools",items:ya.map(r=>({action:r.label,keys:[r.shortcut]}))},{label:"Actions",items:[{action:"Undo",keys:[ma,"Z"]},{action:"Toggle Logs",keys:[ma,"Shift","L"]},{action:"Keyboard Shortcuts",keys:["?"]},{action:"Cancel / Deselect",keys:["Esc"]}]},{label:"Canvas",items:[{action:"Pan",keys:["Space","Drag"]},{action:"Zoom",keys:[ma,"Scroll"]}]}];for(let r of o){let i=document.createElement("div");i.className="shortcuts-section";let a=document.createElement("div");a.className="shortcuts-section-label",a.textContent=r.label,i.appendChild(a);for(let l of r.items){let c=document.createElement("div");c.className="shortcut-row";let d=document.createElement("span");d.className="shortcut-action",d.textContent=l.action,c.appendChild(d);let u=document.createElement("span");u.className="shortcut-keys";for(let m=0;m<l.keys.length;m++){if(m>0){let p=document.createElement("span");p.className="shortcut-plus",p.textContent="+",u.appendChild(p)}let f=document.createElement("span");f.className="shortcut-key",f.textContent=l.keys[m],u.appendChild(f)}c.appendChild(u),i.appendChild(c)}t.appendChild(i)}Ye.appendChild(t),Ye.addEventListener("click",r=>{r.target===Ye&&Tr()}),e.appendChild(Ye),bo=r=>{Tr()},document.addEventListener("keydown",bo,!0)}function Tr(){bo&&(document.removeEventListener("keydown",bo,!0),bo=null),Ye?.remove(),Ye=null}function bc(e){for(let[t,n]of wr)n.classList.toggle("active",t===e);gp(e)}function gp(e){if($e&&($e.innerHTML="",$e.classList.add("hidden"),$e.classList.remove("visible"),e==="text")){$e.classList.remove("hidden"),requestAnimationFrame(()=>$e?.classList.add("visible"));let t=Kt(),n=document.createElement("button");n.className="color-swatch",n.style.background=t.textColor,n.addEventListener("click",()=>{let r=n.getBoundingClientRect();Oo({initialColor:t.textColor,position:{x:r.right+8,y:r.top},showPropertyToggle:!1,onColorChange(i){Bo("textColor",i),n.style.background=i},onClose(){}})}),$e.appendChild(n);let o=document.createElement("div");o.className="segmented-control";for(let r of[12,16,20,24]){let i=document.createElement("button");i.className=`segment${r===t.fontSize?" active":""}`,i.textContent=`${r}`,i.addEventListener("click",()=>{Bo("fontSize",r),o.querySelectorAll(".segment").forEach(a=>a.classList.remove("active")),i.classList.add("active")}),o.appendChild(i)}$e.appendChild(o)}}function vc(e){let t=wr.get(e);t&&(t.style.backgroundColor=s.accentSoft,t.style.transition="background-color 300ms ease",setTimeout(()=>{t.style.backgroundColor="",t.style.transition=""},300))}function xc(){document.removeEventListener("keydown",hc,!0),ha?.(),ha=null,Tr(),Ee?.remove(),Ee=null,$e=null,je=null,Ge=null,yo=null,wr.clear()}qn();Ai();Tt();Mi();de();Ri();de();xt();Ct();kn();Tt();qn();Ui();Be();async function Cc(e,t){let n=$t(e,t);if(!n)return null;let o=oe(n);if(!o)return null;let r=null;try{let i=await Oe(o);if(i&&i.length>0)for(let a of i){if(!a.functionName)continue;let l=a.functionName;if(l[0]!==l[0].toUpperCase()||Ze(l))continue;let c=qe(a.fileName);r={componentName:l,filePath:c,lineNumber:a.lineNumber??0,columnNumber:a.columnNumber??0};break}}catch{}if(!r){let i=o;for(;i;){if(ye(i)){let a=ae(i.type);if(a&&a[0]===a[0].toUpperCase()&&!Ze(a)){let l=i._debugSource||i._debugOwner?._debugSource;r={componentName:a,filePath:l?.fileName||"",lineNumber:l?.lineNumber||0,columnNumber:l?.columnNumber??0};break}}i=i.return}}if(r&&!r.filePath&&r.componentName){let i=rr(r.componentName);if(i===void 0){let a=await mr(r.componentName);ir(r.componentName,a),a&&(r.filePath=a)}else i&&(r.filePath=i)}return r}K();var se=null,Dt=null,Sr=null,Tc={onMouseDown(e){if(se){Ec();return}let t=Xt(e.clientX,e.clientY);Dt={pageX:t.x,pageY:t.y},Cc(e.clientX,e.clientY).then(n=>{Sr=n}),se=document.createElement("input"),se.type="text",se.placeholder="Type annotation...",se.style.cssText=`
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
    `,se.setAttribute("data-frameup-overlay","true"),se.addEventListener("keydown",n=>{n.key==="Enter"&&(Ec(),n.preventDefault()),n.key==="Escape"&&(wc(),n.preventDefault()),n.stopPropagation()}),document.body.appendChild(se),se.focus()},onMouseMove(){},onMouseUp(){}};function Ec(){if(!se||!Dt)return;let e=se.value.trim();if(se.remove(),se=null,!e)return;let t=Kt(),n=crypto.randomUUID();lc(n,Dt.pageX,Dt.pageY,e,t.fontSize,t.textColor),vi({type:"text",id:n,position:Dt,content:e,fontSize:t.fontSize,color:t.textColor,targetComponent:Sr}),Dt=null,Sr=null}function wc(){se&&(se.remove(),se=null),Dt=null,Sr=null}function Sc(){wc()}Xn();Qo();K();Pt();var _t=null,vo=null;function Nc(e){let t=e instanceof Error&&e.stack?e.stack:String(e);return/frameup|overlay/i.test(t)}function hp(e){let t=X();if(!t)return;_t&&_t.parentNode&&_t.parentNode.removeChild(_t),vo&&clearTimeout(vo);let n=document.createElement("div");n.setAttribute("style",["position: fixed","bottom: 72px","right: 16px","z-index: 2147483647","background: rgba(30, 30, 30, 0.92)","color: #fff",`font-family: ${x}`,"font-size: 12px","padding: 10px 14px",`border-radius: ${k.sm}`,`box-shadow: ${H.md}`,"max-width: 320px","display: flex","align-items: center","gap: 10px","opacity: 0",`transition: opacity ${C.medium}`].join("; "));let o=document.createElement("span");o.textContent=e,o.setAttribute("style","flex: 1;");let r=document.createElement("button");r.textContent="Dismiss",r.setAttribute("style",["background: rgba(255,255,255,0.15)","border: none","color: #fff",`font-family: ${x}`,"font-size: 11px","padding: 3px 8px",`border-radius: ${k.xs}`,"cursor: pointer","white-space: nowrap"].join("; ")),r.addEventListener("click",()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),vo&&clearTimeout(vo),_t=null}),n.appendChild(o),n.appendChild(r),t.appendChild(n),_t=n,requestAnimationFrame(()=>{n.style.opacity="1"}),vo=setTimeout(()=>{n.style.opacity="0",setTimeout(()=>n.remove(),200),_t=null},8e3)}function ba(e){console.error("[FrameUp]",e),hp("FrameUp encountered an error. Your app is unaffected.")}function yp(){window.addEventListener("error",e=>{Nc(e.error??e.message)&&(ba(e.error??e.message),e.preventDefault())}),window.addEventListener("unhandledrejection",e=>{Nc(e.reason)&&(ba(e.reason),e.preventDefault())})}var va=null;function Mc(e,t,n){t.originalCssText=n.style.cssText,t.element=n,ut(t)}function bp(){if(window!==window.top)return;let e=window.__FRAMEUP_WS_PORT__;if(!e){console.warn("[FrameUp] No WebSocket port found.");return}if(document.getElementById("frameup-root"))return;vr(e),Qi(vp);let t=X();t&&(Kl(t),Ws(t)),Ds(),al(),rc(),ac(),xi(r=>sc(r)),va=new MutationObserver(()=>{for(let[r,i]of hi())document.contains(i.element)||setTimeout(()=>{let a=Yt(i.identity);if(a){Mc(r,i,a);return}Do(i.identity).then(l=>{l?Mc(r,i,l):(Wo(r),M(`Component ${i.componentRef.componentName} removed \u2014 move cleared`))})},80)}),va.observe(document.body,{childList:!0,subtree:!0}),document.addEventListener("keydown",r=>{(r.metaKey||r.ctrlKey)&&r.shiftKey&&r.key==="l"&&(r.preventDefault(),co(!so()))}),gc(),ps(),Es(),zl(),Cs("text",Tc),fi((r,i)=>{Un(),vc(r),i==="text"&&Sc(),tn(),Qr(),Fs(r==="select"),tr(r),bc(r)}),gi(()=>{ht(Mt()),fc(wi())}),mc(()=>{let r=jo();r&&M(`Undo: ${r}`)});let n=!1,o=0;ta(()=>{if(n){M("Generation in progress");return}let r=Date.now();if(r<o){let a=Math.ceil((o-r)/1e3);M(`Please wait ${a}s before retrying`);return}if(!Mt()){M("Nothing to confirm \u2014 make some visual changes first");return}let i=Si();if(i.length>0&&(n=!0,ht(!1),M(`Applying ${i.length} change${i.length!==1?"s":""}...`),Z({type:"commitBatch",operations:i})),Wn()){let a=Ni();n=!0,ht(!1),M("Generating from annotations..."),Z({type:"generate",annotations:a})}i.length===0&&!Wn()&&M("Nothing to confirm \u2014 make some visual changes first")}),pe(r=>{if(r.type==="commitBatchComplete"){Wn()||(n=!1,ht(Mt()));let i=r.results?.filter(c=>c.success).length??0,a=r.results?.length??0,l=r.undoIds??[];r.success?(ue({type:"commitBatch",componentName:"Batch Apply",filePath:"",summary:`${i}/${a} changes applied`,state:"active",revertData:{type:"batchApplyUndo",undoIds:l}}),M(`Applied ${i}/${a} changes`),ke(),ho(),Nt()):i>0?(ue({type:"commitBatch",componentName:"Batch Apply",filePath:"",summary:`${i}/${a} changes applied (${a-i} failed)`,state:"active",revertData:{type:"batchApplyUndo",undoIds:l}}),M(`Applied ${i}/${a} \u2014 ${a-i} failed`),ke(),ho(),Nt()):(M(`Error: ${r.error||"Batch apply failed"}`),o=Date.now()+5e3,n=!1,ht(Mt()))}}),pe(r=>{if(r.type==="generateProgress"&&M(r.message),r.type==="generateComplete")if(n=!1,ht(Mt()),r.success){let i=r.changes.length;ue({type:"generate",componentName:"AI Generate",filePath:r.changes[0]?.filePath||"",summary:`${i} file${i!==1?"s":""} changed`,state:"active",revertData:{type:"generateUndo",undoIds:r.undoIds||[]}});let a=r.changes.map(l=>l.description||l.filePath).join(", ");M(`Applied: ${a}`),ke(),ho(),Nt()}else M(`Error: ${r.error||"Generation failed"}`),o=Date.now()+5e3}),na(()=>{let r=jo();return r?(M(`Undo: ${r}`),!0):!1}),pc(()=>{ke(),ho(),Nt(),cs(),updateEyeButton(!0),M("Canvas cleared")}),console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools")}function vp(){tn(),Qr(),_s(),dl(),ic(),Jl(),cc(),va?.disconnect(),xc(),Us(),ms(),Ns(),Nt(),Ii(),oc(),ea()}function Lc(){try{bp(),yp()}catch(e){ba(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Lc):Lc();})();
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
