//"use strict";
var conn = await $.hdb.getConnection();
var query = 'SELECT "KUNNR", "MATNR", "KUNNR_EU", "NAME1_EU", "MAKTX", "NAME1", "COUNT", "LAST_MODIFIED_USER", "LAST_MODIFIED_TIMESTAMP" FROM "end_user" ORDER BY "MATNR"';
var rs = await conn.executeQuery(query);
$.response.contentType = "application/json";
var body = "";
body = $.response.setBody(JSON.stringify(rs));
$.response.status = $.net.http.OK;
await conn.close();
export default {conn,query,rs};

