import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
                <meta name="facebook-domain-verification" content="0tx6527zm4yikhbnxozkw68arc2m5x" />
                <script dangerouslySetInnerHTML={{
                    __html: `!function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '456894110068958');
                    fbq('track', 'PageView');` }}
                />
                <noscript dangerouslySetInnerHTML={{
                    __html: `<img height="1" width="1" style="display:none"
                    src="https://www.facebook.com/tr?id=456894110068958&ev=PageView&noscript=1" />` }}
                />
            </Head>
            <body>
                <Main />
                <div id="portal" />
                <NextScript />
            </body>
        </Html>
    )
}