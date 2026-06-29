"use server";

import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function submitCustomPackageRequest(prevState: any, formData: FormData) {
  const data = JSON.parse(formData.get('data') as string);

  if (!data.name || !data.phone) {
    return { error: 'Name and phone number are required.', success: false };
  }

  const emailBody = `
Custom Package Request
======================

Contact Details:
- Name: ${data.name}
- Phone: ${data.phone}
- Email: ${data.email || 'Not provided'}
- Preferred Date: ${data.preferredDate || 'Not specified'}
- Location: ${data.location || 'Not specified'}

Package Configuration:
- Balloons: ${data.balloonCount}
- Banners: ${data.banners?.join(', ') || 'None'}${data.customBannerText ? ` (Custom: "${data.customBannerText}")` : ''}
- Decoration Types: ${data.decorationTypes?.join(', ') || 'None'}
- Extras: ${data.extras?.join(', ') || 'None'}
- Budget Range: ${data.budgetRange || 'Not specified'}

Special Notes:
${data.specialNotes || 'None'}
  `.trim();

  if (!resend) {
    console.log('[Mock Resend] Custom package request:', emailBody);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, name: data.name };
  }

  try {
    await resend.emails.send({
      from: 'Celebration Gallery <onboarding@resend.dev>',
      to: 'kavnish1245@gmail.com',
      subject: `Custom Package Request from ${data.name}`,
      text: emailBody
    });
    return { success: true, name: data.name };
  } catch (error: any) {
    console.error('Error sending email via Resend:', error);
    return { error: error.message || 'Failed to send request. Please try again later.', success: false };
  }
}
