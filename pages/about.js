import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/About.module.css";

const aboutTabs = [
  { id: "intro", name: "회사소개" },
  { id: "performance", name: "연도별 사업실적" },
  { id: "organization", name: "조직도" },
  { id: "vision", name: "비전" },
];

export default function About() {
  const [activeTab, setActiveTab] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 마우스 추적
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={styles.container}>
      {/* 마우스 커서 이펙트 */}
      <div 
        className={styles.cursorGlow}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />
      {/* 상단 네비게이션 바 */}
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
            <li><Link href="/about" className={styles.active}>About us</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* 페이지 타이틀 */}
      <div className={styles.pageHeader}>
        <h1>About Us</h1>
        <p>회사소개</p>
      </div>

      {/* 하위 탭 네비게이션 */}
      <div className={styles.subTabs}>
        {aboutTabs.map((tab, idx) => (
          <button
            key={tab.id}
            className={`${styles.subTab} ${
              idx === activeTab ? styles.activeSubTab : ""
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className={styles.content}>
        {activeTab === 0 && (
          <div className={styles.interactiveSection}>
            {/* Hero Section - 회사 정체성 */}
            <section className={styles.heroSection}>
              <div className={styles.heroBackground}>
                <div className={styles.cadLines}>
                  <svg className={styles.cadSvg} viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
                    <path className={styles.line1} d="M100,400 L1100,400" stroke="#D4825E" strokeWidth="2" fill="none"/>
                    <path className={styles.line2} d="M600,100 L600,700" stroke="#D4825E" strokeWidth="2" fill="none"/>
                    <path className={styles.line3} d="M200,200 L1000,200" stroke="#D4825E" strokeWidth="1" fill="none"/>
                    <path className={styles.line4} d="M200,600 L1000,600" stroke="#D4825E" strokeWidth="1" fill="none"/>
                    <circle className={styles.circle1} cx="600" cy="400" r="150" stroke="#D4825E" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <div className={styles.heroContent}>
                  <h2 className={styles.heroTitle}>당신의 삶을 품는 공간,<br/>마음의 온도를 채웁니다.</h2>
                  <div className={styles.heroSubtitle}>
                    <span className={styles.brandLetter}>I</span>nnovative{" "}
                    <span className={styles.brandLetter}>S</span>pace{" "}
                    <span className={styles.brandLetter}>M</span>aking
                  </div>
                  <p className={styles.heroDescription}>
                    새롭고 혁신적인 공간에 대한<br/>
                    PASSION, CREATIVITY, RESPONSIBILITY
                  </p>
                </div>
              </div>
            </section>

            {/* Stage 1 - CAD 도면 Layer (6단계 프로세스) */}
            <section className={styles.designStage}>
              <div className={styles.stageHeader}>
                <h3>설계 과정</h3>
                <p>고객의 요구부터 완공까지, 정교하게 완성되는 ISM Design의 프로세스</p>
              </div>
              
              <div className={styles.processFlow}>
                <div className={styles.flowLine}>
                  <svg className={styles.flowLineSvg} viewBox="0 0 1200 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50,50 L1150,50" stroke="#D4825E" strokeWidth="3" fill="none" className={styles.progressLine}/>
                    <circle cx="100" cy="50" r="12" fill="#D4825E" className={styles.flowDot} style={{animationDelay: '0s'}}/>
                    <circle cx="300" cy="50" r="12" fill="#D4825E" className={styles.flowDot} style={{animationDelay: '0.2s'}}/>
                    <circle cx="500" cy="50" r="12" fill="#D4825E" className={styles.flowDot} style={{animationDelay: '0.4s'}}/>
                    <circle cx="700" cy="50" r="12" fill="#D4825E" className={styles.flowDot} style={{animationDelay: '0.6s'}}/>
                    <circle cx="900" cy="50" r="12" fill="#D4825E" className={styles.flowDot} style={{animationDelay: '0.8s'}}/>
                    <circle cx="1100" cy="50" r="12" fill="#D4825E" className={styles.flowDot} style={{animationDelay: '1s'}}/>
                  </svg>
                </div>
              </div>

              <div className={styles.layerContainer}>
                <div className={styles.layer} data-layer="1">
                  <div className={styles.layerNumber}>01</div>
                  <div className={styles.layerLabel}>고객사 요구사항 분석</div>
                  <div className={styles.layerVisual}>
                    <Image 
                      src="/about/1_aboutus_require.gif" 
                      alt="고객 요구사항 분석" 
                      width={400} 
                      height={300} 
                      className={styles.layerImage}
                    />
                  </div>
                  <p className={styles.layerDescription}>
                    고객의 니즈를 정확히 파악하고 공간의 목적을 명확히 정의합니다
                  </p>
                </div>

                <div className={styles.layer} data-layer="2">
                  <div className={styles.layerNumber}>02</div>
                  <div className={styles.layerLabel}>반복적인 회의</div>
                  <div className={styles.layerVisual}>
                    <Image 
                      src="/about/2_aboutus_meeting.gif" 
                      alt="반복적인 회의" 
                      width={400} 
                      height={300} 
                      className={styles.layerImage}
                    />
                  </div>
                  <p className={styles.layerDescription}>
                    충분한 소통을 통해 아이디어를 구체화하고 방향성을 수립합니다
                  </p>
                </div>

                <div className={styles.layer} data-layer="3">
                  <div className={styles.layerNumber}>03</div>
                  <div className={styles.layerLabel}>설계 도면 작업</div>
                  <div className={styles.layerVisual}>
                    <Image 
                      src="/about/3_aboutus_work.gif" 
                      alt="설계 도면 작업" 
                      width={400} 
                      height={300} 
                      className={styles.layerImage}
                    />
                  </div>
                  <p className={styles.layerDescription}>
                    전문가의 손길로 정교한 설계 도면을 제작합니다
                  </p>
                </div>

                <div className={styles.layer} data-layer="4">
                  <div className={styles.layerNumber}>04</div>
                  <div className={styles.layerLabel}>설계 도면 결정</div>
                  <div className={styles.layerVisual}>
                    <Image 
                      src="/about/4_aboutus_cad.gif" 
                      alt="설계 도면 결정" 
                      width={400} 
                      height={300} 
                      className={styles.layerImage}
                    />
                  </div>
                  <p className={styles.layerDescription}>
                    최종 CAD 도면을 확정하고 시공을 위한 준비를 완료합니다
                  </p>
                </div>

                <div className={styles.layer} data-layer="5">
                  <div className={styles.layerNumber}>05</div>
                  <div className={styles.layerLabel}>인테리어 완성</div>
                  <div className={styles.layerVisual}>
                    <Image 
                      src="/about/5_aboutus_minus.gif" 
                      alt="인테리어 완성" 
                      width={400} 
                      height={300} 
                      className={styles.layerImage}
                    />
                  </div>
                  <p className={styles.layerDescription}>
                    디테일한 인테리어 요소들이 조화를 이루며 공간이 완성됩니다
                  </p>
                </div>

                <div className={styles.layer} data-layer="6">
                  <div className={styles.layerNumber}>06</div>
                  <div className={styles.layerLabel}>아파트 준공</div>
                  <div className={styles.layerVisual}>
                    <Image 
                      src="/about/6_aboutus_plus.gif" 
                      alt="아파트 준공" 
                      width={400} 
                      height={300} 
                      className={styles.layerImage}
                    />
                  </div>
                  <p className={styles.layerDescription}>
                    고객의 꿈이 현실이 되는 순간, 완벽한 공간이 탄생합니다
                  </p>
                </div>
              </div>
            </section>

            {/* Philosophy Section */}
            <section className={styles.philosophySection}>
              <div className={styles.philosophyContent}>
                <h3>ISM Design Philosophy</h3>
                <div className={styles.philosophyGrid}>
                  <div className={styles.philosophyItem}>
                    <div className={styles.philosophyIcon}>🎨</div>
                    <h4>당신이 꿈꾸던 행복, 그 이상의 가치를 실현합니다</h4>
                    <p>공간의 기능과 형태에 대한 새로운 접근으로 디자인 가치의 극대화를 추구합니다</p>
                  </div>
                  <div className={styles.philosophyItem}>
                    <div className={styles.philosophyIcon}>💬</div>
                    <h4>충분한 소통을 통해 디자인을 현실화합니다</h4>
                    <p>인간 중심의 공간 창조는 인간의 삶을 만족시키며 더 나은 생활을 영위하게 합니다</p>
                  </div>
                  <div className={styles.philosophyItem}>
                    <div className={styles.philosophyIcon}>🚀</div>
                    <h4>끊임없는 변화와 발전으로 미래를 향해 성장하겠습니다</h4>
                    <p>공간이 그 이상의 가치를 가질 수 있다는 것을 목표로 발전합니다</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 1 && (
          <div className={styles.section}>
            <h2>연도별 사업실적</h2>
            <p className={styles.historyIntro}>
              ISM Design은 독창적 디자인의 우월성을 확보하고 국제적 경쟁력을 갖춘 디자인 전문가 그룹으로 성장하고 있습니다.
            </p>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineYear}>2025</div>
                <div className={styles.timelineContent}>
                  <ul>
                    <li>진행 예정 프로젝트</li>
                  </ul>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineYear}>2024</div>
                <div className={styles.timelineContent}>
                  <ul>
                    <li>광주 봉산지구 첨단 제일풍경채 [청라래미안] 디자인</li>
                    <li>평택 가재지구 2블럭 제일풍경채 [힐스테이트] 디자인</li>
                  </ul>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineYear}>2023</div>
                <div className={styles.timelineContent}>
                  <ul>
                    <li>양양 구교리 금호어울림 [청량리역 한양수자인] 그라시엘</li>
                    <li>경산 하양지구 제일풍경채 [행정안전부장관상]</li>
                  </ul>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineYear}>2022</div>
                <div className={styles.timelineContent}>
                  <ul>
                    <li>고덕 강일지구 1블럭 제일풍경채 [롯데캐슬] 디자인</li>
                    <li>LH 주공불광점 최우수상 [김포 한강신도시 베트로타워 에이치]</li>
                  </ul>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineYear}>2021</div>
                <div className={styles.timelineContent}>
                  <ul>
                    <li>ISM Design 창립 15주년</li>
                    <li>베트남지사 설립</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className={styles.section}>
            <h2>조직도</h2>
            <div className={styles.orgChart}>
              <div className={styles.orgLevel}>
                <div className={styles.orgBox}>대표이사</div>
              </div>
              <div className={styles.orgLevel}>
                <div className={styles.orgBox}>설계팀</div>
                <div className={styles.orgBox}>영업팀</div>
                <div className={styles.orgBox}>관리팀</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className={styles.sectionWithBg}>
            <div className={styles.visionOverlay}>
              <h2>비전</h2>
              <p>최고의 디자인으로 고객의 삶의 질을 향상시키는 것이 우리의 목표입니다.</p>
              <ul className={styles.visionList}>
                <li>혁신적인 디자인 솔루션 제공</li>
                <li>고객 만족도 최우선</li>
                <li>지속 가능한 디자인 추구</li>
                <li>전문성과 창의성의 조화</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}