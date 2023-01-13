export async function sendData(data) {
  try {
    await fetch('https://back-end', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch(err) {
    alert(err.message);
  }
}
