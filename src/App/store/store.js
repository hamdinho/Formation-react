import { combineReducers, createStore } from "redux";
import { REST_SRV_BASE_URL } from "../config/config";
import { DummyMeme } from "../interfaces/common";
const initialRessourcesState = {
  images: [],
  memes: [],
};
export const RessourcesActions = Object.freeze({
  ADD_INIT_IMAGES: "ADD_INIT_IMAGES",
  ADD_INIT_MEMES: "ADD_INIT_MEMES",
  ADD_MEME: "ADD_MEME",
});
function ressourcesReducer(state = initialRessourcesState, action) {
  switch (action.type) {
    //actions disponible pour les composants
    case RessourcesActions.ADD_INIT_IMAGES:
      return { ...state, images: action.values };
    case RessourcesActions.ADD_INIT_MEMES:
      return { ...state, memes: action.values };
    case RessourcesActions.ADD_MEME:
      const pos = state.memes.findIndex((m) => m.id === action.value.id);
      if (pos < 0) {
        return { ...state, memes: [...state.memes, action.value] };
      } else {
        return {
          ...state,
          memes: [
            ...state.memes.slice(0, pos - 1),
            action.value,
            ...state.memes.slice(pos),
          ],
        };
      }
    //gestion de l'init des values async
    case "ADD_INIT_ALL":
      return { ...state, memes: action.memes, images: action.images };
    case "INIT_LOADING":
      const prm = fetch(`${REST_SRV_BASE_URL}/memes`).then((f) => f.json());
      const pri = fetch(`${REST_SRV_BASE_URL}/images`).then((f) => f.json());
      Promise.all([prm, pri]).then((aResp) => {
        store.dispatch({
          type: "ADD_INIT_ALL",
          memes: aResp[0],
          images: aResp[1],
        });
      });
      return state;
    default:
      return state;
  }
}

function modalReducer(
  state = {
    isShown: true,
    title: "Bienvenu",
    content: <div>Bienvenu sur meme generator</div>,
    closeCallback: () => console.log("Hello closed"),
    cancelCallback: undefined,
  },
  action
) {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        isShown: true,
        title: action.title,
        content: action.content,
        closeCallback: action.closeCallback,
        cancelCallback: action.cancelCallback,
      };
    case "HIDE_MODAL":
      if (state.closeCallback && typeof state.closeCallback === "function") {
        state.closeCallback();
      }
      return {
        isShown: false,
        content: "",
        cancelCallback: undefined,
        closeCallback: () => {},
      };
    case "CANCEL_MODAL":
      if (state.cancelCallback && typeof state.cancelCallback === "function") {
        state.cancelCallback();
      }
      return {
        isShown: false,
        content: "",
        cancelCallback: undefined,
        closeCallback: () => {},
      };

    default:
      return state;
  }
}
export const CURRENT_ACTIONS = Object.freeze({
  UPDATE_CURRENT: "UPDATE_CURRENT",
  RESET_CURRENT: "RESET_CURRENT",
  SAVE_CURRENT: "SAVE_CURRENT",
});
function currentReducer(state = DummyMeme, action) {
  switch (action.type) {
    case RessourcesActions.ADD_MEME:
    case CURRENT_ACTIONS.RESET_CURRENT:
      return { ...DummyMeme };
    case CURRENT_ACTIONS.UPDATE_CURRENT:
      return { ...state, ...action.value };

    case CURRENT_ACTIONS.SAVE_CURRENT:
      fetch(
        `${REST_SRV_BASE_URL}/memes${
          undefined !== state.id ? "/" + state.id : ""
        }`,
        {
          method: `${undefined !== state.id ? "PUT" : "POST"}`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state),
        }
      )
        .then((f) => f.json())
        .then((o) => {
          store.dispatch({ type: RessourcesActions.ADD_MEME, value: o });
        });
      return state;
    default:
      return state;
  }
}
//export const storeModal=createStore(modalReducer);
const combinedReducers = combineReducers({
  modal: modalReducer,
  ressources: ressourcesReducer,
  current: currentReducer,
});
export const store = createStore(
  combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch({ type: "INIT_LOADING" });
// store.dispatch({type:RessourcesActions.ADD_INIT_IMAGES,values:[{id:0},{id:1}]})
// store.dispatch({type:RessourcesActions.ADD_INIT_MEMES,values:[{id:10},{id:21}]})
// store.dispatch({type:RessourcesActions.ADD_MEME,value:{id:123}});
