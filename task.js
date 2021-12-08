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
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  refs.modalWindowBoxRef.classList.add('is-open');
  refs.modalWindowImgRef.setAttribute('alt', event.target.alt);
  refs.modalWindowImgRef.setAttribute('src', event.target.dataset.source);
  window.addEventListener('keydown', onListenerkey);
  refs.overlayBoxRef.addEventListener('click', hideModalWindow);
}

function onListenerkey(event) {
  clickEscape(event);
  clickArrowRight(event);
  clickArrowLeft(event);
}

function clickEscape(event) {
  if (event.code === 'Escape') {
    hideModalWindow();
  }
}
function clickArrowRight(event) {
  if (event.code === 'ArrowRight') {
    refs.modalWindowImgRef.setAttribute(
      'src',
      onJumpRight(refs.modalWindowImgRef.src)
    );
  }
}
function clickArrowLeft(event) {
  if (event.code === 'ArrowLeft') {
    refs.modalWindowImgRef.setAttribute(
      'src',
      onJumpLeft(refs.modalWindowImgRef.src)
    );
  }
}

function onJumpRight(src) {
  const arrImgSrc = galleryItems.map((galleryitem) => galleryitem.original);
  const indexImgSrc = arrImgSrc.findIndex((item) => item === src);

  return indexImgSrc === galleryItems.length - 1
    ? arrImgSrc[indexImgSrc]
    : arrImgSrc[indexImgSrc + 1];
}

function onJumpLeft(src) {
  const arrImgSrc = galleryItems.map((galleryitem) => galleryitem.original);
  const indexImgSrc = arrImgSrc.findIndex((item) => item === src);

  return indexImgSrc === 0
    ? arrImgSrc[indexImgSrc]
    : arrImgSrc[indexImgSrc - 1];
}
