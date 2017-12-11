
const vorpal = require('vorpal')();
var request = require('request');
const grep = require('vorpal-grep');
const vorpalLog = require('vorpal-log');
const vorpalTour = require('vorpal-tour');
var table = require('text-table');

var chalk = vorpal.chalk;

vorpal
.delimiter(vorpal.chalk.magenta('MQ>>>'))
.use(grep)
.use(vorpalLog, { printDate: true})
.show();
const logger = vorpal.logger;


let user = '';
let password = '';

// commands: chstatus, mqstatus, amqerror, secexit
// webview, inventory, mqcache, itsm, hpsm, plm, planum, rosetta

// vorpal.use(vorpalTour, {
//     command: 'tour',
//     tour: function(tour) {
//       // Colors the "tour guide" text. 
//       tour.color('cyan');
  
//       // Adds a step to the tour:
//       // .begin spits user instructions when the step starts
//       // .expect listens for an event. The function it calls 
//       //   expects a `true` to be called in order for the step 
//       //   to finish.
//       // .reject spits text to the user when `false` is returned 
//       //   on an `.expect` callback.
//       // .wait waits `x` millis before completing the step
//       // .end spits text to the user when the step completes.
//       tour.step(1)
//         .begin('Welcome to the tour! Run "foo".')
//         .expect("command", function (data, cb) {
//           cb(data.command === 'status foo');
//         })
//         .reject('Uh.. Let\'s type "foo" instead..')
//         .wait(500)
//         .end('\nNice! Wasn\'t that command just amazing?\n');
  
//       // A delay in millis between steps.
//       tour.wait(1000);
  
//       // Ends the tour, spits text to the user.
//       tour.end('Very well done!');
  
//       return tour;
//     }
//   });

vorpal.command('log')
.action(function(args, cb) {
logger.debug('Log command called without arguments.');
logger.log('Foo, bar, baz!');
logger.confirm('You successfully ran the log command.');
logger.info('It logs stuff.');
logger.warn('Careful with that axe, Eugene!');
logger.error('Something went wrong...');
logger.fatal('If this was a real program, it would probably shut down now.');
cb();
});

vorpal
.command('status [qmgr...]')
.description('display status of qmgrs')
.action(function (args, callback) {
    args['qmgr'].forEach(element => {
        logger.log('checking qmgr '+ chalk.blue(element));
    });
  callback();
});

vorpal
.command('qmgr [qmgr...]')
.option('--status', 'Does amazing things')
.autocomplete(['cat', 'dog', 'horse', 'caat', 'car'])
.description('display status of qmgrs')
.action(function (args, callback) {
    logger.log(args);
    args['qmgr'].forEach(element => {
        logger.log('checking qmgr '+ chalk.blue(element));
    });
  callback();
});

vorpal
.command('posts')
.description('display status of qmgrs')
.action(function (args, callback) {
    const self = this;
    request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) {
        t = [['id','title','body']];
        if (!error && response.statusCode == 200) {
            JSON.parse(body).forEach( element =>{ 
                    t.push([element['id'],element['title'],element['body']]); }
            )
            self.log(table(t));
        }
      });
  callback();
});

vorpal
.command('time')
.description('log time')
.action(function (args, callback) {
    logger.log(new Date().toString());
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