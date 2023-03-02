import { useState } from "react";
import { Link } from "react-router-dom";
import "./OrderCard.css";

const OrderCard = ({ numItems, subtotal, total }) => {
    return (
        <div className="order-card-container">
            <div className="place-order-button">
                Place your order
            </div>
            <div className="conditions">
                By placing your order, you agree to Rainforest Retail's privacy notice and conditions of use.
            </div>
            <div className="order-summary">
                <div className="order-summary-header">
                    <div className="order-summary-title">
                        Order Summary
                    </div>
                </div>
                <div className="order-summary-body">
                    <div className="order-left-column">
                        <div className="order-left-top">
                            <div className="items">
                                Item{numItems > 1 && "s"} ({numItems}):
                            </div>
                            <div className="ship-handle">
                                Shipping & handling:
                            </div>
                        </div>
                        <div className="order-left-bottom">
                            <div className="tax">
                                Total before tax:
                            </div>
                            <div className="est-tax">
                                Estimated tax to be collected:
                            </div>
                        </div>
                    </div>
                    <div className="order-right-column">
                        <div className="order-right-top">
                            <div className="item-total">
                                ${parseFloat(subtotal).toFixed(2)}
                            </div>
                            <div className="ship-hand-cost">
                                $0.00
                            </div>
                            <div className="order-line"></div>
                        </div>
                        <div className="order-right-bottom">
                            <div className="wout-tax">
                                ${parseFloat(subtotal).toFixed(2)}
                            </div>
                            <div className="tax-amount">
                                $0.00
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-total">
                <div className="order-total-left">
                    Order total:
                </div>
                <div className="order-total-right">
                    ${parseFloat(subtotal).toFixed(2)}
                </div>
            </div>
        </div>
    )
};

export default OrderCard;
