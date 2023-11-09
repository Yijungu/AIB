import React, { useState } from "react";

export const PriceToolTip = ({ onCilckPrice }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
        onCilckPrice();
    };

    return(
        <div>
            Price 2,000\
        </div>
    );
};