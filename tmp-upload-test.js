const fs = require('fs');
(async () => {
  try {
    const url = 'https://print-ecom-server.onrender.com/api/upload/products-multiple';
    const formData = new FormData();
    formData.set('images', new Blob(['test']), 'test.png');
    const res = await fetch(url, { method: 'POST', body: formData });
    console.log('status', res.status);
    console.log(await res.text());
  } catch (err) {
    console.error('ERROR', err);
    process.exit(1);
  }
})();