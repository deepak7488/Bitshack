const switchers = [...document.querySelectorAll('.switcher')]
const signup = document.getElementsByClassName("btn-signup");
const login = document.getElementsByClassName("btn-login");
login[0].addEventListener('click', async function (e) {
    e.preventDefault()
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    try {
        let res = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        console.log("Hello")
        if (res.status == 400) {
            window.alert("Invalid Email or Password!")
            // let data = await res.json();
            // if (data.errors != undefined && Object.keys(data.errors).length > 0)
            //     window.alert(data[Object.keys(data.errors)[0]].message);
            // else if (data.code == 11000)
            //     window.alert("User already Exist")
        }
        else {
            let data = await res.json();
            localStorage.setItem('loginToken', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            // console.log(data.user.name)
            // window.alert("Sucesss! User Created")
            // console.log(JSON.parse(localStorage.getItem('user')).name)
            window.location = "http://localhost:3000/user";

        }
    }
    catch (e) {
        window.alert(e);
    }
})
signup[0].addEventListener('click', async function (e) {
    e.preventDefault()
    const name = document.getElementById("signup-username").value;
    const age = document.getElementById("signup-age").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    console.log(name)
    console.log(age)
    console.log(email)
    console.log(password)
    try {
        let res = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                name,
                age,
                email,
                password
            })
        })
        console.log("Hello")
        if (res.status == 400) {
            let data = await res.json();
            if (data.errors != undefined && Object.keys(data.errors).length > 0)
                window.alert(data[Object.keys(data.errors)[0]].message);
            else if (data.code == 11000)
                window.alert("User already Exist")
        }
        else {
            let data = await res.json();
            localStorage.setItem('loginToken', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            window.alert("Sucesss! User Created")
            console.log(localStorage.getItem('loginToken'))
            window.location = "http://localhost:3000/user";

        }
    }
    catch (e) {
        window.alert(e);
    }


})
switchers.forEach(item => {
    item.addEventListener('click', function () {
        switchers.forEach(item => item.parentElement.classList.remove('is-active'))
        this.parentElement.classList.add('is-active')
    })
})
