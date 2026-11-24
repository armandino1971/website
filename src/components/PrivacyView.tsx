import { ArrowLeft } from 'lucide-react';
import { AppView, Language } from '../types';

interface PrivacyViewProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
}

export function PrivacyView({ lang, onNavigate }: PrivacyViewProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div>
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#D96B43] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'fr' ? 'Retour à l’accueil' : 'Voltar à página inicial'}</span>
        </button>
      </div>

      {lang === 'fr' && (
        <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 sm:p-6 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
          <p className="font-semibold text-slate-950">
            Synthèse RGPD (FR) — Protection des données &amp; Mentions légales
          </p>
          <p>
            Le siège social d’OpEx Lean (Armandino Seixas, NIF 233429492, Caxias / Oeiras) étant établi au Portugal, le texte légal complet ci-dessous est rédigé en portugais conformément au RGPD européen (UE 2016/679) et à la loi portugaise n.º 46/2021.
          </p>
          <p>
            <strong>Données collectées :</strong> uniquement les coordonnées saisies volontairement dans le formulaire de diagnostic (24 mois max pour les contacts, aucun cookie publicitaire). <strong>Contact RGPD / DPO :</strong>{' '}
            <a href="mailto:geral@opex-lean.eu" className="font-semibold text-[#D96B43] hover:underline">
              geral@opex-lean.eu
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-semibold">
            <a href="#privacidade-sec" className="text-slate-900 hover:text-[#D96B43] underline underline-offset-4">
              1. Politique de Confidentialité ↓
            </a>
            <a href="#mencoes-sec" className="text-slate-900 hover:text-[#D96B43] underline underline-offset-4">
              2. Mentions Légales ↓
            </a>
          </div>
        </div>
      )}

      <section id="privacidade-sec" className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 space-y-8 scroll-mt-20">
        <div className="border-b border-slate-200 pb-6">
          <p className="text-[#D96B43] font-semibold text-xs uppercase tracking-wider">
            Conforme RGPD e Lei n.º 46/2021
          </p>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 mt-1">
            Política de Privacidade
            {lang === 'fr' && (
              <span className="block text-lg sm:text-xl font-semibold text-slate-500 mt-1">
                Politique de Confidentialité (Texte officiel PT)
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            {lang === 'fr' ? 'Dernière mise à jour : 18/11/2026' : 'Data da última atualização: 18/11/2026'}
          </p>
        </div>

        <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="font-bold text-slate-950 text-lg mb-2">1. Quem é o responsável pelo tratamento dos seus dados?</h2>
            <p>Os dados pessoais recolhidos neste site são tratados por:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Nome:</strong> Armandino Seixas</li>
              <li><strong>NIF:</strong> 233429492</li>
              <li><strong>Endereço:</strong> Rua Dr. Manuel Rodrigues, n.º 3, 2.º Dto., 2760-048 Caxias, Portugal</li>
              <li><strong>E-mail:</strong> geral@opex-lean.eu</li>
              <li><strong>Telefone / WhatsApp:</strong> +351 912 771 681</li>
            </ul>
            <p className="mt-2">
              Este responsável atua na qualidade de Responsável pelo Tratamento, ao abrigo do Regulamento Geral sobre a Proteção de Dados (RGPD).
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 text-lg mb-2">2. Que dados pessoais recolhemos?</h2>
            <p>Podemos tratar os seguintes dados, apenas quando fornecidos voluntariamente por si:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone</li>
              <li>Nome da empresa</li>
              <li>Mensagem ou pedido de contacto</li>
            </ul>
            <p className="mt-2 italic text-xs text-slate-500">
              (Não recolhemos dados sensíveis, como origem étnica, opiniões políticas, saúde, etc.)
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 text-lg mb-2">3. Para que fins utilizamos os seus dados?</h2>
            <p>Os seus dados são tratados exclusivamente para as seguintes finalidades:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Responder a pedidos de informação ou contacto</li>
              <li>Enviar propostas comerciais ou orçamentos (se solicitado)</li>
              <li>Gerir pedidos de diagnóstico operacional</li>
              <li>Enviar comunicações profissionais (apenas com consentimento expresso)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 text-lg mb-2">4. Qual a base jurídica para o tratamento?</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Consentimento explícito do utilizador</li>
              <li>Execução de medidas pré-contratuais (ex: contacto para orçamento ou diagnóstico) – art. 6.º, n.º 1, alínea b) do RGPD</li>
              <li>Interesse legítimo na gestão de contactos profissionais – art. 6.º, n.º 1, alínea f) do RGPD</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 text-lg mb-2">5. Durante quanto tempo conservamos os seus dados?</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Contactos gerais:</strong> até 24 meses após o último contacto, salvo obrigação legal.</li>
              <li><strong>Propostas não aceites:</strong> até 12 meses.</li>
              <li><strong>Dados de clientes:</strong> até 5 anos (obrigação fiscal – art. 128.º do Código do IRS).</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 text-lg mb-2">6. Com quem partilhamos os seus dados?</h2>
            <p>
              Não vendemos nem partilhamos os seus dados com terceiros para fins comerciais. Podemos apenas partilhar com prestadores de serviços essenciais vinculados por contrato de proteção de dados (art. 28 RGPD).
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 text-lg mb-2">7. Quais são os seus direitos?</h2>
            <p>
              Nos termos do RGPD, tem direito a aceder, retificar, apagar, limitar ou opor-se ao tratamento dos seus dados, bem como solicitar a sua portabilidade. Pode exercer estes direitos contactando-nos por e-mail: <strong>geral@opex-lean.eu</strong>
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 text-lg mb-2">8. Direito de reclamação</h2>
            <p>Se considerar que o tratamento dos seus dados viola o RGPD, pode apresentar reclamação junto da CNPD:</p>
            <p className="mt-2 text-xs text-slate-600">
              <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong><br />
              Rua de São Bento, 719, 1300-548 Lisboa | www.cnpd.pt
            </p>
          </div>

          <div>
            <h2 className="font-bold text-slate-950 text-lg mb-2">9. Política de Cookies</h2>
            <p>
              Este site utiliza exclusivamente armazenamento técnico estritamente necessário ao funcionamento da página e à memorização da sua preferência de idioma (PT/FR), consentimento e progresso local do diagnóstico. Não utilizamos cookies publicitários nem de rastreamento de terceiros.
            </p>
          </div>
        </div>
      </section>

      <section id="mencoes-sec" className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 space-y-8 scroll-mt-20">
        <div className="border-b border-slate-200 pb-6">
          <p className="text-[#D96B43] font-semibold text-xs uppercase tracking-wider">
            Decreto-Lei n.º 111/2018 e Lei n.º 7/2004
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 mt-1">
            Informação Legal · Menções Legais
            {lang === 'fr' && (
              <span className="block text-lg sm:text-xl font-semibold text-slate-500 mt-1">
                Mentions Légales Officielles
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            {lang === 'fr' ? 'Dernière mise à jour : 18/11/2026' : 'Data da última atualização: 18/11/2026'}
          </p>
        </div>

        <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <div>
            <h3 className="font-bold text-slate-950 text-lg mb-2">1. Identificação do responsável pelo site</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Nome:</strong> Armandino Seixas</li>
              <li><strong>NIF:</strong> 233429492</li>
              <li><strong>Endereço:</strong> Rua Dr. Manuel Rodrigues, n.º 3, 2.º Dto., 2760-048 Caxias, Portugal</li>
              <li><strong>Telefone / WhatsApp:</strong> +351 912 771 681</li>
              <li><strong>E-mail:</strong> geral@opex-lean.eu</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-950 text-lg mb-2">2. Atividade profissional</h3>
            <p>
              Prestação de serviços de consultoria em melhoria da performance operacional, gestão Lean, redução de custos operacionais (OPEX), formação em metodologias de melhoria contínua e acompanhamento à transformação operacional, dirigidos a empresas industriais e logísticas.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-950 text-lg mb-2">3. Propriedade intelectual</h3>
            <p>
              Todo o conteúdo presente neste site (textos, imagens, logótipos, gráficos, metodologias) é propriedade exclusiva de Armandino Seixas ou utilizado com devida autorização. É proibida a reprodução total ou parcial sem autorização prévia por escrito.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-950 text-lg mb-2">4. Isenção de responsabilidade</h3>
            <p>
              O conteúdo deste site tem carácter informativo. Armandino Seixas não assume qualquer responsabilidade por eventuais erros, omissões ou decisões tomadas com base nas informações aqui disponibilizadas.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-950 text-lg mb-2">5. Legislação aplicável e foro</h3>
            <p>
              Estas menções legais regem-se pela legislação portuguesa. Para quaisquer litígios, as partes submetem-se à jurisdição exclusiva dos tribunais portugueses, com foro da Comarca de Lisboa.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
