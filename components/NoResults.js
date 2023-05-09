import React from 'react'

export default function NoResults({searches}) {
  if (searches) {
  console.log(searches)
  }
  return (
    <div className='no-results-container'>
    <div>No Results</div>
    </div>
  )
}

export async function getStaticProps() {
  const resp = await fetch('https://grsvumxr5onti4rnxgin73azyq0fgqvy.lambda-url.us-east-2.on.aws/blackwidow/trending/searches/')
  const searches = await resp.json();
return {
  props: {
    searches,
  },
  revalidate: 10
}
}