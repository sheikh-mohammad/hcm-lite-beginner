function countWorkingDays(from,to){
  let c=0;const d=new Date(from);const end=new Date(to);
  while(d<=end){const day=d.getDay();if(day!==0&&day!==6)c++;d.setDate(d.getDate()+1)}return c;
}
window.countWorkingDays=countWorkingDays;
function applyLeave(empId,type,from,to,reason){
  if(new Date(from)>new Date(to))return {ok:false,msg:'From must be on or before To'};
  const leaves=Store.leaves();
  const overlap=leaves.some(l=>l.empId===empId&&l.status!=='rejected'&&(from<=l.to&&to>=l.from));
  if(overlap)return {ok:false,msg:'Overlaps another leave'};
  const days=countWorkingDays(from,to);
  const c=Store.company();
  const used=leaves.filter(l=>l.empId===empId&&l.status==='approved').reduce((s,l)=>s+l.days,0);
  if(used+days>c.quota)return {ok:false,msg:'Exceeds quota'};
  leaves.push({id:uid(),empId,type,from,to,days,reason,status:'pending',comment:''});
  Store.setLeaves(leaves);return {ok:true};
}
window.applyLeave=applyLeave;
function approveLeave(id,comment=''){const leaves=Store.leaves();const l=leaves.find(x=>x.id===id);if(l){l.status='approved';l.comment=comment;Store.setLeaves(leaves)}}
window.approveLeave=approveLeave;
function rejectLeave(id,comment=''){const leaves=Store.leaves();const l=leaves.find(x=>x.id===id);if(l){l.status='rejected';l.comment=comment;Store.setLeaves(leaves)}}
window.rejectLeave=rejectLeave;
function leaveBalance(empId){const c=Store.company();const used=Store.leaves().filter(l=>l.empId===empId&&l.status==='approved').reduce((s,l)=>s+l.days,0);return c.quota-used}
window.leaveBalance=leaveBalance;
`