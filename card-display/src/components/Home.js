import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./Home.css"
import Cart from './Cart/Cart';
import { FaMagnifyingGlass } from "react-icons/fa6";
import Payment from '../Payment/Payment';
import Search from './Search/Search';


function Home() {
    const [cardData, setCardData] = useState([]);
    const [clickedCards, setClickedCards] = useState([]);
    const [oneCard, setOneCard] = useState([])
    const [showCart, setShowCart] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [selectedCardQuantity, setSelectedCardQuantity] = useState(0)

    const [number, setNumber] = useState(4);
    const [visibleCards, setVisibleCards] = useState(6);
    const [formData, setFormData] = useState({
        searchText: '',
        types: '',
        rarity: '',

    });
    let leftCard = {
        number: 4
    }
    const handleInputChange = (e) => {
        setFormData({ ...formData, searchText: e.target.value });
    };
    const handleSelectChange = (e, fieldName) => {
        setFormData({ ...formData, [fieldName]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredCardData = cardData.filter(item => {

            const nameMatch = item.name && item.name.toLowerCase().includes(formData.searchText.toLowerCase());
            const typeMatch = item.types[0] && item.types[0].includes(formData.types[0]);
            const rarityMatch = item.rarity && item.rarity === formData.rarity;


            return nameMatch && typeMatch && rarityMatch;
        });
        console.log(filteredCardData)
        console.log(cardData)

        if (filteredCardData.length === 0) {
            setCardData(cardData);
        } else {
            setCardData(filteredCardData);
        }






    };


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://api.pokemontcg.io/v2/cards");
                const data = response.data.data.slice(0, visibleCards);
                setCardData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [visibleCards]);

    let card;


    const handleCart = (e, item) => {
        e.preventDefault();

        if (!showPayment) {
            card = {
                id: item.id,
                name: item.name,
                price: item.cardmarket.prices.avg1,
                img: item.images.small,
                rarity: item.rarity,
                left: number - 1,
                quantity: 1
            };

            if (!clickedCards.includes(card.id)) {
                setClickedCards([...clickedCards, card.id]);

                setOneCard([...oneCard, card]);
            }
            setShowCart(true);
        }
    };


    const handleIncrease = (index) => {
        const updatedOneCard = [...oneCard];

        if (updatedOneCard[index].left > 1) {
            updatedOneCard[index].quantity += 1;
            updatedOneCard[index].left -= 1;
            setOneCard(updatedOneCard);
        }
    };

    const handleDecrease = (index) => {
        const updatedOneCard = [...oneCard];
        if (updatedOneCard[index].quantity > 1) {
            updatedOneCard[index].quantity -= 1;
            updatedOneCard[index].left += 1;
            setOneCard(updatedOneCard);
        }
    };

    const handleDelete = () => {
        setOneCard([]);
        setClickedCards([]);
        setShowCart(false);
        setSelectedCardQuantity(0)
    };

    const handleShowCart = (cardsQuantity) => {
        setShowCart(false);
        setSelectedCardQuantity(cardsQuantity)


    };
    console.log(showCart)
    const handleShowMore = () => {
        setVisibleCards(visibleCards + 6);
    };
    const handleShowPay = (cardsQuantity) => {
        setShowCart(false)
        setShowPayment(true);
        setSelectedCardQuantity(cardsQuantity)
    }

    const handlePaymentDelet = () => {
        setShowPayment(false);
        setOneCard([]);
        setClickedCards([]);
        setSelectedCardQuantity(0)


    }
    const handleShowCartFromCart = () => {
        if (oneCard.length > 0) {
            setShowCart(true)
        }

    }


    return (
        <div className='container'>
            <Search
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                handleSubmit={handleSubmit}
                formData={formData}
            />





            {cardData.map(item => (




                <div className='cards-container' key={item.id}>
                    <div className='card'>
                        <img src={item.images.small} className='images' alt={item.name}></img>
                        <div className='detail'>
                            <div className='detail-text'>
                                <span className='name'>{item.name}</span>
                                <span className='rare'>{item.rarity}</span>
                                <div className='price'>
                                    <span>$ {item.cardmarket.prices.avg1}</span>
                                    <span>{number}left</span>
                                </div>
                            </div>
                            <button
                                className={`select ${clickedCards.includes(item.id) ? 'selected' : ''}`}
                                onClick={(e) => handleCart(e, item)}
                            >
                                {clickedCards.includes(item.id) ? 'Selected' : 'Select'}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {cardData.length <= visibleCards && (
                <div className='showMore' onClick={handleShowMore}>
                    <span className='search-icon'><FaMagnifyingGlass height='5px' /></span>  Show More
                </div>
            )}

            {showCart && !showPayment ? (
                <Cart
                    oneCard={oneCard}
                    handleIncrease={handleIncrease}
                    handleDecrease={handleDecrease}
                    handleDelete={handleDelete}
                    handleShowCart={handleShowCart}
                    handleShowPay={handleShowPay}
                />
            ) : (
                <div className='shoppingCart' onClick={() => handleShowCartFromCart()} >
                    <div className='shoppingCart-icon'>
                        <span className='selectedCardQuantity'>{selectedCardQuantity}</span>
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Group23">
                                <path id="Union" fill-rule="evenodd" clip-rule="evenodd" d="M18.5902 5.36287L16.3875 14.0333L4.49032 14.0332L3-6.03382L17.018 6.0439L17.5373 4H21V5.36287H18.5902ZM15.3346 12.6704L16.6719 7.40653L4.63336 7.39787L5.61566 12.6704H15.3346ZM16.6997 16.8205C16.6997 18.0223 15.7271 19 14.5317 19C13.3363 19 12.3637 18.0223 12.3637 16.8205C12.3637 16.5319 12.42 16.2563 12.5218 16.004H8.37358C8.47538 16.2563 8.53163 16.5319 8.53163 16.8205C8.53163 18.0223 7.5591 19 6.36365 19C5.16822 19 4.19566 18.0223 4.19566 16.8205C4.19566 15.6188 5.16823 14.6411 6.36365 14.6411H14.5317C15.7271 14.6411 16.6997 15.6188 16.6997 16.8205ZM6.36365 17.6371C6.81155 17.6371 7.17593 17.2708 7.17593 16.8205C7.17593 16.3703 6.81155 16.004 6.36365 16.004C5.91574 16.004 5.55135 16.3703 5.55135 16.8205C5.55135 17.2708 5.91575 17.6371 6.36365 17.6371ZM14.5317 17.6371C14.9796 17.6371 15.344 17.2708 15.344 16.8205C15.344 16.3703 14.9796 16.004 14.5317 16.004C14.0838 16.004 13.7195 16.3703 13.7195 16.8205C13.7195 17.2708 14.0838 17.6371 14.5317 17.6371Z" fill="white" />
                            </g>
                        </svg>
                    </div>
                    <div className='shoppingCart-text'>View Cart</div>
                </div>
            )}
            {showPayment && (
                <Payment handlePaymentDelet={handlePaymentDelet} />
            )}


        </div>
    );
}

export default Home;

