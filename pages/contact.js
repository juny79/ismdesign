import { useEffect, useRef, useState } from "react";
import styles from "../styles/Contact.module.css";

const COMPANY = {
	name: "이즈엠디자인",
	address: "경기도 화성시 동탄순환대로 127-23 우성에듀파크 702호",
	tel: "031-375-5106",
	fax: "031-375-5106",
};

export default function Contact() {
	const mapRef = useRef(null);
	const [kakaoLoaded, setKakaoLoaded] = useState(false);

	useEffect(() => {
		// Load Kakao Maps SDK dynamically (replace NEXT_PUBLIC_KAKAO_KEY in your env)
		const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_JAVASCRIPT_KEY || "YOUR_KAKAO_MAP_JAVASCRIPT_KEY";
		const src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services`;

		if (typeof window !== "undefined" && !window.kakao) {
			const script = document.createElement("script");
			script.src = src;
			script.async = true;
			script.onload = () => {
				setKakaoLoaded(true);
				initMap();
			};
			script.onerror = () => {
				console.error("Kakao Maps SDK failed to load.");
			};
			document.head.appendChild(script);
		} else if (window.kakao) {
			setKakaoLoaded(true);
			initMap();
		}

		function initMap() {
			if (!mapRef.current || !window.kakao) return;

			const mapContainer = mapRef.current;
			const mapOption = {
				center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
				level: 3,
			};
			const map = new window.kakao.maps.Map(mapContainer, mapOption);
			const geocoder = new window.kakao.maps.services.Geocoder();

			geocoder.addressSearch(COMPANY.address, function (result, status) {
				if (status === window.kakao.maps.services.Status.OK) {
					const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
					const marker = new window.kakao.maps.Marker({
						map: map,
						position: coords,
					});

					const infowindow = new window.kakao.maps.InfoWindow({
						content: `<div style="padding:8px 12px;font-size:14px">${COMPANY.name}</div>`,
					});
					infowindow.open(map, marker);
					map.setCenter(coords);
				} else {
					console.error("주소 검색 실패:", status);
				}
			});
		}

		// cleanup not strictly necessary for SDK script
		return () => {};
	}, []);

	const naverUrl = `https://map.naver.com/v5/search/${encodeURIComponent(COMPANY.address)}`;
	const kakaoUrl = `https://map.kakao.com/link/search/${encodeURIComponent(COMPANY.address)}`;

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>📍 이즈엠디자인 오시는 길</h2>

			<div className={styles.mapSection}>
				<div id="map" ref={mapRef} className={styles.map}>
					{!kakaoLoaded && (
						<div className={styles.mapFallback}>
							지도를 불러오는 중입니다. (Kakao API 키를 설정해주세요)
						</div>
					)}
				</div>

				<aside className={styles.infoBox}>
					<h3>회사 정보</h3>
					<p>
						<strong>회사명:</strong> {COMPANY.name}
					</p>
					<p>
						<strong>주소:</strong> {COMPANY.address}
					</p>
					<p>
						<strong>TEL:</strong> {COMPANY.tel}
					</p>
					<p>
						<strong>FAX:</strong> {COMPANY.fax}
					</p>

					<hr />

					<h4>지도 링크</h4>
					<div className={styles.mapLinks}>
						<a href={naverUrl} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.naver}`}>
							네이버 지도 보기
						</a>
						<a href={kakaoUrl} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.kakao}`}>
							카카오 지도 보기
						</a>
					</div>

					<p className={styles.note}>
						※ 개발 환경: Kakao Maps JavaScript API 키를 `NEXT_PUBLIC_KAKAO_MAP_JAVASCRIPT_KEY` 환경변수에
						설정하세요.
					</p>
				</aside>
			</div>
		</div>
	);
}