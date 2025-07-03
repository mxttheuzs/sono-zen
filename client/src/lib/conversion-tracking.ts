// Utility for conversion tracking and parameter sharing
export interface ConversionParameters {
  // UTM Parameters
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  
  // Facebook Click ID
  fbclid?: string;
  
  // User Data
  user_agent?: string;
  referrer?: string;
  page_url?: string;
  timestamp?: string;
  
  // Conversion Data
  conversion_value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
}

class ConversionTracker {
  private parameters: ConversionParameters = {};
  
  constructor() {
    this.initializeParameters();
  }
  
  private initializeParameters() {
    if (typeof window === 'undefined') return;
    
    // Capturar parâmetros UTM da URL
    const urlParams = new URLSearchParams(window.location.search);
    
    this.parameters = {
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      utm_term: urlParams.get('utm_term') || undefined,
      utm_content: urlParams.get('utm_content') || undefined,
      fbclid: urlParams.get('fbclid') || undefined,
      
      // Dados do navegador
      user_agent: navigator.userAgent,
      referrer: document.referrer || undefined,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
    };
    
    // Salvar no localStorage para persistir durante a sessão
    this.saveToStorage();
  }
  
  private saveToStorage() {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('conversion_parameters', JSON.stringify(this.parameters));
    } catch (error) {
      console.warn('Erro ao salvar parâmetros de conversão:', error);
    }
  }
  
  private loadFromStorage() {
    if (typeof window === 'undefined') return;
    
    try {
      const saved = localStorage.getItem('conversion_parameters');
      if (saved) {
        this.parameters = { ...this.parameters, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.warn('Erro ao carregar parâmetros de conversão:', error);
    }
  }
  
  // Atualizar parâmetros de conversão
  updateConversionData(data: Partial<ConversionParameters>) {
    this.parameters = { ...this.parameters, ...data };
    this.saveToStorage();
  }
  
  // Obter todos os parâmetros
  getParameters(): ConversionParameters {
    this.loadFromStorage();
    return { ...this.parameters };
  }
  
  // Enviar dados para Facebook Conversions API
  sendFacebookConversion(eventType: string, conversionData: Partial<ConversionParameters> = {}) {
    if (typeof window === 'undefined' || !(window as any).fbq) return;
    
    const parameters = this.getParameters();
    const eventData = {
      content_name: conversionData.content_name || 'Sono Zen - Método Completo',
      content_category: conversionData.content_category || 'E-book',
      value: conversionData.conversion_value || 27.90,
      currency: conversionData.currency || 'BRL',
      
      // Parâmetros para API de Conversões
      external_id: this.generateExternalId(),
      ...parameters
    };
    
    // Enviar evento para Facebook Pixel
    (window as any).fbq('track', eventType, eventData, {
      test_event_code: 'TEST74923'
    });
    
    console.log('Facebook Conversion sent:', { eventType, eventData });
  }
  
  // Gerar ID externo único para o usuário
  private generateExternalId(): string {
    let externalId = localStorage.getItem('fb_external_id');
    if (!externalId) {
      externalId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('fb_external_id', externalId);
    }
    return externalId;
  }
  
  // Enviar dados para UTMify (se disponível)
  sendUTMifyConversion(eventType: string, data: any = {}) {
    if (typeof window === 'undefined' || !(window as any).utmify) return;
    
    try {
      (window as any).utmify.track(eventType, {
        ...this.getParameters(),
        ...data
      });
      console.log('UTMify conversion sent:', { eventType, data });
    } catch (error) {
      console.warn('Erro ao enviar para UTMify:', error);
    }
  }
  
  // Método principal para tracking de conversão
  trackConversion(eventType: string, conversionData: Partial<ConversionParameters> = {}) {
    // Atualizar dados de conversão
    this.updateConversionData(conversionData);
    
    // Enviar para Facebook
    this.sendFacebookConversion(eventType, conversionData);
    
    // Enviar para UTMify
    this.sendUTMifyConversion(eventType, conversionData);
    
    // Log para debug
    console.log('Conversion tracked:', {
      eventType,
      parameters: this.getParameters(),
      conversionData
    });
  }
}

// Instância global do tracker
export const conversionTracker = new ConversionTracker();

// Funções de conveniência
export const trackPageView = () => {
  conversionTracker.trackConversion('PageView');
};

export const trackViewContent = (contentName?: string) => {
  conversionTracker.trackConversion('ViewContent', {
    content_name: contentName || 'Sono Zen - Landing Page'
  });
};

export const trackInitiateCheckout = () => {
  conversionTracker.trackConversion('InitiateCheckout', {
    content_name: 'Sono Zen - Método Completo',
    content_category: 'E-book',
    conversion_value: 27.90,
    currency: 'BRL'
  });
};

export const trackAddPaymentInfo = () => {
  conversionTracker.trackConversion('AddPaymentInfo', {
    content_name: 'Sono Zen - Método Completo',
    content_category: 'E-book',
    conversion_value: 27.90,
    currency: 'BRL'
  });
};

export const trackPurchase = (purchaseData?: any) => {
  conversionTracker.trackConversion('Purchase', {
    content_name: 'Sono Zen - Método Completo',
    content_category: 'E-book',
    conversion_value: 27.90,
    currency: 'BRL',
    ...purchaseData
  });
};

// Debug: mostrar parâmetros capturados
export const debugConversionParameters = () => {
  console.log('Current conversion parameters:', conversionTracker.getParameters());
};