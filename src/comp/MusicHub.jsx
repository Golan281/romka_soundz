// import { Iframe } from "./Music/Iframe";
import { iframeLinks } from "../lib/iframeLinks";
import React, { Suspense } from "react";
import Loading from 'react-simple-loading';
const Iframe = React.lazy(() => import("./Music/Iframe"));

export const MusicHub = () => {
  const links = iframeLinks;
  return (
    <div>
      {links.map((eachLink) => (
        <Suspense 
        fallback={<Loading 
          color={'#54ABAB'}
          stroke={'10px'}
          size={'100px'} />}
        key={eachLink.id}
        >
          <Iframe
            key={eachLink.id}
            props={eachLink}
          ></Iframe>
        </Suspense>
      ))}
    </div>
  );
};
