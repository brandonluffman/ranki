import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { session_id } = req.query;

  try {
    if (!session_id) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);
    // Perform additional verification as needed

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
