const fs = require('fs');
const { exec } = require('child_process');

// Generate a typing sound using sox
const command = `sox -n /Users/superuser/Documents/GitHub/uglyduck/profile/profile/public/sounds/typing-sound.mp3 synth 0.05 sine 800 fade 0 0.05 0.02 vol 0.3`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error}`);
        return;
    }
    console.log('Typing sound generated successfully!');
});
