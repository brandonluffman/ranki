import Link from 'next/link';
import React from 'react'

const ControlBoard = ({ analysisResult }) => {

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
  console.log(isHttps)
  console.log(metaTitle)

  return (
    <div className='tech-dash-grid'>
    <div className='tech-grid-item'>
      {metaTitle != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
      <h2 className='tech-grid-header'>Meta Title</h2>
      {metaTitle && <h3 className='tech-grid-content'>{metaTitle}</h3>}
    </div>
    <div className='tech-grid-item'>
    {metaDescription != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
      <h2 className='tech-grid-header'>Meta Description</h2>
      {metaDescription && <h3 className='tech-grid-content'>{metaDescription}</h3>}
    </div>
    <div className='tech-grid-item'>
    {charset != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
      <h2 className='tech-grid-header'>Charset</h2>
      {charset && <h3 className='tech-grid-content'>{charset}</h3>}
    </div>
    <div className='tech-grid-item'>
    {viewport != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
      <h2 className='tech-grid-header'>Viewport</h2>
      {viewport && <h3 className='tech-grid-content'>{viewport}</h3>}
    </div>
    <div className='tech-grid-item'>
    {favicon != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
      <h2 className='tech-grid-header'>Favicon</h2>
      {favicon && <h3 className='tech-grid-content'>{favicon}</h3>}
    </div>
    <div className='tech-grid-item'>
    {appleTouchIcon != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
      <h2 className='tech-grid-header'>Apple Touch Icon</h2>
      {appleTouchIcon && <h3 className='tech-grid-content'>{appleTouchIcon}</h3>}
    </div>
    <div className='tech-grid-item'>
    {canonicalUrl != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
      <h2 className='tech-grid-header'>Canonical URL</h2>
      {canonicalUrl && <h3 className='tech-grid-content'>{canonicalUrl}</h3>}
    </div>
    <div className='tech-grid-item'>
    {robotsFollow != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
      <h2 className='tech-grid-header'>Robots Meta</h2>
      {robotsFollow && <h3 className='tech-grid-content'>{robotsFollow}</h3>}
    </div>
    <div className='tech-grid-item'>
    {isHttps ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
      <h2 className='tech-grid-header'>HTTPS Secure</h2>
      {/* <h6 className='tech-grid-number'>Yes</h6> */}
      {isHttps ? (<h3 className='tech-grid-content'>Schema Markup has been found.</h3>):(<h3 className='tech-grid-content'>Schema markup has not been set u for this site, go to <Link href='https://schema.org'>Schema.org</Link> to set this up.</h3>)}
    </div>
    <div className='tech-grid-item'>
    {sitemap  == true ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
      <h2 className='tech-grid-header'>XML Sitemap</h2>
      {sitemap ? (<h3 className='tech-grid-content'>Schema Markup has been found.</h3>):(<h3 className='tech-grid-content'>Schema markup has not been set u for this site, go to <Link href='https://schema.org'>Schema.org</Link> to set this up.</h3>)}
    </div>
    <div className='tech-grid-item'>
    {robotstxt == true ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
      <h2 className='tech-grid-header'>Robots.txt</h2>
      {robotstxt ? (<h3 className='tech-grid-content'>Schema Markup has been found.</h3>):(<h3 className='tech-grid-content'>Schema markup has not been set u for this site, go to <Link href='https://schema.org'>Schema.org</Link> to set this up.</h3>)}
    </div>
    <div className='tech-grid-item'>
    {siteIndexed  == true ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
      <h2 className='tech-grid-header'>Site Indexed</h2>
      {siteIndexed ? (<h3 className='tech-grid-content'>Schema Markup has been found.</h3>):(<h3 className='tech-grid-content'>Schema markup has not been set u for this site, go to <Link href='https://schema.org'>Schema.org</Link> to set this up.</h3>)}
    </div>
    <div className='tech-grid-item'>
    {schemaMarkup == true ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
      <h2 className='tech-grid-header'>Schema Markup</h2>
      {schemaMarkup ? (<h3 className='tech-grid-content'>Schema Markup has been found.</h3>):(<h3 className='tech-grid-content'>Schema markup has not been set u for this site, go to <Link href='https://schema.org'>Schema.org</Link> to set this up.</h3>)}
    </div>
    <div className='tech-grid-item'>
    {loadTime < 0.3 ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
      <h2 className='tech-grid-header'>Load Time</h2>
      {loadTime && <h3 className='tech-grid-content'>{loadTime.toFixed(2)} seconds</h3>}
    </div>
    <div className='tech-grid-item'>
    {googleAnalytics == true ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
      <h2 className='tech-grid-header'>Google Analytics</h2>
      {/* <h6 className='tech-grid-number'>Yes</h6> */}
      {googleAnalytics ? (<div>Google Analytics is set up for this site.</div>) : (<div>Google Analytics has not been set up, go to <Link href='https://google.com' className='blue'>Google Analytics</Link> to set up.</div>)}
    </div>
    <div className='tech-grid-item'>
    {brokenLinks ? (<div className='red-active'></div>):(<div className='green-active'></div>)}
      <h2 className='tech-grid-header'>Broken Links</h2>
      {brokenLinks && <h3 className='tech-grid-content'>{brokenLinks}</h3>}
    </div>
  </div>
  )
}

export default ControlBoard