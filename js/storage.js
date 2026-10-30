const KEYS={company:'hcm_company',users:'hcm_users',att:'hcm_attendance',leaves:'hcm_leaves',session:'hcm_session',ann:'hcm_ann'};
function get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}}
function set(k,v){localStorage.setItem(k,JSON.stringify(v))}
const Store={
  company:()=>get(KEYS.company),
  setCompany:v=>set(KEYS.company,v),
  users:()=>get(KEYS.users)||[],
  setUsers:v=>set(KEYS.users,v),
  att:()=>get(KEYS.att)||[],
  setAtt:v=>set(KEYS.att,v),
  leaves:()=>get(KEYS.leaves)||[],
  setLeaves:v=>set(KEYS.leaves,v),
  session:()=>get(KEYS.session),
  setSession:v=>set(KEYS.session,v),
  clearSession:()=>localStorage.removeItem(KEYS.session),
  ann:()=>get(KEYS.ann)||[],
  setAnn:v=>set(KEYS.ann,v)
};
window.Store=Store;
function uid(){return Date.now()+Math.floor(Math.random()*1000)}
window.uid=uid;
function currentUser(){const s=Store.session();if(!s)return null;return Store.users().find(u=>u.id===s.id)||null}
window.currentUser=currentUser;
function requireRole(role){const u=currentUser();if(!u||u.role!==role){location.href='../index.html';return null}return u}
window.requireRole=requireRole;
function logout(){Store.clearSession();location.href='../index.html'}
window.logout=logout;
function workingDaysInMonth(y,m){const d=new Date(y,m+1,0).getDate();let c=0;for(let i=1;i<=d;i++){const day=new Date(y,m,i).getDay();if(day!==0&&day!==6)c++}return c}
window.workingDaysInMonth=workingDaysInMonth;
`