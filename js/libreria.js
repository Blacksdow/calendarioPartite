function sendRequest(url,method,parameters,callback){
	//alert(parameters);
	$.ajax({
		url: url, //default: currentPage
		type: method,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		dataType: "text",   //usiamo un dato di tipo testo perchè al momento del parsing possiamo debuggarlo visualizzandolo
		data: parameters,
		timeout : 10000,
		success: callback,
		error : function(jqXHR, test_status, str_error){
			alert("Error: Not run. " + str_error);
		}
	});
}

function sendRequestNoCallback(url, method, parameters) {
	return $.ajax({
		url: url,
		type: method,
		data: parameters,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		dataType: "json",
		timeout: 5000
	});
}

function error(jqXHR) {
	if (jqXHR.status == 0)
		console.log("server timeout");
	else if (jqXHR.status == 200)
		console.log("Formato dei dati non corretto : " + jqXHR.responseText);
	else
		console.log("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}