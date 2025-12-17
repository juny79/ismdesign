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
        <title>ISM Design | 이즈엠디자인 - 아파트 건축설계</title>
        
        {/* SEO Meta Tags */}
        <meta name="description" content="ISM Design(이즈엠디자인). 아파트 건축설계 전문 회사입니다. 제일건설 협력업체." />
        <meta name="keywords" content="건축설계, 건축디자인, 포트폴리오, ISM Design, 이즈엠디자인, 아파트건축설계, 제일건설, 제일건설협력업체, 주거설계, 건축전문회사, 건축회사" />
        <meta name="author" content="ISM Design" />
        <meta name="subject" content="아파트 건축설계" />
        <meta name="theme-color" content="#FF6B35" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="ISM Design | 이즈엠디자인" />
        <meta property="og:description" content="아파트 건축설계 전문 회사. 제일건설 협력업체입니다." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ismdesign.co.kr" />
        <meta property="og:image" content="https://ismdesign.co.kr/ism-logo-new.png" />
        <meta property="og:site_name" content="ISM Design" />
        <meta property="og:locale" content="ko_KR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ISM Design | 이즈엠디자인" />
        <meta name="twitter:description" content="아파트 건축설계 전문 회사. 제일건설 협력업체입니다." />
        <meta name="twitter:image" content="https://ismdesign.co.kr/ism-logo-new.png" />
        <meta name="twitter:domain" content="ismdesign.co.kr" />
        
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
