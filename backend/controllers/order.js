const express = require('express')
const Order = require('../models/Order')
const {StatusCodes} = require('http-status-codes');
const generateToken = require('../Util')
const expressAsyncHandler = require('express-async-handler')

const createOrder = expressAsyncHandler( async (req, res) =>{
    const newOrder = new Order({
        orderItems: req.body.orderItems.map((x) => ({...x, product: x._id})),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice:req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id
    })

    const order = await newOrder.save();
    res.status(201).send({message: 'New order created', order})
})

const getOrder = expressAsyncHandler(async(req, res) =>{
    const order = await Order.findById(req.params.id)
    if(order){
        res.send(order)
    }else{
        res.status(404).send({message: 'Order not Found'})
    }
})

const submitOrder = expressAsyncHandler(async(req, res) =>{
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true;
        order.isPaidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        }
    const updatedOrder = await order.save()
    res.send({message: 'Order Paid', order: updatedOrder});
    }else{
        res.status(404).send({message: 'Order Not Found'})
    }
})

const getOrderHistory = expressAsyncHandler(async(req, res) =>{
    const orders = await Order.find({user: req.user._id})
    res.send(orders)
})


module.exports = {createOrder, getOrder, submitOrder, getOrderHistory}
