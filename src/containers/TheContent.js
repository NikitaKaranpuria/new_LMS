import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CFade } from "@coreui/react";
import Spinner from "../views/spinner/Spinner"; //loadnig spinner
// routes config
import routes from "../routes";
const TheContent = () => {
  return (
    <main className="c-main">
      <Suspense fallback={<Spinner />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )}
                />
              )
            );
          })}

          {/* {localStorage.getItem("LMS_Token") ? (
            <Redirect from="/sign_in" to="/" />
          ) : (
            <Redirect from="/" to="/sign_in" />
          )} */}
        </Switch>
      </Suspense>
    </main>
  );
};
export default React.memo(TheContent);
