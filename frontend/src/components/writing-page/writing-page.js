import React, { useState, useEffect, useRef} from "react";
import { Link , useHistory} from "react-router-dom";
import "../../assets/css/04-writing-page.css";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme 
import axios from "axios";
import CharacterListContainer from "../characters/character_list";
import { BsFillBackspaceFill } from 'react-icons/bs';
import DictionaryContainer from "../dictionary/dictionary_container";

const WritingPage = (props) => {
    // console.log(props);
    let {book, fetchBookById, editBook} = props;
    const history = useHistory();


    if (!book){
        history.push("/profile")
    }

    const { quill, quillRef } = useQuill();

    useEffect(() => {
        if (quill) {
            quill.root.innerHTML = book.content;
            quill.on('text-change', () => {
                book.content = quill.root.innerHTML;
            });
        }
    }, [quill]);

    // Save to the database
    const onSubmit = (e) =>{
        e.preventDefault();
        book={
            title: book.title,
            editor: book.editor,
            genre: book.genre,
            author: book.author,
            description: book.description,
            content: book.content,
            id: book._id
        }
        editBook(book);
        history.push("/profile")
        quill.root.innerHTML = "";
    }


    const handleClick = () => {
        if (window.confirm('Are you sure you want to go back? You will lose any unsaved changes')){
            history.push(`/book/${book._id}`)
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
                    {book ? <CharacterListContainer bookId={book._id} book={props.book} /> 
                    : null}
                </div>
                <div className="dictionary-container-mood">
                    <DictionaryContainer />
                </div>
            </div>
                    
                </div>
        )
}

    
export default WritingPage;