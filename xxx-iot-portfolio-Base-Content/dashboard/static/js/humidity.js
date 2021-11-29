var barChartCanvas1 = document.getElementById('AAA-Chart')
var barData = {
    labels: ['Humidity'],
    datasets: [{
        label: 'Humidity',
        data: [51],
        borderWidth: 1,
        backgroundColor: [
            'rgba(111, 45, 168, 0.4)',
        ],
        borderColor: [
            'rgba(252, 205, 67, 1)',
        ],
    }],
}

var barOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            },
        }],
    },
}

var myBarChart1 = new Chart(barChartCanvas1, {
    type: 'bar',
    data: barData,
    options: barOptions,
})

var barUpdate = function () {
    let url = "http://127.0.0.1:5500/api/humidity";
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
            let humidity = response.humidity;
            console.log(humidity)
            myBarChart1.data.datasets[0].data = [humidity];
            myBarChart1.update();
        }
    }
}

setInterval(function() {barUpdate}, 1000);