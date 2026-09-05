window.uploadMaterial = function () {

    const fileInput =
        document.getElementById("fileInput");

    const status =
        document.getElementById("uploadStatus");


    if (!fileInput || !status) {
        return;
    }


    if (fileInput.files.length === 0) {
        return;
    }


    const file =
        fileInput.files[0];


    status.innerHTML =
        "🤖 AI is analyzing <strong>" +
        file.name +
        "</strong>...";


    setTimeout(function () {

        status.innerHTML =
            "✓ Material analyzed successfully! AI has created a personalized learning plan.";

    }, 2000);

};