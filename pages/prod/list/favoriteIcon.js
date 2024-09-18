import { useState, useEffect, useContext } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Modal from '@/components/common/modal';
import useLocalStorage from '@/hooks/use-localstorage.js';

export default function FavoriteIcon({ className = {}, size = 24, style = {}, productId, productData }) {
	const [isFavorite, setIsFavorite] = useState(false);
	const { user, loading } = useContext(AuthContext);
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState({ title: '', message: '', mode: 1, style: 1 });	
	const router = useRouter();
	const [_, setValue] = useLocalStorage('redirFrom', '');

	useEffect(() => {
		if (user) {
			checkIfFavorite();
		}
	}, [user, productId]);

	const checkIfFavorite = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				console.error('No token found');
				return;
			}


			const response = await fetch(`http://localhost:3005/api/prod/check/${productId}`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});

			if (response.status === 401) {
				// 可能需要在這裡處理登出邏輯
				return;
			}

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setIsFavorite(data.isFavorite);
		} catch (error) {
			console.error('檢查收藏狀態失敗:', error);
		}
	};

	const toggleFavorite = async () => {
		if (loading) return;

		if (!user) {
			displayModal('請先登入', '請先登入以收藏商品', 2, 1);
			return;
		}

		try {
			const token = localStorage.getItem('token');
			if (!token) {
				displayModal('未找到登入信息', '請重新登入', 2, 1);
				return;
			}

			const response = await fetch(`http://localhost:3005/api/prod`, {
				method: isFavorite ? 'DELETE' : 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({ productId, productData })
			});

			if (response.status === 401) {
				displayModal('登入已過期', '請重新登入', 2, 1);
				return;
			}

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			setIsFavorite(!isFavorite);
			displayModal('成功', result.message, 1, 1);
		} catch (error) {
			console.error('收藏操作失敗:', error);
			displayModal('錯誤', '操作失敗，請稍後再試', 1, 2);
		}
	};

	const displayModal = (title, message, mode = 1, style = 1) => {
		setModalContent({ title, message, mode, style });
		setShowModal(true);
	};

	const handleModalClose = () => {
		setShowModal(false);
		if (modalContent.mode === 2 && !user) {
			setValue(router.pathname);
			router.push('/member/login');
		}
	};

	const handleModalConfirm = () => {
		setShowModal(false);
		if (!user) {
			setValue(router.pathname);
			router.push('/member/login');
		}
	};
	return (
		<>
			<div
				className={className}
				onClick={toggleFavorite}
				style={{ fontSize: size, ...style, cursor: 'pointer' }}
			>
				{isFavorite ? <FaHeart color="#B9A399" /> : <FaRegHeart />}
			</div>
			<Modal
				mode={modalContent.mode}
				style={modalContent.style}
				active={showModal}
				onClose={handleModalClose}
				onConfirm={handleModalConfirm}
				confirmText="確定"
				cancelText="取消"
			>
				<h4>{modalContent.title}</h4>
				<p>{modalContent.message}</p>
			</Modal>
		</>

	);
}