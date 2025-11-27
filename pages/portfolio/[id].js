import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/PortfolioDetail.module.css";

const portfolioData = {
  "24_gjbs_113": {
    title: "광주 봉산공원 첨단 제일풍경채",
    year: "2024",
    client: "봉산공원개발㈜",
    category: "단지내테 인테리어 설계",
    images: Array.from({ length: 10 }, (_, i) => `g${i + 1}.jpg`),
  },
  "23_ptgj_113": {
    title: "평택 가재지구",
    year: "2023",
    client: "평택가재지구프로이하",
    category: "단지내테 인테리어 설계",
    images: Array.from({ length: 10 }, (_, i) => `p${i + 1}_new.jpg`),
  },
  "22_hngi_84": {
    title: "하남 감일지구",
    year: "2022",
    client: "㈜고덕강일3프로이하",
    category: "단지내테 인테리어 설계",
    images: Array.from({ length: 10 }, (_, i) => `h${i + 1}.jpg`),
  },
  "21_kdgi_101": {
    title: "고덕 강일지구",
    year: "2021",
    client: "제일건설㈜",
    category: "단지내테 인테리어 설계",
    images: Array.from({ length: 10 }, (_, i) => `k${i + 1}.jpg`),
  },
  "20_wris_77": {
    title: "위례 일상",
    year: "2020",
    client: "제일건설㈜",
    category: "단지내테 인테리어 설계",
    images: Array.from({ length: 10 }, (_, i) => `w${i + 1}.jpg`),
  },
};

export default function PortfolioDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState(null);

  const project = id ? portfolioData[id] : null;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!project) {
    return (
      <div className={styles.loading}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Mouse Cursor Effect */}
      <div
        className={styles.cursorGlow}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />

      {/* Navigation Bar */}
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
          <Link href="/about" className={styles.backBtn}>
            ← Back to About
          </Link>
        </div>
      </nav>

      {/* Project Header */}
      <div className={styles.projectHeader}>
        <div className={styles.headerContent}>
          <div className={styles.projectMeta}>
            <span className={styles.projectYear}>{project.year}</span>
            <span className={styles.projectCategory}>{project.category}</span>
          </div>
          <h1 className={styles.projectTitle}>{project.title}</h1>
          <p className={styles.projectClient}>{project.client}</p>
        </div>
      </div>

      {/* Image Gallery Grid */}
      <div className={styles.galleryGrid}>
        {project.images.map((image, index) => (
          <div
            key={index}
            className={styles.galleryItem}
            onClick={() => setSelectedImage({ src: `/portfolio/${id}/${image}`, alt: `${project.title} ${index + 1}` })}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={`/portfolio/${id}/${image}`}
                alt={`${project.title} ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.galleryImage}
              />
              <div className={styles.imageOverlay}>
                <span className={styles.viewIcon}>🔍</span>
              </div>
            </div>
            <div className={styles.imageCaption}>
              <span>Image {index + 1}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
          <div className={styles.lightboxClose} onClick={() => setSelectedImage(null)}>
            ✕
          </div>
          <div className={styles.lightboxContent}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              sizes="100vw"
              className={styles.lightboxImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
