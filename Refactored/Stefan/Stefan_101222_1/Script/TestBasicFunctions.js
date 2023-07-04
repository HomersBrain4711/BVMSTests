//USEUNIT Helpers
function OC_TestClickAllExistingCameos()
{
  TestedApps.OperatorClient.Run();
  let operatorClient = Aliases.OperatorClient;
  //operatorClient.HwndSource_StyleableWindow.StyleableWindow.ButtonOk.ClickButton();
  let standardLiveCameoSpace = operatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.ToggleLiveCameoSpace;
  standardLiveCameoSpace.UltraToolbarsDockArea.GranularitySlider.Drag(44, 9, 36, 0);
  let cameoSpacePanel = standardLiveCameoSpace.CameoSpacePanel;
  cameoSpacePanel.Cameo1.Click();
  cameoSpacePanel.Cameo2.Click();
  cameoSpacePanel.Cameo3.Click();
  cameoSpacePanel.Cameo4.Click();
  cameoSpacePanel.Cameo5.Click();
  cameoSpacePanel.Cameo6.Click();
  cameoSpacePanel.Cameo7.Click();
  cameoSpacePanel.Cameo8.Click();
  cameoSpacePanel.Cameo9.Click();
  cameoSpacePanel.Cameo10.Click();
  cameoSpacePanel.Cameo11.Click();
  cameoSpacePanel.Cameo12.Click();
  cameoSpacePanel.Cameo13.Click();
  cameoSpacePanel.Cameo14.Click();
  cameoSpacePanel.Cameo15.Click();
  cameoSpacePanel.Cameo16.Click();
  cameoSpacePanel.Cameo17.Click();
  cameoSpacePanel.Cameo18.Click();
  cameoSpacePanel.Cameo19.Click();
  cameoSpacePanel.Cameo20.Click();
  cameoSpacePanel.Cameo21.Click();
  cameoSpacePanel.Cameo22.Click();
  cameoSpacePanel.Cameo23.Click();
  cameoSpacePanel.Cameo24.Click();
  cameoSpacePanel.Cameo25.Click();
  cameoSpacePanel.Cameo26.Click();
  cameoSpacePanel.Cameo27.Click();
  cameoSpacePanel.Cameo28.Click();
  cameoSpacePanel.Cameo29.Click();
  cameoSpacePanel.Cameo30.Click();
  Helpers.OperatorClient_RestoreDefaultSettings();
  Helpers.OperatorClient_Close();
}

function CC_TestRestoreDefaultConfigAndExit()
{
  TestedApps.ConfigClient.Run();
  Helpers.ConfigClient_RestoreConfig(true);
  Helpers.ConfigClient_RestoreConfig(false);
  //Helpers.ConfigClient_Close();
}
function CC_OC_TestStartAndStop()
{
  TestedApps.ConfigClient.Run();
  TestedApps.OperatorClient.Run();
  Helpers.ConfigClient_Close();
  Helpers.OperatorClient_Close();
}
function CC_OC_TestCleanupAfterFailedTest()
{
  TestedApps.ConfigClient.Run();
  TestedApps.OperatorClient.Run();
  //fail the test
  aqObject.CheckProperty(Aliases.OperatorClient.Control, "WndCaption", cmpEqual, "This Caption does not exist");
}

