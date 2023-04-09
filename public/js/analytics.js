const ctx = document.getElementById('myChart');
const cty = document.getElementById('myChart2');
const ctz = document.getElementById('myChart3');
var username = document.getElementById('username');
var coderid = document.getElementById('coder_id');
var date_of_joining = document.getElementById('Date');

ctx.height = 300;
cty.height = 300;
ctz.height = 300;
let user = null
diffculty = [0, 0, 0]
let Topics = new Map();
// let company = new Map();
if (localStorage.hasOwnProperty('user')) {
    user = JSON.parse(localStorage.getItem('user'))
}
if (user) {
    var objectId = user._id
    var hexString = objectId.toString().substring(0, 8); // Get the first 8 characters of the object ID as a hexadecimal string
    var alphanumericString = parseInt(hexString, 16).toString(36).padStart(8, '0').toUpperCase(); // Convert the hexadecimal string to a base-36 alphanumeric string with leading zeros if necessary
    var date = new Date(user.createdAt);
    var day = date.getUTCDate().toString().padStart(2, '0'); // Get the day of the month, and add leading zeros if necessary
    var month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Get the month (adjusted for zero-based index), and add leading zeros if necessary
    var year = date.getUTCFullYear().toString(); // Get the year
    var formattedDate = day + '-' + month + '-' + year;
    date_of_joining.textContent = formattedDate
    date_of_joining.style.color = "#00B8A3"
    username.textContent = user.name
    username.style.color = "#00B8A3"
    coderid.textContent = alphanumericString
    coderid.style.color = "#00B8A3"
}
// date_of_joining.textContent = user.t
async function get_data() {
    if (user) {
        const link = 'http://localhost:3000/users/me'
        console.log(link)
        let res = await fetch(link, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('loginToken')
            }
        })

        if (res.ok) {
            res = await res.json()

            for (let i = 0; i < res.done_questions.length; i++) {
                // console.log(res.done_questions[i]);
                console.log(JSON.stringify(res.done_questions[i]._id));
                let map = JSON.parse(res.done_questions[i]._id.Topics[0].replace(/'/g, '"'))
                map.forEach(function (value) {

                    if (Topics.has(value)) {
                        Topics.set(value, Topics.get(value) + 1)
                    }
                    else
                        Topics.set(value, 1)
                })
                if (res.done_questions[i]._id.Difficulty_Level === 'Easy') diffculty[0]++;
                else if (res.done_questions[i]._id.Difficulty_Level === 'Medium') diffculty[1]++;
                else diffculty[2]++;
            }
        }
    }
    // console.log(Topics["Array"])
    // console.log(Topics.keys())
    create_Diff_chart()
    create_topics_chart()
    create_Comapany_chart()

}
function create_Diff_chart() {
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Easy', 'Medium', 'Hard'],
            datasets: [
                {
                    label: 'Difficulty Level',
                    data: diffculty,
                    borderWidth: 1,
                    backgroundColor: ["#00B8A3", "#FFC01E", "#FF375F"],
                }
            ]
        },
        options: {
            legend: {
                position: 'left',
                padding: 4

            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                customCanvasBackgroundColor: {
                    color: 'black',
                }
            }
        },
        // plugins: [plugin]
    }
    );

}
// 'Amazon' => 123,
//'Adobe' => 52,
//'Apple' => 43,
//'Google' => 39,
//'Microsoft' => 27,
//'Facebook' => 23,
//'Bloomberg' => 17,
//'Uber' => 13,
//'Spotify' => 12,
//'Oracle' => 7,
// 'Zoho' => 6,
//'Yahoo' => 5,                                                                            'Capgemini' => 2
function create_Comapany_chart() {
    var data = [];
    for (var i = 0; i < 12; i++) {
        data.push(Math.floor(Math.random() * 100));
    }
    let backgroundColors = [];

    for (let i = 0; i < 12; i++) {
        let color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
        backgroundColors.push(color);
    }
    new Chart(ctz, {
        type: 'doughnut',
        data: {
            labels: ['Amazon', 'Adobe', 'Apple', 'Google', 'Microsoft', 'Facebook', 'Bloomberg', 'Uber', 'Spotify', 'Zoho', 'Yahoo', 'Capgemini'],
            datasets: [
                {
                    label: 'Difficulty Level',
                    data: data,
                    borderWidth: 1,
                    backgroundColor: backgroundColors,
                }
            ]
        },
        options: {
            legend: {
                position: 'left'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                customCanvasBackgroundColor: {
                    color: 'black',
                }
            }
        },
        // plugins: [plugin]
    }
    );
}
function create_topics_chart() {

    // console.log(Topics.keys())
    let labels = [];
    let values = [];
    for (let [key, value] of Topics) {
        labels.push(key)
        values.push(value)
    }
    let backgroundColors = [];

    for (let i = 0; i < labels.length; i++) {
        let color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
        backgroundColors.push(color);
    }
    console.log(backgroundColors)
    new Chart(cty, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Topic Wise',
                    data: values,
                    borderWidth: 1,
                    backgroundColor: backgroundColors,
                }
            ]
        },
        options: {
            legend: {
                position: 'left'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                customCanvasBackgroundColor: {
                    color: 'black',
                }
            }
        },
        // plugins: [plugin],
    });
}
get_data()
