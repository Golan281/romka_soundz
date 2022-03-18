// import { useUrl } from "../../Hooks/useUrl";
export const Iframe = () => {
    // const [url, setUrl] = useUrl(['demo-url']);
    
    return (
        <div>
            {/* onClick={setUrl(url)} */}
            {/* <iframe title="place-unique-title-here" src='' /> */}
            {/* sandbox='' */}
            {/* <h1><a href="https://soundcloud.com/ostroman/the-ecstatic-a-global-ecstatic-dance-journey" title="The Ecstatic: A Global Ecstatic Dance Journey" content="The Ecstatic: A Global Ecstatic Dance Journey"></a></h1> */}
            <h1>The Ecstatic: A Global Ecstatic Dance Journey</h1>
            <iframe className="iframe-box" title="unique-title-prop"width="336" height="189" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1173926212&color=%23321e22&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div>
                {/* <a href="https://soundcloud.com/ostroman" title="Romka" ></a> */}
            </div>
        </div>

    )
}

// // use this with caution only if a need arise due to performance limitations
// import React from "react";
// import ReactDOM from "react-dom";
// class App extends React.Component {
//   render() {
//     return <div dangerouslySetInnerHTML={{ __html: "<iframe src='https://www.youtube.com/embed/cWDJoK8zw58' />"}} />;
//   }
// }
// ReactDOM.render(<App />, document.getElementById("container"));