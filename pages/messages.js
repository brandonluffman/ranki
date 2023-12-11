import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {BsArrowUp} from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'

const messages = () => {
  return (
    <>
    <div className='chat-container'>
    <div className='chat-inbox-container'>
      <div className='new-chat-button-div'>
      <button className='new-chat-button' type='button'>Create New Chat <AiOutlinePlus className='plus-icon' /></button>
      </div>
      <h2 className='chat-inbox-header'>Chat</h2>
      <div className='chat-inbox'>
        <div className='chat-inbox-card'>
        <div className='chat-inbox-card-time'>
          <p>3:33pm</p>
          </div>
            <div className='chat-inbox-card-title'>
            <h2 className='chat-inbox-card-title-header'>What to expect from wisdom tooth surgery?</h2>
            {/* <h6 className='chat-inbox-card-title-subheader'>According to Reddit, Your surgery should take 45 minutes or less...</h6> */}
          </div>
      </div>
      <div className='chat-inbox-card'>
      <div className='chat-inbox-card-time'>
          <p>3:33pm</p>
          </div>
          <div className='chat-inbox-card-title'>
          <h2 className='chat-inbox-card-title-header'>What to expect from wisdom tooth surgery?</h2>
            {/* <h6 className='chat-inbox-card-title-subheader'>Text of last text sent...</h6> */}
          </div>
      </div>
    </div>
      
    </div>
    <div className='chat-messages-container'>
      <form className='chat-messages-form'>
        <input className='chat-messages-input' placeholder='Type a message here...' type='text'></input>
        <button className='chat-messages-send-button' type='submit'><BsArrowUp /></button>
      </form>
      <p className='chat-messages-message-time'>Today at 3:33pm</p>
      <div className='chat-messages-message-container'>
        <div className='chat-messages-message'>What to expect from wisdom tooth surgery?</div>
        <img className='chat-messages-message-profile' src='/propic.jpeg' width='50'></img>
      </div>
      <p className='chat-message-delivered'>Delivered</p>
      <div className='chat-messages-response-container'>
        {/* <img className='chat-messages-message-profile' src='/propic.jpeg' width='50'></img> */}
        <div className='chat-messages-response'>
        According to Reddit, Your surgery should take 45 minutes or less.
        You’ll get one of these types of anesthesia so you don’t feel pain during the removal:
        Local: Your doctor will numb your mouth with a shot of local anesthetic such as novocaine, lidocaine or mepivicaine. You may also breathe nitrous oxide, or laughing gas, to relax or even doze during surgery. You should feel alert again shortly afterward. 
        IV sedation: The surgeon will numb your mouth and also give you drugs through a vein in your arm to make you drowsy. You might sleep during the whole procedure.
        General: You’ll either get drugs through a vein or breathe gas in through a mask. You’ll be asleep the whole time and might not wake up for an hour or so after the surgery.
        Your doctor may have to cut your gums or bone to get the teeth out. If so, they&apos;ll stitch the wounds shut so they heal quickly. These stitches usually dissolve after a few days. They may also stuff gauze pads in your mouth to soak up some of the blood.
        After Surgery Everyone responds differently to anesthesia. If you had a local anesthetic and feel alert, you might be able to drive home to begin your recovery. You might even be able to go back to work or do your normal activities. If you had general anesthesia or still feel drowsy, you’ll need someone to drive you home.
        Most people have little to no pain after surgery. You&apos;ll likely have swelling and mild discomfort for 3 or so days. Your mouth may need a few weeks to completely heal.
        Follow your doctor’s instructions for a quicker recovery. Here are some tips for the first 3 days after surgery: Dos: Use an ice pack on your face to curb swelling or skin color changes.
        Use moist heat for a sore jaw. Gently open and close your mouth to exercise your jaw. Eat soft foods like pasta, rice, or soup. Drink plenty of fluids.
        Brush your teeth starting the second day. Don’t brush against any blood clots.
        Take the drugs your doctor prescribes to ease pain or swelling.
        Call your doctor if you have a fever, or if your pain or swelling doesn’t improve.
        Don’ts: Don’t drink through a straw. Sucking may loosen blood clots that help your mouth heal. Don’t rinse your mouth too harshly. Your doctor may suggest rinsing gently with saltwater. Don’t eat hard, crunchy, or sticky foods that may scratch your wounds. Don’t smoke. Smoking can slow your healing.
        </div>
      </div>
    </div>
  </div>
  {/* <Footer /> */}
  </>
  )
}

export default messages