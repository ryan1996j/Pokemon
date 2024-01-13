import React, { useState } from 'react';
import './Cart.css';
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";



function Cart({ oneCard, handleIncrease, handleDecrease, handleDelete, handleShowCart, handleShowPay }) {

    console.log(oneCard);
    const totalSelectedPrice = oneCard.reduce(
        (total, card) => total + card.price * card.quantity,
        0
    );
    const totalSelectedCards = oneCard.reduce(
        (total, card) => total + card.quantity,
        0
    );


    return (
        <div>
            <div className='test'>
                <div className='cartShow'>
                    <div className='added-card-group'>
                        {oneCard.map((card, index) => (
                            <div key={index} className='added-card'>
                                <div className='added-img'>
                                    <img src={card.img} alt={`Card ${index}`} />
                                </div>

                                <div className='added-card-data'>
                                    <div className='above'>
                                        <div className='name-and-card'>
                                            <div className='card-name'>{card.name}</div>
                                            <div className='added-card-price'>{card.price} $ per card</div>
                                        </div>
                                        <div className='num-increase-decrease'>
                                            <div className='number'>{card.quantity}
                                                <div className='arrow'>
                                                    <span onClick={() => handleIncrease(index)}>
                                                        <FaAngleUp height='5px' color={card.left <= 1 ? 'gray' : 'blue'} />
                                                    </span>
                                                    <span onClick={() => handleDecrease(index)}>
                                                        <FaAngleDown height='5px' color={card.left === 3 ? 'red' : 'blue'} />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bottom'>
                                        <div className='cardLeft'>
                                            <div className='added-card-left'> <span className='red'> {card.left}</span> cards left </div>
                                        </div>
                                        <div className='priceGroup'>
                                            <div className='price-text'>price</div>
                                            <div className='added-quantity-price'>$ {(card.price * card.quantity).toFixed(2)}</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='showTotalPrice'>
                    <div className='showTotalPrice-text'>
                        <div className='clear-all-group'><p className='clear-all' onClick={handleDelete}>clear all</p></div>
                        <div className='total_card-group'><h2 className='total_card'>Total cards <span className='red totalSelectedCards'>{totalSelectedCards}</span>  </h2>
                            <h2 className='total_price'><span className='totalPriceText'>Total price</span><span className='red'> ${totalSelectedPrice.toFixed(2)}</span> </h2>
                        </div>
                        <div className='paynowGroup'><button className='paynow' onClick={() => handleShowPay(totalSelectedCards)} >Pay now</button></div>
                    </div>
                    <div className='deletButton' onClick={() => handleShowCart(totalSelectedCards)}>x</div>
                </div>
            </div>

        </div>
    );
}

export default Cart;
