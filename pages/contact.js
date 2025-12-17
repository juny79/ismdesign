import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Contact.module.css";

const COMPANY = {
	name: "이즈엠디자인",
	address: "경기도 화성시 동탄순환대로 127-23 우성에듀파크 702호",
	tel: "031-375-5106",
	fax: "031-375-5106",
};

export default function Contact() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Contact | ISM Design / 이즈엠디자인</title>
				<meta name="description" content="ISM Design 연락처. 경기도 화성시 동탄순환대로 127-23 우성에듀파크 702호" />
				<meta name="keywords" content="연락처, 상담, ISM Design, 이즈엠디자인" />
				<meta property="og:title" content="Contact | ISM Design" />
				<meta property="og:description" content="ISM Design 연락처. 경기도 화성시 동탄순환대로 127-23" />
			</Head>

			<nav className={styles.navbar}>
				<div className={styles.navLeft}>
					<Link href="/" className={styles.logo}>
						<img
							src="/ism-logo-new.png"
							alt="ISM"
							width={120}
							height={70}
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

						{/* Right: Map Image */}
						<div className={styles.mapContainer}>
							<img
								src="/company-map.png"
								alt="ISM Design 위치"
								className={styles.mapImage}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
