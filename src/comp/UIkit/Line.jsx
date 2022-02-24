import './Line.css';

const Line = (props) => {
    return (
        <div className="Line" justify={props.between ? 'between' : ''}>
            {props.children}
        </div>
    )
}

export default Line;