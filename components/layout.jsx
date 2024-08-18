
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import './../styles/styles.scss';
/**
 *
 * @param children
 * @returns {JSX.Element}
 */
export default function Layout({ children }) {
    return (
      <>
       <SiteHeader />
      <main>{children}</main>
        
      </>
    );
  }