const ytpl = require('ytpl')
const Ymp3 = require('ymp3d')

const y = new Ymp3()

function resolveStream(y) {
  return new Promise(resolve => {
    y.on('finish', function (fileName) {
      return resolve()
    })
  })
}

async function ytplDl(listUrl) {
  const playlist = await ytpl(listUrl, { pages: 1 })
  const trackArr = playlist.items
  for (track of trackArr) {
    const videoID = track.id
    const title = track.title.replace("|", '')
    y.Download(`https://www.youtube.com/watch?v=${videoID}`, `./music/${title}.mp3`)
      .then(videoInfo => console.log(videoInfo))
    await resolveStream(y)
  }
}

// ytplDl('PLDbt0R5uBCBSxri_geAOmp2usRzq5rAT4')
ytplDl('PLDbt0R5uBCBTq3u02K0LWjgcVgoHnM1_H')