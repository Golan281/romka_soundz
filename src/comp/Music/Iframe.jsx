const Iframe = ({props}) => {
    const {h1, link} = props;
    return (
        <div>
            <h1 className="">{h1}</h1>
            <iframe className="iframe-box" title="unique-title-prop"width="336" height="189" scrolling="no" frameBorder="no" allow="autoplay" src={link}></iframe><div>
            </div>
        </div>

    )
}

export default Iframe;