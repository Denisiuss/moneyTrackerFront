import "./popup.css";

function Popup({active, setActive, children}:any): JSX.Element {
    return (
        <div className={active ? "popup active" : "popup"} onClick={() => setActive(false)}>
			<div className={active ? "popup_content active" : "popup_content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Popup;
