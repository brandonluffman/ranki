import Link from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumbs = ({ appName, slugId }) => {
  const router = useRouter();
  const pathParts = router.asPath.split('/').filter(part => part);

  return (
    <nav aria-label="breadcrumbs" className='breadcrumbs-container'>
      <ol>
        {pathParts.map((part, index) => {
          const isLast = index === pathParts.length - 1;

          // Replace the slug with the app name
          const displayText = part === slugId && appName ? appName : part;
          const href = '/' + pathParts.slice(0, index + 1).join('/');

          return (
            <li key={href} className='breadcrumb-link'>
              {!isLast ? (
                <Link href={href}>
                  <span>/ {displayText}</span>
                </Link>
              ) : (
                <span>/ {displayText}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
