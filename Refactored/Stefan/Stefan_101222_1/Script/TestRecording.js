//USEUNIT Helpers
function TC57682()
{
  TestedApps.OperatorClient.Run();
  let operatorClient = Aliases.OperatorClient;
  let monitorForm = operatorClient.Control;
  let camera1 = monitorForm.ContainerControl.WindowDockingArea.DockableWindow2.LogicalTree.LogicalTree.Logical_Tree.Camera_1_5_;
  let cameoSpacePanel = operatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel;
  //wnd.Click(66, 11);
  Helpers.DragAndDrop(camera1, cameoSpacePanel.Cameo1);
  Helpers.DragAndDrop(camera1, cameoSpacePanel.Cameo5);
  Helpers.DragAndDrop(camera1, cameoSpacePanel.Cameo9);
  Helpers.DragAndDrop(camera1, cameoSpacePanel.Cameo11);
//  wnd.Drag(79, 11, 524, 118);
//  wnd.Drag(74, 11, 885, 325);
//  wnd.Drag(71, 13, 1133, 552);
//  wnd.Drag(67, 13, 1485, 309);
  aqObject.CheckProperty(cameoSpacePanel.Cameo1, "WndCaption", cmpContains, "Camera 1");
  aqObject.CheckProperty(cameoSpacePanel.Cameo5, "WndCaption", cmpContains, "Camera 1");
  aqObject.CheckProperty(cameoSpacePanel.Cameo9, "WndCaption", cmpContains, "Camera 1");
  aqObject.CheckProperty(cameoSpacePanel.Cameo11, "WndCaption", cmpContains, "Camera 1");
  //monitorForm.Button.ClickButton();
  //operatorClient.BoschMessageBox.ContainerControl.buttonMiddle.ClickButton();
  Helpers.OperatorClient_RestoreDefaultSettings();
  Helpers.OperatorClient_Close();
}

