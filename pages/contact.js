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
		if (typeof window === "undefined") return;

		const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_JAVASCRIPT_KEY;
		if (!KAKAO_KEY) {
			console.warn("Kakao API key not set");
			return;
		}

		// Load Kakao SDK only if not already loaded
		if (!window.kakao) {
			const script = document.createElement("script");
			script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services`;
			script.async = true;
			script.onload = initMap;
			script.onerror = () => console.error("Kakao Maps SDK failed to load");
			document.head.appendChild(script);
		} else {
			initMap();
		}

		function initMap() {
			if (!mapRef.current || !window.kakao) return;

			const mapContainer = mapRef.current;
			const mapOption = {
				center: new window.kakao.maps.LatLng(37.1916, 127.0764),
				level: 3,
			};

			const map = new window.kakao.maps.Map(mapContainer, mapOption);
			const geocoder = new window.kakao.maps.services.Geocoder();

			geocoder.addressSearch(COMPANY.address, (result, status) => {
				if (status === window.kakao.maps.services.Status.OK) {
					const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

					const marker = new window.kakao.maps.Marker({
						map: map,
						position: coords,
					});

					const infowindow = new window.kakao.maps.InfoWindow({
						content: `<div style="width:180px;text-align:center;padding:10px;font-weight:600;color:#333;font-size:13px;">${COMPANY.name}</div>`,
						removable: true,
					});

					infowindow.open(map, marker);
					map.setCenter(coords);
				} else {
					console.error("Address search failed:", status);
				}
			});
		}
	}, []);

	const naverUrl = `https://map.naver.com/v5/search/${encodeURIComponent(COMPANY.address)}`;
	const kakaoUrl = `https://map.kakao.com/link/search/${encodeURIComponent(COMPANY.address)}`;

	return (
		<div className={styles.container}>
			<nav className={styles.navbar}>
				<div className={styles.navLeft}>
					<Link href="/" className={styles.logo}>
						<Image
							src="/ism-logo-new.png"
							alt="ISM"
							width={100}
							height={60}
							priority
						/>
					</Link>
				</div>
				<div className={styles.navRight}>
					<Link href="/about" className={styles.navLink}>ABOUT</Link>
					<Link href="/portfolio" className={styles.navLink}>PORTFOLIO</Link>
					<span className={styles.navLink} style={{ color: "#ff8c5a" }}>CONTACT</span>
				</div>
			</nav>

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
							<a href={naverUrl} target="_blank" rel="noreferrer" className={`${styles.mapBtn} ${styles.naver}`}>
								네이버 지도 보기
							</a>
							<a href={kakaoUrl} target="_blank" rel="noreferrer" className={`${styles.mapBtn} ${styles.kakao}`}>
								카카오 지도 보기
							</a>
						</div>
					</div>

					{/* Right: Map */}
					<div ref={mapRef} className={styles.mapContainer} id="map" />
				</div>
			</div>
		</div>
	);
}
}