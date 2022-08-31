import React from "react";
// import { Trans } from 'react-i18next';
function Footer() {

  const date = new Date()
  const año = date.getFullYear()



  return (
    <div>
      <footer className="footer">
        <div className="container-fluid">
          <div className="d-sm-flex justify-content-center justify-content-sm-between py-2 w-100">
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
              Copyright ©{" "}
              <a
                href="##"
                rel="noopener noreferrer"
              >
                Universal Company S.A.S{" "}
              </a>
              {año}
            </span>
            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
              Todos los derechos reservados{" "}
              <a
                href="##"
              >
                {" "}
                Universal Company S.A.S{" "}
              </a>{" "}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
