import { useState, useEffect } from 'react';
import { getImages } from '../DogApiServices/DogApi';
import { useAppDispatch, useAppSelector } from '../../App/Hook';
import { Link } from 'react-router-dom';


import { updateList } from '../../Features/List_of_pictures/List_of_pictures';
import { removePicture } from '../../Features/List_of_pictures/List_of_pictures';

import BounceLoader from "react-spinners/ClipLoader";
import { AiFillHeart } from "react-icons/ai";
import { AiFillWarning } from "react-icons/ai";

import './Search_pictures.scss';


const Search_pictures = () => {
    const dispatch = useAppDispatch();
    const Gallery = useAppSelector((state) => state.List_of_pictures.value);
    const [Pictures, setPicture] = useState(Array<string>);
    const [Breed, setBreed] = useState('hound');
    const [Word, setWord] = useState('');
    const [Limit, setLimit] = useState(5);
    const [Error, setError] = useState(false);
    const [Isloading, setIsloading] = useState(true);

    useEffect(() => {
        getImages(Breed)
        .then((data) => updatePictures(data.message))
        .catch(() => ApiError())
    }, [Breed,Limit])

    function updatePictures(list : Array<string> ):void{
        const new_list = list.slice(0,Limit);
        setIsloading(false);
        setPicture(new_list);
        setError(false);
    }

    function ApiError () : void{
        setIsloading(false);
        setError(true) 
    }

    function handleSubmit(event : any) : void {
        event.preventDefault();
      }

    function updateMyGallery (url : string ) : void{
        const picture = {
            id : url,
            url : url
        }
        if(!checkGallery(Gallery, url)){
            dispatch(updateList(picture));
        }
        else{
            dispatch(removePicture(url));
        }    
    }

    function checkGallery (arr : Array< {id : string, url : string}> , id : string) : boolean{
        return arr.some(function(picture) {
            return id === picture.id;
        });
    }
    
    const ShowPictures = () => {
        return (
            Pictures.map((url) => (
                <div className="picture" key={url} onClick={() => updateMyGallery(url)}>
                    <img src={url} className="image" />
                    <AiFillHeart 
                        className= {checkGallery(Gallery, url) === false ? "picture-icon remove_picture" : "picture-icon add_picture"}  />
                </div>
            ))
        )
    }
      
    return (
        <div className="search_pictures">
            <Link to="/Gallery">
                <button className="gallery" >See Your Gallery</button>
            </Link>
            
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" className="input-name" placeholder="Write a name's dog" 
                aria-label='word-input' onChange={(e) => setWord(e.target.value)}/>
                <button className="form-btn" onClick={() => setBreed(Word.toLowerCase())}>Show Dog</button>
            </form>

            <div className="spinner">
                {
                    Isloading 
                    ? 
                    <BounceLoader
                        color="#d29f9f"
                        size={80}
                    />
                    : 
                    ''
                }
            
            </div>

            <div className="Pictures">
                {
                    Error === false 
                    ?
                    ShowPictures()                  
                    :
                    <div className="error-message">
                        <h1 className="message">There are no pictures with this breed</h1>
                        <AiFillWarning className="warning-icon"/>
                    </div>
                    
                }
            </div>

            {
                Error === false 
                ?
                <button className="show_more" onClick={() => setLimit(Limit + 5)}>Show More</button>
                :
                ''
            }
            
        </div>
    )
}

export default Search_pictures;