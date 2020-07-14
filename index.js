const api = require('./api/repository/medium');
const express = require('express')
const app = express()
const port = 3000

app.get('/medium/feed', async (req, res) => {
    const username = req.query.username;
    const num = req.query.num;
    let result = [];
    try {
        result = await api.fetchPosts(username, num)
    } catch (e) {
        res.statusCode = 500;
        res.send({"error": e});
        return
    }

    res.send(result)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))