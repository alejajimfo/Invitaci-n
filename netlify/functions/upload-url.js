const {auth,res}=require('./_lib'),E=process.env;
// Crea una sesión de subida directa a Drive: el archivo va del navegador a Drive, sin pasar por Netlify (límite 6 MB).
exports.handler=async e=>{
  try{
    const {name,type}=JSON.parse(e.body||'{}');
    const {token}=await auth.getAccessToken();
    const r=await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable',{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json; charset=UTF-8','X-Upload-Content-Type':type,Origin:e.headers.origin||`https://${e.headers.host}`},body:JSON.stringify({name:String(name).replace(/[\\/]/g,'-'),parents:[E.DRIVE_FOLDER_ID]})});
    const url=r.headers.get('location');
    return url?res({url}):res({error:'Drive no respondió'},502);
  }catch(x){console.error(x);return res({error:'Error'},500)}
};
