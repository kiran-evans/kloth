import { Link } from "react-router-dom"
import { Product } from "../lib/types"

export const ProductCard = (props: Product) => {
    
    return (
        <Link to={`/product/${props.id}`}>
            <div className="productCard">
                <img src={props.imageUrl} />
                <div className="productInfo">
                    <div className="infoText">
                        <p className="productName">{props.name}</p>
                        <p className="productDesc">{props.description}</p>
                    </div>
                    <span className="productPrice">
                        <p>£{props.price}</p>
                    </span>
                </div>
            </div>
        </Link>
    )
}