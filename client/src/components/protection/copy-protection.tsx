import { useEffect } from 'react';

export function CopyProtection() {
  useEffect(() => {
    // Desabilitar clique direito
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Desabilitar seleção de texto
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Desabilitar teclas de desenvolvedor
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
          (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        return false;
      }
    };

    // Desabilitar arrastar imagens
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Aplicar proteções
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    // CSS de proteção mais suave
    const style = document.createElement('style');
    style.id = 'copy-protection-styles';
    style.textContent = `
      /* Protect images only - allow text selection for UX */
      img {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
        pointer-events: none;
      }
      
      /* Prevent text selection on sensitive content only */
      .no-select {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      
      // Safe removal of style element
      const existingStyle = document.getElementById('copy-protection-styles');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  return null;
}