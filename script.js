const WEBHOOK_BASE =
  'https://joaopsantos.app.n8n.cloud/webhook/9d041c6a-5ea6-4998-b140-8b0d1c2e5b86';

document
  .getElementById('empresaForm')
  .addEventListener('submit', async function (e) {
    e.preventDefault();

    const empresaInput = document.getElementById('empresa');
    const statusEl = document.getElementById('status');

    const empresa = empresaInput.value.trim();
    if (!empresa) return;

    statusEl.textContent = '⌛  Enviando…';
    statusEl.className = 'status';

    try {
      const url = `${WEBHOOK_BASE}?empresa=${encodeURIComponent(empresa)}`;

      const res = await fetch(url);
      if (res.ok) {
        statusEl.textContent =
          '✅  Empresa enviada! Aguarde alguns segundos e confira seu Google Docs.';
        statusEl.classList.add('ok');
        empresaInput.value = '';
      } else {
        throw new Error('Resposta não OK do servidor');
      }
    } catch (err) {
      statusEl.textContent = '❌  Erro ao enviar: ' + err.message;
      statusEl.classList.add('err');
    }
  });
