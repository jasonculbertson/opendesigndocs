# Clerk + Supabase Integration Setup

This document explains how to connect Clerk authentication with your Supabase subscribers table so that all users who sign up are automatically captured.

## 🚀 What's Been Implemented

### 1. **Clerk Webhook Endpoint** (`/api/webhooks/clerk`)
- Captures `user.created` events from Clerk
- Automatically adds new users to your Supabase `subscribers` table
- Handles duplicate emails gracefully
- Logs all webhook activity for debugging

### 2. **Updated Subscribe API** (`/api/subscribe`)
- Now actually stores email subscriptions in Supabase
- Handles newsletter signups from your website
- Prevents duplicate subscriptions
- Provides user-friendly error messages

### 3. **Dual User Capture**
- **Clerk Signups**: Users who create accounts → stored with `source: 'clerk_signup'`
- **Newsletter Signups**: Users who just subscribe → stored with `source: 'newsletter_signup'`

## ⚙️ Setup Required

### 1. **Environment Variables**
Add these to your Vercel environment variables:

```bash
# Supabase (you may already have these)
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Clerk Webhook (new)
CLERK_WEBHOOK_SECRET=your_clerk_webhook_signing_secret
```

### 2. **Configure Clerk Webhook**
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Navigate to **Webhooks** in your project
3. Click **Add Endpoint**
4. Set URL to: `https://your-site.vercel.app/api/webhooks/clerk`
5. Select events: **`user.created`**
6. Copy the **Signing Secret** and add it to your environment as `CLERK_WEBHOOK_SECRET`

### 3. **Expected Subscribers Table Schema**
Your Supabase `subscribers` table should have these columns:

```sql
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  clerk_user_id TEXT, -- Optional: links to Clerk user
  first_name TEXT,
  last_name TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT, -- 'clerk_signup' or 'newsletter_signup'
  marketing_opt_in BOOLEAN DEFAULT false
);
```

## 📊 How It Works

### User Signs Up via Clerk
1. User creates account through your auth overlay
2. Clerk sends `user.created` webhook to `/api/webhooks/clerk`
3. Webhook extracts user data and inserts into `subscribers` table
4. Discord notification is triggered (if configured)
5. User data includes: email, name, Clerk user ID, marketing opt-in

### User Subscribes via Newsletter
1. User enters email in newsletter form
2. Frontend calls `/api/subscribe`
3. Email is stored in `subscribers` table with source `newsletter_signup`
4. Discord notification is triggered (if configured)

## 🔧 Testing

### Test Clerk Integration
1. Create a new user account on your site
2. Check Vercel function logs for webhook activity
3. Verify user appears in Supabase `subscribers` table
4. Check Discord for notification (if configured)

### Test Newsletter Subscription
1. Use newsletter signup form on your site
2. Check Vercel function logs for API activity
3. Verify email appears in Supabase `subscribers` table

## 🛡️ Security Notes

- **Webhook Verification**: Currently disabled for development. Enable in production using the `svix` library
- **Service Role Key**: Used for server-side operations with full database access
- **Error Handling**: Graceful handling of duplicates and database errors

## 📝 Monitoring

Check these logs to monitor the integration:
- **Vercel Function Logs**: See webhook and API activity
- **Supabase Logs**: Monitor database operations
- **Discord Notifications**: Get real-time alerts for new subscribers

## 🚨 Next Steps

1. **Deploy the changes** to Vercel
2. **Configure Clerk webhook** in dashboard
3. **Add environment variables** in Vercel
4. **Test both signup flows**
5. **Monitor logs** for any issues

All users who sign up through Clerk will now be automatically captured in your Supabase subscribers table! 🎉 