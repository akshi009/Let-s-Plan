import { Github, Linkedin, Mail, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function Footer() {
  const [popup, setPopup] = useState(false);
  const [popupAnimateIn, setPopupAnimateIn] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  const [hoverFooter, setHoverFooter] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(true);

  // Set up pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseEffect(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // For popup animation
  useEffect(() => {
    if (popup) {
      setTimeout(() => {
        setPopupAnimateIn(true);
      }, 100);
    } else {
      setPopupAnimateIn(false);
    }
  }, [popup]);

  const handleIconHover = (icon) => {
    setActiveIcon(icon);
  };
  
  const handleClose = () => {
    setPopupAnimateIn(false);
    setTimeout(() => {
      setPopup(false);
    }, 500);
  };

  return (
    <div>
      <div 
        className="bg-gray-900 fixed bottom-0 w-full transition-all duration-500 py-3"
        style={{ 
          height: hoverFooter ? '60px' : '40px',
        }}
        onMouseEnter={() => setHoverFooter(true)}
        onMouseLeave={() => setHoverFooter(false)}
      >
        <div className="flex items-center justify-center space-x-2">
          <div className="text-white text-center transition-all duration-500"
            style={{ opacity: pulseEffect ? 0.8 : 1 }}>
            Created by 
          </div>
          <div 
            onClick={() => setPopup(true)}
            className={`cursor-pointer text-blue-400 font-semibold relative transition-transform duration-300 ${hoverFooter ? 'transform scale-110' : ''}`}
          >
            <span className="relative z-10">@Akshi Jain</span>
            <span className={`absolute left-0 bottom-0 h-1 bg-blue-500 transition-all duration-300 ${hoverFooter ? 'w-full' : 'w-0'}`}></span>
          </div>
          
          <div className={`flex space-x-3 text-white transition-all duration-500 overflow-hidden ${hoverFooter ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0'}`}>
            <a href="https://github.com/akshijain" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/akshijain" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="mailto:akshijain@example.com" className="hover:text-blue-400 transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      {popup && (
        <div className="fixed inset-0 flex  items-center justify-center bg-black/20 bg-opacity-70 transition-opacity duration-500 z-50" style={{ opacity: popupAnimateIn ? 1 : 0 }}>
          <div 
            className="bg-black border border-blue-500 text-white m-6 p-6 rounded-xl shadow-2xl w-96 transition-all duration-500"
            style={{ 
              transform: popupAnimateIn ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-10deg)',
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-400">Get In Touch!</h2>
              <button 
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-blue-900 hover:bg-opacity-30 transition-colors duration-300"
              >
                <X size={24} className="text-blue-400" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div 
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${activeIcon === 'email' ? 'bg-blue-900 bg-opacity-30 transform scale-105' : 'hover:bg-blue-900 hover:bg-opacity-20'}`}
                onMouseEnter={() => handleIconHover('email')}
                onMouseLeave={() => handleIconHover(null)}
              >
                <Mail size={28} className="mr-4 text-blue-400 animate-pulse" />
                <div>
                  <div className="font-semibold text-white">Email</div>
                  <a href="mailto:akshi20jain03@gmail.com" className="text-blue-300 hover:text-blue-400 transition-colors">
                    akshi20jain03@gmail.com
                  </a>
                </div>
              </div>
              
              <div 
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${activeIcon === 'linkedin' ? 'bg-blue-900 bg-opacity-30 transform scale-105' : 'hover:bg-blue-900 hover:bg-opacity-20'}`}
                onMouseEnter={() => handleIconHover('linkedin')}
                onMouseLeave={() => handleIconHover(null)}
              >
                <Linkedin size={28} className="mr-4 text-blue-400" />
                <div>
                  <div className="font-semibold text-white">LinkedIn</div>
                  <a 
                    href="https://www.linkedin.com/in/akshi-jain-270631202/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-300 hover:text-blue-400 transition-colors"
                  >
                    https://www.linkedin.com/in/akshi-jain-270631202/
                  </a>
                </div>
              </div>
              
              <div 
                className={`flex items-center p-4 rounded-lg transition-all duration-300 ${activeIcon === 'github' ? 'bg-blue-900 bg-opacity-30 transform scale-105' : 'hover:bg-blue-900 hover:bg-opacity-20'}`}
                onMouseEnter={() => handleIconHover('github')}
                onMouseLeave={() => handleIconHover(null)}
              >
                <Github size={28} className="mr-4 text-blue-400" />
                <div>
                  <div className="font-semibold text-white">GitHub</div>
                  <a 
                    href="https://github.com/akshi009/Let-s-Plan" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-300 hover:text-blue-400 transition-colors"
                  >
                    https://github.com/akshi009/Let-s-Plan
                  </a>
                </div>
              </div>
            </div>
            
            <button 
              className="mt-6 w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Footer;