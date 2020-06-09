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
    const titleInput = document.querySelector('#input-title').value
    const descriptionInput = document.querySelector('#input-description').value
    const urlInput = document.querySelector('#input-url').value
    postFetch(titleInput, descriptionInput, urlInput)
}

function postFetch(title, description, url) {
    const bodyData = {title, description, url}

    fetch(videoUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData) 
    })
    .then(response => response.json())
    .then(video => {
        const videoData = video.data.attributes
        const youTubeId = videoData.url.split('v=')[1]
        const videoMarkup = `
        <div data-id=${video.id}>
        <iframe width="736" height="414" src="https://www.youtube.com/embed/${youTubeId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <h3>${videoData.title}</h3>
        <p>${videoData.description}</p>
        </div>
        <br><br>`;

        document.querySelector('#video-container').innerHTML += videoMarkup;
    })
        
}