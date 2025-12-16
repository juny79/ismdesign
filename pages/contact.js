import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Contact.module.css";

const COMPANY = {
	name: "이즈엠디자인",
	address: "경기도 화성시 동탄순환대로 127-23 우성에듀파크 702호",
	tel: "031-375-5106",
	fax: "031-375-5106",
};

export default function Contact() {
	const mapRef = useRef(null);

	useEffect(() => {
		// 클라이언트 사이드에서만 실행
		if (typeof window === "undefined") return;

		const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_JAVASCRIPT_KEY;

		if (!KAKAO_KEY) {
			console.error("❌ Kakao API key not set");
			return;
		}

		// Kakao SDK 로드 (이미 로드된 경우 skip)
		if (window.kakao && window.kakao.maps) {
			initMap();
			return;
		}

		// SDK 로드
		const script = document.createElement("script");
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services`;
		script.async = true;

		script.onload = () => {
			console.log("✅ Kakao SDK loaded");
			initMap();
		};

		script.onerror = () => {
			console.error("❌ Failed to load Kakao SDK");
		};

		document.head.appendChild(script);

		function initMap() {
			if (!mapRef.current) {
				console.error("❌ Map container not found");
				return;
			}

			try {
				// 지도 생성
				const container = mapRef.current;
				const options = {
					center: new window.kakao.maps.LatLng(37.1916, 127.0764),
					level: 3,
				};
				const map = new window.kakao.maps.Map(container, options);
				console.log("✅ Map initialized successfully");

				// Geocoder로 주소 검색
				const geocoder = new window.kakao.maps.services.Geocoder();

				geocoder.addressSearch(COMPANY.address, (result, status) => {
					if (status === window.kakao.maps.services.Status.OK) {
						console.log("✅ Address search successful");
						const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

						// 마커 생성
						const marker = new window.kakao.maps.Marker({
							map: map,
							position: coords,
						});

						// 인포윈도우
						const infowindow = new window.kakao.maps.InfoWindow({
							content: `<div style="width:180px;text-align:center;padding:10px;font-weight:600;color:#333;font-size:13px;">${COMPANY.name}</div>`,
							removable: true,
						});

						infowindow.open(map, marker);
						map.setCenter(coords);
						console.log("✅ Marker and infowindow displayed");
					} else {
						console.error("❌ Address search failed. Status:", status);
					}
				});
			} catch (error) {
				console.error("❌ Error initializing map:", error.message);
			}
		}
	}, []);

	return (
		<div className={styles.container}>
			<nav className={styles.navbar}>
				<div className={styles.navLeft}>
					<Link href="/" className={styles.logo}>
						<Image
							src="/ism-logo-new.png"
							alt="ISM"
							width={120}
							height={70}
							priority
							className={styles.logoIcon}
						/>
					</Link>
				</div>
				<div className={styles.navRight}>
					<ul className={styles.menu}>
						<li><Link href="/about">About us</Link></li>
						<li><Link href="/portfolio">Portfolio</Link></li>
						<li><Link href="/contact" className={styles.active}>Contact</Link></li>
					</ul>
				</div>
			</nav>

			<div className={styles.mainContent}>
				<div className={styles.content}>
					<h1 className={styles.pageTitle}>CONTACT</h1>

					<div className={styles.contactSection}>
						{/* Left: Info Box */}
						<div className={styles.infoSection}>
							<h2 className={styles.infoTitle}>{COMPANY.name}</h2>

							<div className={styles.infoDetails}>
								<div className={styles.infoGroup}>
									<label className={styles.infoLabel}>주소</label>
									<p className={styles.infoText}>{COMPANY.address}</p>
								</div>

								<div className={styles.infoGroup}>
									<label className={styles.infoLabel}>TEL</label>
									<p className={styles.infoText}>{COMPANY.tel}</p>
								</div>

								<div className={styles.infoGroup}>
									<label className={styles.infoLabel}>FAX</label>
									<p className={styles.infoText}>{COMPANY.fax}</p>
								</div>
							</div>

							<div className={styles.mapButtons}>
								<a 
									href={`https://map.naver.com/v5/search/${encodeURIComponent(COMPANY.address)}`}
									target="_blank" 
									rel="noreferrer" 
									className={`${styles.mapBtn} ${styles.naver}`}
								>
									네이버 지도 보기
								</a>
								<a 
									href={`https://map.kakao.com/link/search/${encodeURIComponent(COMPANY.address)}`}
									target="_blank" 
									rel="noreferrer" 
									className={`${styles.mapBtn} ${styles.kakao}`}
								>
									카카오 지도 보기
								</a>
							</div>
						</div>

						{/* Right: Map */}
						<div ref={mapRef} className={styles.mapContainer} id="map" />
					</div>
				</div>
			</div>
		</div>
	);
}
