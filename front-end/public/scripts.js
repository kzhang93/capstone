const timeSlots = [
    '00:00-02:00', '02:00-04:00', '04:00-06:00', '06:00-08:00',
    '08:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00',
    '16:00-18:00', '18:00-20:00', '20:00-22:00', '22:00-00:00'
];

const courses = [
    { value: 'CSE 219', name: 'CSE 219 Object Oriented Programming & Data Structures' },
    { value: 'COM 525', name: 'COM 525 Introduction to Human Computer Interaction' },
    { value: 'MAT 107', name: 'MAT 107 Introduction to Mathematics' },
    { value: 'PPE 208', name: 'PPE 208 Table Tennis II' },
    { value: 'CHI 103', name: 'CHI 103 Elementary Chinese' },
    { value: 'KOR 308', name: 'KOR 308 Third-year Korean I' }
];


const todayInSydney = new Date().toLocaleDateString('en-CA', {
    timeZone: 'Australia/Sydney'
});


document.getElementById('datePicker').setAttribute('min', todayInSydney);

// Populate courses
const courseSelect = document.getElementById('courseSelect');
courses.forEach(course => {
    let option = document.createElement('option');
    option.value = course.value;
    option.textContent = course.name;
    courseSelect.appendChild(option);
});

// Populate the timeSelect dropdown with available time slots
const timeSelect = document.getElementById('timeSelect');
timeSlots.forEach(slot => {
    let option = document.createElement('option');
    option.value = slot;
    option.textContent = slot;
    timeSelect.appendChild(option);
});

const bookBtn = document.getElementById('bookBtn');
const notification = document.getElementById('notification');

bookBtn.addEventListener('click', function() {
    let course = document.getElementById('courseSelect').value;
    let date = document.getElementById('datePicker').value;
    let time = document.getElementById('timeSelect').value;

    if (!date || !time) {
        alert("Please select a date and time slot!");  // 弹出提示框
        return;
    }

    // Add the appointment request to the pendingAppointments array
    const pendingAppointments = [];
    pendingAppointments.push({
        course: course,
        date: date,
        time: time
    });

    alert(`Requested appointment for ${course} on ${date} at ${time}. Waiting for tutor confirmation...`);
});
