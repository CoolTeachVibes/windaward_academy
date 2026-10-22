/**
 * Windward Academy — Receptor de inscripciones
 * Escribe cada registro de la landing en la hoja de cálculo indicada.
 *
 * Hoja destino:
 * https://docs.google.com/spreadsheets/d/1JqZzfRhSv_4fCoDO5ycZVZGW31aXlD_ewgq0_iIawkE/edit
 */

var SHEET_ID = "1JqZzfRhSv_4fCoDO5ycZVZGW31aXlD_ewgq0_iIawkE";
var SHEET_NAME = "Inscripciones";

var HEADERS = [
  "Fecha de registro",
  "Nombre",
  "Correo",
  "WhatsApp",
  "Institución",
  "Perfil",
  "Método de pago",
  "Referencia",
  "Monto (MXN)",
  "Curso",
  "Fechas",
  "Comprobante enviado",
  "Origen",
];

function getSheet_() {
  var spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#0b2a74")
      .setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function parseBody_(e) {
  if (!e) return {};
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      // Si no es JSON, intenta como formulario
    }
  }
  return e.parameter || {};
}

function respond_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = parseBody_(e);
    if (!data.nombre || !data.correo) {
      return respond_({ ok: false, error: "Faltan nombre o correo" });
    }
    var sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      data.nombre || "",
      data.correo || "",
      data.whatsapp || "",
      data.institucion || "",
      data.perfil || "",
      data.metodoPago || "",
      data.referencia || "",
      data.monto || "",
      data.curso || "",
      data.fechas || "",
      "Pendiente",
      data.origen || "landing",
    ]);
    return respond_({ ok: true });
  } catch (err) {
    return respond_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return respond_({ ok: true, service: "Windward Academy · Inscripciones" });
}

/** Ejecuta esta función una vez desde el editor para autorizar permisos y crear la pestaña. */
function setup() {
  getSheet_();
}
