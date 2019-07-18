const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const paginate = require('jw-paginate');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// paged items route
app.get('/api/items', (req, res, next) => {
    // example array of 150 items to be paged
    const items = [...Array(150).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) }));

    // get page from query params or default to first page
    const page = parseInt(req.query.page) || 1;

    // get pager object for specified page
    const pager = paginate(items.length, page);

    // get page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // return pager object and current page of items
    return res.json({ pager, pageOfItems });
});

// start server
const port = 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
