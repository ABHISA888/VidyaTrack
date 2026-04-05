import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

const Toast = ({ message, show }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-navy text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in border-b-4 border-teal z-[9999]">
      <CheckCircle className="text-teal" size={20} />
      <span className="font-bold text-sm tracking-wide uppercase">{message}</span>
    </div>
  );
};

export default Toast;
