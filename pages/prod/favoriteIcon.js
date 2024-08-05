import Image from 'next/image'
import heart from '/public/prodPic/iconamoon_heart.png'
export default function FavoriteIcon() {
    return (
        <>
            <div className={scss.heartIconBox}>
                <div className={scss.heartIcon}>
                    <Image src={heart} />
                </div>
            </div>
        </>
    )
}
