import React, { useState, useEffect } from 'react';
import { Stylist, ServiceTier, TimeSlot } from '../types';
import { SERVICE_TIERS, MOCK_TIME_SLOTS } from '../constants';
import { Button } from '../components/Button';
import { X, ChevronLeft, CheckCircle, CreditCard, Smartphone, QrCode, AlertCircle, Copy, Loader2, Image as ImageIcon } from 'lucide-react';

interface BookingFlowProps {
  stylist: Stylist;
  onClose: () => void;
  onSuccess: () => void;
}

type Step = 'service' | 'datetime' | 'details' | 'payment' | 'success';

export const BookingFlow: React.FC<BookingFlowProps> = ({ stylist, onClose, onSuccess }) => {
  const [step, setStep] = useState<Step>('service');
  const [selectedService, setSelectedService] = useState<ServiceTier | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  
  // Payment States
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [upiState, setUpiState] = useState<'idle' | 'launching' | 'pending' | 'success' | 'failed'>('idle');
  const [showQrFallback, setShowQrFallback] = useState(false);

  // Helper for mock dates
  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  const handleNext = () => {
    if (step === 'service' && selectedService) setStep('datetime');
    else if (step === 'datetime' && selectedDate !== null && selectedSlot) setStep('details');
    else if (step === 'details') setStep('payment');
  };

  // UPI Logic
  const initiateUpiPayment = () => {
    setUpiState('launching');
    
    // Simulate App Launch Delay
    setTimeout(() => {
      setUpiState('pending');
      
      // Attempting deep link (Mock)
      // window.location.href = "upi://pay?..." 
      
      // Simulate polling for payment confirmation
      setTimeout(() => {
        setUpiState('success');
        setTimeout(() => {
            setStep('success');
        }, 1000);
      }, 4000); // 4 seconds payment process
    }, 1500);
  };

  useEffect(() => {
    if (step === 'success') {
        const timer = setTimeout(onSuccess, 3000);
        return () => clearTimeout(timer);
    }
  }, [step, onSuccess]);


  const renderServiceStep = () => (
    <div className="space-y-4 animate-fadeIn">
      <h3 className="text-xl font-serif text-primary">Select Consultation Type</h3>
      <div className="space-y-3">
        {SERVICE_TIERS.map((tier) => (
          <div 
            key={tier.id}
            onClick={() => setSelectedService(tier)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedService?.id === tier.id 
                ? 'border-royal bg-royal/5' 
                : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-primary">{tier.name}</span>
              <span className="text-royal font-bold">₹{tier.price}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-secondary">
              <span>{tier.durationMinutes} mins</span>
              {selectedService?.id === tier.id && <CheckCircle className="w-5 h-5 text-royal" />}
            </div>
            <p className="text-xs text-muted mt-2">{tier.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDateTimeStep = () => (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-xl font-serif text-primary">Choose Date & Time</h3>
      
      {/* Date Scroller */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {dates.map((date, idx) => {
          const isSelected = selectedDate === idx;
          return (
            <div
              key={idx}
              onClick={() => { setSelectedDate(idx); setSelectedSlot(null); }}
              className={`flex-shrink-0 w-16 h-20 rounded-xl flex flex-col items-center justify-center cursor-pointer border transition-all ${
                isSelected ? 'bg-royal text-white border-royal shadow-md' : 'bg-surface text-secondary border-transparent'
              }`}
            >
              <span className="text-xs font-medium uppercase">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
              <span className="text-xl font-bold font-serif">{date.getDate()}</span>
            </div>
          );
        })}
      </div>

      {/* Slots Grid */}
      <div>
        <h4 className="text-sm font-medium text-secondary mb-3">Available Slots</h4>
        <div className="grid grid-cols-3 gap-3">
          {MOCK_TIME_SLOTS.map((slot) => (
            <button
              key={slot.id}
              disabled={!slot.available}
              onClick={() => setSelectedSlot(slot)}
              className={`py-2 px-1 rounded-lg text-sm transition-all border ${
                !slot.available 
                  ? 'bg-gray-50 text-gray-300 border-transparent cursor-not-allowed'
                  : selectedSlot?.id === slot.id
                    ? 'bg-gold text-white border-gold shadow-sm'
                    : 'bg-white text-primary border-gray-200 hover:border-royal'
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-xl font-serif text-primary">Session Details</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Focus Area</label>
          <select className="w-full p-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-royal/20 outline-none">
            <option>Wardrobe Audit</option>
            <option>Event Styling</option>
            <option>Seasonal Update</option>
            <option>General Advice</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Notes for {stylist.name}</label>
          <textarea 
            className="w-full p-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-royal/20 outline-none h-24 resize-none"
            placeholder="I'm looking for a dress for a summer wedding..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Photos (Optional)</label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-muted cursor-pointer hover:bg-surface transition-colors">
            <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-xs">Tap to upload reference images</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-xl font-serif text-primary">Confirm & Pay</h3>
      
      {/* Order Summary */}
      <div className="bg-surface rounded-xl p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-secondary">Service</span>
          <span className="font-medium">{selectedService?.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-secondary">Date</span>
          <span className="font-medium">{dates[selectedDate || 0].toLocaleDateString()} • {selectedSlot?.time}</span>
        </div>
        <div className="h-px bg-gray-200 my-2"></div>
        <div className="flex justify-between text-base font-bold text-primary">
          <span>Total</span>
          <span>₹{selectedService?.price}</span>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-secondary">Payment Method</label>
        
        {/* UPI Option */}
        <div 
            onClick={() => setPaymentMethod('upi')}
            className={`border rounded-lg p-4 flex items-center gap-3 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-royal bg-royal/5 ring-1 ring-royal' : 'border-gray-200'}`}
        >
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'upi' ? 'border-royal' : 'border-gray-300'}`}>
            {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-royal"></div>}
          </div>
          <div className="flex-1">
             <div className="flex items-center gap-2">
                <span className="font-medium">UPI</span>
                <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-medium">FAST</span>
             </div>
             <p className="text-xs text-secondary mt-0.5">GooglePay, PhonePe, Paytm</p>
          </div>
          <Smartphone className="w-5 h-5 text-royal" />
        </div>

        {/* Card Option (Disabled for Mock) */}
        <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-3 opacity-60 cursor-not-allowed">
          <div className="w-5 h-5 rounded-full border border-gray-300"></div>
          <span className="font-medium">Credit / Debit Card</span>
          <CreditCard className="ml-auto w-5 h-5 text-secondary" />
        </div>
      </div>

      {/* UPI Actions */}
      {paymentMethod === 'upi' && (
        <div className="pt-2">
            {upiState === 'idle' && (
                <Button fullWidth size="lg" onClick={initiateUpiPayment}>
                    Pay ₹{selectedService?.price} with UPI
                </Button>
            )}

            {upiState === 'launching' && (
                 <div className="bg-gray-900 text-white rounded-xl p-4 flex items-center justify-center gap-3 animate-pulse">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Opening UPI App...</span>
                 </div>
            )}

            {upiState === 'pending' && !showQrFallback && (
                <div className="text-center space-y-4 animate-fadeIn">
                     <div className="bg-yellow-50 text-yellow-800 p-3 rounded-lg text-sm flex items-center justify-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Complete payment in your UPI app
                     </div>
                     <div className="flex flex-col items-center gap-2">
                         <div className="w-12 h-12 rounded-full border-4 border-gray-100 border-t-royal animate-spin"></div>
                         <p className="text-sm font-medium text-secondary">Waiting for confirmation...</p>
                     </div>
                     <button 
                        onClick={() => setShowQrFallback(true)}
                        className="text-sm text-royal font-medium hover:underline flex items-center justify-center gap-1 w-full"
                     >
                        <QrCode className="w-4 h-4" />
                        Show QR Code instead
                     </button>
                </div>
            )}

            {/* QR Fallback */}
            {(showQrFallback && upiState === 'pending') && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center animate-fadeIn">
                     <p className="text-sm text-secondary mb-4">Scan to pay ₹{selectedService?.price}</p>
                     <div className="w-48 h-48 bg-gray-100 mx-auto rounded-lg mb-4 flex items-center justify-center relative overflow-hidden group">
                        <QrCode className="w-32 h-32 text-primary opacity-20" />
                        <div className="absolute inset-0 border-2 border-royal/50 rounded-lg animate-[pulse_2s_infinite]"></div>
                        <span className="absolute text-xs font-bold text-primary bg-white/80 px-2 py-1 rounded">MOCK QR</span>
                     </div>
                     <div className="flex items-center justify-center gap-2 bg-gray-50 p-2 rounded-lg mb-2">
                        <span className="text-xs font-mono text-secondary">fashioncoach@upi</span>
                        <Copy className="w-3 h-3 text-muted cursor-pointer" />
                     </div>
                     <p className="text-xs text-muted">Checking payment status...</p>
                </div>
            )}

            {upiState === 'success' && (
                 <div className="bg-green-50 text-green-800 p-4 rounded-xl flex items-center justify-center gap-2 font-medium">
                    <CheckCircle className="w-5 h-5" />
                    Payment Received!
                 </div>
            )}
        </div>
      )}
    </div>
  );

  const renderSuccessStep = () => (
    <div className="flex flex-col items-center justify-center py-12 animate-scaleIn text-center h-full">
      <div className="w-24 h-24 relative mb-6">
         <div className="absolute inset-0 bg-gold/20 rounded-full animate-ping"></div>
         <div className="relative w-full h-full bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-gold/30">
            <CheckCircle className="w-12 h-12 text-white" />
         </div>
      </div>
      <h3 className="text-3xl font-serif font-bold text-primary mb-2">Booking Confirmed</h3>
      <p className="text-secondary mb-8 max-w-xs mx-auto">You're all set for your session with {stylist.name}.</p>
      <div className="bg-surface p-4 rounded-xl w-full max-w-xs mb-6">
        <p className="text-xs text-muted uppercase tracking-wider mb-1">Session Time</p>
        <p className="text-lg font-medium text-primary">{dates[selectedDate || 0].toLocaleDateString()} • {selectedSlot?.time}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-primary/40 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-md h-[95vh] sm:h-auto sm:max-h-[85vh] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0 z-10">
          {step !== 'service' && step !== 'success' ? (
             <button onClick={() => {
                if(step === 'payment') setStep('details');
                else if(step === 'details') setStep('datetime');
                else if(step === 'datetime') setStep('service');
             }} className="p-2 hover:bg-surface rounded-full">
               <ChevronLeft className="w-5 h-5 text-primary" />
             </button>
          ) : <div className="w-9" />}
          
          <span className="font-serif font-medium text-lg">
            {step === 'success' ? ' ' : 'Book Session'}
          </span>
          
          <button onClick={onClose} className="p-2 hover:bg-surface rounded-full">
            <X className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {step === 'service' && renderServiceStep()}
          {step === 'datetime' && renderDateTimeStep()}
          {step === 'details' && renderDetailsStep()}
          {step === 'payment' && renderPaymentStep()}
          {step === 'success' && renderSuccessStep()}
        </div>

        {/* Footer Actions */}
        {step !== 'success' && step !== 'payment' && (
          <div className="p-4 border-t border-gray-100 bg-white shrink-0">
            <Button 
              fullWidth 
              size="lg"
              onClick={handleNext}
              disabled={
                (step === 'service' && !selectedService) ||
                (step === 'datetime' && (!selectedSlot || selectedDate === null))
              }
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};