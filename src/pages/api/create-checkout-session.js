const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const {items, email} = req.body;

    // console.log(items, email);
    const transformedItems = items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        price_data: {
            currency: "inr",
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image],
            },
        },
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ["shr_1KBru5SIMCnKvcxRYjFzPsqn"],
        shipping_address_collection: {
            allowed_countries: ["IN", "GB", "US", "CA"],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.NEXTAUTH_URL}/success`,
        cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item) => item.image)),
            product: JSON.stringify(items.map((item) => ({
                image: item.image,
                quantity: item.quantity,
            })))
        }
    });

    res.status(200).json({ id: session.id})
};