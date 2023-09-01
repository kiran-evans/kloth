import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/ContextProvider";
import { fb } from "../lib/firebase";

export const AccountPage = () => {

    const { state, dispatch } = useContext(AppContext);
    const navigator = useNavigate();

    const handleLogout = async () => {
        await fb.auth.signOut();
        dispatch({ type: 'SET_USER', payload: null });
        dispatch({ type: 'SET_CART', payload: [] });
        navigator('/');
    }

    return (
        <main>
            <div id="accountPage">
                <p>Email: {state.user?.email}</p>
                <button onClick={() => handleLogout()}>Logout</button>
            </div>
        </main>
    )
}