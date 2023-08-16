import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";

export const MainPage = () => {
    const [products, setProducts] = useState(Array<{
        id: string,
        name: string,
        description: string,
        price: string,
        imageUrl: string
    }>);

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
                    <ProductCard key={p.id} id={p.id} name={p.name} description={p.description} price={p.price} imageUrl={p.imageUrl} />
                ))}
            </div>
        </main>
    )
}