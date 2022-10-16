import { CircleNotch, PaperPlaneRight } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import classNames from 'classnames';
import { SecTitle } from '../SecTitle/index';

export function Contact() {
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [alertMessage, setAlertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleMessageSubmit(event: FormEvent) {
    event.preventDefault();

    setIsSendingMessage(true);

    await fetch('/api/mail', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    })
      .then(res => {
        setAlertMessage('E-mail enviado com sucesso');
      })
      .catch(error => {
        setErrorMessage('Houve um erro ao enviar o e-mail');
      });

    setIsSendingMessage(false);

    setMessage('');
    setEmail('');
    setName('');
  }

  return (
    <section id="contact" className="flex flex-col items-center justify-center bg-brand-800">
      <SecTitle content="Fale comigo" />
      <form action="/api/mail" onSubmit={handleMessageSubmit} className="flex flex-col items-center gap-6 px-10 w-full lg:w-auto lg:px-0">
        <span
          className={classNames('text-zinc-200 rounded p-2 bg-opacity-70', {
            'bg-primary-500': alertMessage.length > 0,
            visible: alertMessage.length > 0 || errorMessage.length > 0,
            hidden: !alertMessage && !errorMessage,
            'bg-red-500': errorMessage.length > 0,
          })}
        >
          {alertMessage.length > 0 ? alertMessage : errorMessage.length > 0 ? errorMessage : ''}
        </span>
        <div className="flex flex-col lg:flex-row w-full gap-2">
          <div className="flex flex-col">
            <label htmlFor="email">Seu email</label>
            <input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="exemplo@gmail.com" name="email" id="email" className="rounded-md bg-secondary-500 py-2 px-4" required />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Seu nome</label>
            <input type="text" value={name} onChange={event => setName(event.target.value)} name="name" id="name" className="rounded-md bg-secondary-500 p-2" placeholder="Fulano de Tal" required />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="message">Sua mensagem</label>
          <textarea name="message" value={message} onChange={event => setMessage(event.target.value)} id="message" className="lg:h-80 h-36 resize-none rounded-md bg-secondary-500 p-4 w-full lg:w-auto" placeholder="Escreva aqui sua mensagem..." required></textarea>
        </div>
        <button disabled={isSendingMessage} className="mb-6 disabled:opacity-50 group bg-primary-500 py-2 px-8 rounded text-brand-900 flex items-center justify-center gap-1 active:bg-primary-600 hover:bg-primary-600 transition-colors" type="submit">
          {!isSendingMessage ? (
            <>
              Enviar
              <PaperPlaneRight className="group-hover:translate-x-1 group-active:translate-x-1 transition-transform" size={26} />
            </>
          ) : (
            <CircleNotch className="animate-spin" />
          )}
        </button>
      </form>
    </section>
  );
}
