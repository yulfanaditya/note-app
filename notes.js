const fs = require('fs');
const chalk = require('chalk');

const getNotes =() => {
    return 'Your notes';
}

const addNotes = (title, body) => {
    
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("Note added"));
    }
    else{
        console.log(chalk.red.inverse('The note already Exist!'));
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {

    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }

}

const removeNotes = (title) => {
    
    const dataJSON = loadNotes();

    const dataFilter = dataJSON.filter((data)=>{
        return title !== data.title
    })
    
    if(dataJSON.length === dataFilter.length){
        console.log(chalk.red.inverse('No such note'))
    }
    else{
        const JSONstringify = JSON.stringify(dataFilter);
        fs.writeFileSync('notes.json',JSONstringify);
        console.log(chalk.red.inverse('Note Removed'))
    }
}

const noteLists = () => {
    console.log(chalk.white.inverse('Lists of notes!'));
    const dataArray = loadNotes()
    dataArray.map((data)=> console.log(chalk.green(data.title)))
}

const readNote = (title) => {
    const dataJSON = loadNotes();

    const noteExist = dataJSON.find((data)=>  title === data.title)

    if(!noteExist){
        console.log(chalk.red.inverse('No such notes'))
    }else{
        console.log(chalk.inverse(noteExist.title))
        console.log(noteExist.body)
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    noteLists: noteLists,
    readNote: readNote
}