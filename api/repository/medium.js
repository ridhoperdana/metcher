const axios = require('axios');
const convert = require('xml-js');

const fetchPosts = async (username, num) => {
    const result = await axios.request({
        method: 'GET',
        url: '/feed/@' + username,
        baseURL: 'https://medium.com/',
    });

    const resultJSON = convert.xml2json(result.data, {compact: true, spaces: 4})
    const resultObject = JSON.parse(resultJSON);

    const feed = [];

    resultObject.rss.channel.item.forEach((item) => {
        feed.push({
            "title": item.title._cdata,
            "url": item.link._text,
        })
    });
    return feed;
}

module.exports = {
    fetchPosts,
}