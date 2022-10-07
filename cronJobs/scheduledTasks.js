const cron = require('node-cron');

// Every weekday task
cron.schedule('* * * * Monday, Tuesday, Wednesday, Thursday, Friday', () => {
  updateDb();
});
