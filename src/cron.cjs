var cron = require('node-cron');
const main = require('./main.cjs');

console.log('Hotminer Auto Claim by @asepkh - will automatically claim every 90 minutes');
cron.schedule('0 0,3,6,9,12,15,18,21 * * *', () => {
  console.log('Executing ....');
  main();
});

cron.schedule('30 1,4,7,10,13,16,19,22 * * *', () => {
  console.log('Executing ....');
  main();
});
