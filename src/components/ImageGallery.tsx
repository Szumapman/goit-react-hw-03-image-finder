import { Picture } from "../interfaces/Picture";
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, handleImageClick, onImageLoad }: 
    { images: Picture[], handleImageClick: (image: Picture) => void, onImageLoad: () => void }) => {
    
    return (
        <>
            <ul className={css.ImageGallery}>
                {images.map(image => (
                    <li key={image.webformatURL} className={css.ImageGalleryItem} onClick={() => handleImageClick(image)}>
                        <img src={image.webformatURL} alt={image.tags} onLoad={onImageLoad} className={css.ImageGalleryItemImage} />
                    </li>
                ))}
            </ul>
        </>
    )   
}
