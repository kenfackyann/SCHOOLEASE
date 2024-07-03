const concurrently = require('concurrently');

const commands = [
{ command: 'cd SCHOOLEASE-MobileEnd && npx ionic serve', name: 'Ionic', prefixColor: 'blue' },
{ command: 'cd SCHOOLEASE-webEnd && npx serve -s .', name: 'HTML5', prefixColor: 'green' }
];

concurrently(commands, {
prefix: 'name',
killOthers: ['failure', 'success'],
});
