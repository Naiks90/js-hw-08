import { galleryItems } from './app.js';
const refs = {
  ulRef: document.querySelector('.js-gallery'),
  modalWindowBoxRef: document.querySelector('.js-lightbox'),
  modalWindowImgRef: document.querySelector('.lightbox__image'),
  btnCloseModalWindow: document.querySelector(
    'button[data-action="close-lightbox"]'
  ),
  overlayBoxRef: document.querySelector('.lightbox__overlay'),
};

const createGallery = galleryItems.map((galleryItem) => {
  const liRef = document.createElement('li');
  liRef.classList.add('gallery__item');

  const aRef = document.createElement('a');
  aRef.classList.add('gallery__link');
  aRef.setAttribute('href', galleryItem.original);

  const imgRef = document.createElement('img');
  imgRef.classList.add('gallery__image');
  imgRef.setAttribute('src', galleryItem.preview);
  imgRef.setAttribute('data-source', galleryItem.original);
  imgRef.setAttribute('alt', galleryItem.description);

  aRef.append(imgRef);
  liRef.append(aRef);

  return liRef;
});

refs.ulRef.append(...createGallery);

refs.ulRef.addEventListener('click', showModalWindow);
refs.btnCloseModalWindow.addEventListener('click', hideModalWindow);

function hideModalWindow(event) {
  refs.modalWindowBoxRef.classList.remove('is-open');
  refs.modalWindowImgRef.setAttribute('src', '');
  window.removeEventListener('keydown', onListenerkey);
  refs.overlayBoxRef.removeEventListener('click', hideModalWindow);
}

function showModalWindow(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();
  refs.modalWindowBoxRef.classList.add('is-open');
  refs.modalWindowImgRef.setAttribute('src', event.target.dataset.source);
  window.addEventListener('keydown', onListenerkey);

  refs.overlayBoxRef.addEventListener('click', hideModalWindow); //незрозумів чому Репета робив по іншому???
}

function onListenerkey(event) {
  if (event.code === 'Escape') {
    hideModalWindow();
  }
  if (event.code === 'ArrowRight') {
    console.log('право');
  }
  if (event.code === 'ArrowLeft') {
    console.log('лево');
  }
}
