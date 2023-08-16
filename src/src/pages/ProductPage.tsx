import { ShoppingBag } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProductPage = () => {

    const { id } = useParams();

    const [isFetching, setIsFetching] = useState(false);
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        imageUrl: ""
    });

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

    return (
        <main>
            {isFetching ? <CircularProgress /> :
                <div id="productPage">
                    <img src={productData.imageUrl} />
                    <div id="productInfo">
                        <h1>{productData.name}</h1>
                        <p>{productData.description}</p>
                        <p>{productData.price}</p>

                        <button><ShoppingBag sx={{ fontSize: "1.2em" }} />&nbsp;Add to bag</button>
                    </div>
                </div>
            }
        </main>
    )
}