import React, { useEffect } from 'react';

// FullPageSpinner component
const FullPageSpinner: React.FC = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50 overflow-hidden animate-fade-up">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 w-16 h-16"></div>
    </div>
  );
};

export default FullPageSpinner;
