const videoUrl = 'http://localhost:3000/api/v1/videos'

document.addEventListener('DOMContentLoaded', () => {
    getVideos()

    const createVideosForm = document.querySelector('#video-form-container')
    createVideosForm.addEventListener("submit", (e) => createFormHandler(e))
})

function getVideos() {
    fetch(videoUrl)
    .then(response => response.json())
    .then(videos => {
        videos.data.forEach(video => {
            const youTubeId = video.attributes.url.split('v=')[1]
            console.log(youTubeId)
            const videoMarkup = `
            <div data-id=${video.id}>
            <iframe width="736" height="414" src="https://www.youtube.com/embed/${youTubeId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <h3>${video.attributes.title}</h3>
            <p>${video.attributes.description}</p>
            </div>
            <br>`;
            document.querySelector('#video-container').innerHTML += videoMarkup
        })
    })
}

function createFormHandler(e) {
    e.preventDefault()
    console.log(e);
}