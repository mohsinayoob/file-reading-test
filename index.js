// Node.js packages for file system
const fs = require('fs');
const path = require('path');

const DELIMETER = "-->"
const PATH_TO_JSON = "export.json"
const PATH_TO_CSV = "import.asv"

const filePath = path.join(__dirname, PATH_TO_CSV);
// Read CSV
let fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' },
    function (err) { console.log(err); });

// Split on row
fileContent = fileContent.split("\n");

// Get first row for column headers
let headers = fileContent.shift().trim().split(DELIMETER);


const data = fileContent.map((row) => {
    // Loop through each row
    const tmpobject = {}
    const column = row.split(DELIMETER)
    headers.forEach((header, index) => (tmpobject[header] = column[index].trim().replace(/^"(.*)"$/, '$1').replace(/""/g, '"')))
    return tmpobject
});

const outPath = path.join(__dirname, PATH_TO_JSON);
// Convert object to string, write json to file
fs.writeFileSync(outPath, JSON.stringify({ data }), 'utf8',
    function (err) { console.log(err); });
console.log("Your output file is: ", outPath)