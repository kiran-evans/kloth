export const ProductCard = (props: {
    name: string,
    description: string,
    price: string,
    imageUrl: string
}) => {
    return (
        <div>
            <img src={props.imageUrl} />
            <p>{props.name}</p>
            <p>{props.description}</p>
            <p>{props.price}</p>
        </div>
    )
}