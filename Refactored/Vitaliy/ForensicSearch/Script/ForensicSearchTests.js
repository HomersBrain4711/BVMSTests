
//USEUNIT Helpers
let dpi = 1.0;
let tabCount = 5;
let exportTab = 3;
let forensicSearchTab = 4;

function TC_428355_SearchOption_Scenario_SingleCameraSearch()
{
  StartOpClient_LoadExport_OpenForensicSearch();
  
  let topForensicSearch = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow7.ForensicSearchControl.scrollablePanel.UltraPanelClientAreaUnsafe.panelWpfPlaceholder.StyleableElementHost.HwndSource_AdornerDecorator.AdornerDecorator;
  let bottomForensicSearch = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow7.ForensicSearchControl.panelBottomWpfPlaceholder.StyleableElementHost.HwndSource_AdornerDecorator.AdornerDecorator;
    
  aqObject.CheckProperty(topForensicSearch.ComboboxSearchMode, "wText", cmpEqual, "IndividualSearch");
  aqObject.CheckProperty(topForensicSearch.ComboboxType, "wText", cmpEqual, "Video analytics");
  aqObject.CheckProperty(bottomForensicSearch.Search, "Enabled", cmpEqual, false);
  Helpers.OperatorClient_RestoreDefaultSettings();
  Helpers.OperatorClient_Close();
}


function TC_428356_SearchOption_Configuration_OpenCameo()
{
  StartOpClient_LoadExport_OpenForensicSearch();
  let timeline = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow8.TimelineControl.StyleableElementHost.HwndSource_AdornerDecorator.AdornerDecorator.Timeline;
  
  // no config
  AssertTimelineConfigTooltip(null);
  AssertCameoConfigTooltip("");
  
  CreateConfig();
  
  // there is config
  AssertTimelineConfigTooltip("Forensic Search is configured");
  AssertCameoConfigTooltip("Forensic Search is configured");
   
  let presetCombobox = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow7.ForensicSearchControl.scrollablePanel.UltraPanelClientAreaUnsafe.panelWpfPlaceholder.StyleableElementHost.HwndSource_AdornerDecorator.AdornerDecorator.PresetsComboBox;
  
  if (ComboboxContainsItem(presetCombobox, "ComboboxitemAutoSaved"))
    Log.Error("Autosave item should not be present");
  
    // close and reopen cameo
  CloseCameo2(Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.TogglePlaybackCameoSpace.CameoSpacePanel.Cameo_1);
  SelectMainLeftTab(exportTab);
  OpenExportInCameo("Traffic_CPP_14_2_FW_8_90_mp4", "Sample_Track_1", 0, 0);
  SelectMainLeftTab(forensicSearchTab);
  
  //asserts
  if (!ComboboxContainsItem(presetCombobox, "ComboboxitemAutoSaved"))
    Log.Error("Autosave item should be present");
    
  // no config
  AssertTimelineConfigTooltip(null);
  AssertCameoConfigTooltip("");
  
  ComboboxSelectItem(presetCombobox, "ComboboxitemAutoSaved");
  
   // there is config
  AssertTimelineConfigTooltip("Forensic Search is configured");
  AssertCameoConfigTooltip("Forensic Search is configured");
  
  //timeline.TimelineSelectionRight.Drag(9, 8, 35, 1);
  Helpers.OperatorClient_RestoreDefaultSettings();
  Helpers.OperatorClient_Close();
}

function AssertTimelineConfigTooltip(value)
{
  let timeline = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow8.TimelineControl.StyleableElementHost.HwndSource_AdornerDecorator.AdornerDecorator.Timeline;
  aqObject.CheckProperty(timeline.ArchiveList.Archive1.ForensicSearchData, "ToolTip", cmpEqual, value);
}

function AssertCameoConfigTooltip(value)
{
  //aqObject.CheckProperty(Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.TogglePlaybackCameoSpace.CameoSpacePanel.Cameo_0_0.ForensicSearch, "Value", cmpEqual, value);  
}

function CreateConfig(void_param)
{
  //Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow7.ForensicSearchControl.scrollablePanel.VerticalScrollProperties.set_Value(100);
  let panel = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow7.ForensicSearchControl.scrollablePanel.UltraPanelClientAreaUnsafe.panelActiveXPlaceholder.Panel;
  //let buttonVisible = panel.SubPanel1.Button1.WaitProperty("visible", true, 10000)
  //aqObject.CheckProperty(panel.SubPanel1.Button1, "visible", cmpEqual, true);
  //aqUtils.Delay(7000);
  panel.SubPanel1.Button1.ClickButton();
  panel.SubPanel2.Button2.ClickButton();
  panel.SubPanel3.Button3.ClickButton();
}

function StartOpClient_LoadExport_OpenForensicSearch(void_param)
{
    let filePath = Project.Path + "ForensicSearchInput\\Traffic_CPP_14.2_FW_8.90.mp4";
    StartOpClient();
    SwitchToPlayback(true);
    SelectMainLeftTab(exportTab);
    LoadExportFile(filePath);
    //LoadExportFile("C:\\-Exports\\IVA Exports\\VSDK_Exports\\Traffic_CPP_14.2_FW_8.90.mp4");
    OpenExportInCameo("Traffic_CPP_14_2_FW_8_90_mp4", "Sample_Track_1", 0, 0);

    SelectMainLeftTab(forensicSearchTab);
}


function StartOpClient(void_param) {
  TestedApps.OperatorClient.Run(1, false, 10000);
  Aliases.OperatorClient.WaitAliasChild("Control", 120000);
}

function SwitchToPlayback(playback)
{
  if (playback)
  {
    let playbackSwitch = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow2.LogicalTree.UltraToolbarsDockArea.Toolbar.Switch_to_Playback_Mode;
    playbackSwitch.Click();
  }
  else
  {
    
  }
}

function SelectMainLeftTab(tabIndex)
{
  let windowDockingArea = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea;
  let tabHeight = windowDockingArea.Size.Height / tabCount;
  let y = (tabHeight * tabIndex)  + (tabHeight * 0.5); 
  windowDockingArea.Click(10, y*dpi);
}

function LoadExportFile(file)
{
  let operatorClient = Aliases.OperatorClient;
  operatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow3.ExportTree.guiTree.Exports.ClickR();
  operatorClient.DropDownForm3.PopupControl.MenuAgent.Load_Export.Click();
  let wnd = operatorClient.Open;
  let comboBoxEx32 = wnd.File_name_;
  comboBoxEx32.File_name_.Click();
  comboBoxEx32.SetText(file);
  wnd.Open.ClickButton();
}


function GetExportNode(nodeLevel1, nodeLevel2)
{
  let exports = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow3.ExportTree.guiTree.Exports;
  return exports.UIAObject(nodeLevel1).UIAObject(nodeLevel2);
}

function GetPlaybackCameo(row, col)
{
  let cameoSpacePanel = Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.TogglePlaybackCameoSpace.CameoSpacePanel;
  
  var props = ["ObjectIdentifier"];
  var values = ["CameoInstance_X_" + col + "_Y_" + row];
  return cameoSpacePanel.FindChildEx(props, values, 1);
}

function OpenExportInCameo(nodeLevel1, nodeLevel2, row, col)
{
  var trackNode = GetExportNode("Traffic_CPP_14_2_FW_8_90_mp4", "Sample_Track_1");
  var cameo =   Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow.CameoSpace.TogglePlaybackCameoSpace.CameoSpacePanel.Cameo_1; //GetPlaybackCameo(row, col);
  Helpers.DragAndDrop(trackNode, cameo);
}

function OpenCombobox(combobox)
{
  var width = combobox.Width;
  combobox.Click(width - 5, 5);
}

function ComboboxContainsItem(combobox, item)
{
  OpenCombobox(combobox);
  var dropdown = Aliases.OperatorClient.HwndSource_PopupRoot.PopupRoot;
  var found = dropdown.WaitAliasChild(item, 1000);
  return found.Exists;
}

function ComboboxSelectItem(combobox, item)
{
  OpenCombobox(combobox);
  var dropdown = Aliases.OperatorClient.HwndSource_PopupRoot.PopupRoot;
  var found = dropdown.WaitAliasChild(item, 1000);
  if (!found.Exists)
    Log.Error("Combobox item " + item + " not found!");
  else 
    found.Click(5, 5);
}

function CloseCameo(cameo)
{
  cameo.UIAObject("Close").Click();  
}

function CloseCameo2(cameo)
{
  cameo.Click(cameo.Width - 8, 8);  
}

function Test1()
{
  Aliases.OperatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow7.ForensicSearchControl.scrollablePanel.VerticalScrollProperties.set_Value(100);
}