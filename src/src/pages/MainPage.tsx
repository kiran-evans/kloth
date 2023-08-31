import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../lib/types";

export const MainPage = (props: { selectedCategory: string }) => {
    const [products, setProducts] = useState(Array<Product>);
    const [displayProducts, setDisplayProducts] = useState(Array<Product>);
    const [urlSearchParams, setUrlSearchParams] = useSearchParams();

    useEffect(() => {
        (async () => {
            if (urlSearchParams.get('payment_success')) {
                await fetch(`${import.meta.env.VITE_API_URL}/order/${urlSearchParams.get('order_id')}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        paid: urlSearchParams.get('payment_success')
                    })
                });
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/product`, {
                    method: "GET"
                });
                setProducts(await res.json());
            } catch (err: any) {
                console.error(err);               
            }
        })();
    }, []);

    useEffect(() => {
        const selectedProducts = Array<Product>();
        if (props.selectedCategory === "all") return setDisplayProducts([...products]);
        
        products.forEach(p => {
            if (p.categories.includes(props.selectedCategory)) selectedProducts.push(p);
        });
        setDisplayProducts([...selectedProducts]);        

    }, [props.selectedCategory, products]);

    return (
        <main>
            <div id="productsContainer">
                {displayProducts.map(p => (
                    <ProductCard key={p.id} {...p} />
                ))}
            </div>
        </main>
    )
}