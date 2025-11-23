import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/MainPortfolio.module.css";

// 최근 시행 프로젝트별 이미지 데이터
const categories = [
  {
    id: "gwangju",
    name: "광주 봉산지구 첨단 제일풍경채",
    images: [
      { image: "/portfolio/p1_new.jpg" },
      { image: "/portfolio/p2_new.jpg" },
    ],
  },
  {
    id: "pyeongtaek",
    name: "평택 가재지구 2블럭 제일풍경채",
    images: [
      { image: "/portfolio/p3_new.jpg" },
      { image: "/portfolio/p4_new.jpg" },
    ],
  },
  {
    id: "yangyang",
    name: "양양 구교리 금호어울림",
    images: [
      { image: "/portfolio/p5_new.jpg" },
      { image: "/portfolio/p6_new.jpg" },
    ],
  },
  {
    id: "gyeongsan",
    name: "경산 하양지구 제일풍경채",
    images: [
      { image: "/portfolio/p7_new.jpg" },
      { image: "/portfolio/p8_new.jpg" },
    ],
  },
  {
    id: "godeok",
    name: "고덕 강일지구 1블럭 제일풍경채",
    images: [
      { image: "/portfolio/p9_new.jpg" },
      { image: "/portfolio/p10_new.jpg" },
    ],
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImages = categories[activeCategory].images;

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
