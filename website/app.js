//get the id of the box that information inside it
let future = document.getElementById('future-forecast');
// get the id of the input element of zibcode
let zipcode = document.getElementById('zip');
// get the id of the input element of feeling
let feel = document.getElementById('feelings');
// get the id of the button that appear the information of weather
let generate = document.getElementById('generate');
//make the object of Data to get the date of the day
let d = new Date();
// get month from time object
const month = d.getMonth();
// get date from time object
const date = d.getDate();
// get day from time object
const day = d.getDay();
// Array of days name
const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
// Array of months name
const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];
//get the date formate
const dates = days[day] + ', ' + date + ' ' + months[month];
//BaseUrl of openweathermap to get information from it
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
//apikey for me
const apiKey = '&appid=a68966e883deaed989979c361e163259';
//get the id of part that date appear
let dateEle = document.getElementById('dateid');
//get the id of part that temperature appear
let tempEle = document.getElementById('temp');
//get the id of part that content appear
let feelEle = document.getElementById('content');

// add the event to the button that id is generate
generate.addEventListener('click', (e) => {
    //get the value from zipcode input
    let zipvalue = zipcode.value;
    //get the value from feelings input
    let feelvalue = feel.value;
    //aad the opacity arrribute to future element
    future.style.opacity = 1;
    /** 
    call the get func with three arg (baseurl , zipvalue , apikey) 
    with chain promises to post some data that get from the openweathermap then
    call updateui function
    */
    getWeather(baseUrl, zipvalue, apiKey).then((data) => {
        console.log(data);
        postData('/add', { date: dates, temperature: data.main.temp, user_response: feelvalue });
    }).then(() =>
        updateUI()
    );
});


const getWeather = async(baseUrl, zip, apiKey) => {
    const res = await fetch(baseUrl + zip + apiKey);
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

// This func to make the post response to the server with some data
const postData = async(url = '', data = {}) => {
    console.log(data);
    /**
    we use the await fetch because this func is async func
    the fetch func is pass with two param the first is url of data and 
    the second is the object of data to Specify the method of request ,
    the cardentials or cookies , the header of request to server and
    the last thing is the body of reaquest
    */
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
    // when the process of post data is success the console will print the newdata
    //when the process is failled the catch method will use and print the error in console
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const updateUI = async() => {
    const request = await fetch('/all');

    try {
        const allData = await request.json();
        console.log(allData);
        dateEle.innerHTML = "Date : " + allData.date;
        tempEle.innerHTML = "Temperature : " + (allData.temperature - 273).toFixed(2) + ` <span>&#8451;</span>`;
        feelEle.innerHTML = "Content : " + allData.user_response;

    } catch (error) {
        console.log("error", error);
    }
}