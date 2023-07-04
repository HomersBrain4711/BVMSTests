function TC400185()
{
  TestedApps.ConfigClient1.Run(1, true);
  let configClient = Aliases.ConfigClient;
  configClient.OnSiteClientLoginForm.login.btnOK.ClickButton();
  let configClientForm = configClient.ConfigClientForm;
  let configTabCtrl = configClientForm.ConfigTabCtrl;
  configTabCtrl.zpnlButtons.zConfigTabUltraButton_TabPage_1.Click();
  let structurePage = configTabCtrl.tabControl.UltraTabPageControl.StructurePage;
  let ultraTree = structurePage.ConfigurationControl_Fill_Panel.ultraTabControl1.ultraTabPageControl1.LogicalTreePanel.logicalTree.ultraTreeLogical;
  let wnd = ultraTree.Logical_Tree;
  //wnd.Click(83, 7);
  wnd.ClickR(83, 7);
  ultraTree.PopupMenu.Click("Add Document");
  let containerControl = configClient.ResourceControlCenterForm.ContainerControl;
  containerControl.panelTopButtons.btnImportUrl.Click();
  let containerControl2 = configClient.UrlSelectorForm.ContainerControl;
  containerControl2.textBox2.textBox2_EmbeddableTextBox.SetText("Google");
  let ultraTextEditor = containerControl2.textBox1;
  ultraTextEditor.Editor_Edit_Area.Drag(82, 5, -101, 1);
  ultraTextEditor.textBox1_EmbeddableTextBox.SetText("https://www.google.de/");
  containerControl2.okButton.ClickButton();
  containerControl.btnOK.ClickButton();
  wnd = structurePage.zConfigurationControl_Toolbars_Dock_Area_Top.configBar;
  wnd.Save_Changes.Click();
  wnd.Activate_working_copy_of_configuration.Click();
  configClient.ActivationView.ContainerControl.okButton.ClickButton();
  configClientForm.Configuration_Client_127_0_0_1_User_admin_.Close.Click();
  TestedApps.OperatorClient1.Run(1, true);
  let operatorClient = Aliases.OperatorClient;
  operatorClient.HwndSource_StyleableWindow.StyleableWindow.ButtonOk.ClickButton();
  let monitorForm = operatorClient.Control;
  monitorForm.ContainerControl.WindowDockingArea.DockableWindow2.LogicalTree.LogicalTree.Logical_Tree.Google.Drag(62, 10, 1151, 116);
  Regions.Before_you_continue_to_Google_Search.Check(Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo8.DocumentContainer.WebBrowser.WebBrowserBaseNativeWindow.Shell_DocObject_View.Before_you_continue_to_Google_Search, false, false, 6825, 25);
  aqObject.CheckProperty(Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo8, "WndCaption", cmpEqual, "Google");
  monitorForm.Button.ClickButton();
  operatorClient.BoschMessageBox.ContainerControl.buttonMiddle.ClickButton();
}

