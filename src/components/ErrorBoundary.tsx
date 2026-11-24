import { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';
import { Language } from '../types';

interface ErrorBoundaryProps {
  lang: Language;
  onReset?: () => void;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Graceful UI recovery handled in render
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      const isFr = this.props.lang === 'fr';
      return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-4">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#D96B43]">
              OpEx Lean
            </p>
            <h2 className="font-display font-extrabold text-2xl text-slate-950">
              {isFr ? 'Impossible de charger cette vue' : 'Não foi possível carregar esta vista'}
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {isFr
                ? 'Une erreur temporaire est survenue lors du chargement du module. Réessayez ou revenez à l’accueil.'
                : 'Ocorreu um erro temporário ao carregar o módulo. Tente novamente ou volte à página inicial.'}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isFr ? 'Revenir à l’accueil' : 'Voltar ao início'}</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
