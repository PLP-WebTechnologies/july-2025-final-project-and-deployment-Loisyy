// URL of the new Teachable Machine model
const URL = "https://teachablemachine.withgoogle.com/models/SUIDRl4pN/";

// Global variables
let model, webcam, labelContainer, maxPredictions;

// Initialize the model and webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // Load the model
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Setup webcam
  const flip = true; // mirror the webcam
  webcam = new tmImage.Webcam(200, 200, flip);
  await webcam.setup();
  await webcam.play();
  window.requestAnimationFrame(loop);

  // Attach webcam to page
  document.getElementById("webcam-container").appendChild(webcam.canvas);

  // Setup label container
  labelContainer = document.getElementById("label-container");
  labelContainer.innerHTML = ""; // clear previous labels
  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.appendChild(document.createElement("div"));
  }
}

// Loop to continuously update the webcam and predictions
async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

// Predict function
async function predict() {
  const prediction = await model.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }
}
