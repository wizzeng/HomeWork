    (function () {
    fetch('https://devapi.qweather.com/v7/weather/now?location=101010100&key=d5ac0a6c09744938a42280a05a2f2858&lang=en')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
            let updateTime = new Date(myJson.updateTime);
            console.log(updateTime);
            let obsDate = updateTime.getDate();
            let obsYear = updateTime.getFullYear();
            let obsTem = myJson.now.temp;
            let obsHumidity = myJson.now.humidity;
            let obsWind = myJson.now.windSpeed;
            let obsPrecip = myJson.now.precip;

            let todayName = document.getElementsByClassName('date-dayName')[0];
            let location = document.getElementsByClassName('location')[0];
            let todayTemp = document.getElementsByClassName('weather-temp')[0];
            let todayWeather = document.getElementsByClassName('weather-desc')[0];
            let todayDate = document.getElementsByClassName('date-day')[0];
            let values = document.getElementsByClassName('value');


            function showTodayInfo() {
                todayName.innerHTML = getWeekDay(updateTime);
                location.innerHTML = 'BeiJing';
                todayTemp.innerHTML = obsTem + '℃';
                todayWeather.innerHTML = myJson.now.text;
                todayDate.innerHTML = obsDate + ' ' + getMonth(updateTime) + ' ' + obsYear;
                values[0].innerHTML = obsPrecip + ' mm';
                values[1].innerHTML = obsHumidity + ' %';
                values[2].innerHTML = obsWind + ' km/h';

                // function nextDay() {
                //     updateTime.setDate(updateTime.getDate() + 1);
                // }

            }

            showTodayInfo();

            function showInfo() {
                console.log(myJson.updateTime);
                console.log('Weather: ' + myJson.now.text);
                console.log('day: ' + getWeekDay(updateTime));
                console.log('Month: ' + getMonth(updateTime));
                console.log('Date: ' + obsDate);
                console.log('Year: ' + obsYear);
                console.log('Temperature: ' + obsTem + ' ℃');
                console.log('Precipitation: ' + obsPrecip + ' mm');
                console.log('Humidity: ' + obsHumidity + ' %');
                console.log('Wind: ' + obsWind + ' km/h');
            }

            showInfo();


        });

    fetch('https://devapi.qweather.com/v7/weather/3d?location=101010100&key=d5ac0a6c09744938a42280a05a2f2858&lang=en')
    .then(function (response) {
    return response.json();
})
    .then(function (weather3d) {
    console.log(weather3d);

    let dayNames = document.getElementsByClassName('day-name');
    let dayTempMins = document.getElementsByClassName('tempMin');
    let dayTempMaxs = document.getElementsByClassName('tempMax');

    function showAfterInfo() {
    let nowDate = weather3d.daily[0].fxDate;
    let afterDate = [];
    let tempMin = [];
    let tempMax = [];
    let updateTime = ['','','',new Date(nowDate)];
    for (let i = 0; i < 3; i++) {
    afterDate[i] = weather3d.daily[i].fxDate;
    tempMin[i] = weather3d.daily[i].tempMin;
    tempMax[i] = weather3d.daily[i].tempMax;
    updateTime[i] = new Date(afterDate[i]);
    dayNames[i].innerHTML = getWeekDay(updateTime[i]).slice(0, 3);
    dayTempMins[i].innerHTML = tempMin[i] +'℃';
    dayTempMaxs[i].innerHTML = tempMax[i] +'℃';
}
    updateTime[3].setDate(updateTime[0].getDate() + 3);
    dayNames[3].innerHTML = getWeekDay(updateTime[3]).slice(0, 3);
    dayTempMins[3].innerHTML = tempMin[2] +'℃';
    dayTempMaxs[3].innerHTML = tempMax[2] +'℃';
}

    showAfterInfo();
});

    function getWeekDay(date) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

    function getMonth(date) {
    let Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return Month[date.getMonth()];
}
})();


