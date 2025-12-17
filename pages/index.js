import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/MainPortfolio.module.css";

// 최근 시행 프로젝트별 이미지 데이터
const categories = [
  {
    id: "gwangju",
    name: "광주 봉산지구 제일풍경채",
    images: [
      { image: "/portfolio/24_gjbs_113/g1.jpg" },
      { image: "/portfolio/24_gjbs_113/g2.jpg" },
      { image: "/portfolio/24_gjbs_113/g3.jpg" },
      { image: "/portfolio/24_gjbs_113/g4.jpg" },
      { image: "/portfolio/24_gjbs_113/g5.jpg" },
      { image: "/portfolio/24_gjbs_113/g6.jpg" },
      { image: "/portfolio/24_gjbs_113/g7.jpg" },
      { image: "/portfolio/24_gjbs_113/g8.jpg" },
      { image: "/portfolio/24_gjbs_113/g9.jpg" },
      { image: "/portfolio/24_gjbs_113/g10.jpg" },
    ],
  },
  {
    id: "pyeongtaek",
    name: "평택 가재지구 쌍용플래티넘",
    images: [
      { image: "/portfolio/23_ptgj_113/p1_new.jpg" },
      { image: "/portfolio/23_ptgj_113/p2_new.jpg" },
      { image: "/portfolio/23_ptgj_113/p3_new.jpg" },
      { image: "/portfolio/23_ptgj_113/p4_new.jpg" },
      { image: "/portfolio/23_ptgj_113/p5_new.jpg" },
      { image: "/portfolio/23_ptgj_113/p6_new.jpg" },
      { image: "/portfolio/23_ptgj_113/p7_new.jpg" },
      { image: "/portfolio/23_ptgj_113/p8_new.jpg" },
      { image: "/portfolio/23_ptgj_113/p9_new.jpg" },
      { image: "/portfolio/23_ptgj_113/p10_new.jpg" },
    ],
  },
  {
    id: "hanam",
    name: "하남 감일지구 제일풍경채",
    images: [
      { image: "/portfolio/22_hngi_84/h1.jpg" },
      { image: "/portfolio/22_hngi_84/h2.jpg" },
      { image: "/portfolio/22_hngi_84/h3.jpg" },
      { image: "/portfolio/22_hngi_84/h4.jpg" },
      { image: "/portfolio/22_hngi_84/h5.jpg" },
      { image: "/portfolio/22_hngi_84/h6.jpg" },
      { image: "/portfolio/22_hngi_84/h7.jpg" },
      { image: "/portfolio/22_hngi_84/h8.jpg" },
      { image: "/portfolio/22_hngi_84/h9.jpg" },
      { image: "/portfolio/22_hngi_84/h10.jpg" },
    ],
  },
  {
    id: "kodeok",
    name: "고덕 강일지구 제일풍경채",
    images: [
      { image: "/portfolio/21_kdgi_101/k1.jpg" },
      { image: "/portfolio/21_kdgi_101/k2.jpg" },
      { image: "/portfolio/21_kdgi_101/k3.jpg" },
      { image: "/portfolio/21_kdgi_101/k4.jpg" },
      { image: "/portfolio/21_kdgi_101/k5.jpg" },
      { image: "/portfolio/21_kdgi_101/k6.jpg" },
      { image: "/portfolio/21_kdgi_101/k7.jpg" },
      { image: "/portfolio/21_kdgi_101/k8.jpg" },
      { image: "/portfolio/21_kdgi_101/k9.jpg" },
      { image: "/portfolio/21_kdgi_101/k10.jpg" },
    ],
  },
  {
    id: "wirye",
    name: "위례 일상 제일풍경채",
    images: [
      { image: "/portfolio/20_wris_77/w1.jpg" },
      { image: "/portfolio/20_wris_77/w2.jpg" },
      { image: "/portfolio/20_wris_77/w3.jpg" },
      { image: "/portfolio/20_wris_77/w4.jpg" },
      { image: "/portfolio/20_wris_77/w5.jpg" },
      { image: "/portfolio/20_wris_77/w6.jpg" },
      { image: "/portfolio/20_wris_77/w7.jpg" },
      { image: "/portfolio/20_wris_77/w8.jpg" },
      { image: "/portfolio/20_wris_77/w9.jpg" },
      { image: "/portfolio/20_wris_77/w10.jpg" },
    ],
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const currentImages = categories[activeCategory].images;

  // 마우스 추적
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
    }, 3000); // 3초마다 이미지 전환

    return () => clearInterval(interval);
  }, [currentImages.length]);

  // 카테고리 변경 시 슬라이드 인덱스 초기화
  const handleCategoryChange = (categoryIndex) => {
    setActiveCategory(categoryIndex);
    setCurrentIndex(0);
  };

  return (
    <div className={styles.sliderContainer}>
      <Head>
        <title>ISM Design | 아파트 건축설계 전문</title>
        <meta name="description" content="ISM Design은 제일건설 협력업체로서 아파트 건축설계를 전문으로 하는 회사입니다. 광주, 평택, 하남 등 다양한 프로젝트 포트폴리오를 확인하세요." />
        <meta name="keywords" content="건축설계, 건축디자인, 포트폴리오, ISM Design, 이즈엠디자인, 아파트건축설계, 제일건설, 제일건설협력업체, 주거설계, 건축전문회사" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ISM Design | 아파트 건축설계 전문" />
        <meta property="og:description" content="ISM Design은 제일건설 협력업체로서 아파트 건축설계를 전문으로 하는 회사입니다. 광주, 평택, 하남 등 다양한 프로젝트 포트폴리오를 확인하세요." />
        <meta property="og:url" content="https://ismdesign.co.kr" />
        <meta property="og:image" content="https://ismdesign.co.kr/ism-logo-new.png" />
        <meta property="og:site_name" content="ISM Design" />
        <meta property="og:locale" content="ko_KR" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ISM Design | 아파트 건축설계 전문" />
        <meta name="twitter:description" content="ISM Design은 제일건설 협력업체로서 아파트 건축설계를 전문으로 하는 회사입니다." />
        <meta name="twitter:image" content="https://ismdesign.co.kr/ism-logo-new.png" />
        <meta name="twitter:domain" content="ismdesign.co.kr" />
      </Head>

      {/* 마우스 커서 이펙트 */}
      <div 
        className={styles.cursorGlow}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />
      
      {/* 네비게이션 바 (로고 + 카테고리) */}
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
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>

      <div className={styles.slider}>
        <Image
          src={currentImages[currentIndex].image}
          alt={`Portfolio image ${currentIndex + 1}`}
          fill
          className={styles.heroImage}
          priority
        />
        <div className={styles.sliderOverlay}>
          {/* 슬라이더 타이틀 제거 */}
        </div>
      </div>
      
      {/* 하단 카테고리 탭 네비게이션 */}
      <div className={styles.categoryTabs}>
        {categories.map((category, idx) => (
          <button
            key={category.id}
            className={`${styles.categoryTab} ${
              idx === activeCategory ? styles.activeTab : ""
            }`}
            onClick={() => handleCategoryChange(idx)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className={styles.indicators}>
        {currentImages.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.indicator} ${
              idx === currentIndex ? styles.active : ""
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}
