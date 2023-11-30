import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

const form = document.querySelector('.form'),
  searchInp = document.querySelector('input[type="text"]'),
  gallery = document.querySelector('.gallery'),
  loader = document.querySelector('.loader');

let searchWord = '';

const API_KEY = import.meta.env.VITE_API_KEY;

searchInp.addEventListener('input', e => {
  e.preventDefault();

  searchWord = e.target.value;
});

const falseToast = {
  icon: 'icon-false',
  backgroundColor: '#FC5A5A',
  message:
    'Sorry, there are no images matching your search query. Please try again!',
  messageColor: '#FAFAFB',
  messageSize: '16px',
  position: 'topRight',
  close: false,
};

const url = 'https://pixabay.com/api/?key=';

form.addEventListener('submit', e => {
  e.preventDefault();


  gallery.innerHTML = '';

  loader.style.display = 'inline-block';

  fetch(
    `${url}${API_KEY}&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true&per_page=18`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      gallery.textContent = '';
      if (data.hits.length === 0) {
        loader.style.display = 'none';
        return iziToast.show(falseToast);
      }
      const dataList = data.hits.map(photo => {
        return `
        <li class="gallery-item">
          <a href="${photo.largeImageURL}">
            <img class="api-img" src="${photo.webformatURL}" alt="${photo.tags}">
            <div class="img-desc">
              <span><b>Likes:</b> <br/>${photo.likes}</span>
              <span><b>Views:</b> <br/>${photo.views}</span>
              <span><b>Comments:</b> <br/>${photo.comments}</span>
              <span><b>Downloads:</b> <br/>${photo.downloads}</span>
            </div>
          </a>
        </li>
                  `;
      });

      gallery.insertAdjacentHTML('afterbegin', dataList.join(''));

      loader.style.display = 'none';

      modalImg.refresh();

      searchWord = '';

      form.reset();
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

const modalImg = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0,
  captionsData: 'alt',
  captionDelay: 250,
});
