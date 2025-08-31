import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface WelcomeEmailProps {
  userEmail: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const WelcomeEmail = ({ userEmail }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Sua inscrição na Apollo3D foi confirmada!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://i.imgur.com/your-logo-id.png`} // SUBSTITUA pela URL da sua logo
          width="150"
          height="auto"
          alt="Apollo3D Logo"
          style={logo}
        />
        <Text style={paragraph}>Olá!</Text>
        <Text style={paragraph}>
          Recebemos sua inscrição com o e-mail ({userEmail}) e estamos muito felizes em ter você conosco.
        </Text>
        <Text style={paragraph}>
          Assim que a loja for lançada, você será um dos primeiros a saber. Preparamos muitas novidades e produtos incríveis feitos com impressão 3D que você vai adorar.
        </Text>
        <Text style={paragraph}>
          Até breve,
          <br />
          Equipe Apollo3D
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

// Estilos para o e-mail (CSS inline é necessário para compatibilidade)
const main = {
  backgroundColor: '#0a0a0a',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
  backgroundColor: '#1c1c1c',
  borderRadius: '8px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  color: '#ededed',
  fontSize: '16px',
  lineHeight: '26px',
  textAlign: 'left' as const,
  padding: '0 40px',
};