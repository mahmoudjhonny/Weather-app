// get time by id from html document
const gettime = document.getElementById('time');
// get date by id from html document
const getdate = document.getElementById('date');
// Array of days name
const daysname = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    // Array of months name
const monthsname = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// function to set the time and date of day
setInterval(() => {
    // function to get the time from local device
    const time = new Date();
    // get month from time object
    const month = time.getMonth();
    // get date from time object
    const date = time.getDate();
    // get day from time object
    const day = time.getDay();
    // get hour from time object
    const hour = time.getHours();
    // to make the time in 12 hours mode
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
        // get minutes from time object
    const minutes = time.getMinutes();
    // to set if the hours is greater or equel 12 is use "pm" else that use "Am"
    const ampm = hour >= 12 ? 'PM' : 'AM'
        // set time formate
    gettime.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`
        // set date formate
    getdate.innerHTML = daysname[day] + ', ' + date + ' ' + monthsname[month]

}, 1000);