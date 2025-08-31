import { createClient } from 'redis';
import { NextResponse } from 'next/server';

// Função para encapsular a lógica de conexão com o Redis
async function subscribeEmail(email: string) {
  // O cliente Redis busca a URL de conexão
  // da variável de ambiente REDIS_URL que você configurou.
  const client = createClient({
    url: process.env.REDIS_URL
  });

  client.on('error', (err) => console.error('Erro de Conexão com o Redis:', err));

  try {
    // 1. Conecta ao banco de dados
    await client.connect();

    // 2. Adiciona o e-mail a um "set" para evitar duplicatas
    await client.sAdd('subscribers:apollo3d', email);

    // 3. Retorna sucesso
    return { success: true };
  } catch (error) {
    console.error('Falha ao salvar o e-mail no Redis:', error);
    return { success: false, error: 'Não foi possível processar a inscrição.' };
  } finally {
    // 4. Garante que a conexão seja sempre fechada
    if (client.isOpen) {
      await client.quit();
    }
  }
}


// Este é o Route Handler que recebe a requisição do seu formulário
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