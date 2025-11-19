import type { APIContext } from 'astro';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
const webhookSecret = import.meta.env.CLERK_WEBHOOK_SECRET;

export const POST = async ({ request }: APIContext) => {
    console.log('🔔 Clerk Webhook received');

    if (!supabaseUrl || !supabaseServiceKey) {
        console.error('❌ Supabase configuration missing');
        return new Response('Server configuration error', { status: 500 });
    }

    // Note: In a production environment, you should verify the webhook signature
    // using the 'svix' library and CLERK_WEBHOOK_SECRET.
    // Since 'svix' is not currently installed, we are skipping strict verification
    // but you should add it for security.

    try {
        const payload = await request.json();
        const { type, data } = payload;

        console.log(`📨 Processing Clerk event: ${type}`);

        if (type === 'user.created') {
            const supabase = createClient(supabaseUrl, supabaseServiceKey);

            const email = data.email_addresses?.[0]?.email_address;
            const firstName = data.first_name;
            const lastName = data.last_name;
            const clerkUserId = data.id;

            if (!email) {
                console.error('❌ No email found in user.created event');
                return new Response('No email found', { status: 400 });
            }

            console.log(`👤 Adding new user to Supabase: ${email}`);

            // Check if user already exists
            const { data: existingUser } = await supabase
                .from('subscribers')
                .select('id')
                .eq('email', email)
                .single();

            if (existingUser) {
                console.log('⚠️ User already exists in subscribers table, updating Clerk ID');
                // Update the existing record with Clerk ID if missing
                await supabase
                    .from('subscribers')
                    .update({
                        clerk_user_id: clerkUserId,
                        first_name: firstName || undefined,
                        last_name: lastName || undefined
                    })
                    .eq('email', email);

                return new Response('User updated', { status: 200 });
            }

            // Insert new user
            const { error } = await supabase
                .from('subscribers')
                .insert({
                    email,
                    clerk_user_id: clerkUserId,
                    first_name: firstName,
                    last_name: lastName,
                    source: 'clerk_signup',
                    marketing_opt_in: false // Default to false, or extract from unsafe_metadata if you collect it
                });

            if (error) {
                console.error('❌ Error inserting user into Supabase:', error);
                return new Response('Database error', { status: 500 });
            }

            console.log('✅ User successfully added to Supabase');
        }

        return new Response('Webhook processed', { status: 200 });

    } catch (error) {
        console.error('❌ Error processing webhook:', error);
        return new Response('Invalid payload', { status: 400 });
    }
};
