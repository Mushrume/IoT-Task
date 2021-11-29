// var lineChartCanvas1 =
//     document.getElementById('line-chart')

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
//         borderColor: [
//             'rgba(128, 64, 65, 1)',
//         ],},
//         {
//             label: 'Male',
//             line: '',
//             data: [212.6, 254.4, 261.9, 182.8, 67],
//             borderWidth: 2,
//             lineTension: 0.2,
//             fill: false,
//             borderColor: [
//                 'rgba(64, 64, 128, 1)',
//             ],
//         },
//     ],
// }

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

// var myLineChart1 = new
// Chart(lineChartCanvas1, {
//     type: 'line',
//     data: lineData,
//     options: lineOptions,
// })