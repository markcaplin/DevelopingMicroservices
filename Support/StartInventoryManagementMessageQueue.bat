REM cd ..\..\..\InventoryManagement\CodeProject.InventoryManagement.MessageQueueing
REM cd ..\InventoryManagement\CodeProject.InventoryManagement.MessageQueueing
cd %1InventoryManagement\CodeProject.InventoryManagement.MessageQueueing
dotnet run --verbosity m --launch-profile CodeProject.InventoryManagement.MessageQueueing --no-build 

