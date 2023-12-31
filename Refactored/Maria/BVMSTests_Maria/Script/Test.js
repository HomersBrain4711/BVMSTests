﻿//USEUNIT Helpers
function TestSequence()
{
  CreateSequence();
  SelectSequence();
  VerifySequence();
  Helpers.OperatorClient_RestoreDefaultSettings();
  Helpers.OperatorClient_Close();
  Helpers.ConfigClient_RestoreConfig();
  Helpers.ConfigClient_Close();
}

function CreateSequence()
{
  TestedApps.ConfigClient.Run();
  //TestedApps.ConfigClient1.Run(1, true);
  let configClient = Aliases.ConfigClient;
  //configClient.OnSiteClientLoginForm.login.btnOK.ClickButton();
  let configTabCtrl = configClient.ConfigClientForm.ConfigTabCtrl;
  configTabCtrl.zpnlButtons.zConfigTabUltraButton_TabPage_1.Click();
  let wnd = configTabCtrl.tabControl.UltraTabPageControl.StructurePage.zConfigurationControl_Toolbars_Dock_Area_Top.configBar;
  wnd.Add_and_Edit_Camera_Sequence.Click();
  let containerControl = configClient.SequenceBuilderDlg.ContainerControl;
  let panel = containerControl.panel1;
  panel.panelsTopLeftButtons.btnAdd.Click();
  let containerControl2 = configClient.SequenceAddForm.ContainerControl;
  let embeddableTextBoxWithUIPermissions = containerControl2.tbSequenceName.tbSequenceName_EmbeddableTextBox;
  embeddableTextBoxWithUIPermissions.SetText("MySequence");
  containerControl2.dwellTimeComboBox1.Editor_Edit_Area.Click();
  let valueListDropDownUnsafe = configClient.DropDownForm.ValueListDropDown;
  valueListDropDownUnsafe.Drag(70, 67, 5, -34);
  valueListDropDownUnsafe.valuelist_ValueListItem_2.Click();
  let wnd2 = containerControl2.nudSteps.UpDownButtons.Forward;
  wnd2.Click();
  wnd2.Click();
  containerControl2.btOk.ClickButton();
  wnd2 = containerControl.panel2.sequenceBuilderGrid.grid.Data_Area.ColScrollRegion_0_RowScrollRegion_0;
  wnd2.Item.Camera.Editor_Edit_Area.Click();
  let wnd3 = valueListDropDownUnsafe.Camera_1;
  wnd3.Click();
  wnd2.Item_2.Camera.Editor_Edit_Area.Click();
  let wnd4 = valueListDropDownUnsafe.Camera_2;
  wnd4.Click();
  wnd2.Item_3.Camera.Editor_Edit_Area.Click();
  let wnd5 = valueListDropDownUnsafe.Camera_3;
  wnd5.Click();
  wnd2.Item_4.Camera.Editor_Edit_Area.Click();
  wnd4.Click();
  wnd2.Item_5.Camera.Editor_Edit_Area.Click();
  wnd5.Click();
  wnd2.Item_6.Camera.Editor_Edit_Area.Click();
  wnd4 = valueListDropDownUnsafe.Camera_4;
  wnd4.Click();
  wnd2.Item_7.Camera.Editor_Edit_Area.Click();
  wnd5.Click();
  wnd2.Item_8.Camera.Editor_Edit_Area.Click();
  wnd4.Click();
  wnd2.Item_9.Camera.Editor_Edit_Area.Click();
  wnd3.Click();
  panel.panelsAddToLogicalTree.buttonAddToTree.ClickButton();
  wnd.Save_Changes.Click();
  wnd.Activate_working_copy_of_configuration.Click();
  configClient.ActivationView.ContainerControl.okButton.ClickButton();
}

function SelectSequence()
{
  TestedApps.OperatorClient.Run();
  let operatorClient = Aliases.OperatorClient;
  operatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.LogicalTree.LogicalTree.Logical_Tree.MySequence_1_.ClickR();
  operatorClient.DropDownForm2.PopupControl.MenuAgent.Show.Click();
  operatorClient.DropDownForm.PopupControl.Show.in_selected_image_pane.Click();
}

function VerifySequence(forward = true)
{
  if(forward == true)
  {
    for(step = 1; step <=3; step++)
    {
      VerifySequenceStep(step);
      // wait a bit longer than configured sequence dwelltime (2 seconds) for the next step
      aqUtils.Delay(2100);
    }
  }
  else
  {
    for(step = 3; step >=1; step--)
    {
      VerifySequenceStep(step);
      // wait a bit longer than configured sequence dwelltime (2 seconds) for the next step
      aqUtils.Delay(2100);
    }
    
  }
}


function VerifySequenceStep(step)
{
  let Cameo1 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo1;
  let Cameo2 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo4;
  let Cameo3 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo7;
  if(step == 1)
  {
    aqObject.CheckProperty(Cameo1, "WndCaption", cmpContains, "Camera 1", false);
    aqObject.CheckProperty(Cameo2, "WndCaption", cmpContains, "Camera 2", false);
    aqObject.CheckProperty(Cameo3, "WndCaption", cmpContains, "Camera 3", false);
  }
  if(step == 2)
  {
    aqObject.CheckProperty(Cameo1, "WndCaption", cmpContains, "Camera 2", false);
    aqObject.CheckProperty(Cameo2, "WndCaption", cmpContains, "Camera 3", false);
    aqObject.CheckProperty(Cameo3, "WndCaption", cmpContains, "Camera 4", false);
  }
  if(step == 3)
  {
    aqObject.CheckProperty(Cameo1, "WndCaption", cmpContains, "Camera 3", false);
    aqObject.CheckProperty(Cameo2, "WndCaption", cmpContains, "Camera 4", false);
    aqObject.CheckProperty(Cameo3, "WndCaption", cmpContains, "Camera 1", false);
  }
}

