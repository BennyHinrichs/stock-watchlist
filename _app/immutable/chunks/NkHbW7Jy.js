var it=e=>{throw TypeError(e)};var X=(e,t,s)=>t.has(e)||it("Cannot "+s);var r=(e,t,s)=>(X(e,t,"read from private field"),s?s.call(e):t.get(e)),y=(e,t,s)=>t.has(e)?it("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),h=(e,t,s,i)=>(X(e,t,"write to private field"),i?i.call(e,s):t.set(e,s),s),m=(e,t,s)=>(X(e,t,"access private method"),s);import{h as Rt,d as xt,aQ as Et,aR as ft,aS as rt}from"./CPsl3SyV.js";function Ht(e,t,s,i,n){var a;Rt&&xt();var o=(a=t.$$slots)==null?void 0:a[s],c=!1;o===!0&&(o=t[s==="default"?"children":s],c=!0),o===void 0?n!==null&&n(e):o(e,c?()=>i:i)}function Bt(e){const t={};e.children&&(t.default=!0);for(const s in e.$$slots)t[s]=!0;return t}var yt=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.add(e),this.onSubscribe(),()=>{this.listeners.delete(e),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},W=typeof window>"u"||"Deno"in globalThis;function nt(){}function Vt(e,t){return typeof e=="function"?e(t):e}function Pt(e){return typeof e=="number"&&e>=0&&e!==1/0}function Ot(e,t){return Math.max(e+(t||0)-Date.now(),0)}function Jt(e,t){return typeof e=="function"?e(t):e}function jt(e,t){return typeof e=="function"?e(t):e}function Wt(e,t){const{type:s="all",exact:i,fetchStatus:n,predicate:o,queryKey:c,stale:a}=e;if(c){if(i){if(t.queryHash!==Dt(c,t.options))return!1}else if(!et(t.queryKey,c))return!1}if(s!=="all"){const d=t.isActive();if(s==="active"&&!d||s==="inactive"&&d)return!1}return!(typeof a=="boolean"&&t.isStale()!==a||n&&n!==t.state.fetchStatus||o&&!o(t))}function Xt(e,t){const{exact:s,status:i,predicate:n,mutationKey:o}=e;if(o){if(!t.options.mutationKey)return!1;if(s){if(Z(t.options.mutationKey)!==Z(o))return!1}else if(!et(t.options.mutationKey,o))return!1}return!(i&&t.state.status!==i||n&&!n(t))}function Dt(e,t){return((t==null?void 0:t.queryKeyHashFn)||Z)(e)}function Z(e){return JSON.stringify(e,(t,s)=>tt(s)?Object.keys(s).sort().reduce((i,n)=>(i[n]=s[n],i),{}):s)}function et(e,t){return e===t?!0:typeof e!=typeof t?!1:e&&t&&typeof e=="object"&&typeof t=="object"?!Object.keys(t).some(s=>!et(e[s],t[s])):!1}function pt(e,t){if(e===t)return e;const s=at(e)&&at(t);if(s||tt(e)&&tt(t)){const i=s?e:Object.keys(e),n=i.length,o=s?t:Object.keys(t),c=o.length,a=s?[]:{};let d=0;for(let C=0;C<c;C++){const p=s?C:o[C];(!s&&i.includes(p)||s)&&e[p]===void 0&&t[p]===void 0?(a[p]=void 0,d++):(a[p]=pt(e[p],t[p]),a[p]===e[p]&&e[p]!==void 0&&d++)}return n===c&&d===n?e:a}return t}function Yt(e,t){if(!t||Object.keys(e).length!==Object.keys(t).length)return!1;for(const s in e)if(e[s]!==t[s])return!1;return!0}function at(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function tt(e){if(!ot(e))return!1;const t=e.constructor;if(t===void 0)return!0;const s=t.prototype;return!(!ot(s)||!s.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(e)!==Object.prototype)}function ot(e){return Object.prototype.toString.call(e)==="[object Object]"}function qt(e){return new Promise(t=>{setTimeout(t,e)})}function Mt(e,t,s){return typeof s.structuralSharing=="function"?s.structuralSharing(e,t):s.structuralSharing!==!1?pt(e,t):t}function Zt(e,t,s=0){const i=[...e,t];return s&&i.length>s?i.slice(1):i}function te(e,t,s=0){const i=[t,...e];return s&&i.length>s?i.slice(0,-1):i}var vt=Symbol();function Ut(e,t){return!e.queryFn&&(t!=null&&t.initialPromise)?()=>t.initialPromise:!e.queryFn||e.queryFn===vt?()=>Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)):e.queryFn}var T,M,I,ut,Tt=(ut=class extends yt{constructor(){super();y(this,T);y(this,M);y(this,I);h(this,I,t=>{if(!W&&window.addEventListener){const s=()=>t();return window.addEventListener("visibilitychange",s,!1),()=>{window.removeEventListener("visibilitychange",s)}}})}onSubscribe(){r(this,M)||this.setEventListener(r(this,I))}onUnsubscribe(){var t;this.hasListeners()||((t=r(this,M))==null||t.call(this),h(this,M,void 0))}setEventListener(t){var s;h(this,I,t),(s=r(this,M))==null||s.call(this),h(this,M,t(i=>{typeof i=="boolean"?this.setFocused(i):this.onFocus()}))}setFocused(t){r(this,T)!==t&&(h(this,T,t),this.onFocus())}onFocus(){const t=this.isFocused();this.listeners.forEach(s=>{s(t)})}isFocused(){var t;return typeof r(this,T)=="boolean"?r(this,T):((t=globalThis.document)==null?void 0:t.visibilityState)!=="hidden"}},T=new WeakMap,M=new WeakMap,I=new WeakMap,ut),At=new Tt,Q,U,$,ht,Kt=(ht=class extends yt{constructor(){super();y(this,Q,!0);y(this,U);y(this,$);h(this,$,t=>{if(!W&&window.addEventListener){const s=()=>t(!0),i=()=>t(!1);return window.addEventListener("online",s,!1),window.addEventListener("offline",i,!1),()=>{window.removeEventListener("online",s),window.removeEventListener("offline",i)}}})}onSubscribe(){r(this,U)||this.setEventListener(r(this,$))}onUnsubscribe(){var t;this.hasListeners()||((t=r(this,U))==null||t.call(this),h(this,U,void 0))}setEventListener(t){var s;h(this,$,t),(s=r(this,U))==null||s.call(this),h(this,U,t(this.setOnline.bind(this)))}setOnline(t){r(this,Q)!==t&&(h(this,Q,t),this.listeners.forEach(i=>{i(t)}))}isOnline(){return r(this,Q)}},Q=new WeakMap,U=new WeakMap,$=new WeakMap,ht),mt=new Kt;function Lt(){let e,t;const s=new Promise((n,o)=>{e=n,t=o});s.status="pending",s.catch(()=>{});function i(n){Object.assign(s,n),delete s.resolve,delete s.reject}return s.resolve=n=>{i({status:"fulfilled",value:n}),e(n)},s.reject=n=>{i({status:"rejected",reason:n}),t(n)},s}function kt(e){return Math.min(1e3*2**e,3e4)}function bt(e){return(e??"online")==="online"?mt.isOnline():!0}var wt=class extends Error{constructor(e){super("CancelledError"),this.revert=e==null?void 0:e.revert,this.silent=e==null?void 0:e.silent}};function Y(e){return e instanceof wt}function St(e){let t=!1,s=0,i=!1,n;const o=Lt(),c=l=>{var v;i||(f(new wt(l)),(v=e.abort)==null||v.call(e))},a=()=>{t=!0},d=()=>{t=!1},C=()=>At.isFocused()&&(e.networkMode==="always"||mt.isOnline())&&e.canRun(),p=()=>bt(e.networkMode)&&e.canRun(),u=l=>{var v;i||(i=!0,(v=e.onSuccess)==null||v.call(e,l),n==null||n(),o.resolve(l))},f=l=>{var v;i||(i=!0,(v=e.onError)==null||v.call(e,l),n==null||n(),o.reject(l))},x=()=>new Promise(l=>{var v;n=g=>{(i||C())&&l(g)},(v=e.onPause)==null||v.call(e)}).then(()=>{var l;n=void 0,i||(l=e.onContinue)==null||l.call(e)}),F=()=>{if(i)return;let l;const v=s===0?e.initialPromise:void 0;try{l=v??e.fn()}catch(g){l=Promise.reject(g)}Promise.resolve(l).then(u).catch(g=>{var _;if(i)return;const D=e.retry??(W?0:3),G=e.retryDelay??kt,B=typeof G=="function"?G(s,g):G,V=D===!0||typeof D=="number"&&s<D||typeof D=="function"&&D(s,g);if(t||!V){f(g);return}s++,(_=e.onFail)==null||_.call(e,s,g),qt(B).then(()=>C()?void 0:x()).then(()=>{t?f(g):F()})})};return{promise:o,cancel:c,continue:()=>(n==null||n(),o),cancelRetry:a,continueRetry:d,canStart:p,start:()=>(p()?F():x().then(F),o)}}function Gt(){let e=[],t=0,s=a=>{a()},i=a=>{a()},n=a=>setTimeout(a,0);const o=a=>{t?e.push(a):n(()=>{s(a)})},c=()=>{const a=e;e=[],a.length&&n(()=>{i(()=>{a.forEach(d=>{s(d)})})})};return{batch:a=>{let d;t++;try{d=a()}finally{t--,t||c()}return d},batchCalls:a=>(...d)=>{o(()=>{a(...d)})},schedule:o,setNotifyFunction:a=>{s=a},setBatchNotifyFunction:a=>{i=a},setScheduler:a=>{n=a}}}var Ct=Gt(),A,ct,Ft=(ct=class{constructor(){y(this,A)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),Pt(this.gcTime)&&h(this,A,setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(e){this.gcTime=Math.max(this.gcTime||0,e??(W?1/0:5*60*1e3))}clearGcTimeout(){r(this,A)&&(clearTimeout(r(this,A)),h(this,A,void 0))}},A=new WeakMap,ct),N,z,R,K,b,H,L,E,j,lt,ee=(lt=class extends Ft{constructor(t){super();y(this,E);y(this,N);y(this,z);y(this,R);y(this,K);y(this,b);y(this,H);y(this,L);h(this,L,!1),h(this,H,t.defaultOptions),this.setOptions(t.options),this.observers=[],h(this,K,t.client),h(this,R,r(this,K).getQueryCache()),this.queryKey=t.queryKey,this.queryHash=t.queryHash,h(this,N,Qt(this.options)),this.state=t.state??r(this,N),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var t;return(t=r(this,b))==null?void 0:t.promise}setOptions(t){this.options={...r(this,H),...t},this.updateGcTime(this.options.gcTime)}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&r(this,R).remove(this)}setData(t,s){const i=Mt(this.state.data,t,this.options);return m(this,E,j).call(this,{data:i,type:"success",dataUpdatedAt:s==null?void 0:s.updatedAt,manual:s==null?void 0:s.manual}),i}setState(t,s){m(this,E,j).call(this,{type:"setState",state:t,setStateOptions:s})}cancel(t){var i,n;const s=(i=r(this,b))==null?void 0:i.promise;return(n=r(this,b))==null||n.cancel(t),s?s.then(nt).catch(nt):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(r(this,N))}isActive(){return this.observers.some(t=>jt(t.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===vt||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStale(){return this.state.isInvalidated?!0:this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):this.state.data===void 0}isStaleByTime(t=0){return this.state.isInvalidated||this.state.data===void 0||!Ot(this.state.dataUpdatedAt,t)}onFocus(){var s;const t=this.observers.find(i=>i.shouldFetchOnWindowFocus());t==null||t.refetch({cancelRefetch:!1}),(s=r(this,b))==null||s.continue()}onOnline(){var s;const t=this.observers.find(i=>i.shouldFetchOnReconnect());t==null||t.refetch({cancelRefetch:!1}),(s=r(this,b))==null||s.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),r(this,R).notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(s=>s!==t),this.observers.length||(r(this,b)&&(r(this,L)?r(this,b).cancel({revert:!0}):r(this,b).cancelRetry()),this.scheduleGc()),r(this,R).notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||m(this,E,j).call(this,{type:"invalidate"})}fetch(t,s){var d,C,p;if(this.state.fetchStatus!=="idle"){if(this.state.data!==void 0&&(s!=null&&s.cancelRefetch))this.cancel({silent:!0});else if(r(this,b))return r(this,b).continueRetry(),r(this,b).promise}if(t&&this.setOptions(t),!this.options.queryFn){const u=this.observers.find(f=>f.options.queryFn);u&&this.setOptions(u.options)}const i=new AbortController,n=u=>{Object.defineProperty(u,"signal",{enumerable:!0,get:()=>(h(this,L,!0),i.signal)})},o=()=>{const u=Ut(this.options,s),f={client:r(this,K),queryKey:this.queryKey,meta:this.meta};return n(f),h(this,L,!1),this.options.persister?this.options.persister(u,f,this):u(f)},c={fetchOptions:s,options:this.options,queryKey:this.queryKey,client:r(this,K),state:this.state,fetchFn:o};n(c),(d=this.options.behavior)==null||d.onFetch(c,this),h(this,z,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((C=c.fetchOptions)==null?void 0:C.meta))&&m(this,E,j).call(this,{type:"fetch",meta:(p=c.fetchOptions)==null?void 0:p.meta});const a=u=>{var f,x,F,l;Y(u)&&u.silent||m(this,E,j).call(this,{type:"error",error:u}),Y(u)||((x=(f=r(this,R).config).onError)==null||x.call(f,u,this),(l=(F=r(this,R).config).onSettled)==null||l.call(F,this.state.data,u,this)),this.scheduleGc()};return h(this,b,St({initialPromise:s==null?void 0:s.initialPromise,fn:c.fetchFn,abort:i.abort.bind(i),onSuccess:u=>{var f,x,F,l;if(u===void 0){a(new Error(`${this.queryHash} data is undefined`));return}try{this.setData(u)}catch(v){a(v);return}(x=(f=r(this,R).config).onSuccess)==null||x.call(f,u,this),(l=(F=r(this,R).config).onSettled)==null||l.call(F,u,this.state.error,this),this.scheduleGc()},onError:a,onFail:(u,f)=>{m(this,E,j).call(this,{type:"failed",failureCount:u,error:f})},onPause:()=>{m(this,E,j).call(this,{type:"pause"})},onContinue:()=>{m(this,E,j).call(this,{type:"continue"})},retry:c.options.retry,retryDelay:c.options.retryDelay,networkMode:c.options.networkMode,canRun:()=>!0})),r(this,b).start()}},N=new WeakMap,z=new WeakMap,R=new WeakMap,K=new WeakMap,b=new WeakMap,H=new WeakMap,L=new WeakMap,E=new WeakSet,j=function(t){const s=i=>{switch(t.type){case"failed":return{...i,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...i,fetchStatus:"paused"};case"continue":return{...i,fetchStatus:"fetching"};case"fetch":return{...i,...It(i.data,this.options),fetchMeta:t.meta??null};case"success":return{...i,data:t.data,dataUpdateCount:i.dataUpdateCount+1,dataUpdatedAt:t.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const n=t.error;return Y(n)&&n.revert&&r(this,z)?{...r(this,z),fetchStatus:"idle"}:{...i,error:n,errorUpdateCount:i.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:i.fetchFailureCount+1,fetchFailureReason:n,fetchStatus:"idle",status:"error"};case"invalidate":return{...i,isInvalidated:!0};case"setState":return{...i,...t.state}}};this.state=s(this.state),Ct.batch(()=>{this.observers.forEach(i=>{i.onQueryUpdate()}),r(this,R).notify({query:this,type:"updated",action:t})})},lt);function It(e,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:bt(t.networkMode)?"fetching":"paused",...e===void 0&&{error:null,status:"pending"}}}function Qt(e){const t=typeof e.initialData=="function"?e.initialData():e.initialData,s=t!==void 0,i=s?typeof e.initialDataUpdatedAt=="function"?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:s?i??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:s?"success":"pending",fetchStatus:"idle"}}var P,S,k,O,q,dt,se=(dt=class extends Ft{constructor(t){super();y(this,O);y(this,P);y(this,S);y(this,k);this.mutationId=t.mutationId,h(this,S,t.mutationCache),h(this,P,[]),this.state=t.state||$t(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){r(this,P).includes(t)||(r(this,P).push(t),this.clearGcTimeout(),r(this,S).notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){h(this,P,r(this,P).filter(s=>s!==t)),this.scheduleGc(),r(this,S).notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){r(this,P).length||(this.state.status==="pending"?this.scheduleGc():r(this,S).remove(this))}continue(){var t;return((t=r(this,k))==null?void 0:t.continue())??this.execute(this.state.variables)}async execute(t){var n,o,c,a,d,C,p,u,f,x,F,l,v,g,D,G,B,V,_,st;h(this,k,St({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(new Error("No mutationFn found")),onFail:(w,J)=>{m(this,O,q).call(this,{type:"failed",failureCount:w,error:J})},onPause:()=>{m(this,O,q).call(this,{type:"pause"})},onContinue:()=>{m(this,O,q).call(this,{type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>r(this,S).canRun(this)}));const s=this.state.status==="pending",i=!r(this,k).canStart();try{if(!s){m(this,O,q).call(this,{type:"pending",variables:t,isPaused:i}),await((o=(n=r(this,S).config).onMutate)==null?void 0:o.call(n,t,this));const J=await((a=(c=this.options).onMutate)==null?void 0:a.call(c,t));J!==this.state.context&&m(this,O,q).call(this,{type:"pending",context:J,variables:t,isPaused:i})}const w=await r(this,k).start();return await((C=(d=r(this,S).config).onSuccess)==null?void 0:C.call(d,w,t,this.state.context,this)),await((u=(p=this.options).onSuccess)==null?void 0:u.call(p,w,t,this.state.context)),await((x=(f=r(this,S).config).onSettled)==null?void 0:x.call(f,w,null,this.state.variables,this.state.context,this)),await((l=(F=this.options).onSettled)==null?void 0:l.call(F,w,null,t,this.state.context)),m(this,O,q).call(this,{type:"success",data:w}),w}catch(w){try{throw await((g=(v=r(this,S).config).onError)==null?void 0:g.call(v,w,t,this.state.context,this)),await((G=(D=this.options).onError)==null?void 0:G.call(D,w,t,this.state.context)),await((V=(B=r(this,S).config).onSettled)==null?void 0:V.call(B,void 0,w,this.state.variables,this.state.context,this)),await((st=(_=this.options).onSettled)==null?void 0:st.call(_,void 0,w,t,this.state.context)),w}finally{m(this,O,q).call(this,{type:"error",error:w})}}finally{r(this,S).runNext(this)}}},P=new WeakMap,S=new WeakMap,k=new WeakMap,O=new WeakSet,q=function(t){const s=i=>{switch(t.type){case"failed":return{...i,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...i,isPaused:!0};case"continue":return{...i,isPaused:!1};case"pending":return{...i,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...i,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...i,data:void 0,error:t.error,failureCount:i.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}};this.state=s(this.state),Ct.batch(()=>{r(this,P).forEach(i=>{i.onMutationUpdate(t)}),r(this,S).notify({mutation:this,type:"updated",action:t})})},dt);function $t(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}const gt="$$_queryClient",ie=()=>{const e=ft(gt);if(!e)throw new Error("No QueryClient was found in Svelte context. Did you forget to wrap your component with QueryClientProvider?");return e},re=e=>{Et(gt,e)},Nt="$$_isRestoring",ne=()=>{try{const e=ft(Nt);return e||rt(!1)}catch{return rt(!1)}};export{ne as A,ie as B,Bt as C,se as M,ee as Q,yt as S,Xt as a,nt as b,te as c,Zt as d,Ut as e,At as f,Vt as g,Dt as h,Z as i,vt as j,re as k,Lt as l,Wt as m,Ct as n,mt as o,et as p,jt as q,Jt as r,Ht as s,Yt as t,W as u,Pt as v,Ot as w,It as x,Mt as y,$t as z};
