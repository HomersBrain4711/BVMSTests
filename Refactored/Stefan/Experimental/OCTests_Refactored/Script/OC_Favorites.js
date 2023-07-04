//USEUNIT OC_Shared

function TC391263_TestAddFavorites()
{
  let numFolders = 2;
  let numFavorites = 3;
  TestedApps.OperatorClient.Run();
  //OC_Shared.Start_OC_AndWaitForReady();
  let operatorClient = Aliases.OperatorClient;
  operatorClient.Control.ContainerControl.WindowDockingArea.Click(22, 411);
  let favouritesWindow = operatorClient.Control.ContainerControl.WindowDockingArea.DockableWindow3;
  favouritesWindow.Activate();
  
  let ultraTree = favouritesWindow.FavoritesTree.FavoritesTree;
  for(var i = 0; i < numFolders; i++)
  {
    let favoritesFolderName = "MyFavoritesFolder_" + i;
    ultraTree.ClickItemR("Favorites");
    OC_Shared.ClickContextMenu("Add folder");
    ultraTree.FavoritesTree_LabelEditNode.SetText(favoritesFolderName);
    ultraTree.FavoritesTree_LabelEditNode.Hide();
    for(var j = 0; j < numFavorites; j++)
    {
      ultraTree.ClickItemR("Favorites|"+ favoritesFolderName);
      OC_Shared.ClickContextMenu("Add favorite");
      let favoriteName = "MyFavorite_" + j;
      Aliases.OperatorClient.EditCameoViewDisplayNameDialogForm.ContainerControl.nameTextBox.nameTextBox_EmbeddableTextBox.SetText(favoriteName);
      Aliases.OperatorClient.EditCameoViewDisplayNameDialogForm.ContainerControl.okButton.ClickButton();
    }
  }
  for(i = 0; i < numFolders; i++)
  {
    let favoritesFolderName = "MyFavoritesFolder_" + i;
    let itemPathFolder = "Favorites|" + favoritesFolderName;
    for(j = 0; j < numFavorites; j++)
    {
      let favoriteName = "MyFavorite_" + j;
      let itemPathFavorite = itemPathFolder + "|" + favoriteName;
      OC_Shared.RemoveTreeItem(ultraTree, itemPathFavorite);
    }
    OC_Shared.RemoveTreeItem(ultraTree, itemPathFolder)
  }
  OC_Shared.Close_OC();

}

