import {useContext} from "react";
import UserContext from "../contexts/UserContext.js";

export default function UserInfo() {
    const user = useContext(UserContext);
    return (
        <>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
        </>
    )
}
