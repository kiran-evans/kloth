import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/ContextProvider";
import { fb } from "../lib/firebase";
import { Order } from "../lib/types";

export const AccountPage = () => {

    const { state, dispatch } = useContext(AppContext);
    const navigator = useNavigate();
    const [orders, setOrders] = useState(Array<Order>());

    const handleLogout = async () => {
        await fb.auth.signOut();
        dispatch({ type: 'SET_USER', payload: null });
        dispatch({ type: 'SET_CART', payload: [] });
        navigator('/');
    }

    useEffect(() => {
        (async () => {
            // Get all the user's orders
            const res = await fetch(`${import.meta.env.VITE_API_URL}/order/${await fb.auth.currentUser?.getIdToken()}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const body = await res.json();
            setOrders(body);
        })();
    }, []);

    return (
        <main>
            <div id="accountPage">
                <p>Email: {state.user?.email}</p>
                <button onClick={() => handleLogout()}>Logout</button>

                <h2>Your Orders</h2>
                <div id="ordersContainer">
                    {orders.map(order => (
                        <div className="orderCard" key={order.id}>
                            <p>Order number: {order.id}</p>
                            <div className="itemsContainer">
                                {order.items.map((item, i) => (
                                    <div className="orderItem" key={i}>
                                        <p>{item.name} ({item.size}, {item.colour}) x{item.quantity} | £{item.total}</p>
                                    </div>
                                ))}
                            </div>
                            <p>Total: £{order.total}</p>
                            <p>{order.paid ? 'Paid' : 'Not yet paid'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
};