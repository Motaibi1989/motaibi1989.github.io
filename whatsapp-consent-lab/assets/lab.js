// WhatsApp Consent Lab - fake data demo only
const WACL_KEY='wacl_split_demo_v1';
const WACL_SETTINGS_KEY='wacl_split_settings_v1';
function waclId(){return 'demo_'+Math.random().toString(16).slice(2)+Date.now();}
function waclNow(){return new Date().toISOString();}
function waclCleanPhone(v){return String(v||'').replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[^0-9]/g,'');}
function waclMask(p){p=waclCleanPhone(p);return p.length>6?p.slice(0,5)+'****'+p.slice(-2):p;}
function waclEsc(s){return String(s||'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}
function waclPin(){return String(Math.floor(100000+Math.random()*900000));}
function waclLabel(v){return {Pending:'بانتظار المراجعة',Approved:'موافق عليه',Rejected:'مرفوض',Cancelled:'ملغي',Add:'إضافة',Update:'تعديل',Delete:'حذف',Hide:'إخفاء',Verified:'Verified',NotVerified:'Not Verified'}[v]||v;}
function waclLoad(){try{return JSON.parse(localStorage.getItem(WACL_KEY))||waclSeed()}catch{return waclSeed();}}
function waclSave(data){localStorage.setItem(WACL_KEY,JSON.stringify(data));}
function waclSettings(){try{return JSON.parse(localStorage.getItem(WACL_SETTINGS_KEY))||{requirePin:true,autoApprove:false,allowSharing:true}}catch{return {requirePin:true,autoApprove:false,allowSharing:true};}}
function waclSaveSettings(s){localStorage.setItem(WACL_SETTINGS_KEY,JSON.stringify(s));}
function waclSeed(){const data={users:[{id:waclId(),name:'مستخدم وهمي A',phone:'966500000001',verified:true,pin:'123456',shareCount:3,createdAt:waclNow(),lastSeen:waclNow()},{id:waclId(),name:'مستخدم وهمي B',phone:'966500000002',verified:false,pin:'654321',shareCount:1,createdAt:waclNow(),lastSeen:waclNow()}],requests:[]};data.requests.push({id:waclId(),userId:data.users[0].id,type:'Add',details:'طلب إضافة تجريبي بدون بيانات حقيقية.',status:'Pending',createdAt:waclNow(),reviewedAt:null});waclSave(data);return data;}
function waclFindUser(id){return waclLoad().users.find(u=>u.id===id)||null;}
function waclProfileUrl(id){return location.origin+location.pathname.replace(/(admin|user|index)\.html$/,'')+'user.html?uid='+encodeURIComponent(id);}
function waclQrUrl(url){return 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data='+encodeURIComponent(url);}
function waclUpsertUser({name,phone}){const data=waclLoad();phone=waclCleanPhone(phone);let user=data.users.find(u=>u.phone===phone);if(!user){user={id:waclId(),name:name||'مستخدم وهمي',phone,verified:false,pin:waclPin(),shareCount:0,createdAt:waclNow(),lastSeen:waclNow()};data.users.unshift(user);}else{user.name=name||user.name;user.pin=waclPin();user.lastSeen=waclNow();}waclSave(data);return user;}
function waclVerifyUser(userId,pin){const data=waclLoad();const u=data.users.find(x=>x.id===userId);if(!u)return false;if(String(u.pin)===String(pin)){u.verified=true;u.lastSeen=waclNow();waclSave(data);return true;}return false;}
function waclAddRequest(userId,type,details){const data=waclLoad();const settings=waclSettings();const req={id:waclId(),userId,type,details:details||'',status:settings.autoApprove?'Approved':'Pending',createdAt:waclNow(),reviewedAt:settings.autoApprove?waclNow():null};data.requests.unshift(req);const u=data.users.find(x=>x.id===userId);if(u)u.lastSeen=waclNow();waclSave(data);return req;}
function waclSetRequestStatus(requestId,status){const data=waclLoad();const r=data.requests.find(x=>x.id===requestId);if(r){r.status=status;r.reviewedAt=waclNow();}waclSave(data);return r;}
function waclIncrementShare(userId){const data=waclLoad();const u=data.users.find(x=>x.id===userId);if(u){u.shareCount=(u.shareCount||0)+1;u.lastSeen=waclNow();}waclSave(data);return u;}
function waclStats(){const data=waclLoad();return {users:data.users.length,verified:data.users.filter(u=>u.verified).length,notVerified:data.users.filter(u=>!u.verified).length,pending:data.requests.filter(r=>r.status==='Pending').length,shares:data.users.reduce((a,u)=>a+(u.shareCount||0),0),requests:data.requests.length};}
function waclUserRequests(userId){return waclLoad().requests.filter(r=>r.userId===userId);}
function waclReset(){localStorage.removeItem(WACL_KEY);localStorage.removeItem(WACL_SETTINGS_KEY);waclSeed();}
