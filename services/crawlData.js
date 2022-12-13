const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const request = require('request-promise')
const fs = require('fs')
const cors = require('cors')
require('dotenv').config()

express.json()
const app = express();
app.use(cors())
app.use(express.urlencoded({extended:false}))

const baseURL = "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=";
const pathMovie = "https://ophim1.com/phim/";

let moviesData = []

const getMoviesPerPage = async (page) => {
  const slugs = await getSlugsPerPage(page);
  console.log("Crawling page " + page + "...");
  
  const movies = await getMoviesFromSlugs(slugs);

  // loc movies co data de write to file
  movies.forEach(item => {
    if(item){
      moviesData.push(item)
    }
  })
 
};

const getSlugsPerPage = async (number) => {
  const { data } = await axios.get(baseURL + number);
  return data.items.map(({ slug }) => slug);
};

const getMoviesFromSlugs = (slugs) => {
  return Promise.all(slugs.map(fetchMovie));
};

const fetchMovie = async (slug) => {
  const { data } = await axios.get(pathMovie + slug);
  const {
    name,
    origin_name,
    thumb_url,
    poster_url,
    type,
    year,
    country,
    content,
    quality,
    lang,
    category,
  } = data.movie;

  const categoryNames = category.map(({ name }) => name);

  // bỏ category 18+
  if (categoryNames.includes("Phim 18+")) return;

  // bỏ phim năm sản xuất khác 2022
  if(year !== 2022) return;

  // bỏ phim các quốc gia ko phải: Trung Quốc, Hàn Quốc, Âu Mỹ
  const validContry = ["Trung Quốc", "Hàn Quốc", "Âu Mỹ"]
  
  if(!validContry.includes(country[0].name)) {
    return;
  }

  return {
    name,
    origin_name,
    thumb_url,
    poster_url,
    type,
    slug,
    year,
    country: country[0].name,
    content: content.replace(/<\/*p>/g, ""),
    quality,
    lang,
    category: categoryNames,
  };
};

const writeFile = (content) => {
  fs.appendFileSync("movies.json", JSON.stringify(content));
};

const delay = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

const crawl = async (numberOfPages) => {
  let index = 1;
  while (index <= numberOfPages) {
    await getMoviesPerPage(index);
    await delay(1000);
    index += 1;
  }
  writeFile(moviesData)

  console.log("Completed!");
};

crawl(200);
