import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import axios from 'axios';

// ! Variables

const form = document.querySelector('.form'),
  searchInp = document.querySelector('input[type="text"]'),
  gallery = document.querySelector('.gallery'),
  loader = document.querySelector('.loader'),
  loadBtn = document.querySelector('.load-btn');

  const API_KEY = import.meta.env.VITE_API_KEY;

  const searchImg = 40;
  let totalPage = 1;
  let limit = 0;

  let searchWord = '';
  let arrImages = [];

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

// ! End Variables

// ! Function

const fetchAPI = async () => {
  const response = await axios.get("https://pixabay.com/api", {
      params: {
        key: API_KEY,
        q: searchWord,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: searchImg,
        page: totalPage,
      },
    });
    return response.data;
};

const getImg = async () => {
  try {
    const data = await fetchAPI();
    limit = data.totalHits;

    if (data.hits.length === 0) {
      toggleLoader('none');
      toggleBtn('none');

      return iziToast.show(falseToast);
    }



    renderImg(data)

  } catch (error) {
    console.error(error.message);
  }
};

const renderImg = (data) => {

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

  arrImages = dataList;

  gallery.insertAdjacentHTML('beforeend', arrImages.join(''))

  toggleBtn('inline-block');

  checkLimit();

  scrollPage();

  modalImg.refresh();
};

const toggleLoader = (value) => {
  loader.style.display = value;
}

const toggleBtn = (value) => {
  loadBtn.style.display = value;
}

const scrollPage = () => {
  if (totalPage > 1) {
  const imgSize = document.querySelector ('.gallery-item').getBoundingClientRect();
  window.scrollBy({ top: imgSize.height * 2.4, left: 0, behavior: "smooth" });
  }
}

const checkLimit = () => {
  if (Math.ceil(limit / searchImg) === totalPage) {
    toggleBtn('none');
    return iziToast.show({
      icon: 'icon-false',
      backgroundColor: '#FC5A5A',
      message:
        `We're sorry, but you've reached the end of search results.`,
      messageColor: '#FAFAFB',
      messageSize: '16px',
      position: 'topRight',
      close: false,
    })
  }
}

// ! End Function

// ! EventListeners

searchInp.addEventListener('input', e => {

  searchWord = e.target.value;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  toggleBtn('none');

  arrImages = [];
  totalPage = 1;

  gallery.innerHTML = '';

  toggleLoader('inline-block');

  await getImg();

  if (arrImages.length > 0) {
    toggleBtn('inline-block');
  }

  toggleLoader('none');

  searchInp.value = '';

});

loadBtn.addEventListener("click", async () => {
  toggleBtn('none');
  toggleLoader('inline-block')

  totalPage += 1;

  await getImg();

  toggleLoader('none');
});

// ! End EventListeners

const modalImg = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0,
  captionsData: 'alt',
  captionDelay: 250,
});
