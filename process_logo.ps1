
Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\Infer\.gemini\antigravity\brain\0b6262c2-493e-4abe-ab41-d0443817e308\uploaded_image_1768068158163.jpg"
$destPath = "C:\Users\Infer\.gemini\antigravity\scratch\note67\public\logo-full.png"

$image = [System.Drawing.Image]::FromFile($sourcePath)
# Keep original aspect ratio, just convert to PNG
$newImage = New-Object System.Drawing.Bitmap($image)
$newImage.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

$newImage.Dispose()
$image.Dispose()

Write-Host "In-app logo processed and saved to $destPath"
