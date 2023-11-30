@echo off

call yarn login

call yarn publish .\dist\lib
