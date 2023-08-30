import { useContext } from "react";
import { AppContext } from "../components/ContextProvider";

export const AccountPage = () => {

    const { state } = useContext(AppContext);

    return (
        <main>
            <div id="accountPage">
                <h1>{state.user?.uid} is logged in</h1>
            </div>
        </main>
    )
}