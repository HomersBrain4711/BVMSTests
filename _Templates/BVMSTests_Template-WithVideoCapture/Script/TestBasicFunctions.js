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

function OC_TestClickAllPTZButtons()
{
  TestedApps.OperatorClient.Run();
  Helpers.ClickPTZControlButton(Helpers.PTZControlButton.DigitalZoomIn);
  Helpers.ClickPTZControlButton(Helpers.PTZControlButton.DigitalZoomOut);
  Helpers.ClickPTZControlButton(Helpers.PTZControlButton.Up);
  Helpers.ClickPTZControlButton(Helpers.PTZControlButton.Down);
  Helpers.ClickPTZControlButton(Helpers.PTZControlButton.Left);
  Helpers.ClickPTZControlButton(Helpers.PTZControlButton.Right);
  Helpers.ClickPTZControlButton(Helpers.PTZControlButton.Joystick);
  Helpers.ClickPTZControlButton(Helpers.PTZControlButton.OpticalZoomIn);
  Helpers.ClickPTZControlButton(Helpers.PTZControlButton.OpticalZoomOut);
  Helpers.ClickPTZControlButton(Helpers.PTZControlButton.FocusNear);
  Helpers.ClickPTZControlButton(Helpers.PTZControlButton.FocusFar);
  Helpers.ClickPTZControlButton(Helpers.PTZControlButton.IrisOpen);
  Helpers.ClickPTZControlButton(Helpers.PTZControlButton.IrisClosed);
  Helpers.OperatorClient_Close();
}


function OC_TestClickAllSequenceControlButtons()
{
  TestedApps.OperatorClient.Run();
  Helpers.ClickSequenceControlButton(Helpers.SequenceControlButton.Backward);
  Helpers.ClickSequenceControlButton(Helpers.SequenceControlButton.StepBackward);
  Helpers.ClickSequenceControlButton(Helpers.SequenceControlButton.PlayBackward);
  Helpers.ClickSequenceControlButton(Helpers.SequenceControlButton.Pause);
  Helpers.ClickSequenceControlButton(Helpers.SequenceControlButton.PlayForward);
  Helpers.ClickSequenceControlButton(Helpers.SequenceControlButton.StepForward);
  Helpers.ClickSequenceControlButton(Helpers.SequenceControlButton.Forward);
  Helpers.OperatorClient_Close();
}

function OC_TestClickAllPlaybackControlButtons()
{
  TestedApps.OperatorClient.Run();
  //switch to playback mode
  Helpers.SetViewMode(Helpers.ViewMode.Playback);
  Helpers.ClickPlaybackControlButton(Helpers.PlaybackControlButton.MaxBackward);
  Helpers.ClickPlaybackControlButton(Helpers.PlaybackControlButton.StepBackward);
  Helpers.ClickPlaybackControlButton(Helpers.PlaybackControlButton.PlayBackward);
  Helpers.ClickPlaybackControlButton(Helpers.PlaybackControlButton.Pause);
  Helpers.ClickPlaybackControlButton(Helpers.PlaybackControlButton.PlayForward);
  Helpers.ClickPlaybackControlButton(Helpers.PlaybackControlButton.StepForward);
  Helpers.ClickPlaybackControlButton(Helpers.PlaybackControlButton.MaxForward);
  Helpers.OperatorClient_Close();
}


function OC_TestSelectAllLeftTabs()
{
  TestedApps.OperatorClient.Run();

  //live mode
  Helpers.SelectMainLeftTab(Helpers.MainLeftTab.LogicalTree);
  Helpers.SelectMainLeftTab(Helpers.MainLeftTab.FavoritesTree);
  Helpers.SelectMainLeftTab(Helpers.MainLeftTab.BookmarksTree);
  //switch to playback mode
  Helpers.SetViewMode(Helpers.ViewMode.Playback);
  //playback mode
  Helpers.SelectMainLeftTab(Helpers.MainLeftTab.LogicalTree);
  Helpers.SelectMainLeftTab(Helpers.MainLeftTab.FavoritesTree);
  Helpers.SelectMainLeftTab(Helpers.MainLeftTab.BookmarksTree);
  Helpers.SelectMainLeftTab(Helpers.MainLeftTab.ExportsTree);
  Helpers.SelectMainLeftTab(Helpers.MainLeftTab.ForensicSearch);

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

