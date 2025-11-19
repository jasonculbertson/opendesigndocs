# Configuration Checklist for Clerk + Supabase Authentication

## 🔍 Current Issues
- OAuth completes but session isn't established
- Users aren't being saved to Supabase `subscribers` table

## ✅ Configuration Checklist

### 1. **Vercel Environment Variables**

Go to [Vercel Dashboard](https://vercel.com) → Your Project → Settings → Environment Variables

Check that these are set for **Production, Preview, and Development**:

```bash
# Clerk Keys (Required)
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...  # Starts with pk_live_ or pk_test_
CLERK_SECRET_KEY=sk_live_...              # Starts with sk_live_ or sk_test_

# Supabase Keys (Required)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJI...  # Long JWT token

# Clerk Webhook (Required for saving users)
CLERK_WEBHOOK_SECRET=whsec_...            # Starts with whsec_
```

**Action:** 
- [ ] Verify all keys are present
- [ ] Verify keys start with correct prefixes
- [ ] Redeploy after adding any missing keys

---

### 2. **Clerk Dashboard - OAuth Settings**

Go to [Clerk Dashboard](https://dashboard.clerk.com/) → Your Application → Configure

#### A. **Enable Google OAuth**
Path: `User & Authentication` → `Social Connections`

- [ ] **Google** is enabled
- [ ] OAuth credentials are configured
- [ ] **Client ID** and **Client Secret** are set

#### B. **Allowed Redirect URLs**
Path: `Paths` → `Authorized redirect URIs`

Must include:
```
https://clerk.opendesigndocs.com/v1/oauth_callback
https://www.opendesigndocs.com
https://www.opendesigndocs.com/*
```

- [ ] All redirect URLs are added
- [ ] No typos in domain names

#### C. **Domain Settings**
Path: `Configure` → `Domains`

- [ ] Production domain: `www.opendesigndocs.com`
- [ ] Development domain (if using): `localhost:4321`
- [ ] Satellite application URL matches your domain

---

### 3. **Clerk Dashboard - Webhook Configuration**

Go to [Clerk Dashboard](https://dashboard.clerk.com/) → Webhooks → Add Endpoint

#### Webhook Settings:
```
Endpoint URL: https://www.opendesigndocs.com/api/webhooks/clerk
Message Filtering: user.created
```

**Steps:**
1. [ ] Click **"Add Endpoint"**
2. [ ] Enter URL: `https://www.opendesigndocs.com/api/webhooks/clerk`
3. [ ] Select event: `user.created` (check the box)
4. [ ] Click **"Create"**
5. [ ] Copy the **Signing Secret** (starts with `whsec_`)
6. [ ] Add signing secret to Vercel as `CLERK_WEBHOOK_SECRET`
7. [ ] Redeploy Vercel after adding secret

---

### 4. **Supabase - Database Setup**

Go to [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → SQL Editor

#### A. **Create `subscribers` Table**

Run this SQL if the table doesn't exist:

```sql
-- Create subscribers table
CREATE TABLE IF NOT EXISTS public.subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  clerk_user_id TEXT,
  first_name TEXT,
  last_name TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT,
  marketing_opt_in BOOLEAN DEFAULT false
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_clerk_user_id ON public.subscribers(clerk_user_id);

-- Enable RLS (Row Level Security)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert
CREATE POLICY "Allow service role to insert" ON public.subscribers
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow service role to update
CREATE POLICY "Allow service role to update" ON public.subscribers
  FOR UPDATE
  USING (true);

-- Create policy to allow service role to select
CREATE POLICY "Allow service role to select" ON public.subscribers
  FOR SELECT
  USING (true);
```

- [ ] Table exists with correct schema
- [ ] Indexes are created
- [ ] RLS policies are set up

#### B. **Test Database Connection**

In Supabase SQL Editor, run:
```sql
SELECT * FROM public.subscribers LIMIT 5;
```

- [ ] Query executes without errors
- [ ] You can see the table structure

---

### 5. **Test the Webhook Endpoint**

#### Test URL:
```
https://www.opendesigndocs.com/api/webhooks/clerk
```

#### Manual Test (using curl):
```bash
curl -X POST https://www.opendesigndocs.com/api/webhooks/clerk \
  -H "Content-Type: application/json" \
  -d '{
    "type": "user.created",
    "data": {
      "id": "user_test123",
      "email_addresses": [{"email_address": "test@example.com"}],
      "first_name": "Test",
      "last_name": "User"
    }
  }'
```

Expected response: `200 OK` with "Webhook processed"

- [ ] Endpoint is accessible
- [ ] Returns 200 status
- [ ] Check Vercel logs for webhook activity

---

### 6. **Verify Deployment**

Go to [Vercel Dashboard](https://vercel.com) → Your Project → Deployments

- [ ] Latest deployment succeeded
- [ ] Deployment includes webhook file (`src/pages/api/webhooks/clerk.ts`)
- [ ] No build errors
- [ ] Environment variables are set

---

### 7. **Check Vercel Function Logs**

Go to Vercel Dashboard → Your Project → Logs

Filter for: `api/webhooks/clerk`

**What to look for:**
- `🔔 Clerk Webhook received` - Webhook was called
- `📨 Processing Clerk event: user.created` - Event is being processed
- `👤 Adding new user to Supabase: [email]` - User is being saved
- `✅ User successfully added to Supabase` - Success!

**Common errors:**
- `❌ Supabase configuration missing` - Missing env vars
- `❌ Error inserting user into Supabase` - Database or RLS issue
- No logs at all - Webhook not configured in Clerk

- [ ] Logs show webhook receiving requests
- [ ] No error messages in logs

---

### 8. **OAuth Session Issue - Domain Configuration**

The OAuth flow shows:
```
Redirecting to: https://clerk.opendesigndocs.com/v1/oauth_callback
Then back to: https://www.opendesigndocs.com/
```

#### Potential Issue: Subdomain Mismatch

In Clerk Dashboard → Configure → Domains:

Check if you have:
- **Primary domain:** `www.opendesigndocs.com`
- **Clerk frontend API:** `clerk.opendesigndocs.com`

**Fix:**
- [ ] Ensure both domains are properly configured
- [ ] Check if SSL certificates are valid for both
- [ ] Verify DNS records for `clerk.opendesigndocs.com`

#### Alternative Fix: Use Single Domain

If subdomain is causing issues, configure Clerk to use:
- **Primary domain:** `www.opendesigndocs.com` (only)
- **Frontend API:** Same as primary domain

- [ ] Domain configuration matches OAuth redirect flow

---

## 🧪 Testing Checklist

### Test 1: Create New User
1. [ ] Go to https://www.opendesigndocs.com
2. [ ] Click "Get Started" or sign up button
3. [ ] Complete Google OAuth flow
4. [ ] Check you're signed in (avatar appears)
5. [ ] Check Supabase `subscribers` table for new entry
6. [ ] Check Vercel logs for webhook activity

### Test 2: Existing User
1. [ ] Sign out
2. [ ] Sign in again with same Google account
3. [ ] Should see existing session immediately
4. [ ] Avatar should appear

### Test 3: Webhook Delivery
1. [ ] In Clerk Dashboard → Webhooks
2. [ ] Click on your webhook endpoint
3. [ ] Check "Recent Deliveries"
4. [ ] Should see `user.created` events with 200 status
5. [ ] Click event to see request/response details

---

## 🚨 Common Issues & Solutions

### Issue: "OAuth completes but user not signed in"

**Possible causes:**
1. ❌ Domain mismatch between OAuth and site
2. ❌ Missing `CLERK_SECRET_KEY` in Vercel
3. ❌ Clerk session not establishing properly

**Solutions:**
- Verify all Clerk environment variables
- Check domain configuration in Clerk Dashboard
- Clear browser cookies and try again
- Check for CSP (Content Security Policy) blocking

### Issue: "Users not appearing in Supabase"

**Possible causes:**
1. ❌ Webhook not configured in Clerk
2. ❌ Webhook returning errors (check logs)
3. ❌ Missing `CLERK_WEBHOOK_SECRET`
4. ❌ RLS policies blocking inserts
5. ❌ Table doesn't exist

**Solutions:**
- Set up webhook in Clerk Dashboard (step 3)
- Check Vercel function logs for errors
- Verify Supabase credentials
- Disable RLS temporarily to test
- Run SQL to create table (step 4.A)

### Issue: "Webhook timing out or failing"

**Possible causes:**
1. ❌ Supabase service key invalid
2. ❌ Network/firewall blocking requests
3. ❌ Function timeout

**Solutions:**
- Regenerate Supabase service role key
- Check Vercel function timeout settings
- Test webhook manually with curl

---

## 📊 Success Indicators

✅ **Everything is working when:**

1. User clicks Google OAuth → Redirects to Google → Returns to site
2. User avatar appears in header (signed in)
3. User redirected to `/docs/levels/levels-titles`
4. New row appears in Supabase `subscribers` table
5. Vercel logs show successful webhook processing
6. Clerk Dashboard shows 200 response for webhook

---

## 🔗 Quick Links

- [Clerk Dashboard](https://dashboard.clerk.com/)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Vercel Logs](https://vercel.com/[your-project]/logs)
- [Webhook Endpoint](https://www.opendesigndocs.com/api/webhooks/clerk)

---

## 📝 Next Steps

1. Go through each checklist item above
2. Fix any missing configuration
3. Redeploy Vercel after changes
4. Test with a new email address
5. Check Vercel logs and Supabase table

**Need help?** Check the logs at each step and note where it fails.

