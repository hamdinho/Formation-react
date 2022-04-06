import React, { Component, useEffect } from "react";
import style from "./App.module.css";
import FlexHLayout from "./components/layouts/FlexHLayout/FlexHLayout";
import FlexWLayout from "./components/layouts/FlexWLayout/FlexWLayout";
import MemeForm from "./components/MemeForm/MemeForm";
import MemeThumbnail from "./components/MemeThumbnail/MemeThumbnail";
import MemeViewer from "./components/MemeViewer/MemeViewer";
import Navbar from "./components/Navbar/Navbar";
import {
  Route,
  Switch,
  Link,
  useParams,
  useLocation,
  useHistory,
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import { DummyMeme, I_Meme } from "./interfaces/common";
import { CURRENT_ACTIONS } from "./store/store";
import Modal from "./components/Modal/Modal";
import Listpdf from "./components/Listpdf/Listpdf";

interface I_AppProps {
  AppName?: string;
}
class App extends Component<I_AppProps> {
  render(): React.ReactNode {
    return (
      <>
        <div className={style.App}>
          <FlexHLayout>
            <div className={style.header}>Meme Generator . react</div>
            <Navbar />
            <Switch>
              <Route path="/" exact>
                <div className={style.home}>Page d'accueil</div>
              </Route>
              <Route path="/listPDF" exact component={Listpdf} />
              <Route path="/editor" exact component={RoutedEditor} />
              <Route path="/editor/:id" component={RoutedEditor} />
              <Route path="/thumbnail">
                <MemeThumbnail />
              </Route>
              <Route path="/">
                <div className={style.Erreur}>Page Innexistante</div>
              </Route>
            </Switch>
          </FlexHLayout>
        </div>
        <Modal />
      </>
    );
  }
}
function Editor(props: any) {
  console.log(props);
  useEffect(() => {
    props.update(
      props.memes.find((m: I_Meme) => m.id === parseInt(props.match.params.id))
    );
    return () => {
      props.update(undefined);
    };
  }, [props]);
  return (
    <FlexWLayout>
      <div>
        <MemeViewer />
      </div>
      <MemeForm />
    </FlexWLayout>
  );
}
function mstp(state: any, own: any) {
  return { ...own, memes: state.ressources.memes };
}
function mdtp(dispatch: Function) {
  return {
    update: (meme: I_Meme | undefined) => {
      dispatch({
        type: CURRENT_ACTIONS.UPDATE_CURRENT,
        value: meme ? meme : DummyMeme,
      });
    },
  };
}
const RoutedEditor = withRouter(connect(mstp, mdtp)(Editor));
export default App;
