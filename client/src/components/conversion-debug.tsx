import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { conversionTracker, debugConversionParameters } from "@/lib/conversion-tracking";
import { Code, X } from "lucide-react";

export function ConversionDebug() {
  const [isVisible, setIsVisible] = useState(false);
  const [parameters, setParameters] = useState<any>({});
  
  useEffect(() => {
    setParameters(conversionTracker.getParameters());
  }, []);
  
  // Só renderizar em desenvolvimento ou quando explicitamente habilitado
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  
  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
        >
          <Code className="h-4 w-4 mr-2" />
          Debug UTM
        </Button>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-4 left-4 z-50 w-80 bg-black/90 border border-blue-500/50 text-white backdrop-blur-sm rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-blue-400">Parâmetros Capturados</h3>
        <Button
          onClick={() => setIsVisible(false)}
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="max-h-48 overflow-y-auto mb-3">
        <div className="space-y-1 text-xs">
          {Object.entries(parameters).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-blue-300 font-mono">{key}:</span>
              <span className="text-gray-300 ml-2 truncate max-w-32" title={String(value)}>
                {String(value) || 'null'}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <Button
        onClick={debugConversionParameters}
        size="sm"
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-xs"
      >
        <Code className="h-3 w-3 mr-1" />
        Ver no Console
      </Button>
    </div>
  );
}