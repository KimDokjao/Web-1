document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('nav');

  // Функция для получения имени текущей страницы
  function getCurrentPageName() {
    let pageName = window.location.pathname.split('/').pop().replace('.html', '');
    return pageName === '' ? 'index' : pageName;
  }

  // Функция для установки активной вкладки
  function setActiveTab(pageName) {
    const currentPage = nav.querySelector('ul li a.active');
    if (currentPage) {
      currentPage.classList.remove('active');
    }

    const newActiveLink = nav.querySelector(`ul li a[href="${pageName}.html"]`);
    if (newActiveLink) {
      newActiveLink.classList.add('active');
    }
  }

  // Сохранение последнего выбранного персонажа в localStorage
  function setLastSelectedCharacter(character) {
    localStorage.setItem('lastSelectedCharacter', character);
  }

  // Получение последнего выбранного персонажа из localStorage
  function getLastSelectedCharacter() {
    return localStorage.getItem('lastSelectedCharacter') || 'index'; // По умолчанию "index" (Ким Докча)
  }

  // Устанавливаем активную вкладку
  let currentPageName = getCurrentPageName();
  setActiveTab(currentPageName);

  // Установка последнего выбранного персонажа
  if (currentPageName !== 'gallery' && currentPageName !== 'other-characters') {
    setLastSelectedCharacter(currentPageName);
  }

  // Динамическое изменение вкладки "Другие персонажи"
  const characterList = document.querySelector('#other-characters .character-list');
  if (characterList) {
    const charactersData = {
      "index": {
        name: "Ким Докча",
        image: "images/kim-dokja2.jpg",
        description: "Он единственный читатель веб-романа «Три способа выжить в разрушенном мире»..."
      },
      "yu-junghyuk": {
        name: "Ю Джунхёк",
        image: "images/yu-junghyuk2.jpg",
        description: "Ю Джунхёк — главный герой романа tls123 «Три способа выжить в разрушенном мире»..."
      },
      "han-sooyoung": {
        name: "Хан Суён",
        image: "images/han-sooyoung2.jpg",
        description: "Один из доверенных союзников Ким Докча..."
      }
    };

    const lastSelected = getLastSelectedCharacter();
    characterList.innerHTML = '';

    for (const key in charactersData) {
      if (key !== lastSelected) {
        const character = document.createElement('a');
        character.href = `${key}.html`;
        character.classList.add('character-card');
        character.innerHTML = `
          <img src="${charactersData[key].image}" alt="${charactersData[key].name}">
          <h3>${charactersData[key].name}</h3>
          <p>${charactersData[key].description}</p>
        `;
        characterList.appendChild(character);
      }
    }
  }

  // ГАЛЕРЕЯ
  const gallery = document.getElementById('gallery');
  if (gallery) {
    const lastSelected = getLastSelectedCharacter();
    const galleryImages = {
      "index": [
        "images/kim-dokja.jpg",
        "images/kim-dokja3.jpg",
        "images/kim-dokja4.jpg",
        "images/kim-dokja5.jpg",
        "images/kim-dokja6.jpg",
        "images/kim-dokja7.jpg",
        "images/orv1.jpg",
        "images/orv2.jpg",
        "images/orv3.jpg",
        "images/orv4.jpg",
        "images/orv5.jpg"

      ],
      "yu-junghyuk": [
        "images/yu-junghyuk3.jpg",
        "images/yu-junghyuk4.jpg",
        "images/yu-junghyuk5.jpg",
        "images/yu-junghyuk6.jpg",
        "images/yu-junghyuk7.jpg",
        "images/orv1.jpg",
        "images/orv2.jpg",
        "images/orv3.jpg",
        "images/orv4.jpg",
        "images/orv5.jpg"

      ],
      "han-sooyoung": [
        "images/han-sooyoung3.jpg",
        "images/han-sooyoung4.jpg",
        "images/han-sooyoung5.jpg",
        "images/han-sooyoung6.jpg",
        "images/orv1.jpg",
        "images/orv2.jpg",
        "images/orv3.jpg",
        "images/orv4.jpg",
        "images/orv5.jpg"
      ]
    };

    // Создаем новые изображения для галереи
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
      galleryContainer.innerHTML = '';  // Очистить текущую галерею

      const images = galleryImages[lastSelected] || galleryImages["index"]; // Выбрать изображения для персонажа или по умолчанию
      images.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = "Gallery Image";
        galleryContainer.appendChild(img);
      });
    }
  }
});
