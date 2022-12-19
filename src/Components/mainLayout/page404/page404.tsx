import "./page404.css";
import error404 from "../../../error404.jpg";

function Page404(): JSX.Element {
    return (
        <div className="page404">
			<img src={error404} alt="" />
        </div>
    );
}

export default Page404;
