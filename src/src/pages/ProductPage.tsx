import { ShoppingBag } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from '../lib/types';

export const ProductPage = () => {

    const { id } = useParams();

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

    const handleAddToCart = async () => {

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
                                <option>{size}</option>
                            ))}
                        </select>
                        
                        <label htmlFor="selectColour">Colour</label>
                        <select id="selectColour">
                            {productData.colours.map(colour => (
                                <option>{colour}</option>
                            ))}
                        </select>

                        <button><ShoppingBag sx={{ fontSize: "1.2em" }} />&nbsp;Add to bag</button>
                    </div>
                </div>
            }
        </main>
    )
}