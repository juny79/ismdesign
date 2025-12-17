import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Portfolio.module.css";

const portfolioProjects = [
  {
    id: 1,
    title: "광주 봉산지구 첨단 제일풍경채",
    category: "Residential",
    year: "2024",
    image: "/portfolio/24_gjbs_113/g1.jpg",
    folder: "24_gjbs_113",
    totalImages: 10,
  },
  {
    id: 2,
    title: "평택 가재지구 쌍용플래티넘",
    category: "Residential",
    year: "2023",
    image: "/portfolio/23_ptgj_113/p1_new.jpg",
    folder: "23_ptgj_113",
    totalImages: 10,
  },
  {
    id: 3,
    title: "하남 감일지구 제일풍경채",
    category: "Residential",
    year: "2022",
    image: "/portfolio/22_hngi_84/h1.jpg",
    folder: "22_hngi_84",
    totalImages: 10,
  },
  {
    id: 4,
    title: "고덕 강일지구 제일풍경채",
    category: "Residential",
    year: "2021",
    image: "/portfolio/21_kdgi_101/k1.jpg",
    folder: "21_kdgi_101",
    totalImages: 10,
  },
  {
    id: 5,
    title: "위례 일상 제일풍경채",
    category: "Residential",
    year: "2020",
    image: "/portfolio/20_wris_77/w1.jpg",
    folder: "20_wris_77",
    totalImages: 10,
  },
];

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>ISM Design - Portfolio | 건축 포트폴리오</title>
        <meta name="description" content="ISM Design(이즈엠디자인)의 건축 포트폴리오. 제일건설 협력업체로서 아파트건축설계, 주거, 상업시설 등 다양한 프로젝트를 확인하세요." />
        <meta name="keywords" content="포트폴리오, 건축설계, 주거, 상업시설, ISM Design, 이즈엠디자인, 제일건설, 제일건설협력업체, 아파트건축설계, 건축사례" />
      </Head>

      {/* 마우스 커서 글로우 */}
      <div 
        className={styles.cursorGlow}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />

      {/* 네비게이션 */}
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
            <li><Link href="/portfolio" className={styles.active}>Portfolio</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section with CAD Animation */}
      <section className={styles.heroSection}>
        <div className={styles.cadBackground}>
          <svg className={styles.cadSvg} viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
            {/* Grid Lines */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(212, 130, 94, 0.1)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="1200" height="600" fill="url(#grid)" />
            
            {/* Animated CAD Lines */}
            <path className={styles.cadLine} d="M100,300 L500,300" stroke="#ff8c5a" strokeWidth="2" fill="none"/>
            <path className={styles.cadLine} d="M500,300 L500,150" stroke="#ff8c5a" strokeWidth="2" fill="none" style={{animationDelay: '0.3s'}}/>
            <path className={styles.cadLine} d="M500,150 L900,150" stroke="#ff8c5a" strokeWidth="2" fill="none" style={{animationDelay: '0.6s'}}/>
            <path className={styles.cadLine} d="M900,150 L900,450" stroke="#ff8c5a" strokeWidth="2" fill="none" style={{animationDelay: '0.9s'}}/>
            <path className={styles.cadLine} d="M900,450 L500,450" stroke="#ff8c5a" strokeWidth="2" fill="none" style={{animationDelay: '1.2s'}}/>
            <path className={styles.cadLine} d="M500,450 L500,300" stroke="#ff8c5a" strokeWidth="2" fill="none" style={{animationDelay: '1.5s'}}/>
            
            {/* Dimension Lines */}
            <line className={styles.dimensionLine} x1="500" y1="130" x2="900" y2="130" stroke="#ffffff" strokeWidth="1" strokeDasharray="5,5"/>
            <circle className={styles.cadDot} cx="500" cy="300" r="4" fill="#ff8c5a"/>
            <circle className={styles.cadDot} cx="900" cy="150" r="4" fill="#ff8c5a" style={{animationDelay: '0.9s'}}/>
            <circle className={styles.cadDot} cx="900" cy="450" r="4" fill="#ff8c5a" style={{animationDelay: '1.2s'}}/>
          </svg>
        </div>
        
        <div className={`${styles.heroContent} ${isLoaded ? styles.fadeIn : ''}`}>
          <h1 className={styles.heroTitle}>Portfolio</h1>
          <p className={styles.heroSubtitle}>혁신적인 공간 설계의 결과물</p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className={styles.portfolioGrid}>
        <div className={styles.gridContainer}>
          {portfolioProjects.map((project, index) => (
            <div
              key={project.id}
              className={`${styles.projectCard} ${isLoaded ? styles.fadeInUp : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={styles.cardImageWrapper}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={styles.cardImage}
                />
                <div className={`${styles.cardOverlay} ${hoveredCard === project.id ? styles.overlayActive : ''}`}>
                  <div className={styles.cardInfo}>
                    <span className={styles.cardCategory}>{project.category}</span>
                    <span className={styles.cardYear}>{project.year}</span>
                  </div>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <div className={styles.cardMeta}>
                  <span>{project.totalImages} Images</span>
                  <span className={styles.viewMore}>View Project →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}