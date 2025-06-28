import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
  const whatsappNumber = "5513996116102";
  const message = "Oi! Tenho interesse no método Sono Zen e gostaria de tirar algumas dúvidas.";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      title="Fale conosco no WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6" />
    </button>
  );
}