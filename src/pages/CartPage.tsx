import { useContext, useEffect, useState } from "react";
import { CartDisplayItemCard } from "../components/CartDisaplyItemCard";
import { AppContext } from "../components/ContextProvider";
import { CartDisplayItem } from "../lib/types";

export const CartPage = () => {

    const { state } = useContext(AppContext);
    const [cartDisplayItems, setCartDisplayItems] = useState(Array<CartDisplayItem>());
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (async () => {
            const tempCartDisplayItems = Array<CartDisplayItem>();
            let tempTotal = 0;
            for (const cartItemId of state.cartItemIds) {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/cartItem/${cartItemId}`);
                const newBody: CartDisplayItem = await res.json();
                tempCartDisplayItems.push(newBody);
                tempTotal += newBody.cartItemData.quantity * newBody.productData.price;
            }
            setCartDisplayItems(tempCartDisplayItems);
            setTotal(Math.floor(tempTotal * 100)/100);
        })();
    }, [state.cartItemIds]);
    
    const handleCheckout = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/checkout/${await state.user?.getIdToken()}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const body = await res.json();
        console.log(body);
        
        window.location = body.url;
    }

    return (
        <main>
            <div id="cartPage">
                <h1>{state.cartItemIds?.length} items in bag</h1>
                <div id="cartDisplayItemsContainer">
                    {cartDisplayItems.map((item, i) => (
                        <CartDisplayItemCard key={i} {...item} />
                    ))}
                </div>
                <h2>Total: £{total}</h2>
                <button onClick={() => handleCheckout()}>Checkout</button>
            </div>
        </main>
    )
}