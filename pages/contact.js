import { useEffect, useRef, useState } from "react";
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
	const [debugInfo, setDebugInfo] = useState({
		sdkLoaded: false,
		apiKeyPresent: false,
		mapInitialized: false,
		error: null,
		hostname: "",
	});

	useEffect(() => {
		if (typeof window === "undefined") return;

		const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_JAVASCRIPT_KEY;

		// Debug: Check API key
		if (!KAKAO_KEY) {
			const msg =
				"❌ Kakao API key not set. Add NEXT_PUBLIC_KAKAO_MAP_JAVASCRIPT_KEY to .env.local or Vercel env vars";
			console.warn(msg);
			setDebugInfo((prev) => ({
				...prev,
				apiKeyPresent: false,
				error: msg,
				hostname: window.location.hostname,
			}));
			return;
		}

		setDebugInfo((prev) => ({ ...prev, apiKeyPresent: true, hostname: window.location.hostname }));
		console.log("✅ API Key detected:", KAKAO_KEY.substring(0, 8) + "***");
		console.log("Current domain:", window.location.hostname);
		console.log("Current protocol:", window.location.protocol);

		// Load Kakao SDK only if not already loaded
		if (!window.kakao) {
			const script = document.createElement("script");
			const sdkUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services`;
			script.src = sdkUrl;
			script.async = true;

			console.log("Loading Kakao SDK from:", sdkUrl);

			script.onload = () => {
				console.log("✅ Kakao SDK loaded successfully");
				setDebugInfo((prev) => ({ ...prev, sdkLoaded: true }));
				initMap();
			};

			script.onerror = (event) => {
				// More detailed error information
				const errorDetails = {
					type: event.type,
					target: event.target?.src,
					readyState: event.target?.readyState,
				};

				const msg = `❌ Kakao SDK failed to load.
Details: ${JSON.stringify(errorDetails)}

🔴 주요 원인:
1️⃣ Kakao Console에 도메인 미등록 (평가판 앱은 localhost만 가능)
2️⃣ API 키 유효하지 않음
3️⃣ Web 플랫폼 미등록
4️⃣ Maps API 서비스 비활성화

✅ 해결 절차:
→ https://developers.kakao.com/console 접속
→ 앱 선택 → '앱 설정' → '플랫폼' 탭
→ Web 추가 후 도메인 등록 (localhost:3000, 127.0.0.1:3000)
→ '제품' → 'Maps API' → '활성화'
→ 2-3분 후 새로고침`;

				console.error(msg);
				console.error("Full error event:", event);
				setDebugInfo((prev) => ({ ...prev, error: msg }));
			};

			document.head.appendChild(script);
		} else {
			console.log("✅ Kakao SDK already loaded");
			setDebugInfo((prev) => ({ ...prev, sdkLoaded: true }));
			initMap();
		}

		function initMap() {
			if (!mapRef.current) {
				console.error("❌ Map ref not available");
				setDebugInfo(prev => ({...prev, error: "Map container not found"}));
				return;
			}

			if (!window.kakao) {
				console.error("❌ Window.kakao not available");
				return;
			}

			try {
				const mapContainer = mapRef.current;
				const mapOption = {
					center: new window.kakao.maps.LatLng(37.1916, 127.0764),
					level: 3,
				};

				const map = new window.kakao.maps.Map(mapContainer, mapOption);
				console.log("✅ Map initialized");
				setDebugInfo(prev => ({...prev, mapInitialized: true}));

				const geocoder = new window.kakao.maps.services.Geocoder();

				geocoder.addressSearch(COMPANY.address, (result, status) => {
					if (status === window.kakao.maps.services.Status.OK) {
						console.log("✅ Address search successful:", result);
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
						const msg = `❌ Address search failed. Status: ${status}. Geocoding service may not be enabled in Kakao Console.`;
						console.error(msg);
						setDebugInfo(prev => ({...prev, error: msg}));
					}
				});
			} catch (err) {
				const msg = `❌ Error initializing map: ${err.message}`;
				console.error(msg);
				setDebugInfo(prev => ({...prev, error: msg}));
			}
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

					{/* Debug Info */}
					{(debugInfo.error || !debugInfo.mapInitialized) && (
						<div className={styles.debugContainer}>
							<div className={styles.debugHeader}>🔍 진단 정보 (로컬: {debugInfo.hostname})</div>
							<div className={styles.debugRow}>
								<span className={styles.debugLabel}>API 키 설정:</span>
								<span className={debugInfo.apiKeyPresent ? styles.success : styles.error}>
									{debugInfo.apiKeyPresent ? "✅ 정상" : "❌ 미설정"}
								</span>
							</div>
							<div className={styles.debugRow}>
								<span className={styles.debugLabel}>SDK 로드:</span>
								<span className={debugInfo.sdkLoaded ? styles.success : styles.error}>
									{debugInfo.sdkLoaded ? "✅ 완료" : "⏳ 진행 중"}
								</span>
							</div>
							<div className={styles.debugRow}>
								<span className={styles.debugLabel}>지도 초기화:</span>
								<span className={debugInfo.mapInitialized ? styles.success : styles.error}>
									{debugInfo.mapInitialized ? "✅ 완료" : "⏳ 진행 중"}
								</span>
							</div>
							{debugInfo.error && (
								<div className={styles.errorMessage}>{debugInfo.error}</div>
							)}
						</div>
					)}

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
		</div>
	);
}
