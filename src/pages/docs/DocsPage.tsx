import Link from '@mui/material/Link';
import { BreadcrumbWidget } from '../../components/BreadcrumbWidget';

export const DocsPage = () => {

  return (
    <>
      <BreadcrumbWidget>
        <Link href="/docs" underline="none">
          Docs
        </Link>
      </BreadcrumbWidget>
      This is Docs page
    </>
  )
}