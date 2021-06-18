$(document).ready(()=>{
  console.log(`loaded post script`);
  //create the html
  const content = {title: "diff", body: "test aways"};
  const buildArticle = (content) => {
    // const $art = $("<article>")
    // $art.addClass("row")
    // const $head = $("<h1>")
    // const $par = $("<p>")
    // $par.append(`${content.body}`)
    // $head.append(`${content.title}`)
    // $art.append($head)
    // $art.append($par)
    let html = `
      <article class="row">
              <h1>
                  ${content.title}
              </h1>
              <p> ${content.body}</p>
          </article>
      `;
    return html;
  };
  // append the html
  
  
  const renderArticle = (article) => {
    const $articlesContainer = $("#articlescontainer");
    $articlesContainer.append(buildArticle(article));
  };

  const loadAllArticles = (articles, limit)=> {
    articles.forEach((article, idx) => {
      idx < limit ? renderArticle(article) : "";
    });
  };

  const $button = $("#load-more-ajax");
  $button.on("click", function() {
    let params = {
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "GET"
    };
    $.ajax(params)
      .then((response)=>{
        console.log(response);
        loadAllArticles(response, 5);
      })
      .catch((err)=> {
        console.log(`err on load articles: ${err}`);
      });
  });


});

// load more

$(document).ready(()=> {
  console.log(`loaded`);
  const $button = $("#load-more");
  const $articlesContainer = $("#articlescontainer");
  $button.on("click", function() {
    let params = {
      url: "more-articles.html",
      method: "GET"
    };
    $.ajax(params)
      .then((results)=>{
        $articlesContainer.append(results);
      })
      .catch((err)=>{
        console.log(`error trying to load more: ${err}`);
      });
  });
});