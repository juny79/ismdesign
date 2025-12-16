import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* Essential Meta Tags */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Site Title - Must be in Head */}
        <title>ISM Design - 건축 설계 및 포트폴리오</title>
        
        {/* SEO Meta Tags */}
        <meta name="description" content="ISM Design은 건축 설계 및 디자인 전문 회사입니다. 주거, 상업시설 등 다양한 프로젝트의 포트폴리오를 확인하세요." />
        <meta name="keywords" content="건축설계, 건축디자인, 포트폴리오, ISM Design, 이즈엠디자인" />
        <meta name="author" content="ISM Design" />
        <meta name="subject" content="건축 설계 및 포트폴리오" />
        <meta name="theme-color" content="#FF6B35" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="ISM Design - 건축 설계 및 포트폴리오" />
        <meta property="og:description" content="ISM Design은 건축 설계 및 디자인 전문 회사입니다. 주거, 상업시설 등 다양한 프로젝트의 포트폴리오를 확인하세요." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ismdesign.co.kr" />
        <meta property="og:image" content="https://ismdesign.co.kr/ism-logo-new.png" />
        <meta property="og:site_name" content="ISM Design" />
        <meta property="og:locale" content="ko_KR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ISM Design - 건축 설계 및 포트폴리오" />
        <meta name="twitter:description" content="ISM Design은 건축 설계 및 디자인 전문 회사입니다." />
        <meta name="twitter:image" content="https://ismdesign.co.kr/ism-logo-new.png" />
        
        {/* Search Engine Verification */}
        <meta name="naver-site-verification" content="e93a86019ffde87d69d0bce7e96ca6906d3bc09e" />
        <meta name="google-site-verification" content="google_site_verification_code" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://ismdesign.co.kr" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Alternate Language */}
        <link rel="alternate" hrefLang="ko" href="https://ismdesign.co.kr" />
        <link rel="alternate" hrefLang="x-default" href="https://ismdesign.co.kr" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
