import Layout from "../components/layout";
import { AuthProvider } from "../functions/AuthContext";
import React,{useState} from "react";


//import CookieConsent from "@/components/Shared/CookieConsent";
//import ContactCTA from "@/components/Shared/ContactCTA";

/**
 *
 * @param Component
 * @param pageProps
 * @returns {JSX.Element}
 * @constructor
 */
export default function App({ Component, pageProps }) {

	const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

	return (
		
		<AuthProvider>
			<Layout>
			<Component {...pageProps} />
			</Layout>
		</AuthProvider>
		
	)
		
	
}