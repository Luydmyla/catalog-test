const refs = {
  lastImageList: document.querySelector(".last"),
  featuredImagesList: document.querySelector(".featured-list"),
};
// const allElementsByTeg = document.querySelector("li");
// console.log(allElementsByTeg);

fetch("in/data.json")
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
  .then(() => {
    const allElements = document.getElementsByTagName("*");
    // console.log(allElements);
    const countAllElements = allElements.length;
    console.log(
      `загальна кількість елементів у DOM-дереві = ${countAllElements} `
    );

    function allElem(collection) {
      let tags = [];
      // let tagsLength = [];
      for (let i = 0; i < collection.length; i++) {
        // console.log(collection[i].tagName);
        tags.push(collection[i].tagName);
        // tagsLength.push(collection[i].tagName.length);
      }
      console.log(tags);

      let maxTag = "";
      let maxTagLength = 0;
      for (let i = 0; i < tags.length; i++) {
        if (tags[i].length > maxTagLength) {
          maxTagLength = tags[i].length;
          maxTag = tags[i];
        }
      }
      console.log(
        `найдовша назва тегу ${maxTag}, кількість символів у назві - ${maxTagLength}`
      );

      const getTagStats = (acc, tag) => {
        if (!acc.hasOwnProperty(tag)) {
          acc[tag] = 0;
        }
        acc[tag] += 1;
        return acc;
      };

      const countTags = (tags) => tags.reduce(getTagStats, {});
      const tagCount = countTags(tags);
      console.log(tagCount);
      for (let i = 1; i <= maxTagLength; i++) {
        const result = tags.filter((tag) => tag.length === i);
        console.log(
          `кількість символів у назві тегу - ${i}, кількість таких елементів = ${result.length}`
        );
        console.log(result);
      }
    }
    allElem(allElements);
  })
  .catch((error) => {
    console.log(error);
  });

function bestRating(items) {
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
                <img
               src="../__in/${image}"
                alt="${url}"
                width="100%"
                height="100%"
              />
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
               src="../__in/${image}"
                alt="${url}"
                width="240px"
                height="240px"
              />      
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
