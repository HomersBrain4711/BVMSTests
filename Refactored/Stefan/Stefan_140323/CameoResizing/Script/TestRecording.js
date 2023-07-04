//USEUNIT Helpers

function TC_57684_ResizeCameosInSteps()
{
  TestedApps.OperatorClient.Run();
  
  let increaseGranularityButton = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.ToggleLiveCameoSpace.UltraToolbarsDockArea.Toolbar.Show_more_Image_pane_rows;
  ResizeCameoAndVerify();
  increaseGranularityButton.Click();
  ResizeCameoAndVerify();
  increaseGranularityButton.Click();
  ResizeCameoAndVerify();
  Helpers.OperatorClient_RestoreDefaultSettings();
  Helpers.OperatorClient_Close();
  
}

function ResizeCameoAndVerify()
{

  let monitorForm = Aliases.OperatorClient.Control;
  let camera1 = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.LogicalTree.LogicalTree.Logical_Tree.Camera_1_5_;
  let cameoSpacePanel = monitorForm.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel;
  let cameo = cameoSpacePanel.Cameo1;
  let cameoWidth = cameo.Width;
  let cameoHeight = cameo.Height;
  let dragX = cameoWidth;
  let dragY = cameoHeight;

  Helpers.DragAndDrop(camera1, cameo);
  
  cameo.Drag(cameo.Width - 1, cameo.Height - 1, dragX, dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight * 2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth * 2);

  cameo.Drag(cameo.Width - 1, cameo.Height - 1, dragX, dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight * 3);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth * 3);
  
  cameo.Drag(cameo.Width - 1, cameo.Height - 1, -dragX, -dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight * 2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth * 2);
  
  cameo.Drag(cameo.Width - 1, cameo.Height - 1, -dragX, -dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth);
  
  //move Cameo 2 x right
  cameo.Drag(cameo.Width / 2, cameo.Height/ 2, 2*cameo.Width, 0);

  cameo.Drag(0, cameo.Height - 1, -dragX, dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight * 2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth * 2);

  cameo.Drag(0, cameo.Height - 1, -dragX, dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight * 3);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth * 3);

  cameo.Drag(0, cameo.Height - 1, dragX, -dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight * 2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth * 2);

  cameo.Drag(0, cameo.Height - 1, dragX, -dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth);
  
  //move Cameo 2 x down
  cameo.Drag(cameo.Width / 2, cameo.Height/ 2, 0, 2 * cameo.Height);
  
  cameo.Drag(0, 0, -dragX, -dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight * 2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth * 2);

  cameo.Drag(0, 0, -dragX, -dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight * 3);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth * 3);

  cameo.Drag(0, 0, dragX, dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight * 2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth * 2);

  cameo.Drag(0, 0, dragX, dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth);
  
  //move Cameo 2 x left
  cameo.Drag(cameo.Width / 2, cameo.Height/ 2, -(2 * cameo.Width), 0);

  cameo.Drag(cameo.Width - 1, 0, dragX, -dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight * 2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth * 2);

  cameo.Drag(cameo.Width - 1, 0, dragX, -dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight * 3);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth * 3);
  
  cameo.Drag(cameo.Width - 1, 0, -dragX, dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight * 2);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth * 2);
  
  cameo.Drag(cameo.Width - 1, 0, -dragX, dragY);
  aqObject.CheckProperty(cameo, "Height", cmpEqual, cameoHeight);
  aqObject.CheckProperty(cameo, "Width", cmpEqual, cameoWidth);

  //move Cameo 2 x up
  cameo.Drag(cameo.Width / 2, cameo.Height/ 2, 0, -(2 * cameo.Height));

  cameo.Close();

}

