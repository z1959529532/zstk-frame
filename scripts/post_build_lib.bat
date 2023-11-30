@echo off

set LIB_PACKAGE_JSON_PATH=".\dist\lib\package.json"
set PROJECTS_PACKAGE_JSON_PATH=".\projects\package.json"

if exist %PROJECTS_PACKAGE_JSON_PATH% (
    if exist %LIB_PACKAGE_JSON_PATH% (
        del %LIB_PACKAGE_JSON_PATH% /q /s
    )
    copy %PROJECTS_PACKAGE_JSON_PATH%  %LIB_PACKAGE_JSON_PATH%
)
