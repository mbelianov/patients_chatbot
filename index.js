
const { GoogleSpreadsheet } = require('google-spreadsheet');
//var doc = new GoogleSpreadsheet('1-n8VxDekWZBTN2SfGZlmY698yYWhTtvjgdEz8iorbHg');
//var async = require('async');


async function run(params){
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
	egn.value="7603254702";
	key.value="Xabcd";
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

}


function main(params){
	return(run(params));
}

main({GooglesheetId:"1-n8VxDekWZBTN2SfGZlmY698yYWhTtvjgdEz8iorbHg", Googlesheet_PatientSheetId:0, Googlesheet_ResultSheetId:111331624,
userKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC83+O/R1xyyIa9\nEnOCA/G0P0EeSAJ2JNG01Y8sqQk+AcSOwMs7HeTUYXojbIcywJmASSXDb7JCX6v2\nXNepzflFI4DE/jH+dhTdkek8v8iCVspIyo1xOH72StbOZKus46QG9s2Kp/KPEqQd\nO5L4RLuGtL/vZt8R5OSNJgTzOYhTo/xYaP1at3sXLMUkKD0gAbmo8XH+1Pw7miTM\nAURRnRhGF17AiFOlCbBTuma6CjCWXzb+a8fnfXjpZNoXdCQeAWIGnWg6P01s+AoO\nLTOHsssRoJ2MUOTU1vIjFux74cZpIzpu/atm4G1XJQXaooNo3GYy/pHKOT7mCat3\nOs2nRNmtAgMBAAECggEAA0pcP6IY4ngLXuJiKEb00EjU09f50QCZta6NyL+mJVIn\nEDycHcrKyIdtNw5GObRgyDseAQ5iWuUrTAa4jCEGQXXZobTy/oWkneqTl2cY8Wpd\nKlD7D1imX5iUrvJSilfJ7QQiNxLvdx4iRU8bI5+g67sc5+kRJFDqSWo65ljffuOB\n/tTUdK/40QK3sPJ+TEZck2sYuvfzDrxkORPqiT85KQInB0FwxxExX/bpF2MMfVSm\nUrwm6ykwbAwt5XDLKwQzsDkjyVj0Jec4sVF1TAfxeSZSjHhGUfrvfa7X5zRpKS+Y\nFqDH/mziiO+5XoW/lsyLpgTNfNIuWYq1haocvl7v6QKBgQD8qKbrRMjtgrbE23Zl\nFPAkWjzVp0kZuZn5wPAU8BozjMGMUzmRMuy6pwk7pqAOV7yn6KjxIk2HkTbdAgGR\niG+kjTwP3jrlCOcQ+ouAhONRHE3Y6fgSVtdcY1x7hIV1kDfqDfHobx/SU7bByk4t\n2SuWh3ifu4kqBFWQh9mmgCgbVQKBgQC/X02jNNV+9CNU8e/0Ap/wRuATVKW4UDxh\nMtWhPyXdN3/avl6A3EleH+Avb/wgeluPR25GTeEq+KPwgDA8alMU4SzgS0JZSc5b\n5Dtf1Czq/706Dva33YN8uN7pzvy3oRaGwgyTOCFAhpiEsfay0zS4AC0ZGXfu061A\nk2uZgeE0+QKBgQDK6kA0j2e3qNVUwNUTVX+QEpDtHo8NBAzvks6+Yh8I67C+HFEN\nlhKdzW0S5T2Ch2BSkf6sutn9WNjxIp1T3nmbdHqaW+Z872t0LWRAcXmHOO4kmbPM\nNsZ7wqkR4lq1EoB1j4GLJUQvTWBnvyyOke351Q9BagI9JoH5s8FPgXm0iQKBgHGZ\naiXCfCVjWQHYqB7J3BUujV8MNV9myaDNI0EXkityAYRg0wpdOXQVKege6qSA3Y78\n0PoMyufONsrR3VBPsUfIrvHp2tXT2Rp1LcWh1pQdAT/QmCXm6WGFAFX8V8nNZujR\nkdNmU17RRwIl/hKDC11aRWsL0kTEBKk7mXjDP2NJAoGBAO8XeKA4V1YuVqHphjsW\nxQxtuIitopFczWHlybl2dqMJR5d3ppJqwWnQy2gpkayK4+xnTePILNt6DeOkDxKw\n6AEoDnhllGZUOSiqmkM33dQcajv7gi162YT5j7RJVaxzrC/IT1d4RTUdwsDdgnBI\nrmrQmNfZOfN1UV4gTzslypTn\n-----END PRIVATE KEY-----\n",
  userId: "watson@agcabinet.iam.gserviceaccount.com",});


// Step 3: Assign it as start function
global.main = main
