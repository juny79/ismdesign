import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image src="/logo.jpg" alt="제일풍경채 로고" width={200} height={120}/>
        <h1>이즈엠 디자인</h1>
        <p>제일건설 · 제일풍경채 아파트 전문 실내 인테리어 설계사</p>
      </header>
    </div>
  );
}
