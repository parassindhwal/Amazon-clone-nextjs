import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromBasket, setQty } from "../slices/basketSlice";

function CheckoutProduct({id, title, description, category, image, price, rating, hasPrime}) {

    const dispatch = useDispatch();

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({id}))

    }
    const [quantity, setQuantity] = useState(1);

    const mainipulatQuantity = (operation) => {
        if(operation === "decrease") {
            if(quantity === 1) dispatch(removeFromBasket({id}));
            else {
                setQuantity(quantity - 1);
            };
        } else {
            if(quantity === 5) alert('Only 5 unit can be added to the basket');
            else setQuantity(quantity + 1);
        }

    }

    useEffect(() => {
        dispatch(setQty({id, quantity}))
    }, [quantity])

    return (
        <div className="grid grid-cols-5">
            <Image src={image} height={200} width={200} objectFit="contain"/>

            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))}
                </div>

                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <p>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR'}).format(price)}</p>

                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img className="w-12" src="https://links.papareact.com/fdw" alt="" />

                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )}

                <div>
                    <button className="bg-gray-300 w-5 active:bg-gray-400 focus:outline-none" onClick={() => mainipulatQuantity('decrease')}>-</button>
                    <span className="px-[10px]">{quantity}</span>
                    <button className="bg-gray-300 w-5 active:bg-gray-400 focus:outline-none" onClick={() => mainipulatQuantity('increase')}>+</button>
                </div>
            </div>

            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                {/* <button className="button">
                    Add To Basket
                </button> */}
                <button className="button" onClick={removeItemFromBasket}>
                    Remove From Basket
                </button>
            </div>

        </div>
    )
}

export default CheckoutProduct
