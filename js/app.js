$(document).ready(function(){
  var bookListDiv = $("#book-list");
  var addBookForm = $("#add-book-form");

  bookListDiv.on("click", "div.title", handleTitleClick);
  addBookForm.on("submit", handleAddBookSubmit);

  refreshBookList();

  function refreshBookList(){
    renderBookList(bookListDiv);
  }

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

  function handleAddBookSubmit(e){
    var newBook = {
      "title": this.elements.title.value,
      "author": this.elements.author.value,
      "publisher": this.elements.publisher.value,
      "type": this.elements.type.value,
      "isbn": this.elements.isbn.value,
    }

    $.ajax({
      "url": "http://localhost:8282/books/",
      "type": "POST",
      "data": JSON.stringify(newBook),
      "contentType": "application/json; charset=utf-8",
      "dataType": "json",
    }).done(function(){
      refreshBookList();
    }).fail(function(xhr, status, err){
      console.log("ERR", xhr, status, err);
      alert(err);
    });

    e.preventDefault();
    return false;
  }
});
