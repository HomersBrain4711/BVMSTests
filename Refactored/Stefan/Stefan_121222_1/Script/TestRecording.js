//USEUNIT Helpers
function TC400185()
{
  TestedApps.ConfigClient.Run();
  let configClient = Aliases.ConfigClient;
  let configClientForm = configClient.ConfigClientForm;
  let configTabCtrl = configClientForm.ConfigTabCtrl;
  configTabCtrl.zpnlButtons.zConfigTabUltraButton_TabPage_1.Click();
  let structurePage = configTabCtrl.tabControl.UltraTabPageControl.StructurePage;
  let ultraTree = structurePage.ConfigurationControl_Fill_Panel.ultraTabControl1.ultraTabPageControl1.LogicalTreePanel.logicalTree.ultraTreeLogical;
  let wnd = ultraTree.Logical_Tree;
  //wnd.Click(83, 7);
  wnd.ClickR();
  ultraTree.PopupMenu.Click("Add Document");
  let containerControl = configClient.ResourceControlCenterForm.ContainerControl;
  containerControl.panelTopButtons.btnImportUrl.Click();
  //urlConfigDlg has been changed from WinForms to WPF
  let urlConfigDlg = configClient.HwndSource_CommonWindowView.CommonWindowView;
  let textBoxName = urlConfigDlg.firstBox;
  let textBoxUrl = urlConfigDlg.TextboxUrl;
  textBoxName.SetText("Google");
  textBoxUrl.SetText("https://www.google.de/");
  // OK button in UrlConfigDlg not reachable, so we have to work with relative coordinates
  // of UrlConfigDlg to click the OK Button
  urlConfigDlg.Click(229, 360);
  containerControl.btnOK.ClickButton();
  wnd = structurePage.zConfigurationControl_Toolbars_Dock_Area_Top.configBar;
  wnd.Save_Changes.Click();
  wnd.Activate_working_copy_of_configuration.Click();
  configClient.ActivationView.ContainerControl.okButton.ClickButton();
  wnd.Activate_working_copy_of_configuration.WaitProperty("Enabled", false, 20000);

  //configClientForm.Configuration_Client_127_0_0_1_User_admin_.Close.Click();
  Helpers.ConfigClient_Close();
  TestedApps.OperatorClient.Run();
  let operatorClient = Aliases.OperatorClient;
  //operatorClient.HwndSource_StyleableWindow.StyleableWindow.ButtonOk.ClickButton();
  let monitorForm = operatorClient.Control;
  let googleDoc = monitorForm.ContainerControl.WindowDockingArea.DockableWindow2.LogicalTree.LogicalTree.Logical_Tree.Google;
  let cameo = operatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo8
  Helpers.DragAndDrop(googleDoc, cameo);
  //monitorForm.ContainerControl.WindowDockingArea.DockableWindow2.LogicalTree.LogicalTree.Logical_Tree.Google.Drag(62, 10, 1151, 116);
  //Regions.Before_you_continue_to_Google_Search.Check(Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo8.DocumentContainer.WebBrowser.WebBrowserBaseNativeWindow.Shell_DocObject_View.Before_you_continue_to_Google_Search, false, false, 6825, 25);
  aqObject.CheckProperty(cameo, "WndCaption", cmpEqual, "Google");
  aqUtils.Delay(5000);
  //monitorForm.Button.ClickButton();
  //operatorClient.BoschMessageBox.ContainerControl.buttonMiddle.ClickButton();
  Helpers.OperatorClient_RestoreDefaultSettings();
  Helpers.OperatorClient_Close();
  Helpers.RestoreBvmsConfig();
}

