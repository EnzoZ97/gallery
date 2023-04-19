import { useAppSelector, useAppDispatch } from '../../App/Hook';
import { Link } from 'react-router-dom';
import { removePicture } from '../../Features/List_of_pictures/List_of_pictures';
import { AiFillWarning } from "react-icons/ai";

import './Gallery.scss'

const Gallery = () => {
    const dispatch = useAppDispatch();
    const Gallery = useAppSelector((state) => state.List_of_pictures.value);

    function updateGallery ( id : string ) : void{
        dispatch(removePicture(id))
    }

    return (
        <div className="Gallery">   
            <h1 className="title">My Gallery</h1>

            {
                Gallery.length === 0
                ?
                <div className="error">
                    <h1 className="message">There are no pictures in your gallery</h1>
                    <AiFillWarning className="icon"/>
                </div>
                : 
                <div className="list">
                        {
                            Gallery.map((elem) => (
                                <div className="picture" key={elem.id}>
                                    <img src={elem.url} className="image"  />
                                    <div className="btn-box" onClick={() => updateGallery(elem.id)}>
                                        <button className="btn">Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }

            <Link to="/">
                <button className="btn-go-back">Go back</button>
            </Link>

           
        </div>
    )
}

export default Gallery;