function TC57682()
{
  TestedApps.OperatorClient.Run();
  let operatorClient = Aliases.OperatorClient;
  let monitorForm = operatorClient.Control;
  let wnd = monitorForm.ContainerControl.WindowDockingArea.DockableWindow2.LogicalTree.LogicalTree.Logical_Tree.Camera_1_5_;
  wnd.Click(66, 11);
  wnd.Drag(79, 11, 524, 118);
  wnd.Drag(74, 11, 885, 325);
  wnd.Drag(71, 13, 1133, 552);
  wnd.Drag(67, 13, 1485, 309);
  aqObject.CheckProperty(Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo1, "WndCaption", cmpContains, "Camera 1");
  aqObject.CheckProperty(Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo5, "WndCaption", cmpContains, "Camera 1");
  aqObject.CheckProperty(Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo9, "WndCaption", cmpContains, "Camera 1");
  aqObject.CheckProperty(Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel.Cameo11, "WndCaption", cmpContains, "Camera 1");
  monitorForm.Button.ClickButton();
  operatorClient.BoschMessageBox.ContainerControl.buttonMiddle.ClickButton();
}

