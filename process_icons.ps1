Add-Type -AssemblyName System.Drawing

$sourcePath = "$PSScriptRoot/logo-source.jpg"
$destIconPath = "$PSScriptRoot/src-tauri/icons/icon.png"
$destLogoPath = "$PSScriptRoot/public/logo-full.png"

Write-Host "Processing logo from: $sourcePath"

if (-not (Test-Path $sourcePath)) {
    Write-Error "Source file not found: $sourcePath"
    exit 1
}

try {
    $image = [System.Drawing.Image]::FromFile($sourcePath)
    
    # 1. Save as public/logo-full.png
    # Check if we should resize it for the dashboard (e.g. max height 512)
    # But usually logo-full is used as is. Let's just convert to PNG.
    $image.Save($destLogoPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Created $destLogoPath"

    # 2. Resize to 512x512 for src-tauri/icons/icon.png
    $iconSize = 512
    $iconBitmap = New-Object System.Drawing.Bitmap $iconSize, $iconSize
    $graph = [System.Drawing.Graphics]::FromImage($iconBitmap)
    $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graph.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Draw image scaled to 512x512
    $graph.DrawImage($image, 0, 0, $iconSize, $iconSize)
    
    $iconBitmap.Save($destIconPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Created $destIconPath"

    $image.Dispose()
    $iconBitmap.Dispose()
    $graph.Dispose()
}
catch {
    Write-Error "Error processing image: $_"
    exit 1
}
