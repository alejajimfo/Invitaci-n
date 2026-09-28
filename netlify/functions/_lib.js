const {google}=require('googleapis');const E=process.env;
const auth=new google.auth.OAuth2(E.GOOGLE_CLIENT_ID,E.GOOGLE_CLIENT_SECRET);
auth.setCredentials({refresh_token:E.GOOGLE_REFRESH_TOKEN});
exports.auth=auth;exports.sheets=google.sheets({version:'v4',auth});
exports.res=(b,s=200)=>({statusCode:s,headers:{'Content-Type':'application/json'},body:JSON.stringify(b)});
exports.isAdmin=e=>!!E.ADMIN_PASSWORD&&e.headers['x-admin-password']===E.ADMIN_PASSWORD;
