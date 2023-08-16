export const ProductCard = (props: {
    name: string,
    description: string,
    price: string,
    imageUrl: string
}) => {
    return (
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
    )
}