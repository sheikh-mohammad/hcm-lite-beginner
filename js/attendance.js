function todayStr(){return new Date().toISOString().slice(0,10)}
window.todayStr=todayStr;
function checkIn(empId){
  const att=Store.att();const date=todayStr();
  if(att.some(a=>a.empId===empId&&a.date===date))return {ok:false,msg:'Already checked in'};
  const c=Store.company();
  const now=new Date();
  const [h,m]=c.start.split(':').map(Number);
  const start=new Date(now.getFullYear(),now.getMonth(),now.getDate(),h,m);
  const grace=new Date(start.getTime()+c.grace*60000);
  const status=now>grace?'late':'present';
  att.push({empId,date,checkIn:now.toTimeString().slice(0,5),checkOut:null,status});
  Store.setAtt(att);return {ok:true,status};
}
window.checkIn=checkIn;
function checkOut(empId){
  const att=Store.att();const date=todayStr();
  const r=att.find(a=>a.empId===empId&&a.date===date);
  if(!r||!r.checkIn)return {ok:false,msg:'Check in first'};
  if(r.checkOut)return {ok:false,msg:'Already checked out'};
  const now=new Date();
  r.checkOut=now.toTimeString().slice(0,5);
  const [ih,im]=r.checkIn.split(':').map(Number);
  const [oh,om]=r.checkOut.split(':').map(Number);
  const hours=(oh*60+om-(ih*60+im))/60;
  if(hours<5)r.status='half';
  Store.setAtt(att);return {ok:true,status:r.status,hours};
}
window.checkOut=checkOut;
function absentFill(){
  const c=Store.company();const att=Store.att();const date=todayStr();
  const day=new Date().getDay();if(!c.workingDays.includes(day))return;
  employees().forEach(e=>{
    if(!att.some(a=>a.empId===e.id&&a.date===date))att.push({empId:e.id,date,checkIn:null,checkOut:null,status:'absent'});
  });
  Store.setAtt(att);
}
window.absentFill=absentFill;
function myAttendance(empId){return Store.att().filter(a=>a.empId===empId).sort((a,b)=>b.date.localeCompare(a.date))}
window.myAttendance=myAttendance;
`