import css from './ButtonLoadMore.module.css'

export const ButtonLoadMore = ({ onClick }: { onClick: () => void }) => {
    return (
        <button onClick={onClick} className={css.Button}>Load more</button>
    )
}