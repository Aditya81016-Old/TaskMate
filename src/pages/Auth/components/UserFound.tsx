import { UserInterface } from "../../../data/TSComponents";

type props = {
    User: UserInterface,
    method: string,
    onDisagree: VoidFunction,
    onAgree: VoidFunction
}

export default function UserFound(props: props) {
    const {User: {name, email}, method, onDisagree, onAgree} = props
    return (<>
    <div className="user-found">
        <div className="box">
            <h3 className="header">An Existing User Found</h3>
            <h1 className="user-name">{name}</h1>
            <h6 className="user-email">{email}</h6>
            <div className="button-group">
                <button className="secondary" onClick={onDisagree}>No, I want to {method} seperately</button>
                <button className="primary" onClick={onAgree}>Yes, Login me in as {name}</button>
            </div>
        </div>
    </div>
    </>)
}