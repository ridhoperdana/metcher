const api = require('./api/repository/medium');
const express = require('express')
const app = express()
const port = 3000

app.get('/', function(req, res) {
    res.redirect('/medium/feed');
});

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

    const items = [];

    result.forEach((value) => {
        const item = `<div onclick="window.open('`+value.url+`');" class="card">
            <div class="container">
                <p>`+value.title+`</p>
            </div>
        </div>`;
        items.push(item);
    })

    let template = `<style>
                .card {
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                    transition: 0.3s;
                    width: 40%;
                    cursor: pointer;
                }
                
                p {
                    font: 200 18px 'Segoe UI', Ubuntu, Sans-Serif;
                }
        
                .container {
                    padding: 2px 16px;
                }
            </style>`

    items.forEach((value) => {
       template += value;
    });

    res.send(template);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))