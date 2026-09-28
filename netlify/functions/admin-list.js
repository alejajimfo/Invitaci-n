const {sheets,res,isAdmin}=require('./_lib');
exports.handler=async e=>{
  if(!isAdmin(e))return res({error:'No autorizado'},401);
  const {data}=await sheets.spreadsheets.values.get({spreadsheetId:process.env.SHEET_ID,range:'Respuestas!A2:K'});
  return res((data.values||[]).map((v,i)=>({row:i+2,fecha:v[0],nombre:v[1],apellidos:v[2],email:v[3],telefono:v[4],asiste:v[5],acomp:v[6],estado:v[10]||'Pendiente'})));
};
