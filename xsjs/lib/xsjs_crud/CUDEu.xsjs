var data = $.request.body.asString();
data = JSON.parse(data);

$.response.contentType = "application/json";

try {
	var conn = await $.db.getConnection();

	var aCmd = $.request.parameters.get("cmd");
	switch (aCmd) {
	case "insertupdate":
		await insertUpdateEu(data);
		break;
	case "delete":
		await deleteEu(data);
		break;
	case "validate":
		await validateEu(data);
		break;
	case "Validate_SD":
		await Validate_SD(data);
		break;
	default:
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		await $.response.setBody("Invalid Request Method");
	}

	// Commit the transaction
	await conn.commit();

} catch (error) {
	// Handle errors appropriately
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(JSON.stringify({
		error: error.message
	}));
} finally {
	// Close the connection in the 'finally' block to ensure it's closed even if an error occurs
	if (conn) {
		await conn.close();
	}
}

async function insertUpdateEu(data) {
	// Use parameterized queries to prevent SQL injection
	var query = 'UPSERT "end_user" VALUES(?,?,?,?,?,?,?,?,?) WHERE "MATNR" = ?';
	var pstmt = await conn.prepareStatement(query);

	pstmt.setString(1, data.MATNR);
	if (data.KUNNR != "") {
		pstmt.setString(2, data.KUNNR);
	};
	if (data.KUNNR_EU != "") {
		pstmt.setString(3, data.KUNNR_EU);
	};
	if (data.NAME1_EU != "") {
		pstmt.setString(4, data.NAME1_EU);
	};
	if (data.MAKTX != "") {
		pstmt.setString(5, data.MAKTX);
	};
	if (data.NAME1 != "") {
		pstmt.setString(6, data.NAME1);
	};
	if (data.COUNT != "") {
		pstmt.setString(7, data.COUNT);
	};
	if (data.LAST_MODIFIED_USER != "") {
		pstmt.setString(8, data.LAST_MODIFIED_USER);
	};
	if (data.LAST_MODIFIED_TIMESTAMP != "") {
		pstmt.setString(9, data.LAST_MODIFIED_TIMESTAMP);
	};
	pstmt.setString(10, data.MATNR);

	// Execute the prepared statement
	await pstmt.execute();
	$.response.status = $.net.http.OK;
	$.response.setBody(JSON.stringify({
		success: true
	}));
}

async function deleteEu(data) {
	var query = 'DELETE FROM "end_user" WHERE "MATNR" = ?';
	var pstmt = await conn.prepareStatement(query);

	pstmt.setString(1, data.MATNR);

	await pstmt.execute();
	$.response.status = $.net.http.OK;
	$.response.setBody(JSON.stringify({
		success: true
	}));

	var query2 = 'DELETE FROM "SD" WHERE "MATNR" = ?';
	var pstmt2 = await conn.prepareStatement(query2);

	pstmt2.setString(1, data.MATNR);

	await pstmt2.execute();
	$.response.status = $.net.http.OK;
	$.response.setBody(JSON.stringify({
		success: true
	}));

}

async function validateEu(data) {
	var query = 'UPSERT "SD" VALUES(?,?,?,?,?,?,?,?,?) WHERE "MATNR" = ?';
	var pstmt = await conn.prepareStatement(query);
	pstmt.setString(1, data.MATNR);
	pstmt.setString(2, data.KUNNR);
	if (data.KUNNR_EU != "") {
		pstmt.setString(3, data.KUNNR_EU);
	};
	if (data.NAME1_EU != "") {
		pstmt.setString(4, data.NAME1_EU);
	};
	if (data.MAKTX != "") {
		pstmt.setString(5, data.MAKTX);
	};
	if (data.NAME1 != "") {
		pstmt.setString(6, data.NAME1);
	};
	if (data.COUNT != "") {
		pstmt.setString(7, data.COUNT);
	};
	if (data.LAST_MODIFIED_USER != "") {
		pstmt.setString(8, data.LAST_MODIFIED_USER);
	};
	if (data.LAST_MODIFIED_TIMESTAMP != "") {
		pstmt.setString(9, data.LAST_MODIFIED_TIMESTAMP);
	};
	pstmt.setString(10, data.MATNR);

	// Execute the prepared statement
	await pstmt.execute();
	$.response.status = $.net.http.OK;
	$.response.setBody(JSON.stringify({
		success: true
	}));
}

async function Validate_SD(data) {
/*	
	var query = 'SELECT "MATNR" FROM "SD" WHERE "MATNR" = data.MATNR';
	var pstmt = await conn.prepareStatement(query);
	pstmt.setString(1, data.MATNR);
	await pstmt.execute();
	$.response.status = $.net.http.OK;
	$.response.setBody(JSON.stringify({
		success: true
	}));
*/
}