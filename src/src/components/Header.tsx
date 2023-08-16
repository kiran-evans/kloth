import { AccountCircle, Search, ShoppingCart } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import { useState } from 'react';
import { AccountPopover } from './AccountPopover';

export const Header = () => {

    const [popoverIsOpen, setPopoverIsOpen] = useState(false);

    return (
        <>
            <header>
                <div id="logoContainer">
                    Kloth
                </div>

                <nav id="categoryNav">
                    {/* Get list of categories and show them as a list here */}
                </nav>

                <div id="searchContainer">
                    <Search sx={{ fontSize: "1.5em" }} />
                    <input id="search" type="search" placeholder="Search..." />
                </div>

                <div id="iconsContainer">
                    <div id="cartIcon">
                        <ShoppingCart sx={{ fontSize: "1em" }} />
                    </div>
                    <div id="accountIcon" onClick={() => setPopoverIsOpen(!popoverIsOpen)}>
                        <AccountCircle sx={{ fontSize: "1em" }} />
                    </div>
                </div>
            </header>

            {/* Popover */}
            <Collapse in={popoverIsOpen}>
                <AccountPopover />
            </Collapse>
        </>
    )
}