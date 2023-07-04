var videoDir = "c:\\_TestCompleteLogs\VideoCaptures"; 
function OnStartTest(Sender)
{
  var videoFileName = "";
  if(Project.TestItems.Current != null)
  {
    videoFileName = Project.TestItems.Current.ElementToBeRun.Caption;
    videoFileName = videoFileName.replace("Script\\", "");
    videoFileName = Project.TestItems.Current.Name + " - " + videoFileName;
  }
  VideoRecorder.Start("Normal", videoDir, videoFileName);  
}

function OnStopTest(Sender)
{
    VideoRecorder.Stop();
}