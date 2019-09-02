navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
const modelParams = {
    flipHorizontal: true, 
    imageScaleFactor: 0.8,
    maxNumBoxes: 2,       
    iouThreshold: 0.5,    
    scoreThreshold: 0.79, 
}

const video = document.querySelector('#video');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
let model;

handTrack.startVideo(video)
    .then(status => {
        if (status) {
            navigator.getUserMedia({ video: {} }, stream => {
                video.srcObjecy = stream;
                runDetection();
            },
                err => console.log(err)
            );
        }
    })

const runDetection = () => {
    model.detect(video)
        .then(predictions => {
            console.log(predictions);
            model.renderPredictions(predictions, canvas, context, video);
            requestAnimationFrame(runDetection);
        });
}

handTrack.load(modelParams)
    .then(lmodel => {
        model = lmodel;
    });