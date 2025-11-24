// Simple email utility - in production use Resend, SendGrid, or AWS SES
import { clerkClient } from "../lib/clerk";

export async function sendReplyNotification(
  parentCommentUserId: string,
  replyerName: string,
  articleTitle: string,
  articleUrl: string,
  replyContent: string
) {
  try {
    // 1. Get the parent user's email from Clerk
    const parentUser = await clerkClient.users.getUser(parentCommentUserId);
    const parentEmail = parentUser.emailAddresses[0]?.emailAddress;

    if (!parentEmail) {
      console.warn(`No email found for user ${parentCommentUserId}`);
      return;
    }

    // 2. In a real app, you would call your email provider here.
    // For now, we'll log what would happen.
    console.log(`
      📧 MOCK EMAIL SENDING
      To: ${parentEmail}
      Subject: ${replyerName} replied to your comment on "${articleTitle}"
      Body:
        Hi ${parentUser.firstName || 'there'},

        ${replyerName} replied to your comment:

        "${replyContent}"

        View the discussion: ${articleUrl}
    `);

    // Example with Resend (commented out):
    /*
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Open Design Docs <notifications@opendesigndocs.com>',
        to: parentEmail,
        subject: `${replyerName} replied to your comment`,
        html: `...`
      })
    });
    */

    return true;
  } catch (error) {
    console.error('Failed to send notification:', error);
    return false;
  }
}
