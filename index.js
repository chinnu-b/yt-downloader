// Youtube to mp3 converter

const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
const port = 3000;


app.get('/download', async (req, res) => {
    const url = req.query.url;
    const format = req.query.format||'mp4';

    // verify if vvideo is a valid youtube video
    if(!ytdl.validateURL(url)){
        return res.send('Invalid URL');
    }

    const video =  ytdl(url, { filter: 'videoandaudio',format:format});

    res.header('Content-Disposition', `attachment; filename="video.${format}"`);
    video.pipe(res);
});



app.listen(port, () => console.log(`Server is running on port ${port}`));


console.log(ytdl.validateURL('https://www.youtube.com/watch?v=4dsFQFvVGU&ab_channel=YRF'));