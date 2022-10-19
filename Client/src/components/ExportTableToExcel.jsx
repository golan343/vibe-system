import React from 'react';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Button } from '../styles';


export const ExportTableToExcel = ({fileName}) => {
  
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const table = document.getElementById('table-to-xlsx');


  const exportToExcel = (fileName) => {
    // console.log(table);
    const ws = XLSX.utils.table_to_sheet(table, {raw: true, cellDates: true, dateNF: "yyyy-mm-dd"});
    // console.log(ws);
    const wb = { Sheets: { 'דוח עבודה חודשי': ws }, SheetNames: ['דוח עבודה חודשי'], Workbook: {Views: [{RTL: true}]} };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataToExport = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dataToExport, fileName + fileExtension);
  }
  return(
    <Button onClick={(e) => exportToExcel(fileName)}>יצוא לקובץ אקסל</Button>
  )
};

