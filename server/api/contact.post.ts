import { z } from 'zod';

const contactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(5).max(2000),
  token: z.string(),
  type: z.string(),
});

export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig();
  const siteConfig = getSiteConfig(event);

  const result = await readValidatedBody(event, body => contactSchema.safeParse(body));
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Validation failed',
    });
  }

  const body = result.data;

  const turnstileResponse = await verifyTurnstileToken(body.token);
  if (!turnstileResponse.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Token invalid.',
    });
  }

  const formData = new FormData();
  formData.set('api_token', runtimeConfig.contact.token);
  formData.set('email', runtimeConfig.contact.email);
  formData.set('subject', `Neue Kontaktanfrage auf ${siteConfig.url}`);
  formData.set('message', `Neue Kontaktanfrage auf ${siteConfig.url}:

Vorname: ${body.firstName}
Nachname: ${body.lastName}
Email: ${body.email}
Typ: ${body.type === 'workshop' ? 'Workshop-Anmeldung' : 'Kontaktformular'}
Nachricht:

${body.message}

---

(bitte nicht auf diese Nachricht Antworten sondern ein neues Email mit der obigen Addresse senden)
  `);

  try {
    await $fetch(runtimeConfig.contact.url, {
      method: 'POST',
      body: formData,
    });
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message could not be sent, please try again later.',
    });
  }

  return {};
});
