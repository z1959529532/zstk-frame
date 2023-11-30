@echo off

set LIB_PACKAGE_JSON_PATH=".\dist\lib\package.json"
set PROJECTS_PACKAGE_JSON_PATH=".\projects\package.json"

if exist %LIB_PACKAGE_JSON_PATH% (
    if exist %PROJECTS_PACKAGE_JSON_PATH% (
        del %PROJECTS_PACKAGE_JSON_PATH% /q /s
    )
    copy /y %LIB_PACKAGE_JSON_PATH%  %PROJECTS_PACKAGE_JSON_PATH%
)
