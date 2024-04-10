//USEUNIT Helpers
function TC57682_Camera_Several_Times_in_CameoSpace()
{
  TestedApps.OperatorClient.Run();
  let operatorClient = Aliases.OperatorClient;
  let camera1 = operatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.LogicalTree.LogicalTree.Logical_Tree.Camera_1_5_;
  let cameoSpacePanel = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel;

  Helpers.DragAndDrop(camera1, cameoSpacePanel.Cameo1);
  Helpers.DragAndDrop(camera1, cameoSpacePanel.Cameo8);
  Helpers.DragAndDrop(camera1, cameoSpacePanel.Cameo4);
  Helpers.DragAndDrop(camera1, cameoSpacePanel.Cameo5);
  Helpers.DragAndDrop(camera1, cameoSpacePanel.Cameo7);

  aqObject.CheckProperty(cameoSpacePanel.Cameo1, "WndCaption", cmpContains, "Camera 1");
  aqObject.CheckProperty(cameoSpacePanel.Cameo8, "WndCaption", cmpContains, "Camera 1");
  aqObject.CheckProperty(cameoSpacePanel.Cameo4, "WndCaption", cmpContains, "Camera 1");
  aqObject.CheckProperty(cameoSpacePanel.Cameo5, "WndCaption", cmpContains, "Camera 1");
  aqObject.CheckProperty(cameoSpacePanel.Cameo7, "WndCaption", cmpContains, "Camera 1");

  Helpers.OperatorClient_RestoreDefaultSettings();
  Helpers.OperatorClient_Close();
}



function ResizeAndVerifyCameo(cameo)
{
  let originalWidth = cameo.Width;
  let originalHeight = cameo.Height;

  Helpers.ResizeCameo(cameo, 2, 1);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth * 2);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight);
  Helpers.ResizeCameo(cameo, -1/2, 1);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight);

  Helpers.ResizeCameo(cameo, 2, 2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth * 2);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight * 2);
  Helpers.ResizeCameo(cameo, -1/2, -1/2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight);

  Helpers.ResizeCameo(cameo, 1, 2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight * 2);
  Helpers.ResizeCameo(cameo, 1, -1/2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight);

  Helpers.ResizeCameo(cameo, -2, 2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth * 2);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight * 2);
  Helpers.ResizeCameo(cameo, 1/2, -1/2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight);

  Helpers.ResizeCameo(cameo, -3, 1);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth * 3);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight);
  Helpers.ResizeCameo(cameo, 1/3, 1);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight);

  Helpers.ResizeCameo(cameo, -3, -2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth * 3);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight * 2);
  Helpers.ResizeCameo(cameo, 1/3, 1/2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight);

  Helpers.ResizeCameo(cameo, 1, -2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight * 2);
  Helpers.ResizeCameo(cameo, 1, 1/2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight);

  Helpers.ResizeCameo(cameo, 2, -2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth * 2);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight * 2);
  Helpers.ResizeCameo(cameo, -1/2, 1/2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, originalWidth);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, originalHeight);
  
}

function TC109222_Flexible_Cameo_Ratios_Resizing_Cameos()
{
  TestedApps.OperatorClient.Run();
  let operatorClient = Aliases.OperatorClient;
  let containerControl = operatorClient.Control.ContainerControl;
  let cameoSpace = containerControl.WindowDockingArea.DockableWindow.CameoSpace;
  let buttonIncreaseGranularity = cameoSpace.ToggleLiveCameoSpace.UltraToolbarsDockArea2.Toolbar.Show_more_Image_pane_rows;
  let liveCameoSpacePanel = cameoSpace.ToggleLiveCameoSpace.CameoSpacePanel;
  
  //live mode
  let cameo = liveCameoSpacePanel.Cameo8;
  let camera1 = containerControl.WindowDockingArea.DockableWindow2.LogicalTree.LogicalTree.Logical_Tree.Camera_1_5_;

  Helpers.DragAndDrop(camera1, cameo);
  cameo.Click();
  ResizeAndVerifyCameo(cameo);
  buttonIncreaseGranularity.Click();
  ResizeAndVerifyCameo(cameo);
  buttonIncreaseGranularity.Click();
  ResizeAndVerifyCameo(cameo);
  
  //playback mode
  containerControl.UltraToolbarsDockArea.Toolbar.System.Click();
  operatorClient.DropDownForm3.PopupControl.System2.Playback_mode.Click();
  let playbackCameoSpace = cameoSpace.TogglePlaybackCameoSpace;
  buttonIncreaseGranularity = playbackCameoSpace.UltraToolbarsDockArea.Toolbar.Show_more_Image_pane_rows;
  buttonIncreaseGranularity.Click()
  cameo = playbackCameoSpace.CameoSpacePanel.Cameo8;
  cameo.Click();
  ResizeAndVerifyCameo(cameo);
  buttonIncreaseGranularity.Click();
  ResizeAndVerifyCameo(cameo);
  buttonIncreaseGranularity.Click();
  ResizeAndVerifyCameo(cameo);
  
  Helpers.OperatorClient_RestoreDefaultSettings();
  Helpers.OperatorClient_Close();
  
}

function TC151308_Configure_Automatic_Stream_Switch()
{
  TestedApps.ConfigClient.Run();
  let configClient = Aliases.ConfigClient;

  let configClientForm = configClient.ConfigClientForm;
  let deviceTreeConfigurationPage = configClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage;
  panel = deviceTreeConfigurationPage.ConfigurationControl_Fill_Panel;
  let ultraTree = panel.deviceTree;
  let wnd = ultraTree.Device_Tree.Workstations;
  wnd.Click();
  wnd.ClickR();
  ultraTree.PopupMenu.Click("Add Workstation");
  let embeddableTextBoxWithUIPermissions = configClient.NetworkAddressForm.ContainerControl.networkAddress.networkAddress_EmbeddableTextBox;
  embeddableTextBoxWithUIPermissions.SetText("test");
  embeddableTextBoxWithUIPermissions.Keys("[Enter]");
  let ultraGroupBox = panel.panelProperties.WorkstationConfig.workstationTabControl.ultraTabPageControl1.globalSettingsBox;
  ultraGroupBox.overrideRecordingSettingsCheckBox.Click();
  ultraGroupBox.liveStreamComboBox.Editor_Edit_Area.Click();
  let valueListDropDownUnsafe = configClient.DropDownForm.ValueListDropDown;
  valueListDropDownUnsafe.Image_pane_size_optimized.Click();
  ultraGroupBox.liveStreamThreeStreamsCamerasComboEditor.Editor_Edit_Area.Click();
  valueListDropDownUnsafe.Image_pane_size_optimized2.Click();
  wnd = deviceTreeConfigurationPage.zConfigurationControl_Toolbars_Dock_Area_Top.configBar;
  wnd.Save_Changes.Click();
  wnd.Activate_working_copy_of_configuration.Click();
  configClient.ActivationView.ContainerControl.okButton.ClickButton();
  aqUtils.Delay(10000);
  ultraTree.Device_Tree.Workstations.Click();
  ultraTree.Device_Tree.Workstations.Workstation_test_.Click();

  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.panelProperties.WorkstationConfig.workstationTabControl.ultraTabPageControl1.globalSettingsBox.liveStreamComboBox.Editor_Edit_Area, "Value", cmpEqual, "Image pane size optimized");
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.panelProperties.WorkstationConfig.workstationTabControl.ultraTabPageControl1.globalSettingsBox.liveStreamThreeStreamsCamerasComboEditor.Editor_Edit_Area, "Value", cmpEqual, "Image pane size optimized");

  Helpers.ConfigClient_RestoreConfig();
  Helpers.ConfigClient_Close();
}

function TC165705_Default_Setting_of_Hardware_Acceleration()
{
  TestedApps.OperatorClient.Run();
  let operatorClient = Aliases.OperatorClient;
  let monitorForm = operatorClient.Control;
  let wnd = monitorForm.ContainerControl.UltraToolbarsDockArea.Toolbar.Extras;
  wnd.Click();
  let wnd2 = operatorClient.DropDownForm3.PopupControl.Extras;
  wnd2.Options_.Click();
  let containerControl = operatorClient.OptionsForm.ContainerControl;
  let ultraTabControl = containerControl.panel1.tabControlOptions;
  ultraTabControl.Display.Click();

  aqObject.CheckProperty(Aliases.OperatorClient.OptionsForm.ContainerControl.panel1.tabControlOptions.ultraTabPageControlDisplay.FlowLayoutPanel.DisplayGpuDecodingOptions.ultraGroupBoxPreferHardwareAcceleration.chkPreferHardwareAcceleration, "ToggleState", cmpEqual, "1");
  ultraTabControl.ultraTabPageControlDisplay.FlowLayoutPanel.DisplayGpuDecodingOptions.ultraGroupBoxPreferHardwareAcceleration.chkPreferHardwareAcceleration.Click();
  aqObject.CheckProperty(Aliases.OperatorClient.OptionsForm.ContainerControl.panel1.tabControlOptions.ultraTabPageControlDisplay.FlowLayoutPanel.DisplayGpuDecodingOptions.ultraGroupBoxPreferHardwareAcceleration.chkPreferHardwareAcceleration, "ToggleState", cmpEqual, 0);
  //let ultraButton = containerControl.panel2.btnOK;
  //ultraButton.ClickButton();
  containerControl.Keys("[Enter]");
  Helpers.OperatorClient_Close();

  TestedApps.OperatorClient.Run();
  wnd.Click();
  wnd2.Options_2.Click();
  ultraTabControl.Display2.Click();

  aqObject.CheckProperty(Aliases.OperatorClient.OptionsForm.ContainerControl.panel1.tabControlOptions.ultraTabPageControlDisplay.FlowLayoutPanel.DisplayGpuDecodingOptions.ultraGroupBoxPreferHardwareAcceleration.chkPreferHardwareAcceleration, "ToggleState", cmpEqual, 0);

  //ultraButton.ClickButton();
  containerControl.Keys("[Enter]");
  Helpers.OperatorClient_RestoreDefaultSettings();
  Helpers.OperatorClient_Close();
}



function TC57403_Login_after_Password_Change_in_OperatorClient()
{
  TestedApps.OperatorClient.Run();
  let operatorClient = Aliases.OperatorClient;
  let styleableWindow = operatorClient.HwndSource_StyleableWindow.StyleableWindow;
  let button = styleableWindow.ButtonOk;
//  button.ClickButton();
  let wnd = operatorClient.Control.ContainerControl.UltraToolbarsDockArea.Toolbar.System;
  wnd.Click();
  let popupMenuControlTrusted = operatorClient.DropDownForm3.PopupControl;
  popupMenuControlTrusted.System.Change_password_.Click();
  let containerControl = operatorClient.ChangePasswordForm.ContainerControl;
  let ultraGroupBox = containerControl.ultraGroupBox1;
  let ultraTextEditor = ultraGroupBox.newPassword1TextBox;
  ultraTextEditor.Editor_Edit_Area.Click();
  ultraTextEditor.newPassword1TextBox_EmbeddableTextBox.SetText(Project.Variables.Password4);
  ultraTextEditor = ultraGroupBox.newPassword2TextBox;
  ultraTextEditor.Editor_Edit_Area.Click();
  ultraTextEditor.newPassword2TextBox_EmbeddableTextBox.SetText(Project.Variables.Password4);
  containerControl.okButton.Click();
  containerControl = operatorClient.BoschMessageBox.ContainerControl;
  containerControl.buttonRight.ClickButton();
  wnd.Click();
  popupMenuControlTrusted.System2.Logoff.Click();
  //containerControl.buttonMiddle.ClickButton();
  operatorClient.HwndSource_StyleableWindow2.StyleableWindow.ButtonYes.ClickButton();
  button.ClickButton();
  aqObject.CheckProperty(Aliases.OperatorClient.HwndSource_StyleableWindow.StyleableWindow.TitleMessage, "Visible", cmpEqual, true);
  aqObject.CheckProperty(Aliases.OperatorClient.HwndSource_StyleableWindow.StyleableWindow.TitleMessage, "Text", cmpEqual, "Wrong user name or password.");
  let passwordBox = styleableWindow.PasswordBox;
  passwordBox.Click();
  passwordBox.SetText(Project.Variables.Password4);
  passwordBox.Keys("[Enter]");

  Helpers.OperatorClient_RestoreDefaultSettings();
  Helpers.OperatorClient_Close();
  Helpers.RestoreBvmsConfig();
}


function TC58453_Menu_System_and_its_Menu_Entries()
{
  TestedApps.OperatorClient.Run();
  let operatorClient = Aliases.OperatorClient;
  let button = operatorClient.HwndSource_StyleableWindow.StyleableWindow.ButtonOk;
  //button.ClickButton();
  let menuSystem = operatorClient.Control.ContainerControl.UltraToolbarsDockArea.Toolbar.System;
  menuSystem.Click();
  let wnd2 = operatorClient.DropDownForm3.PopupControl.System2;
  let menuPlayback = wnd2.Playback_mode;
  aqObject.CheckProperty(menuPlayback, "Visible", cmpEqual, true);
  menuPlayback.Click();
  menuSystem.Click();
  let menuLive = wnd2.Live_mode;
  aqObject.CheckProperty(menuLive, "Visible", cmpEqual, true);
  menuLive.Click();
  menuSystem.Click();
  aqObject.CheckProperty(menuPlayback, "Visible", cmpEqual, true);
  let menuLogoff = wnd2.Logoff;
  menuLogoff.Click();
  let buttonNo = operatorClient.HwndSource_StyleableWindow2.StyleableWindow.ButtonNo;
  buttonNo.Click();
  menuSystem.Click();
  menuLogoff.Click();
  let buttonYes = operatorClient.HwndSource_StyleableWindow2.StyleableWindow.ButtonYes;
  buttonYes.Click();
  aqObject.CheckProperty(Aliases.OperatorClient.HwndSource_StyleableWindow.StyleableWindow.StartupWindowView, "Enabled", cmpEqual, true);
  button.ClickButton();
  menuSystem.Click();
  let menuExit = wnd2.Exit;
  menuExit.Click();
  buttonNo.Click();
  menuSystem.Click();
  menuExit.Click();
  buttonYes.ClickButton();
}
