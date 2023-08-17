import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../lib/types";

export const MainPage = () => {
    const [products, setProducts] = useState(Array<Product>);

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

    return (
        <main>
            <div id="productsContainer">
                {products.map(p => (
                    <ProductCard key={p.id} {...p} />
                ))}
            </div>
        </main>
    )
}