import { Button } from '@mui/material';
import React from 'react';
import Iconify from './iconify';
import moment from 'moment';
import { SERVICE_TYPE_SHUTTLE2WAY } from '../store/constant';

const ExportCSVButton = ({ orders = [[]], filename = 'report.csv' }) => {
  // Function to convert an array of objects to a CSV string
  const ordersToCSV = (orders) => {
    const csvRows = [];
    // Get the headers
    const headers = ['*InvoiceNo', '*Customer', '*InvoiceDate', '*DueDate', 'Terms', 'Location', 'Memo', 'Item(Product/Service)', 'ItemDescription', 'ItemQuantity', 'ItemRate', '*ItemAmount', '*ItemTaxCode', 'ItemTaxAmount'];
    csvRows.push(headers.join(','));

    // Loop over the rows and push to the CSV array
    for (const order of orders) {
        const invDate = "2024-03-14";
        const dueDate = moment(invDate).add(20, 'day').format("YYYY-MM-DD");
        let price = 210;
        if(order.Description == SERVICE_TYPE_SHUTTLE2WAY) price = 60;
        let qty = 1;
        let amount = price * qty;
        let values = ["", order.Company, invDate, dueDate, "Net 30", "", "", order.Description, `${order.LeadNumber}-${order.PupNumber}`, `${qty}`, `${price}`, `${amount}`, "GST", `${amount*0.05}`];
        values = values.map(value => {
            const escaped = value.replace(/"/g, '""'); // Escape double quotes
            return `"${escaped}"`; // Enclose each value in double quotes
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  };

  // Function to trigger the download of the CSV file
  const download = (content, filename) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up to avoid memory leaks
  };

  // Button click handler
  const handleDownload = () => {
    const csvData = ordersToCSV(orders);
    download(csvData, filename);
  };

  return (
    <Button onClick={handleDownload}><Iconify icon="tdesign:download" /></Button>
  );
};

export default ExportCSVButton;

// Usage:
// <ExportCSVButton data={yourDataArray} filename="data.csv" />