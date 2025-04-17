import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);
    const itemCount = cartItems[id] || 0;

    return (
        <div className='food-item' id={`food-item-${id}`}>
            <div className='food-item-image-container'>
            <img className='food-item-image' src={`${url}${image}`} alt="" />


                {/* Always show the "+" button */}
                {itemCount === 0 && (
                    <img 
                        className='add' 
                        onClick={() => addToCart(id)}
                        src={assets.add_icon_white} 
                        alt="Add Item" 
                    />
                )}

                {/* Show counter only if itemCount > 0 */}
                {itemCount > 0 && (
                    <div className='food-item-counter'>
                        <button onClick={() => removeFromCart(id)}>
                            <img src={assets.remove_icon_red} alt="Remove" />
                        </button>
                        <span>{itemCount}</span>
                        <button onClick={() => addToCart(id)}>
                            <img src={assets.add_icon_green} alt="Add More" />
                        </button>
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating" />
                </div>
                <p className='food-item-description'>{description}</p>
                <p className='food-item-price'>${price}</p>
            </div>
        </div>
    );
};

export default FoodItem;

