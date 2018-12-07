$(document).ready(function(){
  var bookListDiv = $("#book-list");

  bookListDiv.on("click", "div.title", handleTitleClick);

  renderBookList(bookListDiv);

  function renderBookList(renderingPoint){
    $.ajax({
      "url": "http://localhost:8282/books/",
      "type": "GET",
      "contentType": "application/json; charset=utf-8",
      "dataType": "json",
    }).done(function(bookArr){
      renderingPoint.empty();

      for(var i=0; i<bookArr.length; i++){
        var bookTitleDiv = $("<div class='title'>");
        bookTitleDiv.text(bookArr[i].title);
        bookTitleDiv.data("book-id", bookArr[i].id);
        renderingPoint.append(bookTitleDiv);

        var bookDescriptionDiv = $("<div class='description'>");
        renderingPoint.append(bookDescriptionDiv);
      } // for
    }); // done
  } // renderBookList

  function handleTitleClick(){
    var thisBookTitleDiv = $(this);
    var bookId = thisBookTitleDiv.data("book-id");
    var thisBookDescriptionDiv =
        thisBookTitleDiv.next("div.description");
    console.log(bookId);
    $.ajax({
      "url": "http://localhost:8282/books/"+bookId,
      "type": "GET",
      "contentType": "application/json; charset=utf-8",
      "dataType": "json",
    }).done(function(book){
      thisBookDescriptionDiv.empty();

      var authorDiv = $("<div>");
      authorDiv.text(book.author);
      thisBookDescriptionDiv.append(authorDiv);

      var publisherDiv = $("<div>");
      publisherDiv.text(book.publisher);
      thisBookDescriptionDiv.append(publisherDiv);

      var typeDiv = $("<div>");
      typeDiv.text(book.type);
      thisBookDescriptionDiv.append(typeDiv);

      var isbnDiv = $("<div>");
      isbnDiv.text(book.isbn);
      thisBookDescriptionDiv.append(isbnDiv);

      thisBookDescriptionDiv.slideDown();
    }
    ); // done
  } // handleTitleClick

});
