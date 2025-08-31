import { createClient } from 'redis';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import WelcomeEmail from '../../../../components/emails/WelcomeEmail';

// 1. Instancia o cliente do Resend com a chave da API do seu .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

// Função para salvar o e-mail no Redis (sem alterações)
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

// O Route Handler principal, agora com a lógica de envio de e-mail
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { message: 'E-mail fornecido é inválido.' },
        { status: 400 }
      );
    }

    // Passo 1: Salva o e-mail no banco de dados
    const result = await subscribeEmail(email);

    if (!result.success) {
      throw new Error(result.error as string | undefined);
    }

    // --- NOVO: LÓGICA PARA ENVIAR O E-MAIL ---
    try {
      // Passo 2: Dispara o e-mail de confirmação usando o Resend
      await resend.emails.send({
        from: 'Apollo3D <apollo3dson@gmail.com>', // IMPORTANTE: Use o domínio que você verificou!
        to: [email],
        subject: 'Inscrição Confirmada! | Apollo3D',
        // Usa o componente React para renderizar o corpo do e-mail
        react: WelcomeEmail({ userEmail: email }),
      });
    } catch (emailError) {
      // Se o envio de e-mail falhar, apenas logamos o erro no console.
      // A inscrição no banco de dados já foi um sucesso, então não
      // queremos mostrar um erro para o usuário por causa disso.
      console.error("Falha ao enviar e-mail de confirmação:", emailError);
    }
    // ------------------------------------------

    // Retorna a mensagem de sucesso para o formulário no frontend
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