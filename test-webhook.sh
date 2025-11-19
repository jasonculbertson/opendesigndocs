#!/bin/bash

# Test Clerk Webhook Endpoint
# This script helps diagnose webhook configuration issues

echo "🧪 Testing Clerk Webhook Endpoint..."
echo ""

WEBHOOK_URL="https://www.opendesigndocs.com/api/webhooks/clerk"

echo "📍 Webhook URL: $WEBHOOK_URL"
echo ""

echo "1️⃣ Testing webhook endpoint accessibility..."
echo ""

# Test with a sample payload
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "svix-id: test_123" \
  -H "svix-timestamp: $(date +%s)" \
  -H "svix-signature: test_signature" \
  -d '{
    "type": "user.created",
    "data": {
      "id": "user_test_' $(date +%s) '",
      "email_addresses": [
        {
          "email_address": "test@example.com",
          "id": "email_123"
        }
      ],
      "first_name": "Test",
      "last_name": "User"
    }
  }' \
  -w "\n\n📊 Response Status: %{http_code}\n" \
  -v

echo ""
echo "✅ Test complete!"
echo ""
echo "Expected results:"
echo "  - Status 200: Webhook is working"
echo "  - Status 500: Server configuration issue"
echo "  - Status 400: Invalid payload"
echo "  - Connection error: URL not accessible"
echo ""
echo "Next steps:"
echo "  1. Check Vercel function logs for details"
echo "  2. Verify environment variables are set"
echo "  3. Check Supabase for new test user"

