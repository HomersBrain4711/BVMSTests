// [OC_Shared]
var waitReadyTimeout = 120000 
function Start_OC_AndWaitForReady()
{
  TestedApps.OperatorClient.Run();
  // OC starts OC.Supervisor, which starts OC => first wait for OC.Supervisor process,
  // otherwise You get wrong (terminated) OC process ID for further actions, like WaitWindow
  Sys.Process("OperatorClient.Supervisor");
  Sys.Process(TestedApps.OperatorClient.ItemName).WaitWindow("*", "Operator Client*", -1, waitReadyTimeout);

}

function Close_OC()
{
  Aliases.OperatorClient.Control.Button.ClickButton();
  Aliases.OperatorClient.BoschMessageBox.ContainerControl.buttonMiddle.ClickButton();
  
}

function ClickContextMenu(menuItemText)
{
  menuItemText = menuItemText.replace(" ", "_");
  Aliases.OperatorClient.DropDownForm.PopupControl.UIAObject("MenuAgent").UIAObject(menuItemText).Click();  
}

function RemoveTreeItem(tree, itemPath)
{
  tree.ClickItemR(itemPath);
  ClickContextMenu("Remove");
}