# Installs prepare-commit-msg hook to strip Cursor co-author lines (Windows).
$hookDir = Join-Path (git rev-parse --show-toplevel) ".git\hooks"
$hookPath = Join-Path $hookDir "prepare-commit-msg"

if (-not (Test-Path $hookDir)) {
  Write-Error "Not a git repository."
  exit 1
}

@'
#!/bin/sh
# Remove Cursor co-author / made-with trailers from commit messages
if [ -f "$1" ]; then
  sed -i.bak '/cursoragent@cursor\.com/d;/^Co-authored-by: Cursor/d;/^Made-with: Cursor/d' "$1" 2>/dev/null || \
  sed -i '' '/cursoragent@cursor\.com/d;/^Co-authored-by: Cursor/d;/^Made-with: Cursor/d' "$1" 2>/dev/null
  rm -f "$1.bak"
fi
'@ | Set-Content -Path $hookPath -Encoding UTF8

Write-Host "Installed: $hookPath"
Write-Host "Future commits will not include Cursor co-author lines."
