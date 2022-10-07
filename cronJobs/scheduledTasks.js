const cron = require('node-cron');

const scheduledTasks = () => {
  // Every weekday tasks
  cron.schedule('* * * * Monday, Tuesday, Wednesday, Thursday, Friday', () => {
    updateDb();
  });


  // Monthly tasks

  cron.schedule('* * 1 * *', () => {  
    
  });
}


module.exports = scheduledTasks;