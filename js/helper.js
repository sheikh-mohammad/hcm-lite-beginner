function helperAnswer(q,user){
  const low=q.toLowerCase();const isAdmin=user.role==='admin';
  if(low.includes('employee')&&low.includes('how many'))return `We have ${employees().length} employees.`;
  if(low.includes('leave')&&low.includes('today')){
    const today=todayStr();const onLeave=Store.leaves().filter(l=>l.status==='approved'&&l.from<=today&&l.to>=today);
    return `${onLeave.length} employees on leave today.`;
  }
  if(low.includes('late')&&low.includes('today')){
    const late=Store.att().filter(a=>a.date===todayStr()&&a.status==='late');
    return `${late.length} were late today.`;
  }
  if(low.includes('leave')&&low.includes('left'))return `You have ${leaveBalance(user.id)} leave days left.`;
  if(low.includes('late')&&low.includes('today')&&user.role==='employee'){
    const r=Store.att().find(a=>a.empId===user.id&&a.date===todayStr());
    return r?`You were ${r.status} today.`:'No record today.';
  }
  if(low.includes('hours')&&low.includes('week')){
    const recs=myAttendance(user.id).slice(0,7);
    const h=recs.reduce((s,r)=>{if(!r.checkIn||!r.checkOut)return s;const [ih,im]=r.checkIn.split(':').map(Number);const [oh,om]=r.checkOut.split(':').map(Number);return s+(oh*60+om-ih*60-im)/60},0);
    return `You worked ${h.toFixed(1)} hours this week.`;
  }
  return 'I can answer about employees, leave, attendance.';
}
window.helperAnswer=helperAnswer;
function mountChat(user){
  const div=document.createElement('div');div.className='chat';
  div.innerHTML='<header>Smart Helper</header><div class="chat body" id="chatbody"></div><input id="chatin" placeholder="Ask...">';
  document.body.appendChild(div);
  document.getElementById('chatin').addEventListener('keydown',e=>{
    if(e.key==='Enter'){const q=e.target.value;e.target.value='';const body=document.getElementById('chatbody');
    body.innerHTML+=`<div class="msg user">${q}</div>`;body.innerHTML+=`<div class="msg">${helperAnswer(q,user)}</div>`;body.scrollTop=body.scrollHeight;}
  });
}
window.mountChat=mountChat;
`