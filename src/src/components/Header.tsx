import { AccountCircle, ShoppingCart } from '@mui/icons-material';

export const Header = () => {
    return (
        <header>
            <div id="logoContainer">
                Kloth
            </div>

            <nav id="categoryNav">
                {/* Get list of categories and show them as a list here */}
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