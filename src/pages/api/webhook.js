import { buffer } from "micro";
import * as admin from 'firebase-admin';


//secure a connection to firebase
const serviceAccount = require('../../../permissions.json');
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
}) : admin.app();

//Establish a connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fullfillOrder = async (session) => {
    console.log('Fullfill order', session);

    return app.firestore()
            .collection('users')
            .doc(session.metadata.email)
            .collection("orders")
            .doc(session.id).set({
                amount: session.amount_total / 100,
                amount_shipping: session.total_details.amount_shipping / 100,
                images: JSON.parse(session.metadata.images),
                product: JSON.parse(session.metadata.product),
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            })
            .then(() =>{
                console.log(`SUCCESS: Order ${session.id} had been added to DB`);
            })
}

export default async (req, res) => {
    if(req.method === 'POST') {
        const requestBuffer = await buffer(req, res);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;

        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (error) {
            console.log('ERROR', err.message)
            return res.status(400).send(`Webhook error: ${err.message}`);
        }

        //Handle the chekout.session.completed event and
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            //Full fill order...
            return fullfillOrder(session)
            .then(() => res.status(200))
            .catch((err) => res.status(400).send(`Webhook error: ${err.message}`));
        }
    }
}

export const config = {
    api: {
       bodyParser: false,
       externalResolver: true, 
    },
}