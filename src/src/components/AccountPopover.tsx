import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./ContextProvider";

export const AccountPopover = () => {

    const { user } = useContext(AppContext);

    return (
        <div id="accountPopover">
            <nav id="accountNav">
                {user ? 
                    <>
                        <ul>
                            <li>My Orders</li>
                            <li>My Account</li>
                            <li>Settings</li>
                        </ul>
                        <button>Logout</button>
                    </>
                    :
                    <>
                        <Link to="/login"><button>Login</button></Link>
                        <Link to="/signup"><button>Create Account</button></Link>
                    </>
                }
            </nav>
        </div>
    )
}