function downloadZip() {
    const link = document.createElement('a');
    link.href = 'https://github.com/Sjoerd4435/Finnify/archive/refs/heads/main/Finnify'; // Link to the main.zip file
    link.download = 'Finnify.zip'; // Desired download name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
