//USEUNIT CC_Shared

let configClient = Aliases.ConfigClient;
let configClientForm = configClient.ConfigClientForm;
let configTabCtrl = configClientForm.ConfigTabCtrl;
let ultraTree = configTabCtrl.tabControl.UltraTabPageControl.UserAccessControl.ConfigurationControl_Fill_Panel.userGroupTreeTabControl.ultraTabControl1.ultraTabPageControl1.ultraTreeLocalGroups;
let containerControl = configClient.AddUserGroupForm.ContainerControl;
let ultraTextEditor = containerControl.userGroupNameTextBox;
let labelEditNode = ultraTree.ultraTreeLocalGroups_LabelEditNode;


function TestCC_AddUserGroupAndUsers()
{
  try
  {
    CC_Shared.Start_CC_AndWaitForReady();
    //VideoRecorder.Start("Normal", "c:\\_TestCompleteVideos","ConfigClient_AddUsersAndGroups");
    let numGroups = 4;
    let numUsersPerGroup = 3
    //OCR.Recognize(configTabCtrl.zpnlButtons.zConfigTabUltraButton_TabPage_11).BlockByText("groups").Click();
    configTabCtrl.zpnlButtons.zConfigTabUltraButton_TabPage_11.Click();
    for(var userGroupIndex = 0; userGroupIndex < numGroups; userGroupIndex++)
    {
      let userGroupName = "MyUserGroup_" + userGroupIndex;
      CreateUserGroup(userGroupName);
      for(var userIndex = 0; userIndex < numUsersPerGroup; userIndex++)
      {
        let userName = "UG_" + userGroupIndex + "_MyUser_" + userIndex;
        CreateUserInUserGroup(userGroupName, userName);
      } 
    }
    for(var userGroupIndex = 0; userGroupIndex < numGroups; userGroupIndex++)
    {
      let userGroupName = "MyUserGroup_" + userGroupIndex;
      for(var userIndex = 0; userIndex < numUsersPerGroup; userIndex++)
      {
        let userName = "UG_" + userGroupIndex + "_MyUser_" + userIndex;
        DeleteUserFromUserGroup(userGroupName, userName);
      } 
      DeleteUserGroup(userGroupName);
    }

   
    //  VerifyUserGroupAndUsers();
    configClientForm.Close();
    configClient.BoschMessageBox.ContainerControl.buttonMiddle.ClickButton();
    
  }
  finally
  {
    //VideoRecorder.Stop();
   }
}


function CreateUserInUserGroup(userGroupName, userName)
{
  let userGroupItem = "User groups|" + userGroupName;
  let newUserItem = userGroupItem +"|New user";
  ultraTree.ClickItem(userGroupItem);
  ultraTree.ClickItemR(userGroupItem);
  ultraTree.PopupMenu.Click("New user");
  ultraTree.ClickItem(newUserItem);

  //ultraTree.PopupMenu.Click("Rename");
  labelEditNode.SetText(userName);
  ultraTree.Click();

}
function DeleteUserFromUserGroup(userGroupName, userName)
{
  let userItem = "User groups|" + userGroupName + "|"+userName;
  ultraTree.ClickItemR(userItem);
  ultraTree.PopupMenu.Click("Remove");
}



function CreateUserGroup(userGroupName)
{
  ultraTree.ClickItemR("User groups");
  ultraTree.PopupMenu.Click("New user group");
  //ultraTextEditor.Drag(73, 12, -88, -3);
  ultraTextEditor.SetFocus();
  ultraTextEditor.userGroupNameTextBox_EmbeddableTextBox.SetText(userGroupName);
  containerControl.UserGroupOkButton.ClickButton();
  
}

function DeleteUserGroup(userGroupName)
{
  let userGroupItem = "User groups|" + userGroupName;
  ultraTree.ClickItemR(userGroupItem);
  ultraTree.PopupMenu.Click("Remove");
}

function VerifyUserGroupAndUsers()
{
  let tree = Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl.UserAccessControl.ConfigurationControl_Fill_Panel.userGroupTreeTabControl.ultraTabControl1.ultraTabPageControl1.ultraTreeLocalGroups;
  let userGroupNode = tree.TopNode.Nodes.GetItem(2);
  let user1Node = tree.TopNode.Nodes.GetItem(2).Nodes.GetItem(0);
  let user2Node = tree.TopNode.Nodes.GetItem(2).Nodes.GetItem(1);
  let user3Node = tree.TopNode.Nodes.GetItem(2).Nodes.GetItem(2);
  Log.Message(userGroupNode.Text);
  Log.Message(user1Node.Text);
  Log.Message(user2Node.Text);
  Log.Message(user3Node.Text);
  aqObject.CheckProperty(userGroupNode, "Text", cmpEqual, "MyUserGroup");
  aqObject.CheckProperty(user1Node, "Text", cmpEqual, "MyUser1");
  aqObject.CheckProperty(user2Node, "Text", cmpEqual, "MyUser2");
  aqObject.CheckProperty(user3Node, "Text", cmpEqual, "MyUser3");
}

function Test1()
{
  Browsers.Item(btChrome).Navigate("https://support.smartbear.com/testcomplete/docs/testing-with/tested-apps/messages/unable-to-run-tested-app.html");
  let browser = Aliases.browser;
  browser.pageMessageUnableToRunTheTestedA.linkTestedApplication.Click();
  let page = browser.pageAbout;
  page.Wait();
  page.linkTestedAppsPng.imageTestedAppsPng.Click(313, 161);
}