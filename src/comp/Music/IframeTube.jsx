// import { useUrl } from "../../Hooks/useUrl";
export const IframeTube = () => {
    // const [url, setUrl] = useUrl(['demo-url']);
    
    return (
        <div>
            <iframe className="iframe-box" width="336" height="189" src="https://www.youtube.com/embed/IlRO34_jzMk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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