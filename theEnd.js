let currentStep = 1;

function changeStep(step) {
  document.getElementById(getStepId(currentStep)).style.display = "none";

  currentStep += step;

  document.getElementById(getStepId(currentStep)).style.display = "block";

  updateButtonVisibility();

  updateUIForCurrentStep();
}

function updateButtonVisibility() {
  document.getElementById("backBtn").style.display =
    currentStep === 1 ? "none" : "inline-block";
  document.getElementById("nextBtn").style.display =
    currentStep === 4 ? "none" : "inline-block";
}

function getStepId(step) {
  switch (step) {
    case 1:
      return "staff-selection";
    case 2:
      return "service-selection";
    case 3:
      return "date-selection";
    case 4:
      return "confirmation";
    default:
      return "";
  }
}

function updateUIForCurrentStep() {
  switch (currentStep) {
    case 1:
      showStaffSelection();
      break;
    case 2:
      showServiceSelection();
      break;
    case 3:
      showDateSelection();
      break;
    case 4:
      showConfirmationSection();
      break;
  }
}

function selectStaff(staffId) {
  reservation.staff_id = staffId;
  markStepAsCompleted("staff-selection");
  document.getElementById("nextBtn").style.display = "inline-block";
}

function selectService(serviceId) {
  reservation.service_id = serviceId;
  document.getElementById("nextBtn").style.display = "inline-block";
}
function selectDate(date) {
  reservation.date = date;
}

function selectTime(time) {
  reservation.time = time;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("backBtn").addEventListener("click", () => {
    if (currentStep > 1) changeStep(-1);
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentStep < 4) changeStep(1);
  });

  updateUIForCurrentStep();
});
