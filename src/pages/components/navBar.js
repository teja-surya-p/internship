import { useRouter } from 'next/router'

function NavBar() {
    const router = useRouter()
    function redirect() {
        router.push('/components/Login')
    }
    return (
        <div className="Nav">
            <div className='img1'>
                <img
                    src="https://res.cloudinary.com/diln1gaxk/image/upload/f_auto,c_limit,w_256,q_auto/Foorigin/foorgin_logo_green_n1fre0.png"
                    alt="Feta logo"
                    height="66vh"
                    width="66vw" />
            </div>
            <div className='img2'>
                <img
                    src="https://res.cloudinary.com/diln1gaxk/image/upload/f_auto,c_limit,w_3840,q_auto/Foorigin/fetachain_quality_typeface_abiwte.png"
                    alt="Feta Chain"
                    height="66vh"
                    width="320vw" />
            </div>

            {/* <div className="Nav-Admin">
                <button onClick={redirect}> Admin Login</button>
            </div> */}
        </div>
    )
}

export default NavBar