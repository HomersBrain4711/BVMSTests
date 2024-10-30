//USEUNIT Helpers

//raw recording with some minimal adaptions to make it work
function TC_56757_CompoundEvents_Recorded()
{
  TestedApps.ConfigClient.Run(1, true);
  let configClient = Aliases.ConfigClient;
  configClient.OnSiteClientLoginForm.login.btnOK.ClickButton();
  let configClientForm = configClient.ConfigClientForm;
  let configTabCtrl = configClientForm.ConfigTabCtrl;
  let ultraTabControl = configTabCtrl.tabControl;
  let panel = ultraTabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel;
  let wnd = panel.deviceTree.Device_Tree.Other_Devices_11_;
  wnd.Click(10, 12);
  wnd.Virtual_Inputs.Click(50, 14);
  panel.panelProperties.VirtualInputsEditor.virtInpTabControl.virtInputsTab.btnAdd.Click();
  let containerControl = configClient.AddDlg.ContainerControl;
  let numericUpDown = containerControl.endNr;
  numericUpDown.UpDownEdit.Drag(13, 7, -29, 2);
  numericUpDown.wValue = 3;
  containerControl.btnAdd.Click();
  let configTabPanel = configTabCtrl.zpnlButtons;
  configTabPanel.zConfigTabUltraButton_TabPage_1.Click();
  configClient.BoschMessageBox.ContainerControl.buttonLeft.ClickButton();
  let structurePage = ultraTabControl.UltraTabPageControl2.StructurePage;
  wnd = structurePage.ConfigurationControl_Fill_Panel.deviceTree.ultraTreeDevices.Device_Tree_10_.Other_Devices_9_;
  wnd.Click(10, 10);
  wnd.Virtual_Inputs_3_.Drag(58, 14, 325, -171);
  structurePage.zConfigurationControl_Toolbars_Dock_Area_Top.configBar.Save_Changes.Click();
  configTabPanel.zConfigTabUltraButton_TabPage_7.Click();
  let eventConfigCtrl = ultraTabControl.UltraTabPageControl3.EventConfigCtrl;
  wnd = eventConfigCtrl.zConfigurationControl_Toolbars_Dock_Area_Top.configBar;
  wnd.Create_Compound_Event.Click();
  let ultraPanelClientAreaUnsafe = configClient.CreateCompoundEventDlg.createCompoundEventDlgFillPanel.UltraPanelClientAreaUnsafe;
  let ultraGroupBox = ultraPanelClientAreaUnsafe.ultraGroupBox2;
  let wnd2 = ultraGroupBox.ultraTreeStates.Events_and_Alarms.System_Devices;
  wnd2.Click(12, 11);
  let wnd3 = wnd2.Virtual_Inputs;
  wnd3.Click(13, 10);
  wnd2 = wnd3.Input_State;
  wnd2.Click(14, 10);
  wnd2.Click(7, 10);
  wnd2.Input_Closed.Click(82, 11);
  let ultraTree = ultraGroupBox.ultraTreeObjects;
  ultraTree.Virtual_Input_1.Click(29, 8);
  ultraTree.Virtual_Input_2.Click(28, 8);
  ultraTree.Virtual_Input_3.Click(30, 7);
  ultraPanelClientAreaUnsafe.btnOk.ClickButton();
  wnd2 = wnd.Save_Changes;
  wnd2.Click();
  panel = eventConfigCtrl.ConfigurationControl_Fill_Panel;
  wnd3 = panel.ultraTreeEvents.Events_and_Alarms.System_Devices;
  wnd3.Click(8, 11);
  let wnd4 = wnd3.Compound_Events;
  wnd4.Click(13, 9);
  wnd3 = wnd4.Compound_Event_State;
  wnd3.Click(11, 10);
  wnd3.Compound_Event_is_True.Click(109, 11);
  panel.backgroundPanel.ultraTabControl1.ultraTabPageControl2.eventsCtrl1.eventGrid.Data_Area.ColScrollRegion_0_RowScrollRegion_0.CompoundEvent.Schedule.Click();
  configClient.DropDownForm.ValueListDropDown.Always.Click(56, 7);
  wnd2.Click();
  wnd.Activate_working_copy_of_configuration.Click();
  configClient.ActivationView.ContainerControl.okButton.ClickButton();
  TestedApps.OperatorClient.Run(1, true);
  let operatorClient = Aliases.OperatorClient;
  operatorClient.HwndSource_StyleableWindow2.StyleableWindow.ButtonOk.ClickButton();
  Helpers.OperatorClient_WaitForReady();
  TestedApps.VirtualInputsTest.Run(1, true);

  let form1 = Aliases.VirtualInputsTest.Form1;
  form1.connectGrp.connectBtn.ClickButton();
  let button2 = form1.groupBoxSwitchState.buttonSwitchOn;
  button2.ClickButton();
  let groupBox = form1.inputSelectGrp;
  let textBox = groupBox.inputNr;
  textBox.Drag(49, 9, -56, -1);
  textBox.SetText("2");
  let textBox2 = groupBox.inputNr2;
  textBox2.Drag(18, 6, -37, 6);
  textBox2.SetText("2");
  button2.ClickButton();
  textBox.Drag(48, 10, -58, 4);
  textBox.SetText("3");
  textBox2.Drag(21, 10, -42, 2);
  textBox2.SetText("3");
  button2.ClickButton();
  aqObject.CheckProperty(Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.AlarmList.ultraGridAlarms.Data_Area.ColScrollRegion_0_RowScrollRegion_0.Item.Alarm_Title.Editor_Edit_Area, "Value", cmpEqual, "Compound Event is True");
  Helpers.OperatorClient_RestoreDefaultSettings();
  Helpers.OperatorClient_Close();
  form1.BVMS_Virtual_Input_Test.Close.Click();
  Helpers.ConfigClient_RestoreConfig();
  Helpers.ConfigClient_Close();
}


//refactored recording: eliminate coordinate-based actions, reasonable renaming of UI elements
function TC_56757_CompoundEvents_Refactored()
{
  //Configuration
  TestedApps.ConfigClient.Run(1, true);
  let configClient = Aliases.ConfigClient;
  configClient.OnSiteClientLoginForm.login.btnOK.ClickButton();
  let configClientForm = configClient.ConfigClientForm;
  let configTabCtrl = configClientForm.ConfigTabCtrl;
  let ultraTabControl = configTabCtrl.tabControl;
  let panel = ultraTabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel;
  let wndOtherDevices = panel.deviceTree.Device_Tree.Other_Devices_11_;
  wndOtherDevices.Expand();
  wndOtherDevices.Virtual_Inputs.Click();
  panel.panelProperties.VirtualInputsEditor.virtInpTabControl.virtInputsTab.btnAdd.Click();
  let containerControl = configClient.AddDlg.ContainerControl;
  let numericUpDown = containerControl.endNr;
  numericUpDown.wValue = 3;
  containerControl.btnAdd.Click();
  let configTabPanel = configTabCtrl.zpnlButtons;
  configTabPanel.zConfigTabUltraButton_TabPage_1.Click();
  configClient.BoschMessageBox.ContainerControl.buttonLeft.ClickButton();
  let structurePage = ultraTabControl.UltraTabPageControl2.StructurePage;
  wndOtherDevices = structurePage.ConfigurationControl_Fill_Panel.deviceTree.ultraTreeDevices.Device_Tree_10_.Other_Devices_9_;
  wndOtherDevices.Expand();
  let wndLogicalTree = ultraTabControl.UltraTabPageControl2.StructurePage.ConfigurationControl_Fill_Panel.ultraTabControl1.ultraTabPageControl1.LogicalTreePanel.logicalTree.ultraTreeLogical.Logical_Tree;
  let wndConfiguredVirtualInputs = wndOtherDevices.Virtual_Inputs_3_;
  Helpers.DragAndDrop(wndConfiguredVirtualInputs, wndLogicalTree);
  structurePage.zConfigurationControl_Toolbars_Dock_Area_Top.configBar.Save_Changes.Click();
  configTabPanel.zConfigTabUltraButton_TabPage_7.Click();
  let eventConfigCtrl = ultraTabControl.UltraTabPageControl3.EventConfigCtrl;
  wndOtherDevices = eventConfigCtrl.zConfigurationControl_Toolbars_Dock_Area_Top.configBar;
  wndOtherDevices.Create_Compound_Event.Click();
  let ultraPanelClientAreaUnsafe = configClient.CreateCompoundEventDlg.createCompoundEventDlgFillPanel.UltraPanelClientAreaUnsafe;
  let ultraGroupBox = ultraPanelClientAreaUnsafe.ultraGroupBox2;
  let wndSystemDevices = ultraGroupBox.ultraTreeStates.Events_and_Alarms.System_Devices;
  wndSystemDevices.Expand();
  let wndVirtualInputs = wndSystemDevices.Virtual_Inputs;
  wndVirtualInputs.Expand();
  let wndInputStates = wndVirtualInputs.Input_State;
  wndInputStates.Expand();
  wndInputStates.Input_Closed.Click();
  let ultraTree = ultraGroupBox.ultraTreeObjects;
  ultraTree.Virtual_Input_1.Click();
  ultraTree.Virtual_Input_1.Keys(" ");
  ultraTree.Virtual_Input_2.Click();
  ultraTree.Virtual_Input_1.Keys(" ");
  ultraTree.Virtual_Input_3.Click();
  ultraTree.Virtual_Input_1.Keys(" ");
  ultraPanelClientAreaUnsafe.btnOk.ClickButton();
  wndSystemDevices = wndOtherDevices.Save_Changes;
  wndSystemDevices.Click();
  panel = eventConfigCtrl.ConfigurationControl_Fill_Panel;
  wndVirtualInputs = panel.ultraTreeEvents.Events_and_Alarms.System_Devices;
  wndVirtualInputs.Expand();
  let wndCompoundEvents = wndVirtualInputs.Compound_Events;
  wndCompoundEvents.Expand();
  let wndCompoundEventState = wndCompoundEvents.Compound_Event_State;
  wndCompoundEventState.Expand();
  wndCompoundEventState.Compound_Event_is_True.Click();
  panel.backgroundPanel.ultraTabControl1.ultraTabPageControl2.eventsCtrl1.eventGrid.Data_Area.ColScrollRegion_0_RowScrollRegion_0.CompoundEvent.Schedule.Click();
  configClient.DropDownForm.ValueListDropDown.Always.Click();
  wndSystemDevices.Click();
  
  //Deployment / Activation
  wndOtherDevices.Activate_working_copy_of_configuration.Click();
  configClient.ActivationView.ContainerControl.okButton.ClickButton();

  //Operation
  TestedApps.OperatorClient.Run(1, true);
  let operatorClient = Aliases.OperatorClient;
  operatorClient.HwndSource_StyleableWindow2.StyleableWindow.ButtonOk.ClickButton();
  Helpers.OperatorClient_WaitForReady();
  TestedApps.VirtualInputsTest.Run(1, true);
  let virtualInputTestForm = Aliases.VirtualInputsTest.Form1;
  let btnConnect = virtualInputTestForm.connectGrp.connectBtn;
  btnConnect.ClickButton();
  let btnSwitchOn = virtualInputTestForm.groupBoxSwitchState.buttonSwitchOn;
  btnSwitchOn.ClickButton();
  let groupBox = virtualInputTestForm.inputSelectGrp;
  let textBoxInputsFrom = groupBox.inputNr;
  textBoxInputsFrom.SetText("2");
  let textBoxInputsTo = groupBox.inputNr2;
  textBoxInputsTo.SetText("2");
  btnSwitchOn.ClickButton();
  textBoxInputsFrom.SetText("3");
  textBoxInputsTo.SetText("3");
  btnSwitchOn.ClickButton();

  //Verification
  let alarmListItemCompoundEvent = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.AlarmList.ultraGridAlarms.Data_Area.ColScrollRegion_0_RowScrollRegion_0.Item.Alarm_Title.Editor_Edit_Area;
  Sys.HighlightObject(alarmListItemCompoundEvent);
  aqObject.CheckProperty(alarmListItemCompoundEvent, "Value", cmpEqual, "Compound Event is True");
  
  //Cleanup: Close Applications, restore original Configurationm
  Helpers.OperatorClient_RestoreDefaultSettings();
  Helpers.OperatorClient_Close();
  virtualInputTestForm.BVMS_Virtual_Input_Test.Close.Click();
  Helpers.ConfigClient_RestoreConfig();
  Helpers.ConfigClient_Close();
}