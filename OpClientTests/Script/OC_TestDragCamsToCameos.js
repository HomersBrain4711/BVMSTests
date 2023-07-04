//USEUNIT OC_Shared
function TestOC_DragCamsToCameos()
{
  OC_Shared.Start_OC_AndWaitForReady();
  let operatorClient = Aliases.OperatorClient;
  let windowDockingArea = operatorClient.Control.ContainerControl.WindowDockingArea;
  let ultraTree = windowDockingArea.DockableWindow.LogicalTree.LogicalTree;
  let cameoSpacePanel = windowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel;
  for(var i = 0; i < 5; i++)
  {
    //ultraTree.DblClickItem("|[0]|[0]|[2]");
    ultraTree.DblClickItem("|Logical Tree|MyFakeCams|Camera 1*");
    ultraTree.Drag(138, 85, 1179, 108);
    ultraTree.Drag(100, 110, 636, 386);
    ultraTree.Drag(109, 131, 1268, 404);
    VerifyCamsOnCameos();
    //cameoSpacePanel.Cameo1.Click(630, 7);
    //cameoSpacePanel.Cameo2.Click(630, 7);
    //cameoSpacePanel.Cameo3.Click(630, 7);
    //cameoSpacePanel.Cameo4.Click(630, 7);
    cameoSpacePanel.Cameo1.Close();
    cameoSpacePanel.Cameo2.Close();
    cameoSpacePanel.Cameo3.Close();
    cameoSpacePanel.Cameo4.Close();
    VerifyNoCamsOnCameos();
  }
  operatorClient.Control.Button.ClickButton();
  operatorClient.BoschMessageBox.ContainerControl.buttonMiddle.ClickButton();
  //cameoSpacePanel.Cameo3.StreamVisualizationControl.ClickR(127, 64);
  //let popupMenuControlTrusted = operatorClient.DropDownForm.PopupControl;
  //OCR.Recognize(popupMenuControlTrusted).BlockByText("image", spNearestToCenter).Click();
  //cameoSpacePanel.Cameo4.StreamVisualizationControl.ClickR(183, 149);
  //OCR.Recognize(popupMenuControlTrusted).BlockByText("Close").Click();
}

function VerifyNoCamsOnCameos()
{
  let cameoSpacePanel = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel;
  let cameoNotConnected = "No connection: ";
  aqObject.CheckProperty(cameoSpacePanel.Cameo1, "WndCaption", cmpEqual, cameoNotConnected);
  aqObject.CheckProperty(cameoSpacePanel.Cameo2, "WndCaption", cmpEqual, cameoNotConnected);
  aqObject.CheckProperty(cameoSpacePanel.Cameo3, "WndCaption", cmpEqual, cameoNotConnected);
  aqObject.CheckProperty(cameoSpacePanel.Cameo4, "WndCaption", cmpEqual, cameoNotConnected);
  
}

function VerifyCamsOnCameos()
{
  let cameoSpacePanel = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.CameoSpace.ToggleLiveCameoSpace.CameoSpacePanel;
  aqObject.CheckProperty(cameoSpacePanel.Cameo1, "WndCaption", cmpContains, "Camera 1 (1.2.3.4)", false);
  aqObject.CheckProperty(cameoSpacePanel.Cameo2, "WndCaption", cmpContains, "Camera 2 (1.2.3.5)", false);
  aqObject.CheckProperty(cameoSpacePanel.Cameo3, "WndCaption", cmpContains, "Camera 3 (1.2.3.6)", false);
  aqObject.CheckProperty(cameoSpacePanel.Cameo4, "WndCaption", cmpContains, "Camera 4 (1.2.3.7)", false);
}

