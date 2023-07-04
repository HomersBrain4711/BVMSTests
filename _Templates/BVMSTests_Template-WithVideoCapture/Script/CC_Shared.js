// [CC_Shared]
var waitReadyTimeout = 120000 
function Start_CC_AndWaitForReady()
{
    TestedApps.ConfigClient.Run();
    Sys.Process(TestedApps.ConfigClient.ItemName).WaitWindow("*", "Configuration Client *", -1, waitReadyTimeout);

}