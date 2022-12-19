import "./layout.css";
import { BrowserRouter } from "react-router-dom";
import Footer from "../footer/footer";
import AsideMenu from "../asideMenu/asideMenu";
import Header from "../header/header";
import Routing from "../Routing/Routing";
import Popup from "../popup/popup";
import { useState } from "react";



function Layout(): JSX.Element {
    
    
    return (
        <div className="layout">
            <BrowserRouter>

                <header>
                    <Header/>
                </header>

                <aside>
                    <AsideMenu/>
                </aside>

                <main>
                    <Routing/>
                </main>

                <footer>
                    <Footer/>
                </footer>
                    
            </BrowserRouter>
			
        </div>
    );
}

export default Layout;
