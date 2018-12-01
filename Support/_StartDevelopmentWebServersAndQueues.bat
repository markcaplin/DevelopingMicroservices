REM cd ..\Support\SpawnProcesses\SpawnProcesses\bin\Debug\netcoreapp2.1
REM cd ..\Support\SpawnProcesses\SpawnProcesses\bin\Debug\netcoreapp2.1
REM cd ..\Support\SpawnProcesses\SpawnProcesses
REM dotnet SpawnProcesses.dll --verbosity m --no-build --launch-profile SpawnProcesses
cd ..\Support\SpawnProcesses\SpawnProcesses
dotnet run --verbosity m --launch-profile SpawnProcesses --no-build 
pause