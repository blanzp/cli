
const vorpal = require('vorpal')();
var request = require('request');
const grep = require('vorpal-grep');

var chalk = vorpal.chalk;

vorpal
.delimiter(vorpal.chalk.magenta('MQ>>>'))
.use(grep)
.show();


let user = '';
let password = '';

vorpal
.command('status [qmgr...]')
.description('display status of qmgrs')
.action(function (args, callback) {
    args['qmgr'].forEach(element => {
        this.log('checking qmgr', element);
        this.log('checking qmgr', chalk.magenta(element));
        this.log('checking qmgr', chalk.red(element));  
        this.log('checking qmgr', chalk.green(element));  
        this.log('checking qmgr', chalk.blue(element));  
        
    });
  callback(chalk.red('boofad'));
});


vorpal
.command('posts')
.description('display status of qmgrs')
.action(function (args, callback) {
    const self = this;
    request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            JSON.parse(body).forEach( element =>
                { self.log(element['title']); }
            )
        }
      });
  callback();
});


vorpal
.command('login')
.description('login in user')
.action(function (params, callback) {
    const self = this;
    this.prompt([
    {
        type: 'input',
        name: 'user',
        message: 'user: '
    },
    {
        type: 'password',
        name: 'password',
        message: 'password: '
    }],function(arg) {
        user = arg['user'];
        password = arg['password'];
        self.log('Logged in as',user);
        callback();
    });
});