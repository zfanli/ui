const toolbox = {
  mobile: false,
  install: (app) => {
    toolbox.app = app;
    app.mobile = toolbox.mobile;
  },
  _mobile: () => {
    toolbox.app.mobile = toolbox.mobile;
  },
};

export default toolbox;
