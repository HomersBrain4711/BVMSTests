//USEUNIT Helpers

function CreateMonitorGroupAndAddItToLogicalTree(monitorGroupName)
{
  TestedApps.ConfigClient.Run();
  let configClient = Aliases.ConfigClient;
  let configClientForm = configClient.ConfigClientForm;
  let configTabCtrl = configClientForm.ConfigTabCtrl;
  let ultraTabControl = configTabCtrl.tabControl;
  let deviceTreeConfigurationPage = ultraTabControl.UltraTabPageControl.DeviceTreeConfigurationPage;
  let ultraTree = deviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.deviceTree;
  let wnd = ultraTree.Device_Tree.Monitors_2_;
  wnd.DblClick();
  let wnd2 = wnd.Monitor_groups;
  wnd2.Click();
  wnd2.ClickR();
  aqUtils.Delay(500);
  ultraTree.PopupMenu.Click("Add monitor group");
  let addMonitorGroupView = Aliases.ConfigClient.HwndSource_CommonWindowView.CommonWindowView.AddMonitorGroupView;
  let textBox = addMonitorGroupView.InputBox;
  textBox.Click();
  textBox.SetText(monitorGroupName);
  
  addMonitorGroupView.InputBox.Keys("[Tab]");
  addMonitorGroupView.Keys("[Enter]");


  deviceTreeConfigurationPage.zConfigurationControl_Toolbars_Dock_Area_Top.configBar.Save_Changes.Click();
  configTabCtrl.zpnlButtons.zConfigTabUltraButton_TabPage_1.Click();
  let structurePage = ultraTabControl.UltraTabPageControl2.StructurePage;
  wnd = structurePage.ConfigurationControl_Fill_Panel.deviceTree.ultraTreeDevices.Device_Tree_10_.Monitors_2_;
  wnd.DblClick();
  wnd2 = wnd.Monitor_groups_1_;
  wnd2.DblClick();
  let logicalTreeRootNode = ultraTabControl.UltraTabPageControl2.StructurePage.ConfigurationControl_Fill_Panel.ultraTabControl1.ultraTabPageControl1.LogicalTreePanel.logicalTree.ultraTreeLogical.Logical_Tree;
  
  Helpers.DragAndDrop(wnd2.MG_1, logicalTreeRootNode);
  
  wnd = structurePage.zConfigurationControl_Toolbars_Dock_Area_Top.configBar;
  wnd.Save_Changes.Click();
  wnd.Activate_working_copy_of_configuration.Click();
  configClient.ActivationView.ContainerControl.okButton.ClickButton();
  wnd.Activate_working_copy_of_configuration.WaitProperty("Enabled", false, 20000);
  Helpers.ConfigClient_Close();
}
  

  



function TC195638_Open_AMG_in_Cameo()
{
  let monitorGroupName = "My-MonGroup";
  CreateMonitorGroupAndAddItToLogicalTree(monitorGroupName);
  TestedApps.OperatorClient.Run();
  let operatorClient = Aliases.OperatorClient;
  let monitorForm = operatorClient.Control;
  let windowDockingArea = monitorForm.ContainerControl.WindowDockingArea;
  let wnd = windowDockingArea.DockableWindow2.LogicalTree.LogicalTree.Logical_Tree.MG_1;
  let cameoSpacePanel = operatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel

  wnd.DblClick();
  aqObject.CheckProperty(cameoSpacePanel.Cameo1, "WndCaption", cmpEqual, monitorGroupName, false);

  wnd.ClickR();
  operatorClient.DropDownForm3.PopupControl.MenuAgent.Show.Click();
  operatorClient.DropDownForm.PopupControl.Show.in_next_free_image_pane.Click();
  aqObject.CheckProperty(cameoSpacePanel.Cameo4, "WndCaption", cmpEqual, monitorGroupName, false);
 
  cameoSpacePanel.Cameo7.Click();
  wnd.ClickR();
  operatorClient.DropDownForm3.PopupControl.MenuAgent.Show.Click();
  operatorClient.DropDownForm.PopupControl.Show.in_selected_image_pane.Click();
  aqObject.CheckProperty(cameoSpacePanel.Cameo7, "WndCaption", cmpEqual, monitorGroupName, false);

  Helpers.DragAndDrop(wnd, cameoSpacePanel.Cameo2);
  aqObject.CheckProperty(cameoSpacePanel.Cameo2, "WndCaption", cmpEqual, monitorGroupName, false);
  
  windowDockingArea.DockableWindow.CameoSpace.ToggleLiveCameoSpace.UltraToolbarsDockArea.Toolbar.Close_all_Image_panes.Click();
  Helpers.OperatorClient_RestoreDefaultSettings();
  Helpers.OperatorClient_Close();
  Helpers.RestoreBvmsConfig();
}

function TC200917_Remove_AMG_Configuration_from_Workstation_Settings()
{
  TestedApps.ConfigClient.Run();
  let configClient = Aliases.ConfigClient;
  //configClient.OnSiteClientLoginForm.login.btnOK.ClickButton();
  let configClientForm = configClient.ConfigClientForm;
  let ultraTree = configClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.deviceTree;
  let wnd = ultraTree.Device_Tree.Workstations;
  wnd.Click();
  wnd.ClickR();
  ultraTree.PopupMenu.Click("Add Workstation");
  let embeddableTextBoxWithUIPermissions = configClient.NetworkAddressForm.ContainerControl.networkAddress.networkAddress_EmbeddableTextBox;
  embeddableTextBoxWithUIPermissions.SetText("testStation");
  embeddableTextBoxWithUIPermissions.Keys("[Enter]");
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.panelProperties.WorkstationConfig.workstationTabControl.Settings, "Enabled", cmpEqual, true);
  let tabControl = Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.panelProperties.WorkstationConfig.workstationTabControl;
  for(var i = 0; i < tabControl.ChildCount; i++)
  {
    aqObject.CheckProperty(tabControl.Child(i), "Name", cmpNotContains, "UIAObject(\"Assign Analog Monitor Groups\")", false);
  }

  configClientForm.Configuration_Client_127_0_0_1_User_admin_.Close.Click();
  configClient.BoschMessageBox.ContainerControl.buttonMiddle.ClickButton();
}

function TC56208_Adding_Bosch_ATM_POS_Bridge_No_IP()
{
  
  TestedApps.ConfigClient.Run();
  
  let configClient = Aliases.ConfigClient;
  let configClientForm = configClient.ConfigClientForm;
  let ultraTree = configClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.deviceTree;
  let wnd = ultraTree.Device_Tree.Other_Devices_12_;
  wnd.DblClick();
  let wnd2 = wnd.ATM_POS;
  wnd2.Click();
  wnd2.ClickR();
  ultraTree.PopupMenu.Click("Add Bosch ATM/POS-Bridge");
  let containerControl = configClient.PosBridgeAddDeviceForm.ContainerControl;
  containerControl.name.name_EmbeddableTextBox.SetText("nameBridge");
  let ultraButton = containerControl.okButton;
  ultraButton.Click();
  aqObject.CheckProperty(Aliases.ConfigClient.BoschMessageBox, "WndCaption", cmpEqual, "Configuration Client");
  aqObject.CheckProperty(Aliases.ConfigClient.BoschMessageBox.ContainerControl.ultraLabelText, "WndCaption", cmpEqual, "You haven´t entered a valid IP-address for the new device.");
  let ultraButton2 = configClient.BoschMessageBox.ContainerControl.buttonRight;
  ultraButton2.ClickButton();
  containerControl.networkAddress.networkAddress_EmbeddableTextBox.SetText("nameBridge");
  ultraButton.Click();
  aqObject.CheckProperty(Aliases.ConfigClient.BoschMessageBox.ContainerControl.ultraLabelText, "WndCaption", cmpEqual, "You haven´t entered a valid IP-address for the new device.");
  ultraButton2.ClickButton();
  containerControl.cancelBtn.ClickButton();
  Helpers.ConfigClient_Close();
}

function TC56207_Adding_Bosch_ATM_POS_Bridge_No_Name()
{
  TestedApps.ConfigClient.Run();
  let configClient = Aliases.ConfigClient;
  let configClientForm = configClient.ConfigClientForm;
  let deviceTree = configClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.deviceTree;
  let otherDevices = deviceTree.Device_Tree.Other_Devices_12_;
  otherDevices.DblClick();
  let atm_pos_device = otherDevices.ATM_POS;
  atm_pos_device.Click();
  atm_pos_device.ClickR();
  deviceTree.PopupMenu.Click("Add Bosch ATM/POS-Bridge");
  aqObject.CheckProperty(Aliases.ConfigClient.PosBridgeAddDeviceForm, "WndCaption", cmpEqual, "Add Bosch ATM/POS-Bridge");
  let containerControl = configClient.PosBridgeAddDeviceForm.ContainerControl;
  let ultraTextEditor = containerControl.networkAddress;
  ultraTextEditor.Editor_Edit_Area.Click();
  let embeddableTextBoxWithUIPermissions = ultraTextEditor.networkAddress_EmbeddableTextBox;
  embeddableTextBoxWithUIPermissions.SetText("123.123.123.123");
  embeddableTextBoxWithUIPermissions.Keys("[Enter]");
  aqObject.CheckProperty(Aliases.ConfigClient.BoschMessageBox.ContainerControl.ultraLabelText, "WndCaption", cmpEqual, "You haven´t entered a valid name for the new device.");
  configClient.BoschMessageBox.ContainerControl.buttonRight.ClickButton();
  containerControl.cancelBtn.ClickButton();
  Helpers.ConfigClient_Close();
}


function TC55923_Add_Email_SMTP_Devices()
{
  TestedApps.ConfigClient.Run();
  let configClient = Aliases.ConfigClient;
  let configClientForm = configClient.ConfigClientForm;
  let ultraTree = configClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.deviceTree;
  let wnd = ultraTree.Device_Tree.Other_Devices_12_;
  wnd.DblClick();
  let wnd2 = wnd.Communication_Devices;
  wnd2.Click();
  wnd2.ClickR();
  ultraTree.PopupMenu.Click("Add E-mail/SMTP Device");
  aqObject.CheckProperty(Aliases.ConfigClient.SmtpAddDeviceForm, "WndCaption", cmpEqual, "E-mail/SMTP Server");
  let containerControl = configClient.SmtpAddDeviceForm.ContainerControl;
  let ultraButton = containerControl.cancelButton;
  ultraButton.ClickButton();
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.deviceTree.Device_Tree.Other_Devices_12_.Communication_Devices, "Enabled", cmpEqual, true);
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.deviceTree.Device_Tree.Other_Devices_12_.Communication_Devices, "Name", cmpEqual, "UIAObject(\"Communication_Devices\")");
  wnd2.ClickR();
  ultraTree.PopupMenu.Click("Add E-mail/SMTP Device");
  let embeddableTextBoxWithUIPermissions = containerControl.textBox2.textBox2_EmbeddableTextBox;
  embeddableTextBoxWithUIPermissions.SetText("emailserver");
  ultraButton.ClickButton();
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.deviceTree.Device_Tree.Other_Devices_12_.Communication_Devices, "Enabled", cmpEqual, true);
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.deviceTree.Device_Tree.Other_Devices_12_.Communication_Devices, "Name", cmpEqual, "UIAObject(\"Communication_Devices\")");
  wnd2.ClickR();
  ultraTree.PopupMenu.Click("Add E-mail/SMTP Device");
  embeddableTextBoxWithUIPermissions.SetText("131651651431165654");
  ultraButton.ClickButton();
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.deviceTree.Device_Tree.Other_Devices_12_.Communication_Devices, "Enabled", cmpEqual, true);
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.deviceTree.Device_Tree.Other_Devices_12_.Communication_Devices, "Name", cmpEqual, "UIAObject(\"Communication_Devices\")");
  Helpers.ConfigClient_Close();
}


function TC55928_Delete_Email_SMTP_Devices()
{
  
  //checkpoints still needed!!
  TestedApps.ConfigClient.Run();
  let configClient = Aliases.ConfigClient;
  let deviceTree = configClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.deviceTree;
  let otherDevices = deviceTree.Device_Tree.Other_Devices_12_;
  otherDevices.DblClick();
  let communicationDevices = otherDevices.Communication_Devices;
  let communicationDevicesCount = communicationDevices.ChildCount;
  communicationDevices.Click();
  communicationDevices.ClickR();
  deviceTree.PopupMenu.Click("Add E-mail/SMTP Device");
  let embeddableTextBoxWithUIPermissions = configClient.SmtpAddDeviceForm.ContainerControl.textBox2.textBox2_EmbeddableTextBox;
  embeddableTextBoxWithUIPermissions.SetText("toBeDeleted");
  embeddableTextBoxWithUIPermissions.Keys("[Enter]");
  //check, that one communication device was added to device tree
  aqObject.CheckProperty(communicationDevices, "ChildCount", cmpEqual, communicationDevicesCount + 1, false);  
  let configClientForm = configClient.ConfigClientForm;
  let panel = configClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel;
  let ultraTabControl = panel.panelProperties.SmtpEditor.tabControl; 
  let ultraTabPageControl = ultraTabControl.network;
  
  ultraTabPageControl.ultraGroupBox2.Click();
  let addedCommunicationDevice = communicationDevices.toBeDeleted;

   
   
  communicationDevices.Click();
  addedCommunicationDevice.Click();
  addedCommunicationDevice.ClickR();
  deviceTree.PopupMenu.Click("Remove");
  
  let ultraButton = configClient.BoschMessageBox.ContainerControl.buttonMiddle;
  ultraButton.ClickButton();
  //check, that one communication device was deleted from device tree
  aqObject.CheckProperty(communicationDevices, "ChildCount", cmpEqual, communicationDevicesCount, false);  
  configClientForm.Configuration_Client_127_0_0_1_User_admin_.Close.Click();
  ultraButton.ClickButton();
}

function TC57489_Layout_of_CCTV_Keyboard_Config_Page()
{
  //Aliases.explorer.Program_Manager.SHELLDLL_DefView.Desktop.DblClick(41, 709);
  TestedApps.ConfigClient.Run();
  let configClient = Aliases.ConfigClient;
  //configClient.OnSiteClientLoginForm.login.btnOK.ClickButton();
  let configClientForm = configClient.ConfigClientForm;
  let panel = configClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel;
  let wnd = panel.deviceTree.Device_Tree.Other_Devices_12_;
  wnd.Click(7, 10);
  wnd.CCTV_Keyboards.Click(110, 10);
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.panelProperties.KeyboardAssignEditor.tabControl.tabPageControl.btnAdd, "Enabled", cmpEqual, true);
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.panelProperties.KeyboardAssignEditor.tabControl.tabPageControl.btnAdd, "WndCaption", cmpEqual, "Add Keyboard");
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.panelProperties.KeyboardAssignEditor.tabControl.tabPageControl.btnRemove, "Enabled", cmpEqual, true);
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.panelProperties.KeyboardAssignEditor.tabControl.tabPageControl.btnRemove, "WndCaption", cmpEqual, "Delete Keyboard");
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.panelProperties.KeyboardAssignEditor.tabControl.tabPageControl.grid.Data_Area.ColScrollRegion_0_RowScrollRegion_0.Band_Headers.Keyboard_Assignment, "Enabled", cmpEqual, true);
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.panelProperties.KeyboardAssignEditor.tabControl.tabPageControl.grid.Data_Area.ColScrollRegion_0_RowScrollRegion_0.Band_Headers.Keyboard_Assignment, "Name", cmpEqual, "UIAObject(\"Keyboard_Assignment\")");
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.panelProperties.KeyboardAssignEditor.tabControl.tabPageControl.grid.Data_Area.ColScrollRegion_0_RowScrollRegion_0.Band_Headers.Connection_Settings, "Enabled", cmpEqual, true);
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.DeviceTreeConfigurationPage.ConfigurationControl_Fill_Panel.panelProperties.KeyboardAssignEditor.tabControl.tabPageControl.grid.Data_Area.ColScrollRegion_0_RowScrollRegion_0.Band_Headers.Connection_Settings, "Name", cmpEqual, "UIAObject(\"Connection_Settings\")");
  wnd = panel.panelProperties.KeyboardAssignEditor.tabControl.tabPageControl.grid.Data_Area.ColScrollRegion_0_RowScrollRegion_0.Band_Headers;
  aqObject.CheckProperty(wnd.Keyboard_Type, "Name", cmpEqual, "UIAObject(\"Keyboard_Type\")");
  aqObject.CheckProperty(wnd.Connection, "Name", cmpEqual, "UIAObject(\"Connection\")");
  aqObject.CheckProperty(wnd.Port, "Name", cmpEqual, "UIAObject(\"Port\")");
  aqObject.CheckProperty(wnd.Baudrate, "Name", cmpEqual, "UIAObject(\"Baudrate\")");
  aqObject.CheckProperty(wnd.Data_Bits, "Name", cmpEqual, "UIAObject(\"Data_Bits\")");
  aqObject.CheckProperty(wnd.Stop_Bits, "Name", cmpEqual, "UIAObject(\"Stop_Bits\")");
  aqObject.CheckProperty(wnd.Parity, "Name", cmpEqual, "UIAObject(\"Parity\")");
  aqObject.CheckProperty(wnd.Port_Type, "Name", cmpEqual, "UIAObject(\"Port_Type\")");
  Helpers.ConfigClient_Close();


}

