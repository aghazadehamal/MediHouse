const staffs = [
  {
    id: 1,
    name: "Alex Rosetta",
    email: "alexyrosetta@gmail.com",
    image: "images/doctorMan.jpeg",
  },
  {
    id: 2,
    name: "Maria July",
    email: "mariajuly@gmail.com",
    image: "images/doctorGirl.jpeg",
  },
];

const services = [
  {
    id: 1,
    name: "Oral hygiene",
    image: "images/teethOne.jpeg",
    duration: "1 hour",
    price: 50.0,
  },
  {
    id: 2,
    name: "Implants",
    image: "images/teethTwo.jpeg",
    duration: "1 hour 30 minute",
    price: 120.0,
  },
  {
    id: 3,
    name: "Chek up",
    image: "images/teethThree.jpeg",
    duration: "1 hour 12 minute",
    price: 140.0,
  },
];

const dates = ["2024-02-22", "2024-02-23", "2024-02-24", "2024-02-25"];

const times = [
  { start_time: "09:00", end_time: "09:30" },
  { start_time: "10:00", end_time: "10:30" },
  { start_time: "11:00", end_time: "11:30" },
  { start_time: "13:00", end_time: "13:30" },
  { start_time: "14:00", end_time: "14:30" },
  { start_time: "15:00", end_time: "15:30" },
];

let reservation = {
  staff_id: null,
  service_id: null,
  date: null,
  time: null,
  customer: {
    name: null,
    surname: null,
    email: null,
    phone: null,
  },
};

document.addEventListener("DOMContentLoaded", () => {
  showStaffSelection();
});

function showStaffSelection() {
  const staffSelectionDiv = document.getElementById("staff-selection");
  staffSelectionDiv.style.display = "block";
  staffSelectionDiv.innerHTML = "";

  staffs.forEach((staff) => {
    const staffCard = document.createElement("div");
    staffCard.classList.add("staff-card");

    const image = document.createElement("img");
    image.src = staff.image;
    image.alt = staff.name;
    image.classList.add("staff-image");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("staff-info");

    const name = document.createElement("h3");
    name.classList.add("staff-name");
    name.textContent = staff.name;

    const email = document.createElement("p");
    email.classList.add("staff-email");
    email.textContent = staff.email;

    infoDiv.appendChild(name);
    infoDiv.appendChild(email);

    staffCard.appendChild(image);
    staffCard.appendChild(infoDiv);

    staffCard.addEventListener("click", () => selectStaff(staff.id));
    staffSelectionDiv.appendChild(staffCard);
  });
}

function selectStaff(staffId) {
  reservation.staff_id = staffId;
  document.getElementById("staff-selection").style.display = "none";
  showServiceSelection();

  document
    .querySelector('[data-section="staff-selection"]')
    .classList.add("completed");
}

function showServiceSelection() {
  const serviceSelectionDiv = document.getElementById("service-selection");
  serviceSelectionDiv.style.display = "flex";
  serviceSelectionDiv.innerHTML = "";

  services.forEach((service) => {
    const serviceCard = document.createElement("div");
    serviceCard.classList.add("service-card");

    const image = document.createElement("img");
    image.src = service.image;
    image.alt = service.name;
    image.classList.add("service-image");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("service-info");

    const name = document.createElement("h3");
    name.classList.add("service-name");
    name.textContent = service.name;

    const duration = document.createElement("p");
    duration.classList.add("service-duration");
    duration.textContent = service.duration;

    const price = document.createElement("p");
    price.classList.add("service-price");
    price.textContent = `$${service.price.toFixed(2)}`;

    infoDiv.appendChild(name);
    infoDiv.appendChild(duration);
    infoDiv.appendChild(price);

    serviceCard.appendChild(image);
    serviceCard.appendChild(infoDiv);

    serviceCard.addEventListener("click", () => selectService(service.id));

    serviceSelectionDiv.appendChild(serviceCard);
  });
}

function showDateSelection() {
  const dateSelectionDiv = document.getElementById("date-selection");
  const calendarContainer = document.getElementById("calendar-container");
  const dateContainer = document.getElementById("date-container");

  dateSelectionDiv.style.display = "flex";
  dateSelectionDiv.innerHTML = "";

  const calendarHeader = document.createElement("div");
  calendarHeader.className = "calendar-header";
  const prevButton = document.createElement("button");
  prevButton.innerText = "<";
  const nextButton = document.createElement("button");
  nextButton.innerText = ">";
  const monthLabel = document.createElement("span");
  monthLabel.innerText = "August 2023";
  calendarHeader.appendChild(prevButton);
  calendarHeader.appendChild(monthLabel);
  calendarHeader.appendChild(nextButton);
  calendarContainer.innerHTML = "";
  dateContainer.innerHTML = "";

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysRow = document.createElement("div");
  daysRow.className = "days-row";
  dayNames.forEach((dayName) => {
    const dayCell = document.createElement("div");
    dayCell.className = "day-cell";
    dayCell.innerText = dayName;
    daysRow.appendChild(dayCell);
  });

  const datesGrid = document.createElement("div");
  datesGrid.className = "dates-grid";
  for (let day = 1; day <= 31; day++) {
    const dateCell = document.createElement("div");
    dateCell.className = "date-cell";
    dateCell.innerText = day;
    dateCell.onclick = function () {
      selectDate(`2023-08-${day}`);
    };
    datesGrid.appendChild(dateCell);
  }

  const timeSelection = document.createElement("div");
  timeSelection.className = "time-selection";
  times.forEach((time) => {
    const timeSlot = document.createElement("div");
    timeSlot.className = "time-slot";
    timeSlot.innerText = `${time.start_time} - ${time.end_time}`;
    timeSlot.onclick = function () {
      selectTime(time);
    };
    timeSelection.appendChild(timeSlot);
  });

  calendarContainer.appendChild(calendarHeader);
  calendarContainer.appendChild(daysRow);
  calendarContainer.appendChild(datesGrid);

  dateContainer.appendChild(timeSelection);
  dateSelectionDiv.appendChild(calendarContainer);
  dateSelectionDiv.appendChild(dateContainer);
}

function showConfirmationSection() {
  const confirmationSection = document.getElementById("confirmation");
  confirmationSection.style.display = "block";
}

document.getElementById("confirmation-form").addEventListener("submit", (e) => {
  e.preventDefault();
  reservation.customer.name = document.getElementById("name").value;
  reservation.customer.surname = document.getElementById("surname").value;
  reservation.customer.email = document.getElementById("email").value;
  reservation.customer.phone = document.getElementById("phone").value;

  confirmBooking();
});

function confirmBooking() {
  const confirmationSection = document.getElementById("confirmation");
  confirmationSection.innerHTML = `
    <h2>Rezervasyon Bilgileri</h2>
    <p><strong>Personel:</strong> ${
      staffs.find((staff) => staff.id === reservation.staff_id).name
    }</p>
    <p><strong>Hizmet:</strong> ${
      services.find((service) => service.id === reservation.service_id).name
    }</p>
    <p><strong>Tarih:</strong> ${reservation.date}</p>
    <p><strong>Saat:</strong> ${reservation.time.start_time} - ${
    reservation.time.end_time
  }</p>
    <p><strong>Müşteri Adı:</strong> ${reservation.customer.name}</p>
    <p><strong>Müşteri Soyadı:</strong> ${reservation.customer.surname}</p>
    <p><strong>Email:</strong> ${reservation.customer.email}</p>
    <p><strong>Telefon:</strong> ${reservation.customer.phone}</p>
  `;

  console.log("Rezervasyon bilgileri:", reservation);
  alert("Rezervasyonunuz onaylandı!");
}

function markStepAsCompleted(step) {
  const completedStepElement = document.querySelector(
    `.menu-item[data-section="${step}"]`
  );
  completedStepElement.classList.add("completed");
  completedStepElement.classList.remove("active");
  switch (step) {
    case "staff-selection":
      stepCompletionStatus.staffSelectionCompleted = true;
      break;
    case "service-selection":
      stepCompletionStatus.serviceSelectionCompleted = true;
      break;
    case "date-selection":
      stepCompletionStatus.dateSelectionCompleted = true;
      break;
    case "confirmation":
      stepCompletionStatus.confirmationCompleted = true;
      break;
  }
  updateButtonVisibility();
}

let stepCompletionStatus = {
  "staff-selection": false,
  "service-selection": false,
  "date-selection": false,
  "time-selection": false,
};

function canProceedToNextStep(currentStep) {
  return stepCompletionStatus[currentStep];
}

function markStepAsCompleted(step) {
  stepCompletionStatus[step] = true;
  updateButtonVisibility();
}

function handleNextButtonClick() {
  let currentStepId = getStepId(currentStep);
  if (canProceedToNextStep(currentStepId)) {
    if (currentStep < 4) {
      changeStep(1);
    }
  } else {
    alert("Lütfen bu adımı tamamlayın.");
  }
}
