function setupCompany(name,adminName,email,password){
  const company={name,start:'09:00',grace:15,quota:12,workingDays:[1,2,3,4,5]};
  Store.setCompany(company);
  const users=[{id:uid(),name:adminName,email,password,role:'admin',department:'HR',salary:0}];
  Store.setUsers(users);
  Store.setSession({id:users[0].id});
}
window.setupCompany=setupCompany;
function login(email,password){
  const u=Store.users().find(x=>x.email===email&&x.password===password);
  if(!u)return false;Store.setSession({id:u.id});return true;
}
window.login=login;
function changePassword(userId,newPw){const users=Store.users();const u=users.find(x=>x.id===userId);if(u){u.password=newPw;Store.setUsers(users)}}
window.changePassword=changePassword;
`