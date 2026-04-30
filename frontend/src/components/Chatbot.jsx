import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am the Hotel Phoenix assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const getBotResponse = (userInput) => {
    const text = userInput.toLowerCase();
    
    // Cancellations & Refunds
    if (text.includes("cancel") || text.includes("refund")) {
      return "To cancel your booking or request a refund, please navigate to the 'Bookings' page where you can manage your current reservations, or contact our support team.";
    }

    // Booking & Reservations
    if (text.includes("book") || text.includes("reserve")) {
      return "You can book a room by navigating to the 'Book Room' section or clicking the 'Book Now' button on our homepage!";
    }
    
    // Rooms, Prices & Rates
    if (text.includes("room") || text.includes("price") || text.includes("cost") || text.includes("rate") || text.includes("how much")) {
      return "Our rooms start at $150 per night for a Standard Room. We also offer Deluxe Rooms and Suites. Check out our 'Rooms' section for more details.";
    }
    
    // Contact Info
    if (text.includes("contact") || text.includes("phone") || text.includes("email") || text.includes("reach")) {
      return "You can reach us at contact@hotelphoenix.com or call us at +1 (555) 123-4567. Or visit the Contact page.";
    }
    
    // Greetings
    if (text.includes("hello") || text.includes("hi") || text.includes("hey") || text.includes("greetings")) {
      return "Hi there! How can I assist you with your stay at Hotel Phoenix?";
    }
    
    // Amenities
    if (text.includes("amenit") || text.includes("pool") || text.includes("wifi") || text.includes("gym") || text.includes("food") || text.includes("restaurant") || text.includes("breakfast") || text.includes("service")) {
      return "We offer free high-speed WiFi, a rooftop pool, a fully-equipped gym, complimentary breakfast, and 24/7 room service.";
    }
    
    // Location
    if (text.includes("location") || text.includes("where") || text.includes("address") || text.includes("map")) {
      return "We are centrally located in the heart of the city, perfectly situated for both business and leisure travelers. You can find our exact address on the Contact page.";
    }
    
    // Default Fallback
    return "I'm not quite sure how to answer that. Could you please rephrase or visit our contact page to speak with a human agent?";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate thinking delay
    setTimeout(() => {
      const botResponse = { text: getBotResponse(input), isBot: true };
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <button className="chatbot-toggle" onClick={toggleChat} aria-label="Open chat">
          💬
        </button>
      )}
      {isOpen && (
        <div className="chatbot-window phoenix-card">
          <div className="chatbot-header">
            <h3>Phoenix Assistant</h3>
            <button className="close-btn" onClick={toggleChat} aria-label="Close chat">×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input" onSubmit={handleSend}>
            <input 
              type="text" 
              className="phoenix-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button type="submit" className="btn-phoenix send-btn">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
