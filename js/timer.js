function updateDateTime() {
    const now = new Date();

    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString(undefined, options);

    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    timeElement.textContent = now.toLocaleTimeString(undefined, timeOptions);
}

setInterval(updateDateTime, 1000);
updateDateTime(); // Call it once to set the initial time