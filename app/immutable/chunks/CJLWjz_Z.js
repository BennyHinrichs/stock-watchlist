import{S as E,F as Z,G as V,I as w,J as z,A as b,U as v,K as P,L as O,M as F,N as J,O as Q,P as W,Q as X,R as H,T,V as $,W as k,X as ee,Y as re,Z as ne,C as Y,_ as ie,$ as C,a0 as ue,u as j,a1 as te,a2 as G,a3 as se,a4 as fe,a5 as ae,a6 as q,a7 as le,a8 as N}from"./t5H24eYX.js";function m(e,r=null,u){if(typeof e!="object"||e===null||E in e)return e;const i=Q(e);if(i!==Z&&i!==V)return e;var t=new Map,d=W(e),g=w(0);d&&t.set("length",w(e.length));var h;return new Proxy(e,{defineProperty(l,n,s){(!("value"in s)||s.configurable===!1||s.enumerable===!1||s.writable===!1)&&J();var a=t.get(n);return a===void 0?(a=w(s.value),t.set(n,a)):P(a,m(s.value,h)),!0},deleteProperty(l,n){var s=t.get(n);if(s===void 0)n in l&&t.set(n,w(v));else{if(d&&typeof n=="string"){var a=t.get("length"),f=Number(n);Number.isInteger(f)&&f<a.v&&P(a,f)}P(s,v),B(g)}return!0},get(l,n,s){var _;if(n===E)return e;var a=t.get(n),f=n in l;if(a===void 0&&(!f||(_=O(l,n))!=null&&_.writable)&&(a=w(m(f?l[n]:v,h)),t.set(n,a)),a!==void 0){var o=b(a);return o===v?void 0:o}return Reflect.get(l,n,s)},getOwnPropertyDescriptor(l,n){var s=Reflect.getOwnPropertyDescriptor(l,n);if(s&&"value"in s){var a=t.get(n);a&&(s.value=b(a))}else if(s===void 0){var f=t.get(n),o=f==null?void 0:f.v;if(f!==void 0&&o!==v)return{enumerable:!0,configurable:!0,value:o,writable:!0}}return s},has(l,n){var o;if(n===E)return!0;var s=t.get(n),a=s!==void 0&&s.v!==v||Reflect.has(l,n);if(s!==void 0||F!==null&&(!a||(o=O(l,n))!=null&&o.writable)){s===void 0&&(s=w(a?m(l[n],h):v),t.set(n,s));var f=b(s);if(f===v)return!1}return a},set(l,n,s,a){var x;var f=t.get(n),o=n in l;if(d&&n==="length")for(var _=s;_<f.v;_+=1){var y=t.get(_+"");y!==void 0?P(y,v):_ in l&&(y=w(v),t.set(_+"",y))}f===void 0?(!o||(x=O(l,n))!=null&&x.writable)&&(f=w(void 0),P(f,m(s,h)),t.set(n,f)):(o=f.v!==v,P(f,m(s,h)));var p=Reflect.getOwnPropertyDescriptor(l,n);if(p!=null&&p.set&&p.set.call(a,s),!o){if(d&&typeof n=="string"){var R=t.get("length"),S=Number(n);Number.isInteger(S)&&S>=R.v&&P(R,S+1)}B(g)}return!0},ownKeys(l){b(g);var n=Reflect.ownKeys(l).filter(f=>{var o=t.get(f);return o===void 0||o.v!==v});for(var[s,a]of t)a.v!==v&&!(s in l)&&n.push(s);return n},setPrototypeOf(){z()}})}function B(e,r=1){P(e,e.v+r)}let A=!1,U=Symbol();function be(e,r,u){const i=u[r]??(u[r]={store:null,source:$(void 0),unsubscribe:T});if(i.store!==e&&!(U in u))if(i.unsubscribe(),i.store=e??null,e==null)i.source.v=void 0,i.unsubscribe=T;else{var t=!0;i.unsubscribe=k(e,d=>{t?i.source.v=d:P(i.source,d)}),t=!1}return e&&U in u?ee(e):b(i.source)}function Pe(e,r,u){let i=u[r];return i&&i.store!==e&&(i.unsubscribe(),i.unsubscribe=T),e}function we(e,r){return e.set(r),r}function ge(){const e={};function r(){X(()=>{for(var u in e)e[u].unsubscribe();H(e,U,{enumerable:!1,value:!0})})}return[e,r]}function he(e,r,u){return e.set(u),r}function oe(e){var r=A;try{return A=!1,[e(),A]}finally{A=r}}const ce={get(e,r){if(!e.exclude.includes(r))return e.props[r]},set(e,r){return!1},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function ye(e,r,u){return new Proxy({props:e,exclude:r},ce)}const de={get(e,r){if(!e.exclude.includes(r))return b(e.version),r in e.special?e.special[r]():e.props[r]},set(e,r,u){return r in e.special||(e.special[r]=_e({get[r](){return e.props[r]}},r,C)),e.special[r](u),q(e.version),!0},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},deleteProperty(e,r){return e.exclude.includes(r)||(e.exclude.push(r),q(e.version)),!0},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function xe(e,r){return new Proxy({props:e,exclude:r,special:{},version:w(0)},de)}const ve={get(e,r){let u=e.props.length;for(;u--;){let i=e.props[u];if(N(i)&&(i=i()),typeof i=="object"&&i!==null&&r in i)return i[r]}},set(e,r,u){let i=e.props.length;for(;i--;){let t=e.props[i];N(t)&&(t=t());const d=O(t,r);if(d&&d.set)return d.set(u),!0}return!1},getOwnPropertyDescriptor(e,r){let u=e.props.length;for(;u--;){let i=e.props[u];if(N(i)&&(i=i()),typeof i=="object"&&i!==null&&r in i){const t=O(i,r);return t&&!t.configurable&&(t.configurable=!0),t}}},has(e,r){if(r===E||r===G)return!1;for(let u of e.props)if(N(u)&&(u=u()),u!=null&&r in u)return!0;return!1},ownKeys(e){const r=[];for(let u of e.props){N(u)&&(u=u());for(const i in u)r.includes(i)||r.push(i)}return r}};function Ie(...e){return new Proxy({props:e},ve)}function _e(e,r,u,i){var M;var t=(u&ae)!==0,d=!se||(u&fe)!==0,g=(u&te)!==0,h=(u&le)!==0,l=!1,n;g?[n,l]=oe(()=>e[r]):n=e[r];var s=E in e||G in e,a=g&&(((M=O(e,r))==null?void 0:M.set)??(s&&r in e&&(c=>e[r]=c)))||void 0,f=i,o=!0,_=!1,y=()=>(_=!0,o&&(o=!1,h?f=j(i):f=i),f);n===void 0&&i!==void 0&&(a&&d&&re(),n=y(),a&&a(n));var p;if(d)p=()=>{var c=e[r];return c===void 0?y():(o=!0,_=!1,c)};else{var R=(t?Y:ie)(()=>e[r]);R.f|=ne,p=()=>{var c=b(R);return c!==void 0&&(f=void 0),c===void 0?f:c}}if(!(u&C))return p;if(a){var S=e.$$legacy;return function(c,I){return arguments.length>0?((!d||!I||S||l)&&a(I?p():c),c):p()}}var x=!1,L=$(n),D=Y(()=>{var c=p(),I=b(L);return x?(x=!1,I):L.v=c});return t||(D.equals=ue),function(c,I){if(arguments.length>0){const K=I?b(D):d&&g?m(c):c;return D.equals(K)||(x=!0,P(L,K),_&&f!==void 0&&(f=K),j(()=>b(D))),c}return b(D)}}export{m as a,be as b,Ie as c,he as d,we as e,Pe as f,xe as l,_e as p,ye as r,ge as s};
