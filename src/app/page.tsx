import Image from "next/image";
import EmailForm from "../../components/emailForm/emailForm";

export default function ComingSoonPage() {
  return (
    <main id="main">
      <div className="container">
        <div className="content">
          <Image
            src="/logoCompleta.png"
            alt="Logo da Empresa"
            className="logo"
            width={400}
            height={400}
            priority
          />
          <h1 className="title">Em desenvolvimento.</h1>
          <p className="text">Em breve nossa loja estará disponível!</p>
        </div>
        <div className="form-wrapper">
          <h1 className="form-title">Seja o primeiro a saber!</h1>
          <p className="form-text">
            Informe seu e-mail para ser notificado do lançamento do site.
          </p>

          <EmailForm />
        </div>
      </div>

    </main>
  );
}