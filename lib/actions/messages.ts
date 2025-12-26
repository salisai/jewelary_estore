'use client';

import { supabaseBrowser } from "@/lib/supabase/client";

export async function submitContactMessage(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) {
    try {
        const { data, error } = await supabaseBrowser
            .from('contact_messages')
            .insert([
                {
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    status: 'unread',
                },
            ])
            .select();

        if (error) {
            console.error('Error submitting message:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err: any) {
        console.error('Unexpected error:', err);
        return { success: false, error: err.message || 'An unexpected error occurred' };
    }
}
