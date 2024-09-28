const starContainer = document.getElementById('star-container');

function createStars(count) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('img');
        star.className = 'bigStar';
        star.src = "https://cdn.icon-icons.com/icons2/153/PNG/256/star_favourite_21830.png"; // Замените на ваш источник звезды

        // Установка случайных размеров
        const size = Math.random() * 5 + 20; // Размер от 20px до 25px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.position = 'absolute';

        // Установка случайных позиций с учетом размеров звезды
        const randomX = Math.random() * (starContainer.clientWidth - size);
        const randomY = Math.random() * (starContainer.clientHeight - size);
        star.style.left = `${randomX}px`;
        star.style.top = `${randomY}px`;

        starContainer.appendChild(star);

        star.addEventListener('click', () => {
            star.style.display = 'none';
            showPrediction();
        });
    }
}

// Создание 10 звезд сразу
createStars(25);

let predictions = [];
let currentMessageDiv = null; 

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        predictions = data;
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));

function showPrediction() {
    const randomIndex = Math.floor(Math.random() * predictions.length);
    const prediction = predictions[randomIndex];

    // Удаляем предыдущее сообщение перед созданием нового
    if (currentMessageDiv) {
        document.body.removeChild(currentMessageDiv);
    }

    currentMessageDiv = document.createElement('div');
    currentMessageDiv.innerHTML = `
        <p>${prediction.text}</p>
    `;
    currentMessageDiv.style.position = 'fixed';
    currentMessageDiv.style.top = '50%';
    currentMessageDiv.style.left = '50%';
    currentMessageDiv.style.transform = 'translate(-50%, -50%)';
    currentMessageDiv.style.backgroundColor = 'yellow';
    currentMessageDiv.style.border = '1px solid black';
    currentMessageDiv.style.padding = '20px';
    currentMessageDiv.style.zIndex = '1000';

    document.body.appendChild(currentMessageDiv);

    currentMessageDiv.addEventListener('click', () => {
        document.body.removeChild(currentMessageDiv);
        currentMessageDiv = null; // Сбрасываем текущее сообщение
    });
}


