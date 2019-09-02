navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
const modelParams = {
    flipHorizontal: true,
    imageScaleFactor: 0.7,
    maxNumBoxes: 20,
    iouThreshold: 0.5,
    scoreThreshold: 0.7,
}

const video = document.querySelector('#video');
const canvas = document.querySelector('#canvas');
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
            navigator.getUserMedia({ video: {} }, stream => {
                video.srcObjecy = stream;
                runDetection();
                //setInterval(runDetection, 100);
            },
                err => console.log(err)
            );
        }
    })

const runDetection = () => {
    model.detect(video)
        .then(predictions => {
            /* model.renderPredictions(predictions, canvas, context, video); */
            if (predictions.length > 0) {
                let x = predictions[0].bbox[0] * 2 + 'px';
                let y = predictions[0].bbox[1] + 'px';
                theBox.style.top = y;
                theBox.style.left = x;
                console.log(x, y);
                //console.log(predictions[0].bbox[0] / 2, predictions[0].bbox[1] / 2);
                /* console.log(valuelist.x,valuelist.y);
                if (counter < 10) {
                    counter += 1;
                    valuelist.x = (predictions[0].bbox[0] * 2) / counter;
                    valuelist.y = predictions[0].bbox[1] / counter;
                }
                else{
                    theBox.style.top = valuelist.y + 'px';
                    theBox.style.left = valuelist.x + 'px';
                    console.log('SET');
                    counter=0;
                } */
                /* context.fillRect(predictions[0].bbox[0], predictions[0].bbox[1],10,10); */
            }
            requestAnimationFrame(runDetection);
        });
}

handTrack.load(modelParams)
    .then(lmodel => {
        model = lmodel;
    });