"use client";

import React, { useState } from 'react';
import styles from './EmailForm.module.css';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Por favor, insira um e-mail válido.');
      return;
    }

    try {
      // --- INÍCIO DA ATUALIZAÇÃO ---
      // Faz a chamada real para a API que criamos
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Se a API retornar um erro (status 400, 500, etc.), lança um erro
        // para ser pego pelo bloco catch
        throw new Error(result.message || 'Falha ao se inscrever.');
      }
      
      // Sucesso!
      setStatus('success');
      setMessage(result.message || 'Obrigado! Avisaremos você no lançamento.');
      setEmail(''); // Limpa o campo de e-mail
      // --- FIM DA ATUALIZAÇÃO ---

    } catch (error: unknown) {
      setStatus('error');
      if (error instanceof Error) {
        setMessage(error.message || 'Algo deu errado. Tente novamente.');
      } else {
        setMessage('Algo deu errado. Tente novamente.');
      }
    }
  };

  // O JSX do return não precisa de nenhuma alteração.
  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.emailInput}
          placeholder="Digite seu melhor e-mail"
          disabled={status === 'loading'}
          required
        />
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Enviando...' : 'Quero ser notificado!'}
        </button>
      </form>

      {message && status === 'success' && (
        <p className={`${styles.statusMessage} ${styles.successMessage}`}>{message}</p>
      )}
      {message && status === 'error' && (
        <p className={`${styles.statusMessage} ${styles.errorMessage}`}>{message}</p>
      )}
    </div>
  );
}