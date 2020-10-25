'use strict';

{

    // 画像の配列
  const images = [
    'img/pic00.jpg',
    'img/pic01.jpg',
    'img/pic02.jpg',
    'img/pic03.jpg',
    'img/pic04.jpg',
    'img/pic05.jpg',
    'img/pic06.jpg',
    'img/pic07.jpg',
  ];
  let currentIndex = 0;

//   mainのIdを取得して画像の表示
  const mainImage = document.getElementById('main');
  mainImage.src = images[currentIndex];

//   imgのIdを取得した,thumbnailsにliの子要素を追加する
  images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image;

    const li = document.createElement('li');
    // 表示されている画像にcurrentクラスを付けてる
    if (index === currentIndex) {
      li.classList.add('current');
    }
    // 今あるcurrentクラスを外して、クリックした画像に追加する
    li.addEventListener('click', () => {
      mainImage.src = image;
      const thumbnails = document.querySelectorAll('.thumbnails > li');
      thumbnails[currentIndex].classList.remove('current');
      currentIndex = index;
      thumbnails[currentIndex].classList.add('current');
    });

    li.appendChild(img);
    document.querySelector('.thumbnails').appendChild(li);
  });

//   nextの要素を取得して、クリックをすると次の画像に飛ぶようにします。
//   もし最後の一枚だった場合は一番最初の画像に飛びます。
  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    let target = currentIndex + 1;
    if (target === images.length) {
      target = 0;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
  });

//   prevの要素を取得して、クリックをすると次の画像に飛ぶようにします。
//   もし最初の一枚だった場合は一番最後の画像に飛びます。
  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    let target = currentIndex - 1;
    if (target < 0) {
      target = images.length - 1;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
  });

  let timeoutId;
// playボタンの要素を取得して、クリックすると一秒ごとに次の画像に切り替わります。
  function playSlideshow() {
    timeoutId = setTimeout(() => {
      next.click();
      playSlideshow();
    }, 1000);
  }

  let isPlaying = false;

//   playを押すとボタンがPauseに切り替わります、もう一度playに戻ります。
  const play = document.getElementById('play');
  play.addEventListener('click', () => {
    if (isPlaying === false) {
      playSlideshow();
      play.textContent = 'Pause';
    } else {
      clearTimeout(timeoutId);
      play.textContent = 'Play';
    }
    isPlaying = !isPlaying;
  });
}