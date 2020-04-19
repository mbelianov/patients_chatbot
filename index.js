
const { GoogleSpreadsheet } = require('google-spreadsheet');


async function run(params){
try {
	var doc = new GoogleSpreadsheet(params.GooglesheetId);
	//await doc.useServiceAccountAuth(require('./agcabinet-watson_credentials.json'));
	await doc.useServiceAccountAuth({
  		client_email: params.userId,
  		private_key: params.userKey
		});
	await doc.loadInfo(); // loads document properties and worksheets
	console.log("Заглавие на документа: ", doc.title);

	//var sheet = doc.sheetsById[params.Googlesheet_PatientSheetId]; // or use doc.sheetsById[id]
	//console.log(sheet.title);

	var sheet = doc.sheetsById[params.Googlesheet_ResultSheetId]; // or use doc.sheetsById[id]
	console.log("Работен лист: ", sheet.title);

	await sheet.loadCells('D2:D3');
	console.log("Статистика заредени клетки: ", sheet.cellStats);

	const egn = sheet.getCellByA1('D2');
	const key = sheet.getCellByA1('D3');
	if (!params.egn)
		egn.value="1111111111";
	else
		egn.value = params.egn;

	if (!params.key)
		key.value="X____";
	else
		key.value = params.key;
	
	await sheet.saveUpdatedCells();
	console.log("Зададох: ЕГН-", egn.value, ", ключ-", key.value);
	
	await sheet.loadCells('B8:H8');
	const name = sheet.getCellByA1("B8");
	const surname = sheet.getCellByA1("C8");
	const family = sheet.getCellByA1("D8");
	const egn1 =  sheet.getCellByA1("E8");
	const date =  sheet.getCellByA1("F8");
	const result1 = sheet.getCellByA1("H8");

	var result = {
		isValid:true,
		name:name.value,
		surname:surname.value,
		family:family.value,
		egn:egn1.value,
		date:date.value,
		result:result1.value
	}

	console.log("Реултат");
	console.log(result);

	return (result);
} catch (e){
	console.log("General error: ", e);
	return 	{
			isValid:false,
			name:"Грешка",
			surname:"Грешка",
			family:"Грешка",
			egn:"Грешка",
			date:"Грешка",
			result:"Грешка"
		}
}

}


function main(params){
	return(run(params));
}

//To test locally. Not needed for execution in IBM Cloud

main({
	GooglesheetId:"1-n8VxDekWZBTN2SfGZlmY698yYWhTtvjgdEz8iorbHg", 
	Googlesheet_PatientSheetId:0, 
	Googlesheet_ResultSheetId:111331624,
	userKey: "", //<-- add userKey from Google Spreadsheet API access Service Credentials (you can copy them from the JSON file)
  	userId: "watson@agcabinet.iam.gserviceaccount.com"
});


// Step 3: Assign it as start function
global.main = main