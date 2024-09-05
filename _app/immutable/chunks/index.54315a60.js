var S=Object.defineProperty;var C=(e,t,n)=>t in e?S(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var p=(e,t,n)=>(C(e,typeof t!="symbol"?t+"":t,n),n);import{r as m,n as y,h as w,i as T,j as N,k as j,l as b,m as B,p as D,q as E,v as H,w as I,x as L}from"./scheduler.63274e7e.js";let $=!1;function O(){$=!0}function P(){$=!1}function q(e,t,n,i){for(;e<t;){const r=e+(t-e>>1);n(r)<=i?e=r+1:t=r}return e}function M(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const s=[];for(let l=0;l<t.length;l++){const o=t[l];o.claim_order!==void 0&&s.push(o)}t=s}const n=new Int32Array(t.length+1),i=new Int32Array(t.length);n[0]=-1;let r=0;for(let s=0;s<t.length;s++){const l=t[s].claim_order,o=(r>0&&t[n[r]].claim_order<=l?r+1:q(1,r,d=>t[n[d]].claim_order,l))-1;i[s]=n[o]+1;const u=o+1;n[u]=s,r=Math.max(u,r)}const f=[],a=[];let c=t.length-1;for(let s=n[r]+1;s!=0;s=i[s-1]){for(f.push(t[s-1]);c>=s;c--)a.push(t[c]);c--}for(;c>=0;c--)a.push(t[c]);f.reverse(),a.sort((s,l)=>s.claim_order-l.claim_order);for(let s=0,l=0;s<a.length;s++){for(;l<f.length&&a[s].claim_order>=f[l].claim_order;)l++;const o=l<f.length?f[l]:null;e.insertBefore(a[s],o)}}function R(e,t){if($){for(M(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function ee(e,t,n){$&&!n?R(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function z(e){e.parentNode&&e.parentNode.removeChild(e)}function te(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function U(e){return document.createElement(e)}function x(e){return document.createTextNode(e)}function ne(){return x(" ")}function ie(){return x("")}function re(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function se(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function le(e){return e.dataset.svelteH}function ae(e,t,n){const i=new Set;for(let r=0;r<e.length;r+=1)e[r].checked&&i.add(e[r].__value);return n||i.delete(t),Array.from(i)}function fe(e){let t;return{p(...n){t=n,t.forEach(i=>e.push(i))},r(){t.forEach(n=>e.splice(e.indexOf(n),1))}}}function V(e){return Array.from(e.childNodes)}function W(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function A(e,t,n,i,r=!1){W(e);const f=(()=>{for(let a=e.claim_info.last_index;a<e.length;a++){const c=e[a];if(t(c)){const s=n(c);return s===void 0?e.splice(a,1):e[a]=s,r||(e.claim_info.last_index=a),c}}for(let a=e.claim_info.last_index-1;a>=0;a--){const c=e[a];if(t(c)){const s=n(c);return s===void 0?e.splice(a,1):e[a]=s,r?s===void 0&&e.claim_info.last_index--:e.claim_info.last_index=a,c}}return i()})();return f.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,f}function F(e,t,n,i){return A(e,r=>r.nodeName===t,r=>{const f=[];for(let a=0;a<r.attributes.length;a++){const c=r.attributes[a];n[c.name]||f.push(c.name)}f.forEach(a=>r.removeAttribute(a))},()=>i(t))}function ce(e,t,n){return F(e,t,n,U)}function G(e,t){return A(e,n=>n.nodeType===3,n=>{const i=""+t;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>x(t),!0)}function ue(e){return G(e," ")}function oe(e,t){t=""+t,e.data!==t&&(e.data=t)}function _e(e,t){e.value=t??""}function de(e,t,n,i){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,i?"important":"")}function he(e,t){const n=[];let i=0;for(const r of t.childNodes)if(r.nodeType===8){const f=r.textContent.trim();f===`HEAD_${e}_END`?(i-=1,n.push(r)):f===`HEAD_${e}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function me(e,t){return new e(t)}const h=new Set;let _;function $e(){_={r:0,c:[],p:_}}function pe(){_.r||m(_.c),_=_.p}function J(e,t){e&&e.i&&(h.delete(e),e.i(t))}function ye(e,t,n,i){if(e&&e.o){if(h.has(e))return;h.add(e),_.c.push(()=>{h.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function xe(e){e&&e.c()}function ve(e,t){e&&e.l(t)}function K(e,t,n){const{fragment:i,after_update:r}=e.$$;i&&i.m(t,n),b(()=>{const f=e.$$.on_mount.map(H).filter(N);e.$$.on_destroy?e.$$.on_destroy.push(...f):m(f),e.$$.on_mount=[]}),r.forEach(b)}function Q(e,t){const n=e.$$;n.fragment!==null&&(B(n.after_update),m(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function X(e,t){e.$$.dirty[0]===-1&&(I.push(e),L(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ge(e,t,n,i,r,f,a=null,c=[-1]){const s=D;E(e);const l=e.$$={fragment:null,ctx:[],props:f,update:y,not_equal:r,bound:w(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(s?s.$$.context:[])),callbacks:w(),dirty:c,skip_bound:!1,root:t.target||s.$$.root};a&&a(l.root);let o=!1;if(l.ctx=n?n(e,t.props||{},(u,d,...v)=>{const g=v.length?v[0]:d;return l.ctx&&r(l.ctx[u],l.ctx[u]=g)&&(!l.skip_bound&&l.bound[u]&&l.bound[u](g),o&&X(e,u)),d}):[],l.update(),o=!0,m(l.before_update),l.fragment=i?i(l.ctx):!1,t.target){if(t.hydrate){O();const u=V(t.target);l.fragment&&l.fragment.l(u),u.forEach(z)}else l.fragment&&l.fragment.c();t.intro&&J(e.$$.fragment),K(e,t.target,t.anchor),P(),T()}E(s)}class we{constructor(){p(this,"$$");p(this,"$$set")}$destroy(){Q(this,1),this.$destroy=y}$on(t,n){if(!N(n))return y;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(t){this.$$set&&!j(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Y="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Y);export{_e as A,re as B,te as C,fe as D,ae as E,we as S,ee as a,pe as b,ue as c,J as d,ie as e,z as f,U as g,ce as h,ge as i,V as j,se as k,de as l,x as m,G as n,oe as o,$e as p,me as q,xe as r,ne as s,ye as t,ve as u,K as v,Q as w,R as x,he as y,le as z};
