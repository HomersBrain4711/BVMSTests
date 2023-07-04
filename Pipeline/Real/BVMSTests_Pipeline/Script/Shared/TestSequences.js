//USEUNIT Helpers
function TC56342_StartSequence()
{
  CreateSequence();
  TestedApps.OperatorClient.Run();
  Helpers.OperatorClient_WaitForReady();
  SelectSequenceByContextMenu();
  //first sequence run sometimes causes verification issues, so let the first sequence run pass by
  aqUtils.Delay(3000);
  VerifySequence();
  CloseSequence();
  SelectSequenceByDoubleClick();
  //first sequence run sometimes causes verification issues, so let the first sequence run pass by
  aqUtils.Delay(3000);
  VerifySequence();
  CloseSequence();
  SelectSequenceByDragAndDrop();
  //first sequence run sometimes causes verification issues, so let the first sequence run pass by
  aqUtils.Delay(3000);
  VerifySequence();
  CloseSequence();
  Helpers.OperatorClient_RestoreDefaultSettings();
  //Helpers.OperatorClient_Close();
  //Helpers.ConfigClient_RestoreConfig();
  //Helpers.ConfigClient_Close();
}

function TC56368_TestSequence_Pause()
{
  SelectSequenceByContextMenu();
  aqUtils.Delay(1000);
  let Cameo1 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo1;
  let Cameo2 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo4;
  let Cameo3 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo7;
  var Cameo1_initialCaption = Cameo1.WndCaption;
  var Cameo2_initialCaption = Cameo2.WndCaption;
  var Cameo3_initialCaption = Cameo3.WndCaption;
  
  //click pause button
  Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.UltraToolbarsDockArea.TrickPlayBar.Click(104, 13);
  
  //wait longer than dwell time of one sequence step, to assure the sequence is paused
  aqUtils.Delay(5000);

  aqObject.CheckProperty(Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo1, "WndCaption", cmpEqual, Cameo1_initialCaption);
  aqObject.CheckProperty(Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo4, "WndCaption", cmpEqual, Cameo2_initialCaption);
  aqObject.CheckProperty(Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo7, "WndCaption", cmpEqual, Cameo3_initialCaption);

  Helpers.OperatorClient_RestoreDefaultSettings();

  Helpers.OperatorClient_Close();
  Helpers.ConfigClient_RestoreConfig();
  Helpers.ConfigClient_Close();

}

function TC56369_TestSequence_ForwardBackward()
{
  SelectSequenceByContextMenu();
  let Cameo1 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo1;
  let Cameo2 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo4;
  let Cameo3 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo7;

  let trickPlayBar = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.UltraToolbarsDockArea.TrickPlayBar;
  
  
  //backward
  trickPlayBar.Click(74, 9);
  WaitForSequenceStep(3);
  VerifySequenceStep(3);
  VerifySequenceStep(2);
  VerifySequenceStep(1);
  VerifySequenceStep(3);
  VerifySequenceStep(2);
  VerifySequenceStep(1);

  //forward
  trickPlayBar.Click(127, 12);
  WaitForSequenceStep(1);
  VerifySequenceStep(1);
  VerifySequenceStep(2);
  VerifySequenceStep(3);
  VerifySequenceStep(1);
  VerifySequenceStep(2);
  VerifySequenceStep(3);
  Helpers.OperatorClient_RestoreDefaultSettings();
  
}

function TC56371_TestSequence_StepForward()
{
  var sequenceNavigationBar = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.UltraToolbarsDockArea.TrickPlayBar;
  SelectSequenceByContextMenu();
  //click Pause
  sequenceNavigationBar.Click(157, 12);
  var currentSequenceStep = FindSequenceStep();
  //verify, Sequence is paused
  aqUtils.Delay(5000);
  VerifySequenceStep(currentSequenceStep);

  for(var i = 0; i < 6; i++)
  {
    currentSequenceStep = FindSequenceStep();
    //click StepForward
    sequenceNavigationBar.Click(157, 12);
    var nextSequenceStep = GetNextSequenceStep(currentSequenceStep, true);
    //verify, next sequence step is shown
    VerifySequenceStep(nextSequenceStep);
    //verify, sequence is paused
    aqUtils.Delay(5000);
    VerifySequenceStep(nextSequenceStep);
  }
  CloseSequence();
  Helpers.OperatorClient_RestoreDefaultSettings();
}

function TC56370_TestSequence_StepBackward()
{
  var sequenceNavigationBar = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.UltraToolbarsDockArea.TrickPlayBar;
  SelectSequenceByContextMenu();
  //click Pause
  sequenceNavigationBar.Click(157, 12);
  var currentSequenceStep = FindSequenceStep();
  //verify, Sequence is paused
  aqUtils.Delay(5000);
  VerifySequenceStep(currentSequenceStep);

  for(var i = 0; i < 6; i++)
  {
    currentSequenceStep = FindSequenceStep();
    //click StepBackward
    sequenceNavigationBar.Click(48, 10);
    var nextSequenceStep = GetNextSequenceStep(currentSequenceStep, false);
    //verify, next sequence step is shown
    VerifySequenceStep(nextSequenceStep);
    //verify, sequence is paused
    aqUtils.Delay(5000);
    VerifySequenceStep(nextSequenceStep);
  }
  CloseSequence();
  Helpers.OperatorClient_RestoreDefaultSettings();
}

function CreateSequence()
{
  TestedApps.ConfigClient.Run();
  Helpers.ConfigClient_WaitForReady();
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

function SelectSequenceByContextMenu()
{
  let operatorClient = Aliases.OperatorClient;
  operatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.LogicalTree.LogicalTree.Logical_Tree.MySequence_1_.ClickR();
  operatorClient.DropDownForm2.PopupControl.MenuAgent.Show.Click();
  operatorClient.DropDownForm.PopupControl.Show.in_selected_image_pane.Click();
}

function SelectSequenceByDoubleClick()
{
  let operatorClient = Aliases.OperatorClient;
  operatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.LogicalTree.LogicalTree.Logical_Tree.MySequence_1_.DblClick();
}

function SelectSequenceByDragAndDrop()
{
  let operatorClient = Aliases.OperatorClient;
  let cameo1 = operatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo1;
  let sequenceInTree = operatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.LogicalTree.LogicalTree.Logical_Tree.MySequence_1_;
  Helpers.DragAndDrop(sequenceInTree, cameo1);
}

function VerifySequence(forward = true)
{
  if(forward == true)
  {
    WaitForSequenceStep(1);
    for(step = 1; step <=3; step++)
    {
      VerifySequenceStep(step);
      // wait a bit longer than configured sequence dwelltime (2 seconds) for the next step
      //aqUtils.Delay(2100);
    }
  }
  else
  {
    WaitForSequenceStep(3);
    for(step = 3; step >=1; step--)
    {
      VerifySequenceStep(step);
      // wait a bit longer than configured sequence dwelltime (2 seconds) for the next step
      //aqUtils.Delay(2100);
    }
    
  }
}


function VerifySequenceStep(step, timeout = 2100)
{
  //remember configured autowait timeout
  let timeout_org = Options.Run.Timeout;
  try
  {
    //set autowait timeout to dwell time of Sequence
    Options.Run.Timeout = timeout;

    let Cameo1 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo1;
    let Cameo2 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo4;
    let Cameo3 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo7;
    Cameo1.Refresh();
    Cameo2.Refresh();
    Cameo3.Refresh();
    if(step == 1)
    {
      //aqObject.CompareProperty(Cameo1.WndCaption, cmpEqual, "Camera 1", true, lmError);
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
    finally
    {
      //resore autowait timeout to original value
      Options.Run.Timeout = timeout_org;
    }
}
function GetNextSequenceStep(currentStep, forward = true)
{
  var nextSequenceStep = -1;
  if(forward)
  {
    switch(currentStep)
    {
      case 1:
        nextSequenceStep = 2;
        break;
      case 2:
        nextSequenceStep = 3;
        break;
      case 3:
        nextSequenceStep = 1;
        break;
      default:
        nextSequenceStep = -1;
        break;
    }
  }
  else
  {
    switch(currentStep)
    {
      case 1:
        nextSequenceStep = 3;
        break;
      case 2:
        nextSequenceStep = 1;
        break;
      case 3:
        nextSequenceStep = 2;
        break;
      default:
        nextSequenceStep = -1;
        break;
    }
    
  }
  return nextSequenceStep;
}

function FindSequenceStep()
{
  var step = -1;
  let Cameo1 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo1;
  let Cameo2 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo4;
  let Cameo3 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo7;
  Cameo1.Refresh();
  Cameo2.Refresh();
  Cameo3.Refresh();
  if((Cameo1.WndCaption.includes("Camera 1")) && (Cameo2.WndCaption.includes("Camera 2")) && (Cameo3.WndCaption.includes("Camera 3")))
  {
    step = 1;
  }
  if((Cameo1.WndCaption.includes("Camera 2")) && (Cameo2.WndCaption.includes("Camera 3")) && (Cameo3.WndCaption.includes("Camera 4")))
  {
    step = 2;
  }
  if((Cameo1.WndCaption.includes("Camera 3")) && (Cameo2.WndCaption.includes("Camera 4")) && (Cameo3.WndCaption.includes("Camera 1")))
  {
    step = 3;
  }
  
  return step;
}

function WaitForSequenceStep(step)
{
  var found = false;
  for(var i = 0; i < 200; i++)
  {
    if(FindSequenceStep() == step)
    {
      found = true;
      break;
    }
    aqUtils.Delay(100);
  }
  return found;
}

function CloseSequence()
{
  let cameoSpacePanel = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel;
  cameoSpacePanel.Cameo1.Close();
  cameoSpacePanel.Cameo4.Close();
  cameoSpacePanel.Cameo7.Close();
}

