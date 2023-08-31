import { CartDisplayItem } from "../lib/types"

export const CartDisplayItemCard = (props: CartDisplayItem) => {
    return (
        <div className="cartDisplayItemCard">
            <p>{props.productData.name}</p>
            <img src={props.productData.img_url} width={100} />
            <p>{props.cartItemData.quantity} x {props.cartItemData.size}, {props.cartItemData.colour}</p>
            <p>Subtotal: £{props.productData.price * props.cartItemData.quantity}</p>
        </div>
    )
}