import { useContext, useEffect, useState } from "react";
import { CartDisplayItemCard } from "../components/CartDisaplyItemCard";
import { AppContext } from "../components/ContextProvider";
import { CartDisplayItem } from "../lib/types";

export const CartPage = () => {

    const { state } = useContext(AppContext);
    const [cartDisplayItems, setCartDisplayItems] = useState(Array<CartDisplayItem>());

    useEffect(() => {
        (async () => {
            const tempCartDisplayItems = Array<CartDisplayItem>();
            for (const cartItemId of state.cartItemIds) {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/cartItem/${cartItemId}`);
                const newBody: CartDisplayItem = await res.json();
                tempCartDisplayItems.push(newBody);
            }
            setCartDisplayItems(tempCartDisplayItems);
        })();
    }, [state.cartItemIds]);    

    return (
        <main>
            <h1>{state.cartItemIds?.length} items in bag</h1>
            {cartDisplayItems.map((item, i) => (
                <CartDisplayItemCard key={i} {...item} />
            ))}
        </main>
    )
}