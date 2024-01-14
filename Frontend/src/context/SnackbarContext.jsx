import React, {
  createContext,
  useReducer,
  useCallback,
  ReactElement,
} from "react";

const initialState = {
  open: false,
  severity: "info",
  variant: "filled",
  title: null,
  message: "",
  anchorOrigin: { vertical: "top", horizontal: "center" },
  action: null,
  autoHideDuration: 6000,
  icon: undefined,
};

const REDUCER_ACTION_TYPE = {
  SHOW_SNACKBAR: "SHOW_SNACKBAR",
  HIDE_SNACKBAR: "HIDE_SNACKBAR",
};

const reducer = (state, action) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.SHOW_SNACKBAR:
      return { ...state, open: true, ...action.payload };
    case REDUCER_ACTION_TYPE.HIDE_SNACKBAR:
      return { ...state, open: false };
    default:
      return state;
  }
};

const useSnackbarContext = (initState) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const showSnackbar = useCallback(
    (payload) =>
      dispatch({
        type: REDUCER_ACTION_TYPE.SHOW_SNACKBAR,
        payload,
      }),
    []
  );

  const hideSnackbar = useCallback((reason) => {
    if (reason === "clickaway") return;
    dispatch({ type: REDUCER_ACTION_TYPE.HIDE_SNACKBAR });
  }, []);

  return { state, showSnackbar, hideSnackbar };
};

const SnackbarContext = createContext();

const initContextValues = {
  state: initialState,
  showSnackbar: () => {},
  hideSnackbar: () => {},
};

const SnackbarProvider = ({ children }) => {
  const contextValues = useSnackbarContext(initialState);

  return (
    <SnackbarContext.Provider value={contextValues}>
      {children}
    </SnackbarContext.Provider>
  );
};

export { SnackbarProvider, SnackbarContext };
