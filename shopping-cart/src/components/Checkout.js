import unacceptable from '../images/unacceptable-lemongrab.jpeg';
const Checkout = () => {
    return (
        <div id="checkout-container" style={{display: "none"}}>
            <b>Hmmmm I told you not to buy my things! This is</b>
            <div id="unacceptable-container"><img src={unacceptable} alt="Lemongrab's face at a close up" /></div>
            <b>UNACCEPTABLE!</b>
        </div>
    );
};

export default Checkout;