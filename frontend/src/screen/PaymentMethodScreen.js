import {React, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import {Helmet} from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Store } from '../Store';

export default function PaymentMethodScreen(){
    const navigate = useNavigate()

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart: {shippingAddress, paymentMethod}, 
    } = state;   


    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'Paypal')

   
    useEffect(() =>{
        if(!shippingAddress.address){
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) =>{
        e.preventDefault();
        ctxDispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName})
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3/>
            <div className = "container small-container">
                <Helmet>
                    <title>Checkout Page</title>
                </Helmet>
                <h1 className = "my-3"> Checkout Page</h1>
                <Form onSubmit ={submitHandler}>
                    <div className = "mb-3">
                        <Form.Check 
                        value = "Paypal"
                         label = "Paypal"
                          id = "Paypal" 
                          type = "radio"
                          checked = {paymentMethodName === 'Paypal'}
                          onChange = {(e) => setPaymentMethod(e.target.value)}/>
                    </div>
                    <div className = "mb-3">
                        <Form.Check 
                        value = "Stripe"
                         label = "Stripe"
                          id = "Stripe" 
                          type = "radio"
                          checked = {paymentMethodName === 'Stripe'}
                          onChange = {(e) => setPaymentMethod(e.target.value)}/>
                    </div>
                   <div className = "mb-3">
                        <Button type = "submit"> Continue </Button>
                   </div>
                </Form>
            </div>
          
        </div>
    )
}