//"use strict";
var conn = await $.hdb.getConnection();
var query = 'SELECT Top 1000 "KUNNR", "MATNR", "MAKTX", "NAME1" FROM "SD_ENDUSER" ORDER BY "VBELN"';
//var query = 'SELECT "VBELN", KUNNR", "MATNR", "KUNNR_EU", "NAME1_EU", "MAKTX", "NAME1", "COUNT", "LAST_MODIFIED_USER",  ADD_SECONDS("LAST_MODIFIED_TIMESTAMP", -18000) AS "LAST_MODIFIED_TIMESTAMP" FROM "SD" ORDER BY "VBELN"';
var rs = await conn.executeQuery(query);
$.response.contentType = "application/json";
var body = "";
body = $.response.setBody(JSON.stringify(rs));
$.response.status = $.net.http.OK;
await conn.close();
export default {conn,query,rs};

