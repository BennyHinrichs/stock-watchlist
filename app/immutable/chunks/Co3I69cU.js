var vn=Array.isArray,pn=Array.prototype.indexOf,se=Array.from,ae=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,hn=Object.getOwnPropertyDescriptors,le=Object.prototype,ue=Array.prototype,dn=Object.getPrototypeOf;function oe(t){return typeof t=="function"}const F=()=>{};function ie(t){return t()}function wt(t){for(var n=0;n<t.length;n++)t[n]()}const g=2,Dt=4,at=8,gt=16,I=32,G=64,X=128,w=256,J=512,d=1024,k=2048,N=4096,Y=8192,lt=16384,En=32768,Nt=65536,fe=1<<17,yn=1<<19,Ct=1<<20,It=Symbol("$state"),ce=Symbol("legacy props"),_e=Symbol("");function qt(t){return t===this.v}function Pt(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function ve(t,n){return t!==n}function Ft(t){return!Pt(t,this.v)}function wn(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function gn(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function bn(t){throw new Error("https://svelte.dev/e/effect_orphan")}function mn(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function pe(){throw new Error("https://svelte.dev/e/hydration_failed")}function he(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function de(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Ee(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Tn(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function An(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let K=!1;function ye(){K=!0}const we=1,ge=2,be=4,me=8,Te=16,Ae=1,xe=2,Ie=4,Se=8,ke=16,Re=1,Oe=2,De=4,Ne=1,Ce=2,xn="[",In="[!",Sn="]",Lt={},qe=Symbol(),Pe="http://www.w3.org/2000/svg";function Mt(t){console.warn("https://svelte.dev/e/hydration_mismatch")}function Fe(){throw new Error("https://svelte.dev/e/invalid_default_snippet")}function ut(t){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}let i=null;function St(t){i=t}function Le(t){return Yt().get(t)}function Me(t,n){return Yt().set(t,n),n}function Ye(t,n=!1,e){i={p:i,c:null,e:null,m:!1,s:t,x:null,l:null},K&&!n&&(i.l={s:null,u:null,r1:[],r2:bt(!1)})}function He(t){const n=i;if(n!==null){t!==void 0&&(n.x=t);const l=n.e;if(l!==null){var e=_,r=f;n.e=null;try{for(var s=0;s<l.length;s++){var a=l[s];et(a.effect),nt(a.reaction),zt(a.fn)}}finally{et(e),nt(r)}}i=n.p,n.m=!0}return t||{}}function ot(){return!K||i!==null&&i.l===null}function Yt(t){return i===null&&ut(),i.c??(i.c=new Map(kn(i)||void 0))}function kn(t){let n=t.p;for(;n!==null;){const e=n.c;if(e!==null)return e;n=n.p}return null}function bt(t,n){var e={f:0,v:t,reactions:null,equals:qt,rv:0,wv:0};return e}function Be(t){return Ht(bt(t))}function Rn(t,n=!1){var r;const e=bt(t);return n||(e.equals=Ft),K&&i!==null&&i.l!==null&&((r=i.l).s??(r.s=[])).push(e),e}function Ue(t,n=!1){return Ht(Rn(t,n))}function Ht(t){return f!==null&&!T&&f.f&g&&(A===null?Vn([t]):A.push(t)),t}function je(t,n){return mt(t,z(()=>_t(t))),n}function mt(t,n){return f!==null&&!T&&ot()&&f.f&(g|gt)&&(A===null||!A.includes(t))&&An(),On(t,n)}function On(t,n){return t.equals(n)||(t.v,t.v=n,t.wv=sn(),Bt(t,k),ot()&&_!==null&&_.f&d&&!(_.f&(I|G))&&(x===null?$n([t]):x.push(t))),n}function Ve(t,n=1){var e=_t(t),r=n===1?e++:e--;return mt(t,e),r}function Bt(t,n){var e=t.reactions;if(e!==null)for(var r=ot(),s=e.length,a=0;a<s;a++){var l=e[a],u=l.f;u&k||!r&&l===_||(m(l,n),u&(d|w)&&(u&g?Bt(l,N):ct(l)))}}let O=!1;function $e(t){O=t}let b;function j(t){if(t===null)throw Mt(),Lt;return b=t}function Ge(){return j(C(b))}function Ke(t){if(O){if(C(b)!==null)throw Mt(),Lt;b=t}}function ze(t=1){if(O){for(var n=t,e=b;n--;)e=C(e);b=e}}function Ze(){for(var t=0,n=b;;){if(n.nodeType===8){var e=n.data;if(e===Sn){if(t===0)return n;t-=1}else(e===xn||e===In)&&(t+=1)}var r=C(n);n.remove(),n=r}}var kt,Dn,Nn,Ut,jt;function We(){if(kt===void 0){kt=window,Dn=document,Nn=/Firefox/.test(navigator.userAgent);var t=Element.prototype,n=Node.prototype;Ut=xt(n,"firstChild").get,jt=xt(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function pt(t=""){return document.createTextNode(t)}function ht(t){return Ut.call(t)}function C(t){return jt.call(t)}function Xe(t,n){if(!O)return ht(t);var e=ht(b);if(e===null)e=b.appendChild(pt());else if(n&&e.nodeType!==3){var r=pt();return e==null||e.before(r),j(r),r}return j(e),e}function Je(t,n){if(!O){var e=ht(t);return e instanceof Comment&&e.data===""?C(e):e}return b}function Qe(t,n=1,e=!1){let r=O?b:t;for(var s;n--;)s=r,r=C(r);if(!O)return r;var a=r==null?void 0:r.nodeType;if(e&&a!==3){var l=pt();return r===null?s==null||s.after(l):r.before(l),j(l),l}return j(r),r}function tr(t){t.textContent=""}function Vt(t){var n=g|k,e=f!==null&&f.f&g?f:null;return _===null||e!==null&&e.f&w?n|=w:_.f|=Ct,{ctx:i,deps:null,effects:null,equals:qt,f:n,fn:t,reactions:null,rv:0,v:null,wv:0,parent:e??_}}function nr(t){const n=Vt(t);return n.equals=Ft,n}function $t(t){var n=t.effects;if(n!==null){t.effects=null;for(var e=0;e<n.length;e+=1)D(n[e])}}function Cn(t){for(var n=t.parent;n!==null;){if(!(n.f&g))return n;n=n.parent}return null}function qn(t){var n,e=_;et(Cn(t));try{$t(t),n=ln(t)}finally{et(e)}return n}function Gt(t){var n=qn(t),e=(S||t.f&w)&&t.deps!==null?N:d;m(t,e),t.equals(n)||(t.v=n,t.wv=sn())}function Kt(t){_===null&&f===null&&bn(),f!==null&&f.f&w&&_===null&&gn(),At&&wn()}function Pn(t,n){var e=n.last;e===null?n.last=n.first=t:(e.next=t,t.prev=e,n.last=t)}function H(t,n,e,r=!0){var s=(t&G)!==0,a=_,l={ctx:i,deps:null,nodes_start:null,nodes_end:null,f:t|k,first:null,fn:n,last:null,next:null,parent:s?null:a,prev:null,teardown:null,transitions:null,wv:0};if(e){var u=L;try{Rt(!0),ft(l),l.f|=En}catch(v){throw D(l),v}finally{Rt(u)}}else n!==null&&ct(l);var c=e&&l.deps===null&&l.first===null&&l.nodes_start===null&&l.teardown===null&&(l.f&(Ct|X))===0;if(!c&&!s&&r&&(a!==null&&Pn(l,a),f!==null&&f.f&g)){var o=f;(o.effects??(o.effects=[])).push(l)}return l}function er(t){const n=H(at,null,!1);return m(n,d),n.teardown=t,n}function Fn(t){Kt();var n=_!==null&&(_.f&I)!==0&&i!==null&&!i.m;if(n){var e=i;(e.e??(e.e=[])).push({fn:t,effect:_,reaction:f})}else{var r=zt(t);return r}}function rr(t){return Kt(),Tt(t)}function sr(t){const n=H(G,t,!0);return(e={})=>new Promise(r=>{e.outro?Yn(n,()=>{D(n),r(void 0)}):(D(n),r(void 0))})}function zt(t){return H(Dt,t,!1)}function ar(t,n){var e=i,r={effect:null,ran:!1};e.l.r1.push(r),r.effect=Tt(()=>{t(),!r.ran&&(r.ran=!0,mt(e.l.r2,!0),z(n))})}function lr(){var t=i;Tt(()=>{if(_t(t.l.r2)){for(var n of t.l.r1){var e=n.effect;e.f&d&&m(e,N),B(e)&&ft(e),n.ran=!1}t.l.r2.v=!1}})}function Tt(t){return H(at,t,!0)}function ur(t,n=[],e=Vt){const r=n.map(e);return Ln(()=>t(...r.map(_t)))}function Ln(t,n=0){return H(at|gt|n,t,!0)}function or(t,n=!0){return H(at|I,t,!0,n)}function Zt(t){var n=t.teardown;if(n!==null){const e=At,r=f;Ot(!0),nt(null);try{n.call(null)}finally{Ot(e),nt(r)}}}function Wt(t,n=!1){var e=t.first;for(t.first=t.last=null;e!==null;){var r=e.next;D(e,n),e=r}}function Mn(t){for(var n=t.first;n!==null;){var e=n.next;n.f&I||D(n),n=e}}function D(t,n=!0){var e=!1;if((n||t.f&yn)&&t.nodes_start!==null){for(var r=t.nodes_start,s=t.nodes_end;r!==null;){var a=r===s?null:C(r);r.remove(),r=a}e=!0}Wt(t,n&&!e),st(t,0),m(t,lt);var l=t.transitions;if(l!==null)for(const c of l)c.stop();Zt(t);var u=t.parent;u!==null&&u.first!==null&&Xt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function Xt(t){var n=t.parent,e=t.prev,r=t.next;e!==null&&(e.next=r),r!==null&&(r.prev=e),n!==null&&(n.first===t&&(n.first=r),n.last===t&&(n.last=e))}function Yn(t,n){var e=[];Jt(t,e,!0),Hn(e,()=>{D(t),n&&n()})}function Hn(t,n){var e=t.length;if(e>0){var r=()=>--e||n();for(var s of t)s.out(r)}else n()}function Jt(t,n,e){if(!(t.f&Y)){if(t.f^=Y,t.transitions!==null)for(const l of t.transitions)(l.is_global||e)&&n.push(l);for(var r=t.first;r!==null;){var s=r.next,a=(r.f&Nt)!==0||(r.f&I)!==0;Jt(r,n,a?e:!1),r=s}}}function ir(t){Qt(t,!0)}function Qt(t,n){if(t.f&Y){t.f^=Y,t.f&d||(t.f^=d),B(t)&&(m(t,k),ct(t));for(var e=t.first;e!==null;){var r=e.next,s=(e.f&Nt)!==0||(e.f&I)!==0;Qt(e,s?n:!1),e=r}if(t.transitions!==null)for(const a of t.transitions)(a.is_global||n)&&a.in()}}const Bn=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let Q=!1,tt=!1,dt=[],Et=[];function tn(){Q=!1;const t=dt.slice();dt=[],wt(t)}function nn(){tt=!1;const t=Et.slice();Et=[],wt(t)}function fr(t){Q||(Q=!0,queueMicrotask(tn)),dt.push(t)}function cr(t){tt||(tt=!0,Bn(nn)),Et.push(t)}function Un(){Q&&tn(),tt&&nn()}const en=0,jn=1;let U=!1,W=en,V=!1,$=null,L=!1,At=!1;function Rt(t){L=t}function Ot(t){At=t}let R=[],M=0;let f=null,T=!1;function nt(t){f=t}let _=null;function et(t){_=t}let A=null;function Vn(t){A=t}let E=null,y=0,x=null;function $n(t){x=t}let rn=1,rt=0,S=!1;function sn(){return++rn}function B(t){var p;var n=t.f;if(n&k)return!0;if(n&N){var e=t.deps,r=(n&w)!==0;if(e!==null){var s,a,l=(n&J)!==0,u=r&&_!==null&&!S,c=e.length;if(l||u){var o=t,v=o.parent;for(s=0;s<c;s++)a=e[s],(l||!((p=a==null?void 0:a.reactions)!=null&&p.includes(o)))&&(a.reactions??(a.reactions=[])).push(o);l&&(o.f^=J),u&&v!==null&&!(v.f&w)&&(o.f^=w)}for(s=0;s<c;s++)if(a=e[s],B(a)&&Gt(a),a.wv>t.wv)return!0}(!r||_!==null&&!S)&&m(t,d)}return!1}function Gn(t,n){for(var e=n;e!==null;){if(e.f&X)try{e.fn(t);return}catch{e.f^=X}e=e.parent}throw U=!1,t}function Kn(t){return(t.f&lt)===0&&(t.parent===null||(t.parent.f&X)===0)}function _r(){U=!1}function it(t,n,e,r){if(U){if(e===null&&(U=!1),Kn(n))throw t;return}e!==null&&(U=!0);{Gn(t,n);return}}function an(t,n,e=!0){var r=t.reactions;if(r!==null)for(var s=0;s<r.length;s++){var a=r[s];a.f&g?an(a,n,!1):n===a&&(e?m(a,k):a.f&d&&m(a,N),ct(a))}}function ln(t){var Z;var n=E,e=y,r=x,s=f,a=S,l=A,u=i,c=T,o=t.f;E=null,y=0,x=null,f=o&(I|G)?null:t,S=(o&w)!==0&&(!L||s===null||c),A=null,St(t.ctx),T=!1,rt++;try{var v=(0,t.fn)(),p=t.deps;if(E!==null){var h;if(st(t,y),p!==null&&y>0)for(p.length=y+E.length,h=0;h<E.length;h++)p[y+h]=E[h];else t.deps=p=E;if(!S)for(h=y;h<p.length;h++)((Z=p[h]).reactions??(Z.reactions=[])).push(t)}else p!==null&&y<p.length&&(st(t,y),p.length=y);if(ot()&&x!==null&&!T&&p!==null&&!(t.f&(g|N|k)))for(h=0;h<x.length;h++)an(x[h],t);return s!==null&&rt++,v}finally{E=n,y=e,x=r,f=s,S=a,A=l,St(u),T=c}}function zn(t,n){let e=n.reactions;if(e!==null){var r=pn.call(e,t);if(r!==-1){var s=e.length-1;s===0?e=n.reactions=null:(e[r]=e[s],e.pop())}}e===null&&n.f&g&&(E===null||!E.includes(n))&&(m(n,N),n.f&(w|J)||(n.f^=J),$t(n),st(n,0))}function st(t,n){var e=t.deps;if(e!==null)for(var r=n;r<e.length;r++)zn(t,e[r])}function ft(t){var n=t.f;if(!(n&lt)){m(t,d);var e=_,r=i;_=t;try{n&gt?Mn(t):Wt(t),Zt(t);var s=ln(t);t.teardown=typeof s=="function"?s:null,t.wv=rn;var a=t.deps,l}catch(u){it(u,t,e,r||t.ctx)}finally{_=e}}}function un(){if(M>1e3){M=0;try{mn()}catch(t){if($!==null)it(t,$,null);else throw t}}M++}function on(t){var n=t.length;if(n!==0){un();var e=L;L=!0;try{for(var r=0;r<n;r++){var s=t[r];s.f&d||(s.f^=d);var a=Xn(s);Zn(a)}}finally{L=e}}}function Zn(t){var n=t.length;if(n!==0)for(var e=0;e<n;e++){var r=t[e];if(!(r.f&(lt|Y)))try{B(r)&&(ft(r),r.deps===null&&r.first===null&&r.nodes_start===null&&(r.teardown===null?Xt(r):r.fn=null))}catch(s){it(s,r,null,r.ctx)}}}function Wn(){if(V=!1,M>1001)return;const t=R;R=[],on(t),V||(M=0,$=null)}function ct(t){W===en&&(V||(V=!0,queueMicrotask(Wn))),$=t;for(var n=t;n.parent!==null;){n=n.parent;var e=n.f;if(e&(G|I)){if(!(e&d))return;n.f^=d}}R.push(n)}function Xn(t){var n=[],e=t.first;t:for(;e!==null;){var r=e.f,s=(r&I)!==0,a=s&&(r&d)!==0,l=e.next;if(!a&&!(r&Y)){if(r&Dt)n.push(e);else if(s)e.f^=d;else{var u=f;try{f=e,B(e)&&ft(e)}catch(v){it(v,e,null,e.ctx)}finally{f=u}}var c=e.first;if(c!==null){e=c;continue}}if(l===null){let v=e.parent;for(;v!==null;){if(t===v)break t;var o=v.next;if(o!==null){e=o;continue t}v=v.parent}}e=l}return n}function fn(t){var n=W,e=R;try{un();const s=[];W=jn,R=s,V=!1,on(e);var r=t==null?void 0:t();return Un(),(R.length>0||s.length>0)&&fn(),M=0,$=null,r}finally{W=n,R=e}}async function vr(){await Promise.resolve(),fn()}function _t(t){var n=t.f,e=(n&g)!==0;if(f!==null&&!T){A!==null&&A.includes(t)&&Tn();var r=f.deps;t.rv<rt&&(t.rv=rt,E===null&&r!==null&&r[y]===t?y++:E===null?E=[t]:(!S||!E.includes(t))&&E.push(t))}else if(e&&t.deps===null&&t.effects===null){var s=t,a=s.parent;a!==null&&!(a.f&w)&&(s.f^=w)}return e&&(s=t,B(s)&&Gt(s)),t.v}function z(t){var n=T;try{return T=!0,t()}finally{T=n}}const Jn=-7169;function m(t,n){t.f=t.f&Jn|n}function pr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(It in t)yt(t);else if(!Array.isArray(t))for(let n in t){const e=t[n];typeof e=="object"&&e&&It in e&&yt(e)}}}function yt(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let r in t)try{yt(t[r],n)}catch{}const e=dn(t);if(e!==Object.prototype&&e!==Array.prototype&&e!==Map.prototype&&e!==Set.prototype&&e!==Date.prototype){const r=hn(e);for(let s in r){const a=r[s].get;if(a)try{a.call(t)}catch{}}}}}function cn(t,n,e){if(t==null)return n(void 0),e&&e(void 0),F;const r=z(()=>t.subscribe(n,e));return r.unsubscribe?()=>r.unsubscribe():r}const P=[];function Qn(t,n){return{subscribe:te(t,n).subscribe}}function te(t,n=F){let e=null;const r=new Set;function s(u){if(Pt(t,u)&&(t=u,e)){const c=!P.length;for(const o of r)o[1](),P.push(o,t);if(c){for(let o=0;o<P.length;o+=2)P[o][0](P[o+1]);P.length=0}}}function a(u){s(u(t))}function l(u,c=F){const o=[u,c];return r.add(o),r.size===1&&(e=n(s,a)||F),u(t),()=>{r.delete(o),r.size===0&&e&&(e(),e=null)}}return{set:s,update:a,subscribe:l}}function hr(t,n,e){const r=!Array.isArray(t),s=r?[t]:t;if(!s.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const a=n.length<2;return Qn(e,(l,u)=>{let c=!1;const o=[];let v=0,p=F;const h=()=>{if(v)return;p();const q=n(r?o[0]:o,l,u);a?l(q):p=typeof q=="function"?q:F},Z=s.map((q,vt)=>cn(q,_n=>{o[vt]=_n,v&=~(1<<vt),c&&h()},()=>{v|=1<<vt}));return c=!0,h(),function(){wt(Z),p(),c=!1}})}function dr(t){return{subscribe:t.subscribe.bind(t)}}function Er(t){let n;return cn(t,e=>n=e)(),n}function ne(t){i===null&&ut(),K&&i.l!==null?re(i).m.push(t):Fn(()=>{const n=z(t);if(typeof n=="function")return n})}function yr(t){i===null&&ut(),ne(()=>()=>z(t))}function ee(t,n,{bubbles:e=!1,cancelable:r=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:r})}function wr(){const t=i;return t===null&&ut(),(n,e,r)=>{var a;const s=(a=t.s.$$events)==null?void 0:a[n];if(s){const l=vn(s)?s.slice():[s],u=ee(n,e,r);for(const c of l)c.call(t.x,u);return!u.defaultPrevented}return!0}}function re(t){var n=t.l;return n.u??(n.u={a:[],b:[],m:[]})}export{Ie as $,_t as A,pr as B,Vt as C,ye as D,Nt as E,le as F,ue as G,In as H,bt as I,Ee as J,mt as K,xt as L,_ as M,de as N,dn as O,vn as P,er as Q,ae as R,It as S,F as T,qe as U,Rn as V,cn as W,Er as X,he as Y,fe as Z,nr as _,He as a,_r as a$,Ft as a0,Se as a1,ce as a2,K as a3,xe as a4,Ae as a5,Ve as a6,ke as a7,oe as a8,pt as a9,ve as aA,Pt as aB,Y as aC,ge as aD,On as aE,Jt as aF,Hn as aG,D as aH,we as aI,Te as aJ,be as aK,me as aL,gt as aM,En as aN,De as aO,Re as aP,Oe as aQ,yr as aR,Me as aS,Le as aT,Qn as aU,_e as aV,hn as aW,cr as aX,hr as aY,te as aZ,X as a_,ht as aa,Nn as ab,Ne as ac,Ce as ad,fn as ae,ne as af,Be as ag,vr as ah,nt as ai,et as aj,f as ak,yn as al,xn as am,C as an,We as ao,Lt as ap,Sn as aq,Mt as ar,pe as as,tr as at,se as au,sr as av,Pe as aw,Dn as ax,ze as ay,ot as az,Ln as b,St as b0,it as b1,dr as b2,wr as b3,ar as b4,lr as b5,Ue as b6,Fe as b7,je as b8,Xe as c,Ge as d,or as e,Je as f,Yn as g,O as h,b as i,Ze as j,j as k,$e as l,ir as m,zt as n,Tt as o,Ye as p,fr as q,Ke as r,Qe as s,ur as t,z as u,i as v,rr as w,Fn as x,wt as y,ie as z};
