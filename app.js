const yargs = require('yargs');
const notes = require('./notes');

yargs.version('1.0.1');

//Create add Command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: false,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(args){
        notes.addNotes(args.title,args.body)
    }
});

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(args){
        notes.removeNotes(args.title)
    }
});

yargs.command({
    command: 'read',
    describe: 'read note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(args){
        notes.readNote(args.title)
    }
});

yargs.command({
    command: 'list',
    describe: 'show allnote',
    handler(){
        notes.noteLists()
    }
});

yargs.parse();
