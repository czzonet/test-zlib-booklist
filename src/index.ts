import axios from "axios";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { catchError, from, map, tap } from "rxjs";

console.log(0);

const obj简单网页模板 = {
  header: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{%title}</title>
  </head>
  <body>

  `,
  footer: `
</body>
</html>
  `,
};
// const domain = "https://zh.b-ok.global";
const domain = "https://zh.sg1lib.org";
const baseURL = domain + "/papi/booklist/315090/get-books/";
const targetBase = resolve(__dirname, "../output");

const net书籍专栏的接口 = async (page: number) => {
  const res = await axios.get("" + page, {
    baseURL,
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    },
  });
  return res.data;
};

const api获取书籍专栏 = (page: number) => from(net书籍专栏的接口(page));

const fn书籍专栏的书籍列表 = (page: number) =>
  api获取书籍专栏(page).pipe(
    catchError((err) => {
      console.log(err);
      return "";
    }),
    map((d) => d.books),
    map((d) =>
      (d as any[]).map((item) => {
        return {
          link: domain + item.book.href,
          title: item.book.title,
          size: item.book.filesize,
        };
      })
    ),
    map((d) =>
      d.map(
        (l, i) =>
          `<a href="${l.link}">${i + 1}：${l.title}</a>` +
          (l.size > 50 * 1024 * 1024
            ? `<span style="color:red">>50M</span>`
            : "") +
          "<br/>"
      )
    ),
    tap((d) => {
      // console.log(d);
    })
  );

// TODO: 获取总数 组合 节流请求 组合
const main = () => {
  const page = 7;
  const targetPath = resolve(targetBase, page + ".html");
  fn书籍专栏的书籍列表(page).subscribe((d) => {
    const res =
      obj简单网页模板.header.replace("{%title}", "页码" + page) +
      d.join("") +
      obj简单网页模板.footer;
    writeFileSync(targetPath, res, {
      encoding: "utf-8",
    });
    console.log("Export success:", targetPath);
  });
};

main();

// pagination: {
//   limit: 20,
//   current: 2,
//   before: 1,
//   next: 3,
//   total_items: 999,
//   total_pages: 50
// }

// book: {
//   id: 17573753,
//   title: "Life's a Puppy Party: Recipes, DIYs, and Activities for Celebrating the Seasons with Your Dog",
//   author: 'Heather Hunt',
//   volume: '',
//   year: 2021,
//   edition: null,
//   publisher: 'Tiller Press',
//   identifier: '9781982167554,1982167556',
//   language: 'english',
//   extension: 'epub',
//   pages: 176,
//   filesize: 130333266,
//   series: '',
//   cover: 'https://covers.zlibcdn2.com/covers299/books/f5/2d/1f/f52d1fbff252025351adda0b86cae804.jpg',
//   terms_hash: 'c5786c49da0e79455a166f469d5226fb',
//   active: 1,
//   filesizeString: '124.30 MB',
//   href: '/book/17573753/87ee96',
//   hash: '87ee96',
//   description:
