// import { Iframe } from "./Music/Iframe";
import { iframeLinks } from "../lib/iframeLinks";
import React, { Suspense } from "react";
const Iframe = React.lazy(() => import("./Music/Iframe"));

export const MusicHub = () => {
  const links = iframeLinks;
  return (
    <div>
      {links.map((eachLink) => (
        <Suspense 
        fallback={<div>Loading...</div>}
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
