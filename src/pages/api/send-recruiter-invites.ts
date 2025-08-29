import type { APIContext } from 'astro';

// Recruiter data
const recruiters = [
  {
    name: 'Laura Hunting',
    email: 'laura@foundby.co',
    agency: 'Found By',
    inviteUrl: 'https://opendesigndocs.com/docs/recruiters/invite/laura-hunting'
  },
  {
    name: 'Garrett Fowler',
    email: 'garrett@off.site', 
    agency: 'Offsite',
    inviteUrl: 'https://opendesigndocs.com/docs/recruiters/invite/garrett-fowler'
  },
  {
    name: 'Dirk Cleveland',
    email: 'dirk@fusiontalent.com',
    agency: 'Fusion',
    inviteUrl: 'https://opendesigndocs.com/docs/recruiters/invite/dirk-cleveland'
  },
  {
    name: 'MJ',
    email: 'mj@off.site',
    agency: 'Offsite', 
    inviteUrl: 'https://opendesigndocs.com/docs/recruiters/invite/mj'
  }
];

export async function POST({ request }: APIContext) {
  try {
    // Simple security check - only allow from admin
    const { adminKey } = await request.json();
    if (adminKey !== 'jason2024') {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // For now, just return the email content that should be sent
    // In a real implementation, you'd integrate with an email service
    const emailTemplate = (recruiter: typeof recruiters[0]) => ({
      to: recruiter.email,
      subject: 'Your Open Design Docs Profile - Ready to Edit',
      html: `
        <h2>Hi ${recruiter.name.split(' ')[0]},</h2>
        
        <p>I've set up your recruiter profile on Open Design Docs! You can now access and edit your profile using this personalized link:</p>
        
        <p><a href="${recruiter.inviteUrl}" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">${recruiter.inviteUrl}</a></p>
        
        <p>This link will guide you through:</p>
        <ul>
          <li>Creating your account (using your professional email)</li>
          <li>Accessing your profile page</li>
          <li>Editing your information, specialties, and approach</li>
        </ul>
        
        <p>The whole process takes just a few minutes. Let me know if you have any questions!</p>
        
        <p>Best,<br/>Jason</p>
      `,
      text: `
Hi ${recruiter.name.split(' ')[0]},

I've set up your recruiter profile on Open Design Docs! You can now access and edit your profile using this personalized link:

${recruiter.inviteUrl}

This link will guide you through:
- Creating your account (using your professional email)
- Accessing your profile page
- Editing your information, specialties, and approach

The whole process takes just a few minutes. Let me know if you have any questions!

Best,
Jason
      `
    });

    const emails = recruiters.map(emailTemplate);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Email templates generated',
      emails,
      count: emails.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error generating recruiter invites:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate invites' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
