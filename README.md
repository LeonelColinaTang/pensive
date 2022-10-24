# Pensive, a book-writing management app.

## [Pensive Wiki](https://github.com/LeonelColinaTang/pensive/wiki)


![pensive-logo](https://user-images.githubusercontent.com/102888592/187081087-beac8769-a3da-4117-8c41-05d2e6d65e7f.png)

*(Logo credit: [Michael Ng Cen](https://github.com/MichaelNgCen))*


[Pensive]([https://github.com/imartinez921/pensive](https://mern-pensive.herokuapp.com/#/)) is a book writing management app where a user can create, edit and delete books. Each book is composed of chapters. Each book and chapter can be created by filling in a simple form. Then you will be able to access a rich text editor in order to write and format your chapters in a simple, distraction-free and user friendly interface. Each chapter allows you create characters which will be displayed throughout all the chapters pertaining to that book. 

On our application, Pensive, users will be able to access a dictionary API to search for words and/or synonyms without having to exit the app, decreasing distractions and improving the productivity. Users will also be able to see each character's description by simply clicking the name on the character's list.

***

## Technologies, Libraries and APIs

- Frontend
    - `React`
    - `HTML5`
    - `CSS`
    - `react-quilljs`
- Backend
    - `Express`
    - `Node.js`
- Database
    - `Mongoose`
    - `MongoDB`

***

## Major Features and Code Highlights

### Writing Page

[![WritingPageGif.gif](https://s4.gifyu.com/images/WritingPageGif.gif)](https://gifyu.com/image/S9PCC)

The main feature of our application is the Writing Page, the interface through which users can write and format chapters and create, edit or delete characters. The writing page is a very minimalistic environment that improves concentration by removing any unnecessary information or functionality. The Writing Page houses multiple React Components, each one with a unique core functionality. It was a top priority for our team to create the writing page as simple and useful as possible.

The Writing Page consists of three main components: The text editor, where the chapters will be written and formatted, the Characters component, in which users will create, edit and delete characters, as well as display them on a list where they can access each character's details easily by just clicking on their name and finally the dictionary component, in which they can search for words and synonyms through a call to the dictionary API. 

```.js
const WritingPage = (props) => {
    let {chapter, bookId, editChapter} = props;
    const history = useHistory();

    if (!chapter){
        history.push(`/book/${bookId}`)
    }

    const { quill, quillRef } = useQuill();

    useEffect(() => {
        if (quill) {
            quill.root.innerHTML = chapter.content;
            quill.on('text-change', () => {
                chapter.content = quill.root.innerHTML;
            });
        }
    }, [quill]);

    // Save to the database
    const onSubmit = (e) =>{
        e.preventDefault();
        chapter={
            title: chapter.title,
            description: chapter.description,
            bookId: chapter.bookId,
            content: chapter.content,
            id: chapter._id
        }
        editChapter(chapter);
        history.push(`/book/${chapter.bookId}`)
        quill.root.innerHTML = "";
    }

    const handleClick = () => {
        if (window.confirm('Are you sure you want to go back? You will lose any unsaved changes')){
            history.push(`/book/${chapter.bookId}`)
        }
    };

    return (
            <div className="writing-page-main-container">
                <div className="left-container-temp">
                    <div id="back-to-profile">
                        <button onClick={handleClick}><BsFillBackspaceFill /></button>
                    </div>
                 </div>
                <div className="middle-container-temp">
                    <div id="writing-piece">
                        <div ref={quillRef} />
                    </div>
                    <button type="submit" value="save" onClick={onSubmit} className="save-book-writing">Save</button>
                </div>
                <div className="right-container-temp" >
                    <div>
                        <CharacterListContainer  bookId={bookId} /> 
                    </div>
                    <div className="dictionary-container-mood">
                        <DictionaryContainer />
                    </div>
                </div>
            </div>
        )
}
```
***

### Profile Page

[![profileGif.gif](https://s4.gifyu.com/images/profileGif.gif)](https://gifyu.com/image/S9PFR)

The profile page is the where the user will be directed to after log in or sign up. A button to create a new book will always be in display as well as the books the user has created. Users can create, edit or delete books on this page. Also, by clicking on a book, users will be directed to the chapters index where they can continue writing a specific chapter, create a new one, or delete a chapter. 

```.js
class Profile extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      books: [],
    };
  }
  
  componentDidMount() {
    this.props.fetchUserBooks(this.props.currentUser.id);
  }
  
  UNSAFE_componentWillMount() {
    this.props.fetchUserBooks(this.props.currentUser.id);
  }

  UNSAFE_componentWillReceiveProps(newState) {
    this.setState({ books: newState.books });
  }

  render() {
    if (this.state.books.length === 0) {
      return (<div className="books-main-section-container">
        <div>You have no Books</div>
        <div className="all-books-container">
        <Link to={"/new_book"} className="add-book">+</Link>
        </div>
      </div>);
    } else {
      const {removeBook,
        editBook,
        fetchBookById,
        history,
      } = this.props;
      return (
        <div className="books-main-section-container">
          <h2>Your Books</h2>
          <div className="all-books-container">
          {this.state.books.map((book) => (
            <BookBox key={book._id}
              text={book.title}
              removeBook={removeBook}
              id={book._id}
              data={book}
              editBook={editBook}
              fetchbook={fetchBookById}
              history={history} />
          ))}
            <Link to={"/new_book"} className="add-book">+</Link>
          </div>
        </div>
      );
    }
  }
}
```
***

### Meet the Team

* <a href="https://www.linkedin.com/in/leonel-colina/" target="_blank">Leonel Colina</a>
* <a href="https://www.linkedin.com/in/shengzhi-luo/" target="_blank">Shengzhi Luo</a>
* <a href="https://www.linkedin.com/in/irenemartinez921/" target="_blank">Irene Martinez</a>
* <a href="https://www.linkedin.com/in/shuyang-ning/" target="_blank">Claire Shuyang</a>
