//USEUNIT Helpers
function TC399970()
{
  TestedApps.ConfigClient.Run();
  let configClient = Aliases.ConfigClient;
  let configClientForm = configClient.ConfigClientForm;
  let configTabCtrl = configClientForm.ConfigTabCtrl;
  configTabCtrl.zpnlButtons.zConfigTabUltraButton_TabPage_11.Click();
  let userAccessControl = configTabCtrl.tabControl.UltraTabPageControl.UserAccessControl;
  let panel2 = userAccessControl.ConfigurationControl_Fill_Panel;
  let ultraTree = panel2.userGroupTreeTabControl.ultraTabControl1.ultraTabPageControl1.ultraTreeLocalGroups;
  let wnd = ultraTree.User_groups.Admin_Group;
  wnd.Click();
  wnd.ClickR();
  ultraTree.PopupMenu.Click("New user");
  wnd.New_user.Click();
  ultraTree.ultraTreeLocalGroups_LabelEditNode.SetText("MySuperuser");
  let ultraGroupBox = panel2.rightpaneDefault.UserTabControl.ultraTabControl1.ultraTabPageControl1.ultraGroupBox2;
  ultraGroupBox.checkBoxPasswordHasToBeChanged.Click();
  ultraGroupBox.Click();
  let ultraTextEditor = ultraGroupBox.textEditorPassword;
  ultraTextEditor.Editor_Edit_Area.Click();
  ultraTextEditor.textEditorPassword_EmbeddableTextBox.SetText(Project.Variables.Password1);
  ultraTextEditor = ultraGroupBox.textEditorConfirmPassword;
  ultraTextEditor.Editor_Edit_Area.Click();
  ultraTextEditor.textEditorConfirmPassword_EmbeddableTextBox.SetText(Project.Variables.Password1);
  ultraGroupBox.buttonApply.Click();
  configClient.BoschMessageBox.ContainerControl.buttonRight.ClickButton();
  wnd = userAccessControl.zConfigurationControl_Toolbars_Dock_Area_Top.configBar;
  wnd.Save_Changes.Click();
  wnd.Activate_working_copy_of_configuration.Click();
  configClient.ActivationView.ContainerControl.okButton.ClickButton();
  wnd.Activate_working_copy_of_configuration.WaitProperty("Enabled", false, 20000);
  configClientForm.UltraToolbarsDockArea.Toolbar.System.Click();
  configClient.DropDownForm.PopupControl.System.Exit.Click();
  TestedApps.OperatorClientWithoutAutoLogon.Run();
  let operatorClient = Aliases.OperatorClient;
  let logonView = operatorClient.HwndSource_StyleableWindow.StartupWindowView.LogonView;
  logonView.UserNameBox.SetText("MySuperUser");
  let passwordBox = logonView.PasswordBox;
  passwordBox.Click();
  passwordBox.SetText(Project.Variables.Password1);
  logonView.ButtonOk.ClickButton();
  aqObject.CheckProperty(Aliases.OperatorClient.Control, "WndCaption", cmpContains, "Operator Client", false);
  operatorClient.Control.Button2.ClickButton();
  TestedApps.ConfigClientWithoutAutoLogon.Run();
  let panel = configClient.OnSiteClientLoginForm.login;
  let ultraButton = panel.btnOK;
  panel.user.user_EmbeddableTextBox.SetText("MySuperUser");
  ultraTextEditor = panel.password;
  ultraTextEditor.Editor_Edit_Area.Click();
  ultraTextEditor.password_EmbeddableTextBox.SetText(Project.Variables.Password1);
  ultraButton.ClickButton();
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm.Configuration_Client_127_0_0_1_User_MySuperUser_.System_Menu_Bar.System, "Enabled", cmpEqual, true);
  //cleanup
  Helpers.OperatorClient_RestoreDefaultSettings();
  Helpers.OperatorClient_Close();
  Helpers.ConfigClient_Close();
  Helpers.RestoreBvmsConfig();
  //restor OC and CC login dialog predefined user name
  TestedApps.ConfigClientWithoutAutoLogon.Run();
  panel.user.user_EmbeddableTextBox.SetText("admin");
  ultraButton.ClickButton();
  aqObject.CheckProperty(Aliases.ConfigClient.ConfigClientForm, "WndCaption", cmpContains, "Configuration Client", false);
  Helpers.ConfigClient_Close();
  TestedApps.OperatorClientWithoutAutoLogon.Run();
  styleableWindow.UserNameBox.SetText("admin");
  styleableWindow.ButtonOk.ClickButton();
  aqObject.CheckProperty(Aliases.OperatorClient.Control, "WndCaption", cmpContains, "Operator Client", false);
  Helpers.OperatorClient_Close();

}

