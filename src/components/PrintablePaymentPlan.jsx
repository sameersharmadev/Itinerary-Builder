import React from 'react';

const PrintablePaymentPlan = ({ paymentPlan }) => {
  if (!paymentPlan || paymentPlan.length === 0) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getRowHeight = (payment) => {
    const installmentLines = payment.installment.split('\n').length;
    const amountLines = payment.amount.split('\n').length;
    const dueDateLines = (payment.dueDate || 'TBD').split('\n').length;
    const maxLines = Math.max(installmentLines, amountLines, dueDateLines);
    return Math.max(60, 32 + (maxLines * 20)); 
  };

  const isLastRow = (index) => index === paymentPlan.length - 1;

  return (
    <div className="w-full mb-8 print:break-inside-avoid">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>
        Payment <span style={{ color: '#9333EA' }}>Plan</span>
      </h2>

      {/* Total Amount Section */}
      <div className="mb-4 flex items-center" style={{ border: '1px solid #541C9C', borderRadius: '8px' }}>
        {/* Total Amount Label - Arrow Shape */}
        <div
          className="relative px-6 py-3 text-center font-semibold text-sm flex items-center justify-center"
          style={{
            background: '#F9EEFF',
            color: '#541C9C',
            minWidth: '180px',
            height: '48px',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
          }}
        >
          Total Amount
          {/* Arrow pointing right */}
          <div
            className="absolute right-0 top-0 h-full w-4"
            style={{
              background: '#F9EEFF',
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
              transform: 'translateX(100%)',
              zIndex: 2
            }}
          />
        </div>

        {/* Total Amount Value */}
        <div
          className="flex-1 px-6 py-3 flex items-center relative"
          style={{
            backgroundColor: '#FFFFFF',
            height: '48px',
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px'
          }}
        >
          <div className="flex items-center gap-1">
            <span className="font-bold text-black text-base">₹ 9,00,000</span>
            <span className="text-black text-base ml-2">For 3 Pax (Inclusive Of GST)</span>
          </div>
        </div>
      </div>

      {/* TCS Section */}
      <div className="mb-6 flex items-center" style={{ border: '1px solid #541C9C', borderRadius: '8px' }}>
        {/* TCS Label - Arrow Shape */}
        <div
          className="relative px-6 py-3 text-center font-semibold text-sm flex items-center justify-center"
          style={{
            background: '#F9EEFF',
            color: '#541C9C',
            minWidth: '180px',
            height: '48px',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
          }}
        >
          TCS
          {/* Arrow pointing right */}
          <div
            className="absolute right-0 top-0 h-full w-4"
            style={{
              background: '#F9EEFF',
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
              transform: 'translateX(100%)',
              zIndex: 2
            }}
          />
        </div>

        {/* TCS Value */}
        <div
          className="flex-1 px-6 py-3 flex items-center relative"
          style={{
            backgroundColor: '#FFFFFF',
            height: '48px',
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px'
          }}
        >
          <div className="flex items-center gap-1">
            <span className="font-bold text-black text-base">Not Collected</span>
          </div>
        </div>
      </div>

      {/* Payment Table with Separate Columns */}
      <div className="mb-6 flex gap-2">
        {/* Installment Column */}
        <div className="flex-1">
          <div 
            className="px-4 py-3 text-center font-medium text-white text-sm"
            style={{ 
              background: '#321E5D',
              borderRadius: '16px 16px 0 0'
            }}
          >
            Installment
          </div>
          <div>
            {paymentPlan.map((payment, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(payment)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {payment.installment}
              </div>
            ))}
          </div>
        </div>

        {/* Amount Column */}
        <div className="flex-1">
          <div 
            className="px-4 py-3 text-center font-medium text-white text-sm"
            style={{ 
              background: '#321E5D',
              borderRadius: '16px 16px 0 0'
            }}
          >
            Amount
          </div>
          <div>
            {paymentPlan.map((payment, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(payment)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {payment.amount}
              </div>
            ))}
          </div>
        </div>

        {/* Due Date Column */}
        <div className="flex-1">
          <div 
            className="px-4 py-3 text-center font-medium text-white text-sm"
            style={{ 
              background: '#321E5D',
              borderRadius: '16px 16px 0 0'
            }}
          >
            Due Date
          </div>
          <div>
            {paymentPlan.map((payment, index) => (
              <div 
                key={index}
                className="px-4 py-4 text-center text-sm text-black flex items-center justify-center"
                style={{ 
                  background: '#F3E5FF',
                  height: `${getRowHeight(payment)}px`,
                  borderRadius: isLastRow(index) ? '0 0 16px 16px' : '0'
                }}
              >
                {payment.dueDate || 'TBD'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="border-t border-gray-300" />
    </div>
  );
};

export default PrintablePaymentPlan;