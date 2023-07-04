//USEUNIT Helpers
function TC389520_TestAddSchedule()
{
  TestedApps.ConfigClient.Run();
  Helpers.ConfigClient_WaitForReady();
  let configClient = Aliases.ConfigClient; 
  let configClientForm = configClient.ConfigClientForm;
  let numSchedules = 5;
  configClientForm.Maximize();
  let configTabCtrl = configClientForm.ConfigTabCtrl;
  //OCR.Recognize(Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.zpnlButtons.zConfigTabUltraButton_TabPage_3).BlockByText("Schedules").Click();
  Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.zpnlButtons.zConfigTabUltraButton_TabPage_3.Click();
  //let panel = configTabCtrl.tabControl.UltraTabPageControl2.SchedulesPage.ConfigurationControl_Fill_Panel;
  for(var scheduleIndex = 0; scheduleIndex < numSchedules; scheduleIndex++)
  {
    let myScheduleName = "MySchedule_" + scheduleIndex;
    AddSchedule(myScheduleName);
  } 
  for(var scheduleIndex = 0; scheduleIndex < numSchedules; scheduleIndex++)
  {
    DeleteSelectedSchedule()
  }
  configClientForm.Close();
  configClient.BoschMessageBox.ContainerControl.buttonMiddle.ClickButton();
 
}
function DeleteSelectedSchedule()
{
  Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl.tabControl.UltraTabPageControl2.SchedulesPage.ConfigurationControl_Fill_Panel.panelLeft.panel4.labelTaskSchedules.panel1.WinFormsObject("deleteTaskSchedule").Click();
}
function AddSchedule(scheduleName)
{
  let configTabCtrl = Aliases.ConfigClient.ConfigClientForm.ConfigTabCtrl;
  //OCR.Recognize(configTabCtrl.zpnlButtons.zConfigTabUltraButton_TabPage_3).BlockByText("Schedules").Click();
  let panel = configTabCtrl.tabControl.UltraTabPageControl2.SchedulesPage.ConfigurationControl_Fill_Panel;
  let ultraGroupBox = panel.panelLeft.panel4.labelTaskSchedules;
  ultraGroupBox.panel1.addTaskSchedule.ClickButton();
  let ultraTree = ultraGroupBox.panel2.taskScheduleTree;
  ultraTree.taskScheduleTree_LabelEditNode.SetText(scheduleName);
  ultraTree.Keys("^[Tab]");
  let ultraTabControl = panel.panelRight.panelScheduleConfig.ScheduleTabCtrl.ultraGroupBox1.scheduleTab;
  ultraTabControl.ClickTab("Weekdays");
  ultraTabControl.WeekdayPage.bottomPanel.UltraPanelClientAreaUnsafe.ScheduleTable.Drag(80, 21, 327, 127);
  ultraTabControl.ClickTab("Holidays");
  ultraTabControl.HolidaysPage.holidayTopPanel.UltraPanelClientAreaUnsafe.btnAddHoliday.Click(59, 16);
  panel = Aliases.ConfigClient.SelectDayForm.ContainerControl.panel1;
  let listView = panel.listViewHolidays;
  listView.CheckItem("1. Weihnachtsfeiertag", true);
  listView.CheckItem("Allerheiligen", true);
  listView.CheckItem("Christi Himmelfahrt", true);
  listView.CheckItem("Heilige Drei Könige", true);
  listView.CheckItem("Maria Himmelfahrt", true);
  listView.CheckItem("Ostermontag", true);
  listView.CheckItem("Pfingstmontag", true);
  listView.CheckItem("Tag der Arbeit", true);
  panel.btnOK.ClickButton();
  ultraTabControl.ClickTab("Exception Days");
  let ultraTabPageControl = ultraTabControl.SpecialDaysPage;
  let ultraButton = ultraTabPageControl.specialDayTopBottom.UltraPanelClientAreaUnsafe.btnAddSpecialDay;
  ultraButton.Click(64, 12);
  panel = Aliases.ConfigClient.SpecialDayAddForm.ContainerControl.panel1;
  let ultraMonthViewMulti = panel.panel2.ultraMonthViewMulti1;
  ultraMonthViewMulti.Click(224, 69, skCtrl);
  let ultraButton2 = panel.panel3.panel5.btnOk;
  ultraButton2.ClickButton();
  //ultraTabPageControl.specialDayBottomPanel.UltraPanelClientAreaUnsafe.ScheduleTable.Drag(248, 19, 335, 24);
  ultraButton.Click(59, 13);
  ultraMonthViewMulti.wDate = "2022-09-22";
  ultraButton2.ClickButton();
  ultraButton.Click(62, 8);
  ultraMonthViewMulti.wDate = "2022-10-29";
  ultraButton2.ClickButton();
  ultraButton.Click(53, 7);
  ultraMonthViewMulti.wDate = "2022-12-30";
  ultraButton2.ClickButton();
  
}

