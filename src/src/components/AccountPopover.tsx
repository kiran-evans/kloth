import { Link, useNavigate } from "react-router-dom";
import { fb } from "../lib/firebase";

export const AccountPopover = () => {
    const navigator = useNavigate();

    const handleLogout = async () => {
        await fb.auth.signOut();
        navigator('/');
    }

    return (
        <div id="accountPopover">
            <nav id="accountNav">
                {fb.auth.currentUser ? 
                    <>
                        <ul>
                            <li>My Orders</li>
                            <li>My Account</li>
                            <li>Settings</li>
                        </ul>
                        <button onClick={() => handleLogout()}>Logout</button>
                    </>
                    :
                    <>
                        <Link to="/login"><button>Login / Create Account</button></Link>
                    </>
                }
            </nav>
        </div>
    )
}