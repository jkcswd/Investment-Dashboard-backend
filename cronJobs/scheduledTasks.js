const cron = require('node-cron');

// Every weekday tasks
cron.schedule('* * * * Monday, Tuesday, Wednesday, Thursday, Friday', () => {
  updateDb();
});


// Monthly tasks

cron.schedule('* * 1 * *', () => {  
  
});