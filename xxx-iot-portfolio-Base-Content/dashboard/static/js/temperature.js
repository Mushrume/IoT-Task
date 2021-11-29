var tempChartCanvas1 = document.getElementById('CCC-Chart')
var tempData = {
    labels: ['Temperature'],
    datasets: [{
        label: 'Temperature',
        data: [24],
        borderWidth: 1,
        backgroundColor: [
            'rgba(168, 100, 10, 0.4)',
        ],
        borderColor: [
            'rgba(252, 250, 50, 1)',
        ],
    }],
}

var tempOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            },
        }],
    },
}

var myTempChart1 = new Chart(tempChartCanvas1, {
    type: 'bar',
    data: tempData,
    options: tempOptions,
})

var tempUpdate = function () {
    let url = "http://127.0.0.1:5500/api/temperature";
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
            let temp = response.pressure;
            console.log(temp)
            myTempChart1.pressureData.datasets[0].data = [temp];
            myTempChart1.update();
        }
    }
}

setInterval(function() {tempUpdate}, 1000);