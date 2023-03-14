import { useRouter } from 'next/router'

function Login() {
    const router = useRouter()
    function check() {
        var username = document.getElementById('username').value
        var password = document.getElementById('password').value
        if (username === "admin" && password === "adminpassword") {
            router.push('/')
        }
        else {
            alert('Invalid Username or Password')
        }
    }
    return (
        <div className="MainLoginDiv">
            <div className="loginStyleDiv">
                <div className="loginImgDiv">
                    <img
                        src="https://res.cloudinary.com/diln1gaxk/image/upload/f_auto,c_limit,w_256,q_auto/Foorigin/foorgin_logo_green_n1fre0.png"
                        alt="Feta logo"
                        height={80}
                        width={80} />
                </div>
                <div className="login">
                    <div className="credentials">
                        <label>UserName</label>
                        <input type="text" placeholder="admin username" id="username" name="username" />
                    </div>
                    <div className="credentials">
                        <label>Password</label>
                        <input type="password" placeholder="admin password" id="password" name="password" />
                    </div>
                    <div className="loginSubmit">
                        <button onClick={check}>submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login