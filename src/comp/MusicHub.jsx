import { Iframe } from "./Music/Iframe";
import { iframeLinks } from "../lib/iframeLinks";


export const MusicHub = () => {
  const links = iframeLinks;
  return (
    <div>
      {links.map((eachLink) => (
        <Iframe
          key={eachLink.id}
          props={eachLink}
        >
        </Iframe>
      ))}
    </div>
  );
};
