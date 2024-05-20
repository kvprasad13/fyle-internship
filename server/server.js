// http://localhost:3000/api/repos/?username=kvprasad13&page=3&limit=4

const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const port = 3000;


app.use(cors());

app.get('/api/repos', paginatedRepos(), (req, res) => {

    res.json(res.paginatedRepos);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

function paginatedRepos() {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const username = req.query.username;
     
        const repos = await getAllRepos(username);
       
        const startIndex = (page - 1) * limit;
        const endIndex = (page) * limit;
       
        const results = {};
        if (startIndex > 0) {
            results.previous = { page: page - 1, limit }
        }
        if (endIndex < repos.length) {
            results.next = { page: page + 1, limit }
        }

        results.results = repos.slice(startIndex, endIndex);
        // console.log("now repos length: " + results.results.length)

        res.paginatedRepos = results;
        next();
    }

}
async function getAllRepos(username) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);

        return response.data;
    } catch (error) {
        console.error(error);
       throw new Error('An error occurred while fetching data from GitHub API');
    }
}