const {sheets,res}=require('./_lib'),nodemailer=require('nodemailer'),E=process.env;
exports.handler=async e=>{
  try{
    const b=JSON.parse(e.body||'{}');
    if(!b.nombre||!b.apellidos||!b.telefono)return res({error:'Faltan campos obligatorios'},400);
    const row=[new Date().toLocaleString('es-CO',{timeZone:'America/Bogota'}),b.nombre,b.apellidos,b.email,b.telefono,b.asiste,b.acompanantes||0,b.nombreAcomp||'',b.restricciones||'',b.mensaje||'','Pendiente'];
    await sheets.spreadsheets.values.append({spreadsheetId:E.SHEET_ID,range:'Respuestas!A:K',valueInputOption:'USER_ENTERED',requestBody:{values:[row]}});
    if(E.SMTP_USER){try{await nodemailer.createTransport({service:'gmail',auth:{user:E.SMTP_USER,pass:E.SMTP_PASS}}).sendMail({from:E.SMTP_USER,to:E.NOTIFY_EMAIL||E.SMTP_USER,subject:`Nueva confirmación: ${b.nombre} ${b.apellidos}`,text:`${b.nombre} ${b.apellidos}\nAsiste: ${b.asiste}\nAcompañantes: ${b.acompanantes||0}\nWhatsApp: ${b.telefono}\n\nRevisa: ${E.URL||''}/admin`})}catch(x){console.error(x)}}
    return res({ok:true});
  }catch(x){console.error(x);return res({error:'No pudimos guardar tu respuesta. Intenta de nuevo.'},500)}
};
