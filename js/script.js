"use strict";

// ====================  1   =======================
const countAllElements = document.getElementsByTagName("*").length;
console.log(`Загальна кількість елементів у DOM-дереві - ${countAllElements} `);

// ====================   2   =======================
const allElem = () => {
  const allElements = document.getElementsByTagName("*");
  let tags = [];
  let tagsLength = [];
  for (const el of allElements) {
    tags.push(el.tagName);
    tagsLength.push(el.tagName.length);
  }
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
    `Найдовша назва тегу ${maxTag}, кількість символів у назві - ${maxTagLength}`
  );
  return maxTagLength;
}
maxTag();

const tagsCount = () => {
  return allElem().reduce((acc, tag) => {
    if (!acc.hasOwnProperty(tag)) {
      acc[tag] = 0;
    }
    acc[tag] += 1;
    return acc;
  }, {});
};
console.log("Назви тегів та їх кількість :", tagsCount());
// var newSet = new Set(allElem());
// console.log(newSet);
// console.log([...newSet]);

// ====================   3   =======================
const countTagsSymbol = () => {
  const maxTagLength = maxTag();
  const tags = allElem();
  for (let i = 1; i <= maxTagLength; i++) {
    const result = tags.filter((tag) => tag.length === i);
    console.log(
      `Кількість символів у назві тегу - ${i}, кількість таких елементів = ${result.length}`
    );
    console.log(result);
  }
};
countTagsSymbol();
