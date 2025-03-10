import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

function ApplicationConfirmModal({ isOpen, job, onClose, onSubmit }) {
  const [coverLetter, setCoverLetter] = useState('');
  const [expectedRate, setExpectedRate] = useState(job?.salary || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !job) return null;

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      if (onSubmit) {
        onSubmit({
          jobId: job.id,
          coverLetter,
          expectedRate
        });
      }
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Apply to: {job.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium">{job.company}</h3>
              <p className="text-sm text-gray-600 mt-1">{job.type}</p>
              <p className="text-sm mt-2">{job.description}</p>
              <p className="text-sm text-gray-700 mt-2">Offered: ${job.salary}/month</p>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Expected Rate ($/month)</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={expectedRate}
              onChange={(e) => setExpectedRate(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 h-40"
              placeholder="Introduce yourself and explain why you're a good fit for this role..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            ></textarea>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationConfirmModal;