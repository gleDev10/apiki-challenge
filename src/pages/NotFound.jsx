import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not Found</title>
      </Helmet>
      <section>
        <div className="container">
          <div className="row">
            <div className="col" style={{ alignItems: "center" }}>
              <p style={{ marginBottom: "2rem" }}>Nothing found...</p>
              <a href="/" className="btn__notfound">
                Início
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
