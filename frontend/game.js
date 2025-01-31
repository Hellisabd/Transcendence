console.log("game.js chargé");

function initializeGame() {
	console.log("Canvas trouvé :", canvas);
    console.log("Initialisation du jeu...");
    const canvas = document.getElementById("pongCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        const paddleWidth = 10;
        const paddleHeight = 100;
        const ballRadius = 10;

        // Paddle positions
        let player1Y = canvas.height / 2 - paddleHeight / 2;
        let player2Y = canvas.height / 2 - paddleHeight / 2;

        // Ball position and speed
        let ballX = canvas.width / 2;
        let ballY = canvas.height / 2;
        let ballSpeedX = 4;
        let ballSpeedY = 4;

        const playerSpeed = 8;
        let keysPressed = {};

        // Scores
        let player1Score = 0;
        let player2Score = 0;

        function drawBackground() {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, "#003c00"); // Bleu foncé
            gradient.addColorStop(1, "#00ac00"); // Bleu clair
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Draw everything
        function draw() {
            drawBackground();

            // Draw paddles
            ctx.fillStyle = "#810000";
            ctx.fillRect(0, player1Y, paddleWidth, paddleHeight); // Player 1

            ctx.fillStyle = "#00009c";
            ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight); // Player 2

            // Draw ball
            ctx.beginPath();
            ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#FFFF00";
            ctx.fill();
            ctx.closePath();

            // Draw scores
            ctx.font = "40px Arial";
            ctx.fillStyle = "#810000";
            ctx.fillText(`${player1Score}`, canvas.width / 2 - 50, 40);
            ctx.fillStyle = "#00009c";
            ctx.fillText(`${player2Score}`, canvas.width / 2 + 50, 40);
        }

        // Update game state
        function update() {
            // Ball movement
            ballX += ballSpeedX;
            ballY += ballSpeedY;

            // Ball collision with top and bottom
            if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
                ballSpeedY = -ballSpeedY;
            }

            // Ball collision with paddles
            if (
                ballX - ballRadius < paddleWidth && 
                ballY > player1Y && 
                ballY < player1Y + paddleHeight
            ) {
                ballSpeedX = -ballSpeedX;
            }

            if (
                ballX + ballRadius > canvas.width - paddleWidth && 
                ballY > player2Y && 
                ballY < player2Y + paddleHeight
            ) {
                ballSpeedX = -ballSpeedX;
            }

            // Ball out of bounds
            if (ballX - ballRadius < 0) {
                player2Score++;
                resetBall();
            }

            if (ballX + ballRadius > canvas.width) {
                player1Score++;
                resetBall();
            }

            // Player 1 movement
            if (keysPressed["w"] && player1Y > 0) {
                player1Y -= playerSpeed;
            }

            if (keysPressed["s"] && player1Y < canvas.height - paddleHeight) {
                player1Y += playerSpeed;
            }

            // Player 2 movement
            if (keysPressed["ArrowUp"] && player2Y > 0) {
                player2Y -= playerSpeed;
            }

            if (keysPressed["ArrowDown"] && player2Y < canvas.height - paddleHeight) {
                player2Y += playerSpeed;
            }
        }

        let i = 0;

        // Reset ball to the center
        function resetBall() {
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
            if (i % 2 == 0)
                ballSpeedX = Math.abs(ballSpeedX);
            else
                ballSpeedX = -Math.abs(ballSpeedX);
            i++;
        }

        // Game loop
        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }

        // Keyboard controls
        window.addEventListener("keydown", (e) => {
            keysPressed[e.key] = true;
        });

        window.addEventListener("keyup", (e) => {
            keysPressed[e.key] = false;
        });

        // Start game
        gameLoop();
    } else {
        console.error("Erreur : Le canvas n'a pas été trouvé.");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("pongCanvas");
    if (canvas) {
        console.log("Canvas trouvé, initialisation du jeu...");
        initializeGame();
    } else {
        console.error("Erreur : Canvas non trouvé au chargement de la page.");
    }
});


window.onload = function() {
    console.log("Page complètement chargée");
    initializeGame();
};