//USEUNIT Helpers

function OnStartTest(Sender)
{
  Helpers.StartVideoRecorder();
}

function OnStopTest(Sender)
{
    Helpers.StopVideoRecorder();
}

function OnLogError(Sender, LogParams)
{
  Helpers.CleanupAfterError()    
}