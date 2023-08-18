import { ShoppingBag } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from '../components/ContextProvider';
import { CartItem, Product } from '../lib/types';
import { updateCart } from '../lib/util';

export const ProductPage = () => {

    const { id } = useParams();
    const { state, dispatch } = useContext(AppContext);

    const [isFetching, setIsFetching] = useState(false);
    const [productData, setProductData] = useState({
        id: "",
        name: "",
        description: "",
        price: 0,
        categories: [""],
        sizes: [""],
        colours: [""],
        imageUrl: ""
    } as Product);

    useEffect(() => {
        setIsFetching(true);
        (async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/product/${id}`);
                setProductData(await res.json());

            } catch (err: any) {
                console.error(err);
            }
            setIsFetching(false);
        })();
    }, [id]);

    const [cartItem, setCartItem] = useState({
        product_id: productData.id,
        quantity: 1,
        size: "",
        colour: ""
    } as CartItem);

    const handleAddToCart = async () => {
        const newCart = [...state.cartItems, cartItem]
        await updateCart(newCart, state.user, dispatch);
    }
    

    return (
        <main>
            {isFetching ? <CircularProgress /> :
                <div id="productPage">
                    <img src={productData.imageUrl} />
                    <div id="productInfo">
                        <h1>{productData.name}</h1>
                        <p>{productData.description}</p>
                        <p>£{productData.price}</p>
                        
                        <label htmlFor="selectSize">Size</label>
                        <select id="selectSize">
                            {productData.sizes.map(size => (
                                <option onSelect={() => setCartItem({ ...cartItem, size: size })}>{size}</option>
                            ))}
                        </select>
                        
                        <label htmlFor="selectColour">Colour</label>
                        <select id="selectColour">
                            {productData.colours.map(colour => (
                                <option onSelect={() => setCartItem({ ...cartItem, colour: colour })}>{colour}</option>
                            ))}
                        </select>

                        <button onClick={() => handleAddToCart()}><ShoppingBag sx={{ fontSize: "1.2em" }} />&nbsp;Add to bag</button>
                    </div>
                </div>
            }
        </main>
    )
}