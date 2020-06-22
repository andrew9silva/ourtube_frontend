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
            let commentsText = ''
            fetch(`http://localhost:3000/api/v1/comments`)
            
            .then(res => res.json())
            .then(comments => {
                const filteredComments = comments.data.filter(comment => 
                    {
                        return (parseInt(comment.attributes.video_id) === parseInt(video.id))
                    }
                );
                if (filteredComments.length > 0) {

                    filteredComments.forEach(comment => {
                        commentsText += `<p>${comment.attributes.content}</p>`;
                    })
                } else {
                    commentsText = 'No Comments Yet!';
                }
            const commentContent = `<div>${commentsText}</div>`;
            const videoMarkup = `
            <div data-id=${video.id}>
                <h3>${video.attributes.title}</h3>
                <iframe width="736" height="414" src="https://www.youtube.com/embed/${youTubeId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p>${video.attributes.description}</p>
                <p>${commentContent}</p>
            </div>
            <br>`;
            document.querySelector('#video-container').innerHTML += videoMarkup;
            })
            
            
        })
    })
}

function createFormHandler(e) {
    e.preventDefault()
    const titleInput = document.querySelector('#input-title').value
    const descriptionInput = document.querySelector('#input-description').value
    const urlInput = document.querySelector('#input-url').value
    const userIdInput = document.querySelector('#input-user_id').value
    postFetch(titleInput, descriptionInput, urlInput, userIdInput)
}

function postFetch(title, description, url, user_id) {
    const bodyData = {title, description, url, user_id}

    fetch(videoUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData) 
    })
    .then(response => response.json())
    .then(video => {
        //debugger
        const videoData = video.url
        const youTubeId = videoData.split('v=')[1]
        const videoMarkup = `
        <div data-id=${video.id}>
        <h3>${video.title}</h3>
        <iframe width="736" height="414" src="https://www.youtube.com/embed/${youTubeId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <p>${video.description}</p>
        <p>${video.user_id}</p>

        </div>
        <br><br>`;

        document.querySelector('#video-container').innerHTML += videoMarkup;
    })
        
}