const express = require('express')
const knex = require('knex')
const cors = require('cors')
const app = express()
app.use(express.json())



app.use(cors())
const db= knex({
        client: 'pg',
        connection: {
          host : '127.0.0.1', //localhost
          user : 'postgres', //add your user name for the database here
          password : 'Sa1@hil1', //add your correct password in here
          database : 'bankdata' //add your database name you created here
        }
});






app.get('/', (req,res)=>{
	db.select('*').from('customers').orderBy('id','asc')
	.then(customer => res.json(customer))
})





app.get('/transactions', (req,res)=>{
	db.select('*').from('transactions').orderBy('id','desc')
	.then(customer => res.json(customer))
})



app.put('/sending', (req,res)=>{
db('customers').where('id','=',req.body.s)
	.decrement('balance', req.body.amount)
	.returning('balance')
	.then(balance=>{
			res.json(balance[0].balance)
		})
	.catch(err => res.status(400).json('unable to get entries'))


})

app.put('/adding', (req,res)=>{
db('customers').where('id','=',req.body.r)
	.increment('balance', req.body.amount)
	.returning('balance')
	.then(balance=>{
			res.json(balance[0].balance)
		})
	.catch(err => res.json(err))


})

app.post('/recording', (req,res)=>{
	db('transactions').insert({
		sender : req.body.s,
		reciever : req.body.r,
		amount : req.body.amount,
		date : req.body.dispdate,
		time : req.body.disptime
	})
	.then(()=>{})
})

app.listen(process.env.PORT || 3000)

/*app.put('/sending', (req,res)=>{
db('customers').where('id','=',req.body.s)
	.decrement('balance', req.body.amount)
	.returning('balance')
	.then(balance=>{
			res.json(balance[0].balance)
		})
	.catch(err => res.status(400).json('unable to get entries'))


})*/