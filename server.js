const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

//Create
server.post('/', (req, res) => {
    db('accounts').insert(req.body)
        .then((id) => {
            res.status(200).json({ message: `New post ID: ${id}`})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: 'Doh' })
        })
})

//Read
server.get('/', (req, res) => {
    db('accounts')
        .then((accounts) => {
            console.log(accounts)
            res.status(200).json({ accounts: accounts})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "doh!" })
        })
});

server.get('/:id/', (req, res) => {
    db('accounts').where({id: req.params.id})
        .first() //use first() instead of array[0], when returning one object in an array
        .then((account) => {
            res.status(200).json(account)
        })
        .catch((err) => {
            res.status(500).json({ message: 'doh!' })
        })
})

//Update

server.put('/:id', (req, res) => {
    db('accounts')
        .where({id: req.params.id})
        .update(req.body)
        .then((amountAffected) => {
            res.status(200).json({amountAffected: amountAffected})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({message: 'doh!'})
        })
})

//Delete

server.delete('/:id', (req, res) => {
    db('accounts')
        .where({id: req.params.id})
        .del()
        .then((amountAffected) => {
            res.status(200).json({amountAffected: amountAffected})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({message: "doh!"})
        })
})



module.exports = server;