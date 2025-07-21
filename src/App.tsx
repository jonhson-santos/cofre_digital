import React, { useState, useEffect } from 'react';
import { Shield, Lock, AlertTriangle, Zap, Users, TrendingUp, Eye, Clock, CheckCircle, FileText, Download, Play, Target, Folder, Key } from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [glitchText, setGlitchText] = useState('VOCÊ FOI ESCOLHIDO.');
  const [timeLeft, setTimeLeft] = useState(12 * 60); // 12 minutos em segundos
  const [typedText, setTypedText] = useState('');
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const fullText = 'ACESSO_LIBERADO_COFRE_DIGITAL_ATIVO';

  useEffect(() => {
    setIsVisible(true);
    
    // Efeito de digitação no terminal
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    // Efeito de glitch no texto principal
    const glitchInterval = setInterval(() => {
      const glitchChars = '█▓▒░!@#$%^&*()_+{}|:"<>?[]\\;\'./,`~';
      const originalText = 'VOCÊ FOI ESCOLHIDO.';
      
      let glitched = originalText;
      for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * originalText.length);
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        glitched = glitched.substring(0, randomIndex) + randomChar + glitched.substring(randomIndex + 1);
      }
      
      setGlitchText(glitched);
      
      setTimeout(() => {
        setGlitchText(originalText);
      }, 150);
    }, 4000);

    // Countdown timer
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitIntent && e.target === document.documentElement) {
        setHasShownExitIntent(true);
        setTimeout(() => {
          window.location.href = 'https://clube-dos-criativos-oferta.vercel.app/';
        }, 100);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasShownExitIntent) {
        e.preventDefault();
        e.returnValue = 'Seu pagamento ainda não foi confirmado. Tem certeza que deseja sair?';
        return 'Seu pagamento ainda não foi confirmado. Tem certeza que deseja sair?';
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Detect Alt+F4, Ctrl+W, Ctrl+T, etc.
      if (
        (e.altKey && e.key === 'F4') ||
        (e.ctrlKey && (e.key === 'w' || e.key === 'W')) ||
        (e.ctrlKey && (e.key === 't' || e.key === 'T')) ||
        (e.ctrlKey && (e.key === 'r' || e.key === 'R'))
      ) {
        if (!hasShownExitIntent) {
          e.preventDefault();
          const confirmExit = confirm('Seu pagamento ainda não foi confirmado. Deseja realmente sair?');
          if (confirmExit) {
            setHasShownExitIntent(true);
            window.location.href = 'https://clube-dos-criativos-oferta.vercel.app/';
          }
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(glitchInterval);
      clearInterval(timerInterval);
      clearInterval(typingInterval);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasShownExitIntent]);

  const handleExitRedirect = () => {
    setHasShownExitIntent(true);
    window.location.href = 'https://clube-dos-criativos-oferta.vercel.app/';
  };

  const handlePaymentRedirect = (url: string) => {
    window.open(url, '_blank');
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const vaultItems = [
    {
      icon: <FileText className="w-5 h-5" />,
      count: "40+",
      item: "Criativos editados",
      description: "Prontos para tráfego — só baixar e subir"
    },
    {
      icon: <Target className="w-5 h-5" />,
      count: "20+",
      item: "Copies black testadas",
      description: "Com CTA forte — só copiar e colar"
    },
    {
      icon: <Play className="w-5 h-5" />,
      count: "15+",
      item: "Templates de VSL ocultos",
      description: "Estruturas que convertem em qualquer nicho"
    },
    {
      icon: <Eye className="w-5 h-5" />,
      count: "10+",
      item: "Tutoriais em vídeo",
      description: "Como clonar, subir e escalar"
    }
  ];

  const benefits = [
    "Criativos prontos para tráfego — só baixar e subir",
    "Copies testadas — só copiar e colar", 
    "Edição já feita — Reels, Shorts, TikTok",
    "Textos ocultos, ganchos e visuais de alta conversão",
    "Criativos por nicho (MMN, PLR, renda extra, mentalidade, lançamento)",
    "Biblioteca secreta atualizada semanalmente"
  ];

  const plans = [
    {
      name: "ACESSO SEMANAL",
      price: "R$17",
      description: "Atualizações toda semana + pasta da semana",
      button: "SÓ QUERO TESTAR",
      accent: "border-yellow-500 bg-yellow-500 bg-opacity-10",
      paymentUrl: "https://app.pushinpay.com.br/service/pay/9F671662-2D90-4362-AEA1-F0CC4BBEA7A5"
    },
    {
      name: "ACESSO MENSAL", 
      price: "R$47",
      description: "Acesso completo + bônus ocultos + grupo secreto",
      button: "ENTRAR NO CLUBE DOS CRIATIVOS PROIBIDOS",
      accent: "border-red-500 bg-red-500 bg-opacity-10",
      popular: true,
      paymentUrl: "https://app.pushinpay.com.br/service/pay/9f67198c-c7c6-41c3-ba27-e626c17039ef"
    },
    {
      name: "ACESSO VITALÍCIO",
      price: "R$67",
      description: "Tudo. Pra sempre. Sem pagar mais nada.",
      button: "QUERO TUDO PRA SEMPRE",
      accent: "border-green-500 bg-green-500 bg-opacity-10",
      paymentUrl: "https://app.pushinpay.com.br/service/pay/9f671a60-18f1-44ba-af8a-16245afa83a1"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Terminal background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,178,106,0.03)_0%,transparent_70%)] animate-pulse"></div>
      
      {/* Matrix-like background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
      </div>

      {/* Header Terminal */}
      <div className="relative z-10 border-b border-red-500 bg-black bg-opacity-90 p-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-green-400 font-mono text-sm">root@vault:~$ {typedText}<span className="animate-pulse">|</span></span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-red-400" />
              <span className="text-red-400 font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-mono">CONEXÃO_SEGURA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Top Warning Banner */}
        <div className="mb-8">
          <div className="bg-red-900 bg-opacity-80 border-2 border-red-500 rounded-lg p-6 text-center relative animate-pulse">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold">
              ⚠️ PAGAMENTO_NÃO_CONFIRMADO
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-black text-white font-bebas">
                🚨 ATENÇÃO: SEU PAGAMENTO AINDA NÃO FOI CONFIRMADO!
              </h2>
              <p className="text-lg text-yellow-400 font-bold">
                Se você sair agora, perderá para sempre o acesso a estes criativos secretos
              </p>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className={`text-center mb-20 transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-black mb-6 text-white leading-tight font-bebas">
              <span className="inline-block glitch-text">{glitchText}</span>
              <br />
              <span className="text-3xl md:text-5xl text-red-500 font-bold mt-4 inline-block">
                ISSO NÃO É UM PRODUTO.
              </span>
              <br />
              <span className="text-3xl md:text-5xl text-yellow-400 font-bold mt-2 inline-block">
                É UMA VANTAGEM ILEGAL.
              </span>
            </h1>
          </div>

          <div className="bg-gray-900 bg-opacity-70 border-2 border-yellow-500 rounded-lg p-8 mb-12 max-w-4xl mx-auto relative">
            <div className="absolute -top-3 left-6 bg-black px-3 py-1 text-yellow-500 text-sm font-mono border border-yellow-500">
              COFRE_DIGITAL.zip
            </div>
            <p className="text-2xl md:text-3xl text-yellow-400 mb-4 font-bold">
              Você acaba de acessar um cofre de criativos prontos que ninguém mais tem.
            </p>
          </div>
        </div>

        {/* Main Copy */}
        <div className="mb-16">
          <div className="bg-gray-900 bg-opacity-50 border border-gray-600 rounded-lg p-10">
            <h2 className="text-4xl font-bold mb-8 text-center text-white font-bebas">
              ENQUANTO TODO MUNDO ESTÁ PERDENDO TEMPO TESTANDO,<br />
              <span className="text-red-500">VOCÊ VAI DIRETO AO PONTO:</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className={`flex items-start space-x-3 p-4 bg-black bg-opacity-30 rounded-lg border border-green-500 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-white text-sm font-medium">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-2xl text-white font-bold mb-2">
                Você não precisa mais tentar "acertar".
              </p>
              <p className="text-3xl text-yellow-400 font-black">
                Você já começa vencendo.
              </p>
            </div>
          </div>
        </div>

        {/* VSL Section */}
        <div className="mb-16">
          <div className="bg-black bg-opacity-80 border-2 border-red-500 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white font-bebas mb-4">
                🎥 ASSISTA ANTES DE DECIDIR
              </h2>
              <p className="text-xl text-yellow-400 font-bold mb-2">
                Veja como funciona na prática
              </p>
              <p className="text-red-400 font-bold text-lg">
                ⚠️ Este vídeo será removido em breve
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-yellow-500"
                  src="https://www.youtube.com/embed/iT5g58gSDFM"
                  title="VSL - Clube dos Criativos"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            <div className="text-center mt-8 bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-4">
              <p className="text-white font-bold text-lg">
                📺 Depois de assistir, você entenderá por que isso é uma vantagem injusta
              </p>
            </div>
          </div>
        </div>

        {/* Vault Contents */}
        <div className="mb-16">
          <div className="bg-black bg-opacity-60 border-2 border-red-500 rounded-lg p-8">
            <div className="flex items-center justify-center mb-8">
              <Folder className="w-8 h-8 text-red-500 mr-3" />
              <h2 className="text-4xl font-bold text-white font-bebas">
                ACESSO IMEDIATO A UMA PASTA COM MAIS DE:
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {vaultItems.map((item, index) => (
                <div 
                  key={index}
                  className="bg-gray-900 bg-opacity-50 border border-yellow-500 rounded-lg p-6 hover:bg-opacity-70 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="text-yellow-500">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-3xl font-black text-white">{item.count}</span>
                      <span className="text-lg text-yellow-400 ml-2 font-bold">{item.item}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-6">
              <p className="text-xl text-white font-bold mb-2">
                📌 Você vai parecer um gênio do tráfego.
              </p>
              <p className="text-lg text-red-400 font-bold">
                Mas só vai ter copiado o que já está pronto.
              </p>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-12 text-center text-white font-bebas">
            🗝️ OPÇÕES DE ACESSO:
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`${plan.accent} border-2 rounded-lg p-8 relative transition-all duration-300 hover:scale-105 ${
                  plan.popular ? 'transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    MAIS ESCOLHIDO
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4 text-white font-bebas">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-black text-yellow-400">{plan.price}</span>
                  </div>
                  <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                    {plan.description}
                  </p>
                  <button 
                    onClick={() => handlePaymentRedirect(plan.paymentUrl)}
                    className={`w-full py-4 px-6 rounded-lg font-bold text-sm transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  } hover:scale-105 hover:shadow-lg border-2 border-current`}
                  >
                    {plan.button}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Strategic "No Thanks" Button */}
          <div className="mt-12 text-center">
            <div className="mb-6 bg-red-900 bg-opacity-50 border border-red-500 rounded-lg p-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
                <h3 className="text-xl font-bold text-white">🚨 PAGAMENTO PENDENTE - ÚLTIMA CHANCE</h3>
              </div>
              <div className="space-y-3 text-white">
                <p className="font-bold text-lg text-red-400">⚠️ SEU PAGAMENTO AINDA NÃO FOI CONFIRMADO!</p>
                <p className="font-bold text-lg">🚨 Se você sair sem finalizar o pagamento:</p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="text-red-400">❌</span>
                    <span>Seu pagamento será CANCELADO automaticamente</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-red-400">❌</span>
                    <span>Perderá acesso PERMANENTE ao cofre</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-red-400">❌</span>
                    <span>NÃO receberá os criativos prontos</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-red-400">❌</span>
                    <span>Esta oferta NUNCA mais aparecerá</span>
                  </div>
                </div>
                <div className="bg-black bg-opacity-50 border border-red-500 rounded-lg p-3 mt-4">
                  <p className="text-yellow-400 font-bold text-lg">
                    ⏰ TEMPO RESTANTE PARA CONFIRMAR: {formatTime(timeLeft)}
                  </p>
                  <p className="text-white font-bold text-sm mt-2">
                    💳 Finalize seu pagamento AGORA ou perca para sempre!
                  </p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleExitRedirect}
              className="text-gray-500 hover:text-red-400 text-sm underline transition-colors duration-300 font-medium"
            >
              Não, obrigado. Quero CANCELAR meu pagamento e perder esta oportunidade única para sempre.
            </button>
            <div className="mt-3 text-xs text-gray-600">
              <p className="text-red-400 font-bold">⚠️ AVISO FINAL: Seu pagamento será CANCELADO e você NÃO receberá o produto.</p>
              <p className="text-red-400 font-bold mt-1">🚫 Esta oferta NUNCA mais aparecerá - É SUA ÚLTIMA CHANCE!</p>
            </div>
          </div>
        </div>

        {/* Final Warning */}
        <div className="bg-black bg-opacity-80 border-2 border-red-500 rounded-lg p-10 text-center relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            ALERTA_FINAL
          </div>
          
          <div className="space-y-4 text-xl text-white font-bold mb-6">
            <p>⚠️ SEU PAGAMENTO AINDA ESTÁ PENDENTE!</p>
            <p className="text-red-400">Se sair agora, será CANCELADO automaticamente.</p>
            <p>Finalize AGORA e garante sua vantagem secreta</p>
            <p className="text-yellow-400">antes que seus concorrentes descubram.</p>
          </div>
          
          <div className="flex items-center justify-center space-x-3 text-2xl font-black text-yellow-400">
            <Key className="w-8 h-8" />
            <span>Confirme seu pagamento AGORA!</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glitch-text {
          animation: glitch 0.5s ease-in-out infinite;
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(1px, -1px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
}

export default App;