import BackendLayout from '@/components/layout/backend'
import Head from 'next/head'
import styles from './index.module.scss';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
export default function List() {
	const [reviews, setReviews] = useState([]);

	const baseURL = 'http://localhost:3005/api/prod/reviews/pending';

	const getPendingReviews = async () => {
		try {
			const res = await fetch(baseURL);
			const data = await res.json();
			console.log(data);

			if (data.status === "success") {
				setReviews(data.pendingReviews);
			} else {
				console.error('獲取評價失敗:', data.message);
			}
		}
		catch (error) {
			console.error('獲取失敗', error);
		}
	}

	useEffect(() => {
		getPendingReviews();
	}, []);

	const handleStatusChange = async (reviewId, newStatus) => {
		try {
			const response = await fetch(`http://localhost:3005/api/prod/reviews/${reviewId}/status`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status: newStatus }),
			});
			const data = await response.json();
			if (data.status === "success") {
				getPendingReviews(); // 重新獲取評價列表
			} else {
				console.error('更新評價狀態失敗:', data.message);
			}
		} catch (error) {
			console.error('更新評價狀態失敗', error);
		}
	};

	return (
		<>
			<BackendLayout>
				<Head>
					<title>Fundodo後台 - 評價管理</title>
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				</Head>
				<div className={styles.hotelPage}>
					<h1>用戶評價列表</h1>
					<table className={styles.Table}>
						<thead>
							<tr>
								<th>商品ID</th>
								<th>用戶暱稱</th>
								<th>評價星數</th>
								<th>評價內容</th>
								<th>圖片</th>
								<th>狀態</th>
								<th>建立日期</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							{reviews.map((review) => (
								<tr key={review.id}>
									<td>{review.product_id}</td>
									<td>{review.username}</td>
									<td>{review.rating}</td>
									<td>{review.review_text}</td>
									<td>
										{review.image_url && (
											<div className={styles.imageContainer}>
												<Image
													src={`http://localhost:3005${review.image_url}`}
													alt="Review Image"
													width={0}
													height={0}
													layout="responsive"
													objectFit="cover"
												/>
											</div>
										)}
									</td>
									<td>{review.status}</td>
									<td>{new Date(review.created_at).toLocaleDateString()}</td>
									<td>
										<button className={styles.btn} onClick={() => handleStatusChange(review.id, 'approved')}><IoIosCheckmarkCircle color='green' size={40} /></button>
										<button className={styles.btn} onClick={() => handleStatusChange(review.id, 'rejected')}><IoMdCloseCircle color='red' size={40} /></button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</BackendLayout>
		</>
	)
}
