const form = document.querySelector('#lead-form');
const status = document.querySelector('#form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const payload = Object.fromEntries([...data.entries()].filter(([key]) => key !== 'activity'));
  payload.activity = data.getAll('activity');
  payload.source = new URLSearchParams(location.search).get('utm_source') || 'direct';
  payload.campaign = new URLSearchParams(location.search).get('utm_campaign') || 'website';
  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Tax year(s): ${payload.years}`,
    `Transactions: ${payload.transactions}`,
    `Activity: ${payload.activity.join(', ') || 'Not specified'}`,
    `Main issue: ${payload.issue}`,
    `Source: ${payload.source}`,
    `Campaign: ${payload.campaign}`
  ];
  status.textContent = 'Opening a prefilled email. Do not attach tax documents or sensitive credentials.';
  window.location.href = `mailto:clankersonc+basisproof@gmail.com?subject=${encodeURIComponent('BasisProof fit-check request')}&body=${encodeURIComponent(lines.join('\n'))}`;
});
