import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, userEmail, plan } = req.body;
    console.log('Req Body', req.body)
    let priceId;

    switch (plan) {
      case 'pro':
        priceId = 'price_1O8jdiKwmnTTqjKbVkZz89Nb';  // Replace with your actual Stripe price ID
        break;
      case 'premium':
        priceId = 'price_1O8j3vKwmnTTqjKbXGosvvZP';  // Replace with your actual Stripe price ID
        break;
      default:
        return res.status(400).json({ error: 'Invalid plan selected' });
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: userEmail,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          user_id: userId,
          plan_type: plan, // Assuming 'plan' is a variable holding the plan type like 'pro' or 'premium'

        },
        mode: 'subscription',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      console.log(session)

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
