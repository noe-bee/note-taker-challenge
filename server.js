const path = require('path');
const express = require('express');
const api = require('./routes/index.js');
//
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

//GET Route for index.html
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET route for notes.html
app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/product', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/product.html'))
})

//listen
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
