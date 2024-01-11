import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {GoVerified} from 'react-icons/go'
import Head from 'next/head'
import { FaEquals } from "react-icons/fa";
import { BsArrowRight, BsLightbulb, BsLightbulbFill, BsPlayBtn, BsPlayBtnFill } from 'react-icons/bs'
import Blog from '../components/Blog'
import Reviews from '../components/Reviews'
import { MdLocationPin } from "react-icons/md";
import { AiOutlineGlobal } from 'react-icons/ai'
import { HiOutlineStatusOnline } from "react-icons/hi";
import Chatbot from '../components/Chatbot'
import CTA from '../components/CTA'
import LogoSlider from '../components/LogoSlider'
import DropdownFAQ from '../components/DropdownFAQ'

export default function Home(){
  return (
    <div>
        <Head>
          <title>RankiAI</title>
          <meta name="description" content="RankiAI" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="robots" content="index, follow" />
          <link rel="apple-touch-icon" href="/logos/2.png" /> 
          <link rel="canonical" href="https://ranki.ai/"/>
          <link rel="icon" href="/logos/2.png" />
        </Head>
        <Navbar />
        <Chatbot />
        <div className='landing-container'>
          
          
          <div className='home-landing-container flexer'>
            <div className='antiflexer'>
            <h1 className='home-landing-header'><b className='italic'>Automate</b> Content Creation & <b className='italic'>Boost</b> Organic Traffic with <span className='primary'>RankiAI</span></h1>
            <p className='home-landing-p'>Generate SEO-Optimized Content on cruise control, while focusing on the important parts of your business.</p>
            <div className='home-landing-btn-div'>
                <Link href='/dashboard'><button className='btn btn-primary home-landing-btn'>Get Started</button></Link>
                <Link href='/about'><button className='btn btn-translucent home-landing-btn'>Learn More <BsPlayBtnFill className='home-landing-btn-icon' /></button></Link>
            </div>

            {/* <video autoPlay loop muted className='home-landing-video'>
            <source src="/surfer-ai.mp4" />
          </video> */}

          <div className='home-landing-img-banner'>
            <img src='/home-graphic.webp' className='home-landing-img'></img>
          </div>

            {/* <div>
            <video src="/surfer-ai.mp4" autoplay muted loop width='600'></video>
          </div> */}

          
            </div>
          </div>
          <div className='about-landing-container'>
            {/* <h2 className='about-landing-header'>We get it.</h2> 
            <h2>Getting your website ranked on Google is a pain in the a**.</h2>
            <h2 className='about-landing-header'>So we did something about it.</h2> */}

            <h2 className='about-landing-header'>Your own personalized AI Article Writer focused on <span className='primary'>SEO Optimization</span></h2>
            <p className='about-landing-p'>Research, write, optimize in a click. Use Ranki AI to produce top-quality, well-optimized articles in 20 minutes!</p>
            <div className='about-landing-banners flexer'>
              <div className='about-landing-banner'>
              <div className='antiflexer'>
              <div>

                <img src='/gpt.png' width='100'></img>
                </div>
                <h3 className='about-banner-header'>GPT-4 Powered Content Creation Tool</h3>
                </div>
              </div>
               <div className='about-landing-banner'>
               <div className='antiflexer'>
               <div>

                <img src='/serp.png' width='100'></img>
                </div>
                <h3 className='about-banner-header'>Generate Blog Content that gets ranked on Google.</h3>
                </div>
              </div>
               <div className='about-landing-banner'>
                <div className='antiflexer'>
                  <div>
                <img src='/rocket.png' width='100'></img>
                </div>
                <h3 className='about-banner-header'>Skyrocket organic leads to your business</h3>
                </div>
              </div>
            </div>
          </div>
        
        <div className='hiw-landing-container'>
          <div className='header-grey'>How it works</div>
          <h2 className='hiw-landing-header'>Leave the <b>Content Generation</b> to us, so you can focus on what&apos;s important.</h2>
          {/* <img src='/rocket.png' /> */}
          <h6 className='hiw-landing-subheader primary italic'>Your Business.</h6>
          <div className='landing-steps'>
      <div className='landing-step step-1'>
      <div className='landing-step-number'>1</div>
      <div className='landing-step-line'></div>
      <h3>Integrate your website</h3>
      <p>Connect your domain to our secure trusted platform.</p>
      <img src='/integrate.png' className='landing-step-img landing-img-sm'></img>
      </div>
      <div className='landing-step step-2'>
              <div className='landing-step-line-up'></div>
      <div className='landing-step-number'>2</div>
      <div className='landing-step-line'></div>
      <h3>Customize your dashboard</h3>
      <p>We provide a standard dashbaord for our users to track & manage their SEO customizable to their liking.</p>
      <img src='/ranki-dashboard.png' className='landing-step-img landing-img-md ranki-dash-img'></img>
      </div>
      <div className='landing-step step-3'>
                      <div className='landing-step-line-up'></div>

      <div className='landing-step-number'>3</div>
      <div className='landing-step-line'></div>
        <h3>Start generating articles</h3>
      <p>With our intuitive platform, you can effortlessly create high-quality, engaging content in mere seconds, freeing up valuable time for strategic planning and growth.</p>
      <img src='/article-generate.jpeg' className='landing-step-img landing-img-md'></img>
      </div>
      <div className='landing-step step-4'>
                      <div className='landing-step-line-up'></div>

      <div className='landing-step-number'>4</div>
      <div className='landing-step-line'></div>
      <h3>Watch your <b className='italic'>Organic Traffic</b> skyrocket</h3>
      <p>Embrace the future of content creation where innovation meets convenience, and let AI handle the heavy lifting. Experience the peace of mind that comes from knowing your content needs are managed efficiently, allowing you to direct your attention to where it truly matters - growing your business and achieving your goals.</p>
      <img src='/organic-traffic.webp' className='landing-step-img landing-img-sm'></img>
      </div>
    </div>
     
        </div>  


        <div className='why-landing-container'>
          <h2 className='why-landing-header'>In a world where nearly <b className='italic primary'>5.5B</b> people are searching daily, be the business they choose.</h2>
          <h3 className='why-landing-subheader'>Whether your business is:</h3>
          <div className='flexer why-banner-grid'>
          <div className='why-banner'><div className='antiflexer'><MdLocationPin className='why-banner-icon'/><h3 className='why-banner-header'>Local</h3></div></div>
          <div className='why-banner'><div className='antiflexer'><AiOutlineGlobal className='why-banner-icon'/><h3 className='why-banner-header'>Global</h3></div></div>
          <div className='why-banner'><div className='antiflexer'><HiOutlineStatusOnline className='why-banner-icon'/><h3 className='why-banner-header'>Online</h3></div></div>
          </div>
          <h3 className='why-landing-header why-header-2'><span className='primary'>Ranki</span> has your SEO covered 🤝</h3>
          {/* <div className='why-landing-flexer'>
          <div className='why-img-container'>
              <img src='/seo-graphic.png' width='400'/>
              </div>
          <p className='why-landing-paragraph'>Our AI technology understands your brand&apos;s voice and audience, ensuring each piece of content resonates deeply and authentically with your readers. Embrace the efficiency of AI-driven content creation and watch as your digital footprint expands, your audience engagement increases, and your brand&apos;s message spreads with unprecedented clarity and impact.</p>
             
            </div> */}

            <div className=' why-landing-flexer'>
              <div className='why-img-container'>
              <img src='/chatbot.png' width='100' className='why-landing-img'></img>
              </div>
              <p className='why-landing-paragraph'>Step into the future of digital marketing with our AI-powered Content Creation tool, where innovation meets practicality. This advanced platform is meticulously designed to revolutionize the way you produce content, leveraging artificial intelligence to deliver high-quality, engaging, and relevant material with ease.</p>
              
            </div>
        </div> 

    
<div className='fun-landing-container'>
  <div className='fun-landing-banner'>
  <p className='header-grey flexer fun-landing-supheader'><BsLightbulbFill className='light fun-landing-light'/> Did you know?</p>
<h3 className='fun-landing-header'><b className='primary'>95%</b> of search traffic goes to the <span className='primary'>1st page</span> of search results</h3> 

<h3 className='fun-landing-header'><b className='primary'>75%</b> of all clicks go to the <span className='primary'>first 3 results</span></h3> 
<p className='header-grey fun-landing-greyed'>Seriously, how often do you ever select the bottom search results?</p>
</div>
</div>
        {/* <div className='hiw-landing-container'>
          <h2 className='hiw-landing-header'>An <b>AI Content Writing Tool</b> built to rank your pages</h2>
          <p>Unlock the full potential of your digital presence with our AI Content Writing Tool, meticulously designed to elevate your pages to the top of search engine rankings. By harnessing the power of advanced AI algorithms, our tool not only crafts compelling content but also ensures it is SEO-optimized, increasing visibility and driving organic traffic. With a focus on relevance and engagement, our solution tailors content to resonate with your target audience, enhancing user experience and fostering higher conversion rates. Step into the realm of high-ranking pages and watch as your online influence grows, all while saving time and resources. This is more than just content creation; it&apos;s a strategic asset for your online success.</p>
        </div> 
        
        <div className='hiw-landing-container'>
          <h2 className='hiw-landing-header'>Generate <b>SEO-Optimized Content Writing</b> with the click of a button</h2>
          <p>Revolutionize your content creation process with our state-of-the-art tool that simplifies SEO-optimized content writing into a single click. This powerful solution is designed to cater to your need for efficiency and effectiveness in the digital space. With our advanced AI-driven technology, you can generate content that not only captivates your audience but also adheres to the best SEO practices, ensuring your pages rank higher on search engine results. From blog posts to product descriptions, our tool adapts to various formats, infusing each piece with the optimal blend of keywords, readability, and engagement. Say goodbye to the daunting task of continuous content optimization and welcome a future where high-ranking, impactful content is just a button click away. Elevate your online presence effortlessly, and stay ahead in the competitive digital landscape.</p>
        </div>  */}

        {/* <div className='hiw-landing-container'>
          <h2 className='hiw-landing-header'>Content Creation powered by AI</h2>
          <p>Step into the future of digital marketing with our AI-powered Content Creation tool, where innovation meets practicality. This advanced platform is meticulously designed to revolutionize the way you produce content, leveraging artificial intelligence to deliver high-quality, engaging, and relevant material with ease. Our AI technology understands your brand&apos;s voice and audience, ensuring each piece of content resonates deeply and authentically with your readers. Whether you&apos;re crafting informative blog posts, compelling social media updates, or persuasive marketing copy, our tool streamlines the process, allowing for more focus on strategy and creativity. Embrace the efficiency of AI-driven content creation and watch as your digital footprint expands, your audience engagement increases, and your brand&apos;s message spreads with unprecedented clarity and impact.</p>
      </div>  */}

        <div className='reviews-landing-container'>
          <h2 className='reviews-landing-header'>Don&apos;t take our word for it, take a look at what some of our customers are saying.</h2>
          <Reviews />
        </div> 

        {/* <div className='blog-landing-container'>
          <h2 className='blog-landing-header'>Our Content</h2>
          <Blog limit={3} />
          <Link href='/blog'><button className='btn btn-translucent'>View All <BsArrowRight className='arrow-right' /></button></Link>
        </div>  */}
     

        <div className='index-faqs-container'>
          <h2 className='index-faqs-header'>Frequently Asked Questions</h2>
          <div className='faq-container'>
              {/* <h4 className='faq-header'>Testing FAQ</h4> */}
              <DropdownFAQ
                 title="Can I use RankiAI for free?"
              content="RankiAI offers both free and premium services to cater to a variety of needs. Our free services enable users to create a basic resume at no cost, providing an easy and accessible way to start building your professional profile. For users seeking more advanced features, our premium services are the ideal choice. These include access to personalized templates, advanced AI writing assistance, and detailed performance analytics. These premium features are designed to enhance your resume significantly and improve your job application success rate. Whether you're just starting out or looking to give your resume a professional edge, RankiAI has the right tools for you."
            />
            <DropdownFAQ
                 title="What is the GPT API, and how does it help in creating SEO-optimized articles for my website?"
              content="The GPT (Generative Pre-trained Transformer) API is an advanced AI tool that can generate human-like text. In our application, it's utilized to create SEO-optimized articles for your website. This means the API analyzes key SEO factors such as keywords, relevancy, and readability to produce articles that are not only engaging to your readers but also rank well on search engines. This feature saves you time and effort in content creation, allowing you to focus more on other aspects of your business."
            />
                <DropdownFAQ
                    title="How can I organize my projects and businesses using the application?"
                  content="Our application offers a user-friendly dashboard where you can add and manage multiple projects or businesses. You can create separate sections for each project, set goals, track progress, and organize tasks with deadlines. The dashboard is designed to give you a clear overview of all your ventures in one place, helping you stay organized and focused."
                />
                <DropdownFAQ
                    title="Is there any support or training available for new users to get accustomed to the application?"
                  content="Yes, we provide comprehensive support and training for new users. This includes detailed tutorials, user guides, and customer support assistance. We also regularly conduct webinars and Q&A sessions to help users get the most out of our application. You can access these resources directly from the application dashboard or our website."
                />
                  <DropdownFAQ
                    title="How secure is my data within the application, especially when using the GPT API for content creation?"
                  content="Data security is our top priority. All information within the application is encrypted and securely stored. When using the GPT API for content creation, your data is processed with strict confidentiality, and we ensure that only authorized personnel have access to it. We comply with all major data protection regulations to safeguard your information against unauthorized access or breaches."
                />
                
          </div>
      </div>

      {/* <LogoSlider /> */}



        <div className='cta-landing-container flexer'>
         <CTA />
        </div> 
        </div>
        <Footer />
    </div>
  )
}
