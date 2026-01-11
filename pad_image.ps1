
Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\Infer\.gemini\antigravity\brain\0b6262c2-493e-4abe-ab41-d0443817e308\uploaded_image_1768068089276.jpg"
$destPath = "C:\Users\Infer\.gemini\antigravity\scratch\note67\app-icon.png"

$image = [System.Drawing.Image]::FromFile($sourcePath)
$maxDim = [Math]::Max($image.Width, $image.Height)

$squareImage = New-Object System.Drawing.Bitmap($maxDim, $maxDim)
$graphics = [System.Drawing.Graphics]::FromImage($squareImage)

# Use white background for the icon padding
$graphics.Clear([System.Drawing.Color]::White)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$x = ($maxDim - $image.Width) / 2
$y = ($maxDim - $image.Height) / 2

$graphics.DrawImage($image, $x, $y, $image.Width, $image.Height)
$squareImage.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

$graphics.Dispose()
$squareImage.Dispose()
$image.Dispose()

Write-Host "New logo processed and saved to $destPath"
