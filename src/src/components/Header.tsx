import { AccountCircle, Search, ShoppingBag } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './ContextProvider';

export const Header = (props: { selectedCategory: string, setSelectedCategory: Dispatch<SetStateAction<string>> }) => {

    const { state } = useContext(AppContext);

    const availableCategories = ["All", "Women", "Men", "Headwear", "Footwear", "Outdoor"];

    return (
        <header>
            <div id="logoContainer">
                <Link to='/'>Kloth</Link>
            </div>

            <nav id="categoryNav">
                <ul>
                    {availableCategories.map(c => (
                        <li
                            key={c}
                            className={`${props.selectedCategory === c.toLowerCase() && 'selected'}`}
                            onClick={() => props.setSelectedCategory(c.toLowerCase())}
                        >{c}</li>
                    ))}
                </ul>
            </nav>

            <div id="searchContainer">
                <Search sx={{ fontSize: "1.5em" }} />
                <input id="search" type="search" placeholder="Search..." />
            </div>

            <div id="iconsContainer">
                <Link to='/bag' title='Shopping Bag'>
                    <div id="bagIcon">
                        <Badge badgeContent={state.cartItemIds.length} color="error">
                            <ShoppingBag sx={{ fontSize: "1em" }} />
                        </Badge>
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