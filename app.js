navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
const modelParams = {
    flipHorizontal: true,
    imageScaleFactor: 0.7,
    maxNumBoxes: 4,
    iouThreshold: 0.5,
    scoreThreshold: 0.75,
}

const video = document.querySelector('#video');
const canvas = document.querySelector('#canvas');
const statusIndicator = document.querySelector('.element');
const context = canvas.getContext('2d');
var theBox = document.querySelector('.element');
let model = null;
let counter = 0;
let valuelist = {
    x: 0,
    y: 0,
};
//context.fillRect(10, 10, 150, 75 );

handTrack.startVideo(video)
    .then(status => {
        if (status) {
            navigator.getUserMedia({
                video: {
                    aspectRatio: 16 / 9
                }
            }, stream => {
                video.srcObjecy = stream;
                runDetection();
                //setInterval(runDetection, 100);
            },
                err => console.log('theres an error idiot:' + err)
            );
        }
    })

const runDetection = () => {
    model.detect(video)
        .then(predictions => {
            model.renderPredictions(predictions, canvas, context, video);
            if (predictions.length > 0) {
                //statusIndicator.style.background = 'white';
                let x = (predictions[0].bbox[0] / 1.5) + 'px';
                let y = predictions[0].bbox[1] + 'px';
                theBox.style.top = y;
                theBox.style.left = x;
                console.log(x, y);
                //console.log(predictions[0].bbox[0] / 2, predictions[0].bbox[1] / 2);

            }// else statusIndicator.style.background = 'red';
            requestAnimationFrame(runDetection);
        });
}

handTrack.load(modelParams)
    .then(lmodel => {
        model = lmodel;
    });