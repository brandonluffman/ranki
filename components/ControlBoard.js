import Link from 'next/link';
import React, { useState } from 'react'

const ControlBoard = ({ analysisResult }) => {
  const [isToggled, setIsToggled] = useState(false);

  const report = analysisResult;
  // console.log(analysisResult)
  const {
    'Meta Title': metaTitle,
    'Meta Description': metaDescription,
    'Charset': charset,
    'Viewport': viewport,
    'Favicon': favicon,
    'Apple Touch Icon': appleTouchIcon,
    'Canonical URL': canonicalUrl,
    'Robots Follow': robotsFollow,
    'Is HTTPS': isHttps,
    'Sitemap': sitemap,
    'Robots.txt': robotstxt,
    'Is Site Indexed': siteIndexed,
    'Schema Markup': schemaMarkup,
    'Load Time': loadTime,
    'Google Analytics': googleAnalytics,
    'Broken Links': brokenLinks
  } = analysisResult || {};
  // console.log(isHttps)
  // console.log(metaTitle)

  const toggleSEOGrid = () => {
    setIsToggled(!isToggled);

  }

  return (
    <>
    <button className='tech-dash-toggle btn btn-tertiary' onClick={toggleSEOGrid}>Toggle Grid</button>
    <div className={isToggled ? 'tech-dash-grid' : 'tech-dash-grid-small'}>
    <div className={metaTitle != false ? 'tech-grid-item green-grid':'tech-grid-item red-grid'}>
      {/* {metaTitle != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Meta Title</h2>
      {metaTitle && <h3 className='tech-grid-content'>{metaTitle}</h3>}
    </div>
    <div className={metaDescription != false ? 'tech-grid-item green-grid':'tech-grid-item red-grid'}>
    {/* {metaDescription != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Meta Description</h2>
      {metaDescription && <h3 className='tech-grid-content'>{metaDescription}</h3>}
    </div>
    <div className={charset != false ? 'tech-grid-item green-grid':'tech-grid-item red-grid'}>
    {/* {charset != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Charset</h2>
      {charset && <h3 className='tech-grid-content'>{charset}</h3>}
    </div>
    <div className={viewport != false ? 'tech-grid-item green-grid':'tech-grid-item red-grid'}>
    {/* {viewport != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Viewport</h2>
      {viewport && <h3 className='tech-grid-content'>{viewport}</h3>}
    </div>
    <div className={favicon != false ? 'tech-grid-item green-grid':'tech-grid-item red-grid'}>
    {/* {favicon != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Favicon</h2>
      {favicon && <h3 className='tech-grid-content'>{favicon}</h3>}
    </div>
    <div className={appleTouchIcon != false ? 'tech-grid-item green-grid':'tech-grid-item red-grid'}>
    {/* {appleTouchIcon != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Apple Touch Icon</h2>
      {appleTouchIcon && <h3 className='tech-grid-content'>{appleTouchIcon}</h3>}
    </div>
    <div className={canonicalUrl != false ? 'tech-grid-item green-grid':'tech-grid-item red-grid'}>
    {/* {canonicalUrl != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Canonical URL</h2>
      {canonicalUrl && <h3 className='tech-grid-content'>{canonicalUrl}</h3>}
    </div>
    <div className={robotsFollow != false ? 'tech-grid-item green-grid':'tech-grid-item red-grid'}>
    {/* {robotsFollow != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Robots Meta</h2>
      {robotsFollow && <h3 className='tech-grid-content'>{robotsFollow}</h3>}
    </div>
    <div className={isHttps ? 'tech-grid-item green-grid':'tech-grid-item red-grid'}>
    {/* {isHttps ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>HTTPS Secure</h2>
      {/* <h6 className='tech-grid-number'>Yes</h6> */}
      {isHttps ? (<h3 className='tech-grid-content'></h3>):(<h3 className='tech-grid-content'>Schema markup has not been set u for this site, go to <Link href='https://schema.org'>Schema.org</Link> to set this up.</h3>)}
    </div>
    <div className={sitemap == true ? 'tech-grid-item green-grid':'tech-grid-item red-grid'}>
    {/* {sitemap  == true ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>XML Sitemap</h2>
      {sitemap ? (<h3 className='tech-grid-content'></h3>):(<h3 className='tech-grid-content'>XML Sitemap has not been set up for this site. <Link href='https://schema.org'>Schema.org</Link> to set this up.</h3>)}
    </div>
    <div className={robotstxt == true ? 'tech-grid-item green-grid':'tech-grid-item red-grid'}>
     {/* {robotstxt == true ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Robots.txt</h2>
      {robotstxt ? (<h3 className='tech-grid-content'></h3>):(<h3 className='tech-grid-content'>Robots.txt has not been<Link href='https://schema.org'>Schema.org</Link> to set this up.</h3>)}
    </div>
    <div className={siteIndexed == true ? 'tech-grid-item green-grid':'tech-grid-item red-grid'}>
    {/* {siteIndexed  == true ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Site Indexed</h2>
      {siteIndexed ? (<h3 className='tech-grid-content'></h3>):(<h3 className='tech-grid-content'>Site has not been indexed.<Link href='https://schema.org'>Schema.org</Link> to set this up.</h3>)}
    </div>
    <div className={schemaMarkup == true ? 'tech-grid-item green-grid':'tech-grid-item red-grid'}>
    {/* {schemaMarkup == true ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Schema Markup</h2>
      {schemaMarkup ? (<h3 className='tech-grid-content'></h3>):(<h3 className='tech-grid-content'>Schema markup has not been set u for this site, go to <Link href='https://schema.org'>Schema.org</Link> to set this up.</h3>)}
    </div>
    <div className={loadTime < 0.3 ? 'tech-grid-item green-grid':'tech-grid-item red-grid'}>
    {/* {loadTime < 0.3 ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Load Time</h2>
      {loadTime && loadTime < 0.3 ? ( <h3 className='tech-grid-content'>{loadTime.toFixed(2)} seconds -- NICE !</h3>):( <h3 className='tech-grid-content'>{loadTime.toFixed(2)} seconds -- Not so great , took a bit too long to load the page !</h3>)}
    </div>
    <div className={googleAnalytics == true ? 'tech-grid-item green-grid':'tech-grid-item red-grid'}>
    {/* {googleAnalytics == true ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Google Analytics</h2>
      {/* <h6 className='tech-grid-number'>Yes</h6> */}
      {googleAnalytics ? (<h3 className='tech-grid-content'></h3>) : (<h3 className='tech-grid-content'>Google Analytics has not been set up, go to <Link href='https://google.com' className='blue'>Google Analytics</Link> to set up.</h3>)}
    </div>
    <div className={brokenLinks ? 'tech-grid-item red-grid':'tech-grid-item green-grid'}>
    {/* {brokenLinks ? (<div className='red-active'></div>) : (<div className='green-active'></div>)} */}
    <h2 className='tech-grid-header'>Broken Links</h2>
    {brokenLinks && brokenLinks.map((link, index) => {
        return <h3 key={index} className='tech-grid-content'>{link}</h3>;
    })}
</div>

  </div>
  </>
  )
}

export default ControlBoard