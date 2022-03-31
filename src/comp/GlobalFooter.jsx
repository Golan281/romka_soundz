// import Line from "./UIkit/Line";
import { MdLocalPhone , MdEmail , MdFacebook} from 'react-icons/md';
import { CgInstagram, CgYoutube} from 'react-icons/cg';

export const GlobalFooter = () => {
    return (
        <div>
            <footer className='secondary-footer'>
                {/* <Line> currently not-aligned - need to use myNotesLine*/}
                <p>
                    <MdLocalPhone  size="3rem"/>
                    <MdEmail size="3rem"/>
                    <CgInstagram size="3rem"/>
                    <MdFacebook size="3rem"/>  
                    <CgYoutube size="3rem"/><br></br>
                    &#169; All rights reserved to Roman Ostrovsky 2022 
                </p> 
                {/* </Line> */}
                {/* Powered by <a href="./home">React</a> | Developed by <a href="#">Golan Blumenkrants</a> */}
            </footer>
        </div>
    )
}