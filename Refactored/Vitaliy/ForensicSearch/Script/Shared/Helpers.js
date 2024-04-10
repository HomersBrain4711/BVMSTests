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
  let userDataFolder =  "c:\\ProgramData\\Bosch\\Vms\\UserData\\";
  let appDataFolder1 = "c:\\users\\" + Sys.UserName + "\\AppData\\local\\BVMS\\127.0.0.1\\"
  let appDataFolder2 = "c:\\users\\" + Sys.UserName + "\\AppData\\local\\BVMS\\localhost\\"
  
  if(aqFileSystem.Exists(userDataFolder))
  {
    aqFileSystem.DeleteFolder(userDataFolder, true)
  }
  if(aqFileSystem.Exists(appDataFolder1))
  {
    aqFileSystem.DeleteFolder(appDataFolder1, true)
  }
  if(aqFileSystem.Exists(appDataFolder2))
  {
    aqFileSystem.DeleteFolder(appDataFolder2, true)
  }
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

//resize (enlarge, shrink) a cameo by a factor in x- and y- direction
//cameo: cameo to resize
//factorX, factorY: factor to resize cameo in x- and y- direction
//factor < 1: shrink
//factor > 1: enlarge
//factor = 1: keep size
//factor +/-: direction of resizing (top/buttom, left/right)
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
  var videoDir = ProjectSuite.Path + "VideoCaptures";
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

function WaitControlReady(control, timeout = 180000)
{
    //remember configured autowait timeout
    let timeout_org = Options.Run.Timeout;
    //increase autowait timeout to 120 secs
    Options.Run.Timeout = timeout;
    //wait until control window is ready (to handle any method or property)
    Log.Message("waiting for the control '" + control.Name + "' for max. " + (timeout / 1000).toString() + " seconds to become active.");
    var dummy = control.Visible;
    //resore autowait timeout to original value
    Options.Run.Timeout = timeout_org;

}

function ConfigClient_WaitForReady()
{
    WaitControlReady(NameMapping.Sys.ConfigClient.ConfigClientForm);
}

function OperatorClient_WaitForReady()
{
    WaitControlReady(NameMapping.Sys.OperatorClient.Control);
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
    operatorClient.Operator_Client.CloseDialogView.Yes.Click();
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

