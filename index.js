const videoUrl = 'http://localhost:3000/api/v1/videos'
const commentURL = 'http://localhost:3000/api/v1/comments'

document.addEventListener('DOMContentLoaded', () => {
    getVideos()

    const createVideosForm = document.querySelector('#video-form-container')
    createVideosForm.addEventListener("submit", (e) => createFormHandler(e))
});


function getVideos() {
    fetch(videoUrl)
    .then(response => response.json())
    .then(videos => {
        videos.data.forEach(video => {
            const youTubeId = video.attributes.url.split('v=')[1]
            console.log(youTubeId)
            let commentsText = ''
            fetch(commentURL)
            
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
            <div id=${video.id}>
                <h3>${video.attributes.title}</h3>
                <iframe width="500" height="250" src="https://www.youtube.com/embed/${youTubeId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p>${video.attributes.description}</p>
                <form class="comment-form">
                 <label for="commentbox-${video.id}">Add Comment: </label>
                 <textarea id="commentbox-${video.id}" name="content"></textarea>
                 <input type="hidden" name="video_id" value="${video.id}"/>
                 <button type="submit">Submit</button>
                </form>
                <p>${commentContent}</p>
            </div>
            <br>`;
            document.querySelector('#video-container').innerHTML += videoMarkup;
            document.querySelector('.comment-form').addEventListener("submit", (e) => createFormHandlerComment(e));
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




    // function render(video) {
    //     const videoMarkup = `
    //     <div data-id=${video.id}>
    //     <h3>${video.title}</h3>
    //     <iframe width="736" height="414" src="https://www.youtube.com/embed/${youTubeId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    //     <p>${video.description}</p>
    //     <p>${video.user_id}</p>

    //     </div>
    //     <br><br>`;

    //     document.querySelector('#video-container').innerHTML += videoMarkup;
    // }
        
}

function createFormHandlerComment(e) {
    e.preventDefault()
    const commentContent = e.target.content.value
    const videoId = e.target.video_id.value
    const userId = 1
    postFetchComment(commentContent, videoId, userId)
}

function postFetchComment(content, video_id, user_id) {
        const bodyData = {content, video_id, user_id}
    
        fetch(commentURL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyData) 
        })
        .then(response => response.json())
        .then(comment => {
            console.log(comment); //select video markup <div> with querySelector from DOM, then select last child(comment.content)
        })
}