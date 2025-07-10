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
  
  // Enhanced User Data for better tracking
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  
  // Geolocation data
  country?: string;
  state?: string;
  city?: string;
  zip_code?: string;
  
  // Additional tracking parameters
  order_id?: string;
  event_id?: string;
  subscription_id?: string;
  lead_id?: string;
  
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
      // Silent error - localStorage may not be available
      console.warn('Failed to save conversion parameters to localStorage:', error);
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
      // Silent error - localStorage may not be available or data corrupted
      console.warn('Failed to load conversion parameters from localStorage:', error);
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
    if (typeof window === 'undefined') return;
    
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
    
    // Enviar evento para Facebook Pixel (se disponível)
    if ((window as any).fbq) {
      (window as any).fbq('track', eventType, eventData);
    }
    
    // Enviar também para Facebook Conversions API via backend
    this.sendToConversionsAPI(eventType, eventData);
  }

  // Enviar para Facebook Conversions API via backend
  private async sendToConversionsAPI(eventType: string, eventData: any) {
    try {
      const parameters = this.getParameters();
      
      // Preparar dados do usuário para a API de Conversões
      const userData: any = {
        client_ip_address: this.getClientIP(),
        client_user_agent: parameters.user_agent
      };
      
      // Adicionar external_id se disponível
      if (eventData.external_id) {
        userData.external_id = eventData.external_id;
      }
      
      // Adicionar email hash se disponível
      if (parameters.email) {
        userData.em = [await this.hashData(parameters.email.toLowerCase().trim())];
      }
      
      // Adicionar telefone hash se disponível  
      if (parameters.phone) {
        userData.ph = [await this.hashData(parameters.phone.replace(/\D/g, ''))];
      }
      
      // Adicionar nomes hash se disponíveis
      if (parameters.first_name) {
        userData.fn = [await this.hashData(parameters.first_name.toLowerCase().trim())];
      }
      if (parameters.last_name) {
        userData.ln = [await this.hashData(parameters.last_name.toLowerCase().trim())];
      }
      
      // Adicionar dados de geolocalização hash se disponíveis
      if (parameters.country) {
        userData.country = [await this.hashData(parameters.country.toLowerCase().trim())];
      }
      if (parameters.state) {
        userData.st = [await this.hashData(parameters.state.toLowerCase().trim())];
      }
      if (parameters.city) {
        userData.ct = [await this.hashData(parameters.city.toLowerCase().trim())];
      }
      if (parameters.zip_code) {
        userData.zp = [await this.hashData(parameters.zip_code.replace(/\D/g, ''))];
      }
      
      // Adicionar FBCLID se disponível
      if (parameters.fbclid) {
        userData.fbp = `fb.1.${Date.now()}.${parameters.fbclid}`;
      }
      
      // Adicionar parâmetros adicionais recomendados pelo Facebook
      // client_user_agent já está incluído acima
      
      // Adicionar fbc (Facebook click ID) se disponível
      if (parameters.fbclid) {
        userData.fbc = `fb.1.${Date.now()}.${parameters.fbclid}`;
      }
      
      // Adicionar subscription_id se disponível (para identificar assinaturas)
      if (eventData.subscription_id) {
        userData.subscription_id = eventData.subscription_id;
      }
      
      // Adicionar lead_id se disponível (para identificar leads)
      if (eventData.lead_id) {
        userData.lead_id = eventData.lead_id;
      }
      
      const payload = {
        eventName: eventType,
        eventTime: Date.now(),
        eventSourceUrl: parameters.page_url,
        userData,
        customData: {
          content_name: eventData.content_name,
          content_category: eventData.content_category,
          value: eventData.value,
          currency: eventData.currency,
          
          // Parâmetros UTM
          utm_source: parameters.utm_source,
          utm_medium: parameters.utm_medium,
          utm_campaign: parameters.utm_campaign,
          utm_term: parameters.utm_term,
          utm_content: parameters.utm_content,
          
          // Parâmetros adicionais recomendados
          order_id: eventData.order_id || this.generateExternalId(),
          event_id: eventData.event_id || `${eventType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          
          // Parâmetros de dados do app
          advertiser_tracking_enabled: true,
          application_tracking_enabled: true,
          
          // Parâmetros de origem do evento
          action_source: 'website',
          event_source_url: parameters.page_url,
          
          // Parâmetros adicionais de dados do cliente
          client_ip_address: this.getClientIP(),
          client_user_agent: parameters.user_agent,
          
          // Referrer
          referrer_url: parameters.referrer
        }
      };
      
      const response = await fetch('/api/facebook-conversion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        const result = await response.json();
        // Conversão enviada com sucesso
      } else {
        const error = await response.json();
        // Erro ao enviar conversão
      }
    } catch (error) {
      // Erro silencioso - não interrompe a experiência do usuário
    }
  }
  
  // Função para fazer hash dos dados do usuário (SHA-256)
  private async hashData(data: string): Promise<string> {
    if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
      // Fallback para ambientes sem crypto API
      return data;
    }
    
    try {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      return data; // Fallback
    }
  }

  // Método auxiliar para obter IP do cliente (aproximado)
  private getClientIP(): string {
    // Em produção, isso seria obtido do cabeçalho da requisição no backend
    // Para desenvolvimento, retornamos um IP fictício
    return '127.0.0.1';
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
    } catch (error) {
      // Erro silencioso
    }
  }
  
  // Capturar dados de usuário para melhor tracking
  captureUserData(userData: {
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
  }) {
    this.updateConversionData(userData);
  }

  // Método principal para tracking de conversão
  trackConversion(eventType: string, conversionData: Partial<ConversionParameters> = {}) {
    // Atualizar dados de conversão
    this.updateConversionData(conversionData);
    
    // Enviar para Facebook
    this.sendFacebookConversion(eventType, conversionData);
    
    // Enviar para UTMify
    this.sendUTMifyConversion(eventType, conversionData);
  }
}

// Instância global do tracker
export const conversionTracker = new ConversionTracker();

// Funções de tracking essenciais para o funil de conversão
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

export const trackPurchase = (purchaseData?: any) => {
  conversionTracker.trackConversion('Purchase', {
    content_name: 'Sono Zen - Método Completo',
    content_category: 'E-book',
    conversion_value: 27.90,
    currency: 'BRL',
    ...purchaseData
  });
};

// Capturar dados de usuário para melhor tracking
export const captureUserData = (userData: {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
}) => {
  conversionTracker.captureUserData(userData);
};

// Debug: mostrar parâmetros capturados
export const debugConversionParameters = () => {
  console.log('Current conversion parameters:', conversionTracker.getParameters());
};