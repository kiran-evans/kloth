import { AccountCircle, Search, ShoppingBag } from '@mui/icons-material';
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
                <ul>
                    <li>Women</li>
                    <li>Men</li>
                    <li>Footwear</li>
                    <li>Headwear</li>
                    <li>Outdoor</li>
                </ul>
            </nav>

            <div id="searchContainer">
                <Search sx={{ fontSize: "1.5em" }} />
                <input id="search" type="search" placeholder="Search..." />
            </div>

            <div id="iconsContainer">
                <Link to='/bag' title='Shopping Bag'>
                    <div id="bagIcon">
                        <ShoppingBag sx={{ fontSize: "1em" }} />
                    </div>
                </Link>
                <Link to={state.user ? '/account' : '/login'} title={state.user ? 'Your Account' : 'Login / Create Account'}>
                    <div id="accountIcon">
                        <AccountCircle sx={{ fontSize: "1em" }} />
                    </div>
                </Link>
            </div>
        </header>
    )
}