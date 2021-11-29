var pressureChartCanvas1 = document.getElementById('BBB-Chart')
var pressureData = {
    labels: ['Pressure'],
    datasets: [{
        label: 'Pressure',
        data: [960.0],
        borderWidth: 1,
        backgroundColor: [
            'rgba(168, 45, 111, 0.4)',
        ],
        borderColor: [
            'rgba(252, 67, 205, 1)',
        ],
    }],
}

var pressureOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            },
        }],
    },
}

var myPressureChart1 = new Chart(pressureChartCanvas1, {
    type: 'bar',
    data: pressureData,
    options: pressureOptions,
})

var pressureUpdate = function () {
    let url = "http://127.0.0.1:5500/api/pressure";
    let method = "GET";
    let typeOfResponse = "json";

    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = typeOfResponse;
    xhr.send();

    xhr.onload = function() {
        let responseObj = xhr.response;
        for (let responseNumber in responseObj) {
            let response = responseObj[responseNumber]
            let pressure = response.pressure;
            console.log(pressure)
            myPressureChart1.pressureData.datasets[0].data = [pressure];
            myPressureChart1.update();
        }
    }
}

setInterval(function() {pressureUpdate}, 1000);