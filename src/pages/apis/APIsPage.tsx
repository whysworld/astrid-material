import Link from '@mui/material/Link/Link';
import { BreadcrumbWidget } from '../../components/BreadcrumbWidget';

export const APIsPage = () => {

  return (
    <>
      <BreadcrumbWidget>
        <Link href="/apis" underline="none">
          APIs
        </Link>
      </BreadcrumbWidget>
      This is APIs page
    </>
  )
}