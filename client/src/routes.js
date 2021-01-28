import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { WorkersPage } from "./pages/WorkersPage";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";
import { MyPage } from "./pages/MyPage";
import { EditPage } from "./pages/EditPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/workers" exact>
          <WorkersPage></WorkersPage>
        </Route>
        <Route path="/create" exact>
          <CreatePage></CreatePage>
        </Route>
        <Route path="/workers/my" exact>
          <MyPage></MyPage>
        </Route>
        <Route path="/detail/:id" exact>
          <DetailPage></DetailPage>
        </Route>
        <Route path="/edit/:id" exact>
          <EditPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
