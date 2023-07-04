// [Helpers]
function RestoreBvmsConfig(configName = "default")
{
    let serviceName ="BVMSCentralServer";
    let elementsTargetPath ="C:\\ProgramData\\Bosch\\VMS\\Elements.BVMS";
    let elementsSourcePath = ProjectSuite.Path +"BVMSConfig\\" + configName + "\\Elements.bvms";
    WshShell.Run('net stop ' + serviceName, 1, true);
    elementsSourcePath = aqFileSystem.ExpandFileName(elementsSourcePath);
    aqFileSystem.DeleteFile(elementsTargetPath);
    
    let result = aqFileSystem.CopyFile(elementsSourcePath, elementsTargetPath, true);
    result = aqFileSystem.ChangeAttributes(elementsTargetPath, aqFileSystem.faReadOnly, aqFileSystem.fattrFree);
    WshShell.Run('net start ' + serviceName, 1, true);
}

function RestoreOperatorClientDefaults()
{
  let userDataFiles =  "c:\\ProgramData\\Bosch\\Vms\\UserData\\*.*";
  let appDataFiles1 = "c:\\users\\" + Sys.UserName + "\\AppData\\local\\BVMS\\127.0.0.1\\*.*"
  let appDataFiles2 = "c:\\users\\" + Sys.UserName + "\\AppData\\local\\BVMS\\localhost\\*.*"
  aqFileSystem.DeleteFile(userDataFiles);
  aqFileSystem.DeleteFile(appDataFiles1);
  aqFileSystem.DeleteFile(appDataFiles2);
}

//ovoid re-entrance (e.g. when calling Log.Error within the handler)
var locked = false;
function CleanupAfterError()
{
  if(!locked)
  {
    locked = true;

    Log.Message("CleanUpAfterError(): Terminate Tested Apps, Restore Application Defaults, Stop Video Recording");
    
    if(Sys.WaitProcess("ConfigClient").Exists)
      Sys.Process("ConfigClient").Terminate();
    if(Sys.WaitProcess("OperatorClient.Supervisor").Exists)
      Sys.Process("OperatorClient.Supervisor").Terminate();
    if(Sys.WaitProcess("OperatorClient").Exists)
      Sys.Process("OperatorClient").Terminate();

    RestoreOperatorClientDefaults();
    RestoreBvmsConfig();
    StopVideoRecorder();
    var testCaseName = "";
    if(aqTestCase.CurrentTestCase != null)
    {
      testCaseName = aqTestCase.CurrentTestCase.Name;
    }
    Log.Error("Testcase " + testCaseName + " failed.");

    locked = false;
  }
}


function ClickContextMenu(menuItemText, subMenuItemText = "")
{
  menuItemText = aqString.Replace(menuItemText, " ", "_");
  subMenuItemText = aqString.Replace(subMenuItemText, " ", "_");
  let contextMenu = Aliases.OperatorClient.DropDownForm.PopupControl.UIAObject("MenuAgent").UIAObject(menuItemText);
  contextMenu.Click();
  if(subMenuItemText != "")
    Aliases.OperatorClient.WinFormsObject("DropDownForm", "Show - 1").WinFormsObject("PopupControl").UIAObject(menuItemText).UIAObject(subMenuItemText).Click();
}

function DragAndDrop(startObject, destinationObject)
{
    var startPoint, targetPoint, dragX, dragY;
    // Drag from the center of object A to the center of object B
    startPoint = startObject.WindowToScreen(startObject.Width/2, startObject.Height/2);
    targetPoint = destinationObject.WindowToScreen(destinationObject.Width/2, destinationObject.Height/2);

    dragX = targetPoint.X - startPoint.X;
    dragY = targetPoint.Y - startPoint.Y;

    startObject.Drag(-1, -1, dragX, dragY); 
}

function EnlargeCameo(cameo, factorX, factorY)
{
  var dragStartX, dragStartY, dragX, dragY;
  if(Math.abs(factorX) == 1)
    dragStartX = cameo.Width /2;
  if(factorX > 1)
    dragStartX = cameo.Width - 1;
  if(factorX < -1)
    dragStartX = 0;

  if(Math.abs(factorY) == 1)
    dragStartY = cameo.Height /2;
  if(factorY > 1)
    dragStartY = cameo.Height - 1;
  if(factorY < -1)
    dragStartY = 0;

  dragX = (cameo.Width * (factorX - 1 * Math.sign(factorX)));
  dragY = (cameo.Height * (factorY - 1* Math.sign(factorY)));

  cameo.Drag(dragStartX, dragStartY, dragX, dragY);
}
function ShrinkCameo(cameo, factorX, factorY)
{
  var dragStartX, dragStartY, dragX, dragY;
  if(Math.abs(factorX) == 1)
    dragStartX = cameo.Width /2;
  if(factorX < -1)
    dragStartX = cameo.Width - 1;
  if(factorX > 1)
    dragStartX = 0;

  if(Math.abs(factorY) == 1)
    dragStartY = cameo.Height /2;
  if(factorY < -1)
    dragStartY = cameo.Height - 1;
  if(factorY > 1)
    dragStartY = 0;

  dragX = cameo.Width * (1 -  (1 / Math.abs(factorX))) * Math.sign(factorX);
  dragY = cameo.Height * (1 -  (1 / Math.abs(factorY))) * Math.sign(factorY);

  cameo.Drag(dragStartX, dragStartY, dragX, dragY);
}

function ResizeCameo(cameo, factorX, factorY)
{
  var dragStartX, dragStartY, dragX, dragY;
  if(Math.abs(factorX) == 1)
  {
    dragStartX = cameo.Width /2;
    dragX = 0;
  }
  if(Math.abs(factorX) > 1)
  {
    if(factorX > 1)
      dragStartX = cameo.Width - 1;
    if(factorX < -1)
      dragStartX = 0;
    dragX = (cameo.Width * (factorX - 1 * Math.sign(factorX)));
  }
  if(Math.abs(factorX) < 1)
  {
    if(factorX < 0)
      dragStartX = cameo.Width - 1;
    if(factorX > 0)
      dragStartX = 0;
    dragX = cameo.Width * (1 -  Math.abs(factorX)) * Math.sign(factorX);
  }

  if(Math.abs(factorY) == 1)
  {
    dragStartY = cameo.Height /2;
    dragY = 0;
  }
  if(Math.abs(factorY) > 1)
  {
    if(factorY > 1)
      dragStartY = cameo.Height - 1;
    if(factorY < -1)
      dragStartY = 0;
    dragY = (cameo.Height * (factorY - 1* Math.sign(factorY)));
  }
  if(Math.abs(factorY) < 1)
  {
    if(factorY < 0)
      dragStartY = cameo.Height - 1;
    if(factorY > 0)
      dragStartY = 0;
    dragY = cameo.Height * (1 -  Math.abs(factorY)) * Math.sign(factorY);
  }
  cameo.Drag(dragStartX, dragStartY, dragX, dragY);
    
}

function StartVideoRecorder()
{
  //Stop Video Recorder first, if it is already runnng
  StopVideoRecorder();
  var videoDir = "c:\\_TestCompleteLogs\\VideoCaptures";
  if(!aqFileSystem.Exists(videoDir))
  {
    aqFileSystem.CreateFolder(videoDir)
  }
  var videoFileName = "";
  if(Project.TestItems.Current != null)
  {
    videoFileName = Project.TestItems.Current.ElementToBeRun.Caption;
    videoFileName = videoFileName.replace("Script\\", "");
    videoFileName = Project.TestItems.Current.Name + " - " + videoFileName;
  }
  VideoRecorder.Start("Normal", videoDir, videoFileName);  
}

function StopVideoRecorder()
{
    if(VideoRecorder.IsRecording())
    {
      VideoRecorder.Stop();
    }
}

function IsConfigClientRunning()
{
  return Sys.WaitProcess(TestedApps.ConfigClient.ItemName).Exists;
}

function IsOperatorClientRunning()
{
  return Sys.WaitProcess(TestedApps.OperatorClient.ItemName).Exists;
}

function ConfigClient_Close()
{
  if(IsConfigClientRunning())
  {
    let configClient = Aliases.ConfigClient;
    configClient.ConfigClientForm.UltraToolbarsDockArea.Toolbar.System.Click();
    configClient.DropDownForm.PopupControl.System.Exit.Click();
    while(IsConfigClientRunning())
    {
      aqUtils.Delay(100);
    }
  }
}

function OperatorClient_Close()
{
  if(IsOperatorClientRunning())
  {  
    let operatorClient = Aliases.OperatorClient;
    operatorClient.Control.Button.ClickButton();
    operatorClient.BoschMessageBox.ContainerControl.buttonMiddle.ClickButton();
    while(IsOperatorClientRunning())
    {
      aqUtils.Delay(100);
    }
  }
}
function OperatorClient_RestoreDefaultSettings()
{
  if(IsOperatorClientRunning())
  {  
    let operatorClient = Aliases.OperatorClient;
    let monitorForm = operatorClient.Control;
    monitorForm.Click();
    let wnd = monitorForm.ContainerControl.UltraToolbarsDockArea.Toolbar;
    wnd.Extras.Click();
    operatorClient.DropDownForm3.PopupControl.Extras.Restore.Click();
    operatorClient.DropDownForm4.PopupControl.Restore.Default_settings.Click();
    let ultraButton = operatorClient.BoschMessageBox.ContainerControl.buttonMiddle;
    ultraButton.ClickButton();
  } 
}


function ConfigClient_RestoreConfig(restart = false)
{
  if(IsConfigClientRunning())
  {
    let configClient = Aliases.ConfigClient;
    configClient.ConfigClientForm.UltraToolbarsDockArea.Toolbar.System.Click();
    configClient.DropDownForm.PopupControl.System.Activation_Manager_.Click();
    let activateConfigForm = configClient.ActivateConfigForm;
    activateConfigForm.labelList.Item_Initial_Configuration_for_TestComplete_UIA_Tests.Click();
    activateConfigForm.buttonOK.Click();
    configClient.BoschMessageBox.ContainerControl.buttonMiddle.ClickButton();
    configClient.ActivationView.ContainerControl.okButton.ClickButton();
    if(restart == false)
    {
      configClient.OnSiteClientLoginForm.login.btnCancel.ClickButton();
      while(IsConfigClientRunning())
      {
        aqUtils.Delay(100);
      }
    }
    else
    {
      configClient.OnSiteClientLoginForm.login.btnOK.ClickButton();
    }
  }

}

