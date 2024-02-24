function setupEventListeners() {
  const backBtn = document.getElementById("backBtn");
  const nextBtn = document.getElementById("nextBtn");

  backBtn.removeEventListener("click", handleBackButtonClick);
  nextBtn.removeEventListener("click", handleNextButtonClick);

  backBtn.addEventListener("click", handleBackButtonClick);
  nextBtn.addEventListener("click", handleNextButtonClick);
}

function handleBackButtonClick() {
  if (currentStep > 1) {
    changeStep(-1);
  }
}

function handleNextButtonClick() {
  if (currentStep < 4) {
    changeStep(1);
  }
}

function changeStep(step) {
  let newStep = currentStep + step;
  let currentStepId = getStepId(currentStep);
  let newStepId = getStepId(newStep);

  if (newStepId) {
    document.getElementById(currentStepId).style.display = "none";
    currentStep = newStep;
    document.getElementById(newStepId).style.display = "block";
    updateButtonVisibility();
    updateUIForCurrentStep();
  }
}
