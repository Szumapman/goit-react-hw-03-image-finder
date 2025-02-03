import { useEffect, useState } from "react";
import { Picture } from "../interfaces/Picture";
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, perPage, handleImageClick, setIsGalleryLoading }: 
    { images: Picture[], perPage: number, handleImageClick: (image: Picture) => void, setIsGalleryLoading: React.Dispatch<React.SetStateAction<boolean>> }) => {
    
    const [loadedImages, setLoadedImages] = useState(0);

    useEffect(() => {
        if (images.length <= perPage) {
            setLoadedImages(0);
        }
        setIsGalleryLoading(true);
    } , [images, perPage]);
    
    const handleImageLoad = () => {
        setLoadedImages(prevLoadedImages => prevLoadedImages + 1);
        if (loadedImages === images.length - 1) {
            setIsGalleryLoading(false);
        }
    };
    
    return (
        <>
            <ul className={css.ImageGallery}>
                {images.map(image => (
                    <li key={image.webformatURL} className={css.ImageGalleryItem} onClick={() => handleImageClick(image)}>
                        <img src={image.webformatURL} alt={image.tags} onLoad={handleImageLoad} className={css.ImageGalleryItemImage} />
                    </li>
                ))}
            </ul>
        </>
    )   
}
