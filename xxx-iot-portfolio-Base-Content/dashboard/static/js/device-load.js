var pieChartCanvas2 = document.getElementById('device-load-pie')

var pieData = {
    labels: ['CPU Use', 'Idle'],
    datasets: [{
        data: [0, 100],
        borderWidth: 2,
        borderAlign: 'inner',
        borderWidth: 2,
        borderAlign: 'inner',
        backgroundColor: [
            'rgba(192, 0, 0, 0.4)',
            'rgba(64, 64, 192, 0.4)',
        ],
        borderColor: [
            'rgba(192, 0, 0, 1)',
            'rgba(64, 64, 192, 1)',
            ],
    }],
}  

var pieOptions = {}

var myPieChart = new Chart(pieChartCanvas2, {
    type: 'pie',
    data: pieData,
    options: pieOptions,
})

var pieUpdate = function() {
    let url = "http://127.0.0.1:5500/api/device-load";
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
            let cpu_load = response.load;
            let cpu_idle = 100 - cpu_load;

            console.log(response.created_at)
            console.log(response.load)
            myPieChart.data.datasets[0].data = [cpu_load, cpu_idle]
            myPieChart.update()
        }
    }
}

//let url = "http://127.0.0.1:5000/api/device_load";
//let method = "GET";
//let typeOfResponse = "json";
//
//let xhr = new XMLHttpRequest();
//xhr.open(method, url);
//xhr.responseType = typeOfResponse;
//xhr.send();
//
//xhr.onload = function() {
//    let responseObj = xhr.response;
//    for (let responseNumber in responseObj) {
//        let response = responseObj[responseNumber]
//        console.log(response.created_at)
//        console.log(response.load)
//    }
//}

setInterval(function() {pieUpdate();}, 1000);