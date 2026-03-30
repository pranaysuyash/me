import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure nodemailer with environment variables in production
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, message, honeypot } = await req.json();
    
    // Simple spam check with honeypot
    if (honeypot) {
      // If honeypot is filled, silently return success without sending email
      return NextResponse.json({ ok: true });
    }
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please complete all required fields' },
        { status: 400 }
      );
    }
    
    // Very basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // In development, just log the message
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submission (dev mode):', { name, email, message });
      return NextResponse.json({ ok: true });
    }
    
    // In production, send the email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'pranay.suyash@gmail.com', // Recipient
      subject: `Portfolio Contact: ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\\n/g, '<br>')}</p>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ ok: true });
    
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}