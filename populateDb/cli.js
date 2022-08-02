const inquirer = require("inquirer");
const gradient = require("gradient-string");
  
const checkForPopulate = async (nameOfDataSet) => {
  console.log(gradient.passion(`Populate ${nameOfDataSet}`));

  let { response } = await inquirer.prompt({
      type: 'input',
      name: 'response',
      message: `Would you like to populate the ${nameOfDataSet} dataset? (y/n)`
  });

  if (response.toLowerCase() == 'y' || response.toLowerCase() == 'n') {
    console.log(gradient.passion('Response confirmed.'));
    return response.toLowerCase();
  } else {
    console.log('Only input "y" or "n". Try again.')
    checkForPopulate();
  }
}
checkForPopulate()
module.exports = checkForPopulate;