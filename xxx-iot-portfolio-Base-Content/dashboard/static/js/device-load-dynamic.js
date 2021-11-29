var myDynamicLineChartCanvas = document.getElementById('CCC-chart');

let lineData = {
    datasets: [
        {
            label: 'Data',
            line: '',
            data: [0],
            borderWidth: 2,
            lineTension: 0.2,
            fill: false,
            borderColor: ['rgba(128, 64, 65, 1)',
            ],
        },
    ],
}

let lineOptions = {
    legend: {display: false},
    title: {
        display: true,
        text: 'CPU Load'
    },
    scales: {
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Time',
            },
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Percentage',
            },
            ticks: {
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 100,
            },
        }],
    },
}

var myDynamicLineChart = new Chart(myDynamicLineChartCanvas, {
    type: 'line',
    data: lineData,
    options: lineOptions,
})

var lineUpdate = function() {
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
            let dynamicData = responseObj[responseNumber];


            myDynamicLineChart.data.labels.unshift(dynamicData.created_at);
            myDynamicLineChart.data.datasets[0].data.unshift(dynamicData.load);
            if (counter > 20) {
                myDynamicLineChart.data.labels.pop();
                myDynamicLineChart.data.datasets[0].data.pop();
            }
            myDynamicLineChart.update()
        }
    }
}

setInterval(function() {myDynamicLineChart();}, 1000);







// var lineData = {
//     labels: [
//         '15-34', '35-44', '45-54', '55-64', '65+',
//     ],
//     datasets: [{
//         label: 'Female',
//         line: '',
//         data: [158.6, 140, 146, 81.2, 24.1,],
//         borderWidth: 2,
//         lineTension: 0.2,
//         fill: false,
//         borderColor: ['rgba(128, 64, 65, 1)',],},
//         {
//         label: 'Male',
//         line: '',
//         data: [212.6, 254.4, 261.9, 182.8, 67],
//         borderWidth: 2,
//         lineTension: 0.2,
//         fill: false,
//         borderColor: ['rgba(64, 64, 128, 1)',],},
//     ],
// }
//
// var lineOptions = {
//     legend: {display: false},
//     title: {
//     display: true,
//     text: 'Managers Per Age Range'
//     },
//     scales: {
//         xAxes: [{
//             scaleLabel: {
//             display: true,
//             labelString: 'Age range',
//             },
//         }],
//         yAxes: [{
//             scaleLabel: {
//                 display: true,
//                 labelString: 'Quantity',
//             },
//             ticks: {
//                 beginAtZero: false,
//             },
//         }],
//     },
// }
//
// var myLineChart1 = new
// Chart(lineChartCanvas1, {
//     type: 'line',
//     data: lineData,
//     options: lineOptions,
// })