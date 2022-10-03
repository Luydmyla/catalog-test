const refs = {
  lastImageList: document.querySelector(".last"),
  featuredImagesList: document.querySelector(".featured-list"),
};

fetch("__in/data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    bestRating(data);
    newImages(data);
  })
  .catch((error) => {
    console.log(error);
  });

function bestRating(items) {
  //   const imageRating = items
  //     .map((items) => {
  //       console.log(items.rating);
  //       return items;
  //     })
  const imageRating = [...items].sort((a, b) => {
    return a.rating - b.rating;
  });
  // console.log(imageRating);
  const bastRatinfImages = imageRating.slice(0, 5);
  //   console.log(bastRatinfImages);
  renderFeaturedImageList(bastRatinfImages);
  return bastRatinfImages;
}

function newImages(items) {
  //   const imageAge = items
  // .map((items) => {
  //   console.log(items.age);
  //   return items;
  // })
  const imageAge = [...items].sort((a, b) => {
    return a.age - b.age;
  });
  //   console.log(imageAge);
  const firstNewImages = imageAge.slice(0, 2);
  //   console.log(firstNewImages);
  renderLastImageList(firstNewImages);
  return firstNewImages;
}
const allTags = (tags) => {
  if (tags === null) {
    return;
  }
  return tags.map((tag) => "#" + tag).join(", ");
};
function renderFeaturedImageList(items) {
  const markup = items
    .map(({ id, image, tags, title, url }) => {
      return `<li data-id=${id} class="featured-item">
            <div class="featured-card">
              <a href class="featured-link link>">
                <img
               src="../__in/${image}"
                alt="${url}"
                width="280"
                height="280"
              />
              </a>
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
                <a href class="last-link link>">
                <img
               src="../__in/${image}"
                alt="${url}"
                width=100%
                height=100%
              />
                </a>
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
