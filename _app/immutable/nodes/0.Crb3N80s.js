var L=t=>{throw TypeError(t)};var U=(t,e,s)=>e.has(t)||L("Cannot "+s);var r=(t,e,s)=>(U(t,e,"read from private field"),s?s.call(t):e.get(t)),h=(t,e,s)=>e.has(t)?L("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,s),o=(t,e,s,a)=>(U(t,e,"write to private field"),a?a.call(t,s):e.set(t,s),s);var K=(t,e,s,a)=>({set _(i){o(t,e,i,s)},get _(){return r(t,e,a)}});import{c as fe,a as se,t as de}from"../chunks/C0uLU7Ga.js";import{i as ae}from"../chunks/Cu9ZXwJX.js";import{p as re,as as ye,aP as pe,f as ge,a as ie,c as me,r as ve}from"../chunks/CPsl3SyV.js";import{S as ne,h as ue,Q as Pe,n as c,m as G,M as be,a as J,b as p,e as Qe,c as Oe,d as Me,f as we,o as V,r as W,g as qe,i as X,p as Y,j as De,k as Ae,s as oe}from"../chunks/NkHbW7Jy.js";import{p as Fe}from"../chunks/D0lrbJ_H.js";const Ce=!0,Ee=Ce,Se=!1,Le=Object.freeze(Object.defineProperty({__proto__:null,ssr:Se},Symbol.toStringTag,{value:"Module"}));var y,x,Ke=(x=class extends ne{constructor(e={}){super();h(this,y);this.config=e,o(this,y,new Map)}build(e,s,a){const i=s.queryKey,u=s.queryHash??ue(i,s);let l=this.get(u);return l||(l=new Pe({client:e,queryKey:i,queryHash:u,options:e.defaultQueryOptions(s),state:a,defaultOptions:e.getQueryDefaults(i)}),this.add(l)),l}add(e){r(this,y).has(e.queryHash)||(r(this,y).set(e.queryHash,e),this.notify({type:"added",query:e}))}remove(e){const s=r(this,y).get(e.queryHash);s&&(e.destroy(),s===e&&r(this,y).delete(e.queryHash),this.notify({type:"removed",query:e}))}clear(){c.batch(()=>{this.getAll().forEach(e=>{this.remove(e)})})}get(e){return r(this,y).get(e)}getAll(){return[...r(this,y).values()]}find(e){const s={exact:!0,...e};return this.getAll().find(a=>G(s,a))}findAll(e={}){const s=this.getAll();return Object.keys(e).length>0?s.filter(a=>G(e,a)):s}notify(e){c.batch(()=>{this.listeners.forEach(s=>{s(e)})})}onFocus(){c.batch(()=>{this.getAll().forEach(e=>{e.onFocus()})})}onOnline(){c.batch(()=>{this.getAll().forEach(e=>{e.onOnline()})})}},y=new WeakMap,x),g,d,F,ee,Te=(ee=class extends ne{constructor(e={}){super();h(this,g);h(this,d);h(this,F);this.config=e,o(this,g,new Set),o(this,d,new Map),o(this,F,0)}build(e,s,a){const i=new be({mutationCache:this,mutationId:++K(this,F)._,options:e.defaultMutationOptions(s),state:a});return this.add(i),i}add(e){r(this,g).add(e);const s=T(e);if(typeof s=="string"){const a=r(this,d).get(s);a?a.push(e):r(this,d).set(s,[e])}this.notify({type:"added",mutation:e})}remove(e){if(r(this,g).delete(e)){const s=T(e);if(typeof s=="string"){const a=r(this,d).get(s);if(a)if(a.length>1){const i=a.indexOf(e);i!==-1&&a.splice(i,1)}else a[0]===e&&r(this,d).delete(s)}}this.notify({type:"removed",mutation:e})}canRun(e){const s=T(e);if(typeof s=="string"){const a=r(this,d).get(s),i=a==null?void 0:a.find(u=>u.state.status==="pending");return!i||i===e}else return!0}runNext(e){var a;const s=T(e);if(typeof s=="string"){const i=(a=r(this,d).get(s))==null?void 0:a.find(u=>u!==e&&u.state.isPaused);return(i==null?void 0:i.continue())??Promise.resolve()}else return Promise.resolve()}clear(){c.batch(()=>{r(this,g).forEach(e=>{this.notify({type:"removed",mutation:e})}),r(this,g).clear(),r(this,d).clear()})}getAll(){return Array.from(r(this,g))}find(e){const s={exact:!0,...e};return this.getAll().find(a=>J(s,a))}findAll(e={}){return this.getAll().filter(s=>J(e,s))}notify(e){c.batch(()=>{this.listeners.forEach(s=>{s(e)})})}resumePausedMutations(){const e=this.getAll().filter(s=>s.state.isPaused);return c.batch(()=>Promise.all(e.map(s=>s.continue().catch(p))))}},g=new WeakMap,d=new WeakMap,F=new WeakMap,ee);function T(t){var e;return(e=t.options.scope)==null?void 0:e.id}function Z(t){return{onFetch:(e,s)=>{var H,k,I,j,R;const a=e.options,i=(I=(k=(H=e.fetchOptions)==null?void 0:H.meta)==null?void 0:k.fetchMore)==null?void 0:I.direction,u=((j=e.state.data)==null?void 0:j.pages)||[],l=((R=e.state.data)==null?void 0:R.pageParams)||[];let D={pages:[],pageParams:[]},C=0;const _=async()=>{let Q=!1;const E=f=>{Object.defineProperty(f,"signal",{enumerable:!0,get:()=>(e.signal.aborted?Q=!0:e.signal.addEventListener("abort",()=>{Q=!0}),e.signal)})},ce=Qe(e.options,e.fetchOptions),B=async(f,m,A)=>{if(Q)return Promise.reject();if(m==null&&f.pages.length)return Promise.resolve(f);const S={client:e.client,queryKey:e.queryKey,pageParam:m,direction:A?"backward":"forward",meta:e.options.meta};E(S);const le=await ce(S),{maxPages:N}=e.options,z=A?Oe:Me;return{pages:z(f.pages,le,N),pageParams:z(f.pageParams,m,N)}};if(i&&u.length){const f=i==="backward",m=f?_e:$,A={pages:u,pageParams:l},S=m(a,A);D=await B(A,S,f)}else{const f=t??u.length;do{const m=C===0?l[0]??a.initialPageParam:$(a,D);if(C>0&&m==null)break;D=await B(D,m),C++}while(C<f)}return D};e.options.persister?e.fetchFn=()=>{var Q,E;return(E=(Q=e.options).persister)==null?void 0:E.call(Q,_,{client:e.client,queryKey:e.queryKey,meta:e.options.meta,signal:e.signal},s)}:e.fetchFn=_}}}function $(t,{pages:e,pageParams:s}){const a=e.length-1;return e.length>0?t.getNextPageParam(e[a],e,s[a],s):void 0}function _e(t,{pages:e,pageParams:s}){var a;return e.length>0?(a=t.getPreviousPageParam)==null?void 0:a.call(t,e[0],e,s[0],s):void 0}var n,v,P,O,M,b,w,q,te,he=(te=class{constructor(t={}){h(this,n);h(this,v);h(this,P);h(this,O);h(this,M);h(this,b);h(this,w);h(this,q);o(this,n,t.queryCache||new Ke),o(this,v,t.mutationCache||new Te),o(this,P,t.defaultOptions||{}),o(this,O,new Map),o(this,M,new Map),o(this,b,0)}mount(){K(this,b)._++,r(this,b)===1&&(o(this,w,we.subscribe(async t=>{t&&(await this.resumePausedMutations(),r(this,n).onFocus())})),o(this,q,V.subscribe(async t=>{t&&(await this.resumePausedMutations(),r(this,n).onOnline())})))}unmount(){var t,e;K(this,b)._--,r(this,b)===0&&((t=r(this,w))==null||t.call(this),o(this,w,void 0),(e=r(this,q))==null||e.call(this),o(this,q,void 0))}isFetching(t){return r(this,n).findAll({...t,fetchStatus:"fetching"}).length}isMutating(t){return r(this,v).findAll({...t,status:"pending"}).length}getQueryData(t){var s;const e=this.defaultQueryOptions({queryKey:t});return(s=r(this,n).get(e.queryHash))==null?void 0:s.state.data}ensureQueryData(t){const e=this.defaultQueryOptions(t),s=r(this,n).build(this,e),a=s.state.data;return a===void 0?this.fetchQuery(t):(t.revalidateIfStale&&s.isStaleByTime(W(e.staleTime,s))&&this.prefetchQuery(e),Promise.resolve(a))}getQueriesData(t){return r(this,n).findAll(t).map(({queryKey:e,state:s})=>{const a=s.data;return[e,a]})}setQueryData(t,e,s){const a=this.defaultQueryOptions({queryKey:t}),i=r(this,n).get(a.queryHash),u=i==null?void 0:i.state.data,l=qe(e,u);if(l!==void 0)return r(this,n).build(this,a).setData(l,{...s,manual:!0})}setQueriesData(t,e,s){return c.batch(()=>r(this,n).findAll(t).map(({queryKey:a})=>[a,this.setQueryData(a,e,s)]))}getQueryState(t){var s;const e=this.defaultQueryOptions({queryKey:t});return(s=r(this,n).get(e.queryHash))==null?void 0:s.state}removeQueries(t){const e=r(this,n);c.batch(()=>{e.findAll(t).forEach(s=>{e.remove(s)})})}resetQueries(t,e){const s=r(this,n),a={type:"active",...t};return c.batch(()=>(s.findAll(t).forEach(i=>{i.reset()}),this.refetchQueries(a,e)))}cancelQueries(t,e={}){const s={revert:!0,...e},a=c.batch(()=>r(this,n).findAll(t).map(i=>i.cancel(s)));return Promise.all(a).then(p).catch(p)}invalidateQueries(t,e={}){return c.batch(()=>{if(r(this,n).findAll(t).forEach(a=>{a.invalidate()}),(t==null?void 0:t.refetchType)==="none")return Promise.resolve();const s={...t,type:(t==null?void 0:t.refetchType)??(t==null?void 0:t.type)??"active"};return this.refetchQueries(s,e)})}refetchQueries(t,e={}){const s={...e,cancelRefetch:e.cancelRefetch??!0},a=c.batch(()=>r(this,n).findAll(t).filter(i=>!i.isDisabled()).map(i=>{let u=i.fetch(void 0,s);return s.throwOnError||(u=u.catch(p)),i.state.fetchStatus==="paused"?Promise.resolve():u}));return Promise.all(a).then(p)}fetchQuery(t){const e=this.defaultQueryOptions(t);e.retry===void 0&&(e.retry=!1);const s=r(this,n).build(this,e);return s.isStaleByTime(W(e.staleTime,s))?s.fetch(e):Promise.resolve(s.state.data)}prefetchQuery(t){return this.fetchQuery(t).then(p).catch(p)}fetchInfiniteQuery(t){return t.behavior=Z(t.pages),this.fetchQuery(t)}prefetchInfiniteQuery(t){return this.fetchInfiniteQuery(t).then(p).catch(p)}ensureInfiniteQueryData(t){return t.behavior=Z(t.pages),this.ensureQueryData(t)}resumePausedMutations(){return V.isOnline()?r(this,v).resumePausedMutations():Promise.resolve()}getQueryCache(){return r(this,n)}getMutationCache(){return r(this,v)}getDefaultOptions(){return r(this,P)}setDefaultOptions(t){o(this,P,t)}setQueryDefaults(t,e){r(this,O).set(X(t),{queryKey:t,defaultOptions:e})}getQueryDefaults(t){const e=[...r(this,O).values()],s={};return e.forEach(a=>{Y(t,a.queryKey)&&Object.assign(s,a.defaultOptions)}),s}setMutationDefaults(t,e){r(this,M).set(X(t),{mutationKey:t,defaultOptions:e})}getMutationDefaults(t){const e=[...r(this,M).values()];let s={};return e.forEach(a=>{Y(t,a.mutationKey)&&(s={...s,...a.defaultOptions})}),s}defaultQueryOptions(t){if(t._defaulted)return t;const e={...r(this,P).queries,...this.getQueryDefaults(t.queryKey),...t,_defaulted:!0};return e.queryHash||(e.queryHash=ue(e.queryKey,e)),e.refetchOnReconnect===void 0&&(e.refetchOnReconnect=e.networkMode!=="always"),e.throwOnError===void 0&&(e.throwOnError=!!e.suspense),!e.networkMode&&e.persister&&(e.networkMode="offlineFirst"),e.queryFn===De&&(e.enabled=!1),e}defaultMutationOptions(t){return t!=null&&t._defaulted?t:{...r(this,P).mutations,...(t==null?void 0:t.mutationKey)&&this.getMutationDefaults(t.mutationKey),...t,_defaulted:!0}}clear(){r(this,n).clear(),r(this,v).clear()}},n=new WeakMap,v=new WeakMap,P=new WeakMap,O=new WeakMap,M=new WeakMap,b=new WeakMap,w=new WeakMap,q=new WeakMap,te);function He(t,e){re(e,!1);let s=Fe(e,"client",24,()=>new he);ye(()=>{s().mount()}),Ae(s()),pe(()=>{s().unmount()}),ae();var a=fe(),i=ge(a);oe(i,e,"default",{},null),se(t,a),ie()}var ke=de('<main class="container h-svh pb-10"><!></main>');function Ue(t,e){re(e,!1);const s=new he({defaultOptions:{queries:{enabled:Ee}}});ae(),He(t,{client:s,children:(a,i)=>{var u=ke(),l=me(u);oe(l,e,"default",{},null),ve(u),se(a,u)},$$slots:{default:!0}}),ie()}export{Ue as component,Le as universal};
