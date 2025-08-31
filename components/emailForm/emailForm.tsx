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
      // AQUI É ONDE VOCÊ FARIA A CHAMADA PARA SUA API
      // Por enquanto, vamos apenas simular uma chamada de rede
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      // Simular um erro para teste
      if (email === 'fail@example.com') {
        throw new Error('Este e-mail já está cadastrado em outro lugar.');
      }

      // Sucesso!
      setStatus('success');
      setMessage('Obrigado! Avisaremos você no lançamento.');
      setEmail(''); // Limpa o campo de e-mail

    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'Algo deu errado. Tente novamente.');
    }
  };

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