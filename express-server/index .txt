const express = require('express');
const app = express();

app.use(express.json()); // to parse JSON bodies

// GET route for addition
app.get('/math/add', (req, res) => {
    const op1 = parseFloat(req.query.op1);
    const op2 = parseFloat(req.query.op2);

    if (isNaN(op1) || isNaN(op2)) {
        return res.status(400).send('Invalid operands');
    }

    const result = op1 + op2;
    res.send(`${result}`);
});

// POST route for addition
app.post('/math/add', (req, res) => {
    const { op1, op2 } = req.body;

    if (isNaN(op1) || isNaN(op2)) {
        return res.status(400).send({ error: 'Invalid operands' });
    }

    const result = op1 + op2;
    res.json({ result });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
