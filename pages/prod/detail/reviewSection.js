import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import StarRating from './StarRating.js'
import ReviewModal from './reviewModal';
import scss from './reviewSection.module.scss';
import Image from 'next/image.js';
import Modal from '@/components/common/modal/index.js'

export default function ReviewSection({ productId }) {
	const { user } = useContext(AuthContext);
	const [reviews, setReviews] = useState([]);
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState({ title: '', message: '' });


	useEffect(() => {
		fetchReviews();
	}, [productId]);

	const fetchReviews = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(`http://localhost:3005/api/prod/reviews/${productId}`);
			const data = await response.json();
			if (data.status === "success") {
				setReviews(data.reviews);
			} else {
				console.error('獲取評論失敗:', data.message);
			}
			setReviews(data.reviews);
		} catch (error) {
			console.error('Error fetching reviews:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const calculateAverageRating = () => {
		if (reviews.length === 0) return 5; // 如果沒有評論，返回預設值 5
		const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
		return sum / reviews.length;
	};

	const averageRating = calculateAverageRating();

	const handleWriteReview = () => {
		if (!user) {
			// 導向登入頁面
			displayModal('您尚未登入', '請先登入再評論')
			window.location.href = '/member/login';
		} else {
			setIsReviewModalOpen(true);
		}
	};

	const handleCloseReviewModal = () => {
		setIsReviewModalOpen(false);
	};

	const handleSubmitReview = async (reviewData) => {
		try {
			const formData = new FormData();
			formData.append('rating', reviewData.rating);
			formData.append('review_text', reviewData.review_text);
			formData.append('productId', productId);
			formData.append('userId', user.id);
			formData.append('userName', user.nickname);

			if (reviewData.image) {
				formData.append('image', reviewData.image);
			}

			const response = await fetch('http://localhost:3005/api/prod/reviews', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				},
				body: formData
			});
			const data = await response.json();
			if (data.success) {
				handleCloseReviewModal();
				alert('評論已送出，等待管理員審核。');
				fetchReviews(); // 重新獲取評論以更新列表
			}
		} catch (error) {
			console.error('Error submitting review:', error);
		}
	};

	if (isLoading) {
		return <div>載入中...</div>;
	}

	const displayModal = (title, message) => {
		setModalContent({ title, message });
		setShowModal(true);
	};

	return (
		<>
			<div className={scss.reviewSection}>
				<h2>商品評價</h2>
				<div className={scss.averageRating}>
					<StarRating rating={averageRating} />
					<span>{averageRating.toFixed(1)} / 5</span>
				</div>
				<button onClick={handleWriteReview} className={scss.writeReviewBtn}>
					寫評論
				</button>
				<div className={scss.reviewList}>
					{reviews.map((review) => (
						<div key={review.id} className={scss.reviewItem}>
							<StarRating rating={review.rating} />
							<p className={scss.reviewText}>{review.review_text}</p>
							{review.image_url && (
								<Image src={`http://localhost:3005${review.image_url}`} width={100} height={80} alt="Review" className={scss.reviewImage} />
							)}
							<p className={scss.reviewMeta}>
								{review.username} - {new Date(review.created_at).toLocaleDateString()}
							</p>
						</div>
					))}
				</div>
				<ReviewModal
					isOpen={isReviewModalOpen}
					onClose={handleCloseReviewModal}
					onSubmit={handleSubmitReview}
					productId={productId}
					userId={user ? user.id : null}
					userName={user ? user.nickname : null}
				/>
				<Modal
					mode={1}
					active={showModal}
					onClose={() => setShowModal(false)}
				>
					<h4>{modalContent.title}</h4>
					<p>{modalContent.message}</p>
				</Modal>
			</div>
		</>
	)
}