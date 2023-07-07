import "./App.css";
import Header from "./components/Header";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Blog Apiki - Artigos sobre WordPress</title>
        </Helmet>
        <Header />
        <main role="main">
          <RouterProvider router={router} />
        </main>
        <Footer />
      </HelmetProvider>
    </>
  );
}

export default App;
