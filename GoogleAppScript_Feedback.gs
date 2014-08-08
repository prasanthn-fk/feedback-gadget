
function doGet(request) {
  Logger.log("Request was: " + request + " with params" + request.parameters);
  
  write_to_db(new Date(), 
              request.parameters.recepient[0],
              request.parameters.listening[0], 
              request.parameters.punctuality[0]);  
  
  return ContentService.createTextOutput("Thanks for this feedback!").setMimeType(ContentService.MimeType.TEXT);
}

function write_to_db(time, recepient, listening, punctuality) {
  Logger.log("Going to save" + time + "," + recepient + "," + listening + "," + punctuality);

  // DB https://docs.google.com/spreadsheets/d/117JrKyGNW14pqVm3gfG3MEgLZJliQio9JWIu-NBHeHw/edit#gid=0
  var DATA_SPREADSHEET_ID = "117JrKyGNW14pqVm3gfG3MEgLZJliQio9JWIu-NBHeHw"; 
  var dataSheet = SpreadsheetApp.openById(DATA_SPREADSHEET_ID).getSheets()[0];

  Logger.log("Opened sheet");
  var values = [time, recepient, listening, punctuality];
  _setRowsData(dataSheet, values);
  Logger.log("set values" + values);
}

function _setRowsData(sheet, objects, optHeadersRange, optFirstDataRowIndex) {
  var headersRange = optHeadersRange || sheet.getRange(1, 1, 1, sheet.getMaxColumns());
  var firstDataRowIndex = optFirstDataRowIndex || sheet.getLastRow() + 1;
          
  var data = [];
  data.push(objects);

  var destinationRange = sheet.getRange(firstDataRowIndex, 1, 1, 4);
  destinationRange.setValues(data);
}