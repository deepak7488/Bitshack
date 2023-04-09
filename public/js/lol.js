const baseurl = 'http://ec2-13-127-88-43.ap-south-1.compute.amazonaws.com:3000/getquestions?limit=50'
const table = document.getElementById("tableBody")
const tablehead = document.getElementById("tableHead")
const ul = document.getElementById("pagination")
var link = document.createElement('link')
var divcomp = document.getElementById('companywise')
let url = baseurl
const company = new Set()
const topics = new Set()
maindiv = document.getElementById("background")
window.addEventListener('load', function () {
    maindiv.style.display = 'block'; // or 'inline'
});
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

let user = null
if (localStorage.hasOwnProperty('user')) {
    // console.log(JSON.parse(localStorage.getItem('user')))
    user = JSON.parse(localStorage.getItem('user'))
    // console.log(user.done_questions)
}
if (user) {
    console.log("HELLO")
    var welcomeMessage = document.createElement("div");
    var lol = document.getElementById("welcomeMessage")
    // Set the content of the welcome message
    welcomeMessage.innerHTML = "Hello " + user.name + "!"
    // welcomeMessage.style.cssText=
    // Add the welcome message to the HTML document
    lol.appendChild(welcomeMessage);
    // window.location = "http://ec2-13-127-88-43.ap-south-1.compute.amazonaws.com:3000/"
}
// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
async function get_comp() {
    console.log("Heeloo")
    const res = await fetch('http://ec2-13-127-88-43.ap-south-1.compute.amazonaws.com:3000/getquestions',
        { method: 'GET' }
    )
    console.log("Heeloo")
    const data = await res.json()
    console.log(data.length)
    // company = new Set()
    for (let i = 0; i < data.length; i++) {
        JSON.stringify(data[i]['Companies'])
        let map = Object.keys(JSON.parse(JSON.stringify(data[i]['Companies'])))

        map.forEach(function (valu) {
            company.add(valu)
        })
    }
    for (let i = 0; i < data.length; i++) {

        // let map = JSON.parse(JSON.stringify(data[i]['Topics']))
        // console.log(typeof map)
        console.log(JSON.parse(data[i]['Topics'][0].replace(/'/g, '"')))
        let map = JSON.parse(data[i]['Topics'][0].replace(/'/g, '"'))

        map.forEach(function (value) {

            console.log(value)
            topics.add(value)

        })
    }
    var dropdownContent = document.getElementById("myDropdown");
    console.log(topics)
    company.forEach(function (value) {
        var link = document.createElement("a");
        link.href = "#";
        link.textContent = value;
        link.addEventListener("click", function () {
            // Handle click event for each link
            // alert("Clicked " + this.textContent);
            url = baseurl + "&company=" + this.textContent
            // console.log(url)
            // getinfo(url)
            elem(1)
            //         // console.log(this.getAttribute("data-value"));
        });
        dropdownContent.appendChild(link);
    })
    var dropdownContent1 = document.getElementById("myDropdown1");
    topics.forEach(function (value) {
        var link = document.createElement("a");
        link.href = "#";
        link.textContent = value;
        link.addEventListener("click", function () {
            // Handle click event for each link
            // alert("Clicked " + this.textContent);
            url = baseurl + "&topics=" + this.textContent
            // console.log(url)
            // getinfo(url)
            elem(1)
            //         // console.log(this.getAttribute("data-value"));
        });
        dropdownContent1.appendChild(link);
    })
}
get_comp()

const allPages = 2160
const pagesize = 50;
const totalPage = Math.floor(allPages / pagesize) + (allPages % pagesize != 0);
// console.log(totalPage)
let currpage = 1;
elem(1)
async function logout() {
    const link = 'http://ec2-13-127-88-43.ap-south-1.compute.amazonaws.com:3000/users/logout'
    console.log(link)
    let res = await fetch(link, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('loginToken')
        }
    })
    if (res.ok) {
        localStorage.removeItem('user');
        localStorage.removeItem('loginToken');
    }
    window.location = "http://ec2-13-127-88-43.ap-south-1.compute.amazonaws.com:3000/";
}
// getinfo()
async function elem(page) {
    currpage = page
    await getinfo(url)
    let li = '';
    let beforePages = page - 1;
    let afterPages = page + 1;
    let liActive;
    if (page > 1) {
        li += `<li class="page-item" onclick="elem(${page - 1})" ><a class="page-link"><</a></li>`;
    }
    for (let pageLength = beforePages; pageLength <= beforePages + 10; pageLength++) {

        if (pageLength > totalPage) {
            continue;
        }
        if (pageLength == 0) {
            pageLength = pageLength + 1;
        }

        if (page == pageLength) {
            liActive = 'active';
        } else {
            liActive = '';
        }

        li += `<li class="page-item ${liActive}" onclick="elem(${pageLength})" ><a class="page-link">${pageLength}</a></li>`
    }

    if (page < totalPage) {
        li += `<li class="page-item" onclick="elem(${page + 1})" ><a class="page-link">></a></li>`;
    }

    ul.innerHTML = li;
}
async function getinfo(link = baseurl) {
    const skipper = "&skip=" + pagesize * (currpage - 1);
    console.log(skipper)
    const res = await fetch(link + skipper,
        { method: 'GET' }
    )
    // console.log(res)
    const resi = ["Problem Code", "Problem Name", "Difficulty Level", "Topics",
        "Acceptance Percentage", "Popularity", "Companies",
    ]
    var child = table.lastElementChild;
    while (child) {
        table.removeChild(child);
        child = table.lastElementChild;
    }
    tr = document.createElement('tr');
    // var checkbox = document.createElement("input");
    // checkbox.type = "checkbox";
    // tr.appendChild(checkbox)
    tr.style["background-color"] = "#009879"
    tr.style["text-align"] = "center"
    tr.style["color"] = "#ffffff"
    // tr.appendChild(link)
    for (let i = 0; i < resi.length; i++) {
        th = document.createElement('th');
        // th.appendChild(link)
        th.innerHTML = resi[i]
        tr.appendChild(th)
    }

    th = document.createElement('th');
    // th.appendChild(link)
    th.innerHTML = "Done"
    tr.appendChild(th)
    table.appendChild(tr)
    const data = await res.json()
    // console.log(data.length)
    for (let i = 0; i < data.length; i++) {
        tr = document.createElement('tr');
        const lis = Object.keys(data[i])
        for (let j = 0; j < 6; j++) {
            td = document.createElement('td');
            // td.appendChild(link)

            if (j == 1) {
                a = document.createElement('a')
                a.href = data[i]['Problem_Link']
                a.target = "_blank"
                a.innerHTML = data[i][lis[j + 1]]
                a.style.color = "#ffffff"
                td.appendChild(a)
                tr.appendChild(td)
            }
            else {
                td.innerHTML = data[i][lis[j + 1]]
                if (data[i][lis[j + 1]] == 'Easy') {
                    td.style.color = "#00B8A3"
                }
                else if (data[i][lis[j + 1]] == 'Medium') {
                    td.style.color = "#FFC01E"
                }
                else if ((data[i][lis[j + 1]] == 'Hard')) {
                    td.style.color = "#FF375F"
                }
                else
                    td.style.color = "#FFFFFF"
                tr.appendChild(td)
            }
        }
        var result = []
        td = document.createElement('td');
        intial_p = document.createElement('p')
        for (var key in data[i][lis[7]])
            result.push([key, data[i][lis[7]][key]])
        result = result.sort(function (a, b) {
            return b[1] - a[1];
        })
        // result = result.slice(0, 6)
        for (let k = 0; k < result.length; k++) {
            intial_p.innerHTML += result[k][0] + " : " + result[k][1]
            intial_p.innerHTML += ", "
            if (k + 1 == Math.min(6, result.length)) {
                break;
            }
        }
        td.appendChild(intial_p)
        add_p = document.createElement('p')
        add_p.id = "content"
        add_p.style.display = "none"
        for (let k = 6; k < result.length; k++) {
            add_p.innerHTML += result[k][0] + " : " + result[k][1]
            add_p.innerHTML += ", "
        }
        td.appendChild(add_p)
        view_more = document.createElement('button')
        view_more.style.backgroundColor = "transparent"
        view_more.style.border = "none"
        view_more.style.color = "#EFF2F699"
        view_more.id = "viewMore"
        view_more.textContent = "View More";
        view_more.addEventListener("click", function () {
            var content = this.parentNode.children[1];
            var viewMore = this.parentNode.children[2];
            if (content.style.display === "none") {
                content.style.display = "block";
                viewMore.textContent = "View Less";
            } else {
                content.style.display = "none";
                viewMore.textContent = "View More";

            }
        })
        td.appendChild(view_more)
        tr.appendChild(td)
        // console.log(JSON.stringify(data[i]['_id']) + "******")
        tr.setAttribute("data-object-id", data[i]['_id']);
        // console.log(data[i]['_id'])
        const parentBackgroundColor = window.getComputedStyle(tr).backgroundColor;
        td = document.createElement('td');

        var checkbox = document.createElement("input");
        // const elementToAnimate = document.getElementById('elementToAnimate');
        checkbox.type = "checkbox";
        checkbox.style.transform = "scale(2)";
        checkbox.style.marginTop = "15px";
        checkbox.style.height = "auto";
        checkbox.style.marginLeft = "0px"
        if (user && user.done_questions.findIndex(item => item._id === data[i]['_id']) !== -1) {
            checkbox.checked = true
            td.style.backgroundColor = "#90ee90"
        }
        checkbox.addEventListener("change", async function () {
            if (this.checked) {
                let parentElement = this.parentNode;
                this.classList.add('my-animation');
                this.addEventListener('animationend', () => {
                    this.classList.remove('my-animation');
                }, { once: true });
                parentElement.style.backgroundColor = "#90ee90"
                const id = parentElement.parentNode.getAttribute("data-object-id")
                console.log(id)
                // console
                if (user) {
                    const link = 'http://ec2-13-127-88-43.ap-south-1.compute.amazonaws.com:3000/users/' + id
                    console.log(link)
                    let res = await fetch(link, {
                        method: 'POST',
                        headers: {
                            "Content-Type": 'application/json',
                            "Authorization": "Bearer " + localStorage.getItem('loginToken')
                        }
                    })
                    if (res.ok) {
                        user.done_questions.push({ _id: id })
                        localStorage.setItem('user', JSON.stringify(user))
                    }

                    res = await res.json()
                    window.alert(res.msg)
                }

            } else {

                let parentElement = this.parentNode;
                parentElement.style.backgroundColor = parentBackgroundColor
                if (user) {
                    const id = parentElement.parentNode.getAttribute("data-object-id")
                    console.log(id)
                    console.log("*88888*")
                    const link = 'http://ec2-13-127-88-43.ap-south-1.compute.amazonaws.com:3000/users/del/' + id
                    console.log(link)
                    let res = await fetch(link, {
                        method: 'POST',
                        headers: {
                            "Content-Type": 'application/json',
                            "Authorization": "Bearer " + localStorage.getItem('loginToken')
                        }
                    })
                    if (res.ok) {
                        var index = user.done_questions.findIndex(item => item._id === id);
                        user.done_questions.forEach(item => {
                            if (item._id === id) {
                                console.log("HEllo");
                            }
                            console.log(item._id);
                        })

                        if (index !== -1) {
                            user.done_questions.splice(index, 1);
                            localStorage.setItem('user', JSON.stringify(user))
                        }
                    }
                    res = await res.json()

                    window.alert(res.msg)
                }
            }
        });
        td.appendChild(checkbox)
        tr.appendChild(td)
        table.appendChild(tr)
    }
}