/*required elements*/
const path = require('path');
const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 3000;

const dbFilePath = path.resolve(_direname, '..', 'db', 'db.json');

/*set up redirect back to index using express static function */
app.use(express.static('public'));

app.get('/',(_,res)=> {
    const filePath = path.resolve(__dirname, '..', 'public', 'index.html');

    res.sendFile(filePath);
});
app.get('/notes',(_,res)=> {
    const filePath = path.resolve(__dirname, '..', 'public', 'notes.html');

    res.sendFile(filePath);
});

app.get('/api/notes', async(_,res)=> {
    const file = await fs.readFile(dbFilePath, 'utf-8');
    const data = JSON.parse(fileInfo);

    res.JSON(info);
});



app.use('*', (_, res)=> {
    res.redirect('/');
});

app.listen(port, () => {
    console.log('Awesome app listening on port ${port}!')
});
