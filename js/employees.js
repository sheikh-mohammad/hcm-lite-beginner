function addEmployee({name,email,password,department,salary}){
  const users=Store.users();
  if(users.some(u=>u.email===email))return {ok:false,msg:'Email already used'};
  const e={id:uid(),name,email,password,role:'employee',department,salary:Number(salary)};
  users.push(e);Store.setUsers(users);return {ok:true};
}
window.addEmployee=addEmployee;
function editEmployee(id,patch){const users=Store.users();const i=users.findIndex(u=>u.id===id);if(i>-1){Object.assign(users[i],patch);Store.setUsers(users)}}
window.editEmployee=editEmployee;
function deleteEmployee(id){let users=Store.users().filter(u=>u.id!==id);Store.setUsers(users);let att=Store.att().filter(a=>a.empId!==id);Store.setAtt(att);let leaves=Store.leaves().filter(l=>l.empId!==id);Store.setLeaves(leaves)}
window.deleteEmployee=deleteEmployee;
function employees(){return Store.users().filter(u=>u.role==='employee')}
window.employees=employees;
`