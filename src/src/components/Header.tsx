import { AccountCircle, ShoppingCart } from '@mui/icons-material';

export const Header = () => {
    return (
        <header>
            <div id="logoContainer">
                Kloth
            </div>

            <nav id="categoryNav">
                
            </nav>

            <div id="searchContainer">
                <input id="search" type="search" placeholder="Search..." />
            </div>

            <div id="iconsContainer">
                <ShoppingCart />
                <AccountCircle />
            </div>
        </header>
    )
}