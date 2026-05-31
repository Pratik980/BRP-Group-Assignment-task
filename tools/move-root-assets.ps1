# Move common root-level assets into src/assets/brp
$files = @(
  "babu-ram.webp",
  "brp-group.webp",
  "ubin.png",
  "service1.png",
  "service2.png",
  "legacy.webp",
  "ubin.png"
)
$dest = "src/assets/brp"
if (!(Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }

foreach ($f in $files) {
  if (Test-Path $f) {
    Write-Host "Moving $f -> $dest"
    Move-Item -Path $f -Destination $dest -Force
  } else {
    Write-Host "Not found: $f"
  }
}

Write-Host "Staging changes..."
git add -A
Write-Host "Created staged changes. To commit and push run:`n git commit -m \"chore: move root assets into src/assets/brp\"`\n git push`"

Write-Host "Done. Review files before committing/pushing."
