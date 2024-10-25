import './styles.css'
export default function Spinner(props: {width: number, height: number, borderWidth: number}) {
    return <span className="loader" style={{
        width: props.width, height: props.height, borderWidth: props.borderWidth
    }}></span>;
}