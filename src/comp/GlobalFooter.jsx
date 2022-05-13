
import {
  MdLocalPhone,
  MdEmail,
  MdFacebook,
} from "react-icons/md";
import { CgInstagram, CgYoutube } from "react-icons/cg";

export const GlobalFooter = () => {
  return (
    <div>
      <footer className="footer">
        <p>
          <a href="tel:+972508280533">
            <MdLocalPhone size="3rem" />
          </a>
          <a href="mailto:contact@romkasoundz.com">
            <MdEmail size="3rem" />
          </a>
          <a href="https://www.instagram.com/romkasoundz/" target="_blank" rel="noreferrer" >
          <CgInstagram size="3rem" />
          </a>
          <a href="https://www.facebook.com/romkasoundz" target="_blank" rel="noreferrer" >
            <MdFacebook size="3rem" />
          </a>
          <a href="https://www.youtube.com/channel/UC4H_9DZOvRL-uScwvsGQ5NQ" target="_blank" rel="noreferrer" >
          <CgYoutube size="3rem" />
          </a>
          <br></br>
          &#169; All rights reserved to Roman Ostrovsky 2022
          <br></br>
         Developed with &#x1F49B; by <a href="https://golandev.tech/"  target="_blank" rel="noreferrer">Golan Blumenkrants</a> | Powered by <a href="https://reactjs.org/"  target="_blank" rel="noreferrer">React</a>
        </p>
      </footer>
    </div>
  );
};
