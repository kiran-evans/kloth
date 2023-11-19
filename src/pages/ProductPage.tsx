import { ShoppingBag } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from '../components/ContextProvider';
import { CartItem, Product } from '../lib/types';
import { addToCart } from '../lib/util';

export const ProductPage = () => {

    const { id } = useParams();
    const { state, dispatch } = useContext(AppContext);
    const navigator = useNavigate();

    const [isFetching, setIsFetching] = useState(false);
    const [productData, setProductData] = useState({
        id: "",
        name: "",
        description: "",
        price: 0,
        categories: [""],
        sizes: [""],
        colours: [""],
        img_url: ""
    } as Product);

    const [cartItem, setCartItem] = useState({
        product_id: productData.id,
        quantity: 1,
        size: "",
        colour: ""
    } as CartItem);

    useEffect(() => {
        setIsFetching(true);
        (async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/product/${id}`);
                const newBody: Product = await res.json()
                setProductData(newBody);
                setCartItem({
                    product_id: newBody.id,
                    size: newBody.sizes[0],
                    colour: newBody.colours[0],
                    quantity: 1
                } as CartItem);

            } catch (err: any) {
                console.error(err);
            }
            setIsFetching(false);
        })();
    }, [id]);

    const handleAddToCart = async () => {
        // Prompt the user to login if they aren't already logged in
        if (!state.user) return navigator("/login");
        
        const updatedCartItemIds = await addToCart(cartItem);

        dispatch({ type: 'SET_CART', payload: updatedCartItemIds });
    }
    

    return (
        <main>
            {isFetching ? <CircularProgress /> :
                <div id="productPage">
                    <img src={productData.img_url} />
                    <div id="productInfo">
                        <h1>{productData.name}</h1>
                        <p>{productData.description}</p>
                        <p>£{productData.price}</p>
                        
                        <label htmlFor="selectSize">Size</label>
                        <select id="selectSize" onChange={(e) => setCartItem({ ...cartItem, size: e.target.value })}>
                            {productData.sizes.map(size => (
                                <option value={size} key={size}>{size}</option>
                            ))}
                        </select>
                        
                        <label htmlFor="selectColour">Colour</label>
                        <select id="selectColour" onChange={(e) => setCartItem({ ...cartItem, colour: e.target.value })}>
                            {productData.colours.map(colour => (
                                <option value={colour} key={colour}>{colour}</option>
                            ))}
                        </select>

                        <button onClick={() => handleAddToCart()}><ShoppingBag sx={{ fontSize: "1.2em" }} />&nbsp;Add to bag</button>
                    </div>
                </div>
            }
        </main>
    )
}