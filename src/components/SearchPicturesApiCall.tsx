import { useQuery } from "@tanstack/react-query";
import { Picture } from "../interfaces/Picture";
import { getPixabayPictures } from "../utils/GetPixabayPictures";
import { useState, useEffect, useRef } from "react";
import { SearchBar } from "./SearchBar";
import { ButtonLoadMore } from "./ButtonLoadMore";
import { ImageGallery } from "./ImageGallery";
import { BallTriangle } from 'react-loader-spinner'
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import css from './SearchPicturesApiCall.module.css'
import toast, { Toaster } from 'react-hot-toast';

export const SearchPicturesApiCall = () => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [perPage] = useState(12);
    const [pictures, setPictures] = useState<Picture[]>([])
    const [isMorePictures, setIsMorePictures] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const { data, error, refetch } = useQuery({
        queryKey: ['pictures', query, page, perPage],
        queryFn: () => getPixabayPictures({ query, page, perPage }),
        enabled: false
    });

    const picturesEndRef = useRef<HTMLDivElement | null>(null);
    
    
    
    useEffect(() => {
        if (query) {
            setLoading(true);
            refetch();
        }
    }, [query, page, refetch]);

    useEffect(() => {
        setPictures([]);
        setPage(1);
        setIsMorePictures(false);
        setLoading(false);
    }, [query]);

    useEffect(() => {
        if (data && !error) {
            if (page === 1) {
                setPictures(data.hits);
            } else {
                setPictures(prevPictures => {
                    const newPictures = [...prevPictures, ...data.hits];
                    setTimeout(() => {
                        picturesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 500); 
                    return newPictures;
                });
            }
            setIsMorePictures(page * perPage < data.totalHits);
            setLoading(false);
            if (data.hits.length === 0) {
                toast.error('No images found', { duration: 2000 });
            }
        }
    }, [data, error]);

    const handlePictureClick = (image: Picture) => {
        const instance = basicLightbox.create(`<img src="${image.largeImageURL}">`);
        instance.show();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                instance.close();
                document.removeEventListener('keydown', handleKeyDown);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <SearchBar onSubmit={setQuery} />
            <div className={css.App}>
                {error && <p>Error</p>}
                <div>
                    {query && <ImageGallery images={pictures} handleImageClick={handlePictureClick} />}
                    <div ref={picturesEndRef}></div>
                </div>
                {loading && <BallTriangle height={100} width={100} radius={5} color="#4fa94d" ariaLabel="ball-triangle-loading" />}
                {data && !loading && !error && isMorePictures && (
                    <ButtonLoadMore onClick={() => setPage(prevPage => prevPage + 1)} />
                )}
            </div>
        </>
    )
}