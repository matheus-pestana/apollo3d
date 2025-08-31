import { createClient } from 'redis';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import WelcomeEmail from '../../../../components/emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

async function subscribeEmail(email: string) {
  const client = createClient({
    url: process.env.REDIS_URL
  });
  client.on('error', (err) => console.error('Erro de Conexão com o Redis:', err));
  try {
    await client.connect();
    await client.sAdd('subscribers:apollo3d', email);
    return { success: true };
  } catch (error) {
    console.error('Falha ao salvar o e-mail no Redis:', error);
    return { success: false, error: 'Não foi possível processar a inscrição.' };
  } finally {
    if (client.isOpen) {
      await client.quit();
    }
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { message: 'E-mail fornecido é inválido.' },
        { status: 400 }
      );
    }

    const result = await subscribeEmail(email);

    if (!result.success) {
      throw new Error(result.error as string | undefined);
    }

    try {
      await resend.emails.send({
        from: 'Apollo3D <contato@apollo3d.com.br>',
        to: [email],
        subject: 'Inscrição Confirmada! | Apollo3D',
        react: WelcomeEmail({ userEmail: email }),
      });
    } catch (emailError) {
      console.error("Falha ao enviar e-mail de confirmação:", emailError);
    }

    return NextResponse.json(
      { message: 'Inscrição realizada com sucesso!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro no endpoint /api/subscribe:', error);
    return NextResponse.json(
      { message: 'Ocorreu um erro interno. Tente novamente.' },
      { status: 500 }
    );
  }
}