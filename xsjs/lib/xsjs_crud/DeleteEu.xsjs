"use strict"; // Enable strict mode
try {
   // Establish a connection to the database
   var conn = await $.hdb.getConnection();
   // Define the DELETE query
   var query = 'DELETE FROM "SD"';
   // Execute the DELETE statement
   var affectedRows = await conn.executeUpdate(query);
   // Set the response content type to JSON
   $.response.contentType = "application/json";
   // Prepare the response body with the number of affected rows
   var responseBody = {
       success: true,
       message: "Records deleted successfully.",
       affectedRows: affectedRows
   };
   // Set the response body and status
   $.response.setBody(JSON.stringify(responseBody));
   $.response.status = $.net.http.OK;
} catch (e) {
   // Handle any errors that occur during the process
   $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
   $.response.setBody(JSON.stringify({
       success: false,
       message: "An error occurred while deleting records.",
       error: e.message
   }));
} finally {
   // Clean up and close the connection
   if (conn) {
       try {
           await conn.close();
       } catch (e) {
           // Log the error if the connection close fails
           $.trace.error("Failed to close the connection: " + e.message);
       }
   }
}