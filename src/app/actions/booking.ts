"use server";

import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function submitBooking(formData: FormData) {
  const fullname = formData.get('fullname') as string;
  const phone = formData.get('phone') as string;
  const date = formData.get('date') as string;
  const location = formData.get('location') as string;
  const packageTitle = formData.get('packageTitle') as string;
  const packagePrice = formData.get('packagePrice') as string;

  if (!fullname || !phone || !date) {
    return { error: 'Name, phone, and date are required.', success: false };
  }

  const emailBody = `
New Booking Request
====================

Contact Details:
- Name: ${fullname}
- Phone: ${phone}

Booking Details:
- Package: ${packageTitle || 'Not specified'}
- Price: ${packagePrice || 'Not specified'}
- Preferred Date: ${date}
- Location: ${location || 'Not specified'}

---
Sent from Celebration Gallery Booking Form
  `.trim();

  if (!resend) {
    console.log('[Mock Resend] Booking submission:', emailBody);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, name: fullname };
  }

  try {
    await resend.emails.send({
      from: 'Celebration Gallery <onboarding@resend.dev>',
      to: 'kavnish1245@gmail.com', // Update with your email once Resend API key is set
      subject: `New Booking from ${fullname} — ${packageTitle}`,
      text: emailBody
    });
    return { success: true, name: fullname };
  } catch (error: any) {
    console.error('Error sending booking email via Resend:', error);
    return { error: error.message || 'Failed to send booking. Please try again.', success: false };
  }
}
