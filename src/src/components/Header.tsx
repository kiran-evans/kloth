import { AccountCircle, Search, ShoppingCart } from '@mui/icons-material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './ContextProvider';

export const Header = () => {

    const { state } = useContext(AppContext);

    return (
        <header>
            <div id="logoContainer">
                <Link to='/'>Kloth</Link>
            </div>

            <nav id="categoryNav">
                {/* Get list of categories and show them as a list here */}
            </nav>

            <div id="searchContainer">
                <Search sx={{ fontSize: "1.5em" }} />
                <input id="search" type="search" placeholder="Search..." />
            </div>

            <div id="iconsContainer">
                {/* Only render the shopping cart if the user is logged in */}
                {state.user && 
                    <Link to='/cart' title='Cart'>
                        <div id="cartIcon">
                            <ShoppingCart sx={{ fontSize: "1em" }} />
                        </div>
                    </Link>
                }
                <Link to={state.user ? '/account' : '/login'} title={state.user ? 'Your Account' : 'Login / Create Account'}>
                    <div id="accountIcon">
                        <AccountCircle sx={{ fontSize: "1em" }} />
                    </div>
                </Link>
            </div>
        </header>
    )
}