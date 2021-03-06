/* Global Variables */
// The URL for the API call from openweathermap site
const mainURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Personal API Key for OpenWeatherMap API followed by metric to get the temp at celesius
const apiKey = "&appid=dba359d4151b7d065146d5789e79b789&units=metric";

// The URL for the server to post data
const server = "http://127.0.0.1:5000";

//set variables to to get client inputs
const zipCode = document.getElementById("zip");
const getFeeling = document.getElementById("feelings");


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();




// get web API Data
const getData = async(zipValue) => {
    try {
        const res = await fetch(mainURL + zipValue + apiKey);
        const data = await res.json();

        return data;
    } catch (error) {
        console.log("error", error);
    }

};

// Post data
const postData = async(url = '', dataValue = {}) => {
    const res = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataValue),
    });
    try {
        const newValue = await res.json();
        return newValue;
    } catch (error) {
        console.log("error", error);
    }
};

//Function to GET Project Data
// Update document with the new data
const retrieveData = async() => {
    const res = await fetch(server + "/all");
    try {
        // Transform into JSON
        const allData = await res.json();
        console.log(allData)

        // Write updated data to DOM elements
        document.getElementById("date").innerHTML = 'Date:  ' + allData.newDate;
        document.getElementById("temp").innerHTML = 'Temprature:  ' + allData.temp + ' &degC';
        document.getElementById("content").innerHTML = 'I feel ' + allData.feelingsValue;
    } catch (error) {
        console.log("error", error);
    }
};



// get input values then call data to fetch it from API then post and update it

const getPostData = () => {
    const zipValue = zipCode.value;
    const feelingsValue = getFeeling.value;

    //get data and return it updated
    getData(zipValue).then((data) => {
        if (data) {
            // check the received data
            const {
                main: {
                    temp
                },
            } = data;

            const dataValue = {
                newDate,
                temp,
                feelingsValue,
            };
            postData(server + "/add", dataValue);

            retrieveData();
        }
    });

};
// Add event listener to get values  by running the function generateValue after clicking on the button
document.getElementById("generate").addEventListener("click", getPostData);