const axios = require('axios');
const ntlm = require('axios-ntlm');
const connection = require('./dbconfig.js');

const printLabel = async (item) => {
    const data = {
        PrintBTWAction: {
            DocumentFile: 'C:\\Users\\Divyanshu\\Desktop\\Testing.btw',
            Printer: 'PDF',
            PrintToFileFolder: 'C:\\Users\\Divyanshu\\Desktop\\bartender_automation',
            PrintToFileFileName: 'Testing.pdf',
            Copies: 1,
            VerifyPrintJobIsComplete: true,
            NamedDataSources: {
                Art_no: item.Art_no,
                Barcode: item.Barcode,
                Size: item.Size,
                Colour: item.Colour,
                Qty: item.Qty,
                Lot_no: item.Lot_no,
                Mrp: item.Mrp
            }
        }
    };

    try {
        const response = await axios.post('http://localhost:5159/api/actions', data, ntlm({
            username: 'your-username',
            password: 'your-password',
            domain: ''
        }));
        console.log('Label printed successfully:', response.data);

        // Update the printed status
        connection.query('UPDATE Item SET printed = ? WHERE Art_no = ?', [true, item.Art_no], (error, results) => {
            if (error) {
                console.error('Error updating printed status:', error);
            } else {
                console.log(`Item ${item.Art_no} marked as printed`);
            }
        });

    } catch (error) {
        console.error('Error printing label:', error);
    }
};

module.exports = printLabel;
