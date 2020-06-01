const url = 'http://localhost:3000/api/v1/videos'

document.addEventListener('DOMContentLoaded', () => {
    fetch(url)
    .then(repsonse => response.json())
    .then(videos => {
        console.log(videos);
    })
})