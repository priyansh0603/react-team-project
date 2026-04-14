const USD_TO_INR = 83.25;

export const formatINR = (usdAmount) => {
  const inrValue = Number(usdAmount || 0) * USD_TO_INR;

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inrValue);
};
