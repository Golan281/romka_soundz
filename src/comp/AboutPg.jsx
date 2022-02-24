// import romka_main_img from '../../src/img'
import romka_main_img from '../img/romka_main_img.JPG';

export const AboutPg = () => {
    return (
        <div>
            {/* <img className="img-resize" src={romka_main_img} className="main-img" alt="romkasoundz-profile-img"></img> */}
            {/* resize img asap */}
            <h1>About/Bio</h1>
            <p>
            bio bio bio bio bio bio<br></br>
            bio bio bio bio bio bio<br></br>
            bio bio bio bio bio bio<br></br>
            bio bio bio bio bio bio
            </p>

            <div className="img-resize">
                <img  src={romka_main_img} className="main-img" alt="romkasoundz-profile-img" title="best vid of romka will be placed here"></img>
            </div>
            <button
                className="btn sub"
                onClick={() => console.log('collect-emails-onSubmit')}>
                Subscribe
            </button>
        </div>
    )
}