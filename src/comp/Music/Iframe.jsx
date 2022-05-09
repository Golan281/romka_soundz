// // use this with caution only if a need arise due to performance limitations
// import React from "react";
// import ReactDOM from "react-dom";
// class App extends React.Component {
//   render() {
//     return <div dangerouslySetInnerHTML={{ __html: "<iframe src='https://www.youtube.com/embed/cWDJoK8zw58' />"}} />;
//   }
// }
// ReactDOM.render(<App />, document.getElementById("container"));

export const Iframe = ({props}) => {
    const {h1, link} = props;
    return (
        <div>
            <h1>{h1}</h1>
            <iframe className="iframe-box" title="unique-title-prop"width="336" height="189" scrolling="no" frameBorder="no" allow="autoplay" src={link}></iframe><div>
            </div>
        </div>

    )
}
