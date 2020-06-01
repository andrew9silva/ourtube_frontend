const url = 'http://localhost:3000/api/v1/videos'

document.addEventListener('DOMContentLoaded', () => {
    getVideos()
})

function getVideos() {
    fetch(url)
    .then(response => response.json())
    .then(videos => {
        videos.data.forEach(video => {
            const videoMarkup = `
            <div data-id=${video.id}>
            <video
            // src=${video.attributes.url}
            // height="200" width="250"
            <h3>${video.attributes.title}</h3>
            <p>${video.attributes.description}</p>
            </div>
            <br>`
            document.querySelector('#video-container').innerHTML += videoMarkup
        })
    })
}