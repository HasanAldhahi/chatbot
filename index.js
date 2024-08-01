const url = 'http://141.5.107.197/v1/audio/';

window.addEventListener('load', () => {
    let outputElement = document.querySelector('#output');
    let form = document.getElementById('Transcribe-form');
    let progressBar = document.getElementById('progress-bar'); // Assuming you have a progress bar element in your HTML

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let formData = new FormData(form, e.submitter);
        formData.set("modele", "whisper-1");
        formData.set("model", "whisper-1");

        let action = formData.get("action");
        formData.delete("action");

        let response = await fetch(url + action, {
            method: "POST",
            headers: {
                'inference-service': 'whisper-service'
                // More headers if needed
            },
            body: formData,
        });

        response.clone().text().then((text) => {
            outputElement.innerText = text;
        });

        // Progress bar logic
        response.body.onprogress = (event) => {
            if (event.lengthComputable) {
                progressBar.max = event.total;
                progressBar.value = event.loaded;
            }
        };
    });

    document.getElementById('start-transcriptor').addEventListener('click', function(event) {
        event.preventDefault();
        // Get form values
        let roomAddress = document.getElementById('room-address').value;
        let accessKey = document.getElementById('access-key').value;
        let corrections = document.getElementById('corrections').value;
        // Send a request to your backend server
        fetch('/start-transcription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                roomAddress: roomAddress,
                accessKey: accessKey,
                corrections: corrections,
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from your server
            console.log(data);
        });
    });

    document.getElementById('stop-transcriptor').addEventListener('click', function() {
        // Send a request to your backend server to stop the transcription
        fetch('/stop-transcription', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from your server
            console.log(data);
        });
    });
});
