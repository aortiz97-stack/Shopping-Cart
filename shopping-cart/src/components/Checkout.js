import unacceptable from '../images/unacceptable-lemongrab.jpeg';
const Checkout = () => {
    return (
        <div id="checkout-container" style={{display: "none"}}>
            <h3>Hmmmm I told you not to buy my things! This is</h3>
            <div id="unacceptable-container"><img src={unacceptable} alt="Lemongrab's face at a close up" /></div>
            <h1>UNACCEPTABLE!</h1>
        </div>
    );
};

export default Checkout;