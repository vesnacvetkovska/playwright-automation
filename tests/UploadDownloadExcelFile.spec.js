const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');
const path = require('path');

async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet('Sheet1');
  const output = readExcel(worksheet, searchText);

  const cell = worksheet.getCell(
    output.row,
    output.column + change.colChange
  );

  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });

  return output;
}

test('Upload download excel validation', async ({ page }) => {
  const textSearch = 'Mango';
  const updateValue = '350';

  await page.goto(
    'https://rahulshettyacademy.com/upload-download-test/index.html'
  );

  // 1️⃣ Wait for download
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  const download = await downloadPromise;

  // 2️⃣ SAVE the file (this was missing)
  const filePath = path.resolve(
    __dirname,
    'download.xlsx'
  );

  await download.saveAs(filePath);

  // 3️⃣ Edit the downloaded Excel file
  await writeExcelTest(
    textSearch,
    updateValue,
    { rowChange: 0, colChange: 2 },
    filePath
  );

  // 4️⃣ Upload edited file
  await page.locator('#fileinput').setInputFiles(filePath);

  // 5️⃣ Validate UI
  const desiredRow = page
    .getByRole('row')
    .filter({ has: page.getByText(textSearch) });

  await expect(   desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
  
});
