const puppeteer = require('puppeteer');
const cron = require('node-cron');
const fs = require('fs');

let memes = {
    links: []
}

function clearFile() {
    fs.writeFile("memes.json", "", err => {
        if (err) return console.log(err);
        console.log('clear');
    })
}

async function getMemes(sub_r) {

    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.goto('https://www.reddit.com/'+sub_r, {
        waitUntil: 'networkidle0',
        timeout: 0
    });
    const imgs = await page.$$eval('.ImageBox-image', imgs => imgs.map(img => img.getAttribute('src')))
    const vids = await page.$$eval('source', vids => vids.map(vid => vid.getAttribute('src')))
    
    memes.links.push(...imgs)
    memes.links.push(...vids)

    browser.close();

    fs.writeFile("memes.json", JSON.stringify(memes), err => {
        if (err) return console.log(err);
        console.log('done');
    })
}

//     const sub_r = [,
//         "r/Teleshits",
//         "r/Punny",
//         "r/imgoingtohellforthis",
//         "r/4chanExploitables",
//         "r/sjwhate/",
//         "r/AnimalsWithoutNecks/",
//         "r/birdswitharms",
//         "r/FunnyandSad",
//         "r/pics_irl/",
//         "r/bertstrips",
//         "r/bannedfromclubpenguin",
//         "r/fakehistoryporn",
//         "r/copypasta/",
//         "r/circlejerk",
//         "r/shittylifeprotips",
//         "r/shittyadviceanimals",
//         "r/shittyaskscience",
//         "r/me_irl",
//         "r/unexpectedjihad",
//         "r/IndianpeopleFacebook",
//         "r/highqualitygifs",
//         "r/simpsonsdidit"]

cron.schedule('00 12 * * *', () => {
    clearFile();
    getMemes("r/me_irl");
    getMemes("r/4chanExploitables");
    getMemes("r/lmGoingToHellForThis");
    getMemes("r/dankmemes");
    getMemes("r/FunnyandSad");
  }, {
      scheduled: true,
      timezone: "Asia/Kathmandu"
  });

module.exports = {getMemes}