"use strict";

// ====================  1   =======================
const countAllElements = document.getElementsByTagName("*").length;
console.log(`загальна кількість елементів у DOM-дереві - ${countAllElements} `);

// ====================   2   =======================
const allElem = () => {
  const allElements = document.getElementsByTagName("*");
  let tags = [];
  let tagsLength = [];
  for (const el of allElements) {
    tags.push(el.tagName);
    tagsLength.push(el.tagName.length);
  }
  //   console.log(tags);
  return tags;
};

function maxTag() {
  const tags = allElem();
  let maxTag = "";
  let maxTagLength = 0;
  for (const el of tags) {
    if (el.length > maxTagLength) {
      maxTagLength = el.length;
      maxTag = el;
    }
  }
  console.log(
    `найдовша назва тегу ${maxTag}, кількість символів у назві - ${maxTagLength}`
  );
  return maxTagLength;
}
maxTag();

const getTagStats = (acc, tag) => {
  if (!acc.hasOwnProperty(tag)) {
    acc[tag] = 0;
  }
  acc[tag] += 1;
  return acc;
};
const tagsCount = () => {
  const tags = allElem();
  return tags.reduce(getTagStats, {});
};
tagsCount();
console.log("назва тегу та їх кількість :", tagsCount());

// ====================   3   =======================
const countTagsSymbol = () => {
  const maxTagLength = maxTag();
  const tags = allElem();
  for (let i = 1; i <= maxTagLength; i++) {
    const result = tags.filter((tag) => tag.length === i);
    console.log(
      `кількість символів у назві тегу - ${i}, кількість таких елементів = ${result.length}`
    );
    console.log(result);
  }
};
countTagsSymbol();
