import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.formData();
    const html = data.get('html') as string;
    const resend = new Resend(RESEND_API_KEY);
    
    if (!html) {
        return json({ error: 'No HTML provided' }, { status: 400 });
    }
    
    const result = await resend.emails.send({
        from: "from-email",
        to: 'to-email',
        subject: 'Hello from Shootmail',
        html: html
    });

    return json(result);
};