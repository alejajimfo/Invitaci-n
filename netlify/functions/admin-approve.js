const {sheets,res,isAdmin}=require('./_lib');
exports.handler=async e=>{
  if(!isAdmin(e))return res({error:'No autorizado'},401);
  const {row}=JSON.parse(e.body||'{}');
  await sheets.spreadsheets.values.update({spreadsheetId:process.env.SHEET_ID,range:`Respuestas!K${Number(row)}`,valueInputOption:'RAW',requestBody:{values:[['Aprobado']]}});
  return res({ok:true});
};
