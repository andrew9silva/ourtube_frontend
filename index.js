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
            <iframe width="736" height="414" src="https://www.youtube.com/embed/${video.attributes.youtube_id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <h3>${video.attributes.title}</h3>
            <p>${video.attributes.description}</p>
            </div>
            <br>`;
            document.querySelector('#video-container').innerHTML += videoMarkup
        })
    })
}