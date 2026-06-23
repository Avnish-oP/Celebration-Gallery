"use server";

import { Resend } from 'resend';

// Only instantiate Resend if the API key is present
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function submitContactForm(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email) {
    return { error: 'Name and email are required.', success: false };
  }

  // If there's no API key (e.g. local dev without .env setup), mock the success.
  if (!resend) {
    console.log('[Mock Resend] Would have sent email:', { name, email, message });
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, name };
  }

  try {
    await resend.emails.send({
      from: 'Celebration Gallery <onboarding@resend.dev>', // Resend testing domain
      to: ['delivered@resend.dev'], // Deliver to Resend testing inbox or configured email
      subject: `New Party Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    });
    return { success: true, name };
  } catch (error: any) {
    console.error('Error sending email via Resend:', error);
    return { error: error.message || 'Failed to send email. Please try again later.', success: false };
  }
}
