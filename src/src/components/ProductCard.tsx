import { Link } from "react-router-dom"

export const ProductCard = (props: {
    id: string,
    name: string,
    description: string,
    price: string,
    imageUrl: string
}) => {
    
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
                        <p>{props.price}</p>
                    </span>
                </div>
            </div>
        </Link>
    )
}