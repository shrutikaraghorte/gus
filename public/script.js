document.getElementById('generate-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    // Get selected mood and user input prompt
    const mood = document.getElementById('mood').value;
    const userPrompt = document.getElementById('prompt').value;
  
    // Combine mood and user prompt
    const fullPrompt = ` MAKE A DISH :  ${userPrompt}`;
    const outputDiv = document.getElementById('output');
  
    try {
      const response = await fetch('/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: fullPrompt })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        outputDiv.textContent = result.text || 'No content generated.';
      } else {
        outputDiv.textContent = 'Error generating content.';
      }
    } catch (error) {
      console.error('Error:', error);
      outputDiv.textContent = 'Error generating content.';
    }
  });
  