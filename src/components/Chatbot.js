import React, { useState } from 'react';
import axios from 'axios';
import Chatbots from '../assets/Chatbot.png';
import Chatbotz from '../assets/Chatbots.png';

// CSS in JS style
const chatbotIconStyle = {
  position: 'fixed',
  bottom: '0px',
  right: '20px',
  borderRadius: '50%',
  padding: '15px',
  cursor: 'pointer',
  zIndex: 1000,
};

const chatbotImgStyle = {
  width: '150px', // Default
  height: 'auto',
  right: '20px',
  bottom: 0,
  '@media (max-width: 768px)': {
    width: '100px', // Ukuran lebih kecil untuk layar mobile
    right: '10px',
  },
  '@media (max-width: 480px)': {
    width: '80px', // Ukuran paling kecil untuk layar yang sangat kecil
    right: '10px',
  },
};

const modalStyle = {
  position: 'fixed',
  bottom: '0',
  right: '0',
  backgroundColor: 'white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px 8px 0 0',
  width: '90%', 
  maxWidth: '400px', 
  height: '70%', 
  maxHeight: '90%', 
  zIndex: 1001,
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 768px)': {
    width: '90%',
    maxWidth: '400px',
    height: '70%',
    maxHeight: '90%',
  },
};


const headerStyle = {
  backgroundColor: '#17179D',
  color: 'white',
  padding: '10px',
  fontSize: 'clamp(14px, 2vw, 18px)', // Skalakan ukuran font
  textAlign: 'center',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    fontSize: '14px',
  },
};


const chatContainerStyle = {
  flex: 1,
  padding: '10px',
  overflowY: 'scroll',
  backgroundColor: '#fff',
};

const inputContainerStyle = {
  display: 'flex',
  padding: '10px',
  backgroundColor: '#fff',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
};

const inputStyle = {
  flex: 1,
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  backgroundColor: '#17179D',
  color: 'white',
  border: 'none',
  padding: '10px',
  borderRadius: '4px',
  marginLeft: '10px',
  cursor: 'pointer',
};

const closeButtonStyle = {
  backgroundColor: 'transparent',
  color: 'white',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
};

const recommendationStyle = {
  backgroundColor: '#d0e1ff',
  color: '#17179D',
  padding: '8px',
  borderRadius: '4px',
  margin: '5px 0',
  cursor: 'pointer',
  textAlign: 'center',
};


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hallo! Aku Aquabot, ada yang bisa saya bantu?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(true);

  const recommendations = [
    'Apa itu BBI Mijen?',
    'Apa jenis ikan yang tersedia?',
    'Berapa stok Benih Nila 5 cm?',
  ];

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (messageText) => {
    if (messageText.trim() !== '') {
      // Tambahkan pesan pengguna ke daftar
      setMessages([...messages, { from: 'user', text: messageText }]);
      setUserInput('');
      setShowRecommendations(false);
  
      try {
        // Kirim pesan ke backend API
        const response = await axios.post('https://939e-34-75-46-222.ngrok-free.app/api/chatbot', {
          question: messageText,
        });
  
        // Tambahkan respons dari API ke daftar pesan
        const botResponse = capitalizeFirstLetter(response.data.response || 'Maaf, terjadi kesalahan.');
        setMessages((prevMessages) => [
          ...prevMessages,
          { from: 'bot', text: botResponse },
        ]);
      } catch (error) {
        // Tangani error
        setMessages((prevMessages) => [
          ...prevMessages,
          { from: 'bot', text: 'Maaf, tidak dapat terhubung ke server.' },
        ]);
        console.error('Error fetching bot response:', error);
      }
    }
  };

  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  

  const handleRecommendationClick = (recommendation) => {
    handleSendMessage(recommendation);
    setShowRecommendations(false); // Hide recommendations after a click
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(userInput);
    }
  };

  return (
    <div>
      {/* Chatbot Icon */}
      <div style={chatbotIconStyle} onClick={handleClick}>
        <img src={Chatbots} alt="Chatbot" style={chatbotImgStyle} />
      </div>

      {/* Chatbot Modal */}
      {isOpen && (
        <div style={modalStyle}>
          <div style={headerStyle}>
            <img src={Chatbotz} alt="Bot Icon" style={{ width: '30px', height: '30px', marginRight: '2px' }} />
            <h3 style={{ margin: 0 }}>Aqua Bot</h3>
            <button style={closeButtonStyle} onClick={handleClose}>
              X
            </button>
          </div>

          <div style={chatContainerStyle}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.from === 'bot' ? 'left' : 'right' }}>
                <p style={{
                  backgroundColor: msg.from === 'bot' ? '#f0f0f0' : '#30CAF2',
                  color: msg.from === 'bot' ? 'black' : 'white',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  display: 'inline-block'
                }}>
                  {msg.text}
                </p>
              </div>
            ))}
            {/* Show Recommendations initially */}
            {showRecommendations && (
              <div>
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    style={recommendationStyle}
                    onClick={() => handleRecommendationClick(rec)}
                  >
                    {rec}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={inputContainerStyle}>
            <input
              type="text"
              style={inputStyle}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ketik pesan"
            />
            <button style={buttonStyle} onClick={() => handleSendMessage(userInput)}>
              Kirim
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
