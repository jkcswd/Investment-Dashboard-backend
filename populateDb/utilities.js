const readline = require('readline');
const fs = require('fs');

const extractDateString = (date) => {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  if(day < 10 ) { day = `0${day}` };
  if(month < 10 ) { month = `0${month}` };

  return `${year}-${month}-${day}`;
}

const percentProgressDisplay = (percent) => { 
  try {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0, null);
    process.stdout.write(percent + '% of data population completed.');
  } catch (err) {
    console.log(err.message);
  }
}


const csvToArray = (csvString) => {
  const csv = fs.readFileSync(csvString, 'utf8');
  const tickerArray = csv.split("\n");

  return tickerArray;
}


const missingTickersToJson = (missingTickers, jsonFilename) => { 
  try {
    const jsonData = JSON.stringify(missingTickers);
    fs.writeFileSync(jsonFilename, jsonData);
  } catch (err) {
    console.log(err.message);
  }
}

export { extractDateString, percentProgressDisplay, csvToArray, missingTickersToJson };
