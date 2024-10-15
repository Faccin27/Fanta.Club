import React from 'react';
import { HelpCircle as FaqIcon } from 'lucide-react';

interface Faq {
  id: number;
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    id: 1,
    question: "O cheat é detectável?",
    answer: "Nosso cheat é atualizado regularmente para evitar detecção por sistemas anti-cheat. No entanto, recomendamos usá-lo com responsabilidade para minimizar o risco."
  },
  {
    id: 2,
    question: "Como posso atualizar o cheat?",
    answer: "Você receberá uma notificação por e-mail ou no painel de usuário quando uma nova atualização estiver disponível. Basta seguir as instruções enviadas para aplicar a atualização."
  },
  {
    id: 3,
    question: "Posso ser banido usando o cheat?",
    answer: "Embora tomemos todas as precauções para evitar detecção, existe sempre o risco de ser banido. Certifique-se de seguir nossas orientações para minimizar esse risco."
  },
  {
    id: 4,
    question: "Qual é o método de pagamento aceito?",
    answer: "Aceitamos pagamentos via PayPal, cartões de crédito e criptomoedas. O processo de compra é seguro e garantimos a privacidade de seus dados."
  }
];

const Faq: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <FaqIcon className="mr-2" />
        <h1 className="text-2xl font-bold">Perguntas Frequentes</h1>
      </div>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-zinc-700 shadow rounded-lg p-4">
            <h2 className="text-lg text-orange-500 font-semibold">{faq.question}</h2>
            <p className="text-sm text-gray-300 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
