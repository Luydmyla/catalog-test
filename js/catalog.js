"use strict";

const refs = {
  lastImageList: document.querySelector(".last"),
  featuredImagesList: document.querySelector(".featured-list"),
};

async function getImages() {
  try {
    const response = await fetch("in/data.json");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
// ===== кращий рейтинг =============
const bestRating = async () => {
  try {
    const data = await getImages();
    // console.log(data);
    const imageRating = [...data].sort((a, b) => {
      return a.rating - b.rating;
    });
    // console.log(imageRating);
    const bastRatinfImages = imageRating.slice(0, 5);
    console.log(bastRatinfImages);
    renderFeaturedImageList(bastRatinfImages);
    // return bastRatinfImages;
  } catch (error) {
    console.log(error);
  }
};
//  ===== найновіші фото =============
const newImages = async () => {
  const data = await getImages();
  const imageAge = [...data].sort((a, b) => {
    return a.age - b.age;
  });
  console.log(imageAge);
  const firstNewImages = imageAge.slice(0, 2);
  //   console.log(firstNewImages);
  renderLastImageList(firstNewImages);
  return firstNewImages;
};

const allTags = (tags) => {
  if (tags === null) {
    return;
  }
  return tags.map((tag) => "#" + tag).join(", ");
};

// ========= рендер елементів ==============

function renderFeaturedImageList(items) {
  const markup = items
    .map(({ id, image, tags, title, url }) => {
      return `<li data-id=${id} class="featured-item">
            <div class="featured-card">
                <img
               src="in/${image}"
                alt="${url}"
                width="100%"
                height="100%"
              />
              <button type="button" class="button-star">
            <svg class="icon" width="30" height="30">
              <use href="in/icons/sprite.svg#icon-star-solid"></use>
            </svg>
          </button>
            </div>
            <div class="featured-footer">
              <h3 class="featured-names">${title}</h3>
              <p class="featured-tags">${allTags(tags)}</p>
            </div>
          </li>`;
    })
    .join("");
  refs.featuredImagesList.innerHTML = markup;
}

function renderLastImageList(items) {
  const markup = items
    .map(({ id, image, tags, title, url }) => {
      return `<li data-id=${id} class="last-item">
              <div class="last-card">
                <img
               src="in/${image}"
                alt="${url}"
                width="240px"
                height="240px"
              />
              <button type="button" class="button-star">
            <svg class="icon" width="30" height="30">
              <use href="in/icons/sprite.svg#icon-star-regular"></use>
            </svg>
          </button>
              </div>
              <div class="last-footer">
                <h3 class="last-names">${title}</h3>
                <p class="last-tags">${allTags(tags)}</p>
              </div>
            </li>`;
    })
    .join("");
  refs.lastImageList.innerHTML = markup;
}

bestRating();
newImages();
