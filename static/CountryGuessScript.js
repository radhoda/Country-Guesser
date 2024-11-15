async function submitGuess(event) {
    event.preventDefault();

    const countryInput = document.getElementById('country')
    const country = countryInput.value;

    const response = await fetch('/api/guess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ country })
    });

    const data = await response.json();

    document.getElementById('result').textContent = data.message;

    countryInput.value = '';

}
