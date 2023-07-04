//USEUNIT Helpers

function OnStartTest(Sender)
{
  Helpers.StartVideoRecorder();
}

function OnStopTest(Sender)
{
    Helpers.StopVideoRecorder();
    //Helpers.RestoreBvmsConfig();
    //Helpers.RestoreOperatorClientDefaults();
}

