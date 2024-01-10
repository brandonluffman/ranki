// Import necessary modules
import Stripe from 'stripe';
import { buffer } from 'micro';
import { supabase } from '../../utils/supabaseClient'; // Adjust the path as needed

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req, res) => {
  if (req.method === 'POST') {
    const reqBuffer = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(reqBuffer, sig, endpointSecret);
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.metadata.user_id;
      const planType = session.metadata.plan_type; // Retrieve plan type from metadata

      // Retrieve the current user data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', userId)
        .single();

      if (userError || !userData) {
        console.error('Error fetching user data:', userError);
        res.status(500).send('Error fetching user data');
        return;
      }

      // Update the user's isPaid status and API credits
      const apiCredits = userData.api_credits || 0;
      const { error: updateError } = await supabase
      .from('users')
      .update({ 
        paid_user: true,
        api_credits: (userData.api_credits || 0) + 15, // Increment API credits by 15
        paid_plan_type: planType, // Update plan type
        plan_activation_date: new Date().toISOString().split('T')[0] // current date in YYYY-MM-DD format
      })
      .eq('auth_id', userId);

      if (updateError) {
        console.error('Error updating user status and API credits:', updateError);
        res.status(500).send('Error updating user status and API credits');
        return;
      }

      console.log('User status and API credits updated successfully');
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default webhookHandler;
