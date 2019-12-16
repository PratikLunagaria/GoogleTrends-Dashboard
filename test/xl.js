const XLSX = require('xlsx');
var wb = XLSX.utils.book_new();

wb.SheetNames.push("Test Sheet");
var ws_data = [['hello' , 'world']];
var ws = XLSX.utils.aoa_to_sheet(ws_data);
wb.Sheets["Test Sheet"] = ws;
var wbout = XLSX.writeFile(wb,'out.xls');