import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';


export const SearchBar = ({ onSubmit }: { onSubmit: (query: string) => void }) => {
    const [query, setQuery] = useState('');
    
    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (query.trim() === "") { 
            toast.error('Please enter a search query', { duration: 2000 });
            return;
        }  
        onSubmit(query);
        setQuery('');
        form.reset();
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />

            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={css.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleQuery}
                    />
                </form>
            </header>
        </>
    );
} 