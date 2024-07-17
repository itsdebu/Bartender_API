const connection = require('./dbconfig.js');
const printLabel = require('./printService.js');

const fetchAndPrintNewItems = () => {
    connection.query('SELECT * FROM Item WHERE printed = FALSE', (error, results) => {
        if (error) {
            console.error('Error fetching items:', error);
            return;
        }
        results.forEach(item => {
            printLabel(item);
        });
    });
};

setInterval(fetchAndPrintNewItems, 60000);
